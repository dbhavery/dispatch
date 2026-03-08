/**
 * Tests for PortalLayout component
 *
 * Verifies:
 *   - Header renders with logo and user name
 *   - Logout button fires onLogout callback
 *   - Children render in main content area
 *   - Logo click navigates to dashboard root
 *   - Portal name "Command Center" is displayed
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import PortalLayout from '../PortalLayout';

// Capture navigate calls
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderLayout(props = {}) {
  const defaultProps = {
    user: { firstName: 'Don', lastName: 'Havery' },
    onLogout: vi.fn(),
    children: <div data-testid="child-content">Dashboard Content</div>,
  };

  const merged = { ...defaultProps, ...props };

  return render(
    <MemoryRouter initialEntries={['/']}>
      <PortalLayout user={merged.user} onLogout={merged.onLogout}>
        {merged.children}
      </PortalLayout>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Header rendering
// ---------------------------------------------------------------------------
describe('header rendering', () => {
  it('renders the Dispatch logo image', () => {
    renderLayout();

    const logo = screen.getByAltText('Dispatch');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logos/dispatch-logo.svg');
  });

  it('displays the portal name "Command Center"', () => {
    renderLayout();

    expect(screen.getByText('Command Center')).toBeInTheDocument();
  });

  it('displays the user full name', () => {
    renderLayout({ user: { firstName: 'Jane', lastName: 'Smith' } });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('handles missing user gracefully', () => {
    renderLayout({ user: null });

    // Should not throw; name area should be empty or show undefined
    expect(screen.getByText('Command Center')).toBeInTheDocument();
  });

  it('renders the Logout button', () => {
    renderLayout();

    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Logout behavior
// ---------------------------------------------------------------------------
describe('logout handler', () => {
  it('calls onLogout when Logout button is clicked', async () => {
    const onLogout = vi.fn();
    renderLayout({ onLogout });

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    await userEvent.click(logoutBtn);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('does not navigate on logout click', async () => {
    const onLogout = vi.fn();
    renderLayout({ onLogout });

    await userEvent.click(screen.getByRole('button', { name: /logout/i }));

    // Navigation is not the layout's job on logout; the parent handles redirect
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Main content rendering
// ---------------------------------------------------------------------------
describe('main content', () => {
  it('renders children inside the main area', () => {
    renderLayout();

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    renderLayout({
      children: (
        <>
          <div data-testid="child-a">A</div>
          <div data-testid="child-b">B</div>
        </>
      ),
    });

    expect(screen.getByTestId('child-a')).toBeInTheDocument();
    expect(screen.getByTestId('child-b')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Logo navigation
// ---------------------------------------------------------------------------
describe('logo navigation', () => {
  it('navigates to root when logo is clicked', async () => {
    renderLayout();

    // The logo container (div with onClick) contains the image
    const logo = screen.getByAltText('Dispatch');
    await userEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
