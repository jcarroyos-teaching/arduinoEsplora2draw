import React, { useState } from "react";
import CanvasComponent from "./components/CanvasComponent";
import Footer from "./Footer";
import DataFetcher from "./hooks/DataFetcher";

const sensorNames = [
  "Joystick X",
  "Joystick Y",
  "Light",
  "Temperature",
  "Slider",
  "Microphone",
  "Accel X",
  "Accel Y",
  "Accel Z",
  "Button 1",
  "Button 2",
  "Button 3",
  "Button 4",
];

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<number[]>(Array(13).fill(0));

  const handleDataFetched = (
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
  ) => {
    setSensorData([
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
      button4,
    ]);
  };

  return (
    <div className="container mx-auto max-w-3xl p-4 mt-8">
      <div className="mt-4 grid grid-cols-2 gap-4">
        <section id="sensor-data">
          {sensorData.map((value, index) => (
            <div key={index} className="mb-2">
              <strong>{sensorNames[index]}:</strong>{" "}
              <span className="text-pink-600">{value}</span>
            </div>
          ))}
        </section>
        <div>
          <CanvasComponent
            joystickX={sensorData[0]}
            joystickY={sensorData[1]}
            slider={sensorData[4]}
            light={sensorData[2]}
          />
          <DataFetcher onDataFetched={handleDataFetched} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
