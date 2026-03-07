/**
 * HQ Portal - SBA Lending Center
 * Loan applications and document management
 * Dark industrial theme following DESIGN-RULES.md
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SBA.module.css';

// Mock data - will be replaced by API
const MOCK_DATA = {
  overview: {
    activeLoans: 18,
    totalFunded: 8400000,
    applicationsPending: 6,
    approvalRate: 78,
    avgLoanSize: 466667,
    defaultRate: 0.8
  },
  applications: [
    { id: 1, applicant: 'Michael Torres', territory: 'Phoenix Metro', amount: 450000, stage: 'Underwriting', progress: 65, submitted: '2026-01-10' },
    { id: 2, applicant: 'Jennifer Adams', territory: 'Salt Lake City', amount: 380000, stage: 'Document Review', progress: 40, submitted: '2026-01-12' },
    { id: 3, applicant: 'Robert Kim', territory: 'Sacramento', amount: 520000, stage: 'Final Approval', progress: 90, submitted: '2025-12-28' },
    { id: 4, applicant: 'Lisa Chen', territory: 'Portland', amount: 425000, stage: 'SBA Submission', progress: 75, submitted: '2026-01-05' },
    { id: 5, applicant: 'David Martinez', territory: 'Albuquerque', amount: 395000, stage: 'Initial Review', progress: 20, submitted: '2026-01-18' },
    { id: 6, applicant: 'Sarah Johnson', territory: 'Tucson', amount: 460000, stage: 'Credit Check', progress: 30, submitted: '2026-01-15' },
  ],
  activeLoans: [
    { id: 1, franchisee: 'Dallas-Fort Worth', originalAmount: 500000, balance: 425000, rate: 7.25, nextPayment: '2026-02-01', status: 'current' },
    { id: 2, franchisee: 'Houston Metro', originalAmount: 475000, balance: 380000, rate: 7.00, nextPayment: '2026-02-05', status: 'current' },
    { id: 3, franchisee: 'San Antonio', originalAmount: 450000, balance: 398000, rate: 7.25, nextPayment: '2026-02-01', status: 'current' },
    { id: 4, franchisee: 'Austin', originalAmount: 425000, balance: 312000, rate: 6.75, nextPayment: '2026-02-10', status: 'current' },
    { id: 5, franchisee: 'El Paso', originalAmount: 380000, balance: 365000, rate: 7.50, nextPayment: '2026-02-01', status: 'late' },
  ],
  pipelineByStage: [
    { stage: 'Initial Review', count: 2, amount: 855000 },
    { stage: 'Document Review', count: 1, amount: 380000 },
    { stage: 'Credit Check', count: 1, amount: 460000 },
    { stage: 'Underwriting', count: 1, amount: 450000 },
    { stage: 'SBA Submission', count: 1, amount: 425000 },
    { stage: 'Final Approval', count: 1, amount: 520000 },
  ],
  recentActivity: [
    { action: 'Loan funded', detail: 'Denver - $485,000', time: '3d ago', type: 'success' },
    { action: 'Application approved', detail: 'Robert Kim - Sacramento', time: '1w ago', type: 'success' },
    { action: 'Documents received', detail: 'Jennifer Adams - 8 files', time: '2d ago', type: 'info' },
    { action: 'Credit report pulled', detail: 'Sarah Johnson', time: '1d ago', type: 'info' },
    { action: 'Payment received', detail: 'Houston Metro - $4,247', time: '5d ago', type: 'success' },
  ]
};

export default function SBA() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const data = MOCK_DATA;

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Initial Review': return styles.stageInitial;
      case 'Document Review': return styles.stageDocument;
      case 'Credit Check': return styles.stageCredit;
      case 'Underwriting': return styles.stageUnderwriting;
      case 'SBA Submission': return styles.stageSba;
      case 'Final Approval': return styles.stageFinal;
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
            <h1 className={styles.pageTitle}>SBA Lending</h1>
            <p className={styles.pageSubtitle}>Loan applications and portfolio management</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.tabSelector}>
            {['applications', 'portfolio'].map((tab) => (
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
        {/* LEFT COLUMN - Overview & Stats */}
        <div className={styles.column}>
          {/* Portfolio Summary */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Portfolio summary</div>
            <div className={styles.cardContent}>
              <div className={styles.bigMetric}>
                <span className={styles.bigValue}>{formatCurrency(data.overview.totalFunded)}</span>
              </div>
              <div className={styles.metricLabel}>Total funded</div>
              <div className={styles.divider}></div>
              <div className={styles.metricGrid}>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.activeLoans}</span>
                  <span className={styles.metricName}>Active loans</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{formatCurrency(data.overview.avgLoanSize)}</span>
                  <span className={styles.metricName}>Avg loan size</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.approvalRate}%</span>
                  <span className={styles.metricName}>Approval rate</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.defaultRate}%</span>
                  <span className={styles.metricName}>Default rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline by Stage */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Pipeline by stage</div>
            <div className={styles.cardContent}>
              <div className={styles.pipelineList}>
                {data.pipelineByStage.map((item, i) => (
                  <div key={i} className={styles.pipelineItem}>
                    <div className={styles.pipelineStage}>
                      <div className={`${styles.stageDot} ${getStageColor(item.stage)}`}></div>
                      <span>{item.stage}</span>
                    </div>
                    <div className={styles.pipelineStats}>
                      <span className={styles.pipelineCount}>{item.count}</span>
                      <span className={styles.pipelineAmount}>{formatCurrency(item.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.divider}></div>
              <div className={styles.pipelineTotal}>
                <span>Total pipeline</span>
                <span className={styles.totalValue}>{formatCurrency(3090000)}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Quick actions</div>
            <div className={styles.cardContent}>
              <div className={styles.actionsColumn}>
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}>
                  New application
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnFull}`}>
                  Generate reports
                </button>
                <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnFull}`}>
                  Document checklist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - Main Content */}
        <div className={styles.column}>
          {activeTab === 'applications' && (
            <div className={styles.tallCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Active applications</span>
                <span className={`${styles.pill} ${styles.pillGray}`}>{data.overview.applicationsPending}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.applicationList}>
                  {data.applications.map((app) => (
                    <div key={app.id} className={styles.applicationItem}>
                      <div className={styles.appHeader}>
                        <div className={styles.appInfo}>
                          <div className={styles.appName}>{app.applicant}</div>
                          <div className={styles.appTerritory}>{app.territory}</div>
                        </div>
                        <div className={styles.appAmount}>{formatCurrency(app.amount)}</div>
                      </div>
                      <div className={styles.appProgress}>
                        <div className={styles.progressHeader}>
                          <span className={`${styles.stageBadge} ${getStageColor(app.stage)}`}>{app.stage}</span>
                          <span className={styles.progressPercent}>{app.progress}%</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill} style={{ width: `${app.progress}%` }}></div>
                        </div>
                      </div>
                      <div className={styles.appMeta}>
                        <span>Submitted: {app.submitted}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className={styles.tallCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Loan portfolio</span>
                <span className={`${styles.pill} ${styles.pillGray}`}>{data.overview.activeLoans}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Franchisee</th>
                        <th className={styles.alignRight}>Original</th>
                        <th className={styles.alignRight}>Balance</th>
                        <th className={styles.alignRight}>Rate</th>
                        <th>Next payment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.activeLoans.map((loan) => (
                        <tr key={loan.id}>
                          <td className={styles.loanFranchisee}>{loan.franchisee}</td>
                          <td className={`${styles.alignRight} ${styles.loanOriginal}`}>
                            {formatCurrency(loan.originalAmount)}
                          </td>
                          <td className={`${styles.alignRight} ${styles.loanBalance}`}>
                            {formatCurrency(loan.balance)}
                          </td>
                          <td className={`${styles.alignRight} ${styles.loanRate}`}>
                            {loan.rate}%
                          </td>
                          <td className={styles.loanDate}>{loan.nextPayment}</td>
                          <td>
                            <span className={`${styles.statusBadge} ${loan.status === 'current' ? styles.statusCurrent : styles.statusLate}`}>
                              {loan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - Activity & Alerts */}
        <div className={styles.column}>
          {/* Pending Actions */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Pending actions</span>
              <span className={`${styles.pill} ${styles.pillRed}`}>4</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.actionList}>
                {[
                  { task: 'Review credit report', applicant: 'Sarah Johnson', urgent: true },
                  { task: 'Request missing docs', applicant: 'David Martinez', urgent: false },
                  { task: 'Final sign-off', applicant: 'Robert Kim', urgent: true },
                  { task: 'Follow up on late payment', applicant: 'El Paso', urgent: true },
                ].map((action, i) => (
                  <div key={i} className={styles.actionItem}>
                    <div className={`${styles.actionDot} ${action.urgent ? styles.urgent : ''}`}></div>
                    <div className={styles.actionInfo}>
                      <div className={styles.actionTask}>{action.task}</div>
                      <div className={styles.actionApplicant}>{action.applicant}</div>
                    </div>
                    <button className={styles.actionBtn}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
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
                {data.recentActivity.map((activity, i) => (
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

          {/* SBA Resources */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>SBA resources</div>
            <div className={styles.cardContent}>
              <div className={styles.resourceList}>
                {[
                  { name: 'SBA 7(a) Guidelines', type: 'PDF' },
                  { name: 'Document Checklist', type: 'Template' },
                  { name: 'Rate Calculator', type: 'Tool' },
                  { name: 'Lender Match Portal', type: 'Link' },
                ].map((resource, i) => (
                  <div key={i} className={styles.resourceItem}>
                    <div className={styles.resourceIcon}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6l-4-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className={styles.resourceName}>{resource.name}</span>
                    <span className={styles.resourceType}>{resource.type}</span>
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
