'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done' | 'hidden'>('loading');

  useEffect(() => {
    // Simulate loading progress
    const steps = [
      { target: 30, delay: 200 },
      { target: 55, delay: 500 },
      { target: 75, delay: 900 },
      { target: 90, delay: 1400 },
      { target: 100, delay: 1900 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ target, delay }) => {
      const t = setTimeout(() => {
        setProgress(target);
      }, delay);
      timers.push(t);
    });

    // After reaching 100%, trigger exit animation
    const doneTimer = setTimeout(() => {
      setPhase('done');
    }, 2300);

    // After exit animation, remove from DOM
    const hideTimer = setTimeout(() => {
      setPhase('hidden');
    }, 3100);

    timers.push(doneTimer, hideTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div className={`${styles.overlay} ${phase === 'done' ? styles.exit : ''}`}>
      {/* Animated background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Grid overlay */}
      <div className={styles.grid} />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className={styles.particle} style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          opacity: 0.2 + Math.random() * 0.5,
        }} />
      ))}

      {/* Center content */}
      <div className={styles.content}>
        {/* Logo ring */}
        <div className={styles.logoRing}>
          <svg className={styles.ringSvg} viewBox="0 0 200 200">
            <circle
              cx="100" cy="100" r="88"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              className={styles.ringDash}
            />
            <circle
              cx="100" cy="100" r="76"
              fill="none"
              stroke="rgba(139,92,246,0.3)"
              strokeWidth="1"
              strokeDasharray="4 8"
              className={styles.ringDash2}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Orbiting dot */}
          <div className={styles.orbitDot} />

          {/* Logo */}
          <div className={styles.logoWrap}>
            <img
              src="https://ik.imagekit.io/logicsync/company%20logo.png?updatedAt=1776027301470"
              alt="InterVexa Logo"
              className={styles.logo}
            />
            <div className={styles.logoGlow} />
          </div>
        </div>

        {/* Brand name */}
        <div className={styles.brandName}>
          <span className={styles.brandGrad}>Inter</span>
          <span className={styles.brandWhite}>vexa</span>
        </div>

        <p className={styles.tagline}>AI-Powered Interview Simulator</p>

        {/* Progress section */}
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
            <div
              className={styles.progressGlow}
              style={{ left: `${progress}%` }}
            />
          </div>
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>Initializing</span>
            <span className={styles.progressPct}>{progress}%</span>
          </div>
        </div>

        {/* Animated dots */}
        <div className={styles.dots}>
          <span className={styles.dot} style={{ animationDelay: '0s' }} />
          <span className={styles.dot} style={{ animationDelay: '0.2s' }} />
          <span className={styles.dot} style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
