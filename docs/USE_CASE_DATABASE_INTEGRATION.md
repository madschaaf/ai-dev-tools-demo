# Use Case Database Integration

## Overview
The Use Case Prototype page has been connected to the PostgreSQL database, allowing dynamic steps and use case data to be persisted. This document outlines the complete integration architecture.

## Database Schema

### Tables Created

#### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  is_ai_team_member BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose**: Store user information including whether they are AI team members.

#### 2. Use Cases Table
```sql
CREATE TABLE use_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  
  -- Optional relations
  step_ids TEXT[] DEFAULT '{}',
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Metadata
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  
  -- Additional fields
  estimated_duration INTEGER,
  difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  prerequisites TEXT[] DEFAULT '{}'
);
```

**Purpose**: Store use case information with optional relationships to users and steps.

#### 3. Steps Table (Pre-existing, Updated)
Stores pre-configured setup steps that can be associated with use cases.

## Backend Architecture

### Service Layer

#### UseCasesService (`src/server/db/useCasesService.ts`)
Handles all database operations for use cases:

**Methods**:
- `createUseCase(useCaseData)`: Create a new use case
- `getUseCaseById(id)`: Retrieve a specific use case
- `getUseCases(filters)`: Get all use cases with optional filtering
- `updateUseCase(id, useCaseData)`: Update an existing use case
- `deleteUseCase(id)`: Delete a use case
- `getUseCaseWithSteps(id)`: Get a use case with associated step details

### API Routes

#### POST /api/use-cases
**Purpose**: Submit a new use case

**Request Body**:
```json
{
  "name": "Use case title",
  "leadName": "John Doe",
  "briefOverview": "Description of the use case",
  "businessUnit": "Global Technology",
  "categories": ["AI", "Development"],
  "searchTags": ["automation", "workflow"],
  "generatedSteps": [
    {
      "stepId": "step-uuid-1",
      "title": "Step title",
      "description": "Step description"
    }
  ],
  "estimatedTime": "30",
  "prerequisites": ["Node.js", "Git"]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Use case submitted successfully",
  "data": {
    "id": "uuid",
    "status": "draft",
    "title": "Use case title",
    "created_at": "2026-01-23T08:00:00.000Z"
  }
}
```

#### GET /api/use-cases
**Purpose**: Retrieve all use cases

**Query Parameters**:
- `status`: Filter by status (draft/published/archived)
- `category`: Filter by category
- `user_id`: Filter by user

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Use case title",
      "description": "Description",
      "category": "Global Technology",
      "tags": ["AI", "Development"],
      "status": "draft",
      "created_at": "2026-01-23T08:00:00.000Z"
    }
  ]
}
```

#### GET /api/use-cases/:id
**Purpose**: Retrieve a specific use case

**Query Parameters**:
- `includeSteps=true`: Include associated step details

**Response**:
```json
{
  "success": true,
  "data": {
    "useCase": {
      "id": "uuid",
      "title": "Use case title",
      "step_ids": ["step-1", "step-2"]
    },
    "steps": [
      {
        "id": "step-1",
        "title": "Install Node.js",
        "brief_description": "Install Node.js runtime"
      }
    ]
  }
}
```

#### PUT /api/use-cases/:id
**Purpose**: Update a use case

**Request Body**: Same fields as POST, all optional

#### DELETE /api/use-cases/:id
**Purpose**: Delete a use case

## Frontend Integration

### Data Mapping

The frontend form data is mapped to the database schema:

| Frontend Field | Database Field | Notes |
|---------------|----------------|-------|
| `name` | `title` | Use case name |
| `briefOverview` | `description` | Main description |
| `businessUnit` | `category` | Business unit category |
| `categories` + `searchTags` | `tags` | Combined array |
| `leadName` | `created_by` | Creator name |
| `generatedSteps` | `step_ids` | Array of step UUIDs |
| `estimatedTime` | `estimated_duration` | Converted to integer (minutes) |

### Submission Flow

1. User fills out the Use Case Prototype form
2. User clicks "Submit Use Case" → Shows preview
3. User reviews preview
4. User clicks "Submit for Approval"
5. Frontend calls `POST /api/use-cases` with form data
6. Backend maps data and saves to database
7. Returns success response with use case ID
8. Frontend shows success message with submission ID

## Database Setup Instructions

### Prerequisites
- PostgreSQL 12+ installed
- Database connection configured in `.env`

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ai_dev_tools
```

### Initialize Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ai_dev_tools;

# Run schema
\c ai_dev_tools
\i src/server/db/schema.sql
```

### Verify Tables
```sql
\dt  -- List tables
SELECT * FROM use_cases LIMIT 5;
```

## Models Structure

### Type Definitions
Located in `src/server/db/models/`:

- **user.ts**: User model with isAITeamMember field
- **step.ts**: Step model (pre-existing)
- **useCase.ts**: Use case model with optional relations
- **index.ts**: Central export point

### Helper Functions

Each model includes:
- `rowTo[Model]`: Convert database row to model
- `[model]ToInsertData`: Prepare model data for insertion

Example:
```typescript
import { UseCase, rowToUseCase, useCaseToInsertData } from './models';

// Convert database row to UseCase
const useCase = rowToUseCase(dbRow);

// Prepare data for insertion
const insertData = useCaseToInsertData({
  title: 'My Use Case',
  description: 'Description',
  // ...
});
```

## Relationships

### Use Case → Steps (Many-to-Many)
- Use cases store an array of step IDs in `step_ids` field
- Steps can be associated with multiple use cases
- Relationship is optional on both sides

### Use Case → User (Many-to-One, Optional)
- Use cases can optionally reference a user via `user_id`
- Users can have multiple use cases
- Relationship is optional (allows anonymous submissions)

### User → Steps (Creation & Approval)
- Steps must have a `created_by` field
- Steps can optionally have an `approved_by` field
- Tracks step authorship and approval workflow

## Testing

### Manual Testing Steps

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Navigate to Use Case Prototype**:
   - Go to http://localhost:5173/use-case-prototype

3. **Fill out the form**:
   - Add use case name
   - Add lead name
   - Fill in overview
   - Select business unit
   - Add tools and technologies
   - Generate steps (for Global Technology)

4. **Submit**:
   - Click "Submit Use Case"
   - Review preview
   - Click "Submit for Approval"

5. **Verify in database**:
   ```sql
   SELECT * FROM use_cases ORDER BY created_at DESC LIMIT 1;
   ```

### API Testing with curl

**Create a use case**:
```bash
curl -X POST http://localhost:3000/api/use-cases \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Use Case",
    "leadName": "Test User",
    "briefOverview": "This is a test",
    "businessUnit": "Global Technology",
    "categories": ["Testing"],
    "searchTags": ["test"]
  }'
```

**Get all use cases**:
```bash
curl http://localhost:3000/api/use-cases
```

**Get specific use case with steps**:
```bash
curl "http://localhost:3000/api/use-cases/{id}?includeSteps=true"
```

## Future Enhancements

1. **User Authentication**: Integrate with eBay SSO to auto-populate user information
2. **Step Creation**: Allow users to create custom steps and save to database
3. **Approval Workflow**: Implement multi-stage approval process for use cases
4. **Version History**: Track changes to use cases over time
5. **Comments**: Add commenting system for use cases
6. **Search**: Implement full-text search across use cases
7. **Analytics**: Track usage patterns and popular use cases

## Troubleshooting

### Common Issues

**Database connection errors**:
- Verify `DATABASE_URL` in `.env`
- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l`

**Schema errors**:
- Re-run schema: `psql -d ai_dev_tools -f src/server/db/schema.sql`
- Check for migration conflicts

**API errors**:
- Check server logs for detailed error messages
- Verify request data format matches expected schema
- Check database permissions

### Debug Mode
Enable detailed logging:
```typescript
// In src/server/db/useCasesService.ts
console.log('Creating use case with data:', data);
```

## Security Considerations

1. **Input Validation**: All inputs are validated before database insertion
2. **SQL Injection**: Using parameterized queries throughout
3. **XSS Prevention**: Data is sanitized on frontend and backend
4. **Access Control**: TODO - Implement user-based access control
5. **Audit Trail**: All changes tracked with timestamps and user IDs

## Performance Optimization

1. **Indexes**: Created on commonly queried fields (status, category, tags, created_at)
2. **Connection Pooling**: Configured in `src/server/db/connection.ts`
3. **Query Optimization**: Using selective field retrieval
4. **Caching**: TODO - Implement Redis caching for frequently accessed data
