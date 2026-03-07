/**
 * Verify Page - Dispatch Auth Portal
 * Email verification handler
 */

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authService } from '../services/api';
import styles from './Auth.module.css';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setError('No verification token provided');
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      await authService.verifyEmail(token);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.error || 'Verification failed');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Dispatch</span>
        </div>

        <div className={styles.card}>
          {status === 'verifying' && (
            <>
              <h1 className={styles.title}>Verifying email...</h1>
              <p className={styles.subtitle}>Please wait while we verify your email address.</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <span className={styles.spinner} />
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <h1 className={styles.title}>Email verified</h1>
              <p className={styles.subtitle}>Your email has been successfully verified. You can now sign in to your account.</p>
              <Link to="/signin" className={styles.submitBtn} style={{ textDecoration: 'none', textAlign: 'center', marginTop: '18px', display: 'block' }}>
                Sign in
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <h1 className={styles.title}>Verification failed</h1>
              <p className={styles.subtitle}>{error}</p>
              <Link to="/signin" className={styles.submitBtn} style={{ textDecoration: 'none', textAlign: 'center', marginTop: '18px', display: 'block' }}>
                Return to sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
