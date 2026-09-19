'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Copy,
  CheckCircle2,
  Send,
  Building,
  User
} from 'lucide-react';

export default function MidtermAttendancePage() {
  const [totalClasses, setTotalClasses] = useState<number>(45);
  const [attendedClasses, setAttendedClasses] = useState<number>(32);
  const [medicalDays, setMedicalDays] = useState<number>(2);
  const [dutyDays, setDutyDays] = useState<number>(1);

  // Student Info for Letter
  const [studentName, setStudentName] = useState<string>('Jatin Verma');
  const [regNo, setRegNo] = useState<string>('12215432');
  const [courseBranch, setCourseBranch] = useState<string>('B.Tech CSE, 3rd Year');
  const [reason, setReason] = useState<string>('Acute viral illness and recovery under medical supervision');
  const [copiedLetter, setCopiedLetter] = useState<boolean>(false);

  // Calculations
  const rawPercentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
  
  // Approximate classes added by medical/duty (average 2.5 lectures per day)
  const leaveCreditClasses = Math.round((medicalDays + dutyDays) * 2.5);
  const adjustedAttended = Math.min(totalClasses, attendedClasses + leaveCreditClasses);
  const adjustedPercentage = totalClasses > 0 ? (adjustedAttended / totalClasses) * 100 : 0;

  // Safe margin calculation: x = 3T - 4P
  const classesNeededFor75 = Math.max(0, 3 * totalClasses - 4 * attendedClasses);

  const isRawEligible = rawPercentage >= 75;
  const isAdjustedEligible = adjustedPercentage >= 75;

  // Generate Letter Text
  const letterText = `To,
The Dean / Head of Department,
School of Computer Science & Engineering,
Lovely Professional University / Academic Portal.

Subject: Request for Attendance Condonation / Admit Card Approval for Mid-Term Examinations 2026.

Respected Sir/Madam,

I am ${studentName}, a student of ${courseBranch}, bearing Registration Number ${regNo}.

I am writing this application to formally request the condonation of my short attendance for the upcoming Mid-Term Examinations 2026. My current recorded attendance stands at ${rawPercentage.toFixed(1)}%, which is temporarily below the mandatory 75% threshold due to unavoidable circumstances (${reason}).

I have attached the authentic medical certificates / official university duty clearance slips representing ${medicalDays + dutyDays} day(s) of legitimate absence. With these approved leaves considered, my effective attendance reaches ${adjustedPercentage.toFixed(1)}%, satisfying the university condonation criteria.

I have consistently maintained good academic standing in my Continuous Assessments (CA) and assure the department of high performance in the upcoming examinations.

Kindly grant approval for my Mid-Term Admit Card / Hall Ticket so that I may sit for the scheduled examinations without disruption.

Thanking You.

Yours sincerely,
${studentName}
Registration No: ${regNo}
Department: ${courseBranch}
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
Attachments: Medical Prescription / Duty Clearance Slips`;

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(letterText);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-500/30 text-sky-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Mid-Term Hall Ticket Verification</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          Mid-Term Attendance & Condonation Tool
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Check if your attendance meets the 75% cutoff for Mid-Term admit cards and instantly generate a formal leave letter for your HOD.
        </p>
      </div>

      {/* Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Attendance Calculator */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-surface-border/60 pb-3">
            <span>1. Attendance Calculator</span>
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">Total Lectures Held:</label>
              <input
                type="number"
                min="1"
                value={totalClasses}
                onChange={(e) => setTotalClasses(Math.max(1, Number(e.target.value)))}
                className="w-full p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-sm font-bold text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">Lectures Attended:</label>
              <input
                type="number"
                min="0"
                max={totalClasses}
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(Math.min(totalClasses, Math.max(0, Number(e.target.value))))}
                className="w-full p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-sm font-bold text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Status Display Card */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isRawEligible
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
          }`}>
            {isRawEligible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="text-sm font-bold">
                Current Attendance: {rawPercentage.toFixed(1)}% &mdash; {isRawEligible ? 'Eligible for Admit Card' : 'Shortage Detected'}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {isRawEligible
                  ? 'Your attendance is safely above 75%. You can sit for Mid-Terms without administrative obstacles.'
                  : `You are below 75%. You need to attend the next ${classesNeededFor75} consecutive classes OR submit approved medical/duty leave slips to condone the shortage.`}
              </p>
            </div>
          </div>

          {/* Medical / Duty Simulator */}
          <div className="space-y-3 pt-2 border-t border-surface-border/40">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              2. Leave Condonation Simulator
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs text-zinc-400">Medical Leave Days:</label>
                <input
                  type="number"
                  min="0"
                  value={medicalDays}
                  onChange={(e) => setMedicalDays(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-zinc-400">Club / Duty Days:</label>
                <input
                  type="number"
                  min="0"
                  value={dutyDays}
                  onChange={(e) => setDutyDays(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-white"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface-elevated/60 text-xs text-zinc-300 flex items-center justify-between">
              <span>Adjusted Attendance with Approved Leaves:</span>
              <span className={`font-mono font-bold text-sm ${isAdjustedEligible ? 'text-emerald-400' : 'text-amber-400'}`}>
                {adjustedPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Formal Letter Generator */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-6">
          <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>HOD Medical Leave Application</span>
            </h2>
            <button
              onClick={handleCopyLetter}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedLetter ? 'Copied! ✅' : 'Copy Application'}
            </button>
          </div>

          {/* Edit placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Your Full Name"
              className="p-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-zinc-200"
            />
            <input
              type="text"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="Registration Number"
              className="p-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-zinc-200"
            />
          </div>

          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Medical / Absence Reason"
            className="w-full p-2 rounded-lg bg-surface-elevated border border-surface-border text-xs text-zinc-200"
          />

          {/* Letter Preview */}
          <div className="p-4 rounded-xl bg-surface-base border border-surface-border font-mono text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
            {letterText}
          </div>
        </div>
      </div>
    </div>
  );
}
