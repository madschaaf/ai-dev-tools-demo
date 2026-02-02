import express from 'express';
import type { DetailedContentItem } from '../../components/StepContentRenderer';

const router = express.Router();

interface GeneratedStep {
  id: string;
  title: string;
  detailed_content: DetailedContentItem[];
  aiTools: string[];
}

interface StepGenerationRequest {
  toolsAndTechnologies: Array<{
    name: string;
    url: string;
  }>;
  whatCreated: string;
  mediaItems: Array<{
    type: string;
    name: string;
    url: string;
  }>;
}

/**
 * Generate steps using AI API
 * POST /api/ai/generate-steps
 */
router.post('/generate-steps', async (req: express.Request, res: express.Response) => {
  const { toolsAndTechnologies, whatCreated, mediaItems }: StepGenerationRequest = req.body;
  
  // Validation
  if (!toolsAndTechnologies || toolsAndTechnologies.length === 0 || !whatCreated) {
    return res.status(400).json({ 
      error: 'Missing required fields: toolsAndTechnologies and whatCreated are required' 
    });
  }
  
  try {
    // TODO: Replace with actual AI API call once credentials are available
    const generatedSteps = await generateStepsWithAI({
      toolsAndTechnologies,
      whatCreated,
      mediaItems
    });
    
    res.json({ steps: generatedSteps });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: 'Failed to generate steps' });
  }
});

/**
 * AI Step Generation Function
 * This will be replaced with actual AI API integration (OpenAI, Claude, etc.)
 */
async function generateStepsWithAI(params: StepGenerationRequest): Promise<GeneratedStep[]> {
  const { toolsAndTechnologies, whatCreated, mediaItems } = params;
  
  // Get all tool names for display
  const toolNames = toolsAndTechnologies.map(t => t.name).join(', ');
  const allToolNames = toolsAndTechnologies.map(t => t.name);
  
  // TODO: Replace this with actual AI API call
  // Example for OpenAI:
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [
  //     {
  //       role: "system",
  //       content: SYSTEM_PROMPT
  //     },
  //     {
  //       role: "user",
  //       content: buildPrompt(params)
  //     }
  //   ]
  // });
  
  // For now, return placeholder structure that matches the schema
  const steps: GeneratedStep[] = [
    {
      id: `step-${Date.now()}-1`,
      title: `Set Up ${toolNames}`,
      detailed_content: [
        {
          id: 'intro',
          type: 'text',
          text: `Get started with ${toolNames} to create: ${whatCreated}`
        },
        {
          id: 'access',
          type: 'heading',
          level: 3,
          text: 'Step 1: Access the Tool'
        },
        {
          id: 'access-steps',
          type: 'list',
          listStyle: 'numbered',
          items: toolsAndTechnologies.length > 0 && toolsAndTechnologies[0].url
            ? toolsAndTechnologies.map(tool => 
                `Navigate to [${tool.name}](${tool.url})`
              ).concat([
                'Sign in with your eBay credentials if required',
                'Verify you have the necessary permissions'
              ])
            : [
                `Search for "${toolNames}" in your browser`,
                'Sign in with your eBay credentials if required',
                'Verify you have the necessary permissions'
              ]
        }
      ],
      aiTools: allToolNames
    }
  ];
  
  // Add media references if available
  if (mediaItems && mediaItems.length > 0) {
    steps.push({
      id: `step-${Date.now()}-2`,
      title: 'Reference Materials',
      detailed_content: [
        {
          id: 'media-intro',
          type: 'text',
          text: 'Review these resources related to your creation:'
        },
        ...mediaItems.map((item, index) => ({
          id: `media-${index}`,
          type: 'text' as const,
          text: item.type === 'image' 
            ? `![${item.name}](${item.url})`
            : `- [${item.name}](${item.url})`
        }))
      ],
      aiTools: allToolNames
    });
  }
  
  return steps;
}

/**
 * Build the AI prompt from user inputs
 */
function buildPrompt(params: StepGenerationRequest): string {
  const { toolsAndTechnologies, whatCreated, mediaItems } = params;
  
  const toolsList = toolsAndTechnologies
    .map(t => `${t.name}${t.url ? ` (${t.url})` : ''}`)
    .join(', ');
  
  let prompt = `Generate step-by-step instructions for the following:

**What was created**: ${whatCreated}
**AI Tools used**: ${toolsList}
`;

  if (mediaItems && mediaItems.length > 0) {
    prompt += `\n**Resources provided**:\n`;
    mediaItems.forEach(item => {
      prompt += `- ${item.type}: ${item.name} (${item.url})\n`;
    });
  }

  prompt += `
**Requirements**:
1. Generate 2-4 clear, actionable steps
2. Each step should have:
   - A descriptive title
   - Detailed content with numbered instructions
   - Best practice tips as info callouts where appropriate
3. Use this exact JSON schema for each step:
{
  "id": "step-[timestamp]-[index]",
  "title": "Step Title",
  "detailed_content": [
    {
      "id": "unique-id",
      "type": "text" | "heading" | "list" | "callout" | "code",
      "text": "content here (supports markdown)",
      "level": 3 (for headings),
      "listStyle": "numbered" | "bulleted" (for lists),
      "items": ["item1", "item2"] (for lists),
      "variant": "info" | "warning" | "success" (for callouts),
      "language": "bash" | "javascript" (for code blocks)
    }
  ],
  "aiTools": ${JSON.stringify(toolsAndTechnologies.map(t => t.name))}
}

Make the steps:
- Specific and actionable ("Click X", "Navigate to Y")
- In logical order
- Include any necessary prerequisites
- Reference the provided resources when relevant
- Include code blocks for commands that should be copied

Return ONLY valid JSON array of steps, no markdown code fences or explanation.`;

  return prompt;
}

/**
 * System prompt for AI step generation
 */
const SYSTEM_PROMPT = `You are an expert technical writer specializing in creating clear, step-by-step instructions for software engineering tasks. 

Your role is to:
1. Analyze what a user created with AI tools
2. Generate precise, actionable steps that others can follow
3. Format steps according to a specific schema
4. Include best practices and tips

Always prioritize clarity and repeatability. Steps should be "click-this-then-that" instructions that anyone can follow, not high-level strategy.`;

export default router;
