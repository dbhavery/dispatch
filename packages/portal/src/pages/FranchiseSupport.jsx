/**
 * HQ Portal - Franchise Support Page
 * Support tickets, training, and franchise assistance
 * Following DESIGN-RULES.md - Dark industrial theme
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FranchiseSupport.module.css';

// Mock data for development
const MOCK_DATA = {
  overview: {
    openTickets: 24,
    avgResponseTime: '2.4 hours',
    satisfactionScore: 94.2,
    resolvedThisWeek: 87,
  },
  tickets: [
    { id: 'TKT-1847', franchise: 'Dallas-Fort Worth', subject: 'POS system sync issue', priority: 'high', status: 'open', created: '2h ago' },
    { id: 'TKT-1846', franchise: 'Houston Metro', subject: 'Driver app crash on Android', priority: 'critical', status: 'in_progress', created: '4h ago' },
    { id: 'TKT-1845', franchise: 'Phoenix', subject: 'Billing report discrepancy', priority: 'medium', status: 'open', created: '6h ago' },
    { id: 'TKT-1844', franchise: 'San Antonio', subject: 'New employee onboarding help', priority: 'low', status: 'open', created: '8h ago' },
    { id: 'TKT-1843', franchise: 'Austin', subject: 'Marketing materials request', priority: 'low', status: 'in_progress', created: '1d ago' },
    { id: 'TKT-1842', franchise: 'Denver', subject: 'Equipment maintenance scheduling', priority: 'medium', status: 'resolved', created: '1d ago' },
  ],
  trainingModules: [
    { name: 'New Franchisee Onboarding', completionRate: 92, enrolled: 12 },
    { name: 'Driver Safety Certification', completionRate: 87, enrolled: 186 },
    { name: 'POS System Basics', completionRate: 95, enrolled: 47 },
    { name: 'Customer Service Excellence', completionRate: 78, enrolled: 89 },
    { name: 'Compliance & Regulations', completionRate: 84, enrolled: 47 },
  ],
  resources: [
    { name: 'Operations Manual', type: 'PDF', downloads: 234, lastUpdated: 'Jan 15, 2026' },
    { name: 'Brand Guidelines', type: 'PDF', downloads: 189, lastUpdated: 'Jan 10, 2026' },
    { name: 'Equipment Specs', type: 'PDF', downloads: 156, lastUpdated: 'Jan 8, 2026' },
    { name: 'Marketing Templates', type: 'ZIP', downloads: 312, lastUpdated: 'Jan 5, 2026' },
  ],
  recentActivity: [
    { action: 'Ticket resolved', detail: 'TKT-1842 - Denver equipment scheduling', time: '30m ago' },
    { action: 'Training completed', detail: 'Phoenix - Driver Safety Certification', time: '1h ago' },
    { action: 'Resource downloaded', detail: 'Operations Manual - San Antonio', time: '2h ago' },
    { action: 'New ticket', detail: 'TKT-1847 - Dallas POS sync issue', time: '2h ago' },
  ],
};

export default function FranchiseSupport() {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [activeTab, setActiveTab] = useState('tickets');
  const [ticketFilter, setTicketFilter] = useState('all');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#3b82f6';
      case 'in_progress': return '#eab308';
      case 'resolved': return '#22c55e';
      case 'closed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const filteredTickets = ticketFilter === 'all'
    ? data.tickets
    : data.tickets.filter((t) => t.status === ticketFilter);

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
            <h1 className={styles.pageTitle}>Franchise Support</h1>
            <p className={styles.pageSubtitle}>Tickets, training, and franchise assistance</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.tabSelector}>
            {['tickets', 'training', 'resources'].map((tab) => (
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
        {/* Left Column - Overview */}
        <div className={styles.leftColumn}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Support Overview</h3>
            <div className={styles.overviewStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{data.overview.openTickets}</span>
                <span className={styles.statLabel}>Open Tickets</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{data.overview.avgResponseTime}</span>
                <span className={styles.statLabel}>Avg Response</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{data.overview.satisfactionScore}%</span>
                <span className={styles.statLabel}>Satisfaction</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{data.overview.resolvedThisWeek}</span>
                <span className={styles.statLabel}>Resolved/Week</span>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Recent Activity</h3>
            <div className={styles.activityList}>
              {data.recentActivity.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <div className={styles.activityInfo}>
                    <span className={styles.activityAction}>{activity.action}</span>
                    <span className={styles.activityDetail}>{activity.detail}</span>
                  </div>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Quick Actions</h3>
            <div className={styles.actionsList}>
              <button className={styles.actionBtn}>Create Ticket</button>
              <button className={styles.actionBtn}>Send Announcement</button>
              <button className={styles.actionBtn}>Schedule Training</button>
              <button className={styles.actionBtn}>Upload Resource</button>
            </div>
          </section>
        </div>

        {/* Center Column - Main Content */}
        <div className={styles.centerColumn}>
          {activeTab === 'tickets' && (
            <section className={styles.card}>
              <div className={styles.ticketHeader}>
                <h3 className={styles.cardTitle}>Support Tickets</h3>
                <div className={styles.filterSelector}>
                  {['all', 'open', 'in_progress', 'resolved'].map((filter) => (
                    <button
                      key={filter}
                      className={`${styles.filterBtn} ${ticketFilter === filter ? styles.active : ''}`}
                      onClick={() => setTicketFilter(filter)}
                    >
                      {filter.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.ticketList}>
                {filteredTickets.map((ticket) => (
                  <div key={ticket.id} className={styles.ticketItem}>
                    <div className={styles.ticketPriority} style={{ backgroundColor: getPriorityColor(ticket.priority) }} />
                    <div className={styles.ticketInfo}>
                      <div className={styles.ticketTop}>
                        <span className={styles.ticketId}>{ticket.id}</span>
                        <span className={styles.ticketFranchise}>{ticket.franchise}</span>
                      </div>
                      <span className={styles.ticketSubject}>{ticket.subject}</span>
                    </div>
                    <div className={styles.ticketMeta}>
                      <span className={styles.ticketStatus} style={{ color: getStatusColor(ticket.status) }}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <span className={styles.ticketTime}>{ticket.created}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'training' && (
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Training Modules</h3>
              <div className={styles.trainingList}>
                {data.trainingModules.map((module) => (
                  <div key={module.name} className={styles.trainingItem}>
                    <div className={styles.trainingInfo}>
                      <span className={styles.trainingName}>{module.name}</span>
                      <span className={styles.trainingEnrolled}>{module.enrolled} enrolled</span>
                    </div>
                    <div className={styles.trainingProgress}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${module.completionRate}%` }}
                        />
                      </div>
                      <span className={styles.progressValue}>{module.completionRate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'resources' && (
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Resource Library</h3>
              <div className={styles.resourceList}>
                {data.resources.map((resource) => (
                  <div key={resource.name} className={styles.resourceItem}>
                    <div className={styles.resourceIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                      </svg>
                    </div>
                    <div className={styles.resourceInfo}>
                      <span className={styles.resourceName}>{resource.name}</span>
                      <span className={styles.resourceMeta}>{resource.type} • {resource.downloads} downloads • Updated {resource.lastUpdated}</span>
                    </div>
                    <button className={styles.downloadBtn}>Download</button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Priority Breakdown</h3>
            <div className={styles.priorityList}>
              <div className={styles.priorityItem}>
                <span className={styles.priorityDot} style={{ backgroundColor: '#ef4444' }} />
                <span className={styles.priorityLabel}>Critical</span>
                <span className={styles.priorityCount}>1</span>
              </div>
              <div className={styles.priorityItem}>
                <span className={styles.priorityDot} style={{ backgroundColor: '#f97316' }} />
                <span className={styles.priorityLabel}>High</span>
                <span className={styles.priorityCount}>3</span>
              </div>
              <div className={styles.priorityItem}>
                <span className={styles.priorityDot} style={{ backgroundColor: '#eab308' }} />
                <span className={styles.priorityLabel}>Medium</span>
                <span className={styles.priorityCount}>8</span>
              </div>
              <div className={styles.priorityItem}>
                <span className={styles.priorityDot} style={{ backgroundColor: '#22c55e' }} />
                <span className={styles.priorityLabel}>Low</span>
                <span className={styles.priorityCount}>12</span>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Top Requests</h3>
            <div className={styles.topRequestsList}>
              <div className={styles.topRequestItem}>
                <span className={styles.topRequestRank}>1</span>
                <span className={styles.topRequestText}>POS/Technical Issues</span>
                <span className={styles.topRequestCount}>34%</span>
              </div>
              <div className={styles.topRequestItem}>
                <span className={styles.topRequestRank}>2</span>
                <span className={styles.topRequestText}>Training Requests</span>
                <span className={styles.topRequestCount}>22%</span>
              </div>
              <div className={styles.topRequestItem}>
                <span className={styles.topRequestRank}>3</span>
                <span className={styles.topRequestText}>Marketing Support</span>
                <span className={styles.topRequestCount}>18%</span>
              </div>
              <div className={styles.topRequestItem}>
                <span className={styles.topRequestRank}>4</span>
                <span className={styles.topRequestText}>Billing Questions</span>
                <span className={styles.topRequestCount}>14%</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
