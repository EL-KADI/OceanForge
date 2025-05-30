"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Challenge } from "@/lib/types";

interface ChallengeScoreChartProps {
  challenges: Challenge[];
}

export function ChallengeScoreChart({ challenges }: ChallengeScoreChartProps) {
  const completedChallenges = useMemo(() => {
    return challenges
      .filter(
        (challenge) =>
          challenge.completed &&
          typeof challenge.score === "number" &&
          typeof challenge.title === "string"
      )
      .slice(-5)
      .map((challenge) => ({
        name:
          challenge.title.length > 15
            ? challenge.title.substring(0, 15) + "..."
            : challenge.title,
        score: challenge.score,
        fullTitle: challenge.title,
      }));
  }, [challenges]);

  const chartBarColor = "hsl(var(--chart-1))";

  if (completedChallenges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Challenge Scores</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">
            Complete challenges to see your scores here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Challenge Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] dark:bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={completedChallenges}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                stroke="var(--muted-foreground)"
              />
              <YAxis domain={[0, 100]} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: number) => [`${value}/100`, "Score"]}
                labelFormatter={(label: string, payload: any[]) => {
                  return (
                    (payload[0]?.payload?.fullTitle as string) ||
                    label ||
                    "Unknown"
                  );
                }}
              />
              <Bar dataKey="score" fill={chartBarColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
