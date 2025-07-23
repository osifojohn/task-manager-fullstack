'use client';
import React, { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TaskCard } from '@/features/tasks/components/TaskCard';
import { TaskForm } from '@/features/tasks/components/TaskForm';
import { TaskFilters } from '@/features/tasks/components/TaskFilters';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { TaskStatus, Priority } from '@/types';

export default function TasksPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '' as TaskStatus | '',
    priority: '' as Priority | '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  // Prepare query parameters
  const queryParams = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    };

    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;

    return params;
  }, [filters]);

  const { tasks, isLoading, createTask, isCreating } = useTasks(queryParams);

  // Client-side search filtering
  const filteredTasks = useMemo(() => {
    if (!filters.search) return tasks;

    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        task.extras.tags?.some((tag) =>
          tag.toLowerCase().includes(filters.search.toLowerCase())
        )
    );
  }, [tasks, filters.search]);

  const handleCreateTask = (data: any) => {
    createTask(data);
    setShowCreateForm(false);
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      priority: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header
        title="Tasks"
        subtitle={`${filteredTasks.length} task${
          filteredTasks.length !== 1 ? 's' : ''
        } found`}
      >
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Task'}
        </Button>
      </Header>

      {showCreateForm && (
        <Card className="mb-6">
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowCreateForm(false)}
            loading={isCreating}
          />
        </Card>
      )}

      <TaskFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleResetFilters}
      />

      {filteredTasks.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-500 mb-4">
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
                d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm">Get started by creating your first task!</p>
          </div>
          {!showCreateForm && (
            <Button onClick={() => setShowCreateForm(true)}>
              Create Your First Task
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </Layout>
  );
}
