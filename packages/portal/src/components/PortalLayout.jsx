import { useNavigate, useLocation } from 'react-router-dom';
import styles from './PortalLayout.module.css';

// Approved SVG logo per DESIGN-RULES Section 9
const LOGO_SRC = '/logos/dispatch-logo.svg';

function PortalLayout({ children, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src={LOGO_SRC} alt="Dispatch" className={styles.logoImg} />
          <span className={styles.portalName}>Command Center</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.userName}>{user?.firstName} {user?.lastName}</span>
          <button className={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

export default PortalLayout;
