# System Patterns: DemoHub Architecture

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Public     │  │    Admin     │  │   Shared     │  │
│  │   Pages      │  │    Panel     │  │  Components  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         Vite + React 18 + Tailwind CSS                  │
└─────────────────────────────────────────────────────────┘
                         ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────┐
│                   API LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Public API  │  │  Admin API   │  │    Auth      │  │
│  │  Endpoints   │  │  Endpoints   │  │  Middleware  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         Node.js + Express.js                            │
└─────────────────────────────────────────────────────────┘
                         ↕ ORM (Prisma/TypeORM)
┌─────────────────────────────────────────────────────────┐
│                  DATA LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  PostgreSQL  │  │   Cloudinary │  │    Redis     │  │
│  │   Database   │  │  Image Store │  │  (Sessions)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Key Technical Decisions

### Frontend Architecture

**Decision: React.js with Tailwind CSS**
- **Why**: Component-based architecture for reusability, Tailwind for rapid UI development
- **Alternative Considered**: Vue.js, vanilla JS
- **Trade-off**: Learning curve vs development speed

**Decision: Client-Side Routing**
- **Why**: SPA experience for admin panel, smooth transitions
- **Implementation**: React Router v6
- **Trade-off**: SPA for simplicity; SEO can be added later with SSR if needed

**Decision: State Management**
- **Global State**: React Context for auth state
- **Server State**: React Query for API data caching
- **Local State**: useState for component-level state
- **Why**: Right tool for each use case, avoid over-engineering

### Backend Architecture

**Decision: RESTful API Design**
- **Why**: Simple, widely understood, easy to consume
- **Alternative Considered**: GraphQL
- **Trade-off**: Over-fetching vs complexity

**Decision: PostgreSQL Database**
- **Why**: Relational data (projects, technologies, images), ACID compliance
- **Alternative Considered**: MongoDB
- **Trade-off**: Schema flexibility vs data integrity

**Decision: ORM (Prisma or TypeORM)**
- **Why**: Type safety, migrations, query builder
- **Benefit**: Prevents SQL injection, cleaner code
- **Trade-off**: Performance overhead minimal for this scale

### Authentication & Security

**Decision: JWT-based Authentication**
- **Why**: Stateless, scalable, works well with SPA
- **Implementation**: Access tokens + refresh tokens
- **Storage**: HttpOnly cookies for security

**Decision: Role-Based Access Control (RBAC)**
- **Current**: Single admin role
- **Future**: Can extend to multiple roles (editor, viewer)
- **Why**: Scalable security model

## Design Patterns in Use

### Frontend Patterns

#### 1. **Component Composition Pattern**
```
<ProjectCard>
  <ProjectImage />
  <ProjectInfo>
    <ProjectTitle />
    <ProjectDescription />
    <TechnologyBadges />
  </ProjectInfo>
  <ProjectActions />
</ProjectCard>
```

**Why**: Reusable, testable, maintainable components

#### 2. **Container/Presentational Pattern**
- **Containers**: Handle logic and state (HomePage, AdminProjects)
- **Presentational**: Pure UI components (Button, Card, Input)
- **Benefit**: Separation of concerns, easier testing

#### 3. **Modal Pattern**
- **ProjectComponent**: Overlay modal for project details
- **AdminProjectNewComponent**: Form modal for adding projects
- **AdminProjectEditComponent**: Form modal for editing
- **Implementation**: Portal for overlay, ESC/click-outside to close

#### 4. **Custom Hooks Pattern**
```javascript
useProjects() // Fetch and cache projects
useAuth() // Handle authentication state
useModal() // Modal open/close state
useImageUpload() // Image upload logic
```

**Why**: Reusable logic, cleaner components

### Backend Patterns

#### 1. **Repository Pattern**
```
ProjectRepository
  - findAll()
  - findById()
  - create()
  - update()
  - delete()
  - findByTechnology()
```

**Why**: Data access abstraction, easier testing, swappable data source

#### 2. **Service Layer Pattern**
```
ProjectService
  - getAllProjects()
  - getProjectById()
  - createProject()
  - updateProject()
  - deleteProject()
  - addProjectImage()
```

**Why**: Business logic separation from routes/controllers

#### 3. **Middleware Pattern**
```
Request → Auth Middleware → Validation Middleware → Route Handler → Response
```

**Middleware Chain**:
- `authMiddleware`: Verify JWT, attach user to request
- `validationMiddleware`: Validate request body/params
- `errorMiddleware`: Centralized error handling
- `rateLimitMiddleware`: Prevent abuse

#### 4. **DTO (Data Transfer Object) Pattern**
```javascript
CreateProjectDTO {
  name: string
  description: string
  startDate: Date
  endDate?: Date
  technologies: string[]
  contributors: string[]
  demoUrl?: string
  githubUrl?: string
}
```

**Why**: Type safety, validation, API contract clarity

### Database Patterns

#### 1. **Junction Tables for Many-to-Many**
```
Projects ←→ Project_Technologies ←→ Technologies
Projects ←→ Project_Contributors ←→ Contributors
```

**Why**: Proper relational modeling, data integrity

#### 2. **Soft Delete Pattern** (Optional)
```sql
projects {
  ...
  deleted_at: TIMESTAMP NULL
}
```

**Why**: Recoverable deletes, audit trail

#### 3. **Timestamp Pattern**
```sql
created_at: TIMESTAMP DEFAULT NOW()
updated_at: TIMESTAMP DEFAULT NOW()
```

**Why**: Audit trail, sorting, debugging

## Component Relationships

### Public Side Component Tree

```
App
├── HomePage
│   ├── Navbar
│   │   ├── Logo
│   │   └── TechnologyFilters
│   ├── PageHeader
│   ├── ProjectGrid
│   │   └── ProjectCard[] (multiple)
│   │       ├── ProjectImage
│   │       ├── ProjectTitle
│   │       ├── ProjectDescription
│   │       └── TechnologyBadges
│   ├── Pagination
│   └── Footer
└── ProjectComponent (Modal)
    ├── ModalOverlay
    ├── ModalContent
    │   ├── CloseButton
    │   ├── ImageGallery
    │   │   ├── MainImage
    │   │   ├── NavigationArrows
    │   │   └── ThumbnailGrid
    │   ├── ProjectDetails
    │   │   ├── ProjectTitle
    │   │   ├── DateRange
    │   │   ├── Description
    │   │   ├── TechnologiesSection
    │   │   ├── ContributorsSection
    │   │   └── ActionButtons (Live Demo, GitHub)
```

### Admin Side Component Tree

```
AdminApp
├── AdminLayout
│   ├── Sidebar
│   │   ├── Logo
│   │   ├── Navigation
│   │   │   ├── DashboardLink
│   │   │   ├── ProjectsLink
│   │   │   └── SettingsLink
│   │   └── LogoutButton
│   └── MainContent
│       ├── Header
│       │   ├── PageTitle
│       │   ├── NotificationBell
│       │   └── UserAvatar
│       └── ContentArea
│           ├── AdminHome (Dashboard)
│           │   ├── StatsCards
│           │   │   ├── TotalProjectsCard
│           │   │   ├── PendingTasksCard
│           │   │   └── ServerStatusCard
│           │   └── ActivityTable
│           ├── AdminProjects
│           │   ├── SectionHeader
│           │   │   └── AddProjectButton
│           │   └── ProjectsTable
│           │       └── ProjectRow[]
│           │           ├── ProjectInfo
│           │           ├── DateInfo
│           │           ├── TechnologyBadges
│           │           ├── Links
│           │           └── Actions (Edit, Delete)
│           ├── AdminProjectNewComponent (Modal)
│           │   ├── ModalHeader
│           │   ├── ProjectForm
│           │   │   ├── TextInputs
│           │   │   ├── DateInputs
│           │   │   ├── TechnologyInput
│           │   │   ├── ContributorsInput
│           │   │   ├── URLInputs
│           │   │   └── ImageUpload
│           │   └── ModalFooter (Cancel, Submit)
│           └── AdminProjectEditComponent (Modal)
│               ├── ModalHeader
│               ├── EditForm (Left Column)
│               │   └── [Same as ProjectForm]
│               ├── ImageGallery (Right Column)
│               │   ├── ExistingImages[]
│               │   │   ├── ImagePreview
│               │   │   ├── DragHandle
│               │   │   └── DeleteButton
│               │   └── UploadNewButton
│               └── ModalFooter (Cancel, Save)
```

## Critical Implementation Paths

### 1. **Project Display Flow**

```
User visits / → HomePage Component
  ↓
Fetch GET /api/projects → Backend
  ↓
Query database with filters → PostgreSQL
  ↓
Return projects with images → Frontend
  ↓
Render ProjectGrid with ProjectCards
  ↓
User clicks card → Open ProjectComponent Modal
  ↓
Display full project details
```

### 2. **Project Creation Flow**

```
Admin clicks "Add Project" → Open AdminProjectNewComponent Modal
  ↓
Admin fills form and uploads images
  ↓
Form validation (client-side)
  ↓
Submit POST /api/admin/projects → Backend
  ↓
Auth middleware verifies JWT
  ↓
Validation middleware checks data
  ↓
Upload images to Cloudinary
  ↓
Create database records (transaction)
  ↓
Return success → Frontend
  ↓
Close modal, refresh project list
  ↓
Show success notification
```

### 3. **Image Management Flow**

```
Admin edits project → Open AdminProjectEditComponent
  ↓
Display existing images in grid
  ↓
Admin drags to reorder → Update display_order locally
  ↓
Admin clicks delete → Confirm dialog
  ↓
DELETE /api/admin/projects/:id/images/:imageId
  ↓
Delete from Cloudinary
  ↓
Delete from database
  ↓
Update UI
  ↓
Admin uploads new image
  ↓
POST /api/admin/projects/:id/images
  ↓
Upload to Cloudinary
  ↓
Save URL to database
  ↓
Add to image gallery
  ↓
Admin clicks "Save Changes"
  ↓
PUT /api/admin/projects/:id/images/reorder
  ↓
Update display_order in database
  ↓
Success response
```

### 4. **Authentication Flow**

```
Admin enters credentials → Login form
  ↓
POST /api/admin/login
  ↓
Validate credentials
  ↓
Generate JWT token (access + refresh)
  ↓
Set HttpOnly cookie
  ↓
Return user data
  ↓
Store user in context
  ↓
Redirect to dashboard
  ↓
All admin requests include cookie
  ↓
Auth middleware verifies token
  ↓
Attach user to request
  ↓
Proceed to route handler
```

## State Management Strategy

### Global State (React Context)
- **Authentication**: User object, login status, logout function
- **Theme**: Dark/light mode (future feature)

### Server State (React Query)
- **Projects**: Cached, auto-refetch on window focus
- **Dashboard Stats**: Cached with 5-minute stale time
- **Activities**: Auto-refetch on interval

### Local Component State
- **Modals**: Open/close state
- **Forms**: Input values, validation errors
- **UI**: Loading states, selected items, filters

### URL State (React Router)
- **Current Page**: Pagination state
- **Active Filter**: Technology filter
- **Selected Project**: ID for direct linking

## Error Handling Strategy

### Frontend
- **Network Errors**: Retry with exponential backoff
- **Validation Errors**: Display inline next to fields
- **Server Errors**: Toast notification with friendly message
- **404 Errors**: Show "Project not found" message

### Backend
- **Validation Errors**: 400 with field-specific errors
- **Auth Errors**: 401 Unauthorized
- **Permission Errors**: 403 Forbidden
- **Not Found**: 404 with resource info
- **Server Errors**: 500 with generic message (log details)

### Database
- **Connection Errors**: Retry connection, fallback to error page
- **Transaction Failures**: Rollback, return error
- **Constraint Violations**: Return user-friendly message

## Performance Optimization Patterns

### Frontend
- **Code Splitting**: Lazy load admin routes
- **Image Optimization**: WebP format, responsive images
- **Memoization**: React.memo for expensive components
- **Virtualization**: For large project lists (future)
- **Debouncing**: Search input, filter changes

### Backend
- **Database Indexing**: On frequently queried fields
- **Query Optimization**: Select only needed fields
- **Caching**: Redis for frequently accessed data
- **Pagination**: Limit query results
- **Rate Limiting**: Prevent API abuse

### Images
- **CDN**: Cloudinary for fast delivery
- **Lazy Loading**: Images below fold
- **Progressive Loading**: Blur-up technique
- **Compression**: Automatic via Cloudinary
- **Responsive Images**: Multiple sizes for different screens

