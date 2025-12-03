"""HummingBird Analytics - Main Orchestrator with LLM Agents"""

import time
import json
import sys
import traceback
from typing import Dict, Any, List, Union
from datetime import datetime, date
from decimal import Decimal
import boto3
import pandas as pd
from mysql.connector import connect, Error

from strands import Agent, tool
from strands.models import BedrockModel

# Import configuration and schema
try:
    from config import (
        AWS_REGION, CLAUDE_MODEL_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
        MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE,
        MAX_RESULT_ROWS, QUERY_TIMEOUT
    )
    from database_schema import hummingbird_schema, get_comprehensive_kpi_definitions
    print(f"[CONFIG] ✅ Configuration and schema loaded")
except ImportError as e:
    print(f"[ERROR] Configuration/Schema import failed: {e}")
    sys.exit(1)

# Global bedrock model instance
bedrock_model = None

def initialize_bedrock_model():
    """Initialize global Bedrock model"""
    global bedrock_model
    try:
        if not AWS_ACCESS_KEY_ID or not AWS_SECRET_ACCESS_KEY:
            print("❌ AWS credentials not found")
            return None

        print(f"[BOTO3] 🔧 Creating boto3 session...")
        
        session = boto3.Session(
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=AWS_REGION
        )
        
        bedrock_model = BedrockModel(
            model_id=CLAUDE_MODEL_ID,
            boto_session=session,
            temperature=0.0
        )
        
        print(f"[BEDROCK] ✅ Bedrock model configured: {CLAUDE_MODEL_ID}")
        return bedrock_model
        
    except Exception as e:
        print(f"[ERROR] Model setup failed: {str(e)}")
        return None

# Initialize the model
bedrock_model = initialize_bedrock_model()

# Timing collector
class TimingCollector:
    def __init__(self):
        self.timings = []
        self.reasoning = {}
        self.final_sql = ""

    def add_timing(self, agent_name: str, duration: float):
        self.timings.append(f"{agent_name}: {duration:.3f}s")

    def add_reasoning(self, agent_name: str, reasoning: str):
        self.reasoning[agent_name] = reasoning

    def set_final_sql(self, sql: str):
        self.final_sql = sql

    def reset(self):
        self.timings = []
        self.reasoning = {}
        self.final_sql = ""

timing_collector = TimingCollector()

def safe_json_loads(text: str):
    """Clean model output and parse JSON safely"""
    if not text:
        return {}

    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    try:
        # Remove markdown code fences
        text_cleaned = text.replace('```json', '').replace('```', '').strip()
        return json.loads(text_cleaned)
    except json.JSONDecodeError:
        pass

    return {}

# ============================================================================
# AGENT TOOLS
# ============================================================================

@tool
def query_preprocessing_agent(user_query: str) -> str:
    """Preprocess and clean user queries"""
    step_start = time.time()

    if not bedrock_model:
        cleaned_query = user_query.strip()
        if not cleaned_query.endswith(('?', '.', '!')):
            cleaned_query += "?"
        timing_collector.add_timing("query_preprocessing_agent", time.time() - step_start)
        return cleaned_query
        
    try:
        agent = Agent(
            model=bedrock_model,
            system_prompt="""
            You are a query preprocessing specialist.

            TASK: Transform raw user input into a clear, grammatically correct query.

            RULES:
            1. Fix spelling errors and typos
            2. Correct grammar
            3. Clarify ambiguous terms
            4. Add proper punctuation
            5. Remove filler words
            6. Maintain original intent
            
            OUTPUT: Clean query text only, no explanations
            """
        )
        
        response = agent(f"Clean and improve this query: {user_query}")
        cleaned_query = str(response).strip()
        
        timing_collector.add_timing("query_preprocessing_agent", time.time() - step_start)
        return cleaned_query
        
    except Exception as e:
        timing_collector.add_timing("query_preprocessing_agent", time.time() - step_start)
        return user_query.strip()

@tool
def intent_classification_agent(user_query: str) -> str:
    """Classify user queries"""
    step_start = time.time()

    if not bedrock_model:
        classification = "database"
        timing_collector.add_timing("intent_classification_agent", time.time() - step_start)
        return classification
        
    try:
        agent = Agent(
            model=bedrock_model,
            system_prompt="""
            You are an intent classification specialist.

            TASK: Classify the user's query into ONE category.

            CATEGORIES:
            1. database - Queries about bookings, clients, properties, revenue, ratings, KPIs, analytics
            2. general - Greetings, help requests, system capabilities, chitchat

            RULES:
            1. Return only the category name: 'database' OR 'general'
            2. No explanations
            3. Default to 'database' for business queries
            
            FORMAT:
            INPUT: <<User Query>>
            OUTPUT: <<Category>>
            """
        )
        
        response = agent(f"Classify this query: {user_query}")
        classification = str(response).strip().lower()
        
        if classification not in ['database', 'general']:
            classification = 'database'
            
        timing_collector.add_timing("intent_classification_agent", time.time() - step_start)
        return classification
        
    except Exception as e:
        timing_collector.add_timing("intent_classification_agent", time.time() - step_start)
        return "database"

@tool
def column_selection_agent(user_query: str) -> str:
    """Select appropriate columns"""
    step_start = time.time()

    if not bedrock_model:
        result = json.dumps({
            "columns": ["*"],
            "reasoning": "Selected all columns (fallback mode)"
        })
        timing_collector.add_timing("column_selection_agent", time.time() - step_start)
        return result
        
    try:
        schema_prompt = hummingbird_schema.get_schema_prompt()
        kpi_definitions = get_comprehensive_kpi_definitions()
        
        agent = Agent(
            model=bedrock_model,
            system_prompt=f"""
            You are a database column selection specialist.

            MISSION:
            - For KPI queries, use exact columns from KPI definitions
            - For general queries, select relevant columns from schema
            - Use exact column names from schema
            - Support partial/fuzzy name matching for clients and properties

            CLIENT NAME MATCHING RULES:
            - If user mentions "ICICI Bank" or "ICICI", match to "ICICI Bank Limited"
            - If user mentions "Cipla", match to "CIPLA LTD"
            - Apply fuzzy matching: look for LIKE '%keyword%' patterns in clientName
            - Always use case-insensitive matching for client names

            {schema_prompt}

            {kpi_definitions}

            OUTPUT FORMAT:
            {{
                "columns": ["column1", "column2"],
                "reasoning": "Brief explanation including any fuzzy matching applied"
            }}
            
            Return ONLY the JSON object.
            """
        )
        
        response = agent(f"Select columns for: {user_query}")
        result = str(response).strip()
        
        reasoning = "Selected columns based on query"
        try:
            parsed_result = safe_json_loads(result)
            reasoning = parsed_result.get("reasoning", reasoning)
        except:
            pass
        
        timing_collector.add_reasoning("column_selection", reasoning)
        timing_collector.add_timing("column_selection_agent", time.time() - step_start)
        return result
        
    except Exception as e:
        timing_collector.add_timing("column_selection_agent", time.time() - step_start)
        return json.dumps({"columns": ["*"], "reasoning": "Error fallback"})

@tool
def query_decomposition_agent(user_query: str, selected_columns: str) -> str:
    """Decompose queries into structured components"""
    step_start = time.time()

    if not bedrock_model:
        result = json.dumps({
            "columns": ["*"],
            "aggregation_needed": True,
            "conditions": []
        })
        timing_collector.add_timing("query_decomposition_agent", time.time() - step_start)
        return result
        
    try:
        kpi_definitions = get_comprehensive_kpi_definitions()
        
        agent = Agent(
            model=bedrock_model,
            system_prompt=f"""
            You are a query decomposition specialist.

            MISSION:
            - For KPI queries, use exact decomposition from definitions
            - For general queries, structure based on query type
            - Support filtering, aggregation, grouping, sorting

            {kpi_definitions}

            OUTPUT FORMAT:
            {{
                "columns": ["list of columns"],
                "conditions": ["WHERE conditions"],
                "grouping": ["GROUP BY columns"],
                "sorting": ["ORDER BY expressions"],
                "limit": number,
                "aggregation_needed": true/false
            }}

            Return ONLY the JSON object.
            """
        )
        
        response = agent(f"Decompose: {user_query}\nColumns: {selected_columns}")
        result = str(response).strip()
        
        timing_collector.add_timing("query_decomposition_agent", time.time() - step_start)
        return result
        
    except Exception as e:
        timing_collector.add_timing("query_decomposition_agent", time.time() - step_start)
        return json.dumps({"columns": ["*"], "aggregation_needed": True})
            # - Use DATE_FORMAT() for date formatting
            # - Use MONTH(), YEAR() for date extraction
@tool
def sql_generation_agent(user_query: str, decomposition: str) -> str:
    """Generate SQL queries"""
    step_start = time.time()

    if not bedrock_model:
        sql_query = f"SELECT COUNT(*) as total_bookings FROM {MYSQL_DATABASE}.bookings_dataset"
        result = json.dumps({"sql_query": sql_query})
        timing_collector.set_final_sql(sql_query)
        timing_collector.add_timing("sql_generation_agent", time.time() - step_start)
        return result
        
    try:
        schema_prompt = hummingbird_schema.get_schema_prompt()
        kpi_definitions = get_comprehensive_kpi_definitions()
        
        agent = Agent(
            model=bedrock_model,
            system_prompt=f"""
            You are an expert MySQL SQL generation specialist for business intelligence and analytics.

            CRITICAL RULES:
            
            1. ALWAYS GENERATE ANALYTICAL/SUMMARY QUERIES:
            - Every query MUST include at least ONE aggregate function: COUNT(), SUM(), AVG(), MIN(), MAX()
            - Use GROUP BY when analyzing dimensions
            - NEVER generate listing queries like SELECT * or SELECT col1, col2, col3
            - Focus on summarized metrics and insights
            - Prefer analytical queries that provide business value

            2. CLIENT NAME FUZZY MATCHING:
            - ALWAYS use LIKE operator with wildcards for client name matching
            - Example: WHERE clientName LIKE '%ICICI%' (not exact match)
            - Case-insensitive matching: Use UPPER() or LOWER() functions
            - Common patterns:
                * "ICICI Bank" → WHERE UPPER(clientName) LIKE '%ICICI%BANK%'
                * "Cipla" → WHERE UPPER(clientName) LIKE '%CIPLA%'
                * "Amazon" → WHERE UPPER(clientName) LIKE '%AMAZON%'
            - Apply fuzzy matching for ANY client/company name in query

            3. PROPERTY/HOTEL QUERIES:
            - When asked about hotels/properties for a client, use DISTINCT on PropertyName
            - Example: SELECT DISTINCT PropertyName FROM bookings_dataset WHERE clientName LIKE '%CIPLA%'
            - Group by property when showing metrics per property

            4. DATE HANDLING:
            - Column 'bookingdate' is DATETIME type
            - Column 'checkindt' is DATETIME type  
            - Column 'checkoutdt' is DATETIME type
            - Use standard MySQL date functions: YEAR(), MONTH(), QUARTER(), DATE()
            - Always check: WHERE bookingdate IS NOT NULL for date-based queries

            5. TABLE NAME:
            - Always use: bookings_dataset

            {schema_prompt}

            {kpi_definitions}

            MYSQL SPECIFIC RULES:
            - Use proper aggregate functions
            - Use GROUP BY for dimensional analysis
            - Use HAVING for filtered aggregations
            - Handle NULL values with COALESCE or IS NOT NULL
            - Use meaningful aliases (AS total_bookings, AS total_revenue)
            - Query should always return summarized/aggregated results, not raw listings
            - Use fuzzy string matching with LIKE for all name-based filters

            OUTPUT FORMAT:
            {{
                "sql_query": "COMPLETE ANALYTICAL SQL QUERY"
            }}
            
            Return ONLY the JSON object. Query must include aggregation functions and fuzzy matching where applicable.
            """
        )
        
        print(f"🤖 Calling agent with query: {user_query}")
        response = agent(f"""Generate an ANALYTICAL SQL query for: {user_query}

Decomposition: {decomposition}

REQUIREMENTS:
- Use aggregation functions (COUNT, SUM, AVG, MIN, MAX)
- Use GROUP BY if analyzing by dimensions
- Never generate listing queries
- Use LIKE operator with wildcards for client/company name matching
- Use standard MySQL date functions for DATETIME columns
- Focus on business insights and summaries
""")
        
        print(f"📥 Raw agent response: {response}")
        result = str(response).strip()
        
        sql_query = ""
        try:
            print(f"🔍 Attempting to parse JSON from: {result[:200]}...")
            parsed_result = safe_json_loads(result)
            print(f"✅ Parsed result: {parsed_result}")
            sql_query = parsed_result.get("sql_query", "")
            print(f"📝 Extracted SQL: {sql_query}")
            
            # Validation: ensure query has aggregation
            if sql_query and not any(keyword in sql_query.upper() for keyword in ['COUNT(', 'SUM(', 'AVG(', 'MIN(', 'MAX(']):
                print(f"⚠️ Generated query lacks aggregation, using fallback")
                sql_query = f"SELECT COUNT(*) as total_records FROM {MYSQL_DATABASE}.bookings_dataset WHERE bookingdate IS NOT NULL"
                result = json.dumps({"sql_query": sql_query})
                
        except Exception as parse_error:
            print(f"❌ JSON parsing error: {parse_error}")
            print(f"❌ Failed to parse result: {result}")
            sql_query = f"SELECT COUNT(*) as total_bookings, SUM(totaltariff) as total_revenue FROM {MYSQL_DATABASE}.bookings_dataset WHERE bookingdate IS NOT NULL"
            result = json.dumps({"sql_query": sql_query})
        
        if sql_query:
            timing_collector.set_final_sql(sql_query)
        else:
            print(f"⚠️ No SQL query extracted, using fallback")
            sql_query = f"SELECT COUNT(*) as total_records FROM {MYSQL_DATABASE}.bookings_dataset WHERE bookingdate IS NOT NULL"
            result = json.dumps({"sql_query": sql_query})
            timing_collector.set_final_sql(sql_query)
        
        timing_collector.add_timing("sql_generation_agent", time.time() - step_start)
        return result
        
    except Exception as e:
        print(f"❌ EXCEPTION in sql_generation_agent: {type(e).__name__}: {str(e)}")
        import traceback
        print(f"❌ Traceback: {traceback.format_exc()}")
        
        timing_collector.add_timing("sql_generation_agent", time.time() - step_start)
        sql_query = f"SELECT COUNT(*) as total_bookings FROM {MYSQL_DATABASE}.bookings_dataset WHERE bookingdate IS NOT NULL"
        timing_collector.set_final_sql(sql_query)
        return json.dumps({"sql_query": sql_query})

@tool
def query_validation_agent(sql_query: str) -> str:
    """Validate SQL queries"""
    step_start = time.time()

    if not bedrock_model:
        result = json.dumps({"valid": True, "issues": []})
        timing_collector.add_timing("query_validation_agent", time.time() - step_start)
        return result
        
    try:
        schema_prompt = hummingbird_schema.get_schema_prompt()
        
        agent = Agent(
            model=bedrock_model,
            system_prompt=f"""
            You are a SQL validation specialist.

            MISSION:
            - Validate SQL syntax for MySQL
            - Check column names exist in schema
            - Verify table name is correct
            - Check logical correctness

            {schema_prompt}

            VALIDATION CHECKS:
            1. Table name: bookings_dataset
            2. Column names exist in schema
            3. MySQL syntax correctness
            4. Logical query structure

            OUTPUT FORMAT:
            {{
                "valid": true or false,
                "issues": ["list of issues or empty"]
            }}

            Return ONLY the JSON object.
            """
        )
        
        response = agent(f"Validate SQL: {sql_query}")
        result = str(response).strip()
        
        timing_collector.add_timing("query_validation_agent", time.time() - step_start)
        return result
        
    except Exception as e:
        timing_collector.add_timing("query_validation_agent", time.time() - step_start)
        return json.dumps({"valid": True, "issues": []})

@tool
def execute_mysql_query(sql_query: str) -> Dict[str, Any]:
    """Execute MySQL query"""
    execution_start = time.time()

    try:
        print(f"[MYSQL] 🚀 Executing query...")
        print(f"[MYSQL] 📝 Query: {sql_query[:150]}...")
        
        conn = connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DATABASE,
            port=MYSQL_PORT
        )
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute(sql_query)
        
        if cursor.description:
            rows = cursor.fetchall()[:MAX_RESULT_ROWS]
            
            # Process results to handle non-serializable types
            processed_rows = []
            for row in rows:
                processed_row = {}
                for key, value in row.items():
                    if isinstance(value, (datetime, date, Decimal)):
                        processed_row[key] = str(value)
                    else:
                        processed_row[key] = value
                processed_rows.append(processed_row)
            
            result = {
                "success": True,
                "results": processed_rows,
                "row_count": len(processed_rows),
                "columns": [col[0] for col in cursor.description]
            }
        else:
            result = {
                "success": True,
                "affected_rows": cursor.rowcount
            }
        
        cursor.close()
        conn.close()
        
        execution_time = time.time() - execution_start
        timing_collector.add_timing("execute_mysql_query", execution_time)
        
        print(f"[MYSQL] ✅ Query successful: {result.get('row_count', 0)} records")
        return result
        
    except Error as e:
        execution_time = time.time() - execution_start
        timing_collector.add_timing("execute_mysql_query", execution_time)
        print(f"[MYSQL] ❌ Query failed: {str(e)}")
        return {"success": False, "error": str(e)}

@tool
def visualization_analysis_agent(user_query: str, sql_query: str, query_results: Dict[str, Any]) -> str:
    """Analyze results and suggest visualizations"""
    step_start = time.time()

    if not bedrock_model or not query_results.get("success"):
        result = json.dumps({
            "chart_suggestions": [],
            "data_summary": {"row_count": 0, "columns": []}
        })
        timing_collector.add_timing("visualization_analysis_agent", time.time() - step_start)
        return result
        
    try:
        agent = Agent(
            model=bedrock_model,
            system_prompt="""
            You are a data visualization specialist.

            TASK:
            Analyze query results and suggest 1-2 appropriate chart types.

            CHART TYPES:
            - bar: Category comparisons
            - line: Time series, trends
            - pie: Parts of whole (max 8 categories)
            - scatter: Correlation between variables

            OUTPUT FORMAT:
            {{
                "chart_suggestions": [
                    {{
                        "type": "bar",
                        "x_column": "category_column",
                        "y_column": "value_column",
                        "title": "Chart Title"
                    }}
                ],
                "data_summary": {{
                    "row_count": number,
                    "columns": ["col1", "col2"]
                }}
            }}

            Return ONLY the JSON object.
            """
        )
        
        response = agent(f"Analyze: {user_query}\nSQL: {sql_query}\nResults: {json.dumps(query_results)}")
        result = str(response).strip()
        
        timing_collector.add_timing("visualization_analysis_agent", time.time() - step_start)
        return result
        
    except Exception as e:
        timing_collector.add_timing("visualization_analysis_agent", time.time() - step_start)
        return json.dumps({
            "chart_suggestions": [],
            "data_summary": {"row_count": 0, "columns": []}
        })


# def visualization_analysis_agent(user_query: str, sql_query: str, query_results: Dict[str, Any]) -> str:
#     """Analyze results and suggest visualizations"""
#     step_start = time.time()

#     if not bedrock_model or not query_results.get("success"):
#         timing_collector.add_timing("visualization_analysis_agent", time.time() - step_start)
#         return "{}"
        
#     try:
#         agent = Agent(
#             model=bedrock_model,
#             system_prompt="""
#             You are a data visualization specialist.

#             TASK:
#             Analyze query results and determine if visualization would be helpful.
#             If the query is asking for a simple lookup, single value, or where visualization 
#             doesn't add value, return an empty JSON object.
            
#             Only suggest visualizations when they would meaningfully enhance understanding.

#             CHART TYPES:
#             - bar: Category comparisons
#             - line: Time series, trends
#             - pie: Parts of whole (max 8 categories)
#             - scatter: Correlation between variables
#             - if there is only one column dont generate chart

#             OUTPUT FORMAT:
#             If visualization is helpful:
#             {{
#                 "chart_suggestions": [
#                     {{
#                         "type": "bar",
#                         "x_column": "category_column",
#                         "y_column": "value_column",
#                         "title": "Chart Title"
#                     }}
#                 ],
#                 "data_summary": {{
#                     "row_count": number,
#                     "columns": ["col1", "col2"]
#                 }}
#             }}

#             If NO visualization is needed: Return {{}}
            
#             Return ONLY the JSON object.
#             """
#         )
        
#         response = agent(f"Analyze: {user_query}\nSQL: {sql_query}\nResults: {json.dumps(query_results)}")
#         result = str(response).strip()
        
#         # Handle cases where agent returns empty object or indicates no visualization needed
#         if not result or result == "{}" or result == "{}":
#             timing_collector.add_timing("visualization_analysis_agent", time.time() - step_start)
#             return "{}"
        
#         timing_collector.add_timing("visualization_analysis_agent", time.time() - step_start)
#         return result
        
#     except Exception as e:
#         timing_collector.add_timing("visualization_analysis_agent", time.time() - step_start)
#         return "{}"

@tool
def result_formatting_agent(user_query: str, sql_query: str, query_results: str) -> str:
    """Format query results with visualization"""
    step_start = time.time()

    try:
        # Parse query results
        if isinstance(query_results, str):
            raw_results = json.loads(query_results)
        else:
            raw_results = query_results
        
        # Generate visualization analysis
        viz_analysis_result = visualization_analysis_agent(user_query, sql_query, raw_results)
        viz_analysis = safe_json_loads(viz_analysis_result)
        
        if not bedrock_model:
            formatted_response = f"Query Results:\n{json.dumps(raw_results, indent=2)}"
        else:
            agent = Agent(
                model=bedrock_model,
                system_prompt="""
                You are a results formatting specialist for business analytics.

                TASK: Format query results clearly and appropriately with intelligent number formatting.

                NUMBER FORMATTING RULES:
                1. COUNT METRICS (bookings, records, clients, properties):
                - Display as plain numbers with comma separators
                - Examples: "5,03,347 bookings", "1,523 clients", "45 properties" , "10,005 Checkouts"
                - NEVER use currency symbols (₹) for counts
                
                2. REVENUE/MONEY METRICS (totaltariff, revenue, amounts):
                - Display with currency symbol: ₹
                - Examples: "₹2,45,67,890", "₹1.2 crores"
                - Use Indian number formatting for rupees
                
                3. PERCENTAGES AND RATIOS:
                - Display with % symbol or as ratios
                - Examples: "85.5%", "3.2:1 ratio"
                
                4. CONTEXT-AWARE FORMATTING:
                - Look at column names to determine type
                - "total_bookings", "booking_count" → plain numbers
                - "total_revenue", "amount", "tariff" → currency
                - When in doubt, use plain numbers

                PRESENTATION RULES:
                1. Do NOT show raw query data, only provide analysis
                2. Keep format clean and professional
                3. Include simple insights when applicable
                4. Provide deep analysis of patterns and trends
                5. Use proper number formatting based on metric type
                6. Highlight key findings prominently
                
                OUTPUT: Formatted text response with proper number formatting
                """
            )
            
            formatted_response = str(agent(f"""Format results for: {user_query}

SQL: {sql_query}
Results: {json.dumps(raw_results)}

FORMATTING INSTRUCTIONS:
- Apply correct number formatting (counts vs currency)
- Counts/bookings: plain numbers (e.g., "5,03,347 bookings", "10,472 properties")
- Revenue/money: currency format (e.g., "₹2,45,67,890", "₹45,899")
- Provide insights and analysis
"""))
        
        # Create enhanced response
        enhanced_response = {
            "question": user_query,
            "sql": sql_query,
            "answer": formatted_response,
            "suggested_charts": viz_analysis.get("chart_suggestions", []),
            "raw_results": raw_results.get("results", []),
            "data_summary": viz_analysis.get("data_summary", {}),
            "type": "data_analysis_with_visualization"
        }
        
        timing_collector.add_timing("result_formatting_agent", time.time() - step_start)
        return json.dumps(enhanced_response)
        
    except Exception as e:
        timing_collector.add_timing("result_formatting_agent", time.time() - step_start)
        return json.dumps({
            "question": user_query,
            "sql": sql_query,
            "answer": f"Query executed. (Formatting error: {str(e)})",
            "suggested_charts": [],
            "raw_results": [],
            "data_summary": {},
            "type": "error"
        })
# ============================================================================
# MAIN ORCHESTRATOR
# ============================================================================

class HummingBirdOrchestrator:
    """Main orchestrator for HummingBird Analytics"""

    def __init__(self):
        self.initialization_error = None
        
        if not bedrock_model:
            print("⚠️ Bedrock model not available - using fallback mode")
        
        try:
            if bedrock_model:
                self.planner_agent = Agent(
                    model=bedrock_model,
                    system_prompt="""
                    Execute workflow: preprocess → classify → [if database: columns → decompose → sql → validate → execute → format → visualize].
                    Use tools in sequence. Support KPIs and general queries with chart suggestions.
                    """,
                    tools=[
                        query_preprocessing_agent,
                        intent_classification_agent,
                        column_selection_agent,
                        query_decomposition_agent,
                        sql_generation_agent,
                        query_validation_agent,
                        execute_mysql_query,
                        result_formatting_agent,
                        visualization_analysis_agent
                    ]
                )
                print(f"[SYSTEM] ✅ HummingBird Orchestrator initialized")
            else:
                self.planner_agent = None
            
        except Exception as e:
            self.initialization_error = f"Orchestrator initialization failed: {str(e)}"
            print(f"[SYSTEM] ❌ {self.initialization_error}")

    def query(self, user_input: str) -> Dict[str, Any]:
        """Process user query"""
        print(f"\n🚀 [ORCHESTRATOR] Processing query")
        print(f"💬 [INPUT] {user_input}")
        print("=" * 80)
        
        timing_collector.reset()
        
        if not bedrock_model:
            return {
                "success": False,
                "error": "System not ready",
                "response": "Bedrock model not available",
                "query": user_input
            }

        try:
            # Direct function calls for faster execution
            
            # 1. Preprocess
            cleaned_query = query_preprocessing_agent(user_input)
            print(f"[STEP 1] 🧹 Cleaned: {cleaned_query}")
            
            # 2. Classify
            intent = intent_classification_agent(cleaned_query)
            print(f"[STEP 2] 🎯 Intent: {intent}")
            
            if intent == "general":
                response = f"""Hello! I'm your HummingBird Analytics Assistant.

I can help you with:
- Booking analysis and trends
- Client insights and metrics
- Property performance
- Revenue analysis
- KPI calculations
- Custom data queries

Example queries:
- "Show total bookings this month"
- "What's the average rating by city?"
- "Top 10 clients by revenue"
- "Booking trends over time"

How can I help you today?"""

                return {
                    "success": True,
                    "query": user_input,
                    "response": response,
                    "individual_timings": timing_collector.timings
                }
            
            # Database flow
            print(f"[ROUTE] 📊 Database flow")
            
            # 3. Select columns
            columns_result = column_selection_agent(cleaned_query)
            columns_data = safe_json_loads(columns_result)
            columns = columns_data.get("columns", ["*"])
            print(f"[STEP 3] 📑 Columns: {columns}")
            
            # 4. Decompose
            decomposition_result = query_decomposition_agent(cleaned_query, json.dumps(columns))
            print(f"[STEP 4] 🔎 Decomposition: Success")
            
            # 5. Generate SQL with validation loop
            max_attempts = 2
            attempt = 0
            sql_query = ""
            
            while attempt <= max_attempts:
                sql_result = sql_generation_agent(cleaned_query, decomposition_result)
                sql_data = safe_json_loads(sql_result)
                sql_query = sql_data.get("sql_query", "")
                print(f"[STEP 5.{attempt}] 📝 SQL: {sql_query[:50]}...")
                
                validation_result = query_validation_agent(sql_query)
                validation_data = safe_json_loads(validation_result)
                
                if validation_data.get("valid", True):
                    print(f"[STEP 5.{attempt}] ✅ Validation passed")
                    break
                else:
                    print(f"[STEP 5.{attempt}] ❌ Validation failed")
                    attempt += 1
            
            # 6. Execute
            exec_result = execute_mysql_query(sql_query)
            print(f"[STEP 6] ⚡ Execution: {exec_result.get('success', False)}")
            
            # 7. Format with visualization
            if exec_result.get("success"):
                formatted_result = result_formatting_agent(cleaned_query, sql_query, json.dumps(exec_result))
                enhanced_data = safe_json_loads(formatted_result)
                
                response = enhanced_data.get("answer", "Query completed successfully.")
                
                result_data = {
                    "success": True,
                    "query": user_input,
                    "cleaned_query": cleaned_query,
                    "response": response,
                    "individual_timings": timing_collector.timings,
                    "column_selection_reasoning": timing_collector.reasoning.get("column_selection", ""),
                    "final_generated_sql_query": timing_collector.final_sql or sql_query
                }
                
                # Add visualization data if available
                if enhanced_data.get("suggested_charts"):
                    result_data.update({
                        "answer": enhanced_data.get("answer"),
                        "suggested_charts": enhanced_data.get("suggested_charts", []),
                        "raw_results": enhanced_data.get("raw_results"),
                        "data_summary": enhanced_data.get("data_summary"),
                        "visualization_type": enhanced_data.get("type")
                    })
                
                return result_data
            else:
                error_msg = exec_result.get("error", "Unknown error")
                return {
                    "success": False,
                    "query": user_input,
                    "response": f"Query failed: {error_msg}",
                    "error": error_msg,
                    "individual_timings": timing_collector.timings
                }
                
        except Exception as e:
            print(f"❌ [ERROR] {str(e)}")
            traceback.print_exc()
            return {
                "success": False,
                "error": str(e),
                "response": f"Processing error: {str(e)}",
                "query": user_input,
                "individual_timings": timing_collector.timings
            }

    def get_status(self) -> Dict[str, Any]:
        """Get system status"""
        return {
            "bedrock_available": bedrock_model is not None,
            "orchestrator_available": hasattr(self, 'planner_agent'),
            "database": MYSQL_DATABASE,
            "model_id": CLAUDE_MODEL_ID,
            "architecture": "hummingbird_analytics",
            "capabilities": {
                "kpi_calculations": "Bookings, Revenue, Ratings, Trends",
                "general_queries": "Listing, Analysis, Filtering, Aggregation",
                "visualization": "Automatic chart suggestions"
            }
        }

# Global instance
print(f"[STARTUP] 🚀 Starting HummingBird Analytics")
analytics_agent = HummingBirdOrchestrator()
print(f"[READY] ✅ HummingBird Analytics ready")
print(f"[CAPABILITIES] 📊 KPI Calculations | General Queries | Visualization")