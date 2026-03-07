/**
 * Dispatch Franchise Owner Portal
 * Local operator dashboard for managing daily operations, drivers, customers
 * Created: 2026-01-26
 */

import { useState } from 'react';
import styles from './OwnerPortal.module.css';

export default function OwnerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>
            <span className={styles.logoSt}>Dis</span>
            <span className={styles.logoFull}>patch</span>
          </span>
          <span className={styles.portalBadge}>Owner Portal</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Franchise Owner</div>
            <div className={styles.userRole}>North Portland</div>
          </div>
        </div>
      </header>

      {/* Main 3-Column Grid */}
      <main className={styles.main}>
        {/* LEFT COLUMN - Daily Operations */}
        <div className={styles.column}>
          {/* Daily Fill-Ups */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Daily fill-ups</div>
            <div className={styles.cardContent}>
              <div className={styles.mapMini}>
                <div className={styles.mapPlaceholder}>Route Map</div>
              </div>
              <div className={styles.routeStats}>
                <div className={styles.routeStat}>
                  <span className={styles.routeValue}>8</span>
                  <span className={styles.routeLabel}>Stops today</span>
                </div>
                <div className={styles.routeStat}>
                  <span className={styles.routeValue}>62</span>
                  <span className={styles.routeLabel}>Miles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Van Levels */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Van inventory</div>
            <div className={styles.cardContent}>
              <div className={styles.fuelItem}>
                <div className={styles.fuelHeader}>
                  <span className={styles.fuelLabel}>Gasoline</span>
                  <span className={styles.fuelValue}>800 lbs</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={`${styles.progressFill} ${styles.progressYellow}`} style={{ width: '80%' }} />
                </div>
              </div>
              <div className={styles.fuelItem}>
                <div className={styles.fuelHeader}>
                  <span className={styles.fuelLabel}>Diesel</span>
                  <span className={styles.fuelValue}>300 gal</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={`${styles.progressFill} ${styles.progressGreen}`} style={{ width: '60%' }} />
                </div>
              </div>
              <div className={styles.fuelItem}>
                <div className={styles.fuelHeader}>
                  <span className={styles.fuelLabel}>DEF</span>
                  <span className={styles.fuelValue}>50 gal</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={`${styles.progressFill} ${styles.progressBlue}`} style={{ width: '50%' }} />
                </div>
              </div>
              <div className={styles.fuelItem}>
                <div className={styles.fuelHeader}>
                  <span className={styles.fuelLabel}>Van Battery</span>
                  <span className={styles.fuelValue}>84%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={`${styles.progressFill} ${styles.progressGreen}`} style={{ width: '84%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Compliance status</div>
            <div className={styles.cardContent}>
              <div className={styles.complianceItem}>
                <div className={`${styles.complianceDot} ${styles.complianceActive}`}></div>
                <span>Hazmat permit</span>
                <span className={styles.complianceDate}>Expires Dec 2026</span>
              </div>
              <div className={styles.complianceItem}>
                <div className={`${styles.complianceDot} ${styles.complianceActive}`}></div>
                <span>Vehicle inspection</span>
                <span className={styles.complianceDate}>Valid</span>
              </div>
              <div className={styles.complianceItem}>
                <div className={`${styles.complianceDot} ${styles.complianceWarning}`}></div>
                <span>Driver certification</span>
                <span className={styles.complianceDate}>Renewal due</span>
              </div>
              <div className={styles.complianceItem}>
                <div className={`${styles.complianceDot} ${styles.complianceActive}`}></div>
                <span>Insurance</span>
                <span className={styles.complianceDate}>Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - Customer & Revenue */}
        <div className={styles.column}>
          {/* Revenue Overview */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Revenue this month</div>
            <div className={styles.cardContent}>
              <div className={styles.kpiRow}>
                <div className={styles.kpiItem}>
                  <div className={styles.kpiValue}>$18,450</div>
                  <div className={styles.kpiLabel}>Total revenue</div>
                </div>
                <div className={styles.kpiItem}>
                  <div className={styles.kpiValue}>142</div>
                  <div className={styles.kpiLabel}>Active subscribers</div>
                </div>
                <div className={styles.kpiItem}>
                  <div className={styles.kpiValue}>85</div>
                  <div className={styles.kpiLabel}>Waitlist</div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Breakdown */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Subscription breakdown</div>
            <div className={styles.cardContent}>
              <div className={styles.subscriptionGrid}>
                <div className={styles.subscriptionTier}>
                  <div className={styles.tierHeader}>Basic</div>
                  <div className={styles.tierValue}>86</div>
                  <div className={styles.tierPrice}>$49/mo</div>
                </div>
                <div className={styles.subscriptionTier}>
                  <div className={styles.tierHeader}>Premium</div>
                  <div className={styles.tierValue}>42</div>
                  <div className={styles.tierPrice}>$89/mo</div>
                </div>
                <div className={styles.subscriptionTier}>
                  <div className={styles.tierHeader}>Annual</div>
                  <div className={styles.tierValue}>8</div>
                  <div className={styles.tierPrice}>$499/yr</div>
                </div>
                <div className={styles.subscriptionTier}>
                  <div className={styles.tierHeader}>Fleet B2B</div>
                  <div className={styles.tierValue}>6</div>
                  <div className={styles.tierPrice}>Custom</div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Today's schedule</div>
            <div className={styles.cardContent}>
              {[
                { time: '08:00', title: 'Morning dispatch', desc: 'Van departing from base' },
                { time: '09:30', title: 'Residential - Oak Grove', desc: '4 fill-ups, 120 gal total' },
                { time: '11:00', title: 'Fleet - Metro Logistics', desc: '3 vehicles, 200 gal diesel' },
                { time: '14:00', title: 'Residential - Sellwood', desc: '5 fill-ups, 80 gal total' },
                { time: '16:30', title: 'Return to base', desc: 'Restock and charge van' },
              ].map((item, i) => (
                <div key={i} className={styles.scheduleItem}>
                  <div className={styles.scheduleTime}>{item.time}</div>
                  <div className={styles.scheduleContent}>
                    <div className={styles.scheduleTitle}>{item.title}</div>
                    <div className={styles.scheduleDesc}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - HR & Drivers */}
        <div className={styles.column}>
          {/* Driver HR */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Driver management</div>
            <div className={styles.cardContent}>
              <div className={styles.driverList}>
                <div className={styles.driverItem}>
                  <div className={styles.driverAvatar}>JD</div>
                  <div className={styles.driverInfo}>
                    <div className={styles.driverName}>John Doe</div>
                    <div className={styles.driverShift}>08:00 - 16:00</div>
                  </div>
                  <div className={`${styles.driverStatus} ${styles.statusActive}`}>Active</div>
                </div>
                <div className={styles.driverItem}>
                  <div className={styles.driverAvatar}>MJ</div>
                  <div className={styles.driverInfo}>
                    <div className={styles.driverName}>Maria Jones</div>
                    <div className={styles.driverShift}>Off today</div>
                  </div>
                  <div className={`${styles.driverStatus} ${styles.statusOff}`}>Off</div>
                </div>
              </div>
              <div className={styles.divider}></div>
              <button className={`${styles.btn} ${styles.btnSecondary}`} style={{ width: '100%' }}>
                Add employee
              </button>
            </div>
          </div>

          {/* Shift Scheduler */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Shift scheduler</div>
            <div className={styles.cardContent}>
              <div className={styles.shiftGrid}>
                <div className={styles.shiftDay}>
                  <div className={styles.shiftDayName}>Mon</div>
                  <div className={styles.shiftSlot}>JD</div>
                </div>
                <div className={styles.shiftDay}>
                  <div className={styles.shiftDayName}>Tue</div>
                  <div className={styles.shiftSlot}>JD</div>
                </div>
                <div className={styles.shiftDay}>
                  <div className={styles.shiftDayName}>Wed</div>
                  <div className={styles.shiftSlot}>MJ</div>
                </div>
                <div className={styles.shiftDay}>
                  <div className={styles.shiftDayName}>Thu</div>
                  <div className={styles.shiftSlot}>JD</div>
                </div>
                <div className={styles.shiftDay}>
                  <div className={styles.shiftDayName}>Fri</div>
                  <div className={styles.shiftSlot}>MJ</div>
                </div>
              </div>
              <div className={styles.wageDisplay}>
                <span className={styles.wageLabel}>Driver wage rate</span>
                <span className={styles.wageValue}>$22/hr</span>
              </div>
            </div>
          </div>

          {/* SOP Violations */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>SOP alerts</div>
            <div className={styles.cardContent}>
              <div className={styles.alertItem}>
                <div className={styles.alertDot}></div>
                <div className={styles.alertContent}>
                  <div className={styles.alertText}>Grounding check missed - Stop #3</div>
                  <div className={styles.alertTime}>Today 10:42 AM</div>
                </div>
              </div>
              <div className={styles.alertItem}>
                <div className={`${styles.alertDot} ${styles.alertDotWarning}`}></div>
                <div className={styles.alertContent}>
                  <div className={styles.alertText}>Fuel selection verified</div>
                  <div className={styles.alertTime}>Today 09:15 AM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Quick actions</div>
            <div className={styles.cardContent}>
              <div className={styles.actionsColumn}>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  New delivery order
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  Schedule resupply
                </button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>
                  View reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
