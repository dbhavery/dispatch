/**
 * HQ Portal - Settings Center
 * System configuration and preferences
 * Dark industrial theme following DESIGN-RULES.md
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';

// Mock data - will be replaced by API
const MOCK_USER = {
  name: 'Admin User',
  email: 'admin@dispatch.app',
  role: 'Holdings Admin',
  phone: '(512) 555-0100',
  avatar: null,
  twoFactor: true,
  lastLogin: '2026-01-22 09:45 AM'
};

const MOCK_SETTINGS = {
  notifications: {
    email: {
      newFranchise: true,
      financialAlerts: true,
      complianceExpiring: true,
      systemAlerts: true,
      weeklyReport: true,
      marketingDigest: false
    },
    push: {
      urgentAlerts: true,
      orderUpdates: false,
      driverStatus: false
    }
  },
  integrations: [
    { id: 1, name: 'Stripe', status: 'connected', lastSync: '2026-01-22 08:30 AM' },
    { id: 2, name: 'QuickBooks', status: 'connected', lastSync: '2026-01-22 07:00 AM' },
    { id: 3, name: 'Salesforce', status: 'connected', lastSync: '2026-01-21 11:45 PM' },
    { id: 4, name: 'Twilio', status: 'connected', lastSync: '2026-01-22 09:00 AM' },
    { id: 5, name: 'AWS S3', status: 'connected', lastSync: '2026-01-22 09:15 AM' },
  ],
  apiKeys: [
    { id: 1, name: 'Production API', key: 'sf_prod_****4f2a', created: '2025-06-15', lastUsed: '2026-01-22' },
    { id: 2, name: 'Staging API', key: 'sf_stag_****8b1c', created: '2025-08-20', lastUsed: '2026-01-20' },
    { id: 3, name: 'Mobile App', key: 'sf_mobi_****3d9e', created: '2025-10-01', lastUsed: '2026-01-22' },
  ]
};

export default function Settings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [notifications, setNotifications] = useState(MOCK_SETTINGS.notifications);

  const toggleNotification = (category, key) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
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
            <h1 className={styles.pageTitle}>Settings</h1>
            <p className={styles.pageSubtitle}>System configuration and preferences</p>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className={styles.main}>
        {/* Navigation Sidebar */}
        <nav className={styles.nav}>
          {[
            { id: 'account', label: 'Account', icon: 'user' },
            { id: 'notifications', label: 'Notifications', icon: 'bell' },
            { id: 'integrations', label: 'Integrations', icon: 'link' },
            { id: 'api', label: 'API keys', icon: 'key' },
            { id: 'security', label: 'Security', icon: 'shield' },
            { id: 'billing', label: 'Billing', icon: 'card' },
          ].map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className={styles.navIcon}>
                {item.icon === 'user' && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M15 15.75v-1.5a3 3 0 00-3-3H6a3 3 0 00-3 3v1.5M9 8.25a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.icon === 'bell' && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M13.5 6a4.5 4.5 0 10-9 0c0 5.25-2.25 6.75-2.25 6.75h13.5S13.5 11.25 13.5 6M10.3 15.75a1.5 1.5 0 01-2.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.icon === 'link' && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M7.5 10.5a3.75 3.75 0 005.303 0l2.25-2.25a3.752 3.752 0 00-5.303-5.303l-1.125 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.5 7.5a3.75 3.75 0 00-5.303 0l-2.25 2.25a3.752 3.752 0 005.303 5.303l1.125-1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.icon === 'key' && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M15.75 2.25l-1.5 1.5M11.625 6.375L14.25 3.75l1.5 1.5-2.625 2.625M11.625 6.375l-3.75 3.75a3 3 0 11-1.5-1.5l3.75-3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.icon === 'shield' && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 16.5s6-3 6-7.5V3.75L9 1.5 3 3.75V9c0 4.5 6 7.5 6 7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.icon === 'card' && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1.5" y="3.75" width="15" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.5 7.5h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className={styles.content}>
          {activeSection === 'account' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Account settings</h2>
                <p className={styles.sectionDesc}>Manage your profile and account preferences</p>
              </div>

              <div className={styles.card}>
                <div className={styles.profileHeader}>
                  <div className={styles.avatar}>
                    <span>{MOCK_USER.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className={styles.profileInfo}>
                    <div className={styles.profileName}>{MOCK_USER.name}</div>
                    <div className={styles.profileRole}>{MOCK_USER.role}</div>
                  </div>
                  <button className={`${styles.btn} ${styles.btnSecondary}`}>
                    Change photo
                  </button>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Personal information</div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full name</label>
                    <input type="text" className={styles.input} defaultValue={MOCK_USER.name} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email address</label>
                    <input type="email" className={styles.input} defaultValue={MOCK_USER.email} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone number</label>
                    <input type="tel" className={styles.input} defaultValue={MOCK_USER.phone} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Role</label>
                    <input type="text" className={styles.input} defaultValue={MOCK_USER.role} disabled />
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>Save changes</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Notification preferences</h2>
                <p className={styles.sectionDesc}>Choose how you want to be notified</p>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Email notifications</div>
                <div className={styles.toggleList}>
                  {Object.entries(notifications.email).map(([key, value]) => (
                    <div key={key} className={styles.toggleItem}>
                      <div className={styles.toggleInfo}>
                        <div className={styles.toggleLabel}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                      </div>
                      <button
                        className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}
                        onClick={() => toggleNotification('email', key)}
                      >
                        <span className={styles.toggleDot}></span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Push notifications</div>
                <div className={styles.toggleList}>
                  {Object.entries(notifications.push).map(([key, value]) => (
                    <div key={key} className={styles.toggleItem}>
                      <div className={styles.toggleInfo}>
                        <div className={styles.toggleLabel}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                      </div>
                      <button
                        className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}
                        onClick={() => toggleNotification('push', key)}
                      >
                        <span className={styles.toggleDot}></span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Integrations</h2>
                <p className={styles.sectionDesc}>Manage connected services and applications</p>
              </div>

              <div className={styles.card}>
                <div className={styles.integrationList}>
                  {MOCK_SETTINGS.integrations.map((integration) => (
                    <div key={integration.id} className={styles.integrationItem}>
                      <div className={styles.integrationIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className={styles.integrationInfo}>
                        <div className={styles.integrationName}>{integration.name}</div>
                        <div className={styles.integrationMeta}>Last sync: {integration.lastSync}</div>
                      </div>
                      <div className={`${styles.statusBadge} ${styles.connected}`}>Connected</div>
                      <button className={styles.integrationBtn}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3v10M8 3l4 4M8 3L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <button className={`${styles.btn} ${styles.btnOutline}`}>Add integration</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>API keys</h2>
                <p className={styles.sectionDesc}>Manage API access for external applications</p>
              </div>

              <div className={styles.card}>
                <div className={styles.apiList}>
                  {MOCK_SETTINGS.apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className={styles.apiItem}>
                      <div className={styles.apiInfo}>
                        <div className={styles.apiName}>{apiKey.name}</div>
                        <div className={styles.apiKey}>{apiKey.key}</div>
                        <div className={styles.apiMeta}>
                          Created: {apiKey.created} | Last used: {apiKey.lastUsed}
                        </div>
                      </div>
                      <div className={styles.apiActions}>
                        <button className={`${styles.btn} ${styles.btnSmall} ${styles.btnSecondary}`}>
                          Regenerate
                        </button>
                        <button className={`${styles.btn} ${styles.btnSmall} ${styles.btnOutline}`}>
                          Revoke
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <button className={`${styles.btn} ${styles.btnPrimary}`}>Create new key</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Security</h2>
                <p className={styles.sectionDesc}>Manage your account security settings</p>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Password</div>
                <p className={styles.cardDesc}>Last changed 30 days ago</p>
                <div className={styles.cardFooter}>
                  <button className={`${styles.btn} ${styles.btnSecondary}`}>Change password</button>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.securityRow}>
                  <div className={styles.securityInfo}>
                    <div className={styles.securityTitle}>Two-factor authentication</div>
                    <div className={styles.securityDesc}>Add an extra layer of security to your account</div>
                  </div>
                  <div className={`${styles.statusBadge} ${MOCK_USER.twoFactor ? styles.enabled : ''}`}>
                    {MOCK_USER.twoFactor ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <button className={`${styles.btn} ${styles.btnOutline}`}>
                    {MOCK_USER.twoFactor ? 'Manage 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Active sessions</div>
                <div className={styles.sessionList}>
                  <div className={styles.sessionItem}>
                    <div className={styles.sessionIcon}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M6 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className={styles.sessionInfo}>
                      <div className={styles.sessionDevice}>Windows - Chrome</div>
                      <div className={styles.sessionMeta}>Austin, TX - Current session</div>
                    </div>
                    <span className={`${styles.statusBadge} ${styles.current}`}>Current</span>
                  </div>
                  <div className={styles.sessionItem}>
                    <div className={styles.sessionIcon}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className={styles.sessionInfo}>
                      <div className={styles.sessionDevice}>iPhone - Safari</div>
                      <div className={styles.sessionMeta}>Austin, TX - 2 hours ago</div>
                    </div>
                    <button className={`${styles.btn} ${styles.btnSmall} ${styles.btnOutline}`}>
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Billing</h2>
                <p className={styles.sectionDesc}>Manage your subscription and payment methods</p>
              </div>

              <div className={styles.card}>
                <div className={styles.planHeader}>
                  <div className={styles.planInfo}>
                    <div className={styles.planName}>Enterprise Plan</div>
                    <div className={styles.planPrice}>Custom pricing</div>
                  </div>
                  <span className={`${styles.statusBadge} ${styles.active}`}>Active</span>
                </div>
                <div className={styles.planFeatures}>
                  <div className={styles.feature}>Unlimited territories</div>
                  <div className={styles.feature}>Priority support</div>
                  <div className={styles.feature}>Custom integrations</div>
                  <div className={styles.feature}>Advanced analytics</div>
                </div>
                <div className={styles.cardFooter}>
                  <button className={`${styles.btn} ${styles.btnSecondary}`}>Contact sales</button>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Payment method</div>
                <div className={styles.paymentMethod}>
                  <div className={styles.cardIcon}>
                    <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                      <rect width="32" height="24" rx="4" fill="#1a1f36"/>
                      <circle cx="12" cy="12" r="6" fill="#eb001b"/>
                      <circle cx="20" cy="12" r="6" fill="#f79e1b" fillOpacity="0.8"/>
                    </svg>
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardNumber}>Mastercard ending in 4242</div>
                    <div className={styles.cardExpiry}>Expires 12/2027</div>
                  </div>
                  <button className={`${styles.btn} ${styles.btnSmall} ${styles.btnOutline}`}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
