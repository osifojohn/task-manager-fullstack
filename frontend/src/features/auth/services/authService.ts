import apiClient from '@/lib/api-client';
import { ROUTES, STORAGE_KEYS } from '@/lib/constants';
import { AuthResponse, LoginData, RegisterData, User } from '@/types';
import Cookies from 'js-cookie';

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      ROUTES.AUTH.SIGNUP,
      data
    );

    if (response.data.success) {
      Cookies.set(STORAGE_KEYS.USER_ACCESS_TOKEN, response.data.data.token, {
        expires: 7,
      });
    }

    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      ROUTES.AUTH.LOGIN,
      data
    );

    if (response.data.success) {
      Cookies.set(STORAGE_KEYS.USER_ACCESS_TOKEN, response.data.data.token, {
        path: '/',
        sameSite: 'Lax',
        expires: 7,
      });
    }

    return response.data;
  },

  getProfile: async (): Promise<{ success: boolean; data: { user: User } }> => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  logout: () => {
    Cookies.remove(STORAGE_KEYS.USER_ACCESS_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(STORAGE_KEYS.USER_ACCESS_TOKEN);
  },

  getToken: (): string | undefined => {
    return Cookies.get(STORAGE_KEYS.USER_ACCESS_TOKEN);
  },
};
