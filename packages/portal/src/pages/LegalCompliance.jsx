/**
 * HQ Portal - Legal & Compliance Center
 * Permits, audits, and regulatory documents (95% automated)
 * Dark industrial theme following DESIGN-RULES.md
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalCompliance.module.css';

// Mock data - will be replaced by API
const MOCK_DATA = {
  overview: {
    activePermits: 248,
    expiringSoon: 12,
    openIncidents: 3,
    complianceScore: 98.7,
    pendingRenewals: 8,
    scheduledAudits: 4
  },
  permits: [
    { id: 1, type: 'Fuel Storage', territory: 'Dallas-Fort Worth', status: 'active', expires: '2026-08-15', daysLeft: 205 },
    { id: 2, type: 'Vehicle Operation', territory: 'Houston', status: 'active', expires: '2026-03-22', daysLeft: 59 },
    { id: 3, type: 'Hazmat Transport', territory: 'San Antonio', status: 'expiring', expires: '2026-02-10', daysLeft: 19 },
    { id: 4, type: 'Business License', territory: 'Austin', status: 'active', expires: '2026-12-31', daysLeft: 343 },
    { id: 5, type: 'Fuel Storage', territory: 'Phoenix', status: 'expiring', expires: '2026-02-05', daysLeft: 14 },
    { id: 6, type: 'Environmental', territory: 'Denver', status: 'renewal', expires: '2026-01-28', daysLeft: 6 },
  ],
  incidents: [
    { id: 1, type: 'Minor Spill', territory: 'Houston', date: '2026-01-18', status: 'investigating', severity: 'low' },
    { id: 2, type: 'Customer Complaint', territory: 'Dallas', date: '2026-01-17', status: 'resolved', severity: 'low' },
    { id: 3, type: 'Vehicle Incident', territory: 'Phoenix', date: '2026-01-15', status: 'pending', severity: 'medium' },
  ],
  audits: [
    { id: 1, type: 'Safety Inspection', territory: 'All', date: '2026-02-15', status: 'scheduled' },
    { id: 2, type: 'Environmental Review', territory: 'Houston', date: '2026-02-22', status: 'scheduled' },
    { id: 3, type: 'Financial Audit', territory: 'Corporate', date: '2026-03-01', status: 'scheduled' },
    { id: 4, type: 'Insurance Review', territory: 'All', date: '2026-03-15', status: 'scheduled' },
  ],
  complianceByCategory: [
    { category: 'Permits & Licenses', score: 99.2, items: 248 },
    { category: 'Safety Training', score: 97.8, items: 186 },
    { category: 'Vehicle Inspections', score: 99.5, items: 221 },
    { category: 'Insurance Coverage', score: 100, items: 47 },
    { category: 'Environmental', score: 96.4, items: 89 },
  ]
};

export default function LegalCompliance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('permits');
  const data = MOCK_DATA;

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return styles.statusActive;
      case 'expiring': return styles.statusExpiring;
      case 'renewal': return styles.statusRenewal;
      case 'investigating': return styles.statusInvestigating;
      case 'resolved': return styles.statusResolved;
      case 'pending': return styles.statusPending;
      case 'scheduled': return styles.statusScheduled;
      default: return '';
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'low': return styles.severityLow;
      case 'medium': return styles.severityMedium;
      case 'high': return styles.severityHigh;
      default: return '';
    }
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
            <h1 className={styles.pageTitle}>Legal & Compliance</h1>
            <p className={styles.pageSubtitle}>Permits, audits, and regulatory documents (95% automated)</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.tabSelector}>
            {['permits', 'incidents', 'audits'].map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main 3-Column Grid */}
      <main className={styles.main}>
        {/* LEFT COLUMN - Overview & Categories */}
        <div className={styles.column}>
          {/* Compliance Score */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Compliance score</div>
            <div className={styles.cardContent}>
              <div className={styles.scoreDisplay}>
                <div className={styles.scoreRing}>
                  <svg viewBox="0 0 120 120" className={styles.scoreSvg}>
                    <circle cx="60" cy="60" r="50" className={styles.scoreTrack} />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      className={styles.scoreProgress}
                      strokeDasharray={`${data.overview.complianceScore * 3.14} 314`}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className={styles.scoreValue}>
                    <span className={styles.scoreNumber}>{data.overview.complianceScore}</span>
                    <span className={styles.scoreUnit}>%</span>
                  </div>
                </div>
                <div className={styles.scoreStatus}>All systems compliant</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Overview</div>
            <div className={styles.cardContent}>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{data.overview.activePermits}</div>
                  <div className={styles.statLabel}>Active permits</div>
                </div>
                <div className={styles.statItem}>
                  <div className={`${styles.statValue} ${styles.warning}`}>{data.overview.expiringSoon}</div>
                  <div className={styles.statLabel}>Expiring soon</div>
                </div>
                <div className={styles.statItem}>
                  <div className={`${styles.statValue} ${styles.alert}`}>{data.overview.openIncidents}</div>
                  <div className={styles.statLabel}>Open incidents</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{data.overview.scheduledAudits}</div>
                  <div className={styles.statLabel}>Upcoming audits</div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance by Category */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Compliance by category</div>
            <div className={styles.cardContent}>
              <div className={styles.categoryList}>
                {data.complianceByCategory.map((cat, i) => (
                  <div key={i} className={styles.categoryItem}>
                    <div className={styles.categoryHeader}>
                      <span className={styles.categoryName}>{cat.category}</span>
                      <span className={styles.categoryScore}>{cat.score}%</span>
                    </div>
                    <div className={styles.categoryBar}>
                      <div
                        className={`${styles.categoryFill} ${cat.score >= 99 ? styles.fillGreen : cat.score >= 95 ? styles.fillYellow : styles.fillRed}`}
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                    <div className={styles.categoryMeta}>{cat.items} items tracked</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Quick actions</div>
            <div className={styles.cardContent}>
              <div className={styles.actionsColumn}>
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}>
                  File incident report
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnFull}`}>
                  Request permit renewal
                </button>
                <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnFull}`}>
                  View all documents
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - Main Content */}
        <div className={styles.column}>
          {activeTab === 'permits' && (
            <div className={styles.tallCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Permit status</span>
                <span className={`${styles.pill} ${styles.pillGray}`}>{data.overview.activePermits}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Territory</th>
                        <th>Status</th>
                        <th>Expires</th>
                        <th className={styles.alignRight}>Days left</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.permits.map((permit) => (
                        <tr key={permit.id}>
                          <td className={styles.permitType}>{permit.type}</td>
                          <td className={styles.permitTerritory}>{permit.territory}</td>
                          <td>
                            <span className={`${styles.statusBadge} ${getStatusClass(permit.status)}`}>
                              {permit.status}
                            </span>
                          </td>
                          <td className={styles.permitDate}>{permit.expires}</td>
                          <td className={`${styles.alignRight} ${styles.daysLeft} ${permit.daysLeft < 30 ? styles.urgent : ''}`}>
                            {permit.daysLeft}d
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className={styles.tallCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Incident reports</span>
                <span className={`${styles.pill} ${styles.pillRed}`}>{data.overview.openIncidents}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.incidentList}>
                  {data.incidents.map((incident) => (
                    <div key={incident.id} className={styles.incidentItem}>
                      <div className={styles.incidentLeft}>
                        <div className={`${styles.severityDot} ${getSeverityClass(incident.severity)}`}></div>
                        <div className={styles.incidentInfo}>
                          <div className={styles.incidentType}>{incident.type}</div>
                          <div className={styles.incidentMeta}>
                            <span>{incident.territory}</span>
                            <span className={styles.dot}>·</span>
                            <span>{incident.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`${styles.statusBadge} ${getStatusClass(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audits' && (
            <div className={styles.tallCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Scheduled audits</span>
                <span className={`${styles.pill} ${styles.pillGray}`}>{data.overview.scheduledAudits}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.auditList}>
                  {data.audits.map((audit) => (
                    <div key={audit.id} className={styles.auditItem}>
                      <div className={styles.auditIcon}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M6 2v3M14 2v3M3 8h14M5 4h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className={styles.auditInfo}>
                        <div className={styles.auditType}>{audit.type}</div>
                        <div className={styles.auditMeta}>
                          <span>{audit.territory}</span>
                          <span className={styles.dot}>·</span>
                          <span>{audit.date}</span>
                        </div>
                      </div>
                      <span className={`${styles.statusBadge} ${getStatusClass(audit.status)}`}>
                        {audit.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - Alerts & Timeline */}
        <div className={styles.column}>
          {/* Urgent Items */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Urgent attention</span>
              <span className={`${styles.pill} ${styles.pillRed}`}>{data.overview.expiringSoon}</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.urgentList}>
                {data.permits.filter(p => p.daysLeft < 30).map((permit) => (
                  <div key={permit.id} className={styles.urgentItem}>
                    <div className={`${styles.urgentDot} ${permit.daysLeft < 14 ? styles.critical : styles.warning}`}></div>
                    <div className={styles.urgentInfo}>
                      <div className={styles.urgentTitle}>{permit.type}</div>
                      <div className={styles.urgentMeta}>{permit.territory}</div>
                    </div>
                    <div className={`${styles.urgentDays} ${permit.daysLeft < 14 ? styles.critical : styles.warning}`}>
                      {permit.daysLeft}d
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.tallCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Recent activity</span>
              <button className={styles.viewAllBtn}>View all</button>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.activityList}>
                {[
                  { action: 'Permit renewed', detail: 'Dallas-Fort Worth Fuel Storage', time: '2h ago', type: 'success' },
                  { action: 'Audit completed', detail: 'Houston Safety Inspection', time: '1d ago', type: 'success' },
                  { action: 'Incident reported', detail: 'Minor spill - Houston', time: '2d ago', type: 'warning' },
                  { action: 'Document uploaded', detail: 'Q4 Insurance Certificate', time: '3d ago', type: 'info' },
                  { action: 'Renewal requested', detail: 'Phoenix Environmental Permit', time: '4d ago', type: 'info' },
                  { action: 'Training completed', detail: '12 drivers - Safety Module', time: '5d ago', type: 'success' },
                ].map((activity, i) => (
                  <div key={i} className={styles.activityItem}>
                    <div className={`${styles.activityDot} ${styles[activity.type]}`}></div>
                    <div className={styles.activityInfo}>
                      <div className={styles.activityAction}>{activity.action}</div>
                      <div className={styles.activityDetail}>{activity.detail}</div>
                    </div>
                    <div className={styles.activityTime}>{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
