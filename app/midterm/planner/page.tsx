'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  CheckSquare,
  Square,
  Copy,
  Printer,
  Sparkles,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';

export default function MidtermPlannerPage() {
  const [hoursLeft, setHoursLeft] = useState<number>(48);
  const [subjectCategory, setSubjectCategory] = useState<'coding' | 'maths' | 'theory'>('coding');
  const [unit1, setUnit1] = useState<string>('Unit 1: Fundamentals & Basic Architecture');
  const [unit2, setUnit2] = useState<string>('Unit 2: Core Algorithms & Core Models');
  const [unit3, setUnit3] = useState<string>('Unit 3: Advanced Applications & Case Studies');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Load persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ogedu_midterm_planner_progress');
      if (saved) setCompletedSteps(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem('ogedu_midterm_planner_progress', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Generate dynamic plan based on hours
  const generateBlocks = () => {
    if (hoursLeft === 12) {
      return [
        { id: '12-1', time: 'Hour 1 - 3', title: `Deep Sprint on ${unit1}`, desc: 'Focus exclusively on standard definitions, primary diagrams, and 5 marker questions.', tag: 'Core Unit (40% Marks)' },
        { id: '12-2', time: 'Hour 4 - 6', title: `Deep Sprint on ${unit2}`, desc: 'Solve top 3 past year numericals / code implementations directly from solved assignments.', tag: 'Core Unit (35% Marks)' },
        { id: '12-3', time: 'Hour 7 - 8', title: 'PYQ 3-Year Scan', desc: 'Scan the last 3 Mid-Term papers. Identify questions asked repeatedly in 2024 and 2025.', tag: 'High Yield' },
        { id: '12-4', time: 'Hour 9 - 10', title: `Selective Unit 3 Quick Hit`, desc: `Skim only 2-3 most famous questions from ${unit3}. Skip low probability topics.`, tag: 'Selective' },
        { id: '12-5', time: 'Hour 11 - 12', title: 'Formula Sheet & Active Recall', desc: 'Close notes. Write down every formula and key algorithm syntax from memory.', tag: 'Final Lock-in' },
      ];
    } else if (hoursLeft === 24) {
      return [
        { id: '24-1', time: 'Block 1 (Morning)', title: `Master ${unit1} Foundations`, desc: 'Study core definitions, architectural diagrams, and standard textbook worked examples.', tag: 'Pareto 80/20' },
        { id: '24-2', time: 'Block 2 (Afternoon)', title: `Deep Numerical / Code Sprint on ${unit2}`, desc: 'Implement algorithms / solve 5 standard numerical problems with pen and paper.', tag: 'Highest Weight' },
        { id: '24-3', time: 'Block 3 (Evening)', title: 'Past 3 Years PYQ Deep Dive', desc: 'Write answers to the 8 most frequent questions from recent Mid-Term papers under 20-min timed sprints.', tag: 'Exam Reality' },
        { id: '24-4', time: 'Block 4 (Night)', title: `High-Yield Topics in ${unit3}`, desc: 'Cover the top 2 repeatedly asked topics from Unit 3. Do not get bogged down in edge cases.', tag: 'Selective' },
        { id: '24-5', time: 'Block 5 (Exam Morning)', title: '1-Page Formula Review & Calm Breathing', desc: 'Review your 1-page formula sheet. No new concepts. Warm up your mind with 1 easy sample question.', tag: 'Ready to Score' },
      ];
    } else if (hoursLeft === 48) {
      return [
        { id: '48-1', time: 'Day 1: Morning', title: `Complete Conceptual Mastery of ${unit1}`, desc: 'Read lecture slides, understand underlying mechanisms, and highlight repeated textbook definitions.', tag: 'Foundation' },
        { id: '48-2', time: 'Day 1: Afternoon', title: `Unit 1 Worked Examples & Solved PYQs`, desc: 'Solve at least 4 past mid-term questions specifically from Unit 1.', tag: 'Practice' },
        { id: '48-3', time: 'Day 1: Evening', title: `Comprehensive Sprint on ${unit2}`, desc: 'Break down complex algorithms, derivations, or structural proofs. Write step-by-step notes.', tag: 'High Yield' },
        { id: '48-4', time: 'Day 2: Morning', title: `Unit 2 Hard Practice & ${unit3} Core Concepts`, desc: 'Solve difficult edge cases from Unit 2, then complete the top 3 highest-weightage topics in Unit 3.', tag: 'Synthesis' },
        { id: '48-5', time: 'Day 2: Afternoon', title: 'Full Midterm Mock Test (1.5 Hours Timed)', desc: 'Take a past question paper. Set a timer for 90 minutes. Solve it without looking at notes.', tag: 'Mock Exam' },
        { id: '48-6', time: 'Day 2: Night', title: 'Weak Spot Patching & Formula Cheatsheet', desc: 'Analyze errors from your mock test. Review the 1-page cheat sheet before getting 7 hours of sleep.', tag: 'Confidence' },
      ];
    } else {
      // 72 hours
      return [
        { id: '72-1', time: 'Day 1: Foundation', title: `Exhaustive Mastery of ${unit1}`, desc: 'Read all syllabus lecture slides and notes for Unit 1. Build a 1-page summary chart.', tag: 'Day 1 Goal' },
        { id: '72-2', time: 'Day 2: Heavy Lifting', title: `Deep Immersion into ${unit2} & Key Numericals`, desc: 'Dedicate Day 2 to the most challenging unit. Solve all assigned tutorial and textbook problems.', tag: 'Day 2 Goal' },
        { id: '72-3', time: 'Day 3 Morning: Selective Unit 3', title: `Targeted Study of ${unit3}`, desc: 'Target the top 3 major questions and case studies from Unit 3. Ignore ultra-rare topics.', tag: 'Day 3 Morning' },
        { id: '72-4', time: 'Day 3 Evening: Past 4-Year Papers', title: 'Solve 2 Full Mid-Term Question Papers', desc: 'Complete 2 previous year papers under exact exam conditions to lock in muscle memory.', tag: 'Day 3 Evening' },
        { id: '72-5', time: 'Exam Morning: Final Polish', title: 'Formula Sheet Review & High-Score Mindset', desc: 'Skim only highlighted diagrams and summary formulas. Eat a light meal and stay hydrated.', tag: 'Final Sprint' },
      ];
    }
  };

  const blocks = generateBlocks();
  const completedCount = blocks.filter((b) => completedSteps.includes(b.id)).length;
  const progressPercent = Math.round((completedCount / blocks.length) * 100);

  const handleCopyText = () => {
    let txt = `🔥 OGEDU AI Mid-Term Emergency Schedule (${hoursLeft} Hours Left)\n\n`;
    blocks.forEach((b, i) => {
      txt += `[${b.time}] ${b.title}\n- ${b.desc}\n\n`;
    });
    txt += 'Generated on: https://ogedu-portal.vercel.app/midterm/planner';
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 print:hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          <Clock className="w-3.5 h-3.5" />
          <span>Pareto 80/20 Revision Protocol</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          72h Mid-Term Emergency Study Planner
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Tell us how many hours you have left and generate a structured, realistic study plan that maximizes marks per study hour.
        </p>
      </div>

      {/* Configuration Controls */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-6 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Hours Left Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300">
              Hours Left Until Your Mid-Term:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 48, 72].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHoursLeft(h)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    hoursLeft === h
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                      : 'bg-surface-elevated/40 border-surface-border text-zinc-400 hover:text-white'
                  }`}
                >
                  {h} Hours
                </button>
              ))}
            </div>
          </div>

          {/* Subject Category */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300">
              Subject Type:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'coding', label: 'Coding / CS' },
                { key: 'maths', label: 'Maths / Numerical' },
                { key: 'theory', label: 'Theory / Core' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSubjectCategory(cat.key as any)}
                  className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    subjectCategory === cat.key
                      ? 'bg-brand-500/20 border-brand-500 text-white shadow-md'
                      : 'bg-surface-elevated/40 border-surface-border text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Unit Names Customization */}
        <div className="space-y-2 pt-2 border-t border-surface-border/40">
          <label className="block text-xs font-semibold text-zinc-400">
            Syllabus Units (Customize to your syllabus):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={unit1}
              onChange={(e) => setUnit1(e.target.value)}
              className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-xs text-zinc-200 focus:outline-none focus:border-brand-500"
              placeholder="Unit 1 Name"
            />
            <input
              type="text"
              value={unit2}
              onChange={(e) => setUnit2(e.target.value)}
              className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-xs text-zinc-200 focus:outline-none focus:border-brand-500"
              placeholder="Unit 2 Name"
            />
            <input
              type="text"
              value={unit3}
              onChange={(e) => setUnit3(e.target.value)}
              className="p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-xs text-zinc-200 focus:outline-none focus:border-brand-500"
              placeholder="Unit 3 Name"
            />
          </div>
        </div>
      </div>

      {/* Timetable Schedule Display */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border/60 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Your Customized {hoursLeft}-Hour Protocol
            </h2>
            <p className="text-xs text-zinc-400">
              Check off blocks as you finish. Progress is automatically saved in your browser.
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-surface-border hover:border-zinc-600 text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? 'Copied! ✅' : 'Copy Text'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-surface-border hover:border-zinc-600 text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print PDF
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 print:hidden">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-zinc-400">Sprint Completion:</span>
            <span className="text-emerald-400 font-mono">{completedCount} / {blocks.length} Completed ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Timeline Blocks */}
        <div className="space-y-3 pt-2">
          {blocks.map((block) => {
            const isDone = completedSteps.includes(block.id);
            return (
              <div
                key={block.id}
                onClick={() => toggleStep(block.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-400'
                    : 'bg-surface-elevated/40 border-surface-border hover:border-surface-border-hover text-zinc-200'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-emerald-400">
                  {isDone ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5 text-zinc-500" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                      {block.time} &mdash; {block.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-base border border-surface-border text-zinc-400">
                      {block.tag}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {block.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
