import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Vite proxy will handle this
  withCredentials: true, // Send cookies with requests
  timeout: 10000, // 10 second timeout
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor - Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't try to refresh on login or refresh endpoints
      if (originalRequest.url?.includes('/admin/login') || originalRequest.url?.includes('/admin/refresh')) {
        localStorage.removeItem('accessToken');
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        console.log('🔄 Token expired, refreshing...');
        const { data } = await axios.post(
          '/api/admin/refresh',
          {},
          { withCredentials: true }
        );

        const newAccessToken = data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        console.log('✅ Token refreshed successfully');

        // Update the failed queue
        processQueue(null, newAccessToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        console.error('❌ Token refresh failed, logging out');
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

