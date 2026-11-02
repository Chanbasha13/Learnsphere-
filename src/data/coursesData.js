// LearnSphere 3D Digital University - Comprehensive Course Catalog
export const coursesData = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    instructor: "Dr. Sarah Johnson",
    instructorRole: "Principal Frontend Architect",
    departmentId: "programming",
    departmentName: "Programming Academy",
    difficulty: "Beginner",
    duration: "8 weeks",
    rating: 4.8,
    reviewsCount: 342,
    enrolledCount: 1240,
    lessonsCount: 24,
    icon: "🌐",
    image: "/assets/images/web-dev.svg",
    color: "#38bdf8",
    description: "Learn HTML5, CSS3, modern JavaScript ES6+, and responsive UI engineering. Master CSS 3D perspectives, CSS Grid, DOM manipulation, asynchronous Fetch API, and client-side data persistence.",
    badge: "Bestseller",
    whatYouWillLearn: [
      "Architect semantic and accessible HTML5 documents",
      "Build responsive layouts using CSS Flexbox, Grid, and 3D transforms",
      "Master modern JavaScript ES6+ (Async/Await, Closures, DOM APIs)",
      "Manage persistent browser data with LocalStorage and REST endpoints",
      "Deploy production-ready web applications to modern cloud CDNs"
    ],
    prerequisites: ["Basic computer literacy", "A modern web browser and code editor"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Foundations of Modern Web Architecture",
        lessons: [
          { id: "1-1", title: "Introduction to Web Protocols & Tooling", duration: "14:20", videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU", completed: false },
          { id: "1-2", title: "HTML5 Semantic Markup & Web Accessibility", duration: "18:45", videoUrl: "https://www.youtube.com/embed/kUMe1FH4CHE", completed: false },
          { id: "1-3", title: "Advanced Forms, Inputs & Client Validation", duration: "16:10", videoUrl: "https://www.youtube.com/embed/fNcJuPIZ2WE", completed: false }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: CSS Masterclass & 3D Visual Styling",
        lessons: [
          { id: "1-4", title: "The Box Model, Sizing & Cascade Specificity", duration: "21:30", videoUrl: "https://www.youtube.com/embed/1PnVor36_40", completed: false },
          { id: "1-5", title: "CSS Flexbox & Two-Dimensional Grid Systems", duration: "25:15", videoUrl: "https://www.youtube.com/embed/jV8B24rSN5o", completed: false },
          { id: "1-6", title: "CSS 3D Transforms, Perspective & Keyframe Animations", duration: "22:40", videoUrl: "https://www.youtube.com/embed/2L6qA3w1h60", completed: false }
        ]
      },
      {
        id: "mod-3",
        title: "Module 3: JavaScript Engine & Dynamic Applications",
        lessons: [
          { id: "1-7", title: "JavaScript Core: Scope, Closures & Execution Context", duration: "24:50", videoUrl: "https://www.youtube.com/embed/hdI2bqOjy3c", completed: false },
          { id: "1-8", title: "DOM Manipulation & Event Delegation Patterns", duration: "19:15", videoUrl: "https://www.youtube.com/embed/y17RuWkWdn8", completed: false },
          { id: "1-9", title: "Async/Await, Promises & Fetch API Integration", duration: "26:30", videoUrl: "https://www.youtube.com/embed/V_Kr9OSfDeU", completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Python & Machine Learning Foundations",
    instructor: "Prof. Michael Chen",
    instructorRole: "Senior AI Researcher",
    departmentId: "programming",
    departmentName: "Programming Academy",
    difficulty: "Beginner",
    duration: "10 weeks",
    rating: 4.7,
    reviewsCount: 289,
    enrolledCount: 980,
    lessonsCount: 30,
    icon: "🐍",
    image: "/assets/images/python.svg",
    color: "#38bdf8",
    description: "Master Python programming from syntax fundamentals to data analytics, scientific computing with NumPy/Pandas, and introductory predictive machine learning pipelines.",
    badge: "Popular",
    whatYouWillLearn: [
      "Master Python data structures, functions, and object-oriented paradigms",
      "Process high-volume datasets with NumPy vectors and Pandas DataFrames",
      "Visualize statistical data using Matplotlib and Seaborn",
      "Train classification and regression models with Scikit-Learn",
      "Implement automated scripts and data extraction pipelines"
    ],
    prerequisites: ["No prior programming experience required", "Basic high school algebra"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Python Core Essentials",
        lessons: [
          { id: "2-1", title: "Python Runtime, Data Types & Variables", duration: "15:10", videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc", completed: false },
          { id: "2-2", title: "Control Flow, Iterators & List Comprehensions", duration: "19:40", videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw", completed: false },
          { id: "2-3", title: "Object-Oriented Programming & Custom Classes", duration: "23:05", videoUrl: "https://www.youtube.com/embed/JeznW_7DlB0", completed: false }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Scientific Data Processing",
        lessons: [
          { id: "2-4", title: "NumPy Multidimensional Array Computation", duration: "20:30", videoUrl: "https://www.youtube.com/embed/QUT1VHiLmmI", completed: false },
          { id: "2-5", title: "Pandas DataFrames, Data Cleaning & Feature Wrangling", duration: "28:15", videoUrl: "https://www.youtube.com/embed/vmEHCJofslg", completed: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Enterprise Java & Distributed Systems",
    instructor: "Dr. James Wilson",
    instructorRole: "Enterprise Systems Architect",
    departmentId: "programming",
    departmentName: "Programming Academy",
    difficulty: "Intermediate",
    duration: "12 weeks",
    rating: 4.6,
    reviewsCount: 215,
    enrolledCount: 750,
    lessonsCount: 28,
    icon: "☕",
    image: "/assets/images/java.svg",
    color: "#38bdf8",
    description: "Deep dive into Object-Oriented Programming, memory management, JVM internals, concurrent multi-threading, Spring Boot microservices, and distributed enterprise design patterns.",
    badge: "Enterprise",
    whatYouWillLearn: [
      "Design enterprise software using strict OOP and SOLID principles",
      "Master Java Collections, Generics, and functional Lambdas/Streams",
      "Optimize thread pools, synchronizations, and concurrency primitives",
      "Build high-throughput REST microservices with Spring Boot",
      "Connect and pool transactional databases using JPA and Hibernate"
    ],
    prerequisites: ["Basic programming logic in any language"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: JVM & Object-Oriented Architecture",
        lessons: [
          { id: "3-1", title: "JVM Architecture, Bytecode & Garbage Collection", duration: "18:20", videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34", completed: false },
          { id: "3-2", title: "Polymorphism, Interfaces & Abstract Classes", duration: "21:10", videoUrl: "https://www.youtube.com/embed/RRubcjpTkks", completed: false },
          { id: "3-3", title: "Generics & Collections Framework Architecture", duration: "24:45", videoUrl: "https://www.youtube.com/embed/viTHc_4XfCA", completed: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Data Structures & Algorithmic Optimization",
    instructor: "Prof. Michael Chen",
    instructorRole: "Chair of Algorithmic Mathematics",
    departmentId: "mathematics",
    departmentName: "Mathematics Center",
    difficulty: "Intermediate",
    duration: "10 weeks",
    rating: 4.9,
    reviewsCount: 412,
    enrolledCount: 1540,
    lessonsCount: 32,
    icon: "⚡",
    image: "/assets/images/dsa.svg",
    color: "#fbbf24",
    description: "The definitive guide to asymptotic Big-O analysis, linear and non-linear memory structures, graph traversals (BFS/DFS, Dijkstra), dynamic programming, and greedy algorithms.",
    badge: "Highest Rated",
    whatYouWillLearn: [
      "Analyze time and space complexity with Big-O, Theta, and Omega",
      "Implement balanced binary search trees, heaps, and hash tables from scratch",
      "Solve complex topological and shortest-path graph algorithms",
      "Master memoization, tabulation, and optimal substructure dynamic programming",
      "Ace technical coding interviews at top tech institutions"
    ],
    prerequisites: ["Comfort with at least one programming language (Python, Java, or C++)"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Asymptotics & Linear Structures",
        lessons: [
          { id: "4-1", title: "Asymptotic Notation & Space-Time Tradeoffs", duration: "17:15", videoUrl: "https://www.youtube.com/embed/8hly31xKli0", completed: false },
          { id: "4-2", title: "Dynamic Arrays, Singly & Doubly Linked Lists", duration: "22:30", videoUrl: "https://www.youtube.com/embed/F8AbOfQwl1c", completed: false },
          { id: "4-3", title: "Stacks, Monotonic Queues & Deques in Practice", duration: "19:50", videoUrl: "https://www.youtube.com/embed/wjI1W45ExrU", completed: false }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Non-Linear Hierarchies & Trees",
        lessons: [
          { id: "4-4", title: "Binary Trees, Traversals & Balanced AVL Trees", duration: "25:40", videoUrl: "https://www.youtube.com/embed/oSWTXtMglKE", completed: false },
          { id: "4-5", title: "Min-Max Heaps & Priority Queue Applications", duration: "20:15", videoUrl: "https://www.youtube.com/embed/t0Cq6tVNRBA", completed: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Artificial Intelligence & Neural Architectures",
    instructor: "Dr. Amanda Lee",
    instructorRole: "Director of Cognitive Systems",
    departmentId: "science-tech",
    departmentName: "Science & Technology",
    difficulty: "Advanced",
    duration: "14 weeks",
    rating: 4.9,
    reviewsCount: 390,
    enrolledCount: 1680,
    lessonsCount: 36,
    icon: "🧠",
    image: "/assets/images/ai.svg",
    color: "#818cf8",
    description: "Explore deep neural networks, backpropagation calculus, Convolutional Networks for computer vision, Transformers for LLMs, and reinforcement learning agents.",
    badge: "Trending",
    whatYouWillLearn: [
      "Derive backpropagation and gradient descent optimization from first principles",
      "Architect multi-layer perceptrons, CNNs, and attention mechanisms",
      "Fine-tune generative models and transformer architectures",
      "Deploy PyTorch neural models to accelerated cloud inference GPUs",
      "Evaluate algorithmic safety, ethics, and bias mitigation"
    ],
    prerequisites: ["Multivariable calculus basics, linear algebra, and Python proficiency"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Foundations of Deep Learning",
        lessons: [
          { id: "5-1", title: "Neurons, Activation Functions & Loss Surfaces", duration: "21:30", videoUrl: "https://www.youtube.com/embed/aircAruvnKk", completed: false },
          { id: "5-2", title: "Backpropagation Calculus & Tensor Operations", duration: "26:45", videoUrl: "https://www.youtube.com/embed/IHZwWFHWa-w", completed: false },
          { id: "5-3", title: "Convolutional Neural Networks for Vision", duration: "24:20", videoUrl: "https://www.youtube.com/embed/KuXjwB4LzSA", completed: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Spatial UI/UX & Design Systems",
    instructor: "Emma Watson",
    instructorRole: "Design Director & Spatial Interface Lead",
    departmentId: "design",
    departmentName: "Design Studio",
    difficulty: "Beginner",
    duration: "8 weeks",
    rating: 4.8,
    reviewsCount: 275,
    enrolledCount: 910,
    lessonsCount: 22,
    icon: "🎨",
    image: "/assets/images/ui-ux.svg",
    color: "#f472b6",
    description: "Master modern user experience research, spatial interface design, 8-point typographic grids, Figma component libraries, responsive design tokens, and usability heuristics.",
    badge: "Creative Choice",
    whatYouWillLearn: [
      "Conduct quantitative and qualitative user research studies",
      "Build scalable Figma design systems with auto-layout and variables",
      "Design spatial 3D user interfaces with realistic depth and lighting",
      "Conduct interactive prototyping and usability testing sessions",
      "Hand off pixel-perfect designs with clean CSS specifications"
    ],
    prerequisites: ["No design experience required", "A curious visual eye"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: UX Principles & Cognitive Psychology",
        lessons: [
          { id: "6-1", title: "Mental Models, Affordances & Usability Heuristics", duration: "16:40", videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU", completed: false },
          { id: "6-2", title: "User Personas, Journey Maps & Information Architecture", duration: "20:15", videoUrl: "https://www.youtube.com/embed/wI2daZXzwt0", completed: false },
          { id: "6-3", title: "Figma Fundamentals: Frames, Auto-Layout & Design Tokens", duration: "27:50", videoUrl: "https://www.youtube.com/embed/FTFaQWZBqQ8", completed: false }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Database Architectures & Cloud Engines",
    instructor: "Dr. James Wilson",
    instructorRole: "Data Infrastructure Lead",
    departmentId: "science-tech",
    departmentName: "Science & Technology",
    difficulty: "Intermediate",
    duration: "10 weeks",
    rating: 4.7,
    reviewsCount: 198,
    enrolledCount: 830,
    lessonsCount: 26,
    icon: "🗄️",
    image: "/assets/images/database.svg",
    color: "#818cf8",
    description: "Relational database modeling, ACID transactional integrity, SQL performance tuning, B-Tree index internals, and distributed NoSQL databases for web-scale applications.",
    badge: "Core Engineering",
    whatYouWillLearn: [
      "Master relational database schemas and normal forms (1NF through BCNF)",
      "Write complex SQL queries with CTEs, window functions, and joins",
      "Profile query execution plans and optimize B-Tree indexes",
      "Architect horizontally scalable NoSQL document and key-value stores",
      "Implement transaction isolation levels and concurrency control"
    ],
    prerequisites: ["Basic understanding of tables and programming logic"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Relational Modeling & SQL Mastery",
        lessons: [
          { id: "7-1", title: "Relational Algebra, Schemas & Entity Relationships", duration: "19:25", videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", completed: false },
          { id: "7-2", title: "Advanced SQL Queries, Subqueries & Window Functions", duration: "24:10", videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA", completed: false },
          { id: "7-3", title: "Index Internals: B-Trees, Hash Indexes & Scan Costs", duration: "21:30", videoUrl: "https://www.youtube.com/embed/aZjYr87r1b8", completed: false }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Enterprise Cybersecurity & Threat Intelligence",
    instructor: "Alex Rivera",
    instructorRole: "Certified Ethical Hacker & Defense Strategist",
    departmentId: "science-tech",
    departmentName: "Science & Technology",
    difficulty: "Intermediate",
    duration: "10 weeks",
    rating: 4.8,
    reviewsCount: 260,
    enrolledCount: 1050,
    lessonsCount: 28,
    icon: "🛡️",
    image: "/assets/images/cybersecurity.svg",
    color: "#818cf8",
    description: "Understand penetration testing, network packet analysis, OWASP Top 10 vulnerabilities, asymmetric cryptographic ciphers, zero-trust infrastructure, and incident response.",
    badge: "High Demand",
    whatYouWillLearn: [
      "Inspect network traffic with Wireshark and analyze packet protocols",
      "Identify and patch OWASP Top 10 web vulnerabilities (SQLi, XSS, CSRF)",
      "Understand public key cryptography, RSA, ECC, and TLS handshake protocols",
      "Simulate red-team penetration testing in controlled laboratory sandboxes",
      "Architect defense-in-depth security policies and SIEM monitoring"
    ],
    prerequisites: ["Basic networking knowledge (IP, TCP/UDP, DNS)"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Network Security & Attack Vectors",
        lessons: [
          { id: "8-1", title: "The Cyber Kill Chain & Threat Modeling Frameworks", duration: "17:40", videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA", completed: false },
          { id: "8-2", title: "Packet Sniffing, Wireshark & Port Scanning Defense", duration: "22:15", videoUrl: "https://www.youtube.com/embed/qpnAC0GjZAE", completed: false },
          { id: "8-3", title: "OWASP Top 10: SQL Injection & Cross-Site Scripting", duration: "25:50", videoUrl: "https://www.youtube.com/embed/2_l0G3Q2ZpA", completed: false }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Digital Venture Creation & Tech Leadership",
    instructor: "Elena Rostova",
    instructorRole: "Venture Capitalist & Former Startup Founder",
    departmentId: "business",
    departmentName: "Business School",
    difficulty: "All Levels",
    duration: "6 weeks",
    rating: 4.9,
    reviewsCount: 180,
    enrolledCount: 620,
    lessonsCount: 18,
    icon: "🚀",
    image: "/assets/images/hero-illustration.svg",
    color: "#34d399",
    description: "Learn how to turn breakthrough technology into scalable market ventures. Covers product-market fit, unit economics, venture capital term sheets, and ethical executive leadership.",
    badge: "Executive",
    whatYouWillLearn: [
      "Validate product-market fit with customer discovery interviews",
      "Model SaaS unit economics (CAC, LTV, Churn, Payback periods)",
      "Navigate seed and Series-A venture capital fundraising rounds",
      "Lead cross-functional engineering, design, and marketing teams"
    ],
    prerequisites: ["Interest in technology innovation and business management"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Idea Validation & Unit Economics",
        lessons: [
          { id: "9-1", title: "Customer Problem Discovery & The Lean Canvas", duration: "18:10", videoUrl: "https://www.youtube.com/embed/th3RNVPrn0U", completed: false },
          { id: "9-2", title: "Unit Economics, Financial Projections & CAC/LTV", duration: "21:40", videoUrl: "https://www.youtube.com/embed/0JbSox31z7w", completed: false }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Mathematical Foundations of Deep Learning",
    instructor: "Dr. Srinivasa Raman Jr.",
    instructorRole: "Chair of Mathematical Sciences",
    departmentId: "mathematics",
    departmentName: "Mathematics Center",
    difficulty: "Advanced",
    duration: "10 weeks",
    rating: 4.9,
    reviewsCount: 220,
    enrolledCount: 710,
    lessonsCount: 24,
    icon: "📐",
    image: "/assets/images/dsa.svg",
    color: "#fbbf24",
    description: "The mathematical backbone of modern machine learning: linear algebra matrices, eigenvalues, multivariable gradient vector fields, and probability distributions.",
    badge: "Rigorous",
    whatYouWillLearn: [
      "Master vector spaces, projections, and Singular Value Decomposition (SVD)",
      "Compute Jacobians, Hessians, and multivariable Taylor series expansions",
      "Model Bayes Theorem, Maximum Likelihood Estimation, and KL Divergence",
      "Understand the geometric intuition behind high-dimensional latent manifolds"
    ],
    prerequisites: ["Multivariable calculus and basic Python"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Matrix Calculus & Vector Spaces",
        lessons: [
          { id: "10-1", title: "Vector Spaces, Linear Independence & Projections", duration: "23:15", videoUrl: "https://www.youtube.com/embed/fNk_zzaMoSs", completed: false },
          { id: "10-2", title: "Eigenvalues, Eigenvectors & Spectral Decomposition", duration: "26:30", videoUrl: "https://www.youtube.com/embed/PFDu9oVAE-g", completed: false }
        ]
      }
    ]
  }
];
