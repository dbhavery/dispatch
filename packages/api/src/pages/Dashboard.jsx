/**
 * Dispatch Dashboard - v2.0 Design System Demo
 * Premium industrial control interface
 * Created: 2026-01-17
 */

import styles from './Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>
            <span className={styles.logoSt}>Dis</span>
            <span className={styles.logoFull}>patch</span>
          </span>
          <span className={styles.portalBadge}>HQ Portal</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Admin User</div>
            <div className={styles.userRole}>Administrator</div>
          </div>
        </div>
      </header>

      {/* Main 3-Column Grid */}
      <main className={styles.main}>
        {/* LEFT COLUMN - Design System */}
        <div className={styles.column}>
          {/* Color Palette */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Color palette</div>
            <div className={styles.cardContent}>
              <div className={styles.colorGrid}>
                <div className={styles.colorSwatch} style={{ background: '#a30000' }}>
                  <span className={styles.colorLabel}>Red</span>
                </div>
                <div className={styles.colorSwatch} style={{ background: '#487800' }}>
                  <span className={styles.colorLabel}>Diesel</span>
                </div>
                <div className={styles.colorSwatch} style={{ background: '#fff34a' }}>
                  <span className={styles.colorLabel} style={{ color: '#000' }}>Regular</span>
                </div>
                <div className={styles.colorSwatch} style={{ background: '#4371ba' }}>
                  <span className={styles.colorLabel}>DEF</span>
                </div>
                <div className={styles.colorSwatch} style={{ background: '#22c55e' }}>
                  <span className={styles.colorLabel}>Success</span>
                </div>
                <div className={styles.colorSwatch} style={{ background: '#eab308' }}>
                  <span className={styles.colorLabel}>Warning</span>
                </div>
                <div className={styles.colorSwatch} style={{ background: '#ef4444' }}>
                  <span className={styles.colorLabel}>Error</span>
                </div>
                <div className={styles.colorSwatch} style={{ background: '#3b82f6' }}>
                  <span className={styles.colorLabel}>Info</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Typography</div>
            <div className={styles.cardContent}>
              <div className={styles.typeHeading}>Heading Bold</div>
              <div className={styles.typeSubheading}>Subheading Semibold</div>
              <div className={styles.typeBody}>Body text in regular weight</div>
              <div className={styles.typeMuted}>Muted helper text</div>
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Buttons</div>
            <div className={styles.cardContent}>
              <div className={styles.buttonsRow}>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  Schedule
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  Save
                </button>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.buttonsRow}>
                <button className={`${styles.btn} ${styles.btnOutline}`}>
                  View all
                </button>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Status indicators</div>
            <div className={styles.cardContent}>
              <div className={styles.buttonsRow}>
                <span className={`${styles.pill} ${styles.pillRed}`}>Urgent</span>
                <span className={`${styles.pill} ${styles.pillGreen}`}>Paid</span>
                <span className={`${styles.pill} ${styles.pillYellow}`}>Pending</span>
                <span className={`${styles.pill} ${styles.pillBlue}`}>Info</span>
              </div>
            </div>
          </div>

          {/* Spacing Scale - Expands to fill */}
          <div className={styles.expandCard}>
            <div className={styles.cardTitle}>Spacing scale</div>
            <div className={styles.cardContent}>
              <div className={styles.spacingScale}>
                {[4, 6, 10, 14, 18, 30, 45, 90].map((size) => (
                  <div key={size} style={{ textAlign: 'center' }}>
                    <div
                      className={styles.spacingBar}
                      style={{ height: `${size}px` }}
                    />
                    <div className={styles.spacingLabel}>{size}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - Main Content */}
        <div className={styles.column}>
          {/* Map Card */}
          <div className={styles.mapCard}>
            <div className={styles.mapSurface}>
              {/* Map Pin */}
              <div className={styles.mapPin}>
                <div className={styles.mapPinInner}>
                  <div className={styles.mapPinDot}></div>
                </div>
              </div>

              {/* Overlay */}
              <div className={styles.mapOverlay}>
                <div className={styles.mapTitle}>Next stop</div>
                <div className={styles.mapAddress}>9236 Riverview Drive</div>
                <div className={styles.mapActions}>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    Confirm arrival
                  </button>
                  <button className={`${styles.btn} ${styles.btnSecondary}`}>
                    Get directions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Row */}
          <div className={styles.card}>
            <div className={styles.kpiRow}>
              <div className={styles.kpiItem}>
                <div className={styles.kpiValue}>47</div>
                <div className={styles.kpiLabel}>Deliveries today</div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiValue}>12</div>
                <div className={styles.kpiLabel}>Active drivers</div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiValue}>$84.2k</div>
                <div className={styles.kpiLabel}>Revenue</div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiValue}>98.4%</div>
                <div className={styles.kpiLabel}>On-time rate</div>
              </div>
            </div>
          </div>

          {/* 2x2 Grid for center content */}
          <div className={styles.centerGrid}>
            {/* Recent Transactions */}
            <div className={styles.card}>
              <div className={styles.cardTitle}>Recent transactions</div>
              <div className={styles.cardContent}>
                <div className={styles.listItem}>
                  <div className={styles.listIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M2 8h12M2 12h8" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.listContent}>
                    <div className={styles.listTitle}>ABC Construction Co.</div>
                    <div className={styles.listSubtitle}>750 gal Diesel</div>
                  </div>
                  <div className={styles.listValue}>$2,847.50</div>
                </div>
                <div className={styles.listItem}>
                  <div className={styles.listIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M2 8h12M2 12h8" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.listContent}>
                    <div className={styles.listTitle}>Metro Logistics LLC</div>
                    <div className={styles.listSubtitle}>500 gal Regular</div>
                  </div>
                  <div className={styles.listValue}>$1,425.00</div>
                </div>
                <div className={styles.listItem}>
                  <div className={styles.listIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M2 8h12M2 12h8" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.listContent}>
                    <div className={styles.listTitle}>Riverside Farms</div>
                    <div className={styles.listSubtitle}>300 gal Diesel + DEF</div>
                  </div>
                  <div className={styles.listValue}>$1,156.80</div>
                </div>
                <div className={styles.listItem}>
                  <div className={styles.listIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M2 8h12M2 12h8" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.listContent}>
                    <div className={styles.listTitle}>Pacific Freight</div>
                    <div className={styles.listSubtitle}>400 gal Diesel</div>
                  </div>
                  <div className={styles.listValue}>$1,520.00</div>
                </div>
              </div>
            </div>

            {/* Top Drivers */}
            <div className={styles.card}>
              <div className={styles.cardTitle}>Top drivers</div>
              <div className={styles.cardContent}>
                {[
                  { name: 'Marcus Johnson', initials: 'MJ', score: 47 },
                  { name: 'Sarah Chen', initials: 'SC', score: 43 },
                  { name: 'David Rodriguez', initials: 'DR', score: 39 },
                  { name: 'Emily Watson', initials: 'EW', score: 36 },
                  { name: 'James Kim', initials: 'JK', score: 32 },
                ].map((driver, i) => (
                  <div key={driver.name} className={styles.leaderItem}>
                    <span className={styles.leaderRank}>{i + 1}</span>
                    <div className={styles.leaderAvatar}>{driver.initials}</div>
                    <span className={styles.leaderName}>{driver.name}</span>
                    <span className={styles.leaderScore}>{driver.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className={styles.card}>
              <div className={styles.cardTitle}>Today's schedule</div>
              <div className={styles.cardContent}>
                <div className={styles.scheduleItem}>
                  <div className={styles.scheduleTime}>08:00</div>
                  <div className={styles.scheduleContent}>
                    <div className={styles.scheduleTitle}>Morning dispatch</div>
                    <div className={styles.scheduleDesc}>12 trucks departing</div>
                  </div>
                </div>
                <div className={styles.scheduleItem}>
                  <div className={styles.scheduleTime}>10:30</div>
                  <div className={styles.scheduleContent}>
                    <div className={styles.scheduleTitle}>ABC Construction</div>
                    <div className={styles.scheduleDesc}>750 gal Diesel delivery</div>
                  </div>
                </div>
                <div className={styles.scheduleItem}>
                  <div className={styles.scheduleTime}>13:00</div>
                  <div className={styles.scheduleContent}>
                    <div className={styles.scheduleTitle}>Fleet maintenance</div>
                    <div className={styles.scheduleDesc}>T-204, T-207 scheduled</div>
                  </div>
                </div>
                <div className={styles.scheduleItem}>
                  <div className={styles.scheduleTime}>15:45</div>
                  <div className={styles.scheduleContent}>
                    <div className={styles.scheduleTitle}>Metro Logistics</div>
                    <div className={styles.scheduleDesc}>500 gal Regular delivery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className={styles.card}>
              <div className={styles.cardTitle}>Top customers</div>
              <div className={styles.cardContent}>
                {[
                  { name: 'ABC Construction', type: 'Commercial', balance: '$12,450', initials: 'AC' },
                  { name: 'Metro Logistics', type: 'Fleet', balance: '$8,320', initials: 'ML' },
                  { name: 'Riverside Farms', type: 'Agricultural', balance: '$6,180', initials: 'RF' },
                  { name: 'Pacific Freight', type: 'Fleet', balance: '$5,940', initials: 'PF' },
                ].map((customer) => (
                  <div key={customer.name} className={styles.customerItem}>
                    <div className={styles.customerAvatar}>{customer.initials}</div>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>{customer.name}</div>
                      <div className={styles.customerType}>{customer.type}</div>
                    </div>
                    <div className={styles.customerBalance}>
                      <div className={styles.customerBalanceValue}>{customer.balance}</div>
                      <div className={styles.customerBalanceLabel}>This month</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Status & Alerts */}
        <div className={styles.column}>
          {/* Fuel Inventory */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Fuel inventory</div>
            <div className={styles.cardContent}>
              <div className={styles.fuelItem}>
                <div className={styles.fuelHeader}>
                  <span className={styles.fuelLabel}>Diesel</span>
                  <span className={styles.fuelValue}>72%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${styles.progressGreen}`}
                    style={{ width: '72%' }}
                  />
                </div>
              </div>
              <div className={styles.fuelItem}>
                <div className={styles.fuelHeader}>
                  <span className={styles.fuelLabel}>Regular</span>
                  <span className={styles.fuelValue}>45%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${styles.progressYellow}`}
                    style={{ width: '45%' }}
                  />
                </div>
              </div>
              <div className={styles.fuelItem}>
                <div className={styles.fuelHeader}>
                  <span className={styles.fuelLabel}>Premium</span>
                  <span className={styles.fuelValue}>18%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${styles.progressRed}`}
                    style={{ width: '18%' }}
                  />
                </div>
              </div>
              <div className={styles.fuelItem}>
                <div className={styles.fuelHeader}>
                  <span className={styles.fuelLabel}>DEF</span>
                  <span className={styles.fuelValue}>89%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${styles.progressBlue}`}
                    style={{ width: '89%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Status */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Fleet status</div>
            <div className={styles.cardContent}>
              <div className={styles.vehicleGrid}>
                <div className={styles.vehicleItem}>
                  <div className={styles.vehicleId}>T-201</div>
                  <div className={styles.vehicleStatus}>
                    <div className={styles.vehicleStatusDot}></div>
                    <span className={styles.vehicleStatusText}>En route</span>
                  </div>
                  <div className={styles.vehicleDriver}>Marcus J.</div>
                </div>
                <div className={styles.vehicleItem}>
                  <div className={styles.vehicleId}>T-202</div>
                  <div className={styles.vehicleStatus}>
                    <div className={styles.vehicleStatusDot}></div>
                    <span className={styles.vehicleStatusText}>Delivering</span>
                  </div>
                  <div className={styles.vehicleDriver}>Sarah C.</div>
                </div>
                <div className={styles.vehicleItem}>
                  <div className={styles.vehicleId}>T-204</div>
                  <div className={styles.vehicleStatus}>
                    <div className={`${styles.vehicleStatusDot} ${styles.idle}`}></div>
                    <span className={styles.vehicleStatusText}>Idle</span>
                  </div>
                  <div className={styles.vehicleDriver}>David R.</div>
                </div>
                <div className={styles.vehicleItem}>
                  <div className={styles.vehicleId}>T-207</div>
                  <div className={styles.vehicleStatus}>
                    <div className={`${styles.vehicleStatusDot} ${styles.offline}`}></div>
                    <span className={styles.vehicleStatusText}>Maintenance</span>
                  </div>
                  <div className={styles.vehicleDriver}>—</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts - Expandable */}
          <div className={styles.tallCard}>
            <div className={styles.cardTitle}>Recent alerts</div>
            <div className={styles.cardContent}>
              <div className={styles.alertItem}>
                <div className={styles.alertDot}></div>
                <div className={styles.alertContent}>
                  <div className={styles.alertText}>Premium fuel below 20% threshold</div>
                  <div className={styles.alertTime}>2 minutes ago</div>
                </div>
              </div>
              <div className={styles.alertItem}>
                <div className={`${styles.alertDot} ${styles.alertDotWarning}`}></div>
                <div className={styles.alertContent}>
                  <div className={styles.alertText}>Driver Marcus J. completed route early</div>
                  <div className={styles.alertTime}>15 minutes ago</div>
                </div>
              </div>
              <div className={styles.alertItem}>
                <div className={styles.alertDot}></div>
                <div className={styles.alertContent}>
                  <div className={styles.alertText}>New order from ABC Construction</div>
                  <div className={styles.alertTime}>32 minutes ago</div>
                </div>
              </div>
              <div className={styles.alertItem}>
                <div className={`${styles.alertDot} ${styles.alertDotWarning}`}></div>
                <div className={styles.alertContent}>
                  <div className={styles.alertText}>Vehicle T-204 maintenance due</div>
                  <div className={styles.alertTime}>1 hour ago</div>
                </div>
              </div>
              <div className={styles.alertItem}>
                <div className={styles.alertDot}></div>
                <div className={styles.alertContent}>
                  <div className={styles.alertText}>Payment received from Metro Logistics</div>
                  <div className={styles.alertTime}>2 hours ago</div>
                </div>
              </div>
              <div className={styles.alertItem}>
                <div className={`${styles.alertDot} ${styles.alertDotWarning}`}></div>
                <div className={styles.alertContent}>
                  <div className={styles.alertText}>Regular fuel inventory below 50%</div>
                  <div className={styles.alertTime}>3 hours ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Quick actions</div>
            <div className={styles.cardContent}>
              <div className={styles.buttonsRow} style={{ flexDirection: 'column', gap: '10px' }}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ width: '100%' }}>
                  New delivery order
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ width: '100%' }}>
                  Schedule resupply
                </button>
                <button className={`${styles.btn} ${styles.btnOutline}`} style={{ width: '100%' }}>
                  View all reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
