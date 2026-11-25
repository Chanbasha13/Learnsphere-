# 🎓 LearnSphere – Interactive 3D University Learning Management System

**LearnSphere** is a modern, interactive Learning Management System (LMS) designed to bring university learning activities into one unified digital platform. It combines course discovery, online learning, assessments, academic progress tracking, and role-based dashboards with an immersive 3D university campus experience.

The platform aims to provide students, instructors, and administrators with an organized, accessible, and engaging digital learning environment.

---

## 🌟 Project Overview

Traditional learning management systems often provide separate experiences for course management, student activities, assessments, and academic tracking.

LearnSphere addresses this by integrating these activities into a single platform with an interactive university environment.

Users can explore the digital campus, discover courses, enroll in learning programs, attend lessons, complete quizzes and assignments, and monitor their academic progress.

---

## 🎯 Project Objectives

- Develop a centralized platform for university learning activities.
- Provide separate functionalities for students, instructors, and administrators.
- Create an interactive 3D university campus experience.
- Implement user authentication using browser Local Storage.
- Provide course enrollment and online learning functionality.
- Enable quizzes, assignments, and academic progress tracking.
- Develop responsive and user-friendly interfaces.
- Demonstrate practical implementation of modern frontend technologies.

---

## 🚀 Key Features

### 1. Interactive 3D University Campus
- Interactive 3D campus environment.
- Explore different university buildings and departments.
- Rotate, zoom, and navigate the campus.
- Interactive building selection.
- Campus directory and navigation options.

### 2. Student Module
- Student registration and login.
- Personalized student dashboard.
- Browse available courses.
- Enroll in courses.
- Access learning materials and lessons.
- Attempt online quizzes.
- Submit assignments.
- Track learning progress.
- View certificates.
- Manage personal profile.

### 3. Instructor Module
- Instructor dashboard.
- Create and manage courses.
- Organize course content.
- Manage learning modules and lessons.
- Monitor student learning activities.
- Review academic performance.

### 4. Administrator Module
- Administrative dashboard.
- Manage platform activities.
- Access administrative features.
- Monitor users and courses.

### 5. Authentication and Data Management
- Login and signup functionality.
- Role-based user experiences.
- Local Storage-based data persistence.
- Session management.
- Form validation.
- Logout functionality.

### 6. Learning and Assessment
- Online learning interface.
- Interactive quizzes.
- Assignment management.
- Course completion tracking.
- Academic progress visualization.
- Certificate generation.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Application functionality |
| React.js | Component-based frontend development |
| Vite | Development server and build tool |
| React Router DOM | Client-side navigation |
| Three.js | Interactive 3D campus visualization |
| Context API | Shared application state |
| Local Storage | Browser-based data persistence |
| CSS Grid | Structured page layouts |
| Flexbox | Flexible and responsive layouts |

---

## 🏗️ System Architecture

LearnSphere is organized into three role-based areas:

**1. Student / User Module**
- Authentication
- Course discovery
- Course enrollment
- Online learning
- Quizzes and assignments
- Progress tracking
- Certificates
- Profile management

**2. Instructor Module**
- Instructor dashboard
- Course creation
- Course management
- Learning content organization
- Student performance monitoring

**3. Administrator Module**
- Administrative dashboard
- User and course management
- Platform administration

---

## 📁 Project Structure

```text
LearnSphere/
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   │
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── Sidebar.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   ├── CourseContext.jsx
│       │   └── ThemeContext.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Courses.jsx
│       │   ├── CourseDetails.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── StudentDashboard.jsx
│       │   ├── InstructorDashboard.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── Learning.jsx
│       │   ├── Quiz.jsx
│       │   ├── Assignments.jsx
│       │   ├── Progress.jsx
│       │   ├── Certificates.jsx
│       │   └── Profile.jsx
│       │
│       ├── scenes/
│       │   └── Campus3DScene.jsx
│       │
│       ├── data/
│       │   ├── coursesData.js
│       │   └── departmentsData.js
│       │
│       ├── utils/
│       │   └── storage.js
│       │
│       ├── styles/
│       │   ├── index.css
│       │   ├── dashboard.css
│       │   └── campus3d.css
│       │
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

*Note: This is a representative structure. Adjust folder names and files to match your actual repository.*

---

## ⚙️ Installation and Setup

### Prerequisites
- Node.js
- npm
- Visual Studio Code or another code editor
- Modern web browser

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to the Frontend

```bash
cd LearnSphere-main/learnsphere
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start Development Server

```bash
npm run dev
```

### Step 5: Open in Browser

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

### Step 6: Production Build

```bash
npm run build
```

---

## 💾 Data Management

LearnSphere uses browser Local Storage for client-side data persistence.

Application data includes:

- User information
- Current user session
- Enrolled courses
- Course progress
- Completed lessons
- Quiz results
- Assignment records
- Achievements
- Custom courses
- Theme preferences

The application uses reusable storage utilities to save, retrieve, and manage data.

**Note:** Local Storage is suitable for demonstrating frontend persistence, but it is not a replacement for secure server-side authentication or a production database.

---

## 🎨 User Interface and Design

The platform focuses on providing:

- Responsive page layouts.
- Reusable React components.
- CSS Grid and Flexbox layouts.
- Consistent navigation.
- Interactive dashboards.
- Light and dark themes.
- An immersive 3D campus experience.
- User-friendly forms and interfaces.

---

## 📚 Frontend Development Concepts Demonstrated

This project demonstrates practical application of:

1. HTML structure and semantic elements.
2. CSS styling and responsive design.
3. JavaScript functions and DOM interaction.
4. CSS Grid and Flexbox.
5. React components and props.
6. React Hooks and Context API.
7. Client-side routing.
8. Form validation.
9. Browser Local Storage.
10. Role-based interface management.
11. Three.js 3D visualization.
12. Modular and reusable frontend architecture.

---

## 🔮 Future Enhancements

- Backend API integration.
- Database integration.
- Secure server-side authentication.
- Real-time notifications.
- Live instructor-student interaction.
- Advanced learning analytics.
- Enhanced 3D campus navigation.
- Mobile application support.
- AI-powered learning recommendations.

---

## 🎓 Academic Project Information

**Project Name:** LearnSphere – Interactive 3D University Learning Management System

**Project Category:** Frontend Web Development

**Project Type:** Educational Web Application

**Primary Focus:** React.js, JavaScript, HTML, CSS, Responsive UI Design, Local Storage, and Three.js.

**Purpose:** To demonstrate the practical implementation of frontend development concepts through a university-focused Learning Management System.

---

## 👨‍💻 Conclusion

LearnSphere demonstrates how modern frontend technologies can be combined to develop an interactive and centralized digital learning environment.

By integrating course management, student activities, assessments, academic tracking, and 3D campus visualization, the project provides a practical demonstration of frontend engineering concepts and their application in educational technology.

**LearnSphere – Explore. Learn. Achieve.**
