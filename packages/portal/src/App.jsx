import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, ProtectedRoute, SocketProvider } from '@shared/contexts';
import PortalLayout from './components/PortalLayout';
import SecondaryAuthGate from './components/SecondaryAuthGate';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Marketing from './pages/Marketing';
import FranchiseMonitor from './pages/FranchiseMonitor';
import FranchiseSales from './pages/FranchiseSales';
import LegalCompliance from './pages/LegalCompliance';
import SBA from './pages/SBA';
import Settings from './pages/Settings';
import WebsiteEditor from './pages/WebsiteEditor';
import Technology from './pages/Technology';
import FranchiseSupport from './pages/FranchiseSupport';
import Reports from './pages/Reports';
import MarketSandboxPage from './pages/MarketSandboxPage';
import WaitlistManagement from './pages/WaitlistManagement';

const AUTH_URL = import.meta.env.DEV ? 'http://localhost:5170' : 'https://auth.dispatch.app';
const ALLOWED_ROLES = ['holdings_admin'];

function AppContent() {
  const { user, logout, loading, sessionWarning, extendSession } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'var(--font-family)',
        background: 'var(--gray-900)',
        color: 'var(--white)'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute roles={ALLOWED_ROLES} redirectToAuth>
      <SocketProvider user={user} portalType="hq">
        {sessionWarning && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'var(--status-warning)',
            color: 'var(--black)',
            padding: 'var(--space-3)',
            textAlign: 'center',
            zIndex: 9999,
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Your session will expire soon due to inactivity.{' '}
            <button
              onClick={extendSession}
              style={{
                background: 'var(--gray-900)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-1) var(--space-3)',
                cursor: 'pointer',
                fontWeight: 'var(--font-weight-bold)',
                marginLeft: 'var(--space-3)'
              }}
            >
              Stay Logged In
            </button>
          </div>
        )}
        <PortalLayout user={user} onLogout={logout}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/finance" element={
              <SecondaryAuthGate area="finance">
                <Finance />
              </SecondaryAuthGate>
            } />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/franchise-monitor" element={<FranchiseMonitor />} />
            <Route path="/franchise-sales" element={<FranchiseSales />} />
            <Route path="/legal-compliance" element={<LegalCompliance />} />
            <Route path="/sba" element={<SBA />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/website-editor" element={
              <SecondaryAuthGate area="site-editor">
                <WebsiteEditor />
              </SecondaryAuthGate>
            } />
            <Route path="/technology" element={
              <SecondaryAuthGate area="dev">
                <Technology />
              </SecondaryAuthGate>
            } />
            <Route path="/franchise-support" element={<FranchiseSupport />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/market-sandbox" element={<MarketSandboxPage />} />
            <Route path="/waitlist" element={<WaitlistManagement />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PortalLayout>
      </SocketProvider>
    </ProtectedRoute>
  );
}

function App() {
  const handleSessionExpired = () => {
    window.location.href = `${AUTH_URL}?expired=true&return=${encodeURIComponent(window.location.href)}`;
  };

  const handleSessionWarning = () => {
    console.log('[HQ] Session expiring soon');
  };

  return (
    <AuthProvider
      onSessionExpired={handleSessionExpired}
      onSessionWarning={handleSessionWarning}
    >
      <AppContent />
    </AuthProvider>
  );
}

export default App;
