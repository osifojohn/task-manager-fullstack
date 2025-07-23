import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { CreateTaskData, TaskStatus, Priority } from '@/types';
import { toast } from 'sonner';

interface UseTasksParams {
  status?: TaskStatus;
  priority?: Priority;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const useTasks = (params: UseTasksParams = {}) => {
  const queryClient = useQueryClient();

  const {
    data: tasksData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['tasks', params],
    queryFn: () => taskService.getTasks(params),
    staleTime: 30 * 1000, // 30 seconds
  });

  const createTaskMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task-insights'] });
      toast.success('Task created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create task');
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateTaskData> }) =>
      taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task-insights'] });
      toast.success('Task updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update task');
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task-insights'] });
      toast.success('Task deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    },
  });

  return {
    // Data
    tasks: tasksData?.data?.tasks || [],
    pagination: tasksData?.data?.pagination,

    // Loading states
    isLoading,
    error,

    // Actions
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    refetch,

    // Mutation states
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};

// Hook for single task
export const useTask = (id: string) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
  });
};

// Hook for task insights
export const useTaskInsights = () => {
  return useQuery({
    queryKey: ['task-insights'],
    queryFn: taskService.getTaskInsights,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
