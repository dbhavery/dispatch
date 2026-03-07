/**
 * FuelGauge Component
 * Hero graphic showing the Dispatch logo with an animated fuel gauge
 * Scroll-reactive needle that responds to page scroll velocity
 */

import { useState, useEffect, useRef } from 'react';
import styles from './FuelGauge.module.css';

export function FuelGauge({ className, theme = 'dark' }) {
  const [needleAngle, setNeedleAngle] = useState(-55);
  const [isAnimating, setIsAnimating] = useState(true);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const targetAngle = useRef(62);

  // Initial animation - needle goes from -55 to 62 (E to F)
  useEffect(() => {
    const timer = setTimeout(() => {
      targetAngle.current = 62;
      setNeedleAngle(62);
    }, 200);

    const completeTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 4100);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, []);

  // Scroll-reactive needle movement (after initial animation)
  useEffect(() => {
    let velocityBuffer = [];
    let returnTimer = null;
    let rafId = null;

    // Initialize time ref on mount
    lastScrollTime.current = Date.now();

    const animateNeedle = () => {
      setNeedleAngle(prev => {
        const diff = targetAngle.current - prev;
        if (Math.abs(diff) < 0.1) return targetAngle.current;
        return prev + diff * 0.12;
      });
      rafId = requestAnimationFrame(animateNeedle);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentTime = Date.now();

      if (!isAnimating) {
        const deltaY = currentY - lastScrollY.current;
        const deltaTime = Math.max(currentTime - lastScrollTime.current, 8);
        const instantVelocity = deltaY / deltaTime;

        velocityBuffer.push(instantVelocity);
        if (velocityBuffer.length > 5) velocityBuffer.shift();

        const avgVelocity = velocityBuffer.reduce((a, b) => a + b, 0) / velocityBuffer.length;
        const velocityFactor = Math.abs(avgVelocity) * 25;
        const movement = Math.min(velocityFactor, 18);

        if (avgVelocity > 0.05) {
          targetAngle.current = Math.min(72, 62 + movement);  // Scroll down = needle rises (momentum)
        } else if (avgVelocity < -0.05) {
          targetAngle.current = Math.max(52, 62 - movement);  // Scroll up = needle drops (momentum)
        }

        if (returnTimer) clearTimeout(returnTimer);

        returnTimer = setTimeout(() => {
          velocityBuffer = [];
          const returnInterval = setInterval(() => {
            targetAngle.current += (62 - targetAngle.current) * 0.1;
            if (Math.abs(62 - targetAngle.current) < 0.5) {
              targetAngle.current = 62;
              clearInterval(returnInterval);
            }
          }, 16);
        }, 100);
      }

      lastScrollY.current = currentY;
      lastScrollTime.current = currentTime;
    };

    rafId = requestAnimationFrame(animateNeedle);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (returnTimer) clearTimeout(returnTimer);
    };
  }, [isAnimating]);

  return (
    <div className={`${styles.gaugeWrapper} ${theme === 'light' ? styles.lightTheme : ''} ${className || ''}`}>
      {/* Major tick marks */}
      <div className={`${styles.tickMark} ${styles.tickRed}`} style={{ transform: 'rotate(-60deg)' }}><span></span></div>
      <div className={`${styles.tickMark} ${styles.tickRed}`} style={{ transform: 'rotate(-45deg)' }}><span></span></div>
      <div className={styles.tickMark} style={{ transform: 'rotate(-30deg)' }}><span></span></div>
      <div className={styles.tickMark} style={{ transform: 'rotate(-15deg)' }}><span></span></div>
      <div className={styles.tickMark} style={{ transform: 'rotate(0deg)' }}><span></span></div>
      <div className={styles.tickMark} style={{ transform: 'rotate(15deg)' }}><span></span></div>
      <div className={styles.tickMark} style={{ transform: 'rotate(30deg)' }}><span></span></div>
      <div className={styles.tickMark} style={{ transform: 'rotate(45deg)' }}><span></span></div>
      <div className={styles.tickMark} style={{ transform: 'rotate(60deg)' }}><span></span></div>

      {/* Small tick marks */}
      <div className={`${styles.tickMark} ${styles.tickSmall} ${styles.tickRed}`} style={{ transform: 'rotate(-52deg)' }}><span></span></div>
      <div className={`${styles.tickMark} ${styles.tickSmall}`} style={{ transform: 'rotate(-38deg)' }}><span></span></div>
      <div className={`${styles.tickMark} ${styles.tickSmall}`} style={{ transform: 'rotate(-22deg)' }}><span></span></div>
      <div className={`${styles.tickMark} ${styles.tickSmall}`} style={{ transform: 'rotate(-8deg)' }}><span></span></div>
      <div className={`${styles.tickMark} ${styles.tickSmall}`} style={{ transform: 'rotate(8deg)' }}><span></span></div>
      <div className={`${styles.tickMark} ${styles.tickSmall}`} style={{ transform: 'rotate(22deg)' }}><span></span></div>
      <div className={`${styles.tickMark} ${styles.tickSmall}`} style={{ transform: 'rotate(38deg)' }}><span></span></div>
      <div className={`${styles.tickMark} ${styles.tickSmall}`} style={{ transform: 'rotate(52deg)' }}><span></span></div>

      {/* E and F labels */}
      <span className={`${styles.gaugeLabel} ${styles.gaugeE}`}>E</span>
      <span className={`${styles.gaugeLabel} ${styles.gaugeF}`}>F</span>

      {/* Needle */}
      <div
        className={`${styles.needle} ${isAnimating ? styles.animating : ''}`}
        style={{
          transform: `rotate(${needleAngle}deg)`,
          transition: isAnimating ? 'transform 3.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
        }}
      ></div>

      {/* Pivot ball */}
      <div className={styles.pivot}></div>
    </div>
  );
}

export default FuelGauge;
