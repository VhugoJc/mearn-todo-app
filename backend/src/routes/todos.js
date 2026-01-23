const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosByStatus
} = require('../controllers/todoController');

// Validation middleware
const todoValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot be longer than 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot be longer than 1000 characters'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'completed'])
    .withMessage('Status must be todo, in-progress, or completed')
];

const updateValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot be longer than 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot be longer than 1000 characters'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'completed'])
    .withMessage('Status must be todo, in-progress, or completed')
];

// Routes
router.get('/', getAllTodos);
router.get('/status/:status', getTodosByStatus);
router.get('/:id', getTodoById);
router.post('/', todoValidation, createTodo);
router.put('/:id', updateValidation, updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
