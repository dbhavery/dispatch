/**
 * HQ Portal - Finance Page
 * Revenue, royalties, P&L, and financial reporting
 * Following DESIGN-RULES.md - Dark industrial theme
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { financeService } from '../services/api';
import styles from './Finance.module.css';

// Mock data for development
const MOCK_DATA = {
  overview: {
    totalRevenue: 2847500,
    royaltiesCollected: 170850,
    brandFund: 28475,
    techLeaseRevenue: 94000,
    monthlyGrowth: 12.4,
    yearlyGrowth: 34.7,
  },
  franchiseRevenue: [
    { name: 'Dallas-Fort Worth', revenue: 245000, royalty: 14700, growth: 15.2 },
    { name: 'Houston Metro', revenue: 198000, royalty: 11880, growth: 8.4 },
    { name: 'Phoenix', revenue: 176000, royalty: 10560, growth: 22.1 },
    { name: 'San Antonio', revenue: 142000, royalty: 8520, growth: 11.8 },
    { name: 'Austin', revenue: 128000, royalty: 7680, growth: 18.6 },
    { name: 'Denver', revenue: 115000, royalty: 6900, growth: -2.3 },
    { name: 'Las Vegas', revenue: 98000, royalty: 5880, growth: 9.1 },
    { name: 'Salt Lake City', revenue: 87000, royalty: 5220, growth: 14.5 },
  ],
  recentTransactions: [
    { id: 'TXN-4521', franchise: 'Dallas-Fort Worth', type: 'Royalty', amount: 4847.50, date: '2024-01-15' },
    { id: 'TXN-4520', franchise: 'Houston Metro', type: 'Brand Fund', amount: 1980.00, date: '2024-01-15' },
    { id: 'TXN-4519', franchise: 'Phoenix', type: 'Tech Lease', amount: 2000.00, date: '2024-01-14' },
    { id: 'TXN-4518', franchise: 'San Antonio', type: 'Royalty', amount: 2840.00, date: '2024-01-14' },
    { id: 'TXN-4517', franchise: 'Austin', type: 'Royalty', amount: 2560.00, date: '2024-01-13' },
    { id: 'TXN-4516', franchise: 'Denver', type: 'Brand Fund', amount: 1150.00, date: '2024-01-13' },
  ],
  invoices: {
    pending: 12,
    overdue: 2,
    paid: 145,
    totalOutstanding: 48750,
  },
};

export default function Finance() {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('30d');

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    setLoading(true);
    try {
      const overview = await financeService.getOverview(period);
      if (overview) {
        setData((prev) => ({ ...prev, ...overview }));
      }
    } catch (error) {
      if (import.meta.env.DEV) console.log('[Finance] Using mock data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount.toFixed(2)}`;
  };

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
            <h1 className={styles.pageTitle}>Finance</h1>
            <p className={styles.pageSubtitle}>Revenue, royalties, and P&L management</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.periodSelector}>
            {['7d', '30d', '90d', 'YTD'].map((p) => (
              <button
                key={p}
                className={`${styles.periodBtn} ${period === p ? styles.active : ''}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            Export report
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Left Column */}
        <div className={styles.column}>
          {/* Revenue Overview */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Revenue overview</div>
            <div className={styles.cardContent}>
              <div className={styles.bigMetric}>
                <span className={styles.bigValue}>{formatCurrency(data.overview.totalRevenue)}</span>
                <span className={`${styles.trend} ${styles.up}`}>+{data.overview.monthlyGrowth}%</span>
              </div>
              <div className={styles.metricLabel}>Total network revenue</div>
              <div className={styles.divider} />
              <div className={styles.metricGrid}>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{formatCurrency(data.overview.royaltiesCollected)}</span>
                  <span className={styles.metricName}>Royalties (6%)</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{formatCurrency(data.overview.brandFund)}</span>
                  <span className={styles.metricName}>Brand fund (1%)</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{formatCurrency(data.overview.techLeaseRevenue)}</span>
                  <span className={styles.metricName}>Tech lease</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>+{data.overview.yearlyGrowth}%</span>
                  <span className={styles.metricName}>YoY growth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Status */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Invoice status</div>
            <div className={styles.cardContent}>
              <div className={styles.invoiceGrid}>
                <div className={styles.invoiceItem}>
                  <span className={`${styles.invoiceValue} ${styles.pending}`}>{data.invoices.pending}</span>
                  <span className={styles.invoiceLabel}>Pending</span>
                </div>
                <div className={styles.invoiceItem}>
                  <span className={`${styles.invoiceValue} ${styles.overdue}`}>{data.invoices.overdue}</span>
                  <span className={styles.invoiceLabel}>Overdue</span>
                </div>
                <div className={styles.invoiceItem}>
                  <span className={`${styles.invoiceValue} ${styles.paid}`}>{data.invoices.paid}</span>
                  <span className={styles.invoiceLabel}>Paid</span>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.outstandingRow}>
                <span className={styles.outstandingLabel}>Total outstanding</span>
                <span className={styles.outstandingValue}>{formatCurrency(data.invoices.totalOutstanding)}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Quick actions</div>
            <div className={styles.cardContent}>
              <div className={styles.actionsColumn}>
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}>
                  Generate invoices
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnFull}`}>
                  Run reconciliation
                </button>
                <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnFull}`}>
                  View all transactions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className={styles.column}>
          {/* Franchise Revenue Table */}
          <div className={styles.tallCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Revenue by franchise</span>
              <span className={`${styles.pill} ${styles.pillGray}`}>{data.franchiseRevenue.length}</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Franchise</th>
                      <th className={styles.alignRight}>Revenue</th>
                      <th className={styles.alignRight}>Royalty</th>
                      <th className={styles.alignRight}>Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.franchiseRevenue.map((franchise, i) => (
                      <tr key={i}>
                        <td>
                          <div className={styles.franchiseName}>{franchise.name}</div>
                        </td>
                        <td className={styles.alignRight}>
                          <span className={styles.revenueValue}>{formatCurrency(franchise.revenue)}</span>
                        </td>
                        <td className={styles.alignRight}>
                          <span className={styles.royaltyValue}>{formatCurrency(franchise.royalty)}</span>
                        </td>
                        <td className={styles.alignRight}>
                          <span className={`${styles.growthValue} ${franchise.growth >= 0 ? styles.up : styles.down}`}>
                            {franchise.growth >= 0 ? '+' : ''}{franchise.growth}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.column}>
          {/* Recent Transactions */}
          <div className={styles.tallCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Recent transactions</span>
              <button className={styles.viewAllBtn}>View all</button>
            </div>
            <div className={styles.cardContent}>
              {data.recentTransactions.map((txn, i) => (
                <div key={i} className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <div className={styles.transactionFranchise}>{txn.franchise}</div>
                    <div className={styles.transactionMeta}>
                      <span className={`${styles.transactionType} ${styles[txn.type.toLowerCase().replace(' ', '')]}`}>
                        {txn.type}
                      </span>
                      <span className={styles.transactionDate}>{txn.date}</span>
                    </div>
                  </div>
                  <div className={styles.transactionAmount}>${txn.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown Chart Placeholder */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Revenue breakdown</div>
            <div className={styles.cardContent}>
              <div className={styles.chartPlaceholder}>
                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownBar}>
                    <div className={`${styles.breakdownFill} ${styles.fillGreen}`} style={{ width: '60%' }} />
                  </div>
                  <div className={styles.breakdownLabel}>
                    <span>Diesel</span>
                    <span>60%</span>
                  </div>
                </div>
                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownBar}>
                    <div className={`${styles.breakdownFill} ${styles.fillYellow}`} style={{ width: '25%' }} />
                  </div>
                  <div className={styles.breakdownLabel}>
                    <span>Regular</span>
                    <span>25%</span>
                  </div>
                </div>
                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownBar}>
                    <div className={`${styles.breakdownFill} ${styles.fillRed}`} style={{ width: '10%' }} />
                  </div>
                  <div className={styles.breakdownLabel}>
                    <span>Premium</span>
                    <span>10%</span>
                  </div>
                </div>
                <div className={styles.breakdownItem}>
                  <div className={styles.breakdownBar}>
                    <div className={`${styles.breakdownFill} ${styles.fillBlue}`} style={{ width: '5%' }} />
                  </div>
                  <div className={styles.breakdownLabel}>
                    <span>DEF</span>
                    <span>5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
