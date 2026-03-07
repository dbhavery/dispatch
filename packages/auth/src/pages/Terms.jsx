/**
 * Terms Page - Dispatch Auth Portal
 * Terms of Service and Privacy Policy
 */

import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

export default function Terms() {
  return (
    <div className={styles.page}>
      <div className={`${styles.container} ${styles.terms}`}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Dispatch</span>
        </div>

        <div className={styles.card}>
          <Link to="/signin" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <h1 className={styles.title}>Terms of Service</h1>

          <div className={styles.termsContent}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Dispatch's mobile fuel delivery services, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Service Description</h2>
            <p>
              Dispatch provides on-demand fuel delivery services to residential and commercial customers.
              Our services include delivery of gasoline, diesel, and DEF (Diesel Exhaust Fluid) to
              pre-approved locations.
            </p>

            <h2>3. User Responsibilities</h2>
            <ul>
              <li>Provide accurate vehicle and delivery location information</li>
              <li>Ensure the vehicle is accessible for fueling</li>
              <li>Maintain a valid payment method on file</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <p>
              Payment is processed automatically upon completion of delivery. Subscription customers
              are billed according to their selected plan (weekly, bi-weekly, or annual).
            </p>

            <h2>5. Cancellation Policy</h2>
            <p>
              Deliveries may be cancelled up to 2 hours before the scheduled delivery window without
              penalty. Late cancellations may incur a fee.
            </p>

            <h2>6. Safety</h2>
            <p>
              All our delivery vehicles and drivers comply with federal, state, and local safety
              regulations. Deliveries are performed by trained professionals using approved equipment.
            </p>

            <h2>7. Privacy</h2>
            <p>
              Your personal information is handled in accordance with our Privacy Policy. We collect
              only the information necessary to provide our services and protect your privacy.
            </p>

            <h2>8. Contact</h2>
            <p>
              For questions about these terms, please contact us at legal@dispatch.app.
            </p>

            <p style={{ marginTop: '30px', fontSize: '0.75rem', color: '#737373' }}>
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
