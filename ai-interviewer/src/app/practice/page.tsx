'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Play, RotateCcw, ChevronRight, Code2, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import styles from './practice.module.css';
import Link from 'next/link';

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: '' },
    ],
    constraints: ['2 ≤ nums.length ≤ 104', '-109 ≤ nums[i] ≤ 109', 'Only one valid answer exists.'],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your solution here
  
}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your solution here
    pass`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // Your solution here
  
}`,
    },
    hints: ['Try using a hash map to store visited numbers', 'For each element, check if target - element exists in the map'],
    tags: ['Hash Table', 'Array'],
    acceptance: '49.8%',
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.',
    examples: [
      { input: 's = "()"', output: 'true', explanation: '' },
      { input: 's = "()[]{}"', output: 'true', explanation: '' },
      { input: 's = "(]"', output: 'false', explanation: '' },
    ],
    constraints: ['1 ≤ s.length ≤ 104', 's consists of parentheses only.'],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Your solution here
  
}`,
      python: `def is_valid(s: str) -> bool:
    # Your solution here
    pass`,
      typescript: `function isValid(s: string): boolean {
  // Your solution here
  
}`,
    },
    hints: ['Use a stack data structure', 'Push opening brackets, pop and check for closing brackets'],
    tags: ['Stack', 'String'],
    acceptance: '40.2%',
  },
  {
    id: 3,
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' },
    ],
    constraints: ['1 ≤ nums.length ≤ 104', 'All values in nums are unique', 'nums is sorted in ascending order'],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Your solution here
  
}`,
      python: `def search(nums: list[int], target: int) -> int:
    # Your solution here
    pass`,
      typescript: `function search(nums: number[], target: number): number {
  // Your solution here
  
}`,
    },
    hints: ['Use two pointers: left and right', 'Calculate mid and compare with target'],
    tags: ['Binary Search', 'Array'],
    acceptance: '55.3%',
  },
  {
    id: 4,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 105', '-104 ≤ nums[i] ≤ 104'],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Your solution here (hint: Kadane's algorithm)
  
}`,
      python: `def max_sub_array(nums: list[int]) -> int:
    # Your solution here (hint: Kadane's algorithm)
    pass`,
      typescript: `function maxSubArray(nums: number[]): number {
  // Your solution here (hint: Kadane's algorithm)
  
}`,
    },
    hints: ["Kadane's algorithm: track current sum and max sum", 'Reset current sum when it goes negative'],
    tags: ['Array', 'DP', "Divide and Conquer"],
    acceptance: '49.5%',
  },
];

type Language = 'javascript' | 'python' | 'typescript';

export default function PracticePage() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(problems[0].starterCode.javascript);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<'pass' | 'fail' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'discussion'>('problem');

  const handleProblemSelect = (problem: typeof problems[0]) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode[language]);
    setOutput('');
    setTestResult(null);
    setShowHint(false);
    setHintIndex(0);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(selectedProblem.starterCode[lang]);
  };

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setOutput('Running tests...\n');

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problem: selectedProblem.title }),
      });
      const data = await response.json();

      if (data.success) {
        setOutput(`✅ Execution successful!\n\nOutput:\n${data.output}\n\nExecution time: ${data.executionTime}`);
        setTestResult('pass');
      } else {
        setOutput(`❌ Error:\n${data.output}`);
        setTestResult('fail');
      }
    } catch {
      setOutput('❌ Network error. Please try again.');
      setTestResult('fail');
    } finally {
      setIsRunning(false);
    }
  }, [code, language, selectedProblem.title]);

  const diffColors: Record<string, string> = {
    Easy: '#10b981',
    Medium: '#f59e0b',
    Hard: '#f472b6',
  };

  return (
    <main className={styles.main}>
      <div className="bg-orb bg-orb-1" style={{ opacity: 0.08 }} />
      <div className="bg-orb bg-orb-2" style={{ opacity: 0.08 }} />
      <Navbar />

      <div className={styles.layout}>
        {/* Problem List */}
        <aside className={styles.problemList}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>Problems</h2>
            <span className={styles.listCount}>{problems.length}</span>
          </div>
          {problems.map(p => (
            <button
              key={p.id}
              className={`${styles.problemItem} ${selectedProblem.id === p.id ? styles.problemActive : ''}`}
              onClick={() => handleProblemSelect(p)}
            >
              <div className={styles.problemItemLeft}>
                <span className={styles.problemNum}>{p.id}.</span>
                <div>
                  <div className={styles.problemTitle}>{p.title}</div>
                  <div className={styles.problemCategory}>{p.category}</div>
                </div>
              </div>
              <span className={styles.diffBadge} style={{ color: diffColors[p.difficulty] }}>{p.difficulty}</span>
            </button>
          ))}
        </aside>

        {/* Problem Detail */}
        <div className={styles.problemDetail}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {(['problem', 'solution', 'discussion'] as const).map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.problemContent}>
            {/* Title */}
            <div className={styles.problemHeader}>
              <h1 className={styles.problemName}>{selectedProblem.title}</h1>
              <div className={styles.problemMeta}>
                <span className={styles.diffBadgeLg} style={{ color: diffColors[selectedProblem.difficulty] }}>
                  {selectedProblem.difficulty}
                </span>
                <span className={`badge badge-purple`}>{selectedProblem.category}</span>
                <span className={styles.acceptance}>
                  <CheckCircle size={12} />
                  {selectedProblem.acceptance} Acceptance
                </span>
              </div>
              <div className={styles.tags}>
                {selectedProblem.tags.map(t => (
                  <span key={t} className={`badge badge-blue`}>{t}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className={styles.description}>
              <p className={styles.descText}>{selectedProblem.description}</p>
            </div>

            {/* Examples */}
            <div className={styles.examples}>
              {selectedProblem.examples.map((ex, i) => (
                <div key={i} className={styles.example}>
                  <div className={styles.exampleLabel}>Example {i + 1}:</div>
                  <div className={styles.exampleCode}>
                    <div><strong>Input:</strong> {ex.input}</div>
                    <div><strong>Output:</strong> {ex.output}</div>
                    {ex.explanation && <div><strong>Explanation:</strong> {ex.explanation}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className={styles.constraints}>
              <div className={styles.constraintsLabel}>Constraints:</div>
              <ul>
                {selectedProblem.constraints.map((c, i) => (
                  <li key={i} className={styles.constraint}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Hint */}
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.hintBox}
              >
                <div className={styles.hintLabel}>💡 Hint {hintIndex + 1}</div>
                <p>{selectedProblem.hints[hintIndex]}</p>
                {hintIndex < selectedProblem.hints.length - 1 && (
                  <button className={styles.nextHint} onClick={() => setHintIndex(i => i + 1)}>
                    Next hint →
                  </button>
                )}
              </motion.div>
            )}

            <div className={styles.hintRow}>
              <button className={styles.hintBtn} onClick={() => { setShowHint(v => !v); setHintIndex(0); }}>
                💡 {showHint ? 'Hide' : 'Show'} Hint
              </button>
              <Link href="/interview?category=coding" className={styles.aiInterviewLink}>
                <Zap size={14} />
                Practice with AI →
              </Link>
            </div>
          </div>
        </div>

        {/* Editor Panel */}
        <div className={styles.editorPanel}>
          {/* Editor Header */}
          <div className={styles.editorHeader}>
            <div className={styles.langSelector}>
              {(['javascript', 'python', 'typescript'] as Language[]).map(lang => (
                <button
                  key={lang}
                  className={`${styles.langBtn} ${language === lang ? styles.langActive : ''}`}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang === 'javascript' ? 'JS' : lang === 'python' ? 'Python' : 'TS'}
                </button>
              ))}
            </div>
            <div className={styles.editorActions}>
              <button className={styles.resetBtn} onClick={() => setCode(selectedProblem.starterCode[language])}>
                <RotateCcw size={14} />
                Reset
              </button>
              <button className={styles.runBtn} onClick={handleRun} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <div className={styles.spinner} />
                    Running...
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className={styles.editorWrapper}>
            <MonacoEditor
              height="100%"
              language={language}
              value={code}
              onChange={v => setCode(v || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                cursorBlinking: 'smooth',
                renderLineHighlight: 'gutter',
                smoothScrolling: true,
                tabSize: 2,
                wordWrap: 'on',
              }}
            />
          </div>

          {/* Output */}
          <div className={styles.outputPanel}>
            <div className={styles.outputHeader}>
              <div className={styles.outputTitle}>
                {testResult === 'pass' ? <CheckCircle size={14} color="#10b981" /> : testResult === 'fail' ? <XCircle size={14} color="#f472b6" /> : <Code2 size={14} color="#8892b0" />}
                <span>Output</span>
              </div>
            </div>
            <pre className={`${styles.outputContent} ${testResult === 'pass' ? styles.outputPass : testResult === 'fail' ? styles.outputFail : ''}`}>
              {output || 'Run your code to see output here...'}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
