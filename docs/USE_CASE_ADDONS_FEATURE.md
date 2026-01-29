# Use Case Addons Feature

## Overview
Allow admin users to create composite learning paths by linking multiple use cases together. This enables creating "base + addon" experiences where users can extend a foundational use case with optional follow-on use cases.

## User Stories

### Admin User Story
As an admin user, when I'm viewing a use case in the Use Case Library:
1. I can click "Add Another Use Case" button
2. A modal opens with a search bar to find use cases
3. I can search and select a use case to add as an addon
4. I see all steps from both use cases and can drag/drop to reorder them
5. I can create new custom steps within the addon path
6. I save this as a "Path Option" with a descriptive name
7. Multiple path options can be created for a single base use case

### End User Story
As an end user viewing a use case:
1. I see the standard "Get Started" button for the base use case
2. If addons exist, I see additional "Learning Path Options" section
3. Each option shows: "Base Use Case + Addon Use Case"
4. When I select a path option, my steps include the merged/reordered sequence
5. I can click links to view each constituent use case separately

## Example Scenarios

### Example 1: Video Generation + Website
**Base Use Case**: "Generate Video"
- Steps: Set up video tools, create script, generate video, export

**Addon Use Case**: "Build a Frontend Website"
- Steps: Set up dev environment, create HTML, style with CSS, deploy

**Combined Path**: "Generate Video for Website"
- Admin can reorder to: Setup tools → Create script → Setup dev environment → Generate video → Create HTML page → Embed video → Deploy

### Example 2: Data Analysis + Presentation
**Base Use Case**: "Analyze Dataset with Python"
**Addon Use Case**: "Create Slide Deck"
**Combined Path**: "Data Analysis to Presentation"

## Database Schema

### New Tables

#### use_case_addons
Stores the relationship between base use cases and their addons.

```sql
CREATE TABLE use_case_addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  base_use_case_id UUID NOT NULL REFERENCES use_cases(id) ON DELETE CASCADE,
  addon_use_case_id UUID NOT NULL REFERENCES use_cases(id) ON DELETE CASCADE,
  path_name VARCHAR(255) NOT NULL, -- Display name for this path option
  description TEXT, -- Optional description of what this path teaches
  display_order INTEGER DEFAULT 0, -- Order to display multiple addons
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(base_use_case_id, addon_use_case_id, path_name)
);
```

#### use_case_addon_steps
Stores the customized step sequence for each addon path.

```sql
CREATE TABLE use_case_addon_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  addon_id UUID NOT NULL REFERENCES use_case_addons(id) ON DELETE CASCADE,
  step_id UUID REFERENCES steps(id) ON DELETE CASCADE, -- NULL for custom steps
  step_order INTEGER NOT NULL, -- Position in the sequence
  source_use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE, -- Which use case this step came from
  
  -- For custom steps created during path creation
  custom_step_title VARCHAR(255),
  custom_step_description TEXT,
  custom_step_content JSONB,
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(addon_id, step_order)
);
```

### Indexes
```sql
CREATE INDEX idx_use_case_addons_base ON use_case_addons(base_use_case_id);
CREATE INDEX idx_use_case_addons_addon ON use_case_addons(addon_use_case_id);
CREATE INDEX idx_use_case_addon_steps_addon ON use_case_addon_steps(addon_id);
CREATE INDEX idx_use_case_addon_steps_order ON use_case_addon_steps(addon_id, step_order);
```

## API Endpoints

### Get Addons for a Use Case
```
GET /api/use-cases/:useCaseId/addons
Response: {
  addons: [
    {
      id: string,
      path_name: string,
      description: string,
      addon_use_case: UseCase,
      steps: AddonStep[],
      display_order: number
    }
  ]
}
```

### Create Addon Path
```
POST /api/use-cases/:useCaseId/addons
Body: {
  addon_use_case_id: string,
  path_name: string,
  description: string,
  steps: [
    {
      step_id: string | null,
      source_use_case_id: string,
      step_order: number,
      // For custom steps
      custom_step_title?: string,
      custom_step_description?: string,
      custom_step_content?: JSONB
    }
  ]
}
```

### Update Addon Path
```
PUT /api/use-cases/:useCaseId/addons/:addonId
Body: Same as create
```

### Delete Addon Path
```
DELETE /api/use-cases/:useCaseId/addons/:addonId
```

### Get Addon Path Steps
```
GET /api/use-cases/:useCaseId/addons/:addonId/steps
Response: {
  base_use_case: UseCase,
  addon_use_case: UseCase,
  steps: [
    {
      id: string,
      title: string,
      description: string,
      detailed_content: JSONB,
      step_order: number,
      source_use_case_id: string,
      source_use_case_title: string,
      is_custom: boolean
    }
  ]
}
```

## UI Components

### Admin: Add Addon Button
Located in Use Case Library view for each use case:
```tsx
<button onClick={openAddonModal}>
  + Add Another Use Case
</button>
```

### Admin: Addon Creation Modal
Features:
1. **Search Bar**: Real-time search of available use cases
2. **Use Case Selection**: Shows filtered results with thumbnails
3. **Path Name Input**: Required name for this learning path
4. **Description Input**: Optional description
5. **Step Ordering Interface**: Drag-and-drop list showing:
   - Base use case steps (in current order)
   - Addon use case steps (in current order)
   - Ability to drag any step to new position
   - Visual indicators showing which use case each step comes from
6. **Add Custom Step**: Button to create new steps inline
7. **Preview**: Shows combined step sequence
8. **Save/Cancel**: Actions to create or abandon addon

### Admin: Manage Addons
In Use Case Library detail view:
```tsx
<section className="use-case-addons">
  <h3>Learning Path Options</h3>
  {addons.map(addon => (
    <div key={addon.id} className="addon-card">
      <h4>{addon.path_name}</h4>
      <p>{addon.description}</p>
      <span>Base + {addon.addon_use_case.title}</span>
      <button onClick={() => editAddon(addon)}>Edit Path</button>
      <button onClick={() => deleteAddon(addon)}>Delete Path</button>
    </div>
  ))}
</section>
```

### User: Path Selection
In regular use case view for end users:
```tsx
<div className="learning-paths">
  <div className="base-path">
    <h3>Standard Path</h3>
    <p>{useCase.title}</p>
    <button onClick={startStandardPath}>Get Started</button>
  </div>
  
  {addons.length > 0 && (
    <div className="addon-paths">
      <h3>Extended Learning Paths</h3>
      {addons.map(addon => (
        <div key={addon.id} className="addon-path-option">
          <h4>{addon.path_name}</h4>
          <p>{addon.description}</p>
          <div className="path-composition">
            <span className="base">{useCase.title}</span>
            <span className="plus">+</span>
            <span className="addon">{addon.addon_use_case.title}</span>
          </div>
          <button onClick={() => startAddonPath(addon.id)}>
            Start This Path
          </button>
          <a href={`/use-cases/${addon.addon_use_case.id}`}>
            View {addon.addon_use_case.title} separately
          </a>
        </div>
      ))}
    </div>
  )}
</div>
```

## Step Navigation Updates

When a user starts an addon path:
1. The step sequence is loaded from `use_case_addon_steps` ordered by `step_order`
2. Each step displays which use case it originated from
3. Navigation maintains context of the current path
4. Breadcrumb shows: Home > Use Cases > [Base Use Case] > [Path Name]

## Drag-and-Drop Implementation

Using `react-beautiful-dnd` or similar library:

```tsx
<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="addon-steps">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <div className="steps-section">
          <h4>Base Use Case: {baseUseCase.title}</h4>
          {baseSteps.map((step, index) => (
            <Draggable key={step.id} draggableId={step.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="step-item base-step"
                >
                  <span className="drag-handle">⋮⋮</span>
                  <span className="step-number">{index + 1}</span>
                  <span className="step-title">{step.title}</span>
                  <span className="step-source">From: {baseUseCase.title}</span>
                </div>
              )}
            </Draggable>
          ))}
        </div>
        
        <div className="steps-section">
          <h4>Addon Use Case: {addonUseCase.title}</h4>
          {addonSteps.map((step, index) => (
            <Draggable 
              key={step.id} 
              draggableId={step.id} 
              index={baseSteps.length + index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="step-item addon-step"
                >
                  <span className="drag-handle">⋮⋮</span>
                  <span className="step-number">{baseSteps.length + index + 1}</span>
                  <span className="step-title">{step.title}</span>
                  <span className="step-source">From: {addonUseCase.title}</span>
                </div>
              )}
            </Draggable>
          ))}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
```

## Permissions

- **Admin Users**: Can create, edit, delete addon paths
- **Regular Users**: Can view and start addon paths
- **Review Process**: Addon paths may require approval if base/addon use cases are in review

## Data Validation

1. Base and addon use cases must both exist and be approved
2. Path name is required and must be unique for that base use case
3. Step ordering must be sequential (1, 2, 3, ...) with no gaps
4. Custom steps require title and description
5. Cannot create circular dependencies (Use Case A → B → A)

## Implementation Phases

### Phase 1: Database & Backend
- [ ] Create migration for new tables
- [ ] Add models for addons and addon steps
- [ ] Create service layer methods
- [ ] Implement API endpoints
- [ ] Add validation logic

### Phase 2: Admin UI
- [ ] Create addon modal component
- [ ] Implement search functionality
- [ ] Build drag-and-drop interface
- [ ] Add custom step creation
- [ ] Create management interface

### Phase 3: User UI
- [ ] Add path selection interface
- [ ] Update step navigation for addon paths
- [ ] Add breadcrumbs and source indicators
- [ ] Create links to constituent use cases

### Phase 4: Testing & Polish
- [ ] Test addon creation workflow
- [ ] Test step ordering and custom steps
- [ ] Test user path selection and navigation
- [ ] Add loading states and error handling
- [ ] Create documentation for admins

## Future Enhancements

1. **Analytics**: Track which paths are most popular
2. **Recommendations**: Suggest relevant addons based on user progress
3. **Templates**: Pre-built path templates for common combinations
4. **Branching**: Allow conditional paths based on user choices
5. **Collaboration**: Let multiple admins work on path creation
6. **Versioning**: Track changes to addon paths over time
