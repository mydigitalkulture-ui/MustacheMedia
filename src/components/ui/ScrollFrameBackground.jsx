import React, { useEffect, useRef, useCallback } from 'react';

// Preload frames eagerly on mount for smooth scrubbing
const TOTAL_FRAMES = 208;
const FRAME_PREFIX = '/anime/ezgif-frame-';

function pad(n) {
  return String(n).padStart(3, '0');
}

const ScrollFrameBackground = ({ startSelector = '#who-we-work-with', endSelector = '#contact' }) => {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const loadedRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const startYRef = useRef(0);
  const endYRef = useRef(0);

  // Draw a single frame to the canvas
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Cover-fit the image
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  }, []);

  // Resize canvas to match window
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Recompute section bounds
  const updateBounds = useCallback(() => {
    const startEl = document.querySelector(startSelector);
    const endEl = document.querySelector(endSelector);
    if (startEl) startYRef.current = startEl.getBoundingClientRect().top + window.scrollY;
    if (endEl) endYRef.current = endEl.getBoundingClientRect().bottom + window.scrollY;
  }, [startSelector, endSelector]);

  // Scroll handler: map scroll → frame index
  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const start = startYRef.current;
    const end = endYRef.current;

    // Only animate between start and end sections
    if (scrollY < start || scrollY > end) return;

    const progress = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  }, [drawFrame]);

  useEffect(() => {
    // Load all frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PREFIX}${pad(i)}.jpg`;
      img.onload = () => {
        loadedRef.current++;
        // Draw first frame once at least a few are ready
        if (loadedRef.current === 1) drawFrame(0);
      };
      framesRef.current[i - 1] = img;
    }

    resize();
    updateBounds();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    // Recompute bounds on resize (sections may shift)
    window.addEventListener('resize', updateBounds);

    // Draw initial frame
    drawFrame(0);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', updateBounds);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll, resize, updateBounds, drawFrame]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          opacity: 0.3,
          mixBlendMode: 'screen',
        }}
      />
      {/* Gradient overlay to blend with dark theme */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 8%, transparent 92%, var(--bg-primary) 100%)',
        }}
      />
    </div>
  );
};

export default ScrollFrameBackground;
