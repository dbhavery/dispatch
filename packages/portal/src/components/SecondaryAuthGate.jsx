/**
 * SecondaryAuthGate - Password-protected access for sensitive sections
 * Requires re-authentication for HR, Finance, Dev, and Site Editor
 * 15-minute inactivity timeout (owner exempt)
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@dispatch/shared/contexts/AuthContext';
import styles from './SecondaryAuthGate.module.css';

// Areas that require secondary authentication
const PROTECTED_AREAS = {
  hr: { name: 'HR', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  finance: { name: 'Finance', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  dev: { name: 'Dev Console', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  'site-editor': { name: 'Site Editor', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
};

function SecondaryAuthGate({ area, children }) {
  const { user, isOwner, hasSecondaryAccess, secondaryLogin, secondaryWarning, resetSecondaryTimer } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const areaConfig = PROTECTED_AREAS[area] || { name: area, icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' };

  // Owner bypass - no secondary auth needed
  if (isOwner) {
    return children;
  }

  // Check if already authenticated for this area
  if (hasSecondaryAccess(area)) {
    // Reset timer on activity
    useEffect(() => {
      const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
      const handleActivity = () => resetSecondaryTimer();

      events.forEach(event => {
        window.addEventListener(event, handleActivity, { passive: true });
      });

      return () => {
        events.forEach(event => {
          window.removeEventListener(event, handleActivity);
        });
      };
    }, [resetSecondaryTimer]);

    return (
      <>
        {secondaryWarning && (
          <div className={styles.warningBanner}>
            <span>Session expiring soon. Click anywhere to extend.</span>
          </div>
        )}
        {children}
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await secondaryLogin(password, area);

    if (!result.success) {
      setError(result.error || 'Invalid password');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className={styles.gate}>
      <div className={styles.gateCard}>
        <div className={styles.lockIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={areaConfig.icon} />
          </svg>
        </div>

        <h2 className={styles.gateTitle}>{areaConfig.name}</h2>
        <p className={styles.gateSubtitle}>
          This area requires additional authentication.
          <br />
          Please enter your password to continue.
        </p>

        <div className={styles.gateForm} role="form">
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={styles.passwordInput}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!password || loading}
            className={styles.submitBtn}
          >
            {loading ? 'Verifying...' : 'Unlock Access'}
          </button>
        </div>

        <p className={styles.gateNote}>
          Session expires after 15 minutes of inactivity.
        </p>
      </div>
    </div>
  );
}

export default SecondaryAuthGate;
