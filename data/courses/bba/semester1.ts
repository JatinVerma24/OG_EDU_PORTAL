import { Subject } from '../../../types';

export const BBA_SEMESTER_1_SUBJECTS: Subject[] = [
  {
    id: 'bba-sem1-mgt101',
    courseId: 'bba',
    semester: 1,
    code: 'MGT101',
    name: 'Principles of Management',
    credits: 4,
    type: 'Core',
    description: 'Foundations of modern management, managerial roles, planning, organizational structures, Henri Fayol principles, Taylor scientific management, and controlling.',
    keywords: ['principles of management', 'henri fayol', 'planning', 'organizing', 'controlling', 'management theory', 'mgt101'],
    slug: 'mgt101-principles-of-management',
    channels: [
      {
        channelId: 'management-adda',
        name: 'Management Adda',
        channelUrl: 'https://www.youtube.com/@ManagementAdda/videos',
        description: 'Visual animated breakdown of management functions, Fayol 14 principles, and organizational frameworks.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Highest clarity for university management exam questions and case studies.',
        priority: 1
      },
      {
        channelId: 'commerce-wallah-pw',
        name: 'Commerce Wallah by PW',
        channelUrl: 'https://www.youtube.com/@CommerceWallahPW/videos',
        description: 'Comprehensive lectures on business organization and managerial functions with practical corporate examples.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Structured one-shot lectures ideal for revision before mid-term and end-term exams.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem1-acc101',
    courseId: 'bba',
    semester: 1,
    code: 'ACC101',
    name: 'Financial Accounting',
    credits: 4,
    type: 'Core',
    description: 'Double-entry bookkeeping, journal entries, ledger accounts, trial balance, final accounts with adjustments (Trading, P&L, Balance Sheet), and depreciation.',
    keywords: ['financial accounting', 'journal entries', 'ledger', 'trial balance', 'balance sheet', 'depreciation', 'acc101'],
    slug: 'acc101-financial-accounting',
    channels: [
      {
        channelId: 'ca-parag-gupta',
        name: 'CA Parag Gupta',
        channelUrl: 'https://www.youtube.com/@caparaggupta/videos',
        description: 'Step-by-step masterclasses on debit/credit rules, posting to ledger, and complex balance sheet adjustments.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Gold standard for numerical accounting problems and exam preparation.',
        priority: 1
      },
      {
        channelId: 'sunil-panda',
        name: 'Sunil Panda - The Educator',
        channelUrl: 'https://www.youtube.com/@sunilpandaofficial/videos',
        description: 'Engaging, exam-targeted tutorials breaking down trial balance, BRS, and final accounts.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Quick revision and conceptual clarity for students new to accounting.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem1-eco101',
    courseId: 'bba',
    semester: 1,
    code: 'ECO101',
    name: 'Microeconomics for Business',
    credits: 3,
    type: 'Core',
    description: 'Demand & supply analysis, price elasticity, consumer indifference curves, production functions, cost curves, and pricing under monopoly & perfect competition.',
    keywords: ['microeconomics', 'law of demand', 'elasticity of demand', 'indifference curve', 'production function', 'market structures', 'eco101'],
    slug: 'eco101-microeconomics-for-business',
    channels: [
      {
        channelId: 'economics-on-your-tips',
        name: 'Economics on Your Tips',
        channelUrl: 'https://www.youtube.com/@EconomicsOnYourTips/videos',
        description: 'Gaurav Jain explains economic graphs, elasticity formulas, and cost curves in crisp Hindi.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Best visual graph explanations for microeconomic equilibrium curves.',
        priority: 1
      },
      {
        channelId: 'commerce-wallah-pw',
        name: 'Commerce Wallah by PW',
        channelUrl: 'https://www.youtube.com/@CommerceWallahPW/videos',
        description: 'In-depth university economics series covering production, returns to scale, and market competition.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Excellent theory and numerical question solutions for semester exams.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem1-pel121',
    courseId: 'bba',
    semester: 1,
    code: 'PEL121',
    name: 'Business Communication',
    credits: 3,
    type: 'Language',
    description: 'Corporate business communication, executive report writing, email correspondence, professional presentations, non-verbal cues, and interview etiquette.',
    keywords: ['business communication', 'report writing', 'email etiquette', 'presentation skills', 'corporate speaking', 'pel121'],
    slug: 'pel121-business-communication',
    channels: [
      {
        channelId: 'chetchat',
        name: 'ChetChat',
        channelUrl: 'https://www.youtube.com/@ChetChat101/videos',
        description: 'Professional workplace communication, presentation confidence, and corporate speaking guidelines.',
        language: 'English',
        level: 'Beginner Friendly',
        recommendationReason: 'Practical techniques for corporate emails, presentations, and team discussions.',
        priority: 1
      }
    ]
  },
  {
    id: 'bba-sem1-mth108',
    courseId: 'bba',
    semester: 1,
    code: 'MTH108',
    name: 'Business Mathematics',
    credits: 4,
    type: 'Core',
    description: 'Matrices and determinants, linear programming, simple and compound interest, annuity calculations, and differential calculus for revenue optimization.',
    keywords: ['business mathematics', 'matrices', 'determinants', 'compound interest', 'annuity', 'differentiation', 'mth108'],
    slug: 'mth108-business-mathematics',
    channels: [
      {
        channelId: 'gajendra-purohit',
        name: 'Dr. Gajendra Purohit',
        channelUrl: 'https://www.youtube.com/@drgajendrapurohit/videos',
        description: 'Top Indian university mathematics educator with clear step-by-step matrix, determinant, and calculus solutions.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Unmatched clarity on matrix multiplication, inverse, and business calculus problems.',
        priority: 1
      }
    ]
  },
  {
    id: 'bba-sem1-cap101',
    courseId: 'bba',
    semester: 1,
    code: 'CAP101',
    name: 'Computer Applications in Business',
    credits: 3,
    type: 'Core',
    description: 'Hands-on Microsoft Excel for business analysis: VLOOKUP, XLOOKUP, Pivot Tables, financial modeling spreadsheets, and executive PowerPoint presentation design.',
    keywords: ['computer applications in business', 'excel for business', 'vlookup', 'pivot tables', 'financial modeling', 'cap101'],
    slug: 'cap101-computer-applications-in-business',
    channels: [
      {
        channelId: 'freecodecamp',
        name: 'freeCodeCamp.org',
        channelUrl: 'https://www.youtube.com/@freecodecamp/videos',
        description: 'Comprehensive zero-to-hero masterclass on Microsoft Excel, spreadsheet formulas, and business analytics.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'Complete full-course video covering everything from basic formulas to advanced pivot charts.',
        priority: 1
      }
    ]
  }
];
