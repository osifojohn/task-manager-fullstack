import mongoose, { Document, Schema } from 'mongoose';

export type TaskStatus = 'pending' | 'in-progress' | 'done';

export interface ITaskExtras {
  tags?: string[];
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  estimatedHours?: number;
  actualHours?: number;
  notes?: string;
}

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  extras: ITaskExtras;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [200, 'Task title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'done'],
      default: 'pending',
    },
    extras: {
      tags: [
        {
          type: String,
          trim: true,
          maxlength: [30, 'Tag cannot exceed 30 characters'],
        },
      ],
      dueDate: {
        type: Date,
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
      estimatedHours: {
        type: Number,
        min: [0, 'Estimated hours cannot be negative'],
      },
      actualHours: {
        type: Number,
        min: [0, 'Actual hours cannot be negative'],
      },
      notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters'],
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });
taskSchema.index({ userId: 1, 'extras.dueDate': 1 });

export default mongoose.model<ITask>('Task', taskSchema);
