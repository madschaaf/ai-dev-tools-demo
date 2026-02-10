# Custom Steps Editor - Word-Style List Editing

## Overview
The CustomStepsEditor component provides a Word document-style interface for creating and editing custom step instructions with rich formatting options.

## Features

### 1. **List Style Selection**
- Toggle between bullet points (•) and numbered lists (1., 2., 3.)
- Applied globally to all steps in the editor
- Easy switching with clearly labeled buttons

### 2. **Smart Keyboard Navigation**
- **Enter**: Creates a new step at the cursor position
  - If at end of line with content: Adds new step below
  - If in middle of line: Splits content into two steps
  - If on empty line (not first): Removes empty step and focuses previous
- **Shift+Enter**: Adds line break within the current step
- **Backspace at beginning**: Merges current step with previous step

### 3. **Optional Title Field**
- Checkbox to enable/disable title for each step
- When enabled:
  - Title appears as large, bold heading in preview
  - Main text becomes regular content
- When disabled:
  - Main text serves as both title and content

### 4. **Additional Details Field**
- Checkbox to enable paragraph mode for detailed explanations
- Supports multi-line detailed content
- Displayed as secondary text in preview
- Perfect for examples, warnings, or additional context

### 5. **Advanced Customization**
Collapsible panel for each step with rich content options:

#### Code Blocks
- Syntax highlighting support
- Language specification
- Monospace formatting
- Copy button in preview

#### Callouts/Alerts
- Four variants: Info (blue), Warning (orange), Success (green), Error (red)
- Ideal for important notes or warnings
- Colored backgrounds with icons

#### Links
- Custom link text
- URL field
- Opens in new tab in preview

#### Highlighted Sections
- Custom label
- Bordered container with background
- Great for special notes or requirements

### 6. **Live Preview**
- Real-time preview of how steps will appear
- Mimics actual step detail view
- Shows all formatting including rich content
- Split-screen design for easy editing and verification

## Usage

```typescript
import { CustomStepsEditor } from './components/CustomStepsEditor';

function MyComponent() {
  const [steps, setSteps] = useState([]);

  return (
    <CustomStepsEditor onStepsChange={setSteps} />
  );
}
```

## Data Structure

### CustomStep Interface
```typescript
interface CustomStep {
  id: string;
  text: string;              // Main step content
  title?: string;            // Optional title
  detailedContent?: string;  // Optional paragraph details
  richContent?: DetailedContentItem[]; // Optional advanced formatting
}
```

### Rich Content Types
- `code`: Code blocks with syntax highlighting
- `callout`: Alert boxes with variants
- `link`: Hyperlinks
- `section`: Highlighted sections with labels

## User Experience

### Creating Steps
1. Type step description in main text field
2. Press Enter to create next step
3. Optionally enable Title checkbox for custom heading
4. Optionally enable Additional Details for extended content
5. Click Advanced Customization to add rich formatting

### List Formatting
- Select bullet or numbered at top of editor
- All steps update to match selected style
- Visual marker appears beside each step

### Editing Steps
- Click in any field to edit
- Use keyboard shortcuts for efficient navigation
- Remove steps with × button
- Add new steps with + Add Step button

### Rich Content Management
1. Click "Advanced Customization" button on any step
2. Select type of content to add (Code, Callout, Link, or Highlight)
3. Fill in the content fields
4. Remove with × button if needed
5. Preview updates in real-time

## Implementation Details

### State Management
- Controlled component with `onStepsChange` callback
- Internal state for UI (expanded panels, focus management)
- Ref-based focus control for keyboard navigation

### Keyboard Handling
- Custom `handleKeyDown` function for Enter and Backspace
- Cursor position tracking for smart splitting
- Focus management with timeouts for React lifecycle

### Preview Rendering
- Uses `StepContentRenderer` for consistent display
- Filters empty steps from preview
- Simulates actual step detail view appearance

## Best Practices

1. **Keep titles concise** - They appear as large headings
2. **Use detailed content for explanations** - Separates overview from details
3. **Add rich content sparingly** - Too much formatting can be overwhelming
4. **Test keyboard navigation** - Efficient for power users
5. **Use callouts for important information** - Draws attention to critical notes

## Accessibility

- Keyboard-accessible controls
- Clear labels for all interactive elements
- Visual indicators for active/selected states
- Semantic HTML in preview

## Future Enhancements

Potential improvements:
- Drag-and-drop reordering
- Step templates
- Import/export functionality
- Collaborative editing
- Undo/redo support
- Custom keyboard shortcuts
