// LearnSphere - Interactive Quiz Bank with Explanations
export const quizData = {
  1: [
    {
      question: "What does HTML stand for in web engineering?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
      answer: 0,
      explanation: "HTML stands for HyperText Markup Language, the standard markup language for creating web documents."
    },
    {
      question: "Which CSS property is used to create a two-dimensional grid layout?",
      options: ["display: block", "display: flex", "display: grid", "display: inline-block"],
      answer: 2,
      explanation: "display: grid establishes a grid formatting context for two-dimensional row and column alignment."
    },
    {
      question: "What CSS property gives depth to 3D transformed child elements?",
      options: ["perspective", "z-index", "elevation", "box-shadow"],
      answer: 0,
      explanation: "The perspective CSS property determines the distance between the z=0 plane and the user to impart perspective to 3D elements."
    },
    {
      question: "Which HTML tag is used to embed client-side JavaScript?",
      options: ["<js>", "<javascript>", "<script>", "<code>"],
      answer: 2,
      explanation: "The <script> element is used to embed or reference executable client-side JavaScript code."
    },
    {
      question: "What is the correct way to query an element by its ID in modern JavaScript?",
      options: ["document.getElement('id')", "document.querySelector('#id')", "document.findElement('id')", "document.selectById('id')"],
      answer: 1,
      explanation: "document.querySelector('#id') uses CSS selector syntax, targeting an element with an ID of 'id'."
    }
  ],
  2: [
    {
      question: "What is the return type of print(type(5.0)) in Python?",
      options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'double'>"],
      answer: 1,
      explanation: "In Python, floating-point numbers with decimal components belong to the 'float' class."
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "function", "def", "lambda"],
      answer: 2,
      explanation: "Python uses the 'def' keyword to declare user-defined functions."
    },
    {
      question: "What distinguishes a Python tuple from a list?",
      options: ["Tuples are mutable", "Tuples are immutable", "Tuples cannot store integers", "Tuples have no order"],
      answer: 1,
      explanation: "Tuples are immutable ordered sequences, meaning their elements cannot be modified after instantiation."
    },
    {
      question: "Which NumPy method computes the dot product of two matrices?",
      options: ["np.dot()", "np.multiply()", "np.cross()", "np.join()"],
      answer: 0,
      explanation: "np.dot() or the @ operator performs matrix multiplication and dot products in NumPy."
    },
    {
      question: "Which Python data structure stores unique elements without duplicates?",
      options: ["List", "Dictionary", "Set", "Tuple"],
      answer: 2,
      explanation: "A Set is an unordered collection of unique elements with O(1) average lookup time."
    }
  ],
  3: [
    {
      question: "What is the role of the Java Virtual Machine (JVM)?",
      options: ["Compiles Java source code into bytecode", "Executes compiled Java bytecode on the host OS", "Formats code styling automatically", "Manages cloud database connections"],
      answer: 1,
      explanation: "The JVM provides a platform-independent execution environment that translates Java bytecode into machine code."
    },
    {
      question: "Which keyword creates a subclass inheritance relationship in Java?",
      options: ["inherits", "implements", "extends", "super"],
      answer: 2,
      explanation: "The 'extends' keyword is used in Java to derive a class from a superclass."
    },
    {
      question: "What is the exact signature of the entry point method in Java?",
      options: ["public void main(String args)", "public static void main(String[] args)", "static int main()", "void start(String[] args)"],
      answer: 1,
      explanation: "public static void main(String[] args) is the standard method signature the JVM searches for."
    },
    {
      question: "Which collection interface allows key-value pair associations?",
      options: ["List", "Set", "Map", "Queue"],
      answer: 2,
      explanation: "Map (implemented by HashMap, TreeMap, etc.) maps unique keys to values."
    },
    {
      question: "What is the purpose of the 'finally' block in Java exception handling?",
      options: ["Executes only if an exception is thrown", "Executes only if no exception occurs", "Always executes regardless of exceptions", "Terminates the JVM immediately"],
      answer: 2,
      explanation: "The finally block executes whether an exception is handled or not, typically used for cleanup."
    }
  ],
  4: [
    {
      question: "What is the worst-case time complexity of QuickSort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(1)"],
      answer: 1,
      explanation: "When pivot selection is unbalanced (e.g. already sorted array with naive pivot), QuickSort degrades to O(n²)."
    },
    {
      question: "Which data structure operates on a First-In, First-Out (FIFO) basis?",
      options: ["Stack", "Queue", "Binary Search Tree", "Max Heap"],
      answer: 1,
      explanation: "A Queue operates on FIFO principle: elements are inserted at the rear and removed from the front."
    },
    {
      question: "What is the average time complexity to search an element in a balanced BST?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: 2,
      explanation: "Each comparison eliminates half of the remaining search space, yielding O(log n) time."
    },
    {
      question: "Which graph traversal uses a queue to visit vertices layer by layer?",
      options: ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Topological Sort", "Dijkstra's Algorithm"],
      answer: 0,
      explanation: "BFS explores neighboring nodes level by level using a FIFO queue."
    },
    {
      question: "What condition indicates that a problem can be solved using Dynamic Programming?",
      options: ["Greedy choice property only", "Optimal substructure and overlapping subproblems", "Linear recursion only", "Unsorted input"],
      answer: 1,
      explanation: "DP is suited for problems with optimal substructure and overlapping subproblems."
    }
  ],
  5: [
    {
      question: "What is the mathematical purpose of an activation function in neural networks?",
      options: ["To speed up matrix multiplication", "To introduce non-linearity into the network", "To normalize input weights to zero", "To eliminate the need for backpropagation"],
      answer: 1,
      explanation: "Without non-linear activations like ReLU or Sigmoid, stacked neural layers collapse into a single linear transformation."
    },
    {
      question: "What algorithm is used to compute gradients across neural network weights?",
      options: ["K-Means Clustering", "Backpropagation using Calculus Chain Rule", "Dijkstra Shortest Path", "Breadth-First Search"],
      answer: 1,
      explanation: "Backpropagation applies the chain rule of calculus to compute partial derivatives of loss with respect to all weights."
    },
    {
      question: "What is the phenomenon called when a model fits training noise and fails to generalize?",
      options: ["Underfitting", "Overfitting", "Convergence", "Regularization"],
      answer: 1,
      explanation: "Overfitting occurs when high model capacity memorizes training noise rather than true underlying patterns."
    },
    {
      question: "Which neural architecture revolutionized Natural Language Processing with Self-Attention?",
      options: ["Convolutional Neural Network", "Recurrent Neural Network", "Transformer", "Boltzmann Machine"],
      answer: 2,
      explanation: "The Transformer architecture (Vaswani et al.) uses self-attention mechanisms to process tokens in parallel."
    },
    {
      question: "What optimization algorithm adapts learning rates dynamically using moving averages of gradients?",
      options: ["Stochastic Gradient Descent (SGD)", "Adam (Adaptive Moment Estimation)", "Simulated Annealing", "Hill Climbing"],
      answer: 1,
      explanation: "Adam combines momentum and RMSprop to adapt individual learning rates for every parameter."
    }
  ],
  6: [
    {
      question: "What does the acronym UX represent in digital product design?",
      options: ["User Experience", "Universal Extension", "User Execution", "Unified XML"],
      answer: 0,
      explanation: "UX stands for User Experience, encompassing all aspects of the end-user's interaction with a service or product."
    },
    {
      question: "What is a wireframe in the UI/UX design workflow?",
      options: ["The production CSS stylesheet", "A low-fidelity structural blueprint of a page layout", "The final 3D rendered model", "The database relationship diagram"],
      answer: 1,
      explanation: "A wireframe is a two-dimensional skeletal outline that communicates layout, spacing, and content hierarchy."
    },
    {
      question: "What is the standard base unit for modern design spacing systems?",
      options: ["3px Grid", "8px Grid (or 4px sub-grid)", "10px Decimal Grid", "15px Grid"],
      answer: 1,
      explanation: "The 8-point grid is the industry standard because it scales cleanly across modern high-DPI display resolutions."
    },
    {
      question: "Which WCAG contrast ratio is required for normal body text to achieve Level AA compliance?",
      options: ["2:1", "3:1", "4.5:1", "7:1"],
      answer: 2,
      explanation: "WCAG 2.1 Level AA requires at least a 4.5:1 contrast ratio for standard body text against its background."
    },
    {
      question: "What is an affordance in cognitive design theory?",
      options: ["The financial cost of software licenses", "A visual clue to how an object or interface element should be used", "The speed of the network connection", "The number of users testing a prototype"],
      answer: 1,
      explanation: "An affordance is a perceptual property that signals to the user how an interface element can be interacted with (e.g. raised bevels indicate clickable buttons)."
    }
  ],
  7: [
    {
      question: "What does the 'A' in ACID database transactions stand for?",
      options: ["Authentication", "Atomicity", "Asynchronous", "Availability"],
      answer: 1,
      explanation: "Atomicity ensures that all operations in a transaction succeed completely or none take effect."
    },
    {
      question: "Which SQL command is used to retrieve data from a database table?",
      options: ["EXTRACT", "SELECT", "PULL", "FETCH"],
      answer: 1,
      explanation: "SELECT is the standard DML statement used to query records from database tables."
    },
    {
      question: "What is a Foreign Key in relational schema design?",
      options: ["A primary key from another table that establishes a relationship", "An encrypted security key", "A key generated in another country", "A key that cannot be indexed"],
      answer: 0,
      explanation: "A foreign key matches the primary key of another table to enforce referential integrity."
    },
    {
      question: "What data structure is most commonly used for relational database indexes?",
      options: ["Linked List", "B-Tree / B+ Tree", "Stack", "Graph"],
      answer: 1,
      explanation: "B-Trees keep data sorted and allow search, sequential access, insertions, and deletions in logarithmic time."
    },
    {
      question: "Which normal form removes transitive dependencies between non-key attributes?",
      options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
      answer: 2,
      explanation: "3NF requires a table to be in 2NF and have no transitive functional dependencies on the primary key."
    }
  ],
  8: [
    {
      question: "What is the primary objective of a Denial of Service (DoS) attack?",
      options: ["To steal credit card credentials", "To make a system or network resource unavailable to its intended users", "To install crypto miners on personal computers", "To crack password hashes with rainbow tables"],
      answer: 1,
      explanation: "A DoS attack floods target servers with traffic or requests until normal service is disrupted."
    },
    {
      question: "Which cryptographic algorithm relies on the difficulty of factoring large prime numbers?",
      options: ["AES-256", "RSA", "SHA-256", "Blowfish"],
      answer: 1,
      explanation: "RSA is an asymmetric cipher whose security rests on the computational difficulty of prime factorization."
    },
    {
      question: "What type of attack involves injecting malicious scripts into trusted websites?",
      options: ["SQL Injection (SQLi)", "Cross-Site Scripting (XSS)", "Cross-Site Request Forgery (CSRF)", "Man-in-the-Middle (MITM)"],
      answer: 1,
      explanation: "XSS attacks inject client-side scripts into web pages viewed by other users."
    },
    {
      question: "What does TLS stand for in secure network communications?",
      options: ["Transport Layer Security", "Transfer Link System", "Total Locking Standard", "Transmission Line Shield"],
      answer: 0,
      explanation: "TLS (Transport Layer Security) is the cryptographic protocol providing end-to-end privacy and data integrity over the Internet."
    },
    {
      question: "What is the principle of 'Least Privilege' in cybersecurity architecture?",
      options: ["Giving users access only to the minimal resources necessary to perform their duties", "Using the lowest price security software", "Granting root access to all administrators", "Disabling multi-factor authentication"],
      answer: 0,
      explanation: "The Principle of Least Privilege restricts user and process permissions to only what is strictly required."
    }
  ],
  9: [
    {
      question: "What does the metric LTV:CAC evaluate in technology venture economics?",
      options: ["Lifetime Value compared to Customer Acquisition Cost", "Long-Term Velocity compared to Capital Allocation Cost", "Labor Total Value compared to Cloud Asset Consumption", "Liquidity Threshold Verification"],
      answer: 0,
      explanation: "The ratio of Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) gauges unit economics sustainability (healthy target is 3:1 or higher)."
    },
    {
      question: "What is a Minimum Viable Product (MVP)?",
      options: ["The cheapest possible prototype that can never be sold", "The version of a new product that enables maximum validated learning with least effort", "A fully completed enterprise software suite", "A marketing slide presentation without software"],
      answer: 1,
      explanation: "An MVP tests core value hypotheses with minimal development investment."
    },
    {
      question: "What is 'Churn Rate' in subscription SaaS businesses?",
      options: ["The percentage of customers who cancel their subscription over a given period", "The speed of code deployments per week", "The rate of employee turnover in engineering", "The growth of server CPU load"],
      answer: 0,
      explanation: "Churn rate measures the percentage of recurring subscribers who discontinue service during a time window."
    },
    {
      question: "What is a Venture Capital Term Sheet?",
      options: ["A non-binding document outlining the basic terms and conditions of an investment", "The final software contract with customers", "A list of technical terms used by programmers", "The IRS tax filing document for startups"],
      answer: 0,
      explanation: "A term sheet defines valuation, investment amount, voting rights, and liquidation preferences before formal legal closing."
    },
    {
      question: "What does 'Product-Market Fit' signify?",
      options: ["Being in a good market with a product that can satisfy that market", "Having finished all software features on the roadmap", "Winning a startup pitch contest", "Hiring 100 sales representatives"],
      answer: 0,
      explanation: "Marc Andreessen defined product-market fit as being in a good market with a product that can satisfy that market."
    }
  ],
  10: [
    {
      question: "What does an Eigenvector represent in linear transformation geometry?",
      options: ["A vector whose direction does not change, only scaled by its eigenvalue", "A vector with length always equal to 1", "A vector that points perpendicular to the origin", "A vector of all zeros"],
      answer: 0,
      explanation: "An eigenvector of a square matrix satisfies Av = λv, meaning transformation by A only scales the vector by scalar λ without rotating it."
    },
    {
      question: "What is the Jacobian matrix in multivariable vector calculus?",
      options: ["A matrix of all first-order partial derivatives of a vector-valued function", "A diagonal matrix of eigenvalues", "The inverse of a covariance matrix", "A matrix of second-order derivatives"],
      answer: 0,
      explanation: "The Jacobian is the matrix of first-order partial derivatives representing the best linear approximation of a vector function."
    },
    {
      question: "What does Singular Value Decomposition (SVD) achieve for any m x n matrix?",
      options: ["Factorizes the matrix into U Σ V^T (orthogonal and diagonal matrices)", "Solves differential equations numerically", "Converts a matrix into binary code", "Inverts non-invertible matrices without error"],
      answer: 0,
      explanation: "SVD factorizes any real matrix into orthogonal matrices U and V and a diagonal matrix Σ of singular values."
    },
    {
      question: "What is Kullback-Leibler (KL) Divergence used for in machine learning?",
      options: ["Measuring how one probability distribution differs from a reference distribution", "Calculating matrix inversion speed", "Multiplying two complex polynomials", "Sorting multidimensional tensors"],
      answer: 0,
      explanation: "KL Divergence quantifies relative entropy or the statistical distance between two probability distributions P and Q."
    },
    {
      question: "What is the geometric interpretation of the gradient vector ∇f(x)?",
      options: ["Points in the direction of steepest ascent of the function", "Points in the direction of steepest descent", "Is always zero on continuous surfaces", "Represents the area under the curve"],
      answer: 0,
      explanation: "The gradient ∇f points in the direction of greatest rate of increase of the scalar field f."
    }
  ]
};
