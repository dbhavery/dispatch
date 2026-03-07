/**
 * Dispatch Landing Page
 * FranchiseOS Dark Theme - Marketing Page
 * Content driven by siteContent.js for easy editing via HQ Portal
 */

import { useState, useEffect } from 'react';
import { FuelGauge } from '../components/FuelGauge';
import { SITE_CONTENT } from '../data/siteContent';
import styles from './Landing.module.css';

// Dev mode portal configuration (SVG icons - no emojis per DESIGN-RULES)
// Each portal includes devBypass=true and the appropriate role to skip authentication
const DEV_PORTALS = [
  { name: 'Landing Page', url: 'http://localhost:5173', description: 'Marketing Site', iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Auth Portal', url: 'http://localhost:5170', description: 'Sign In / Sign Up', iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { name: 'HQ Portal', url: 'http://localhost:5178?devBypass=true&role=holdings_admin', description: 'Holdings Admin', iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { name: 'Franchise Portal', url: 'http://localhost:5177?devBypass=true&role=franchise_owner', description: 'Owner / Manager', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { name: 'Driver Portal', url: 'http://localhost:5176?devBypass=true&role=driver', description: 'Driver App', iconPath: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16H3m10 0h6l2-4V8a1 1 0 00-1-1h-4' },
  { name: 'Customer Portal', url: 'http://localhost:5175?devBypass=true&role=customer', description: 'Customer Dashboard', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { name: 'Simulator', url: 'http://localhost:5173/dev/simulator', description: 'Dev Test Console', iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

// Check if running in dev mode
const isDev = import.meta.env.DEV;

// Destructure content from site content data
const {
  brand,
  navigation,
  hero,
  featuresSection,
  features: FEATURES,
  howItWorksSection,
  steps: STEPS,
  pricingSection,
  pricing: PRICING_TIERS,
  cta: ctaContent,
  franchiseSection,
  franchiseCards,
  footer: footerContent,
  modals,
} = SITE_CONTENT;

function Landing() {
  const [theme, setTheme] = useState('dark');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(null);
  const [showDevPortals, setShowDevPortals] = useState(false);

  // Dev mode URLs - use local ports in dev, production URLs otherwise
  const signInUrl = isDev ? 'http://localhost:5170' : navigation.signInUrl;
  const signUpUrl = isDev ? 'http://localhost:5170/signup' : navigation.signUpUrl;

  // Keyboard shortcut to toggle dev portal selector (Ctrl+Shift+D)
  useEffect(() => {
    if (!isDev) return;

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDevPortals((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Dark theme uses white+red logo (white "Sta" + red "Full" on dark bg)
  // Light theme uses black+red logo (black "Sta" + red "Full" on light bg)
  const logoSrc = theme === 'light'
    ? '/logos/dispatch-logo-light-transparent.svg'
    : '/logos/dispatch-logo.svg';

  // All-white logo only for red backgrounds (fringe cases)
  const logoSrcWhite = '/logos/dispatch-logo-white-transparent.svg';

  return (
    <div className={`${styles.landing} ${theme === 'light' ? styles.lightTheme : ''}`}>
      {/* Header */}
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          <img src={logoSrc} alt="Dispatch" className={styles.logoImg} />
        </a>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {theme === 'dark' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              )}
            </svg>
          </button>
          <a href={signInUrl} className={styles.signInBtn}>
            {navigation.signInText}
          </a>
          <a href={signUpUrl} className={styles.getStartedBtn}>
            {navigation.getStartedText}
          </a>
          {isDev && (
            <button
              type="button"
              className={styles.devPortalBtn}
              onClick={() => setShowDevPortals(true)}
              title="Dev Portals (Ctrl+Shift+D)"
            >
              DEV
            </button>
          )}
        </div>
      </header>

      {/* Hero Section - Two Column Layout */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {hero.title}<br />
              <span className={styles.heroAccent}>{hero.titleAccent}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {hero.subtitle}
            </p>
            <div className={styles.heroActions}>
              <a href={signUpUrl} className={styles.primaryBtn}>
                {hero.primaryCta.text}
              </a>
              <button type="button" className={styles.secondaryBtn} onClick={() => setShowDemoModal(true)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {hero.secondaryCta.text}
              </button>
            </div>
            <div className={styles.heroStats}>
              {hero.stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroVisualLogo}>
              <img src={logoSrc} alt="Dispatch" className={styles.heroLogo} />
            </div>
            <FuelGauge theme={theme} className={styles.heroGauge} />
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className={styles.sectionSeparator} />

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{featuresSection.title}</h2>
            <p className={styles.sectionSubtitle}>{featuresSection.subtitle}</p>
          </div>
          <div className={styles.featureGrid}>
            {FEATURES.map((feature) => (
              <button
                key={feature.title}
                type="button"
                className={styles.featureCard}
                onClick={() => setSelectedFeature(feature)}
              >
                <div className={styles.featureIcon}>
                  <img src={theme === 'light' ? feature.iconLight : feature.iconDark} alt={feature.title} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className={styles.sectionSeparator} />

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{howItWorksSection.title}</h2>
            <p className={styles.sectionSubtitle}>{howItWorksSection.subtitle}</p>
          </div>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <div key={step.number} className={styles.stepCard}>
                <button
                  type="button"
                  className={styles.stepNumber}
                  onClick={() => setSelectedStep(step)}
                  aria-label={`Step ${step.number}: ${step.title} - Click for details`}
                >
                  {step.number}
                </button>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className={styles.sectionSeparator} />

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{pricingSection.title}</h2>
            <p className={styles.sectionSubtitle}>{pricingSection.subtitle}</p>
          </div>
          <div className={styles.pricingGrid}>
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`${styles.pricingCard} ${tier.highlight ? styles.pricingHighlight : ''}`}
              >
                {tier.highlight && tier.badge && <div className={styles.pricingBadge}>{tier.badge}</div>}
                <h3 className={styles.pricingName}>{tier.name}</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.pricingDollar}>$</span>
                  <span className={styles.pricingAmount}>{tier.price.toFixed(2).split('.')[0]}</span>
                  <span className={styles.pricingCents}>.{tier.price.toFixed(2).split('.')[1]}</span>
                  <span className={styles.pricingPeriod}>{tier.period}</span>
                </div>
                <p className={styles.pricingDesc}>{tier.description}</p>
                <ul className={styles.pricingFeatures}>
                  {tier.features.map((feature, index) => (
                    <li key={index} className={styles.pricingFeatureItem}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={styles.pricingCheck}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={signUpUrl} className={tier.highlight ? styles.primaryBtn : styles.secondaryBtn}>
                  {tier.ctaText || 'Get Started'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className={styles.sectionSeparator} />

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.sectionInner}>
          <h2 className={styles.ctaTitle}>{ctaContent.title}</h2>
          <p className={styles.ctaSubtitle}>
            {ctaContent.subtitle}
          </p>
          <a href={signUpUrl} className={styles.ctaBtn}>
            {ctaContent.buttonText}
          </a>
        </div>
      </section>

      {/* Section Separator */}
      <div className={styles.sectionSeparator} />

      {/* Franchise Section */}
      <section id="franchise" className={styles.franchise}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div className={styles.franchiseLogoWrapper}>
              <span className={styles.franchisePrefix}>{franchiseSection.prefix}</span>
              <img src={logoSrc} alt={brand.name} className={styles.franchiseLogo} />
              <span className={styles.franchiseSuffix}>{franchiseSection.suffix}</span>
            </div>
            <p className={styles.sectionSubtitle}>{franchiseSection.subtitle}</p>
          </div>
          <div className={styles.franchiseGrid}>
            {franchiseCards.map((card) => (
              <button
                key={card.id}
                type="button"
                className={styles.franchiseCard}
                onClick={() => card.comingSoon && setShowComingSoon(card.title)}
              >
                <div className={styles.franchiseIcon}>
                  <img src={theme === 'light' ? card.iconLight : card.iconDark} alt={card.title} />
                </div>
                <h3 className={styles.franchiseCardTitle}>{card.title}</h3>
                <p className={styles.franchiseCardDesc}>{card.description}</p>
                <span className={styles.franchiseLink}>{card.linkText}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <a href="/" className={styles.logo}>
              <img src={logoSrc} alt={brand.name} className={styles.logoImg} />
            </a>
            <p className={styles.footerTagline}>{brand.tagline}</p>
          </div>
          <div className={styles.footerLinks}>
            {footerContent.columns.map((column) => (
              <div key={column.title} className={styles.footerColumn}>
                <h4>{column.title}</h4>
                {column.links.map((link) =>
                  link.comingSoon ? (
                    <button
                      key={link.label}
                      type="button"
                      className={styles.footerLink}
                      onClick={() => setShowComingSoon(link.label)}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a key={link.label} href={link.href}>{link.label}</a>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>{brand.copyright}</p>
        </div>
      </footer>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className={styles.modalOverlay} onClick={() => setSelectedFeature(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setSelectedFeature(null)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className={styles.modalIcon}>
              <img src={theme === 'light' ? selectedFeature.iconLight : selectedFeature.iconDark} alt={selectedFeature.title} />
            </div>
            <h3 className={styles.modalTitle}>{selectedFeature.title}</h3>
            <h4 className={styles.modalHeading}>{selectedFeature.details.heading}</h4>
            <ul className={styles.modalList}>
              {selectedFeature.details.bullets.map((bullet, index) => (
                <li key={index} className={styles.modalListItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={styles.checkIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <a href={signUpUrl} className={styles.primaryBtn}>
              Get Started
            </a>
          </div>
        </div>
      )}

      {/* Step Detail Modal */}
      {selectedStep && (
        <div className={styles.modalOverlay} onClick={() => setSelectedStep(null)}>
          <div className={styles.stepModal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setSelectedStep(null)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className={styles.stepModalNumber}>{selectedStep.number}</div>
            <h3 className={styles.modalTitle}>{selectedStep.title}</h3>
            <h4 className={styles.modalHeading}>{selectedStep.details.heading}</h4>
            <ul className={styles.modalList}>
              {selectedStep.details.bullets.map((bullet, index) => (
                <li key={index} className={styles.modalListItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={styles.checkIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <a href={signUpUrl} className={styles.primaryBtn}>
              Get Started
            </a>
          </div>
        </div>
      )}

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className={styles.modalOverlay} onClick={() => setShowComingSoon(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setShowComingSoon(null)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className={styles.modalIcon}>
              <svg viewBox="0 0 80 80" width="80" height="80">
                <circle cx="40" cy="40" r="36" style={{ fill: 'var(--gray-800)' }} />
                <path d="M40 20v25l12 7" fill="none" style={{ stroke: 'var(--red)' }} strokeWidth="4" strokeLinecap="round" />
                <circle cx="40" cy="40" r="3" style={{ fill: 'var(--red)' }} />
              </svg>
            </div>
            <h3 className={styles.modalTitle}>{showComingSoon}</h3>
            <h4 className={styles.modalHeading}>{modals.comingSoon.heading}</h4>
            <p style={{ color: 'var(--gray-400)', textAlign: 'center', marginBottom: 'var(--space-5)' }}>
              {modals.comingSoon.message}
            </p>
            <button type="button" className={styles.primaryBtn} onClick={() => setShowComingSoon(null)}>
              {modals.comingSoon.buttonText}
            </button>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemoModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDemoModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setShowDemoModal(false)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className={styles.modalIcon}>
              <svg viewBox="0 0 80 80" width="80" height="80">
                <circle cx="40" cy="40" r="36" style={{ fill: 'var(--gray-800)' }} />
                <path d="M32 25v30l24-15z" style={{ fill: 'var(--red)' }} />
              </svg>
            </div>
            <h3 className={styles.modalTitle}>{modals.demo.title}</h3>
            <h4 className={styles.modalHeading}>{modals.demo.heading}</h4>
            <p style={{ color: 'var(--gray-400)', textAlign: 'center', marginBottom: 'var(--space-5)' }}>
              {modals.demo.message}
            </p>
            <a href={signUpUrl} className={styles.primaryBtn}>
              {modals.demo.buttonText}
            </a>
          </div>
        </div>
      )}

      {/* Dev Portal Selector Modal (Dev Mode Only) */}
      {isDev && showDevPortals && (
        <div className={styles.modalOverlay} onClick={() => setShowDevPortals(false)}>
          <div className={styles.devPortalModal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setShowDevPortals(false)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className={styles.devPortalBadge}>DEV MODE</div>
            <h3 className={styles.devPortalTitle}>Portal Selector</h3>
            <p className={styles.devPortalSubtitle}>Quick access to all Dispatch portals</p>
            <div className={styles.devPortalGrid}>
              {DEV_PORTALS.map((portal) => (
                <a
                  key={portal.name}
                  href={portal.url}
                  className={styles.devPortalCard}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.devPortalIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={portal.iconPath} />
                    </svg>
                  </div>
                  <span className={styles.devPortalName}>{portal.name}</span>
                  <span className={styles.devPortalDesc}>{portal.description}</span>
                </a>
              ))}
            </div>
            <p className={styles.devPortalHint}>Press Ctrl+Shift+D to toggle this panel</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
