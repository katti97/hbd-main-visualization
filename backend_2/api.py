"""
FastAPI Backend for HummingBird Analytics
"""
 
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import json
from contextlib import asynccontextmanager
import time
from datetime import datetime
import traceback
 
 
# Import analytics agent
try:
    from llm_logic import analytics_agent
    print("✅ Successfully imported analytics_agent")
except ImportError as e:
    print(f"❌ Failed to import analytics_agent: {e}")
    analytics_agent = None
 
# Pydantic models
class QueryRequest(BaseModel):
    query: str
 
class ChartSuggestion(BaseModel):
    type: str
    x_column: str
    y_column: str
    title: Optional[str] = None
 
class DataSummary(BaseModel):
    row_count: int
    columns: List[str]
 
class AnalyticsResponse(BaseModel):
    success: bool
    query: str
    cleaned_query: Optional[str] = None
    response: str
    answer: Optional[str] = None
    suggested_charts: Optional[List[ChartSuggestion]] = None
    raw_results: Optional[List[Dict]] = None
    data_summary: Optional[DataSummary] = None
    visualization_type: Optional[str] = None
    timestamp: Optional[str] = None
    error: Optional[str] = None
    individual_timings: Optional[List[str]] = None
    column_selection_reasoning: Optional[str] = None
    final_generated_sql_query: Optional[str] = None
 
# Global variables
agent = None
startup_time = time.time()
 
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle"""
    global agent
   
    try:
        print(f"🔄 Initializing HummingBird Analytics API")
       
        if analytics_agent is None:
            raise Exception("analytics_agent could not be imported")
       
        agent = analytics_agent
        print("✅ Analytics agent loaded")
        print("🚀 Application startup completed")
       
        yield
       
    except Exception as e:
        print(f"❌ Failed to initialize application: {e}")
        yield
    finally:
        print("🔌 Shutting down application...")
        if agent and hasattr(agent, 'close'):
            try:
                agent.close()
            except Exception as e:
                print(f"⚠️ Warning during shutdown: {e}")
        print("✅ Application shutdown completed")
 
# Create FastAPI app
app = FastAPI(
    title="HummingBird Analytics API",
    description="API with MySQL backend and visualization support",
    version="1.0.0",
    lifespan=lifespan
)
 
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
# ============================================================================
# MAIN QUERY ENDPOINT
# ============================================================================
 
@app.post("/api/query", response_model=AnalyticsResponse)
async def query(request: QueryRequest) -> AnalyticsResponse:
    """Process analytics query with visualization"""
    overall_start = time.time()
   
    if not agent:
        raise HTTPException(status_code=503, detail="Agent not available")
   
    try:
        print(f"\n🚀 [QUERY REQUEST]")
        print(f"📝 Query: {request.query}")
        print("=" * 80)
       
        result = agent.query(request.query)
       
        processing_time = time.time() - overall_start
       
        response_text = result.get("response", "")
        answer_text = result.get("answer", response_text)
       
        suggested_charts = result.get("suggested_charts", [])
        raw_results = result.get("raw_results")
        data_summary = result.get("data_summary")
        viz_type = result.get("visualization_type")
       
        print(f"\n📤 [QUERY RESPONSE]")
        print(f"✅ Success: {result['success']}")
        print(f"📊 Visualization: {'✅ ' + str(len(suggested_charts)) + ' charts' if suggested_charts else '📝 Text only'}")
        print(f"⏱️ Time: {processing_time:.3f}s")
        print("=" * 80)
       
        response_obj = AnalyticsResponse(
            success=result["success"],
            query=request.query,
            cleaned_query=result.get("cleaned_query"),
            response=answer_text,
            answer=answer_text,
            suggested_charts=[ChartSuggestion(**chart) for chart in suggested_charts] if suggested_charts else None,
            raw_results=raw_results,
            data_summary=DataSummary(**data_summary) if data_summary else None,
            visualization_type=viz_type,
            timestamp=datetime.now().isoformat(),
            error=result.get("error"),
            individual_timings=result.get("individual_timings", []),
            column_selection_reasoning=result.get("column_selection_reasoning", ""),
            final_generated_sql_query=result.get("final_generated_sql_query", "")
        )
       
        print("-" * 80)
        print(response_obj)
        print("-" * 80)
 
        with open("response.txt", "w", encoding="utf-8") as f:
            f.write(f"\n{'='*50}\n")
            f.write(f"Timestamp: {datetime.now()}\n")
            f.write(f"{'='*50}\n")
            f.write(response_obj.model_dump_json(indent=2))  # Convert to formatted JSON
            f.write("\n\n")
 
       
        return response_obj
       
       
    except Exception as e:
        print(f"\n❌ [QUERY ERROR]")
        print(f"Error: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        print("=" * 80)
       
        return AnalyticsResponse(
            success=False,
            query=request.query,
            response=f"Error: {str(e)}",
            timestamp=datetime.now().isoformat(),
            error=f"{type(e).__name__}: {str(e)}"
        )
 
# ============================================================================
# HEALTH & STATUS ENDPOINTS
# ============================================================================
 
@app.get("/api/health")
async def health_check():
    """Health check"""
    uptime = time.time() - startup_time
    uptime_str = f"{uptime/3600:.1f} hours" if uptime > 3600 else f"{uptime/60:.1f} minutes"
   
    return {
        "status": "healthy" if agent else "degraded",
        "agent_ready": agent is not None,
        "visualization_enabled": True,
        "uptime": uptime_str,
        "timestamp": datetime.now().isoformat()
    }
 
@app.get("/api")
async def root():
    """API information"""
    uptime = time.time() - startup_time
    uptime_str = f"{uptime/3600:.1f} hours" if uptime > 3600 else f"{uptime/60:.1f} minutes"
   
    return {
        "message": "HummingBird Analytics API v1.0",
        "status": "running",
        "version": "1.0.0",
        "features": {
            "database": "MySQL",
            "visualization": "Automatic chart suggestions",
            "kpi_support": "Comprehensive booking KPIs"
        },
        "endpoints": {
            "query": "POST /api/query",
            "health": "GET /api/health",
            "info": "GET /api"
        },
        "uptime": uptime_str,
        "timestamp": datetime.now().isoformat()
    }
 
if __name__ == "__main__":
    import uvicorn
   
    print(f"🚀 Starting HummingBird Analytics API")
    print(f"📋 Features: MySQL | Visualization | KPIs")
   
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )