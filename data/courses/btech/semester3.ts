import { Subject } from '../../../types';

export const BTECH_SEMESTER_3_SUBJECTS: Subject[] = [
  {
    id: 'btech-sem3-cse202',
    courseId: 'btech',
    semester: 3,
    code: 'CSE202',
    name: 'Object Oriented Programming',
    credits: 4,
    type: 'Core',
    description: 'Object-oriented programming paradigm in C++: classes, objects, data encapsulation, constructors/destructors, operator overloading, inheritance, runtime polymorphism, virtual functions, templates, exception handling, and file streams.',
    keywords: ['oop', 'c++', 'classes', 'inheritance', 'polymorphism', 'templates', 'virtual functions', 'operator overloading', 'cse202'],
    slug: 'cse202-object-oriented-programming',
    channels: [
      {
        channelId: 'love-babbar',
        name: 'CodeHelp - by Babbar',
        channelUrl: 'https://www.youtube.com/@CodeHelpbyBabbar/videos',
        description: 'Complete animated C++ OOP series by Love Babbar covering 4 pillars of OOP, virtual tables, and interview questions.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'The most popular, intuitive breakdown of Encapsulation, Inheritance, Polymorphism, and Abstraction.',
        priority: 1
      },
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Comprehensive C++ tutorial series covering classes, friend functions, operator overloading, and templates.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Clear handwritten notes and code examples for every OOP concept.',
        priority: 2
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Detailed whiteboard lessons explaining memory layout of objects, vptr, vtable, and multiple inheritance.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Great for scoring full marks on descriptive theory and exam questions.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem3-cse205',
    courseId: 'btech',
    semester: 3,
    code: 'CSE205',
    name: 'Data Structures and Algorithms',
    credits: 4,
    type: 'Core',
    description: 'Asymptotic notation, arrays, linked lists (singly, doubly, circular), stacks, queues, trees (BST, AVL, B-Trees), graphs (BFS, DFS, Dijkstra), hashing, and sorting/searching algorithms.',
    keywords: ['dsa', 'data structures', 'algorithms', 'linked list', 'stack', 'queue', 'binary search tree', 'avl tree', 'graph', 'sorting', 'cse205'],
    slug: 'cse205-data-structures-and-algorithms',
    channels: [
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'The premier university lecture series on Data Structures. Traces every pointer, node insertion, and tree rotation on board.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Legendary playlist for university semester exams, dry running code, and AVL rotations.',
        priority: 1
      },
      {
        channelId: 'take-u-forward',
        name: 'take U forward (Striver)',
        channelUrl: 'https://www.youtube.com/@takeUforward/videos',
        description: 'Striver’s A-Z DSA roadmap with visual animations of stacks, queues, trees, and graphs.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Industry-standard problem solving that prepares you for both semester exams and top product companies.',
        priority: 2
      },
      {
        channelId: 'abdul-bari',
        name: 'Abdul Bari',
        channelUrl: 'https://www.youtube.com/@abdul_bari/videos',
        description: 'Masterclass on Time & Space Complexity analysis, Recursion Trees, and asymptotic Big-O bounds.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'The absolute gold standard worldwide for understanding recursion and algorithm complexity.',
        priority: 3
      },
      {
        channelId: 'neso-academy',
        name: 'Neso Academy',
        channelUrl: 'https://www.youtube.com/@nesoacademy/videos',
        description: 'High-production value English lessons on Linked Lists, Queues, and Hashing.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Pristine slide design and structured notes for students who study in English.',
        priority: 4
      }
    ]
  },
  {
    id: 'btech-sem3-cse211',
    courseId: 'btech',
    semester: 3,
    code: 'CSE211',
    name: 'Computer Organization and Design',
    credits: 4,
    type: 'Core',
    description: 'Instruction set architecture, register transfer language, computer arithmetic (Booth algorithm, IEEE floating point), control unit design (hardwired and microprogrammed), pipelining, memory hierarchy, cache mapping, and I/O organization.',
    keywords: ['coa', 'computer organization', 'pipelining', 'cache memory', 'booth algorithm', 'alu', 'instruction cycle', 'registers', 'cse211'],
    slug: 'cse211-computer-organization-and-design',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Engaging breakdowns of Cache Memory Mapping (Direct, Associative, Set-Associative), Pipelining, and Hazards.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Solves the toughest numericals on Cache Hit Ratio and Pipeline Speedup with simple tricks.',
        priority: 1
      },
      {
        channelId: 'neso-academy',
        name: 'Neso Academy',
        channelUrl: 'https://www.youtube.com/@nesoacademy/videos',
        description: 'Exhaustive whiteboard playlist covering Register Transfer Language, Micro-operations, and Control Units.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Clear architectural diagrams matching standard Morris Mano textbook chapters.',
        priority: 2
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'In-depth lectures on Booth’s multiplication algorithm, IEEE 754 floating point format, and CPU bus timing.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Essential for mastering long numerical derivations in semester exams.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem3-cse306',
    courseId: 'btech',
    semester: 3,
    code: 'CSE306',
    name: 'Computer Networks',
    credits: 3,
    type: 'Core',
    description: 'OSI and TCP/IP reference models, physical layer transmission media, data link layer framing, error detection (CRC), flow control (Sliding Window), MAC protocols (CSMA/CD), IP addressing, subnetting, routing algorithms, and transport layer (TCP/UDP).',
    keywords: ['computer networks', 'osi model', 'tcp ip', 'subnetting', 'ip addressing', 'routing', 'sliding window', 'crc', 'cse306'],
    slug: 'cse306-computer-networks',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'India’s most celebrated Computer Networks series covering IP Subnetting, Sliding Window protocols, and Routing algorithms.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Subnetting numericals and Go-Back-N / Selective Repeat protocols made effortless.',
        priority: 1
      },
      {
        channelId: 'neso-academy',
        name: 'Neso Academy',
        channelUrl: 'https://www.youtube.com/@nesoacademy/videos',
        description: 'Comprehensive English lectures with detailed packet header diagrams for TCP, UDP, and IPv4.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Crystal clear illustrations of protocol handshakes and packet flow.',
        priority: 2
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Thorough coverage of transmission delays, bandwidth-delay products, and Dijkstra shortest path.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Solid foundation for numericals on transmission vs propagation delays.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem3-cse307',
    courseId: 'btech',
    semester: 3,
    code: 'CSE307',
    name: 'Internetworking Essentials',
    credits: 3,
    type: 'Core',
    description: 'Enterprise networking fundamentals: IPv4 and IPv6 transition, VLAN configuration, Spanning Tree Protocol (STP), NAT/PAT translation, DHCP services, DNS resolution, and router configuration principles.',
    keywords: ['internetworking', 'cisco', 'vlan', 'packet tracer', 'dhcp', 'dns', 'nat', 'routing protocols', 'ospf', 'cse307'],
    slug: 'cse307-internetworking-essentials',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Practical explanations of NAT, PAT, DHCP, DNS, and application layer protocols.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Clear conceptual foundation for how the internet routes data between private and public networks.',
        priority: 1
      },
      {
        channelId: 'tutorials-point',
        name: 'Tutorials Point (India)',
        channelUrl: 'https://www.youtube.com/@tutorialspointindia/videos',
        description: 'Structured modules explaining enterprise internetworking architectures and Cisco command basics.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Great for understanding VLAN segmentation and router interfaces.',
        priority: 2
      },
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Full networking certifications preparation covering real-world routers, firewalls, and subnets.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Great for hands-on packet capture analysis with Wireshark and Packet Tracer.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem3-gen231',
    courseId: 'btech',
    semester: 3,
    code: 'GEN231',
    name: 'Community Development Project',
    credits: 2,
    type: 'Core',
    description: 'Social innovation and community development: problem identification, field survey methodology, project planning, stakeholder analysis, execution of sustainable social interventions, and final report documentation.',
    keywords: ['community development', 'social project', 'field survey', 'sustainability', 'rural development', 'gen231'],
    slug: 'gen231-community-development-project',
    channels: [
      {
        channelId: 'tutorials-point',
        name: 'Tutorials Point (India)',
        channelUrl: 'https://www.youtube.com/@tutorialspointindia/videos',
        description: 'Project methodology, field survey design, report writing, and stakeholder analysis techniques.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Provides clear frameworks for creating project reports and final presentations.',
        priority: 1
      }
    ]
  },

  // ── Core Elective 4 ─────────────────────────────────────────────────────
  {
    id: 'btech-sem3-cse316',
    courseId: 'btech',
    semester: 3,
    code: 'CSE316',
    name: 'Operating Systems',
    credits: 3,
    type: 'Elective',
    electiveGroup: 'Core Elective 4',
    description: 'Process management, CPU scheduling algorithms (FCFS, SJF, Round Robin), inter-process communication, process synchronization (Semaphores, Peterson solution), deadlocks (Banker algorithm), memory management (Paging, Segmentation), and page replacement.',
    keywords: ['operating systems', 'scheduling', 'semaphores', 'deadlock', 'bankers algorithm', 'paging', 'virtual memory', 'cse316'],
    slug: 'cse316-operating-systems',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: "India's highest rated Operating Systems course covering CPU scheduling, Deadlocks, Paging, and Semaphores.",
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Crystal clear animations and Gantt charts for CPU scheduling and Banker’s safety algorithm.',
        priority: 1
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Sanchit Jain breaks down process synchronization, critical section problems, and page replacement numericals.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Exhaustive numerical practice for FIFO, LRU, and Optimal page replacement.',
        priority: 2
      },
      {
        channelId: 'neso-academy',
        name: 'Neso Academy',
        channelUrl: 'https://www.youtube.com/@nesoacademy/videos',
        description: 'Academic English lectures on OS kernel architecture, multi-threading, and system calls.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Rigorous theoretical diagrams for operating systems internals and memory hierarchy.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem3-mth302',
    courseId: 'btech',
    semester: 3,
    code: 'MTH302',
    name: 'Probability and Statistics',
    credits: 4,
    type: 'Elective',
    electiveGroup: 'Core Elective 4',
    description: 'Probability axioms, conditional probability, Bayes theorem, discrete/continuous random variables, probability distributions (Binomial, Poisson, Normal), sampling theory, hypothesis testing (t-test, z-test, chi-square), and regression.',
    keywords: ['probability', 'statistics', 'bayes theorem', 'normal distribution', 'hypothesis testing', 't test', 'chi square', 'mth302'],
    slug: 'mth302-probability-and-statistics',
    channels: [
      {
        channelId: 'sandeep-kumar-lpu',
        name: 'San Online Classes (Dr. Sandeep Kumar)',
        channelUrl: 'https://www.youtube.com/@Sanonlineclasses/videos',
        description: 'LPU Mathematics professor solving the exact university probability distributions and hypothesis testing questions.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Direct alignment with LPU MTH302 question patterns, CA tests, and end-term questions.',
        priority: 1
      },
      {
        channelId: 'dr-gajendra-purohit',
        name: 'Dr. Gajendra Purohit',
        channelUrl: 'https://www.youtube.com/@drgajendrapurohit/videos',
        description: 'Complete Engineering Probability & Statistics playlist with solved numericals on Normal distributions and Bayes theorem.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Step-by-step table lookups for Z-tables, T-tables, and Chi-Square rejection regions.',
        priority: 2
      },
      {
        channelId: 'khan-academy',
        name: 'Khan Academy',
        channelUrl: 'https://www.youtube.com/@khanacademy/videos',
        description: 'Intuitive visual explanations of central limit theorem, p-values, and confidence intervals.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Unmatched conceptual intuition behind random variables and distributions.',
        priority: 3
      }
    ]
  },

  // ── Core Elective 5 ─────────────────────────────────────────────────────
  {
    id: 'btech-sem3-cse325',
    courseId: 'btech',
    semester: 3,
    code: 'CSE325',
    name: 'Operating Systems Laboratory',
    credits: 1,
    type: 'Lab',
    electiveGroup: 'Core Elective 5',
    description: 'Linux shell scripting, POSIX system calls (fork, exec, wait), implementing CPU scheduling algorithms in C, multi-threading using pthreads, and simulating page replacement algorithms.',
    keywords: ['os lab', 'linux shell', 'fork system call', 'pthreads', 'scheduling simulation', 'cse325'],
    slug: 'cse325-operating-systems-laboratory',
    channels: [
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Step-by-step C code implementations for FCFS, SJF, Round Robin, and Banker’s algorithm in Linux.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Code walkthroughs that match standard university lab manual experiments.',
        priority: 1
      },
      {
        channelId: 'geeksforgeeks',
        name: 'GeeksforGeeks',
        channelUrl: 'https://www.youtube.com/@GeeksforGeeksVideos/videos',
        description: 'Implementation guides on POSIX threads, fork() system call behavior, and inter-process communication in C.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Clear code snippets and practical explanation of process hierarchy.',
        priority: 2
      }
    ]
  },

  // ── Language Elective 2 ─────────────────────────────────────────────────
  {
    id: 'btech-sem3-pel132',
    courseId: 'btech',
    semester: 3,
    code: 'PEL132',
    name: 'Communication Skills-II',
    credits: 2,
    type: 'Language',
    electiveGroup: 'Language Elective 2',
    description: 'Advanced business communication: group discussions, mock interviews, technical report writing, resume crafting, and persuasive speaking.',
    keywords: ['group discussion', 'interview prep', 'resume', 'technical writing', 'presentation', 'pel132'],
    slug: 'pel132-communication-skills-2',
    channels: [
      {
        channelId: 'career-ride',
        name: 'CareerRide',
        channelUrl: 'https://www.youtube.com/@CareerRideTV/videos',
        description: 'Real mock group discussions, body language dos & don’ts, and winning GD entrance tips.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'The absolute best channel for mastering Group Discussions and campus placement interviews.',
        priority: 1
      },
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'Resume formatting rules, elevator pitch creation, and confident body language techniques.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Engaging real-life case studies and role-play demonstrations for students.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem3-pel134',
    courseId: 'btech',
    semester: 3,
    code: 'PEL134',
    name: 'Upper Intermediate Communication Skills-II',
    credits: 2,
    type: 'Language',
    electiveGroup: 'Language Elective 2',
    description: 'Advanced professional rhetoric: negotiating strategies, cross-cultural workplace communication, executive summary writing, and panel presentations.',
    keywords: ['negotiation', 'business presentations', 'executive summary', 'corporate communication', 'pel134'],
    slug: 'pel134-upper-intermediate-communication-skills-2',
    channels: [
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'Corporate negotiation strategies and professional workplace conversation patterns.',
        language: 'English',
        level: 'Intermediate',
        recommendationReason: 'Practical advice on articulating complex technical ideas with poise and authority.',
        priority: 1
      }
    ]
  },
  {
    id: 'btech-sem3-pel136',
    courseId: 'btech',
    semester: 3,
    code: 'PEL136',
    name: 'Advanced Communication Skills-II',
    credits: 2,
    type: 'Language',
    electiveGroup: 'Language Elective 2',
    description: 'Mastery of professional dialogue: executive pitching, debate argumentation, analytical white paper drafting, and keynote delivery.',
    keywords: ['executive pitch', 'keynote', 'debating', 'white paper', 'pel136'],
    slug: 'pel136-advanced-communication-skills-2',
    channels: [
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'Elite presentation frameworks, pitch decks communication, and vocal modulation techniques.',
        language: 'English',
        level: 'Advanced',
        recommendationReason: 'Prepares students for startup pitching, international conferences, and executive leadership.',
        priority: 1
      }
    ]
  }
];
