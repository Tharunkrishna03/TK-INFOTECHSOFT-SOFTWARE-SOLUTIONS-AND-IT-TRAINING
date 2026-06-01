import React, { useEffect, useRef } from 'react';
import { DotLottie } from '@lottiefiles/dotlottie-web';

export default function PageLoader({ isVisible }) {
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      try {
        instanceRef.current = new DotLottie({
          autoplay: true,
          loop: true,
          canvas: canvasRef.current,
          src: 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie',
        });
      } catch (err) {
        console.error('Failed to load DotLottie:', err);
      }
    }

    return () => {
      if (instanceRef.current) {
        try {
          instanceRef.current.destroy();
        } catch (e) {
          // ignore
        }
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      className={`page-loader ${isVisible ? 'is-visible' : 'd-none'}`} 
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: isVisible ? 'all' : 'none'
      }}
    >
      <div className="page-loader-shell">
        <canvas
          ref={canvasRef}
          className="page-loader-canvas"
          width="300"
          height="300"
        ></canvas>
      </div>
    </div>
  );
}
