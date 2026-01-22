# Steps Library - Jira-Style Kanban Board

## Overview

The Steps Library is a comprehensive peer-review system for managing development steps and use cases. It provides a Jira-style Kanban board interface with a dual-approval workflow, comment threads, and use case association tracking.

## Features

### 1. Kanban Board View

Four status columns organize steps through their lifecycle:

- **Steps for Review** (Blue) - New or edited steps awaiting initial review
- **Needs Clarification** (Orange) - Steps with active comment threads requiring author response
- **Approved** (Green) - Steps that have received 2 approvals from team members
- **Rejected** (Red) - Steps that don't meet standards with documented justification

### 2. Search and Filtering

**Global Search:**
- Search by step title
- Search by step ID (e.g., STEP001)
- Search by use case ID (e.g., UC001)

**Filter Chips:**
- **Tags**: installation, configuration, required, optional, etc.
- **Coding Language**: TypeScript, Python, Bash, Markdown, etc.
- **Categories**: front-end, back-end, database, GitHub

Filters can be combined and are easily cleared with a single button.

### 3. Step Detail Modal (Dual-Pane View)

#### Left Pane - Content & Actions

**Metadata Section:**
- Step ID
- Author information
- Created and last modified dates
- Programming language
- IDE requirements

**Description & Content:**
- Full step description
- Complete step content (code/instructions) in formatted code block
- Syntax highlighting for different languages

**Rejection Reason:**
- Displayed prominently for rejected steps
- Explains why step was not approved

**Approvals Tracking:**
- Shows current approval count (X/2)
- Lists who approved and when
- Visual indication of approval progress

**Comments Section:**
- Threaded comment system
- Add new comments
- View comment history with timestamps
- Supports clarification discussions

**Action Buttons:**
- ✓ **Approve**: Add your approval (disabled if you're the author or already approved)
- ⚠ **Need Clarification**: Move to clarification column and notify author
- ✕ **Reject**: Requires justification text, moves to rejected column

#### Right Pane - Use Case Association

**Use Case List View:**
- Shows all associated use cases
- Click any use case to view details
- Displays use case ID, title, and step count

**Use Case Detail View:**
- Full use case description
- Complete list of steps in sequence
- Current step highlighted
- Navigate back to use case list

### 4. History Tracking

**History Modal** (📜 History button):
- Complete audit trail of step lifecycle
- Shows:
  - Action taken (Created, Approved, Rejected, etc.)
  - Who performed the action
  - When it occurred
  - Column changes (status transitions)

### 5. Peer Review Workflow

**2-Approval System:**
- Requires two unique reviewers to approve
- Author cannot approve their own step
- Same reviewer cannot approve twice
- Second approval automatically moves step to "Approved" status

**Review Protection:**
- If an AI Team member edits a step, they cannot approve it
- Ensures independent peer review
- Prevents self-approval conflicts

### 6. Comment & Clarification System

**Comment Features:**
- Add comments at any time
- Comments visible to all team members
- Timestamp and author tracking
- Supports clarification workflows

**Email Notifications** (placeholder for future implementation):
- Author notified when step moved to "Needs Clarification"
- Author notified when new comments added
- Team notified when step approved/rejected

## Data Model

### Step Interface

```typescript
interface Step {
  id: string                    // Unique identifier (e.g., STEP001)
  title: string                 // Step title
  description: string           // Brief description
  content: string               // Full step content (code/instructions)
  author: string                // Author name
  authorId: string              // Author ID for validation
  createdDate: Date             // Creation timestamp
  lastModified: Date            // Last modification timestamp
  status: 'review' | 'clarification' | 'approved' | 'rejected'
  tags: string[]                // Filterable tags
  language: string              // Programming language
  ide: string[]                 // IDE requirements
  category: string[]            // Categories (front-end, back-end, etc.)
  useCaseIds: string[]          // Associated use cases
  approvals: StepApproval[]     // Approval history
  comments: StepComment[]       // Comment thread
  history: StepHistory[]        // Audit trail
  rejectionReason?: string      // Required if rejected
}
```

### Use Case Interface

```typescript
interface UseCase {
  id: string              // Unique identifier (e.g., UC001)
  title: string           // Use case title
  description: string     // Use case description
  steps: string[]         // Array of step IDs in sequence
}
```

## Mock Data

The system currently uses mock data for demonstration:

**4 Sample Steps:**
1. **STEP001**: Install VS Code (in review)
2. **STEP002**: Configure Git (approved with 2 approvals)
3. **STEP003**: Install Python (needs clarification)
4. **STEP004**: Setup Docker (rejected - outdated)

**2 Sample Use Cases:**
1. **UC001**: Frontend Developer Onboarding
2. **UC002**: Backend Developer Setup

## User Interactions

### Reviewing a Step

1. Click on a step card in any column
2. Modal opens showing step details
3. Review content, metadata, and comments
4. Take action:
   - Approve if content is good
   - Request clarification if questions arise
   - Reject if major issues exist (with justification)

### Adding Comments

1. Open step modal
2. Scroll to Comments section
3. Type comment in text area
4. Click "Add Comment"
5. Comment appears immediately with your name and timestamp

### Viewing Use Cases

1. Open step modal
2. Right pane shows associated use cases
3. Click any use case to see details
4. View full step sequence for that use case
5. Current step is highlighted
6. Click "← Back to Use Cases" to return

### Filtering Steps

1. Use search box for text search
2. Click filter chips to select criteria
3. Multiple filters can be active simultaneously
4. Board updates in real-time
5. Click "Clear All Filters" to reset

## Technical Implementation

### Components

**Main Component:** `src/pages/StepsLibrary.tsx`
- Manages all state
- Implements filtering logic
- Handles modal interactions
- Updates step data

**Sub-Component:** `KanbanColumn`
- Renders individual columns
- Displays step cards
- Handles click events
- Shows card metadata

### State Management

Uses React useState hooks for:
- `steps`: All step data
- `useCases`: All use case data
- `searchTerm`: Current search text
- `selectedTags`: Active tag filters
- `selectedLanguages`: Active language filters
- `selectedCategories`: Active category filters
- `selectedStep`: Currently viewed step
- `showModal`: Modal visibility
- `showUseCaseDetail`: Use case detail view toggle
- `newComment`: Comment input text
- `rejectionReason`: Rejection justification
- `showHistoryModal`: History modal visibility

### Filtering Logic

Uses `useMemo` for performance:

```typescript
const filteredSteps = useMemo(() => {
  return steps.filter(step => {
    const matchesSearch = /* search logic */
    const matchesTags = /* tag logic */
    const matchesLanguage = /* language logic */
    const matchesCategory = /* category logic */
    return matchesSearch && matchesTags && matchesLanguage && matchesCategory
  })
}, [steps, searchTerm, selectedTags, selectedLanguages, selectedCategories])
```

### Approval Workflow

```typescript
const handleApprove = (step: Step) => {
  // Validation checks
  if (step.authorId === currentUser.id) return // Can't approve own step
  if (step.approvals.some(a => a.userId === currentUser.id)) return // Already approved
  
  // Add approval
  const newApproval = { userId, userName, timestamp }
  
  // Auto-move to approved if 2nd approval
  if (updatedStep.approvals.length >= 2) {
    updatedStep.status = 'approved'
  }
}
```

## Future Enhancements

### Database Integration
- Replace mock data with real database
- Implement persistence layer
- Add real-time synchronization

### Email Notifications
- Configure SMTP/email service
- Send notifications on:
  - Clarification requests
  - New comments
  - Approvals/rejections
  - Status changes

### GitHub-Style Code Review
- Line-by-line commenting
- Diff view for changes
- Suggestion mode
- Syntax highlighting improvements

### Additional Features
- Drag-and-drop between columns
- Bulk operations
- Export to CSV/JSON
- Analytics dashboard
- User permissions/roles
- Search history
- Saved filters
- Step templates
- Version control integration

## Navigation

**Access:** Click "Steps Library" in the main navigation bar

**Route:** `/steps-library`

**Component:** `StepsLibrary.tsx`

## Styling

Uses inline styles with CSS variables from the theme:
- `--color-primary`: Primary brand color
- `--radius-md`: Medium border radius
- `--radius-lg`: Large border radius
- Custom colors for status indicators

## Testing Checklist

- [ ] Kanban board renders 4 columns
- [ ] Search filters steps by title/ID
- [ ] Tag filters work correctly
- [ ] Language filters work correctly
- [ ] Category filters work correctly
- [ ] Multiple filters combine properly
- [ ] Clear filters button works
- [ ] Step cards display correct information
- [ ] Click on step card opens modal
- [ ] Modal shows all step details
- [ ] Approve button adds approval
- [ ] Second approval moves to Approved column
- [ ] Author cannot approve own step
- [ ] Duplicate approval prevented
- [ ] Clarification moves to correct column
- [ ] Reject requires justification
- [ ] Reject moves to Rejected column
- [ ] Comments can be added
- [ ] Comments display correctly
- [ ] Use cases list displays
- [ ] Use case detail view works
- [ ] Back button returns to use case list
- [ ] History modal shows audit trail
- [ ] History modal closes properly
- [ ] Modal close button works
- [ ] No console errors
- [ ] Responsive layout works

## Performance Considerations

- Uses `useMemo` for expensive filtering operations
- Lazy evaluation of filtered results
- Minimal re-renders through proper state management
- Efficient event handlers
- Optimized column rendering

## Accessibility

- Semantic HTML structure
- Clear button labels
- Keyboard navigation support
- Focus management in modals
- ARIA labels where appropriate
- Readable color contrasts

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses CSS Grid (IE11 not supported)
- Uses CSS Flexbox
- Uses ES6+ features

## Documentation References

- [STEPS_DATABASE_SCHEMA.md](./STEPS_DATABASE_SCHEMA.md) - Database schema for steps
- [USE_CASE_DATABASE_SCHEMA.md](./USE_CASE_DATABASE_SCHEMA.md) - Database schema for use cases
- [DYNAMIC_STEPS_IMPLEMENTATION.md](./DYNAMIC_STEPS_IMPLEMENTATION.md) - Dynamic steps architecture
