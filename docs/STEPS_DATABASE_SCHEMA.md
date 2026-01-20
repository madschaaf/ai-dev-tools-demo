# Pre-Configured Steps Database Schema

## Core Schema

```typescript
interface PreConfiguredStep {
  // Identification & Versioning
  id: string;                          // Unique identifier (UUID)
  version: number;                     // Version number for tracking changes
  status: 'draft' | 'active' | 'deprecated' | 'archived';
  
  // Content
  title: string;                       // Display name (max 100 chars)
  description: string;                 // Brief summary (max 500 chars)
  detailedContent?: string;            // Full markdown content
  
  // Categorization & Discovery
  category: 'security' | 'access' | 'admin' | 'install' | 'setup' | 'config' | 'practice';
  tags: string[];                      // Additional searchable tags
  targetRoles?: string[];              // Who should see this (e.g., ['developer', 'designer'])
  
  // Metadata
  createdBy: string;                   // User ID or team (e.g., 'ai-team', 'user-123')
  createdByType: 'ai-team' | 'use-case-lead' | 'employee';
  createdAt: Date;                     // Timestamp
  updatedBy: string;                   // Last modifier ID
  updatedByType: 'ai-team' | 'use-case-lead' | 'employee';
  lastModified: Date;                  // Last update timestamp
  
  // Ordering & Dependencies
  defaultOrder?: number;               // Default sequence in step list
  prerequisites?: string[];            // IDs of steps that must be completed first
  relatedSteps?: string[];             // IDs of related/similar steps
  
  // Rich Content
  links?: Array<{
    label: string;
    url: string;
    type?: 'documentation' | 'tool' | 'portal' | 'external';
  }>;
  requirements?: string[];             // What's needed before this step
  commonIssues?: string[];             // Known problems and solutions
  
  // User Experience
  estimatedTime?: number;              // Minutes to complete
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  completionCriteria?: string[];       // How to verify completion
  
  // Context Filters
  applicableIDE?: string[];            // ['vscode', 'cursor', 'intellij']
  applicableLanguage?: string[];       // ['javascript', 'python', 'java']
  applicablePlatform?: string[];       // ['windows', 'mac', 'linux']
  businessUnit?: string[];             // ['global-technology', 'growth']
  
  // Usage & Analytics
  usageCount?: number;                 // How many times used
  successRate?: number;                // Percentage of successful completions
  lastUsed?: Date;                     // Most recent usage
  
  // Approval & Quality
  approvedBy?: string;                 // Approver ID
  approvedAt?: Date;                   // Approval timestamp
  reviewedBy?: string[];               // List of reviewers
  qualityScore?: number;               // 1-5 rating
  
  // Localization (future)
  locale?: string;                     // 'en-US', 'es-ES', etc.
  translations?: Record<string, {      // Translation map
    title: string;
    description: string;
    detailedContent?: string;
  }>;
}
```

## Additional Supporting Tables

### Step Comments
```typescript
interface StepComment {
  id: string;
  stepId: string;                      // Reference to step
  userId: string;
  userType: 'ai-team' | 'use-case-lead' | 'employee';
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
  isInternal?: boolean;                // Internal team note vs public
}
```

### Step Usage History
```typescript
interface StepUsageHistory {
  id: string;
  stepId: string;
  useCaseId?: string;                  // Which use case used this step
  userId: string;
  usedAt: Date;
  completed: boolean;
  timeSpent?: number;                  // Minutes
  feedback?: string;
  rating?: number;                     // 1-5 stars
}
```

### Step Change Log
```typescript
interface StepChangeLog {
  id: string;
  stepId: string;
  version: number;
  changedBy: string;
  changedAt: Date;
  changeType: 'created' | 'updated' | 'deprecated' | 'archived';
  changes: Record<string, {
    old: any;
    new: any;
  }>;
  reason?: string;                     // Why the change was made
}
```

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
