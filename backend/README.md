# MEAN Todo Backend

Node.js Express backend for the MEAN stack Todo application.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Environment Setup
Copy `.env` file and configure your environment variables:
```bash
# Environment Variables
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://todoapp:todopassword@localhost:27017/meantodo
CORS_ORIGIN=http://localhost:4200
```

### Start Development Server
```bash
npm run dev
```

### Start Production Server
```bash
npm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get todo by ID |
| GET | `/api/todos/status/:status` | Get todos by status |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |

## 📝 API Usage Examples

### Create Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Build a REST API with Express",
    "status": "todo"
  }'
```

### Update Todo
```bash
curl -X PUT http://localhost:3000/api/todos/MONGO_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js - Updated",
    "status": "completed"
  }'
```

### Delete Todo
```bash
curl -X DELETE http://localhost:3000/api/todos/MONGO_ID
```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controllers/
│   │   └── todoController.js  # Business logic
│   ├── middleware/
│   │   └── errorHandler.js    # Error handling
│   ├── models/
│   │   └── Todo.js           # Mongoose schema
│   ├── routes/
│   │   └── todos.js          # Route definitions
│   └── app.js                # Express app setup
├── server.js                 # Server entry point
├── package.json
└── .env                      # Environment variables
```

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers
- **morgan** - HTTP request logging
- **compression** - Response compression

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📦 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
