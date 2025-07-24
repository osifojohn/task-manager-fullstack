'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/features/tasks/components/StatCard';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { ApiError, InsightsResponse } from '@/types';

interface TaskInsightsProps {
  insights: InsightsResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
}

const SectionLoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
  </div>
);

export const TaskInsights: React.FC<TaskInsightsProps> = ({
  insights,
  isLoading,
  error,
  onRetry,
}) => {
  const data = insights?.data;

  return (
    <>
      {/* Error banner for insights */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="mr-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-red-800 font-medium">
                Error loading dashboard insights
              </h4>
              <p className="text-red-700 text-sm mt-1">
                {error?.message ||
                  'Unable to load dashboard statistics, task status, priorities, and deadlines'}
              </p>
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

      {/* Stats Grid */}
      {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            value={isLoading ? undefined : data?.metrics.totalTasks || 0}
            subtitle="All time"
            color="blue"
            isLoading={isLoading}
          />
          <StatCard
            title="Completion Rate"
            value={
              isLoading
                ? undefined
                : Math.round(data?.metrics.completionRate || 0)
            }
            subtitle="Success rate"
            color="green"
            isLoading={isLoading}
          />
          <StatCard
            title="Overdue Tasks"
            value={isLoading ? undefined : data?.metrics.overdueTasks || 0}
            subtitle="Need attention"
            color="red"
            isLoading={isLoading}
          />
          <StatCard
            title="Avg. Hours"
            value={
              isLoading
                ? undefined
                : Math.round(data?.metrics.avgCompletionHours || 0)
            }
            subtitle="Per task"
            color="purple"
            isLoading={isLoading}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Overview */}
        {(isLoading || !error) && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Task Status
            </h3>
            {isLoading ? (
              <SectionLoadingSpinner />
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <Badge variant="warning">
                    {data?.statusBreakdown.pending || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">In Progress</span>
                  </div>
                  <Badge variant="info">
                    {data?.statusBreakdown['in-progress'] || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">Done</span>
                  </div>
                  <Badge variant="success">
                    {data?.statusBreakdown.done || 0}
                  </Badge>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Priority Overview */}
        {(isLoading || !error) && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Priority Breakdown
            </h3>
            {isLoading ? (
              <SectionLoadingSpinner />
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <Badge variant="danger">
                    {data?.priorityBreakdown.high || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <Badge variant="warning">
                    {data?.priorityBreakdown.medium || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">Low</span>
                  </div>
                  <Badge>{data?.priorityBreakdown.low || 0}</Badge>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Upcoming Deadlines */}
        {(isLoading || !error) && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Deadlines
              </h3>
              <Link href={ROUTES.TASKS}>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </Link>
            </div>
            {isLoading ? (
              <SectionLoadingSpinner />
            ) : (
              <div className="space-y-3">
                {Array.isArray(data?.upcomingDeadlines) &&
                data.upcomingDeadlines.length > 0 ? (
                  data?.upcomingDeadlines?.slice(0, 3).map((task) => (
                    <div
                      key={task._id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          task.priority === 'high'
                            ? 'danger'
                            : task.priority === 'medium'
                            ? 'warning'
                            : 'default'
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No upcoming deadlines
                  </p>
                )}
              </div>
            )}
          </Card>
        )}
      </div>
    </>
  );
};
