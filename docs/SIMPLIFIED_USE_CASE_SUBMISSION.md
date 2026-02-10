# Simplified Use Case Submission Feature

## Overview

The Simplified Use Case Submission feature provides an easy, conversational way for eBay engineers to share their AI creations. The interface follows a simple 3-step approach: "Are you using AI? Cool, for what? Can you show me?"

## User Flow

### Step 1: What AI Tool Did You Use?
- **Dropdown selection** with popular AI tools (ChatGPT, Copilot, Claude, Cline, Cursor, V0, Windsurf, Gemini, Poolside, Other)
- **Optional link field** to the AI tool's URL

### Step 2: What Did You Create?
- **Text area** for describing the creation
- Examples: "Built an automated report generator", "Created custom VS Code snippets"

### Step 3: Can You Show Me?
Multiple upload/link options:

#### Image Upload
- Click or drag-and-drop to upload screenshots/diagrams
- **Thumbnail selection**: Checkbox to use uploaded image as use case thumbnail
- Alternative thumbnail upload if user doesn't want to use the main image

#### File Upload
- Support for any file type
- Files stored as media items with metadata

#### Link Management
- Add GitHub repos, Wiki pages, Confluence docs, or any other links
- **Auto-detection** of link types:
  - `github.com` → GitHub badge
  - `wiki` or `confluence` → Wiki badge
  - Other URLs → Generic link badge

## AI Autofill Feature (Hybrid Approach)

### How It Works

The AI Autofill button uses a **hybrid approach** to generate implementation steps:

```
1. Check for Pre-Configured Steps
   ↓ (if found matching AI tool)
   Use existing DYNAMIC_STEPS template
   ↓
2. No Match Found?
   ↓
   Call AI API to generate custom steps
   ↓
3. Return formatted steps matching schema
```

### Pre-Configured Steps
- Searches `DYNAMIC_STEPS` array for steps matching the AI tool name
- Example: If user selects "Cline", looks for steps with "cline" in title
- Adapts existing step templates to current use case

### Custom Step Generation (AI API)
When no pre-configured steps match:

#### Inputs to AI
- AI tool name and optional link
- What was created (description)
- All uploaded media items (images, files, links)
- Media item metadata (names, URLs, types)

#### AI Prompt Structure
```
Generate step-by-step instructions for: {whatCreated}
Using AI tool: {aiTool}
Context from uploaded resources: {mediaItems}

Requirements:
- Clear, repeatable "click-this-then-that" instructions
- Follow DetailedContentItem schema
- Include numbered lists for multi-step processes
- Add info callouts for best practices
- Tag each step with the AI tool used
- Include code blocks with copy functionality where applicable
- Make links clickable in step content
```

#### Output Schema
Each generated step must follow this structure:

```typescript
interface GeneratedStep {
  id: string;                           // Unique identifier
  title: string;                        // Step title
  detailed_content: DetailedContentItem[];  // Array of content items
  aiTools: string[];                    // AI tools used in this step
}

interface DetailedContentItem {
  id: string;
  type: 'text' | 'heading' | 'list' | 'callout' | 'code';
  text?: string;                        // Content text (supports markdown)
  level?: number;                       // Heading level (1-6)
  listStyle?: 'numbered' | 'bulleted'; // List type
  items?: string[];                     // List items
  variant?: 'info' | 'warning' | 'success'; // Callout variant
  language?: string;                    // Code language for syntax highlighting
}
```

### Step Styling & Rendering

Generated steps are rendered using `StepContentRenderer` component with:

#### Numbered Lists
```typescript
{
  type: 'list',
  listStyle: 'numbered',
  items: [
    'Step 1 instruction',
    'Step 2 instruction',
    'Step 3 instruction'
  ]
}
```

#### Info Callouts
```typescript
{
  type: 'callout',
  variant: 'info',
  text: '**Best Practices**: Specific tips and guidance'
}
```

#### Code Blocks with Copy Button
```typescript
{
  type: 'code',
  language: 'bash',
  text: 'npm install package-name'
}
```

#### Clickable Links
Markdown links in text fields are automatically rendered as clickable:
```typescript
{
  type: 'text',
  text: 'Visit the [documentation](https://example.com) for more details'
}
```

## Preview & Submit Flow

### Preview Screen
Shows comprehensive overview:
- **Use case thumbnail** (if selected)
- **Overview section**: AI tool used, what was created
- **Related Resources**: All uploaded media items with type badges
- **Implementation Steps**: Full step-by-step guide with proper rendering

### Actions
- **Back to Editing**: Return to form to make changes
- **Submit Use Case**: Finalize and save the submission

## Technical Implementation

### File Location
- Main component: `src/pages/SimplifiedUseCaseSubmission.tsx`
- Route: `/simple-submission`
- Navigation: "Quick Submit" link in navbar

### Dependencies
- `StepContentRenderer` for consistent step styling
- `DYNAMIC_STEPS` from `stepsData.ts` for pre-configured steps
- AI API integration (to be configured)

### State Management
```typescript
// Form data
const [aiTool, setAiTool] = useState('');
const [aiToolLink, setAiToolLink] = useState('');
const [whatCreated, setWhatCreated] = useState('');
const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

// Image & thumbnail handling
const [uploadedImage, setUploadedImage] = useState<string | null>(null);
const [useUploadedAsThumbnail, setUseUploadedAsThumbnail] = useState(true);
const [customThumbnail, setCustomThumbnail] = useState<string | null>(null);

// Generated steps
const [generatedSteps, setGeneratedSteps] = useState<GeneratedStep[]>([]);
const [isGenerating, setIsGenerating] = useState(false);
const [showPreview, setShowPreview] = useState(false);
```

## API Integration Setup

### Environment Variables Required

Add to `.env`:
```bash
# AI Service Configuration (choose one or multiple)
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Service Selection
VITE_AI_SERVICE=openai  # Options: openai, anthropic, azure
```

### Backend API Route

Create `src/server/routes/aiStepGeneration.ts`:
```typescript
import { Router } from 'express';

const router = Router();

router.post('/generate-steps', async (req, res) => {
  const { aiTool, aiToolLink, whatCreated, mediaItems } = req.body;
  
  try {
    // Call AI service (OpenAI, Claude, etc.)
    const generatedSteps = await generateStepsWithAI({
      aiTool,
      aiToolLink,
      whatCreated,
      mediaItems
    });
    
    res.json({ steps: generatedSteps });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: 'Failed to generate steps' });
  }
});

export default router;
```

### Frontend API Call

Update `handleAIAutofill` in `SimplifiedUseCaseSubmission.tsx`:
```typescript
const handleAIAutofill = async () => {
  setIsGenerating(true);
  
  try {
    // 1. Check for pre-configured steps
    const preConfiguredSteps = DYNAMIC_STEPS.filter(step => 
      step.title.toLowerCase().includes(aiTool.toLowerCase())
    );
    
    if (preConfiguredSteps.length > 0) {
      // Use pre-configured steps
      setGeneratedSteps(adaptPreConfiguredSteps(preConfiguredSteps));
    } else {
      // 2. Call AI API for custom generation
      const response = await fetch('/api/generate-steps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aiTool,
          aiToolLink,
          whatCreated,
          mediaItems: mediaItems.map(item => ({
            type: item.type,
            name: item.name,
            url: item.url
          }))
        })
      });
      
      const { steps } = await response.json();
      setGeneratedSteps(steps);
    }
  } catch (error) {
    console.error('Error generating steps:', error);
    alert('Failed to generate steps. Please try again.');
  } finally {
    setIsGenerating(false);
  }
};
```

## Best Practices for Step Generation

### 1. Clear Instructions
Steps should be actionable and specific:
✅ "Click the 'Settings' icon in the top-right corner"
❌ "Go to settings"

### 2. Logical Ordering
Present steps in the order they should be executed

### 3. Context & Prerequisites
Start with prerequisites or setup requirements

### 4. Visual Aids
Reference uploaded images/screenshots when available

### 5. Best Practices Callouts
Include tips and warnings where appropriate

### 6. Code Examples
Provide copy-able commands and code snippets

## Future Enhancements

- [ ] Multi-language support for step content
- [ ] Video upload support
- [ ] Integration with MCP servers for automatic resource fetching
- [ ] Step validation and quality scoring
- [ ] Community voting on use cases
- [ ] Analytics on most helpful steps

## Support

For questions or issues with this feature:
- **Slack**: #ai-dev-tools
- **Documentation**: [AI Use Cases Wiki](link-to-wiki)
- **Submit Bug**: Use `/reportbug` command in Cline

---

**Last Updated**: January 29, 2026
**Feature Status**: ✅ Active (AI API integration pending credentials)
