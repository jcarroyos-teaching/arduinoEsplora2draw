import React, { useEffect, useState, useRef } from "react";

interface DataFetcherProps {
  onDataFetched: (
    joystickX: number,
    joystickY: number,
    light: number,
    temperature: number,
    slider: number,
    microphone: number,
    accelX: number,
    accelY: number,
    accelZ: number,
    button1: number,
    button2: number,
    button3: number,
    button4: number
  ) => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ onDataFetched }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Mock data as fallback for development/testing
    const mockData = {
      joystickX: Math.floor(Math.random() * 1024 - 512),
      joystickY: Math.floor(Math.random() * 1024 - 512),
      light: Math.floor(Math.random() * 1023),
      temperature: Math.floor(Math.random() * 40 + 10),
      slider: Math.floor(Math.random() * 1023),
      microphone: Math.floor(Math.random() * 1023),
      accelX: Math.floor(Math.random() * 1023 - 512),
      accelY: Math.floor(Math.random() * 1023 - 512),
      accelZ: Math.floor(Math.random() * 1023 - 512),
      button1: Math.random() > 0.9 ? 1 : 0,
      button2: Math.random() > 0.9 ? 1 : 0,
      button3: Math.random() > 0.9 ? 1 : 0,
      button4: Math.random() > 0.9 ? 1 : 0
    };

    // Use this variable to determine whether to use mock data or real API
    const useMockData = false;
    let mockInterval: ReturnType<typeof setInterval> | null = null;

    if (useMockData) {
      // Use mock data with interval
      mockInterval = setInterval(() => {
        const newMockData = {
          joystickX: Math.floor(Math.random() * 1024 - 512),
          joystickY: Math.floor(Math.random() * 1024 - 512),
          light: Math.floor(Math.random() * 1023),
          temperature: Math.floor(Math.random() * 40 + 10),
          slider: Math.floor(Math.random() * 1023),
          microphone: Math.floor(Math.random() * 1023),
          accelX: Math.floor(Math.random() * 1023 - 512),
          accelY: Math.floor(Math.random() * 1023 - 512),
          accelZ: Math.floor(Math.random() * 1023 - 512),
          button1: Math.random() > 0.9 ? 1 : 0,
          button2: Math.random() > 0.9 ? 1 : 0,
          button3: Math.random() > 0.9 ? 1 : 0,
          button4: Math.random() > 0.9 ? 1 : 0
        };
        
        onDataFetched(
          newMockData.joystickX,
          newMockData.joystickY,
          newMockData.light,
          newMockData.temperature,
          newMockData.slider,
          newMockData.microphone,
          newMockData.accelX,
          newMockData.accelY,
          newMockData.accelZ,
          newMockData.button1,
          newMockData.button2,
          newMockData.button3,
          newMockData.button4
        );
        setIsConnected(true);
        setErrorMessage(null);
      }, 100);
    } else {
      // Use WebSocket connection
      try {
        const socket = new WebSocket("ws://localhost:8080");
        socketRef.current = socket;
        
        socket.onopen = () => {
          setIsConnected(true);
          setErrorMessage(null);
        };
        
        socket.onmessage = (event) => {
          try {
            // Parse comma-separated string instead of JSON
            const values = event.data.split(',').map(value => parseInt(value, 10));
            
            // Check if we received the expected number of values
            if (values.length === 13 && values.every(v => !isNaN(v))) {
              let [
                joystickX,
                joystickY,
                light,
                temperature,
                slider,
                microphone,
                accelX,
                accelY,
                accelZ,
                button1,
                button2,
                button3,
                button4
              ] = values;
              
              // Apply offset to joystick values
              const offsetX = -92;  // Adjust this value based on observed drift
              const offsetY = 115; // Adjust this value based on observed drift
              joystickX = -joystickX - offsetX;
              joystickY = joystickY - offsetY;
              
              onDataFetched(
                joystickX,
                joystickY,
                light,
                temperature,
                slider,
                microphone,
                accelX,
                accelY,
                accelZ,
                button1,
                button2,
                button3,
                button4
              );
            } else {
              throw new Error(`Invalid data format: expected 13 values, got ${values.length}`);
            }
          } catch (error) {
            if (error instanceof Error) {
              setErrorMessage(`Error processing data: ${error.message}`);
            }
          }
        };
        
        socket.onclose = (event) => {
          setIsConnected(false);
          setErrorMessage("WebSocket connection closed");
        };
        
        socket.onerror = (error) => {
          setIsConnected(false);
          setErrorMessage("WebSocket connection error");
        };
      } catch (error) {
        setIsConnected(false);
        if (error instanceof Error) {
          setErrorMessage(`WebSocket setup error: ${error.message}`);
        } else {
          setErrorMessage("Unknown error setting up WebSocket");
        }
      }
    }

    // Clean up on unmount
    return () => {
      if (mockInterval) {
        clearInterval(mockInterval);
      }
      
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [onDataFetched]);

  return (
    <div className="mt-4" hidden>
      <div className="text-sm text-gray-600 mt-2">
        To enable the WebSocket connection, make sure your WebSocket server is running at ws://localhost:8080
      </div>
    </div>
  );
};

export default DataFetcher;
