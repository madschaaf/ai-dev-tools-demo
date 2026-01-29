/**
 * AI-Powered Step Generation Service
 * Uses eBay AI Sandbox to intelligently generate setup steps based on use case context
 */

import aiSandboxService from './aiSandboxService';

export interface UseCaseContext {
  useCaseName: string;
  briefOverview: string;
  businessUnit: string;
  isForDevelopers: boolean;
  codingLanguage?: string;
  ide?: string;
  toolsAndTechnologies: string[];
  technicalDetails?: string;
}

export interface GeneratedStep {
  id: string;
  title: string;
  description: string;
  category: string;
  order: number;
  aiGenerated: boolean;
}

class AIStepGenerationService {
  /**
   * Generate setup steps using AI based on use case context
   */
  async generateSteps(context: UseCaseContext): Promise<GeneratedStep[]> {
    try {
      console.log('🤖 Starting AI-powered step generation...', context);
      
      // Build a comprehensive prompt for the AI
      const prompt = this.buildStepGenerationPrompt(context);
      
      // Use AI Sandbox description-prefill capability to generate steps
      const aiResponse = await aiSandboxService.descriptionPrefill({
        title: context.useCaseName,
        attributes: this.buildAttributes(context)
      });

      console.log('✅ AI Response received:', aiResponse);

      // Parse the AI response into structured steps
      const steps = this.parseAIResponseToSteps(aiResponse.description, context);
      
      return steps;
    } catch (error) {
      console.error('❌ AI Step Generation failed:', error);
      // Fallback to rule-based generation if AI fails
      return this.fallbackRuleBasedGeneration(context);
    }
  }

  /**
   * Build a detailed prompt for AI to understand what steps to generate
   */
  private buildStepGenerationPrompt(context: UseCaseContext): string {
    let prompt = `Generate detailed setup steps for the following use case:\n\n`;
    prompt += `Use Case: ${context.useCaseName}\n`;
    prompt += `Overview: ${context.briefOverview}\n`;
    prompt += `Business Unit: ${context.businessUnit}\n`;
    
    if (context.isForDevelopers) {
      prompt += `\nDevelopment Environment:\n`;
      if (context.codingLanguage) prompt += `- Language: ${context.codingLanguage}\n`;
      if (context.ide) prompt += `- IDE: ${context.ide}\n`;
    }
    
    if (context.toolsAndTechnologies.length > 0) {
      prompt += `\nTools & Technologies: ${context.toolsAndTechnologies.join(', ')}\n`;
    }
    
    if (context.technicalDetails) {
      prompt += `\nTechnical Details: ${context.technicalDetails}\n`;
    }
    
    prompt += `\nGenerate a numbered list of setup steps needed to implement this use case. Each step should be clear and actionable.`;
    
    return prompt;
  }

  /**
   * Build attributes string for AI Sandbox
   */
  private buildAttributes(context: UseCaseContext): string {
    const attrs: string[] = [];
    
    attrs.push(`Business Unit: ${context.businessUnit}`);
    
    if (context.isForDevelopers) {
      if (context.codingLanguage) attrs.push(`Language: ${context.codingLanguage}`);
      if (context.ide) attrs.push(`IDE: ${context.ide}`);
    }
    
    if (context.toolsAndTechnologies.length > 0) {
      attrs.push(`Tools: ${context.toolsAndTechnologies.join(', ')}`);
    }
    
    attrs.push(`Category: ${context.isForDevelopers ? 'Technical Setup' : 'Business Setup'}`);
    
    return attrs.join(', ');
  }

  /**
   * Parse AI response into structured steps
   */
  private parseAIResponseToSteps(aiDescription: string, context: UseCaseContext): GeneratedStep[] {
    const steps: GeneratedStep[] = [];
    
    // Split by lines and look for numbered or bulleted items
    const lines = aiDescription.split('\n').filter(line => line.trim());
    
    let stepNumber = 1;
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Match numbered steps (1., 2., etc.) or bulleted steps (-, *, •)
      const numberedMatch = trimmed.match(/^(\d+)\.\s*(.+)/);
      const bulletMatch = trimmed.match(/^[-*•]\s*(.+)/);
      
      if (numberedMatch) {
        const stepText = numberedMatch[2].trim();
        steps.push({
          id: `ai-step-${Date.now()}-${stepNumber}`,
          title: this.extractTitle(stepText),
          description: stepText,
          category: this.categorizeStep(stepText, context),
          order: stepNumber,
          aiGenerated: true
        });
        stepNumber++;
      } else if (bulletMatch) {
        const stepText = bulletMatch[1].trim();
        steps.push({
          id: `ai-step-${Date.now()}-${stepNumber}`,
          title: this.extractTitle(stepText),
          description: stepText,
          category: this.categorizeStep(stepText, context),
          order: stepNumber,
          aiGenerated: true
        });
        stepNumber++;
      } else if (trimmed.length > 20 && !trimmed.endsWith(':')) {
        // If it's a substantial line without being a header, treat it as a step
        steps.push({
          id: `ai-step-${Date.now()}-${stepNumber}`,
          title: this.extractTitle(trimmed),
          description: trimmed,
          category: this.categorizeStep(trimmed, context),
          order: stepNumber,
          aiGenerated: true
        });
        stepNumber++;
      }
    }
    
    // If no steps were parsed, create a general step from the description
    if (steps.length === 0 && aiDescription.trim()) {
      steps.push({
        id: `ai-step-${Date.now()}-1`,
        title: 'Setup Instructions',
        description: aiDescription,
        category: 'setup',
        order: 1,
        aiGenerated: true
      });
    }
    
    return steps;
  }

  /**
   * Extract a concise title from step text
   */
  private extractTitle(text: string): string {
    // Take first 7 words or up to 60 characters
    const words = text.split(' ');
    const title = words.slice(0, 7).join(' ');
    return title.length > 60 ? title.substring(0, 60) + '...' : title;
  }

  /**
   * Categorize step based on content
   */
  private categorizeStep(stepText: string, context: UseCaseContext): string {
    const lowerText = stepText.toLowerCase();
    
    // Access-related steps
    if (lowerText.includes('request') && (lowerText.includes('access') || lowerText.includes('permission'))) {
      return 'access';
    }
    
    // Installation steps
    if (lowerText.includes('install') || lowerText.includes('download') || lowerText.includes('setup')) {
      return 'installation';
    }
    
    // Configuration steps
    if (lowerText.includes('configure') || lowerText.includes('config') || lowerText.includes('set up')) {
      return 'configuration';
    }
    
    // Verification steps
    if (lowerText.includes('verify') || lowerText.includes('test') || lowerText.includes('validate')) {
      return 'verification';
    }
    
    // Development steps
    if (context.isForDevelopers && (lowerText.includes('code') || lowerText.includes('develop') || lowerText.includes('build'))) {
      return 'development';
    }
    
    // Default
    return 'setup';
  }

  /**
   * Fallback to rule-based generation if AI fails
   */
  private fallbackRuleBasedGeneration(context: UseCaseContext): GeneratedStep[] {
    console.log('⚠️ Using fallback rule-based step generation');
    
    const steps: GeneratedStep[] = [];
    let order = 1;

    // Always start with SSO verification
    steps.push({
      id: 'verify-sso-ping',
      title: 'Verify SSO & Ping',
      description: 'Ensure you have proper Single Sign-On (SSO) access and Ping authentication configured.',
      category: 'access',
      order: order++,
      aiGenerated: false
    });

    // Access requests for specific tools
    if (context.toolsAndTechnologies.includes('GitHub Copilot')) {
      steps.push({
        id: 'request-github-access',
        title: 'Request GitHub Enterprise Access',
        description: 'Request access to GitHub Enterprise for GitHub Copilot integration.',
        category: 'access',
        order: order++,
        aiGenerated: false
      });
    }

    // Local admin for developers
    if (context.isForDevelopers) {
      steps.push({
        id: 'request-local-admin',
        title: 'Request Local Admin Access',
        description: 'Request local administrator privileges to install development tools.',
        category: 'access',
        order: order++,
        aiGenerated: false
      });
    }

    // Language runtime installation
    if (context.codingLanguage) {
      const runtimeStep = this.getRuntimeStep(context.codingLanguage, order++);
      if (runtimeStep) steps.push(runtimeStep);
    }

    // IDE installation
    if (context.ide) {
      const ideStep = this.getIDEStep(context.ide, order++);
      if (ideStep) steps.push(ideStep);
    }

    // Tool-specific steps
    if (context.toolsAndTechnologies.includes('GitHub Copilot')) {
      steps.push({
        id: 'setup-github-personal',
        title: 'Setup GitHub Personal Account',
        description: 'Create or configure your personal GitHub account for Copilot.',
        category: 'configuration',
        order: order++,
        aiGenerated: false
      });
      
      steps.push({
        id: 'setup-github-copilot',
        title: 'Setup GitHub Copilot',
        description: 'Install and configure GitHub Copilot extension in your IDE.',
        category: 'installation',
        order: order++,
        aiGenerated: false
      });
    }

    return steps;
  }

  private getRuntimeStep(language: string, order: number): GeneratedStep | null {
    const runtimes: { [key: string]: { id: string; title: string; description: string } } = {
      'JavaScript': {
        id: 'install-nodejs',
        title: 'Install Node.js',
        description: 'Install Node.js runtime environment for JavaScript development.'
      },
      'Python': {
        id: 'install-python',
        title: 'Install Python',
        description: 'Install Python runtime and package manager (pip).'
      },
      'Java': {
        id: 'install-java',
        title: 'Install Java JDK',
        description: 'Install Java Development Kit (JDK) for Java development.'
      },
      'C#': {
        id: 'install-dotnet',
        title: 'Install .NET SDK',
        description: 'Install .NET SDK for C# development.'
      }
    };

    const runtime = runtimes[language];
    if (!runtime) return null;

    return {
      ...runtime,
      category: 'installation',
      order,
      aiGenerated: false
    };
  }

  private getIDEStep(ide: string, order: number): GeneratedStep | null {
    const ides: { [key: string]: { id: string; title: string; description: string } } = {
      'VS Code': {
        id: 'install-vscode',
        title: 'Install VS Code',
        description: 'Install Visual Studio Code editor.'
      },
      'Cursor': {
        id: 'install-cursor',
        title: 'Install Cursor',
        description: 'Install Cursor AI-powered code editor.'
      }
    };

    const ideInfo = ides[ide];
    if (!ideInfo) return null;

    return {
      ...ideInfo,
      category: 'installation',
      order,
      aiGenerated: false
    };
  }
}

// Export singleton instance
const aiStepGenerationService = new AIStepGenerationService();
export default aiStepGenerationService;
