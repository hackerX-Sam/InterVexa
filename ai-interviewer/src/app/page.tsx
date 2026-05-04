'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain, Code2, Users, Zap, TrendingUp, Award, Clock, 
  ChevronRight, Play, BarChart2, Target, Sparkles,
  ArrowRight, CheckCircle, Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import styles from './page.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const categories = [
  {
    id: 'technical',
    label: 'Technical',
    description: 'DSA, system design, architecture discussions',
    icon: Code2,
    gradient: 'linear-gradient(135deg, #00d4ff, #0070f3)',
    glow: 'rgba(0, 212, 255, 0.3)',
    badge: 'Most Popular',
    topics: ['Data Structures', 'Algorithms', 'APIs', 'Databases'],
  },
  {
    id: 'behavioral',
    label: 'Behavioral',
    description: 'STAR method, leadership, conflict resolution',
    icon: Users,
    gradient: 'linear-gradient(135deg, #8b5cf6, #f472b6)',
    glow: 'rgba(139, 92, 246, 0.3)',
    badge: null,
    topics: ['Leadership', 'Teamwork', 'Conflict', 'Communication'],
  },
  {
    id: 'coding',
    label: 'Coding',
    description: 'Live coding with real-time AI feedback',
    icon: Brain,
    gradient: 'linear-gradient(135deg, #10b981, #00d4ff)',
    glow: 'rgba(16, 185, 129, 0.3)',
    badge: 'New',
    topics: ['LeetCode-style', 'Live Editor', 'Complexity', 'Debugging'],
  },
  {
    id: 'system-design',
    label: 'System Design',
    description: 'Architect scalable distributed systems',
    icon: Target,
    gradient: 'linear-gradient(135deg, #f59e0b, #f472b6)',
    glow: 'rgba(245, 158, 11, 0.3)',
    badge: null,
    topics: ['Scalability', 'Microservices', 'Load Balancing', 'Caching'],
  },
];

const recentSessions = [
  { role: 'Software Engineer', company: 'Google', score: 85, category: 'technical', date: '2 hours ago', duration: '35 min' },
  { role: 'Product Manager', company: 'Meta', score: 78, category: 'behavioral', date: 'Yesterday', duration: '28 min' },
  { role: 'Frontend Developer', company: 'Stripe', score: 92, category: 'coding', date: '2 days ago', duration: '42 min' },
];

const stats = [
  { label: 'Interviews Completed', value: '12', icon: CheckCircle, color: '#10b981' },
  { label: 'Avg. Score', value: '78%', icon: TrendingUp, color: '#00d4ff' },
  { label: 'Practice Streak', value: '5 days', icon: Zap, color: '#f59e0b' },
  { label: 'Questions Answered', value: '89', icon: Award, color: '#8b5cf6' },
];

const features = [
  { icon: Brain, title: 'AI-Powered Feedback', desc: 'GPT-4o analyzes your answers and provides instant, detailed feedback' },
  { icon: BarChart2, title: 'Performance Analytics', desc: 'Track your progress with visual charts and actionable insights' },
  { icon: Code2, title: 'Live Coding Environment', desc: 'Monaco-based editor with syntax highlighting and execution' },
  { icon: Zap, title: 'Voice Interaction', desc: 'Speak your answers naturally with speech-to-text technology' },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <ParticleBackground />

      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <Navbar />

      <div className={styles.content}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div
            className={styles.heroInner}
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className={styles.heroBadge}>
              <Sparkles size={14} />
              <span>Powered by GPT-4o · 10,000+ Interviews Simulated</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className={styles.heroTitle}>
              Ace Your Next Interview
              <br />
              <span className="gradient-text">With AI Coaching</span>
            </motion.h1>

            <motion.p variants={fadeUp} className={styles.heroSubtitle}>
              Practice with an AI interviewer that adapts to your level, provides real-time feedback,
              and helps you master technical, behavioral, and coding interviews.
            </motion.p>

            <motion.div variants={fadeUp} className={styles.heroCTA}>
              <Link href="/interview" className="btn-glow">
                <Play size={16} />
                Start Free Interview
              </Link>
              <Link href="/analytics" className="btn-outline">
                View Progress
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} className={styles.socialProof}>
              <div className={styles.avatarStack}>
                {['A', 'B', 'C', 'D'].map((l, i) => (
                  <div key={i} className={styles.avatar} style={{ background: ['#00d4ff', '#8b5cf6', '#f472b6', '#10b981'][i] }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p className={styles.proofText}>Trusted by <strong>2,400+</strong> job seekers</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Row */}
        <section className={styles.statsSection}>
          <motion.div
            className={styles.statsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className={`glass-card ${styles.statCard}`}>
                <div className={styles.statIcon} style={{ background: `${stat.color}20`, color: stat.color }}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Category Selection */}
        <section className={styles.section}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Choose Your <span className="gradient-text">Interview Type</span></h2>
              <p className={styles.sectionSubtitle}>Select a category to begin your personalized practice session</p>
            </motion.div>

            <div className={styles.categoryGrid}>
              {categories.map((cat, i) => (
                <motion.div key={cat.id} variants={fadeUp} custom={i}>
                  <Link href={`/interview?category=${cat.id}`} className={styles.categoryCard}>
                    {cat.badge && (
                      <div className={styles.categoryBadge}
                        style={{
                          background: cat.badge === 'New' ? 'rgba(16,185,129,0.2)' : 'rgba(0,212,255,0.15)',
                          color: cat.badge === 'New' ? '#10b981' : '#00d4ff',
                          border: `1px solid ${cat.badge === 'New' ? 'rgba(16,185,129,0.4)' : 'rgba(0,212,255,0.3)'}`,
                        }}
                      >{cat.badge}</div>
                    )}
                    <div className={styles.categoryIconWrap} style={{ background: `${cat.glow.replace('0.3', '0.15')}` }}>
                      <div className={styles.categoryIconInner} style={{ background: cat.gradient }}>
                        <cat.icon size={22} color="white" />
                      </div>
                    </div>
                    <div className={styles.categoryContent}>
                      <h3 className={styles.categoryTitle}>{cat.label}</h3>
                      <p className={styles.categoryDesc}>{cat.description}</p>
                      <div className={styles.categoryTopics}>
                        {cat.topics.slice(0, 3).map(t => (
                          <span key={t} className={styles.topicTag}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.categoryArrow}>
                      <ChevronRight size={18} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Recent Sessions */}
        <section className={styles.section}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent <span className="gradient-text-purple">Sessions</span></h2>
              <Link href="/analytics" className={styles.viewAll}>
                View all <ChevronRight size={14} />
              </Link>
            </motion.div>

            <div className={styles.sessionList}>
              {recentSessions.map((s, i) => (
                <motion.div key={i} variants={fadeUp} className={`glass-card ${styles.sessionCard}`}>
                  <div className={styles.sessionLeft}>
                    <div className={styles.sessionRole}>{s.role}</div>
                    <div className={styles.sessionMeta}>
                      <span>{s.company}</span>
                      <span>·</span>
                      <span className={styles.sessionCat}>{s.category}</span>
                      <span>·</span>
                      <Clock size={12} />
                      <span>{s.duration}</span>
                    </div>
                  </div>
                  <div className={styles.sessionRight}>
                    <div className={styles.sessionDate}>{s.date}</div>
                    <div className={styles.scoreCircle} style={{
                      background: s.score >= 85 ? 'rgba(16,185,129,0.2)' : s.score >= 75 ? 'rgba(0,212,255,0.2)' : 'rgba(245,158,11,0.2)',
                      color: s.score >= 85 ? '#10b981' : s.score >= 75 ? '#00d4ff' : '#f59e0b',
                    }}>
                      {s.score}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className={styles.section}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Everything You Need to <span className="gradient-text">Succeed</span></h2>
            </motion.div>

            <div className={styles.featuresGrid}>
              {features.map((f, i) => (
                <motion.div key={i} variants={fadeUp} className={`glass-card ${styles.featureCard}`}>
                  <div className={styles.featureIcon}>
                    <f.icon size={22} />
                  </div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Banner */}
        <section className={styles.section}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.ctaBanner}
          >
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to land your dream job?</h2>
              <p className={styles.ctaSubtitle}>Join thousands of candidates who improved their interview performance with Intervexa</p>
              <Link href="/interview" className="btn-glow" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Play size={16} />
                Start Practicing Now
              </Link>
            </div>
            <div className={styles.ctaDecor} />
          </motion.div>
        </section>
      </div>
    </main>
  );
}
