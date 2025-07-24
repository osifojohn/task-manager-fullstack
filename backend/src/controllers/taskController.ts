import { Request, Response } from 'express';
import Task, { TaskStatus } from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const {
      status,
      priority,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter
    const filter: any = { userId: req.user!._id };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter['extras.priority'] = priority;
    }

    // Build sort
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limitNum);

    const total = await Task.countDocuments(filter);

    res.json({
      success: true,
      data: {
        tasks,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
    });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user!._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: { task },
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
    });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskData = {
      ...req.body,
      userId: req.user!._id,
    };

    const task = await Task.create(taskData);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task },
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
    });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    // Undefined values removed to prevent overwriting with undefined
    const updateData = Object.fromEntries(
      Object.entries(req.body).filter(([_, value]) => value !== undefined)
    );

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: { task },
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
    });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
    });
  }
};

export const getTaskInsights = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!._id;

    // Get status counts
    const statusCounts = await Task.aggregate([
      { $match: { userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Get priority breakdown
    const priorityCounts = await Task.aggregate([
      { $match: { userId } },
      { $group: { _id: '$extras.priority', count: { $sum: 1 } } },
    ]);

    // Get overdue tasks
    const overdueTasks = await Task.countDocuments({
      userId,
      'extras.dueDate': { $lt: new Date() },
      status: { $ne: 'done' },
    });

    // Get completion rate for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentTasks = await Task.countDocuments({
      userId,
      createdAt: { $gte: thirtyDaysAgo },
    });

    const recentCompletedTasks = await Task.countDocuments({
      userId,
      createdAt: { $gte: thirtyDaysAgo },
      status: 'done',
    });

    // Get average completion time
    const completedTasks = await Task.find({
      userId,
      status: 'done',
      updatedAt: { $gte: thirtyDaysAgo },
    }).select('createdAt updatedAt');

    let avgCompletionHours = 0;
    if (completedTasks.length > 0) {
      const totalHours = completedTasks.reduce((sum, task) => {
        const hours =
          (task.updatedAt.getTime() - task.createdAt.getTime()) /
          (1000 * 60 * 60);
        return sum + hours;
      }, 0);
      avgCompletionHours =
        Math.round((totalHours / completedTasks.length) * 10) / 10;
    }

    // Get upcoming deadlines (next 7 days)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcomingDeadlines = await Task.find({
      userId,
      'extras.dueDate': {
        $gte: new Date(),
        $lte: nextWeek,
      },
      status: { $ne: 'done' },
    })
      .sort({ 'extras.dueDate': 1 })
      .limit(5);

    // Status counts formating
    const statusMap = statusCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {} as Record<TaskStatus, number>);

    // Priority counts formating
    const priorityMap = priorityCounts.reduce((acc, item) => {
      acc[item._id || 'medium'] = item.count;
      return acc;
    }, {} as Record<string, number>);

    const completionRate =
      recentTasks > 0
        ? Math.round((recentCompletedTasks / recentTasks) * 100)
        : 0;

    res.json({
      success: true,
      data: {
        statusBreakdown: {
          pending: statusMap.pending || 0,
          'in-progress': statusMap['in-progress'] || 0,
          done: statusMap.done || 0,
        },
        priorityBreakdown: {
          low: priorityMap.low || 0,
          medium: priorityMap.medium || 0,
          high: priorityMap.high || 0,
        },
        metrics: {
          totalTasks: Object.values(statusMap).reduce(
            (a, b) => (a as number) + (b as number),
            0
          ),
          overdueTasks,
          completionRate,
          avgCompletionHours,
        },
        upcomingDeadlines: upcomingDeadlines.map((task) => ({
          _id: task._id,
          title: task.title,
          dueDate: task.extras.dueDate,
          priority: task.extras.priority,
          status: task.status,
        })),
      },
    });
  } catch (error) {
    console.error('Get task insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task insights',
    });
  }
};
