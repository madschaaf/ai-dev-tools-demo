# PostgreSQL Database Setup Guide

Complete guide for setting up and using the PostgreSQL database for AI Dev Tools step management.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Installation](#database-installation)
3. [Project Setup](#project-setup)
4. [Database Initialization](#database-initialization)
5. [API Endpoints](#api-endpoints)
6. [Usage Examples](#usage-examples)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js** v18 or higher
- **PostgreSQL** v14 or higher
- **npm** or **yarn**

---

## Database Installation

### macOS (using Homebrew)

```bash
# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14

# Create database
createdb ai_dev_tools
```

### Windows

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Open pgAdmin or command prompt and create database:

```sql
CREATE DATABASE ai_dev_tools;
```

### Linux (Ubuntu/Debian)

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb ai_dev_tools
```

---

## Project Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `pg` - PostgreSQL client
- `@types/pg` - TypeScript types

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_dev_tools
DB_USER=postgres
DB_PASSWORD=your_actual_password

# Server Configuration
PORT=3000
```

### 3. Verify Database Connection

Test your database connection:

```bash
psql -h localhost -U postgres -d ai_dev_tools
```

If successful, you should see:
```
ai_dev_tools=#
```

Type `\q` to exit.

---

## Database Initialization

### Automatic Initialization

The database schema is automatically initialized when you start the server:

```bash
npm start
```

You should see:
```
Initializing database...
✓ Database schema initialized
✓ Connected to PostgreSQL database
Server listening on http://localhost:3000
```

### Manual Initialization

If you need to manually run the schema:

```bash
psql -h localhost -U postgres -d ai_dev_tools -f src/server/db/schema.sql
```

---

## API Endpoints

Base URL: `http://localhost:3000/api/steps`

### Steps Management

#### Get All Steps
```http
GET /api/steps
GET /api/steps?status=approved
GET /api/steps?category=install
GET /api/steps?search=node
GET /api/steps?tags=javascript,nodejs
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Install Node.js",
      "brief_description": "Install Node.js runtime",
      "detailed_content": [...],
      "tags": ["nodejs", "javascript"],
      "category": "install",
      "status": "approved",
      "created_by": "AI Team",
      "created_at": "2026-01-23T...",
      ...
    }
  ]
}
```

#### Get Step by ID
```http
GET /api/steps/:id
```

#### Create Step
```http
POST /api/steps
Content-Type: application/json

{
  "title": "Install Python",
  "brief_description": "Install Python 3.x runtime",
  "detailed_content": [
    {
      "id": "step1",
      "type": "text",
      "text": "Download Python from python.org"
    }
  ],
  "category": "install",
  "tags": ["python", "runtime"],
  "created_by": "John Doe"
}
```

#### Update Step
```http
PUT /api/steps/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "modified_by": "Jane Smith"
}
```

#### Delete Step
```http
DELETE /api/steps/:id
```

### Approval Workflow

#### Approve Step
```http
POST /api/steps/:id/approve
Content-Type: application/json

{
  "approved_by": "Alex Ali",
  "use_case_ids": ["UC001", "UC002"]
}
```

#### Reject Step
```http
POST /api/steps/:id/reject
Content-Type: application/json

{
  "rejected_by": "Mike Jones",
  "reason": "Missing prerequisites information"
}
```

### Comments

#### Get Comments
```http
GET /api/steps/:id/comments
```

#### Add Comment
```http
POST /api/steps/:id/comments
Content-Type: application/json

{
  "user_id": "user123",
  "user_name": "John Doe",
  "content": "This step needs more details",
  "line_number": 5
}
```

### History

#### Get Step History
```http
GET /api/steps/:id/history
```

---

## Usage Examples

### Example 1: Creating a Step with Content Editing

```typescript
// Create a new step
const newStep = {
  title: "Install Chrome",
  brief_description: "Install Google Chrome browser",
  detailed_content: [
    {
      id: "intro",
      type: "text",
      text: "Download and install Google Chrome"
    },
    {
      id: "windows",
      type: "code",
      code: "winget install Google.Chrome",
      language: "bash",
      copyToClipboard: true
    }
  ],
  category: "install",
  tags: ["browser", "chrome"],
  created_by: "AI Team",
  estimated_time: 5,
  difficulty_level: "beginner"
};

// POST to API
const response = await fetch('http://localhost:3000/api/steps', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newStep)
});

const result = await response.json();
console.log('Created step:', result.data);
```

### Example 2: Updating Step Content

```typescript
// Update step with edited content
const updatedContent = [
  {
    id: "intro",
    type: "text",
    text: "Updated instructions"
  },
  {
    id: "new-step",
    type: "warning",
    text: "Important: Requires admin access"
  }
];

const response = await fetch(`http://localhost:3000/api/steps/${stepId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    detailed_content: updatedContent,
    modified_by: "John Doe"
  })
});
```

### Example 3: Querying Steps

```typescript
// Get all approved install steps
const response = await fetch(
  'http://localhost:3000/api/steps?status=approved&category=install'
);
const { data: steps } = await response.json();

// Filter by tags
const nodeSteps = await fetch(
  'http://localhost:3000/api/steps?tags=nodejs,javascript'
);

// Search steps
const searchResults = await fetch(
  'http://localhost:3000/api/steps?search=python'
);
```

---

## Database Schema

### Tables

1. **steps** - Main steps table
2. **step_comments** - Comments on steps
3. **step_history** - Audit trail
4. **step_approvals** - Approval records

### Key Features

- **UUID primary keys** - Globally unique identifiers
- **JSONB content** - Flexible content storage
- **Array support** - Tags, prerequisites, IDE lists
- **Timestamps** - Automatic creation/update tracking
- **Cascading deletes** - Related data cleanup
- **Indexes** - Performance optimization

---

## Troubleshooting

### Connection Issues

**Problem:** Cannot connect to database

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions:**
1. Check if PostgreSQL is running:
   ```bash
   # macOS
   brew services list | grep postgresql
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Verify credentials in `.env` file
3. Check if database exists:
   ```bash
   psql -l | grep ai_dev_tools
   ```

### Schema Initialization Errors

**Problem:** Tables already exist

**Solution:** Drop and recreate (⚠️ THIS DELETES ALL DATA):
```sql
DROP DATABASE ai_dev_tools;
CREATE DATABASE ai_dev_tools;
```

Then restart the server to re-initialize.

### TypeScript Errors

**Problem:** Cannot find module 'pg'

**Solution:**
```bash
npm install
# or
npm install pg @types/pg
```

### Port Already in Use

**Problem:** Port 3000 is already in use

**Solution:** Change port in `.env`:
```env
PORT=3001
```

---

## Next Steps

1. **Install PostgreSQL** and create the database
2. **Configure `.env`** with your credentials  
3. **Run `npm install`** to install dependencies
4. **Run `npm start`** to start the server
5. **Test API** with the examples above

For more information, see:
- [Steps Database Schema](./STEPS_DATABASE_SCHEMA.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Development Guide](./DEVELOPMENT.md)

---

## Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review server logs for error messages
3. Verify database connection with `psql`
4. Contact the development team
