// AnimatedCursor.jsx
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export const AnimatedCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Don't render anything on touch devices
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouchDevice) return; // bail early, no cursor needed

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;

    document.body.style.cursor = 'none';

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onDown = (e) => {
      animate(ring, {
        scale: [1, 0.6],
        opacity: [0.8, 0],
        duration: 400,
        ease: 'outExpo',
        onComplete: () => {
          ring.style.opacity = '1';
          animate(ring, { scale: 1, duration: 300, ease: 'outBack' });
        },
      });

      const count = 8;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
          position: fixed;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #60a5fa;
          top: ${e.clientY - 3}px;
          left: ${e.clientX - 3}px;
          pointer-events: none;
          z-index: 9999;
        `;
        document.body.appendChild(p);

        const angle = (i / count) * Math.PI * 2;
        const dist = 30 + Math.random() * 30;

        animate(p, {
          translateX: Math.cos(angle) * dist,
          translateY: Math.sin(angle) * dist,
          opacity: [1, 0],
          scale: [1, 0],
          duration: 500 + Math.random() * 200,
          ease: 'outExpo',
          onComplete: () => p.remove(),
        });
      }
    };

    const onEnterLink = () => {
      animate(ring, { scale: 2.2, opacity: 0.4, duration: 300, ease: 'outBack' });
      animate(dot, { scale: 0, duration: 200, ease: 'outQuart' });
    };
    const onLeaveLink = () => {
      animate(ring, { scale: 1, opacity: 1, duration: 300, ease: 'outBack' });
      animate(dot, { scale: 1, duration: 200, ease: 'outBack' });
    };

    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, [isTouchDevice]);

  // Render nothing on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#60a5fa',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1.5px solid #60a5fa',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          opacity: 1,
        }}
      />
    </>
  );
};