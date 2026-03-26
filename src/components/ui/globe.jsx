import React, { useRef, useEffect } from 'react';

const Globe = ({ size = 400, color = '#12D8FA', dotColor = '#12D8FA', bgColor = 'transparent' }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.42;

    // Generate globe points as lat/lng grid
    const points = [];
    const latStep = 12;
    const lngStep = 12;

    for (let lat = -90; lat <= 90; lat += latStep) {
      for (let lng = -180; lng < 180; lng += lngStep) {
        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180;
        points.push({ lat: latRad, lng: lngRad });
      }
    }

    // Some arcs for connections
    const arcs = [
      { from: { lat: 0.65, lng: -1.3 }, to: { lat: 0.9, lng: 2.4 } },    // US to Asia
      { from: { lat: 0.9, lng: 0.35 }, to: { lat: 0.1, lng: 2.1 } },      // Europe to SE Asia
      { from: { lat: -0.35, lng: -0.8 }, to: { lat: 0.65, lng: -1.3 } },  // SA to US
      { from: { lat: 0.9, lng: 0.35 }, to: { lat: 0.65, lng: -1.3 } },    // Europe to US
      { from: { lat: 0.1, lng: 2.1 }, to: { lat: -0.6, lng: 2.6 } },      // SE Asia to AU
    ];

    function project3D(lat, lng, rotation) {
      const x = Math.cos(lat) * Math.sin(lng + rotation);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lng + rotation);
      return { x, y, z };
    }

    function toScreen(pt) {
      return {
        sx: cx + pt.x * radius,
        sy: cy - pt.y * radius,
        z: pt.z
      };
    }

    function drawArc(ctx, from, to, rotation, alpha) {
      const steps = 40;
      const pts = [];

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = from.lat + (to.lat - from.lat) * t;
        const lng = from.lng + (to.lng - from.lng) * t;
        const pt = project3D(lat, lng, rotation);
        const screen = toScreen(pt);
        const lift = Math.sin(t * Math.PI) * 0.3; // arc lift
        pts.push({ ...screen, z: pt.z + lift });
      }

      const visible = pts.filter(p => p.z > 0);
      if (visible.length < 2) return;

      ctx.beginPath();
      let started = false;
      for (let i = 0; i < pts.length; i++) {
        if (pts[i].z < -0.1) { started = false; continue; }
        if (!started) { ctx.moveTo(pts[i].sx, pts[i].sy); started = true; }
        else ctx.lineTo(pts[i].sx, pts[i].sy);
      }

      const grad = ctx.createLinearGradient(pts[0].sx, pts[0].sy, pts[pts.length - 1].sx, pts[pts.length - 1].sy);
      grad.addColorStop(0, `rgba(18, 216, 250, 0)`);
      grad.addColorStop(0.4, `rgba(18, 216, 250, ${alpha * 0.8})`);
      grad.addColorStop(0.6, `rgba(166, 255, 203, ${alpha * 0.8})`);
      grad.addColorStop(1, `rgba(166, 255, 203, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    const draw = (rotation) => {
      ctx.clearRect(0, 0, size, size);

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.3);
      glow.addColorStop(0, 'rgba(18, 216, 250, 0.18)');
      glow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Globe circle boundary
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(18, 216, 250, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw dots
      for (const p of points) {
        const pt = project3D(p.lat, p.lng, rotation);
        const s = toScreen(pt);
        if (pt.z < 0) continue; // back face

        const brightness = 0.5 + 0.5 * pt.z;
        const r2 = pt.z > 0.5 ? 2 : 1.2;

        ctx.beginPath();
        ctx.arc(s.sx, s.sy, r2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(18, 216, 250, ${brightness})`;
        ctx.fill();
      }

      // Draw arcs
      for (const arc of arcs) {
        drawArc(ctx, arc.from, arc.to, rotation, 1.0);
        // Animated pulse dot on arc
        const t = ((Date.now() / 2000) % 1);
        const lat = arc.from.lat + (arc.to.lat - arc.from.lat) * t;
        const lng = arc.from.lng + (arc.to.lng - arc.from.lng) * t;
        const pt = project3D(lat, lng, rotation);
        if (pt.z > 0) {
          const s = toScreen(pt);
          ctx.beginPath();
          ctx.arc(s.sx, s.sy, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(166, 255, 203, 0.9)';
          ctx.fill();
        }
      }

      // Overlay radial fade for depth
      const fade = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius);
      fade.addColorStop(0, 'transparent');
      fade.addColorStop(1, 'rgba(7, 13, 31, 0.2)');
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = fade;
      ctx.fill();
    };

    let lastTime = 0;
    const animate = (time) => {
      if (time - lastTime > 16) {
        rotationRef.current += 0.003;
        draw(rotationRef.current);
        lastTime = time;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
    />
  );
};

export default Globe;
