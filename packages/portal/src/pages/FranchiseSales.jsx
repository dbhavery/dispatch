/**
 * HQ Portal - Franchise Sales Center
 * Leads, applications, and territory availability
 * Dark industrial theme following DESIGN-RULES.md
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FranchiseSales.module.css';

// Mock data - will be replaced by API
const MOCK_DATA = {
  overview: {
    openTerritories: 156,
    activeApplications: 18,
    pipelineValue: 4200000,
    avgCloseTime: 45,
    conversionRate: 24,
    awardsThisYear: 12
  },
  pipeline: [
    { id: 1, name: 'Michael Torres', territory: 'Phoenix Metro', stage: 'Discovery', value: 350000, daysInStage: 5, score: 92 },
    { id: 2, name: 'Jennifer Adams', territory: 'Salt Lake City', stage: 'Qualification', value: 350000, daysInStage: 12, score: 87 },
    { id: 3, name: 'Robert Kim', territory: 'Sacramento', stage: 'FDD Review', value: 350000, daysInStage: 8, score: 94 },
    { id: 4, name: 'Lisa Chen', territory: 'Portland', stage: 'Discovery Day', value: 350000, daysInStage: 3, score: 89 },
    { id: 5, name: 'David Martinez', territory: 'Albuquerque', stage: 'Contract', value: 350000, daysInStage: 2, score: 96 },
    { id: 6, name: 'Sarah Johnson', territory: 'Tucson', stage: 'Lead', value: 350000, daysInStage: 1, score: 78 },
    { id: 7, name: 'James Wilson', territory: 'Las Vegas', stage: 'Qualification', value: 350000, daysInStage: 7, score: 82 },
    { id: 8, name: 'Emily Brown', territory: 'Boise', stage: 'Discovery', value: 350000, daysInStage: 4, score: 85 },
  ],
  territories: [
    { id: 1, name: 'Phoenix Metro', state: 'AZ', population: 4800000, status: 'available', priority: 'high' },
    { id: 2, name: 'Salt Lake City', state: 'UT', population: 1200000, status: 'reserved', priority: 'high' },
    { id: 3, name: 'Sacramento', state: 'CA', population: 2300000, status: 'pending', priority: 'medium' },
    { id: 4, name: 'Portland', state: 'OR', population: 2500000, status: 'available', priority: 'high' },
    { id: 5, name: 'Las Vegas', state: 'NV', population: 2200000, status: 'available', priority: 'high' },
    { id: 6, name: 'Boise', state: 'ID', population: 750000, status: 'available', priority: 'medium' },
  ],
  stageBreakdown: [
    { stage: 'Lead', count: 24, color: '#6b7280' },
    { stage: 'Discovery', count: 12, color: '#3b82f6' },
    { stage: 'Qualification', count: 8, color: '#8b5cf6' },
    { stage: 'FDD Review', count: 5, color: '#f59e0b' },
    { stage: 'Discovery Day', count: 3, color: '#10b981' },
    { stage: 'Contract', count: 2, color: '#22c55e' },
  ],
  recentActivity: [
    { action: 'Application submitted', detail: 'David Martinez - Albuquerque', time: '2h ago', type: 'success' },
    { action: 'Discovery call scheduled', detail: 'Emily Brown - Boise', time: '4h ago', type: 'info' },
    { action: 'FDD sent', detail: 'Robert Kim - Sacramento', time: '1d ago', type: 'info' },
    { action: 'Discovery Day completed', detail: 'Lisa Chen - Portland', time: '2d ago', type: 'success' },
    { action: 'Lead qualified', detail: 'James Wilson - Las Vegas', time: '3d ago', type: 'info' },
  ]
};

export default function FranchiseSales() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pipeline');
  const [stageFilter, setStageFilter] = useState('all');
  const data = MOCK_DATA;

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  const getStageColor = (stage) => {
    const colors = {
      'Lead': '#6b7280',
      'Discovery': '#3b82f6',
      'Qualification': '#8b5cf6',
      'FDD Review': '#f59e0b',
      'Discovery Day': '#10b981',
      'Contract': '#22c55e'
    };
    return colors[stage] || '#6b7280';
  };

  const filteredPipeline = stageFilter === 'all'
    ? data.pipeline
    : data.pipeline.filter(p => p.stage === stageFilter);

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
            <h1 className={styles.pageTitle}>Franchise Sales</h1>
            <p className={styles.pageSubtitle}>Leads, applications, and territory availability</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.tabSelector}>
            {['pipeline', 'territories'].map((tab) => (
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
          {/* Pipeline Value */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Pipeline value</div>
            <div className={styles.cardContent}>
              <div className={styles.bigMetric}>
                <span className={styles.bigValue}>{formatCurrency(data.overview.pipelineValue)}</span>
              </div>
              <div className={styles.metricLabel}>{data.overview.activeApplications} active applications</div>
              <div className={styles.divider}></div>
              <div className={styles.metricGrid}>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.openTerritories}</span>
                  <span className={styles.metricName}>Open territories</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.avgCloseTime}d</span>
                  <span className={styles.metricName}>Avg close time</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.conversionRate}%</span>
                  <span className={styles.metricName}>Conversion rate</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.awardsThisYear}</span>
                  <span className={styles.metricName}>Awards YTD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline by Stage */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Pipeline by stage</div>
            <div className={styles.cardContent}>
              <div className={styles.stageList}>
                {data.stageBreakdown.map((item, i) => (
                  <button
                    key={i}
                    className={`${styles.stageItem} ${stageFilter === item.stage ? styles.active : ''}`}
                    onClick={() => setStageFilter(stageFilter === item.stage ? 'all' : item.stage)}
                  >
                    <div className={styles.stageInfo}>
                      <div className={styles.stageDot} style={{ background: item.color }}></div>
                      <span className={styles.stageName}>{item.stage}</span>
                    </div>
                    <span className={styles.stageCount}>{item.count}</span>
                  </button>
                ))}
              </div>
              <div className={styles.divider}></div>
              <div className={styles.stageTotal}>
                <span>Total prospects</span>
                <span className={styles.totalValue}>54</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Quick actions</div>
            <div className={styles.cardContent}>
              <div className={styles.actionsColumn}>
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}>
                  Add new lead
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnFull}`}>
                  Schedule Discovery Day
                </button>
                <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnFull}`}>
                  View territory map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - Main Content */}
        <div className={styles.column}>
          {activeTab === 'pipeline' && (
            <div className={styles.tallCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  {stageFilter === 'all' ? 'Sales pipeline' : stageFilter}
                </span>
                <span className={`${styles.pill} ${styles.pillGray}`}>{filteredPipeline.length}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.prospectList}>
                  {filteredPipeline.map((prospect) => (
                    <div key={prospect.id} className={styles.prospectItem}>
                      <div className={styles.prospectHeader}>
                        <div className={styles.prospectInfo}>
                          <div className={styles.prospectName}>{prospect.name}</div>
                          <div className={styles.prospectTerritory}>{prospect.territory}</div>
                        </div>
                        <div className={styles.prospectScore}>
                          <div
                            className={styles.scoreRing}
                            style={{
                              background: `conic-gradient(${getStageColor(prospect.stage)} ${prospect.score * 3.6}deg, rgba(255,255,255,0.1) 0deg)`
                            }}
                          >
                            <span>{prospect.score}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.prospectMeta}>
                        <span
                          className={styles.stageBadge}
                          style={{
                            background: `${getStageColor(prospect.stage)}20`,
                            color: getStageColor(prospect.stage)
                          }}
                        >
                          {prospect.stage}
                        </span>
                        <span className={styles.daysInStage}>{prospect.daysInStage}d in stage</span>
                        <span className={styles.prospectValue}>{formatCurrency(prospect.value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'territories' && (
            <div className={styles.tallCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Available territories</span>
                <span className={`${styles.pill} ${styles.pillGray}`}>{data.overview.openTerritories}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Territory</th>
                        <th>State</th>
                        <th className={styles.alignRight}>Population</th>
                        <th>Priority</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.territories.map((territory) => (
                        <tr key={territory.id}>
                          <td className={styles.territoryName}>{territory.name}</td>
                          <td className={styles.territoryState}>{territory.state}</td>
                          <td className={`${styles.alignRight} ${styles.territoryPop}`}>
                            {(territory.population / 1000000).toFixed(1)}M
                          </td>
                          <td>
                            <span className={`${styles.priorityBadge} ${styles[territory.priority]}`}>
                              {territory.priority}
                            </span>
                          </td>
                          <td>
                            <span className={`${styles.statusBadge} ${styles[territory.status]}`}>
                              {territory.status}
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
          {/* Hot Prospects */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Hot prospects</span>
              <span className={`${styles.pill} ${styles.pillRed}`}>3</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.hotList}>
                {data.pipeline.filter(p => p.score >= 90).slice(0, 3).map((prospect) => (
                  <div key={prospect.id} className={styles.hotItem}>
                    <div className={styles.hotInfo}>
                      <div className={styles.hotName}>{prospect.name}</div>
                      <div className={styles.hotTerritory}>{prospect.territory}</div>
                    </div>
                    <div className={styles.hotRight}>
                      <span
                        className={styles.hotStage}
                        style={{ color: getStageColor(prospect.stage) }}
                      >
                        {prospect.stage}
                      </span>
                      <span className={styles.hotScore}>{prospect.score}</span>
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

          {/* Sales Resources */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Sales resources</div>
            <div className={styles.cardContent}>
              <div className={styles.resourceList}>
                {[
                  { name: 'FDD Document', type: 'PDF' },
                  { name: 'Territory Analysis', type: 'Tool' },
                  { name: 'Pitch Deck', type: 'Slides' },
                  { name: 'Franchise Agreement', type: 'Template' },
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
