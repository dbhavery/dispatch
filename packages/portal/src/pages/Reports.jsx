/**
 * HQ Portal - Reports Page
 * Comprehensive reporting and analytics
 * Following DESIGN-RULES.md - Dark industrial theme
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Reports.module.css';

// Mock data for development
const MOCK_DATA = {
  reportCategories: [
    { name: 'Financial', icon: '💰', count: 12 },
    { name: 'Operations', icon: '⚙️', count: 18 },
    { name: 'Franchise', icon: '🏢', count: 15 },
    { name: 'Marketing', icon: '📈', count: 8 },
    { name: 'Compliance', icon: '✓', count: 6 },
    { name: 'HR', icon: '👥', count: 5 },
  ],
  recentReports: [
    { name: 'Monthly Revenue Summary', category: 'Financial', generated: 'Jan 20, 2026', format: 'PDF', size: '2.4 MB' },
    { name: 'Fleet Utilization Report', category: 'Operations', generated: 'Jan 19, 2026', format: 'Excel', size: '1.8 MB' },
    { name: 'Franchise Performance Q4', category: 'Franchise', generated: 'Jan 18, 2026', format: 'PDF', size: '4.2 MB' },
    { name: 'Marketing Campaign Analysis', category: 'Marketing', generated: 'Jan 17, 2026', format: 'PDF', size: '3.1 MB' },
    { name: 'Compliance Audit Report', category: 'Compliance', generated: 'Jan 15, 2026', format: 'PDF', size: '1.6 MB' },
  ],
  scheduledReports: [
    { name: 'Weekly Operations Summary', frequency: 'Weekly', nextRun: 'Jan 22, 2026', recipients: 12 },
    { name: 'Monthly Royalty Report', frequency: 'Monthly', nextRun: 'Feb 1, 2026', recipients: 8 },
    { name: 'Quarterly Performance Review', frequency: 'Quarterly', nextRun: 'Apr 1, 2026', recipients: 24 },
    { name: 'Daily Driver Activity', frequency: 'Daily', nextRun: 'Jan 21, 2026', recipients: 47 },
  ],
  quickReports: [
    { name: 'P&L Statement', description: 'Profit and loss for selected period' },
    { name: 'Franchise Comparison', description: 'Side-by-side franchise metrics' },
    { name: 'Driver Performance', description: 'Individual driver statistics' },
    { name: 'Customer Retention', description: 'Retention rates by region' },
    { name: 'Fuel Economics', description: 'Cost per gallon analysis' },
    { name: 'Territory Analysis', description: 'Market potential by territory' },
  ],
  analytics: {
    totalReports: 847,
    reportsThisMonth: 124,
    avgGenerationTime: '12s',
    storageUsed: '42.8 GB',
  },
};

export default function Reports() {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState(null);

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
            <h1 className={styles.pageTitle}>Reports</h1>
            <p className={styles.pageSubtitle}>Generate, schedule, and analyze reports</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.tabSelector}>
            {['browse', 'scheduled', 'custom'].map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <button className={styles.primaryBtn}>+ New Report</button>
        </div>
      </header>

      <main className={styles.main}>
        {/* Left Column - Categories & Analytics */}
        <div className={styles.leftColumn}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Report Categories</h3>
            <div className={styles.categoryList}>
              {data.reportCategories.map((category) => (
                <button
                  key={category.name}
                  className={`${styles.categoryItem} ${selectedCategory === category.name ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryCount}>{category.count}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Analytics</h3>
            <div className={styles.analyticsGrid}>
              <div className={styles.analyticsItem}>
                <span className={styles.analyticsValue}>{data.analytics.totalReports}</span>
                <span className={styles.analyticsLabel}>Total Reports</span>
              </div>
              <div className={styles.analyticsItem}>
                <span className={styles.analyticsValue}>{data.analytics.reportsThisMonth}</span>
                <span className={styles.analyticsLabel}>This Month</span>
              </div>
              <div className={styles.analyticsItem}>
                <span className={styles.analyticsValue}>{data.analytics.avgGenerationTime}</span>
                <span className={styles.analyticsLabel}>Avg Gen Time</span>
              </div>
              <div className={styles.analyticsItem}>
                <span className={styles.analyticsValue}>{data.analytics.storageUsed}</span>
                <span className={styles.analyticsLabel}>Storage Used</span>
              </div>
            </div>
          </section>
        </div>

        {/* Center Column - Main Content */}
        <div className={styles.centerColumn}>
          {activeTab === 'browse' && (
            <>
              <section className={styles.card}>
                <h3 className={styles.cardTitle}>Quick Reports</h3>
                <div className={styles.quickReportGrid}>
                  {data.quickReports.map((report) => (
                    <button key={report.name} className={styles.quickReportItem}>
                      <span className={styles.quickReportName}>{report.name}</span>
                      <span className={styles.quickReportDesc}>{report.description}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className={styles.card}>
                <h3 className={styles.cardTitle}>Recent Reports</h3>
                <div className={styles.reportList}>
                  {data.recentReports.map((report, index) => (
                    <div key={index} className={styles.reportItem}>
                      <div className={styles.reportIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14,2 14,8 20,8" />
                        </svg>
                      </div>
                      <div className={styles.reportInfo}>
                        <span className={styles.reportName}>{report.name}</span>
                        <span className={styles.reportMeta}>{report.category} • {report.generated} • {report.size}</span>
                      </div>
                      <div className={styles.reportActions}>
                        <button className={styles.reportActionBtn}>View</button>
                        <button className={styles.reportActionBtn}>Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'scheduled' && (
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Scheduled Reports</h3>
              <div className={styles.scheduledList}>
                {data.scheduledReports.map((report, index) => (
                  <div key={index} className={styles.scheduledItem}>
                    <div className={styles.scheduledInfo}>
                      <span className={styles.scheduledName}>{report.name}</span>
                      <div className={styles.scheduledMeta}>
                        <span className={styles.scheduledFrequency}>{report.frequency}</span>
                        <span className={styles.scheduledRecipients}>{report.recipients} recipients</span>
                      </div>
                    </div>
                    <div className={styles.scheduledNext}>
                      <span className={styles.scheduledNextLabel}>Next Run</span>
                      <span className={styles.scheduledNextDate}>{report.nextRun}</span>
                    </div>
                    <div className={styles.scheduledActions}>
                      <button className={styles.scheduledActionBtn}>Edit</button>
                      <button className={styles.scheduledActionBtn}>Run Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'custom' && (
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Custom Report Builder</h3>
              <div className={styles.builderContent}>
                <div className={styles.builderStep}>
                  <span className={styles.stepNumber}>1</span>
                  <div className={styles.stepInfo}>
                    <span className={styles.stepTitle}>Select Data Source</span>
                    <select className={styles.stepSelect}>
                      <option>Franchise Performance</option>
                      <option>Financial Data</option>
                      <option>Operations Data</option>
                      <option>Driver Metrics</option>
                    </select>
                  </div>
                </div>
                <div className={styles.builderStep}>
                  <span className={styles.stepNumber}>2</span>
                  <div className={styles.stepInfo}>
                    <span className={styles.stepTitle}>Select Time Period</span>
                    <select className={styles.stepSelect}>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last Quarter</option>
                      <option>Year to Date</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                </div>
                <div className={styles.builderStep}>
                  <span className={styles.stepNumber}>3</span>
                  <div className={styles.stepInfo}>
                    <span className={styles.stepTitle}>Select Metrics</span>
                    <div className={styles.metricCheckboxes}>
                      <label className={styles.checkbox}>
                        <input type="checkbox" defaultChecked /> Revenue
                      </label>
                      <label className={styles.checkbox}>
                        <input type="checkbox" defaultChecked /> Deliveries
                      </label>
                      <label className={styles.checkbox}>
                        <input type="checkbox" /> Compliance
                      </label>
                      <label className={styles.checkbox}>
                        <input type="checkbox" /> Driver Performance
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.builderStep}>
                  <span className={styles.stepNumber}>4</span>
                  <div className={styles.stepInfo}>
                    <span className={styles.stepTitle}>Output Format</span>
                    <div className={styles.formatOptions}>
                      <button className={`${styles.formatBtn} ${styles.active}`}>PDF</button>
                      <button className={styles.formatBtn}>Excel</button>
                      <button className={styles.formatBtn}>CSV</button>
                    </div>
                  </div>
                </div>
                <button className={styles.generateBtn}>Generate Report</button>
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Quick Actions */}
        <div className={styles.rightColumn}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Quick Actions</h3>
            <div className={styles.actionsList}>
              <button className={styles.actionBtn}>Generate P&L</button>
              <button className={styles.actionBtn}>Export All Data</button>
              <button className={styles.actionBtn}>Schedule Report</button>
              <button className={styles.actionBtn}>View Templates</button>
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Export Options</h3>
            <div className={styles.exportList}>
              <button className={styles.exportBtn}>
                <span className={styles.exportIcon}>📄</span>
                <span>PDF Report</span>
              </button>
              <button className={styles.exportBtn}>
                <span className={styles.exportIcon}>📊</span>
                <span>Excel Spreadsheet</span>
              </button>
              <button className={styles.exportBtn}>
                <span className={styles.exportIcon}>📋</span>
                <span>CSV Data</span>
              </button>
              <button className={styles.exportBtn}>
                <span className={styles.exportIcon}>🖼️</span>
                <span>Image/PNG</span>
              </button>
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Popular Reports</h3>
            <div className={styles.popularList}>
              <div className={styles.popularItem}>
                <span className={styles.popularName}>Monthly Revenue</span>
                <span className={styles.popularCount}>234 views</span>
              </div>
              <div className={styles.popularItem}>
                <span className={styles.popularName}>Franchise Rankings</span>
                <span className={styles.popularCount}>189 views</span>
              </div>
              <div className={styles.popularItem}>
                <span className={styles.popularName}>Driver Efficiency</span>
                <span className={styles.popularCount}>156 views</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
