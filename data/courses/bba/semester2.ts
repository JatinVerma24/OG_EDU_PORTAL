import { Subject } from '../../../types';

export const BBA_SEMESTER_2_SUBJECTS: Subject[] = [
  {
    id: 'bba-sem2-eco201',
    courseId: 'bba',
    semester: 2,
    code: 'ECO201',
    name: 'Macroeconomics for Managers',
    credits: 4,
    type: 'Core',
    description: 'National Income accounting (GDP, GNP, NNP), inflation causes & control, Keynesian aggregate demand/supply, monetary policy, fiscal policy, and balance of payments.',
    keywords: ['macroeconomics', 'national income', 'gdp', 'inflation', 'monetary policy', 'fiscal policy', 'keynesian model', 'eco201'],
    slug: 'eco201-macroeconomics-for-managers',
    channels: [
      {
        channelId: 'economics-on-your-tips',
        name: 'Economics on Your Tips',
        channelUrl: 'https://www.youtube.com/@EconomicsOnYourTips/videos',
        description: 'Step-by-step methods to calculate national income via Value Added, Income, and Expenditure methods.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Master national income numericals and macroeconomic policy diagrams.',
        priority: 1
      },
      {
        channelId: 'sunil-panda',
        name: 'Sunil Panda - The Educator',
        channelUrl: 'https://www.youtube.com/@sunilpandaofficial/videos',
        description: 'Engaging, fast-paced macroeconomic lectures on banking, RBI tools, repo rate, and fiscal deficit.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Simplifies complex monetary policy terms into relatable business contexts.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem2-acc205',
    courseId: 'bba',
    semester: 2,
    code: 'ACC205',
    name: 'Cost and Management Accounting',
    credits: 4,
    type: 'Core',
    description: 'Elements of cost, preparation of Cost Sheets, Marginal Costing and Break-Even Point (BEP) analysis, Standard Costing with variance analysis (Material, Labour, Overhead), and budgetary control systems.',
    keywords: [
      'cost and management accounting',
      'acc205',
      'acc201',
      'cost accounting',
      'cost sheet',
      'marginal costing',
      'break even point',
      'standard costing',
      'variance analysis',
      'budgetary control'
    ],
    slug: 'acc205-cost-and-management-accounting',
    channels: [
      {
        channelId: 'ca-parag-gupta',
        name: 'CA Parag Gupta',
        channelUrl: 'https://www.youtube.com/@caparaggupta/videos',
        description: 'Comprehensive tutorials on marginal costing formulas, P/V ratio, margin of safety, and material variance.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Crucial for scoring full marks in university numerical costing questions.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=CA+Parag+Gupta+cost+accounting+playlist',
        playlistTitle: 'Cost & Management Accounting Masterclass'
      },
      {
        channelId: 'grooming-education',
        name: 'Grooming Education Academy',
        channelUrl: 'https://www.youtube.com/@GroomingEducationAcademy/videos',
        description: 'Practical exam preparation on cost sheets, overhead allocations, and inventory EOQ.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Clear format templates and solved university past papers.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=Grooming+Education+Cost+Accounting',
        playlistTitle: 'Cost Accounting for BBA & Commerce'
      },
      {
        channelId: 'sunil-panda',
        name: 'Sunil Panda - The Educator',
        channelUrl: 'https://www.youtube.com/@sunilpandaofficial/videos',
        description: 'Targeted capsules breaking down standard costing formulas and break-even charts in simple Hindi.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Fast conceptual revision before mid-term examinations.',
        priority: 3
      }
    ]
  },
  {
    id: 'bba-sem2-mkt201',
    courseId: 'bba',
    semester: 2,
    code: 'MKT201',
    name: 'Principles of Marketing',
    credits: 4,
    type: 'Core',
    description: 'Strategic marketing concepts: Segmentation, Targeting, and Positioning (STP), the 4Ps of marketing (Product, Price, Place, Promotion), Consumer Buying Behaviour, Product Life Cycle (PLC), brand management, and digital marketing channels.',
    keywords: [
      'principles of marketing',
      'mkt201',
      'mkt101',
      'marketing management',
      '4 ps of marketing',
      'stp marketing',
      'consumer behavior',
      'product life cycle',
      'branding'
    ],
    slug: 'mkt201-principles-of-marketing',
    channels: [
      {
        channelId: 'management-adda',
        name: 'Management Adda',
        channelUrl: 'https://www.youtube.com/@ManagementAdda/videos',
        description: 'Graphic animations explaining Philip Kotler marketing principles, product life cycle, and market segmentation.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Superb conceptual clarity for BBA theoretical questions and case studies.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLBfnL_QO-Gv43fWj4qZ7r9Rrq3hPzJv8f',
        playlistTitle: 'Principles of Marketing Full Course'
      },
      {
        channelId: 'commerce-wallah-pw',
        name: 'Commerce Wallah by PW',
        channelUrl: 'https://www.youtube.com/@CommerceWallahPW/videos',
        description: 'Complete breakdown of promotional mix, digital marketing basics, and brand building strategies.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Covers practical corporate campaigns and Indian FMCG market examples.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=Commerce+Wallah+principles+of+marketing',
        playlistTitle: 'Principles of Marketing Masterclass'
      },
      {
        channelId: 'sunil-panda',
        name: 'Sunil Panda - The Educator',
        channelUrl: 'https://www.youtube.com/@sunilpandaofficial/videos',
        description: 'Fast-paced, engaging marketing lectures breaking down pricing strategies, channels of distribution, and advertising.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Helpful for quick revision of marketing definitions and features.',
        priority: 3
      }
    ]
  },
  {
    id: 'bba-sem2-mgn206',
    courseId: 'bba',
    semester: 2,
    code: 'MGN206',
    name: 'Research Methodology',
    credits: 4,
    type: 'Core',
    description: 'Systematic business research process: Problem identification, exploratory & descriptive research design, sampling methods (probability and non-probability), questionnaire formulation, data collection, hypothesis testing (t-test, chi-square, ANOVA), and formal research report writing.',
    keywords: [
      'research methodology',
      'mgn206',
      'res301',
      'business research',
      'sampling methods',
      'hypothesis testing',
      'chi square test',
      'questionnaire design',
      'report writing'
    ],
    slug: 'mgn206-research-methodology',
    channels: [
      {
        channelId: 'dr-neha-aneja',
        name: 'Dr. Neha Aneja',
        channelUrl: 'https://www.youtube.com/@DrNehaAneja/videos',
        description: 'Complete university research series explaining null hypothesis, Type I/II errors, and parametric vs. non-parametric tests.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Highest scoring guidance for BBA research methodology papers and project dissertations.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=Dr+Neha+Aneja+research+methodology',
        playlistTitle: 'Research Methodology Lecture Series'
      },
      {
        channelId: 'management-adda',
        name: 'Management Adda',
        channelUrl: 'https://www.youtube.com/@ManagementAdda/videos',
        description: 'Visual whiteboard tutorials on research problem definition, literature review, and sampling methods.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Simplifies complex statistical methodology terms into clean diagrams.',
        priority: 2,
        featuredPlaylistUrl: 'https://www.youtube.com/results?search_query=Management+Adda+research+methodology',
        playlistTitle: 'Research Methodology Simplified'
      }
    ]
  },
  {
    id: 'bba-sem2-law101',
    courseId: 'bba',
    semester: 2,
    code: 'LAW101',
    name: 'Business & Mercantile Law',
    credits: 4,
    type: 'Core',
    description: 'The Indian Contract Act 1872 (Essential elements, offer, acceptance, consideration, breach of contract), Sale of Goods Act 1930, and Indian Partnership Act 1932.',
    keywords: ['business law', 'mercantile law', 'indian contract act 1872', 'sale of goods act', 'partnership act', 'law101'],
    slug: 'law101-business-and-mercantile-law',
    channels: [
      {
        channelId: 'sudhir-sachdeva',
        name: 'Sudhir Sachdeva',
        channelUrl: 'https://www.youtube.com/@SudhirSachdevaClasses/videos',
        description: 'Deep section-by-section breakdown of the Indian Contract Act with memorable landmark court cases.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Best teacher for understanding legal terminology and case study questions.',
        priority: 1
      },
      {
        channelId: 'grooming-education',
        name: 'Grooming Education Academy',
        channelUrl: 'https://www.youtube.com/@GroomingEducationAcademy/videos',
        description: 'Exam-focused law capsules explaining conditions, warranties, and partnership rights.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Helpful question-answering tips for descriptive university law examinations.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem2-mth201',
    courseId: 'bba',
    semester: 2,
    code: 'MTH201',
    name: 'Business Statistics',
    credits: 4,
    type: 'Core',
    description: 'Descriptive statistics (Mean, Median, Mode, Standard Deviation), Karl Pearson correlation coefficient, linear regression lines, and index numbers.',
    keywords: ['business statistics', 'mean median mode', 'standard deviation', 'correlation coefficient', 'regression analysis', 'index numbers', 'mth201'],
    slug: 'mth201-business-statistics',
    channels: [
      {
        channelId: 'gajendra-purohit',
        name: 'Dr. Gajendra Purohit',
        channelUrl: 'https://www.youtube.com/@drgajendrapurohit/videos',
        description: 'Clear statistical formulas and numerical working on mean deviation, regression equations, and probability.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Formula tricks and shortcut techniques that save time during exams.',
        priority: 1
      }
    ]
  }
];
