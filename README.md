# DemoHub - Portfolio Management System

<div align="center">

![Status](https://img.shields.io/badge/status-production-success)
![Progress](https://img.shields.io/badge/progress-98%25-brightgreen)
![Tests](https://img.shields.io/badge/tests-249%20passing-success)
![License](https://img.shields.io/badge/license-MIT-green)
![Deployment](https://img.shields.io/badge/deployment-live-blue)

*A modern, full-stack portfolio management system with admin panel*

**Developer:** Bilal Abic

</div>

---

## 📋 Project Overview

DemoHub is a comprehensive portfolio management system that allows developers to showcase their projects professionally while managing content through an elegant admin panel. Built with modern web technologies and designed with attention to detail.

### ✨ Key Features

#### Public Portfolio
- 🎨 Beautiful dark-mode interface with glassmorphism effects
- � Filtyer projects by technology (React, Node.js, Python, Vue.js, etc.)
- �  Fully responsive design (mobile to 4K)
- �️ Rrich project details with image galleries
- � PDirect links to live demos and GitHub repositories
- 📄 Pagination support

#### Admin Panel
- 📊 Dashboard with real-time statistics
- ✏️ Full CRUD operations for projects
- �️R Advanced image management (upload, delete in edit mode)
- � Ruich project editing with technology tagging
- � Meulti-contributor support
- 🔒 Secure JWT authentication with auto-refresh
- 💾 Persistent sessions (F5-safe)

---

## 🎨 Design System

### Color Palette
```
Primary (Cyan):        #06f9f9
Background Dark:       #0A1919
Surface Dark:          #122B2B
Text Dark Heading:     #EAEAEA
Text Dark Body:        #A0B0B0
```

### Typography
- **Display Font:** Inter (400, 500, 600, 700, 900)
- **Monospace Font:** JetBrains Mono (400, 700)
- **Icons:** Material Symbols Outlined

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Vite + React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3+
- **State Management:** React Context + React Query
- **Forms:** React Hook Form
- **HTTP Client:** Axios
- **Routing:** React Router v6

### Backend
- **Runtime:** Node.js 18+ (LTS)
- **Framework:** Express.js 4+
- **Language:** TypeScript
- **Database:** PostgreSQL 15+
- **ORM:** Prisma 5+
- **Authentication:** JWT (jsonwebtoken)
- **Image Storage:** Cloudinary
- **Security:** Helmet, CORS, bcrypt

### Testing
- **Backend:** Jest + ts-jest + Supertest
- **Frontend:** Vitest + React Testing Library
- **Coverage:** 249 tests passing
  - Backend: 138 tests (99.23% service coverage)
  - Frontend: 111 tests (~60% coverage)

### DevOps
- **Containerization:** Docker (PostgreSQL)
- **CI/CD:** GitHub Actions
- **Frontend Hosting:** Azure Static Web Apps
- **Backend Hosting:** Azure Container Apps

---

## 📁 Project Structure

```
DemoHub/
├── memory-bank/              # 🧠 Project Documentation
│   ├── projectbrief.md       # Project requirements
│   ├── productContext.md     # Product philosophy
│   ├── systemPatterns.md     # Architecture
│   ├── techContext.md        # Technology stack
│   ├── activeContext.md      # Current work
│   └── progress.md           # Progress tracking
├── backend/                  # ✅ Express.js Backend API
│   ├── prisma/              # Database schema
│   ├── src/                 # TypeScript source
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Express middlewares
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── server.ts       # Express app
│   ├── tests/              # Jest tests (138 tests)
│   ├── docker-compose.yml  # Docker services
│   └── README.md           # Backend docs
├── frontend/                 # ⚛️ Vite + React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── contexts/       # React contexts
│   │   ├── lib/            # Utilities
│   │   ├── types/          # TypeScript types
│   │   └── tests/          # Vitest tests (111 tests)
│   └── README.md           # Frontend docs
├── TESTING.md                # Testing guide
└── README.md                 # This file
```

---

## 🎯 Current Status

**Phase:** 🚀 **LIVE IN PRODUCTION**  
**Progress:** 98% Complete  
**Last Updated:** October 31, 2025

### 🌐 Production URLs
- **Live Site**: https://demohub.bilalabic.com
- **Backend API**: https://demohub-backend.ashywave-14cbf8c3.westus2.azurecontainerapps.io
- **Admin Panel**: https://demohub.bilalabic.com/admin

### ✅ Completed (98%)
- [x] Memory Bank documentation
- [x] Backend setup & deployment
- [x] Database schema & migrations
- [x] Public API endpoints
- [x] Authentication system (JWT + auto-refresh)
- [x] Admin CRUD endpoints
- [x] Frontend setup & deployment
- [x] Public pages (HomePage, ProjectDetail)
- [x] Admin panel (Dashboard, Projects CRUD)
- [x] Image management (Cloudinary)
- [x] Session management (persistent)
- [x] Bug fixes & polish
- [x] **Backend tests (138 tests, 99.23% service coverage)** ⭐
- [x] **Frontend tests (111 tests, ~60% coverage)** ⭐
- [x] **Production deployment (Azure)** 🚀
- [x] **Custom domain setup** 🌐
- [x] **Database migration & seeding** 🗄️

### 🚧 Final Polish (2%)
- [ ] Cloudinary image upload optimization
- [ ] Performance monitoring (Sentry)
- [ ] SEO optimization

### 🎉 Deployment Achievements
1. Backend deployed to Azure Container Apps
2. Frontend deployed to Azure Static Web Apps
3. Custom domain configured (demohub.bilalabic.com)
4. PostgreSQL database on Neon.tech
5. HTTPS enabled automatically
6. CORS configured for production
7. Environment variables secured

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
PostgreSQL >= 15.0 (or Docker)
npm >= 9.0.0
Docker Desktop (recommended)
```

### Quick Installation

```bash
# 1. Clone the repository
git clone https://github.com/bilalabic/demohub.git
cd demohub

# 2. Backend setup
cd backend
npm install                    # Install dependencies
cp .env.example .env          # Copy environment template
# Edit .env with your values (DATABASE_URL, JWT_SECRET, CLOUDINARY_*)
docker-compose up -d postgres # Start PostgreSQL
npm run prisma:migrate        # Run database migrations
npm run prisma:seed           # Seed initial data
npm run dev                   # Start backend (port 4000)

# 3. Frontend setup
cd ../frontend
npm install                   # Install dependencies
npm run dev                   # Start frontend (port 5173)
```

### Running Tests

```bash
# Backend tests
cd backend
npm test                      # Run all tests
npm run test:coverage         # With coverage report

# Frontend tests
cd frontend
npm test                      # Run all tests
npm run test:ui               # With UI
npm run test:coverage         # With coverage report
```

**📝 For detailed setup instructions, see [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md)**

---

## 📚 Documentation

### Main Documentation
- **[README.md](README.md)** - This file (project overview)
- **[TESTING.md](TESTING.md)** - Testing guide (249 tests)
- **[DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md)** - Production deployment guide

### Memory Bank (Project Context)
1. **[projectbrief.md](memory-bank/projectbrief.md)** - Requirements & objectives
2. **[productContext.md](memory-bank/productContext.md)** - Product philosophy
3. **[systemPatterns.md](memory-bank/systemPatterns.md)** - Architecture
4. **[techContext.md](memory-bank/techContext.md)** - Technology stack
5. **[activeContext.md](memory-bank/activeContext.md)** - Current work
6. **[progress.md](memory-bank/progress.md)** - Progress tracking

### Component Documentation
- **[backend/README.md](backend/README.md)** - Backend API documentation
- **[backend/tests/README.md](backend/tests/README.md)** - Backend testing
- **[frontend/src/tests/README.md](frontend/src/tests/README.md)** - Frontend testing

---

## 🧪 Testing

### Test Coverage
```
Total Tests: 249 passing ✅

Backend (Jest):
- Test Suites: 6 passed
- Tests: 138 passed
- Coverage: 31.06% overall, 99.23% services
- Time: ~8 seconds

Frontend (Vitest):
- Test Suites: 5 passed
- Tests: 111 passed
- Coverage: ~60%
- Time: ~7 seconds
```

### What's Tested
**Backend:**
- ✅ JWT utilities (25 tests)
- ✅ CatchAsync utility (8 tests)
- ✅ Auth service (27 tests)
- ✅ Project service (22 tests)
- ✅ Technology service (18 tests)
- ✅ Admin project service (38 tests)

**Frontend:**
- ✅ Utility functions (34 tests)
- ✅ Button component (27 tests)
- ✅ useProjects hook (16 tests)
- ✅ useAdminProjects hook (18 tests)
- ✅ Example tests (16 tests)

---

## 🗺️ API Endpoints

### Public API
```
GET    /api/projects          # List projects (paginated)
GET    /api/projects/:id      # Get project details
GET    /api/technologies      # List technologies
```

### Admin API (Protected)
```
POST   /api/admin/login       # Admin login
POST   /api/admin/logout      # Admin logout
POST   /api/admin/refresh     # Refresh token
GET    /api/admin/me          # Get current admin

GET    /api/admin/projects    # List all projects
POST   /api/admin/projects    # Create project
PUT    /api/admin/projects/:id # Update project
DELETE /api/admin/projects/:id # Delete project

POST   /api/admin/projects/:id/images      # Upload images
DELETE /api/admin/projects/:id/images/:imageId # Delete image
```

---

## 📊 Database Schema

### Core Tables
- **projects** - Main project information
- **technologies** - Available technologies
- **project_technologies** - Many-to-many relationship
- **contributors** - Project contributors
- **project_contributors** - Many-to-many relationship
- **project_images** - Project image gallery
- **admins** - Admin users

See [projectbrief.md](memory-bank/projectbrief.md) for detailed schema.

---

## 🔐 Security

- **Authentication:** JWT-based (30min access + 7day refresh tokens)
- **Auto-refresh:** Automatic token refresh on expiry
- **Password Hashing:** bcrypt with salt rounds
- **Input Validation:** Client + Server-side validation
- **SQL Injection:** Protected via Prisma ORM
- **XSS Protection:** Helmet middleware
- **CORS:** Configured for production
- **Rate Limiting:** Express rate limit middleware
- **HTTPS:** Required in production

---

## 🎯 Performance

- **First Contentful Paint:** < 1.5s (target)
- **Time to Interactive:** < 3.5s (target)
- **Lighthouse Score:** > 90 (target)
- **API Response Time:** < 500ms
- **Bundle Size:** Optimized with Vite
- **Code Splitting:** Automatic with React Router

---

## 🤝 Contributing

This is a personal portfolio project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention
Following Conventional Commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Bilal Abic**

- Portfolio: [Coming Soon]
- GitHub: [@bilalabic](https://github.com/bilalabic)
- LinkedIn: [Bilal Abic](https://linkedin.com/in/bilalabic)

---

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Tailwind CSS for the utility-first framework
- Cloudinary for image management
- Vite team for the blazing fast build tool
- Prisma team for the elegant ORM
- React Query for server state management

---

## 📞 Support

If you have questions or need help:

1. Check the [Memory Bank documentation](memory-bank/)
2. Review the [progress tracker](memory-bank/progress.md)
3. Check [TESTING.md](TESTING.md) for testing info
4. Open an issue on GitHub

---

<div align="center">

**Built with ❤️ by Bilal Abic**

*Modern. Professional. Scalable.*

**249 Tests Passing** | **98% Complete** | **🚀 LIVE IN PRODUCTION**

</div>
