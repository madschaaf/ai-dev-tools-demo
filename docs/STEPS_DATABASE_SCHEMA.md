# Pre-Configured Steps Database Schema

This schema supports the Steps Library peer review workflow with 1-approval system by AI Team members.

## Core Schema

> **Note:** Blue field names indicate fields that are **editable by users** through the UI. All other fields are system-managed and saved in the database.

```typescript
interface PreConfiguredStep {
  // Identification
  id: string;                          // Unique identifier (UUID) e.g., "Step-173838383"
  
  // Approval Workflow (Steps Library)
  created_by: string;                  // Origin: "AI Team" or "Other"
  approved_by: string | null;          // AI team member who approved (e.g., "Alex Ali")
  approval_date: Date | null;          // Timestamp of approval (e.g., "01/20/26")
  last_modified: Date;                 // Timestamp of most recent modification (e.g., "01/19/26")
  modified_by: string;                 // Who last modified: "AI Team" or individual name (e.g., "Mike Jones")
  count_modified: number;              // Incremented ONLY if modified by someone outside AI team
  
  // Content (USER EDITABLE)
  title: string;                       // Step title (e.g., "Install Node.js")
  brief_description: string;           // Short explanation of what the step is or why it exists
  detailed_content: DetailedContentItem[]; // List of content items with optional copy-to-clipboard
  tags: string[];                      // Searchable/categorical labels (e.g., ["node.js", "JavaScript", "npm"])
  
  // Categorization
  category: 'security' | 'access' | 'admin' | 'install' | 'setup' | 'config' | 'practice'; //needed or have tags?
  language?: string;                   // Programming language (e.g., "JavaScript", "Python", "Bash")
  ide?: string[];                      // IDE requirements (e.g., ["VS Code", "Terminal"])
  targetRoles?: string[];              // Who should see this (e.g., ["developer", "designer"])
  
  // Review Status (Steps Library)
  status: 'review' | 'clarification' | 'approved' | 'rejected';
  rejection_reason?: string;           // Required if status is 'rejected'
  
  // Optional Enhanced Features
  prerequisites?: string[];            // IDs of steps that must be completed first
  related_steps?: string[];            // IDs of related/similar steps
  estimated_time?: number;             // Minutes to complete
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  use_case_ids?: string[];            // Associated use cases
}
```

## Supporting Schemas

### Detailed Content Item

```typescript
interface DetailedContentItem {
  label?: string;                      // Optional short label (e.g., "Option A")
  text: string;                        // The instruction text shown to the user
  copy_to_clipboard?: boolean;         // Whether this item shows a copy button (default: false)
}
```

### Step Comments (Steps Library)

```typescript
interface StepComment {
  id: string;
  step_id: string;                     // Reference to step
  user_id: string;
  user_name: string;
  content: string;
  timestamp: Date;
  line_number?: number;                // Optional line reference for code comments
}
```

### Step History (Steps Library Audit Trail)

```typescript
interface StepHistory {
  id: string;
  step_id: string;
  date: Date;
  modified_by: string;
  action: string;                      // e.g., "Created", "Approved by AI Team Member", "Rejected"
  title_change?: string;               // If title was changed
  column_change?: string;              // Status transition (e.g., "review" → "approved")
}
```

### Step Approvals (Steps Library)

```typescript
interface StepApproval {
  id: string;
  step_id: string;
  user_id: string;
  user_name: string;
  timestamp: Date;
  use_case_ids: string[];              // Empty array = approved for all use cases
                                       // Specific IDs = approved for those use cases only
}
```


## Example JSON

Based on the user's original schema structure:

```json
{
  "id": "Step-173838383",
  "created_by": "AI Team",
  "approved_by": "Alex Ali",
  "approval_date": "2026-01-20T00:00:00Z",
  "last_modified": "2026-01-19T00:00:00Z",
  "modified_by": "Mike Jones",
  "count_modified": 1,
  
  "title": "Install Node.js",
  "brief_description": "Node.js is a JavaScript runtime that allows you to run JavaScript on your computer, not just in the browser. It includes npm (Node Package Manager) for installing JavaScript packages and libraries.",
  "detailed_content": [
    {
      "label": "Option A:",
      "text": "Using Winget (Windows Package Manager):",
      "copy_to_clipboard": false
    },
    {
      "text": "winget install OpenJS.NodeJS.LTS",
      "copy_to_clipboard": true
    },
    {
      "label": "Option B:",
      "text": "Using Homebrew (macOS):",
      "copy_to_clipboard": false
    },
    {
      "text": "brew install node",
      "copy_to_clipboard": true
    }
  ],
  "tags": ["node.js", "npm", "JavaScript", "TypeScript"],
  
  "category": "install",
  "language": "JavaScript",
  "ide": ["VS Code", "Terminal"],
  
  "status": "approved",
  
  "prerequisites": ["install-local-admin"],
  "estimated_time": 10,
  "difficulty_level": "beginner",
  "use_case_ids": ["UC001", "UC002"]
}
```

## Example UI

**After user saves the configured step:**

---

### Install Node.js

Node.js is a JavaScript runtime that allows you to run JavaScript on your computer, not just in the browser. It includes npm (Node Package Manager) for installing JavaScript packages and libraries.

**Option A:** Using Winget (Windows Package Manager):
```
winget install OpenJS.NodeJS.LTS
```
[📋 Copy]

**Option B:** Using Homebrew (macOS):
```
brew install node
```
[📋 Copy]

**Tags:**
`node.js` `npm` `JavaScript` `TypeScript`

**Details:**
- **Created by:** AI Team
- **Approved by:** Alex Ali (01/20/26)
- **Last modified:** 01/19/26 by Mike Jones
- **Category:** Install
- **Estimated time:** 10 minutes
- **Difficulty:** Beginner

---

## Steps Library Integration

This schema integrates with the Steps Library peer review workflow:

### Review Workflow Fields
- **status**: Tracks current review state (review → clarification → approved/rejected)
- **approved_by**: AI Team member who approved
- **approval_date**: When approval was granted
- **rejection_reason**: Required justification if rejected

### Audit Trail
- **created_by**: Original author (AI Team or individual)
- **modified_by**: Last person to make changes
- **last_modified**: Timestamp for sorting (most recent first in columns)
- **count_modified**: Tracks modifications by non-AI Team members

### Sorting & Organization
- Steps automatically sorted by `last_modified` (most recent first)
- When comments added, `last_modified` updates → moves to top of column
- Ensures active discussions remain visible

## Key Additions to Your Original Schema

### Essential Additions ⭐
1. **id** - Primary key for database operations
2. **version** - Track changes over time
3. **status** - Lifecycle management (draft/active/deprecated)
4. **category** - Already in implementation, essential for organization
5. **tags** - Enhanced searchability beyond category
6. **createdAt** - Timestamp for creation (complement to LastModified)
7. **createdByType** & **updatedByType** - Distinguish between AI, leads, and employees

### High-Value Additions 🎯
8. **defaultOrder** - For consistent presentation order
9. **prerequisites** - Step dependencies
10. **estimatedTime** - User planning and expectations
11. **difficultyLevel** - Set appropriate expectations
12. **applicableIDE/Language/Platform** - Context-based filtering
13. **detailedContent** - Already in implementation, richer than description
14. **links** - Already in implementation, critical for guidance

### Nice-to-Have Additions 💡
15. **usageCount** & **successRate** - Analytics for step quality
16. **approvedBy** & **approvedAt** - Quality control workflow
17. **relatedSteps** - Improved navigation
18. **completionCriteria** - Clearer success metrics
19. **commonIssues** - Already in implementation, reduces support burden
20. **targetRoles** - Personalization based on user role

## Example Usage

```typescript
const exampleStep: PreConfiguredStep = {
  id: 'install-nodejs-001',
  version: 2,
  status: 'active',
  
  title: 'Install Node.js',
  description: 'Download and install the latest LTS version of Node.js',
  detailedContent: '# Installation Steps\n1. Visit nodejs.org...',
  
  category: 'install',
  tags: ['nodejs', 'javascript', 'npm', 'runtime'],
  targetRoles: ['developer', 'full-stack-engineer'],
  
  createdBy: 'ai-team',
  createdByType: 'ai-team',
  createdAt: new Date('2024-01-15'),
  updatedBy: 'john.doe@ebay.com',
  updatedByType: 'employee',
  lastModified: new Date('2024-03-20'),
  
  defaultOrder: 5,
  prerequisites: ['install-local-admin'],
  relatedSteps: ['install-npm', 'configure-nodejs'],
  
  links: [
    { label: 'Node.js Official', url: 'https://nodejs.org/', type: 'external' }
  ],
  requirements: ['Local admin access', 'Internet connection'],
  commonIssues: [
    'PATH not updated - Restart terminal',
    'Permission denied - Run as administrator'
  ],
  
  estimatedTime: 10,
  difficultyLevel: 'beginner',
  completionCriteria: ['node --version returns version number'],
  
  applicableIDE: ['vscode', 'cursor'],
  applicableLanguage: ['javascript', 'typescript'],
  applicablePlatform: ['windows', 'mac', 'linux'],
  businessUnit: ['global-technology'],
  
  usageCount: 156,
  successRate: 94.5,
  lastUsed: new Date('2024-03-25'),
  
  approvedBy: 'tech-lead@ebay.com',
  approvedAt: new Date('2024-01-16'),
  qualityScore: 4.8
};
```

## Database Indexes

Recommended indexes for performance:
```sql
CREATE INDEX idx_steps_category ON steps(category);
CREATE INDEX idx_steps_status ON steps(status);
CREATE INDEX idx_steps_tags ON steps USING GIN(tags);
CREATE INDEX idx_steps_created_at ON steps(createdAt);
CREATE INDEX idx_steps_usage_count ON steps(usageCount DESC);
CREATE INDEX idx_steps_applicable_ide ON steps USING GIN(applicableIDE);
```

## Migration Path

If implementing incrementally:

**Phase 1 (MVP):**
- id, version, status
- title, description, detailedContent
- category, tags
- createdBy, updatedBy, createdAt, lastModified
- createdByType, updatedByType

**Phase 2 (Enhanced):**
- defaultOrder, prerequisites
- estimatedTime, difficultyLevel
- applicableIDE, applicableLanguage
- links, requirements, commonIssues

**Phase 3 (Analytics & Quality):**
- usageCount, successRate
- approvedBy, approvedAt
- relatedSteps, completionCriteria
- Supporting tables (comments, history)

## Benefits

1. **Comprehensive Tracking**: Full audit trail of who created/modified and when
2. **Better Discovery**: Tags + category + context filters = precise step matching
3. **Quality Control**: Approval workflow + version tracking + analytics
4. **User Experience**: Time estimates + difficulty levels + completion criteria
5. **Analytics**: Usage patterns inform which steps need improvement
6. **Flexibility**: Context filters allow showing right steps to right users
7. **Future-Proof**: Room for localization, comments, and enhanced features
