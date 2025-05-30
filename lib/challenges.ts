import { Challenge } from "@/lib/types";

const challengeTemplates = [
  {
    title: "Gentle Breeze",
    description: "Create a calming wave with minimal height and slow speed"
  },
  {
    title: "Storm Surge",
    description: "Design a powerful wave with high frequency and speed"
  },
  {
    title: "Morning Tide",
    description: "Create a balanced wave pattern with a sunrise background"
  },
  {
    title: "Deep Ocean",
    description: "Design a slow, powerful wave with significant height"
  },
  {
    title: "Coastal Rhythm",
    description: "Create a wave with medium speed and consistent frequency"
  },
  {
    title: "Twilight Ripples",
    description: "Design gentle, frequent waves against a sunset backdrop"
  },
  {
    title: "Island Shores",
    description: "Create waves that would lap against a tropical beach"
  },
  {
    title: "Harbor Calm",
    description: "Design the gentle wave pattern found in a protected harbor"
  },
  {
    title: "Stormy Weather",
    description: "Create chaotic, high-energy waves during a storm"
  },
  {
    title: "Tidal Force",
    description: "Design a wave showcasing the power of tidal energy"
  }
];

export function generateDailyChallenges(date: Date): Challenge[] {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  
  const getRandomIndex = () => {
    const x = Math.sin(seed * challengeTemplates.length) * 10000;
    return Math.floor((x - Math.floor(x)) * challengeTemplates.length);
  };
  
  const indices = new Set<number>();
  while (indices.size < 3) {
    const index = (getRandomIndex() + indices.size) % challengeTemplates.length;
    indices.add(index);
  }
  
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 1); 
  
  return Array.from(indices).map((index, i) => {
    const template = challengeTemplates[index];
    return {
      id: `challenge_${date.toISOString().split('T')[0]}_${i}`,
      title: template.title,
      description: template.description,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      completed: false
    };
  });
}