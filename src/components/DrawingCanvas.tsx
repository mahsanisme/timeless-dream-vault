
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState([5]);
  const [brushColor, setBrushColor] = useState("#7c6aef");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Set initial canvas style
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize[0];
    ctx.strokeStyle = brushColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const colors = [
    "#7c6aef", // lavender
    "#0ea5e9", // sky blue
    "#f4845f", // peach
    "#000000", // black
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // yellow
    "#8b5cf6", // purple
  ];

  return (
    <div className="space-y-4">
      <div className="border-2 border-lavender-200 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-64 cursor-crosshair bg-white"
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Color Palette */}
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setBrushColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                brushColor === color 
                  ? "border-slate-400 scale-110" 
                  : "border-slate-200 hover:border-slate-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2 flex-1 min-w-32">
          <span className="text-sm text-slate-600">Size:</span>
          <Slider
            value={brushSize}
            onValueChange={setBrushSize}
            max={20}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-slate-600 w-6">{brushSize[0]}</span>
        </div>

        {/* Clear Button */}
        <Button
          onClick={clearCanvas}
          variant="outline"
          size="sm"
          className="border-lavender-200 text-lavender-700 hover:bg-lavender-50"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
