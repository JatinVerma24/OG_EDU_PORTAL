import { Subject } from '../../../types';

export const BTECH_SEMESTER_4_SUBJECTS: Subject[] = [
  // ── Core Subjects ───────────────────────────────────────────────────────
  {
    id: 'btech-sem4-cse310',
    courseId: 'btech',
    semester: 4,
    code: 'CSE310',
    name: 'Programming in Java',
    credits: 4,
    type: 'Core',
    description: 'Java programming language: JVM/JRE/JDK architecture, object-oriented concepts, interfaces, packages, exception handling, multithreading, Java Collections Framework (List, Set, Map), I/O streams, and lambda expressions.',
    keywords: ['java', 'jvm', 'multithreading', 'collections framework', 'interfaces', 'packages', 'exceptions', 'cse310'],
    slug: 'cse310-programming-in-java',
    channels: [
      {
        channelId: 'apna-college',
        name: 'Apna College',
        channelUrl: 'https://www.youtube.com/@ApnaCollegeOfficial/videos',
        description: 'Complete Java course by Shraddha Khapra covering syntax, OOPs, Collections, and project implementations.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Crisp, beautifully animated breakdowns of Java OOPs, memory heaps, and Collections Framework.',
        priority: 1
      },
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Comprehensive Java playlist with line-by-line coding examples, multithreading explanations, and practice sets.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Covers every university topic from basic syntax to multithread synchronization.',
        priority: 2
      },
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Full-length English Java bootcamp covering object-oriented enterprise architecture.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Great for students who want deep industrial insight into Java backend engineering.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem4-cse408',
    courseId: 'btech',
    semester: 4,
    code: 'CSE408',
    name: 'Design and Analysis of Algorithms',
    credits: 4,
    type: 'Core',
    description: 'Advanced algorithm design paradigms: Divide and Conquer (Merge, Quick), Greedy Algorithms (Huffman, Prim, Kruskal), Dynamic Programming (LCS, Knapsack, Matrix Chain Multiplication), Backtracking (N-Queens), Branch and Bound, NP-Completeness, and String Matching.',
    keywords: ['daa', 'algorithms', 'dynamic programming', 'greedy', 'divide and conquer', 'knapsack', 'np complete', 'cse408'],
    slug: 'cse408-design-and-analysis-of-algorithms',
    channels: [
      {
        channelId: 'abdul-bari',
        name: 'Abdul Bari',
        channelUrl: 'https://www.youtube.com/@abdul_bari/videos',
        description: 'The world’s most celebrated Algorithms playlist. Famous for whiteboard illustrations of Dynamic Programming, Knapsack, and Dijkstra.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Undisputed #1 resource globally for DAA proofs, recursion trees, and dynamic programming tables.',
        priority: 1
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Sanchit Jain breaks down Master Theorem, Recurrence Relations, and NP-Hard/NP-Complete proofs.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Essential for passing university written exams with exact mathematical proof templates.',
        priority: 2
      },
      {
        channelId: 'take-u-forward',
        name: 'take U forward (Striver)',
        channelUrl: 'https://www.youtube.com/@takeUforward/videos',
        description: 'Striver’s comprehensive Dynamic Programming and Graph algorithms masterclasses.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Shows how to translate complex theoretical DAA algorithms into clean code.',
        priority: 3
      }
    ]
  },
  {
    id: 'btech-sem4-int428',
    courseId: 'btech',
    semester: 4,
    code: 'INT428',
    name: 'Artificial Intelligence Essentials',
    credits: 3,
    type: 'Core',
    description: 'Foundations of artificial intelligence: state-space search (BFS, DFS, A*, Heuristic search), adversarial search (Minimax, Alpha-Beta pruning), knowledge representation, propositional and first-order logic, rule-based systems, and introductory neural networks.',
    keywords: ['artificial intelligence', 'ai', 'a star search', 'minimax', 'alpha beta pruning', 'knowledge representation', 'logic', 'int428'],
    slug: 'int428-artificial-intelligence-essentials',
    channels: [
      {
        channelId: 'krish-naik',
        name: 'Krish Naik',
        channelUrl: 'https://www.youtube.com/@krishnaik06/videos',
        description: 'Practical artificial intelligence, machine learning concepts, and heuristic search algorithms in Python.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Clear real-world intuition for AI search spaces, heuristics, and intelligent agents.',
        priority: 1
      },
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Structured AI series covering A* Search, Minimax game trees, and Alpha-Beta pruning numericals.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Step-by-step game tree evaluations that appear repeatedly in mid-term and end-term exams.',
        priority: 2
      },
      {
        channelId: 'campusx',
        name: 'CampusX',
        channelUrl: 'https://www.youtube.com/@CampusX-official/videos',
        description: 'Mathematical intuition behind intelligent systems, search optimizations, and machine learning foundations.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Dives deep into the mathematics of optimization and state-space exploration.',
        priority: 3
      }
    ]
  },

  // ── Aptitude Elective 1 ─────────────────────────────────────────────────
  {
    id: 'btech-sem4-pea305',
    courseId: 'btech',
    semester: 4,
    code: 'PEA305',
    name: 'Analytical Skills-I',
    credits: 2,
    type: 'Aptitude',
    electiveGroup: 'Aptitude Elective 1',
    description: 'Quantitative aptitude and logical reasoning: number systems, percentages, profit and loss, ratio and proportion, time and work, time speed and distance, coding-decoding, blood relations, and syllogisms.',
    keywords: ['aptitude', 'quantitative', 'logical reasoning', 'percentages', 'time and work', 'pea305'],
    slug: 'pea305-analytical-skills-1',
    channels: [
      {
        channelId: 'feel-free-to-learn',
        name: 'Feel Free to Learn',
        channelUrl: 'https://www.youtube.com/@FeelFreetoLearn/videos',
        description: 'Shortcut tricks and mental calculation methods for Time & Work, Speed Distance, and Percentages.',
        language: 'English',
        level: 'Exam-Focused',
        recommendationReason: 'Super-fast shortcut formulas that save critical time during timed multiple-choice assessments.',
        priority: 1
      },
      {
        channelId: 'career-ride',
        name: 'CareerRide',
        channelUrl: 'https://www.youtube.com/@CareerRideTV/videos',
        description: 'Systematic quantitative aptitude playlists covering every university and campus recruitment topic.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Clear step-by-step concept explanations for beginners without strong math backgrounds.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-pea307',
    courseId: 'btech',
    semester: 4,
    code: 'PEA307',
    name: 'Advanced Analytical Skills-I',
    credits: 2,
    type: 'Aptitude',
    electiveGroup: 'Aptitude Elective 1',
    description: 'High-level analytical reasoning: complex arrangements, critical reasoning, data sufficiency, advanced probability & permutations, cryptarithmetic, and caselet data interpretation.',
    keywords: ['advanced aptitude', 'data interpretation', 'cryptarithmetic', 'critical reasoning', 'pea307'],
    slug: 'pea307-advanced-analytical-skills-1',
    channels: [
      {
        channelId: 'feel-free-to-learn',
        name: 'Feel Free to Learn',
        channelUrl: 'https://www.youtube.com/@FeelFreetoLearn/videos',
        description: 'Advanced seating arrangement puzzles, syllogisms, and probability shortcut methods.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Crucial for tackling high-difficulty tier-1 company placement papers and university CAT exams.',
        priority: 1
      },
      {
        channelId: 'career-ride',
        name: 'CareerRide',
        channelUrl: 'https://www.youtube.com/@CareerRideTV/videos',
        description: 'Data interpretation sets, table charts, and critical logical deductions.',
        language: 'English',
        level: 'Intermediate',
        recommendationReason: 'Provides solid framework for decomposing multi-paragraph analytical caselets.',
        priority: 2
      }
    ]
  },

  // ── Core Elective 4 & 5 (Repeated in Sem 4 rotation per syllabus basket) ─
  {
    id: 'btech-sem4-cse316',
    courseId: 'btech',
    semester: 4,
    code: 'CSE316',
    name: 'Operating Systems',
    credits: 3,
    type: 'Elective',
    electiveGroup: 'Core Elective 4',
    description: 'Process scheduling, synchronization mechanisms, deadlock handling, memory allocation strategies, and file system implementation.',
    keywords: ['operating systems', 'scheduling', 'deadlock', 'virtual memory', 'cse316'],
    slug: 'cse316-operating-systems',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Comprehensive OS playlist covering CPU scheduling, Deadlocks, Paging, and Semaphores.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'The absolute standard for scoring top marks in university OS exams.',
        priority: 1
      }
    ]
  },
  {
    id: 'btech-sem4-mth302',
    courseId: 'btech',
    semester: 4,
    code: 'MTH302',
    name: 'Probability and Statistics',
    credits: 4,
    type: 'Elective',
    electiveGroup: 'Core Elective 4',
    description: 'Probability distributions, central limit theorem, hypothesis testing, confidence intervals, and regression analysis.',
    keywords: ['probability', 'statistics', 'distributions', 'hypothesis testing', 'mth302'],
    slug: 'mth302-probability-and-statistics',
    channels: [
      {
        channelId: 'sandeep-kumar-lpu',
        name: 'San Online Classes (Dr. Sandeep Kumar)',
        channelUrl: 'https://www.youtube.com/@Sanonlineclasses/videos',
        description: 'LPU Mathematics professor solving exact university question patterns and CA questions.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Direct alignment with LPU syllabus, solved exam papers, and derivations.',
        priority: 1
      }
    ]
  },
  {
    id: 'btech-sem4-cse325',
    courseId: 'btech',
    semester: 4,
    code: 'CSE325',
    name: 'Operating Systems Laboratory',
    credits: 1,
    type: 'Lab',
    electiveGroup: 'Core Elective 5',
    description: 'Hands-on practical implementation of process scheduling, synchronization with semaphores, and shell scripts in Linux.',
    keywords: ['os lab', 'linux', 'shell scripts', 'fork', 'cse325'],
    slug: 'cse325-operating-systems-laboratory',
    channels: [
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Code implementations of CPU scheduling, Banker’s algorithm, and process calls in Linux.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Matches university lab experiments and viva questioning.',
        priority: 1
      }
    ]
  },

  // ── Engineering Minor Elective 1 ─────────────────────────────────────────
  {
    id: 'btech-sem4-int330',
    courseId: 'btech',
    semester: 4,
    code: 'INT330',
    name: 'Managing Cloud Solutions',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 1',
    description: 'Cloud deployment architectures: AWS/GCP cloud services, IAM security, virtualization, containers (Docker), load balancing, serverless computing, and cost optimization.',
    keywords: ['cloud computing', 'aws', 'gcp', 'docker', 'devops', 'iam', 'serverless', 'int330'],
    slug: 'int330-managing-cloud-solutions',
    channels: [
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Complete certification bootcamps covering AWS Certified Cloud Practitioner and Solutions Architect.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Real-world cloud console walk-throughs covering EC2, S3, IAM, and VPC networking.',
        priority: 1
      },
      {
        channelId: 'tutorials-point',
        name: 'Tutorials Point (India)',
        channelUrl: 'https://www.youtube.com/@tutorialspointindia/videos',
        description: 'Academic cloud computing fundamentals: IaaS, PaaS, SaaS, and private/public deployment models.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Great for learning the theoretical taxonomy and definitions for semester exams.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-int242',
    courseId: 'btech',
    semester: 4,
    code: 'INT242',
    name: 'Cyber Security Essentials',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 1',
    description: 'Information security principles: CIA triad, cryptography (symmetric vs asymmetric, RSA, AES), network security threats, firewalls, IDS/IPS, malware analysis, and ethical hacking fundamentals.',
    keywords: ['cyber security', 'cryptography', 'rsa', 'firewall', 'ethical hacking', 'malware', 'network security', 'int242'],
    slug: 'int242-cyber-security-essentials',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Cryptography and Information Security series explaining RSA, DES, AES, and Diffie-Hellman numericals.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Clear numerical calculations of RSA encryption/decryption keys and cyber threats.',
        priority: 1
      },
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Hands-on practical ethical hacking, network scanning, and vulnerability assessment courses.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Industry-standard ethical hacking labs and penetration testing walkthroughs.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-int217',
    courseId: 'btech',
    semester: 4,
    code: 'INT217',
    name: 'Introduction to Data Management',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 1',
    description: 'Data curation pipelines: structured vs semi-structured data (JSON, XML), NoSQL databases (MongoDB), data cleaning methodologies, ETL pipelines, and business intelligence reporting.',
    keywords: ['data management', 'nosql', 'mongodb', 'etl', 'json', 'data pipelines', 'int217'],
    slug: 'int217-introduction-to-data-management',
    channels: [
      {
        channelId: 'krish-naik',
        name: 'Krish Naik',
        channelUrl: 'https://www.youtube.com/@krishnaik06/videos',
        description: 'End-to-end data engineering and NoSQL databases series with hands-on MongoDB and SQL pipelines.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Practical demonstrations of data extraction, aggregation pipelines, and NoSQL querying.',
        priority: 1
      },
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Database architecture and query processing principles explained visually.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Strong foundation on data schemas, indexing, and storage engines.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-int219',
    courseId: 'btech',
    semester: 4,
    code: 'INT219',
    name: 'Front End Web Developer',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 1',
    description: 'Modern frontend engineering: JavaScript ES6+ features, React.js component architecture, state management (hooks), virtual DOM, responsive UI frameworks, and RESTful API consumption.',
    keywords: ['frontend', 'react', 'javascript', 'es6', 'web development', 'components', 'hooks', 'int219'],
    slug: 'int219-front-end-web-developer',
    channels: [
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'React.js Complete Course with real projects (NewsApp, TextUtils) and full hooks breakdown.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'The friendliest and most detailed Hindi React tutorial series for university students.',
        priority: 1
      },
      {
        channelId: 'love-babbar',
        name: 'CodeHelp - by Babbar',
        channelUrl: 'https://www.youtube.com/@CodeHelpbyBabbar/videos',
        description: 'Modern Full Stack Web Development cohort lessons covering React, Tailwind, and component design.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Teaches modern production patterns, props drilling, context API, and clean project architecture.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-ece217',
    courseId: 'btech',
    semester: 4,
    code: 'ECE217',
    name: 'Introduction to Internet of Things (IoT)',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 1',
    description: 'IoT architecture, embedded microcontrollers (Arduino, ESP8266, ESP32), sensor interfacing, wireless communication protocols (MQTT, CoAP, ZigBee, Bluetooth BLE), and cloud IoT dashboards.',
    keywords: ['iot', 'arduino', 'esp8266', 'sensors', 'mqtt', 'embedded systems', 'ece217'],
    slug: 'ece217-introduction-to-internet-of-things',
    channels: [
      {
        channelId: 'all-about-electronics',
        name: 'All About Electronics',
        channelUrl: 'https://www.youtube.com/@AllAboutElectronics/videos',
        description: 'Sensor interfacing, ADC conversion, and embedded microcontroller circuits explained visually.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'High quality animations of analog sensor readings and microcontroller pinouts.',
        priority: 1
      },
      {
        channelId: 'engineering-funda',
        name: 'Engineering Funda',
        channelUrl: 'https://www.youtube.com/@EngineeringFunda/videos',
        description: 'Comprehensive IoT architecture lectures covering protocol layers (MQTT, CoAP) and wireless standards.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Matches university exam question formats for IoT communication protocols.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-int254',
    courseId: 'btech',
    semester: 4,
    code: 'INT254',
    name: 'Foundations of Machine Learning',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 1',
    description: 'Supervised vs unsupervised learning: linear regression, logistic regression, decision trees, random forests, k-means clustering, model evaluation metrics (precision, recall, ROC-AUC), and scikit-learn implementations.',
    keywords: ['machine learning', 'regression', 'decision trees', 'clustering', 'scikit learn', 'data science', 'int254'],
    slug: 'int254-foundations-of-machine-learning',
    channels: [
      {
        channelId: 'krish-naik',
        name: 'Krish Naik',
        channelUrl: 'https://www.youtube.com/@krishnaik06/videos',
        description: 'Complete Machine Learning playlist covering linear algebra, cost functions, gradient descent, and Python coding.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Outstanding blend of mathematical derivations and step-by-step Jupyter Notebook implementations.',
        priority: 1
      },
      {
        channelId: 'campusx',
        name: 'CampusX',
        channelUrl: 'https://www.youtube.com/@CampusX-official/videos',
        description: '100 Days of Machine Learning series diving deep into geometric and mathematical foundations.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'The most thorough Hindi series for understanding why algorithms work mathematically.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-cse374',
    courseId: 'btech',
    semester: 4,
    code: 'CSE374',
    name: 'Advance Software Engineering',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 1',
    description: 'Enterprise software architecture: microservices vs monoliths, domain-driven design, continuous integration and deployment (CI/CD pipelines), software reliability engineering, and refactoring techniques.',
    keywords: ['advanced software engineering', 'microservices', 'ci cd', 'devops', 'refactoring', 'architecture', 'cse374'],
    slug: 'cse374-advance-software-engineering',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Software architecture patterns, architectural styles, and software design principles.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Crisp, easy-to-recall breakdowns of architectural patterns and cohesion/coupling.',
        priority: 1
      },
      {
        channelId: 'tutorials-point',
        name: 'Tutorials Point (India)',
        channelUrl: 'https://www.youtube.com/@tutorialspointindia/videos',
        description: 'Explanatory lectures on agile methodologies, software configuration management, and automated pipelines.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Structured theoretical notes for semester examinations.',
        priority: 2
      }
    ]
  },

  // ── Engineering Minor Elective 2 ─────────────────────────────────────────
  {
    id: 'btech-sem4-int362',
    courseId: 'btech',
    semester: 4,
    code: 'INT362',
    name: 'Cloud Architecture and Implementation-I',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 2',
    description: 'Enterprise cloud design: multi-tier cloud applications, VPC subnets, route tables, autoscaling groups, database replication (RDS), serverless Lambda functions, and cloud security compliance.',
    keywords: ['cloud architecture', 'aws vpc', 'subnets', 'autoscaling', 'cloud security', 'serverless', 'int362'],
    slug: 'int362-cloud-architecture-and-implementation-1',
    channels: [
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'In-depth AWS Solutions Architect associate training courses covering VPC, IAM, and high availability.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Real architecture diagrams and industry design practices for enterprise clouds.',
        priority: 1
      },
      {
        channelId: 'tutorials-point',
        name: 'Tutorials Point (India)',
        channelUrl: 'https://www.youtube.com/@tutorialspointindia/videos',
        description: 'Structured cloud infrastructure modules covering virtualization and fault-tolerant architectures.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Clear theoretical explanations for scoring top marks in cloud architecture papers.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-int249',
    courseId: 'btech',
    semester: 4,
    code: 'INT249',
    name: 'System Administration',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 2',
    description: 'Linux and Windows system administration: user and group management, file permissions (chmod/chown), process monitoring, package managers (apt, yum), cron jobs, systemd services, and network service configuration.',
    keywords: ['system administration', 'sysadmin', 'linux admin', 'cron', 'file permissions', 'systemd', 'int249'],
    slug: 'int249-system-administration',
    channels: [
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Complete Linux System Administration course covering terminal commands, permissions, bash scripts, and networking.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Hands-on practical terminal walkthroughs that build true sysadmin proficiency.',
        priority: 1
      },
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Linux command line and shell scripting tutorials with downloadable command cheat sheets.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Friendly Hindi explanations of directory structures, file permissions, and process management.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-int375',
    courseId: 'btech',
    semester: 4,
    code: 'INT375',
    name: 'Data Science Toolbox: Python Programming',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 2',
    description: 'Scientific Python computing stack: NumPy arrays, multidimensional operations, Pandas DataFrames, data wrangling, missing data imputation, Matplotlib and Seaborn data visualizations, and exploratory data analysis (EDA).',
    keywords: ['data science', 'numpy', 'pandas', 'matplotlib', 'seaborn', 'eda', 'data analysis', 'int375'],
    slug: 'int375-data-science-toolbox-python-programming',
    channels: [
      {
        channelId: 'krish-naik',
        name: 'Krish Naik',
        channelUrl: 'https://www.youtube.com/@krishnaik06/videos',
        description: 'Complete Pandas, NumPy, and Data Analysis masterclasses with real Kaggle dataset projects.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Step-by-step code demonstrations of feature engineering and data visualization in Jupyter.',
        priority: 1
      },
      {
        channelId: 'campusx',
        name: 'CampusX',
        channelUrl: 'https://www.youtube.com/@CampusX-official/videos',
        description: 'In-depth Python for Data Science tutorials covering NumPy broadcasting, vectorized operations, and advanced Pandas indexing.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Deep dive into performance optimizations and memory usage of dataframes.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-int220',
    courseId: 'btech',
    semester: 4,
    code: 'INT220',
    name: 'Server Side Scripting',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 2',
    description: 'Backend web development: Node.js runtime, asynchronous event loop, Express.js routing, middleware design, REST API creation, MongoDB database integration (Mongoose), user authentication (JWT), and deployment.',
    keywords: ['backend', 'nodejs', 'express', 'rest api', 'jwt', 'mongodb', 'server side', 'int220'],
    slug: 'int220-server-side-scripting',
    channels: [
      {
        channelId: 'code-with-harry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Complete Node.js & Express.js backend development playlist with MongoDB database integration.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Great practical tutorials creating real REST APIs, CRUD operations, and middleware.',
        priority: 1
      },
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Comprehensive Node.js and Express full course covering API authentication and database modeling.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Industry-standard backend architecture and async/await programming patterns.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-ece341',
    courseId: 'btech',
    semester: 4,
    code: 'ECE341',
    name: 'Programming IoT',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 2',
    description: 'Embedded software engineering for connected devices: Python and C++ programming on Raspberry Pi and ESP32, GPIO pin control, sensor polling, publishing telemetry over MQTT, and cloud IoT integrations.',
    keywords: ['programming iot', 'raspberry pi', 'esp32', 'python iot', 'mqtt', 'gpio', 'sensors', 'ece341'],
    slug: 'ece341-programming-iot',
    channels: [
      {
        channelId: 'all-about-electronics',
        name: 'All About Electronics',
        channelUrl: 'https://www.youtube.com/@AllAboutElectronics/videos',
        description: 'Embedded microcontroller interfacing, serial communication (UART, SPI, I2C), and sensor code.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Clean visual diagrams of communication buses and hardware timings.',
        priority: 1
      },
      {
        channelId: 'engineering-funda',
        name: 'Engineering Funda',
        channelUrl: 'https://www.youtube.com/@EngineeringFunda/videos',
        description: 'Comprehensive microprocessors and microcontroller programming lectures.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Step-by-step code analysis for embedded C and assembly protocols.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-int354',
    courseId: 'btech',
    semester: 4,
    code: 'INT354',
    name: 'Machine Learning-I',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 2',
    description: 'Advanced machine learning: Support Vector Machines (SVM, kernel trick), ensemble learning (Bagging, Boosting, AdaBoost, XGBoost), dimensionality reduction (PCA), neural network perceptrons, and hyperparameter tuning.',
    keywords: ['machine learning', 'svm', 'xgboost', 'ensemble learning', 'pca', 'hyperparameter tuning', 'int354'],
    slug: 'int354-machine-learning-1',
    channels: [
      {
        channelId: 'campusx',
        name: 'CampusX',
        channelUrl: 'https://www.youtube.com/@CampusX-official/videos',
        description: 'Deep mathematical derivation and code implementation of Support Vector Machines, PCA, and XGBoost.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Unmatched visual geometric intuition for hyperplanes, support vectors, and kernel tricks.',
        priority: 1
      },
      {
        channelId: 'krish-naik',
        name: 'Krish Naik',
        channelUrl: 'https://www.youtube.com/@krishnaik06/videos',
        description: 'Hands-on ensemble learning tutorials covering Random Forest, AdaBoost, and XGBoost with Python code.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Real-world pipelines for hyperparameter tuning using GridSearchCV and cross-validation.',
        priority: 2
      }
    ]
  },
  {
    id: 'btech-sem4-cse375',
    courseId: 'btech',
    semester: 4,
    code: 'CSE375',
    name: 'Software Testing',
    credits: 3,
    type: 'Minor',
    electiveGroup: 'Engineering Minor Elective 2',
    description: 'Software verification and validation: test case design, black box testing (boundary value analysis, equivalence partitioning), white box testing (cyclomatic complexity, path testing), automated testing frameworks (JUnit, Selenium), regression testing, and bug lifecycle tracking.',
    keywords: ['software testing', 'qa', 'selenium', 'cyclomatic complexity', 'black box testing', 'white box testing', 'test cases', 'cse375'],
    slug: 'cse375-software-testing',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Complete Software Testing series covering Cyclomatic Complexity graphs, Equivalence Partitioning, and Boundary Value Analysis.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Makes calculation of Cyclomatic Complexity and control flow graphs intuitive for exams.',
        priority: 1
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'White box vs black box testing methodologies, defect lifecycles, and test case documentation.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Structured theoretical definitions matching university grading criteria.',
        priority: 2
      }
    ]
  }
];
