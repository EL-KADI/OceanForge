"use client";

import { useState } from "react";
import { useWaveStorage } from "@/hooks/useWaveStorage";
import { SavedDesignCard } from "@/components/wave/SavedDesignCard";
import { WaveCanvas } from "@/components/wave/WaveCanvas";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WaveDesign } from "@/lib/types";
import { AlertTriangle } from "lucide-react";

export default function SavedDesignsPage() {
  const { designs, deleteDesign } = useWaveStorage();
  const { toast } = useToast();

  const [previewDesign, setPreviewDesign] = useState<WaveDesign | null>(null);

  const [designToDelete, setDesignToDelete] = useState<string | null>(null);

  const handleDeleteDesign = (id: string) => {
    setDesignToDelete(id);
  };

  const confirmDelete = () => {
    if (!designToDelete) return;

    const success = deleteDesign(designToDelete);

    if (success) {
      toast({
        title: "Design deleted",
        description: "The design has been removed from your collection.",
      });
    } else {
      toast({
        title: "Error deleting design",
        description:
          "There was a problem deleting your design. Please try again.",
        variant: "destructive",
      });
    }

    setDesignToDelete(null);
  };

  const handlePlayDesign = (design: WaveDesign) => {
    setPreviewDesign(design);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Saved Designs</h1>
      <p className="text-muted-foreground mb-8">
        Your collection of ocean wave designs
      </p>

      {designs.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-muted/30">
          <AlertTriangle className="h-10 w-10 mx-auto text-muted-foreground" />
          <h2 className="mt-4 text-xl font-medium">No designs saved yet</h2>
          <p className="mt-2 text-muted-foreground">
            Create and save some wave designs to see them here
          </p>
          <Button
            variant="default"
            className="mt-6"
            onClick={() => (window.location.href = "/")}
          >
            Create a Design
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {designs.map((design) => (
            <SavedDesignCard
              key={design.id}
              design={design}
              onDelete={handleDeleteDesign}
              onPlay={handlePlayDesign}
            />
          ))}
        </div>
      )}

      <Dialog
        open={!!previewDesign}
        onOpenChange={() => setPreviewDesign(null)}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {previewDesign?.name || "Untitled Design"}
            </DialogTitle>
            <DialogDescription>
              Preview of your saved wave design
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {previewDesign && (
              <WaveCanvas
                speed={previewDesign.speed}
                height={previewDesign.height}
                frequency={previewDesign.frequency}
                background={previewDesign.background ?? undefined}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!designToDelete}
        onOpenChange={() => setDesignToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this design? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setDesignToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
