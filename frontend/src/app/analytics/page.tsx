'use client';
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTaskInsights } from '@/features/tasks/hooks/useTasks';

const ProgressBar: React.FC<{
  label: string;
  value: number;
  total: number;
  color: string;
}> = ({ label, value, total, color }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">
          {value} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  const { data: insights, isLoading } = useTaskInsights();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  const data = insights?.data;
  const totalTasks = data?.metrics.totalTasks || 0;

  return (
    <Layout>
      <Header
        title="Analytics"
        subtitle="Insights and metrics about your task management"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task Status Analytics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Task Status Distribution
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="Completed Tasks"
              value={data?.statusBreakdown.done || 0}
              total={totalTasks}
              color="bg-green-500"
            />
            <ProgressBar
              label="In Progress"
              value={data?.statusBreakdown['in-progress'] || 0}
              total={totalTasks}
              color="bg-blue-500"
            />
            <ProgressBar
              label="Pending Tasks"
              value={data?.statusBreakdown.pending || 0}
              total={totalTasks}
              color="bg-yellow-500"
            />
          </div>
        </Card>

        {/* Priority Analytics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Priority Distribution
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="High Priority"
              value={data?.priorityBreakdown.high || 0}
              total={totalTasks}
              color="bg-red-500"
            />
            <ProgressBar
              label="Medium Priority"
              value={data?.priorityBreakdown.medium || 0}
              total={totalTasks}
              color="bg-yellow-500"
            />
            <ProgressBar
              label="Low Priority"
              value={data?.priorityBreakdown.low || 0}
              total={totalTasks}
              color="bg-gray-500"
            />
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {Math.round(data?.metrics.completionRate || 0)}%
              </p>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(data?.metrics.avgCompletionHours || 0)}h
              </p>
              <p className="text-sm text-gray-600">Avg. Hours per Task</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {data?.metrics.overdueTasks || 0}
              </p>
              <p className="text-sm text-gray-600">Overdue Tasks</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{totalTasks}</p>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </div>
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Upcoming Deadlines
          </h3>
          <div className="space-y-3">
            {Array.isArray(data?.upcomingDeadlines) &&
            data.upcomingDeadlines.length > 0 ? (
              (data?.upcomingDeadlines).map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
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
              <p className="text-center  text-gray-500 py-4">
                No upcoming deadlines
              </p>
            )}
          </div>
        </Card>
      </div>

      {totalTasks === 0 && (
        <Card className="text-center py-12 mt-8">
          <div className="text-gray-500">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h2z"
              />
            </svg>
            <p className="text-lg font-medium">No analytics data available</p>
            <p className="text-sm">Create some tasks to see your analytics!</p>
          </div>
        </Card>
      )}
    </Layout>
  );
}
