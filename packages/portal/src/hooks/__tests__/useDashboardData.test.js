/**
 * Tests for all 4 dashboard hooks in src/hooks/useDashboardData.js
 *
 * Mocks the API services and socket.io-client to test:
 *   - useDashboardData: initial fetch, socket events, refetch, error handling
 *   - useLiveFleetData: live data fetch and refresh
 *   - useTrendsData: period-based trend fetching
 *   - useKPIData: KPI fetching with default and custom periods
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Mock socket.io-client
// ---------------------------------------------------------------------------
const socketEventHandlers = {};
const mockSocket = {
  on: vi.fn((event, handler) => {
    socketEventHandlers[event] = handler;
  }),
  emit: vi.fn(),
  disconnect: vi.fn(),
};

vi.mock('socket.io-client', () => ({
  io: vi.fn(() => mockSocket),
}));

// ---------------------------------------------------------------------------
// Mock API services
// ---------------------------------------------------------------------------
vi.mock('../../services/api', () => ({
  dashboardService: {
    getHQMetrics: vi.fn(),
    getLiveData: vi.fn(),
    getTrends: vi.fn(),
    getKPIs: vi.fn(),
  },
  franchiseService: {
    getStats: vi.fn(),
  },
}));

import { io } from 'socket.io-client';
import { dashboardService, franchiseService } from '../../services/api';
import {
  useDashboardData,
  useLiveFleetData,
  useTrendsData,
  useKPIData,
} from '../../hooks/useDashboardData';

beforeEach(() => {
  vi.clearAllMocks();
  Object.keys(socketEventHandlers).forEach((key) => delete socketEventHandlers[key]);
  // Reset socket mock handlers since clearAllMocks also clears them
  mockSocket.on.mockImplementation((event, handler) => {
    socketEventHandlers[event] = handler;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// useDashboardData
// ---------------------------------------------------------------------------
describe('useDashboardData', () => {
  it('starts in loading state and fetches HQ metrics + franchise stats', async () => {
    dashboardService.getHQMetrics.mockResolvedValueOnce({ activeFranchises: 10 });
    franchiseService.getStats.mockResolvedValueOnce({ total: 50 });

    const { result } = renderHook(() => useDashboardData());

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual({
      activeFranchises: 10,
      franchiseStats: { total: 50 },
    });
    expect(result.current.error).toBeNull();
  });

  it('sets error state when fetch fails', async () => {
    dashboardService.getHQMetrics.mockRejectedValueOnce(new Error('Server down'));
    franchiseService.getStats.mockRejectedValueOnce(new Error('Server down'));

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Server down');
    expect(result.current.data).toBeNull();
  });

  it('connects to socket and joins the HQ room on connect', async () => {
    dashboardService.getHQMetrics.mockResolvedValueOnce({});
    franchiseService.getStats.mockResolvedValueOnce({});

    renderHook(() => useDashboardData());

    expect(io).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ transports: ['websocket'] }),
    );

    // Simulate the connect event
    act(() => {
      socketEventHandlers['connect']?.();
    });
    expect(mockSocket.emit).toHaveBeenCalledWith('join:hq');
  });

  it('updates data when delivery:status:update event fires', async () => {
    dashboardService.getHQMetrics.mockResolvedValueOnce({
      today: { deliveries: { total: 100, completed: 50, completionRate: '50.0' } },
    });
    franchiseService.getStats.mockResolvedValueOnce({});

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Simulate delivery completion
    act(() => {
      socketEventHandlers['delivery:status:update']?.({ status: 'completed' });
    });

    expect(result.current.data.today.deliveries.completed).toBe(51);
    expect(result.current.data.today.deliveries.completionRate).toBe('51.0');
  });

  it('updates alerts when safety:alert event fires', async () => {
    dashboardService.getHQMetrics.mockResolvedValueOnce({
      alerts: { openIncidents: 2, total: 10 },
    });
    franchiseService.getStats.mockResolvedValueOnce({});

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      socketEventHandlers['safety:alert']?.({ type: 'collision' });
    });

    expect(result.current.data.alerts.openIncidents).toBe(3);
    expect(result.current.data.alerts.total).toBe(11);
  });

  it('refetch function triggers a new data load', async () => {
    dashboardService.getHQMetrics
      .mockResolvedValueOnce({ version: 1 })
      .mockResolvedValueOnce({ version: 2 });
    franchiseService.getStats.mockResolvedValue({});

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.data?.version).toBe(1);
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data.version).toBe(2);
    expect(dashboardService.getHQMetrics).toHaveBeenCalledTimes(2);
  });

  it('disconnects socket on unmount', async () => {
    dashboardService.getHQMetrics.mockResolvedValueOnce({});
    franchiseService.getStats.mockResolvedValueOnce({});

    const { result, unmount } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    unmount();
    expect(mockSocket.disconnect).toHaveBeenCalled();
  });

  it('driver:location:update sets lastUpdate timestamp', async () => {
    dashboardService.getHQMetrics.mockResolvedValueOnce({ existing: true });
    franchiseService.getStats.mockResolvedValueOnce({});

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      socketEventHandlers['driver:location:update']?.({ driverId: '1' });
    });

    expect(result.current.data.lastUpdate).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// useLiveFleetData
// ---------------------------------------------------------------------------
describe('useLiveFleetData', () => {
  it('fetches live drivers and deliveries', async () => {
    dashboardService.getLiveData.mockResolvedValueOnce({
      drivers: [{ id: 'd1' }],
      activeDeliveries: [{ id: 'del1' }],
    });

    const { result } = renderHook(() => useLiveFleetData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.drivers).toEqual([{ id: 'd1' }]);
    expect(result.current.deliveries).toEqual([{ id: 'del1' }]);
  });

  it('defaults to empty arrays when API returns no data', async () => {
    dashboardService.getLiveData.mockResolvedValueOnce({});

    const { result } = renderHook(() => useLiveFleetData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.drivers).toEqual([]);
    expect(result.current.deliveries).toEqual([]);
  });

  it('handles API errors gracefully without crashing', async () => {
    dashboardService.getLiveData.mockRejectedValueOnce(new Error('timeout'));

    const { result } = renderHook(() => useLiveFleetData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should still return empty arrays, not crash
    expect(result.current.drivers).toEqual([]);
    expect(result.current.deliveries).toEqual([]);
  });

  it('exposes a refetch function', async () => {
    dashboardService.getLiveData
      .mockResolvedValueOnce({ drivers: [{ id: '1' }], activeDeliveries: [] })
      .mockResolvedValueOnce({ drivers: [{ id: '1' }, { id: '2' }], activeDeliveries: [] });

    const { result } = renderHook(() => useLiveFleetData());

    await waitFor(() => {
      expect(result.current.drivers).toHaveLength(1);
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.drivers).toHaveLength(2);
  });

  it('calls getLiveData on mount', async () => {
    dashboardService.getLiveData.mockResolvedValue({ drivers: [], activeDeliveries: [] });

    renderHook(() => useLiveFleetData());

    await waitFor(() => {
      expect(dashboardService.getLiveData).toHaveBeenCalledTimes(1);
    });
  });
});

// ---------------------------------------------------------------------------
// useTrendsData
// ---------------------------------------------------------------------------
describe('useTrendsData', () => {
  it('fetches trends with default 30d period', async () => {
    dashboardService.getTrends.mockResolvedValueOnce({ revenue: [1, 2, 3] });

    const { result } = renderHook(() => useTrendsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(dashboardService.getTrends).toHaveBeenCalledWith('30d');
    expect(result.current.trends).toEqual({ revenue: [1, 2, 3] });
  });

  it('fetches trends with custom period', async () => {
    dashboardService.getTrends.mockResolvedValueOnce({ revenue: [] });

    const { result } = renderHook(() => useTrendsData('7d'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(dashboardService.getTrends).toHaveBeenCalledWith('7d');
  });

  it('re-fetches when period changes', async () => {
    dashboardService.getTrends.mockResolvedValue({});

    const { result, rerender } = renderHook(({ period }) => useTrendsData(period), {
      initialProps: { period: '30d' },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    rerender({ period: '90d' });

    await waitFor(() => {
      expect(dashboardService.getTrends).toHaveBeenCalledWith('90d');
    });
  });

  it('handles fetch error gracefully', async () => {
    dashboardService.getTrends.mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useTrendsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.trends).toBeNull();
  });

  it('starts in loading state', () => {
    dashboardService.getTrends.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useTrendsData());

    expect(result.current.loading).toBe(true);
    expect(result.current.trends).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// useKPIData
// ---------------------------------------------------------------------------
describe('useKPIData', () => {
  it('fetches KPIs with default 30d period', async () => {
    dashboardService.getKPIs.mockResolvedValueOnce({ csat: 94 });

    const { result } = renderHook(() => useKPIData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(dashboardService.getKPIs).toHaveBeenCalledWith('30d');
    expect(result.current.kpis).toEqual({ csat: 94 });
  });

  it('fetches KPIs with custom period', async () => {
    dashboardService.getKPIs.mockResolvedValueOnce({});

    const { result } = renderHook(() => useKPIData('7d'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(dashboardService.getKPIs).toHaveBeenCalledWith('7d');
  });

  it('re-fetches when period changes', async () => {
    dashboardService.getKPIs.mockResolvedValue({});

    const { result, rerender } = renderHook(({ period }) => useKPIData(period), {
      initialProps: { period: '30d' },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    rerender({ period: '90d' });

    await waitFor(() => {
      expect(dashboardService.getKPIs).toHaveBeenCalledWith('90d');
    });
  });

  it('handles fetch error without crashing', async () => {
    dashboardService.getKPIs.mockRejectedValueOnce(new Error('err'));

    const { result } = renderHook(() => useKPIData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.kpis).toBeNull();
  });

  it('starts in loading state with null kpis', () => {
    dashboardService.getKPIs.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useKPIData());

    expect(result.current.loading).toBe(true);
    expect(result.current.kpis).toBeNull();
  });
});
