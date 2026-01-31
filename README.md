# Task Management Web Application

This project is a simple full-stack Task Management Web Application built as part of the Global Trend – Full Stack Development Internship Skill Assessment.

The objective of this assignment is to demonstrate understanding of frontend development, backend APIs, database integration, and clean code organization.

---

## Features

### Core Features
- Create new tasks
- View list of tasks
- Update existing tasks
- Delete tasks
- Persistent data storage using a database

### Task Fields
- Title
- Description
- Status (completed / pending)

---

## Tech Stack

### Frontend
- Next.js (React)
- JavaScript
- TailwindCSS
- Framer Motion (for basic UI animations)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Optional / Bonus
- JWT-based authentication
- Protected routes
- Input validation

---

## Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── .env.example
│
└── frontend/
    ├── app/
    ├── components/
    ├── lib/
    ├── context/
    └── globals.css
```

The project is divided into frontend and backend folders to keep concerns separated and maintain clean structure.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

#### Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/task_manager
PORT=5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## API Overview

### Task APIs
- GET /tasks – Fetch all tasks
- POST /tasks – Create a task
- PUT /tasks/:id – Update a task
- DELETE /tasks/:id – Delete a task

All APIs follow RESTful principles.

## Database Design

### Task Model
- title (String, required)
- description (String)
- status (Boolean or String)
- createdAt
- updatedAt

Data is stored persistently using MongoDB.

## Bonus Features (Optional)

The following features were added as optional enhancements:

- User authentication using JWT
- Protected routes
- Client-side and server-side validation
- Animated UI interactions using Framer Motion

## Evaluation Focus

This project focuses on:

- Clean and readable code
- Proper frontend–backend communication
- REST API fundamentals
- Database integration
- Logical problem solving

## License

This project is created for educational and internship evaluation purposes.