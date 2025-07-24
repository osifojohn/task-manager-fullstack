'use client';
import React from 'react';

import { Header } from '@/components/layout/Header';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { useTaskInsights } from '@/features/tasks/hooks/useTasks';
import { TaskInsights } from '@/features/dashboard/TaskInsights';
import { RecentTasks } from '@/features/dashboard/RecentTasks';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

export default function DashboardPage() {
  const {
    data: insights,
    isLoading: insightsLoading,
    error: insightsError,
    refetch: refetchInsights,
  } = useTaskInsights();

  const {
    tasks,
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useTasks({
    limit: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Handle complete failure
  if (!insightsLoading && !tasksLoading && insightsError && tasksError) {
    return (
      <>
        <Header
          title="Dashboard"
          subtitle="Welcome back! Here's an overview of your tasks."
        />
        <ErrorFallback
          title="Unable to Load Dashboard"
          error={null}
          onRetry={() => {
            refetchInsights?.();
            refetchTasks?.();
          }}
        />
      </>
    );
  }

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your tasks."
      />

      <TaskInsights
        insights={insights}
        isLoading={insightsLoading}
        error={insightsError}
        onRetry={() => refetchInsights?.()}
      />

      <RecentTasks
        tasks={tasks}
        isLoading={tasksLoading}
        error={tasksError}
        onRetry={() => refetchTasks?.()}
      />
    </>
  );
}
