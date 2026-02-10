# Database Models Restructure

## Overview
The database models have been restructured from a single `models.ts` file into an organized folder structure with separate files for each entity type. This improves code organization, maintainability, and makes it easier to understand the relationships between different entities.

## New Structure

```
src/server/db/models/
├── index.ts         # Central export point for all models
├── user.ts          # User schema and helpers
├── step.ts          # Step schema and helpers
└── useCase.ts       # Use Case schema and helpers
```

## Models

### User Model (`user.ts`)
Represents users who can create and manage steps and use cases.

**Key Fields:**
- `id`: Unique identifier
- `email`: User email address
- `name`: User's display name
- `isAITeamMember`: Boolean flag indicating if user is part of the AI team
- Timestamps: `created_at`, `updated_at`

**Helper Functions:**
- `rowToUser()`: Convert database row to User model
- `userToInsertData()`: Prepare User data for database insertion

### Step Model (`step.ts`)
Represents pre-configured steps for AI development workflows.

**Key Fields:**
- `id`: Unique identifier
- Content fields: `title`, `brief_description`, `detailed_content`
- Categorization: `category`, `tags`, `language`, `ide`, `target_roles`
- Workflow: `created_by`, `approved_by`, `status`, `rejection_reason`
- Enhanced features: `prerequisites`, `related_steps`, `difficulty_level`
- Optional relation: `use_case_ids` (array of use case IDs)
- Timestamps: `created_at`, `updated_at`, `last_modified`

**Additional Types:**
- `DetailedContentItem`: Structure for rich content in steps
- `StepComment`: Comments on steps
- `StepHistory`: Audit trail for step changes
- `StepApproval`: Approval records

**Helper Functions:**
- `rowToStep()`: Convert database row to PreConfiguredStep model
- `stepToInsertData()`: Prepare Step data for database insertion

### Use Case Model (`useCase.ts`)
Represents use cases that can include multiple steps and have an associated user.

**Key Fields:**
- `id`: Unique identifier
- `title`: Use case title
- `description`: Detailed description
- `category`: Classification category
- `tags`: Searchable tags
- `status`: Draft, published, or archived
- **Optional Relations:**
  - `step_ids`: Array of step IDs (optional)
  - `user_id`: Associated user ID (optional)
- Enhanced features: `estimated_duration`, `difficulty_level`, `prerequisites`
- Metadata: `created_by`, `created_at`, `updated_at`

**Helper Functions:**
- `rowToUseCase()`: Convert database row to UseCase model
- `useCaseToInsertData()`: Prepare UseCase data for database insertion

## Schema Relationships

```
User (optional) ─────┐
                     │
                     ├──> UseCase (optional) ─────> Steps (optional, many-to-many)
                     │
                     └──> Steps (created_by, approved_by)
```

**Key Relationships:**
1. **User → Use Case**: Optional one-to-many
   - A use case can optionally be associated with a user via `user_id`
   - Users can own multiple use cases

2. **Use Case → Steps**: Optional many-to-many
   - A use case can optionally include multiple steps via `step_ids` array
   - Steps can be part of multiple use cases

3. **User → Steps**: Required for creation, optional for approval
   - Steps must have a `created_by` user
   - Steps can optionally have an `approved_by` user

## Usage

### Importing Models

All models are exported through the central `index.ts` file:

```typescript
// Import from the models folder
import { User, PreConfiguredStep, UseCase } from './models/index';

// Or import specific types
import type { UserRow, StepRow, UseCaseRow } from './models';

// Import helper functions
import { rowToUser, rowToStep, rowToUseCase } from './models';
```

### Example Usage

```typescript
// Converting database rows to models
const user = rowToUser(userRow);
const step = rowToStep(stepRow);
const useCase = rowToUseCase(useCaseRow);

// Preparing data for insertion
const userData = userToInsertData({
  email: 'user@example.com',
  name: 'John Doe',
  isAITeamMember: false
});

const stepData = stepToInsertData({
  title: 'Install Node.js',
  brief_description: 'Install Node.js on your machine',
  // ... other fields
});

const useCaseData = useCaseToInsertData({
  title: 'Frontend Development Setup',
  description: 'Complete setup for frontend development',
  step_ids: ['step-1', 'step-2'],
  user_id: 'user-123'
});
```

## Migration Notes

- **No Breaking Changes**: The restructure maintains backward compatibility
- **Old imports still work**: The old `models.ts` file has been replaced, but imports from `./models` still work through `index.ts`
- **Updated imports**: The `stepsService.ts` now imports from `./models/index` explicitly

## Benefits of This Structure

1. **Better Organization**: Each entity has its own file, making it easier to locate and understand
2. **Improved Maintainability**: Changes to one model don't affect others
3. **Clearer Relationships**: The optional relationships are now more explicit in the type definitions
4. **Scalability**: Easy to add new models by creating new files
5. **Type Safety**: TypeScript interfaces ensure type safety across the application
6. **Separation of Concerns**: Each model file focuses on a single entity type

## Future Enhancements

Consider these potential improvements:
1. Add service files for User and UseCase (similar to StepsService)
2. Implement database migrations for the schema changes
3. Add validation logic within the model helper functions
4. Create relationship helper functions for querying related entities
5. Add comprehensive tests for each model and helper function
