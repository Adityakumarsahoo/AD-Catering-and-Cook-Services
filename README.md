# AD CATERING AND COOK SERVICES
**"Delicious Moments, Perfectly Served"**  
*Enterprise Full-Stack Architecture · Separated Frontend & Backend*

---

## 🌟 Executive Overview
**AD Catering and Cook Services** is a luxury hospitality and banquet catering platform based in Bhubaneswar, Odisha. The system serves grand royal weddings, festive celebrations, authentic Odia feasts (*Dalma*, *Machha Besara*, *Mutton Kasa*, *Chhena Poda*), corporate banquets, and certified private cook and halwai reservations.

The website delivers a high-end royal hospitality aesthetic:
- **Design System**: Royal Emerald Green (`#03160E`, `#041A12`) paired with Liquid Gold (`#D4AF37`, `#F5CE68`, `#FFF1B8`) and Amber warmth.
- **Micro-Interactions**: Ambient mesh backgrounds, floating particles, magnetic buttons, custom cursor, and interactive calculators.
- **Enterprise Separation**: Complete architectural decoupling into independent `frontend/` and `backend/` layers with zero visual or functional changes.

---

## 🏗️ Architecture & Project Structure

The project is decoupled into standalone, independent client and server applications:

```
ad-catering-and-cook-services/
├── frontend/                     # Dedicated React + Vite Client Application
│   ├── public/                   # Static assets & public files
│   ├── src/
│   │   ├── components/           # 18 Reusable UI components (Navbar, Footer, ADBrandEmblem, etc.)
│   │   ├── context/              # State management (AuthContext, MenuCartContext)
│   │   ├── layouts/              # Dashboard layouts (AdminLayout)
│   │   ├── pages/                # Public pages & Admin CMS routes
│   │   │   └── admin/            # 11 Admin dashboard views
│   │   ├── services/             # API client (api.ts with configurable base URL)
│   │   ├── App.tsx               # Client-side router & provider orchestration
│   │   ├── main.tsx              # React 19 application entry point
│   │   └── index.css             # Tailwind CSS & Royal Emerald/Gold styles
│   ├── index.html                # Single-page application HTML entry
│   ├── package.json              # Frontend dependencies and Vite build scripts
│   ├── vite.config.ts            # Vite bundler, path aliases (@/), and API proxy
│   ├── tsconfig.json             # TypeScript configuration for frontend
│   ├── .env.example              # Frontend environment template
│   └── .gitignore                # Frontend-specific ignores
│
├── backend/                      # Dedicated Express + Node.js REST API
│   ├── data/
│   │   └── db.json               # Persistent JSON file database (seeded & stateful)
│   ├── src/
│   │   ├── config/               # Environment & database configuration
│   │   │   └── env.ts            # Typed environment settings
│   │   ├── data/                 # Master menu seeds (officialMenu.ts, vegMenuSeed.ts)
│   │   ├── middleware/           # Auth (JWT) & global error handler
│   │   │   ├── auth.ts           # Token verification & role guards
│   │   │   └── errorHandler.ts   # Centralized error handler & 404
│   │   ├── routes/               # 11 Modular REST API routes
│   │   │   ├── admin.ts          # Admin analytics, CRM, and CMS operations
│   │   │   ├── auth.ts           # Customer & Admin authentication
│   │   │   ├── bookings.ts       # Booking management
│   │   │   ├── contact.ts        # Enquiry handling
│   │   │   ├── content.ts        # Dynamic content delivery
│   │   │   ├── gallery.ts        # Event gallery media
│   │   │   ├── menu.ts           # 145+ Menu items & categories
│   │   │   ├── packages.ts       # Banquet packages & pricing
│   │   │   ├── reviews.ts        # Customer testimonials
│   │   │   ├── services.ts       # Catering & cook service catalog
│   │   │   └── users.ts          # User profiles & notifications
│   │   ├── app.ts                # Express setup, CORS, and route mounting
│   │   ├── server.ts             # HTTP server entry point & graceful shutdown
│   │   ├── db.ts                 # Database access layer & atomic sync
│   │   └── types.ts              # Data contracts and TypeScript interfaces
│   ├── package.json              # Backend dependencies and execution scripts
│   ├── tsconfig.json             # Node.js TypeScript configuration
│   ├── .env.example              # Backend environment template
│   └── .gitignore                # Backend-specific ignores
│
├── data/                         # Root database copy
│   └── db.json
├── scripts/
│   └── dev.js                    # Unified cross-platform dev runner
├── package.json                  # Root orchestration scripts
├── .env.example                  # Combined environment template
├── .gitignore                    # Root repository ignore rules
└── README.md                     # Comprehensive architecture documentation
```

---

## ⚙️ Prerequisites & Technologies

- **Node.js**: v18.0.0 or higher (v24.x tested)
- **Package Manager**: npm v9.0.0 or higher
- **Frontend Stack**:
  - React 19 (`react`, `react-dom`)
  - Vite 8 (`vite`, `@vitejs/plugin-react`)
  - Tailwind CSS v4 (`@tailwindcss/vite`, `tailwindcss`)
  - Routing: React Router DOM v7
  - Icons & UI: Lucide React, Framer Motion, Canvas Confetti, React Hot Toast
- **Backend Stack**:
  - Node.js & Express 4 (`express`)
  - Cross-Origin Resource Sharing (`cors`)
  - Authentication: JSON Web Tokens (`jsonwebtoken`), bcrypt password hashing (`bcryptjs`)
  - TypeScript runtime: `tsx`, `typescript`
  - Database: File-backed atomic JSON store (`db.json`)

---

## 🚀 Quick Start (Unified Root Commands)

You can run both frontend and backend seamlessly from the project root:

### 1. Install All Dependencies
```bash
npm run install:all
```
*(Installs dependencies for both `frontend/` and `backend/` in one step).*

### 2. Start Both Development Servers Concurrently
```bash
npm run dev
```
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

### 3. Build Both Applications
```bash
npm run build
```

---

## 🖥️ Running Applications Independently

Both `frontend` and `backend` are fully decoupled and can be run independently on separate servers or terminal windows:

### Frontend Client
```bash
cd frontend
npm install
npm run dev
```
- Runs Vite dev server at `http://localhost:3000` (or `PORT` specified in `.env`).
- Automatically proxies all `/api` requests to backend at `http://localhost:5000`.
- To create a production bundle: `npm run build` (outputs to `frontend/dist`).
- To preview the production bundle: `npm run preview`.

### Backend REST API
```bash
cd backend
npm install
npm run dev
```
- Runs Express server with live reload at `http://localhost:5000`.
- Initializes and loads data from `backend/data/db.json`.
- To run production server: `npm run start`.
- To typecheck without emit: `npm run lint`.

---

## 🔒 Environment Configuration

### Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:
```env
# In development, leave empty or '/api' to use Vite's built-in proxy
# In production, set to your deployed backend API URL:
VITE_API_BASE_URL=http://localhost:5000/api

# Vite dev server port
PORT=3000
VITE_PORT=3000

# Backend URL target for local Vite proxy
VITE_BACKEND_URL=http://localhost:5000
```

### Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:
```env
# Server port
PORT=5000
NODE_ENV=development

# JWT Secret for authentication
JWT_SECRET="ad_catering_super_secret_jwt_key_2026_lux"

# Default Administrator Seed Credentials
ADMIN_NAME="Aditya Kumar Sahoo"
ADMIN_EMAIL="admin@adcatering.com"
ADMIN_PASSWORD="Admin@123456"

# Allowed CORS origins
CORS_ORIGIN="http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"

# Optional Gemini API Key
GEMINI_API_KEY=""
```

---

## 🔐 Pre-Seeded Credentials

### Administrator Portal (Management Console)
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@adcatering.com`
- **Password**: `Admin@123456`
- **Capabilities**: Full banquet dashboard, live revenue analytics, menu CRUD, booking status manager, customer enquiry CRM, gallery management, and website settings.

### Customer Account (Client Experience)
- **URL**: `http://localhost:3000/login`
- **Email**: `customer@gmail.com`
- **Password**: `Customer@123`
- **Capabilities**: Custom menu tray, live quotation calculator, booking history, event status tracking, in-app notifications.
- *(New accounts can also be registered at `/signup` with phone and password validation).*

---

## 📡 API Endpoints Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Public | System status and timestamp |
| **POST** | `/api/auth/register` | Public | Register new customer account |
| **POST** | `/api/auth/login` | Public | Customer authentication |
| **POST** | `/api/auth/admin-login` | Public | Administrator authentication |
| **GET** | `/api/auth/me` | Authenticated | Get current authenticated user profile |
| **GET** | `/api/menu` | Public | List all 145+ menu items (supports filtering) |
| **POST** | `/api/menu` | Admin | Create new menu delicacy |
| **PUT/DELETE**| `/api/menu/:id` | Admin | Update or delete menu item |
| **GET** | `/api/packages` | Public | List catering packages (Basic, Premium, Deluxe, Royal) |
| **GET** | `/api/services` | Public | List catering & private cook services |
| **GET** | `/api/gallery` | Public | Lightbox event gallery images |
| **GET** | `/api/reviews` | Public | Verified customer reviews & ratings |
| **POST** | `/api/bookings` | Public/Auth | Submit booking quotation wizard |
| **GET** | `/api/bookings/my` | Authenticated | Get logged-in user's event bookings |
| **POST** | `/api/contact` | Public | Submit banquet inquiry message |
| **GET** | `/api/admin/dashboard` | Admin | Aggregated analytics & revenue charts |
| **GET** | `/api/admin/bookings` | Admin | CRM booking list with status modification |
| **GET** | `/api/content/:section` | Public | Dynamic CMS content (homepage, about, navigation, settings) |

---

## 🌐 Production Deployment Guidelines

### Frontend (Vercel, Netlify, Cloudflare Pages, S3/CloudFront)
1. Set the root directory to `frontend`.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Environment variable: Set `VITE_API_BASE_URL=https://your-backend-api.com/api`.

### Backend (Railway, Render, AWS ECS, DigitalOcean, VPS)
1. Set the root directory to `backend`.
2. Build command: `npm run build` (or leave as tsx for direct execution).
3. Start command: `npm run start`.
4. Environment variables:
   - `PORT=5000` (or platform default)
   - `NODE_ENV=production`
   - `JWT_SECRET=your_production_secret`
   - `CORS_ORIGIN=https://your-frontend-domain.com`

---

## 🛡️ Verification & Testing Results

- **Frontend Build**: Verified with Vite 8 (`1717 modules transformed, built in <300ms`).
- **Backend Lint**: Verified with TypeScript Compiler (`tsc --noEmit` passed with 0 errors).
- **Backend API**: Verified all endpoints (`/api/health`, `/api/menu`, `/api/packages`, `/api/services`, `/api/gallery`, `/api/reviews`, `/api/auth/admin-login`).
- **Browser Automation**: Verified visual layout, navigation, dynamic menu rendering, booking wizard, and admin login with clean console logs and 0 network failures.
