import React, { useState } from 'react';

const CATEGORIES = {
  PRE_ARRIVAL: 'preArrival',
  ON_CAMPUS: 'onCampus',
  HOSTEL_KEYS: 'hostelKeys',
  SCHEDULE_NOTES: 'scheduleNotes',
  MINUTE_TO_MINUTE: 'minuteToMinute'
};

const PRE_ARRIVAL_STEPS = [
  {
    num: 1,
    title: "Documents",
    icon: "fa-solid fa-file-arrow-up",
    badge: "Step 1: Upload Documents",
    heading: "Pre-Arrival: Upload Required Documents",
    desc: "Before arriving on campus, upload clear color scans of your original certificates and documents through the LPUADMIT Portal (Login → Post Admission Services). Do not upload scanned photocopies. Ensure each file is in JPEG, PNG, PDF, DOC, or DOCX format and does not exceed 5 MB. If any document is unavailable, request an extension online. For form data corrections, click 'Ask Your Query' and select 'Form Data Correction'."
  },
  {
    num: 2,
    title: "Facilities",
    icon: "fa-solid fa-hotel",
    badge: "Step 2: Book Facilities",
    heading: "Pre-Arrival: Book Hostel & Campus Services",
    desc: "Choose and reserve your required university facilities, including hostel blocks, mess plans, laundry services, transport, gym memberships, or sports options through the LPUADMIT portal. Completing this beforehand guarantees availability and speeds up your on-campus check-in."
  },
  {
    num: 3,
    title: "Fees",
    icon: "fa-solid fa-credit-card",
    badge: "Step 3: Clear Fee Balance",
    heading: "Pre-Arrival: Clear Pending Dues",
    desc: "Ensure all outstanding fee balances are cleared online before reporting to campus. This prevents payment-related interruptions during verification. Note that scholarship adjustments usually reflect within 4–5 working days after document upload. If delayed, raise a ticket on LPUADMIT via 'Ask Your Query' → 'Admission Taken But Scholarship Not Updated'."
  },
  {
    num: 4,
    title: "Uniform",
    icon: "fa-solid fa-shirt",
    badge: "Step 4: Uniform Preference",
    heading: "Pre-Arrival: Submit Uniform Size Preference",
    desc: "Log in to the LPUADMIT Portal, navigate to 'Post Admission Services' → 'Uniform Size Preference', and submit your preferred sizes. Completing this step before reporting prevents distribution delays at the physical counters."
  },
  {
    num: 5,
    title: "Travel",
    icon: "fa-solid fa-plane-departure",
    badge: "Step 5: Travel Arrangements",
    heading: "Pre-Arrival: Register for Travel Services",
    desc: "LPU provides a complimentary 24-hour pick-up service for freshers from nearby Railway Stations (Phagwara Jn, Jalandhar Cantt) and the Phagwara Bus Stand. If you wish to use this service, submit your travel details under 'Travel Arrangements' on the LPUADMIT portal at least 48 hours prior to departure."
  },
  {
    num: 6,
    title: "Arrival",
    icon: "fa-solid fa-map-location-dot",
    badge: "Step 6: Reach Campus",
    heading: "Arrival: Meet Help Desk at Station",
    desc: "Upon reaching your designated pick-up station or bus stand, look for the official LPU Help Desk. The help desk coordinators will verify your details and guide you to the complimentary university shuttles, which will transport you directly to the central reporting venue: Baldev Raj Mittal Unipolis."
  }
];

const ON_CAMPUS_STEPS = [
  {
    num: 1,
    title: "Unipolis",
    icon: "fa-solid fa-door-open",
    badge: "Step 1: Venue Check-in",
    heading: "On-Campus: Report at Unipolis",
    desc: "Start your on-campus registration at the Baldev Raj Mittal Unipolis. Scan the reporting QR code at the venue entry to download your digital 'Reporting & Induction Sheet' and validate it using the OTP sent to your registered mobile number. Collect your physical Checklist Document from the help desk to guide your next steps."
  },
  {
    num: 2,
    title: "Verification",
    icon: "fa-solid fa-stamp",
    badge: "Step 2: Certificate Verification",
    heading: "On-Campus: Original Document Auditing",
    desc: "Present your original certificates (10th/12th marksheets, character certificate, migration certificate, transfer certificate, etc.) in a transparent folder. Submit 3 sets of photocopies. Once verified, ensure the coordinator stamps your digital and physical Induction Sheet."
  },
  {
    num: 3,
    title: "Biometrics",
    icon: "fa-solid fa-fingerprint",
    badge: "Step 3: Biometrics Enrolment",
    heading: "On-Campus: Record Biometric Scans",
    desc: "Report to the biometrics counter to record your fingerprints and details in the university network. The desk official will stamp your sheet and inform you about the specific date and venue for collecting your permanent University ID Card."
  },
  {
    num: 4,
    title: "Facilities",
    icon: "fa-solid fa-bed",
    badge: "Step 4: Book Campus Facilities",
    heading: "On-Campus: Settle Hostel & Services",
    desc: "If you did not book hostel, mess, laundry, transport, gym, or sports options before arriving, you may book them now at the physical desks. Note that bookings on-campus are subject to remaining availability."
  },
  {
    num: 5,
    title: "Fees",
    icon: "fa-solid fa-indian-rupee-sign",
    badge: "Step 5: Settle Dues",
    heading: "On-Campus: Accounts & Dues Counter",
    desc: "Visit the designated fee counter to clear any pending fees or outstanding balances. Keep your transaction receipts ready for confirmation, and make sure your sheet is stamped before moving on."
  },
  {
    num: 6,
    title: "Uniform",
    icon: "fa-solid fa-circle-user",
    badge: "Step 6: Collect Uniform",
    heading: "On-Campus: Collect Uniform Pack",
    desc: "Proceed to the Uniform Distribution Counter listed on your Checklist. Keep your secret key (shared via UMS Messages and SMS) ready. Only provide this secret key to the vendor after receiving and checking your uniform. Get your sheet stamped."
  },
  {
    num: 7,
    title: "UMS",
    icon: "fa-solid fa-mobile-screen-button",
    badge: "Step 7: Activate Portals",
    heading: "On-Campus: UMS & LPUTouch Setup",
    desc: "Install the LPUTouch app on your smartphone. After your documents are fully verified, collect your Verification ID and activate your UMS (University Management System) account. This portal gives you access to your timetable, courses, grades, and announcements."
  },
  {
    num: 8,
    title: "Induction",
    icon: "fa-solid fa-graduation-cap",
    badge: "Step 8: Join Induction & Classes",
    heading: "On-Campus: Freshmen Orientation & Commencement",
    desc: "Attend all mandatory day-wise orientation, mentor meetings, and school briefings. Regular academic classes will start immediately according to your timetable upon completion of the induction program. Helpline: 01824-517170."
  }
];

const HOSTEL_ALLOCATION_STEPS = [
  {
    num: 1,
    title: "Reported",
    icon: "fa-solid fa-person-walking-arrow-right",
    badge: "Step 1: Marked Reported",
    heading: "Hostel: Complete Campus Reporting",
    desc: "You must physically report to the campus and complete your document verification before you can check into your hostel room. Ensure your status on the LPUADMIT portal has been updated to 'Reported'."
  },
  {
    num: 2,
    title: "Dues",
    icon: "fa-solid fa-receipt",
    badge: "Step 2: Settle All Dues",
    heading: "Hostel: Settle Outstanding Hostel Dues",
    desc: "Ensure that all hostel, mess, and laundry fees are paid in full. If you have pending payments, visit the Accounts Help Desk at the Unipolis venue to clear them."
  },
  {
    num: 3,
    title: "Sync",
    icon: "fa-solid fa-arrows-spin",
    badge: "Step 3: Automated Update",
    heading: "Hostel: Wait 15 Minutes for System Sync",
    desc: "Once payment is verified as cleared, the database will automatically update your hostel reporting status. This sync normally completes within 15 minutes."
  },
  {
    num: 4,
    title: "Get Slip",
    icon: "fa-solid fa-file-invoice",
    badge: "Step 4: Download Residential Slip",
    heading: "Hostel: Access Slip on UMS Portal",
    desc: "Log in to the Student UMS portal. Navigate to: 'Residential Services' → 'Residential facility Booking' → 'View Residential Reporting Slip' and download/print your room allocation slip."
  },
  {
    num: 5,
    title: "Room Key",
    icon: "fa-solid fa-key",
    badge: "Step 5: Handover Room Keys",
    heading: "Hostel: Present Slip to Warden",
    desc: "Report to the Warden's Office in your allocated Hostel Block (BH/GH). Present your printed Residential Reporting Slip, verify your details, complete the room inventory checklist, and collect your keys."
  }
];

const SCHEDULE_NOTES = [
  {
    title: "B.Tech CSE Tracking",
    icon: "fa-solid fa-magnifying-glass",
    desc: "For B.Tech CSE programmes, students can search by Candidate ID or programme name to view reporting dates. Candidate IDs are generated approx 8 hours after the initial admission payment is completed."
  },
  {
    title: "MBA Pre-Term Classes",
    icon: "fa-solid fa-business-time",
    desc: "MBA pre-term classes are compulsory and run from 30th July to 7th August 2026. Regular MBA academic classes commence on 10th August 2026."
  },
  {
    title: "MCA Bridge Course",
    icon: "fa-solid fa-code-merge",
    desc: "The MCA compulsory bridge course begins on 16th July 2026. Regular academic classes for MCA start on 6th August 2026."
  },
  {
    title: "Academic Session Start",
    icon: "fa-solid fa-play",
    desc: "The first day of induction or the commencement of classes, whichever is earlier, represents the official start of the academic session."
  },
  {
    title: "Helpline Assistance",
    icon: "fa-solid fa-phone-volume",
    desc: "For any issues, queries, or clarifications, contact the LPU Induction and Reporting Helpline: 01824-517170."
  },
  {
    title: "Global Application",
    icon: "fa-solid fa-globe",
    desc: "The reporting schedules, documents checklists, and induction rules apply equally to all National, International, and NRI students."
  }
];

const MINUTE_TO_MINUTE_DATA = {
  disclaimerNote: "Note: Timings and venues are tentative approximations based on LPU's official schedule (lpu.in/events/freshmeninduction/minute-to-minute-schedule.php). The exact minute-to-minute schedule varies according to your course, school, and assigned group. Your personalized schedule will be printed on your Student Induction Sheet.",
  days: [
    {
      id: 'reporting',
      dayLabel: 'Reporting Day',
      icon: 'fa-solid fa-clipboard-user',
      title: 'Reporting Day: Registration & Kit Distribution',
      events: [
        { time: '09:00 - 17:00', activity: 'Attendance and Registration', venue: 'Baldev Raj Mittal Unipolis', desc: 'Scan reporting QR code, validate OTP, and complete physical check-in.' },
        { time: '09:00 - 17:00', activity: 'Distribution of Welcome Kit', venue: 'Baldev Raj Mittal Unipolis', desc: 'Collect your official LPU welcome kit, handbook, and checklist document.' },
        { time: '14:00 - 16:00', activity: 'Parents Orientation Session', venue: 'Baldev Raj Mittal Unipolis', desc: 'Special orientation for parents covering campus safety, academics, and residential facilities.' }
      ]
    },
    {
      id: 'day1',
      dayLabel: 'Day 1',
      icon: 'fa-solid fa-graduation-cap',
      title: 'Day 1: Leadership Address, UMS & School Orientation',
      events: [
        { time: '10:00 - 10:40', activity: 'Meet the Visionaries (Interaction with Leadership)', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Welcome session with Chancellor, Pro-Chancellor & Vice-Chancellor.' },
        { time: '10:40 - 11:15', activity: 'Get Inspired (Meet Industry Stalwarts)', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Keynote talks and interaction with distinguished industry leaders.' },
        { time: '11:15 - 12:30', activity: 'Be Connected & Stay Updated (Ed-Rev, Academics, Exam & UMS)', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Detailed briefing on credit system, grades, examination policies, and UMS mobile app.' },
        { time: '12:30 - 12:40', activity: "About LPU's International Exchange Program", venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Overview of credit transfer, study abroad, and international exchange programs.' },
        { time: '12:40 - 13:30', activity: 'Lunch Break', venue: 'Campus Dining & Food Courts', desc: 'Lunch break and informal networking.' },
        { time: '13:30 - 15:30', activity: 'Welcome to your School', venue: 'Respective School Building', desc: 'Departmental orientation, faculty introductions, HOD address, and curriculum overview.' },
        { time: '16:00 - 16:15', activity: 'Introduction to Student Welfare Wing', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Introduction to student clubs, cultural organizations, and campus life.' },
        { time: '16:15 - 17:15', activity: 'Cultural Show by Senior Students', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Vibrant cultural performances, music, dance, and drama by senior student clubs.' },
        { time: '17:00 - 18:00', activity: 'Parents High Tea with School Heads & Faculty', venue: 'Dining Hall – Shanti Devi Mittal Auditorium (Block 35)', desc: 'Parents meet and interact with HODs, Deans, and faculty over high tea.' }
      ]
    },
    {
      id: 'day2',
      dayLabel: 'Day 2',
      icon: 'fa-solid fa-shield-halved',
      title: 'Day 2: Safety, Placements, Talent Search & Open Air Movies',
      events: [
        { time: '06:30 - 08:00', activity: 'Yoga Session', venue: 'Baldev Raj Mittal Unipolis', desc: 'Morning wellness, meditation, and physical exercise session.' },
        { time: '09:30 - 10:00', activity: 'Connect Building Activities in the School', venue: 'Respective School Building', desc: 'Icebreaking exercises and team activities with department classmates.' },
        { time: '10:00 - 11:30', activity: 'Panel Discussion on School Edu-Revolution Success Stories', venue: 'Respective School Building', desc: 'Student panel sharing project breakthroughs, hackathons, and research experiences.' },
        { time: '11:30 - 12:00', activity: 'Success Stories with Alumni', venue: 'Respective School Building', desc: 'Interaction with notable alumni working in global Fortune 500 companies.' },
        { time: '12:00 - 12:30', activity: 'School Visit & Lab Tour', venue: 'Respective School Building', desc: 'Guided tour of departmental research centers, tech labs, and specialized facilities.' },
        { time: '12:30 - 13:15', activity: 'Lunch Break', venue: 'Campus Dining & Food Courts', desc: 'Lunch break.' },
        { time: '13:20 - 13:50', activity: 'How Safe are you in the Campus?', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Essential session on campus security, zero-tolerance anti-ragging policies, and emergency help desks.' },
        { time: '13:50 - 14:05', activity: 'Presentation on Placements', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Overview of Division of Career Services, placement training, and past placement records.' },
        { time: '14:05 - 14:30', activity: 'Road to Succeed (Career Orientation Activities)', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Skill mapping, career pathways, and industry readiness roadmap.' },
        { time: '14:30 - 15:00', activity: 'In Their Footsteps (Interaction with Student Achievers)', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Senior student achievers share tips for academic and co-curricular success.' },
        { time: '15:00 - 15:30', activity: 'Division of Student Relationships (DSR)', venue: 'Shanti Devi Mittal Auditorium (Block 35)', desc: 'Guide to student grievance portal, mentoring, and support systems.' },
        { time: '16:00 - 18:30', activity: 'Sports and Recreational Games', venue: 'BH4 Playgrounds', desc: 'Outdoor sports tournaments, athletic challenges, and recreational games.' },
        { time: '16:00 - 18:30', activity: "Fresher's Talent Search 2026", venue: 'Main Stage (Baldev Raj Mittal Unipolis)', desc: 'Fresher talent competition across music, dance, fashion, and theatrical arts.' },
        { time: '19:30 onwards', activity: 'Open Air Movies', venue: 'Baldev Raj Mittal Unipolis', desc: 'Evening movie screening under the stars at Unipolis.' }
      ]
    },
    {
      id: 'day3',
      dayLabel: 'Day 3',
      icon: 'fa-solid fa-icons',
      title: 'Day 3: Fitness, Hostel Orientation, Carnival & City Tour',
      events: [
        { time: '06:30 - 08:00', activity: 'Yoga Session & Zumba Fitness Class', venue: 'Baldev Raj Mittal Unipolis', desc: 'High-energy Zumba fitness dance party and yoga workout.' },
        { time: '09:30 - 10:40', activity: 'A Home Away from Home (Highlighting Residential Services)', venue: 'Group 1: Baldev Raj Mittal Unipolis – Main Stage', desc: 'Briefing on hostel rules, mess menus, laundry, maintenance, and warden support.' },
        { time: '10:40 - 11:50', activity: "Induction Carnival & Achiever's Gallery Showcase", venue: 'Group 2: Baldev Raj Mittal Unipolis', desc: 'Fun carnival stalls, interactive games, photo booths, and student achiever showcase.' },
        { time: '11:50 - 13:00', activity: 'Campus Visit', venue: 'Group 3: Baldev Raj Mittal Unipolis', desc: 'Guided campus walk covering Central Library, Uni-Mall, Uni-Hospital, and Sports Complex.' },
        { time: '13:00 - 14:00', activity: 'Lunch Break', venue: 'Campus Dining & Food Courts', desc: 'Lunch break.' },
        { time: '14:00 - 15:30', activity: 'Life Beyond Academics (Student Club Registration)', venue: 'Baldev Raj Mittal Unipolis', desc: 'Booths for 100+ student organizations, clubs, and societies for on-spot enrolment.' },
        { time: '15:30 onwards', activity: 'Jalandhar City Tour', venue: 'Pick-up from Uni-Mall (Unicentre)', desc: 'Complimentary guided bus tour exploring Jalandhar city highlights, shopping centers, and landmarks.' }
      ]
    },
    {
      id: 'international',
      dayLabel: 'International Students',
      icon: 'fa-solid fa-globe',
      title: 'Special Induction Day for International Freshmen',
      events: [
        { time: '10:00 - 10:15', activity: 'Know your Campus', venue: 'Conference Hall, 32-213', desc: 'Ms. Archana Malik, Deputy Dean, Division of Soft Skills, LPU' },
        { time: '10:15 - 10:45', activity: 'Welcome by International Affairs', venue: 'Conference Hall, 32-213', desc: 'Mr. Aman Mittal, Vice President, International Affairs, LPU' },
        { time: '10:45 - 11:15', activity: 'Career Pathways', venue: 'Conference Hall, 32-213', desc: 'Dr. Lovi Raj Gupta, Pro Vice Chancellor, LPU' },
        { time: '11:15 - 11:30', activity: 'Key points for international students for smooth transition', venue: 'Conference Hall, 32-213', desc: 'Ms. Gazal Sharma, Assistant Professor & CD-Records, LPU' },
        { time: '11:30 - 12:30', activity: 'UMS, Academic rules, and Examination System', venue: 'Conference Hall, 32-213', desc: 'Ms. Mamta Rana (Assistant Dean) & Dr. Amit Dutt (Dean, DAA)' },
        { time: '12:30 - 13:00', activity: 'Introduction to Division of Student Relationship', venue: 'Conference Hall, 32-213', desc: 'Dr. Neha Malhotra (Assistant Dean, Student Grievance & Redressal)' },
        { time: '13:00 - 13:30', activity: 'Campus Life & Student Welfare', venue: 'Conference Hall, 32-213', desc: 'Dr. Sorabh Lakhanpal, Senior Dean and Head, Student Welfare Wing' }
      ]
    }
  ]
};

export default function OnArrivalSteps() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.PRE_ARRIVAL);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [activeM2mDayId, setActiveM2mDayId] = useState('reporting');

  // Get steps array based on active category
  const getSteps = () => {
    switch (activeCategory) {
      case CATEGORIES.PRE_ARRIVAL:
        return PRE_ARRIVAL_STEPS;
      case CATEGORIES.ON_CAMPUS:
        return ON_CAMPUS_STEPS;
      case CATEGORIES.HOSTEL_KEYS:
        return HOSTEL_ALLOCATION_STEPS;
      default:
        return [];
    }
  };

  const steps = getSteps();
  const activeStep = steps[activeStepIdx];

  const handleNext = () => {
    if (activeStepIdx < steps.length - 1) {
      setActiveStepIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIdx > 0) {
      setActiveStepIdx(prev => prev - 1);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveStepIdx(0);
  };

  const activeM2mDay = MINUTE_TO_MINUTE_DATA.days.find(d => d.id === activeM2mDayId) || MINUTE_TO_MINUTE_DATA.days[0];

  return (
    <section className="reporting-steps-section">
      <div className="section-title-wrapper" style={{ textAlign: 'center' }}>
        <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-route text-orange"></i> Official Reporting & Admission Guide
        </h2>
        <p>A step-by-step interactive roadmap compiled from official LPU guidelines</p>
      </div>

      {/* Category Tabs */}
      <div className="reporting-category-tabs">
        <button 
          className={`rep-tab-btn ${activeCategory === CATEGORIES.PRE_ARRIVAL ? 'active' : ''}`}
          onClick={() => handleCategoryChange(CATEGORIES.PRE_ARRIVAL)}
        >
          <i className="fa-solid fa-plane-arrival"></i> 1. Before Arrival
        </button>
        <button 
          className={`rep-tab-btn ${activeCategory === CATEGORIES.ON_CAMPUS ? 'active' : ''}`}
          onClick={() => handleCategoryChange(CATEGORIES.ON_CAMPUS)}
        >
          <i className="fa-solid fa-building-columns"></i> 2. On-Campus Process
        </button>
        <button 
          className={`rep-tab-btn ${activeCategory === CATEGORIES.HOSTEL_KEYS ? 'active' : ''}`}
          onClick={() => handleCategoryChange(CATEGORIES.HOSTEL_KEYS)}
        >
          <i className="fa-solid fa-key"></i> 3. Hostel Room Keys
        </button>
        <button 
          className={`rep-tab-btn ${activeCategory === CATEGORIES.SCHEDULE_NOTES ? 'active' : ''}`}
          onClick={() => handleCategoryChange(CATEGORIES.SCHEDULE_NOTES)}
        >
          <i className="fa-solid fa-calendar-days"></i> 4. Important Schedules
        </button>
        <button 
          className={`rep-tab-btn ${activeCategory === CATEGORIES.MINUTE_TO_MINUTE ? 'active' : ''}`}
          onClick={() => handleCategoryChange(CATEGORIES.MINUTE_TO_MINUTE)}
        >
          <i className="fa-solid fa-stopwatch"></i> 5. Minute-to-Minute Schedule
        </button>
      </div>

      {/* Conditional Rendering: Interactive Steps vs Schedules vs Minute-to-Minute */}
      {activeCategory === CATEGORIES.MINUTE_TO_MINUTE ? (
        <div className="minute-to-minute-wrapper">
          {/* Disclaimer Banner */}
          <div className="m2m-disclaimer-card glass-panel" style={{
            marginBottom: '24px',
            padding: '16px 20px',
            borderLeft: '4px solid var(--primary-orange, #f97316)',
            background: 'rgba(249, 115, 22, 0.08)',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <i className="fa-solid fa-circle-info" style={{ fontSize: '1.4rem', color: 'var(--primary-orange, #f97316)', marginTop: '2px' }}></i>
              <div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Tentative Approximation & Course Variation Notice
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                  {MINUTE_TO_MINUTE_DATA.disclaimerNote}
                </p>
              </div>
            </div>
          </div>

          {/* Day Selection Tabs */}
          <div className="m2m-day-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px', justifyContent: 'center' }}>
            {MINUTE_TO_MINUTE_DATA.days.map(day => (
              <button
                key={day.id}
                className={`m2m-day-btn ${activeM2mDayId === day.id ? 'active' : ''}`}
                onClick={() => setActiveM2mDayId(day.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: activeM2mDayId === day.id ? '1px solid var(--primary-orange, #f97316)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: activeM2mDayId === day.id ? 'var(--primary-orange, #f97316)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeM2mDayId === day.id ? '#ffffff' : 'var(--text-primary)',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <i className={day.icon}></i> {day.dayLabel}
              </button>
            ))}
          </div>

          {/* Schedule Table / Timeline */}
          <div className="m2m-day-container glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className={activeM2mDay.icon} style={{ color: 'var(--primary-orange, #f97316)' }}></i>
                {activeM2mDay.title}
              </h3>
              <span className="badge" style={{ padding: '4px 10px', background: 'rgba(249, 115, 22, 0.2)', color: 'var(--primary-orange, #f97316)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>
                {activeM2mDay.events.length} Events Scheduled
              </span>
            </div>

            <div className="m2m-timeline-grid" style={{ display: 'grid', gap: '14px' }}>
              {activeM2mDay.events.map((ev, idx) => (
                <div key={idx} className="m2m-event-card" style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap: '16px',
                  alignItems: 'center'
                }}>
                  {/* Time Badge */}
                  <div className="m2m-time-pill" style={{
                    padding: '8px 12px',
                    background: 'rgba(249, 115, 22, 0.15)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    color: 'var(--primary-orange, #f97316)',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textAlign: 'center'
                  }}>
                    <i className="fa-regular fa-clock" style={{ marginRight: '6px' }}></i>
                    {ev.time}
                  </div>

                  {/* Event Details */}
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {ev.activity}
                    </h4>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#38bdf8' }}>
                        <i className="fa-solid fa-location-dot"></i> {ev.venue}
                      </span>
                      {ev.desc && (
                        <span>• {ev.desc}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeCategory !== CATEGORIES.SCHEDULE_NOTES ? (
        <>
          <div className={`steps-progress-bar-container steps-${steps.length}`}>
            {steps.map((step, idx) => (
              <div 
                key={step.num}
                className={`step-progress-item ${idx === activeStepIdx ? 'active' : ''}`}
                onClick={() => setActiveStepIdx(idx)}
              >
                <div className="step-progress-circle">
                  {idx < activeStepIdx ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <i className={step.icon || "fa-solid fa-circle"}></i>
                  )}
                </div>
                <div className="step-progress-title d-none-mobile">{step.title}</div>
              </div>
            ))}
          </div>

          <div className="step-details-card glass-panel" style={{ minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="step-details-header">
                <span className="step-badge">{activeStep?.badge}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {activeStep?.num} of {steps.length}
                </span>
              </div>
              <h3 id="step-detail-title" style={{ marginBottom: '12px', fontSize: '1.25rem', fontWeight: '700' }}>{activeStep?.heading}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{activeStep?.desc}</p>
            </div>
            
            <div className="step-details-actions" style={{ marginTop: '20px' }}>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={handlePrev}
                disabled={activeStepIdx === 0}
                style={{ opacity: activeStepIdx === 0 ? 0.5 : 1, cursor: activeStepIdx === 0 ? 'not-allowed' : 'pointer' }}
              >
                <i className="fa-solid fa-chevron-left"></i> Previous
              </button>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={handleNext}
                disabled={activeStepIdx === steps.length - 1}
                style={{ opacity: activeStepIdx === steps.length - 1 ? 0.5 : 1, cursor: activeStepIdx === steps.length - 1 ? 'not-allowed' : 'pointer' }}
              >
                Next <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="schedule-notes-grid">
          {SCHEDULE_NOTES.map((note, idx) => {
            let colorClass = "";
            if (idx % 3 === 0) colorClass = "";
            else if (idx % 3 === 1) colorClass = "blue";
            else colorClass = "purple";
            
            // Highlight the helpline in green
            if (note.title.includes("Helpline")) colorClass = "green";

            return (
              <div key={idx} className={`schedule-card ${colorClass}`}>
                <div className="schedule-card-header">
                  <div className="schedule-card-icon">
                    <i className={note.icon}></i>
                  </div>
                  <h4 className="schedule-card-title">{note.title}</h4>
                </div>
                <p className="schedule-card-desc">{note.desc}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

