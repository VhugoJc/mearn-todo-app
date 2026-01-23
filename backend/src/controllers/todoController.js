const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: todos,
      message: 'Todos retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Unable to fetch todos'
    });
  }
};

// Get todo by ID
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      data: todo,
      message: 'Todo retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching todo:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID',
        message: 'Invalid todo ID format'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Unable to fetch todo'
    });
  }
};

// Create new todo
const createTodo = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Invalid input data',
        details: errors.array()
      });
    }

    const { title, description, status } = req.body;
    
    const todo = new Todo({
      title,
      description: description || '',
      status: status || 'todo'
    });
    
    const savedTodo = await todo.save();
    
    res.status(201).json({
      success: true,
      data: savedTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Unable to create todo'
    });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Invalid input data',
        details: errors.array()
      });
    }

    const { title, description, status } = req.body;
    
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Todo not found'
      });
    }
    
    // Update fields
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (status !== undefined) todo.status = status;
    
    const updatedTodo = await todo.save();
    
    res.json({
      success: true,
      data: updatedTodo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID',
        message: 'Invalid todo ID format'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Unable to update todo'
    });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Todo not found'
      });
    }
    
    await Todo.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      data: null,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID',
        message: 'Invalid todo ID format'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Unable to delete todo'
    });
  }
};

// Get todos by status
const getTodosByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    if (!['todo', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Status',
        message: 'Status must be todo, in-progress, or completed'
      });
    }
    
    const todos = await Todo.find({ status }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: todos,
      message: `${status} todos retrieved successfully`
    });
  } catch (error) {
    console.error('Error fetching todos by status:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Unable to fetch todos'
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosByStatus
};
