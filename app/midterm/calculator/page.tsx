'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Share2,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Info
} from 'lucide-react';

export default function MidtermScoreCalculatorPage() {
  const [caScore, setCaScore] = useState<number>(20);
  const [caMax, setCaMax] = useState<number>(30);
  const [mteMax, setMteMax] = useState<number>(30);
  const [targetGoal, setTargetGoal] = useState<'pass' | 'c' | 'b' | 'a' | 'o'>('b');

  // Passing targets out of 100 aggregate:
  const targetThresholds = {
    pass: { label: 'Just Pass (40%)', total: 40, color: 'text-amber-400' },
    c: { label: 'Grade C / 5 CGPA (50%)', total: 50, color: 'text-sky-400' },
    b: { label: 'Grade B / 6.5 CGPA (60%)', total: 60, color: 'text-emerald-400' },
    a: { label: 'Grade A / 8 CGPA (75%)', total: 75, color: 'text-brand-400' },
    o: { label: 'Grade O / 9+ CGPA (90%)', total: 90, color: 'text-rose-400' },
  };

  const currentTarget = targetThresholds[targetGoal].total;

  // Normalization:
  // Standard university distribution: CA = 25%, MTE = 25%, ETE = 50%
  const caNormalized = Math.min(25, Math.max(0, (caScore / (caMax || 30)) * 25));
  
  // Points needed from (MTE + ETE)
  const remainingNeeded = Math.max(0, currentTarget - caNormalized);

  // Minimum MTE marks (out of mteMax) needed so that required ETE score is feasible (<= 50% in ETE)
  // Let M be MTE score. MTE contribution = (M / mteMax) * 25.
  // We want ETE needed <= 40% (20 points out of 50).
  // So: MTE_contrib = remainingNeeded - 20 => M = ((remainingNeeded - 20) / 25) * mteMax.
  let rawRequiredMte = ((remainingNeeded - 20) / 25) * mteMax;
  if (targetGoal === 'pass') {
    // For pass (40 total), if CA is good, even 0 in MTE might mathematically pass, but university requires MTE >= 30% or ETE >= 30%
    rawRequiredMte = Math.max(rawRequiredMte, mteMax * 0.25); // At least 25-30% safe buffer
  }
  const minSafeMte = Math.min(mteMax, Math.max(0, Math.round(rawRequiredMte)));

  // Scenarios table
  const testScores = [
    Math.round(mteMax * 0.3), // 30% border
    Math.round(mteMax * 0.5), // 50% average
    Math.round(mteMax * 0.7), // 70% strong
    Math.round(mteMax * 0.9), // 90% topper
  ];

  const scenarios = testScores.map((mVal) => {
    const mteContrib = (mVal / mteMax) * 25;
    const etePointsNeeded = Math.max(0, currentTarget - caNormalized - mteContrib);
    // ETE is out of 100 with 50% weight => raw ETE mark needed = (etePointsNeeded / 50) * 100
    const rawEteNeeded = Math.round((etePointsNeeded / 50) * 100);
    return {
      mteScore: mVal,
      eteNeededOutOf100: Math.min(100, Math.max(0, rawEteNeeded)),
      risk: rawEteNeeded > 65 ? 'High Pressure' : rawEteNeeded > 40 ? 'Moderate' : 'Safe Zone 🟢',
      riskColor: rawEteNeeded > 65 ? 'text-rose-400' : rawEteNeeded > 40 ? 'text-amber-400' : 'text-emerald-400',
    };
  });

  const isCaCritical = caNormalized < 10;

  // WhatsApp share link
  const shareMsg = `Bhai maine check kiya, CA score ${caScore}/${caMax} ke saath mujhe Mid-Term me sirf ${minSafeMte}/${mteMax} marks chahiye ${targetThresholds[targetGoal].label} ke liye! Tu bhi apna check kar: https://ogedu-portal.vercel.app/midterm/calculator`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMsg)}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/15 border border-brand-500/30 text-brand-300">
          <Calculator className="w-3.5 h-3.5" />
          <span>Continuous Assessment + MTE + ETE Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          Mid-Term Minimum Safe Marks Predictor
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Enter your current internal marks (CA) to find the exact score needed in Mid-Terms to eliminate End-Term anxiety.
        </p>
      </div>

      {/* Main Interactive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-surface-border/60 pb-3">
            <span>1. Enter Your Internal Scores</span>
          </h2>

          {/* CA Score */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-zinc-300">Current Continuous Assessment (CA) Score:</span>
              <span className="text-brand-400 font-mono font-bold text-sm">{caScore} / {caMax}</span>
            </div>
            <input
              type="range"
              min="0"
              max={caMax}
              value={caScore}
              onChange={(e) => setCaScore(Number(e.target.value))}
              className="w-full h-2 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] text-zinc-500">Max Scale:</span>
              <button
                type="button"
                onClick={() => { setCaMax(30); if (caScore > 30) setCaScore(20); }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${caMax === 30 ? 'bg-brand-500 text-white' : 'bg-surface-elevated text-zinc-400'}`}
              >
                30 Marks (LPU/Standard)
              </button>
              <button
                type="button"
                onClick={() => { setCaMax(100); }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${caMax === 100 ? 'bg-brand-500 text-white' : 'bg-surface-elevated text-zinc-400'}`}
              >
                100 Marks
              </button>
            </div>
          </div>

          {/* MTE Total */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300">
              Mid-Term Paper Total Marks:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMteMax(30)}
                className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${mteMax === 30 ? 'bg-brand-500/20 border-brand-500 text-white' : 'bg-surface-elevated/40 border-surface-border text-zinc-400 hover:text-white'}`}
              >
                30 Marks (Standard)
              </button>
              <button
                type="button"
                onClick={() => setMteMax(50)}
                className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${mteMax === 50 ? 'bg-brand-500/20 border-brand-500 text-white' : 'bg-surface-elevated/40 border-surface-border text-zinc-400 hover:text-white'}`}
              >
                50 Marks (Extended)
              </button>
            </div>
          </div>

          {/* Target Grade Goal */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300">
              Your Target Grade Goal:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(targetThresholds) as Array<keyof typeof targetThresholds>).map((key) => {
                const isSelected = targetGoal === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTargetGoal(key)}
                    className={`p-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                      isSelected
                        ? 'bg-brand-500/20 border-brand-500 text-white shadow-sm'
                        : 'bg-surface-elevated/40 border-surface-border text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">{targetThresholds[key].label}</div>
                    <div className="text-[10px] text-zinc-500">Min {targetThresholds[key].total}% Aggregate</div>
                  </button>
                );
              })}
            </div>
          </div>

          {isCaCritical && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Low CA Alert:</strong> Your continuous assessment points are critically low. You will need a strong performance in both MTE and ETE to avoid a backlog.
              </span>
            </div>
          )}
        </div>

        {/* Right Output: Target & Gauge */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-surface-card to-surface-elevated border border-surface-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Predicted Target Result
              </span>
              <span className={`text-xs font-bold ${targetThresholds[targetGoal].color}`}>
                Goal: {targetThresholds[targetGoal].label}
              </span>
            </div>

            {/* Target MTE Hero Box */}
            <div className="p-6 rounded-2xl bg-surface-base/80 border border-surface-border text-center space-y-2">
              <div className="text-xs text-zinc-400 font-medium">
                Minimum Recommended Mid-Term Score:
              </div>
              <div className="text-4xl sm:text-5xl font-black font-display text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-rose-400">
                  {minSafeMte}
                </span>
                <span className="text-xl text-zinc-500"> / {mteMax}</span>
              </div>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto pt-1">
                Scoring at least <strong className="text-white">{minSafeMte} marks</strong> gives you a comfortable safety cushion before End-Term examinations.
              </p>
            </div>

            {/* Scenarios Table */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                <span>Mid-Term vs. End-Term Pressure Table:</span>
                <span className="text-[11px] text-zinc-500">ETE out of 100</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-surface-border">
                <table className="w-full text-xs text-left">
                  <thead className="bg-surface-elevated text-zinc-400 font-semibold border-b border-surface-border">
                    <tr>
                      <th className="p-2.5">If MTE Score Is</th>
                      <th className="p-2.5">End-Term Needed</th>
                      <th className="p-2.5">Exam Stress Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/40 font-mono">
                    {scenarios.map((sc, idx) => (
                      <tr key={idx} className="hover:bg-surface-elevated/40 transition-colors">
                        <td className="p-2.5 font-bold text-white">{sc.mteScore} / {mteMax}</td>
                        <td className="p-2.5 text-zinc-200">{sc.eteNeededOutOf100} / 100</td>
                        <td className={`p-2.5 font-bold ${sc.riskColor}`}>{sc.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Share Button */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share My Safe Score in WhatsApp Group
            </a>
          </div>
        </div>
      </div>

      {/* Educational Walkthrough / UGC Rules */}
      <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4 text-xs sm:text-sm text-zinc-400 leading-relaxed">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-brand-400" />
          How University Grading Works in Mid-Terms
        </h3>
        <p>
          In universities following the standard UGC Choice Based Credit System (CBCS), courses are evaluated through three primary components:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-300">
          <li><strong>Continuous Assessment (CA):</strong> Accounts for 25% or 30% of your grade (quizzes, assignments, attendance, lab tests).</li>
          <li><strong>Mid-Term Exam (MTE):</strong> Accounts for 20% to 25% of your final semester grade.</li>
          <li><strong>End-Term Exam (ETE):</strong> Accounts for 50% of your final semester grade.</li>
        </ul>
        <p>
          To pass overall, universities typically require at least <strong>30% in ETE</strong> and a minimum combined aggregate of <strong>40% across CA + MTE + ETE</strong>.
        </p>
      </div>
    </div>
  );
}
