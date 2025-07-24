'use client';
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { useTaskInsights } from '@/features/tasks/hooks/useTasks';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

const StatCard: React.FC<{
  title: string;
  value: number;
  subtitle?: string;
  color?: string;
}> = ({ title, value, subtitle, color = 'blue' }) => (
  <Card className="text-center">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </Card>
);

export default function DashboardPage() {
  const { data: insights, isLoading: insightsLoading } = useTaskInsights();
  const { tasks, isLoading: tasksLoading } = useTasks({
    limit: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  if (insightsLoading || tasksLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  const data = insights?.data;

  return (
    <Layout>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your tasks."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tasks"
          value={data?.metrics.totalTasks || 0}
          subtitle="All time"
          color="blue"
        />
        <StatCard
          title="Completion Rate"
          value={Math.round(data?.metrics.completionRate || 0)}
          subtitle="Success rate"
          color="green"
        />
        <StatCard
          title="Overdue Tasks"
          value={data?.metrics.overdueTasks || 0}
          subtitle="Need attention"
          color="red"
        />
        <StatCard
          title="Avg. Hours"
          value={Math.round(data?.metrics.avgCompletionHours || 0)}
          subtitle="Per task"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Overview */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Task Status
          </h3>
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
              <Badge variant="success">{data?.statusBreakdown.done || 0}</Badge>
            </div>
          </div>
        </Card>

        {/* Priority Overview */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Priority Breakdown
          </h3>
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
        </Card>

        {/* Upcoming Deadlines */}
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
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
          <Link href={ROUTES.TASKS}>
            <Button variant="ghost" size="sm">
              View all tasks
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
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
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No tasks yet. Create your first task!
              </p>
              <Link href={ROUTES.TASKS}>
                <Button>Create Task</Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </Layout>
  );
}
