import apiClient from '@/lib/api-client';
import { AuthResponse, LoginData, RegisterData, User } from '@/types';
import Cookies from 'js-cookie';

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);

    if (response.data.success) {
      Cookies.set('token', response.data.data.token, { expires: 7 });
    }

    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);

    if (response.data.success) {
      Cookies.set('token', response.data.data.token, { expires: 7 });
    }

    return response.data;
  },

  getProfile: async (): Promise<{ success: boolean; data: { user: User } }> => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  logout: () => {
    Cookies.remove('token');
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get('token');
  },

  getToken: (): string | undefined => {
    return Cookies.get('token');
  },
};
