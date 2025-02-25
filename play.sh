#!/bin/bash

# Navigate to the backend directory and start the backend
echo "Starting backend..."
cd backend
encore run &
BACKEND_PID=$!

# Navigate to the frontend directory and start the frontend
echo "Starting frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both processes to finish
wait $BACKEND_PID
wait $FRONTEND_PID