import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Franchise service (HQ sees all franchises)
export const franchiseService = {
  getAll: async (params) => {
    const response = await api.get('/franchises', { params });
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/franchises/stats');
    return response.data;
  },
  getMapData: async () => {
    const response = await api.get('/franchises/map');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/franchises/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/franchises', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.patch(`/franchises/${id}`, data);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/franchises/${id}/status`, { status });
    return response.data;
  },
  getMetrics: async (id, period = '30d') => {
    const response = await api.get(`/franchises/${id}/metrics`, { params: { period } });
    return response.data;
  }
};

// Finance service
export const financeService = {
  getOverview: async (period = '30d') => {
    const response = await api.get('/finance/overview', { params: { period } });
    return response.data;
  },
  getFranchiseSummary: async (period = '30d') => {
    const response = await api.get('/finance/franchises', { params: { period } });
    return response.data;
  },
  getHqFees: async (period = '30d') => {
    const response = await api.get('/finance/hq-fees', { params: { period } });
    return response.data;
  },
  getFuelEconomics: async (period = '30d') => {
    const response = await api.get('/finance/fuel-economics', { params: { period } });
    return response.data;
  },
  getTransactions: async (params) => {
    const response = await api.get('/finance/transactions', { params });
    return response.data;
  },
  getInvoices: async (params) => {
    const response = await api.get('/finance/invoices', { params });
    return response.data;
  }
};

// Marketing service
export const marketingService = {
  getCampaigns: async () => {
    const response = await api.get('/marketing/campaigns');
    return response.data;
  },
  getLeads: async () => {
    const response = await api.get('/marketing/leads');
    return response.data;
  },
  getMetrics: async () => {
    const response = await api.get('/marketing/metrics');
    return response.data;
  }
};

// Compliance service
export const complianceService = {
  getPermits: async () => {
    const response = await api.get('/compliance/permits');
    return response.data;
  },
  getCertifications: async () => {
    const response = await api.get('/compliance/certifications');
    return response.data;
  },
  getIncidents: async () => {
    const response = await api.get('/compliance/incidents');
    return response.data;
  },
  getAuditLog: async () => {
    const response = await api.get('/compliance/audit-log');
    return response.data;
  }
};

// SBA service
export const sbaService = {
  getApplications: async () => {
    const response = await api.get('/sba/applications');
    return response.data;
  },
  getDocuments: async () => {
    const response = await api.get('/sba/documents');
    return response.data;
  }
};

// Dashboard service
export const dashboardService = {
  getHQMetrics: async () => {
    const response = await api.get('/dashboard/hq');
    return response.data;
  },
  getLiveData: async () => {
    const response = await api.get('/dashboard/live');
    return response.data;
  },
  getTrends: async (period = '30d') => {
    const response = await api.get('/dashboard/trends', { params: { period } });
    return response.data;
  },
  getFranchiseDashboard: async (id) => {
    const response = await api.get(`/dashboard/franchise/${id}`);
    return response.data;
  },
  getKPIs: async (period = '30d') => {
    const response = await api.get('/dashboard/kpis', { params: { period } });
    return response.data;
  }
};

// Weather service
export const weatherService = {
  getCurrent: async (location) => {
    const response = await api.get('/weather/current', { params: { location } });
    return response.data;
  },
  getForecast: async (location, days = 7) => {
    const response = await api.get('/weather/forecast', { params: { location, days } });
    return response.data;
  },
  getRouteWeather: async (stops) => {
    const response = await api.post('/weather/route', { stops });
    return response.data;
  },
  getDeliveryImpact: async (location) => {
    const response = await api.get('/weather/delivery-impact', { params: { location } });
    return response.data;
  }
};

// Maps service
export const mapsService = {
  geocode: async (address) => {
    const response = await api.get('/maps/geocode', { params: { address } });
    return response.data;
  },
  reverseGeocode: async (lat, lng) => {
    const response = await api.get('/maps/reverse-geocode', { params: { lat, lng } });
    return response.data;
  },
  getDirections: async (origin, destination, waypoints) => {
    const response = await api.post('/maps/directions', { origin, destination, waypoints });
    return response.data;
  },
  getDistanceMatrix: async (origins, destinations) => {
    const response = await api.post('/maps/distance-matrix', { origins, destinations });
    return response.data;
  },
  optimizeRoute: async (origin, stops) => {
    const response = await api.post('/maps/optimize-route', { origin, stops });
    return response.data;
  },
  getETA: async (origin, destination) => {
    const response = await api.post('/maps/eta', { origin, destination });
    return response.data;
  },
  validateAddress: async (address, city, state, zip) => {
    const response = await api.post('/maps/validate-address', { address, city, state, zip });
    return response.data;
  }
};

// Page service (CMS)
export const pageService = {
  getAll: async (params) => {
    const response = await api.get('/pages', { params });
    return response.data;
  },
  getPublished: async () => {
    const response = await api.get('/pages/published');
    return response.data;
  },
  getBySlug: async (slug, published = false) => {
    const response = await api.get(`/pages/${slug}`, { params: { published } });
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/pages', data);
    return response.data;
  },
  update: async (slug, data) => {
    const response = await api.put(`/pages/${slug}`, data);
    return response.data;
  },
  publish: async (slug) => {
    const response = await api.patch(`/pages/${slug}/publish`);
    return response.data;
  },
  unpublish: async (slug) => {
    const response = await api.patch(`/pages/${slug}/unpublish`);
    return response.data;
  },
  getVersions: async (slug, params) => {
    const response = await api.get(`/pages/${slug}/versions`, { params });
    return response.data;
  },
  restoreVersion: async (slug, version) => {
    const response = await api.post(`/pages/${slug}/restore/${version}`);
    return response.data;
  },
  exportPage: async (slug) => {
    const response = await api.get(`/pages/${slug}/export`);
    return response.data;
  },
  importPage: async (data) => {
    const response = await api.post('/pages/import', data);
    return response.data;
  },
  delete: async (slug) => {
    const response = await api.delete(`/pages/${slug}`);
    return response.data;
  }
};

// Media service (CMS)
export const mediaService = {
  getAll: async (params) => {
    const response = await api.get('/media', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/media/${id}`);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/media/stats');
    return response.data;
  },
  getFolders: async () => {
    const response = await api.get('/media/folders');
    return response.data;
  },
  upload: async (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);
    const response = await api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  uploadMultiple: async (files, folder) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    if (folder) formData.append('folder', folder);
    const response = await api.post('/media/upload-multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },
  deletePermanent: async (id) => {
    const response = await api.delete(`/media/${id}/permanent`);
    return response.data;
  }
};

export default api;
