import React, { useEffect, useRef } from 'react';

export default function CursorStar() {
  const starRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !supportsFinePointer) {
      return;
    }

    const star = starRef.current;
    if (!star) return;

    document.body.classList.add('pointer-enabled');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let starX = mouseX;
    let starY = mouseY;
    let lastSparkAt = 0;
    let isMounted = true;
    let animationFrameId = null;

    const render = () => {
      if (!isMounted) return;
      starX += (mouseX - starX) * 0.22;
      starY += (mouseY - starY) * 0.22;

      star.style.left = `${starX}px`;
      star.style.top = `${starY}px`;

      animationFrameId = window.requestAnimationFrame(render);
    };

    const syncHoverState = (target) => {
      const isInteractive = Boolean(
        target &&
          target.closest(
            'a, button, .btn, .mobile-icon-link, .sidebar-toggle, .sidebar-close, input, textarea, select, label'
          )
      );

      star.classList.toggle('is-hover', isInteractive);
      return isInteractive;
    };

    const randomBetween = (min, max) => min + Math.random() * (max - min);

    const spawnSpark = (x, y, isInteractive = false) => {
      const spark = document.createElement('span');
      spark.className = `cursor-spark${isInteractive ? ' is-hover' : ''}`;
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty('--spark-x', `${randomBetween(-22, 22)}px`);
      spark.style.setProperty('--spark-y', `${randomBetween(-22, 22)}px`);
      spark.style.setProperty('--spark-scale', `${randomBetween(0.8, 1.45)}`);
      document.body.append(spark);
      spark.addEventListener(
        'animationend',
        () => {
          spark.remove();
        },
        { once: true }
      );
    };

    const onMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      star.classList.add('is-visible');
      const isInteractive = syncHoverState(event.target);
      const now = performance.now();

      if (now - lastSparkAt > 34) {
        spawnSpark(mouseX, mouseY, isInteractive);
        lastSparkAt = now;
      }
    };

    const onMouseLeave = () => {
      star.classList.remove('is-visible', 'is-hover', 'is-active');
    };

    const onMouseDown = () => {
      star.classList.add('is-active');
      for (let index = 0; index < 4; index += 1) {
        spawnSpark(mouseX, mouseY, true);
      }
    };

    const onMouseUp = (event) => {
      star.classList.remove('is-active');
      syncHoverState(event.target);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      isMounted = false;
      document.body.classList.remove('pointer-enabled');
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return <div ref={starRef} className="cursor-star" />;
}
