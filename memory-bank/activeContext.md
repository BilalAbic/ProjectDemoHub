# Active Context: DemoHub

## Current Work Focus

### Phase: Testing Phase - Backend Tests Complete, Frontend In Progress
**Status**: Full-Stack Application Production-Ready - 92% Complete  
**Date**: October 30, 2025 (Updated: Latest Session - Backend Service Tests Complete)

Complete full-stack application with comprehensive backend testing! All critical bugs fixed, authentication enhanced, data flow standardized. Current status:

1. **Backend Setup**: ✅ COMPLETE - All systems operational
2. **Database Setup**: ✅ COMPLETE - PostgreSQL running, migrated, and seeded
3. **Server Running**: ✅ COMPLETE - Express server live on port 4000
4. **Public API Endpoints**: ✅ COMPLETE - Standardized response format
5. **Authentication System**: ✅ COMPLETE - JWT with 30min session + auto-refresh
6. **Admin CRUD Endpoints**: ✅ COMPLETE - All operations working perfectly
7. **Frontend Setup**: ✅ COMPLETE - Vite + React + TypeScript + Tailwind CSS
8. **Public Pages**: ✅ COMPLETE - HomePage, ProjectCard, ProjectDetailModal
9. **Admin Pages**: ✅ COMPLETE - Login, Dashboard, Projects CRUD
10. **Session Management**: ✅ COMPLETE - Persistent, auto-refresh, F5-safe
11. **Polish & Optimization**: ✅ COMPLETE - UI/UX polished, ready for testing
12. **Testing Suite**: 🔄 70% - Backend complete, Frontend in progress
    - Backend: 138 tests, 99.23% service coverage ✅
    - Frontend: 80 tests, ~40% coverage 🔄
    - Total: 218 tests passing ✅
13. **Next Focus**: Frontend hook tests, Component tests, Deployment prep

## Recent Changes

### Latest Enhancements (October 30, 2025 - Current Session) ✅

#### **1. ProjectDetailModal UX Improvements** 🎉
- ✅ **Problem**: Modal'da close butonu yoktu, blur alana tıklama çalışmıyordu
- ✅ **User Request**: Sağ üstte X butonu ekle, blur alana tıklanınca kapansın
- ✅ **Solution**: Tam özellikli modal kapatma sistemi
- ✅ **Features Added**:
  - Sağ üst köşede close (X) butonu
  - Hover efekti ile vurgu
  - Blur alana (backdrop) tıklama ile kapatma
  - ESC tuşu ile kapatma (zaten vardı)
  - Modal her açıldığında ilk resim gösteriliyor
  - Accessibility (aria-label) eklendi
- ✅ **Files Modified**:
  - `frontend/src/components/public/ProjectDetailModal.tsx` - Close button eklendi
  - `frontend/src/components/ui/Modal.tsx` - Backdrop onClick handler eklendi
  - `frontend/src/components/public/ProjectDetailModal.tsx` - Image index reset
- ✅ **Result**: Kullanıcı dostu modal kapatma deneyimi

#### **2. HomePage Technology Filter Fix** 🔧
- ✅ **Problem**: Navbar'daki technology filtreleri çalışmıyordu
- ✅ **Root Cause**: Frontend ID gönderiyordu, backend slug bekliyordu
- ✅ **Solution**: Frontend'i slug kullanacak şekilde güncellendi
- ✅ **Files Modified**:
  - `frontend/src/hooks/useProjects.ts` - technologyId → technologySlug
  - `frontend/src/components/layout/Navbar.tsx` - tech.id → tech.slug
  - `frontend/src/pages/public/HomePage.tsx` - techId → techSlug
- ✅ **Result**: Filtreleme sistemi tam çalışır durumda

#### **3. Image Management in Edit Mode - MAJOR FEATURE** 🎉
- ✅ **Problem**: Admin edit page showed "To manage images for this project, use the image management section after saving."
- ✅ **User Request**: Remove message and allow image management directly in edit modal
- ✅ **Solution**: Implemented full-featured image management in edit mode
- ✅ **Features Added**:
  - Display existing project images in grid layout (2-3 columns)
  - Hover-to-show delete button on each image
  - Delete confirmation dialog for safety
  - Upload new images in edit mode
  - Preview new images with "NEW" badge before saving
  - Auto-upload new images after project update
  - Responsive design (mobile to desktop)
- ✅ **Files Modified**:
  - `frontend/src/components/admin/ProjectFormModal.tsx` - Complete image management UI
  - Added `useDeleteImage` hook integration
  - Added `handleDeleteExistingImage` function
  - Added `handleUploadNewImages` function
  - Added `existingImages` state management
- ✅ **Result**: Seamless image management experience, no need for separate section

#### **2. TypeScript Warning Fixed - Unused Variable**
- ✅ **Problem**: `setDeletingProjectId` was declared but never used in ProjectsPage.tsx
- ✅ **Impact**: TypeScript error code 6133, cluttered code
- ✅ **Solution**: Removed unused state variable and updated delete button to use mutation state
- ✅ **Files Modified**:
  - `frontend/src/pages/admin/ProjectsPage.tsx` - Removed unused state
  - Changed disable logic to use `deleteProject.isPending`
- ✅ **Result**: Clean code, no TypeScript warnings

#### **3. Project Update UX Improvements**
- ✅ **Problem**: No clear feedback when project updates succeed
- ✅ **Enhancement**: Added success alerts for create/update operations
- ✅ **Files Modified**:
  - `frontend/src/components/admin/ProjectFormModal.tsx` - Added success alerts
  - Improved FormData handling to always send all fields (including empty values)
  - Better handling of optional fields (endDate, demoUrl, githubUrl)
- ✅ **Result**: Clear user feedback, better UX

#### **4. Form Data Handling Enhanced**
- ✅ **Problem**: Optional fields might not be sent correctly in updates
- ✅ **Solution**: Always send all form fields, even if empty
- ✅ **Files Modified**:
  - `frontend/src/components/admin/ProjectFormModal.tsx`
  - Changed from conditional append to always append with empty string fallback
- ✅ **Result**: More reliable updates, can clear optional fields

### Critical Bug Fixes & Enhancements (October 30, 2025 - Earlier) ✅

#### **1. Admin Update Feature Fixed**
- ✅ **Problem**: Admin project updates weren't saving (field name mismatch)
- ✅ **Root Cause**: Backend expected snake_case but frontend sent camelCase
- ✅ **Solution**: Backend now accepts both formats (startDate/start_date)
- ✅ **Files Modified**:
  - `backend/src/controllers/adminProjectController.ts` - Dual format support
  - Added debug logging for troubleshooting
- ✅ **Result**: Updates now work perfectly, changes reflect immediately

#### **2. Cache Auto-Refresh Enhanced**
- ✅ **Problem**: Updates weren't visible until manual page refresh
- ✅ **Solution**: Aggressive cache invalidation + immediate refetch
- ✅ **Files Modified**:
  - `frontend/src/hooks/useAdminProjects.ts` - Added refetchType and refetchQueries
- ✅ **Result**: UI updates instantly after CRUD operations

#### **3. Session Management - 30 Minute Duration**
- ✅ **Backend**: JWT access token expiry changed from 15m → 30m
- ✅ **Files Modified**: `backend/src/utils/jwt.ts`
- ✅ **Result**: Users stay logged in for 30 minutes of activity

#### **4. Automatic Token Refresh**
- ✅ **Problem**: Users logged out after token expiry
- ✅ **Solution**: Axios interceptor with automatic token refresh
- ✅ **Files Modified**: `frontend/src/lib/api.ts`
- ✅ **Features**:
  - Auto-refresh on 401 errors
  - Queue system to prevent multiple refresh attempts
  - Retry original request after refresh
  - Graceful logout on refresh failure
- ✅ **Result**: Seamless user experience, no unexpected logouts

#### **5. Persistent Session on Page Reload**
- ✅ **Problem**: F5 refresh logged users out
- ✅ **Solution**: Auth check on mount with loading state
- ✅ **Files Modified**:
  - `frontend/src/contexts/AuthContext.tsx` - Added auth check on mount
  - `frontend/src/components/auth/ProtectedRoute.tsx` - Added loading state
  - `frontend/src/pages/admin/LoginPage.tsx` - Auto-redirect if logged in
- ✅ **Result**: Sessions persist across page reloads

#### **6. API Response Format Standardization**
- ✅ **Problem**: Backend returned inconsistent nested structures
- ✅ **Old Format**: `technologies: [{technology: {...}}]` (nested)
- ✅ **New Format**: `technologies: [{...}]` (flat)
- ✅ **Files Modified**:
  - `backend/src/controllers/projectController.ts` - Response wrapper fixed
  - `backend/src/services/projectService.ts` - Already had flatten logic
  - `backend/src/services/adminProjectService.ts` - Added flatten to all methods
- ✅ **Result**: Clean, consistent API responses

#### **7. Frontend Data Structure Updates**
- ✅ **Problem**: Components expected nested structure
- ✅ **Solution**: Updated all components to use flat structure
- ✅ **Files Modified**:
  - `frontend/src/types/index.ts` - Type definitions updated
  - `frontend/src/components/public/ProjectCard.tsx`
  - `frontend/src/components/public/ProjectDetailModal.tsx`
  - `frontend/src/components/admin/ProjectFormModal.tsx`
  - `frontend/src/pages/admin/ProjectsPage.tsx`
  - `frontend/src/pages/admin/DashboardPage.tsx`
- ✅ **Result**: No more "Cannot read properties of undefined" errors

#### **8. Published Projects Display Fixed**
- ✅ **Problem**: HomePage showed "No projects found" despite having published projects
- ✅ **Root Cause**: API response format mismatch (data structure)
- ✅ **Solution**: Standardized response format across all endpoints
- ✅ **Result**: Published projects now display correctly on HomePage

### Technical Improvements
- ✅ **Debug Logging**: Added console logs for troubleshooting
- ✅ **Error Messages**: Improved error handling and user feedback
- ✅ **Type Safety**: Fixed all TypeScript type mismatches
- ✅ **Code Consistency**: Standardized data structures across frontend/backend

## Development History (Completed Phases)

### Backend Setup Completed (Phase 1) ✅
- ✅ **Node.js Project Initialized**: package.json with all dependencies
- ✅ **TypeScript Configured**: tsconfig.json with strict mode and path aliases
- ✅ **Express.js Setup**: Basic server with middleware stack
- ✅ **Prisma ORM**: Complete database schema designed
- ✅ **ESLint & Prettier**: Code quality tools configured
- ✅ **Docker Compose**: PostgreSQL, Redis, and pgAdmin containers ready
- ✅ **Folder Structure**: All backend directories created
- ✅ **Environment Template**: .env.example with all required variables
- ✅ **Seed Script**: Database seeding setup for technologies and admin user
- ✅ **Error Handling**: Global error and 404 handlers implemented
- ✅ **Documentation**: Comprehensive backend README.md

### Backend Deployment & Testing (Phase 1 Complete) ✅
- ✅ **Dependencies Installed**: npm install successful (all packages)
- ✅ **PostgreSQL Running**: Docker container started and healthy
- ✅ **Environment Configured**: .env file created with database credentials
- ✅ **Database Migrated**: Initial schema migration applied successfully
- ✅ **Database Seeded**: Admin user + 15 technologies + default contributor added
- ✅ **TypeScript Issues Fixed**: Unused parameter warnings resolved
- ✅ **Server Running**: Express server live at http://localhost:4000
- ✅ **Health Check Passed**: API responding correctly with 200 OK

### Public API Endpoints Development (Phase 2 Complete) ✅
- ✅ **Project Service**: Business logic for fetching projects and project details
- ✅ **Technology Service**: Business logic for fetching technologies
- ✅ **Controllers Created**: Request handlers with validation and error handling
- ✅ **Routes Configured**: Express routes properly integrated
- ✅ **Error Handling Utility**: catchAsync wrapper for async route handlers
- ✅ **TypeScript Fixes**: Removed Promise<void> return types from controllers
- ✅ **GET /api/projects**: Tested with pagination (page, limit parameters)
- ✅ **GET /api/projects/:id**: Tested with UUID validation
- ✅ **GET /api/technologies**: Tested and returning 15 seeded technologies
- ✅ **Validation Working**: Invalid parameters return proper 400 errors
- ✅ **404 Handling**: Missing resources return proper 404 errors

### Authentication System Development (Phase 3 Complete) ✅
- ✅ **JWT Utilities**: Token generation and verification functions
- ✅ **Auth Service**: Login logic with bcrypt password verification
- ✅ **Auth Controller**: Login, logout, refresh, getMe endpoints
- ✅ **Auth Middleware**: JWT token verification middleware
- ✅ **Protected Routes**: Authentication required for admin endpoints
- ✅ **Cookie Parser**: Installed and configured for refresh tokens
- ✅ **Database Migration**: Updated Admin schema (password, role, lastLogin fields)
- ✅ **POST /api/admin/login**: Tested with valid/invalid credentials
- ✅ **GET /api/admin/me**: Tested with valid/invalid tokens
- ✅ **POST /api/admin/logout**: Tested and working
- ✅ **Error Handling**: Proper 401 responses for invalid/expired tokens

### Frontend Implementation (Phase 5 Complete) ✅
- ✅ **Vite + React + TypeScript**: Modern frontend build setup
- ✅ **Tailwind CSS v3**: Custom design system with dark mode
- ✅ **React Router v6**: Client-side routing for public and admin pages
- ✅ **React Query**: Server state management with caching
- ✅ **React Hook Form**: Form state and validation
- ✅ **Axios**: HTTP client with interceptors
- ✅ **Material Symbols**: Icon library integration
- ✅ **Path Aliases**: @/ alias for clean imports
- ✅ **AuthContext**: Global authentication state with JWT
- ✅ **ProtectedRoute**: Route guard for admin pages
- ✅ **UI Components**: Button, Input, Textarea, Modal, Badge, Card, Pagination
- ✅ **Layout Components**: Navbar, Footer, AdminLayout with Sidebar
- ✅ **Public Pages**: HomePage with project grid, filtering, pagination, detail modal
- ✅ **Admin Pages**: Login, Dashboard with stats, Projects table with CRUD
- ✅ **ProjectFormModal**: Complex form with image upload, technology selection
- ✅ **API Integration**: All endpoints connected with React Query hooks
- ✅ **Responsive Design**: Mobile-first approach with breakpoints
- ✅ **TypeScript Types**: Complete type definitions for all data structures

### Admin CRUD Endpoints Development (Earlier Today - Phase 4 Complete) ✅
- ✅ **Multer & Cloudinary**: Installed packages for image upload
- ✅ **Cloudinary Config**: API credentials configured
- ✅ **Image Upload Utility**: Upload and delete functions for Cloudinary
- ✅ **Admin Project Service**: CRUD operations for projects (create, update, delete)
- ✅ **Image Management Service**: Add, delete, and reorder project images
- ✅ **Admin Project Controller**: Request handlers with validation
- ✅ **Admin Project Routes**: Protected routes with authentication middleware
- ✅ **Prisma Field Mapping**: Fixed snake_case to camelCase conversion
- ✅ **Junction Table Fix**: Removed non-existent 'order' field from relations
- ✅ **POST /api/admin/projects**: Tested and working (create project)
- ✅ **PUT /api/admin/projects/:id**: Tested and working (update project)
- ✅ **DELETE /api/admin/projects/:id**: Tested and working (delete project with cascades)
- ✅ **Type Safety**: All TypeScript errors resolved

### Documentation Created (Earlier Today)
- ✅ `projectbrief.md` - Complete project overview and requirements
- ✅ `productContext.md` - Product philosophy and user experience goals
- ✅ `systemPatterns.md` - Architecture and design patterns
- ✅ `techContext.md` - Technology stack and development setup
- ✅ `activeContext.md` - Current file (this document)
- ✅ `progress.md` - Progress tracking

### Design References Analyzed
All design files are located in the `designs/` folder:
- ✅ `designs/HomePage/` - HTML structure and layout reviewed
- ✅ `designs/ProjectComponent/` - Modal design analyzed
- ✅ `designs/AdminHome/` - Dashboard layout studied
- ✅ `designs/AdminProjects/` - Management page examined
- ✅ `designs/AdminProjectNewComponent/` - Modal form reviewed
- ✅ `designs/AdminProjectEditComponent/` - Editing interface analyzed

## Next Steps

### Immediate (Next Session)
1. ✅ Image management in edit mode (COMPLETED - Oct 30)
2. ✅ HomePage technology filter fix (COMPLETED - Oct 30)
3. ✅ ProjectDetailModal UX improvements (COMPLETED - Oct 30)
4. ✅ Backend service tests complete (COMPLETED - Oct 30)
5. 🔄 Frontend hook tests (IN PROGRESS)
   - ⏳ useProjects hook tests
   - ⏳ useAuth hook tests
   - ⏳ useAdminProjects hook tests
6. 🔄 Frontend component tests (IN PROGRESS)
   - ✅ Button component (30 tests, 100% coverage)
   - ⏳ Input component tests
   - ⏳ Modal component tests
   - ⏳ ProjectCard component tests
7. ⏳ Run Lighthouse audit
8. ⏳ Performance optimizations based on audit
9. ⏳ Prepare for deployment
10. ⏳ Initialize Git repository (optional)

### Short-term (Next 1-2 Weeks)
1. **Testing Suite**: 🔄 70% - HIGH PRIORITY
   - ✅ Jest setup for backend (COMPLETE)
   - ✅ Vitest setup for frontend (COMPLETE)
   - ✅ Backend service tests (138 tests, 99.23% coverage)
   - ✅ Frontend utility tests (50 tests, 100% coverage)
   - ✅ Button component tests (30 tests, 100% coverage)
   - 🔄 Frontend hook tests (IN PROGRESS)
   - ⏳ More component tests
   - ⏳ E2E tests with Playwright (optional)
   - Target: >80% code coverage

2. **Performance Optimization**: ⏳ 20% - MEDIUM PRIORITY
   - ⏳ Image lazy loading
   - ⏳ Cloudinary image transformations
   - ⏳ Bundle size optimization
   - ⏳ Lighthouse audit and fixes
   - Target: Lighthouse score >90

3. **Deployment Preparation**: ⏳ 0% - HIGH PRIORITY
   - ⏳ Set up production environment variables
   - ⏳ Configure production database
   - ⏳ Set up CI/CD pipeline
   - ⏳ Deploy backend to Railway/Render
   - ⏳ Deploy frontend to Vercel
   - ⏳ Set up monitoring (Sentry)

4. **Documentation**: ⏳ 30% - LOW PRIORITY
   - ✅ Memory Bank complete
   - ⏳ API documentation (Swagger/OpenAPI)
   - ⏳ User guide for admin panel
   - ⏳ Deployment documentation
   - ⏳ Contribution guidelines

---

*All medium-term and long-term goals from initial planning have been completed. See "Next Steps" section above for current priorities.*

## Active Decisions and Considerations

### Technology Decisions Made ✅
✅ **Frontend Framework**: Vite + React 18 + TypeScript (fast, modern)  
✅ **Styling**: Tailwind CSS v3 with dark mode  
✅ **Backend Framework**: Express.js + TypeScript  
✅ **Database**: PostgreSQL with Prisma ORM  
✅ **Image Storage**: Cloudinary (CDN, transformations)  
✅ **Authentication**: JWT with 30min expiry + auto-refresh  
✅ **State Management**: React Context + React Query (chosen)  
✅ **Routing**: React Router v6

### Decisions for Next Phase ⏳
⏳ **Testing Framework**: Vitest + React Testing Library + Playwright  
⏳ **Deployment Platform**: Railway (backend) + Vercel (frontend)  
⏳ **Monitoring**: Sentry for error tracking  
⏳ **CI/CD**: GitHub Actions

### Implementation Decisions Made ✅

#### Database Schema - IMPLEMENTED ✅
- ✅ **UUIDs** for all primary keys (better security, no enumeration)
- ✅ **Soft delete** with `deleted_at` field (allows recovery, audit trail)
- ✅ **`is_primary` flag** on project images (first image default)
- ✅ **Display order** for image sorting

#### Image Upload - IMPLEMENTED ✅
- ✅ **Backend → Cloudinary** flow (chosen for security)
- ✅ Multer for file handling
- ✅ Validation on backend (file type, size)
- ✅ Automatic cleanup on project deletion

#### Form Validation - IMPLEMENTED ✅
- ✅ **Client-side**: React Hook Form (no Zod, native validation)
- ✅ **Server-side**: Custom validation in controllers
- ✅ Both sides validate (never trust client)

#### Authentication Flow - IMPLEMENTED ✅
- ✅ **Access Token**: 30 minutes, stored in localStorage
- ✅ **Refresh Token**: 7 days, HttpOnly cookie
- ✅ **Auto-refresh**: Axios interceptor with queue system
- ✅ **Persistent Sessions**: Survives page reload (F5)
- ✅ **Logout**: Clear tokens and cookies

## Important Patterns and Preferences

### Code Style Preferences
- **Functional Components**: Always use function syntax, never class components
- **Hooks**: Prefer hooks over HOCs or render props
- **TypeScript**: Use strict mode, avoid `any` type
- **Naming**: 
  - Components: PascalCase (`ProjectCard.tsx`)
  - Functions: camelCase (`fetchProjects`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
  - Files: Match component/function name

### Component Structure
```tsx
// 1. Imports (React, libraries, types, components, styles)
import React, { useState } from 'react';
import axios from 'axios';
import { Project } from '@/types';
import { Button } from '@/components/ui/Button';

// 2. Types/Interfaces
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

// 3. Component
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  // 4. Hooks
  const [isHovered, setIsHovered] = useState(false);
  
  // 5. Event Handlers
  const handleClick = () => {
    onClick();
  };
  
  // 6. Render
  return (
    <div onClick={handleClick}>
      {/* JSX */}
    </div>
  );
};
```

### File Organization
```
frontend/
├── src/
│   ├── pages/           # React pages (public & admin)
│   ├── components/       # Reusable components
│   │   ├── ui/          # Basic UI components (Button, Input, etc.)
│   │   ├── layout/      # Layout components (Navbar, Footer, etc.)
│   │   └── features/    # Feature-specific components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions, API clients
│   ├── types/           # TypeScript types and interfaces
│   ├── constants/       # Constants and config
│   └── styles/          # Global styles, Tailwind config

backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Express middlewares
│   ├── models/          # Database models (if not using Prisma)
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── validators/      # Input validation schemas
│   └── types/           # TypeScript types
├── prisma/
│   ├── schema.prisma    # Prisma schema
│   ├── migrations/      # Database migrations
│   └── seed.ts          # Seed data
```

### Git Commit Convention
Using Conventional Commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add project filter by technology
fix: resolve image upload validation bug
docs: update API documentation
refactor: extract image upload logic to service
```

## Learnings and Project Insights

### Design Analysis Insights

From the provided HTML/CSS references, we learned:

1. **Color Application**:
   - Primary cyan (#06f9f9) used sparingly for accents (buttons, active states, icons)
   - Background dark (#0A1919) for main app background
   - Surface dark (#122B2B) for cards, panels, modals
   - Text hierarchy: #EAEAEA for headings, #A0B0B0 for body

2. **Spacing & Layout**:
   - Generous padding (p-6, p-8) for breathing room
   - Consistent gap values (gap-4, gap-6) for spacing
   - Max-width containers for readability (max-w-7xl)
   - Responsive grid: 1→2→3→4 columns

3. **Interactive Elements**:
   - Subtle hover states (bg-primary/5, bg-white/5)
   - Glow effect on primary buttons (shadow-[0_0_15px_rgba(6,249,249,0.3)])
   - Smooth transitions (transition-all duration-200)
   - Backdrop blur for modals (backdrop-blur-md)

4. **Typography**:
   - Monospace font (JetBrains Mono) for:
     - Branding (BilalAbic/DemoHub)
     - Project names
     - Dates
     - Technology tags
   - Display font (Inter) for:
     - Headings
     - Body text
     - UI elements

### API Design Insights

Based on requirements, our API structure:

1. **RESTful Conventions**:
   - Plural nouns for resources (`/projects`, `/technologies`)
   - Nested resources (`/projects/:id/images`)
   - Clear HTTP methods (GET, POST, PUT, DELETE)

2. **Response Format**:
   ```json
   {
     "success": true,
     "data": { ... },
     "message": "Project created successfully"
   }
   ```

3. **Error Format**:
   ```json
   {
     "success": false,
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "Invalid project data",
       "details": [
         { "field": "name", "message": "Name is required" }
       ]
     }
   }
   ```

### Database Design Insights

1. **Many-to-Many Relationships**:
   - Projects ←→ Technologies (a project can have many technologies, a technology can be used in many projects)
   - Projects ←→ Contributors (a project can have many contributors, a contributor can work on many projects)
   - Use junction tables with additional metadata if needed

2. **One-to-Many Relationships**:
   - Project ←→ Images (a project has many images, an image belongs to one project)
   - Include `display_order` for sorting
   - Include `is_primary` for featured image

3. **Indexing Strategy**:
   - Index on foreign keys (project_id, technology_id)
   - Index on frequently queried fields (created_at, is_published)
   - Composite index on junction tables

### Performance Insights

1. **Image Optimization**:
   - Use Cloudinary transformations in URLs
   - Lazy load images below the fold
   - Use WebP format with JPEG fallback
   - Implement blur-up loading effect

2. **Bundle Optimization**:
   - Code split by route (Vite + React Router automatic)
   - Lazy load admin panel (not needed on public pages)
   - Tree-shake unused Tailwind classes

3. **Caching Strategy**:
   - Static pages: Cache-Control headers
   - API responses: React Query caching
   - Images: CDN caching (Cloudinary)
   - Frequently accessed data: Redis (future)

## Current Blockers

### None at Present
Currently in planning phase with all required information available.

### Potential Future Blockers
- **Cloudinary Account**: Need to create account and get credentials
- **PostgreSQL Setup**: May need Docker or local installation
- **Deployment**: Need to set up accounts on Vercel/Railway/Render
- **Domain Name**: If custom domain desired

## Questions to Resolve

### For User/Stakeholder
1. Should there be a "draft" mode for projects (unpublished)?
2. Do we need user roles beyond admin (e.g., editor, viewer)?
3. Should there be analytics tracking for project views?
4. Is a search feature needed in addition to filtering?
5. Should projects have categories/tags beyond technologies?

### Technical Questions
1. Maximum number of projects expected? (affects pagination, caching strategy)
2. Expected traffic volume? (affects hosting tier selection)
3. Budget for cloud services? (Cloudinary, hosting, database)
4. Need for automated backups? (database backup strategy)
5. Multi-language support needed? (i18n setup)

## Resources and References

### Documentation References
- Vite Docs: https://vitejs.dev/guide/
- React Docs: https://react.dev
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Prisma Docs: https://www.prisma.io/docs
- React Query Docs: https://tanstack.com/query
- Cloudinary Docs: https://cloudinary.com/documentation

### Design References
- Material Symbols: https://fonts.google.com/icons
- Google Fonts: https://fonts.google.com
- Color Palette: Custom (defined in projectbrief.md)

### Code References
- Provided HTML files in project folders
- Design screenshots in project folders

## Notes for Future Self

### When Resuming Work
1. Read through all Memory Bank files to get context
2. Check `progress.md` for current status
3. Review `activeContext.md` (this file) for recent changes
4. Look at Git commits for what was last worked on
5. Check TODOs in code for pending tasks

### Key Things to Remember
- Primary color #06f9f9 is used sparingly (accents only)
- All dates in monospace font
- Modals use backdrop-blur for glassmorphism
- Admin panel has sidebar + main content layout
- Public pages have sticky navbar with filters
- Always validate input on both client and server
- Images go through backend to Cloudinary (not direct upload)
- Use UUIDs for IDs (decided above)
- Soft delete for projects (allows recovery)
- Responsive breakpoints: sm:640, md:768, lg:1024, xl:1280, 2xl:1536

### Common Pitfalls to Avoid
- Don't use `any` type in TypeScript (use proper types)
- Don't skip validation (always validate server-side)
- Don't expose Cloudinary credentials in frontend
- Don't forget to handle loading/error states
- Don't skip accessibility (ARIA labels, keyboard nav)
- Don't commit environment variables (.env in .gitignore)
- Don't hardcode URLs (use environment variables)
- Don't forget to optimize images (lazy loading + Cloudinary transformations)

## Communication Preferences

### Code Comments
- Add comments for complex logic
- Document function parameters with JSDoc
- Explain "why" not "what" (code shows what)

### Documentation Updates
- Update Memory Bank when architecture changes
- Document API changes in API docs
- Keep README up to date with setup steps
- Add inline code comments for business logic

### Collaboration
- Create feature branches for all new work
- Write descriptive commit messages
- Open PRs for review (even if solo project - good practice)
- Keep PRs focused and small when possible

