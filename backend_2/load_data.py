import pandas as pd
from sqlalchemy import create_engine
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

# Create SQLAlchemy engine
engine = create_engine(
    f"mysql+mysqlconnector://{db_config['user']}:{encoded_password}@{db_config['host']}/{db_config['database']}",
    pool_pre_ping=True
)

# Clean column names
def clean_column_name(name):
    return name.lower().replace(' ', '_').replace('-', '_').replace('.', '_')

file_path = r"C:\Users\DELL\Desktop\HBD data viz1\bookings_dataset1.csv"
table_name = "bookings_dataset"

print(f"\nProcessing: {file_path}")

# Read only the header first
df_head = pd.read_csv(file_path, nrows=5)
cleaned_cols = [clean_column_name(c) for c in df_head.columns]

# Create empty table before inserting chunks
pd.DataFrame(columns=cleaned_cols).to_sql(table_name, engine, if_exists='replace', index=False)

print("Loading in chunks...")

# Chunk loading (prevents MySQL transaction failure)
for chunk in pd.read_csv(file_path, chunksize=5000):
    chunk.columns = cleaned_cols
    chunk.to_sql(table_name, engine, if_exists='append', index=False)

print("\n✓ All chunks loaded successfully!")