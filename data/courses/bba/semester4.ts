import { Subject } from '../../../types';

export const BBA_SEMESTER_4_SUBJECTS: Subject[] = [
  {
    id: 'bba-sem4-res301',
    courseId: 'bba',
    semester: 4,
    code: 'RES301',
    name: 'Research Methodology',
    credits: 4,
    type: 'Core',
    description: 'Scientific research process, exploratory and descriptive research design, sampling techniques (probability & non-probability), questionnaire design, hypothesis testing (t-test, ANOVA, chi-square), and business research reporting.',
    keywords: ['research methodology', 'sampling techniques', 'hypothesis testing', 't-test', 'chi square', 'anova', 'questionnaire design', 'res301'],
    slug: 'res301-research-methodology',
    channels: [
      {
        channelId: 'dr-neha-aneja',
        name: 'Dr. Neha Aneja',
        channelUrl: 'https://www.youtube.com/@DrNehaAneja/videos',
        description: 'Complete university research series explaining null hypothesis, Type I/II errors, and parametric vs. non-parametric tests.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Highest scoring guidance for BBA research methodology papers and project dissertations.',
        priority: 1
      },
      {
        channelId: 'management-adda',
        name: 'Management Adda',
        channelUrl: 'https://www.youtube.com/@ManagementAdda/videos',
        description: 'Visual tutorials on research problem definition, literature review, and sampling methods.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Simplifies complex statistical methodology terms into clean diagrams.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem4-law201',
    courseId: 'bba',
    semester: 4,
    code: 'LAW201',
    name: 'Company Law & Secretarial Practice',
    credits: 4,
    type: 'Core',
    description: 'Companies Act 2013: Characteristics and types of companies, Memorandum of Association (MOA), Articles of Association (AOA), prospectus, shares and debentures, board of directors duties, and winding up procedures.',
    keywords: ['company law', 'companies act 2013', 'moa', 'aoa', 'prospectus', 'directors', 'shares and debentures', 'winding up', 'law201'],
    slug: 'law201-company-law-and-secretarial-practice',
    channels: [
      {
        channelId: 'sudhir-sachdeva',
        name: 'Sudhir Sachdeva',
        channelUrl: 'https://www.youtube.com/@SudhirSachdevaClasses/videos',
        description: 'Exhaustive clause-by-clause analysis of Companies Act 2013, corporate veil doctrine, and director appointment rules.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Unmatched mastery of company law sections, corporate veil lifting, and exam cases.',
        priority: 1
      },
      {
        channelId: 'ca-parag-gupta',
        name: 'CA Parag Gupta',
        channelUrl: 'https://www.youtube.com/@caparaggupta/videos',
        description: 'Focused corporate law lectures highlighting differences between private and public limited companies.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Great for last-minute summary notes and distinction questions.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem4-mkt201',
    courseId: 'bba',
    semester: 4,
    code: 'MKT201',
    name: 'Consumer Behaviour',
    credits: 4,
    type: 'Core',
    description: 'Consumer decision-making process (Need recognition to post-purchase evaluation), psychological factors (Perception, Motivation, Attitudes), cultural influences, reference groups, and customer loyalty models.',
    keywords: ['consumer behaviour', 'buying decision process', 'post purchase dissonance', 'consumer perception', 'reference groups', 'customer loyalty', 'mkt201'],
    slug: 'mkt201-consumer-behaviour',
    channels: [
      {
        channelId: 'management-adda',
        name: 'Management Adda',
        channelUrl: 'https://www.youtube.com/@ManagementAdda/videos',
        description: 'Graphic whiteboard stories explaining Howard-Sheth model, cognitive dissonance, and family life cycle buying stages.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Super easy to recall models and flowcharts during university examinations.',
        priority: 1
      },
      {
        channelId: 'dr-neha-aneja',
        name: 'Dr. Neha Aneja',
        channelUrl: 'https://www.youtube.com/@DrNehaAneja/videos',
        description: 'Detailed analysis of consumer attitudes, perception thresholds, and neuromarketing trends.',
        language: 'Hinglish',
        level: 'Comprehensive',
        recommendationReason: 'Rich academic examples supporting essay-type examination answers.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem4-tax201',
    courseId: 'bba',
    semester: 4,
    code: 'TAX201',
    name: 'Direct & Indirect Taxation',
    credits: 4,
    type: 'Core',
    description: 'Income Tax Act 1961: Residential status, 5 heads of income (Salary, House Property, PGBP, Capital Gains, Other Sources), deductions under Section 80C to 80U, and Goods & Services Tax (GST) overview.',
    keywords: ['taxation', 'income tax', 'salary computation', 'house property', 'capital gains', 'section 80c', 'gst', 'tax201'],
    slug: 'tax201-direct-and-indirect-taxation',
    channels: [
      {
        channelId: 'ca-parag-gupta',
        name: 'CA Parag Gupta',
        channelUrl: 'https://www.youtube.com/@caparaggupta/videos',
        description: 'Comprehensive computational problems for Salary income, standard deductions, HRA exemption, and taxable capital gains.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'The absolute authority for computing taxable income and tax liabilities step-by-step.',
        priority: 1
      },
      {
        channelId: 'grooming-education',
        name: 'Grooming Education Academy',
        channelUrl: 'https://www.youtube.com/@GroomingEducationAcademy/videos',
        description: 'Clear GST dual-model structure (CGST, SGST, IGST), input tax credit rules, and tax slabs.',
        language: 'Hindi',
        level: 'Exam-Focused',
        recommendationReason: 'Crisp explanations of GST principles and university exam pattern questions.',
        priority: 2
      }
    ]
  },
  {
    id: 'bba-sem4-int202',
    courseId: 'bba',
    semester: 4,
    code: 'INT202',
    name: 'Management Information Systems',
    credits: 3,
    type: 'Core',
    description: 'Information systems in global business, Enterprise Resource Planning (ERP), Decision Support Systems (DSS), Executive Information Systems (EIS), database management in organizations, and business cybersecurity.',
    keywords: ['management information systems', 'mis', 'erp', 'dss', 'eis', 'supply chain systems', 'database systems in business', 'int202'],
    slug: 'int202-management-information-systems',
    channels: [
      {
        channelId: 'knowledge-gate',
        name: 'Knowledge Gate',
        channelUrl: 'https://www.youtube.com/@KNOWLEDGEGATE_kg/videos',
        description: 'Structured university foundations on MIS architecture, transaction processing systems (TPS), and DSS models.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Clear flow diagrams and technical definitions explained simply for management students.',
        priority: 1
      },
      {
        channelId: 'gate-smashers',
        name: 'Gate Smashers',
        channelUrl: 'https://www.youtube.com/@GateSmashers/videos',
        description: 'High-energy overviews on database concepts, cloud infrastructure, and enterprise data security.',
        language: 'Hinglish',
        level: 'Beginner Friendly',
        recommendationReason: 'Great for quickly understanding database schemas and information security terms.',
        priority: 2
      }
    ]
  }
];
