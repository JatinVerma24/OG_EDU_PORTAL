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
  Zap,
  Clock,
  ArrowRight,
  Target,
  FolderArchive,
  Bot,
  ExternalLink,
  BookOpen,
  Sparkles,
  Copy,
  Check,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Cpu
} from 'lucide-react';
import {
  MASTER_DRIVE_FOLDER_URL,
  AI_STUDY_PROMPTS,
  AI_STUDY_TOOLS
} from '@/data/midtermResources';

export default function MidtermOverviewPage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const shareText = "Bhai University Mid-Term exams 2026 ke sabhi resources (B.Tech, BBA, PVA Verbal Ability, Safe Marks Predictor aur Jatin Bhaiya ke 5 AI Study Prompts) is toolkit mein mil gaye: https://ogedu-portal.vercel.app/midterm";
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://ogedu-portal.vercel.app/midterm');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const currentPrompt = AI_STUDY_PROMPTS[selectedPromptIndex];

  const tools = [
    {
      title: 'First-Year Study Resources & PYQ Vault',
      tag: '📂 Mega Drive Vault',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      desc: 'Complete cloud library: verified lecture notes, textbooks, 11+ scanned previous year question papers per subject, and 220-question MCQ banks for B.Tech, BBA & PVA.',
      icon: FolderArchive,
      color: 'from-amber-500 to-rose-600',
      href: '/midterm/resources',
      stats: '245+ Resources in Drive'
    },
    {
      title: 'AI Study Supercharger & Prompts Hub',
      tag: '🤖 5x Study Velocity',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      desc: '14 curated AI tools across Research, Writing & Coding + 5 high-impact study prompts for ChatGPT & Claude to explain tough topics and simulate strict mock tests.',
      icon: Bot,
      color: 'from-purple-600 to-indigo-600',
      href: '/midterm/resources?stream=ai',
      stats: '14 Tools + 5 Exam Prompts'
    },
    {
      title: 'Mid-Term Safe Marks Predictor',
      tag: '🔥 Most Popular',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      desc: 'Enter your CA internal marks and see exactly how many marks you need in Mid-Terms (MTE) to eliminate End-Term anxiety and lock in a safe pass.',
      icon: Calculator,
      color: 'from-amber-500 to-orange-600',
      href: '/midterm/calculator',
      stats: 'Instant Safe/Danger Zone'
    },
    {
      title: '72h Emergency Study Planner',
      tag: '⚡ 1-Night Before',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      desc: 'Generate an hour-by-hour realistic revision schedule with Pomodoro study blocks focusing strictly on the 80/20 highest-yield syllabus topics.',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-600',
      href: '/midterm/planner',
      stats: 'Interactive Checklist'
    },
    {
      title: 'Hall Ticket & Attendance Recovery',
      tag: '🛡️ 75% Rule',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      desc: 'Calculate if you meet the 75% attendance cutoff and instantly generate a formal Medical/Duty Leave Application for your HOD or Dean.',
      icon: ShieldCheck,
      color: 'from-sky-500 to-blue-600',
      href: '/midterm/attendance',
      stats: '1-Click Letter Generator'
    },
    {
      title: '1-Page High-Yield Cheat Sheets',
      tag: '📄 Printable PDF',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      desc: 'Core subject revision sheets for Engineering Maths, Physics, Python, Graphic Projections, and Financial Accounting on a single page.',
      icon: FileText,
      color: 'from-rose-500 to-purple-600',
      href: '/midterm/cheat-sheets',
      stats: 'Print Ready Formulas'
    },
  ];

  const streamHighlights = [
    {
      name: 'B.Tech First Year',
      code: 'MTH165 · PHY175 · PYTHON · MEC136 · CHE110',
      desc: 'Complete engineering foundation kit: Calculus, Quantum physics, 220 Python MCQs, and engineering drawing scans.',
      href: '/midterm/resources?stream=btech',
      icon: Cpu,
      color: 'from-blue-500/20 via-sky-500/10 to-transparent border-blue-500/30 text-blue-400',
      badge: '155+ Files'
    },
    {
      name: 'BBA 1st Year',
      code: 'ACC103 · ECO113 · MGN101',
      desc: 'Financial Accounting ledger & BRS, Microeconomics demand curves & break-even analysis, and Management PPTs.',
      href: '/midterm/resources?stream=bba',
      icon: Briefcase,
      color: 'from-amber-500/20 via-yellow-500/10 to-transparent border-amber-500/30 text-amber-400',
      badge: '85+ Files'
    },
    {
      name: 'PVA & Verbal Ability',
      code: 'PEL121 / PVA Soft Skills',
      desc: 'Sentence correction rules, 300 corporate vocabulary words, reading comprehension tactics, and 120 solved PYQs.',
      href: '/midterm/resources?stream=pva',
      icon: BookOpen,
      color: 'from-rose-500/20 via-red-500/10 to-transparent border-rose-500/30 text-rose-400',
      badge: 'Full Exam Pack'
    },
    {
      name: 'AI Study Supercharger',
      code: '14 AI Tools · 5 Study Prompts',
      desc: 'Perplexity, NotebookLM, Claude & ChatGPT prompts by OG Jatin Verma to turn confusing chapters into easy marks.',
      href: '/midterm/resources?stream=ai',
      icon: Bot,
      color: 'from-purple-500/20 via-indigo-500/10 to-transparent border-purple-500/30 text-purple-400',
      badge: '5x Fast Prep'
    }
  ];

  const featuredGuides = [
    {
      title: 'OG All Courses Midterm Master Guide 2026-27',
      subtitle: 'Universal Passing Formula & Exam Breakdown',
      driveUrl: 'https://drive.google.com/file/d/1SDU_5nUIuOvKXSBqCl73qsH_bkMb8qDc/view?usp=sharing',
      tag: '⭐ Pinned Master Guide',
      color: 'border-amber-500/40 bg-amber-500/5 text-amber-300'
    },
    {
      title: 'OG B.Tech Midterm Master Guide (V2)',
      subtitle: 'Complete Strategy for Maths, Physics, Python & MEC',
      driveUrl: 'https://drive.google.com/file/d/1yny-O3VcRvVBEgEB8XBn6tIXGVwyV_ZE/view?usp=sharing',
      tag: '📘 B.Tech Master Kit',
      color: 'border-sky-500/40 bg-sky-500/5 text-sky-300'
    },
    {
      title: 'BBA Complete Guide (ACC103 + MGN101 + ECO113)',
      subtitle: 'Accounting, Management & Microeconomics Handbook',
      driveUrl: 'https://drive.google.com/file/d/1DQr8yKI_4RaafZTSeoepctxH6KyvjZkG/view?usp=sharing',
      tag: '💼 BBA Master Kit',
      color: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300'
    },
    {
      title: 'Exam / Midterm Prep Kit: 5 High-Impact AI Prompts',
      subtitle: 'Mentor Prompt Methodology for Claude & ChatGPT',
      driveUrl: 'https://drive.google.com/file/d/1FWbbc1wxgL8VeMxItp4VzU6iNk-fFWM7/view?usp=sharing',
      tag: '⚡ 5 AI Prompts PDF',
      color: 'border-purple-500/40 bg-purple-500/5 text-purple-300'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-14">
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/40 text-amber-300 shadow-sm shadow-amber-500/10">
          <span className="animate-pulse">🔥</span>
          <span>University Mid-Term Exams 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-zinc-300">B.Tech &middot; BBA &middot; PVA &middot; AI Tools</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
          Beat the Mid-Term Curve.{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400">
            Pass with Zero Stress.
          </span>
        </h1>

        <p className="text-xs sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          The all-in-one exam toolkit: verified Google Drive vault for B.Tech, BBA &amp; PVA, safe passing score predictor, 72-hour emergency revision planner, and AI study prompts created by <strong className="text-white">OG Jatin Verma</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2">
          <Link
            href="/midterm/resources"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
          >
            <FolderArchive className="w-4 h-4" />
            Study Resources &amp; PYQs (All Streams)
          </Link>

          <Link
            href="/midterm/resources?stream=ai"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4" />
            AI Study Prompts &amp; Tools
          </Link>

          <Link
            href="/midterm/calculator"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-card hover:bg-surface-elevated text-zinc-200 hover:text-white border border-surface-border text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            Safe Score Calculator
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <Share2 className="w-4 h-4" />
            Share WhatsApp
          </a>
        </div>
      </div>

      {/* ── Stream Quick Jump Cards ──────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>🎓</span> Choose Your Program Stream
          </h2>
          <span className="text-xs text-zinc-400 font-mono">Updated Oct 2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {streamHighlights.map((stream) => {
            const Icon = stream.icon;
            return (
              <Link
                key={stream.name}
                href={stream.href}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${stream.color} border hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between group shadow-sm`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-surface-base/80 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white">
                      {stream.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {stream.name}
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5 line-clamp-1">
                      {stream.code}
                    </p>
                    <p className="text-xs text-zinc-300/90 leading-relaxed mt-2 line-clamp-2">
                      {stream.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white">
                  <span>Explore Vault</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Featured Master Guides ──────────────────────────────────── */}
      <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-950/20 via-surface-card to-purple-950/20 border border-amber-500/30 space-y-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h2 className="text-base sm:text-xl font-bold font-display text-white">
                Official Pinned Master Guides by OG Jatin Verma
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              High-yield summary handbooks, exam weightage breakdowns, and AI prompt kits directly accessible on Google Drive.
            </p>
          </div>
          <a
            href={MASTER_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors self-start sm:self-center"
          >
            <span>Open Root Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {featuredGuides.map((guide) => (
            <a
              key={guide.title}
              href={guide.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-surface-base/80 border border-surface-border hover:border-amber-500/50 hover:bg-surface-elevated/90 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${guide.color}`}>
                  {guide.tag}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-[11px] text-zinc-400 line-clamp-2">
                  {guide.subtitle}
                </p>
              </div>
              <div className="pt-3 mt-2 border-t border-surface-border/60 flex items-center justify-between text-[11px] font-semibold text-brand-400">
                <span>View on Drive</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Interactive 5 AI Study Prompts Quick Launcher ────────────── */}
      <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-surface-card to-surface-elevated border border-surface-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center text-sm font-bold">
                ⚡
              </span>
              <h2 className="text-base sm:text-xl font-bold font-display text-white">
                5 High-Impact AI Study Prompts (Ready-to-Copy)
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              The mentor-style study system from Jatin Verma: understand, practice, diagnose, simulate &amp; revise.
            </p>
          </div>
          <Link
            href="/midterm/resources?stream=ai"
            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors self-start sm:self-center"
          >
            <span>View Full AI Suite</span> &rarr;
          </Link>
        </div>

        {/* Prompt selector tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {AI_STUDY_PROMPTS.map((prompt, idx) => (
            <button
              key={prompt.id}
              onClick={() => setSelectedPromptIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedPromptIndex === idx
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500'
                  : 'bg-surface-base text-zinc-400 hover:text-white border border-surface-border hover:bg-surface-elevated'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">
                {prompt.number}
              </span>
              <span>{prompt.title}</span>
            </button>
          ))}
        </div>

        {/* Selected prompt card */}
        <div className="p-4 sm:p-5 rounded-xl bg-surface-base/90 border border-purple-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Prompt #{currentPrompt.number} &middot; {currentPrompt.tagline}
                </span>
                <span className="text-xs font-bold text-white">
                  {currentPrompt.title}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {currentPrompt.summary} &bull; <strong className="text-zinc-300">Best used:</strong> {currentPrompt.useWhen}
              </p>
            </div>

            <button
              onClick={() => handleCopyPrompt(currentPrompt.template)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 shrink-0 self-start sm:self-center"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-3.5 sm:p-4 rounded-lg bg-surface-card border border-surface-border text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto selection:bg-purple-500/30">
            {currentPrompt.template}
          </pre>

          <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
            <span>Copy and paste directly into Claude, ChatGPT, or Google Gemini. Replace placeholder bracket texts with your subject details.</span>
          </p>
        </div>
      </div>

      {/* ── Core Mid-Term Toolkit Grid ───────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base sm:text-xl font-bold font-display text-white">
            Mid-Term Survival &amp; Exam Tools
          </h2>
          <p className="text-xs text-zinc-400">
            Engineered to calculate safe marks, plan remaining revision hours, and prevent backlogs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group p-5 sm:p-6 rounded-2xl bg-surface-card/60 border border-surface-border hover:border-surface-border-hover hover:bg-surface-elevated/60 transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tool.tagColor}`}>
                      {tool.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-surface-border/40 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono text-[11px]">{tool.stats}</span>
                  <span className="text-brand-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Launch <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── 80/20 Mid-Term Survival Strategy ─────────────────────────── */}
      <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-surface-card/90 to-surface-elevated/70 border border-surface-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">
            ⚡
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold font-display text-white">
              The 3 Golden Rules of University Mid-Terms
            </h2>
            <p className="text-xs text-zinc-400">
              Battle-tested advice from top university seniors and exam toppers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
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

      {/* ── Share Strip ──────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-brand-950/40 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h2 className="text-sm sm:text-base font-bold text-white">Help Your Classmates Clear Mid-Terms!</h2>
          <p className="text-xs text-zinc-400">
            Share the Mid-Term Survival Kit directly in your branch WhatsApp and Telegram groups.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-xl bg-surface-elevated text-zinc-300 hover:text-white text-xs font-semibold border border-surface-border transition-colors"
          >
            {copiedLink ? 'Link Copied! ✅' : 'Copy Link'}
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
