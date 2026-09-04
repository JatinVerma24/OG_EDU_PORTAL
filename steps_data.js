// Static Configurations and Steps Data for ogeduAI Freshers Portal

const PRE_ARRIVAL_STEPS = [
  {
    title: "Document Upload Guidelines",
    desc: "Before arriving on campus, upload clear color scans of your original certificates and documents through the LPUADMIT Portal (Login → Post Admission Services). Do not upload scanned photocopies. Ensure each file is in JPEG, PNG, PDF, DOC, or DOCX format and does not exceed 5 MB. If any document is unavailable, request an extension online. For form data corrections, click 'Ask Your Query' and select 'Form Data Correction'."
  },
  {
    title: "Book Hostel & Campus Services",
    desc: "Choose and reserve your required university facilities, including hostel blocks, mess plans, laundry services, transport, gym memberships, or sports options through the LPUADMIT portal. Completing this beforehand guarantees availability and speeds up your on-campus check-in."
  },
  {
    title: "Clear Pending Dues",
    desc: "Ensure all outstanding fee balances are cleared online before reporting to campus. This prevents payment-related interruptions during verification. Note that scholarship adjustments usually reflect within 4–5 working days after document upload. If delayed, raise a ticket on LPUADMIT via 'Ask Your Query' → 'Admission Taken But Scholarship Not Updated'."
  },
  {
    title: "Submit Uniform Size Preference",
    desc: "Log in to the LPUADMIT Portal, navigate to 'Post Admission Services' → 'Uniform Size Preference', and submit your preferred sizes. Completing this step before reporting prevents distribution delays at the physical counters."
  },
  {
    title: "Register for Travel Services",
    desc: "LPU provides a complimentary 24-hour pick-up service for freshers from nearby Railway Stations (Phagwara Jn, Jalandhar Cantt) and the Phagwara Bus Stand. If you wish to use this service, submit your travel details under 'Travel Arrangements' on the LPUADMIT portal at least 48 hours prior to departure."
  },
  {
    title: "Reach Campus & Meet Help Desk",
    desc: "Upon reaching your designated pick-up station or bus stand, look for the official LPU Help Desk. The help desk coordinators will verify your details and guide you to the complimentary university shuttles, which will transport you directly to the central reporting venue: Baldev Raj Mittal Unipolis."
  }
];

const ON_CAMPUS_STEPS = [
  {
    title: "Report at Baldev Raj Mittal Unipolis",
    desc: "Start your on-campus registration at the Baldev Raj Mittal Unipolis. Scan the reporting QR code at the venue entry to download your digital 'Reporting & Induction Sheet' and validate it using the OTP sent to your registered mobile number. Collect your physical Checklist Document from the help desk to guide your next steps."
  },
  {
    title: "Original Document Auditing",
    desc: "Present your original certificates (10th/12th marksheets, character certificate, migration certificate, transfer certificate, etc.) in a transparent folder. Submit 3 sets of photocopies. Once verified, ensure the coordinator stamps your digital and physical Induction Sheet."
  },
  {
    title: "Record Biometric Scans",
    desc: "Report to the biometrics counter to record your fingerprints and details in the university network. The desk official will stamp your sheet and inform you about the specific date and venue for collecting your permanent University ID Card."
  },
  {
    title: "Settle Hostel & Services Desk",
    desc: "If you did not book hostel, mess, laundry, transport, gym, or sports options before arriving, you may book them now at the physical desks. Note that bookings on-campus are subject to remaining availability."
  },
  {
    title: "Accounts & Dues Counter",
    desc: "Visit the designated fee counter to clear any pending fees or outstanding balances. Keep your transaction receipts ready for confirmation, and make sure your sheet is stamped before moving on."
  },
  {
    title: "Collect Uniform Pack",
    desc: "Proceed to the Uniform Distribution Counter listed on your Checklist. Keep your secret key (shared via UMS Messages and SMS) ready. Only provide this secret key to the vendor after receiving and checking your uniform. Get your sheet stamped."
  },
  {
    title: "UMS & LPUTouch Setup",
    desc: "Install the LPUTouch app on your smartphone. After your documents are fully verified, collect your Verification ID and activate your UMS (University Management System) account. This portal gives you access to your timetable, courses, grades, and announcements."
  },
  {
    title: "Freshmen Orientation & Commencement",
    desc: "Attend all mandatory day-wise orientation, mentor meetings, and school briefings. Regular academic classes will start immediately according to your timetable upon completion of the induction program. Helpline: 01824-517170."
  }
];

const HOSTEL_ALLOCATION_STEPS = [
  {
    title: "Complete Campus Reporting",
    desc: "You must physically report to the campus and complete your document verification before you can check into your hostel room. Ensure your status on the LPUADMIT portal has been updated to 'Reported'."
  },
  {
    title: "Settle Outstanding Hostel Dues",
    desc: "Ensure that all hostel, mess, and laundry fees are paid in full. If you have pending payments, visit the Accounts Help Desk at the Unipolis venue to clear them."
  },
  {
    title: "Wait 15 Minutes for System Sync",
    desc: "Once payment is verified as cleared, the database will automatically update your hostel reporting status. This sync normally completes within 15 minutes."
  },
  {
    title: "Access Slip on UMS Portal",
    desc: "Log in to the Student UMS portal. Navigate to: 'Residential Services' → 'Residential facility Booking' → 'View Residential Reporting Slip' and download/print your room allocation slip."
  },
  {
    title: "Present Slip to Warden",
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

const vibeTabs = {
    orientation: {
        title: "Academic Systems & Portals Walkthrough",
        desc: "Get a detailed walkthrough of LPU's academic ecosystem. Academicians and senior mentors will guide you in setting up and navigating your daily tools:",
        bullets: [
            "<strong>UMS (University Management System):</strong> Your daily dashboard for monitoring class attendance, checking assignment marks, and viewing timetables.",
            "<strong>Evaluation Criteria:</strong> Insights into internal marks, mid-term examinations, and final end-term grading rules.",
            "<strong>LPU Touch App:</strong> Complete the setup on your smartphone so you can submit queries, request leaves, and check notifications instantly."
        ],
        icon: "fa-laptop-code"
    },
    career: {
        title: "Classroom to Corporate Placement Roadmap",
        desc: "LPU starts training you for placements from your very first year. Learn about the resources and support networks designed to secure high-tier placements:",
        bullets: [
            "<strong>PEP (Placement Enhancement Programme):</strong> Weekly training starting early in your course covering soft skills, coding challenges, and mock interviews.",
            "<strong>Industry Certifications:</strong> Gain access to specialized tie-ups with Google, Microsoft, AWS, and Salesforce to learn in-demand skills.",
            "<strong>Placement Drives:</strong> Explore LPU's placement cell networks hosting recruitment drives with top MNCs and Fortune 500 companies."
        ],
        icon: "fa-graduation-cap"
    },
    culture: {
        title: "Cultural Showcases & Student Engagement",
        desc: "College life is about self-expression. Induction highlights the vibrant campus culture with high-energy activities:",
        bullets: [
            "<strong>Band Performances & Cypher:</strong> Enjoy performances by LPU's music society and participate in outdoor cypher dance battles.",
            "<strong>Youth Vibe & Clubs:</strong> Introduction to 60+ student-led clubs spanning robotics, literature, theatre, social service, and gaming.",
            "<strong>Auditions & Talent Hunt:</strong> Register for upcoming cultural, athletic, and innovation trials to represent LPU at national tournaments."
        ],
        icon: "fa-champagne-glasses"
    },
    connect: {
        title: "LPU Engage Pre-Induction Portal",
        desc: "Before regular classes begin, get a head start using the self-paced 'LPU Engage' portal to master basic concepts and fit in easily:",
        bullets: [
            "<strong>Bridge Courses:</strong> Self-paced modules covering fundamental math, logic, or writing concepts tailored to your discipline.",
            "<strong>Virtual Interactions:</strong> Pre-campus webinars with department heads and career counselors to clarify doubts.",
            "<strong>Value-Added Courses:</strong> Free access to micro-credentials to boost your resume before you even attend your first lecture."
        ],
        icon: "fa-link"
    }
};

const CHATBOT_SUGGESTIONS = [
  { id: 'docs', label: "📋 Document Checklist", text: "What documents do I need to bring?" },
  { id: 'unipolis', label: "🏫 Reporting at Unipolis", text: "Where do I report when arriving at LPU?" },
  { id: 'hostel', label: "🔑 Hostel Keys & Slip", text: "How do I get my hostel keys?" },
  { id: 'mba_mca', label: "📅 MBA & MCA Schedules", text: "What are the MBA pre-term and MCA bridge dates?" },
  { id: 'cse', label: "💻 B.Tech CSE Dates", text: "How do I check B.Tech CSE reporting dates?" },
  { id: 'helpline', label: "📞 LPU Helpline", text: "How can I contact the reporting helpline?" }
];

const CHATBOT_BOT_RESPONSES = {
  docs: `📚 <strong>Required Document Checklist:</strong><br>1. <strong>Admission Offer Letter</strong> & fee receipts (printed).<br>2. <strong>Original Marksheets</strong> (10th, 12th, or graduation transcripts) + 3 sets of photocopies.<br>3. <strong>Original Migration Certificate</strong> & Transfer/Leaving Certificate.<br>4. <strong>Character Certificate</strong> from your last institution.<br>5. <strong>Self-Attested Anti-Ragging Affidavit</strong> (signed by student and parent).<br>6. <strong>Medical Fitness Certificate</strong> in LPU's official format.<br>7. <strong>6 Passport-size photographs</strong> (white background).<br>8. <strong>Aadhaar Card</strong> photocopies of student and parents.<br><br><em>Tip: Carry all originals in a secure, transparent folder for auditing.</em>`,

  unipolis: `🏫 <strong>On-Campus Reporting Steps at Baldev Raj Mittal Unipolis:</strong><br>1. <strong>Unipolis Entry:</strong> Report here, scan the venue QR code, and validate using the OTP sent to your phone to download your digital 'Reporting & Induction Sheet'.<br>2. <strong>Checklist Collection:</strong> Collect your physical checklist paper.<br>3. <strong>Desk Auditing:</strong> Visit designated desks in order: Document Verification → Biometrics → Accounts/Dues → Uniform Counter → UMS Login Desk.<br>4. <strong>Stamping:</strong> Ensure coordinators stamp your sheet at every counter. Leaving any counter unstamped will block your class attendance!`,

  hostel: `🔑 <strong>Hostel Allocation Process:</strong><br>1. <strong>Report on Campus:</strong> Complete physical document verification at Unipolis first.<br>2. <strong>Settle Dues:</strong> Settle all pending hostel, mess, or laundry fees online or at the Accounts Help Desk in Unipolis.<br>3. <strong>Update Slip:</strong> The system updates your hostel slip within 15 minutes of fee clearance.<br>4. <strong>Download Slip:</strong> Go to UMS portal → Residential Services → View Residential Reporting Slip.<br>5. <strong>Collect Key:</strong> Report to your allotted hostel Warden's Office, show the slip, and pick up your keys!`,

  mba_mca: `📅 <strong>Special Programme Schedules (Compulsory):</strong><br>• <strong>MBA Programmes:</strong> Compulsory Pre-Term classes run from <strong>30th July to 7th August 2026</strong>. Regular classes start <strong>10th August 2026</strong>.<br>• <strong>MCA Programmes:</strong> Compulsory Bridge Course starts on <strong>16th July 2026</strong>. Regular classes start <strong>6th August 2026</strong>.`,

  cse: `💻 <strong>B.Tech CSE Reporting Details:</strong><br>• B.Tech CSE students can search their dates on the guide portal using their <strong>Candidate ID</strong> or programme name.<br>• <strong>Note:</strong> Candidate IDs take approximately 8 hours to generate after completing your initial admission payment. Until then, use the programme name (e.g., CSE) to search!`,

  helpline: `📞 <strong>LPU Official Helplines:</strong><br>• <strong>Induction & Reporting Helpline:</strong> 01824-517170<br>• <strong>Alternative Contact:</strong> +91-1824-517000 / 01824-404404`
};

const CHATBOT_KEYWORDS = [
  { keys: ['doc', 'cert', 'file', 'check', 'paper', 'mark', 'trans', 'migr'], responseId: 'docs' },
  { keys: ['report', 'campus', 'unipolis', 'arriving', 'reach', 'pick', 'station', 'shuttle'], responseId: 'unipolis' },
  { keys: ['hostel', 'room', 'key', 'warden', 'residential', 'slip', 'mess', 'laundry'], responseId: 'hostel' },
  { keys: ['mba', 'mca', 'pre-term', 'pre term', 'bridge', 'classes', 'commence', 'date'], responseId: 'mba_mca' },
  { keys: ['cse', 'b.tech cse', 'candidate', 'id', 'payment'], responseId: 'cse' },
  { keys: ['help', 'helpline', 'contact', 'call', 'number', 'phone', 'support'], responseId: 'helpline' }
];

const MINUTE_TO_MINUTE_SCHEDULE = {
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

// Export to window object for access by root HTML scripts
window.PRE_ARRIVAL_STEPS = PRE_ARRIVAL_STEPS;
window.ON_CAMPUS_STEPS = ON_CAMPUS_STEPS;
window.HOSTEL_ALLOCATION_STEPS = HOSTEL_ALLOCATION_STEPS;
window.SCHEDULE_NOTES = SCHEDULE_NOTES;
window.MINUTE_TO_MINUTE_SCHEDULE = MINUTE_TO_MINUTE_SCHEDULE;
window.vibeTabs = vibeTabs;
window.CHATBOT_SUGGESTIONS = CHATBOT_SUGGESTIONS;
window.CHATBOT_BOT_RESPONSES = CHATBOT_BOT_RESPONSES;
window.CHATBOT_KEYWORDS = CHATBOT_KEYWORDS;
