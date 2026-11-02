// Departments Data for LearnSphere 3D Digital University Campus

export const DEPARTMENTS = [
  {
    id: 'programming',
    name: 'Programming Academy',
    code: 'PA-01',
    landmark: 'The Binary Citadel',
    accentColor: '#38bdf8', // Cyan / Sky Blue
    accentGlow: 'rgba(56, 189, 248, 0.4)',
    pillarHeight: 180,
    tagline: 'Engineering software systems, cloud infrastructure & modern full-stack web',
    description: 'The epicenter of modern computational engineering. The Binary Citadel houses advanced software laboratories, competitive algorithm arenas, and cloud-native simulation rigs where students build high-scale distributed applications.',
    coordinates: { x: -280, z: -160, rotY: 25 },
    icon: 'Code2',
    stats: {
      activeStudents: 1420,
      coursesCount: 4,
      researchLabs: 6,
      placementRate: '98%'
    },
    dean: 'Dr. Sarah Lin, Distinguished Systems Architect',
    topics: ['Full-Stack Web', 'Distributed Systems', 'Python & Algorithms', 'Enterprise Java', 'Cloud Native DevOps'],
    courseIds: ['web-dev', 'python-ml', 'dsa', 'java-fullstack']
  },
  {
    id: 'science-tech',
    name: 'Science & Technology',
    code: 'ST-02',
    landmark: 'Quantum & Cyber Nexus',
    accentColor: '#818cf8', // Indigo / Violet
    accentGlow: 'rgba(129, 140, 248, 0.4)',
    pillarHeight: 220,
    tagline: 'Artificial Intelligence, enterprise cybersecurity & high-performance computing',
    description: 'A monolithic glass-and-steel nexus dedicated to artificial intelligence, neural networks, quantum computing protocols, and red-team cybersecurity defense labs.',
    coordinates: { x: 0, z: -320, rotY: 0 },
    icon: 'Cpu',
    stats: {
      activeStudents: 1890,
      coursesCount: 3,
      researchLabs: 8,
      placementRate: '96%'
    },
    dean: 'Prof. Marcus Vance, IEEE Fellow',
    topics: ['Artificial Intelligence', 'Cyber Warfare Defense', 'Database Architectures', 'Neural Networks'],
    courseIds: ['ai-mastery', 'cybersecurity', 'db-systems']
  },
  {
    id: 'business',
    name: 'Business School',
    code: 'BS-03',
    landmark: 'Venture Tower',
    accentColor: '#34d399', // Emerald
    accentGlow: 'rgba(52, 211, 153, 0.4)',
    pillarHeight: 195,
    tagline: 'Digital leadership, venture capital, product strategy & global commerce',
    description: 'The financial and strategic nerve center of the campus. Features real-time global market simulation floors, fintech incubators, and product leadership workshops.',
    coordinates: { x: 280, z: -160, rotY: -25 },
    icon: 'TrendingUp',
    stats: {
      activeStudents: 980,
      coursesCount: 2,
      researchLabs: 4,
      placementRate: '94%'
    },
    dean: 'Elena Rostova, Managing Partner Emeritus',
    topics: ['Digital Venture Creation', 'Product Strategy', 'Fintech & Blockchains', 'Executive Leadership'],
    courseIds: ['fintech-venture']
  },
  {
    id: 'design',
    name: 'Design Studio',
    code: 'DS-04',
    landmark: 'The Prism Pavilion',
    accentColor: '#f472b6', // Rose Pink
    accentGlow: 'rgba(244, 114, 182, 0.4)',
    pillarHeight: 160,
    tagline: 'Spatial design, generative aesthetics, UX research & design systems',
    description: 'An organic architectural pavilion sculpted with curved glass and responsive dynamic lighting. Dedicated to human-computer interaction, spatial user interfaces, typography, and motion design systems.',
    coordinates: { x: -260, z: 160, rotY: 45 },
    icon: 'Palette',
    stats: {
      activeStudents: 850,
      coursesCount: 2,
      researchLabs: 5,
      placementRate: '95%'
    },
    dean: 'Chloe Dupont, Former Head of Design',
    topics: ['Spatial UI/UX', 'Design Systems', '3D Motion Graphics', 'User Research & Prototyping'],
    courseIds: ['ui-ux']
  },
  {
    id: 'mathematics',
    name: 'Mathematics Center',
    code: 'MC-05',
    landmark: 'Eulerian Spire',
    accentColor: '#fbbf24', // Amber / Gold
    accentGlow: 'rgba(251, 191, 36, 0.4)',
    pillarHeight: 205,
    tagline: 'Linear algebra, discrete math, cryptography & topological computing',
    description: 'A soaring geometric needle engineered around golden ratio spirals. Students explore pure mathematics, algorithmic proofs, statistical machine learning foundations, and modern cryptography.',
    coordinates: { x: 260, z: 160, rotY: -45 },
    icon: 'Compass',
    stats: {
      activeStudents: 720,
      coursesCount: 2,
      researchLabs: 4,
      placementRate: '97%'
    },
    dean: 'Dr. Srinivasa Raman Jr., Clay Institute Scholar',
    topics: ['Discrete Mathematics', 'Deep Learning Math', 'Algorithmic Optimization', 'Applied Cryptography'],
    courseIds: ['dsa', 'math-ai']
  },
  {
    id: 'library',
    name: 'Digital Library',
    code: 'DL-06',
    landmark: 'The Alexandria Vault',
    accentColor: '#a78bfa', // Purple / Violet
    accentGlow: 'rgba(167, 139, 250, 0.4)',
    pillarHeight: 140,
    tagline: 'Open access academic papers, curated source archives & knowledge repositories',
    description: 'The historical and modern knowledge archive of LearnSphere. Features holographic study pods, millions of peer-reviewed computational papers, open source repositories, and quiet collaborative chambers.',
    coordinates: { x: 0, z: 240, rotY: 180 },
    icon: 'Library',
    stats: {
      activeStudents: 3100,
      coursesCount: 8,
      researchLabs: 12,
      placementRate: 'N/A'
    },
    dean: 'Archivist Samuel Thorne',
    topics: ['Peer-Reviewed Research', 'Open Educational Resources', 'Documentation Archives', 'Study Circles'],
    courseIds: ['web-dev', 'python-ml', 'cybersecurity', 'ai-mastery', 'dsa', 'db-systems', 'ui-ux', 'java-fullstack']
  }
];
