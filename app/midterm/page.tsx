'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Calendar,
  ShieldCheck,
  FileText,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Clock,
  ArrowRight,
  Target
} from 'lucide-react';

export default function MidtermOverviewPage() {
  const [copied, setCopied] = useState(false);

  const shareText = "Bhai Mid-Term exams aa rahe hain! Apne marks aur passing safe score calculate karlo is toolkit se: https://ogedu-portal.vercel.app/midterm";
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://ogedu-portal.vercel.app/midterm');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const tools = [
    {
      title: 'Mid-Term Safe Marks Predictor',
      tag: '🔥 Most Popular',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      desc: 'Enter your CA marks and see exactly how many marks you need in Mid-Terms (MTE) to eliminate End-Term pressure.',
      icon: Calculator,
      color: 'from-amber-500 to-orange-600',
      href: '/midterm/calculator',
      stats: 'Instant Safe/Danger Zone'
    },
    {
      title: '72h Emergency Study Planner',
      tag: '⚡ 1-Night Before',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      desc: 'Generate an hour-by-hour realistic revision schedule with Pomodoro study blocks focusing on the 80/20 highest yield topics.',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-600',
      href: '/midterm/planner',
      stats: 'Interactive Checklist'
    },
    {
      title: 'Hall Ticket & Attendance Recovery',
      tag: '🛡️ 75% Rule',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      desc: 'Calculate if you meet the 75% cutoff and instantly generate a formal Medical/Duty Leave Application for your HOD/Dean.',
      icon: ShieldCheck,
      color: 'from-sky-500 to-blue-600',
      href: '/midterm/attendance',
      stats: '1-Click Letter Generator'
    },
    {
      title: '1-Page High-Yield Cheat Sheets',
      tag: '📄 Printable PDF',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      desc: 'Core subject revision sheets for Data Structures (CSE205), Python (INT108), Maths (MTH166), and DBMS on a single page.',
      icon: FileText,
      color: 'from-rose-500 to-purple-600',
      href: '/midterm/cheat-sheets',
      stats: 'Print Ready'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-brand-500/10 border border-amber-500/30 text-amber-300">
          <span>🔥 University Mid-Term Exams 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Complete Survival Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
          Beat the Mid-Term Curve.{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-rose-400 to-brand-400">
            Pass with Zero Stress.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Calculate your minimum safe exam marks, build a 72-hour emergency revision schedule, check admit card attendance eligibility, and access 1-page formula cheat sheets.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/midterm/calculator"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-sm font-semibold shadow-lg shadow-rose-500/25 hover:opacity-95 transition-opacity flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Calculate Safe Marks Now
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <Share2 className="w-4 h-4" />
            Share on WhatsApp Group
          </a>
        </div>
      </div>

      {/* 4 Core Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.title}
              href={tool.href}
              className="group p-6 rounded-2xl bg-surface-card/60 border border-surface-border hover:border-surface-border-hover transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${tool.tagColor}`}>
                    {tool.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-surface-border/40 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">{tool.stats}</span>
                <span className="text-brand-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Launch Tool <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 80/20 Mid-Term Survival Strategy Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-surface-card/90 to-surface-elevated/70 border border-surface-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg">
            ⚡
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              The 3 Golden Rules of University Mid-Terms
            </h2>
            <p className="text-xs text-zinc-400">
              Battle-tested advice from top university seniors and exam toppers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface-base/60 border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Zap className="w-4 h-4" />
              Rule 1: The 80/20 Syllabus Split
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              In almost all universities, Units 1 and 2 comprise <strong>65% to 75%</strong> of the Mid-Term question paper. Master the first 2 units completely before touching Unit 3.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-base/60 border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
              <Target className="w-4 h-4" />
              Rule 2: Halve Your End-Term Load
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Scoring just <strong>15/30 in Mid-Terms</strong> reduces your required End-Term score to the absolute bare minimum (18/50), practically guaranteeing you will not get a backlog!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-base/60 border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Clock className="w-4 h-4" />
              Rule 3: PYQ Pattern Repetition
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Over <strong>50% of midterm numericals and derivations</strong> are repeated directly from the last 3 years with slight variable tweaks. Solve past papers early!
            </p>
          </div>
        </div>
      </div>

      {/* Share Strip */}
      <div className="p-6 rounded-2xl bg-brand-950/40 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-white">Help Your Classmates Avoid Backlogs!</h2>
          <p className="text-xs text-zinc-400">
            Share the Mid-Term Survival Kit directly in your branch WhatsApp and Telegram groups.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-xl bg-surface-elevated text-zinc-300 hover:text-white text-xs font-semibold border border-surface-border transition-colors"
          >
            {copied ? 'Link Copied! ✅' : 'Copy Link'}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
