/**
 * Mock for @dispatch/shared/contexts/AuthContext
 *
 * Provides a controllable useAuth hook for testing SecondaryAuthGate
 * and any other component that depends on the shared auth context.
 */

import { vi } from 'vitest';

let _mockValues = getDefaults();

function getDefaults() {
  return {
    user: { id: '1', firstName: 'Test', lastName: 'User', role: 'holdings_admin' },
    isOwner: false,
    hasSecondaryAccess: vi.fn(() => false),
    secondaryLogin: vi.fn(async () => ({ success: true })),
    secondaryWarning: false,
    resetSecondaryTimer: vi.fn(),
    logout: vi.fn(),
    loading: false,
    sessionWarning: false,
    extendSession: vi.fn(),
  };
}

export function useAuth() {
  return _mockValues;
}

/**
 * Override specific return values for useAuth in a test.
 * Call with partial overrides; missing keys keep their defaults.
 */
export function __setMockAuthValues(overrides) {
  _mockValues = { ...getDefaults(), ...overrides };
}

/** Reset to defaults between tests. */
export function __resetMockAuth() {
  _mockValues = getDefaults();
}
