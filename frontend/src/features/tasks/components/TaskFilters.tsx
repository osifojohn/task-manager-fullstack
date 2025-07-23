'use client';

import React from 'react';
import { TaskStatus, Priority } from '@/types';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface TaskFiltersProps {
  filters: {
    status: TaskStatus | '';
    priority: Priority | '';
    search: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const sortOptions = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'title', label: 'Title' },
  { value: 'status', label: 'Status' },
  { value: 'priority', label: 'Priority' },
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const handleFilterChange = (field: string, value: string) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />

        <Select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          options={statusOptions}
        />

        <Select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          options={priorityOptions}
        />

        <div className="flex space-x-2">
          <Select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            options={sortOptions}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() =>
              handleFilterChange(
                'sortOrder',
                filters.sortOrder === 'asc' ? 'desc' : 'asc'
              )
            }
            className="px-3"
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>

        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};
