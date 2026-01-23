# Library Tab Feature Documentation

## Overview

The **Library** tab provides a centralized repository for approved AI use cases and workflow steps. Access to different sections is role-based, with AI team members having additional capabilities for managing steps.

## Feature Components

### 1. Role-Based Access Control

#### All Users
- **Can view:** Approved Use Cases Library
- **Can search:** Use cases by title, category, business area, tools
- **Can filter:** By category, level, business unit, tools
- **Cannot see:** Steps toggle or Steps Library

#### AI Team Members
- **Can view:** Use Cases Library AND Steps Library
- **Can toggle:** Between Use Cases and Steps views
- **Can search:** Both use cases and steps
- **Can edit:** Existing steps (sends to review)
- **Can create:** New steps (sends to review)

### 2. Library Tab Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Library                                    [Toggle - AI Only] │
│  ┌──────────────┬──────────────┐                            │
│  │  Use Cases   │    Steps     │  ← Toggle visible only to  │
│  │   (Active)   │  (Inactive)  │     AI team members        │
│  └──────────────┴──────────────┘                            │
│                                                               │
│  [Search Bar: "Search use cases..."]                         │
│                                                               │
│  Filters:                                                     │
│  ├─ Category: [All ▼]                                        │
│  ├─ Level: [All ▼]                                           │
│  ├─ Business Unit: [All ▼]                                   │
│  └─ Tools: [All ▼]                                           │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Featured Use Cases                           │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │          │   │
│  │  │  Title   │  │  Title   │  │  Title   │          │   │
│  │  │  Badge   │  │  Badge   │  │  Badge   │          │   │
│  │  │  Views   │  │  Views   │  │  Views   │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Recent Use Cases                             │   │
│  │  [Grid of use case cards with thumbnails]           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 3. Use Cases View (All Users)

#### Visual Design
Based on the provided reference image, the Use Cases Library includes:

- **Hero Section:**
  - Title: "AI Use Case Repository"
  - Subtitle describing the purpose
  - Primary action buttons (if user has permission)

- **Search & Filter Panel (Left Sidebar):**
  - Search bar with icon
  - Sort By dropdown (Recent, Most Viewed, etc.)
  - Filter by Category dropdown
  - Filter by Level dropdown
  - Filter by Business Unit dropdown
  - Filter by Tools dropdown
  - "Clear All" button

- **Use Case Cards:**
  - Thumbnail image
  - Category badge (e.g., "PRODUCTIVITY", "KNOWLEDGE", "DEVELOPER")
  - Title
  - Last Updated date
  - Brief description
  - Business Area tag
  - View count with eye icon
  - Like/thumbs up count with icon
  - Three-dot menu for additional actions

- **Sections:**
  - Featured Use Cases (carousel/grid)
  - Recent Use Cases (grid)
  - All Use Cases (paginated grid)

#### Features
- **Search:** Full-text search across titles, descriptions, tags
- **Filters:** Category, level, business unit, tools, etc.
- **Sorting:** Recent, most viewed, most liked, alphabetical
- **Card Actions:** View details, like, share (if applicable)
- **Responsive Grid:** Adjusts to screen size

### 4. Steps View (AI Team Members Only)

#### Visual Design
Simpler layout focused on functionality:

```
┌─────────────────────────────────────────────────────────────┐
│  Steps Library                        [+ Create New Step]    │
│                                                               │
│  [Search Bar: "Search steps..."]                             │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Step Name                    Category    [Edit] [🗑️] │   │
│  │  Description preview...       Updated: Date           │   │
│  ├───────────────────────────────────────────────────────│   │
│  │  Step Name                    Category    [Edit] [🗑️] │   │
│  │  Description preview...       Updated: Date           │   │
│  ├───────────────────────────────────────────────────────│   │
│  │  Step Name                    Category    [Edit] [🗑️] │   │
│  │  Description preview...       Updated: Date           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

#### Features
- **Search:** Filter steps by name, description, category
- **List View:** Table/list format (no thumbnails needed)
- **Actions per Step:**
  - **Edit Button:** Opens step editor
  - **Delete Button:** (With confirmation dialog)
- **Create New Step Button:** Opens step creation form
- **Sorting:** Name, category, last updated

### 5. Step Editor (AI Team Members Only)

When editing or creating a step:

```
┌─────────────────────────────────────────────────────────────┐
│  Edit Step: [Step Name]                                      │
│                                                               │
│  Step Name: [___________________________________________]    │
│  Category:  [Setup ▼]                                        │
│  Order:     [___]                                            │
│                                                               │
│  Content (Markdown):                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  # Step Title                                        │   │
│  │                                                       │   │
│  │  ## Overview                                         │   │
│  │  Description...                                      │   │
│  │                                                       │   │
│  │  ## Instructions                                     │   │
│  │  1. First step                                       │   │
│  │  2. Second step                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  Associated Components: [Select components...]               │
│                                                               │
│  [Cancel]                          [Save for Review]         │
└─────────────────────────────────────────────────────────────┘
```

#### Behavior
- **On Save:** Step goes to "Review Steps" column in Review Submissions tab
- **Status:** Marked as "Pending Review"
- **Validation:** Required fields must be filled
- **Auto-save:** Optional auto-save draft functionality

## Implementation Details

### Database Schema

#### User Roles Table
```sql
ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
-- Possible values: 'user', 'ai_team_member', 'admin'
```

#### Steps Table Enhancement
```sql
ALTER TABLE steps ADD COLUMN status VARCHAR(50) DEFAULT 'draft';
-- Possible values: 'draft', 'pending_review', 'approved', 'archived'

ALTER TABLE steps ADD COLUMN created_by INTEGER REFERENCES users(id);
ALTER TABLE steps ADD COLUMN updated_by INTEGER REFERENCES users(id);
```

### Frontend Components

#### LibraryTab.tsx
Main component that handles:
- Role detection from user context
- Toggle visibility based on role
- View switching between Use Cases and Steps

```typescript
interface LibraryTabProps {
  userRole: 'user' | 'ai_team_member' | 'admin';
}

const LibraryTab: React.FC<LibraryTabProps> = ({ userRole }) => {
  const [activeView, setActiveView] = useState<'use-cases' | 'steps'>('use-cases');
  const showToggle = userRole === 'ai_team_member' || userRole === 'admin';
  
  return (
    <div className="library-tab">
      {showToggle && (
        <div className="view-toggle">
          <button 
            className={activeView === 'use-cases' ? 'active' : ''}
            onClick={() => setActiveView('use-cases')}
          >
            Use Cases
          </button>
          <button 
            className={activeView === 'steps' ? 'active' : ''}
            onClick={() => setActiveView('steps')}
          >
            Steps
          </button>
        </div>
      )}
      
      {activeView === 'use-cases' && <UseCasesLibrary />}
      {activeView === 'steps' && showToggle && <StepsLibrary />}
    </div>
  );
};
```

#### UseCasesLibrary.tsx
- Displays approved use cases
- Card-based grid layout with thumbnails
- Search and filter functionality
- Similar to existing UseCasePrototype but shows only approved cases

#### StepsLibrary.tsx (AI Team Members Only)
- Lists all steps (approved, pending, draft)
- Search functionality
- Edit and delete actions
- Create new step button
- Table/list layout (no thumbnails)

#### StepEditor.tsx (AI Team Members Only)
- Form for creating/editing steps
- Markdown editor for content
- Metadata fields (name, category, order)
- Submit for review button
- Draft save functionality

### API Endpoints

```typescript
// Get library data based on user role
GET /api/library?view=use-cases&role=user
GET /api/library?view=steps&role=ai_team_member

// Steps management (AI team members only)
GET /api/steps/library - Get all steps for library view
POST /api/steps/create - Create new step (status: pending_review)
PUT /api/steps/:id/edit - Edit step (status: pending_review)
DELETE /api/steps/:id - Delete step (with confirmation)

// Use cases
GET /api/use-cases/approved - Get approved use cases for library
```

### Permission Middleware

```typescript
// Middleware to check AI team member status
const requireAITeamMember = (req, res, next) => {
  if (req.user.role === 'ai_team_member' || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};

// Protected routes
app.get('/api/steps/library', requireAITeamMember, getStepsLibrary);
app.post('/api/steps/create', requireAITeamMember, createStep);
app.put('/api/steps/:id/edit', requireAITeamMember, editStep);
```

## User Flows

### Flow 1: Regular User Views Library
1. User clicks "Library" tab in navigation
2. System checks user role → `user`
3. Only "Use Cases" view is displayed (no toggle shown)
4. User can search and filter approved use cases
5. User can view use case details
6. User cannot access Steps view

### Flow 2: AI Team Member Views Library
1. AI team member clicks "Library" tab
2. System checks user role → `ai_team_member`
3. Toggle between "Use Cases" and "Steps" is visible
4. Default view: "Use Cases" (same as regular users)
5. AI team member can switch to "Steps" view
6. In Steps view, can search, edit, and create steps

### Flow 3: AI Team Member Edits Step
1. AI team member is in "Steps" view of Library
2. Clicks "Edit" button on a step
3. Step editor opens with current content
4. Makes changes to step content/metadata
5. Clicks "Save for Review"
6. System updates step:
   - Sets status to "pending_review"
   - Records editor ID and timestamp
   - Adds to "Review Steps" column in Review Submissions tab
7. Confirmation message shown
8. Step editor closes, returns to Steps Library

### Flow 4: AI Team Member Creates New Step
1. AI team member clicks "+ Create New Step" button
2. Step editor opens with blank form
3. Fills in step details:
   - Step name
   - Category
   - Order number
   - Content (markdown)
   - Associated components
4. Clicks "Save for Review"
5. System creates new step:
   - Sets status to "pending_review"
   - Records creator ID and timestamp
   - Adds to "Review Steps" column in Review Submissions tab
6. Confirmation message shown
7. Returns to Steps Library

### Flow 5: Step Review Process
1. Step edited/created by AI team member
2. Step appears in "Review Submissions" tab under "Review Steps" column
3. Reviewer (admin or designated reviewer):
   - Views step in review queue
   - Can approve, reject, or request changes
4. If approved:
   - Status changes to "approved"
   - Step becomes available in Steps workflow
5. If rejected:
   - Status changes to "rejected"
   - Creator notified with feedback
6. If changes requested:
   - Status remains "pending_review"
   - Creator can re-edit and resubmit

## Search Functionality

### Use Cases Search
```typescript
interface UseCaseSearchParams {
  query: string;
  category?: string;
  level?: string;
  businessUnit?: string;
  tools?: string[];
  sortBy?: 'recent' | 'views' | 'likes' | 'alphabetical';
}
```

### Steps Search (AI Team Members)
```typescript
interface StepSearchParams {
  query: string;
  category?: string;
  status?: 'draft' | 'pending_review' | 'approved' | 'archived';
  sortBy?: 'name' | 'category' | 'updated' | 'created';
}
```

## Visual Differences

### Use Cases Library
- **Layout:** Card-based grid
- **Thumbnails:** Yes, required for each use case
- **Audience:** All eBay users
- **Visual Style:** Polished, marketing-friendly
- **Categories:** Broad (PRODUCTIVITY, KNOWLEDGE, DEVELOPER)
- **Metrics:** Views, likes, shares
- **Actions:** View, like, share

### Steps Library
- **Layout:** List/table format
- **Thumbnails:** No thumbnails needed
- **Audience:** AI team members only
- **Visual Style:** Functional, admin-focused
- **Categories:** Technical (Setup, Configuration, Tools, etc.)
- **Metrics:** Last updated, created by
- **Actions:** Edit, delete, create new

## Security Considerations

1. **Role-Based Access:**
   - Server-side validation of user role
   - Frontend hiding is UX convenience, not security
   - API endpoints enforce role requirements

2. **Data Validation:**
   - Sanitize all inputs from step editor
   - Validate markdown content
   - Check for malicious code injection

3. **Audit Trail:**
   - Track who created/edited each step
   - Log all step modifications
   - Maintain revision history

4. **Review Process:**
   - All step changes require approval
   - Prevent direct publishing to production
   - Multiple review levels for sensitive changes

## Future Enhancements

1. **Version Control:**
   - Track step history
   - Ability to rollback changes
   - Compare versions side-by-side

2. **Collaborative Editing:**
   - Multiple AI team members can suggest edits
   - Comments/discussions on step changes
   - Merge conflict resolution

3. **Analytics:**
   - Track which steps are most edited
   - Identify steps needing updates
   - Usage metrics per step

4. **Templates:**
   - Step templates for common patterns
   - Standardized formatting
   - Auto-completion for common fields

5. **Advanced Search:**
   - Semantic search across steps
   - Tag-based filtering
   - Saved search queries

## Migration Plan

1. **Phase 1:** Setup
   - Add role column to users table
   - Add status column to steps table
   - Create necessary API endpoints

2. **Phase 2:** Components
   - Build LibraryTab component
   - Build StepsLibrary component
   - Build StepEditor component

3. **Phase 3:** Integration
   - Connect to existing ReviewSubmissions tab
   - Implement review workflow
   - Add permission checks

4. **Phase 4:** Testing
   - Test with different user roles
   - Verify permission enforcement
   - Test review workflow

5. **Phase 5:** Deployment
   - Gradual rollout to AI team
   - Monitor for issues
   - Gather feedback and iterate

## Related Documentation

- [Review Submissions Tab](./REVIEW_SUBMISSIONS_TAB.md)
- [Steps Library Feature](./STEPS_LIBRARY_FEATURE.md)
- [Use Case Database Integration](./USE_CASE_DATABASE_INTEGRATION.md)
- [Database Models Restructure](./DATABASE_MODELS_RESTRUCTURE.md)
- [Editable Steps Architecture](./EDITABLE_STEPS_ARCHITECTURE.md)
