import { Subject } from '../../../types';

export const BTECH_SEMESTER_2_SUBJECTS: Subject[] = [
  {
    id: 'btech-sem2-cse101',
    courseId: 'btech',
    semester: 2,
    code: 'CSE101',
    name: 'Computer Programming',
    credits: 4,
    type: 'Core',
    description: 'Procedural programming in C: data types, operators, conditional branching, iteration, arrays, string manipulation, user-defined functions, recursion, pointers, dynamic memory allocation, and structures.',
    keywords: ['c programming', 'coding', 'pointers', 'arrays', 'functions', 'recursion', 'structures', 'cse101', 'c language'],
    slug: 'cse101-computer-programming',
    channels: [
      {
        channelId: 'apna-college',
        name: 'Apna College',
        channelUrl: 'https://www.youtube.com/@ApnaCollegeOfficial/videos',
        description: 'Complete animated C Language one-shot playlist by Shraddha Khapra covering syntax, dry runs, and memory diagrams.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Clean visual breakdowns of pointers, memory addresses, and array indexing.',
        priority: 1
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Comprehensive academic lecture series covering C programming logic, pointer arithmetic, and structures in depth.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Deep theoretical coverage matching university exam question patterns and viva.',
        priority: 2
      },
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Hands-on C programming tutorial series with practical exercises, projects, and handwritten notes.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Great for building confidence in writing code and solving syntax doubts.',
        priority: 3
      },
      {
        channelId: 'neso-academy',
        name: 'Neso Academy',
        channelUrl: 'https://www.youtube.com/@nesoacademy/videos',
        description: 'Structured English playlist on C programming with rigorous problem analysis.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Invaluable for students who prefer formal English instruction and clean slides.',
        priority: 4
      }
    ]
  },
  {
    id: 'btech-sem2-cse121',
    courseId: 'btech',
    semester: 2,
    code: 'CSE121',
    name: 'Orientation to Computing-II',
    credits: 2,
    type: 'Core',
    description: 'Advanced computing orientation: software development lifecycles, Git and GitHub version control, collaborative workflows, and command-line automation.',
    keywords: ['git', 'github', 'version control', 'collaboration', 'terminal', 'computing tools', 'cse121'],
    slug: 'cse121-orientation-to-computing-2',
    channels: [
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Git and GitHub complete tutorial series with terminal commands, branch management, and pull requests.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Crystal-clear terminal commands and collaborative Git workflows explained in Hindi.',
        priority: 1
      },
      {
        channelId: 'apna-college',
        name: 'Apna College',
        channelUrl: 'https://www.youtube.com/@ApnaCollegeOfficial/videos',
        description: 'Git and GitHub crash course with visual branch diagrams and repository hosting tips.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Fast-paced, beginner-focused guide for setting up your first project repository.',
        priority: 2
      },
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Complete developer tools guide covering command line, SSH keys, and Git version control.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Industry-standard practices for project repository management.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem2-cse320',
    courseId: 'btech',
    semester: 2,
    code: 'CSE320',
    name: 'Software Engineering',
    credits: 3,
    type: 'Core',
    description: 'Software development lifecycle models (Waterfall, Agile, Scrum), requirements engineering, UML architectural modeling, design patterns, testing strategies, and project metrics.',
    keywords: ['software engineering', 'sdlc', 'agile', 'scrum', 'uml', 'testing', 'design patterns', 'cse320'],
    slug: 'cse320-software-engineering',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Engaging conceptual lessons covering SDLC models, COCOMO estimation, and software testing levels.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Short, high-retention videos that make theoretical software engineering concepts easy to remember for exams.',
        priority: 1
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Detailed university lecture playlist covering UML diagrams, black/white box testing, and design principles.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Exhaustive notes and exam-oriented explanations of software architecture.',
        priority: 2
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Sanchit Jain breaks down SDLC metrics, risk management, and software quality assurance.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Structured diagrams and academic depth for university descriptive questions.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem2-int306',
    courseId: 'btech',
    semester: 2,
    code: 'INT306',
    name: 'Database Management Systems',
    credits: 4,
    type: 'Core',
    description: 'Relational database architecture, ER modeling, relational algebra, SQL querying, normalization (1NF to BCNF), transaction processing, ACID properties, concurrency control, and indexing.',
    keywords: ['dbms', 'database', 'sql', 'normalization', 'er diagram', 'acid properties', 'transactions', 'concurrency', 'int306'],
    slug: 'int306-database-management-systems',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: "India's highest rated DBMS playlist covering Normalization, Relational Algebra, SQL, and ACID properties.",
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Unmatched clarity on Normalization (1NF, 2NF, 3NF, BCNF) and Transaction Schedules.',
        priority: 1
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Thorough, mathematically sound lectures on SQL queries, relational calculus, and indexing structures.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Great for solving numericals on B-Trees, B+ Trees, and serializability tests.',
        priority: 2
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Step-by-step whiteboard DBMS lessons explaining ER modeling and table joins.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Perfect for conceptual clarity on relational schemas and primary/foreign keys.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem2-mth401',
    courseId: 'btech',
    semester: 2,
    code: 'MTH401',
    name: 'Discrete Mathematics',
    credits: 4,
    type: 'Core',
    description: 'Mathematical reasoning for computer science: propositional and predicate logic, set theory, relations, functions, recurrence relations, combinatorics, graph theory, and trees.',
    keywords: ['discrete mathematics', 'discrete maths', 'graph theory', 'logic', 'sets', 'relations', 'combinatorics', 'recurrence', 'mth401'],
    slug: 'mth401-discrete-mathematics',
    channels: [
      {
        channelId: 'sandeep-kumar-lpu',
        name: 'San Online Classes (Dr. Sandeep Kumar)',
        channelUrl: 'https://www.youtube.com/@Sanonlineclasses/videos',
        description: 'LPU Mathematics professor solving the actual discrete mathematics university syllabus and question patterns.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Tailored specifically to LPU MTH401 exams, proofs, and recurrence equations.',
        priority: 1
      },
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Complete Discrete Mathematics playlist with intuitive explanations of Graph Theory, Trees, and Logic.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Makes abstract graph theory, Euler graphs, and Boolean logic effortless to understand.',
        priority: 2
      },
      {
        channelId: 'dr-gajendra-purohit',
        name: 'Dr. Gajendra Purohit',
        channelUrl: 'https://www.youtube.com/@drgajendrapurohit/videos',
        description: 'Comprehensive higher engineering mathematics lectures on relations, posets, lattices, and permutations.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Rigorous theorem proofs and solved examples for end-term paper preparation.',
        priority: 3
      }
    ]
  },

  // ── Language Elective 1 ─────────────────────────────────────────────────
  {
    id: 'btech-sem2-pel121',
    courseId: 'btech',
    semester: 2,
    code: 'PEL121',
    name: 'Communication Skills-I',
    credits: 2,
    type: 'Language',
    electiveGroup: 'Language Elective 1',
    description: 'Foundational English communication: grammatical accuracy, professional correspondence, paragraph writing, reading comprehension, and pronunciation fundamentals.',
    keywords: ['english', 'communication skills', 'grammar', 'writing', 'presentation', 'pel121'],
    slug: 'pel121-communication-skills-1',
    channels: [
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'Practical guides on fluency, sentence construction, professional email etiquette, and public speaking.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Modern, actionable communication techniques tailored for college students.',
        priority: 1
      },
      {
        channelId: 'career-ride',
        name: 'CareerRide',
        channelUrl: 'https://www.youtube.com/@CareerRideTV/videos',
        description: 'Vocabulary expansion, verbal aptitude, and writing structure lessons.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Helpful for grammar corrections, common error analysis, and essay writing.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem2-pel125',
    courseId: 'btech',
    semester: 2,
    code: 'PEL125',
    name: 'Upper Intermediate Communication Skills-I',
    credits: 2,
    type: 'Language',
    electiveGroup: 'Language Elective 1',
    description: 'Intermediate business English: rhetorical devices, argument structuring, active listening, business email formats, and professional debate delivery.',
    keywords: ['intermediate english', 'business communication', 'debates', 'email writing', 'pel125'],
    slug: 'pel125-upper-intermediate-communication-skills-1',
    channels: [
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'Advanced conversational strategies, vocabulary refinement, and boardroom presentation etiquette.',
        language: 'English',
        level: 'Intermediate',
        recommendationReason: 'Helps students transition from casual speech to crisp corporate communication.',
        priority: 1
      }
    ]
  },
  {
    id: 'btech-sem2-pel130',
    courseId: 'btech',
    semester: 2,
    code: 'PEL130',
    name: 'Advanced Communication Skills-I',
    credits: 2,
    type: 'Language',
    electiveGroup: 'Language Elective 1',
    description: 'Executive communication mastery: technical writing, persuasive rhetoric, impromptu speaking, panel moderation, and critical analytical essays.',
    keywords: ['advanced english', 'technical writing', 'rhetoric', 'public speaking', 'pel130'],
    slug: 'pel130-advanced-communication-skills-1',
    channels: [
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'High-impact speech frameworks, body language mastery, and formal presentation drills.',
        language: 'English',
        level: 'Advanced',
        recommendationReason: 'Excellent for campus placement interviews, debates, and public speaking competitions.',
        priority: 1
      }
    ]
  },

  // ── Core Electives (Repeated in Sem 2 rotation per syllabus basket) ───────
  {
    id: 'btech-sem2-ece249',
    courseId: 'btech',
    semester: 2,
    code: 'ECE249',
    name: 'Basic Electrical and Electronics Engineering',
    credits: 3,
    type: 'Elective',
    electiveGroup: 'Core Elective 1',
    description: 'Circuit analysis theorems, AC sinusoidal steady-state analysis, magnetic circuits, transformers, and semiconductor diodes.',
    keywords: ['circuits', 'electronics', 'kvl', 'kcl', 'thevenin', 'transformer', 'ece249'],
    slug: 'ece249-basic-electrical-and-electronics-engineering',
    channels: [
      {
        channelId: 'all-about-electronics',
        name: 'All About Electronics',
        channelUrl: 'https://www.youtube.com/@AllAboutElectronics/videos',
        description: 'Visual circuit simulations and diode operation diagrams with clean theoretical derivations.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Unmatched visual animations of current, voltage, and circuit behavior.',
        priority: 1
      },
      {
        channelId: 'engineering-funda',
        name: 'Engineering Funda',
        channelUrl: 'https://www.youtube.com/@EngineeringFunda/videos',
        description: 'Exhaustive lecture series on circuit laws, AC waveforms, and electronics components.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Covers standard university numericals and step-by-step problem derivations.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem2-mec136',
    courseId: 'btech',
    semester: 2,
    code: 'MEC136',
    name: 'Engineering Graphics and Digital Fabrication',
    credits: 3,
    type: 'Elective',
    electiveGroup: 'Core Elective 1',
    description: 'Orthographic projections, isometric representations, digital CAD drafting, sectioning of geometric solids, and 3D printing fabrication basics.',
    keywords: ['engineering graphics', 'cad', 'projections', 'isometric', 'orthographic', 'mec136'],
    slug: 'mec136-engineering-graphics-and-digital-fabrication',
    channels: [
      {
        channelId: 'tikles-academy',
        name: "Tikle's Academy",
        channelUrl: 'https://www.youtube.com/@TiklesAcademy/videos',
        description: 'Comprehensive engineering drawing tutorials solving every standard university problem on paper.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'The absolute gold-standard resource for engineering graphics sheets and CAD exams.',
        priority: 1
      },
      {
        channelId: 'manas-patnaik',
        name: 'Manas Patnaik',
        channelUrl: 'https://www.youtube.com/@manaspatnaikofficial/videos',
        description: 'In-depth visual drafting lectures with precise angle and plane demonstrations.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Great for understanding 3D spatial orientations and isometric views.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem2-che110',
    courseId: 'btech',
    semester: 2,
    code: 'CHE110',
    name: 'Environmental Studies',
    credits: 2,
    type: 'Elective',
    electiveGroup: 'Core Elective 2',
    description: 'Ecosystems, sustainable resource management, environmental pollution control, global warming policy, and wildlife preservation.',
    keywords: ['environment', 'evs', 'pollution', 'sustainability', 'che110'],
    slug: 'che110-environmental-studies',
    channels: [
      {
        channelId: 'tutorials-point',
        name: 'Tutorials Point (India)',
        channelUrl: 'https://www.youtube.com/@tutorialspointindia/videos',
        description: 'Concise, point-by-point environmental engineering syllabus modules.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Quick revision slides ideal for scoring high in theoretical papers.',
        priority: 1
      }
    ]
  },
  {
    id: 'btech-sem2-phy110',
    courseId: 'btech',
    semester: 2,
    code: 'PHY110',
    name: 'Engineering Physics',
    credits: 4,
    type: 'Elective',
    electiveGroup: 'Core Elective 2',
    description: 'Wave optics, laser physics, optical fibers, quantum wave functions, and solid-state materials.',
    keywords: ['physics', 'optics', 'quantum physics', 'lasers', 'fiber optics', 'phy110'],
    slug: 'phy110-engineering-physics',
    channels: [
      {
        channelId: 'all-about-electronics',
        name: 'All About Electronics',
        channelUrl: 'https://www.youtube.com/@AllAboutElectronics/videos',
        description: 'Semiconductor physics, energy bands, and optical phenomena explained visually.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Clear animations explaining quantum and optical principles.',
        priority: 1
      }
    ]
  },
  {
    id: 'btech-sem2-ece279',
    courseId: 'btech',
    semester: 2,
    code: 'ECE279',
    name: 'Basic Electrical and Electronics Engineering Laboratory',
    credits: 1,
    type: 'Lab',
    electiveGroup: 'Core Elective 3',
    description: 'Practical hardware verification of KCL, KVL, Thevenin theorem, diode rectification, and oscilloscope measurements.',
    keywords: ['electrical lab', 'breadboard', 'multimeter', 'cro', 'ece279'],
    slug: 'ece279-basic-electrical-and-electronics-engineering-laboratory',
    channels: [
      {
        channelId: 'engineering-funda',
        name: 'Engineering Funda',
        channelUrl: 'https://www.youtube.com/@EngineeringFunda/videos',
        description: 'Practical breadboard connections, experimental setups, and viva questions.',
        language: 'Hinglish',
        level: 'Exam-Focused',
        recommendationReason: 'Direct viva prep and step-by-step practical calculations for lab tests.',
        priority: 1
      }
    ]
  }
];
