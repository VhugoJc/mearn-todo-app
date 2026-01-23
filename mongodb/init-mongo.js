// MongoDB initialization script
// This script runs when the container starts for the first time

// Switch to the meantodo database
db = db.getSiblingDB('meantodo');

// Create a user for the application
db.createUser({
  user: 'todoapp',
  pwd: 'todopassword',
  roles: [
    {
      role: 'readWrite',
      db: 'meantodo'
    }
  ]
});

// Create the todos collection with some sample data
db.createCollection('todos');

// Insert sample todos (optional)
db.todos.insertMany([
  {
    title: 'Setup MongoDB Container',
    description: 'Create and configure MongoDB Docker container',
    status: 'completed',
    createdAt: new Date('2026-01-20')
  },
  {
    title: 'Build Express.js API',
    description: 'Create RESTful API endpoints for todo operations',
    status: 'in-progress',
    createdAt: new Date('2026-01-22')
  },
  {
    title: 'Connect Frontend to Backend',
    description: 'Integrate Angular frontend with Express.js backend',
    status: 'todo',
    createdAt: new Date('2026-01-22')
  }
]);

print('Database initialized successfully!');
