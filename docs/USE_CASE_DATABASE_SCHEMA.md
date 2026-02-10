# Use Case Submission Database Schema

## Entity-Relationship Diagram (ERD)

This document outlines the proposed database schema for the Use Case submission and management system.

## Core Entities

### 1. **UseCases**
Primary table for storing use case submissions.

```sql
CREATE TABLE use_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  lead_user_id UUID REFERENCES users(id),
  business_unit VARCHAR(100) NOT NULL,
  thumbnail_url TEXT,
  brief_overview TEXT NOT NULL,
  technical_details TEXT NOT NULL,
  data_requirements TEXT,
  implementation_steps TEXT,
  coding_language VARCHAR(50),
  ide VARCHAR(50),
  is_ide_also_ai_tool BOOLEAN DEFAULT false,
  is_for_developers BOOLEAN DEFAULT false,
  estimated_time VARCHAR(100),
  status VARCHAR(50) DEFAULT 'draft', -- draft, submitted, approved, published
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  submitted_at TIMESTAMP,
  published_at TIMESTAMP
);
```

### 2. **Users**
User information for submitters and team members.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. **UseCaseTeamMembers**
Many-to-many relationship between use cases and team members.

```sql
CREATE TABLE use_case_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(use_case_id, user_id)
);
```

### 4. **UseCaseCategories**
Categories associated with use cases (many-to-many).

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE use_case_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(use_case_id, category_id)
);
```

### 5. **UseCaseTools**
AI tools and technologies used in the use case.

```sql
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(50), -- 'ai_tool', 'ide', 'technology'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE use_case_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(use_case_id, tool_id)
);
```

### 6. **UseCaseSteps**
Setup steps for each use case (ordered list).

```sql
CREATE TABLE use_case_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  step_id VARCHAR(100), -- reference to predefined step or 'custom-xxx'
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  category VARCHAR(50), -- 'access', 'installation', 'configuration', 'custom'
  is_custom BOOLEAN DEFAULT false,
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for efficient ordering
CREATE INDEX idx_use_case_steps_order ON use_case_steps(use_case_id, order_index);
```

### 7. **PredefinedSteps**
Library of reusable setup steps.

```sql
CREATE TABLE predefined_steps (
  id VARCHAR(100) PRIMARY KEY, -- e.g., 'verify-sso-ping', 'install-nodejs'
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  component_name VARCHAR(100), -- React component name
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 8. **RelatedLinks**
External links associated with use cases.

```sql
CREATE TABLE related_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'related', -- 'related', 'media'
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 9. **SearchTags**
Tags for search and filtering.

```sql
CREATE TABLE search_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE use_case_search_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES search_tags(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(use_case_id, tag_id)
);
```

## Indexes for Performance

```sql
-- Search and filtering
CREATE INDEX idx_use_cases_status ON use_cases(status);
CREATE INDEX idx_use_cases_business_unit ON use_cases(business_unit);
CREATE INDEX idx_use_cases_created_at ON use_cases(created_at DESC);

-- Full-text search
CREATE INDEX idx_use_cases_name_trgm ON use_cases USING gin(name gin_trgm_ops);
CREATE INDEX idx_use_cases_overview_trgm ON use_cases USING gin(brief_overview gin_trgm_ops);
```

## Relationships Summary

```
users (1) ----< (many) use_case_team_members >---- (many) use_cases (1)
users (1) ----< (many) use_cases (lead_user_id)

use_cases (1) ----< (many) use_case_categories >---- (many) categories (1)
use_cases (1) ----< (many) use_case_tools >---- (many) tools (1)
use_cases (1) ----< (many) use_case_steps (ordered)
use_cases (1) ----< (many) related_links
use_cases (1) ----< (many) use_case_search_tags >---- (many) search_tags (1)

predefined_steps (1) ----< (referenced by) use_case_steps (step_id)
```

## Data Model Considerations

### Submission Workflow States
1. **draft** - User is still editing
2. **submitted** - Submitted for review
3. **approved** - Approved by AI Academy team
4. **published** - Publicly visible in Use Cases library
5. **rejected** - Not approved (optional)

### Key Features Supported

✅ **Anonymous Submissions** - `is_anonymous` flag hides submitter in public view  
✅ **Draft Saving** - Status field allows saving work in progress  
✅ **Team Collaboration** - Multiple team members per use case  
✅ **Step Ordering** - `order_index` maintains step sequence  
✅ **Custom Steps** - `is_custom` flag distinguishes user-created steps  
✅ **Reusable Steps** - Library of predefined steps prevents duplication  
✅ **Rich Categorization** - Multiple categories and tags per use case  
✅ **Media Links** - Separate from regular links for better organization  

## Sample Queries

### Get Use Case with All Details
```sql
SELECT 
  uc.*,
  json_agg(DISTINCT jsonb_build_object(
    'name', u.name,
    'email', u.email
  )) FILTER (WHERE u.id IS NOT NULL) as team_members,
  json_agg(DISTINCT c.name) FILTER (WHERE c.id IS NOT NULL) as categories,
  json_agg(DISTINCT t.name) FILTER (WHERE t.id IS NOT NULL) as tools
FROM use_cases uc
LEFT JOIN use_case_team_members uctm ON uc.id = uctm.use_case_id
LEFT JOIN users u ON uctm.user_id = u.id
LEFT JOIN use_case_categories ucc ON uc.id = ucc.use_case_id
LEFT JOIN categories c ON ucc.category_id = c.id
LEFT JOIN use_case_tools uct ON uc.id = uct.use_case_id
LEFT JOIN tools t ON uct.tool_id = t.id
WHERE uc.id = $1
GROUP BY uc.id;
```

### Get Steps in Order
```sql
SELECT *
FROM use_case_steps
WHERE use_case_id = $1
ORDER BY order_index ASC;
```

### Search Use Cases
```sql
SELECT DISTINCT uc.*
FROM use_cases uc
LEFT JOIN use_case_search_tags ucst ON uc.id = ucst.use_case_id
LEFT JOIN search_tags st ON ucst.tag_id = st.id
LEFT JOIN use_case_categories ucc ON uc.id = ucc.use_case_id
LEFT JOIN categories c ON ucc.category_id = c.id
WHERE 
  uc.status = 'published'
  AND (
    uc.name ILIKE '%' || $1 || '%'
    OR uc.brief_overview ILIKE '%' || $1 || '%'
    OR st.name ILIKE '%' || $1 || '%'
    OR c.name ILIKE '%' || $1 || '%'
  )
ORDER BY uc.created_at DESC
LIMIT 20;
```

## Migration Strategy

1. **Phase 1**: Core tables (users, use_cases, predefined_steps)
2. **Phase 2**: Relationship tables (team members, categories, tools)
3. **Phase 3**: Steps and links
4. **Phase 4**: Search optimization (tags, indexes)

## Questions for Your Team

1. **Database Choice**: PostgreSQL, MySQL, or other?
2. **Authentication**: How are users authenticated? (OAuth, LDAP, etc.)
3. **File Storage**: Where should thumbnails be stored? (S3, local filesystem, etc.)
4. **Review Process**: Who approves submissions? Need approval workflow tables?
5. **Analytics**: Should we track views, likes, or usage statistics?
6. **Versioning**: Do use cases need version history?
7. **Comments**: Should users be able to comment on published use cases?

## Next Steps

- [ ] Review ERD with team
- [ ] Decide on database technology
- [ ] Set up authentication/user management
- [ ] Create migration files
- [ ] Build API endpoints
- [ ] Connect frontend forms to backend
