/**
 * ResetPassword Page - Dispatch Auth Portal
 */

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authService } from '../services/api';
import styles from './Auth.module.css';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Dispatch</span>
          </div>
          <div className={styles.card}>
            <h1 className={styles.title}>Invalid link</h1>
            <p className={styles.subtitle}>This password reset link is invalid or has expired.</p>
            <Link to="/forgot-password" className={styles.submitBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
              Request new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Dispatch</span>
          </div>
          <div className={styles.card}>
            <h1 className={styles.title}>Password reset</h1>
            <p className={styles.subtitle}>Your password has been successfully reset.</p>
            <Link to="/signin" className={styles.submitBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Dispatch</span>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>Set new password</h1>
          <p className={styles.subtitle}>Enter your new password below</p>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New password</label>
              <input
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                autoFocus
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm password</label>
              <input
                type="password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
              />
            </div>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={loading || !password || !confirmPassword}
            >
              {loading ? <span className={styles.spinner} /> : 'Reset password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
