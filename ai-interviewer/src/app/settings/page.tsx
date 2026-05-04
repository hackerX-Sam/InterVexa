'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Bell, Palette, Shield, User, ChevronRight, Save, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import styles from './settings.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const navItems = [
  { id: 'api', icon: Key, label: 'API Configuration' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
  { id: 'privacy', icon: Shield, label: 'Privacy' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('api');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyReport: true,
    achievements: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className={styles.main}>
      <div className="bg-orb bg-orb-1" style={{ opacity: 0.1 }} />
      <Navbar />

      <div className={styles.content}>
        <div className="container">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Settings</h1>
              <p className={styles.pageSubtitle}>Configure your Intervexa experience</p>
            </motion.div>

            <div className={styles.layout}>
              {/* Nav */}
              <motion.aside variants={fadeUp} className={styles.settingsNav}>
                {navItems.map(item => (
                  <button
                    key={item.id}
                    className={`${styles.navItem} ${activeSection === item.id ? styles.navActive : ''}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                    <ChevronRight size={14} className={styles.navArrow} />
                  </button>
                ))}
              </motion.aside>

              {/* Content */}
              <motion.div variants={fadeUp} className={`glass-card ${styles.settingsContent}`}>
                {activeSection === 'api' && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <Key size={20} color="#00d4ff" />
                      <div>
                        <h2 className={styles.sectionTitle}>API Configuration</h2>
                        <p className={styles.sectionDesc}>Connect your OpenAI API key to enable AI interviews</p>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>OpenAI API Key</label>
                      <div className={styles.inputWithIcon}>
                        <input
                          type={showKey ? 'text' : 'password'}
                          className="input-glass"
                          placeholder="sk-proj-..."
                          value={apiKey}
                          onChange={e => setApiKey(e.target.value)}
                        />
                        <button className={styles.eyeBtn} onClick={() => setShowKey(v => !v)}>
                          {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <p className={styles.hint}>
                        Your API key is stored locally and never sent to our servers.{' '}
                        <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className={styles.link}>
                          Get your key →
                        </a>
                      </p>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Default Model</label>
                      <select className="input-glass">
                        <option value="gpt-4o">GPT-4o (Recommended)</option>
                        <option value="gpt-4-turbo">GPT-4 Turbo</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                      </select>
                    </div>

                    <div className={`${styles.infoBox} glass-card`}>
                      <div className={styles.infoTitle}>🔒 Your privacy matters</div>
                      <p className={styles.infoText}>
                        API keys are stored only in your browser's memory during the session.
                        We never log, store, or transmit your API key to any server.
                        All AI calls are made directly from your browser to OpenAI.
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === 'profile' && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <User size={20} color="#8b5cf6" />
                      <div>
                        <h2 className={styles.sectionTitle}>Profile</h2>
                        <p className={styles.sectionDesc}>Personalize your interview experience</p>
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Your Name</label>
                        <input type="text" className="input-glass" placeholder="e.g. Alex Johnson" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Target Role</label>
                        <input type="text" className="input-glass" placeholder="e.g. Software Engineer" />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Experience Level</label>
                      <select className="input-glass">
                        <option value="junior">Junior (0-2 years)</option>
                        <option value="mid">Mid-Level (2-5 years)</option>
                        <option value="senior">Senior (5-8 years)</option>
                        <option value="expert">Expert (8+ years)</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Target Companies (comma separated)</label>
                      <input type="text" className="input-glass" placeholder="Google, Meta, Amazon, Apple, Microsoft" />
                    </div>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <Bell size={20} color="#f59e0b" />
                      <div>
                        <h2 className={styles.sectionTitle}>Notifications</h2>
                        <p className={styles.sectionDesc}>Control when and how you get reminded</p>
                      </div>
                    </div>

                    {[
                      { key: 'dailyReminder', label: 'Daily Practice Reminder', desc: 'Get reminded to practice every day at your preferred time' },
                      { key: 'weeklyReport', label: 'Weekly Progress Report', desc: 'Receive a summary of your weekly performance' },
                      { key: 'achievements', label: 'Achievement Alerts', desc: 'Get notified when you unlock new achievements' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className={styles.toggleRow}>
                        <div>
                          <div className={styles.toggleLabel}>{label}</div>
                          <div className={styles.toggleDesc}>{desc}</div>
                        </div>
                        <button
                          className={`${styles.toggle} ${notifications[key as keyof typeof notifications] ? styles.toggleOn : ''}`}
                          onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof notifications] }))}
                        >
                          <div className={styles.toggleThumb} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === 'appearance' && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <Palette size={20} color="#f472b6" />
                      <div>
                        <h2 className={styles.sectionTitle}>Appearance</h2>
                        <p className={styles.sectionDesc}>Customize the look and feel</p>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Theme</label>
                      <div className={styles.themeGrid}>
                        {[
                          { id: 'dark', label: 'Dark (Default)', gradient: 'linear-gradient(135deg, #050814, #0a0f1e)' },
                          { id: 'darker', label: 'Midnight', gradient: 'linear-gradient(135deg, #000000, #0a0a14)' },
                          { id: 'ocean', label: 'Ocean', gradient: 'linear-gradient(135deg, #040d1a, #0a1628)' },
                        ].map(theme => (
                          <div key={theme.id} className={styles.themeCard} style={{ background: theme.gradient }}>
                            <div className={styles.themeLabel}>{theme.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Accent Color</label>
                      <div className={styles.colorPicker}>
                        {[
                          { color: '#00d4ff', label: 'Cyan' },
                          { color: '#8b5cf6', label: 'Purple' },
                          { color: '#10b981', label: 'Emerald' },
                          { color: '#f472b6', label: 'Pink' },
                          { color: '#f59e0b', label: 'Amber' },
                        ].map(({ color, label }) => (
                          <button key={color} className={styles.colorBtn} style={{ background: color }} title={label} />
                        ))}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Font Size</label>
                      <select className="input-glass">
                        <option>Small (13px)</option>
                        <option selected>Medium (14px)</option>
                        <option>Large (16px)</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeSection === 'privacy' && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <Shield size={20} color="#10b981" />
                      <div>
                        <h2 className={styles.sectionTitle}>Privacy & Security</h2>
                        <p className={styles.sectionDesc}>Manage your data and privacy settings</p>
                      </div>
                    </div>

                    <div className={`${styles.infoBox} glass-card`} style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                      <div className={styles.infoTitle}>🛡️ Data Storage</div>
                      <p className={styles.infoText}>
                        All your interview data, progress, and settings are stored locally in your browser.
                        We do not collect, store, or process any personal data on our servers.
                      </p>
                    </div>

                    <div className={styles.dangerZone}>
                      <h3 className={styles.dangerTitle}>Danger Zone</h3>
                      <div className={styles.dangerActions}>
                        <div>
                          <div className={styles.dangerLabel}>Clear Session History</div>
                          <div className={styles.dangerDesc}>Delete all interview history and progress data</div>
                        </div>
                        <button className={styles.dangerBtn}>Clear Data</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className={styles.saveRow}>
                  <button className={`btn-glow ${styles.saveBtn}`} onClick={handleSave}>
                    {saved ? '✓ Saved!' : (
                      <>
                        <Save size={16} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
