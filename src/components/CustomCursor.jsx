import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = e => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const onOver = e => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.cube') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')
      ) {
        setHovering(true);
      }
    };

    const onOut = e => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.cube') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')
      ) {
        setHovering(false);
      }
    };

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999 }}>
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(255, 1, 1, 1)',
          transition: 'transform 0s, opacity 0.2s',
          opacity: hovering ? 0 : 1
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `2px solid rgba(255, 1, 1, 1)`,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s',
          transform: 'translate(-100px, -100px)',
          opacity: hovering ? 1 : 0.5,
          ...(hovering
            ? {
              width: 56,
              height: 56,
              marginLeft: -8,
              marginTop: -8,
              borderColor: 'rgba(255, 1, 1, 1)',
              background: 'rgba(248, 7, 7, 1)'
            }
            : {})
        }}
      />
    </div>
  );
};

export default CustomCursor;
