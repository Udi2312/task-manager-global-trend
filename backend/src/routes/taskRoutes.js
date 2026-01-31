import express from 'express';
import { body } from 'express-validator';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Validation middleware
const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Task title is required')
];

const updateTaskValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Task title cannot be empty'),
  body('description')
    .optional()
    .trim(),
  body('completed')
    .optional()
    .isBoolean().withMessage('Completed must be a boolean')
];

// Routes
router.get('/', getTasks);
router.post('/', createTaskValidation, createTask);
router.put('/:id', updateTaskValidation, updateTask);
router.delete('/:id', deleteTask);

export default router;
