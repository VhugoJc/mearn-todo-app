const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be longer than 200 characters']
  },
  description: {
    type: String,
    default: '',
    maxlength: [1000, 'Description cannot be longer than 1000 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['todo', 'in-progress', 'completed'],
      message: 'Status must be either todo, in-progress, or completed'
    },
    default: 'todo'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically manage createdAt and updatedAt
});

// Update the updatedAt field before saving
todoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
todoSchema.index({ status: 1 });
todoSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Todo', todoSchema);
