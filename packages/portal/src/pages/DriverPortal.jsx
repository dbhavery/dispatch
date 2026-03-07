/**
 * Dispatch Driver Portal
 * Tablet-mounted interface for drivers with auto-transitioning modes
 * - Dashboard Mode: Clock in/out, route summary, van status
 * - Driver Mode: Full-screen navigation (GPS)
 * - Delivery Mode: SOP checklist enforcement with AI camera
 * Created: 2026-01-26
 */

import { useState, useEffect, useCallback } from 'react';
import styles from './DriverPortal.module.css';

// Simulated GPS/Speed data hook (in production, connect to device GPS)
function useDriverMode() {
  const [currentMode, setCurrentMode] = useState('dashboard');
  const [speed, setSpeed] = useState(0);
  const [distanceToCustomer, setDistanceToCustomer] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);

  // Only switch modes when clocked in
  useEffect(() => {
    if (!isClockedIn) {
      setCurrentMode('dashboard');
      return;
    }

    if (speed > 5) {
      setCurrentMode('driver');
    } else if (distanceToCustomer !== null && distanceToCustomer <= 150) {
      setCurrentMode('delivery');
    } else if (speed <= 5 && (distanceToCustomer === null || distanceToCustomer > 150)) {
      setCurrentMode('dashboard');
    }
  }, [speed, distanceToCustomer, isClockedIn]);

  return { currentMode, setCurrentMode, speed, setSpeed, distanceToCustomer, setDistanceToCustomer, isClockedIn, setIsClockedIn };
}

// Dashboard Mode Component
function DashboardMode({ isClockedIn, onClockIn, onSimulateNavigation }) {
  return (
    <div className={styles.dashboardMode}>
      {/* Clock In/Out */}
      <div className={styles.clockSection}>
        <button
          onClick={onClockIn}
          className={`${styles.clockBtn} ${isClockedIn ? styles.clockedIn : styles.clockedOut}`}
        >
          {isClockedIn ? 'CLOCK OUT' : 'CLOCK IN'}
        </button>
        <div className={styles.clockStatus}>
          {isClockedIn ? 'Shift started 08:00 AM' : 'Not clocked in'}
        </div>
      </div>

      {/* Route Summary */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Today's route</div>
        <div className={styles.cardContent}>
          <div className={styles.routeSummary}>
            <div className={styles.routeItem}>
              <span className={styles.routeValue}>8</span>
              <span className={styles.routeLabel}>Stops</span>
            </div>
            <div className={styles.routeItem}>
              <span className={styles.routeValue}>62</span>
              <span className={styles.routeLabel}>Miles</span>
            </div>
            <div className={styles.routeItem}>
              <span className={styles.routeValue}>~4.5h</span>
              <span className={styles.routeLabel}>Est. time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Van Status */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Van status</div>
        <div className={styles.cardContent}>
          <div className={styles.statusGrid}>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Gasoline</span>
              <span className={styles.statusValue}>700 lbs</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Diesel</span>
              <span className={styles.statusValue}>250 gal</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>DEF</span>
              <span className={styles.statusValue}>45 gal</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Battery</span>
              <span className={styles.statusValue}>84%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Stop Preview */}
      {isClockedIn && (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Next stop</div>
          <div className={styles.cardContent}>
            <div className={styles.nextStop}>
              <div className={styles.nextStopName}>Johnson Residence</div>
              <div className={styles.nextStopAddress}>1234 Oak Grove Rd, Portland OR</div>
              <div className={styles.nextStopFuel}>15 gal Regular</div>
              <button
                onClick={onSimulateNavigation}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Start navigation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Driver Mode Component (Full-screen navigation)
function DriverMode({ onArrive, currentStop }) {
  return (
    <div className={styles.driverMode}>
      {/* Full-screen Map Placeholder */}
      <div className={styles.fullscreenMap}>
        <div className={styles.mapContent}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div className={styles.navText}>GPS Navigation Active</div>
            <div className={styles.navEta}>ETA: 12 minutes</div>
          </div>
        </div>

        {/* Customer Info Popup */}
        <div className={styles.customerPopup}>
          <div className={styles.popupHeader}>
            <span className={styles.popupLabel}>Next stop</span>
            <span className={styles.popupDistance}>0.8 mi</span>
          </div>
          <div className={styles.popupName}>{currentStop?.name || 'Johnson Residence'}</div>
          <div className={styles.popupFuel}>15 gal Regular</div>
          <div className={styles.popupAddress}>1234 Oak Grove Rd</div>
        </div>

        {/* Arrive Button */}
        <button onClick={onArrive} className={styles.arriveBtn}>
          Arrived at location
        </button>
      </div>
    </div>
  );
}

// Delivery Mode Component (SOP Enforcement)
function DeliveryMode({ onComplete }) {
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Van in park with parking brake engaged', completed: false },
    { id: 2, task: 'Grounding cable connected to vehicle', completed: false },
    { id: 3, task: 'Correct fuel type selected (Regular)', completed: false },
    { id: 4, task: 'Fuel cap removed and nozzle inserted', completed: false },
    { id: 5, task: 'Customer vehicle verified (plate: ABC-1234)', completed: false },
  ]);

  const allCompleted = checklist.every(item => item.completed);
  const completedCount = checklist.filter(item => item.completed).length;

  const toggleItem = (id) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className={styles.deliveryMode}>
      {/* Header */}
      <div className={styles.deliveryHeader}>
        <div className={styles.deliveryTitle}>Delivery checklist</div>
        <div className={styles.deliveryProgress}>
          {completedCount}/{checklist.length} completed
        </div>
      </div>

      {/* SOP Checklist */}
      <div className={styles.checklistContainer}>
        {checklist.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.checklistItem} ${item.completed ? styles.checklistCompleted : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            <div className={styles.checklistNumber}>{index + 1}</div>
            <div className={styles.checklistCheckbox}>
              {item.completed && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              )}
            </div>
            <div className={styles.checklistText}>{item.task}</div>
          </div>
        ))}
      </div>

      {/* AI Camera Feed */}
      <div className={styles.cameraFeed}>
        <div className={styles.cameraPlaceholder}>
          <div className={styles.cameraIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div className={styles.cameraLabel}>AI Delivery Supervision</div>
          <div className={styles.cameraStatus}>
            {allCompleted ? 'All checks verified' : 'Monitoring delivery...'}
          </div>
        </div>
      </div>

      {/* Complete Delivery Button */}
      <button
        onClick={onComplete}
        disabled={!allCompleted}
        className={`${styles.completeBtn} ${allCompleted ? styles.completeBtnActive : styles.completeBtnDisabled}`}
      >
        {allCompleted ? 'COMPLETE DELIVERY' : 'Complete all checks to continue'}
      </button>
    </div>
  );
}

// Main Driver Portal Component
export default function DriverPortal() {
  const {
    currentMode,
    setCurrentMode,
    speed,
    setSpeed,
    distanceToCustomer,
    setDistanceToCustomer,
    isClockedIn,
    setIsClockedIn
  } = useDriverMode();

  const [currentStop, setCurrentStop] = useState({
    name: 'Johnson Residence',
    address: '1234 Oak Grove Rd, Portland OR',
    fuel: '15 gal Regular'
  });

  // Clock in/out handler
  const handleClockIn = useCallback(() => {
    setIsClockedIn(prev => !prev);
  }, [setIsClockedIn]);

  // Simulate starting navigation
  const handleStartNavigation = useCallback(() => {
    setSpeed(25); // Simulate driving
    setDistanceToCustomer(500); // Far from customer
  }, [setSpeed, setDistanceToCustomer]);

  // Simulate arriving at location
  const handleArrive = useCallback(() => {
    setSpeed(0);
    setDistanceToCustomer(50); // Close to customer - triggers delivery mode
  }, [setSpeed, setDistanceToCustomer]);

  // Complete delivery
  const handleCompleteDelivery = useCallback(() => {
    setDistanceToCustomer(null); // Reset
    setCurrentMode('dashboard');
    // In production: mark delivery complete, move to next stop
  }, [setDistanceToCustomer, setCurrentMode]);

  // Manual mode override for demo
  const handleManualModeChange = (mode) => {
    if (mode === 'dashboard') {
      setSpeed(0);
      setDistanceToCustomer(null);
    } else if (mode === 'driver') {
      setSpeed(25);
      setDistanceToCustomer(500);
    } else if (mode === 'delivery') {
      setSpeed(0);
      setDistanceToCustomer(50);
    }
  };

  return (
    <div className={styles.page}>
      {/* Mode Indicator (for demo purposes) */}
      <div className={styles.modeIndicator}>
        <div className={styles.modeLabel}>Current Mode:</div>
        <div className={styles.modeTabs}>
          {['dashboard', 'driver', 'delivery'].map(mode => (
            <button
              key={mode}
              onClick={() => handleManualModeChange(mode)}
              className={`${styles.modeTab} ${currentMode === mode ? styles.modeTabActive : ''}`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Content */}
      <div className={styles.modeContent}>
        {currentMode === 'dashboard' && (
          <DashboardMode
            isClockedIn={isClockedIn}
            onClockIn={handleClockIn}
            onSimulateNavigation={handleStartNavigation}
          />
        )}
        {currentMode === 'driver' && (
          <DriverMode
            onArrive={handleArrive}
            currentStop={currentStop}
          />
        )}
        {currentMode === 'delivery' && (
          <DeliveryMode
            onComplete={handleCompleteDelivery}
          />
        )}
      </div>
    </div>
  );
}
