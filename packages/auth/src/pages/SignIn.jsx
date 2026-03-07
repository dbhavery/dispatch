/**
 * SignIn Page - Dispatch Auth Portal
 * Unified login for all portals with role-based redirect
 */

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authService, portalRedirectMap } from '../services/api';
import styles from './Auth.module.css';

const ALLOWED_ORIGINS = [
  window.location.origin,
  'https://hq.dispatch.app',
  'https://app.dispatch.app',
];

function isValidReturnUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url, window.location.origin);
    return ALLOWED_ORIGINS.includes(parsed.origin) || parsed.pathname.startsWith('/');
  } catch {
    return false;
  }
}

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('return');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(email, password);

      // Store tokens
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to appropriate portal based on role
      const redirectUrl = isValidReturnUrl(returnTo) ? returnTo : (portalRedirectMap[data.user.role] || '/');
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <img
            src="/logos/dispatch-logo.svg"
            alt="Dispatch"
            className={styles.logoImg}
          />
        </div>

        {/* Card */}
        <div className={styles.card}>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>Enter your credentials to continue</p>

          {error && (
            <div className={styles.error}>{error}</div>
          )}

          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.label}>Password</label>
                <Link to="/forgot-password" className={styles.forgotLink} tabIndex={-1}>
                  Forgot password?
                </Link>
              </div>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={loading || !email || !password}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <p className={styles.footer}>
            Don't have an account?{' '}
            <Link to="/signup">Create account</Link>
          </p>
        </div>

        {/* Test Credentials (dev only) - auto-login to redirect to dashboards */}
        {import.meta.env.DEV && (
          <div className={styles.devPanel}>
            <div className={styles.devTitle}>Test Accounts</div>
            <div className={styles.devGrid}>
              <button onClick={async () => { setEmail('admin@test.com'); setPassword('pass'); setTimeout(() => document.querySelector('[class*="submitBtn"]')?.click(), 100); }} className={styles.devBtn}>
                Holdings Admin
              </button>
              <button onClick={async () => { setEmail('owner@test.com'); setPassword('pass'); setTimeout(() => document.querySelector('[class*="submitBtn"]')?.click(), 100); }} className={styles.devBtn}>
                Franchise Owner
              </button>
              <button onClick={async () => { setEmail('manager@test.com'); setPassword('pass'); setTimeout(() => document.querySelector('[class*="submitBtn"]')?.click(), 100); }} className={styles.devBtn}>
                Manager
              </button>
              <button onClick={async () => { setEmail('driver@test.com'); setPassword('pass'); setTimeout(() => document.querySelector('[class*="submitBtn"]')?.click(), 100); }} className={styles.devBtn}>
                Driver
              </button>
              <button onClick={async () => { setEmail('customer@test.com'); setPassword('pass'); setTimeout(() => document.querySelector('[class*="submitBtn"]')?.click(), 100); }} className={styles.devBtn}>
                Customer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
