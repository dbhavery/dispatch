import '../dispatch-system.css';

export default function DispatchDesignSystemPage() {
  return (
    <div className="dp-page" style={{ padding: 14, gap: 10, overflow: 'auto' }}>
      {/* HEADER */}
      <header style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div className="dp-logo" style={{ fontSize: 20 }}>Dis<span className="dp-logo-red">patch</span></div>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 300, letterSpacing: 1 }}>DESIGN SYSTEM</span>
      </header>

      {/* MAIN GRID - Organic card placement */}
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 200px', gap: 10, alignItems: 'start' }}>

        {/* ═══════════════════════════════════════════════════════════════════
            COLUMN 1 - Design Tokens
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Color Palette */}
          <div className="dp-card" style={{ padding: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Color Palette</div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>Primary Gradient</div>
            <div className="dp-glossy dp-fill-red" style={{ height: 14, borderRadius: 4, marginBottom: 6 }} />
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>Neutral Colors</div>
            <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
              {['#f5f5f5', '#a0a0a0', '#606060', '#404040', '#1a1a1a'].map((c, i) => (
                <div key={i} style={{ flex: 1, height: 18, borderRadius: 3, background: c }} />
              ))}
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Fuel Type Colors</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[
                { color: '#31b34a', label: 'Diesel' },
                { color: '#f2c94c', label: 'Regular' },
                { color: '#d06363', label: 'Premium' },
                { color: '#4a7ce8', label: 'DEF' },
              ].map((p, i) => (
                <div key={i} className="dp-pill dp-glossy" style={{ padding: '2px 6px', borderRadius: 4, background: `linear-gradient(180deg, ${p.color}, ${p.color}88)`, fontSize: 6, fontWeight: 600 }}>{p.label}</div>
              ))}
            </div>
          </div>

          {/* Status Indicators */}
          <div className="dp-card" style={{ padding: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Status Indicators</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {[
                { color: '#31b34a', label: 'Success' },
                { color: '#f2c94c', label: 'Warning' },
                { color: '#d06363', label: 'Error' },
                { color: '#4a7ce8', label: 'Info' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div className="dp-glossy" style={{ width: 10, height: 10, borderRadius: '50%', background: `linear-gradient(180deg, ${s.color}, ${s.color}77)` }} />
                  <span style={{ fontSize: 8 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Driver App - Compact */}
          <div className="dp-card" style={{ padding: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Tablet Driver App</div>
            <div style={{ background: 'linear-gradient(180deg, #2a2b2f, #1a1b1e)', borderRadius: 8, padding: 4, boxShadow: '0 6px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
              <div style={{ borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ height: 70, background: 'linear-gradient(180deg, #c8ccd2, #b0b4ba)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                  <div style={{ position: 'absolute', top: '45%', left: '50%', width: 12, height: 12, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg) translate(-50%, -50%)', background: 'linear-gradient(135deg, #ff4444, #a30000)', boxShadow: '0 2px 4px rgba(163,0,0,0.5)' }} />
                </div>
                <div style={{ background: '#1a1b1e', padding: '4px 5px', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.4)' }}>≡</span>
                  <span style={{ fontSize: 6, flex: 1, color: 'rgba(255,255,255,0.5)' }}>Secondary</span>
                  <button className="dp-btn dp-glossy dp-fill-red" style={{ padding: '2px 6px', fontSize: 5 }}>Start Shift</button>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="dp-card" style={{ padding: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Typography</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 1 }}>Heading Bold</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 1 }}>Subheading</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Body text</div>
            <div style={{ fontSize: 26, fontWeight: 300, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>Aa</div>
          </div>

          {/* Buttons */}
          <div className="dp-card" style={{ padding: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Buttons</div>
            <button className="dp-btn dp-glossy dp-fill-red" style={{ width: '100%', padding: '6px 10px', fontSize: 9, marginBottom: 4 }}>Confirm Delivery</button>
            <button className="dp-btn dp-glossy dp-fill-grey" style={{ width: '100%', padding: '6px 10px', fontSize: 9, marginBottom: 4 }}>Schedule Pickup</button>
            <button className="dp-btn-outline-red" style={{ width: '100%', padding: '6px 10px', fontSize: 9 }}>Cancel Order</button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            COLUMN 2 - Main Content (Center)
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Row 1: Typography + Buttons/Pills */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="dp-card" style={{ flex: 1, padding: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Typography</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>Heading Bold</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>Subheading Semibold</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Body Text</div>
              <div style={{ fontSize: 36, fontWeight: 300, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>Aa</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 150 }}>
              <div className="dp-card" style={{ padding: 10 }}>
                <button className="dp-btn dp-glossy dp-fill-red" style={{ width: '100%', padding: '8px 12px', fontSize: 10, marginBottom: 5 }}>Get Fuel</button>
                <button className="dp-btn dp-glossy dp-fill-grey" style={{ width: '100%', padding: '8px 12px', fontSize: 10 }}>Schedule Delivery</button>
              </div>
              <div className="dp-card" style={{ padding: 10 }}>
                <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span className="dp-pill dp-glossy" style={{ padding: '3px 8px', borderRadius: 4, background: 'linear-gradient(180deg, #45d975, #1a8f40)', fontSize: 7, fontWeight: 700 }}>NEW</span>
                  <span className="dp-pill dp-glossy" style={{ padding: '3px 8px', borderRadius: 4, background: 'linear-gradient(180deg, #ffe066, #d4a020)', fontSize: 7, fontWeight: 700, color: '#1a1b1e' }}>PAID</span>
                  <span className="dp-pill dp-glossy" style={{ padding: '3px 8px', borderRadius: 4, background: 'linear-gradient(180deg, #ff6b6b, #a30000)', fontSize: 7, fontWeight: 700 }}>URGENT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Map/Delivery Card - Contained */}
          <div className="dp-card" style={{ padding: 0, display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: '50%', background: 'linear-gradient(180deg, #c8ccd2, #b0b4ba)', position: 'relative', minHeight: 110 }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <path d="M 15% 80% Q 45% 25% 85% 45%" fill="none" stroke="#c8a000" strokeWidth="2.5" />
              </svg>
              <div style={{ position: 'absolute', top: '40%', left: '80%', transform: 'translate(-50%, -100%)' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: 'linear-gradient(135deg, #ff4444, #a30000)', boxShadow: '0 2px 5px rgba(163,0,0,0.5)' }} />
              </div>
            </div>
            <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Next Stop:</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 1 }}>123 Main St</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>75 Gallons · Diesel</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="dp-btn dp-glossy dp-fill-red" style={{ padding: '6px 12px', fontSize: 9 }}>$ Confirm</button>
                <button className="dp-btn dp-glossy dp-fill-grey" style={{ padding: '6px 12px', fontSize: 9 }}>Navigate</button>
              </div>
            </div>
          </div>

          {/* Row 3: KPIs */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'ORDERS', value: '128', sub: 'New' },
              { label: 'DISPATCH', value: '7', sub: 'Active Drivers' },
              { label: 'INVENTORY', value: '12,500', sub: 'Gal in Stock' },
              { label: 'REVENUE', value: '$84k', sub: '+19%', accent: true },
            ].map((kpi, i) => (
              <div key={i} className="dp-card" style={{ flex: 1, padding: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginBottom: 2, letterSpacing: 0.5 }}>{kpi.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: kpi.accent ? '#50e880' : 'inherit' }}>{kpi.value}</div>
                <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Row 4: Transactions + Chart */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="dp-card" style={{ flex: 1, padding: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Recent Transactions</div>
              {[
                { time: '11:28 AM', desc: 'Inventory refill', amount: '+$9,287', color: '#50e880' },
                { time: '10:07 AM', desc: 'Cooler maintenance', amount: '-$1,200', color: '#ff6b6b' },
                { time: '9:55 AM', desc: 'Diesel delivery', amount: '+$4,520', color: '#50e880' },
                { time: '8:30 AM', desc: 'Route completion', amount: '+$2,890', color: '#50e880' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', width: 46 }}>{t.time}</span>
                  <span style={{ fontSize: 8, flex: 1 }}>{t.desc}</span>
                  <span style={{ fontSize: 8, color: t.color, fontWeight: 600 }}>{t.amount}</span>
                </div>
              ))}
            </div>

            <div className="dp-card" style={{ width: 160, padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Weekly</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#50e880' }}>$140k</span>
              </div>
              <svg viewBox="0 0 140 50" style={{ width: '100%', height: 50 }}>
                <path d="M 0 42 L 25 38 L 50 28 L 75 32 L 100 20 L 125 16 L 140 12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <path d="M 0 42 L 25 38 L 50 28 L 75 32 L 100 20 L 125 16 L 140 12" fill="none" stroke="#a30000" strokeWidth="2" />
                <circle cx="140" cy="12" r="3" fill="#ff4444" />
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 6, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
              </div>
            </div>
          </div>

          {/* Row 5: Driver Leaderboard + Donut */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="dp-card" style={{ flex: 1, padding: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Driver Leaderboard</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { name: 'Erik F.', deliveries: 47 },
                  { name: 'Maria S.', deliveries: 43 },
                  { name: 'David C.', deliveries: 38 },
                  { name: 'Sarah K.', deliveries: 35 },
                  { name: 'James W.', deliveries: 31 },
                ].map((d, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ width: 28, height: 28, margin: '0 auto 3px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>{i + 1}</div>
                    <div style={{ fontSize: 7, marginBottom: 1 }}>{d.name}</div>
                    <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.4)' }}>{d.deliveries}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dp-card" style={{ width: 140, padding: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Expense Split</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 60 60" style={{ width: 50, height: 50 }}>
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#2a2b2f" strokeWidth="8" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#a30000" strokeWidth="8" strokeDasharray="85 66" strokeDashoffset="0" transform="rotate(-90 30 30)" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#31b34a" strokeWidth="8" strokeDasharray="35 116" strokeDashoffset="-85" transform="rotate(-90 30 30)" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#f2c94c" strokeWidth="8" strokeDasharray="20 131" strokeDashoffset="-120" transform="rotate(-90 30 30)" />
                </svg>
                <div style={{ fontSize: 7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 }}><div style={{ width: 6, height: 6, background: '#a30000', borderRadius: 1 }} /> Fuel 56%</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 }}><div style={{ width: 6, height: 6, background: '#31b34a', borderRadius: 1 }} /> Labor 24%</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}><div style={{ width: 6, height: 6, background: '#f2c94c', borderRadius: 1 }} /> Other 20%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 6: Order Queue + Bar Chart */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="dp-card" style={{ flex: 1, padding: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Order Queue</div>
              {[
                { id: '#58294', location: '456 Oak Ave', gallons: 150, type: 'Diesel', status: 'Next' },
                { id: '#58295', location: '789 Pine St', gallons: 200, type: 'Regular', status: 'Pending' },
                { id: '#58296', location: '321 Elm Dr', gallons: 75, type: 'Premium', status: 'Pending' },
              ].map((o, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, padding: '5px 6px', background: i === 0 ? 'rgba(163,0,0,0.15)' : 'transparent', borderRadius: 4 }}>
                  <span style={{ fontSize: 8, fontWeight: 600, width: 46 }}>{o.id}</span>
                  <span style={{ fontSize: 7, flex: 1, color: 'rgba(255,255,255,0.6)' }}>{o.location}</span>
                  <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>{o.gallons}gal</span>
                  <span className="dp-glossy" style={{ fontSize: 5, padding: '2px 5px', borderRadius: 3, background: i === 0 ? 'linear-gradient(180deg, #a30000, #750000)' : 'linear-gradient(180deg, #404040, #2a2a2a)', fontWeight: 600 }}>{o.status}</span>
                </div>
              ))}
            </div>

            <div className="dp-card" style={{ width: 180, padding: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Daily Deliveries</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50 }}>
                {[35, 42, 38, 55, 48, 62, 58].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div className="dp-glossy" style={{ width: '100%', height: v * 0.7, borderRadius: 2, background: i === 6 ? 'linear-gradient(180deg, #ff4444, #a30000)' : 'linear-gradient(180deg, #404040, #2a2a2a)' }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 6, color: 'rgba(255,255,255,0.25)', marginTop: 3 }}>
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            COLUMN 3 - Components
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Buttons & Inputs */}
          <div className="dp-card" style={{ padding: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Buttons & Inputs</div>
            <button className="dp-btn dp-glossy dp-fill-red" style={{ width: '100%', padding: '7px 12px', fontSize: 9, marginBottom: 5 }}>Get Fuel</button>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 5, padding: '7px 9px', fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 5 }}>Enter Location</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <span className="dp-pill dp-glossy" style={{ padding: '2px 7px', borderRadius: 4, background: 'linear-gradient(180deg, #45d975, #1a8f40)', fontSize: 6, fontWeight: 600 }}>NEW</span>
              <span className="dp-pill dp-glossy" style={{ padding: '2px 7px', borderRadius: 4, background: 'linear-gradient(180deg, #ffe066, #d4a020)', fontSize: 6, fontWeight: 600, color: '#1a1b1e' }}>PAID</span>
              <span className="dp-btn-outline" style={{ padding: '2px 7px', fontSize: 6 }}>⚡URGENT</span>
            </div>
          </div>

          {/* Fuel Level */}
          <div className="dp-card" style={{ padding: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Fuel Level</div>
            {[
              { label: 'Diesel', current: 875, max: 1000, fill: 'dp-progress-fill-diesel' },
              { label: 'Regular', current: 475, max: 600, fill: 'dp-progress-fill-regular' },
              { label: 'Premium', current: 300, max: 400, fill: 'dp-progress-fill-premium' },
              { label: 'DEF', current: 220, max: 500, fill: 'dp-progress-fill-def' },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? 6 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 8 }}>{f.label}</span>
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>{f.current}/{f.max}</span>
                </div>
                <div className="dp-progress-track" style={{ height: 5 }}>
                  <div className={`dp-progress-fill ${f.fill}`} style={{ width: `${(f.current / f.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Alerts */}
          <div className="dp-card" style={{ padding: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Recent Alerts</div>
            {[
              { color: '#d06363', text: 'Low fuel warning', sub: 'Truck #1972', badge: 'Urgent', badgeColor: '#a30000' },
              { color: '#f2c94c', text: 'Order delayed', sub: 'Route #108', badge: 'Review', badgeColor: '#d4a020' },
              { color: '#31b34a', text: 'Delivery complete', sub: 'Order #5291', badge: 'Done', badgeColor: '#1a8f40' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginBottom: i < 2 ? 6 : 0 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: a.color, marginTop: 3, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 8, fontWeight: 500 }}>{a.text}</span>
                    <span className="dp-glossy" style={{ fontSize: 5, padding: '1px 5px', borderRadius: 3, background: `linear-gradient(180deg, ${a.badgeColor}, ${a.badgeColor}88)`, fontWeight: 600 }}>{a.badge}</span>
                  </div>
                  <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)' }}>{a.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Drivers */}
          <div className="dp-card" style={{ padding: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Top Drivers</div>
            {[
              { name: 'Erik Fernandez', deliveries: 47, trend: '+12' },
              { name: 'Maria Santos', deliveries: 43, trend: '+8' },
              { name: 'David Chen', deliveries: 38, trend: '+5' },
              { name: 'Sarah Kim', deliveries: 35, trend: '+3' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 600 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 8 }}>{d.name}</div>
                  <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.35)' }}>{d.deliveries} deliveries</div>
                </div>
                <span style={{ fontSize: 7, color: '#50e880' }}>{d.trend}</span>
              </div>
            ))}
          </div>

          {/* Dashboard Overview */}
          <div className="dp-card" style={{ padding: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5, color: 'rgba(255,255,255,0.4)' }}>Dashboard Overview</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 5, padding: 8, marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#a30000', marginTop: 4 }} />
                <div>
                  <div style={{ fontSize: 9, fontWeight: 600 }}>Order #52981</div>
                  <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>125 Harmon Ave</div>
                  <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)' }}>◉ 250 Gallons</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 7 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 3 }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', width: 42 }}>10:07 AM</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Start Shift</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', width: 42 }}>6:07 AM</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Dispatch delay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPACING SCALE */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 6 }}>
        <span style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 1 }}>Spacing Scale</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
          {[
            { size: 4, h: 6 },
            { size: 6, h: 10 },
            { size: 10, h: 14 },
            { size: 14, h: 20 },
            { size: 18, h: 26, accent: true },
            { size: 30, h: 34, accent: true },
            { size: 45, h: 42, accent: true },
            { size: 90, h: 50, accent: true },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 18, height: s.h, borderRadius: 2, background: s.accent ? 'linear-gradient(180deg, #ff4444, #a30000)' : 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontSize: 7, color: s.accent ? '#ff6b6b' : 'rgba(255,255,255,0.25)', fontWeight: s.accent ? 600 : 400 }}>{s.size}px</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)' }}>Dispatch · Design System v1.0</span>
      </div>
    </div>
  );
}
