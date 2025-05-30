export interface WaveDesign {
  id: string;
  name: string;
  speed: number;
  height: number;
  frequency: number;
  background: string | null;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  expiresAt: string;
  completed?: boolean;
  score?: number;
}