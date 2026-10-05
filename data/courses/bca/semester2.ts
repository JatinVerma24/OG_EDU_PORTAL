import { Subject } from '../../../types';

export const BCA_SEMESTER_2_SUBJECTS: Subject[] = [
  {
    id: 'bca-sem2-cap201',
    courseId: 'bca',
    semester: 2,
    code: 'CAP201',
    name: 'Object-Oriented Programming using C++',
    credits: 4,
    type: 'Core',
    description: 'Object-oriented programming paradigm: Classes, objects, data encapsulation, inheritance, polymorphism, operator overloading, virtual functions, templates, and exception handling in C++.',
    keywords: ['oops', 'c++', 'cap201', 'classes and objects', 'inheritance', 'polymorphism', 'templates', 'virtual functions'],
    slug: 'cap201-object-oriented-programming-cpp',
    channels: [
      {
        channelId: 'codewithharry',
        name: 'CodeWithHarry',
        channelUrl: 'https://www.youtube.com/@CodeWithHarry/videos',
        description: 'Complete C++ playlist covering OOPs concepts, pointers, and standard template library (STL).',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Clean visual examples of classes, inheritance, and constructors.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL',
        playlistTitle: 'C++ Full Course for Beginners'
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Theory and practical implementations of C++ concepts with deep academic rigor.',
        language: 'Hindi',
        level: 'Comprehensive',
        recommendationReason: 'Best for scoring in descriptive university OOPs exams.',
        priority: 2
      }
    ]
  },
  {
    id: 'bca-sem2-cap202',
    courseId: 'bca',
    semester: 2,
    code: 'CAP202',
    name: 'Data Structures and Algorithms',
    credits: 4,
    type: 'Core',
    description: 'Linear and non-linear data structures: Arrays, linked lists, stacks, queues, trees (BST, AVL), graphs, sorting algorithms, and asymptotic complexity analysis (Big-O).',
    keywords: ['data structures', 'algorithms', 'cap202', 'linked list', 'trees', 'graphs', 'stacks queues', 'sorting algorithms'],
    slug: 'cap202-data-structures-and-algorithms',
    channels: [
      {
        channelId: 'abdul-bari',
        name: 'Abdul Bari',
        channelUrl: 'https://www.youtube.com/@abdul_bari/videos',
        description: 'Master of Algorithm and Data Structure whiteboard teaching with dry runs.',
        language: 'English',
        level: 'Comprehensive',
        recommendationReason: 'World-renowned explanations of recursion, trees, and time complexity.',
        priority: 1,
        featuredPlaylistUrl: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
        playlistTitle: 'Data Structures using C/C++'
      },
      {
        channelId: 'jennys-lectures',
        name: "Jenny's Lectures CS/IT",
        channelUrl: 'https://www.youtube.com/@JennyslecturesCSIT/videos',
        description: 'Detailed code and dry run traces for linked lists, stacks, queues, and tree traversals.',
        language: 'Hindi',
        level: 'Beginner Friendly',
        recommendationReason: 'Perfect university exam preparation for data structure implementations.',
        priority: 2
      }
    ]
  }
];
