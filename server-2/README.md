# Express.js + PocketBase REST API Boilerplate

A modern, type-safe REST API boilerplate built with Express.js, TypeScript, and PocketBase SDK. Features a clean, modular architecture with abstract base classes, validation, and best practices.

## 🚀 Features

- ✅ **TypeScript** - Full type safety and IntelliSense
- ✅ **Express.js** - Fast, minimalist web framework
- ✅ **PocketBase SDK** - Powerful backend-as-a-service integration
- ✅ **Abstract Base Classes** - Reusable controller and service patterns
- ✅ **Zod Validation** - Schema-based request validation
- ✅ **Modular Architecture** - Clean separation of concerns
- ✅ **Error Handling** - Centralized error management
- ✅ **Security** - Helmet, CORS, and security best practices
- ✅ **Logging** - Request logging with Morgan
- ✅ **Hot Reload** - Development with tsx watch

## 📁 Project Structure

```
src/
├── config/             # Configuration files
│   └── pocketbase.ts   # PocketBase client setup
├── controllers/        # Request handlers
│   ├── base.controller.ts
│   └── user.controller.ts
├── models/            # Data models
│   └── user.model.ts
├── services/          # Business logic
│   ├── base.service.ts
│   └── user.service.ts
├── routes/            # API routes
│   ├── index.ts
│   └── user.routes.ts
├── middleware/        # Express middleware
│   ├── error.middleware.ts
│   ├── logger.middleware.ts
│   └── validation.middleware.ts
├── validators/        # Zod schemas
│   └── user.validator.ts
├── types/            # TypeScript types
│   └── common.ts
└── index.ts          # Application entry point
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- PocketBase instance running (Download from [pocketbase.io](https://pocketbase.io))

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Configure your `.env` file:**
   ```env
   PORT=3000
   NODE_ENV=development
   POCKETBASE_URL=http://127.0.0.1:8090
   POCKETBASE_ADMIN_EMAIL=admin@example.com
   POCKETBASE_ADMIN_PASSWORD=admin123456
   API_PREFIX=/api/v1
   ```

4. **Start PocketBase:**
   ```bash
   # Download and run PocketBase
   # Visit: http://127.0.0.1:8090/_/
   # Create a 'users' collection or use the default auth collection
   ```

## 🚀 Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Format code
```bash
npm run format
```

## 📚 API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | Get all users (paginated) |
| GET | `/api/v1/users/:id` | Get user by ID |
| POST | `/api/v1/users` | Create new user |
| PATCH | `/api/v1/users/:id` | Update user |
| DELETE | `/api/v1/users/:id` | Delete user |
| GET | `/api/v1/users/email/:email` | Get user by email |
| GET | `/api/v1/users/username/:username` | Get user by username |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/auth/login` | User login |
| POST | `/api/v1/users/auth/request-password-reset` | Request password reset |
| POST | `/api/v1/users/auth/confirm-password-reset` | Confirm password reset |
| POST | `/api/v1/users/auth/request-verification` | Request email verification |
| POST | `/api/v1/users/auth/confirm-verification` | Confirm email verification |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | API health status |
| GET | `/` | API information |

## 📝 API Examples

### Create User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "johndoe",
    "password": "password123"
  }'
```

### Get All Users (Paginated)
```bash
curl "http://localhost:3000/api/v1/users?page=1&perPage=10"
```

### Get User by ID
```bash
curl http://localhost:3000/api/v1/users/RECORD_ID
```

### Update User
```bash
curl -X PATCH http://localhost:3000/api/v1/users/RECORD_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith"
  }'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/v1/users/RECORD_ID
```

## 🏗️ Architecture Patterns

### Base Controller
All controllers extend `BaseController` which provides:
- Standardized success/error response methods
- Abstract CRUD methods for consistency

### Base Service
All services extend `BaseService` which provides:
- Common CRUD operations with PocketBase
- Pagination support
- Filter and search capabilities

### Validation
Uses Zod schemas for type-safe validation:
- Request body validation
- Query parameter validation
- URL parameter validation

## 🔒 Security

- **Helmet** - Sets security-related HTTP headers
- **CORS** - Cross-origin resource sharing enabled
- **Input Validation** - All inputs validated with Zod
- **Error Handling** - Sensitive error details hidden in production

## 🧪 Extending the Boilerplate

### Adding a New Resource

1. **Create Model** (`src/models/resource.model.ts`)
2. **Create Service** (`src/services/resource.service.ts`) - extend `BaseService`
3. **Create Validator** (`src/validators/resource.validator.ts`)
4. **Create Controller** (`src/controllers/resource.controller.ts`) - extend `BaseController`
5. **Create Routes** (`src/routes/resource.routes.ts`)
6. **Register Routes** in `src/routes/index.ts`

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue in the repository.
