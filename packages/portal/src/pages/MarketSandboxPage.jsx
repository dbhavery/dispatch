/**
 * HQ Portal - Market Sandbox Page
 * Financial modeling tool for franchise market analysis
 * Dark industrial theme following DESIGN-RULES.md
 */

import { useNavigate } from 'react-router-dom';
import MarketSandbox from '../components/MarketSandbox';
import styles from './MarketSandboxPage.module.css';

export default function MarketSandboxPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1 className={styles.pageTitle}>Market Sandbox</h1>
            <p className={styles.pageSubtitle}>Financial modeling for franchise territories</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>
            Export scenario
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            Save as template
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <MarketSandbox />
      </main>
    </div>
  );
}
