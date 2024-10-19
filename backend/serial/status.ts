import { api } from "encore.dev/api";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const port = new SerialPort({ path: "/dev/tty.usbmodem14601", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser());

let lastLine = "";

const handleData = (data: string) => {
  const lines = data.split("\r");
  if (lines.length > 1) {
    lastLine = lines[lines.length - 2];
  }
};

port.on("error", (err) => {
  console.error("Error: ", err.message);
});

parser.on("data", handleData);

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

export const sendDataToEsplora = api(
  {
    expose: true,
    method: "POST",
    path: "/api/send-data",
  },
  async (): Promise<Response> => {
    const dataToSend = ["Do", "Re", "Mi", "Fa"].join(",");
    if (!port.isOpen) {
      return { data: { error: "Serial port is not open" } };
    }
    port.write(dataToSend + "\n", (err) => {
      if (err) {
        console.error("Error on write: ", err.message);
      }
    });
    return { data: "Data sent to Arduino Esplora" };
  }
);