import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAllCourses, 
  getEnrolledCourseIds, 
  enrollInCourse, 
  getCourseProgress, 
  getCompletedLessons, 
  toggleCompletedLesson, 
  getQuizResults, 
  saveQuizResult, 
  getAssignments, 
  submitAssignment, 
  addCustomCourse, 
  deleteCustomCourse,
  initializeStorage 
} from '../utils/storage';
import { soundEngine } from '../utils/sound';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [progress, setProgress] = useState({});
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizResults, setQuizResults] = useState({});
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    initializeStorage();
    refreshData();
  }, []);

  const refreshData = () => {
    setCourses(getAllCourses());
    setEnrolledIds(getEnrolledCourseIds());
    setProgress(getCourseProgress());
    setCompletedLessons(getCompletedLessons());
    setQuizResults(getQuizResults());
    setAssignments(getAssignments());
  };

  const enroll = (courseId) => {
    soundEngine.playSuccess();
    const success = enrollInCourse(courseId);
    if (success) {
      setEnrolledIds(getEnrolledCourseIds());
      setProgress(getCourseProgress());
    }
    return success;
  };

  const isEnrolled = (courseId) => {
    return enrolledIds.includes(Number(courseId));
  };

  const getCourseById = (id) => {
    return courses.find(c => Number(c.id) === Number(id));
  };

  const markLessonComplete = (lessonId, courseId, totalLessons) => {
    soundEngine.playClick(900);
    const updated = toggleCompletedLesson(lessonId, courseId, totalLessons);
    setCompletedLessons([...updated]);
    setProgress(getCourseProgress());
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const recordQuiz = (courseId, score, total) => {
    soundEngine.playSuccess();
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 60;
    const resultObj = { score, total, percentage, passed };
    saveQuizResult(courseId, resultObj);
    setQuizResults(getQuizResults());
    return resultObj;
  };

  const submitAssign = (assignmentId, text) => {
    soundEngine.playClick(750);
    const updated = submitAssignment(assignmentId, text);
    setAssignments([...updated]);
    return true;
  };

  const createCourse = (newCourseData) => {
    soundEngine.playSuccess();
    const created = addCustomCourse(newCourseData);
    setCourses(getAllCourses());
    return created;
  };

  const removeCourse = (courseId) => {
    soundEngine.playClick(400);
    deleteCustomCourse(courseId);
    setCourses(getAllCourses());
  };

  return (
    <CourseContext.Provider value={{
      courses,
      enrolledIds,
      enrolledCourses: courses.filter(c => enrolledIds.includes(Number(c.id))),
      progress,
      completedLessons,
      quizResults,
      assignments,
      enroll,
      isEnrolled,
      getCourseById,
      markLessonComplete,
      isLessonCompleted,
      recordQuiz,
      submitAssign,
      createCourse,
      removeCourse,
      refreshData
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
