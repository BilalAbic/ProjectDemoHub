# Technical Context: DemoHub

## Technologies Used

### Frontend Stack

#### **React.js 18+**
- **Purpose**: UI component library for building interactive interfaces
- **Why Chosen**: Component reusability, strong ecosystem, large community
- **Key Features Used**:
  - Hooks (useState, useEffect, useContext, useCallback, useMemo)
  - Context API for global state
  - React Router for navigation
  - Portals for modals

#### **Next.js 14+ (Recommended)**
- **Purpose**: React framework for production
- **Why Chosen**: SSR/SSG for SEO, file-based routing, API routes, image optimization
- **Key Features**:
  - App Router (new paradigm)
  - Server Components for performance
  - Built-in Image component
  - API routes for backend integration

#### **Tailwind CSS 3+**
- **Purpose**: Utility-first CSS framework
- **Why Chosen**: Rapid development, consistent design, no CSS conflicts
- **Configuration**:
  ```javascript
  // Custom colors
  primary: "#06f9f9"
  background-dark: "#0A1919"
  surface-dark: "#122B2B"
  text-dark-heading: "#EAEAEA"
  text-dark-body: "#A0B0B0"
  
  // Custom fonts
  display: ["Inter", "sans-serif"]
  mono: ["JetBrains Mono", "monospace"]
  ```

#### **React Hook Form 7+**
- **Purpose**: Form state management and validation
- **Why Chosen**: Performance (uncontrolled components), easy validation
- **Usage**: All admin forms (create/edit project)

#### **React Query (TanStack Query) 4+**
- **Purpose**: Server state management, data fetching, caching
- **Why Chosen**: Automatic refetching, caching, error handling, loading states
- **Key Features**:
  - Query invalidation on mutations
  - Optimistic updates
  - Background refetching
  - Paginated queries

#### **Axios**
- **Purpose**: HTTP client
- **Why Chosen**: Interceptors for auth, better error handling than fetch
- **Configuration**: Base URL, auth interceptor, error interceptor

### Backend Stack

#### **Node.js 18+ (LTS)**
- **Purpose**: JavaScript runtime for server
- **Why Chosen**: Same language as frontend, non-blocking I/O, huge ecosystem
- **Version**: LTS for stability and long-term support

#### **Express.js 4+**
- **Purpose**: Web application framework
- **Why Chosen**: Minimalist, flexible, middleware-based, widely used
- **Middleware Stack**:
  - `express.json()` - Parse JSON bodies
  - `cors()` - Cross-origin requests
  - `helmet()` - Security headers
  - `morgan()` - HTTP request logging
  - Custom auth middleware
  - Custom error handler

#### **PostgreSQL 15+**
- **Purpose**: Relational database
- **Why Chosen**: 
  - ACID compliance for data integrity
  - Excellent JSON support (for flexible fields if needed)
  - Mature, stable, performant
  - Strong constraint and relationship support
  - Advanced querying capabilities

#### **Prisma ORM 5+** (Recommended)
- **Purpose**: Next-generation ORM
- **Why Chosen**:
  - Type-safe database client
  - Auto-generated TypeScript types
  - Intuitive API
  - Migration system
  - Prisma Studio for DB browsing
- **Alternative**: TypeORM (more traditional, decorator-based)

#### **JWT (jsonwebtoken)**
- **Purpose**: Authentication tokens
- **Configuration**:
  - Access token expiry: 15 minutes
  - Refresh token expiry: 7 days
  - Algorithm: HS256
  - Secret: Environment variable

#### **Multer**
- **Purpose**: File upload middleware
- **Configuration**:
  - Max file size: 10MB
  - Allowed types: image/jpeg, image/png, image/gif, image/webp
  - Memory storage (temporary, before Cloudinary upload)

#### **Cloudinary SDK**
- **Purpose**: Cloud-based image storage and manipulation
- **Why Chosen**: 
  - Free tier generous
  - Automatic optimization
  - Responsive image URLs
  - CDN delivery
  - Transformations on-the-fly
- **Features Used**:
  - Upload API
  - Folder organization
  - URL transformations (resize, format, quality)
  - Deletion API

#### **bcrypt**
- **Purpose**: Password hashing
- **Configuration**: Salt rounds: 10
- **Why Chosen**: Industry standard, slow by design (prevents brute force)

### Development Tools

#### **TypeScript 5+** (Highly Recommended)
- **Purpose**: Static typing for JavaScript
- **Why Chosen**: Catch errors early, better IDE support, self-documenting code
- **Usage**: Both frontend and backend

#### **ESLint**
- **Purpose**: Code linting
- **Configuration**: Airbnb style guide (with custom rules)
- **Rules**: Enforce consistent code style

#### **Prettier**
- **Purpose**: Code formatting
- **Configuration**: 
  - Semi: true
  - Single quotes: true
  - Tab width: 2
  - Print width: 100

#### **Git**
- **Purpose**: Version control
- **Branching Strategy**:
  - `main` - Production
  - `develop` - Development
  - `feature/*` - Feature branches

### DevOps & Deployment

#### **Docker**
- **Purpose**: Containerization
- **Containers**:
  - Frontend (Next.js app)
  - Backend (Express API)
  - PostgreSQL database
  - Redis (for sessions/cache)
- **Docker Compose**: Orchestrate multi-container setup

#### **GitHub Actions**
- **Purpose**: CI/CD pipeline
- **Workflows**:
  - Run tests on PR
  - Lint check
  - Build and deploy on merge to main
  - Automated security scans

#### **Vercel** (Frontend Hosting)
- **Purpose**: Deploy Next.js app
- **Why Chosen**: 
  - Seamless Next.js integration
  - Automatic deployments from Git
  - Edge functions
  - Free tier for personal projects

#### **Railway / Render** (Backend Hosting)
- **Purpose**: Deploy Express API and PostgreSQL
- **Why Chosen**:
  - Easy PostgreSQL setup
  - Automatic deployments
  - Environment variables management
  - Free tier available

### Testing (Recommended)

#### **Vitest** (Unit Tests)
- **Purpose**: Fast unit test runner
- **Why**: Vite-native, faster than Jest

#### **React Testing Library** (Component Tests)
- **Purpose**: Test React components
- **Philosophy**: Test user behavior, not implementation

#### **Playwright** (E2E Tests)
- **Purpose**: End-to-end testing
- **Coverage**: Critical user flows (add project, login, filter)

## Development Setup

### Prerequisites
```bash
Node.js >= 18.0.0
PostgreSQL >= 15.0
npm >= 9.0.0 or yarn >= 1.22.0
Git
```

### Environment Variables

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

#### Backend (.env)
```
# Server
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/demohub

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin
ADMIN_EMAIL=bilal@example.com
ADMIN_PASSWORD_HASH=bcrypt_hashed_password

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Installation Steps

```bash
# 1. Clone repository
git clone https://github.com/bilalabic/demohub.git
cd demohub

# 2. Install backend dependencies
cd backend
npm install

# 3. Setup database
npx prisma migrate dev
npx prisma db seed

# 4. Install frontend dependencies
cd ../frontend
npm install

# 5. Run development servers
# Terminal 1 (Backend)
cd backend && npm run dev

# Terminal 2 (Frontend)
cd frontend && npm run dev
```

## Technical Constraints

### Performance Constraints
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

### File Upload Constraints
- **Max file size**: 10MB per image
- **Allowed formats**: PNG, JPG, GIF, WEBP
- **Max files per upload**: 10
- **Total storage**: Cloudinary free tier (25GB)

### Database Constraints
- **Max project name length**: 100 characters
- **Max description length**: 500 characters
- **Max technologies per project**: 20
- **Max contributors per project**: 10
- **Max images per project**: 20

### API Rate Limits
- **Public endpoints**: 100 requests/minute per IP
- **Admin endpoints**: 60 requests/minute per user
- **Image upload**: 10 uploads/minute per user

### Browser Support
- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions
- **Mobile browsers**: iOS Safari, Chrome Mobile

## Dependencies Management

### Frontend Core Dependencies
```json
{
  "react": "^18.2.0",
  "next": "^14.0.0",
  "tailwindcss": "^3.4.0",
  "react-hook-form": "^7.48.0",
  "@tanstack/react-query": "^5.0.0",
  "axios": "^1.6.0"
}
```

### Frontend Dev Dependencies
```json
{
  "typescript": "^5.3.0",
  "eslint": "^8.54.0",
  "prettier": "^3.1.0",
  "@types/react": "^18.2.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

### Backend Core Dependencies
```json
{
  "express": "^4.18.0",
  "prisma": "^5.7.0",
  "@prisma/client": "^5.7.0",
  "jsonwebtoken": "^9.0.0",
  "bcrypt": "^5.1.0",
  "multer": "^1.4.0",
  "cloudinary": "^1.41.0",
  "cors": "^2.8.0",
  "helmet": "^7.1.0",
  "morgan": "^1.10.0",
  "dotenv": "^16.3.0"
}
```

### Backend Dev Dependencies
```json
{
  "typescript": "^5.3.0",
  "ts-node": "^10.9.0",
  "nodemon": "^3.0.0",
  "@types/express": "^4.17.0",
  "@types/bcrypt": "^5.0.0",
  "@types/multer": "^1.4.0"
}
```

## Tool Usage Patterns

### Prisma Workflow
```bash
# Create migration
npx prisma migrate dev --name add_projects_table

# Reset database
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

### Git Workflow
```bash
# Feature development
git checkout -b feature/add-image-gallery
# ... make changes ...
git add .
git commit -m "feat: add image gallery component"
git push origin feature/add-image-gallery
# Create PR on GitHub
```

### Testing Workflow
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Build & Deploy
```bash
# Frontend production build
npm run build

# Backend production build
npm run build

# Start production server
npm run start
```

## Security Configurations

### CORS Setup
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Helmet Configuration
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"]
    }
  }
}));
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const publicLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100 // 100 requests per minute
});

const adminLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60
});
```

## Monitoring & Logging

### Logging Strategy
- **Development**: Console logs with colors (morgan 'dev')
- **Production**: JSON structured logs (winston)
- **Error tracking**: Sentry integration (recommended)
- **Performance**: Web Vitals monitoring

### Metrics to Track
- API response times
- Error rates by endpoint
- Database query performance
- Image upload success/failure rates
- User authentication events

## Future Technical Considerations

### Scalability
- **Horizontal scaling**: Load balancer + multiple backend instances
- **Caching**: Redis for frequently accessed data
- **CDN**: Serve static assets from edge locations
- **Database**: Read replicas for scaling reads

### Feature Additions
- **WebSockets**: Real-time admin notifications
- **Elasticsearch**: Advanced project search
- **Email**: Nodemailer for notifications
- **Analytics**: Google Analytics or custom solution

