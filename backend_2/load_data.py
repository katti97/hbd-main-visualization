import pandas as pd
from sqlalchemy import create_engine, text
import urllib.parse

# MySQL connection parameters
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Irahirs11@ittak!",
    "database": "bsr"
}

# URL encode password
encoded_password = urllib.parse.quote_plus(db_config['password'])

# Step 1: Create database if it doesn't exist
print("Creating database if not exists...")
engine_no_db = create_engine(
    f"mysql+mysqlconnector://{db_config['user']}:{encoded_password}@{db_config['host']}",
    pool_pre_ping=True
)

with engine_no_db.connect() as conn:
    conn.execute(text("CREATE DATABASE IF NOT EXISTS bsr"))
    conn.commit()
    print("✓ Database 'bsr' ready")

engine_no_db.dispose()

# Step 2: Connect to the bsr database
engine = create_engine(
    f"mysql+mysqlconnector://{db_config['user']}:{encoded_password}@{db_config['host']}/{db_config['database']}",
    pool_pre_ping=True
)

# Clean column names
def clean_column_name(name):
    return name.lower().replace(' ', '_').replace('-', '_').replace('.', '_')

file_path = r"/home/hbd-main-visualization/bookings_dataset1.csv"
table_name = "bookings_dataset"

# Define date columns to parse
date_columns = ['CheckInDt', 'CheckOutDt', 'BookingDate', 'TR_CreatedDt', 
                'CreatedDt', 'BookingConfirmationDateTime']

print(f"\nProcessing: {file_path}")

# Read first chunk to get proper dtypes
print("Loading first chunk...")
first_chunk = pd.read_csv(file_path, nrows=5000, parse_dates=date_columns)
first_chunk.columns = [clean_column_name(c) for c in first_chunk.columns]

# Create table with proper types using first chunk
first_chunk.to_sql(table_name, engine, if_exists='replace', index=False)
print(f"✓ Table created with first chunk ({len(first_chunk)} rows)")

# Load remaining chunks
print("Loading remaining chunks...")
chunk_count = 1
for chunk in pd.read_csv(file_path, skiprows=range(1, 5001), chunksize=5000, parse_dates=date_columns):
    chunk.columns = [clean_column_name(c) for c in chunk.columns]
    chunk.to_sql(table_name, engine, if_exists='append', index=False)
    chunk_count += 1
    if chunk_count % 10 == 0:
        print(f"  Loaded {chunk_count * 5000} rows...")

print(f"\n✓ All chunks loaded successfully!")
engine.dispose()