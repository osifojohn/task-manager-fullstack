import express from 'express';
import { body } from 'express-validator';

import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTaskInsights,
  getTasks,
  updateTask,
} from '../controllers/taskController';

const router = express.Router();

const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'done'])
    .withMessage('Status must be pending, in-progress, or done'),
  body('extras.priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('extras.tags').optional().isArray().withMessage('Tags must be an array'),
  body('extras.tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Each tag cannot exceed 30 characters'),
  body('extras.dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('extras.estimatedHours')
    .optional()
    .isNumeric()
    .withMessage('Estimated hours must be a number'),
  body('extras.actualHours')
    .optional()
    .isNumeric()
    .withMessage('Actual hours must be a number'),
  body('extras.notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
];

const updateTaskValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Task title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'done'])
    .withMessage('Status must be pending, in-progress, or done'),
  body('extras.priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('extras.tags').optional().isArray().withMessage('Tags must be an array'),
  body('extras.tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Each tag cannot exceed 30 characters'),
  body('extras.dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('extras.estimatedHours')
    .optional()
    .isNumeric()
    .withMessage('Estimated hours must be a number'),
  body('extras.actualHours')
    .optional()
    .isNumeric()
    .withMessage('Actual hours must be a number'),
  body('extras.notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
];

// authentication applied to all routes
router.use(authenticate);

// Routes
router.get('/', getTasks);
router.get('/insights', getTaskInsights);
router.get('/:id', getTaskById);
router.post('/', createTaskValidation, validateRequest, createTask);
router.put('/:id', updateTaskValidation, validateRequest, updateTask);
router.delete('/:id', deleteTask);

export default router;
