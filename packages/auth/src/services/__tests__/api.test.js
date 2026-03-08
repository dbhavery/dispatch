/**
 * Tests for auth portal API service (src/services/api.js)
 *
 * Verifies:
 *   - Each authService method calls the correct endpoint
 *   - portalRedirectMap contains all expected roles
 *   - Correct environment-based redirect URLs
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

// ---------------------------------------------------------------------------
// Mock axios
// ---------------------------------------------------------------------------
vi.mock('axios', () => {
  const instance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  };

  return {
    default: {
      create: vi.fn(() => instance),
    },
  };
});

let authService, portalRedirectMap;

beforeEach(async () => {
  vi.clearAllMocks();
  const mod = await import('../../services/api.js');
  authService = mod.authService;
  portalRedirectMap = mod.portalRedirectMap;
});

function getAxiosInstance() {
  return axios.create();
}

// ---------------------------------------------------------------------------
// authService endpoints
// ---------------------------------------------------------------------------
describe('authService', () => {
  it('login posts email and password to /auth/login', async () => {
    const instance = getAxiosInstance();
    instance.post.mockResolvedValueOnce({
      data: { accessToken: 'tok', refreshToken: 'ref', user: { role: 'holdings_admin' } },
    });

    const result = await authService.login('admin@test.com', 'pass');

    expect(instance.post).toHaveBeenCalledWith('/auth/login', {
      email: 'admin@test.com',
      password: 'pass',
    });
    expect(result.accessToken).toBe('tok');
  });

  it('register posts user data to /auth/register', async () => {
    const instance = getAxiosInstance();
    instance.post.mockResolvedValueOnce({ data: { id: 'new-user' } });

    const userData = { email: 'new@test.com', password: 'pass', firstName: 'John' };
    const result = await authService.register(userData);

    expect(instance.post).toHaveBeenCalledWith('/auth/register', userData);
    expect(result.id).toBe('new-user');
  });

  it('forgotPassword posts email to /auth/request-reset', async () => {
    const instance = getAxiosInstance();
    instance.post.mockResolvedValueOnce({ data: { message: 'sent' } });

    await authService.forgotPassword('user@test.com');

    expect(instance.post).toHaveBeenCalledWith('/auth/request-reset', { email: 'user@test.com' });
  });

  it('resetPassword posts email, code, and newPassword to /auth/reset-password', async () => {
    const instance = getAxiosInstance();
    instance.post.mockResolvedValueOnce({ data: { success: true } });

    await authService.resetPassword('user@test.com', '123456', 'newpass');

    expect(instance.post).toHaveBeenCalledWith('/auth/reset-password', {
      email: 'user@test.com',
      code: '123456',
      newPassword: 'newpass',
    });
  });

  it('verifyEmail posts email and code to /auth/verify-email', async () => {
    const instance = getAxiosInstance();
    instance.post.mockResolvedValueOnce({ data: { verified: true } });

    const result = await authService.verifyEmail('user@test.com', 'ABC123');

    expect(instance.post).toHaveBeenCalledWith('/auth/verify-email', {
      email: 'user@test.com',
      code: 'ABC123',
    });
    expect(result.verified).toBe(true);
  });

  it('resendVerification posts email to /auth/send-verification', async () => {
    const instance = getAxiosInstance();
    instance.post.mockResolvedValueOnce({ data: {} });

    await authService.resendVerification('user@test.com');

    expect(instance.post).toHaveBeenCalledWith('/auth/send-verification', { email: 'user@test.com' });
  });

  it('checkAddress posts address object to /auth/check-address', async () => {
    const instance = getAxiosInstance();
    instance.post.mockResolvedValueOnce({ data: { available: true } });

    const address = { street: '123 Main', city: 'Houston', state: 'TX', zip: '77001' };
    await authService.checkAddress(address);

    expect(instance.post).toHaveBeenCalledWith('/auth/check-address', address);
  });

  it('expressInterest posts to /waitlist/interest', async () => {
    const instance = getAxiosInstance();
    instance.post.mockResolvedValueOnce({ data: { position: 42 } });

    const data = { email: 'lead@test.com', type: 'franchise_owner' };
    await authService.expressInterest(data);

    expect(instance.post).toHaveBeenCalledWith('/waitlist/interest', data);
  });
});

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------
describe('error propagation', () => {
  it('rejects with server error when login fails', async () => {
    const instance = getAxiosInstance();
    const err = { response: { status: 401, data: { error: 'Invalid credentials' } } };
    instance.post.mockRejectedValueOnce(err);

    await expect(authService.login('bad@email.com', 'wrong')).rejects.toEqual(err);
  });

  it('rejects with network error when connection fails', async () => {
    const instance = getAxiosInstance();
    instance.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(authService.register({ email: 'x' })).rejects.toThrow('Network Error');
  });
});

// ---------------------------------------------------------------------------
// portalRedirectMap
// ---------------------------------------------------------------------------
describe('portalRedirectMap', () => {
  const EXPECTED_ROLES = [
    'holdings_admin',
    'franchise_owner',
    'manager',
    'driver',
    'customer',
    'employer',
    'employee',
    'investor',
    'sba_lender',
  ];

  it('contains entries for all expected roles', () => {
    EXPECTED_ROLES.forEach((role) => {
      expect(portalRedirectMap).toHaveProperty(role);
      expect(typeof portalRedirectMap[role]).toBe('string');
    });
  });

  it('all redirect URLs are valid http/https URLs', () => {
    Object.values(portalRedirectMap).forEach((url) => {
      expect(url).toMatch(/^https?:\/\//);
    });
  });

  it('points to localhost URLs in test/dev environment', () => {
    // Tests run with hostname = 'localhost' so we expect dev URLs
    Object.values(portalRedirectMap).forEach((url) => {
      expect(url).toMatch(/^http:\/\/localhost:/);
    });
  });

  it('holdings_admin maps to port 5174 in dev', () => {
    expect(portalRedirectMap.holdings_admin).toBe('http://localhost:5174');
  });

  it('driver maps to port 5176 in dev', () => {
    expect(portalRedirectMap.driver).toBe('http://localhost:5176');
  });
});
