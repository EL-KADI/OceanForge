"use client";

import { useState } from "react";
import { WaveCanvas } from "@/components/wave/WaveCanvas";
import { WaveControls } from "@/components/wave/WaveControls";
import { BackgroundSelector } from "@/components/wave/BackgroundSelector";
import { SaveDesignDialog } from "@/components/wave/SaveDesignDialog";
import { usePexelsApi } from "@/hooks/usePexelsApi";
import { useWaveStorage } from "@/hooks/useWaveStorage";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [speed, setSpeed] = useState(1.5);
  const [height, setHeight] = useState(30);
  const [frequency, setFrequency] = useState(0.01);

  const { photos, isLoading } = usePexelsApi("ocean waves", 15);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );

  const { saveDesign } = useWaveStorage();
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const { toast } = useToast();

  const openSaveDialog = () => {
    setIsSaveDialogOpen(true);
  };

  const handleSaveDesign = (name: string) => {
    const design = {
      name,
      speed,
      height,
      frequency,
      background: selectedBackground,
    };

    const savedDesign = saveDesign(design);

    if (savedDesign) {
      toast({
        title: "Design saved",
        description: `"${name}" has been saved to your collection.`,
      });
    } else {
      toast({
        title: "Error saving design",
        description:
          "There was a problem saving your design. Please try again.",
        variant: "destructive",
      });
    }
  };

  useState(() => {
    if (photos.length > 0 && !selectedBackground) {
      setSelectedBackground(photos[0]?.src?.medium || null);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Design Your Ocean Wave
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WaveCanvas
              speed={speed}
              height={height}
              frequency={frequency}
              background={selectedBackground ?? undefined}
              className="mb-6 bg-black"
            />
          </div>

          <div>
            <WaveControls
              speed={speed}
              setSpeed={setSpeed}
              height={height}
              setHeight={setHeight}
              frequency={frequency}
              setFrequency={setFrequency}
              onSave={openSaveDialog}
              className="mb-6"
            />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <BackgroundSelector
          backgrounds={photos}
          selectedBackground={selectedBackground}
          onSelect={setSelectedBackground}
          isLoading={isLoading}
        />
      </section>

      <SaveDesignDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveDesign}
        design={{ speed, height, frequency, background: selectedBackground }}
      />
    </div>
  );
}
