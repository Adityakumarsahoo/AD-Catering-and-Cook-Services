export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

const API_BASE = (import.meta.env?.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

export function getAuthToken(): string | null {
  return localStorage.getItem('ad_auth_token');
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('ad_auth_token', token);
  } else {
    localStorage.removeItem('ad_auth_token');
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  // Auth
  register: (payload: any) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: any) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  adminLogin: (payload: any) => apiRequest('/auth/admin-login', { method: 'POST', body: JSON.stringify(payload) }),
  getMe: () => apiRequest('/auth/me'),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),

  // User Profile & Notifs
  getProfile: () => apiRequest('/users/profile'),
  updateProfile: (payload: any) => apiRequest('/users/profile', { method: 'PUT', body: JSON.stringify(payload) }),
  getNotifications: () => apiRequest('/users/notifications'),
  markNotificationsRead: () => apiRequest('/users/notifications/read-all', { method: 'PUT' }),

  // Bookings
  createBooking: (payload: any) => apiRequest('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  getMyBookings: () => apiRequest('/bookings/my'),
  getBookingById: (id: string) => apiRequest(`/bookings/${id}`),

  // Menus
  getMenu: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/menu${query}`);
  },
  getVegMenu: () => apiRequest('/menu/veg-menu'),
  getMenuSummary: () => apiRequest('/menu/summary'),
  createMenuItem: (payload: any) => apiRequest('/menu', { method: 'POST', body: JSON.stringify(payload) }),
  updateMenuItem: (id: string, payload: any) => apiRequest(`/menu/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteMenuItem: (id: string) => apiRequest(`/menu/${id}`, { method: 'DELETE' }),

  // Services
  getServices: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/services${query}`);
  },
  createService: (payload: any) => apiRequest('/services', { method: 'POST', body: JSON.stringify(payload) }),
  updateService: (id: string, payload: any) => apiRequest(`/services/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteService: (id: string) => apiRequest(`/services/${id}`, { method: 'DELETE' }),

  // Packages
  getPackages: () => apiRequest('/packages'),
  createPackage: (payload: any) => apiRequest('/packages', { method: 'POST', body: JSON.stringify(payload) }),
  updatePackage: (id: string, payload: any) => apiRequest(`/packages/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deletePackage: (id: string) => apiRequest(`/packages/${id}`, { method: 'DELETE' }),

  // Gallery
  getGallery: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/gallery${query}`);
  },
  createGalleryItem: (payload: any) => apiRequest('/gallery', { method: 'POST', body: JSON.stringify(payload) }),
  deleteGalleryItem: (id: string) => apiRequest(`/gallery/${id}`, { method: 'DELETE' }),

  // Reviews
  getReviews: () => apiRequest('/reviews'),
  createReview: (payload: any) => apiRequest('/reviews', { method: 'POST', body: JSON.stringify(payload) }),
  deleteReview: (id: string) => apiRequest(`/reviews/${id}`, { method: 'DELETE' }),

  // Contact
  submitContact: (payload: any) => apiRequest('/contact', { method: 'POST', body: JSON.stringify(payload) }),

  // Admin
  getAdminDashboard: () => apiRequest('/admin/dashboard'),
  getAdminUsers: () => apiRequest('/admin/users'),
  getAdminBookings: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/admin/bookings${query}`);
  },
  updateAdminBooking: (id: string, payload: any) => apiRequest(`/admin/bookings/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAdminBooking: (id: string) => apiRequest(`/admin/bookings/${id}`, { method: 'DELETE' }),
  getAdminMessages: () => apiRequest('/admin/messages'),
  updateAdminMessage: (id: string, payload: any) => apiRequest(`/admin/messages/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  markAdminMessageRead: (id: string) => apiRequest(`/admin/messages/${id}/read`, { method: 'PUT' }),
  deleteAdminMessage: (id: string) => apiRequest(`/admin/messages/${id}`, { method: 'DELETE' }),

  // Content Management
  getAdminHomepage: () => apiRequest('/admin/content/homepage'),
  updateAdminHomepage: (payload: any) => apiRequest('/admin/content/homepage', { method: 'PUT', body: JSON.stringify(payload) }),
  getAdminAbout: () => apiRequest('/admin/content/about'),
  updateAdminAbout: (payload: any) => apiRequest('/admin/content/about', { method: 'PUT', body: JSON.stringify(payload) }),
  getAdminNavigation: () => apiRequest('/admin/content/navigation'),
  updateAdminNavigation: (payload: any) => apiRequest('/admin/content/navigation', { method: 'PUT', body: JSON.stringify(payload) }),
  getAdminSettings: () => apiRequest('/admin/content/settings'),
  updateAdminSettings: (payload: any) => apiRequest('/admin/content/settings', { method: 'PUT', body: JSON.stringify(payload) }),

  // Entity updates
  updateGalleryItem: (id: string, payload: any) => apiRequest(`/admin/gallery/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  updateReview: (id: string, payload: any) => apiRequest(`/admin/reviews/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  uploadAdminImage: (payload: { dataUrl?: string; url?: string; filename?: string }) => apiRequest('/admin/upload', { method: 'POST', body: JSON.stringify(payload) }),

  // Public Content
  getPublicContent: (section: 'homepage' | 'about' | 'navigation' | 'settings') => apiRequest(`/content/${section}`),
};
