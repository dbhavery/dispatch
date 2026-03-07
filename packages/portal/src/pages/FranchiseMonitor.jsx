/**
 * HQ Portal - Franchise Monitor Page
 * Network-wide franchise health monitoring
 * Following DESIGN-RULES.md - Dark industrial theme
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { franchiseService } from '../services/api';
import styles from './FranchiseMonitor.module.css';

const MOCK_FRANCHISES = [
  { id: 'FR-001', name: 'Dallas-Fort Worth', owner: 'Mike Thompson', health: 98.7, status: 'active', deliveries: 847, revenue: 245000, compliance: 100, drivers: 12 },
  { id: 'FR-002', name: 'Houston Metro', owner: 'Sarah Chen', health: 96.2, status: 'active', deliveries: 723, revenue: 198000, compliance: 100, drivers: 10 },
  { id: 'FR-003', name: 'Phoenix', owner: 'James Rodriguez', health: 94.1, status: 'active', deliveries: 612, revenue: 176000, compliance: 98, drivers: 8 },
  { id: 'FR-004', name: 'San Antonio', owner: 'Lisa Williams', health: 91.8, status: 'active', deliveries: 498, revenue: 142000, compliance: 100, drivers: 7 },
  { id: 'FR-005', name: 'Austin', owner: 'David Kim', health: 89.4, status: 'warning', deliveries: 445, revenue: 128000, compliance: 95, drivers: 6 },
  { id: 'FR-006', name: 'Denver', owner: 'Amanda Foster', health: 87.2, status: 'active', deliveries: 401, revenue: 115000, compliance: 100, drivers: 6 },
  { id: 'FR-007', name: 'Las Vegas', owner: 'Robert Martinez', health: 85.9, status: 'active', deliveries: 342, revenue: 98000, compliance: 97, drivers: 5 },
  { id: 'FR-008', name: 'Salt Lake City', owner: 'Jennifer Brown', health: 84.5, status: 'active', deliveries: 304, revenue: 87000, compliance: 100, drivers: 4 },
  { id: 'FR-009', name: 'Albuquerque', owner: 'Chris Taylor', health: 82.1, status: 'warning', deliveries: 267, revenue: 76000, compliance: 92, drivers: 4 },
  { id: 'FR-010', name: 'El Paso', owner: 'Maria Garcia', health: 79.8, status: 'active', deliveries: 234, revenue: 67000, compliance: 100, drivers: 3 },
];

const NETWORK_STATS = {
  totalFranchises: 47,
  activeFranchises: 44,
  warningFranchises: 3,
  avgHealth: 89.4,
  totalDrivers: 186,
  todayDeliveries: 2847,
  monthlyRevenue: 2847500,
};

export default function FranchiseMonitor() {
  const navigate = useNavigate();
  const [franchises, setFranchises] = useState(MOCK_FRANCHISES);
  const [stats, setStats] = useState(NETWORK_STATS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('health');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await franchiseService.getAll();
      if (data?.franchises) setFranchises(data.franchises);
      if (data?.stats) setStats(data.stats);
    } catch (error) {
      if (import.meta.env.DEV) console.log('[FranchiseMonitor] Using mock data');
    }
  };

  const filteredFranchises = franchises
    .filter((f) => {
      if (filterStatus !== 'all' && f.status !== filterStatus) return false;
      if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'health') return b.health - a.health;
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      if (sortBy === 'deliveries') return b.deliveries - a.deliveries;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const getHealthColor = (health) => {
    if (health >= 90) return styles.healthGreen;
    if (health >= 80) return styles.healthYellow;
    return styles.healthRed;
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
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
            <h1 className={styles.pageTitle}>Franchise monitor</h1>
            <p className={styles.pageSubtitle}>Network-wide health and performance tracking</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBox}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7 12A5 5 0 107 2a5 5 0 000 10zM14 14l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search franchises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            Add franchise
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Left Column - Stats */}
        <div className={styles.column}>
          {/* Network Overview */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Network overview</div>
            <div className={styles.cardContent}>
              <div className={styles.bigMetric}>
                <span className={styles.bigValue}>{stats.avgHealth}</span>
                <span className={styles.bigUnit}>%</span>
              </div>
              <div className={styles.metricLabel}>Average health score</div>
              <div className={styles.divider} />
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{stats.totalFranchises}</span>
                  <span className={styles.statLabel}>Total</span>
                </div>
                <div className={styles.statItem}>
                  <span className={`${styles.statValue} ${styles.active}`}>{stats.activeFranchises}</span>
                  <span className={styles.statLabel}>Active</span>
                </div>
                <div className={styles.statItem}>
                  <span className={`${styles.statValue} ${styles.warning}`}>{stats.warningFranchises}</span>
                  <span className={styles.statLabel}>Warning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Summary */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Fleet summary</div>
            <div className={styles.cardContent}>
              <div className={styles.fleetRow}>
                <span className={styles.fleetLabel}>Total drivers</span>
                <span className={styles.fleetValue}>{stats.totalDrivers}</span>
              </div>
              <div className={styles.fleetRow}>
                <span className={styles.fleetLabel}>Today's deliveries</span>
                <span className={styles.fleetValue}>{stats.todayDeliveries.toLocaleString()}</span>
              </div>
              <div className={styles.fleetRow}>
                <span className={styles.fleetLabel}>Monthly revenue</span>
                <span className={styles.fleetValue}>{formatCurrency(stats.monthlyRevenue)}</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Filters</div>
            <div className={styles.cardContent}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Status</label>
                <div className={styles.filterButtons}>
                  {['all', 'active', 'warning'].map((status) => (
                    <button
                      key={status}
                      className={`${styles.filterBtn} ${filterStatus === status ? styles.active : ''}`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="health">Health score</option>
                  <option value="revenue">Revenue</option>
                  <option value="deliveries">Deliveries</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Center + Right - Franchise List */}
        <div className={styles.wideColumn}>
          <div className={styles.tallCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Franchises</span>
              <span className={`${styles.pill} ${styles.pillGray}`}>{filteredFranchises.length}</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.franchiseList}>
                {filteredFranchises.map((franchise) => (
                  <div key={franchise.id} className={styles.franchiseItem}>
                    <div className={styles.franchiseMain}>
                      <div className={styles.franchiseHealth}>
                        <div className={`${styles.healthRing} ${getHealthColor(franchise.health)}`}>
                          <span className={styles.healthValue}>{franchise.health}</span>
                        </div>
                      </div>
                      <div className={styles.franchiseInfo}>
                        <div className={styles.franchiseName}>{franchise.name}</div>
                        <div className={styles.franchiseOwner}>{franchise.owner}</div>
                      </div>
                      <div className={`${styles.statusBadge} ${styles[franchise.status]}`}>
                        {franchise.status}
                      </div>
                    </div>
                    <div className={styles.franchiseMetrics}>
                      <div className={styles.franchiseMetric}>
                        <span className={styles.metricValue}>{franchise.deliveries}</span>
                        <span className={styles.metricLabel}>Deliveries</span>
                      </div>
                      <div className={styles.franchiseMetric}>
                        <span className={styles.metricValue}>{formatCurrency(franchise.revenue)}</span>
                        <span className={styles.metricLabel}>Revenue</span>
                      </div>
                      <div className={styles.franchiseMetric}>
                        <span className={styles.metricValue}>{franchise.compliance}%</span>
                        <span className={styles.metricLabel}>Compliance</span>
                      </div>
                      <div className={styles.franchiseMetric}>
                        <span className={styles.metricValue}>{franchise.drivers}</span>
                        <span className={styles.metricLabel}>Drivers</span>
                      </div>
                    </div>
                    <div className={styles.franchiseActions}>
                      <button className={styles.actionBtn}>View details</button>
                      <button className={styles.actionBtn}>Contact</button>
                    </div>
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
