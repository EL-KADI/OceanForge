"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface WaveCanvasProps {
  speed: number;
  height: number;
  frequency: number;
  background?: string;
  className?: string;
}

export function WaveCanvas({
  speed,
  height,
  frequency,
  background,
  className = "",
}: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const animateWave = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      
      let startY = Math.sin(time) * height + canvas.height / 2;
      ctx.moveTo(0, startY);
      
      for (let x = 0; x < canvas.width; x += 5) {
        const y = Math.sin(x * frequency + time) * height + canvas.height / 2;
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fill();
      
      time += speed / 100;
      
      animationRef.current = requestAnimationFrame(animateWave);
    };

    resizeCanvas();
    animateWave();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [speed, height, frequency]);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="h-[400px] w-full"
        style={{
          backgroundImage: background ? `url(${background})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </motion.div>
  );
}