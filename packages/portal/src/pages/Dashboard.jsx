/**
 * HQ Portal - Network Command Center
 * Fresh build following DESIGN-RULES.md v2.0
 * 3-Column responsive layout with premium industrial styling
 * Connected to core-engine API for real-time data
 */

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDashboardData, useLiveFleetData, useKPIData } from '../hooks/useDashboardData';
import { franchiseService } from '../services/api';
import styles from './Dashboard.module.css';

// Clickable card wrapper component
function ClickableCard({ children, to, onClick, className, ...props }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) {
      return;
    }
    if (onClick) {
      onClick(e);
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <div
      className={`${className} ${styles.clickableCard}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      {...props}
    >
      {children}
    </div>
  );
}

// Territory locations with real coordinates
const territories = [
  { name: 'Dallas-Fort Worth', lat: 32.7767, lng: -96.7970, orders: 48 },
  { name: 'Houston', lat: 29.7604, lng: -95.3698, orders: 52 },
  { name: 'San Antonio', lat: 29.4241, lng: -98.4936, orders: 31 },
  { name: 'Austin', lat: 30.2672, lng: -97.7431, orders: 28 },
  { name: 'Phoenix', lat: 33.4484, lng: -112.0740, orders: 41 },
  { name: 'Denver', lat: 39.7392, lng: -104.9903, orders: 35 },
  { name: 'Oklahoma City', lat: 35.4676, lng: -97.5164, orders: 22 },
  { name: 'Albuquerque', lat: 35.0844, lng: -106.6504, orders: 18 },
  { name: 'Las Vegas', lat: 36.1699, lng: -115.1398, orders: 29 },
  { name: 'Salt Lake City', lat: 40.7608, lng: -111.8910, orders: 24 },
  { name: 'El Paso', lat: 31.7619, lng: -106.4850, orders: 14 },
  { name: 'Tucson', lat: 32.2226, lng: -110.9747, orders: 16 },
];

// Mini map for Territory Overview (no controls, static view)
function TerritoryMiniMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current, {
      center: [35.5, -105],
      zoom: 3,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      keyboard: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // Add small markers for territories
    territories.forEach((territory) => {
      L.circleMarker([territory.lat, territory.lng], {
        radius: 5,
        fillColor: '#cc0000',
        fillOpacity: 1,
        color: '#ff4444',
        weight: 1,
        opacity: 0.8,
      }).addTo(mapInstanceRef.current);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className={styles.miniMapContainer} />;
}

// Main interactive map with controls and layers
function NetworkMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    // Initialize map with zoom enabled
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [35.5, -98.5],
      zoom: 4,
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true,
    });

    // Define tile layers
    const baseLayers = {
      'Dark': L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
      }),
      'Satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
      }),
      'Streets': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }),
      'Terrain': L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
      }),
    };

    // Add default layer (Dark)
    baseLayers['Dark'].addTo(mapInstanceRef.current);

    // Add layer control
    L.control.layers(baseLayers, null, {
      position: 'topright',
      collapsed: true,
    }).addTo(mapInstanceRef.current);

    // Add markers
    territories.forEach((territory) => {
      const marker = L.circleMarker([territory.lat, territory.lng], {
        radius: 8,
        fillColor: '#cc0000',
        fillOpacity: 1,
        color: '#ff4444',
        weight: 2,
        opacity: 0.8,
      }).addTo(mapInstanceRef.current);

      marker.bindPopup(
        `<strong>${territory.name}</strong><br/>${territory.orders} active orders`,
        { className: styles.leafletPopup }
      );
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className={styles.mapContainer} />;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [franchiseMapData, setFranchiseMapData] = useState([]);

  // Fetch data from API
  const { data: dashboardData, loading, error, refetch } = useDashboardData();
  const { drivers: liveDrivers, deliveries: liveDeliveries } = useLiveFleetData();
  const { kpis } = useKPIData('30d');

  // Fetch franchise map data
  useEffect(() => {
    const loadMapData = async () => {
      try {
        const mapData = await franchiseService.getMapData();
        if (mapData?.franchises) {
          setFranchiseMapData(mapData.franchises);
        }
      } catch (err) {
        if (import.meta.env.DEV) console.log('[Dashboard] Map data error:', err);
      }
    };
    loadMapData();
  }, []);

  // Compute display values with fallback to mock data
  const displayData = useMemo(() => {
    const network = dashboardData?.franchiseStats || dashboardData?.network || {};
    const today = dashboardData?.today || {};
    const fleet = dashboardData?.fleet || {};
    const alerts = dashboardData?.alerts || {};

    return {
      // Territory stats
      activeTerritories: network.franchises || network.active || 47,
      pendingTerritories: network.pending || 5,
      pipelineTerritories: network.pipeline || 12,
      // Today's KPIs
      todayRevenue: today.revenue ? `$${(parseFloat(today.revenue) / 1000).toFixed(1)}K` : '$127.4K',
      activeOrders: today.deliveries?.total || 342,
      driversOnline: fleet.driversOnDuty || liveDrivers?.length || 186,
      onTimeRate: today.deliveries?.completionRate ? `${today.deliveries.completionRate}%` : '98.4%',
      // Fleet status
      fleetActive: fleet.byMode?.driving || fleet.byMode?.delivery || 186,
      fleetIdle: fleet.byMode?.parked || fleet.byMode?.idle || 24,
      fleetMaintenance: network.vehiclesMaintenance || 8,
      fleetOffline: network.vehiclesOffline || 3,
      // Alerts
      alertsTotal: alerts.total || 5,
      openIncidents: alerts.openIncidents || 0,
      expiringPermits: alerts.expiringPermits || 3,
      // Compliance (mock until API returns)
      complianceCurrent: 44,
      complianceExpiring: alerts.expiringPermits || 3,
      complianceOverdue: 0,
      compliancePercent: 93.6,
      // Health score (mock until API returns)
      healthScore: 94.2,
    };
  }, [dashboardData, liveDrivers]);

  // Escape key to close fullscreen map
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && mapFullscreen) {
        setMapFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mapFullscreen]);

  // Show loading state
  if (loading && !dashboardData) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Main 3-Column Grid */}
      <main className={styles.main}>
        {/* LEFT COLUMN - Territory & Pipeline */}
        <div className={styles.column}>
          {/* Territory Overview */}
          <ClickableCard className={styles.card} to="/franchise-monitor">
            <div className={styles.cardTitle}>Territory overview</div>
            <div className={styles.cardContent}>
              <div className={styles.territoryGrid}>
                <div className={styles.territoryStat}>
                  <div className={styles.territoryValue}>{displayData.activeTerritories}</div>
                  <div className={styles.territoryLabel}>Active</div>
                </div>
                <div className={styles.territoryStat}>
                  <div className={styles.territoryValue}>{displayData.pendingTerritories}</div>
                  <div className={styles.territoryLabel}>Pending</div>
                </div>
                <div className={styles.territoryStat}>
                  <div className={styles.territoryValue}>{displayData.pipelineTerritories}</div>
                  <div className={styles.territoryLabel}>Pipeline</div>
                </div>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.territoryMap}>
                <TerritoryMiniMap />
              </div>
            </div>
          </ClickableCard>

          {/* Expansion Pipeline */}
          <ClickableCard className={styles.card} to="/franchise-sales">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Expansion pipeline</span>
              <span className={`${styles.pill} ${styles.pillGray}`}>12</span>
            </div>
            <div className={styles.cardContent}>
              {[
                { territory: 'Phoenix Metro', stage: 'Contract', days: 12 },
                { territory: 'Salt Lake City', stage: 'Discovery', days: 5 },
                { territory: 'Boise', stage: 'Negotiation', days: 21 },
                { territory: 'Albuquerque', stage: 'Application', days: 8 },
                { territory: 'Sacramento', stage: 'Review', days: 3 },
              ].map((item, i) => (
                <div key={i} className={styles.pipelineItem}>
                  <div className={styles.pipelineInfo}>
                    <div className={styles.pipelineName}>{item.territory}</div>
                    <div className={styles.pipelineStage}>{item.stage}</div>
                  </div>
                  <div className={styles.pipelineDays}>{item.days}d</div>
                </div>
              ))}
            </div>
          </ClickableCard>

          {/* Regional Revenue */}
          <ClickableCard className={styles.card} to="/finance">
            <div className={styles.cardTitle}>Revenue by region</div>
            <div className={styles.cardContent}>
              {[
                { region: 'Southwest', revenue: 892000, percent: 99 },
                { region: 'Midwest', revenue: 654000, percent: 73 },
                { region: 'Southeast', revenue: 543000, percent: 61 },
                { region: 'Northeast', revenue: 412000, percent: 46 },
                { region: 'Pacific', revenue: 346000, percent: 39 },
              ].map((item, i) => (
                <div key={i} className={styles.regionItem}>
                  <div className={styles.regionHeader}>
                    <span className={styles.regionName}>{item.region}</span>
                    <span className={styles.regionValue}>${(item.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={`${styles.progressFill} ${styles.progressBlue}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ClickableCard>

          {/* Compliance Status */}
          <ClickableCard className={styles.expandCard} to="/legal-compliance">
            <div className={styles.cardTitle}>Compliance status</div>
            <div className={styles.cardContent}>
              <div className={styles.complianceGrid}>
                <div className={styles.complianceStat}>
                  <div className={styles.complianceValue}>{displayData.complianceCurrent}</div>
                  <div className={styles.complianceLabel}>Current</div>
                </div>
                <div className={styles.complianceStat}>
                  <div className={`${styles.complianceValue} ${styles.warning}`}>{displayData.complianceExpiring}</div>
                  <div className={styles.complianceLabel}>Expiring</div>
                </div>
                <div className={styles.complianceStat}>
                  <div className={`${styles.complianceValue} ${styles.success}`}>{displayData.complianceOverdue}</div>
                  <div className={styles.complianceLabel}>Overdue</div>
                </div>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.complianceBar}>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${styles.progressBlue}`}
                    style={{ width: `${displayData.compliancePercent}%` }}
                  />
                </div>
                <div className={styles.compliancePercent}>{displayData.compliancePercent}% compliant</div>
              </div>
            </div>
          </ClickableCard>

          {/* Market Sandbox */}
          <ClickableCard className={styles.card} to="/market-sandbox">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Market sandbox</span>
              <span className={`${styles.pill} ${styles.pillBlue}`}>Tool</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.sandboxInfo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Model franchise financials with adjustable variables</span>
              </div>
            </div>
          </ClickableCard>
        </div>

        {/* CENTER COLUMN - Operations */}
        <div className={styles.column}>
          {/* Live Operations Map */}
          <div className={`${styles.mapCard} ${mapFullscreen ? styles.mapFullscreen : ''}`}>
            <NetworkMap />
            {/* Fullscreen toggle button */}
            <button
              className={styles.fullscreenBtn}
              onClick={() => setMapFullscreen(!mapFullscreen)}
              title={mapFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {mapFullscreen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                </svg>
              )}
            </button>
            <div className={styles.mapOverlay}>
              <div className={styles.mapOverlayHeader}>
                <div>
                  <div className={styles.mapTitle}>Live network operations</div>
                  <div className={styles.mapSubtitle}>{displayData.activeOrders} active orders across {displayData.activeTerritories} territories</div>
                </div>
                <div className={styles.mapActions}>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Row */}
          <div className={styles.card}>
            <div className={styles.kpiRow}>
              <div className={styles.kpiItem}>
                <div className={styles.kpiValue}>{displayData.todayRevenue}</div>
                <div className={styles.kpiLabel}>Today's revenue</div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiValue}>{displayData.activeOrders}</div>
                <div className={styles.kpiLabel}>Active orders</div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiValue}>{displayData.driversOnline}</div>
                <div className={styles.kpiLabel}>Drivers online</div>
              </div>
              <div className={styles.kpiItem}>
                <div className={styles.kpiValue}>{displayData.onTimeRate}</div>
                <div className={styles.kpiLabel}>On-time rate</div>
              </div>
            </div>
          </div>

          {/* 2x2 Grid */}
          <div className={styles.centerGrid}>
            {/* Top Franchises */}
            <ClickableCard className={styles.card} to="/franchise-monitor">
              <div className={styles.cardTitle}>Top franchises</div>
              <div className={styles.cardContent}>
                {[
                  { name: 'Dallas-Fort Worth', initials: 'DFW', score: 98.7, trend: 'up' },
                  { name: 'Houston Metro', initials: 'HOU', score: 96.2, trend: 'up' },
                  { name: 'San Antonio', initials: 'SAT', score: 94.1, trend: 'stable' },
                  { name: 'Austin', initials: 'AUS', score: 89.4, trend: 'down' },
                  { name: 'El Paso', initials: 'ELP', score: 88.2, trend: 'up' },
                ].map((item, i) => (
                  <div key={i} className={styles.leaderItem}>
                    <span className={styles.leaderRank}>{i + 1}</span>
                    <div className={styles.leaderAvatar}>{item.initials}</div>
                    <span className={styles.leaderName}>{item.name}</span>
                    <span className={styles.leaderScore}>{item.score}</span>
                    <span className={`${styles.leaderTrend} ${styles[item.trend]}`}>
                      {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '–'}
                    </span>
                  </div>
                ))}
              </div>
            </ClickableCard>

            {/* Network Activity */}
            <ClickableCard className={styles.card} to="/reports">
              <div className={styles.cardTitle}>Network activity</div>
              <div className={styles.cardContent}>
                <div className={styles.activityGrid}>
                  <div className={styles.activityItem}>
                    <div className={styles.activityValue}>2,847</div>
                    <div className={styles.activityLabel}>Orders today</div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityValue}>156K</div>
                    <div className={styles.activityLabel}>Gallons delivered</div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityValue}>$2.84M</div>
                    <div className={styles.activityLabel}>MTD revenue</div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityValue}>+18.4%</div>
                    <div className={styles.activityLabel}>YoY growth</div>
                  </div>
                </div>
              </div>
            </ClickableCard>

            {/* Recent Transactions */}
            <ClickableCard className={styles.card} to="/finance">
              <div className={styles.cardTitle}>Recent transactions</div>
              <div className={styles.cardContent}>
                {[
                  { franchise: 'Dallas-Fort Worth', type: 'Diesel', amount: '$4,847.50' },
                  { franchise: 'Houston Metro', type: 'Regular', amount: '$2,425.00' },
                  { franchise: 'San Antonio', type: 'DEF', amount: '$1,156.80' },
                  { franchise: 'Austin', type: 'Diesel', amount: '$3,520.00' },
                ].map((item, i) => (
                  <div key={i} className={styles.listItem}>
                    <div className={styles.listIcon}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4h12M2 8h12M2 12h8" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className={styles.listContent}>
                      <div className={styles.listTitle}>{item.franchise}</div>
                      <div className={styles.listSubtitle}>{item.type}</div>
                    </div>
                    <div className={styles.listValue}>{item.amount}</div>
                  </div>
                ))}
              </div>
            </ClickableCard>

            {/* Corporate Contacts */}
            <ClickableCard className={styles.card} to="/franchise-support">
              <div className={styles.cardTitle}>Corporate contacts</div>
              <div className={styles.cardContent}>
                {[
                  { dept: 'Legal', contact: 'Sarah Mitchell', phone: '(512) 555-0100', available: true },
                  { dept: 'Finance', contact: 'James Chen', phone: '(512) 555-0101', available: true },
                  { dept: 'Operations', contact: 'Maria Garcia', phone: '(512) 555-0102', available: false },
                  { dept: 'Support', contact: 'David Kim', phone: '(512) 555-0103', available: true },
                ].map((item, i) => (
                  <div key={i} className={styles.contactItem}>
                    <div className={`${styles.contactDot} ${item.available ? styles.online : styles.offline}`}></div>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactDept}>{item.dept}</div>
                      <div className={styles.contactName}>{item.contact}</div>
                    </div>
                    <div className={styles.contactPhone}>{item.phone}</div>
                  </div>
                ))}
              </div>
            </ClickableCard>
          </div>
        </div>

        {/* RIGHT COLUMN - Metrics & Alerts */}
        <div className={styles.column}>
          {/* Network Health */}
          <ClickableCard className={styles.card} to="/technology">
            <div className={styles.cardTitle}>Network health</div>
            <div className={styles.cardContent}>
              <div className={styles.healthDisplay}>
                <div className={styles.healthRing}>
                  <svg viewBox="0 0 120 120" className={styles.healthSvg}>
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      className={styles.healthTrack}
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      className={styles.healthProgress}
                      strokeDasharray={`${(displayData.healthScore / 100) * 314} 314`}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className={styles.healthValue}>
                    <span className={styles.healthNumber}>{displayData.healthScore}</span>
                    <span className={styles.healthUnit}>%</span>
                  </div>
                </div>
                <div className={styles.healthStatus}>{displayData.healthScore >= 90 ? 'All systems operational' : 'Some issues detected'}</div>
              </div>
            </div>
          </ClickableCard>

          {/* Fleet Summary */}
          <ClickableCard className={styles.card} to="/franchise-monitor">
            <div className={styles.cardTitle}>Fleet summary</div>
            <div className={styles.cardContent}>
              <div className={styles.fleetGrid}>
                <div className={styles.fleetItem}>
                  <div className={`${styles.fleetDot} ${styles.active}`}></div>
                  <span className={styles.fleetLabel}>Active</span>
                  <span className={styles.fleetValue}>{displayData.fleetActive}</span>
                </div>
                <div className={styles.fleetItem}>
                  <div className={`${styles.fleetDot} ${styles.idle}`}></div>
                  <span className={styles.fleetLabel}>Idle</span>
                  <span className={styles.fleetValue}>{displayData.fleetIdle}</span>
                </div>
                <div className={styles.fleetItem}>
                  <div className={`${styles.fleetDot} ${styles.maintenance}`}></div>
                  <span className={styles.fleetLabel}>Maintenance</span>
                  <span className={styles.fleetValue}>{displayData.fleetMaintenance}</span>
                </div>
                <div className={styles.fleetItem}>
                  <div className={`${styles.fleetDot} ${styles.offline}`}></div>
                  <span className={styles.fleetLabel}>Offline</span>
                  <span className={styles.fleetValue}>{displayData.fleetOffline}</span>
                </div>
              </div>
            </div>
          </ClickableCard>

          {/* System Alerts */}
          <ClickableCard className={styles.tallCard} to="/reports">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>System alerts</span>
              <span className={`${styles.pill} ${styles.pillRed}`}>{displayData.alertsTotal}</span>
            </div>
            <div className={styles.cardContent}>
              {[
                { type: 'critical', text: 'Austin territory below performance threshold', time: '12m ago' },
                { type: 'warning', text: 'Denver compliance renewal due in 14 days', time: '1h ago' },
                { type: 'info', text: 'New franchise application: Sacramento', time: '2h ago' },
                { type: 'warning', text: 'Inventory low at Tampa distribution', time: '3h ago' },
                { type: 'info', text: 'Q4 royalty reports ready for review', time: '4h ago' },
                { type: 'warning', text: 'Phoenix driver shortage detected', time: '5h ago' },
              ].map((alert, i) => (
                <div key={i} className={styles.alertItem}>
                  <div className={`${styles.alertDot} ${styles[`alertDot${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}`]}`}></div>
                  <div className={styles.alertContent}>
                    <div className={styles.alertText}>{alert.text}</div>
                    <div className={styles.alertTime}>{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </ClickableCard>

          {/* Quick Actions */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Quick actions</div>
            <div className={styles.cardContent}>
              <div className={styles.actionsColumn}>
                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}>
                  New franchise application
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnFull}`}>
                  Generate reports
                </button>
                <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnFull}`}>
                  View all territories
                </button>
              </div>
            </div>
          </div>

          {/* Site Editor */}
          <ClickableCard className={styles.card} to="/website-editor">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Site Editor</span>
              <span className={`${styles.pill} ${styles.pillBlue}`}>dispatch.app</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.siteEditorInfo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit website content, pricing, and media</span>
              </div>
            </div>
          </ClickableCard>

          {/* Dev Link - Development Only */}
          {import.meta.env.DEV && (
            <a
              href="http://localhost:5173/dev/simulator"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${styles.devCard}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Dev Console</span>
                <span className={`${styles.pill} ${styles.pillGray}`}>DEV</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.devInfo}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span>Open Simulator & Dev Tools</span>
                </div>
              </div>
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
