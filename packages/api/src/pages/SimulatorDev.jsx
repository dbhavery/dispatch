/**
 * SimulatorDev - Developer Testing Interface
 * Manipulatable inputs for all 22 simulator categories
 *
 * DISPATCH-SPECIFIC RULES:
 * - NO CDL/HAZMAT/FMCSA (electric delivery vans)
 * - Electric vehicles charged overnight at depot
 * - No-contact deliveries (AI photo verification)
 * - Fuel at $0.10+ below local average
 */

import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import styles from './SimulatorDev.module.css';

// Socket connection to Core Engine
const SOCKET_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3001';

// Default values matching simulator types
const DEFAULT_VEHICLE_TELEMETRY = {
  vehicleId: 'VH-001',
  gpsLatitude: 33.4484,
  gpsLongitude: -112.0740,
  gpsSpeed: 25,
  gpsHeading: 90,
  motorStatus: 'ON',
  motorRpm: 3000,
  odometer: 15420,
  batteryStateOfCharge: 85,
  batteryVoltage: 375,
  batteryTemp: 78,
  estimatedRange: 142,
  chargingStatus: 'NOT_CONNECTED',
  tirePressure: [95, 95, 95, 95, 95, 95],
  doorStatus: 'OFF',
  parkingBrake: 'OFF',
  hazardLights: 'OFF',
  ptoStatus: 'OFF',
  motorTemp: 145,
  inverterTemp: 120,
};

const DEFAULT_FUEL_DISPENSING = {
  vehicleId: 'VH-001',
  productTank1Diesel: 425,
  productTank2Regular: 280,
  productTank3Premium: 175,
  productTank4Def: 85,
  pumpStatus: 'IDLE',
  nozzleStatus: 'HOLSTERED',
  emergencyShutoff: 'NORMAL',
  hoseReelPosition: 'RETRACTED',
  flowRate: 0,
  dispensedAmount: 0,
  overfillPrevention: 'OK',
  groundingStatus: 'CONNECTED',
};

const DEFAULT_SAFETY_SYSTEMS = {
  vehicleId: 'VH-001',
  aiCameraDriverAttention: 98,
  aiCameraEyesOnRoad: true,
  aiCameraPhoneDetected: false,
  aiCameraSeatbelt: 'ON',
  aiCameraDrowsinessScore: 5,
  aiCameraDistractionEvents: 0,
  forwardCollisionWarning: 'CLEAR',
  laneDeparture: 'CENTER',
  blindSpotLeft: 'CLEAR',
  blindSpotRight: 'CLEAR',
  backupCameraActive: false,
  fireSuppressionStatus: 'ARMED',
  spillContainmentStatus: 'OK',
  vaporRecoveryStatus: 'OK',
};

const DEFAULT_AI_VERIFICATION = {
  deliveryId: 'DEL-001',
  vehicleId: 'VH-001',
  vehicleMatchConfidence: 97,
  licensePlateMatch: true,
  vehicleColorMatch: true,
  fuelCapAccessible: true,
  fuelTypeVerified: true,
  obstructionsDetected: false,
  groundingVerified: true,
  dripPanVerified: true,
  fuelCapSecuredVerified: false,
  areaCleanVerified: false,
  deliveryVerificationResult: 'PENDING',
  overallConfidenceScore: 95,
  manualReviewRequired: false,
};

const DEFAULT_DELIVERY = {
  deliveryId: 'DEL-001',
  customerId: 'CUST-001',
  driverId: 'DRV-001',
  status: 'in_progress',
  gallonsDelivered: 0,
  fuelType: 'REGULAR',
  pricePerGallon: 3.15,
};

const DEFAULT_DRIVER = {
  driverId: 'DRV-001',
  name: 'Alex Johnson',
  clockedIn: true,
  preTripComplete: true,
  deliveriesCompleted: 12,
  gallonsDispensed: 245,
  averageDeliveryTimeMin: 8,
  cleanDeliveryScore: 98,
  customerRatingsAverage: 4.8,
  hardBrakingEvents: 0,
  speedingEvents: 0,
};

const DEFAULT_CUSTOMER = {
  customerId: 'CUST-001',
  name: 'Jane Smith',
  accountType: 'RESIDENTIAL',
  subscriptionTier: 'BIWEEKLY',
  vehicleMake: 'Toyota',
  vehicleModel: 'Camry',
  vehicleYear: 2022,
  fuelType: 'REGULAR',
  tankSize: 15,
  currentLevelPercent: 20,
  licensePlate: 'ABC-1234',
  color: 'Silver',
};

const DEFAULT_WEATHER = {
  temperature: 85,
  conditions: 'CLEAR',
  windSpeed: 8,
};

const DEFAULT_INVENTORY = {
  franchiseId: 'FR-001',
  depotDieselLevel: 8500,
  depotRegularLevel: 4200,
  depotPremiumLevel: 1800,
  depotDefLevel: 850,
};

const DEFAULT_CHARGING = {
  vehicleId: 'VH-001',
  chargingStationId: 'CS-01',
  chargingStatus: 'NOT_CONNECTED',
  batteryStartPercent: 15,
  batteryCurrentPercent: 15,
  energyDeliveredKwh: 0,
  chargingPowerKw: 0,
  estimatedTimeToFull: 0,
};

// Category sections for organized UI
const CATEGORIES = [
  { id: 'vehicle', name: 'Vehicle Telemetry', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'fuel', name: 'Fuel Dispensing', icon: 'M17.5 12.5V8m0 4.5a2.5 2.5 0 01-5 0V8a2.5 2.5 0 115 0v4.5z' },
  { id: 'safety', name: 'Safety Systems', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944' },
  { id: 'ai', name: 'AI Verification', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'delivery', name: 'Delivery Execution', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id: 'driver', name: 'Driver Performance', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'customer', name: 'Customer Data', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
  { id: 'weather', name: 'Weather/Environment', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  { id: 'inventory', name: 'Inventory/Depot', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'charging', name: 'EV Charging', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
];

function SimulatorDev() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [activeCategory, setActiveCategory] = useState('vehicle');
  const [eventLog, setEventLog] = useState([]);
  const [autoEmit, setAutoEmit] = useState(false);

  // State for all categories
  const [vehicleTelemetry, setVehicleTelemetry] = useState(DEFAULT_VEHICLE_TELEMETRY);
  const [fuelDispensing, setFuelDispensing] = useState(DEFAULT_FUEL_DISPENSING);
  const [safetySystems, setSafetySystems] = useState(DEFAULT_SAFETY_SYSTEMS);
  const [aiVerification, setAiVerification] = useState(DEFAULT_AI_VERIFICATION);
  const [delivery, setDelivery] = useState(DEFAULT_DELIVERY);
  const [driver, setDriver] = useState(DEFAULT_DRIVER);
  const [customer, setCustomer] = useState(DEFAULT_CUSTOMER);
  const [weather, setWeather] = useState(DEFAULT_WEATHER);
  const [inventory, setInventory] = useState(DEFAULT_INVENTORY);
  const [charging, setCharging] = useState(DEFAULT_CHARGING);

  // Connect to Socket.IO
  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socketInstance.on('connect', () => {
      setConnected(true);
      addLog('Connected to Core Engine', 'success');
    });

    socketInstance.on('disconnect', () => {
      setConnected(false);
      addLog('Disconnected from Core Engine', 'error');
    });

    socketInstance.on('error', (error) => {
      addLog(`Socket error: ${error}`, 'error');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Add entry to event log
  const addLog = useCallback((message, type = 'info') => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    setEventLog((prev) => [entry, ...prev].slice(0, 50));
  }, []);

  // Emit event to socket
  const emitEvent = useCallback((eventName, data) => {
    if (socket && connected) {
      socket.emit(eventName, { ...data, timestamp: new Date().toISOString() });
      addLog(`Emitted: ${eventName}`, 'emit');
    } else {
      addLog('Not connected to Core Engine', 'error');
    }
  }, [socket, connected, addLog]);

  // Handle vehicle telemetry change
  const handleVehicleChange = (field, value) => {
    setVehicleTelemetry((prev) => {
      const updated = { ...prev, [field]: value };
      if (autoEmit) {
        emitEvent('vehicle:telemetry', updated);
      }
      return updated;
    });
  };

  // Handle fuel dispensing change
  const handleFuelChange = (field, value) => {
    setFuelDispensing((prev) => {
      const updated = { ...prev, [field]: value };
      if (autoEmit) {
        emitEvent('fuel:dispensing', updated);
      }
      return updated;
    });
  };

  // Handle safety systems change
  const handleSafetyChange = (field, value) => {
    setSafetySystems((prev) => {
      const updated = { ...prev, [field]: value };
      if (autoEmit) {
        emitEvent('safety:update', updated);
      }
      return updated;
    });
  };

  // Handle AI verification change
  const handleAiChange = (field, value) => {
    setAiVerification((prev) => {
      const updated = { ...prev, [field]: value };
      if (autoEmit) {
        emitEvent('ai:verification', updated);
      }
      return updated;
    });
  };

  // Handle delivery change
  const handleDeliveryChange = (field, value) => {
    setDelivery((prev) => {
      const updated = { ...prev, [field]: value };
      if (autoEmit) {
        emitEvent('delivery:update', updated);
      }
      return updated;
    });
  };

  // Handle driver change
  const handleDriverChange = (field, value) => {
    setDriver((prev) => {
      const updated = { ...prev, [field]: value };
      if (autoEmit) {
        emitEvent('driver:update', updated);
      }
      return updated;
    });
  };

  // Handle customer change
  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  // Handle weather change
  const handleWeatherChange = (field, value) => {
    setWeather((prev) => ({ ...prev, [field]: value }));
  };

  // Handle inventory change
  const handleInventoryChange = (field, value) => {
    setInventory((prev) => ({ ...prev, [field]: value }));
  };

  // Handle charging change
  const handleChargingChange = (field, value) => {
    setCharging((prev) => {
      const updated = { ...prev, [field]: value };
      if (autoEmit) {
        emitEvent('vehicle:charging', updated);
      }
      return updated;
    });
  };

  // Manual emit handlers
  const emitVehicleTelemetry = () => emitEvent('vehicle:telemetry', vehicleTelemetry);
  const emitFuelDispensing = () => emitEvent('fuel:dispensing', fuelDispensing);
  const emitSafetySystems = () => emitEvent('safety:update', safetySystems);
  const emitAiVerification = () => emitEvent('ai:verification', aiVerification);
  const emitDeliveryUpdate = () => emitEvent('delivery:update', delivery);
  const emitDriverUpdate = () => emitEvent('driver:update', driver);
  const emitChargingUpdate = () => emitEvent('vehicle:charging', charging);

  // Simulate scenarios
  const simulateDeliveryStart = () => {
    setFuelDispensing((prev) => ({
      ...prev,
      pumpStatus: 'ACTIVE',
      nozzleStatus: 'ACTIVE',
      hoseReelPosition: 'EXTENDED',
      flowRate: 12,
    }));
    setAiVerification((prev) => ({
      ...prev,
      groundingVerified: true,
      dripPanVerified: true,
    }));
    emitEvent('delivery:status:update', { deliveryId: delivery.deliveryId, status: 'fueling' });
    addLog('Simulated: Delivery Started', 'scenario');
  };

  const simulateDeliveryComplete = () => {
    setFuelDispensing((prev) => ({
      ...prev,
      pumpStatus: 'IDLE',
      nozzleStatus: 'HOLSTERED',
      hoseReelPosition: 'RETRACTED',
      flowRate: 0,
      dispensedAmount: 12.5,
    }));
    setAiVerification((prev) => ({
      ...prev,
      fuelCapSecuredVerified: true,
      areaCleanVerified: true,
      deliveryVerificationResult: 'VERIFIED',
    }));
    emitEvent('delivery:status:update', { deliveryId: delivery.deliveryId, status: 'completed' });
    addLog('Simulated: Delivery Complete', 'scenario');
  };

  const simulateSafetyAlert = () => {
    setSafetySystems((prev) => ({
      ...prev,
      forwardCollisionWarning: 'WARNING',
      aiCameraDriverAttention: 65,
    }));
    emitEvent('safety:alert', {
      vehicleId: vehicleTelemetry.vehicleId,
      type: 'FORWARD_COLLISION_WARNING',
      severity: 'MEDIUM',
    });
    addLog('Simulated: Safety Alert', 'scenario');
  };

  const simulateLowBattery = () => {
    setVehicleTelemetry((prev) => ({
      ...prev,
      batteryStateOfCharge: 12,
      estimatedRange: 18,
    }));
    emitEvent('vehicle:telemetry', {
      ...vehicleTelemetry,
      batteryStateOfCharge: 12,
      estimatedRange: 18,
    });
    addLog('Simulated: Low Battery Alert', 'scenario');
  };

  // Render input components
  const renderNumberInput = (label, value, onChange, min, max, step = 1, unit = '') => (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>
        {label}
        {unit && <span className={styles.unit}>({unit})</span>}
      </label>
      <div className={styles.rangeWrapper}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={styles.rangeInput}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={styles.numberInput}
        />
      </div>
    </div>
  );

  const renderSelectInput = (label, value, onChange, options) => (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.selectInput}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const renderBooleanInput = (label, value, onChange) => (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>{label}</label>
      <button
        type="button"
        className={`${styles.toggleBtn} ${value ? styles.toggleOn : styles.toggleOff}`}
        onClick={() => onChange(!value)}
      >
        {value ? 'ON' : 'OFF'}
      </button>
    </div>
  );

  const renderTextInput = (label, value, onChange) => (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.textInput}
      />
    </div>
  );

  // Render category content
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'vehicle':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>GPS Module</div>
            {renderNumberInput('Latitude', vehicleTelemetry.gpsLatitude, (v) => handleVehicleChange('gpsLatitude', v), -90, 90, 0.0001, 'deg')}
            {renderNumberInput('Longitude', vehicleTelemetry.gpsLongitude, (v) => handleVehicleChange('gpsLongitude', v), -180, 180, 0.0001, 'deg')}
            {renderNumberInput('Speed', vehicleTelemetry.gpsSpeed, (v) => handleVehicleChange('gpsSpeed', v), 0, 65, 1, 'mph')}
            {renderNumberInput('Heading', vehicleTelemetry.gpsHeading, (v) => handleVehicleChange('gpsHeading', v), 0, 360, 1, 'deg')}

            <div className={styles.sectionTitle}>Electric Motor</div>
            {renderSelectInput('Motor Status', vehicleTelemetry.motorStatus, (v) => handleVehicleChange('motorStatus', v), ['ON', 'OFF'])}
            {renderNumberInput('Motor RPM', vehicleTelemetry.motorRpm, (v) => handleVehicleChange('motorRpm', v), 0, 12000, 100)}
            {renderNumberInput('Odometer', vehicleTelemetry.odometer, (v) => handleVehicleChange('odometer', v), 0, 999999, 1, 'mi')}

            <div className={styles.sectionTitle}>Battery Management System</div>
            {renderNumberInput('State of Charge', vehicleTelemetry.batteryStateOfCharge, (v) => handleVehicleChange('batteryStateOfCharge', v), 0, 100, 1, '%')}
            {renderNumberInput('Voltage', vehicleTelemetry.batteryVoltage, (v) => handleVehicleChange('batteryVoltage', v), 300, 400, 1, 'V')}
            {renderNumberInput('Battery Temp', vehicleTelemetry.batteryTemp, (v) => handleVehicleChange('batteryTemp', v), 40, 120, 1, 'F')}
            {renderNumberInput('Est. Range', vehicleTelemetry.estimatedRange, (v) => handleVehicleChange('estimatedRange', v), 0, 300, 1, 'mi')}

            <div className={styles.sectionTitle}>Vehicle Systems</div>
            {renderSelectInput('Door Status', vehicleTelemetry.doorStatus, (v) => handleVehicleChange('doorStatus', v), ['ON', 'OFF'])}
            {renderSelectInput('Parking Brake', vehicleTelemetry.parkingBrake, (v) => handleVehicleChange('parkingBrake', v), ['ON', 'OFF'])}
            {renderSelectInput('Hazard Lights', vehicleTelemetry.hazardLights, (v) => handleVehicleChange('hazardLights', v), ['ON', 'OFF'])}
            {renderSelectInput('PTO Status', vehicleTelemetry.ptoStatus, (v) => handleVehicleChange('ptoStatus', v), ['ON', 'OFF'])}

            <button type="button" className={styles.emitBtn} onClick={emitVehicleTelemetry}>
              Emit Vehicle Telemetry
            </button>
          </div>
        );

      case 'fuel':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>Product Tank Levels (gallons)</div>
            {renderNumberInput('Tank 1 - Diesel', fuelDispensing.productTank1Diesel, (v) => handleFuelChange('productTank1Diesel', v), 0, 500, 1, 'gal')}
            {renderNumberInput('Tank 2 - Regular', fuelDispensing.productTank2Regular, (v) => handleFuelChange('productTank2Regular', v), 0, 300, 1, 'gal')}
            {renderNumberInput('Tank 3 - Premium', fuelDispensing.productTank3Premium, (v) => handleFuelChange('productTank3Premium', v), 0, 200, 1, 'gal')}
            {renderNumberInput('Tank 4 - DEF', fuelDispensing.productTank4Def, (v) => handleFuelChange('productTank4Def', v), 0, 100, 1, 'gal')}

            <div className={styles.sectionTitle}>Pump Controller</div>
            {renderSelectInput('Pump Status', fuelDispensing.pumpStatus, (v) => handleFuelChange('pumpStatus', v), ['IDLE', 'ACTIVE', 'ERROR'])}
            {renderSelectInput('Nozzle Status', fuelDispensing.nozzleStatus, (v) => handleFuelChange('nozzleStatus', v), ['HOLSTERED', 'ACTIVE'])}
            {renderSelectInput('Emergency Shutoff', fuelDispensing.emergencyShutoff, (v) => handleFuelChange('emergencyShutoff', v), ['NORMAL', 'TRIGGERED'])}
            {renderSelectInput('Hose Reel', fuelDispensing.hoseReelPosition, (v) => handleFuelChange('hoseReelPosition', v), ['RETRACTED', 'EXTENDED'])}

            <div className={styles.sectionTitle}>Flow Meter</div>
            {renderNumberInput('Flow Rate', fuelDispensing.flowRate, (v) => handleFuelChange('flowRate', v), 0, 15, 0.1, 'GPM')}
            {renderNumberInput('Dispensed', fuelDispensing.dispensedAmount, (v) => handleFuelChange('dispensedAmount', v), 0, 999.9, 0.1, 'gal')}

            <div className={styles.sectionTitle}>Safety Sensors</div>
            {renderSelectInput('Overfill Prevention', fuelDispensing.overfillPrevention, (v) => handleFuelChange('overfillPrevention', v), ['OK', 'WARNING', 'STOP'])}
            {renderSelectInput('Grounding Status', fuelDispensing.groundingStatus, (v) => handleFuelChange('groundingStatus', v), ['CONNECTED', 'DISCONNECTED'])}

            <button type="button" className={styles.emitBtn} onClick={emitFuelDispensing}>
              Emit Fuel Dispensing
            </button>
          </div>
        );

      case 'safety':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>AI Dashboard Camera</div>
            {renderNumberInput('Driver Attention', safetySystems.aiCameraDriverAttention, (v) => handleSafetyChange('aiCameraDriverAttention', v), 0, 100, 1, '%')}
            {renderBooleanInput('Eyes on Road', safetySystems.aiCameraEyesOnRoad, (v) => handleSafetyChange('aiCameraEyesOnRoad', v))}
            {renderBooleanInput('Phone Detected', safetySystems.aiCameraPhoneDetected, (v) => handleSafetyChange('aiCameraPhoneDetected', v))}
            {renderSelectInput('Seatbelt', safetySystems.aiCameraSeatbelt, (v) => handleSafetyChange('aiCameraSeatbelt', v), ['ON', 'OFF'])}
            {renderNumberInput('Drowsiness Score', safetySystems.aiCameraDrowsinessScore, (v) => handleSafetyChange('aiCameraDrowsinessScore', v), 0, 100, 1)}
            {renderNumberInput('Distraction Events', safetySystems.aiCameraDistractionEvents, (v) => handleSafetyChange('aiCameraDistractionEvents', v), 0, 20, 1)}

            <div className={styles.sectionTitle}>ADAS Module</div>
            {renderSelectInput('Forward Collision', safetySystems.forwardCollisionWarning, (v) => handleSafetyChange('forwardCollisionWarning', v), ['CLEAR', 'WARNING', 'DANGER'])}
            {renderSelectInput('Lane Departure', safetySystems.laneDeparture, (v) => handleSafetyChange('laneDeparture', v), ['CENTER', 'LEFT', 'RIGHT'])}
            {renderSelectInput('Blind Spot Left', safetySystems.blindSpotLeft, (v) => handleSafetyChange('blindSpotLeft', v), ['CLEAR', 'OCCUPIED'])}
            {renderSelectInput('Blind Spot Right', safetySystems.blindSpotRight, (v) => handleSafetyChange('blindSpotRight', v), ['CLEAR', 'OCCUPIED'])}

            <div className={styles.sectionTitle}>Fire & Spill</div>
            {renderSelectInput('Fire Suppression', safetySystems.fireSuppressionStatus, (v) => handleSafetyChange('fireSuppressionStatus', v), ['ARMED', 'TRIGGERED', 'FAULT'])}
            {renderSelectInput('Spill Containment', safetySystems.spillContainmentStatus, (v) => handleSafetyChange('spillContainmentStatus', v), ['OK', 'BREACH'])}
            {renderSelectInput('Vapor Recovery', safetySystems.vaporRecoveryStatus, (v) => handleSafetyChange('vaporRecoveryStatus', v), ['OK', 'FAULT'])}

            <button type="button" className={styles.emitBtn} onClick={emitSafetySystems}>
              Emit Safety Update
            </button>
          </div>
        );

      case 'ai':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>Vehicle Identification</div>
            {renderNumberInput('Vehicle Match Confidence', aiVerification.vehicleMatchConfidence, (v) => handleAiChange('vehicleMatchConfidence', v), 0, 100, 1, '%')}
            {renderBooleanInput('License Plate Match', aiVerification.licensePlateMatch, (v) => handleAiChange('licensePlateMatch', v))}
            {renderBooleanInput('Vehicle Color Match', aiVerification.vehicleColorMatch, (v) => handleAiChange('vehicleColorMatch', v))}

            <div className={styles.sectionTitle}>Pre-Delivery Checks</div>
            {renderBooleanInput('Fuel Cap Accessible', aiVerification.fuelCapAccessible, (v) => handleAiChange('fuelCapAccessible', v))}
            {renderBooleanInput('Fuel Type Verified', aiVerification.fuelTypeVerified, (v) => handleAiChange('fuelTypeVerified', v))}
            {renderBooleanInput('Obstructions Detected', aiVerification.obstructionsDetected, (v) => handleAiChange('obstructionsDetected', v))}

            <div className={styles.sectionTitle}>During Delivery</div>
            {renderBooleanInput('Grounding Verified', aiVerification.groundingVerified, (v) => handleAiChange('groundingVerified', v))}
            {renderBooleanInput('Drip Pan Verified', aiVerification.dripPanVerified, (v) => handleAiChange('dripPanVerified', v))}

            <div className={styles.sectionTitle}>Post-Delivery</div>
            {renderBooleanInput('Fuel Cap Secured', aiVerification.fuelCapSecuredVerified, (v) => handleAiChange('fuelCapSecuredVerified', v))}
            {renderBooleanInput('Area Clean', aiVerification.areaCleanVerified, (v) => handleAiChange('areaCleanVerified', v))}
            {renderSelectInput('Verification Result', aiVerification.deliveryVerificationResult, (v) => handleAiChange('deliveryVerificationResult', v), ['PENDING', 'VERIFIED', 'FAILED', 'MANUAL_REVIEW'])}

            <div className={styles.sectionTitle}>Overall</div>
            {renderNumberInput('Overall Confidence', aiVerification.overallConfidenceScore, (v) => handleAiChange('overallConfidenceScore', v), 0, 100, 1, '%')}
            {renderBooleanInput('Manual Review Required', aiVerification.manualReviewRequired, (v) => handleAiChange('manualReviewRequired', v))}

            <button type="button" className={styles.emitBtn} onClick={emitAiVerification}>
              Emit AI Verification
            </button>
          </div>
        );

      case 'delivery':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>Delivery Details</div>
            {renderTextInput('Delivery ID', delivery.deliveryId, (v) => handleDeliveryChange('deliveryId', v))}
            {renderTextInput('Customer ID', delivery.customerId, (v) => handleDeliveryChange('customerId', v))}
            {renderTextInput('Driver ID', delivery.driverId, (v) => handleDeliveryChange('driverId', v))}
            {renderSelectInput('Status', delivery.status, (v) => handleDeliveryChange('status', v), ['scheduled', 'en_route', 'arrived', 'in_progress', 'completed', 'failed'])}

            <div className={styles.sectionTitle}>Fuel Details</div>
            {renderSelectInput('Fuel Type', delivery.fuelType, (v) => handleDeliveryChange('fuelType', v), ['DIESEL', 'REGULAR', 'PREMIUM', 'DEF'])}
            {renderNumberInput('Gallons Delivered', delivery.gallonsDelivered, (v) => handleDeliveryChange('gallonsDelivered', v), 0, 50, 0.1, 'gal')}
            {renderNumberInput('Price/Gallon', delivery.pricePerGallon, (v) => handleDeliveryChange('pricePerGallon', v), 2, 6, 0.01, '$/gal')}

            <button type="button" className={styles.emitBtn} onClick={emitDeliveryUpdate}>
              Emit Delivery Update
            </button>
          </div>
        );

      case 'driver':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>Driver Info</div>
            {renderTextInput('Driver ID', driver.driverId, (v) => handleDriverChange('driverId', v))}
            {renderTextInput('Name', driver.name, (v) => handleDriverChange('name', v))}
            {renderBooleanInput('Clocked In', driver.clockedIn, (v) => handleDriverChange('clockedIn', v))}
            {renderBooleanInput('Pre-Trip Complete', driver.preTripComplete, (v) => handleDriverChange('preTripComplete', v))}

            <div className={styles.sectionTitle}>Performance Metrics</div>
            {renderNumberInput('Deliveries Completed', driver.deliveriesCompleted, (v) => handleDriverChange('deliveriesCompleted', v), 0, 70, 1)}
            {renderNumberInput('Gallons Dispensed', driver.gallonsDispensed, (v) => handleDriverChange('gallonsDispensed', v), 0, 2000, 1, 'gal')}
            {renderNumberInput('Avg Delivery Time', driver.averageDeliveryTimeMin, (v) => handleDriverChange('averageDeliveryTimeMin', v), 1, 30, 1, 'min')}

            <div className={styles.sectionTitle}>Scores</div>
            {renderNumberInput('Clean Delivery Score', driver.cleanDeliveryScore, (v) => handleDriverChange('cleanDeliveryScore', v), 0, 100, 1)}
            {renderNumberInput('Customer Rating', driver.customerRatingsAverage, (v) => handleDriverChange('customerRatingsAverage', v), 1, 5, 0.1)}

            <div className={styles.sectionTitle}>Safety Events</div>
            {renderNumberInput('Hard Braking', driver.hardBrakingEvents, (v) => handleDriverChange('hardBrakingEvents', v), 0, 20, 1)}
            {renderNumberInput('Speeding Events', driver.speedingEvents, (v) => handleDriverChange('speedingEvents', v), 0, 20, 1)}

            <button type="button" className={styles.emitBtn} onClick={emitDriverUpdate}>
              Emit Driver Update
            </button>
          </div>
        );

      case 'customer':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>Customer Info</div>
            {renderTextInput('Customer ID', customer.customerId, (v) => handleCustomerChange('customerId', v))}
            {renderTextInput('Name', customer.name, (v) => handleCustomerChange('name', v))}
            {renderSelectInput('Account Type', customer.accountType, (v) => handleCustomerChange('accountType', v), ['RESIDENTIAL', 'COMMERCIAL', 'FLEET'])}
            {renderSelectInput('Subscription', customer.subscriptionTier, (v) => handleCustomerChange('subscriptionTier', v), ['WEEKLY', 'BIWEEKLY', 'MONTHLY', 'ANNUAL'])}

            <div className={styles.sectionTitle}>Vehicle Info</div>
            {renderTextInput('Make', customer.vehicleMake, (v) => handleCustomerChange('vehicleMake', v))}
            {renderTextInput('Model', customer.vehicleModel, (v) => handleCustomerChange('vehicleModel', v))}
            {renderNumberInput('Year', customer.vehicleYear, (v) => handleCustomerChange('vehicleYear', v), 1990, 2026, 1)}
            {renderSelectInput('Fuel Type', customer.fuelType, (v) => handleCustomerChange('fuelType', v), ['DIESEL', 'REGULAR', 'PREMIUM'])}
            {renderNumberInput('Tank Size', customer.tankSize, (v) => handleCustomerChange('tankSize', v), 10, 50, 1, 'gal')}
            {renderNumberInput('Current Level', customer.currentLevelPercent, (v) => handleCustomerChange('currentLevelPercent', v), 0, 100, 1, '%')}

            <div className={styles.sectionTitle}>Identification</div>
            {renderTextInput('License Plate', customer.licensePlate, (v) => handleCustomerChange('licensePlate', v))}
            {renderTextInput('Color', customer.color, (v) => handleCustomerChange('color', v))}
          </div>
        );

      case 'weather':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>Weather Conditions</div>
            {renderNumberInput('Temperature', weather.temperature, (v) => handleWeatherChange('temperature', v), 0, 120, 1, 'F')}
            {renderSelectInput('Conditions', weather.conditions, (v) => handleWeatherChange('conditions', v), ['CLEAR', 'CLOUDY', 'RAIN', 'SNOW', 'FOG', 'STORM'])}
            {renderNumberInput('Wind Speed', weather.windSpeed, (v) => handleWeatherChange('windSpeed', v), 0, 60, 1, 'mph')}
          </div>
        );

      case 'inventory':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>Depot Tank Levels</div>
            {renderTextInput('Franchise ID', inventory.franchiseId, (v) => handleInventoryChange('franchiseId', v))}
            {renderNumberInput('Diesel Level', inventory.depotDieselLevel, (v) => handleInventoryChange('depotDieselLevel', v), 0, 10000, 100, 'gal')}
            {renderNumberInput('Regular Level', inventory.depotRegularLevel, (v) => handleInventoryChange('depotRegularLevel', v), 0, 5000, 100, 'gal')}
            {renderNumberInput('Premium Level', inventory.depotPremiumLevel, (v) => handleInventoryChange('depotPremiumLevel', v), 0, 2000, 100, 'gal')}
            {renderNumberInput('DEF Level', inventory.depotDefLevel, (v) => handleInventoryChange('depotDefLevel', v), 0, 1000, 50, 'gal')}
          </div>
        );

      case 'charging':
        return (
          <div className={styles.categoryContent}>
            <div className={styles.sectionTitle}>Charging Station</div>
            {renderTextInput('Vehicle ID', charging.vehicleId, (v) => handleChargingChange('vehicleId', v))}
            {renderTextInput('Station ID', charging.chargingStationId, (v) => handleChargingChange('chargingStationId', v))}
            {renderSelectInput('Status', charging.chargingStatus, (v) => handleChargingChange('chargingStatus', v), ['NOT_CONNECTED', 'CHARGING', 'CHARGED', 'ERROR'])}

            <div className={styles.sectionTitle}>Battery Status</div>
            {renderNumberInput('Start %', charging.batteryStartPercent, (v) => handleChargingChange('batteryStartPercent', v), 0, 100, 1, '%')}
            {renderNumberInput('Current %', charging.batteryCurrentPercent, (v) => handleChargingChange('batteryCurrentPercent', v), 0, 100, 1, '%')}

            <div className={styles.sectionTitle}>Charging Metrics</div>
            {renderNumberInput('Energy Delivered', charging.energyDeliveredKwh, (v) => handleChargingChange('energyDeliveredKwh', v), 0, 200, 1, 'kWh')}
            {renderNumberInput('Charging Power', charging.chargingPowerKw, (v) => handleChargingChange('chargingPowerKw', v), 0, 150, 1, 'kW')}
            {renderNumberInput('Time to Full', charging.estimatedTimeToFull, (v) => handleChargingChange('estimatedTimeToFull', v), 0, 600, 5, 'min')}

            <button type="button" className={styles.emitBtn} onClick={emitChargingUpdate}>
              Emit Charging Update
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.simulatorDev}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <a href="/" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
          <h1 className={styles.title}>Simulator Dev Console</h1>
          <span className={styles.badge}>DEV</span>
        </div>
        <div className={styles.headerRight}>
          <div className={`${styles.connectionStatus} ${connected ? styles.connected : styles.disconnected}`}>
            <span className={styles.statusDot} />
            {connected ? 'Connected' : 'Disconnected'}
          </div>
          <label className={styles.autoEmitLabel}>
            <input
              type="checkbox"
              checked={autoEmit}
              onChange={(e) => setAutoEmit(e.target.checked)}
            />
            Auto-emit on change
          </label>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* Sidebar - Category Navigation */}
        <nav className={styles.sidebar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
              </svg>
              <span>{cat.name}</span>
            </button>
          ))}
        </nav>

        {/* Main Panel - Inputs */}
        <main className={styles.mainPanel}>
          <div className={styles.panelHeader}>
            <h2>{CATEGORIES.find((c) => c.id === activeCategory)?.name}</h2>
          </div>
          <div className={styles.inputsContainer}>
            {renderCategoryContent()}
          </div>
        </main>

        {/* Right Panel - Scenarios & Log */}
        <aside className={styles.rightPanel}>
          {/* Quick Scenarios */}
          <div className={styles.scenariosSection}>
            <h3>Quick Scenarios</h3>
            <div className={styles.scenarioButtons}>
              <button type="button" onClick={simulateDeliveryStart} className={styles.scenarioBtn}>
                Start Delivery
              </button>
              <button type="button" onClick={simulateDeliveryComplete} className={styles.scenarioBtn}>
                Complete Delivery
              </button>
              <button type="button" onClick={simulateSafetyAlert} className={styles.scenarioBtn}>
                Safety Alert
              </button>
              <button type="button" onClick={simulateLowBattery} className={styles.scenarioBtn}>
                Low Battery
              </button>
            </div>
          </div>

          {/* Event Log */}
          <div className={styles.logSection}>
            <h3>Event Log</h3>
            <div className={styles.eventLog}>
              {eventLog.map((entry) => (
                <div key={entry.id} className={`${styles.logEntry} ${styles[entry.type]}`}>
                  <span className={styles.logTime}>{entry.timestamp}</span>
                  <span className={styles.logMessage}>{entry.message}</span>
                </div>
              ))}
              {eventLog.length === 0 && (
                <div className={styles.logEmpty}>No events yet</div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SimulatorDev;
