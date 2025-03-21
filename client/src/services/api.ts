// This is a mock API service that simulates API calls
// In a real application, this would be replaced with actual API calls

// Hardcoded Math subject ID
const MATH_SUBJECT_ID = 'math-101';

// Mock data
const topics = [
  {
    id: 'algebra',
    name: 'Algebra',
    description: 'Learn about equations, functions, and algebraic structures',
    color: '#4361ee',
    progress: 75,
    lessons: 24,
    estimatedTime: '12 weeks',
  },
  {
    id: 'geometry',
    name: 'Geometry',
    description: 'Explore shapes, sizes, positions, and dimensions of objects',
    color: '#7209b7',
    progress: 45,
    lessons: 20,
    estimatedTime: '10 weeks',
  },
  {
    id: 'analysis',
    name: 'Analysis',
    description: 'Study limits, continuity, differentiation, and integration',
    color: '#f72585',
    progress: 25,
    lessons: 28,
    estimatedTime: '14 weeks',
  },
  {
    id: 'probability',
    name: 'Probability',
    description:
      'Understand randomness, uncertainty, and statistical inference',
    color: '#4cc9f0',
    progress: 10,
    lessons: 18,
    estimatedTime: '9 weeks',
  },
];

const subTopics = {
  algebra: [
    {
      id: 'linear-equations',
      name: 'Linear Equations',
      description:
        'Master the fundamentals of linear equations and their applications',
      progress: 85,
      lessons: 6,
      duration: '2 weeks',
      difficulty: 'Beginner',
    },
    {
      id: 'quadratic-equations',
      name: 'Quadratic Equations',
      description: 'Learn to solve and graph quadratic equations and functions',
      progress: 60,
      lessons: 8,
      duration: '3 weeks',
      difficulty: 'Intermediate',
    },
    {
      id: 'polynomials',
      name: 'Polynomials',
      description:
        'Understand polynomial functions, operations, and factorization',
      progress: 30,
      lessons: 7,
      duration: '3 weeks',
      difficulty: 'Intermediate',
    },
    {
      id: 'matrices',
      name: 'Matrices and Determinants',
      description:
        'Explore matrix operations and their applications in solving systems',
      progress: 0,
      lessons: 5,
      duration: '2 weeks',
      difficulty: 'Advanced',
    },
  ],
  geometry: [
    {
      id: 'euclidean-geometry',
      name: 'Euclidean Geometry',
      description:
        'Study the basic principles of points, lines, angles, and shapes',
      progress: 70,
      lessons: 5,
      duration: '2 weeks',
      difficulty: 'Beginner',
    },
    {
      id: 'coordinate-geometry',
      name: 'Coordinate Geometry',
      description:
        'Learn to represent geometric objects in the coordinate plane',
      progress: 40,
      lessons: 6,
      duration: '3 weeks',
      difficulty: 'Intermediate',
    },
    {
      id: 'trigonometry',
      name: 'Trigonometry',
      description:
        'Explore the relationships between angles and sides of triangles',
      progress: 20,
      lessons: 7,
      duration: '3 weeks',
      difficulty: 'Intermediate',
    },
  ],
};

const modules = {
  'linear-equations': [
    {
      id: 'intro-linear-equations',
      name: 'Introduction to Linear Equations',
      type: 'theory',
      status: 'completed',
      duration: '25 min',
      description:
        'Learn the basic concepts and definitions of linear equations',
    },
    {
      id: 'slope-intercepts',
      name: 'Slope and Intercepts',
      type: 'theory',
      status: 'in-progress',
      duration: '30 min',
      description: 'Understand the slope-intercept form and point-slope form',
    },
    {
      id: 'graphing-linear-equations',
      name: 'Graphing Linear Equations',
      type: 'practice',
      status: 'locked',
      duration: '45 min',
      description: 'Practice plotting linear equations on the coordinate plane',
    },
    {
      id: 'systems-of-equations',
      name: 'Systems of Linear Equations',
      type: 'theory',
      status: 'locked',
      duration: '40 min',
      description: 'Learn methods for solving systems of linear equations',
    },
    {
      id: 'linear-equations-mastery-quiz',
      name: 'Linear Equations Mastery Quiz',
      type: 'assessment',
      status: 'locked',
      duration: '60 min',
      description:
        'Test your knowledge of linear equations with this comprehensive quiz',
    },
  ],
};

// API functions
export const getTopics = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(topics);
    }, 500);
  });
};

export const getSubTopics = async (topicId: string) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (subTopics[topicId as keyof typeof subTopics]) {
        resolve(subTopics[topicId as keyof typeof subTopics]);
      } else {
        reject(new Error('Topic not found'));
      }
    }, 500);
  });
};

export const getModules = async (subtopicId: string) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (modules[subtopicId as keyof typeof modules]) {
        resolve(modules[subtopicId as keyof typeof modules]);
      } else {
        reject(new Error('Subtopic not found'));
      }
    }, 500);
  });
};

export const getExercise = async (moduleId: string, exerciseId: string) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'linear-eq-1',
        question: 'Solve the following equation:',
        equation: '2x + 5 = 13',
        options: [
          { value: 'a', label: 'x = 4' },
          { value: 'b', label: 'x = 6' },
          { value: 'c', label: 'x = 8' },
        ],
        correctAnswer: 'a',
        hint: {
          from: 'AI',
          text: 'To solve this equation, you should:',
          steps: ['Moving 5 to the right-hand side', 'Divide both sides by 2'],
        },
        progress: 70,
        skillAnalysis: {
          strengths: [
            'Addition and subtraction of integers',
            'Solve a simple equation',
          ],
          weaknesses: ['Complex equation', 'A problem with fractions'],
        },
      });
    }, 500);
  });
};

export const getMathSubjectId = () => {
  return MATH_SUBJECT_ID;
};
