/**
 * useDashboardData Hook
 * Fetches and manages HQ dashboard data with real-time updates
 */

import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { dashboardService, franchiseService } from '../services/api';

const SOCKET_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3001';

export function useDashboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Fetch initial data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [hqMetrics, franchiseStats] = await Promise.all([
        dashboardService.getHQMetrics(),
        franchiseService.getStats(),
      ]);

      setData({
        ...hqMetrics,
        franchiseStats,
      });
      setError(null);
    } catch (err) {
      console.error('[Dashboard] Error fetching data:', err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Setup Socket.IO connection for real-time updates
  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socketInstance.on('connect', () => {
      console.log('[Dashboard] Connected to real-time updates');
      // Join HQ room for network-wide events
      socketInstance.emit('join:hq');
    });

    socketInstance.on('disconnect', () => {
      console.log('[Dashboard] Disconnected from real-time updates');
    });

    // Handle driver updates
    socketInstance.on('driver:location:update', (update) => {
      setData((prev) => {
        if (!prev) return prev;
        // Update driver count if needed
        return {
          ...prev,
          lastUpdate: new Date().toISOString(),
        };
      });
    });

    // Handle delivery status updates
    socketInstance.on('delivery:status:update', (update) => {
      setData((prev) => {
        if (!prev?.today?.deliveries) return prev;

        const newDeliveries = { ...prev.today.deliveries };

        // Update status counts
        if (update.status === 'completed') {
          newDeliveries.completed = (newDeliveries.completed || 0) + 1;
        }

        // Recalculate completion rate
        if (newDeliveries.total > 0) {
          newDeliveries.completionRate = (
            (newDeliveries.completed / newDeliveries.total) * 100
          ).toFixed(1);
        }

        return {
          ...prev,
          today: {
            ...prev.today,
            deliveries: newDeliveries,
          },
          lastUpdate: new Date().toISOString(),
        };
      });
    });

    // Handle safety alerts
    socketInstance.on('safety:alert', (alert) => {
      setData((prev) => {
        if (!prev?.alerts) return prev;
        return {
          ...prev,
          alerts: {
            ...prev.alerts,
            openIncidents: (prev.alerts.openIncidents || 0) + 1,
            total: (prev.alerts.total || 0) + 1,
          },
          lastUpdate: new Date().toISOString(),
        };
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    socket,
  };
}

export function useLiveFleetData() {
  const [drivers, setDrivers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveData = useCallback(async () => {
    try {
      const liveData = await dashboardService.getLiveData();
      setDrivers(liveData.drivers || []);
      setDeliveries(liveData.activeDeliveries || []);
    } catch (err) {
      console.error('[LiveFleet] Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveData, 30 * 1000);
    return () => clearInterval(interval);
  }, [fetchLiveData]);

  return { drivers, deliveries, loading, refetch: fetchLiveData };
}

export function useTrendsData(period = '30d') {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getTrends(period);
        setTrends(data);
      } catch (err) {
        console.error('[Trends] Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [period]);

  return { trends, loading };
}

export function useKPIData(period = '30d') {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getKPIs(period);
        setKpis(data);
      } catch (err) {
        console.error('[KPIs] Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, [period]);

  return { kpis, loading };
}
