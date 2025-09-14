
# Job Application Portal (MERN)

A small, intermediate-friendly Job Application Portal built with:
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Multer, JWT, dotenv
- **Frontend:** React (Vite), Bootstrap, React-Bootstrap, Axios, React Router

## Features
- User Registration & Login (JWT Auth)
- Upload Resume (PDF/DOC/DOCX up to 2MB)
- Browse Jobs (seeded examples)
- Apply to Jobs (uses latest uploaded resume)
- View Your Applications

---

## Quick Start

### 1) Prerequisites
- Node.js 18+ and npm or pnpm/yarn
- MongoDB running locally

### 2) Backend Setup
```bash
cd backend
.env : add Mongodb connection string 
npm install
npm run seed:jobs      
npm run dev           
```

### 3) Frontend Setup
Open a new terminal:
```bash
cd frontend
.env.example > .env 
npm install
npm run dev           
```

### 4) Workflow
1. **Register** a new account
2. **Login** to get a JWT (stored in localStorage by the app)
3. **Upload** your resume (PDF/DOC/DOCX, max 2MB)
4. **Apply** to any job in the list
5. View **My Applications**

---

## API Overview

Base URL: `http://localhost:5000/api` 

### Auth
- `POST /auth/register` → `{ name, email, password }`
- `POST /auth/login` → `{ email, password }`

### Resume
- `POST /resume/upload` → `multipart/form-data` with field `resume` (PDF/DOC/DOCX≤2MB). Requires Bearer token.

### Jobs
- `GET /jobs` → List seeded jobs
- `POST /jobs/apply/:jobId` → Apply to job using your latest uploaded resume. Requires Bearer token.

### Applications
- `GET /applications` → Current user's applications. Requires Bearer token.

---

## Sample `.env`

### Backend `.env`
```
PORT=5000
MONGODB_URI= Mongodb string/jobportal
JWT_SECRET=supersecretjwt
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

---

## Folder Structure
```
job-application-portal/
  backend/
  frontend/
  README.md
```
