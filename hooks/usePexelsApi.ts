"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  photographer: string;
  photographer_url: string;
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
}

const CACHE_EXPIRY = 24 * 60 * 60 * 1000; 
const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export function usePexelsApi(query: string = "ocean", perPage: number = 15) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const cacheKey = `pexels_${query}_${perPage}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (cachedData) {
        try {
          const { data, timestamp } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > CACHE_EXPIRY;
          
          if (!isExpired) {
            setPhotos(data);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("Cache parsing error:", err);
        }
      }
      
      try {
        setIsLoading(true);
        
        if (!API_KEY) {
          throw new Error("Pexels API key is missing");
        }
        
        const response = await axios.get<PexelsResponse>(
          `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );
        
        setPhotos(response.data.photos);
        
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: response.data.photos,
            timestamp: Date.now(),
          })
        );
        
        setError(null);
      } catch (err) {
        console.error("Pexels API error:", err);
        setError("Failed to load images. Using fallback images.");
        
        const fallbackImages = Array(6).fill(0).map((_, i) => ({
          id: i,
          src: {
            medium: `/images/ocean-${(i % 3) + 1}.jpg`,
            tiny: `/images/ocean-${(i % 3) + 1}-thumb.jpg`,
          },
          photographer: "Fallback Image",
        }));
        
        setPhotos(fallbackImages as PexelsPhoto[]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhotos();
  }, [query, perPage]);
  
  return { photos, isLoading, error };
}