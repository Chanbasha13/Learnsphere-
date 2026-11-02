// LearnSphere - LocalStorage Academic Persistence Manager
import { coursesData } from '../data/coursesData';
import { assignmentsData } from '../data/assignmentsData';
import { ACHIEVEMENTS } from '../data/achievementsData';

const KEYS = {
  CURRENT_USER: 'learnSphere_currentUser',
  USERS_DB: 'learnSphere_registeredUsers',
  ENROLLED_COURSES: 'learnSphere_enrolledCourses',
  COURSE_PROGRESS: 'learnSphere_courseProgress',
  COMPLETED_LESSONS: 'learnSphere_completedLessons',
  QUIZ_RESULTS: 'learnSphere_quizResults',
  ASSIGNMENTS: 'learnSphere_assignments',
  ACHIEVEMENTS: 'learnSphere_achievements',
  CUSTOM_COURSES: 'learnSphere_customCourses',
  THEME: 'learnSphere_theme',
  CAMPUS_AUDIO: 'learnSphere_campusAudio'
};

// Default Demo Users across 3 distinct roles: Student, Instructor, Admin
const DEFAULT_USERS = [
  {
    id: 'user_student_demo',
    name: 'Alex Morgan',
    email: 'student@learnsphere.edu',
    password: 'password123',
    role: 'student',
    headline: 'Computer Science Undergraduate & Spatial Computing Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    department: 'Programming Academy',
    studentId: 'LS-2026-904',
    joinedDate: '2026-09-15',
    streak: 5,
    studyHours: 42.5
  },
  {
    id: 'user_instructor_demo',
    name: 'Dr. Sarah Johnson',
    email: 'instructor@learnsphere.edu',
    password: 'password123',
    role: 'instructor',
    headline: 'Principal Frontend Architect & Senior Lecturer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    department: 'Programming Academy',
    facultyId: 'FAC-7721',
    joinedDate: '2025-01-10',
    totalStudents: 1240,
    rating: 4.8
  },
  {
    id: 'user_admin_demo',
    name: 'Dean Eleanor Vance',
    email: 'admin@learnsphere.edu',
    password: 'password123',
    role: 'admin',
    headline: 'University Dean & Chief Academic Administrator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    department: 'University Senate',
    adminId: 'ADM-1001',
    joinedDate: '2024-08-01',
    permissions: ['all']
  }
];

// Initialize Storage with Demo Data if empty
export const initializeStorage = () => {
  try {
    // Seed Users
    const existingUsers = getStoredItem(KEYS.USERS_DB, null);
    if (!existingUsers) {
      localStorage.setItem(KEYS.USERS_DB, JSON.stringify(DEFAULT_USERS));
    } else {
      // Ensure default users exist if upgraded
      let updated = [...existingUsers];
      let changed = false;
      DEFAULT_USERS.forEach(defUser => {
        if (!updated.some(u => u.email.toLowerCase() === defUser.email.toLowerCase())) {
          updated.push(defUser);
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem(KEYS.USERS_DB, JSON.stringify(updated));
      }
    }

    // Default student user logged in if none present
    if (!localStorage.getItem(KEYS.CURRENT_USER)) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    }

    // Seed Enrolled Courses (Courses 1, 2, 4)
    if (!localStorage.getItem(KEYS.ENROLLED_COURSES)) {
      localStorage.setItem(KEYS.ENROLLED_COURSES, JSON.stringify([1, 2, 4]));
    }

    // Seed Course Progress
    if (!localStorage.getItem(KEYS.COURSE_PROGRESS)) {
      const initialProgress = {
        1: 65,  // Web Dev: 65%
        2: 30,  // Python: 30%
        4: 15   // DSA: 15%
      };
      localStorage.setItem(KEYS.COURSE_PROGRESS, JSON.stringify(initialProgress));
    }

    // Seed Completed Lessons
    if (!localStorage.getItem(KEYS.COMPLETED_LESSONS)) {
      localStorage.setItem(KEYS.COMPLETED_LESSONS, JSON.stringify(['1-1', '1-2', '1-3', '1-4', '2-1']));
    }

    // Seed Quiz Results
    if (!localStorage.getItem(KEYS.QUIZ_RESULTS)) {
      const initialQuizzes = {
        1: { score: 100, total: 5, passed: true, percentage: 100, date: '2026-11-01' },
        2: { score: 4, total: 5, passed: true, percentage: 80, date: '2026-10-28' }
      };
      localStorage.setItem(KEYS.QUIZ_RESULTS, JSON.stringify(initialQuizzes));
    }

    // Seed Assignments
    if (!localStorage.getItem(KEYS.ASSIGNMENTS)) {
      localStorage.setItem(KEYS.ASSIGNMENTS, JSON.stringify(assignmentsData));
    }

    // Seed Achievements
    if (!localStorage.getItem(KEYS.ACHIEVEMENTS)) {
      localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(ACHIEVEMENTS));
    }
  } catch (err) {
    console.error('Error initializing storage:', err);
  }
};

// Storage helper functions
export const getStoredItem = (key, fallback = null) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (err) {
    console.warn(`Failed to parse ${key}`, err);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to store ${key}`, err);
  }
};

// User Operations
export const getCurrentUser = () => getStoredItem(KEYS.CURRENT_USER, DEFAULT_USERS[0]);
export const setCurrentUser = (user) => setStoredItem(KEYS.CURRENT_USER, user);
export const removeCurrentUser = () => localStorage.removeItem(KEYS.CURRENT_USER);

export const getAllUsers = () => getStoredItem(KEYS.USERS_DB, DEFAULT_USERS);

export const saveUser = (user) => {
  const users = getAllUsers();
  const index = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (index !== -1) {
    users[index] = { ...users[index], ...user };
  } else {
    users.push(user);
  }
  setStoredItem(KEYS.USERS_DB, users);
  return user;
};

export const deleteUser = (userId) => {
  const users = getAllUsers();
  const updated = users.filter(u => u.id !== userId);
  setStoredItem(KEYS.USERS_DB, updated);
  return updated;
};

export const updateUserRole = (userId, newRole) => {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index].role = newRole;
    setStoredItem(KEYS.USERS_DB, users);
    // If updating currently logged in user, refresh current user too
    const current = getCurrentUser();
    if (current && current.id === userId) {
      current.role = newRole;
      setCurrentUser(current);
    }
  }
  return users;
};

// Course Operations
export const getEnrolledCourseIds = () => getStoredItem(KEYS.ENROLLED_COURSES, [1, 2, 4]);
export const enrollInCourse = (courseId) => {
  const enrolled = getEnrolledCourseIds();
  const id = Number(courseId);
  if (!enrolled.includes(id)) {
    const updated = [...enrolled, id];
    setStoredItem(KEYS.ENROLLED_COURSES, updated);
    // Initialize progress if not existing
    const progress = getCourseProgress();
    if (!progress[id]) {
      progress[id] = 5;
      setCourseProgress(progress);
    }
    return true;
  }
  return false;
};

export const getCourseProgress = () => getStoredItem(KEYS.COURSE_PROGRESS, { 1: 65, 2: 30, 4: 15 });
export const setCourseProgress = (progress) => setStoredItem(KEYS.COURSE_PROGRESS, progress);
export const updateCourseProgress = (courseId, percentage) => {
  const progress = getCourseProgress();
  progress[courseId] = Math.min(100, Math.max(0, percentage));
  setCourseProgress(progress);
};

export const getCompletedLessons = () => getStoredItem(KEYS.COMPLETED_LESSONS, ['1-1', '1-2', '1-3', '1-4', '2-1']);
export const toggleCompletedLesson = (lessonId, courseId, totalLessonsInCourse) => {
  const completed = getCompletedLessons();
  let updated;
  if (completed.includes(lessonId)) {
    updated = completed.filter(id => id !== lessonId);
  } else {
    updated = [...completed, lessonId];
  }
  setStoredItem(KEYS.COMPLETED_LESSONS, updated);

  // Recalculate course percentage
  if (courseId && totalLessonsInCourse > 0) {
    const countInCourse = updated.filter(id => String(id).startsWith(String(courseId) + '-')).length;
    const pct = Math.round((countInCourse / totalLessonsInCourse) * 100);
    updateCourseProgress(courseId, pct);
  }
  return updated;
};

// Quiz Operations
export const getQuizResults = () => getStoredItem(KEYS.QUIZ_RESULTS, {});
export const saveQuizResult = (courseId, result) => {
  const results = getQuizResults();
  results[courseId] = {
    ...result,
    date: new Date().toISOString().split('T')[0]
  };
  setStoredItem(KEYS.QUIZ_RESULTS, results);
  return results;
};

// Assignment Operations
export const getAssignments = () => getStoredItem(KEYS.ASSIGNMENTS, assignmentsData);
export const submitAssignment = (assignmentId, text) => {
  const list = getAssignments();
  const updated = list.map(a => {
    if (a.id === assignmentId) {
      return {
        ...a,
        status: 'Submitted',
        submissionText: text,
        submittedAt: new Date().toISOString()
      };
    }
    return a;
  });
  setStoredItem(KEYS.ASSIGNMENTS, updated);
  return updated;
};

// Custom Courses
export const getCustomCourses = () => getStoredItem(KEYS.CUSTOM_COURSES, []);
export const addCustomCourse = (course) => {
  const current = getCustomCourses();
  const newCourse = {
    ...course,
    id: Date.now(),
    rating: 5.0,
    reviewsCount: 0,
    enrolledCount: 1,
    createdAt: new Date().toISOString()
  };
  const updated = [newCourse, ...current];
  setStoredItem(KEYS.CUSTOM_COURSES, updated);
  return newCourse;
};

export const deleteCustomCourse = (courseId) => {
  const current = getCustomCourses();
  const updated = current.filter(c => c.id !== courseId);
  setStoredItem(KEYS.CUSTOM_COURSES, updated);
  return updated;
};

// All courses combined (static + custom)
export const getAllCourses = () => {
  const custom = getCustomCourses();
  return [...coursesData, ...custom];
};

export { KEYS, DEFAULT_USERS };
