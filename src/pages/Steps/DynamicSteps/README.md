# Dynamic Steps System

This folder contains copies of step components and reusable step definitions for the Use Case Prototype. The original step files remain unchanged in `src/pages/Steps/steps/` for the main Steps Guide.

## Files

### `stepsData.ts`
Contains all step definitions with detailed content, links, requirements, and common issues. Used for generating steps in the Use Case Prototype.

### Component Files (*.tsx)
Copies of all step components from `src/pages/Steps/steps/`. These copies can be modified for the Use Case Prototype without affecting the original Steps Guide.

**Available Step Components:**
- AIToolsCheckpoint.tsx
- CloneRepository.tsx
- ConfigureGit.tsx
- ConfigureMCPs.tsx
- ConfigureVSCode.tsx
- FinalAICheckpoint.tsx
- InstallChatGPTCLI.tsx
- InstallChromeGlean.tsx
- InstallClaude.tsx
- InstallCline.tsx
- InstallExtensions.tsx
- InstallGit.tsx
- InstallMarkoSkin.tsx
- InstallNode.tsx
- InstallObsidian.tsx
- InstallPoolside.tsx
- InstallVSCode.tsx
- IntroToAI.tsx
- JoinSlackChannels.tsx
- LocalAdminAccess.tsx
- PracticeExercises.tsx
- RequestAccess.tsx
- RoleSelection.tsx
- SetupEnvironment.tsx
- SetupGitHub.tsx
- SetupGithubCopilot.tsx
- SetupGitHubEnterprise.tsx
- SetupObsidianNotes.tsx
- SetupProxy.tsx
- UserInfo.tsx
- VerifySecurity.tsx
- VSCodeExtensionsCheckpoint.tsx

## Step Structure

Each step has the following properties:

```typescript
interface DynamicStep {
  id: string;                    // Unique identifier
  title: string;                 // Step title
  description: string;           // Brief description
  category: string;              // 'security' | 'access' | 'admin' | 'install' | 'setup' | 'config' | 'practice'
  detailedContent?: string;      // Full step instructions (markdown supported)
  links?: Array<{                // Related links
    label: string;
    url: string;
  }>;
  requirements?: string[];       // Prerequisites
  commonIssues?: string[];       // Known issues and solutions
}
```

## Usage

### Import the steps

```typescript
import { DYNAMIC_STEPS, getStepById, searchSteps } from './Steps/DynamicSteps/stepsData';
```

### Get all steps

```typescript
const allSteps = DYNAMIC_STEPS;
```

### Get a specific step

```typescript
const step = getStepById('install-nodejs');
```

### Search steps

```typescript
const results = searchSteps('github');
```

### Filter by category

```typescript
import { getStepsByCategory } from './Steps/DynamicSteps/stepsData';

const installSteps = getStepsByCategory('install');
const securitySteps = getStepsByCategory('security');
```

## Adding New Steps

To add a new step, add it to the `DYNAMIC_STEPS` array in `stepsData.ts`:

```typescript
{
  id: 'my-new-step',
  title: 'My New Step',
  description: 'Brief description of what this step does',
  category: 'install',
  detailedContent: `Full instructions here...
  
**Step 1**
Do this thing

**Step 2**
Do that thing`,
  links: [
    { label: 'Official Docs', url: 'https://example.com/docs' }
  ],
  requirements: [
    'Requirement 1',
    'Requirement 2'
  ],
  commonIssues: [
    'Issue 1 and how to fix it',
    'Issue 2 and how to fix it'
  ]
}
```

## Categories

- **security**: Authentication and security setup steps
- **access**: Access request and permission steps
- **admin**: Administrative rights and privileges
- **install**: Software installation steps
- **setup**: Configuration and setup steps
- **config**: Advanced configuration
- **practice**: Practice exercises and learning

## Integration with Use Case Prototype

The Use Case Prototype (`UseCasePrototype.tsx`) automatically imports and uses these steps for:

1. **Step Generation**: Automatically generates appropriate steps based on user selections
2. **Step Search**: Allows users to search and add predefined steps
3. **Custom Steps**: Users can also create custom steps that follow the same structure

## Benefits

✅ **Centralized Data**: All step definitions in one place  
✅ **Reusability**: Use the same step data across multiple components  
✅ **Consistency**: Ensures steps are consistent across the application  
✅ **Maintainability**: Easy to update step content in one location  
✅ **Extensibility**: Simple to add new steps as needed

## Example: Creating a New Step Component

You can use the step data to create new step components:

```typescript
import { getStepById } from './Steps/DynamicSteps/stepsData';

function MyStepComponent() {
  const step = getStepById('install-nodejs');
  
  if (!step) return null;
  
  return (
    <div>
      <h2>{step.title}</h2>
      <p>{step.description}</p>
      {step.detailedContent && (
        <div>{step.detailedContent}</div>
      )}
      {step.links && (
        <div>
          {step.links.map(link => (
            <a key={link.url} href={link.url}>{link.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Folder Structure

```
src/pages/Steps/DynamicSteps/
├── stepsData.ts              # Centralized step data
├── README.md                 # This file
├── *.tsx                     # Copied step components (modifiable)
└── (future additions)
```

## Original vs. Dynamic Steps

### Original Steps (`src/pages/Steps/steps/`)
- Used by the main Steps Guide
- Should NOT be modified
- Full step-by-step guides with navigation

### Dynamic Steps (`src/pages/Steps/DynamicSteps/`)
- Copies of original steps
- Can be modified for Use Case Prototype
- Simplified format for use case workflows
- Used by `stepsData.ts` for data extraction

## Modifying Dynamic Steps

You can now modify any step component in this folder without affecting the original Steps Guide:

1. **Edit the component file** (e.g., `InstallNode.tsx`)
2. **Update `stepsData.ts`** with any new information
3. **Test in Use Case Prototype** at `/use-case-prototype`

The original steps in `src/pages/Steps/steps/` remain unchanged and continue to work in the main Steps Guide.

## Future Enhancements

Potential improvements to the Dynamic Steps system:

- [ ] Create a simplified step component format for use case prototype
- [ ] Add step dependencies (e.g., Step B requires Step A)
- [ ] Add estimated completion time for each step
- [ ] Add difficulty level (beginner, intermediate, advanced)
- [ ] Add role-specific steps (developer, designer, PM, etc.)
- [ ] Add interactive checkboxes for requirements
- [ ] Add video tutorials or screenshots
- [ ] Add success criteria for each step
- [ ] Internationalization support
- [ ] Auto-sync between component files and stepsData.ts
