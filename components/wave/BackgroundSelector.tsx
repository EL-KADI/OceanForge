"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BackgroundImage {
  id: number;
  src: {
    medium: string;
    tiny: string;
  };
  photographer: string;
}

interface BackgroundSelectorProps {
  backgrounds: BackgroundImage[];
  selectedBackground: string | null;
  onSelect: (background: string) => void;
  isLoading: boolean;
  className?: string;
}

export function BackgroundSelector({
  backgrounds,
  selectedBackground,
  onSelect,
  isLoading,
  className = "",
}: BackgroundSelectorProps) {
  const { toast } = useToast();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleSelect = (background: BackgroundImage) => {
    onSelect(background.src.medium);
    toast({
      title: "Background selected",
      description: `Photo by ${background.photographer}`,
    });
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-medium">Select Background</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-24 w-full rounded-md" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-medium">Select Background</h3>
        {backgrounds.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {backgrounds.map((bg) => (
                <CarouselItem key={bg.id} className="md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    className={cn(
                      "cursor-pointer overflow-hidden rounded-md border-2",
                      selectedBackground === bg.src.medium
                        ? "border-primary"
                        : "border-transparent"
                    )}
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setHoveredId(bg.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleSelect(bg)}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={bg.src.tiny}
                        alt={`Ocean background by ${bg.photographer}`}
                        width={300}
                        height={200}
                        className="h-full w-full object-cover"
                      />
                      {hoveredId === bg.id && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <p className="text-white text-xs p-1">
                            By {bg.photographer}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
          <p className="text-muted-foreground text-center py-6">
            No background images available. Try refreshing the page.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
