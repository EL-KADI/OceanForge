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
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChallengeScoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (score: number) => void;
  challengeTitle: string;
}

export function ChallengeScoreDialog({
  isOpen,
  onClose,
  onSave,
  challengeTitle,
}: ChallengeScoreDialogProps) {
  const [score, setScore] = useState(75);
  const [isSaving, setIsSaving] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setShowCelebration(true);

    setTimeout(() => {
      onSave(score);
      setIsSaving(false);

      setTimeout(() => {
        setShowCelebration(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Exceptional!";
    if (score >= 80) return "Excellent!";
    if (score >= 70) return "Great job!";
    if (score >= 60) return "Good work!";
    if (score >= 50) return "Nice effort!";
    return "Keep practicing!";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isSaving && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        {showCelebration ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="h-16 w-16 text-chart-1 mb-4" />
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Challenge Completed!
            </motion.h2>

            <motion.div
              className="flex items-center justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-4xl font-bold">{score}</div>
              <div className="text-2xl ml-1">/100</div>
            </motion.div>

            <motion.div
              className="text-muted-foreground text-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {getScoreLabel(score)}
            </motion.div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Rate Your Challenge Design</DialogTitle>
              <DialogDescription>
                How well did you meet the “{challengeTitle}” challenge?
              </DialogDescription>
            </DialogHeader>

            <div className="py-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Your score
                </span>
                <div className="flex items-center">
                  <span className="font-medium text-lg">{score}</span>
                  <span className="text-muted-foreground ml-1">/100</span>
                </div>
              </div>

              <div className="relative py-5">
                <Progress value={score} className="h-2" />
                <div className="absolute w-full flex justify-between px-2 mt-2">
                  {[0, 25, 50, 75, 100].map((value) => (
                    <div
                      key={value}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => setScore(value)}
                    >
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full -mt-5",
                          score >= value ? "bg-primary" : "bg-muted"
                        )}
                      />
                      <span className="text-xs mt-1 text-muted-foreground">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center mt-6">
                <Star
                  className={cn(
                    "h-5 w-5 mr-2",
                    score >= 75 ? "text-chart-1" : "text-muted-foreground"
                  )}
                />
                <span className="text-sm">{getScoreLabel(score)}</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Score"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
