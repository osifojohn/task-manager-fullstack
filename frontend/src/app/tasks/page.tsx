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
import { TaskStatus, Priority, CreateTaskData } from '@/types';
import { Pagination } from '@/components/ui/Pagination';

import { FileWarning } from 'lucide-react';

export default function TasksPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '' as TaskStatus | '',
    priority: '' as Priority | '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc',
    page: 1,
    limit: 10,
  });
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Prepare query parameters
  const queryParams = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      page: filters.page,
      limit: filters.limit,
    };

    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.search) params.search = filters.search;

    return params;
  }, [filters]);

  const { tasks, pagination, isLoading, createTask, isCreating } =
    useTasks(queryParams);

  const handleCreateTask = (data: CreateTaskData) => {
    createTask(data);
    setShowCreateForm(false);
  };

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      priority: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
      limit: 10,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    // Scroll to top when page changes for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({
      ...prev,
      limit,
      page: 1, // Reset to first page when limit changes
    }));
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
        subtitle={`${pagination?.total} task${
          pagination?.total !== 1 ? 's' : ''
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
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {tasks.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <FileWarning className="mx-auto h-12 w-12 mb-4 text-gray-400" />
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
        <>
          <div
            className={
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200'
            }
          >
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                editingTaskId={editingTaskId}
                onEditingChange={setEditingTaskId}
              />
            ))}
          </div>

          {pagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              totalItems={pagination.total}
              itemsPerPage={pagination.limit}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
              showInfo={true}
              showLimitSelector={true}
              isLoading={isLoading}
              limitOptions={[5, 10, 20, 50]}
              className="mt-8"
            />
          )}
        </>
      )}
    </Layout>
  );
}
