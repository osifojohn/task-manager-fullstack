export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskExtras {
  tags?: string[];
  dueDate?: string;
  priority?: Priority;
  estimatedHours?: number;
  actualHours?: number;
  notes?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  extras: TaskExtras;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: TaskStatus;
  extras?: Partial<TaskExtras>;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface TasksResponse {
  success: boolean;
  data: {
    tasks: Task[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface TaskResponse {
  success: boolean;
  data: {
    task: Task;
  };
  message?: string;
}

export interface TaskInsights {
  statusBreakdown: {
    pending: number;
    'in-progress': number;
    done: number;
  };
  priorityBreakdown: {
    low: number;
    medium: number;
    high: number;
  };
  metrics: {
    totalTasks: number;
    overdueTasks: number;
    completionRate: number;
    avgCompletionHours: number;
  };
  upcomingDeadlines: Array<{
    _id: string;
    title: string;
    dueDate: string;
    priority: Priority;
    status: TaskStatus;
  }>;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  _id: string;
}

export interface InsightsResponse {
  success: boolean;
  data: TaskInsights;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
