import { Subject } from '../../../types';

export const BBA_SEMESTER_3_SUBJECTS: Subject[] = [
  {
    id: 'bba-sem3-fin201',
    courseId: 'bba',
    semester: 3,
    code: 'FIN201',
    name: 'Financial Management',
    credits: 4,
    type: 'Core',
    description: 'Time value of money, Capital Budgeting decisions (NPV, IRR, Payback Period, PI), Cost of Capital (WACC), Capital Structure theories, and Working Capital Management.',
    keywords: ['financial management', 'capital budgeting', 'npv', 'irr', 'wacc', 'working capital', 'cost of capital', 'fin201'],
    slug: 'fin201-financial-management',
    channels: [
      {
        channelId: 'ca-parag-gupta',
        name: 'CA Parag Gupta',
        channelUrl: 'https://www.youtube.com/@caparaggupta/videos',
        description: 'Comprehensive numerical walkthroughs on Net Present Value (NPV), Internal Rate of Return (IRR), and EBIT-EPS analysis.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Essential for mastering university numerical calculations and capital budgeting.',
        priority: 1
      },
      {
        channelId: 'grooming-education',
        name: 'Grooming Education Academy',
        channelUrl: 'https://www.youtube.com/@GroomingEducationAcademy/videos',
        description: 'Financial management theory and working capital formulas explained with student-friendly examples.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Great for fast recap of formulas before university semester tests.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem3-hrm201',
    courseId: 'bba',
    semester: 3,
    code: 'HRM201',
    name: 'Human Resource Management',
    credits: 4,
    type: 'Core',
    description: 'Human Resource Planning (HRP), Job Analysis and Job Design, Recruitment & Selection procedures, Training & Development methods, and 360-Degree Performance Appraisal.',
    keywords: ['human resource management', 'hrm', 'recruitment', 'selection', 'performance appraisal', 'training and development', 'job analysis', 'hrm201'],
    slug: 'hrm201-human-resource-management',
    channels: [
      {
        channelId: 'management-adda',
        name: 'Management Adda',
        channelUrl: 'https://www.youtube.com/@ManagementAdda/videos',
        description: 'Visual whiteboards covering recruitment funnel, selection tests, interview types, and performance appraisal systems.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Clean concept diagrams that are easy to remember and sketch in exam answers.',
        priority: 1
      },
      {
        channelId: 'dr-neha-aneja',
        name: 'Dr. Neha Aneja',
        channelUrl: 'https://www.youtube.com/@DrNehaAneja/videos',
        description: 'Academic lectures breaking down employee onboarding, compensation structure, and industrial dispute management.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Deep theoretical coverage meeting official university BBA syllabus standards.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem3-opr201',
    courseId: 'bba',
    semester: 3,
    code: 'OPR201',
    name: 'Operations Research',
    credits: 4,
    type: 'Core',
    description: 'Linear Programming Problems (Graphical & Simplex Methods), Transportation Problems (Vogel Approximation & MODI), Assignment Problems (Hungarian method), and Game Theory.',
    keywords: ['operations research', 'linear programming', 'simplex method', 'transportation problem', 'hungarian method', 'game theory', 'opr201'],
    slug: 'opr201-operations-research',
    channels: [
      {
        channelId: 'gajendra-purohit',
        name: 'Dr. Gajendra Purohit',
        channelUrl: 'https://www.youtube.com/@drgajendrapurohit/videos',
        description: 'Step-by-step table iterations for Simplex method, Big-M, North-West Corner, and Hungarian assignment algorithm.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'The absolute best teacher for solving operations research numerical iterations without arithmetic slips.',
        priority: 1
      },
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'Intuitive visual explanations of Game Theory (Dominance property, Saddle point) and Transportation problems.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Quickest way to understand saddle point, payoff matrices, and optimal strategies.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem3-ob201',
    courseId: 'bba',
    semester: 3,
    code: 'OB201',
    name: 'Organizational Behaviour',
    credits: 3,
    type: 'Core',
    description: 'Individual differences and personality traits (Big Five, Myers-Briggs), perception biases, motivation theories (Maslow, Herzberg, Vroom), leadership styles, and group dynamics.',
    keywords: ['organizational behaviour', 'personality traits', 'maslow motivation', 'herzberg two factor', 'leadership styles', 'group dynamics', 'ob201'],
    slug: 'ob201-organizational-behaviour',
    channels: [
      {
        channelId: 'management-adda',
        name: 'Management Adda',
        channelUrl: 'https://www.youtube.com/@ManagementAdda/videos',
        description: 'Animated lessons explaining Maslow hierarchy, Herzberg hygiene theory, leadership grids, and organizational culture.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Engaging real-world case studies for university descriptive questions.',
        priority: 1
      },
      {
        channelId: 'commerce-wallah-pw',
        name: 'Commerce Wallah by PW',
        channelUrl: 'https://www.youtube.com/@CommerceWallahPW/videos',
        description: 'Lectures on team cohesion, conflict resolution styles, and change management models.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Structured exam-oriented question answers and corporate application examples.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem3-env100',
    courseId: 'bba',
    semester: 3,
    code: 'ENV100',
    name: 'Environmental Studies',
    credits: 2,
    type: 'Elective',
    description: 'Structure of ecosystems, natural resources conservation, biodiversity hotspots, air & water pollution control legislation, and sustainable corporate development.',
    keywords: ['environmental studies', 'ecosystem', 'biodiversity', 'pollution control', 'sustainable development', 'env100'],
    slug: 'env100-environmental-studies',
    channels: [
      {
        channelId: 'commerce-wallah-pw',
        name: 'Commerce Wallah by PW',
        channelUrl: 'https://www.youtube.com/@CommerceWallahPW/videos',
        description: 'Quick-revision university crash course on environmental awareness, conservation, and pollution control acts.',
        language: 'Hinglish',
        level: 'Exam-Focused',
        recommendationReason: 'Fast coverage of all required syllabus units for high grades with minimal prep time.',
        priority: 1
      }
    ]
  }
];
