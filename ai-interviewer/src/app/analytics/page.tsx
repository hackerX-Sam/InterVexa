'use client';

import { motion } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { TrendingUp, Award, Clock, Zap, ChevronRight, BarChart2, Target, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import styles from './analytics.module.css';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const scoreHistory = [
  { date: 'Apr 28', score: 68, questions: 6 },
  { date: 'Apr 30', score: 72, questions: 7 },
  { date: 'May 1', score: 75, questions: 8 },
  { date: 'May 2', score: 71, questions: 5 },
  { date: 'May 3', score: 82, questions: 8 },
  { date: 'May 4', score: 85, questions: 8 },
];

const radarData = [
  { skill: 'Clarity', score: 82 },
  { skill: 'Technical', score: 75 },
  { skill: 'Communication', score: 88 },
  { skill: 'Problem Solving', score: 72 },
  { skill: 'Confidence', score: 79 },
  { skill: 'Depth', score: 68 },
];

const categoryData = [
  { name: 'Technical', count: 5, avgScore: 82, color: '#00d4ff' },
  { name: 'Behavioral', count: 4, avgScore: 75, color: '#8b5cf6' },
  { name: 'Coding', count: 2, avgScore: 70, color: '#10b981' },
  { name: 'System Design', count: 1, avgScore: 68, color: '#f59e0b' },
];

const weeklyActivity = [
  { day: 'Mon', minutes: 0 },
  { day: 'Tue', minutes: 35 },
  { day: 'Wed', minutes: 0 },
  { day: 'Thu', minutes: 55 },
  { day: 'Fri', minutes: 28 },
  { day: 'Sat', minutes: 42 },
  { day: 'Sun', minutes: 30 },
];

const feedbackItems = [
  { type: 'strength', text: 'Excellent communication skills with clear, structured responses', icon: '✅' },
  { type: 'strength', text: 'Strong problem decomposition — breaks down complex problems logically', icon: '✅' },
  { type: 'strength', text: 'Good use of real-world examples to illustrate concepts', icon: '✅' },
  { type: 'weakness', text: 'Needs more depth in system scalability trade-offs', icon: '⚠️' },
  { type: 'weakness', text: 'Time complexity analysis could be more precise', icon: '⚠️' },
  { type: 'suggestion', text: 'Practice explaining distributed systems concepts with whiteboard diagrams', icon: '💡' },
  { type: 'suggestion', text: 'Review common behavioral frameworks: STAR, CAR, SOAR', icon: '💡' },
];

const recentSessions = [
  { role: 'Software Engineer', company: 'Google', score: 85, category: 'technical', date: 'May 3, 2026', duration: '35 min', trend: +7 },
  { role: 'Product Manager', company: 'Meta', score: 78, category: 'behavioral', date: 'May 2, 2026', duration: '28 min', trend: +3 },
  { role: 'Frontend Dev', company: 'Stripe', score: 72, category: 'coding', date: 'May 1, 2026', duration: '42 min', trend: -2 },
  { role: 'Staff Engineer', company: 'Amazon', score: 88, category: 'technical', date: 'Apr 30, 2026', duration: '55 min', trend: +12 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        <p className={styles.tooltipValue}>{payload[0].value}{typeof payload[0].value === 'number' && payload[0].value <= 100 ? '%' : ' min'}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const overallScore = 78;

  return (
    <main className={styles.main}>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <Navbar />

      <div className={styles.content}>
        <div className="container">
          {/* Header */}
          <motion.div
            className={styles.pageHeader}
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <div className={styles.breadcrumb}>
                <Link href="/">Dashboard</Link>
                <ChevronRight size={14} />
                <span>Analytics</span>
              </div>
              <h1 className={styles.pageTitle}>
                Performance <span className="gradient-text">Analytics</span>
              </h1>
              <p className={styles.pageSubtitle}>Track your progress and identify areas for improvement</p>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.overallScore}>
              <div className={styles.scoreRingLarge}>
                <svg viewBox="0 0 120 120" className={styles.scoreRingSvg}>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - overallScore / 100)}`}
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className={styles.scoreRingInner}>
                  <span className={styles.scoreRingValue}>{overallScore}%</span>
                  <span className={styles.scoreRingLabel}>Overall</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className={styles.quickStats}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Award, label: 'Interviews', value: '12', sub: '+2 this week', color: '#10b981' },
              { icon: TrendingUp, label: 'Avg Score', value: '78%', sub: '↑ 7% vs last week', color: '#00d4ff' },
              { icon: Zap, label: 'Streak', value: '5 days', sub: 'Keep it up!', color: '#f59e0b' },
              { icon: Clock, label: 'Practice Time', value: '6.5 hrs', sub: 'This month', color: '#8b5cf6' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className={`glass-card ${styles.quickStat}`}>
                <div className={styles.quickStatIcon} style={{ background: `${s.color}18`, color: s.color }}>
                  <s.icon size={18} />
                </div>
                <div>
                  <div className={styles.quickStatValue}>{s.value}</div>
                  <div className={styles.quickStatLabel}>{s.label}</div>
                  <div className={styles.quickStatSub}>{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Row 1 */}
          <motion.div
            className={styles.chartsRow}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Score Trend */}
            <motion.div variants={fadeUp} className={`glass-card ${styles.chartCard} ${styles.chartWide}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h3 className={styles.chartTitle}>Score Trend</h3>
                  <p className={styles.chartSubtitle}>Your performance over the last 6 sessions</p>
                </div>
                <div className={`badge badge-green`}>↑ Improving</div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={scoreHistory}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="score" stroke="#00d4ff" strokeWidth={2} fill="url(#scoreGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Skills Radar */}
            <motion.div variants={fadeUp} className={`glass-card ${styles.chartCard}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h3 className={styles.chartTitle}>Skill Breakdown</h3>
                  <p className={styles.chartSubtitle}>Multi-dimensional assessment</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#8892b0', fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* Charts Row 2 */}
          <motion.div
            className={styles.chartsRow}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Category Performance */}
            <motion.div variants={fadeUp} className={`glass-card ${styles.chartCard}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h3 className={styles.chartTitle}>By Category</h3>
                  <p className={styles.chartSubtitle}>Average score per interview type</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={categoryData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgScore" radius={[6, 6, 0, 0]}>
                    {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div variants={fadeUp} className={`glass-card ${styles.chartCard}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h3 className={styles.chartTitle}>Weekly Activity</h3>
                  <p className={styles.chartSubtitle}>Practice minutes per day</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyActivity} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="minutes" radius={[6, 6, 0, 0]} fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Distribution Pie */}
            <motion.div variants={fadeUp} className={`glass-card ${styles.chartCard}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h3 className={styles.chartTitle}>Session Mix</h3>
                  <p className={styles.chartSubtitle}>Interview type distribution</p>
                </div>
              </div>
              <div className={styles.pieWrapper}>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="count" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                      {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.pieLegend}>
                  {categoryData.map((c, i) => (
                    <div key={i} className={styles.legendItem}>
                      <div className={styles.legendDot} style={{ background: c.color }} />
                      <span className={styles.legendLabel}>{c.name}</span>
                      <span className={styles.legendCount}>{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feedback Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>AI Feedback Summary</h2>
            </motion.div>

            <div className={styles.feedbackGrid}>
              {feedbackItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`glass-card ${styles.feedbackCard} ${styles[`feedback_${item.type}`]}`}
                >
                  <span className={styles.feedbackEmoji}>{item.icon}</span>
                  <p className={styles.feedbackText}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Sessions Table */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.tableSection}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Session History</h2>
              <Link href="/interview" className={`badge badge-blue ${styles.newBtn}`}>
                + New Session
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className={`glass-card ${styles.tableCard}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSessions.map((s, i) => (
                    <tr key={i}>
                      <td className={styles.tdRole}>{s.role}</td>
                      <td className={styles.tdCompany}>{s.company}</td>
                      <td><span className={`badge badge-blue`}>{s.category}</span></td>
                      <td className={styles.tdMeta}>{s.duration}</td>
                      <td className={styles.tdMeta}>{s.date}</td>
                      <td>
                        <span className={styles.scoreChip} style={{
                          background: s.score >= 85 ? 'rgba(16,185,129,0.15)' : s.score >= 75 ? 'rgba(0,212,255,0.15)' : 'rgba(245,158,11,0.15)',
                          color: s.score >= 85 ? '#10b981' : s.score >= 75 ? '#00d4ff' : '#f59e0b',
                        }}>
                          {s.score}%
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.trendChip} ${s.trend > 0 ? styles.trendUp : styles.trendDown}`}>
                          {s.trend > 0 ? '↑' : '↓'} {Math.abs(s.trend)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
