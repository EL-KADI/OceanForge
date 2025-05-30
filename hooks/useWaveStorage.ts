"use client";

import { useState, useEffect } from "react";
import { WaveDesign } from "@/lib/types";

export function useWaveStorage() {
  const [designs, setDesigns] = useState<WaveDesign[]>([]);
  
  useEffect(() => {
    const loadDesigns = () => {
      try {
        const savedDesigns = localStorage.getItem("wave_designs");
        if (savedDesigns) {
          setDesigns(JSON.parse(savedDesigns));
        }
      } catch (error) {
        console.error("Error loading saved designs:", error);
      }
    };
    
    loadDesigns();
  }, []);
  
  const saveDesign = (design: Omit<WaveDesign, "id" | "createdAt">) => {
    try {
      const newDesign: WaveDesign = {
        ...design,
        id: `design_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      
      const updatedDesigns = [...designs, newDesign];
      setDesigns(updatedDesigns);
      localStorage.setItem("wave_designs", JSON.stringify(updatedDesigns));
      
      return newDesign;
    } catch (error) {
      console.error("Error saving design:", error);
      return null;
    }
  };
  
  const deleteDesign = (id: string) => {
    try {
      const updatedDesigns = designs.filter((design) => design.id !== id);
      setDesigns(updatedDesigns);
      localStorage.setItem("wave_designs", JSON.stringify(updatedDesigns));
      return true;
    } catch (error) {
      console.error("Error deleting design:", error);
      return false;
    }
  };
  
  return {
    designs,
    saveDesign,
    deleteDesign,
  };
}