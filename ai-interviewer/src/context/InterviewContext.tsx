'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { 
  InterviewSession, Message, PerformanceReport, UserStats, 
  InterviewCategory, DifficultyLevel 
} from '@/types/interview';

interface InterviewState {
  currentSession: InterviewSession | null;
  sessions: InterviewSession[];
  userStats: UserStats;
  performanceReport: PerformanceReport | null;
  isLoading: boolean;
  error: string | null;
  apiKey: string;
}

type Action =
  | { type: 'START_SESSION'; payload: InterviewSession }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; updates: Partial<Message> } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_REPORT'; payload: PerformanceReport }
  | { type: 'END_SESSION' }
  | { type: 'SET_API_KEY'; payload: string }
  | { type: 'INCREMENT_QUESTION' }
  | { type: 'ADD_SCORE'; payload: number };

const mockStats: UserStats = {
  totalInterviews: 12,
  averageScore: 78,
  streakDays: 5,
  totalQuestions: 89,
  categoryStats: {
    technical: { count: 5, avgScore: 82 },
    behavioral: { count: 4, avgScore: 75 },
    coding: { count: 2, avgScore: 70 },
    'system-design': { count: 1, avgScore: 68 },
  },
  recentSessions: [
    { id: '1', category: 'technical', difficulty: 'senior', role: 'Software Engineer', score: 85, date: '2026-05-03', duration: 35 },
    { id: '2', category: 'behavioral', difficulty: 'mid', role: 'Product Manager', score: 78, date: '2026-05-02', duration: 28 },
    { id: '3', category: 'coding', difficulty: 'junior', role: 'Frontend Developer', score: 72, date: '2026-05-01', duration: 42 },
    { id: '4', category: 'technical', difficulty: 'expert', role: 'Staff Engineer', score: 88, date: '2026-04-30', duration: 55 },
    { id: '5', category: 'behavioral', difficulty: 'senior', role: 'Engineering Manager', score: 76, date: '2026-04-28', duration: 30 },
  ],
};

const initialState: InterviewState = {
  currentSession: null,
  sessions: [],
  userStats: mockStats,
  performanceReport: null,
  isLoading: false,
  error: null,
  apiKey: '',
};

function reducer(state: InterviewState, action: Action): InterviewState {
  switch (action.type) {
    case 'START_SESSION':
      return { ...state, currentSession: action.payload, performanceReport: null, error: null };
    case 'ADD_MESSAGE':
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          messages: [...state.currentSession.messages, action.payload],
        },
      };
    case 'UPDATE_MESSAGE':
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          messages: state.currentSession.messages.map(m =>
            m.id === action.payload.id ? { ...m, ...action.payload.updates } : m
          ),
        },
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_REPORT':
      return { ...state, performanceReport: action.payload };
    case 'END_SESSION':
      if (!state.currentSession) return state;
      return {
        ...state,
        sessions: [...state.sessions, { ...state.currentSession, status: 'completed' }],
        currentSession: { ...state.currentSession, status: 'completed' },
      };
    case 'SET_API_KEY':
      return { ...state, apiKey: action.payload };
    case 'INCREMENT_QUESTION':
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          currentQuestion: state.currentSession.currentQuestion + 1,
        },
      };
    case 'ADD_SCORE':
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          scores: [...state.currentSession.scores, action.payload],
        },
      };
    default:
      return state;
  }
}

interface InterviewContextValue {
  state: InterviewState;
  startSession: (category: InterviewCategory, difficulty: DifficultyLevel, role: string, company?: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => string;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setReport: (report: PerformanceReport) => void;
  endSession: () => void;
  setApiKey: (key: string) => void;
  incrementQuestion: () => void;
  addScore: (score: number) => void;
}

const InterviewContext = createContext<InterviewContextValue | null>(null);

export function InterviewProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startSession = useCallback((category: InterviewCategory, difficulty: DifficultyLevel, role: string, company?: string) => {
    const session: InterviewSession = {
      id: `session-${Date.now()}`,
      category,
      difficulty,
      role,
      company,
      status: 'in-progress',
      messages: [],
      currentQuestion: 0,
      totalQuestions: 8,
      startTime: new Date(),
      scores: [],
    };
    dispatch({ type: 'START_SESSION', payload: session });
  }, []);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>): string => {
    const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    dispatch({ type: 'ADD_MESSAGE', payload: { ...message, id, timestamp: new Date() } });
    return id;
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    dispatch({ type: 'UPDATE_MESSAGE', payload: { id, updates } });
  }, []);

  const setLoading = useCallback((loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }), []);
  const setError = useCallback((error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }), []);
  const setReport = useCallback((report: PerformanceReport) => dispatch({ type: 'SET_REPORT', payload: report }), []);
  const endSession = useCallback(() => dispatch({ type: 'END_SESSION' }), []);
  const setApiKey = useCallback((key: string) => dispatch({ type: 'SET_API_KEY', payload: key }), []);
  const incrementQuestion = useCallback(() => dispatch({ type: 'INCREMENT_QUESTION' }), []);
  const addScore = useCallback((score: number) => dispatch({ type: 'ADD_SCORE', payload: score }), []);

  return (
    <InterviewContext.Provider value={{
      state, startSession, addMessage, updateMessage, setLoading,
      setError, setReport, endSession, setApiKey, incrementQuestion, addScore
    }}>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const ctx = useContext(InterviewContext);
  if (!ctx) throw new Error('useInterview must be used within InterviewProvider');
  return ctx;
}
