'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Send, Volume2, VolumeX, RotateCcw,
  Play, X, Code2, 
  MessageSquare, Brain, Clock, BarChart2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { InterviewProvider, useInterview } from '@/context/InterviewContext';
import { InterviewCategory, DifficultyLevel } from '@/types/interview';
import styles from './interview.module.css';
import Link from 'next/link';

// ─── Setup Screen ─────────────────────────────────────────────────────────────
function SetupScreen({ onStart }: { onStart: () => void }) {
  const { startSession, state, setApiKey } = useInterview();
  const [category, setCategory] = useState<InterviewCategory>('technical');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('mid');
  const [role, setRole] = useState('Software Engineer');
  const [company, setCompany] = useState('');
  const [apiKey, setApiKeyLocal] = useState(state.apiKey || '');

  const categories: { id: InterviewCategory; label: string; icon: string; desc: string }[] = [
    { id: 'technical', label: 'Technical', icon: '⚡', desc: 'DSA & System Design' },
    { id: 'behavioral', label: 'Behavioral', icon: '🎯', desc: 'STAR Method' },
    { id: 'coding', label: 'Coding', icon: '💻', desc: 'Live Problems' },
    { id: 'system-design', label: 'System Design', icon: '🏗️', desc: 'Architecture' },
  ];

  const difficulties: { id: DifficultyLevel; label: string; color: string }[] = [
    { id: 'junior', label: 'Junior', color: '#10b981' },
    { id: 'mid', label: 'Mid-Level', color: '#00d4ff' },
    { id: 'senior', label: 'Senior', color: '#8b5cf6' },
    { id: 'expert', label: 'Expert', color: '#f472b6' },
  ];

  const handleStart = () => {
    setApiKey(apiKey);
    startSession(category, difficulty, role, company || undefined);
    onStart();
  };

  return (
    <div className={styles.setupScreen}>
      <div className={styles.setupCard}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.setupHeader}>
          <div className={styles.setupIconWrap}>
            <Brain size={28} color="#00d4ff" />
          </div>
          <h1 className={styles.setupTitle}>Configure Your Interview</h1>
          <p className={styles.setupSubtitle}>Set up your personalized AI interview session</p>
        </motion.div>

        <div className={styles.setupBody}>
          {/* API Key */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={styles.formGroup}>
            <label className={styles.label}>OpenAI API Key</label>
            <input
              type="password"
              className="input-glass"
              placeholder="sk-... (required for AI responses)"
              value={apiKey}
              onChange={e => setApiKeyLocal(e.target.value)}
            />
            <p className={styles.hint}>Your key is never stored — used only for this session.</p>
          </motion.div>

          {/* Role & Company */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Target Role</label>
              <input
                type="text"
                className="input-glass"
                placeholder="e.g. Software Engineer"
                value={role}
                onChange={e => setRole(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company (Optional)</label>
              <input
                type="text"
                className="input-glass"
                placeholder="e.g. Google, Meta, Stripe"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Category */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className={styles.formGroup}>
            <label className={styles.label}>Interview Category</label>
            <div className={styles.categoryPills}>
              {categories.map(c => (
                <button
                  key={c.id}
                  className={`${styles.pill} ${category === c.id ? styles.pillActive : ''}`}
                  onClick={() => setCategory(c.id)}
                >
                  <span>{c.icon}</span>
                  <div>
                    <div className={styles.pillLabel}>{c.label}</div>
                    <div className={styles.pillDesc}>{c.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Difficulty */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className={styles.formGroup}>
            <label className={styles.label}>Difficulty Level</label>
            <div className={styles.difficultyPills}>
              {difficulties.map(d => (
                <button
                  key={d.id}
                  className={`${styles.diffPill} ${difficulty === d.id ? styles.diffPillActive : ''}`}
                  style={difficulty === d.id ? { borderColor: d.color, color: d.color, background: `${d.color}15` } : {}}
                  onClick={() => setDifficulty(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`btn-glow ${styles.startBtn}`}
            onClick={handleStart}
            disabled={!role.trim()}
          >
            <Play size={16} />
            Start Interview Session
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Avatar Component ──────────────────────────────────────────────────────────
function AIAvatar({ isSpeaking, isThinking }: { isSpeaking: boolean; isThinking: boolean }) {
  return (
    <div className={styles.avatar}>
      <div className={`${styles.avatarRing} ${isSpeaking ? styles.avatarRingActive : ''}`}>
        <div className={styles.avatarInner}>
          <div className={styles.avatarFace}>
            <Brain size={28} color="#00d4ff" />
          </div>
          {isThinking && (
            <div className={styles.thinkingRipple} />
          )}
        </div>
      </div>
      <div className={styles.avatarStatus}>
        <div className={`${styles.statusDot} ${isThinking ? styles.statusThinking : isSpeaking ? styles.statusSpeaking : styles.statusIdle}`} />
        <span>{isThinking ? 'Thinking...' : isSpeaking ? 'Speaking' : 'Listening'}</span>
      </div>
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className={styles.typingIndicator}>
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ message, isLatest }: { message: { role: string; content: string; id: string; timestamp: Date; isTyping?: boolean }; isLatest: boolean }) {
  const isAI = message.role === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`${styles.messageBubble} ${isAI ? styles.aiBubble : styles.userBubble}`}
    >
      {isAI && (
        <div className={styles.bubbleAvatar}>
          <Brain size={14} color="#00d4ff" />
        </div>
      )}
      <div className={`${styles.bubbleContent} ${isAI ? styles.aiContent : styles.userContent}`}>
        {message.isTyping ? (
          <TypingIndicator />
        ) : (
          <p className={styles.bubbleText}>{message.content}</p>
        )}
        <div className={styles.bubbleTime}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Interview Interface ─────────────────────────────────────────────────
function InterviewInterface() {
  const { state, addMessage, updateMessage, setLoading, setError, endSession, incrementQuestion, addScore } = useInterview();
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const session = state.currentSession!;

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages]);

  // Session timer
  useEffect(() => {
    timerRef.current = setInterval(() => setSessionTime(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Auto-start: send initial greeting
  useEffect(() => {
    if (session.messages.length === 0) {
      sendToAI('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const sendToAI = useCallback(async (userText: string) => {
    setIsThinking(true);
    setLoading(true);

    // Add typing placeholder
    const typingId = addMessage({ role: 'ai', content: '', isTyping: true });

    try {
      const conversationMessages = session.messages
        .filter(m => !m.isTyping)
        .map(m => ({ role: m.role, content: m.content }));

      if (userText) {
        conversationMessages.push({ role: 'user', content: userText });
      }

      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationMessages,
          category: session.category,
          difficulty: session.difficulty,
          role: session.role,
          apiKey: state.apiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to get AI response');

      const { content, parsedContent } = data;

      // Update placeholder with real content
      updateMessage(typingId, {
        content: parsedContent.question || content,
        isTyping: false,
      });

      // Track score if present
      if (parsedContent.score !== null && userText) {
        addScore(parsedContent.score);
        incrementQuestion();
      }

      // TTS
      if (isTTSEnabled && parsedContent.question) {
        const utterance = new SpeechSynthesisUtterance(parsedContent.question);
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.onstart = () => setIsAISpeaking(true);
        utterance.onend = () => setIsAISpeaking(false);
        speechSynthesis.speak(utterance);
      }

    } catch (err) {
      updateMessage(typingId, {
        content: state.apiKey
          ? `Error: ${err instanceof Error ? err.message : 'Something went wrong'}. Please check your API key.`
          : "⚠️ No API key configured. Please add your OpenAI API key in Settings or restart the session with your key.",
        isTyping: false,
      });
    } finally {
      setIsThinking(false);
      setLoading(false);
    }
  }, [session, state.apiKey, isTTSEnabled, addMessage, updateMessage, setLoading, addScore, incrementQuestion]);

  const handleSend = async () => {
    const text = userInput.trim();
    if (!text || state.isLoading) return;
    setUserInput('');
    addMessage({ role: 'user', content: text });
    await sendToAI(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Speech recognition
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const transcript = Array.from(e.results as ArrayLike<{ [i: number]: { transcript: string } }>)
        .map((r) => r[0].transcript)
        .join('');
      setUserInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const progress = Math.min((session.currentQuestion / session.totalQuestions) * 100, 100);

  return (
    <div className={styles.interviewLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <AIAvatar isSpeaking={isAISpeaking} isThinking={isThinking} />

        <div className={styles.divider} />

        {/* Session Info */}
        <div className={styles.sessionInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Category</span>
            <span className={`badge badge-blue ${styles.infoBadge}`}>{session.category}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Level</span>
            <span className={`badge badge-purple ${styles.infoBadge}`}>{session.difficulty}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Role</span>
            <span className={styles.infoValue}>{session.role}</span>
          </div>
          {session.company && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Company</span>
              <span className={styles.infoValue}>{session.company}</span>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Progress */}
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.infoLabel}>Progress</span>
            <span className={styles.progressCount}>{session.currentQuestion}/{session.totalQuestions}</span>
          </div>
          <div className="progress-bar" style={{ marginTop: 8 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className={styles.divider} />

        {/* Timer */}
        <div className={styles.timerSection}>
          <Clock size={14} color="#8892b0" />
          <span className={styles.timerValue}>{formatTime(sessionTime)}</span>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={`${styles.controlBtn} ${isTTSEnabled ? styles.controlActive : ''}`}
            onClick={() => setIsTTSEnabled(v => !v)}
            title="Toggle voice output"
          >
            {isTTSEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          {session.category === 'coding' && (
            <button
              className={`${styles.controlBtn} ${showCode ? styles.controlActive : ''}`}
              onClick={() => setShowCode(v => !v)}
              title="Toggle code editor"
            >
              <Code2 size={16} />
            </button>
          )}
          <button className={styles.controlBtn} onClick={() => endSession()} title="End session">
            <X size={16} />
          </button>
        </div>
      </aside>

      {/* Chat Area */}
      <div className={styles.chatArea}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.chatTitle}>
            <MessageSquare size={16} color="#00d4ff" />
            <span>AI Interview Session</span>
          </div>
          <div className={styles.chatMeta}>
            <div className={styles.liveIndicator}>
              <div className={styles.liveDot} />
              <span>LIVE</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          <AnimatePresence>
            {session.messages.map((msg, i) => (
              <MessageBubble key={msg.id} message={msg} isLatest={i === session.messages.length - 1} />
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              className={styles.chatInput}
              placeholder={isListening ? 'Listening...' : 'Type your answer or use the mic...'}
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              disabled={state.isLoading}
            />
            <div className={styles.inputActions}>
              <button
                className={`${styles.micBtn} ${isListening ? styles.micActive : ''}`}
                onClick={toggleListening}
                title="Voice input"
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button
                className={styles.sendBtn}
                onClick={handleSend}
                disabled={!userInput.trim() || state.isLoading}
              >
                <Send size={16} />
                <span>Send</span>
              </button>
            </div>
          </div>
          <p className={styles.inputHint}>
            Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Completed Screen ──────────────────────────────────────────────────────────
function CompletedScreen() {
  const { state } = useInterview();
  const session = state.currentSession!;
  const avgScore = session.scores.length > 0
    ? Math.round(session.scores.reduce((a, b) => a + b, 0) / session.scores.length * 10)
    : 0;

  return (
    <div className={styles.completedScreen}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.completedCard}
      >
        <div className={styles.completedIcon}>🎉</div>
        <h2 className={styles.completedTitle}>Interview Complete!</h2>
        <p className={styles.completedSubtitle}>
          Great job completing your {session.category} interview for {session.role}.
        </p>
        <div className={styles.completedScore}>
          <div className={styles.scoreRing}>
            <span className={styles.scoreValue}>{avgScore}%</span>
          </div>
          <p>Overall Score</p>
        </div>
        <div className={styles.completedActions}>
          <Link href="/analytics" className="btn-glow">
            <BarChart2 size={16} />
            View Full Report
          </Link>
          <Link href="/interview" className="btn-outline">
            <RotateCcw size={16} />
            Try Again
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Interview Page ────────────────────────────────────────────────────────────
function InterviewContent() {
  const { state } = useInterview();
  const [phase, setPhase] = useState<'setup' | 'interview' | 'completed'>('setup');

  useEffect(() => {
    if (state.currentSession?.status === 'completed') {
      setPhase('completed');
    }
  }, [state.currentSession?.status]);

  return (
    <main className={styles.main}>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {phase !== 'interview' && <Navbar />}

      <div className={styles.pageContent} style={{ paddingTop: phase === 'interview' ? 0 : '64px' }}>
        <AnimatePresence mode="wait">
          {phase === 'setup' && (
            <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SetupScreen onStart={() => setPhase('interview')} />
            </motion.div>
          )}
          {phase === 'interview' && state.currentSession && (
            <motion.div key="interview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100vh' }}>
              <InterviewInterface />
            </motion.div>
          )}
          {phase === 'completed' && (
            <motion.div key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CompletedScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function InterviewPage() {
  return (
    <InterviewProvider>
      <InterviewContent />
    </InterviewProvider>
  );
}
