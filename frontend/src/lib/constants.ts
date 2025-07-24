export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register',
  },

  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  ANALYTICS: '/analytics',
} as const;

export const STORAGE_KEYS = {
  USER_ACCESS_TOKEN: 'userAccessToken',
} as const;
