"use client";

import { useState } from "react";
import { Play, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { WaveDesign } from "@/lib/types";

interface SavedDesignCardProps {
  design: WaveDesign;
  onDelete: (id: string) => void;
  onPlay: (design: WaveDesign) => void;
}

export function SavedDesignCard({ 
  design, 
  onDelete, 
  onPlay 
}: SavedDesignCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="overflow-hidden h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="relative h-32 w-full overflow-hidden"
          style={{
            backgroundImage: design.background ? `url(${design.background})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Wave preview overlay */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Play button overlay on hover */}
          {isHovered && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button 
                size="sm" 
                variant="secondary"
                className="rounded-full"
                onClick={() => onPlay(design)}
              >
                <Play className="h-4 w-4 mr-1" />
                Play
              </Button>
            </motion.div>
          )}
        </div>
        
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base">
            {design.name || "Untitled Design"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 text-sm flex-grow">
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-muted-foreground">
            <div>Speed:</div>
            <div className="text-right">{design.speed.toFixed(1)}</div>
            
            <div>Height:</div>
            <div className="text-right">{design.height}</div>
            
            <div>Frequency:</div>
            <div className="text-right">{design.frequency.toFixed(3)}</div>
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground">
            Created {formatDistanceToNow(new Date(design.createdAt), { addSuffix: true })}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full"
            onClick={() => onDelete(design.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}