/**
 * HQ Portal - Waitlist Management
 * View and manage expansion interest signups by area
 * Used to prioritize franchise expansion decisions
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WaitlistManagement.module.css';

const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : 'https://api.dispatch.app';

// Mock data for demonstration - will be replaced by API
const MOCK_WAITLIST_DATA = {
  total: 15847,
  thisWeek: 342,
  thisMonth: 1428,
  growthRate: 18.4,
  topZipCodes: [
    { zipCode: '90210', city: 'Beverly Hills', state: 'CA', count: 487, trend: 'up' },
    { zipCode: '33139', city: 'Miami Beach', state: 'FL', count: 412, trend: 'up' },
    { zipCode: '10001', city: 'New York', state: 'NY', count: 389, trend: 'stable' },
    { zipCode: '60601', city: 'Chicago', state: 'IL', count: 356, trend: 'up' },
    { zipCode: '98101', city: 'Seattle', state: 'WA', count: 298, trend: 'up' },
    { zipCode: '30301', city: 'Atlanta', state: 'GA', count: 276, trend: 'stable' },
    { zipCode: '02101', city: 'Boston', state: 'MA', count: 254, trend: 'down' },
    { zipCode: '19101', city: 'Philadelphia', state: 'PA', count: 234, trend: 'up' },
    { zipCode: '80202', city: 'Denver', state: 'CO', count: 212, trend: 'up' },
    { zipCode: '97201', city: 'Portland', state: 'OR', count: 198, trend: 'stable' },
  ],
  recentSignups: [
    { id: 1, email: 'j***@gmail.com', zipCode: '90210', city: 'Beverly Hills', state: 'CA', date: '2 min ago' },
    { id: 2, email: 's***@outlook.com', zipCode: '33139', city: 'Miami Beach', state: 'FL', date: '8 min ago' },
    { id: 3, email: 'm***@yahoo.com', zipCode: '10001', city: 'New York', state: 'NY', date: '15 min ago' },
    { id: 4, email: 'a***@gmail.com', zipCode: '60601', city: 'Chicago', state: 'IL', date: '22 min ago' },
    { id: 5, email: 'r***@icloud.com', zipCode: '98101', city: 'Seattle', state: 'WA', date: '31 min ago' },
  ],
  regionBreakdown: [
    { region: 'West Coast', count: 4234, percent: 26.7 },
    { region: 'Northeast', count: 3891, percent: 24.6 },
    { region: 'Southeast', count: 3156, percent: 19.9 },
    { region: 'Midwest', count: 2487, percent: 15.7 },
    { region: 'Southwest', count: 2079, percent: 13.1 },
  ],
};

export default function WaitlistManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_WAITLIST_DATA);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('count');

  // In production, fetch from API
  useEffect(() => {
    // fetchWaitlistData();
  }, []);

  const fetchWaitlistData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/expansion-interest/stats`, {
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        setData(prev => ({
          ...prev,
          total: result.data.total,
          topZipCodes: result.data.topZipCodes,
        }));
      }
    } catch (err) {
      console.error('Failed to fetch waitlist data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredZipCodes = data.topZipCodes
    .filter(item =>
      item.zipCode.includes(searchTerm) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'count') return b.count - a.count;
      if (sortBy === 'city') return a.city.localeCompare(b.city);
      if (sortBy === 'state') return a.state.localeCompare(b.state);
      return 0;
    });

  const getTrendIcon = (trend) => {
    if (trend === 'up') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00DC82" strokeWidth="2">
        <path d="M7 17l5-5 5 5M7 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
    if (trend === 'down') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
        <path d="M17 7l-5 5-5-5M17 17l-5-5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
        <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1 className={styles.pageTitle}>Waitlist Management</h1>
            <p className={styles.pageSubtitle}>Expansion interest signals for franchise planning</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export CSV
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={fetchWaitlistData}>
            Refresh
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {/* KPI Row */}
        <div className={styles.kpiRow}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.kpiContent}>
              <span className={styles.kpiValue}>{data.total.toLocaleString()}</span>
              <span className={styles.kpiLabel}>Total on Waitlist</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.kpiContent}>
              <span className={styles.kpiValue}>{data.thisWeek}</span>
              <span className={styles.kpiLabel}>This Week</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.kpiContent}>
              <span className={styles.kpiValue}>{data.thisMonth.toLocaleString()}</span>
              <span className={styles.kpiLabel}>This Month</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon} style={{ background: 'rgba(0, 220, 130, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00DC82" strokeWidth="2">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.kpiContent}>
              <span className={`${styles.kpiValue} ${styles.kpiGreen}`}>+{data.growthRate}%</span>
              <span className={styles.kpiLabel}>MoM Growth</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Left Column - Top Areas */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Demand by Area</h2>
              <div className={styles.cardActions}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search zip, city, state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="count">Sort by demand</option>
                  <option value="city">Sort by city</option>
                  <option value="state">Sort by state</option>
                </select>
              </div>
            </div>
            <div className={styles.cardContent}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Zip Code</th>
                    <th>City</th>
                    <th>State</th>
                    <th className={styles.alignRight}>Signups</th>
                    <th>Trend</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredZipCodes.map((item, index) => (
                    <tr key={item.zipCode}>
                      <td className={styles.zipCode}>{item.zipCode}</td>
                      <td>{item.city}</td>
                      <td>{item.state}</td>
                      <td className={styles.alignRight}>
                        <span className={styles.countBadge}>{item.count}</span>
                      </td>
                      <td>{getTrendIcon(item.trend)}</td>
                      <td>
                        <button className={styles.actionBtn} title="View details">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Region Breakdown */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Regional Distribution</h2>
              <div className={styles.cardContent}>
                {data.regionBreakdown.map((region) => (
                  <div key={region.region} className={styles.regionItem}>
                    <div className={styles.regionHeader}>
                      <span className={styles.regionName}>{region.region}</span>
                      <span className={styles.regionCount}>{region.count.toLocaleString()}</span>
                    </div>
                    <div className={styles.regionBar}>
                      <div
                        className={styles.regionFill}
                        style={{ width: `${region.percent}%` }}
                      />
                    </div>
                    <span className={styles.regionPercent}>{region.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Signups */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Recent Signups</h2>
                <span className={styles.liveIndicator}>
                  <span className={styles.liveDot} />
                  Live
                </span>
              </div>
              <div className={styles.cardContent}>
                {data.recentSignups.map((signup) => (
                  <div key={signup.id} className={styles.signupItem}>
                    <div className={styles.signupInfo}>
                      <span className={styles.signupEmail}>{signup.email}</span>
                      <span className={styles.signupLocation}>
                        {signup.city}, {signup.state} ({signup.zipCode})
                      </span>
                    </div>
                    <span className={styles.signupTime}>{signup.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expansion Insights */}
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className={styles.insightTitle}>Expansion Insight</h3>
              <p className={styles.insightText}>
                <strong>Beverly Hills (90210)</strong> has shown consistent growth with 487 signups.
                This area meets the threshold for franchise viability analysis.
              </p>
              <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}>
                Start Franchise Analysis
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
