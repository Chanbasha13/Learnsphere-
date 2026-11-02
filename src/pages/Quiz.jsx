import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import { quizData } from '../data/quizData';
import { soundEngine } from '../utils/sound';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, recordQuiz } = useCourses();

  const course = getCourseById(id);
  const questions = quizData[id] || quizData[1]; // fallback to quiz 1 if none

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Exam timer countdown
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, selectedAnswers]);

  if (!course) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Examination Not Found</h2>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Courses
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optIdx) => {
    soundEngine.playClick(800);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optIdx
    }));
  };

  const handleSubmitExam = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        score += 1;
      }
    });

    const res = recordQuiz(course.id, score, questions.length);
    setResult(res);
    setSubmitted(true);

    if (res.passed) {
      soundEngine.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const handleRetake = () => {
    soundEngine.playClick(600);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
    setResult(null);
    setTimeLeft(300);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - var(--navbar-height))', padding: '40px 20px 80px' }}>
      <div className="container">
        {/* Exam Navigation Header */}
        <div style={{ maxWidth: '760px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to={`/classroom/${course.id}`} className="btn btn-outline btn-sm">
            ← Return to Classroom
          </Link>
          <span className="badge badge-cyan">{course.title} Examination</span>
        </div>

        {!submitted ? (
          /* Active Examination Interface */
          <div className="quiz-card-container">
            {/* Header with question count and timer */}
            <div className="quiz-header-bar">
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {Object.keys(selectedAnswers).length} Answered
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: timeLeft < 60 ? 'rgba(244, 63, 94, 0.15)' : 'var(--bg-tertiary)',
                color: timeLeft < 60 ? 'var(--accent-rose)' : 'var(--text-primary)',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: 700,
                border: '1px solid var(--border-subtle)'
              }}>
                <Clock size={16} /> {formatTime(timeLeft)}
              </div>
            </div>

            {/* Question Navigation Palette */}
            <div className="quiz-progress-palette">
              {questions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurr = idx === currentIndex;

                return (
                  <button
                    key={idx}
                    className={`palette-dot ${isCurr ? 'current' : ''} ${isAnswered ? 'answered' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Question Text */}
            <h2 className="quiz-question-text">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="quiz-options-list">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;

                return (
                  <button
                    key={optIdx}
                    className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <span>{option}</span>
                    <span style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-medium)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      background: isSelected ? 'var(--accent-cyan)' : 'transparent',
                      color: isSelected ? '#07090e' : 'inherit'
                    }}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
              <button 
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="btn btn-outline btn-sm"
              >
                Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button 
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="btn btn-primary btn-sm"
                >
                  Next Question <ArrowRight size={14} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmitExam}
                  className="btn btn-primary btn-sm"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff' }}
                >
                  Submit Examination <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results & Pedagogical Review Card */
          <div className="quiz-card-container">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: result?.passed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                color: result?.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {result?.passed ? <Award size={36} /> : <XCircle size={36} />}
              </div>

              <span className={`badge ${result?.passed ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                {result?.passed ? 'Academic Certification Granted' : 'Retake Required (Threshold: 60%)'}
              </span>

              <h1 style={{ fontSize: '2.2rem', margin: '8px 0' }}>
                {result?.score} / {result?.total} Correct ({result?.percentage}%)
              </h1>

              <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
                {result?.passed 
                  ? 'Congratulations! You have demonstrated academic mastery of the curriculum standards.'
                  : 'You did not achieve the required 60% passing mark. Review the explanations below and re-attempt.'}
              </p>

              {/* Next Step Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
                <button onClick={handleRetake} className="btn btn-outline btn-sm">
                  <RotateCcw size={14} /> Retake Examination
                </button>
                {result?.passed && (
                  <Link to="/certificates" className="btn btn-primary btn-sm">
                    <Award size={14} /> View Official Degree Certificate
                  </Link>
                )}
              </div>
            </div>

            {/* Question Breakdown with Explanations */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '18px' }}>
                Pedagogical Examination Review
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {questions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.answer;

                  return (
                    <div 
                      key={idx}
                      style={{
                        padding: '18px',
                        background: 'var(--bg-tertiary)',
                        border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          Question {idx + 1}: {q.question}
                        </span>
                        {isCorrect ? (
                          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={14} /> Correct
                          </span>
                        ) : (
                          <span style={{ color: 'var(--accent-rose)', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <XCircle size={14} /> Incorrect
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                        <div><strong>Your Answer:</strong> {userAns !== undefined ? q.options[userAns] : 'Not Answered'}</div>
                        {!isCorrect && (
                          <div style={{ color: 'var(--accent-emerald)' }}>
                            <strong>Correct Answer:</strong> {q.options[q.answer]}
                          </div>
                        )}
                      </div>

                      <div style={{
                        padding: '10px 12px',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                      }}>
                        <strong style={{ color: 'var(--accent-cyan)' }}>Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
