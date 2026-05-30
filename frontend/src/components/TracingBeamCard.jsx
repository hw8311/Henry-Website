import React, { useRef, useState, useCallback } from 'react';

const TracingBeamCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [beam, setBeam] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setBeam({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setBeam((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Radial glow that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
        style={{ opacity: beam.opacity }}
      >
        <div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            left: beam.x - 150,
            top: beam.y - 150,
            background: 'radial-gradient(circle, rgba(184,115,51,0.14) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Border beam - top edge */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px z-20 transition-opacity duration-300"
        style={{ opacity: beam.opacity }}
      >
        <div
          className="absolute h-full w-[120px] transition-all duration-100 ease-out"
          style={{
            left: Math.max(0, beam.x - 60),
            background: 'linear-gradient(90deg, transparent, #B87333, transparent)',
          }}
        />
      </div>

      {/* Border beam - bottom edge */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px z-20 transition-opacity duration-300"
        style={{ opacity: beam.opacity }}
      >
        <div
          className="absolute h-full w-[120px] transition-all duration-100 ease-out"
          style={{
            left: Math.max(0, beam.x - 60),
            background: 'linear-gradient(90deg, transparent, #E8B488, transparent)',
          }}
        />
      </div>

      {/* Border beam - left edge */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-px z-20 transition-opacity duration-300"
        style={{ opacity: beam.opacity }}
      >
        <div
          className="absolute w-full h-[120px] transition-all duration-100 ease-out"
          style={{
            top: Math.max(0, beam.y - 60),
            background: 'linear-gradient(180deg, transparent, #B87333, transparent)',
          }}
        />
      </div>

      {/* Border beam - right edge */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 right-0 w-px z-20 transition-opacity duration-300"
        style={{ opacity: beam.opacity }}
      >
        <div
          className="absolute w-full h-[120px] transition-all duration-100 ease-out"
          style={{
            top: Math.max(0, beam.y - 60),
            background: 'linear-gradient(180deg, transparent, #E8B488, transparent)',
          }}
        />
      </div>

      {/* Card content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
};

export default TracingBeamCard;
