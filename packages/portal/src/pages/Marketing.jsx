/**
 * HQ Portal - Marketing Command Center
 * Campaigns, leads, and analytics (99% automated)
 * Dark industrial theme following DESIGN-RULES.md
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Marketing.module.css';

// Mock data - will be replaced by API
const MOCK_DATA = {
  overview: {
    activeCampaigns: 12,
    newLeads: 847,
    conversionRate: 4.2,
    customerAcquisitionCost: 127,
    monthlyAdSpend: 45600,
    leadQualityScore: 87.3
  },
  campaigns: [
    { id: 1, name: 'Facebook - Territory Expansion', platform: 'Meta', status: 'active', spend: 12500, leads: 234, cpl: 53.42, conversions: 12 },
    { id: 2, name: 'Google Search - Fuel Delivery', platform: 'Google', status: 'active', spend: 8900, leads: 156, cpl: 57.05, conversions: 8 },
    { id: 3, name: 'LinkedIn - B2B Fleet', platform: 'LinkedIn', status: 'active', spend: 6200, leads: 89, cpl: 69.66, conversions: 5 },
    { id: 4, name: 'YouTube - Brand Awareness', platform: 'YouTube', status: 'active', spend: 4500, leads: 67, cpl: 67.16, conversions: 3 },
    { id: 5, name: 'Instagram - Residential', platform: 'Meta', status: 'paused', spend: 3200, leads: 98, cpl: 32.65, conversions: 4 },
    { id: 6, name: 'TikTok - Gen Z Awareness', platform: 'TikTok', status: 'active', spend: 2800, leads: 124, cpl: 22.58, conversions: 2 },
  ],
  recentLeads: [
    { id: 1, name: 'ABC Logistics Corp', type: 'B2B Fleet', source: 'Google', score: 94, status: 'qualified', date: '2h ago' },
    { id: 2, name: 'Johnson Family Trust', type: 'Investor', source: 'LinkedIn', score: 89, status: 'contacted', date: '3h ago' },
    { id: 3, name: 'Metro Construction LLC', type: 'B2B Fleet', source: 'Referral', score: 87, status: 'new', date: '4h ago' },
    { id: 4, name: 'Sarah Mitchell', type: 'Franchise', source: 'Facebook', score: 82, status: 'qualified', date: '5h ago' },
    { id: 5, name: 'Sunrise Farms Inc', type: 'B2B Bulk', source: 'Google', score: 78, status: 'new', date: '6h ago' },
  ],
  channelPerformance: [
    { channel: 'Paid Search', leads: 423, spend: 18500, roi: 3.2 },
    { channel: 'Social Media', leads: 298, spend: 12200, roi: 2.8 },
    { channel: 'Email', leads: 156, spend: 800, roi: 12.4 },
    { channel: 'Referral', leads: 89, spend: 0, roi: null },
    { channel: 'Organic', leads: 67, spend: 0, roi: null },
  ],
  automationStats: {
    emailSequences: 24,
    activeNurtures: 1847,
    autoResponses: 99.2,
    avgResponseTime: '< 2 min'
  }
};

export default function Marketing() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('mtd');
  const data = MOCK_DATA;

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
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
            <h1 className={styles.pageTitle}>Marketing</h1>
            <p className={styles.pageSubtitle}>Campaigns, leads, and analytics (99% automated)</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.periodSelector}>
            {['today', 'wtd', 'mtd', 'qtd', 'ytd'].map((p) => (
              <button
                key={p}
                className={`${styles.periodBtn} ${period === p ? styles.active : ''}`}
                onClick={() => setPeriod(p)}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main 3-Column Grid */}
      <main className={styles.main}>
        {/* LEFT COLUMN - Metrics & Channels */}
        <div className={styles.column}>
          {/* Lead Metrics */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Lead metrics</div>
            <div className={styles.cardContent}>
              <div className={styles.bigMetric}>
                <span className={styles.bigValue}>{data.overview.newLeads}</span>
                <span className={`${styles.trend} ${styles.up}`}>+18.4%</span>
              </div>
              <div className={styles.metricLabel}>New leads this month</div>
              <div className={styles.divider}></div>
              <div className={styles.metricGrid}>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.conversionRate}%</span>
                  <span className={styles.metricName}>Conversion rate</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>${data.overview.customerAcquisitionCost}</span>
                  <span className={styles.metricName}>Acquisition cost</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{data.overview.leadQualityScore}%</span>
                  <span className={styles.metricName}>Lead quality</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>{formatCurrency(data.overview.monthlyAdSpend)}</span>
                  <span className={styles.metricName}>Ad spend</span>
                </div>
              </div>
            </div>
          </div>

          {/* Channel Performance */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Channel performance</div>
            <div className={styles.cardContent}>
              <div className={styles.chartPlaceholder}>
                {data.channelPerformance.map((channel, i) => (
                  <div key={i} className={styles.breakdownItem}>
                    <div className={styles.breakdownBar}>
                      <div
                        className={`${styles.breakdownFill} ${
                          i === 0 ? styles.fillGreen :
                          i === 1 ? styles.fillBlue :
                          i === 2 ? styles.fillYellow :
                          styles.fillGray
                        }`}
                        style={{ width: `${(channel.leads / 423) * 100}%` }}
                      />
                    </div>
                    <div className={styles.breakdownLabel}>
                      <span>{channel.channel}</span>
                      <span>{channel.leads} leads {channel.roi ? `(${channel.roi}x ROI)` : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Automation Stats */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Automation health</div>
            <div className={styles.cardContent}>
              <div className={styles.automationGrid}>
                <div className={styles.automationItem}>
                  <div className={styles.automationValue}>{data.automationStats.emailSequences}</div>
                  <div className={styles.automationLabel}>Active sequences</div>
                </div>
                <div className={styles.automationItem}>
                  <div className={styles.automationValue}>{data.automationStats.activeNurtures.toLocaleString()}</div>
                  <div className={styles.automationLabel}>In nurture</div>
                </div>
                <div className={styles.automationItem}>
                  <div className={styles.automationValue}>{data.automationStats.autoResponses}%</div>
                  <div className={styles.automationLabel}>Auto-responded</div>
                </div>
                <div className={styles.automationItem}>
                  <div className={styles.automationValue}>{data.automationStats.avgResponseTime}</div>
                  <div className={styles.automationLabel}>Avg response</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Quick actions</div>
            <div className={styles.cardContent}>
              <div className={styles.actionsColumn}>
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}>
                  Create campaign
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnFull}`}>
                  Export leads
                </button>
                <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnFull}`}>
                  View analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - Campaigns */}
        <div className={styles.column}>
          {/* Active Campaigns */}
          <div className={styles.tallCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Active campaigns</span>
              <span className={`${styles.pill} ${styles.pillGray}`}>{data.overview.activeCampaigns}</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Campaign</th>
                      <th>Platform</th>
                      <th>Status</th>
                      <th className={styles.alignRight}>Spend</th>
                      <th className={styles.alignRight}>Leads</th>
                      <th className={styles.alignRight}>CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td className={styles.campaignName}>{campaign.name}</td>
                        <td>
                          <span className={`${styles.platformBadge} ${styles[campaign.platform.toLowerCase()]}`}>
                            {campaign.platform}
                          </span>
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[campaign.status]}`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className={`${styles.alignRight} ${styles.spendValue}`}>
                          {formatCurrency(campaign.spend)}
                        </td>
                        <td className={`${styles.alignRight} ${styles.leadsValue}`}>
                          {campaign.leads}
                        </td>
                        <td className={`${styles.alignRight} ${styles.cplValue}`}>
                          ${campaign.cpl.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Leads & Activity */}
        <div className={styles.column}>
          {/* Recent Leads */}
          <div className={styles.tallCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Recent leads</span>
              <button className={styles.viewAllBtn}>View all</button>
            </div>
            <div className={styles.cardContent}>
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className={styles.leadItem}>
                  <div className={styles.leadInfo}>
                    <div className={styles.leadName}>{lead.name}</div>
                    <div className={styles.leadMeta}>
                      <span className={`${styles.leadType} ${styles[lead.type.toLowerCase().replace(/\s+/g, '')]}`}>
                        {lead.type}
                      </span>
                      <span className={styles.leadSource}>{lead.source}</span>
                    </div>
                  </div>
                  <div className={styles.leadRight}>
                    <div className={styles.leadScore}>
                      <span className={styles.scoreValue}>{lead.score}</span>
                    </div>
                    <span className={`${styles.leadStatus} ${styles[lead.status]}`}>
                      {lead.status}
                    </span>
                    <span className={styles.leadDate}>{lead.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Score Distribution */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Lead score distribution</div>
            <div className={styles.cardContent}>
              <div className={styles.scoreDistribution}>
                <div className={styles.scoreBar}>
                  <div className={styles.scoreSegment} style={{ width: '15%', background: '#22c55e' }}></div>
                  <div className={styles.scoreSegment} style={{ width: '35%', background: '#eab308' }}></div>
                  <div className={styles.scoreSegment} style={{ width: '30%', background: '#f97316' }}></div>
                  <div className={styles.scoreSegment} style={{ width: '20%', background: '#ef4444' }}></div>
                </div>
                <div className={styles.scoreLegend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#22c55e' }}></span>
                    <span>90+ Hot</span>
                    <span className={styles.legendValue}>127</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#eab308' }}></span>
                    <span>70-89 Warm</span>
                    <span className={styles.legendValue}>298</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#f97316' }}></span>
                    <span>50-69 Cool</span>
                    <span className={styles.legendValue}>254</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#ef4444' }}></span>
                    <span>&lt;50 Cold</span>
                    <span className={styles.legendValue}>168</span>
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
