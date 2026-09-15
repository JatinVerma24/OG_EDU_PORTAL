import { Subject } from '../../../types';

export const BTECH_SEMESTER_1_SUBJECTS: Subject[] = [
  {
    id: 'btech-sem1-cse111',
    courseId: 'btech',
    semester: 1,
    code: 'CSE111',
    name: 'Orientation to Computing-I',
    credits: 2,
    type: 'Core',
    description: 'Foundational introduction to computer architecture, problem-solving methodologies, Linux bash basics, and modern IT toolchains.',
    keywords: ['computing basics', 'computer systems', 'command line', 'linux', 'hardware', 'information technology', 'cse111'],
    slug: 'cse111-orientation-to-computing-1',
    channels: [
      {
        channelId: 'neso-academy',
        name: 'Neso Academy',
        channelUrl: 'https://www.youtube.com/@nesoacademy/videos',
        description: 'Exemplary whiteboard lessons on computing fundamentals, number systems, and hardware architecture.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Best for visual clarity on binary systems, logic gates, and computing components.',
        priority: 1
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Structured university foundation series explaining software/hardware abstractions.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Covers core orientation concepts in simple Hindi with university exam focus.',
        priority: 2
      },
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'High-energy conceptual overviews covering operating fundamentals and computing architecture.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Great for quickly grasping memory hierarchy and computer terminology.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem1-cse326',
    courseId: 'btech',
    semester: 1,
    code: 'CSE326',
    name: 'Internet Programming Laboratory',
    credits: 2,
    type: 'Lab',
    description: 'Hands-on practical development covering HTML5 semantic structure, modern CSS3 styling, responsive layouts, and clientside DOM scripting.',
    keywords: ['web development', 'html', 'css', 'javascript', 'frontend', 'dom manipulation', 'web design', 'cse326'],
    slug: 'cse326-internet-programming-laboratory',
    channels: [
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Complete Sigma Web Development playlist covering HTML, CSS, Flexbox, Grid, and JavaScript from scratch.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'The absolute best step-by-step practical lab guidance with downloadable code files.',
        priority: 1
      },
      {
        channelId: 'apna-college',
        name: 'Apna College',
        channelUrl: 'https://www.youtube.com/@ApnaCollegeOfficial/videos',
        description: 'Modern animated one-shots on HTML & CSS with live project builds and interview questions.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Quick revision and crisp syntax guides ideal for lab evaluations and viva prep.',
        priority: 2
      },
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Comprehensive English web development bootcamps with practical responsive layout projects.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Great for building robust responsive websites following international best practices.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem1-int108',
    courseId: 'btech',
    semester: 1,
    code: 'INT108',
    name: 'Python Programming',
    credits: 4,
    type: 'Core',
    description: 'Core programming constructs in Python: variables, conditional control flow, loops, data structures (lists, tuples, dicts, sets), functions, file handling, and modular packages.',
    keywords: ['python', 'coding', 'programming basics', 'oop python', 'file handling', 'data structures in python', 'int108'],
    slug: 'int108-python-programming',
    channels: [
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: '100 Days of Code Python series with daily coding challenges, exercises, and university exam notes.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Most accessible Python course for absolute beginners with syntax practice.',
        priority: 1
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Rigorous academic Python lecture series focusing on underlying memory and logic flow.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Excellent for theoretical depth, tracing code on whiteboard, and writing exams.',
        priority: 2
      },
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Comprehensive full-length Python masterclasses taught by world-class instructors.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Perfect for learning practical problem solving and industry Python standards.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem1-mth174',
    courseId: 'btech',
    semester: 1,
    code: 'MTH174',
    name: 'Engineering Mathematics',
    credits: 4,
    type: 'Core',
    description: 'Higher engineering mathematics: matrices, eigenvalues/eigenvectors, multivariable calculus, partial derivatives, multiple integrals, and vector calculus.',
    keywords: ['calculus', 'matrices', 'eigenvalues', 'multiple integrals', 'partial differentiation', 'vector calculus', 'mth174', 'maths'],
    slug: 'mth174-engineering-mathematics',
    channels: [
      {
        channelId: 'sandeep-kumar-lpu',
        name: 'San Online Classes (Dr. Sandeep Kumar)',
        channelUrl: 'https://www.youtube.com/@Sanonlineclasses/videos',
        description: 'Official LPU Mathematics faculty teaching the exact syllabus, CA patterns, and mid-term/end-term questions.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Direct alignment with LPU MTH174 syllabus and question patterns.',
        priority: 1
      },
      {
        channelId: 'dr-gajendra-purohit',
        name: 'Dr. Gajendra Purohit',
        channelUrl: 'https://www.youtube.com/@drgajendrapurohit/videos',
        description: 'India’s most trusted Engineering Math professor with chapter-wise playlists for matrices and calculus.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Step-by-step formula derivations and shortcut techniques to score top grades.',
        priority: 2
      },
      {
        channelId: 'maths-wallah',
        name: 'Maths Wallah (PW)',
        channelUrl: 'https://www.youtube.com/@MathsWallah/videos',
        description: 'PW Engineering stream with structured problem sets for first-year engineering mathematics.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Covers foundational derivations with crystal-clear handwritten board work.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem1-pes318',
    courseId: 'btech',
    semester: 1,
    code: 'PES318',
    name: 'Soft Skills-I',
    credits: 2,
    type: 'Aptitude',
    description: 'Personal grooming, verbal and non-verbal communication, listening skills, public speaking fundamentals, and professional body language.',
    keywords: ['soft skills', 'communication', 'public speaking', 'grooming', 'personality development', 'pes318'],
    slug: 'pes318-soft-skills-1',
    channels: [
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'Practical guides on self-confidence, body language, accent neutralization, and speech delivery.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Highly engaging real-world etiquette lessons for university and placement readiness.',
        priority: 1
      },
      {
        channelId: 'career-ride',
        name: 'CareerRide',
        channelUrl: 'https://www.youtube.com/@CareerRideTV/videos',
        description: 'Extensive interview, presentation, and verbal confidence building exercises.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Directly applicable tips for student presentations and evaluation criteria.',
        priority: 2
      }
    ]
  },

  // ── Core Elective 1 ─────────────────────────────────────────────────────
  {
    id: 'btech-sem1-ece249',
    courseId: 'btech',
    semester: 1,
    code: 'ECE249',
    name: 'Basic Electrical and Electronics Engineering',
    credits: 3,
    type: 'Elective',
    electiveGroup: 'Core Elective 1',
    description: 'DC circuit theorems (KVL, KCL, Thevenin, Norton), AC circuits, single-phase transformers, semiconductor diodes, and operational amplifiers.',
    keywords: ['circuits', 'electronics', 'kvl', 'kcl', 'thevenin', 'transformer', 'diodes', 'ece249', 'electrical'],
    slug: 'ece249-basic-electrical-and-electronics-engineering',
    channels: [
      {
        channelId: 'all-about-electronics',
        name: 'All About Electronics',
        channelUrl: 'https://www.youtube.com/@AllAboutElectronics/videos',
        description: 'The highest quality visual simulations of circuit analysis, diodes, transistors, and op-amps.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Clear animations illustrating current flow and circuit node voltages.',
        priority: 1
      },
      {
        channelId: 'engineering-funda',
        name: 'Engineering Funda',
        channelUrl: 'https://www.youtube.com/@EngineeringFunda/videos',
        description: 'Comprehensive university-level derivations for DC theorems and AC network analysis.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Detailed textbook derivations matching university exam marking schemes.',
        priority: 2
      },
      {
        channelId: 'pw-ece',
        name: 'ECE Wallah (PW)',
        channelUrl: 'https://www.youtube.com/@pw-ece/videos',
        description: 'PW Engineering team teaching circuit theory and electrical machine fundamentals.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Fast problem-solving sessions and clear step-by-step numerical calculations.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem1-mec136',
    courseId: 'btech',
    semester: 1,
    code: 'MEC136',
    name: 'Engineering Graphics and Digital Fabrication',
    credits: 3,
    type: 'Elective',
    electiveGroup: 'Core Elective 1',
    description: 'Engineering drawing principles: orthographic projections, isometric views, projection of lines & planes, section of solids, and digital 3D fabrication basics.',
    keywords: ['engineering graphics', 'drawing', 'projections', 'cad', 'isometric view', 'orthographic', 'mec136'],
    slug: 'mec136-engineering-graphics-and-digital-fabrication',
    channels: [
      {
        channelId: 'tikles-academy',
        name: "Tikle's Academy",
        channelUrl: 'https://www.youtube.com/@TiklesAcademy/videos',
        description: 'The definitive authority on engineering drawing in India, solving every standard university problem.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Detailed drafting instrument demonstrations ensuring top marks in sheet evaluations.',
        priority: 1
      },
      {
        channelId: 'manas-patnaik',
        name: 'Manas Patnaik',
        channelUrl: 'https://www.youtube.com/@manaspatnaikofficial/videos',
        description: 'Professional visual drafting lectures breaking down 3D projection theory into simple 2D steps.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Incredible spatial reasoning guidance for complex projections of solids and planes.',
        priority: 2
      }
    ]
  },

  // ── Core Elective 2 ─────────────────────────────────────────────────────
  {
    id: 'btech-sem1-che110',
    courseId: 'btech',
    semester: 1,
    code: 'CHE110',
    name: 'Environmental Studies',
    credits: 2,
    type: 'Elective',
    electiveGroup: 'Core Elective 2',
    description: 'Ecosystems, natural resource conservation, biodiversity preservation, pollution control measures, climate policy, and environmental legislation.',
    keywords: ['environment', 'ecology', 'pollution', 'biodiversity', 'sustainability', 'che110', 'evs'],
    slug: 'che110-environmental-studies',
    channels: [
      {
        channelId: 'tutorials-point',
        name: 'Tutorials Point (India)',
        channelUrl: 'https://www.youtube.com/@tutorialspointindia/videos',
        description: 'Crisp, structured revision lectures covering standard university environmental studies syllabus.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Concise, bullet-point notes perfect for fast semester exam preparation.',
        priority: 1
      },
      {
        channelId: 'khan-academy',
        name: 'Khan Academy',
        channelUrl: 'https://www.youtube.com/@khanacademy/videos',
        description: 'Ecosystem dynamics, biogeochemical cycles, and biodiversity conservation illustrated clearly.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'High quality conceptual understanding of environmental ecology.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem1-phy110',
    courseId: 'btech',
    semester: 1,
    code: 'PHY110',
    name: 'Engineering Physics',
    credits: 4,
    type: 'Elective',
    electiveGroup: 'Core Elective 2',
    description: 'Oscillations and waves, physical optics (interference, diffraction, polarization), lasers, fiber optics, and quantum mechanics fundamentals.',
    keywords: ['physics', 'optics', 'lasers', 'fiber optics', 'quantum mechanics', 'interference', 'diffraction', 'phy110'],
    slug: 'phy110-engineering-physics',
    channels: [
      {
        channelId: 'all-about-electronics',
        name: 'All About Electronics',
        channelUrl: 'https://www.youtube.com/@AllAboutElectronics/videos',
        description: 'Physical principles of semiconductors, wave propagation, and electromagnetic wave concepts.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Clear animations explaining wave behavior and optical transitions.',
        priority: 1
      },
      {
        channelId: 'khan-academy',
        name: 'Khan Academy',
        channelUrl: 'https://www.youtube.com/@khanacademy/videos',
        description: 'Deep visual intuition for wave optics, double slit experiment, and basic quantum principles.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Crystal clear conceptual grounding before tackling heavy mathematical derivations.',
        priority: 2
      }
    ]
  },

  // ── Core Elective 3 ─────────────────────────────────────────────────────
  {
    id: 'btech-sem1-ece279',
    courseId: 'btech',
    semester: 1,
    code: 'ECE279',
    name: 'Basic Electrical and Electronics Engineering Laboratory',
    credits: 1,
    type: 'Lab',
    electiveGroup: 'Core Elective 3',
    description: 'Hardware lab experiments: verification of network theorems, measuring voltage/current waveforms on CRO, testing diode V-I characteristics, and breadboard circuit assembly.',
    keywords: ['electrical lab', 'electronics lab', 'multimeter', 'breadboard', 'cro', 'thevenin lab', 'ece279'],
    slug: 'ece279-basic-electrical-and-electronics-engineering-laboratory',
    channels: [
      {
        channelId: 'all-about-electronics',
        name: 'All About Electronics',
        channelUrl: 'https://www.youtube.com/@AllAboutElectronics/videos',
        description: 'Visual walkthrough of practical breadboard setups, oscilloscope probes, and component ratings.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Helps students visualize bench equipment and prepare for hardware lab viva.',
        priority: 1
      },
      {
        channelId: 'engineering-funda',
        name: 'Engineering Funda',
        channelUrl: 'https://www.youtube.com/@EngineeringFunda/videos',
        description: 'Step-by-step calculation tables, circuit connection diagrams, and viva question banks.',
        language: 'Hinglish',
        level: 'Exam-Focused',
        recommendationReason: 'Directly prepares students for practical examination viva questions and lab records.',
        priority: 2
      }
    ]
  }
];
