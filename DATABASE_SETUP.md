# Neon PostgreSQL Database Integration Guide

## ✅ Setup Complete

Your Creatzy project now has a fully configured Neon PostgreSQL database with Prisma ORM. Here's what has been set up:

---

## 📁 Project Structure

```
agency/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   ├── seed.ts                # Database seed script (for initial data)
│   └── migrations/            # Auto-generated migration files
├── src/
│   ├── generated/             # Auto-generated Prisma client (git-ignored)
│   ├── lib/
│   │   └── db.ts              # Reusable database utility with singleton pattern
│   └── app/
│       └── api/
│           └── health/
│               └── route.ts   # Health check endpoint (/api/health)
├── .env.local                 # Local environment with DATABASE_URL
├── .env.example               # Template for environment variables
└── prisma.config.ts           # Prisma configuration
```

---

## 🔧 Environment Setup

### `.env.local` (Already Configured)
```env
DATABASE_URL=postgresql://neondb_owner:npg_hEC1ISMvPyB0@ep-long-boat-aomsigwh.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

### `.env.example` (Template)
```env
DATABASE_URL=
NODE_ENV=development
```

⚠️ **Security Note:** Never commit `.env.local` to version control. It's already in `.gitignore`.

---

## 📊 Database Schema

### Models Configured:

1. **User** - Main user model
   - id, email, name, password, role, image
   - Relationships: profile, sessions, posts

2. **Profile** - Extended user information
   - bio, location, website, phone, skills, experience, education

3. **Session** - Authentication sessions
   - sessionToken, userId, expires

4. **Post** - Content/blog posts
   - title, content, published, userId

### Future Models (Commented):
- **Job** - Job listings
- **Application** - Job applications

---

## 🛠️ Available Commands

### Database Operations
```bash
# Create and run migrations (creates database tables)
npm run db:migrate

# Push schema to database (without migrations)
npm run db:push

# Populate database with seed data
npm run db:seed

# Open Prisma Studio (visual database browser)
npm run db:studio

# Validate schema
npm run db:check

# Build project (includes Prisma generate)
npm run build

# Development mode
npm run dev
```

---

## 💾 Database Utility (`src/lib/db.ts`)

### Features:
- ✅ Singleton pattern (reusable client, prevents multiple instances)
- ✅ Error handling with specific error messages
- ✅ Connection validation
- ✅ Health checks for monitoring
- ✅ Safe database operations wrapper
- ✅ Graceful shutdown handling

### Usage Examples:

**Basic Usage:**
```typescript
import prisma from '@/lib/db';

// Get users
const users = await prisma.user.findMany();

// Create user
const newUser = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'User Name'
  }
});
```

**With Error Handling:**
```typescript
import { safeDbOperation } from '@/lib/db';

const users = await safeDbOperation(
  () => prisma.user.findMany(),
  'Fetching users'
);
```

**Health Check:**
```typescript
import { healthCheck } from '@/lib/db';

const status = await healthCheck();
console.log(status); // { status: 'healthy' | 'unhealthy', timestamp, message }
```

---

## 📡 Health Check API

### Endpoint: `GET /api/health`

**Response (Healthy):**
```json
{
  "status": "online",
  "database": {
    "status": "healthy",
    "timestamp": "2026-05-17T10:30:00Z",
    "message": "Database connection is healthy"
  },
  "timestamp": "2026-05-17T10:30:00Z"
}
```

**Response (Error):**
```json
{
  "status": "error",
  "message": "Connection refused",
  "timestamp": "2026-05-17T10:30:00Z"
}
```

---

## 🌱 Database Seeding

The seed script (`prisma/seed.ts`) creates initial test data.

**Default Seed Data:**
- Test User: test@example.com (USER role)
- Recruiter User: recruiter@example.com (RECRUITER role)

**To run seed:**
```bash
npm run db:seed
```

**To customize seed data:**
Edit `prisma/seed.ts` and modify the user creation logic.

---

## 🔐 Security Checklist

✅ Environment variables in `.env.local` and `.gitignore`
✅ Database URL uses SSL mode (`sslmode=require`)
✅ Prisma client auto-disconnects on process termination
✅ Error handling prevents exposing sensitive info
✅ Connection pooling (single reusable instance)

### Production Considerations:
- Set `NODE_ENV=production` in production
- Use strong passwords for database user
- Enable Connection Pooling on Neon dashboard
- Monitor query logs in Prisma Studio
- Set up database backups

---

## 🚀 Next Steps

### 1. Run Initial Migrations
```bash
npm run db:migrate
```
This creates tables in your Neon database.

### 2. Seed Database (Optional)
```bash
npm run db:seed
```
This populates with test data.

### 3. Test Connection
```bash
npm run dev
# Visit http://localhost:3000/api/health
```

### 4. Start Using Prisma
```typescript
// In any API route or server component
import prisma from '@/lib/db';

const users = await prisma.user.findMany();
```

### 5. Add More Models
Edit `prisma/schema.prisma` and run:
```bash
npm run db:migrate
```

---

## 📚 Useful Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Next.js + Prisma Guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/next-js-node-sql)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

---

## ❓ Troubleshooting

### "Cannot connect to database"
- Check `.env.local` has correct CONNECTION_URL
- Verify Neon project is active
- Check network connectivity to Neon servers

### "Generated Prisma client not found"
```bash
npx prisma generate
```

### "Relations or models not found"
- Update schema in `prisma/schema.prisma`
- Run migrations: `npm run db:migrate`

### "Type errors with PrismaClient"
- Delete `/src/generated` folder
- Run: `npm run build` (includes generate)

---

## 📋 Example: Creating a User API Route

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Create user failed:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
```

---

**All set! Your database is production-ready.** 🎉
