# MEAN Todo App with Terraform

A full-stack Todo application built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) and deployed using Terraform infrastructure as code.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular UI    │────│  Express API    │────│    MongoDB      │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos by status (all, active, completed)
- ✅ Responsive design
- ✅ RESTful API
- ✅ Cloud deployment with Terraform
- ✅ Containerized with Docker

## 🛠️ Tech Stack

### Frontend
- **Angular** - TypeScript-based web framework
- **Angular Material** - UI component library
- **RxJS** - Reactive programming library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Infrastructure
- **Terraform** - Infrastructure as Code
- **Docker** - Containerization
- **AWS/GCP/Azure** - Cloud provider (configurable)

## 📁 Project Structure

```
mean-todo-app/
├── terraform/                 # Infrastructure as Code
│   ├── main.tf               # Main Terraform configuration
│   ├── variables.tf          # Variable definitions
│   ├── outputs.tf            # Output values
│   └── modules/              # Reusable modules
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   └── app.js           # Express app setup
│   ├── package.json
│   └── Dockerfile
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/             # Angular components
│   │   ├── environments/    # Environment configs
│   │   └── assets/          # Static assets
│   ├── package.json
│   ├── angular.json
│   └── Dockerfile
├── docker-compose.yml        # Local development
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB (local or cloud)
- Docker & Docker Compose
- Terraform CLI

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mean-todo-app
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Or run manually:**

   **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   ng serve
   ```

4. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

## 🌐 Cloud Deployment

### Using Terraform

1. **Configure your cloud provider credentials**
   ```bash
   # For AWS
   export AWS_ACCESS_KEY_ID="your-access-key"
   export AWS_SECRET_ACCESS_KEY="your-secret-key"
   ```

2. **Initialize Terraform**
   ```bash
   cd terraform
   terraform init
   ```

3. **Plan the deployment**
   ```bash
   terraform plan
   ```

4. **Deploy to cloud**
   ```bash
   terraform apply
   ```

5. **Get deployment URLs**
   ```bash
   terraform output
   ```

## 📝 API Endpoints

| Method | Endpoint      | Description           |
|--------|---------------|-----------------------|
| GET    | `/api/todos`  | Get all todos         |
| POST   | `/api/todos`  | Create a new todo     |
| GET    | `/api/todos/:id` | Get todo by ID     |
| PUT    | `/api/todos/:id` | Update todo        |
| DELETE | `/api/todos/:id` | Delete todo        |

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-jwt-secret
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 🧪 Testing

**Backend tests:**
```bash
cd backend
npm test
```

**Frontend tests:**
```bash
cd frontend
ng test
```

**E2E tests:**
```bash
cd frontend
ng e2e
```

## 📦 Docker Commands

**Build images:**
```bash
docker-compose build
```

**Start services:**
```bash
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop services:**
```bash
docker-compose down
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB connection issues**
   - Check if MongoDB is running
   - Verify connection string in environment variables

2. **CORS errors**
   - Ensure backend CORS is configured for frontend URL

3. **Port conflicts**
   - Change ports in docker-compose.yml or environment configs

### Useful Commands

```bash
# Check running containers
docker ps

# View container logs
docker logs <container-name>

# Connect to MongoDB
docker exec -it mongodb mongo

# Rebuild specific service
docker-compose build <service-name>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Victor Jiménez**

- GitHub: [@yourusername](https://github.com/yourusername)

---

⭐ If this project helped you, please give it a star!