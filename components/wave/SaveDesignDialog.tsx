"use client";

import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { WaveDesign } from "@/lib/types";

interface SaveDesignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  design: Omit<WaveDesign, 'id' | 'name' | 'createdAt'>;
}

export function SaveDesignDialog({
  isOpen,
  onClose,
  onSave,
  design,
}: SaveDesignDialogProps) {
  const [designName, setDesignName] = useState("");

  const handleSave = () => {
    onSave(designName.trim() || "Untitled Design");
    setDesignName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Your Wave Design</DialogTitle>
          <DialogDescription>
            Give your design a name to remember it by.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="My awesome wave"
              className="col-span-3"
              autoFocus
            />
          </div>
          
          <div className="rounded-md bg-muted p-3">
            <div className="text-sm font-medium mb-2">Wave Properties</div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
              <div className="text-muted-foreground">Speed:</div>
              <div>{design.speed.toFixed(1)}</div>
              
              <div className="text-muted-foreground">Height:</div>
              <div>{design.height}</div>
              
              <div className="text-muted-foreground">Frequency:</div>
              <div>{design.frequency.toFixed(3)}</div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Design</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}