<div align="center">

# Weeker

**Plan Your Week, Own Your Time**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-weeker.suzatsmsh.cloud-blue?style=for-the-badge&logo=googlechrome&logoColor=white)](https://weeker.suzatsmsh.cloud/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## About

Weeker is a lightweight weekly planner built around a simple hourly grid. Sign up, verify your email, and start organizing your week by adding color-coded tasks to any time slot. It's a straightforward alternative to feature-heavy calendar and to-do apps — no clutter, just a clean way to plan your days.

## Features

- **Weekly Routine Board** — 7-day × 24-hour grid view for planning your entire week
- **Color-Coded Tasks** — Add or remove tasks with custom colors from any time slot
- **User Authentication** — Registration, login, and JWT-based sessions via httpOnly cookies
- **Email Verification** — Account verification through email with token-based validation
- **Password Recovery** — Reset password via a secure email link with rate limiting
- **Customizable Settings** — Choose which day starts your week and which hour starts your day
- **Responsive UI** — Dark-themed interface built with CSS Modules and Framer Motion animations
- **SEO Optimized** — OpenGraph tags, Twitter Cards, JSON-LD structured data, sitemap, and robots.txt

## Tech Stack

|                    | Technology            | Version |
| ------------------ | --------------------- | ------- |
| **Frontend**       | React                 | 18      |
|                    | React Router          | 7       |
|                    | React Hook Form + Zod | 7 / 3   |
|                    | Axios                 | 1       |
|                    | Framer Motion         | 12      |
|                    | Sonner (toasts)       | 2       |
|                    | Vite                  | 5       |
|                    | CSS Modules           | —       |
| **Backend**        | Node.js               | LTS     |
|                    | Express               | 4       |
|                    | MongoDB (Mongoose)    | 8       |
|                    | JWT (jsonwebtoken)    | 9       |
|                    | bcrypt                | 6       |
|                    | express-validator     | 7       |
|                    | Resend (email)        | 6       |
| **Infrastructure** | Docker (multi-stage)  | —       |
|                    | Nginx (reverse proxy) | —       |

## Project Structure

```
weeker/
├── Back-end/                     # Express API (CommonJS)
│   ├── index.js                  # Entry point
│   ├── db.js                     # Mongoose connection
│   ├── controllers/              # Auth, task, and settings logic
│   ├── middlewares/              # JWT verification, request validation
│   ├── models/                   # Mongoose schemas (User, Task, TaskCollection)
│   ├── routes/                   # API route definitions
│   ├── services/                 # Email service (Resend) + templates
│   └── utils/                    # JWT utilities, token generation
│
├── Front-end/                    # React + Vite (ESM)
│   ├── src/
│   │   ├── components/           # UI components (Header, Modal, Navbar, etc.)
│   │   ├── hooks/                # Custom hooks (useTasks, useLocalStorage, usePageMeta)
│   │   ├── routes/               # Auth/private route guards
│   │   ├── services/             # Axios wrapper, Zod validation schemas
│   │   └── utils/                # Formatting helpers
│   ├── public/                   # Static assets (OG image, robots.txt, sitemap)
│   ├── Dockerfile                # Multi-stage: Node build → Nginx serve
│   └── nginx.conf                # SPA routing + API reverse proxy
│
├── Dockerfile                    # Backend container (Node 20 Alpine)
├── docker-compose.yml            # Production stack (backend + frontend)
├── docker-compose.local.yml      # Local override (simplified networking)
├── package.json                  # Root (backend deps + dev script)
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/package-manager) (v18+)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)
- [Resend](https://resend.com/) API key (for transactional emails)

### Installation

1. Clone the repository

```bash
git clone https://github.com/smsh119/weeker.git
cd weeker
```

2. Install backend dependencies

```bash
yarn
```

3. Install frontend dependencies

```bash
cd Front-end
yarn
```

### Environment Variables

**Backend** — create a `.env` file in the project root:

| Variable                  | Description                                  | Required |
| ------------------------- | -------------------------------------------- | -------- |
| `PORT`                    | Backend server port                          | Yes      |
| `MONGO_CONNECTION_STRING` | MongoDB connection URI                       | Yes      |
| `JWT_SECRET`              | Secret key for signing JWTs                  | Yes      |
| `SALT_ROUNDS`             | bcrypt salt rounds for password hashing      | Yes      |
| `CLIENT_URL`              | Frontend URL (used for CORS)                 | Yes      |
| `RESEND_API_KEY`          | Resend API key for sending emails            | Yes      |
| `EMAIL_FROM`              | Sender email address                         | Yes      |
| `CORS_ORIGINS`            | Additional allowed origins (comma-separated) | No       |

**Frontend** — create a `.env` file inside the `Front-end/` directory:

| Variable            | Description          | Required |
| ------------------- | -------------------- | -------- |
| `VITE_API_BASE_URL` | Backend API base URL | Yes      |

### Running the App

**Backend** (from the project root):

```bash
yarn dev
```

**Frontend** (from inside `Front-end/`):

```bash
yarn dev
```

The backend runs on `http://localhost:3000` and the frontend dev server on `http://localhost:5173`.

## API Endpoints

| Method   | Endpoint                        | Auth | Description                                       |
| -------- | ------------------------------- | ---- | ------------------------------------------------- |
| `POST`   | `/api/auth/register`            | No   | Register a new user                               |
| `POST`   | `/api/auth/login`               | No   | Log in (sets JWT cookie)                          |
| `POST`   | `/api/auth/verify-email`        | No   | Verify email with token                           |
| `POST`   | `/api/auth/resend-verification` | Yes  | Resend verification email                         |
| `POST`   | `/api/auth/forgot-password`     | No   | Request password reset                            |
| `POST`   | `/api/auth/reset-password`      | No   | Reset password with token                         |
| `DELETE` | `/api/auth/logout`              | No   | Clear session cookie                              |
| `GET`    | `/api/tasks`                    | Yes  | Get all tasks for the user                        |
| `POST`   | `/api/tasks`                    | Yes  | Add a task                                        |
| `DELETE` | `/api/tasks`                    | Yes  | Delete a task (query params: `day`, `time`, `id`) |
| `PATCH`  | `/api/settings/update`          | Yes  | Update user settings                              |

## Deployment

The application is fully containerized with Docker Compose.

**Production stack** (`docker-compose.yml`):

| Service  | Base Image                    | Port | Memory Limit |
| -------- | ----------------------------- | ---- | ------------ |
| Backend  | Node 20 Alpine                | 3000 | 512 MB       |
| Frontend | Node 20 Alpine → Nginx Alpine | 80   | 256 MB       |

- The frontend multi-stage build compiles the Vite bundle, then serves it via Nginx
- Nginx handles SPA routing, reverse proxies `/api/` to the backend, and applies caching + security headers
- Both services share a Docker network and use `restart: unless-stopped`
- Environment variables are loaded from `.env`

**Local override** (`docker-compose.local.yml`):

- Uses a local (non-external) network
- Frontend exposed on port 3001 instead of 80

**Commands**:

```bash
# Run the full stack
docker compose up -d

# Build and run with local overrides
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build
```
