#!/bin/bash

ports=(9400 4000 5173)

for port in "${ports[@]}"; do
  echo "Checking for processes on port $port..."
  pids=$(lsof -t -i :$port)
  if [ -n "$pids" ]; then
    for pid in $pids; do
      if [ "$pid" -ne 0 ]; then
        echo "Stopping process on port $port (PID: $pid)"
        kill -9 $pid
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