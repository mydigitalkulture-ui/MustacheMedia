import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 208;
const FRAME_PREFIX = '/anime/ezgif-frame-';
const PRELOAD_AHEAD = 4;

function pad(n) {
  return String(n).padStart(3, '0');
}

const ScrollFrameBackground = ({ startSelector = '#who-we-work-with', endSelector = '#contact' }) => {
  const canvasRef = useRef(null);
  const framesRef = useRef(new Map());
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const startYRef = useRef(0);
  const endYRef = useRef(0);

  const getFrameSrc = useCallback((index) => `${FRAME_PREFIX}${pad(index + 1)}.jpg`, []);

  const ensureFrame = useCallback(
    (index, drawWhenLoaded = false) => {
      const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      const cached = framesRef.current.get(safeIndex);
      if (cached) {
        if (drawWhenLoaded && cached.complete) {
          const canvas = canvasRef.current;
          if (!canvas) return cached;
          const ctx = canvas.getContext('2d');
          if (!ctx) return cached;
          const scale = Math.max(canvas.width / cached.naturalWidth, canvas.height / cached.naturalHeight);
          const w = cached.naturalWidth * scale;
          const h = cached.naturalHeight * scale;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(cached, x, y, w, h);
        }
        return cached;
      }

      const img = new Image();
      img.decoding = 'async';
      img.src = getFrameSrc(safeIndex);
      if (drawWhenLoaded) {
        img.onload = () => {
          if (safeIndex === currentFrameRef.current) {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
            const w = img.naturalWidth * scale;
            const h = img.naturalHeight * scale;
            const x = (canvas.width - w) / 2;
            const y = (canvas.height - h) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, w, h);
          }
        };
      }

      framesRef.current.set(safeIndex, img);
      return img;
    },
    [getFrameSrc]
  );

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = ensureFrame(index, true);
    if (!img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  }, [ensureFrame]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  const updateBounds = useCallback(() => {
    const startEl = document.querySelector(startSelector);
    const endEl = document.querySelector(endSelector);
    if (startEl) startYRef.current = startEl.getBoundingClientRect().top + window.scrollY;
    if (endEl) endYRef.current = endEl.getBoundingClientRect().bottom + window.scrollY;
  }, [startSelector, endSelector]);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const start = startYRef.current;
    const end = endYRef.current;

    if (end <= start) return;

    if (scrollY < start || scrollY > end) return;

    const progress = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      for (let i = 1; i <= PRELOAD_AHEAD; i++) {
        ensureFrame(frameIndex + i);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  }, [drawFrame, ensureFrame]);

  useEffect(() => {
    ensureFrame(0, true);
    for (let i = 1; i <= PRELOAD_AHEAD; i++) {
      ensureFrame(i);
    }

    resize();
    updateBounds();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('resize', updateBounds);

    drawFrame(0);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', updateBounds);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      framesRef.current.clear();
    };
  }, [onScroll, resize, updateBounds, drawFrame, ensureFrame]);

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
