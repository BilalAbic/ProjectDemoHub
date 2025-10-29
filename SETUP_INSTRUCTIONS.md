# DemoHub Setup Instructions

Quick reference for setting up and running the DemoHub project.

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ Node.js >= 18.0.0 installed
- ✅ Docker Desktop installed (for PostgreSQL)
- ✅ Git installed
- ✅ npm >= 9.0.0

## 🚀 Quick Start Guide

### Step 1: Clone Repository (When Available)

```bash
git clone https://github.com/bilalabic/demohub.git
cd demohub
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
# nano .env  # or use your favorite editor

# Start PostgreSQL with Docker
docker-compose up -d postgres

# Run database migrations
npm run prisma:migrate

# Seed database with initial data
npm run prisma:seed

# Start development server
npm run dev
```

Backend will run at: `http://localhost:4000`

### Step 3: Frontend Setup (Coming Soon)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration

# Start development server
npm run dev
```

Frontend will run at: `http://localhost:3000`

## 🔧 Development Tools

### Backend Tools

**Prisma Studio** - Visual database browser:
```bash
cd backend
npm run prisma:studio
```
Opens at: `http://localhost:5555`

**pgAdmin** - Database management:
```bash
docker-compose up -d pgadmin
```
Opens at: `http://localhost:5050`
- Email: `admin@demohub.com`
- Password: `admin123`

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f postgres

# Restart a service
docker-compose restart postgres
```

## 📝 Common Tasks

### Run Database Migrations

```bash
cd backend
npm run prisma:migrate
```

### Reset Database

```bash
cd backend
npm run prisma:migrate reset
```
⚠️ This will delete all data!

### Seed Database

```bash
cd backend
npm run prisma:seed
```

### Format Code

```bash
cd backend
npm run format

cd frontend
npm run format
```

### Lint Code

```bash
cd backend
npm run lint

cd frontend
npm run lint
```

## 🌍 Environment Variables

### Backend (.env)

```env
# Server
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://demohub_user:demohub_password@localhost:5432/demohub_db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Cloudinary (Get from https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CORS_ORIGIN=http://localhost:3000

# Admin
ADMIN_EMAIL=admin@demohub.com
ADMIN_PASSWORD=ChangeThisPassword123!
```

### Frontend (.env.local) - Coming Soon

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 🔍 Testing the Setup

### 1. Test Backend Health

```bash
curl http://localhost:4000/health
```

Expected response:
```json
{
  "success": true,
  "message": "DemoHub API is running",
  "timestamp": "2025-10-29T...",
  "environment": "development"
}
```

### 2. Test Database Connection

```bash
cd backend
npm run prisma:studio
```

Should open Prisma Studio without errors.

### 3. Check Docker Services

```bash
docker-compose ps
```

All services should show "Up" status.

## 🐛 Troubleshooting

### Database Connection Failed

**Problem:** Cannot connect to PostgreSQL

**Solution:**
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Port Already in Use

**Problem:** Port 4000 or 3000 already in use

**Solution:**
```bash
# Find process using port
npx kill-port 4000
npx kill-port 3000

# Or change PORT in .env
```

### Prisma Client Not Generated

**Problem:** Cannot find @prisma/client

**Solution:**
```bash
cd backend
npm run prisma:generate
```

### node_modules Issues

**Problem:** Various dependency errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- **Backend README**: `backend/README.md`
- **Frontend README**: `frontend/README.md` (coming soon)
- **Memory Bank**: `memory-bank/` folder
- **Project Brief**: `memory-bank/projectbrief.md`
- **API Docs**: Will be added in Phase 2

## 🎯 Default Credentials

### Admin Panel (After Seeding)

- **Email:** `admin@demohub.com`
- **Password:** `ChangeThisPassword123!` (or what you set in .env)

⚠️ **Remember to change these in production!**

## 📞 Getting Help

1. Check the troubleshooting section above
2. Review the Memory Bank documentation
3. Check backend/frontend README files
4. Create an issue on GitHub

## ✅ Setup Checklist

- [ ] Node.js installed (v18+)
- [ ] Docker Desktop installed and running
- [ ] Git installed
- [ ] Backend dependencies installed
- [ ] PostgreSQL container running
- [ ] Database migrated
- [ ] Database seeded
- [ ] Backend server running
- [ ] Frontend dependencies installed (coming soon)
- [ ] Frontend server running (coming soon)
- [ ] Health check passing
- [ ] Prisma Studio accessible

---

**Last Updated:** October 29, 2025  
**Status:** Backend setup complete, frontend coming soon

