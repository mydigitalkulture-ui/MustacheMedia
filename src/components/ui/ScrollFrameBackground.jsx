import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const FRAMESET_FOLDER ='newanime';
const FRAME_PREFIX = `/${FRAMESET_FOLDER}/ezgif-frame-`;
const PRELOAD_AHEAD = 10;
const PRELOAD_BEHIND = 4;
const MAX_FALLBACK_DISTANCE = 20;
const FRAMESET_VERSION = import.meta.env.VITE_FRAMESET_VERSION || '2026-03-30-v2';
const SINGLE_IMAGE_MODE = import.meta.env.VITE_SCROLL_BG_SINGLE_IMAGE === 'true';
const STATIC_FRAME_INDEX = Number.parseInt(import.meta.env.VITE_SCROLL_BG_STATIC_FRAME || '0', 10);

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

  const drawImageToCanvas = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  }, []);

  const getFrameSrc = useCallback(
    (index) => `${FRAME_PREFIX}${pad(index + 1)}.jpg?v=${encodeURIComponent(FRAMESET_VERSION)}`,
    []
  );

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
      img.fetchPriority = safeIndex < 3 ? 'high' : 'low';
      img.src = getFrameSrc(safeIndex);
      if (drawWhenLoaded) {
        img.onload = () => {
          if (safeIndex === currentFrameRef.current) {
            drawImageToCanvas(img);
          }
        };
      }

      framesRef.current.set(safeIndex, img);
      return img;
    },
    [drawImageToCanvas, getFrameSrc]
  );

  const drawFrame = useCallback((index) => {
    const img = ensureFrame(index, true);
    if (!img || !img.complete) return;
    drawImageToCanvas(img);
  }, [drawImageToCanvas, ensureFrame]);

  const prefetchNearbyFrames = useCallback((index) => {
    for (let i = -PRELOAD_BEHIND; i <= PRELOAD_AHEAD; i++) {
      ensureFrame(index + i);
    }
  }, [ensureFrame]);

  const drawBestAvailableFrame = useCallback((index) => {
    const primary = ensureFrame(index, true);
    if (primary && primary.complete) {
      drawImageToCanvas(primary);
      return;
    }

    for (let offset = 1; offset <= MAX_FALLBACK_DISTANCE; offset++) {
      const before = framesRef.current.get(index - offset);
      if (before && before.complete) {
        drawImageToCanvas(before);
        return;
      }
      const after = framesRef.current.get(index + offset);
      if (after && after.complete) {
        drawImageToCanvas(after);
        return;
      }
    }
  }, [drawImageToCanvas, ensureFrame]);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      drawBestAvailableFrame(currentFrameRef.current);
    });
  }, [drawBestAvailableFrame]);

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
      prefetchNearbyFrames(frameIndex);
      scheduleDraw();
    }
  }, [prefetchNearbyFrames, scheduleDraw]);

  useEffect(() => {
    const staticFrame = Number.isFinite(STATIC_FRAME_INDEX)
      ? Math.max(0, Math.min(TOTAL_FRAMES - 1, STATIC_FRAME_INDEX))
      : 0;

    currentFrameRef.current = SINGLE_IMAGE_MODE ? staticFrame : 0;

    ensureFrame(currentFrameRef.current, true);
    if (!SINGLE_IMAGE_MODE) {
      prefetchNearbyFrames(currentFrameRef.current);
    }

    resize();
    if (!SINGLE_IMAGE_MODE) {
      updateBounds();
    }

    window.addEventListener('resize', resize);
    if (!SINGLE_IMAGE_MODE) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', updateBounds);
    }

    drawFrame(currentFrameRef.current);

    let boundsRetryId;
    if (!SINGLE_IMAGE_MODE) {
      let tries = 0;
      const retryUntilSectionsReady = () => {
        updateBounds();
        onScroll();

        const hasValidBounds = endYRef.current > startYRef.current;
        if (!hasValidBounds && tries < 24) {
          tries += 1;
          boundsRetryId = window.setTimeout(retryUntilSectionsReady, 120);
        }
      };

      retryUntilSectionsReady();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (!SINGLE_IMAGE_MODE) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', updateBounds);
      }
      if (typeof boundsRetryId === 'number') {
        window.clearTimeout(boundsRetryId);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      framesRef.current.clear();
    };
  }, [onScroll, resize, updateBounds, drawFrame, ensureFrame, prefetchNearbyFrames]);

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
