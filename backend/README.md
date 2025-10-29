# DemoHub Backend API

Backend API for DemoHub Portfolio Management System.

## Tech Stack

- **Runtime:** Node.js 18+ (LTS)
- **Framework:** Express.js 4+
- **Language:** TypeScript 5+
- **Database:** PostgreSQL 15+
- **ORM:** Prisma 5+
- **Authentication:** JWT (jsonwebtoken)
- **Image Storage:** Cloudinary
- **Validation:** Express Validator

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 15.0 (or Docker)
- npm >= 9.0.0

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Database (Docker)

```bash
docker-compose up -d postgres
```

Or use your local PostgreSQL installation and update the `DATABASE_URL` in `.env`.

### 4. Run Database Migrations

```bash
npm run prisma:migrate
```

### 5. (Optional) Seed Database

```bash
npm run prisma:seed
```

### 6. Start Development Server

```bash
npm run dev
```

The API will be running at `http://localhost:4000`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (DB GUI) |
| `npm run prisma:seed` | Seed database with sample data |

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts            # Seed data
├── src/
│   ├── config/            # Configuration files
│   │   └── database.ts    # Prisma client
│   ├── controllers/       # Route controllers (coming soon)
│   ├── middlewares/       # Express middlewares
│   │   ├── errorHandler.ts
│   │   └── notFoundHandler.ts
│   ├── routes/            # API routes (coming soon)
│   ├── services/          # Business logic (coming soon)
│   ├── utils/             # Helper functions (coming soon)
│   ├── validators/        # Input validation (coming soon)
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   └── server.ts          # Express app entry point
├── .env.example           # Environment variables template
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .gitignore            # Git ignore rules
├── docker-compose.yml    # Docker services
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_*` - Cloudinary credentials
- `CORS_ORIGIN` - Allowed frontend origin

## Database Schema

See `prisma/schema.prisma` for the complete database schema.

Main tables:
- **projects** - Project information
- **technologies** - Available technologies
- **project_technologies** - Many-to-many relation
- **contributors** - Project contributors
- **project_contributors** - Many-to-many relation
- **project_images** - Project image gallery
- **admin_activities** - Activity logs
- **admins** - Admin users

## API Endpoints (Coming Soon)

### Public Endpoints
- `GET /api/projects` - List all published projects
- `GET /api/projects/:id` - Get single project
- `GET /api/technologies` - List all technologies

### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/projects` - List all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `POST /api/admin/projects/:id/images` - Upload image
- `DELETE /api/admin/projects/:id/images/:imageId` - Delete image

## Development Tools

### Prisma Studio
Visual database browser:
```bash
npm run prisma:studio
```
Opens at `http://localhost:5555`

### pgAdmin (Docker)
Database management interface:
```bash
docker-compose up -d pgadmin
```
Opens at `http://localhost:5050`
- Email: admin@demohub.com
- Password: admin123

## Docker Services

```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d postgres

# Stop all services
docker-compose down

# View logs
docker-compose logs -f postgres
```

## Code Style

- **ESLint:** Airbnb base config with TypeScript
- **Prettier:** Enforced code formatting
- **TypeScript:** Strict mode enabled

## Best Practices

1. **Type Safety:** Always use proper TypeScript types
2. **Error Handling:** Use try-catch and error middleware
3. **Validation:** Validate all inputs (client + server)
4. **Security:** Sanitize inputs, use helmet, implement rate limiting
5. **Logging:** Use appropriate log levels
6. **Comments:** Document complex logic

## Troubleshooting

### Database Connection Issues
- Check if PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Ensure database exists

### Prisma Issues
```bash
# Reset database and migrations
npm run prisma:migrate reset

# Regenerate Prisma Client
npm run prisma:generate
```

### Port Already in Use
```bash
# Find process using port 4000
npx kill-port 4000
```

## License

MIT - See LICENSE file for details

## Developer

Bilal Abic - [GitHub](https://github.com/bilalabic)

