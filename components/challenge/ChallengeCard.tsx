"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Challenge } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface ChallengeCardProps {
  challenge: Challenge;
  isActive: boolean;
  onAccept: (challenge: Challenge) => void;
}

export function ChallengeCard({ 
  challenge, 
  isActive, 
  onAccept 
}: ChallengeCardProps) {
  const timeLeft = challenge.expiresAt ? new Date(challenge.expiresAt).getTime() - Date.now() : 0;
  const hoursLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60)));
  const isExpired = timeLeft <= 0;
  
  const totalDuration = 24 * 60 * 60 * 1000; 
  const elapsedTime = totalDuration - timeLeft;
  const progressPercentage = Math.min(100, Math.max(0, (elapsedTime / totalDuration) * 100));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`overflow-hidden h-full ${isActive ? 'border-primary' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-chart-1" />
                {challenge.title}
              </CardTitle>
              <CardDescription className="mt-1">
                {challenge.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {!isExpired ? (
              <>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Time remaining</span>
                  <span>{hoursLeft} hours left</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                Expired {formatDistanceToNow(new Date(challenge.expiresAt), { addSuffix: true })}
              </div>
            )}
            
            {challenge.completed && (
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Your score:</span>
                <span className="font-medium">{challenge.score}/100</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => onAccept(challenge)}
            disabled={isExpired && !challenge.completed}
          >
            {challenge.completed ? (
              <>View Your Design</>
            ) : isExpired ? (
              <>Expired</>
            ) : (
              <>Accept Challenge <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}