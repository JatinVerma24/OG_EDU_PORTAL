import { Subject } from '../../../types';

export const BCA_SEMESTER_1_SUBJECTS: Subject[] = [
  {
    id: 'bca-sem1-pel100',
    courseId: 'bca',
    semester: 1,
    code: 'PEL100',
    name: 'Communication Skills Essentials',
    credits: 3,
    type: 'Language',
    description: 'Essential verbal and written communication techniques, grammar fundamentals, active listening, professional reading, executive email composition, and corporate presentations.',
    keywords: [
      'communication skills essentials',
      'pel100',
      'english communication',
      'grammar basics',
      'spoken english',
      'presentation skills',
      'email etiquette',
      'listening skills'
    ],
    slug: 'pel100-communication-skills-essentials',
    channels: [
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'Chetna Vasishth shares workplace communication skills, interview tips, body language, and fluency guidance.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Practical masterclasses on professional presentations, emails, and confidence building for freshers.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=ChetChat+communication+skills+playlist',
        playlistTitle: 'Workplace Communication & Fluency'
      },
      {
        channelId: 'english-connection',
        name: 'English Connection',
        channelUrl: 'https://www.youtube.com/@EnglishConnectionByKanchan/videos',
        description: 'Kanchan Keshari breaks down English grammar rules, daily communication sentences, and vocabulary building.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Best for bilingual learners seeking strong foundational grammar and conversational confidence.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=English+Connection+grammar+playlist',
        playlistTitle: 'Complete English Grammar & Spoken Series'
      },
      {
        channelId: 'ts-madaan',
        name: 'TsMadaan',
        channelUrl: 'https://www.youtube.com/@tsmadaan/videos',
        description: 'Motivational speaker focusing on personality development, public speaking techniques, and interpersonal skills.',
        language: 'Hinglish',
        level: 'Exam-Focused',
        recommendationReason: 'Helpful for overcoming stage fear, group discussions (GD), and viva presentations.',
        priority: 3
      }
    ]
  },
  {
    id: 'bca-sem1-cap1008',
    courseId: 'bca',
    semester: 1,
    code: 'CAP1008',
    name: 'C Programming',
    credits: 4,
    type: 'Core',
    description: 'Procedural programming in C: data types, operators, control flow statements, functions, recursion, arrays, strings, pointers, dynamic memory allocation (malloc/calloc), structures, and file I/O.',
    keywords: [
      'c programming',
      'cap1008',
      'pointers in c',
      'arrays and strings',
      'structures in c',
      'dynamic memory allocation',
      'recursion',
      'file handling in c',
      'c language'
    ],
    slug: 'cap1008-c-programming',
    channels: [
      {
        channelId: 'codewithharry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Harry provides an exhaustive, beginner-friendly Hindi C programming masterclass with hands-on practice programs.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Legendary full course covering syntax to memory pointers with clean animated illustrations.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR',
        playlistTitle: 'C Language Full Course for Beginners'
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Prof. Jenny teaches C language with deep conceptual breakdown of pointers, double pointers, and memory diagrams.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'University exam favorite — exact theoretical definitions and dry-run tracing of outputs.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31a8Uc5n4biCwQV8n9745znk',
        playlistTitle: 'C Programming Complete Playlist'
      },
      {
        channelId: 'neso-academy',
        name: 'Neso Academy',
        channelUrl: 'https://www.youtube.com/@nesoacademy/videos',
        description: 'Crisp, structured English tutorials covering standard C programming concepts, arrays, functions, and file handling.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'High academic rigor with detailed slides, ideal for understanding C compiler memory layout.',
        priority: 3,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3',
        playlistTitle: 'C Programming by Neso Academy'
      },
      {
        channelId: 'apna-college',
        name: 'Apna College',
        channelUrl: 'https://www.youtube.com/@ApnaCollegeOfficial/videos',
        description: 'Shradha Khapra teaches complete C language from zero to hero in one comprehensive marathon video with notes.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Fast-paced revision with complete PDF cheat-sheets and practical coding examples.',
        priority: 4,
        featuredPlaylistUrl: 'https://www.youtube.com/watch?v=irqbmMNs2Bo',
        playlistTitle: 'C Language One-Shot Masterclass'
      }
    ]
  },
  {
    id: 'bca-sem1-che110',
    courseId: 'bca',
    semester: 1,
    code: 'CHE110',
    name: 'Environmental Studies',
    credits: 3,
    type: 'Core',
    description: 'Multidisciplinary study of ecosystems, biodiversity conservation, natural resources management, air/water/soil pollution, climate change, global warming, and environmental protection laws.',
    keywords: [
      'environmental studies',
      'che110',
      'evs',
      'ecosystems',
      'biodiversity',
      'pollution control',
      'global warming',
      'sustainable development',
      'environmental acts'
    ],
    slug: 'che110-environmental-studies',
    channels: [
      {
        channelId: 'ekeeda',
        name: 'Ekeeda',
        channelUrl: 'https://www.youtube.com/@Ekeeda/videos',
        description: 'Structured university syllabus lectures covering environmental engineering, ecological pyramids, and biodiversity hotspots.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Topic-wise university exam syllabus breakdown with diagram explanation.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=Ekeeda+environmental+studies+playlist',
        playlistTitle: 'Environmental Studies for University Exams'
      },
      {
        channelId: '5-minutes-engineering',
        name: '5 Minutes Engineering',
        channelUrl: 'https://www.youtube.com/@5MinutesEngineering/videos',
        description: 'Quick 5-minute handwritten whiteboard capsules explaining ozone depletion, greenhouse effect, and pollution cycles.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Rapid 1-night revision before mid-term or end-term examinations.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=5+minutes+engineering+environmental+studies',
        playlistTitle: 'EVS Quick Revision Series'
      },
      {
        channelId: 'unacademy-evs',
        name: 'Unacademy',
        channelUrl: 'https://www.youtube.com/@unacademy/videos',
        description: 'Comprehensive ecology and environmental policies lectures covering major treaties, COP summits, and Indian legislation.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Solid conceptual depth on renewable energy, carbon credits, and environmental impact assessment (EIA).',
        priority: 3
      }
    ]
  },
  {
    id: 'bca-sem1-mth136',
    courseId: 'bca',
    semester: 1,
    code: 'MTH136',
    name: 'Discrete Structures',
    credits: 4,
    type: 'Core',
    description: 'Foundations of discrete mathematics for computing: Set theory, relations and equivalence classes, functions, propositional & predicate logic, truth tables, combinatorics, recurrence relations, and graph theory.',
    keywords: [
      'discrete structures',
      'mth136',
      'discrete mathematics',
      'set theory',
      'relations and functions',
      'propositional logic',
      'graph theory',
      'recurrence relations',
      'boolean algebra'
    ],
    slug: 'mth136-discrete-structures',
    channels: [
      {
        channelId: 'gajendra-purohit',
        name: 'Dr. Gajendra Purohit',
        channelUrl: 'https://www.youtube.com/@drgajendrapurohit/videos',
        description: "India's premier mathematics educator teaching discrete mathematics, relations, groups, posets, and combinatorics.",
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Highest rated for university exams; solves exact past paper problems with step-by-step methods.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLU6SqdYcYsfJ27O0dvuMwafS3X8Ce_Ev1',
        playlistTitle: 'Discrete Mathematics Full Course'
      },
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Varun Singla delivers energetic, intuitive lessons on propositional logic, truth tables, graphs, trees, and relations.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Simplifies mathematical proofs and logic symbols with relatable real-world analogies.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGAWVrH198zHkcg4iP_1zF0',
        playlistTitle: 'Discrete Mathematics by Gate Smashers'
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Sanchit Jain provides rigorous mathematical foundations on sets, posets, lattices, and graph connectivity.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Structured academic explanations for students pursuing computing and software development.',
        priority: 3,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLmXKhU9FNesR1rSES7oLdJaNFgveg74tC',
        playlistTitle: 'Discrete Mathematics Complete Course'
      }
    ]
  },
  {
    id: 'bca-sem1-cap1007',
    courseId: 'bca',
    semester: 1,
    code: 'CAP1007',
    name: 'Fundamentals of Information Technology',
    credits: 3,
    type: 'Core',
    description: 'Introduction to computer systems architecture, CPU components, memory hierarchy (RAM, ROM, Cache), binary/hex number conversions, operating system types, networking basics, internet protocols, and productivity suites.',
    keywords: [
      'fundamentals of information technology',
      'cap1007',
      'fit',
      'computer basics',
      'number systems',
      'memory hierarchy',
      'operating systems',
      'computer hardware',
      'internet basics'
    ],
    slug: 'cap1007-fundamentals-of-information-technology',
    channels: [
      {
        channelId: 'neso-academy',
        name: 'Neso Academy',
        channelUrl: 'https://www.youtube.com/@nesoacademy/videos',
        description: 'Comprehensive computer fundamentals series covering binary numbers, logic gates, memory organization, and system buses.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Visually impeccable whiteboard lectures explaining hardware architecture from the ground up.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=Neso+Academy+computer+fundamentals+playlist',
        playlistTitle: 'Computer Fundamentals & Hardware'
      },
      {
        channelId: 'learn-coding',
        name: 'Learn Coding',
        channelUrl: 'https://www.youtube.com/@Learn_Coding/videos',
        description: 'Clear, concise Hindi tutorials explaining computer fundamentals, input/output devices, software types, and OS duties.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Super friendly for students starting BCA without prior computer science background.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=Learn+Coding+computer+fundamental+full+course',
        playlistTitle: 'Computer Fundamental Full Course in Hindi'
      },
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Fundamental computer architecture lectures explaining instruction cycles, cache levels, and storage tech.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Excellent for theoretical long-answer university exam questions.',
        priority: 3
      }
    ]
  },
  {
    id: 'bca-sem1-cab103',
    courseId: 'bca',
    semester: 1,
    code: 'CAB103',
    name: 'Introduction to Artificial Intelligence and Machine Learning',
    credits: 4,
    type: 'Core',
    description: 'Overview of AI problem solving: state-space search, heuristic search algorithms (A*, BFS, DFS), knowledge representation, introduction to machine learning paradigms (supervised, unsupervised, reinforcement), linear regression, classification, and ethics of AI.',
    keywords: [
      'introduction to artificial intelligence',
      'cab103',
      'machine learning',
      'ai ml',
      'heuristic search',
      'supervised learning',
      'linear regression',
      'neural networks',
      'state space search'
    ],
    slug: 'cab103-introduction-to-ai-and-ml',
    channels: [
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Varun Singla delivers intuitive AI lectures on intelligent agents, state spaces, A* search, minimax algorithm, and alpha-beta pruning.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Easiest way to master core AI search algorithms and university exam problem solving.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHGhOHV-n5vKEPmPo1177h8',
        playlistTitle: 'Artificial Intelligence Playlist'
      },
      {
        channelId: 'krish-naik',
        name: 'Krish Naik',
        channelUrl: 'https://www.youtube.com/@krishnaik06/videos',
        description: 'Complete hands-on machine learning roadmap with Python, scikit-learn, supervised vs unsupervised algorithms, and math intuition.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Outstanding bridge between theoretical AI concepts and real-world Python ML implementations.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wTQxZzdCx13_',
        playlistTitle: 'Complete Machine Learning Playlist'
      },
      {
        channelId: 'campusx',
        name: 'CampusX',
        channelUrl: 'https://www.youtube.com/@CampusX-official/videos',
        description: 'Nitish Singh provides in-depth mathematical intuition for machine learning algorithms, loss functions, and gradients.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Deepest mathematical understanding of regression, decision trees, and classification.',
        priority: 3,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLujyshP',
        playlistTitle: '100 Days of Machine Learning'
      }
    ]
  },
  {
    id: 'bca-sem1-cab104',
    courseId: 'bca',
    semester: 1,
    code: 'CAB104',
    name: 'Data Engineering',
    credits: 4,
    type: 'Core',
    description: 'Foundations of data engineering: relational schemas, advanced SQL querying, data modeling (OLTP vs OLAP, Star and Snowflake schemas), ETL pipelines, distributed computing concepts, big data storage (Hadoop HDFS, Spark), and modern cloud data warehouses.',
    keywords: [
      'data engineering',
      'cab104',
      'sql queries',
      'data pipelines',
      'etl processing',
      'data warehousing',
      'olap oltp',
      'star schema',
      'big data basics'
    ],
    slug: 'cab104-data-engineering',
    channels: [
      {
        channelId: 'darshil-parmar',
        name: 'Darshil Parmar',
        channelUrl: 'https://www.youtube.com/@DarshilParmar/videos',
        description: 'Dedicated end-to-end data engineering projects, ETL pipelines, SQL, and data architecture explained practically.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Top modern educator for practical data pipelines, SQL transformations, and cloud data architecture.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLBJe2JYIGVMVO3Xmpcb0tSg_4_W4x_20A',
        playlistTitle: 'Data Engineering Complete Course & Projects'
      },
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Exemplary database management, ER modeling, relational schemas, normal forms (1NF to BCNF), and Big Data concepts.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Essential foundation for database architecture, schema normalization, and university SQL exams.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8C9CiBnvCSa122i9o',
        playlistTitle: 'DBMS & Database Architecture Playlist'
      },
      {
        channelId: 'krish-naik',
        name: 'Krish Naik',
        channelUrl: 'https://www.youtube.com/@krishnaik06/videos',
        description: 'Hands-on Big Data and Data Engineering lectures covering PySpark, data lakes, and SQL pipeline architectures.',
        language: 'Hinglish',
        level: 'Intermediate',
        recommendationReason: 'Provides clear hands-on code examples for ETL pipelines and data transformation.',
        priority: 3,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVNjhZX__Z4BAIT1-9puShvh',
        playlistTitle: 'Data Engineering & Big Data Bootcamp'
      }
    ]
  }
];
