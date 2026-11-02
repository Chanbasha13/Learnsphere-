import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { 
  Compass, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Grid3X3, 
  Box, 
  ArrowRight, 
  X, 
  Sparkles,
  BookOpen,
  Users,
  Award,
  Layers
} from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';
import { soundEngine } from '../utils/sound';

export default function Campus3DScene() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Camera Orbit & Zoom State
  const [rotX, setRotX] = useState(58); // Default tilt
  const [rotZ, setRotZ] = useState(0);  // Yaw rotation
  const [zoom, setZoom] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);
  const [is2DMode, setIs2DMode] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 58, rotZ: 0 });

  // Ambient Three.js Starfield / Grid Background
  useEffect(() => {
    if (!canvasRef.current || is2DMode) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 400;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      return; // WebGL unavailable fallback
    }

    // Starfield particles
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1200;
      positions[i + 1] = (Math.random() - 0.5) * 800;
      positions[i + 2] = (Math.random() - 0.5) * 600;

      // Cyan to soft blue-white colors
      colors[i] = 0.3 + Math.random() * 0.4;
      colors[i + 1] = 0.7 + Math.random() * 0.3;
      colors[i + 2] = 0.9 + Math.random() * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationFrameId;
    const animate = () => {
      particles.rotation.y += 0.0004;
      particles.rotation.x += 0.0002;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!canvas || !renderer) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [is2DMode]);

  // Mouse drag handlers for 3D Camera Orbit
  const handleMouseDown = (e) => {
    if (is2DMode) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX,
      rotZ
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || is2DMode) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Constrain pitch between 30 and 80 degrees
    const nextRotX = Math.max(25, Math.min(78, dragStartRef.current.rotX - deltaY * 0.25));
    const nextRotZ = dragStartRef.current.rotZ + deltaX * 0.3;

    setRotX(nextRotX);
    setRotZ(nextRotZ);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Preset camera views
  const setPresetView = (type) => {
    soundEngine.playClick(650);
    if (type === 'overview') {
      setRotX(58);
      setRotZ(0);
      setZoom(1);
    } else if (type === 'topdown') {
      setRotX(78);
      setRotZ(0);
      setZoom(0.9);
    } else if (type === 'lowangle') {
      setRotX(35);
      setRotZ(45);
      setZoom(1.15);
    }
  };

  const toggleSound = () => {
    const active = soundEngine.toggleAmbient(!isAudioActive);
    setIsAudioActive(active);
  };

  const handleSelectDepartment = (dept) => {
    soundEngine.playBuildingFocus(500);
    setSelectedDept(dept);
    // Orient camera smoothly toward building angle
    setRotZ(-dept.coordinates.rotY);
    setZoom(1.15);
  };

  return (
    <section className="campus-hero-section">
      {/* Background Starfield / Grid */}
      {!is2DMode && <canvas ref={canvasRef} className="campus-starfield-canvas" />}

      {/* Campus Hero Header */}
      <div className="campus-hud-header">
        <div className="campus-title-pill">
          <Sparkles size={14} /> Virtual University Campus 3.0
        </div>
        <h1 className="campus-hero-heading">
          Explore the LearnSphere Learning Universe
        </h1>
        <p className="campus-hero-sub">
          Step into our interactive 3D digital campus. Select an architectural department building to explore accredited curricula, research faculties, and dynamic classrooms.
        </p>
      </div>

      {/* 3D Stage / 2D Blueprint Alternative */}
      {!is2DMode ? (
        <div 
          className="stage-3d-viewport"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div 
            className="plaza-world-3d"
            style={{
              transform: `scale(${zoom}) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`
            }}
          >
            {/* Ground Disc & Concentric Circuit Rings */}
            <div className="plaza-ground-disc">
              <div className="plaza-ring plaza-ring-1"></div>
              <div className="plaza-ring plaza-ring-2"></div>
              <div className="plaza-ring plaza-ring-3"></div>
            </div>

            {/* Central Holographic Plaza Monument */}
            <div className="plaza-monument-core">
              <div className="monument-ring"></div>
              <div className="monument-beacon"></div>
            </div>

            {/* 6 Architectural Department Buildings */}
            {DEPARTMENTS.map((dept) => {
              const { x, z } = dept.coordinates;
              const isSelected = selectedDept?.id === dept.id;

              return (
                <div
                  key={dept.id}
                  className={`building-node-3d ${isSelected ? 'active-selected' : ''}`}
                  style={{
                    transform: `translate3d(${x}px, ${z}px, 0px)`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectDepartment(dept);
                  }}
                >
                  {/* Contact Shadow on Floor */}
                  <div className="building-ground-shadow"></div>

                  {/* 3D Extruded Tower Geometry */}
                  <div className="building-block-mesh">
                    {/* Front Face */}
                    <div 
                      className="bface"
                      style={{
                        width: '90px',
                        height: `${dept.pillarHeight}px`,
                        transform: `translateZ(45px) rotateX(90deg)`,
                        transformOrigin: 'bottom',
                        borderColor: dept.accentColor
                      }}
                    >
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                    </div>

                    {/* Back Face */}
                    <div 
                      className="bface"
                      style={{
                        width: '90px',
                        height: `${dept.pillarHeight}px`,
                        transform: `translateZ(-45px) rotateY(180deg) rotateX(90deg)`,
                        transformOrigin: 'bottom',
                        borderColor: dept.accentColor
                      }}
                    >
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                    </div>

                    {/* Left Face */}
                    <div 
                      className="bface"
                      style={{
                        width: '90px',
                        height: `${dept.pillarHeight}px`,
                        transform: `rotateY(-90deg) translateZ(45px) rotateX(90deg)`,
                        transformOrigin: 'bottom',
                        borderColor: dept.accentColor
                      }}
                    >
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                    </div>

                    {/* Right Face */}
                    <div 
                      className="bface"
                      style={{
                        width: '90px',
                        height: `${dept.pillarHeight}px`,
                        transform: `rotateY(90deg) translateZ(45px) rotateX(90deg)`,
                        transformOrigin: 'bottom',
                        borderColor: dept.accentColor
                      }}
                    >
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                      <div className="window-strip" style={{ background: dept.accentColor }}></div>
                    </div>

                    {/* Roof Slab with Spire */}
                    <div 
                      className="bface bface-roof"
                      style={{
                        transform: `translateZ(${dept.pillarHeight}px)`,
                        borderColor: dept.accentColor,
                        boxShadow: `0 0 20px ${dept.accentGlow}`
                      }}
                    >
                      <div className="roof-spire" style={{ background: dept.accentColor, boxShadow: `0 0 16px ${dept.accentColor}` }}></div>
                    </div>
                  </div>

                  {/* Floating Holographic Label Pin */}
                  <div 
                    className="building-hologram-pin"
                    style={{
                      transform: `translate3d(0, 0, ${dept.pillarHeight + 30}px) rotateZ(${-rotZ}deg) rotateX(${-rotX}deg)`
                    }}
                  >
                    <div className="pin-badge" style={{ borderColor: dept.accentColor }}>
                      <span style={{ color: dept.accentColor }}>●</span> {dept.name}
                    </div>
                    <span className="pin-landmark">{dept.landmark}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 2D Blueprint Grid View Fallback */
        <div className="blueprint-grid-view">
          {DEPARTMENTS.map(dept => (
            <div 
              key={dept.id} 
              className="blueprint-card"
              onClick={() => handleSelectDepartment(dept)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="badge badge-cyan">{dept.code}</span>
                <span style={{ color: dept.accentColor, fontWeight: 700 }}>● Active Node</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{dept.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                {dept.landmark}
              </p>
              <p style={{ fontSize: '0.9rem', marginBottom: '14px' }}>{dept.tagline}</p>
              <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                Inspect Department <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Campus Controls HUD Toolbar */}
      <div className="campus-controls-hud">
        <button 
          className="hud-btn" 
          onClick={() => setPresetView('overview')}
          title="Reset Camera to Overhead Orbit"
        >
          <RotateCcw size={14} /> Orbit View
        </button>
        <button 
          className="hud-btn" 
          onClick={() => setPresetView('topdown')}
          title="Top-Down Plan View"
        >
          <Compass size={14} /> Aerial View
        </button>
        <button 
          className="hud-btn" 
          onClick={() => setZoom(prev => Math.min(prev + 0.15, 1.6))}
          title="Zoom In"
        >
          <ZoomIn size={14} />
        </button>
        <button 
          className="hud-btn" 
          onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.7))}
          title="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>
        <button 
          className={`hud-btn ${isAudioActive ? 'active' : ''}`}
          onClick={toggleSound}
          title="Toggle Campus Ambiance Synthesizer"
        >
          {isAudioActive ? <Volume2 size={14} /> : <VolumeX size={14} />} 
          {isAudioActive ? 'Sound On' : 'Mute'}
        </button>
        <button 
          className={`hud-btn ${is2DMode ? 'active' : ''}`}
          onClick={() => setIs2DMode(prev => !prev)}
          title="Toggle 2D Blueprint Grid View"
        >
          {is2DMode ? <Box size={14} /> : <Grid3X3 size={14} />}
          {is2DMode ? '3D Campus' : '2D Blueprint'}
        </button>
      </div>

      {/* Department Inspection Holographic Modal */}
      {selectedDept && (
        <div className="dept-modal-backdrop" onClick={() => setSelectedDept(null)}>
          <div className="dept-modal-card" onClick={e => e.stopPropagation()}>
            <div className="dept-modal-header" style={{ borderTop: `4px solid ${selectedDept.accentColor}` }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
                  {selectedDept.code} • {selectedDept.landmark}
                </span>
                <h2 style={{ fontSize: '1.6rem', marginTop: '4px' }}>{selectedDept.name}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Faculty Dean: {selectedDept.dean}
                </p>
              </div>
              <button 
                className="btn btn-outline btn-sm" 
                onClick={() => setSelectedDept(null)}
                style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="dept-modal-body">
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                {selectedDept.description}
              </p>

              {/* Department Statistics */}
              <div className="dept-stats-grid">
                <div className="dept-stat-box">
                  <div className="dept-stat-value" style={{ color: selectedDept.accentColor }}>
                    {selectedDept.stats.activeStudents}+
                  </div>
                  <div className="dept-stat-label">Active Scholars</div>
                </div>
                <div className="dept-stat-box">
                  <div className="dept-stat-value">{selectedDept.stats.coursesCount}</div>
                  <div className="dept-stat-label">Degree Programs</div>
                </div>
                <div className="dept-stat-box">
                  <div className="dept-stat-value">{selectedDept.stats.researchLabs}</div>
                  <div className="dept-stat-label">Research Labs</div>
                </div>
                <div className="dept-stat-box">
                  <div className="dept-stat-value" style={{ color: 'var(--accent-emerald)' }}>
                    {selectedDept.stats.placementRate}
                  </div>
                  <div className="dept-stat-label">Placement Rate</div>
                </div>
              </div>

              {/* Curriculum Topics */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  Core Research & Specializations
                </h4>
                <div className="dept-topics-list">
                  {selectedDept.topics.map((t, idx) => (
                    <span key={idx} className="dept-topic-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="dept-modal-footer">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedDept(null)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelectedDept(null);
                  navigate(`/courses?department=${selectedDept.id}`);
                }}
              >
                Explore Department Courses <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
