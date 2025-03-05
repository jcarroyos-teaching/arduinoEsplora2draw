import React, { useEffect } from "react";

interface DataFetcherProps {
  onDataFetched: (
    joystickX: number,
    joystickY: number,
    light: number,
    slider: number
  ) => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ onDataFetched }) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    // When connection is established
    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    // When a message is received
    socket.onmessage = (event) => {
      try {
        const data = event.data.split(",");
        const joystickX = parseInt(data[0], 10);
        const joystickY = parseInt(data[1], 10);
        const light = Math.min(Math.max(parseInt(data[2], 10), 0), 1024);
        const slider = parseInt(data[4], 10);
        onDataFetched(joystickX, joystickY, light, slider);
      } catch (error) {
        console.error("⚠️ Error parsing WebSocket message:", error);
      }
    };

    // Handle WebSocket errors
    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    // Handle WebSocket closing
    socket.onclose = () => {
      console.warn("🔌 WebSocket disconnected");
    };

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      socket.close();
    };
  }, [onDataFetched]);

  return (
    <p className="text-teal-600 mt-10">
      📡 Escuchando los sensores...
    </p>
  );
};

export default DataFetcher;
