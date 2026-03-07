/**
 * ForgotPassword Page - Dispatch Auth Portal
 * Handles password reset request and code entry
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import styles from './Auth.module.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('email'); // email, code, success
  const [loading, setLoading] = useState(false);

  const handleRequestCode = async () => {
    setError('');
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setStep('code');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(email, code, newPassword);
      setStep('success');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
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

  if (step === 'code') {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Dispatch</span>
          </div>

          <div className={styles.card}>
            <button onClick={() => setStep('email')} className={styles.backLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <h1 className={styles.title}>Enter reset code</h1>
            <p className={styles.subtitle}>
              We sent a 6-digit code to <strong>{email}</strong>
            </p>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Reset code</label>
                <input
                  type="text"
                  className={styles.input}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>New password</label>
                <input
                  type="password"
                  className={styles.input}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
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
                onClick={handleResetPassword}
                disabled={loading || code.length !== 6 || !newPassword || !confirmPassword}
              >
                {loading ? <span className={styles.spinner} /> : 'Reset password'}
              </button>

              <button
                type="button"
                className={styles.linkBtn}
                onClick={handleRequestCode}
                disabled={loading}
              >
                Resend code
              </button>
            </div>
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
          <Link to="/signin" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to sign in
          </Link>

          <h1 className={styles.title}>Reset password</h1>
          <p className={styles.subtitle}>Enter your email and we'll send you a reset code</p>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
              />
            </div>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleRequestCode}
              disabled={loading || !email}
            >
              {loading ? <span className={styles.spinner} /> : 'Send reset code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
