import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { ApiError } from '@/types';
import { ROUTES } from '@/lib/constants';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getProfile,
    enabled: authService.isAuthenticated(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      toast.success('Account created successfully!');
      router.push(ROUTES.DASHBOARD);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      toast.success('Logged in successfully!');
      router.push(ROUTES.DASHBOARD);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const logout = () => {
    authService.logout();
    queryClient.removeQueries({ queryKey: ['user'] });
    queryClient.removeQueries({ queryKey: ['tasks'] });
    queryClient.removeQueries({ queryKey: ['task-insights'] });
    toast.success('Logged out successfully');
    router.push(ROUTES.AUTH.LOGIN);
  };

  return {
    // User data
    user: user?.data?.user,
    isAuthenticated: !!user?.data?.user,
    isLoadingUser,
    userError,

    // Auth actions
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout,

    // Loading states
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
  };
};
