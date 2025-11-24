"""
Configuration Management for HummingBird Analytics
"""

import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables
load_dotenv()

# ============================================================================
# AWS CONFIGURATION (Bedrock)
# ============================================================================

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "")
CLAUDE_MODEL_ID = os.getenv("CLAUDE_MODEL_ID", "anthropic.claude-3-sonnet-20240229-v1:0")

# ============================================================================
# MYSQL DATABASE CONFIGURATION
# ============================================================================

MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "bsr")

# ============================================================================
# APPLICATION CONFIGURATION
# ============================================================================

APP_NAME = "HummingBird Analytics"
APP_VERSION = "1.0.0"
DEBUG_MODE = os.getenv("DEBUG_MODE", "False").lower() == "true"

# Query timeout in seconds
QUERY_TIMEOUT = int(os.getenv("QUERY_TIMEOUT", "300"))

# Maximum rows to return in query results
MAX_RESULT_ROWS = int(os.getenv("MAX_RESULT_ROWS", "1000"))

print(f"[CONFIG] ✅ Configuration loaded")
print(f"[CONFIG] 📊 Database: {MYSQL_DATABASE}@{MYSQL_HOST}:{MYSQL_PORT}")
print(f"[CONFIG] 🤖 Model: {CLAUDE_MODEL_ID}")
print(f"[CONFIG] 🌍 Region: {AWS_REGION}")

