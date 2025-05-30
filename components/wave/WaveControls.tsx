"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useWaveSound } from "@/hooks/useWaveSound";
import { Card, CardContent } from "@/components/ui/card";

interface WaveControlsProps {
  speed: number;
  setSpeed: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  frequency: number;
  setFrequency: (value: number) => void;
  onSave: () => void;
  className?: string;
}

export function WaveControls({
  speed,
  setSpeed,
  height,
  setHeight,
  frequency,
  setFrequency,
  onSave,
  className = "",
}: WaveControlsProps) {

  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="wave-speed" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wave Speed: {speed.toFixed(1)}
              </label>
              <span className="text-xs text-muted-foreground">0.5 - 5</span>
            </div>
            <Slider
              id="wave-speed"
              min={0.5}
              max={5}
              step={0.1}
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
              aria-label="Wave speed slider"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="wave-height" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wave Height: {height}
              </label>
              <span className="text-xs text-muted-foreground">10 - 100</span>
            </div>
            <Slider
              id="wave-height"
              min={10}
              max={100}
              step={1}
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
              aria-label="Wave height slider"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="wave-frequency" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wave Frequency: {frequency.toFixed(3)}
              </label>
              <span className="text-xs text-muted-foreground">0.005 - 0.05</span>
            </div>
            <Slider
              id="wave-frequency"
              min={0.005}
              max={0.05}
              step={0.001}
              value={[frequency]}
              onValueChange={(value) => setFrequency(value[0])}
              aria-label="Wave frequency slider"
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={onSave}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Design
            </Button>
        
          </div>
        </div>
      </CardContent>
    </Card>
  );
}