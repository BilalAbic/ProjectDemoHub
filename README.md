# DemoHub - Portfolio Management System

<div align="center">

![Status](https://img.shields.io/badge/status-planning-blue)
![Progress](https://img.shields.io/badge/progress-5%25-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

*A modern, full-stack portfolio management system with admin panel*

**Developer:** Bilal Abic

</div>

---

## 📋 Project Overview

DemoHub is a comprehensive portfolio management system that allows developers to showcase their projects professionally while managing content through an elegant admin panel. Built with modern web technologies and designed with attention to detail.

### ✨ Key Features

#### Public Portfolio
- 🎨 Beautiful dark-mode interface with glassmorphism effects
- 🔍 Filter projects by technology (React, Node.js, Python, Vue.js)
- 📱 Fully responsive design (mobile to 4K)
- 🖼️ Rich project details with image galleries
- 🔗 Direct links to live demos and GitHub repositories
- 📄 Pagination support

#### Admin Panel
- 📊 Dashboard with real-time statistics
- ✏️ Full CRUD operations for projects
- 🖼️ Advanced image management (upload, reorder, delete)
- 📝 Rich project editing with technology tagging
- 👥 Multi-contributor support
- 🔒 Secure JWT authentication

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
- **Framework:** Next.js 14+ (React 18)
- **Styling:** Tailwind CSS 3+
- **State Management:** React Context + React Query
- **Forms:** React Hook Form
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js 18+ (LTS)
- **Framework:** Express.js 4+
- **Database:** PostgreSQL 15+
- **ORM:** Prisma 5+
- **Authentication:** JWT (jsonwebtoken)
- **Image Storage:** Cloudinary

### DevOps
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Railway / Render

---

## 📁 Project Structure

```
DemoHub/
├── memory-bank/              # 🧠 Cline Memory Bank (Project Documentation)
│   ├── projectbrief.md       # Project requirements and objectives
│   ├── productContext.md     # Product philosophy and UX goals
│   ├── systemPatterns.md     # Architecture and design patterns
│   ├── techContext.md        # Technology stack and setup
│   ├── activeContext.md      # Current work focus and decisions
│   └── progress.md           # What's done and what's left
├── frontend/                 # ⚛️ Next.js Frontend Application (Coming Soon)
├── backend/                  # 🔧 Express.js Backend API (Coming Soon)
├── AGENT.md                  # 🤖 Cline Memory Bank Instructions
└── README.md                 # 📖 This file
```

---

## 🎯 Current Status

**Phase:** 📋 Planning & Documentation  
**Progress:** 5% Complete  
**Last Updated:** October 29, 2025

### ✅ Completed
- [x] Memory Bank documentation (6 files)
- [x] Requirements analysis
- [x] Design reference analysis
- [x] Technology stack decisions
- [x] Database schema design
- [x] API endpoint planning

### 🚧 In Progress
- [ ] Project setup (Git, folders, dependencies)

### ⏳ Next Steps
1. Initialize Git repository
2. Set up backend project (Node.js + Express + Prisma)
3. Set up frontend project (Next.js + Tailwind)
4. Create database schema and migrations
5. Implement public API endpoints

---

## 🚀 Getting Started

> **Note:** Project setup is not yet complete. These instructions will be updated as the project is built.

### Prerequisites
```bash
Node.js >= 18.0.0
PostgreSQL >= 15.0
npm >= 9.0.0 or yarn >= 1.22.0
Git
Docker (optional, for containerization)
```

### Installation (Coming Soon)

```bash
# 1. Clone the repository
git clone https://github.com/bilalabic/demohub.git
cd demohub

# 2. Backend setup
cd backend
npm install
npx prisma migrate dev
npm run dev

# 3. Frontend setup
cd ../frontend
npm install
npm run dev
```

---

## 📚 Documentation

All project documentation is maintained in the **Memory Bank** (`memory-bank/` folder). This ensures continuity and clear understanding of the project for both current and future developers.

### Memory Bank Files

1. **[projectbrief.md](memory-bank/projectbrief.md)**  
   Complete project overview, objectives, tech stack, database schema, and deliverables.

2. **[productContext.md](memory-bank/productContext.md)**  
   Why the project exists, problems it solves, user flows, and experience goals.

3. **[systemPatterns.md](memory-bank/systemPatterns.md)**  
   System architecture, design patterns, component relationships, and critical paths.

4. **[techContext.md](memory-bank/techContext.md)**  
   Detailed technology stack, dependencies, development setup, and constraints.

5. **[activeContext.md](memory-bank/activeContext.md)**  
   Current work focus, recent changes, decisions, learnings, and next steps.

6. **[progress.md](memory-bank/progress.md)**  
   Detailed progress tracking, what works, what's left to build, and milestones.

---

## 🎨 Design References

Design mockups and HTML/CSS references are available in these folders:
- `HomePage/` - Main project gallery page
- `ProjectComponent/` - Project detail modal
- `AdminHome/` - Admin dashboard
- `AdminProjects/` - Project management page
- `AdminProjectNewComponent/` - Add project modal
- `AdminProjectEditComponent/` - Edit project modal

Each folder contains:
- `screen.png` - Visual design mockup
- `code.html` - HTML/Tailwind implementation reference

---

## 🗺️ Roadmap

### Phase 1: Foundation (Week 1)
- [x] Planning & Documentation
- [ ] Project setup (Git, folders, dependencies)
- [ ] Database schema implementation
- [ ] Basic backend API
- [ ] Authentication system

### Phase 2: Public Pages (Week 2)
- [ ] HomePage with project grid
- [ ] Technology filtering
- [ ] Pagination
- [ ] ProjectComponent modal
- [ ] Responsive design

### Phase 3: Admin Panel (Week 3)
- [ ] Admin dashboard
- [ ] Project CRUD operations
- [ ] Image upload and management
- [ ] Form validation

### Phase 4: Polish & Deploy (Week 4)
- [ ] Testing (unit, integration, E2E)
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Production deployment
- [ ] Final documentation

---

## 📊 Database Schema

### Core Tables
- **Projects** - Main project information
- **Technologies** - Available technologies (React, Node.js, etc.)
- **Project_Technologies** - Many-to-many relationship
- **Contributors** - Project contributors
- **Project_Contributors** - Many-to-many relationship
- **Project_Images** - Project image gallery
- **Admin_Activities** - Activity logging

See [projectbrief.md](memory-bank/projectbrief.md) for detailed schema.

---

## 🔐 Security

- **Authentication:** JWT-based (access + refresh tokens)
- **Password Hashing:** bcrypt with salt rounds
- **Input Validation:** Client-side (React Hook Form) + Server-side (Express Validator)
- **SQL Injection:** Protected via Prisma ORM
- **XSS Protection:** Helmet middleware
- **CSRF Protection:** CSRF tokens
- **Rate Limiting:** Express rate limit middleware
- **HTTPS:** Required in production

---

## 🎯 Performance Targets

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** > 90 (all categories)
- **API Response Time:** < 500ms
- **Bundle Size:** Optimized with code splitting

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

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Developer

**Bilal Abic**

- Portfolio: [Coming Soon]
- GitHub: [@bilalabic](https://github.com/bilalabic)
- LinkedIn: [Bilal Abic](https://linkedin.com/in/bilalabic)

---

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Tailwind CSS for the amazing utility-first framework
- Cloudinary for image management
- Next.js team for the incredible framework
- Prisma team for the elegant ORM

---

## 📞 Support

If you have questions or need help with the project:

1. Check the [Memory Bank documentation](memory-bank/)
2. Review the [progress tracker](memory-bank/progress.md)
3. Open an issue on GitHub
4. Contact the developer

---

<div align="center">

**Built with ❤️ by Bilal Abic**

*Modern. Professional. Scalable.*

</div>

