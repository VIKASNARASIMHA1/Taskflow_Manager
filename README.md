# 🚀 TaskFlow Manager

A modern, full-stack task management application built with React, Node.js, and PostgreSQL. Perfect for teams to organize projects, assign tasks, and track progress in real-time.

---

## ✨ Features

* 🔐 **User Authentication** – Secure login/register with JWT.
* 📋 **Project Management** – Create and organize projects seamlessly.
* 📝 **Task Board** – Drag-and-drop tasks with status columns (Todo/In Progress/Done).
* 👥 **Team Collaboration** – Add members to projects and assign tasks.
* 🎨 **Modern UI** – Clean interface with dark/light mode support.
* 📱 **Responsive Design** – Fully optimized for all device sizes.
* 🐳 **Docker Support** – Containerized for easy, consistent deployment.

---

## 🛠 Tech Stack

**Frontend:**
* React 18 + TypeScript
* Tailwind CSS
* React Beautiful DnD
* React Query & Zustand

**Backend:**
* Node.js + Express
* PostgreSQL + Prisma ORM
* JWT Authentication
* Socket.io (Real-time updates)

---

## 📦 Quick Start

### Prerequisites
* **Node.js** 18+
* **PostgreSQL** 15+
* **Docker** (Optional)

### Method 1: Local Development

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/taskflow-manager.git](https://github.com/yourusername/taskflow-manager.git)
   cd taskflow-manager

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npx prisma migrate dev
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Method 2: Docker (Recommended)

   ```bash
   docker-compose up --build
   ```
---

## Project Structure

```
taskflow-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   └── app.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```
---

## Environment Variables

### Backend (.env)

```Plaintext
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```Plaintext
VITE_API_URL=http://localhost:5000/api
```
---

### 📖 API Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **POST** | `/api/auth/register` | Register new user | ❌ |
| **POST** | `/api/auth/login` | Login user | ❌ |
| **GET** | `/api/auth/profile` | Get user profile | ✅ |
| **GET** | `/api/projects` | Get all projects | ✅ |
| **POST** | `/api/projects` | Create project | ✅ |
| **GET** | `/api/projects/:id` | Get project by ID | ✅ |
| **PUT** | `/api/projects/:id` | Update project | ✅ |
| **DELETE** | `/api/projects/:id` | Delete project | ✅ |
| **POST** | `/api/projects/:id/members` | Add member to project | ✅ |
| **GET** | `/api/tasks/project/:projectId` | Get tasks by project | ✅ |
| **POST** | `/api/tasks` | Create task | ✅ |
| **PUT** | `/api/tasks/:id` | Update task | ✅ |
| **DELETE** | `/api/tasks/:id` | Delete task | ✅ |

---

## 🚀 Deployment (Render)

**Database**: Create a PostgreSQL instance on Render and copy the internal URL.

**Backend**: * Build Command: npm install && npx prisma generate

  - **Start Command**: npm start

  - **Env**: Set DATABASE_URL and JWT_SECRET.

**Frontend**: * Build Command: npm install && npm run build

  - **Publish Directory**: dist

  - **Env**: Set VITE_API_URL to your backend URL.

---

**Author** - Vikas Narasimha

---
