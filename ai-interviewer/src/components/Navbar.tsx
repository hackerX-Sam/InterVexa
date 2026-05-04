'use client';

import { motion } from 'framer-motion';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, BarChart2, Code2, Home, Settings } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/interview', icon: Brain, label: 'Interview' },
  { href: '/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/practice', icon: Code2, label: 'Practice' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Brain size={18} />
          </div>
          <span className={styles.logoText}>
            Inter<span className={styles.logoAccent}>vexa</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className={styles.navLinks}>
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
                <Icon size={16} />
                <span>{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className={styles.indicator}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link href="/interview" className="btn-glow" style={{ fontSize: '0.82rem', padding: '8px 20px' }}>
          Start Interview
        </Link>
      </div>
    </nav>
  );
}
