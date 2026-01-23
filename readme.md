# MEAN Todo Application

A full-stack Todo application built with the MEAN stack (MongoDB, Express.js, Angular, Node.js).

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular UI    │────│  Express API    │────│    MongoDB      │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## ✨ Features

- ✅ Create, edit, and delete todos
- ✅ Drag & drop todos between columns (Todo, In Progress, Completed)
- ✅ Professional UI with modals and animations
- ✅ Real-time updates with MongoDB
- ✅ RESTful API with full CRUD operations
- ✅ Environment-based configuration
- ✅ Error handling and loading states

## 🛠️ Tech Stack

### Frontend
- **Angular 21** - Latest Angular with standalone components
- **TypeScript** - Type-safe JavaScript
- **Angular CDK** - Drag & drop functionality
- **SCSS** - Styling with variables and mixins

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development Tools
- **Docker** - MongoDB containerization
- **Environment Variables** - Configuration management

## 📁 Project Structure

```
mean-todo-app/
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts       # Main component
│   │   │   ├── app.html     # Component template
│   │   │   ├── app.scss     # Component styles
│   │   │   └── services/
│   │   │       └── todo.service.ts
│   │   └── environments/    # Environment configs
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── server.js           # Server entry point
└── mongodb/                # Database setup
    ├── Dockerfile          # MongoDB container
    └── init-mongo.js       # Database initialization
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)
- Docker & Docker Compose

### Step 1: Clone and Setup

```bash
git clone https://github.com/VhugoJc/mearn-todo-app.git
cd mean-todo-app
```

### Step 2: Start MongoDB

```bash
cd mongodb
docker build -t mean-todo-mongodb .
docker run -d -p 27017:27017 --name mongodb mean-todo-mongodb
```

### Step 3: Start Backend API

```bash
cd backend
npm install
npm start
```

Backend will run on `http://localhost:3000`

### Step 4: Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:4200`

## 🔧 Configuration

### Environment Variables

**Backend** (`.env` file):
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:password@localhost:27017/meantodo?authSource=admin
CORS_ORIGIN=http://localhost:4200
JWT_SECRET=your-secret-key
```

**Frontend** (environment files):
- `src/environments/environment.ts` - Development config
- `src/environments/environment.prod.ts` - Production config

## 📝 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/todos`              | Get all todos         |
| POST   | `/todos`              | Create a new todo     |
| GET    | `/todos/:id`          | Get todo by ID        |
| PUT    | `/todos/:id`          | Update todo           |
| DELETE | `/todos/:id`          | Delete todo           |
| GET    | `/todos/status/:status` | Get todos by status |
| GET    | `/health`             | Health check          |

### Example API Usage

**Create a todo:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn MEAN Stack",
    "description": "Complete the todo application",
    "status": "todo"
  }'
```

**Get all todos:**
```bash
curl http://localhost:3000/api/todos
```

## � Application Features

### Frontend Features
- **Kanban Board**: Three columns (Todo, In Progress, Completed)
- **Drag & Drop**: Move todos between columns
- **Modal Forms**: Create and edit todos in modal dialogs
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Automatic UI updates after API calls
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations

### Backend Features
- **RESTful API**: Standard HTTP methods and status codes
- **Data Validation**: Input validation with proper error messages
- **CORS Support**: Configured for frontend-backend communication
- **Environment Config**: Flexible configuration system
- **Error Handling**: Centralized error handling middleware
- **Health Checks**: API status endpoint

### Database Features
- **MongoDB**: Document-based NoSQL database
- **Data Persistence**: All todos stored permanently
- **Sample Data**: Pre-loaded example todos
- **Docker Container**: Easy setup and deployment

## � Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Kill process on port 4200
   lsof -ti:4200 | xargs kill -9
   ```

2. **MongoDB connection failed**
   ```bash
   # Check if Docker container is running
   docker ps
   
   # Restart MongoDB container
   docker restart mongodb
   ```

3. **CORS errors**
   - Verify `CORS_ORIGIN` in backend `.env` file
   - Check frontend is running on the allowed origin

4. **Frontend not connecting to API**
   - Check backend is running on port 3000
   - Verify `environment.ts` has correct API URL

## 💡 Development Tips

- Use `npm run dev` for backend development (with nodemon)
- Use Angular DevTools browser extension for debugging
- Check browser console for frontend errors
- Check backend console for API errors
- Use Postman or curl to test API endpoints directly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.