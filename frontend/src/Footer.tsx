import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-8 text-sm">
      <p>
        📡 Datos en tiempo real desde placa{" "}
        <a
          href="https://docs.arduino.cc/retired/boards/arduino-esplora/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-teal-400"
        >
          Arduino Esplora
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
