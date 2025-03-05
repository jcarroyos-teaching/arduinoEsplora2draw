import React, { useRef, useEffect, useState } from 'react';

interface CanvasProps {
  joystickX: number;
  joystickY: number;
  slider: number;
  light: number;
}

const CanvasComponent: React.FC<CanvasProps> = ({ joystickX, joystickY, slider, light }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState<boolean>(true);
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [color, setColor] = useState<string>('#000000');
  const [prevX, setPrevX] = useState<number | null>(null);
  const [prevY, setPrevY] = useState<number | null>(null);

  // Convert joystick values to canvas coordinates
  const mapJoystickToCanvas = (canvas: HTMLCanvasElement) => {
    // Map joystick values (typically -512 to 512) to canvas dimensions
    let x = ((joystickX + 512) / 1024) * canvas.width;
    let y = ((joystickY + 512) / 1024) * canvas.height;

    // Clamp the coordinates within the canvas boundaries
    x = Math.max(0, Math.min(canvas.width, x));
    y = Math.max(0, Math.min(canvas.height, y));

    return { x, y };
  };

  // Update line width based on slider value
  useEffect(() => {
    // Map slider (0-1023) to a larger line width range (1-50)
    const newLineWidth = Math.max(1, Math.min(50, Math.floor(slider / 20.46)));
    setLineWidth(newLineWidth);
  }, [slider]);

  // Update color based on light value
  useEffect(() => {
    const alpha = light / 1023;
    const newColor = `rgba(0, 255, 0, ${alpha})`;
    setColor(newColor);
  }, [light]);

  // Drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match its display size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Configure drawing settings
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    // Get current coordinates
    const { x, y } = mapJoystickToCanvas(canvas);

    // Start drawing if this is the first point
    if (prevX === null || prevY === null) {
      setPrevX(x);
      setPrevY(y);
      return;
    }

    // Only draw if drawing is enabled
    if (drawing) {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Update previous coordinates
    setPrevX(x);
    setPrevY(y);
  }, [joystickX, joystickY, drawing, lineWidth, color, prevX, prevY]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPrevX(null);
    setPrevY(null);
  };

  return (
    <div className="canvas-container">
      <canvas 
        ref={canvasRef} 
        className="border border-gray-300 rounded-md" 
        style={{ width: '100%', height: '400px' }}
      />
      <div className="controls mt-2 flex justify-between">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setDrawing(!drawing)}
        >
          {drawing ? 'Pause' : 'Resume'} Drawing
        </button>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CanvasComponent;
