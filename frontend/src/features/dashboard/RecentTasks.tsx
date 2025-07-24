'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { Task } from '@/types';

interface RecentTasksProps {
  tasks: Task[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
}

const SectionLoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
  </div>
);

export const RecentTasks: React.FC<RecentTasksProps> = ({
  tasks,
  isLoading,
  error,
  onRetry,
}) => {
  return (
    <Card className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
        <Link href={ROUTES.TASKS}>
          <Button variant="ghost" size="sm">
            View all tasks
          </Button>
        </Link>
      </div>

      {/* Show error banner for tasks if there's an error */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h4 className="text-red-800 font-medium text-sm">
                  Error loading recent tasks
                </h4>
                <p className="text-red-700 text-xs">
                  {error?.message || 'Unable to load recent tasks'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="text-red-700 border-red-300 hover:bg-red-100"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <SectionLoadingSpinner />
      ) : (
        <div className="space-y-3">
          {!error && tasks && tasks?.length > 0 ? (
            tasks.slice(0, 5).map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Created {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      task.status === 'done'
                        ? 'success'
                        : task.status === 'in-progress'
                        ? 'info'
                        : 'warning'
                    }
                  >
                    {task.status === 'in-progress'
                      ? 'In Progress'
                      : task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)}
                  </Badge>
                  {task.extras.priority && (
                    <Badge
                      variant={
                        task.extras.priority === 'high'
                          ? 'danger'
                          : task.extras.priority === 'medium'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {task.extras.priority}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          ) : !error ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No tasks yet. Create your first task!
              </p>
              <Link href={ROUTES.TASKS}>
                <Button>Create Task</Button>
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </Card>
  );
};
