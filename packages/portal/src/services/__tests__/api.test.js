/**
 * Tests for portal API service layer (src/services/api.js)
 *
 * Verifies that every exported service calls the correct HTTP method and
 * endpoint, attaches JWT tokens via the request interceptor, and handles
 * 401 responses by clearing storage and redirecting.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mock axios before any module under test imports it.
// vi.hoisted() ensures the variable is declared before vi.mock() runs,
// because vi.mock() calls are hoisted to the top of the file.
// ---------------------------------------------------------------------------
const { mockInstance, interceptorCapture } = vi.hoisted(() => {
  const capture = {
    requestFulfilled: undefined,
    requestRejected: undefined,
    responseFulfilled: undefined,
    responseRejected: undefined,
  };

  const instance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: {
        use: vi.fn((fulfilled, rejected) => {
          capture.requestFulfilled = fulfilled;
          capture.requestRejected = rejected;
        }),
        eject: vi.fn(),
      },
      response: {
        use: vi.fn((fulfilled, rejected) => {
          capture.responseFulfilled = fulfilled;
          capture.responseRejected = rejected;
        }),
        eject: vi.fn(),
      },
    },
  };

  return { mockInstance: instance, interceptorCapture: capture };
});

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockInstance),
  },
}));

// Import after mock is installed. Single import — no re-importing needed.
import {
  authService,
  franchiseService,
  financeService,
  dashboardService,
  mapsService,
  pageService,
  weatherService,
  complianceService,
  sbaService,
  marketingService,
  mediaService,
} from '../../services/api.js';

beforeEach(() => {
  // Clear call history on the mock methods but preserve interceptor references
  mockInstance.get.mockReset();
  mockInstance.post.mockReset();
  mockInstance.put.mockReset();
  mockInstance.patch.mockReset();
  mockInstance.delete.mockReset();
  window.location.href = 'http://localhost/';
});

// ---------------------------------------------------------------------------
// Interceptor registration
// ---------------------------------------------------------------------------
describe('axios interceptor registration', () => {
  it('registers a request interceptor for auth tokens', () => {
    // interceptorCapture is populated during module initialization
    // (call count is cleared by global beforeEach; captured reference is proof of registration)
    expect(typeof interceptorCapture.requestFulfilled).toBe('function');
  });

  it('registers a response interceptor for 401 handling', () => {
    expect(typeof interceptorCapture.responseRejected).toBe('function');
  });
});

// ---------------------------------------------------------------------------
// Request interceptor: JWT attachment
// ---------------------------------------------------------------------------
describe('request interceptor attaches JWT token', () => {
  it('adds Authorization header when token exists in localStorage', () => {
    localStorage.setItem('token', 'test-jwt-token');
    const config = { headers: {} };
    const result = interceptorCapture.requestFulfilled(config);

    expect(result.headers.Authorization).toBe('Bearer test-jwt-token');
  });

  it('does not add Authorization header when no token exists', () => {
    localStorage.removeItem('token');
    const config = { headers: {} };
    const result = interceptorCapture.requestFulfilled(config);

    expect(result.headers.Authorization).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Response interceptor: 401 handling
// ---------------------------------------------------------------------------
describe('response interceptor handles 401 errors', () => {
  it('clears token and redirects on 401 response', async () => {
    localStorage.setItem('token', 'stale-token');

    const error = { response: { status: 401 } };
    await expect(interceptorCapture.responseRejected(error)).rejects.toEqual(error);

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(window.location.href).toBe('/');
  });

  it('does not redirect on non-401 errors', async () => {
    const originalHref = window.location.href;
    const error = { response: { status: 500 } };
    await expect(interceptorCapture.responseRejected(error)).rejects.toEqual(error);

    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(window.location.href).toBe(originalHref);
  });
});

// ---------------------------------------------------------------------------
// authService
// ---------------------------------------------------------------------------
describe('authService', () => {
  it('login posts credentials to /auth/login', async () => {
    mockInstance.post.mockResolvedValueOnce({ data: { token: 'abc', user: {} } });

    const credentials = { email: 'a@b.com', password: 'secret' };
    const result = await authService.login(credentials);

    expect(mockInstance.post).toHaveBeenCalledWith('/auth/login', credentials);
    expect(result).toEqual({ token: 'abc', user: {} });
  });

  it('logout posts to /auth/logout and removes token', async () => {
    mockInstance.post.mockResolvedValueOnce({ data: {} });
    localStorage.setItem('token', 'will-be-removed');

    await authService.logout();

    expect(mockInstance.post).toHaveBeenCalledWith('/auth/logout');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('getProfile fetches /auth/me', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { id: '1', name: 'Don' } });

    const result = await authService.getProfile();

    expect(mockInstance.get).toHaveBeenCalledWith('/auth/me');
    expect(result).toEqual({ id: '1', name: 'Don' });
  });
});

// ---------------------------------------------------------------------------
// franchiseService
// ---------------------------------------------------------------------------
describe('franchiseService', () => {
  it('getAll passes query params', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    const params = { page: 1, limit: 20 };
    await franchiseService.getAll(params);

    expect(mockInstance.get).toHaveBeenCalledWith('/franchises', { params });
  });

  it('getById fetches /franchises/:id', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { id: '42' } });

    const result = await franchiseService.getById('42');

    expect(mockInstance.get).toHaveBeenCalledWith('/franchises/42');
    expect(result).toEqual({ id: '42' });
  });

  it('create posts to /franchises', async () => {
    mockInstance.post.mockResolvedValueOnce({ data: { id: 'new' } });

    const data = { name: 'Test Franchise' };
    await franchiseService.create(data);

    expect(mockInstance.post).toHaveBeenCalledWith('/franchises', data);
  });

  it('update patches /franchises/:id', async () => {
    mockInstance.patch.mockResolvedValueOnce({ data: { id: '42', name: 'Updated' } });

    await franchiseService.update('42', { name: 'Updated' });

    expect(mockInstance.patch).toHaveBeenCalledWith('/franchises/42', { name: 'Updated' });
  });

  it('updateStatus patches /franchises/:id/status', async () => {
    mockInstance.patch.mockResolvedValueOnce({ data: {} });

    await franchiseService.updateStatus('42', 'active');

    expect(mockInstance.patch).toHaveBeenCalledWith('/franchises/42/status', { status: 'active' });
  });

  it('getStats fetches /franchises/stats', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { total: 50 } });

    const result = await franchiseService.getStats();

    expect(mockInstance.get).toHaveBeenCalledWith('/franchises/stats');
    expect(result).toEqual({ total: 50 });
  });

  it('getMetrics fetches with period param', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: {} });

    await franchiseService.getMetrics('42', '7d');

    expect(mockInstance.get).toHaveBeenCalledWith('/franchises/42/metrics', { params: { period: '7d' } });
  });
});

// ---------------------------------------------------------------------------
// financeService
// ---------------------------------------------------------------------------
describe('financeService', () => {
  it('getOverview uses default 30d period', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { revenue: 100000 } });

    const result = await financeService.getOverview();

    expect(mockInstance.get).toHaveBeenCalledWith('/finance/overview', { params: { period: '30d' } });
    expect(result).toEqual({ revenue: 100000 });
  });

  it('getOverview accepts custom period', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: {} });

    await financeService.getOverview('7d');

    expect(mockInstance.get).toHaveBeenCalledWith('/finance/overview', { params: { period: '7d' } });
  });

  it('getTransactions passes query params', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    const params = { page: 1, type: 'credit' };
    await financeService.getTransactions(params);

    expect(mockInstance.get).toHaveBeenCalledWith('/finance/transactions', { params });
  });

  it('getInvoices passes query params', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await financeService.getInvoices({ status: 'pending' });

    expect(mockInstance.get).toHaveBeenCalledWith('/finance/invoices', { params: { status: 'pending' } });
  });

  it('getFranchiseSummary uses default period', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await financeService.getFranchiseSummary();

    expect(mockInstance.get).toHaveBeenCalledWith('/finance/franchises', { params: { period: '30d' } });
  });
});

// ---------------------------------------------------------------------------
// dashboardService
// ---------------------------------------------------------------------------
describe('dashboardService', () => {
  it('getHQMetrics fetches /dashboard/hq', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { activeFranchises: 25 } });

    const result = await dashboardService.getHQMetrics();

    expect(mockInstance.get).toHaveBeenCalledWith('/dashboard/hq');
    expect(result).toEqual({ activeFranchises: 25 });
  });

  it('getLiveData fetches /dashboard/live', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { drivers: [], activeDeliveries: [] } });

    const result = await dashboardService.getLiveData();

    expect(mockInstance.get).toHaveBeenCalledWith('/dashboard/live');
    expect(result.drivers).toBeDefined();
  });

  it('getTrends uses default 30d period', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { trend: 'up' } });

    await dashboardService.getTrends();

    expect(mockInstance.get).toHaveBeenCalledWith('/dashboard/trends', { params: { period: '30d' } });
  });

  it('getFranchiseDashboard fetches by franchise id', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: {} });

    await dashboardService.getFranchiseDashboard('f-99');

    expect(mockInstance.get).toHaveBeenCalledWith('/dashboard/franchise/f-99');
  });

  it('getKPIs accepts custom period', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: {} });

    await dashboardService.getKPIs('90d');

    expect(mockInstance.get).toHaveBeenCalledWith('/dashboard/kpis', { params: { period: '90d' } });
  });
});

// ---------------------------------------------------------------------------
// mapsService
// ---------------------------------------------------------------------------
describe('mapsService', () => {
  it('geocode passes address as query param', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { lat: 40.7, lng: -74 } });

    const result = await mapsService.geocode('123 Main St');

    expect(mockInstance.get).toHaveBeenCalledWith('/maps/geocode', { params: { address: '123 Main St' } });
    expect(result.lat).toBe(40.7);
  });

  it('reverseGeocode passes lat and lng', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { address: '123 Main St' } });

    await mapsService.reverseGeocode(40.7, -74);

    expect(mockInstance.get).toHaveBeenCalledWith('/maps/reverse-geocode', { params: { lat: 40.7, lng: -74 } });
  });

  it('optimizeRoute posts origin and stops', async () => {
    mockInstance.post.mockResolvedValueOnce({ data: { route: [] } });

    const origin = { lat: 40.7, lng: -74 };
    const stops = [{ lat: 40.8, lng: -73.9 }];
    await mapsService.optimizeRoute(origin, stops);

    expect(mockInstance.post).toHaveBeenCalledWith('/maps/optimize-route', { origin, stops });
  });

  it('getDirections posts origin, destination, and waypoints', async () => {
    mockInstance.post.mockResolvedValueOnce({ data: {} });

    await mapsService.getDirections('A', 'B', ['C']);

    expect(mockInstance.post).toHaveBeenCalledWith('/maps/directions', {
      origin: 'A',
      destination: 'B',
      waypoints: ['C'],
    });
  });

  it('validateAddress posts address components', async () => {
    mockInstance.post.mockResolvedValueOnce({ data: { valid: true } });

    await mapsService.validateAddress('123 Main', 'NYC', 'NY', '10001');

    expect(mockInstance.post).toHaveBeenCalledWith('/maps/validate-address', {
      address: '123 Main',
      city: 'NYC',
      state: 'NY',
      zip: '10001',
    });
  });
});

// ---------------------------------------------------------------------------
// pageService (CMS)
// ---------------------------------------------------------------------------
describe('pageService', () => {
  it('getAll passes query params', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await pageService.getAll({ page: 1 });

    expect(mockInstance.get).toHaveBeenCalledWith('/pages', { params: { page: 1 } });
  });

  it('create posts page data', async () => {
    mockInstance.post.mockResolvedValueOnce({ data: { slug: 'new-page' } });

    const data = { title: 'New Page', content: '<p>Hello</p>' };
    const result = await pageService.create(data);

    expect(mockInstance.post).toHaveBeenCalledWith('/pages', data);
    expect(result.slug).toBe('new-page');
  });

  it('update uses PUT with slug', async () => {
    mockInstance.put.mockResolvedValueOnce({ data: {} });

    await pageService.update('about-us', { title: 'About' });

    expect(mockInstance.put).toHaveBeenCalledWith('/pages/about-us', { title: 'About' });
  });

  it('publish patches /pages/:slug/publish', async () => {
    mockInstance.patch.mockResolvedValueOnce({ data: { published: true } });

    await pageService.publish('home');

    expect(mockInstance.patch).toHaveBeenCalledWith('/pages/home/publish');
  });

  it('unpublish patches /pages/:slug/unpublish', async () => {
    mockInstance.patch.mockResolvedValueOnce({ data: {} });

    await pageService.unpublish('home');

    expect(mockInstance.patch).toHaveBeenCalledWith('/pages/home/unpublish');
  });

  it('delete calls DELETE /pages/:slug', async () => {
    mockInstance.delete.mockResolvedValueOnce({ data: {} });

    await pageService.delete('old-page');

    expect(mockInstance.delete).toHaveBeenCalledWith('/pages/old-page');
  });

  it('getBySlug passes published flag', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: {} });

    await pageService.getBySlug('faq', true);

    expect(mockInstance.get).toHaveBeenCalledWith('/pages/faq', { params: { published: true } });
  });
});

// ---------------------------------------------------------------------------
// weatherService
// ---------------------------------------------------------------------------
describe('weatherService', () => {
  it('getCurrent passes location as param', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { temp: 72 } });

    await weatherService.getCurrent('Houston, TX');

    expect(mockInstance.get).toHaveBeenCalledWith('/weather/current', { params: { location: 'Houston, TX' } });
  });

  it('getForecast defaults to 7 days', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await weatherService.getForecast('Austin, TX');

    expect(mockInstance.get).toHaveBeenCalledWith('/weather/forecast', { params: { location: 'Austin, TX', days: 7 } });
  });

  it('getRouteWeather posts stops array', async () => {
    mockInstance.post.mockResolvedValueOnce({ data: [] });

    const stops = ['A', 'B'];
    await weatherService.getRouteWeather(stops);

    expect(mockInstance.post).toHaveBeenCalledWith('/weather/route', { stops });
  });

  it('getDeliveryImpact passes location', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { impact: 'low' } });

    await weatherService.getDeliveryImpact('Dallas, TX');

    expect(mockInstance.get).toHaveBeenCalledWith('/weather/delivery-impact', { params: { location: 'Dallas, TX' } });
  });
});

// ---------------------------------------------------------------------------
// complianceService
// ---------------------------------------------------------------------------
describe('complianceService', () => {
  it('getPermits fetches /compliance/permits', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await complianceService.getPermits();

    expect(mockInstance.get).toHaveBeenCalledWith('/compliance/permits');
  });

  it('getAuditLog fetches /compliance/audit-log', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await complianceService.getAuditLog();

    expect(mockInstance.get).toHaveBeenCalledWith('/compliance/audit-log');
  });
});

// ---------------------------------------------------------------------------
// sbaService
// ---------------------------------------------------------------------------
describe('sbaService', () => {
  it('getApplications fetches /sba/applications', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await sbaService.getApplications();

    expect(mockInstance.get).toHaveBeenCalledWith('/sba/applications');
  });

  it('getDocuments fetches /sba/documents', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await sbaService.getDocuments();

    expect(mockInstance.get).toHaveBeenCalledWith('/sba/documents');
  });
});

// ---------------------------------------------------------------------------
// marketingService
// ---------------------------------------------------------------------------
describe('marketingService', () => {
  it('getCampaigns fetches /marketing/campaigns', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [{ id: 1 }] });

    const result = await marketingService.getCampaigns();

    expect(mockInstance.get).toHaveBeenCalledWith('/marketing/campaigns');
    expect(result).toEqual([{ id: 1 }]);
  });

  it('getLeads fetches /marketing/leads', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await marketingService.getLeads();

    expect(mockInstance.get).toHaveBeenCalledWith('/marketing/leads');
  });
});

// ---------------------------------------------------------------------------
// mediaService
// ---------------------------------------------------------------------------
describe('mediaService', () => {
  it('getAll passes query params', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: [] });

    await mediaService.getAll({ folder: 'logos' });

    expect(mockInstance.get).toHaveBeenCalledWith('/media', { params: { folder: 'logos' } });
  });

  it('delete calls DELETE /media/:id', async () => {
    mockInstance.delete.mockResolvedValueOnce({ data: {} });

    await mediaService.delete('img-1');

    expect(mockInstance.delete).toHaveBeenCalledWith('/media/img-1');
  });

  it('getStats fetches /media/stats', async () => {
    mockInstance.get.mockResolvedValueOnce({ data: { totalSize: 500 } });

    const result = await mediaService.getStats();

    expect(mockInstance.get).toHaveBeenCalledWith('/media/stats');
    expect(result.totalSize).toBe(500);
  });
});

// ---------------------------------------------------------------------------
// Error propagation
// ---------------------------------------------------------------------------
describe('error propagation', () => {
  it('service methods reject when axios rejects', async () => {
    const networkError = new Error('Network Error');
    mockInstance.get.mockRejectedValueOnce(networkError);

    await expect(authService.getProfile()).rejects.toThrow('Network Error');
  });

  it('service methods reject with server error details', async () => {
    const serverError = { response: { status: 500, data: { message: 'Internal' } } };
    mockInstance.post.mockRejectedValueOnce(serverError);

    await expect(authService.login({ email: 'a@b.com', password: 'x' })).rejects.toEqual(serverError);
  });
});
