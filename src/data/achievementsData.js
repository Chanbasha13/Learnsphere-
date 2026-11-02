// LearnSphere - Academic Achievements & Badge System

export const ACHIEVEMENTS = [
  {
    id: 'campus_explorer',
    title: 'Campus Architect',
    description: 'Explored all 6 architectural departments across the virtual university.',
    icon: 'Compass',
    category: 'Exploration',
    unlocked: true,
    progress: 100,
    unlockedAt: '2026-11-01'
  },
  {
    id: 'binary_pioneer',
    title: 'Binary Pioneer',
    description: 'Completed your first hands-on code lesson in the Binary Citadel.',
    icon: 'Code2',
    category: 'Learning',
    unlocked: true,
    progress: 100,
    unlockedAt: '2026-11-01'
  },
  {
    id: 'quiz_master',
    title: 'Perfectionist',
    description: 'Scored 100% on an academic certification examination.',
    icon: 'Award',
    category: 'Academics',
    unlocked: true,
    progress: 100,
    unlockedAt: '2026-11-02'
  },
  {
    id: 'streak_master',
    title: 'Persistent Scholar',
    description: 'Maintained a 7-day continuous learning streak across the campus.',
    icon: 'Flame',
    category: 'Dedication',
    unlocked: false,
    progress: 71, // 5 of 7 days
    unlockedAt: null
  },
  {
    id: 'assignment_ace',
    title: 'Master Craftsman',
    description: 'Submitted 3 course assignments with distinction grades.',
    icon: 'CheckCircle2',
    category: 'Academics',
    unlocked: false,
    progress: 66,
    unlockedAt: null
  },
  {
    id: 'certified_scholar',
    title: 'Certified Luminary',
    description: 'Earned and verified an official LearnSphere digital degree certificate.',
    icon: 'GraduationCap',
    category: 'Milestone',
    unlocked: false,
    progress: 40,
    unlockedAt: null
  }
];
