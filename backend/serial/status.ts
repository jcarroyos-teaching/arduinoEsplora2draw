import { api } from "encore.dev/api";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

// Replace with your serial port path
// const port = new SerialPort({ path: "COM3", baudRate: 9600 }); // Windows
const port = new SerialPort({ path: "/dev/tty.usbmodem14101", baudRate: 9600 }); // macOS
const parser = port.pipe(new ReadlineParser());

// Variable to store the last complete line of data
let lastLine = "";

// Function to handle incoming data
const handleData = (data: string) => {
  const lines = data.split("\r");

  // Store the last complete line
  if (lines.length > 1) {
    lastLine = lines[lines.length - 2];
  }
};

// Function to handle errors
port.on("error", (err) => {
  console.error("Error: ", err.message);
});

// Set up event listeners for the serial port
parser.on("data", handleData);

// Define the Encore endpoint to get serial data
interface Response {
  data: string | { error: string };
}

export const getSerialData = api(
  {
    expose: true,
    method: "GET",
    path: "/api/serial-data",
  },
  async (): Promise<Response> => {
    if (!port.isOpen) {
      return { data: { error: "Serial port is not open" } };
    }
    return { data: lastLine };
  }
);
