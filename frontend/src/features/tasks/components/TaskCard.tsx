'use client';

import React, { useState } from 'react';
import { CreateTaskData, Task, TaskStatus, UpdateTaskData } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTasks } from '../hooks/useTasks';
import { TaskForm } from './TaskForm';

interface TaskCardProps {
  task: Task;
  editingTaskId?: string | null;
  onEditingChange?: (taskId: string | null) => void;
}

const statusConfig = {
  pending: { variant: 'warning' as const, label: 'Pending' },
  'in-progress': { variant: 'info' as const, label: 'In Progress' },
  done: { variant: 'success' as const, label: 'Done' },
};

const priorityConfig = {
  low: { variant: 'default' as const, label: 'Low' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  high: { variant: 'danger' as const, label: 'High' },
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  editingTaskId,
  onEditingChange,
}) => {
  const [localIsEditing, setLocalIsEditing] = useState(false);
  const { updateTask, deleteTask, isUpdating, isDeleting } = useTasks();

  const isEditing =
    editingTaskId !== undefined ? editingTaskId === task._id : localIsEditing;

  const handleStatusChange = (status: TaskStatus) => {
    updateTask({ id: task._id, data: { status } });
  };

  const handleEdit = (data: CreateTaskData) => {
    updateTask({ id: task._id, data });
    if (onEditingChange) {
      onEditingChange(null);
    } else {
      setLocalIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task._id);
    }
  };

  const handleStartEdit = () => {
    if (onEditingChange) {
      onEditingChange(task._id);
    } else {
      setLocalIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    if (onEditingChange) {
      onEditingChange(null);
    } else {
      setLocalIsEditing(false);
    }
  };

  return (
    <Card
      className={`transition-all duration-300 ${
        isEditing ? 'scale-105 shadow-lg z-10' : 'hover:shadow-md'
      }`}
    >
      {isEditing ? (
        <TaskForm
          task={task}
          onSubmit={handleEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold  text-gray-900 text-lg break-words whitespace-pre-wrap">
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <Badge variant={statusConfig[task.status].variant}>
                {statusConfig[task.status].label}
              </Badge>
              {task.extras.priority && (
                <Badge variant={priorityConfig[task.extras.priority].variant}>
                  {priorityConfig[task.extras.priority].label}
                </Badge>
              )}
            </div>
          </div>

          {task.description && (
            <p className="text-gray-600 mb-4 break-words whitespace-pre-wrap w-full ">
              {task.description}
            </p>
          )}

          <div className="space-y-2 mb-4">
            {task.extras.dueDate && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">📅</span>
                Due: {new Date(task.extras.dueDate).toLocaleDateString()}
              </div>
            )}
            {task.extras.estimatedHours && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">⏱️</span>
                Estimated: {task.extras.estimatedHours}h
              </div>
            )}
            {task.extras.tags && task.extras.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-1">
                <span className="text-sm text-gray-500 mr-2">🏷️</span>
                {task.extras.tags.map((tag) => (
                  <Badge key={tag} size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex space-x-2">
              {task.status !== 'done' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleStatusChange(
                      task.status === 'pending' ? 'in-progress' : 'done'
                    )
                  }
                  loading={isUpdating}
                >
                  {task.status === 'pending' ? 'Start' : 'Complete'}
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={handleStartEdit}>
                Edit
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              loading={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
