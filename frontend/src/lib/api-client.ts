import axios from 'axios';
import Cookies from 'js-cookie';
import { ROUTES, STORAGE_KEYS } from './constants';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(STORAGE_KEYS.USER_ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      Cookies.remove(STORAGE_KEYS.USER_ACCESS_TOKEN);
      window.location.href = ROUTES.AUTH.LOGIN;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
