"use client";

import { useState, useEffect } from "react";
import { Challenge } from "@/lib/types";
import { generateDailyChallenges } from "@/lib/challenges";

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  
  useEffect(() => {
    const loadChallenges = () => {
      try {
        const savedChallenges = localStorage.getItem("wave_challenges");
        const lastUpdated = localStorage.getItem("wave_challenges_updated");
        
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        
        if (!savedChallenges || !lastUpdated || parseInt(lastUpdated) < today) {
          const newChallenges = generateDailyChallenges(now);
          
          let existingChallenges: Challenge[] = [];
          try {
            if (savedChallenges) {
              existingChallenges = JSON.parse(savedChallenges);
            }
          } catch (e) {
            console.error("Error parsing saved challenges:", e);
          }
          
          const completedChallenges = existingChallenges.filter(c => c.completed);
          
          const combinedChallenges = [...newChallenges, ...completedChallenges];
          
          setChallenges(combinedChallenges);
          localStorage.setItem("wave_challenges", JSON.stringify(combinedChallenges));
          localStorage.setItem("wave_challenges_updated", today.toString());
        } else {
          setChallenges(JSON.parse(savedChallenges));
        }
      } catch (error) {
        console.error("Error loading challenges:", error);
      }
    };
    
    loadChallenges();
    
    const interval = setInterval(loadChallenges, 1000 * 60 * 60); 
    
    return () => clearInterval(interval);
  }, []);
  
  const completeChallenge = (id: string, score: number) => {
    try {
      const updatedChallenges = challenges.map(challenge => 
        challenge.id === id 
          ? { ...challenge, completed: true, score }
          : challenge
      );
      
      setChallenges(updatedChallenges);
      localStorage.setItem("wave_challenges", JSON.stringify(updatedChallenges));
      return true;
    } catch (error) {
      console.error("Error completing challenge:", error);
      return false;
    }
  };
  
  const setActiveChallenge = (id: string | null) => {
    setActiveChallengeId(id);
  };
  
  const getActiveChallenge = () => {
    return challenges.find(challenge => challenge.id === activeChallengeId) || null;
  };
  
  return {
    challenges,
    activeChallengeId,
    setActiveChallenge,
    getActiveChallenge,
    completeChallenge,
  };
}