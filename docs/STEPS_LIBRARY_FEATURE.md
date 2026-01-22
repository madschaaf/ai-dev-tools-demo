# Steps Library - Jira-Style Kanban Board

## Overview

The Steps Library is a comprehensive peer-review system for managing development steps and use cases. It provides a Jira-style Kanban board interface with a single-approval workflow by AI Team members, comment threads, and use case association tracking.

## Features

### 1. Kanban Board View

Four status columns organize steps through their lifecycle:

- **Steps for Review** (Blue) - New or edited steps awaiting initial review
- **Needs Clarification** (Orange) - Steps with active comment threads requiring author response
- **Approved** (Green) - Steps that have received 1 approval from an AI Team member
- **Rejected** (Red) - Steps that don't meet standards with documented justification

**Column Sorting:**
- All columns are automatically sorted by **Last Modified** date
- Most recently modified steps appear at the top
- When a comment is added, the step's `lastModified` date is updated, moving it to the top of the "Needs Clarification" column
- This ensures active discussions and recent changes are always visible

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
- Shows approval status (approved by AI Team member)
- Lists who approved and when
- Visual indication when approved

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

**1-Approval System:**
- Requires one AI Team member to approve
- Author cannot approve their own step
- Single approval automatically moves step to "Approved" status

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

### 7. AI Team Override & Global Edit Feature

**Override All User Edits:**
When reviewing a step with multiple version customizations across different use cases, AI Team members can override all individual edits with a canonical version:

**Workflow:**
1. **Review Step Versions**: AI team member views step modal with version selector showing all use case-specific edits
2. **Click "Override All User Edits"**: Button appears when multiple versions exist
3. **Edit Step**: AI team member enters edit mode to create the canonical version
4. **Apply Changes to All Use Cases**: Confirm button applies the AI team's version to all use cases
5. **Automatic Notifications**: System sends email notifications to all use case owners informing them:
   - Their customized version has been replaced with the canonical version
   - Reason for the change (if provided)
   - Link to review the new canonical version
   - Option to request an exception if their use case has special requirements

**Use Cases for Override:**
- **Standardization**: Ensuring consistent implementation across all use cases
- **Security Updates**: Applying critical security fixes universally
- **Best Practice Updates**: Enforcing new coding standards or methodologies
- **Bug Fixes**: Correcting errors that affect all implementations
- **Deprecation**: Updating steps that use deprecated technologies

**User Experience:**
```
┌────────────────────────────────────────────────────────────┐
│ Install VS Code [REVIEW]                         ✕         │
├────────────────────────────┬───────────────────────────────┤
│                            │ 📌 Associated Use Cases       │
│ [Step content display]     │                               │
│                            │ ✅ Frontend Dev (Jack's edit) │
│                            │ ⚠️ Backend Setup (Molly's)    │
│                            │ ○  AI Tools (base version)    │
│                            │                               │
│ [Diff view showing         │ 3 versions detected           │
│  customizations]           │                               │
│                            │ ⚠️ Multiple customizations    │
│ ┌────────────────────────┐│    detected. AI Team can      │
│ │ 🔓 Override All User   ││    create canonical version.  │
│ │    Edits              ││                               │
│ └────────────────────────┘│                               │
└────────────────────────────┴───────────────────────────────┘
```

After clicking "Override All User Edits":
```
┌────────────────────────────────────────────────────────────┐
│ Install VS Code - AI TEAM EDIT MODE              ✕         │
├────────────────────────────────────────────────────────────┤
│ [Editable textarea with canonical content]                 │
│                                                             │
│ Reason for Override (optional):                            │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Standardizing VS Code installation across all use cases││
│ │ to include latest security settings...                 ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ ⚠️ This will replace all 3 custom versions:               │
│    • Frontend Developer Onboarding (Jack Doe)              │
│    • Backend Developer Setup (Molly Smith)                 │
│    • AI Tools Integration (base version)                   │
│                                                             │
│ ┌─────────────────────┐  ┌──────────┐                     │
│ │ ✓ Apply Changes to  │  │ Cancel   │                     │
│ │   All Use Cases     │  │          │                     │
│ └─────────────────────┘  └──────────┘                     │
└────────────────────────────────────────────────────────────┘
```

**Email Notification Template:**
```
To: jack.doe@company.com, molly.smith@company.com
Subject: Step Updated - Install VS Code

Hello,

An AI Team member has updated the "Install VS Code" step that affects 
your use case:
- Use Case: Frontend Developer Onboarding
- Previous Version: Custom version by Jack Doe
- Change Date: January 22, 2026
- AI Team Member: Bob Johnson

Reason for Update:
Standardizing VS Code installation across all use cases to include 
latest security settings...

Your custom changes have been replaced with the new canonical version 
to ensure consistency and security across all development workflows.

Action Required:
- Review the updated step: [Link to step]
- If your use case requires specific customizations, please:
  1. Submit a justification request
  2. Document the specific requirements
  3. AI Team will review for exception approval

Questions? Contact the AI Team at ai-team@company.com
```

**Permission Model:**
- Only AI Team members can access "Override All User Edits"
- Regular users cannot override or edit canonical versions
- Canonical version becomes the new base for all use cases
- Future use case submissions default to canonical version

**Audit Trail:**
- Override action logged in step history
- Email notification log maintained
- Previous versions archived for reference
- Rollback capability for AI Team if needed

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
2. **STEP002**: Configure Git (approved by AI Team)
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

### Filtering and Sorting Logic

Uses `useMemo` for performance:

**Filtering:**
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

**Sorting by Last Modified:**
```typescript
const stepsByStatus = useMemo(() => {
  const sortByLastModified = (steps: Step[]) => 
    [...steps].sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
  
  return {
    review: sortByLastModified(filteredSteps.filter(s => s.status === 'review')),
    clarification: sortByLastModified(filteredSteps.filter(s => s.status === 'clarification')),
    approved: sortByLastModified(filteredSteps.filter(s => s.status === 'approved')),
    rejected: sortByLastModified(filteredSteps.filter(s => s.status === 'rejected'))
  }
}, [filteredSteps])
```

**Comment Updates:**
When a comment is added:
- Step's `lastModified` timestamp is updated to current time
- Step moves to "Needs Clarification" column
- Automatic re-sorting places it at the top of that column
- Ensures recently commented steps get immediate visibility

### Approval Workflow

```typescript
const handleApprove = (step: Step) => {
  // Validation checks
  if (step.authorId === currentUser.id) return // Can't approve own step
  if (step.approvals.some(a => a.userId === currentUser.id)) return // Already approved
  
  // Add approval
  const newApproval = { userId, userName, timestamp }
  
  // Auto-move to approved immediately with 1 approval
  updatedStep.status = 'approved'
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
- [ ] Single approval moves to Approved column
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
