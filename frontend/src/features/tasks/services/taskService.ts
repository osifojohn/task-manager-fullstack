import apiClient from '@/lib/api-client';
import {
  TasksResponse,
  TaskResponse,
  CreateTaskData,
  UpdateTaskData,
  TaskStatus,
  Priority,
  InsightsResponse,
} from '@/types';

interface GetTasksParams {
  status?: TaskStatus;
  priority?: Priority;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const taskService = {
  getTasks: async (params: GetTasksParams = {}): Promise<TasksResponse> => {
    const response = await apiClient.get<TasksResponse>('/tasks', { params });
    return response.data;
  },

  getTaskById: async (id: string): Promise<TaskResponse> => {
    const response = await apiClient.get<TaskResponse>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (data: CreateTaskData): Promise<TaskResponse> => {
    const response = await apiClient.post<TaskResponse>('/tasks', data);
    return response.data;
  },

  updateTask: async (
    id: string,
    data: Partial<CreateTaskData>
  ): Promise<TaskResponse> => {
    const response = await apiClient.put<TaskResponse>(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  getTaskInsights: async (): Promise<InsightsResponse> => {
    const response = await apiClient.get<InsightsResponse>('/tasks/insights');
    return response.data;
  },
};
