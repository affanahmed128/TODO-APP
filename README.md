# TODO App

A full-stack Todo application built for DevOps learning and practice. It includes a Node.js/Express backend with MongoDB persistence and a React frontend for managing tasks.

## Overview

This project demonstrates a basic CRUD workflow for todos across two separate applications:

- Backend API built with Express.js
- Frontend UI built with React
- MongoDB database for storing tasks
- CI/CD and DevOps-friendly project structure

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, JavaScript, CSS
- Testing: Jest, Supertest, React Testing Library, Selenium WebDriver
- Logging: Winston

## Project Structure

```text
TODO-APP/
├── README.md
├── sonar-project.properties
├── todo-backend/
│   ├── .env
│   ├── db.js
│   ├── server.js
│   ├── start.js
│   ├── package.json
│   ├── __tests__/
│   ├── contollers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── todo-frontend/
│   ├── README.md
│   ├── package.json
│   ├── public/
│   └── src/
└── .gitignore
```

## Features

- Add a new todo item
- View all todo items
- Delete todo items
- API health check endpoint
- MongoDB-backed persistence
- React-based user interface
- Backend and frontend test coverage

## Prerequisites

Before running this project, make sure you have installed:

- Node.js (v18 or later recommended)
- npm
- MongoDB running locally or a reachable MongoDB connection string

## Configuration

The backend uses environment variables defined in `todo-backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/todoapp
PORT=3002
```

If MongoDB is not running locally, start it first or update `MONGO_URI` to point to your database.

## Getting Started

### 1. Install dependencies

From the project root, install dependencies for both apps:

```bash
cd todo-backend
npm install

cd ../todo-frontend
npm install
```

### 2. Start MongoDB

If using a local MongoDB instance:

```bash
mongod
```

### 3. Run the backend

```bash
cd todo-backend
npm start
```

The backend runs on:

- http://localhost:3002

API routes are mounted under `/api`.

### 4. Run the frontend

In a new terminal:

```bash
cd todo-frontend
npm start
```

The React app runs on:

- http://localhost:3000

## API Endpoints

The backend exposes the following endpoints:

- `GET /api/get-todos` — Fetch all todos
- `POST /api/add-todo` — Create a new todo
- `DELETE /api/delete-todo/:id` — Delete a todo by ID
- `GET /api/health` — Check if the backend is healthy

## Example API Request

Create a todo:

```bash
curl -X POST http://localhost:3002/api/add-todo \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn DevOps"}'
```

## Testing

Run backend tests:

```bash
cd todo-backend
npm test
```

Run frontend tests:

```bash
cd todo-frontend
npm test -- --watch=false
```

Run Selenium end-to-end tests (with Chrome, the backend, MongoDB, and frontend running):

```bash
cd todo-frontend
npm run test:e2e
```

## Notes

- The frontend connects to the backend using `http://localhost:3002/api`.
- The backend logger writes operational logs for database and request activity.
- This project is structured to support hands-on learning around full-stack applications and DevOps workflows.

## License

This project is for educational and practice purposes.

The application is up and running:

Frontend: 'http://localhost:3000'
Backend:'http://localhost:3002'
Health endpoint: 'http://localhost:3002/api/health'