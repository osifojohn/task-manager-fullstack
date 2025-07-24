'use client';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTaskInsights } from '@/features/tasks/hooks/useTasks';
import { BarChart2 } from 'lucide-react';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { AnalyticsProgressBar } from '@/features/tasks/components/AnalyticsProgressBar';

export default function AnalyticsPage() {
  const { data: insights, isLoading, error, refetch } = useTaskInsights();

  if (error && !isLoading) {
    return (
      <>
        <Header
          title="Analytics"
          subtitle="Insights and metrics about your task management"
        />
        <Card>
          <ErrorFallback
            error={error}
            onRetry={() => refetch()}
            title="Failed to load analytics"
          />
        </Card>
      </>
    );
  }

  const data = insights?.data;
  const totalTasks = data?.metrics.totalTasks || 0;

  return (
    <>
      <Header
        title="Analytics"
        subtitle="Insights and metrics about your task management"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ------------------- Task Status ------------------- */}
        {isLoading ? (
          <CardSkeleton title="Task Status Distribution" />
        ) : (
          <ProgressCard
            title="Task Status Distribution"
            total={totalTasks}
            items={[
              {
                label: 'Completed Tasks',
                value: data?.statusBreakdown.done || 0,
                color: 'bg-green-500',
              },
              {
                label: 'In Progress',
                value: data?.statusBreakdown['in-progress'] || 0,
                color: 'bg-blue-500',
              },
              {
                label: 'Pending Tasks',
                value: data?.statusBreakdown.pending || 0,
                color: 'bg-yellow-500',
              },
            ]}
          />
        )}

        {/* ------------------- Priority ------------------- */}
        {isLoading ? (
          <CardSkeleton title="Priority Distribution" />
        ) : (
          <ProgressCard
            title="Priority Distribution"
            total={totalTasks}
            items={[
              {
                label: 'High Priority',
                value: data?.priorityBreakdown.high || 0,
                color: 'bg-red-500',
              },
              {
                label: 'Medium Priority',
                value: data?.priorityBreakdown.medium || 0,
                color: 'bg-yellow-500',
              },
              {
                label: 'Low Priority',
                value: data?.priorityBreakdown.low || 0,
                color: 'bg-gray-500',
              },
            ]}
          />
        )}

        {/* ------------------- Performance ------------------- */}
        {isLoading ? (
          <CardSkeleton title="Performance Metrics" height="h-40" />
        ) : (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <MetricItem
                label="Completion Rate"
                value={`${Math.round(data?.metrics.completionRate || 0)}%`}
                color="text-green-600"
                bg="bg-green-50"
              />
              <MetricItem
                label="Avg. Hours per Task"
                value={`${Math.round(data?.metrics.avgCompletionHours || 0)}h`}
                color="text-blue-600"
                bg="bg-blue-50"
              />
              <MetricItem
                label="Overdue Tasks"
                value={data?.metrics.overdueTasks || 0}
                color="text-red-600"
                bg="bg-red-50"
              />
              <MetricItem
                label="Total Tasks"
                value={totalTasks}
                color="text-purple-600"
                bg="bg-purple-50"
              />
            </div>
          </Card>
        )}

        {/* ------------------- Upcoming Deadlines ------------------- */}
        {isLoading ? (
          <CardSkeleton title="Upcoming Deadlines" height="h-48" />
        ) : (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {Array.isArray(data?.upcomingDeadlines) &&
              data.upcomingDeadlines.length > 0 ? (
                data.upcomingDeadlines.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
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
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No upcoming deadlines
                </p>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* ------------------- No Data ------------------- */}
      {!isLoading && totalTasks === 0 && (
        <Card className="text-center py-12 mt-8">
          <div className="text-gray-500">
            <BarChart2 className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No analytics data available</p>
            <p className="text-sm">Create some tasks to see your analytics!</p>
          </div>
        </Card>
      )}
    </>
  );
}

const CardSkeleton: React.FC<{ title: string; height?: string }> = ({
  title,
  height = 'h-32',
}) => (
  <Card>
    <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
    <div className={`flex items-center justify-center ${height}`}>
      <div className="flex flex-col items-center space-y-2">
        <div className="w-6 h-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  </Card>
);

const ProgressCard: React.FC<{
  title: string;
  total: number;
  items: { label: string; value: number; color: string }[];
}> = ({ title, total, items }) => (
  <Card>
    <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
    <div className="space-y-4">
      {items.map((item) => (
        <AnalyticsProgressBar
          key={item.label}
          label={item.label}
          value={item.value}
          total={total}
          color={item.color}
        />
      ))}
    </div>
  </Card>
);

const MetricItem: React.FC<{
  label: string;
  value: string | number;
  color: string;
  bg: string;
}> = ({ label, value, color, bg }) => (
  <div className={`text-center p-4 rounded-lg ${bg}`}>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);
