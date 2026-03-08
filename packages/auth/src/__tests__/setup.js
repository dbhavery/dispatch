/**
 * Vitest global test setup for @dispatch/portal-auth
 *
 * Provides common mocks for browser APIs unavailable in jsdom.
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
// window.location mock
// ---------------------------------------------------------------------------
delete window.location;
window.location = {
  href: 'http://localhost:5170/',
  origin: 'http://localhost:5170',
  hostname: 'localhost',
};

// ---------------------------------------------------------------------------
// Note: import.meta.env is provided by Vitest automatically.
// VITE_API_URL defaults to 'http://localhost:3001/api' in the source code.
// Set env overrides in vitest.config.js via define or env options if needed.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Reset mocks between tests
// ---------------------------------------------------------------------------
beforeEach(() => {
  vi.clearAllMocks();
  Object.keys(localStorageStore).forEach((key) => delete localStorageStore[key]);
  window.location.href = 'http://localhost:5170/';
});
