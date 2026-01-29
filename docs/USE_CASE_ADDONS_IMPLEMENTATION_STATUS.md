# Use Case Addons - Implementation Status

## ✅ Completed: Backend Infrastructure (Phase 1)

### Database Schema
- **✅ Created migration**: `src/server/db/migrations/002_add_use_case_addons.sql`
  - `use_case_addons` table for storing addon relationships
  - `use_case_addon_steps` table for custom step sequences
  - Proper indexes for performance
  - Constraints to prevent circular dependencies
  - Cascade deletes for data integrity

### Models
- **✅ Created**: `src/server/db/models/useCaseAddon.ts`
  - `UseCaseAddon` interface
  - `UseCaseAddonStep` interface
  - Row transformation functions
  - Insert data preparation functions

### Services
- **✅ Created**: `src/server/db/useCaseAddonsService.ts`
  - `createAddon()` - Create new addon paths with validation
  - `getAddonsForUseCase()` - Fetch all addons for a base use case
  - `getAddonById()` - Get addon with full details
  - `updateAddon()` - Update addon metadata and steps
  - `deleteAddon()` - Remove addon path
  - `getAddonStepsWithDetails()` - Get complete step sequence
  - `checkCircularDependency()` - Prevent circular references
  - `getAvailableAddons()` - List use cases that can be added

### API Endpoints
- **✅ Created**: `src/server/routes/useCaseAddons.ts`
  - `GET /api/use-cases/:useCaseId/addons` - List all addons
  - `GET /api/use-cases/:useCaseId/available-addons` - List available use cases
  - `GET /api/use-cases/:useCaseId/addons/:addonId` - Get specific addon
  - `GET /api/use-cases/:useCaseId/addons/:addonId/steps` - Get addon steps
  - `POST /api/use-cases/:useCaseId/addons` - Create new addon
  - `PUT /api/use-cases/:useCaseId/addons/:addonId` - Update addon
  - `DELETE /api/use-cases/:useCaseId/addons/:addonId` - Delete addon

### Server Integration
- **✅ Registered routes** in `src/server/index.ts`

## 📋 TODO: Frontend Implementation (Phases 2-4)

### Phase 2: Admin UI Components

#### 1. Install Drag-and-Drop Library
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

#### 2. Create Addon Modal Component
**File**: `src/components/UseCaseAddonModal.tsx`

**Features needed**:
- Search bar for filtering use cases
- List of available use cases with thumbnails
- Path name and description inputs
- Drag-and-drop step ordering interface
- Visual indicators for step source (base vs addon use case)
- Add custom step button
- Save/Cancel actions
- Loading and error states

**Key State**:
```typescript
interface AddonModalState {
  isOpen: boolean;
  searchQuery: string;
  selectedAddon: UseCase | null;
  pathName: string;
  description: string;
  steps: AddonStep[];  // Combined and reorderable
  isLoading: boolean;
  error: string | null;
}
```

#### 3. Create Drag-and-Drop Step Ordering Component
**File**: `src/components/AddonStepOrdering.tsx`

**Features needed**:
- Two-column layout showing base and addon steps
- Drag handles for reordering
- Visual distinction between base/addon/custom steps
- Step number indicators that update as you drag
- Inline custom step creation
- Delete step functionality

#### 4. Update Use Cases Library Page
**File**: `src/pages/LibraryComponents/UseCasesLibrary.tsx`

**Add to admin view**:
- "➕ Add Another Use Case" button in each use case card
- "Manage Learning Paths" section showing existing addons
- Edit/Delete buttons for each addon path
- Display format: "Base Use Case + Addon Use Case"

### Phase 3: User-Facing UI

#### 1. Update Use Case Detail View
**File**: Create `src/pages/UseCaseDetail.tsx` (or update existing)

**Features needed**:
- Standard "Get Started" button for base use case
- "Extended Learning Paths" section (if addons exist)
- Each addon displays:
  - Path name and description
  - "Base + Addon" composition
  - "Start This Path" button
  - Link to view addon use case separately

#### 2. Update Step Navigation
**Files**: Update step navigation components

**Features needed**:
- Load addon path steps when user selects an addon path
- Display breadcrumbs: Home > Use Cases > [Base] > [Path Name]
- Show which use case each step originated from
- Maintain path context throughout navigation

### Phase 4: Testing & Polish

#### Database Migration
```bash
# Run the migration
psql -U your_username -d ai_dev_tools -f src/server/db/migrations/002_add_use_case_addons.sql
```

#### API Testing
Create test cases for:
- Creating addons with various step configurations
- Updating addon paths
- Deleting addons
- Circular dependency prevention
- Step ordering validation

#### UI Testing
- Admin workflow: Create, edit, delete addons
- User workflow: View and select learning paths
- Drag-and-drop functionality
- Custom step creation
- Error handling and validation

## 🎨 UI/UX Design Guidelines

### Admin Interface

**Colors**:
- Base use case steps: Light blue background (#e3f2fd)
- Addon use case steps: Light green background (#e8f5e9)
- Custom steps: Light yellow background (#fff9c4)

**Icons**:
- Drag handle: ⋮⋮
- Add addon: ➕
- Edit: ✏️
- Delete: 🗑️
- Custom step: ⭐

### User Interface

**Path Option Card**:
```
┌─────────────────────────────────────┐
│ 📚 Generate Video + Build Website  │
│                                     │
│ Learn to create videos and embed   │
│ them in a professional website      │
│                                     │
│ Base: Generate Video                │
│   +  Addon: Build Frontend Website │
│                                     │
│ [Start This Path] [View Separately] │
└─────────────────────────────────────┘
```

## 📝 Example Usage

### Admin Creating an Addon

1. Admin views "Generate Video" use case in library
2. Clicks "+ Add Another Use Case"
3. Modal opens, searches for "frontend"
4. Selects "Build a Frontend Website"
5. Names path: "Video for Website"
6. Sees all steps from both use cases
7. Drags "Create HTML page" to come after "Generate video"
8. Adds custom step "Embed Video in Page"
9. Saves the path

### User Selecting a Path

1. User views "Generate Video" use case
2. Sees "Extended Learning Paths" section
3. Sees option "Video for Website"
4. Clicks "Start This Path"
5. Begins steps following the custom sequence
6. Each step shows its source use case
7. Can click link to view original use cases

## 🔧 Implementation Tips

### API Integration Pattern
```typescript
// Fetch addons for a use case
const response = await fetch(`/api/use-cases/${useCaseId}/addons`);
const { addons } = await response.json();

// Create new addon
const response = await fetch(`/api/use-cases/${useCaseId}/addons`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    addon_use_case_id: selectedUseCaseId,
    path_name: pathName,
    description: description,
    created_by: 'Admin User',
    steps: orderedSteps.map((step, index) => ({
      step_id: step.step_id || null,
      step_order: index + 1,
      source_use_case_id: step.source_use_case_id,
      custom_step_title: step.custom_step_title,
      custom_step_description: step.custom_step_description,
      custom_step_content: step.custom_step_content
    }))
  })
});
```

### Drag-and-Drop Pattern
```typescript
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function handleDragEnd(event) {
  const { active, over } = event;
  if (active.id !== over.id) {
    setSteps((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }
}
```

## 🚀 Next Steps Priority

1. **High Priority**:
   - Install drag-and-drop library
   - Create `UseCaseAddonModal` component
   - Add "+ Add Another Use Case" button to library

2. **Medium Priority**:
   - Implement step ordering interface
   - Add addon management to admin view
   - Create user path selection UI

3. **Low Priority**:
   - Add analytics for path usage
   - Create path templates
   - Add recommendation engine

## 📚 Reference Documentation

- Feature Specification: `docs/USE_CASE_ADDONS_FEATURE.md`
- Database Schema: `src/server/db/migrations/002_add_use_case_addons.sql`
- API Routes: `src/server/routes/useCaseAddons.ts`
- Service Layer: `src/server/db/useCaseAddonsService.ts`

## ✅ Backend Checklist

- [x] Database schema designed
- [x] Migration created
- [x] Models created
- [x] Service layer implemented
- [x] API endpoints created
- [x] Routes registered
- [x] Validation added
- [x] Error handling implemented
- [x] Circular dependency prevention
- [x] Documentation written

## 📋 Frontend Checklist

- [ ] Install @dnd-kit dependencies
- [ ] Create UseCaseAddonModal component
- [ ] Create AddonStepOrdering component
- [ ] Add "Add Another Use Case" button
- [ ] Implement addon management UI
- [ ] Create user path selection interface
- [ ] Update step navigation
- [ ] Add breadcrumbs for addon paths
- [ ] Implement custom step creation
- [ ] Add loading and error states
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Test complete user workflows
- [ ] Polish UI/UX
- [ ] Add accessibility features
