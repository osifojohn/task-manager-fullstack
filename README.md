# Task Manager – Full Stack

A **task management application** built with **Next.js 15 (App Router)** **TypeScript** and **Tailwind CSS** for the frontend, and **Node.js + TypeScript + Express + MongoDB** for the backend. The app supports **user authentication**, **task CRUD operations**, and provides **task insights** like status breakdown, priority distribution, deadlines, and completion metrics.

---

## Features

- **Authentication**

  - JWT-based login/signup
  - Password hashing using bcrypt
  - Protected routes (tasks scoped per user)

- **Task Management**

  - Create, read, update, delete tasks
  - Supports `status` (pending, in-progress, done)
  - Extra fields: tags, due date, priority, notes, estimated/actual hours

- **Insights**

  - Task status breakdown
  - Priority breakdown
  - Overdue and upcoming deadlines
  - Completion rate and average completion time

- **Frontend**

  - Built with **Next.js 15 (App Router)**
  - Styled using **Tailwind CSS**
  - TypeScript throughout for type safety

- **Backend**
  - Node.js with Express
  - MongoDB (Mongoose ORM)
  - TypeScript throughout for type safety

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Authentication:** JWT
- **Styling:** Tailwind CSS

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/osifojohn/task-manager-fullstack.git
cd <project-folder>
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Environment Variables

#### Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret
```

#### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Development Mode

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```

Frontend runs at [http://localhost:3000](http://localhost:3000).

### Production Mode

```bash
npm run build
npm start
```

---

## API Routes

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login user    |

### Tasks

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| GET    | `/api/tasks`          | Get tasks (filters + pagination) |
| GET    | `/api/tasks/:id`      | Get single task                  |
| POST   | `/api/tasks`          | Create task                      |
| PUT    | `/api/tasks/:id`      | Update task                      |
| DELETE | `/api/tasks/:id`      | Delete task                      |
| GET    | `/api/tasks/insights` | Task insights                    |

---

## Database Schema

### User Schema

```ts
{
  email: String (required, unique),
  password: String (hashed),
  name: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Schema

```ts
{
  title: String (required),
  description: String,
  status: 'pending' | 'in-progress' | 'done',
  extras: {
    tags: [String],
    dueDate: Date,
    priority: 'low' | 'medium' | 'high',
    estimatedHours: Number,
    actualHours: Number,
    notes: String
  },
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Example Insights Response

```json
{
  "success": true,
  "data": {
    "statusBreakdown": {
      "pending": 5,
      "in-progress": 2,
      "done": 3
    },
    "priorityBreakdown": {
      "low": 2,
      "medium": 5,
      "high": 3
    },
    "metrics": {
      "totalTasks": 10,
      "overdueTasks": 1,
      "completionRate": 30,
      "avgCompletionHours": 12
    },
    "upcomingDeadlines": [
      {
        "_id": "task_id",
        "title": "Finish report",
        "dueDate": "2025-07-30T00:00:00Z",
        "priority": "high",
        "status": "pending"
      }
    ]
  }
}
```

---

## What I'd Build Next

- Drag-and-drop Kanban board for tasks
- Role-based access (teams)
- Email/push notifications for deadlines

---

## License

MIT License
