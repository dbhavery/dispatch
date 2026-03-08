/**
 * Tests for SignIn page (src/pages/SignIn.jsx)
 *
 * Verifies:
 *   - Form renders with email and password fields
 *   - Submit calls authService.login with correct args
 *   - Tokens stored in localStorage on success
 *   - Redirect via window.location.href on success
 *   - Error message displayed on failed login
 *   - Button disabled when fields empty or loading
 *   - Password show/hide toggle
 *   - Link to signup page
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SignIn from '../SignIn';

// ---------------------------------------------------------------------------
// Mock the auth API service
// ---------------------------------------------------------------------------
vi.mock('../../services/api', () => ({
  authService: {
    login: vi.fn(),
  },
  portalRedirectMap: {
    holdings_admin: 'http://localhost:5174',
    franchise_owner: 'http://localhost:5175',
    driver: 'http://localhost:5176',
    customer: 'http://localhost:5177',
  },
}));

import { authService } from '../../services/api';

function renderSignIn(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <SignIn />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Form rendering
// ---------------------------------------------------------------------------
describe('form rendering', () => {
  it('renders email input field', () => {
    renderSignIn();

    const emailInput = screen.getByPlaceholderText('you@example.com');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('renders password input field', () => {
    renderSignIn();

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('renders the Sign in button', () => {
    renderSignIn();

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders a link to the signup page', () => {
    renderSignIn();

    const link = screen.getByRole('link', { name: /create account/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });

  it('renders the forgot password link', () => {
    renderSignIn();

    const link = screen.getByRole('link', { name: /forgot password/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/forgot-password');
  });
});

// ---------------------------------------------------------------------------
// Submit button state
// ---------------------------------------------------------------------------
describe('submit button state', () => {
  it('is disabled when both fields are empty', () => {
    renderSignIn();

    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeDisabled();
  });

  it('is disabled when only email is filled', async () => {
    renderSignIn();

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@test.com');

    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeDisabled();
  });

  it('is enabled when both fields are filled', async () => {
    renderSignIn();

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'secret');

    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeEnabled();
  });
});

// ---------------------------------------------------------------------------
// Successful login
// ---------------------------------------------------------------------------
describe('successful login', () => {
  it('calls authService.login with email and password', async () => {
    authService.login.mockResolvedValueOnce({
      accessToken: 'at',
      refreshToken: 'rt',
      user: { role: 'holdings_admin', firstName: 'Don' },
    });

    renderSignIn();

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'admin@test.com');
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'pass');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(authService.login).toHaveBeenCalledWith('admin@test.com', 'pass');
  });

  it('stores tokens and user in localStorage on success', async () => {
    authService.login.mockResolvedValueOnce({
      accessToken: 'my-token',
      refreshToken: 'my-refresh',
      user: { role: 'holdings_admin', firstName: 'Don' },
    });

    renderSignIn();

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'admin@test.com');
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'pass');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'my-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'my-refresh');
    });
  });

  it('redirects to portal URL based on user role', async () => {
    authService.login.mockResolvedValueOnce({
      accessToken: 'at',
      refreshToken: 'rt',
      user: { role: 'holdings_admin' },
    });

    renderSignIn();

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'admin@test.com');
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'pass');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost:5174');
    });
  });
});

// ---------------------------------------------------------------------------
// Failed login
// ---------------------------------------------------------------------------
describe('failed login', () => {
  it('displays error message from server response', async () => {
    authService.login.mockRejectedValueOnce({
      response: { data: { error: 'Account locked' } },
    });

    renderSignIn();

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'bad@test.com');
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Account locked')).toBeInTheDocument();
    });
  });

  it('displays fallback error when no server message available', async () => {
    authService.login.mockRejectedValueOnce(new Error('Network Error'));

    renderSignIn();

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'bad@test.com');
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  it('re-enables the button after failed login', async () => {
    authService.login.mockRejectedValueOnce({
      response: { data: { error: 'Bad' } },
    });

    renderSignIn();

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'bad@test.com');
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled();
    });
  });
});

// ---------------------------------------------------------------------------
// Password toggle
// ---------------------------------------------------------------------------
describe('password visibility toggle', () => {
  it('toggles password field between hidden and visible', async () => {
    renderSignIn();

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggle = screen.getByRole('button', { name: /show/i });
    await userEvent.click(toggle);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('shows "Hide" text after revealing password', async () => {
    renderSignIn();

    await userEvent.click(screen.getByRole('button', { name: /show/i }));

    expect(screen.getByRole('button', { name: /hide/i })).toBeInTheDocument();
  });
});
