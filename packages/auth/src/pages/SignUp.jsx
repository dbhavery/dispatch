/**
 * SignUp Page - Dispatch Auth Portal
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/api';
import styles from './Auth.module.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Dispatch</span>
          </div>
          <div className={styles.card}>
            <h1 className={styles.title}>Check your email</h1>
            <p className={styles.subtitle}>
              We've sent a verification link to <strong>{formData.email}</strong>.
              Please check your inbox and click the link to verify your account.
            </p>
            <Link to="/signin" className={styles.submitBtn} style={{ textDecoration: 'none', textAlign: 'center' }}>
              Return to sign in
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
          <h1 className={styles.title}>Create account</h1>
          <p className={styles.subtitle}>Get started with Dispatch</p>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.form}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>First name</label>
                <input
                  type="text"
                  name="firstName"
                  className={styles.input}
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  className={styles.input}
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                className={styles.input}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
              />
            </div>

            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={loading || !formData.email || !formData.password}
            >
              {loading ? <span className={styles.spinner} /> : 'Create account'}
            </button>
          </div>

          <p className={styles.footer}>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
