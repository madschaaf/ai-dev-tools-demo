# Editable Steps Architecture Plan

## Problem Statement

Currently, dynamic steps have hardcoded JSX content in their component files (e.g., InstallChrome.tsx). During use case submission, users can only edit the step title and description, but not the detailed instructions, code snippets, or other rich content.

## Proposed Solution

Store ALL step content in a structured data format that can be:
1. Rendered dynamically
2. Edited by users in the Use Case Prototype
3. Saved to the database
4. Displayed in various contexts (Use Case Library, Step Detail pages, etc.)

## Enhanced Database Schema

### Updated DynamicStep Interface

```typescript
export interface DetailedContentItem {
  id?: string;                    // Unique identifier for editing
  type: 'text' | 'heading' | 'code' | 'list' | 'callout' | 'image' | 'link';
  label?: string;                 // Optional label (e.g., "Option A:")
  text: string;                   // The actual content
  copy_to_clipboard?: boolean;    // Show copy button
  language?: string;              // For code blocks (bash, javascript, etc.)
  variant?: 'info' | 'warning' | 'success' | 'error';  // For callouts
  items?: string[];               // For lists
  url?: string;                   // For links and images
}

export interface DynamicStep {
  id: string;
  title: string;
  description: string;            // Brief summary (used in lists)
  category: 'security' | 'access' | 'admin' | 'install' | 'setup' | 'config' | 'practice';
  
  // Enhanced detailed content
  detailed_content: DetailedContentItem[];
  
  // Optional metadata
  links?: Array<{ label: string; url: string }>;
  requirements?: string[];
  commonIssues?: string[];
  tags?: string[];
  
  // Tracking fields
  created_by?: string;
  approved_by?: string;
  approval_date?: string;
  last_modified?: string;
  modified_by?: string;
  count_modified?: number;
}
```

## Example: InstallChrome Step Data

```typescript
{
  id: 'install-chrome',
  title: 'Install Google Chrome',
  description: 'Install Google Chrome browser and sign in with eBay credentials.',
  category: 'install',
  detailed_content: [
    {
      id: 'intro',
      type: 'text',
      text: 'Google Chrome is a fast, secure web browser that\'s required for accessing eBay\'s AI tools and extensions.'
    },
    {
      id: 'why-chrome-heading',
      type: 'heading',
      text: 'Why Chrome?',
      level: 2
    },
    {
      id: 'why-chrome-list',
      type: 'list',
      items: [
        'Required for eBay\'s approved AI extensions (ChatGPT and Glean)',
        'Developer tools for debugging',
        'Extension support for productivity tools',
        'Sign in with eBay credentials for company access'
      ]
    },
    {
      id: 'install-heading',
      type: 'heading',
      text: 'Installation',
      level: 2
    },
    {
      id: 'install-callout',
      type: 'callout',
      variant: 'info',
      text: 'You need local administrator access to install Chrome. If you don\'t have it, request it first.'
    },
    {
      id: 'download-step',
      type: 'text',
      text: '1. Go to google.com/chrome'
    },
    {
      id: 'download-link',
      type: 'link',
      text: 'Download Chrome',
      url: 'https://www.google.com/chrome/'
    },
    {
      id: 'mac-install',
      type: 'text',
      label: 'Mac:',
      text: 'Open the downloaded .dmg file, drag Chrome to your Applications folder, eject the disk image'
    },
    {
      id: 'windows-install',
      type: 'text',
      label: 'Windows:',
      text: 'Run the downloaded .exe file, follow the installation wizard'
    }
  ],
  requirements: [
    'eBay email account (@ebay.com)',
    'Internet connection',
    'Administrator access for installation'
  ],
  commonIssues: [
    'Chrome won\'t install: Ensure you have local admin access',
    'Sign-in fails: Verify you\'re using @ebay.com email'
  ],
  tags: ['chrome', 'browser', 'google', 'install']
}
```

## Implementation Components

### 1. Content Renderer Component

```typescript
// src/components/StepContentRenderer.tsx
interface StepContentRendererProps {
  content: DetailedContentItem[];
  editable?: boolean;
  onEdit?: (content: DetailedContentItem[]) => void;
}

export function StepContentRenderer({ content, editable, onEdit }: StepContentRendererProps) {
  return (
    <div className="step-content">
      {content.map((item, index) => {
        switch (item.type) {
          case 'heading':
            return <h2 key={item.id || index}>{item.text}</h2>;
          
          case 'text':
            return (
              <p key={item.id || index}>
                {item.label && <strong>{item.label} </strong>}
                {item.text}
              </p>
            );
          
          case 'code':
            return (
              <CodeBlock
                key={item.id || index}
                code={item.text}
                language={item.language}
                copyable={item.copy_to_clipboard}
              />
            );
          
          case 'list':
            return (
              <ul key={item.id || index}>
                {item.items?.map((listItem, i) => (
                  <li key={i}>{listItem}</li>
                ))}
              </ul>
            );
          
          case 'callout':
            return (
              <Callout key={item.id || index} variant={item.variant}>
                {item.text}
              </Callout>
            );
          
          case 'link':
            return (
              <a key={item.id || index} href={item.url} target="_blank" rel="noopener noreferrer">
                {item.text}
              </a>
            );
          
          default:
            return null;
        }
      })}
    </div>
  );
}
```

### 2. Content Editor Component

```typescript
// src/components/StepContentEditor.tsx
interface StepContentEditorProps {
  content: DetailedContentItem[];
  onChange: (content: DetailedContentItem[]) => void;
}

export function StepContentEditor({ content, onChange }: StepContentEditorProps) {
  const [items, setItems] = useState(content);
  
  const updateItem = (index: number, updates: Partial<DetailedContentItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    setItems(newItems);
    onChange(newItems);
  };
  
  const addItem = (type: DetailedContentItem['type']) => {
    const newItem: DetailedContentItem = {
      id: `item-${Date.now()}`,
      type,
      text: ''
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    onChange(newItems);
  };
  
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };
  
  return (
    <div className="step-content-editor">
      {items.map((item, index) => (
        <ContentItemEditor
          key={item.id || index}
          item={item}
          onUpdate={(updates) => updateItem(index, updates)}
          onRemove={() => removeItem(index)}
        />
      ))}
      
      <div className="add-content-buttons">
        <button onClick={() => addItem('heading')}>+ Heading</button>
        <button onClick={() => addItem('text')}>+ Text</button>
        <button onClick={() => addItem('code')}>+ Code</button>
        <button onClick={() => addItem('list')}>+ List</button>
        <button onClick={() => addItem('callout')}>+ Callout</button>
      </div>
    </div>
  );
}
```

### 3. Updated UseCasePrototype Integration

```typescript
// In UseCasePrototype.tsx - Step Details View

{selectedStep ? (
  <article className="page link-detail">
    {editingStepId === selectedStep.id ? (
      <StepContentEditor
        content={selectedStep.detailed_content || []}
        onChange={(newContent) => {
          setGeneratedSteps(generatedSteps.map(step =>
            step.id === selectedStep.id
              ? { ...step, detailed_content: newContent }
              : step
          ));
        }}
      />
    ) : (
      <StepContentRenderer
        content={selectedStep.detailed_content || []}
      />
    )}
  </article>
) : null}
```

## Migration Path

### Phase 1: Data Structure
1. Update DynamicStep interface in stepsData.ts
2. Convert existing steps to use detailed_content array
3. Ensure backward compatibility

### Phase 2: Renderer
1. Create StepContentRenderer component
2. Replace hardcoded JSX with renderer
3. Test all existing steps

### Phase 3: Editor
1. Create StepContentEditor component
2. Integrate into UseCasePrototype
3. Add validation and preview

### Phase 4: Database
1. Update backend schema
2. Create API endpoints for step CRUD
3. Implement save/load functionality

## Benefits

1. **User Editability**: Users can customize every aspect of a step
2. **Consistency**: All steps follow the same data structure
3. **Portability**: Steps can be exported/imported as JSON
4. **Version Control**: Track changes to step content over time
5. **Localization**: Easy to translate content
6. **Search**: Full-text search across all step content
7. **Analytics**: Track which parts of steps users interact with

## Next Steps

1. Review and approve this architecture
2. Update the DynamicStep interface
3. Create the renderer component
4. Migrate one step (e.g., InstallChrome) as a proof of concept
5. Roll out to all steps
6. Implement the editor component
7. Connect to backend database

## Questions to Consider

1. **Rich Text**: Do we need rich text editing (bold, italic, etc.)?
2. **Images**: Should we support embedded images or just links?
3. **Videos**: Support embedded videos?
4. **Interactive Elements**: Checkboxes, quizzes, etc.?
5. **Versioning**: How do we handle step versions?
6. **Permissions**: Who can edit pre-configured steps?
