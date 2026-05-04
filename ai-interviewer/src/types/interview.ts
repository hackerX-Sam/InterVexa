// Interview types and interfaces

export type InterviewCategory = 'technical' | 'behavioral' | 'coding' | 'system-design';
export type DifficultyLevel = 'junior' | 'mid' | 'senior' | 'expert';
export type InterviewStatus = 'idle' | 'setup' | 'in-progress' | 'completed';
export type MessageRole = 'ai' | 'user';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  questionNumber?: number;
  feedback?: string;
  score?: number;
}

export interface InterviewSession {
  id: string;
  category: InterviewCategory;
  difficulty: DifficultyLevel;
  role: string;
  company?: string;
  status: InterviewStatus;
  messages: Message[];
  currentQuestion: number;
  totalQuestions: number;
  startTime?: Date;
  endTime?: Date;
  scores: number[];
  codeSubmissions?: CodeSubmission[];
}

export interface CodeSubmission {
  questionId: string;
  language: string;
  code: string;
  output?: string;
  passed?: boolean;
}

export interface PerformanceReport {
  sessionId: string;
  overallScore: number;
  categoryScores: {
    clarity: number;
    technical: number;
    communication: number;
    problemSolving: number;
    confidence: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  questionBreakdown: QuestionResult[];
  duration: number;
}

export interface QuestionResult {
  question: string;
  answer: string;
  score: number;
  feedback: string;
}

export interface UserStats {
  totalInterviews: number;
  averageScore: number;
  streakDays: number;
  totalQuestions: number;
  categoryStats: Record<InterviewCategory, { count: number; avgScore: number }>;
  recentSessions: RecentSession[];
}

export interface RecentSession {
  id: string;
  category: InterviewCategory;
  difficulty: DifficultyLevel;
  role: string;
  score: number;
  date: string;
  duration: number;
}

export interface CategoryConfig {
  id: InterviewCategory;
  label: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  topics: string[];
}
