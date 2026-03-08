/**
 * Tests for SecondaryAuthGate component
 *
 * Verifies:
 *   - Owner bypass: owners see children immediately
 *   - Auth gate: unauthenticated users see the password prompt
 *   - Authenticated pass-through: shows children + optional warning banner
 *   - Submit flow: calls secondaryLogin and handles success/failure
 *   - Button disable when password empty or loading
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SecondaryAuthGate from '../SecondaryAuthGate';

// ---------------------------------------------------------------------------
// Mock the shared auth context — resolved via vitest.config.js alias
// ---------------------------------------------------------------------------
const mockAuth = {
  user: { id: '1', firstName: 'Test', lastName: 'User', role: 'holdings_admin' },
  isOwner: false,
  hasSecondaryAccess: vi.fn(() => false),
  secondaryLogin: vi.fn(async () => ({ success: true })),
  secondaryWarning: false,
  resetSecondaryTimer: vi.fn(),
};

vi.mock('@dispatch/shared/contexts/AuthContext', () => ({
  useAuth: () => mockAuth,
}));

function resetMockAuth(overrides = {}) {
  Object.assign(mockAuth, {
    user: { id: '1', firstName: 'Test', lastName: 'User', role: 'holdings_admin' },
    isOwner: false,
    hasSecondaryAccess: vi.fn(() => false),
    secondaryLogin: vi.fn(async () => ({ success: true })),
    secondaryWarning: false,
    resetSecondaryTimer: vi.fn(),
    ...overrides,
  });
}

beforeEach(() => {
  resetMockAuth();
});

// ---------------------------------------------------------------------------
// Owner bypass
// ---------------------------------------------------------------------------
describe('owner bypass', () => {
  it('renders children immediately when user isOwner', () => {
    resetMockAuth({ isOwner: true });

    render(
      <SecondaryAuthGate area="finance">
        <div data-testid="protected-content">Sensitive Data</div>
      </SecondaryAuthGate>,
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    // Should NOT show the auth gate
    expect(screen.queryByText('This area requires additional authentication.')).not.toBeInTheDocument();
  });

  it('does not call hasSecondaryAccess when isOwner', () => {
    resetMockAuth({ isOwner: true });

    render(
      <SecondaryAuthGate area="finance">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    expect(mockAuth.hasSecondaryAccess).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Auth gate (not authenticated)
// ---------------------------------------------------------------------------
describe('auth gate display', () => {
  it('shows password prompt when not authenticated for area', () => {
    resetMockAuth({ hasSecondaryAccess: vi.fn(() => false) });

    render(
      <SecondaryAuthGate area="finance">
        <div data-testid="protected-content">Hidden</div>
      </SecondaryAuthGate>,
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByText(/additional authentication/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  it('displays the correct area name in the gate title', () => {
    resetMockAuth();

    render(
      <SecondaryAuthGate area="finance">
        <div>Child</div>
      </SecondaryAuthGate>,
    );

    expect(screen.getByText('Finance')).toBeInTheDocument();
  });

  it('shows default icon for unknown areas', () => {
    resetMockAuth();

    render(
      <SecondaryAuthGate area="unknown-area">
        <div>Child</div>
      </SecondaryAuthGate>,
    );

    // Falls back to the area string as label
    expect(screen.getByText('unknown-area')).toBeInTheDocument();
  });

  it('shows the 15-minute timeout note', () => {
    resetMockAuth();

    render(
      <SecondaryAuthGate area="finance">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    expect(screen.getByText(/15 minutes of inactivity/i)).toBeInTheDocument();
  });

  it('disables submit button when password is empty', () => {
    resetMockAuth();

    render(
      <SecondaryAuthGate area="finance">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    const button = screen.getByRole('button', { name: /unlock access/i });
    expect(button).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Submit flow
// ---------------------------------------------------------------------------
describe('password submission', () => {
  it('calls secondaryLogin with entered password and area', async () => {
    const secondaryLogin = vi.fn(async () => ({ success: true }));
    resetMockAuth({ secondaryLogin });

    render(
      <SecondaryAuthGate area="finance">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    const input = screen.getByPlaceholderText(/enter your password/i);
    const button = screen.getByRole('button', { name: /unlock access/i });

    await userEvent.type(input, 'my-secret');
    await userEvent.click(button);

    expect(secondaryLogin).toHaveBeenCalledWith('my-secret', 'finance');
  });

  it('displays error message on failed login', async () => {
    const secondaryLogin = vi.fn(async () => ({ success: false, error: 'Wrong password' }));
    resetMockAuth({ secondaryLogin });

    render(
      <SecondaryAuthGate area="dev">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    const input = screen.getByPlaceholderText(/enter your password/i);
    const button = screen.getByRole('button', { name: /unlock access/i });

    await userEvent.type(input, 'wrong');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Wrong password')).toBeInTheDocument();
    });
  });

  it('shows default error message when no error string provided', async () => {
    const secondaryLogin = vi.fn(async () => ({ success: false }));
    resetMockAuth({ secondaryLogin });

    render(
      <SecondaryAuthGate area="finance">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    const input = screen.getByPlaceholderText(/enter your password/i);
    await userEvent.type(input, 'bad');
    await userEvent.click(screen.getByRole('button', { name: /unlock access/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
  });

  it('clears password field on failed login', async () => {
    const secondaryLogin = vi.fn(async () => ({ success: false, error: 'Nope' }));
    resetMockAuth({ secondaryLogin });

    render(
      <SecondaryAuthGate area="finance">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    const input = screen.getByPlaceholderText(/enter your password/i);
    await userEvent.type(input, 'bad');
    await userEvent.click(screen.getByRole('button', { name: /unlock access/i }));

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('shows Verifying... text while loading', async () => {
    // Make secondaryLogin hang to observe the loading state
    const secondaryLogin = vi.fn(() => new Promise(() => {}));
    resetMockAuth({ secondaryLogin });

    render(
      <SecondaryAuthGate area="finance">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    const input = screen.getByPlaceholderText(/enter your password/i);
    await userEvent.type(input, 'test');
    fireEvent.click(screen.getByRole('button', { name: /unlock access/i }));

    await waitFor(() => {
      expect(screen.getByText('Verifying...')).toBeInTheDocument();
    });
  });
});

// ---------------------------------------------------------------------------
// Authenticated pass-through
// ---------------------------------------------------------------------------
describe('authenticated state', () => {
  it('renders children when hasSecondaryAccess returns true', () => {
    resetMockAuth({ hasSecondaryAccess: vi.fn(() => true) });

    render(
      <SecondaryAuthGate area="finance">
        <div data-testid="protected-content">Financial Data</div>
      </SecondaryAuthGate>,
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('shows warning banner when secondaryWarning is true', () => {
    resetMockAuth({
      hasSecondaryAccess: vi.fn(() => true),
      secondaryWarning: true,
    });

    render(
      <SecondaryAuthGate area="finance">
        <div>Content</div>
      </SecondaryAuthGate>,
    );

    expect(screen.getByText(/session expiring soon/i)).toBeInTheDocument();
  });
});
