#!/bin/bash

# --- Backend Setup and Start ---
echo "## Starting Backend Setup and Data Loading..."
cd backend_2

# 1. Load data into MySQL DB
echo "-> Running load_data.py to load data into MySQL..."
# Assuming you are using python (or python3) to run your scripts
# You might need to adjust 'python' to 'python3' based on your environment
python load_data.py

# Check if data loading was successful (optional but good practice)
if [ $? -eq 0 ]; then
    echo "-> Data successfully loaded. Starting API..."
    # 2. Start the API server
    # Running in the background (nohup and &) so the script can proceed to the frontend
    # Redirects output to backend_api.log
    nohup python api.py > backend_api.log 2>&1 &
    BACKEND_PID=$!
    echo "-> Backend API started in background with PID: $BACKEND_PID. Logs: backend_api.log"
else
    echo "!!! ERROR: Data loading failed. Aborting backend start."
    cd ..
    exit 1
fi

cd .. # Go back to the main directory (HBD DATA VIZ1)

# --- Frontend Setup and Start ---
echo -e "\n## Starting Frontend Setup..."
cd frontend

# 1. Activate Virtual Environment (myenv)
# The virtual environment is located in the root of the project, not inside 'frontend'
echo "-> Activating myenv (assuming it's at the root level)..."
source ../myenv/bin/activate || source ../myenv/Scripts/activate

# 2. Install/Update Dependencies (if package.json is newer)
echo "-> Installing/Updating Node dependencies (npm install)..."
npm install

# 3. Start Frontend (Development/Production)
echo "-> Running npm run dev (or npm start) in the background..."
# Run the frontend in the background
# Use 'npm run dev' for development, or 'npm start' if 'dev' isn't available
nohup npm start > frontend.log 2>&1 & FRONTEND_PID=$!
echo "-> Frontend started in background with PID: $FRONTEND_PID. Logs: frontend.log"

cd .. # Go back to the main directory

echo -e "\n--- Script Finished ---"
echo "Project processes have been started in the background."
echo "To check the status of the backend, view backend_api.log"
echo "To check the status of the frontend, view frontend.log"
echo "To stop the processes, use: kill $BACKEND_PID $FRONTEND_PID"