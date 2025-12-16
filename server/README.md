# FastAPI + PocketBase Boilerplate

A modern REST API boilerplate built with FastAPI and PocketBase.

## Features

- 🚀 FastAPI framework
- 🗄️ PocketBase as database
- 📝 Pydantic for data validation
- 🏗️ Abstract base classes for clean architecture
- 👤 User management system
- 🔒 Environment-based configuration
- 📦 Repository pattern implementation

## Requirements

- Python 3.10+
- PocketBase instance running

## Installation

1. Clone the repository
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

5. Make sure PocketBase is running (default: http://127.0.0.1:8090)

## Running the Application

```bash
uvicorn app.main:app --reload
```

Or:

```bash
python run.py
```

The API will be available at `http://localhost:8000`

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
server/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── core/                # Core functionality
│   │   ├── __init__.py
│   │   ├── database.py      # PocketBase connection
│   │   ├── base_model.py    # Abstract base models
│   │   ├── base_repository.py  # Abstract base repository
│   │   └── base_service.py  # Abstract base service
│   ├── models/              # Pydantic models
│   │   ├── __init__.py
│   │   └── user.py
│   ├── schemas/             # Request/Response schemas
│   │   ├── __init__.py
│   │   └── user.py
│   ├── repositories/        # Data access layer
│   │   ├── __init__.py
│   │   └── user.py
│   ├── services/            # Business logic layer
│   │   ├── __init__.py
│   │   └── user.py
│   └── api/                 # API routes
│       ├── __init__.py
│       └── v1/
│           ├── __init__.py
│           ├── router.py
│           └── endpoints/
│               ├── __init__.py
│               └── users.py
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## License

MIT
