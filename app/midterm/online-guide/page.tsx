'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Video,
  Calendar,
  Clock,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Share2,
  Compass,
  Laptop,
  CheckSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  Info,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  FileText
} from 'lucide-react';

export default function LpuOnlineClassMidtermGuidancePage() {
  const [selectedScenario, setSelectedScenario] = useState<string>('home');
  const [timelineFilter, setTimelineFilter] = useState<string>('all');
  const [checkedSteps, setCheckedSteps] = useState<{ [key: number]: boolean }>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  });

  // RMS Ticket Generator State
  const [rmsCategory] = useState<string>('Academics');
  const [rmsSubCategory] = useState<string>('Online Classes');
  const [rmsIssueType, setRmsIssueType] = useState<string>('attendance');
  const [studentName, setStudentName] = useState<string>('');
  const [regNo, setRegNo] = useState<string>('');
  const [courseCode, setCourseCode] = useState<string>('CSE205');
  const [classDate, setClassDate] = useState<string>('2026-10-05');
  const [customDetail, setCustomDetail] = useState<string>('Attended full lecture from 10:00 AM to 11:00 AM on My Class, but attendance status on UMS is reflecting Absent/Pending due to platform timeout.');
  const [copiedRms, setCopiedRms] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleStep = (id: number) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shareText = "LPU Notice (29 Sept 2026): Online Classes (5-7 Oct), Doubt Sessions (8-9 Oct), Travel Windows & Mid-Term Tests (12-17 Oct). Check complete guidance & steps to attend My Class: https://ogedu-portal.vercel.app/midterm/online-guide";
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText('https://ogedu-portal.vercel.app/midterm/online-guide');
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleCopyRms = () => {
    navigator.clipboard.writeText(rmsTicketText);
    setCopiedRms(true);
    setTimeout(() => setCopiedRms(false), 2500);
  };

  // Generate RMS ticket format
  const displayStudentName = studentName.trim() || '[Your Name]';
  const displayRegNo = regNo.trim() || '[Your Registration Number]';

  const rmsTicketText = `RMS CATEGORY: ${rmsCategory}
RMS SUB-CATEGORY: ${rmsSubCategory}
REGISTRATION NUMBER: ${displayRegNo}
STUDENT NAME: ${displayStudentName}
COURSE CODE: ${courseCode}
DATE OF CLASS: ${classDate}
ISSUE TYPE: ${
    rmsIssueType === 'attendance'
      ? 'Online Class Attendance Discrepancy'
      : rmsIssueType === 'login'
      ? 'LPU My Class Authentication / Portal Error'
      : rmsIssueType === 'mtt'
      ? 'Mid-Term Test (MTT) Schedule Query / Conflict'
      : 'General Academic Online Class Query'
  }

DESCRIPTION:
Respected Academic Team,
I am ${displayStudentName} (Reg. No: ${displayRegNo}). Regarding the online classes conducted on LPU My Class as per the official notification dated 29 Sept 2026:

${customDetail}

Kindly review my active connection logs / session records on the LPU My Class platform and update my records accordingly.

Thank you,
${displayStudentName}
Reg No: ${displayRegNo}`;

  // Steps to Remember for Online Classes
  const onlineSteps = [
    {
      id: 1,
      step: 'Step 1',
      title: 'Verify Updated Timetable on UMS & LPUTouch',
      tag: 'Prerequisite',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      desc: 'Log in to UMS (ums.lpu.in) or open the LPUTouch app. Navigate to "My Timetable" and check "UMS My Messages" for the updated schedule specifically active for 5, 6, and 7 October 2026.',
      actionPoint: 'Confirm course codes, slot timings (e.g. 09:00 AM - 10:00 AM), and designated faculty names beforehand.'
    },
    {
      id: 2,
      step: 'Step 2',
      title: 'Access the LPU My Class Platform',
      tag: 'Access Portal',
      tagColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      desc: 'Open Google Chrome or Microsoft Edge on your laptop/desktop (recommended) and navigate to myclass.lpu.in, or tap the "My Class" quick link in UMS / LPUTouch app.',
      actionPoint: 'Login with your University Registration Number and UMS Password. If required, authenticate via your university Google/Outlook ID.'
    },
    {
      id: 3,
      step: 'Step 3',
      title: 'Perform Pre-Flight Audio & Network Check',
      tag: 'Hardware Check',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      desc: 'Ensure your internet connection is stable (minimum 5-10 Mbps). Grant camera and microphone permissions when prompted by your browser.',
      actionPoint: 'Keep earphones/headphones ready to eliminate mic feedback and background echo. Keep a mobile hotspot hotspot as backup.'
    },
    {
      id: 4,
      step: 'Step 4',
      title: 'Join Class 5 Minutes Prior to Scheduled Slot',
      tag: 'Punctuality',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      desc: 'Under your My Class dashboard, locate your subject card with the active "Live Now" or "Join" button. Click to enter the virtual lecture room 5 minutes early.',
      actionPoint: 'Enter with your microphone MUTED. Enable video only if explicitly requested by your course instructor.'
    },
    {
      id: 5,
      step: 'Step 5',
      title: 'Compulsory Attendance Compliance (CRITICAL)',
      tag: '100% Mandatory',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      desc: 'Attendance in online classes on 5, 6, and 7 October 2026 is strictly COMPULSORY. The platform logs your active connection duration automatically.',
      actionPoint: 'Stay connected for the entire duration. Do not exit early. Respond immediately to roll calls or in-class attendance verification polls.'
    },
    {
      id: 6,
      step: 'Step 6',
      title: 'Use Interactive Features & Raise Hand for Doubts',
      tag: 'Engagement',
      tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      desc: 'Use the "Raise Hand" icon to request permission to speak. Post academic questions in the live chat box and download slides from the shared files repository.',
      actionPoint: 'Keep chat clean and academic. Faculty records chat logs for participation points.'
    },
    {
      id: 7,
      step: 'Step 7',
      title: 'Access Recorded Lectures for Post-Class Revision',
      tag: 'Self Study',
      tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      desc: 'If you experienced brief power cuts or bandwidth drops, check the "Recorded Lectures" tab on LPU My Class. Recordings are usually uploaded within 2 to 4 hours.',
      actionPoint: 'Use recordings to clarify formulas and concepts before the doubt sessions on 8 & 9 October.'
    },
    {
      id: 8,
      step: 'Step 8',
      title: 'Raise RMS Ticket for Any Attendance or Tech Issue',
      tag: 'Resolution',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      desc: 'If your session crashed or your attendance failed to reflect on UMS within 24 hours, file an RMS ticket under Category: Academics, Sub Category: Online Classes.',
      actionPoint: 'Take a screenshot of your connection error or timestamp and attach it to the RMS ticket.'
    }
  ];

  // Timeline events
  const timelineEvents = [
    {
      dates: '28 Sep – 07 Oct 2026',
      title: 'Offline Classes Suspended',
      type: 'suspension',
      badge: 'Precautionary Measure',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      desc: 'Offline teaching suspended across all schools to avoid anxiety and false rumours. Campus is stable, safe, and closely monitored. University assures zero dilution of academic calendar.'
    },
    {
      dates: '05, 06 & 07 Oct 2026',
      title: 'Compulsory Online Classes (LPU My Class)',
      type: 'online',
      badge: 'Compulsory Attendance',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      desc: 'Classes conducted online via LPU My Class platform. Attendance is strictly compulsory and counts towards 75% exam eligibility. Updated timetable available on UMS & My Class.'
    },
    {
      dates: '08 & 09 Oct 2026',
      title: 'Doubt-Clearing Sessions & Lab Revision',
      type: 'doubt',
      badge: 'Hybrid (Online + Offline) • Optional',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      desc: 'Sessions conducted in both online and offline modes to prepare students for MTT. Attendance is OPTIONAL: Students attending are marked present; students not attending are NOT marked absent. Campus labs remain open for practice.'
    },
    {
      dates: '08 or 09 Oct 2026',
      title: 'Offline Doubt Attendees Travel Window',
      type: 'travel',
      badge: 'Travel to Campus',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      desc: 'Students wishing to attend doubt-clearing sessions physically in offline mode may travel back to the University on 8 or 9 October 2026.'
    },
    {
      dates: '10 & 11 Oct 2026',
      title: 'Online Attendees Return Travel Window',
      type: 'travel',
      badge: 'Weekend Travel Window',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      desc: 'Students attending doubt-clearing sessions online from home may utilize Saturday (10 Oct) and Sunday (11 Oct) to travel back to the University hostels / campus.'
    },
    {
      dates: '12 – 17 Oct 2026',
      title: 'Mid-Term Tests (MTT) Examination Week',
      type: 'exam',
      badge: 'Major Exams',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      desc: 'Mid-Term Tests conducted across University as per updated MTT date sheet communicated through UMS. Students with no MTT / already conducted MTT resume regular offline classes from 12 Oct.'
    },
    {
      dates: 'Autumn Term & Spring Term Updates',
      title: 'Academic Calendar Extension & Practical Exams',
      type: 'calendar',
      badge: 'Calendar Adjustment',
      badgeColor: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/40',
      desc: 'Autumn Term 2026-27 will be suitably extended. End-Term Practical Examinations will be conducted AFTER End-Term Theory Examinations. Spring Term commencement date to be shared via UMS My Messages.'
    },
    {
      dates: 'Ongoing as Scheduled',
      title: 'Placement Drives & Corporate Interviews',
      type: 'placement',
      badge: 'No Suspension',
      badgeColor: 'bg-brand-500/20 text-brand-300 border-brand-500/40',
      desc: 'Placement drives will continue to be conducted as scheduled without interruption. Registered students must check UMS regularly. Some students may need to report earlier based on company needs.'
    }
  ];

  const filteredTimeline = timelineEvents.filter((item) => {
    if (timelineFilter === 'all') return true;
    if (timelineFilter === 'online') return item.type === 'online';
    if (timelineFilter === 'doubt') return item.type === 'doubt';
    if (timelineFilter === 'travel') return item.type === 'travel';
    if (timelineFilter === 'exam') return item.type === 'exam';
    return true;
  });

  const faqs = [
    {
      q: 'Is attendance in online classes on 5, 6, and 7 October mandatory?',
      a: 'Yes, 100% compulsory. The university circular explicitly states that attendance in these online classes will be compulsory and will contribute directly to your 75% attendance criteria. Be sure to stay logged in for each scheduled slot.'
    },
    {
      q: 'Will I be marked absent if I miss the doubt-clearing sessions on 8 and 9 October?',
      a: 'No! The university circular specifically guarantees: "Attendance at these sessions will be optional. Students attending the sessions will be marked present, while those not attending will NOT be marked absent."'
    },
    {
      q: 'When should I book my travel tickets back to LPU?',
      a: 'If you are attending doubt sessions in offline mode on campus, travel on 8 or 9 October. If you are attending doubt sessions online from home, travel on 10 or 11 October (Saturday/Sunday) so that you are on campus by the evening of 11 October, ready for MTT on 12 October.'
    },
    {
      q: 'What if my Mid-Term Tests (MTT) are already over or I have no MTT?',
      a: 'As stated in Point 6 of the circular, students having no MTT or whose MTT has already been conducted will follow the online class schedule (5–7 Oct) and doubt sessions (8–9 Oct), and will resume regular offline classes from 12 October 2026.'
    },
    {
      q: 'Are upcoming Placement Drives cancelled or postponed?',
      a: 'No. Placement drives will continue to be conducted exactly as scheduled. Registered students must check UMS My Messages frequently. Depending on company requirements, some candidates may be requested to report to campus earlier.'
    },
    {
      q: 'How will End-Term Practical Exams be handled after term extension?',
      a: 'To accommodate the schedule without any academic loss, the End-Term Practical Examinations will be conducted after the End-Term Theory Examinations. The final commencement date for Spring Term 2026-27 will be notified via UMS My Messages.'
    },
    {
      q: 'What should I do if I face an attendance issue or technical error on My Class?',
      a: 'Submit an RMS ticket on UMS under Category: "Academics" and Sub Category: "Online Classes". You can use our 1-click RMS Ticket Generator below to copy a pre-formatted complaint.'
    }
  ];

  const visualWalkthroughSteps = [
    {
      step: 1,
      badge: 'Step 1 • Portal Discovery',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      title: 'Search "myclass lpu" on Google or Open Direct Link',
      urlSnippet: 'myclass.lpu.in',
      desc: 'Google par "myclass lpu" search karein aur first official result https://myclass.lpu.in open karein, ya fir aapke UMS portal / LPUTouch app par bhi direct "My Class" icon mil jayega.',
      imgSrc: '/images/myclass/step1-google-search.png',
      caption: 'Screenshot 1: Google Search result for official LPU My Class link',
      actionUrl: 'https://myclass.lpu.in',
      actionText: 'Open myclass.lpu.in ↗'
    },
    {
      step: 2,
      badge: 'Step 2 • Authentication',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      title: 'Enter Your UMS Registration Number & Password',
      urlSnippet: 'UMS Credentials',
      desc: 'Login screen par apna official University Registration Number (e.g. 122XXXXX) aur UMS password enter karke Login button par click karein. Yeh portal CodeTantra dwara powered hai.',
      imgSrc: '/images/myclass/step2-login-codetantra.png',
      caption: 'Screenshot 2: LPU My Class CodeTantra Login Screen',
      proTip: 'Agar "Invalid credentials" ya "Your password has expired" aaye, toh turant UMS portal se password reset karein ya default password check karein.'
    },
    {
      step: 3,
      badge: 'Step 3 • Student Hub',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      title: 'CodeTantra Student Dashboard (Courses, Labs & Meetings)',
      urlSnippet: 'Student Home',
      desc: 'Login hone ke baad aapko wahi dashboard dikhega jahan aap apni Python ya doosri coding languages practice karte hain. Yahan 5 primary sections hote hain: View Classes/Meetings, Courses, Tests, Programming Labs, aur Tools.',
      imgSrc: '/images/myclass/step3-codetantra-dashboard.png',
      caption: 'Screenshot 3: Unified dashboard showing View Classes/Meetings, Courses, Tests & Labs'
    },
    {
      step: 4,
      badge: 'Step 4 • Classroom Entry',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      title: 'Click on "View Classes/Meetings" Card',
      urlSnippet: 'Classroom Entry',
      desc: 'Live lecture attend karne ke liye sabse pehle card "View Classes/Meetings" par click karein ("Click here to join or view all your live and recorded classes/meetings").',
      imgSrc: '/images/myclass/step4-view-classes-meetings.png',
      caption: 'Screenshot 4: Click on View Classes/Meetings Card'
    },
    {
      step: 5,
      badge: 'Step 5 • Live Classroom',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      title: 'Check Timetable Grid & Join Live Lecture',
      urlSnippet: 'Timetable & Join',
      desc: 'Yahan aapko day-wise timetable grid dikhegi with India Standard Time (IST) slots. Top bar me status color codes ko dhyan se dekhein: Upcoming (Blue), Delayed (Red), Ongoing (Green - Click to Join!), aur Completed (Grey).',
      imgSrc: '/images/myclass/step5-timetable-live-class.png',
      caption: 'Screenshot 5: Interactive timetable view with hourly slots and meeting join links'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Hero Advisory Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500/10 via-amber-500/10 to-brand-500/10 border border-violet-500/30 text-violet-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Official University Advisory &middot; Circular Ref: 09/29/2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span>Verified Guidance</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
          LPU Online Class &amp;{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-amber-400 to-brand-400">
            Mid-Term Guidance
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Complete roadmap for offline class suspension (28 Sep – 7 Oct), compulsory online classes on{' '}
          <span className="text-amber-300 font-semibold">LPU My Class</span> (5–7 Oct), hybrid doubt sessions (8–9 Oct), travel windows (10–11 Oct), and Mid-Term Tests (12–17 Oct).
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#steps-section"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-brand-600 to-amber-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 hover:opacity-95 transition-opacity flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Steps to Attend Online Class</span>
          </a>

          <a
            href="#timeline-section"
            className="px-5 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-card border border-surface-border text-zinc-200 text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Key Dates Roadmap</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <Share2 className="w-4 h-4" />
            <span>Share with Batchmates</span>
          </a>
        </div>
      </div>

      {/* Official Circular Advisory Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-surface-card/90 to-surface-elevated/70 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-white">University Situation Stable &amp; Closely Monitored</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Verified Circular</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
              All necessary measures are in place to ensure the safety and well-being of all students. Offline class suspension is a precautionary measure to prevent unnecessary anxiety and rumours. Academic calendar is protected with zero academic loss.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyShare}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-surface-elevated text-zinc-300 hover:text-white text-xs font-semibold border border-surface-border transition-colors flex items-center gap-1.5"
        >
          {copiedShare ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Guide Link</span>
            </>
          )}
        </button>
      </div>

      {/* Key Dates At-A-Glance Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card/60 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">Offline Suspended</span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white">28 Sep – 07 Oct</div>
          <p className="text-[11px] text-zinc-400">Precautionary suspension of offline classes across all schools.</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card/60 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">Compulsory Online</span>
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white">05, 06 &amp; 07 Oct</div>
          <p className="text-[11px] text-zinc-400">LPU My Class portal. 100% compulsory attendance on UMS.</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card/60 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">Doubt Sessions</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white">08 &amp; 09 Oct</div>
          <p className="text-[11px] text-zinc-400">Online &amp; Offline modes. Optional attendance (won&apos;t be marked absent).</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card/60 border border-violet-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">Mid-Term Tests</span>
            <span className="w-2 h-2 rounded-full bg-violet-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white">12 – 17 Oct 2026</div>
          <p className="text-[11px] text-zinc-400">Mid-Term Tests (MTT) conducted as per updated UMS date sheet.</p>
        </div>
      </div>

      {/* CORE SECTION: Visual Step-by-Step Guide with Screenshots */}
      <section id="steps-section" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-surface-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Laptop className="w-3.5 h-3.5" />
              <span>Visual Walkthrough with Screenshots</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold font-display text-white">
              How to Attend Online Classes on LPU My Class (CodeTantra)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Follow these exact steps from Google search to entering your live classroom and securing 100% compulsory attendance.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Official 5-Step Process
            </span>
          </div>
        </div>

        {/* Highlight Box: Critical Camera & Attendance Rules from Voice Note */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-surface-card to-rose-950/30 border border-amber-500/40 space-y-3 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Important Instructions for Online Class (5, 6 &amp; 7 October)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-surface-base/70 border border-surface-border space-y-1.5">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-Attendance Logging</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                Aapko class ke beech me <strong>&quot;Present Sir / Present Ma&apos;am&quot; bolne ki zaroorat nahi hai</strong>. LPU My Class platform aapke logged-in active duration ko automatically track karke UMS attendance me mark karta hai.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-base/70 border border-surface-border space-y-1.5">
              <div className="font-bold text-rose-400 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-rose-400" />
                <span>Camera On / Off Rule</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                Camera on karna ya na karna <strong>purely teacher ke instruction par depend karta hai</strong>. Agar faculty prompt kare camera on karne ko, toh <strong>camera zaroor on karein</strong>, warna backend verification issue ho sakta hai!
              </p>
            </div>
          </div>
        </div>

        {/* Visual Screenshots Step-by-Step Cards */}
        <div className="space-y-6">
          {visualWalkthroughSteps.map((stepItem) => (
            <div
              key={stepItem.step}
              className="p-5 sm:p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-surface-border-hover transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${stepItem.badgeColor}`}>
                    Step {stepItem.step}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">{stepItem.title}</h3>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">{stepItem.urlSnippet}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{stepItem.desc}</p>

              <div className="rounded-xl overflow-hidden border border-surface-border/80 bg-surface-base shadow-md flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stepItem.imgSrc}
                  alt={stepItem.title}
                  className="w-full h-auto max-h-[460px] object-contain rounded-xl bg-zinc-950/60 p-1 sm:p-2"
                />
                <div className="w-full p-2.5 bg-surface-elevated/90 border-t border-surface-border flex items-center justify-between text-[11px] text-zinc-400">
                  <span>{stepItem.caption}</span>
                  {stepItem.actionUrl && (
                    <a
                      href={stepItem.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      {stepItem.actionText}
                    </a>
                  )}
                </div>
              </div>

              {stepItem.proTip && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                  <strong>Password Issue?</strong> {stepItem.proTip}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Secondary Quick Checklist Header */}
        <div className="pt-6 border-t border-surface-border/80 flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>Class Day Preparation &amp; Best Practices Checklist</span>
          </h3>
          <span className="text-xs text-zinc-400">
            {Object.values(checkedSteps).filter(Boolean).length} / {onlineSteps.length} Completed
          </span>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {onlineSteps.map((s) => {
            const isChecked = !!checkedSteps[s.id];
            return (
              <div
                key={s.id}
                onClick={() => toggleStep(s.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isChecked
                    ? 'bg-surface-elevated/90 border-emerald-500/40 shadow-sm'
                    : 'bg-surface-card/60 border-surface-border hover:border-surface-border-hover'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-zinc-400">{s.step}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${s.tagColor}`}>
                        {s.tag}
                      </span>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'border-zinc-700 bg-surface-base text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{s.title}</h3>

                  <p className="text-xs text-zinc-300 leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-border/50 text-[11px] text-amber-300 flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    <strong>Pro-Tip:</strong> {s.actionPoint}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Scenario & Travel Advisor */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-surface-card/90 to-surface-elevated/70 border border-surface-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-400 flex items-center justify-center font-bold text-lg">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              Personalized Action &amp; Travel Advisor
            </h2>
            <p className="text-xs text-zinc-400">
              Select your current situation to see your custom dates, travel timeline, and prep steps.
            </p>
          </div>
        </div>

        {/* Scenario Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedScenario('home')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedScenario === 'home'
                ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                : 'bg-surface-elevated text-zinc-400 border-surface-border hover:text-white'
            }`}
          >
            🏠 Currently at Home / Online Doubts
          </button>

          <button
            type="button"
            onClick={() => setSelectedScenario('offline-doubt')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedScenario === 'offline-doubt'
                ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                : 'bg-surface-elevated text-zinc-400 border-surface-border hover:text-white'
            }`}
          >
            🏫 Attending Doubts Offline on Campus
          </button>

          <button
            type="button"
            onClick={() => setSelectedScenario('hostel')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedScenario === 'hostel'
                ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                : 'bg-surface-elevated text-zinc-400 border-surface-border hover:text-white'
            }`}
          >
            🏢 Staying in Campus Hostel / PG
          </button>

          <button
            type="button"
            onClick={() => setSelectedScenario('placement')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedScenario === 'placement'
                ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                : 'bg-surface-elevated text-zinc-400 border-surface-border hover:text-white'
            }`}
          >
            💼 Placement Drive Registered
          </button>
        </div>

        {/* Dynamic Scenario Guidance Box */}
        <div className="p-5 rounded-xl bg-surface-base/80 border border-surface-border space-y-4">
          {selectedScenario === 'home' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-300">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>Action Plan: Staying at Home + Online Doubt Sessions</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>5, 6, 7 October:</strong> Attend mandatory online classes from home via LPU My Class. Full attendance compulsory.
                </li>
                <li>
                  <strong>8 &amp; 9 October:</strong> Attend doubt clearing sessions and revision lectures online from home. (Attendance is optional; will not be marked absent).
                </li>
                <li>
                  <strong className="text-amber-300">10 &amp; 11 October (Weekend):</strong> Book your train / flight / bus tickets for these two days to travel back to the University hostels.
                </li>
                <li>
                  <strong>12 – 17 October:</strong> Appear for Mid-Term Tests (MTT) in physical offline exam halls on campus.
                </li>
              </ul>
            </div>
          )}

          {selectedScenario === 'offline-doubt' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-300">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>Action Plan: Traveling Early for Offline Doubt Clearing &amp; Labs</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>5, 6, 7 October:</strong> Attend compulsory online classes on LPU My Class.
                </li>
                <li>
                  <strong className="text-amber-300">8 or 9 October:</strong> Travel back to the University. Check in to your hostel room.
                </li>
                <li>
                  <strong>8 &amp; 9 October:</strong> Attend physical doubt clearing sessions in your respective school departments and utilize university laboratories for practical revision.
                </li>
                <li>
                  <strong>12 – 17 October:</strong> Appear for Mid-Term Tests (MTT) in your designated examination halls.
                </li>
              </ul>
            </div>
          )}

          {selectedScenario === 'hostel' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-300">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>Action Plan: Resident in University Hostel or Phagwara PG</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>5, 6, 7 October:</strong> Attend online lectures from your hostel room / study room using university WiFi or personal data.
                </li>
                <li>
                  <strong>8 &amp; 9 October:</strong> Take full advantage of on-campus faculty availability and open laboratories for coding/practical practice.
                </li>
                <li>
                  <strong>12 – 17 October:</strong> Walk directly to your exam centers for Mid-Term Tests.
                </li>
              </ul>
            </div>
          )}

          {selectedScenario === 'placement' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-300">
                <Briefcase className="w-4 h-4 text-violet-400" />
                <span>Action Plan: Registered for Ongoing Placement Drives</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>Placement Drives Are NOT Suspended:</strong> Placement drives and technical tests continue exactly as scheduled.
                </li>
                <li>
                  <strong>Daily UMS Check:</strong> Monitor "UMS My Messages" and your registered email twice daily for interview schedules and reporting times.
                </li>
                <li>
                  <strong>Early Reporting:</strong> If a recruiting company requires physical presence for interviews or GDs before 12 October, you must report to campus as per individual communication.
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Complete Timeline (28 Sep - 17 Oct) */}
      <section id="timeline-section" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-surface-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Full Schedule</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold font-display text-white">
              Day-by-Day Academic &amp; Exam Timeline
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Filter by activity type to easily plan your attendance, revision, and travel dates.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setTimelineFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                timelineFilter === 'all' ? 'bg-white text-zinc-950 font-bold' : 'bg-surface-elevated text-zinc-400 hover:text-white'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setTimelineFilter('online')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                timelineFilter === 'online' ? 'bg-rose-500 text-white font-bold' : 'bg-surface-elevated text-zinc-400 hover:text-white'
              }`}
            >
              Online Classes (5-7 Oct)
            </button>
            <button
              onClick={() => setTimelineFilter('doubt')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                timelineFilter === 'doubt' ? 'bg-emerald-500 text-white font-bold' : 'bg-surface-elevated text-zinc-400 hover:text-white'
              }`}
            >
              Doubt Sessions (8-9 Oct)
            </button>
            <button
              onClick={() => setTimelineFilter('travel')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                timelineFilter === 'travel' ? 'bg-sky-500 text-white font-bold' : 'bg-surface-elevated text-zinc-400 hover:text-white'
              }`}
            >
              Travel Windows
            </button>
            <button
              onClick={() => setTimelineFilter('exam')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                timelineFilter === 'exam' ? 'bg-purple-500 text-white font-bold' : 'bg-surface-elevated text-zinc-400 hover:text-white'
              }`}
            >
              MTT Exams (12-17 Oct)
            </button>
          </div>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-3">
          {filteredTimeline.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface-card/60 border border-surface-border hover:border-surface-border-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-sm font-bold text-amber-300">{item.dates}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-zinc-300 max-w-3xl leading-relaxed">{item.desc}</p>
              </div>

              <div className="shrink-0">
                {item.type === 'online' && (
                  <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>Compulsory</span>
                  </span>
                )}
                {item.type === 'doubt' && (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Optional (No Absent)</span>
                  </span>
                )}
                {item.type === 'travel' && (
                  <span className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/40 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Return Window</span>
                  </span>
                )}
                {item.type === 'exam' && (
                  <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Datesheet on UMS</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1-Click RMS Ticket Generator */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Relationship Management System (RMS)</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-display text-white">
              Online Class RMS Ticket Generator
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Official circular instruction: Submit queries under Category:{' '}
              <strong className="text-white">Academics</strong> &rarr; Sub Category:{' '}
              <strong className="text-white">Online Classes</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">Issue Category:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRmsIssueType('attendance');
                    setCustomDetail('Attended the scheduled lecture on LPU My Class, but attendance on UMS is reflecting as Absent or Pending due to a temporary server disconnect.');
                  }}
                  className={`p-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                    rmsIssueType === 'attendance'
                      ? 'bg-rose-500/20 border-rose-500 text-white'
                      : 'bg-surface-elevated/40 border-surface-border text-zinc-400 hover:text-white'
                  }`}
                >
                  Attendance Missing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRmsIssueType('login');
                    setCustomDetail('Unable to authenticate into LPU My Class. Portal displays "Invalid session" or "Course roster not mapped" for my registration number.');
                  }}
                  className={`p-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                    rmsIssueType === 'login'
                      ? 'bg-rose-500/20 border-rose-500 text-white'
                      : 'bg-surface-elevated/40 border-surface-border text-zinc-400 hover:text-white'
                  }`}
                >
                  My Class Login Error
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRmsIssueType('mtt');
                    setCustomDetail('Facing a date sheet clash or venue overlap for upcoming Mid-Term Tests (MTT) between two enrolled subjects.');
                  }}
                  className={`p-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                    rmsIssueType === 'mtt'
                      ? 'bg-rose-500/20 border-rose-500 text-white'
                      : 'bg-surface-elevated/40 border-surface-border text-zinc-400 hover:text-white'
                  }`}
                >
                  MTT Clash Query
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] text-zinc-400">Student Name:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] text-zinc-400">Registration Number:</label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="e.g. 12200000"
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] text-zinc-400">Course Code:</label>
                <input
                  type="text"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] text-zinc-400">Class Date:</label>
                <input
                  type="date"
                  value={classDate}
                  onChange={(e) => setClassDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] text-zinc-400">Issue Details / Explanation:</label>
              <textarea
                rows={3}
                value={customDetail}
                onChange={(e) => setCustomDetail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-surface-elevated border border-surface-border text-xs text-white focus:outline-none focus:border-rose-500 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Live RMS Output Box */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <FileText className="w-4 h-4 text-rose-400" />
                <span>Ready-To-Paste RMS Ticket</span>
              </div>

              <button
                type="button"
                onClick={handleCopyRms}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {copiedRms ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Ticket</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-surface-base border border-surface-border font-mono text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
              {rmsTicketText}
            </div>
          </div>

          <div className="pt-3 border-t border-surface-border/50 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Where to submit: UMS &rarr; RMS &rarr; Category: Academics &rarr; Sub: Online Classes</span>
            <a
              href="https://ums.lpu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
            >
              Open UMS <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <section className="space-y-4 pt-4">
        <div className="border-b border-surface-border pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Frequently Asked Questions by LPU Students
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-surface-border bg-surface-card/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-zinc-300 leading-relaxed border-t border-surface-border/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Integration with Full Mid-Term Survival Toolkit */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-surface-card to-brand-500/10 border border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Exams Start 12 Oct</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Prepare For Mid-Term Tests (MTT) with Free Tools
            </h2>
            <p className="text-xs text-zinc-400">
              Calculate your required exam marks, build a 72-hour revision plan, and download 1-page formula sheets.
            </p>
          </div>

          <Link
            href="/midterm"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>Explore All 4 Mid-Term Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <Link
            href="/midterm/calculator"
            className="p-4 rounded-xl bg-surface-elevated/70 border border-surface-border hover:border-amber-500/40 transition-all space-y-1 group"
          >
            <div className="text-xs font-bold text-amber-400 group-hover:text-amber-300">
              Safe Marks Predictor &rarr;
            </div>
            <p className="text-[11px] text-zinc-400">Enter CA marks to calculate minimum passing score.</p>
          </Link>

          <Link
            href="/midterm/planner"
            className="p-4 rounded-xl bg-surface-elevated/70 border border-surface-border hover:border-emerald-500/40 transition-all space-y-1 group"
          >
            <div className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              72h Study Planner &rarr;
            </div>
            <p className="text-[11px] text-zinc-400">Hour-by-hour emergency revision checklist.</p>
          </Link>

          <Link
            href="/midterm/attendance"
            className="p-4 rounded-xl bg-surface-elevated/70 border border-surface-border hover:border-sky-500/40 transition-all space-y-1 group"
          >
            <div className="text-xs font-bold text-sky-400 group-hover:text-sky-300">
              Hall Ticket Checker &rarr;
            </div>
            <p className="text-[11px] text-zinc-400">75% attendance calculator and HOD leave letter.</p>
          </Link>

          <Link
            href="/midterm/cheat-sheets"
            className="p-4 rounded-xl bg-surface-elevated/70 border border-surface-border hover:border-rose-500/40 transition-all space-y-1 group"
          >
            <div className="text-xs font-bold text-rose-400 group-hover:text-rose-300">
              1-Page Cheat Sheets &rarr;
            </div>
            <p className="text-[11px] text-zinc-400">Printable formula sheets for CSE205, INT108, MTH166.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
