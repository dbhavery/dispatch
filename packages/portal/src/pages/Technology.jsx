/**
 * HQ Portal - Technology Page
 * Infrastructure status, system health, and tech investments
 * Following DESIGN-RULES.md - Dark industrial theme
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Technology.module.css';

// Mock data for development
const MOCK_DATA = {
  systemHealth: {
    uptime: 99.97,
    responseTime: 142,
    errorRate: 0.02,
    activeUsers: 847,
  },
  infrastructure: [
    { name: 'API Gateway', status: 'healthy', uptime: 99.99, region: 'us-east-1' },
    { name: 'Database Cluster', status: 'healthy', uptime: 99.98, region: 'us-east-1' },
    { name: 'Redis Cache', status: 'healthy', uptime: 99.99, region: 'us-east-1' },
    { name: 'CDN', status: 'healthy', uptime: 100, region: 'global' },
    { name: 'Authentication Service', status: 'healthy', uptime: 99.95, region: 'us-east-1' },
    { name: 'Payment Processing', status: 'warning', uptime: 99.89, region: 'us-west-2' },
    { name: 'Notification Service', status: 'healthy', uptime: 99.94, region: 'us-east-1' },
    { name: 'Analytics Pipeline', status: 'healthy', uptime: 99.92, region: 'us-east-1' },
  ],
  deployments: [
    { version: 'v2.4.1', environment: 'Production', timestamp: '2026-01-20 14:32 UTC', status: 'success' },
    { version: 'v2.4.0', environment: 'Production', timestamp: '2026-01-15 10:15 UTC', status: 'success' },
    { version: 'v2.3.9', environment: 'Production', timestamp: '2026-01-08 16:45 UTC', status: 'success' },
    { version: 'v2.3.8', environment: 'Production', timestamp: '2026-01-02 09:22 UTC', status: 'rollback' },
  ],
  techStack: [
    { category: 'Frontend', items: ['React 18', 'Vite', 'CSS Modules', 'React Router v6'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Prisma ORM', 'PostgreSQL'] },
    { category: 'Infrastructure', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform'] },
    { category: 'Monitoring', items: ['DataDog', 'Sentry', 'PagerDuty', 'Grafana'] },
  ],
  initiatives: [
    { name: 'AI Route Optimization', status: 'in_progress', progress: 78, eta: 'Q1 2026' },
    { name: 'Real-time GPS Tracking v2', status: 'in_progress', progress: 45, eta: 'Q2 2026' },
    { name: 'Mobile App Redesign', status: 'planning', progress: 15, eta: 'Q2 2026' },
    { name: 'Multi-tenant Architecture', status: 'completed', progress: 100, eta: 'Completed' },
  ],
  metrics: {
    apiCalls: 4.2, // million/day
    dataProcessed: 847, // GB/day
    activeConnections: 12400,
    cacheHitRate: 94.7,
  },
};

export default function Technology() {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('infrastructure');

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#22c55e';
      case 'warning': return '#eab308';
      case 'critical': return '#ef4444';
      case 'success': return '#22c55e';
      case 'rollback': return '#ef4444';
      case 'in_progress': return '#3b82f6';
      case 'planning': return '#8b5cf6';
      case 'completed': return '#22c55e';
      default: return '#6b7280';
    }
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
            <h1 className={styles.pageTitle}>Technology</h1>
            <p className={styles.pageSubtitle}>Infrastructure, deployments, and system health</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.tabSelector}>
            {['infrastructure', 'deployments', 'initiatives'].map((tab) => (
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

      <main className={styles.main}>
        {/* Left Column - System Health */}
        <div className={styles.leftColumn}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>System Health</h3>
            <div className={styles.healthScore}>
              <div className={styles.healthRing} style={{ '--score': data.systemHealth.uptime }}>
                <span className={styles.healthValue}>{data.systemHealth.uptime}%</span>
              </div>
              <span className={styles.healthLabel}>Uptime (30d)</span>
            </div>
            <div className={styles.healthMetrics}>
              <div className={styles.healthMetric}>
                <span className={styles.metricValue}>{data.systemHealth.responseTime}ms</span>
                <span className={styles.metricLabel}>Avg Response</span>
              </div>
              <div className={styles.healthMetric}>
                <span className={styles.metricValue}>{data.systemHealth.errorRate}%</span>
                <span className={styles.metricLabel}>Error Rate</span>
              </div>
              <div className={styles.healthMetric}>
                <span className={styles.metricValue}>{data.systemHealth.activeUsers}</span>
                <span className={styles.metricLabel}>Active Users</span>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Key Metrics</h3>
            <div className={styles.metricsList}>
              <div className={styles.metricItem}>
                <span className={styles.metricIcon}>📡</span>
                <div className={styles.metricInfo}>
                  <span className={styles.metricItemValue}>{data.metrics.apiCalls}M</span>
                  <span className={styles.metricItemLabel}>API Calls/Day</span>
                </div>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricIcon}>💾</span>
                <div className={styles.metricInfo}>
                  <span className={styles.metricItemValue}>{data.metrics.dataProcessed} GB</span>
                  <span className={styles.metricItemLabel}>Data/Day</span>
                </div>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricIcon}>🔗</span>
                <div className={styles.metricInfo}>
                  <span className={styles.metricItemValue}>{data.metrics.activeConnections.toLocaleString()}</span>
                  <span className={styles.metricItemLabel}>Connections</span>
                </div>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricIcon}>⚡</span>
                <div className={styles.metricInfo}>
                  <span className={styles.metricItemValue}>{data.metrics.cacheHitRate}%</span>
                  <span className={styles.metricItemLabel}>Cache Hit</span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Tech Stack</h3>
            <div className={styles.stackList}>
              {data.techStack.map((stack) => (
                <div key={stack.category} className={styles.stackCategory}>
                  <span className={styles.stackCategoryName}>{stack.category}</span>
                  <div className={styles.stackItems}>
                    {stack.items.map((item) => (
                      <span key={item} className={styles.stackItem}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Center Column - Main Content */}
        <div className={styles.centerColumn}>
          {activeTab === 'infrastructure' && (
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Infrastructure Status</h3>
              <div className={styles.infrastructureList}>
                {data.infrastructure.map((service) => (
                  <div key={service.name} className={styles.serviceItem}>
                    <div className={styles.serviceStatus} style={{ backgroundColor: getStatusColor(service.status) }} />
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceName}>{service.name}</span>
                      <span className={styles.serviceRegion}>{service.region}</span>
                    </div>
                    <div className={styles.serviceUptime}>
                      <span className={styles.uptimeValue}>{service.uptime}%</span>
                      <span className={styles.uptimeLabel}>uptime</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'deployments' && (
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Recent Deployments</h3>
              <div className={styles.deploymentList}>
                {data.deployments.map((deploy, index) => (
                  <div key={index} className={styles.deploymentItem}>
                    <div className={styles.deploymentVersion}>
                      <span className={styles.versionBadge}>{deploy.version}</span>
                      <span className={styles.deploymentEnv}>{deploy.environment}</span>
                    </div>
                    <span className={styles.deploymentTime}>{deploy.timestamp}</span>
                    <span className={styles.deploymentStatus} style={{ color: getStatusColor(deploy.status) }}>
                      {deploy.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'initiatives' && (
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Tech Initiatives</h3>
              <div className={styles.initiativesList}>
                {data.initiatives.map((initiative) => (
                  <div key={initiative.name} className={styles.initiativeItem}>
                    <div className={styles.initiativeHeader}>
                      <span className={styles.initiativeName}>{initiative.name}</span>
                      <span className={styles.initiativeStatus} style={{ color: getStatusColor(initiative.status) }}>
                        {initiative.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className={styles.initiativeProgress}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${initiative.progress}%`, backgroundColor: getStatusColor(initiative.status) }}
                        />
                      </div>
                      <span className={styles.progressValue}>{initiative.progress}%</span>
                    </div>
                    <span className={styles.initiativeEta}>ETA: {initiative.eta}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Quick Actions */}
        <div className={styles.rightColumn}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Quick Actions</h3>
            <div className={styles.actionsList}>
              <button className={styles.actionBtn}>View Logs</button>
              <button className={styles.actionBtn}>Run Diagnostics</button>
              <button className={styles.actionBtn}>Deploy to Staging</button>
              <button className={styles.actionBtn}>Scale Resources</button>
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Alerts</h3>
            <div className={styles.alertsList}>
              <div className={styles.alertItem}>
                <span className={styles.alertDot} style={{ backgroundColor: '#eab308' }} />
                <div className={styles.alertInfo}>
                  <span className={styles.alertTitle}>Payment Processing</span>
                  <span className={styles.alertDesc}>High latency detected</span>
                </div>
              </div>
              <div className={styles.alertItem}>
                <span className={styles.alertDot} style={{ backgroundColor: '#22c55e' }} />
                <div className={styles.alertInfo}>
                  <span className={styles.alertTitle}>SSL Certificate</span>
                  <span className={styles.alertDesc}>Renewed successfully</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
