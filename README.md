<div align="center">
  <h1>🛡️ CRM Lite</h1>
  <p><strong>Capturing Moments, Creating Memories</strong></p>
  
  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![Frontend](https://img.shields.io/badge/frontend-React-61dafb.svg)](https://reactjs.org/)
  [![Backend](https://img.shields.io/badge/backend-Express-000000.svg)](https://expressjs.com/)
  [![Database](https://img.shields.io/badge/database-MongoDB-47A248.svg)](https://www.mongodb.com/)
</div>

<br />

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Problem Statement & Vision](#-problem-statement--vision)
3. [Key Features & Use Cases](#-key-features)
4. [Complete System Architecture](#-complete-system-architecture)
5. [Technology Stack](#-technology-stack)
6. [Project Structure](#-project-structure)
7. [Authentication & Authorization](#-authentication--authorization)
8. [API Overview](#-api-overview)
9. [Installation & Setup](#-installation--setup)
10. [Configuration & Environment](#-configuration--environment)
11. [Deployment Guide](#-deployment-guide)
12. [Testing & Debugging](#-testing--debugging)
13. [Contributing & Conventions](#-contributing)
14. [Roadmap & Future Limitations](#-roadmap)
15. [License & Credits](#-license--credits)

---

## 🚀 Project Overview
**CRM Lite** is a premium, lightweight Customer Relationship Management (CRM) platform designed specifically for modern startups, freelancers, and small businesses. It provides an intuitive, visually stunning interface to track leads, manage customer data, and monitor business analytics without the overwhelming complexity of enterprise CRM solutions.

### 💡 Problem Statement & Vision
Modern CRMs are often bloated, expensive, and require significant training to use. Small teams need a frictionless way to manage their sales pipeline with zero learning curve. **Our vision** is to provide a "plug-and-play" CRM that feels as smooth and responsive as a consumer application, featuring a dark-themed, glassmorphism aesthetic that delights users while keeping data secure and organized.

### 🎯 Key Features
- **Premium User Interface:** A meticulously crafted dark mode aesthetic featuring split-pane cinematic layouts and fluid CSS transitions.
- **Lead Pipeline Management:** Complete CRUD functionality to add, edit, track, and close leads seamlessly.
- **Secure Authentication:** Full JWT-based stateless authentication with secure password hashing (Bcrypt).
- **Interactive Analytics:** Real-time data visualization of the sales pipeline using Recharts.
- **Responsive Design:** 100% mobile-friendly interface leveraging Tailwind CSS.

---

## 🏗️ Complete System Architecture

### High-Level Architecture Overview
CRM Lite is built on a modern **MERN stack** (MongoDB, Express, React, Node.js) with a decoupled client-server architecture. 

```mermaid
graph TD
    Client[React Frontend (Vite)] <-->|REST API + JWT| Gateway[Express Backend API]
    Gateway <-->|Mongoose ODM| DB[(MongoDB Atlas Cluster)]
    Client <-->|Static Hosting| GithubPages[GitHub Pages]
    Gateway <-->|Node Environment| Hosting[Render / Railway]
```

### Application Workflow (End-to-End User Flow)
1. **Unauthenticated User:** Arrives at the SPA hosted on GitHub Pages (via HashRouter).
2. **Registration/Login:** The user fills out the authentication form. The React client sends a `POST` request to the Express backend.
3. **Backend Validation:** Express hashes the password (or verifies it), generates a secure JWT token, and returns it.
4. **Client State:** The React app stores the JWT in `localStorage` and updates the global `AuthContext`.
5. **Authenticated Access:** All subsequent requests to protected API endpoints automatically include the `Authorization: Bearer <token>` header via an Axios interceptor.
6. **Data Retrieval:** The Node backend verifies the token, interacts with MongoDB via Mongoose, and serves JSON data to update the UI via `LeadContext`.

---

## 💻 Technology Stack

| Layer | Technologies Used | Purpose |
|-------|-------------------|---------|
| **Frontend** | React 19, Vite, Tailwind CSS 4 | Client-side rendering, ultra-fast builds, utility-first styling. |
| **Routing** | React Router DOM (HashRouter) | Client-side navigation compatible with static hosts (GitHub Pages). |
| **Data Viz** | Recharts, Lucide React | SVG charts for analytics and scalable UI iconography. |
| **Backend** | Node.js, Express.js | High-performance, event-driven REST API server. |
| **Database** | MongoDB Atlas, Mongoose | NoSQL cloud database with schema validation. |
| **Security** | JWT, Bcrypt.js, CORS | Stateless session management and cross-origin resource sharing. |

---

## 📂 Project Structure

The project is structured as a monorepo containing decoupled frontend and backend applications.

```text
CRM-LITE/
├── backend/                  # Express.js REST API Server
│   ├── config/               # Database connection logic (database.js)
│   ├── controllers/          # Business logic (authController.js, leadController.js)
│   ├── models/               # Mongoose schemas (User.js, Lead.js)
│   ├── middleware/           # Request interceptors (auth.js for JWT verification)
│   ├── routes/               # Express route definitions (api.js, auth.js)
│   ├── .env                  # Environment secrets (Not committed to Git)
│   ├── server.js             # Application entry point and server configuration
│   └── package.json          # Backend dependencies
│
└── startup-crm-lite/         # React Frontend (Vite)
    ├── public/               # Static assets
    ├── src/
    │   ├── assets/           # Carousel background images (bg1.png, bg2.png)
    │   ├── components/       # Reusable UI (Sidebar, Layout, Charts)
    │   ├── context/          # React Context (AuthContext, LeadContext)
    │   ├── pages/            # View-level components (Login, Register, Dashboard, Leads)
    │   ├── routes/           # Protected route wrappers and definitions
    │   ├── services/         # Axios API clients (api.js, authService.js)
    │   ├── utils/            # Helper functions (authToken.js)
    │   ├── App.jsx           # Root component (HashRouter configuration)
    │   └── main.jsx          # React DOM mounting
    ├── vite.config.js        # Vite bundler configuration
    └── package.json          # Frontend dependencies and deploy scripts
```

---

## 🔐 Authentication & Authorization
The platform uses **Stateless JWT Authentication**.
- **Tokens:** Issued upon successful login/registration. Stored in browser `localStorage`.
- **Interceptors:** The frontend `api.js` Axios instance intercepts all outgoing requests to append `Bearer <token>`. It also intercepts incoming `401 Unauthorized` responses to auto-logout the user and purge stale tokens.
- **Middleware:** The backend `auth.js` middleware validates the token signature against the `JWT_SECRET` and attaches the decoded `userId` to the request object, ensuring users can only fetch/modify their own leads.

---

## 🔌 API Overview

### Authentication (`/api/auth`)
- `POST /register` - Register a new user. Expects `{ name, email, password }`.
- `POST /login` - Authenticate user. Expects `{ email, password }`. Returns `{ token, user }`.

### Leads (`/api/leads`) *(Protected)*
- `GET /` - Fetch all leads belonging to the authenticated user.
- `POST /` - Create a new lead. Expects `{ name, email, status, company, value }`.
- `PUT /:id` - Update an existing lead.
- `DELETE /:id` - Delete a lead.

---

## ⚙️ Installation & Setup

### Development Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **Git**
- A **MongoDB Atlas** Account (or local MongoDB server)

### 1. Clone the Repositories
*(Assuming separate remote repositories)*
```bash
git clone https://github.com/24691A05H4/CRM-LITE-BACKEND.git backend
git clone https://github.com/24691A05H4/CRM-LITE-FRONTEND.git startup-crm-lite
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd startup-crm-lite
npm install
```
Start the Vite development server:
```bash
npm run dev
```

---

## 🌍 Deployment Guide

### Frontend Deployment (GitHub Pages)
The frontend is configured for deployment to GitHub Pages using the `gh-pages` package. It utilizes `HashRouter` to prevent 404 routing errors on static file hosts.
```bash
# Deploys the built dist/ folder to the gh-pages branch
npm run deploy
```

### Backend Deployment (Render / Heroku)
1. Link your backend repository to a Node.js web service on [Render.com](https://render.com).
2. Set the **Build Command** to `npm install` and **Start Command** to `npm start`.
3. Add your Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`, `NODE_ENV=production`).
4. Once deployed, update the Frontend's `services/api.js` `baseURL` (or frontend `.env`) to point to the live Render URL.

---

## 🛠️ Testing & Debugging

- **Network Issues:** If the backend returns `ECONNREFUSED` during startup, ensure your IP address is whitelisted in MongoDB Atlas Network Access.
- **Routing 404s:** If you experience 404s on the deployed frontend on refresh, ensure `HashRouter` is intact in `App.jsx`.
- **CORS Errors:** Ensure the backend `server.js` CORS configuration explicitly allows the frontend domain.

---

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Adhere to coding standards: Use ES6 syntax, functional React components, and maintain Tailwind design tokens.
4. Commit your changes: `git commit -m 'feat: Add analytics chart'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Open a Pull Request.

---

## 🛣️ Roadmap & Known Limitations
- **Current Limitations:** The backend currently does not support password resets (email integration required). The frontend dashboard relies on basic mock data mapping for charts until the dedicated Analytics API endpoint is built.
- **Future Roadmap:** 
  - Implementation of OAuth2 (Google/Apple) on the backend.
  - Granular RBAC (Role-Based Access Control) for team collaboration.
  - CSV Export/Import functionality for leads.

---

## 📜 License
This project is proprietary and built specifically for the CRM Lite ecosystem. Standard open-source usage (MIT) may apply to the frontend boilerplate.

---
<div align="center">
  <i>Developed with ❤️ for seamless customer relationship management.</i>
</div>
