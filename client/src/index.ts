import type React from 'react';
export interface User {
  id: string;
  name: string;
  avatar: string;
  days: number;
  points: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
  lessons: number;
  estimatedTime: string;
  icon?: React.ReactNode;
}

export interface SubTopic {
  id: string;
  name: string;
  description: string;
  progress: number;
  lessons: number;
  duration: string;
  difficulty: string;
}

export interface Module {
  id: string;
  name: string;
  type: 'theory' | 'practice' | 'assessment';
  status: 'completed' | 'in-progress' | 'locked';
  duration: string;
  description: string;
}

export interface Exercise {
  id: string;
  question: string;
  equation?: string;
  options: {
    value: string;
    label: string;
  }[];
  correctAnswer: string;
  hint?: {
    from: string;
    text: string;
    steps: string[];
  };
  progress: number;
  skillAnalysis?: {
    strengths: string[];
    weaknesses: string[];
  };
}

export interface HistoricalFigure {
  name: string;
  title: string;
  years: string;
  image: string;
}
