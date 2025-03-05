import { api } from "encore.dev/api";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";

// Replace with your serial port path
// const port = new SerialPort({ path: "COM3", baudRate: 9600 }); // Windows
const port = new SerialPort({ path: "/dev/tty.usbmodem14201", baudRate: 9600 }); // macOS
const parser = port.pipe(new ReadlineParser());

// Store active WebSocket clients
const clients = new Set<WebSocket>();

// Create a WebSocket server
const server = http.createServer();
const wss = new WebSocketServer({ server });

// Broadcast the latest serial data to all connected clients
parser.on("data", (data: string) => {
  const lines = data.split("\r");

  if (lines.length > 1) {
    const lastLine = lines[lines.length - 2];

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(lastLine);
      }
    });
  }
});

// Handle new WebSocket connections
wss.on("connection", (ws) => {
  clients.add(ws);

  ws.on("close", () => {
    clients.delete(ws);
  });
});

// Handle serial port errors
port.on("error", (err) => {
  console.error("Serial Port Error: ", err.message);
});

// API route to start the WebSocket server
export const startWebSocket = api(
  {
    expose: true,
    method: "GET",
    path: "/api/start-ws",
  },
  async () => {
    const port = 8080; // WebSocket server port
    server.listen(port, () => {
      console.log(`WebSocket server running on ws://localhost:${port}`);
    });

    return { message: `WebSocket server started on port ${port}` };
  }
);

