#!/bin/bash

# Define the ports
ports=(9400 4000 5173)

# Loop through each port and kill the process running on it
for port in "${ports[@]}"; do
  echo "Checking for processes on port $port..."
  pids=$(netstat -ano | grep ":$port" | awk '{print $5}' | sort | uniq)
  if [ -n "$pids" ]; then
    for pid in $pids; do
      if [ "$pid" -ne 0 ]; then
        echo "Stopping process on port $port (PID: $pid)"
        taskkill //PID $pid //F
        if [ $? -eq 0 ]; then
          echo "Successfully stopped process on port $port (PID: $pid)"
        else
          echo "Failed to stop process on port $port (PID: $pid)"
        fi
      fi
    done
  else
    echo "No process found on port $port"
  fi
done

echo "All specified processes have been stopped."

# Keep the bash window open
read -p "Press any key to exit..."