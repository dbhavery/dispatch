/**
 * Dispatch Market Analysis Sandbox
 * Dynamic financial modeling tool for franchise planning
 * Adjustable variables: drivers, subscriptions, fuel costs, wages, etc.
 * Created: 2026-01-26
 */

import { useState, useMemo } from 'react';
import styles from './MarketSandbox.module.css';

const DEFAULT_SCENARIO = {
  // Staffing
  drivers: 2,
  driverWage: 22, // $/hr
  hoursPerDriver: 40, // hrs/week

  // Subscriptions
  basicSubscribers: 86,
  premiumSubscribers: 42,
  annualSubscribers: 8,
  fleetContracts: 6,

  // Pricing
  basicPrice: 49, // $/month
  premiumPrice: 89, // $/month
  annualPrice: 499, // $/year
  fleetAvgPrice: 250, // $/month avg

  // Costs
  fuelCost: 3.50, // $/gallon purchase cost
  electricityCost: 0.15, // $/kWh
  insuranceCost: 1200, // $/month
  permitCost: 200, // $/month
  vanLease: 1500, // $/month per van
  vans: 1,

  // Operations
  fillUpsPerDay: 12,
  avgGallonsPerFillup: 15,
  deliveryDaysPerWeek: 5,
};

export default function MarketSandbox({ className = '' }) {
  const [scenario, setScenario] = useState(DEFAULT_SCENARIO);
  const [scenarioType, setScenarioType] = useState('base');

  // Calculate financials
  const calculations = useMemo(() => {
    const s = scenario;

    // Monthly Revenue
    const basicRevenue = s.basicSubscribers * s.basicPrice;
    const premiumRevenue = s.premiumSubscribers * s.premiumPrice;
    const annualRevenue = (s.annualSubscribers * s.annualPrice) / 12;
    const fleetRevenue = s.fleetContracts * s.fleetAvgPrice;
    const totalRevenue = basicRevenue + premiumRevenue + annualRevenue + fleetRevenue;

    // Monthly Costs
    const laborCost = s.drivers * s.driverWage * s.hoursPerDriver * 4.33; // weeks/month
    const fuelPurchaseCost = s.fillUpsPerDay * s.avgGallonsPerFillup * s.deliveryDaysPerWeek * 4.33 * s.fuelCost;
    const electricityCost = 500 * s.vans * s.electricityCost * 30; // ~500 kWh/van/day
    const fixedCosts = s.insuranceCost + s.permitCost + (s.vanLease * s.vans);
    const totalCosts = laborCost + fuelPurchaseCost + electricityCost + fixedCosts;

    // Profit
    const grossProfit = totalRevenue - totalCosts;
    const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue * 100) : 0;

    // Metrics
    const totalSubscribers = s.basicSubscribers + s.premiumSubscribers + s.annualSubscribers;
    const revenuePerSubscriber = totalSubscribers > 0 ? (totalRevenue / totalSubscribers) : 0;

    return {
      revenue: {
        basic: basicRevenue,
        premium: premiumRevenue,
        annual: annualRevenue,
        fleet: fleetRevenue,
        total: totalRevenue,
      },
      costs: {
        labor: laborCost,
        fuel: fuelPurchaseCost,
        electricity: electricityCost,
        fixed: fixedCosts,
        total: totalCosts,
      },
      profit: {
        gross: grossProfit,
        margin: profitMargin,
      },
      metrics: {
        totalSubscribers,
        revenuePerSubscriber,
        fillUpsPerMonth: s.fillUpsPerDay * s.deliveryDaysPerWeek * 4.33,
        gallonsPerMonth: s.fillUpsPerDay * s.avgGallonsPerFillup * s.deliveryDaysPerWeek * 4.33,
      }
    };
  }, [scenario]);

  // Update scenario
  const updateScenario = (updates) => {
    setScenario(prev => ({ ...prev, ...updates }));
  };

  // Scenario presets
  const applyPreset = (type) => {
    setScenarioType(type);
    if (type === 'low') {
      updateScenario({
        basicSubscribers: 50,
        premiumSubscribers: 20,
        annualSubscribers: 4,
        fleetContracts: 2,
        drivers: 1,
        fillUpsPerDay: 8,
      });
    } else if (type === 'high') {
      updateScenario({
        basicSubscribers: 150,
        premiumSubscribers: 80,
        annualSubscribers: 20,
        fleetContracts: 12,
        drivers: 3,
        vans: 2,
        fillUpsPerDay: 20,
      });
    } else {
      setScenario(DEFAULT_SCENARIO);
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={`${styles.sandbox} ${className}`}>
      {/* Scenario Selector */}
      <div className={styles.scenarioSelector}>
        <span className={styles.selectorLabel}>Scenario:</span>
        <div className={styles.selectorButtons}>
          {['low', 'base', 'high'].map(type => (
            <button
              key={type}
              onClick={() => applyPreset(type)}
              className={`${styles.selectorBtn} ${scenarioType === type ? styles.selectorBtnActive : ''}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {/* Inputs Column */}
        <div className={styles.inputsColumn}>
          {/* Subscription Inputs */}
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupTitle}>Subscriptions</div>
            <div className={styles.inputRow}>
              <label>Basic ({formatCurrency(scenario.basicPrice)}/mo)</label>
              <input
                type="number"
                value={scenario.basicSubscribers}
                onChange={(e) => updateScenario({ basicSubscribers: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.inputRow}>
              <label>Premium ({formatCurrency(scenario.premiumPrice)}/mo)</label>
              <input
                type="number"
                value={scenario.premiumSubscribers}
                onChange={(e) => updateScenario({ premiumSubscribers: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.inputRow}>
              <label>Annual ({formatCurrency(scenario.annualPrice)}/yr)</label>
              <input
                type="number"
                value={scenario.annualSubscribers}
                onChange={(e) => updateScenario({ annualSubscribers: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.inputRow}>
              <label>Fleet B2B</label>
              <input
                type="number"
                value={scenario.fleetContracts}
                onChange={(e) => updateScenario({ fleetContracts: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Staffing Inputs */}
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupTitle}>Staffing</div>
            <div className={styles.inputRow}>
              <label>Drivers</label>
              <input
                type="number"
                value={scenario.drivers}
                onChange={(e) => updateScenario({ drivers: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.inputRow}>
              <label>Wage ($/hr)</label>
              <input
                type="number"
                value={scenario.driverWage}
                onChange={(e) => updateScenario({ driverWage: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.inputRow}>
              <label>Vans</label>
              <input
                type="number"
                value={scenario.vans}
                onChange={(e) => updateScenario({ vans: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Cost Inputs */}
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupTitle}>Costs</div>
            <div className={styles.inputRow}>
              <label>Fuel ($/gal)</label>
              <input
                type="number"
                step="0.01"
                value={scenario.fuelCost}
                onChange={(e) => updateScenario({ fuelCost: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.inputRow}>
              <label>Insurance ($/mo)</label>
              <input
                type="number"
                value={scenario.insuranceCost}
                onChange={(e) => updateScenario({ insuranceCost: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.inputRow}>
              <label>Van lease ($/mo)</label>
              <input
                type="number"
                value={scenario.vanLease}
                onChange={(e) => updateScenario({ vanLease: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Operations Inputs */}
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupTitle}>Operations</div>
            <div className={styles.inputRow}>
              <label>Fill-ups/day</label>
              <input
                type="number"
                value={scenario.fillUpsPerDay}
                onChange={(e) => updateScenario({ fillUpsPerDay: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.inputRow}>
              <label>Avg gal/fill-up</label>
              <input
                type="number"
                value={scenario.avgGallonsPerFillup}
                onChange={(e) => updateScenario({ avgGallonsPerFillup: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className={styles.resultsColumn}>
          {/* Summary KPIs */}
          <div className={styles.summaryKpis}>
            <div className={`${styles.kpiCard} ${calculations.profit.gross >= 0 ? styles.kpiPositive : styles.kpiNegative}`}>
              <div className={styles.kpiLabel}>Monthly profit</div>
              <div className={styles.kpiValue}>{formatCurrency(calculations.profit.gross)}</div>
              <div className={styles.kpiSubtext}>{calculations.profit.margin.toFixed(1)}% margin</div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiLabel}>Monthly revenue</div>
              <div className={styles.kpiValue}>{formatCurrency(calculations.revenue.total)}</div>
            </div>
            <div className={styles.kpiCard}>
              <div className={styles.kpiLabel}>Monthly costs</div>
              <div className={styles.kpiValue}>{formatCurrency(calculations.costs.total)}</div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className={styles.breakdownCard}>
            <div className={styles.breakdownTitle}>Revenue breakdown</div>
            <div className={styles.breakdownItems}>
              <div className={styles.breakdownItem}>
                <span>Basic subscriptions</span>
                <span>{formatCurrency(calculations.revenue.basic)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Premium subscriptions</span>
                <span>{formatCurrency(calculations.revenue.premium)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Annual (prorated)</span>
                <span>{formatCurrency(calculations.revenue.annual)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Fleet contracts</span>
                <span>{formatCurrency(calculations.revenue.fleet)}</span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className={styles.breakdownCard}>
            <div className={styles.breakdownTitle}>Cost breakdown</div>
            <div className={styles.breakdownItems}>
              <div className={styles.breakdownItem}>
                <span>Labor</span>
                <span>{formatCurrency(calculations.costs.labor)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Fuel purchases</span>
                <span>{formatCurrency(calculations.costs.fuel)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Electricity</span>
                <span>{formatCurrency(calculations.costs.electricity)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Fixed (insurance, permits, lease)</span>
                <span>{formatCurrency(calculations.costs.fixed)}</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className={styles.breakdownCard}>
            <div className={styles.breakdownTitle}>Key metrics</div>
            <div className={styles.breakdownItems}>
              <div className={styles.breakdownItem}>
                <span>Total subscribers</span>
                <span>{calculations.metrics.totalSubscribers}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Revenue per subscriber</span>
                <span>{formatCurrency(calculations.metrics.revenuePerSubscriber)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Fill-ups per month</span>
                <span>{Math.round(calculations.metrics.fillUpsPerMonth)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Gallons per month</span>
                <span>{Math.round(calculations.metrics.gallonsPerMonth).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
