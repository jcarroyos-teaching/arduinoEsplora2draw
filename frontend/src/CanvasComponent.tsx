import React, { useRef, useEffect } from "react";

interface CanvasComponentProps {
  joystickX: number;
  joystickY: number;
  slider: number;
  light: number;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  joystickX,
  joystickY,
  slider,
  light,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Clear the canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Map joystick values to canvas coordinates
        const x = ((512 - joystickX) / 1024) * canvasWidth;
        const y = ((512 + joystickY) / 1024) * canvasHeight;

        // Map light value to opacity (0 to 1)
        const opacity = Math.min(Math.max(light / 1023, 0), 1);

        // Draw the point
        ctx.beginPath();
        ctx.arc(x, y, slider / 20, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(235, 0, 167, ${opacity})`;
        ctx.fill();
      }
    }
  }, [joystickX, joystickY, slider, light]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300 w-full h-64"
    ></canvas>
  );
};

export default CanvasComponent;