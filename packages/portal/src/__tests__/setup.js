/**
 * Vitest global test setup for @dispatch/portal-hq
 *
 * Provides common mocks for browser APIs and external dependencies
 * that are unavailable in the jsdom test environment.
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// ---------------------------------------------------------------------------
// localStorage mock
// ---------------------------------------------------------------------------
const localStorageStore = {};

const localStorageMock = {
  getItem: vi.fn((key) => localStorageStore[key] ?? null),
  setItem: vi.fn((key, value) => {
    localStorageStore[key] = String(value);
  }),
  removeItem: vi.fn((key) => {
    delete localStorageStore[key];
  }),
  clear: vi.fn(() => {
    Object.keys(localStorageStore).forEach((key) => delete localStorageStore[key]);
  }),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// ---------------------------------------------------------------------------
// window.location mock (allows assignment in tests)
// ---------------------------------------------------------------------------
delete window.location;
window.location = { href: 'http://localhost/', origin: 'http://localhost' };

// ---------------------------------------------------------------------------
// Note: import.meta.env is provided by Vitest automatically.
// VITE_API_URL defaults to 'http://localhost:3001/api' in the source code.
// VITE_WS_URL defaults to 'http://localhost:3001' in the source code.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Reset mocks between tests
// ---------------------------------------------------------------------------
beforeEach(() => {
  vi.clearAllMocks();
  Object.keys(localStorageStore).forEach((key) => delete localStorageStore[key]);
  window.location.href = 'http://localhost/';
});
