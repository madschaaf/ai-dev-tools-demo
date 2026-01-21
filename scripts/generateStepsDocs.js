#!/usr/bin/env node

/**
 * Generate Step Documentation Script
 * 
 * This script reads all .tsx files in src/pages/Steps/DynamicSteps/
 * and generates corresponding .md documentation files in docs/StepsDocs/
 * 
 * Usage: node scripts/generateStepsDocs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STEPS_DIR = path.join(__dirname, '../src/pages/Steps/DynamicSteps');
const DOCS_DIR = path.join(__dirname, '../docs/StepsDocs');
const stepsDataPath = path.join(STEPS_DIR, 'stepsData.ts');

// Files to skip
const SKIP_FILES = ['README.md', 'stepsData.ts'];

// Read stepsData.ts to extract metadata
function parseStepsData() {
  const content = fs.readFileSync(stepsDataPath, 'utf-8');
  const steps = {};
  
  // Simple regex parsing (could be improved with AST parsing)
  const stepMatches = content.matchAll(/{\s*id:\s*['"]([^'"]+)['"]/g);
  
  for (const match of stepMatches) {
    const id = match[1];
    steps[id] = { id };
  }
  
  return steps;
}

// Generate markdown template
function generateMarkdown(componentName, filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract component name from file
  const fileName = path.basename(componentName, '.tsx');
  
  // Try to find step number from content
  const stepMatch = content.match(/Step\s+(\d+):/);
  const stepNumber = stepMatch ? stepMatch[1] : 'N/A';
  
  // Try to find main heading
  const headingMatch = content.match(/<h2>([^<]+)<\/h2>/);
  const heading = headingMatch ? headingMatch[1].replace(/Step \d+:\s*/, '') : fileName;
  
  // Try to find description/paragraph
  const descMatch = content.match(/<p>([^<]+)<\/p>/);
  const description = descMatch ? descMatch[1] : 'Guide users through the ' + fileName + ' process.';
  
  // Determine category from file name patterns
  let category = 'setup';
  if (fileName.startsWith('Install')) category = 'install';
  else if (fileName.startsWith('Setup')) category = 'setup';
  else if (fileName.startsWith('Configure')) category = 'config';
  else if (fileName.includes('Checkpoint')) category = 'checkpoint';
  else if (fileName.includes('Practice')) category = 'practice';
  
  // Check for state variables
  const hasState = content.includes('useState');
  const stateVars = [];
  if (hasState) {
    const stateMatches = content.matchAll(/const\s+\[(\w+),\s*set\w+\]\s*=\s*useState/g);
    for (const match of stateMatches) {
      stateVars.push(match[1]);
    }
  }
  
  // Check for external links
  const linkMatches = [...content.matchAll(/href=['"]([^'"]+)['"]/g)];
  const externalLinks = linkMatches
    .map(m => m[1])
    .filter(url => url.startsWith('http'))
    .slice(0, 5); // Limit to first 5
  
  return `# ${fileName} - ${heading}

## Overview

**Component:** \`src/pages/Steps/DynamicSteps/${fileName}.tsx\`  
**Step Number:** ${stepNumber}  
**Category:** ${category}  
**Purpose:** ${description}

## What This Step Does

This step provides users with guidance and instructions for ${heading.toLowerCase()}. The component includes:
- Step-by-step instructions
- Visual feedback and confirmations
- Links to relevant resources
- Common troubleshooting tips

## Component Structure

### State Management
${hasState ? `
The component uses React state to track user progress:
${stateVars.map(v => `- \`${v}\`: Tracks ${v.replace(/([A-Z])/g, ' $1').toLowerCase()}`).join('\n')}
` : 'This component is primarily informational without complex state management.'}

### User Interaction Flow

1. User reads overview and prerequisites
2. Follows step-by-step instructions
3. Completes actions (downloads, installations, configurations)
4. Verifies completion
5. Proceeds to next step

## Key Features

- Clear, actionable instructions
- Visual progress indicators
- Copy-to-clipboard functionality for commands/code
- External resource links
- Troubleshooting guidance

## Dependencies

### Prerequisites
Review the component content for specific prerequisite steps and requirements.

### Related Steps
This step may depend on or relate to other installation, configuration, or setup steps in the workflow.

## External Links
${externalLinks.length > 0 ? `
${externalLinks.map(url => `- ${url}`).join('\n')}
` : 'No external links detected or links are dynamically generated.'}

## Content Sections

The component is organized into logical sections:
1. **Overview** - Introduction and purpose
2. **Instructions** - Step-by-step guidance
3. **Verification** - How to confirm completion
4. **Troubleshooting** - Common issues and solutions
5. **Next Steps** - What comes after this step

## Technical Implementation Notes

### Code Examples
The component may include:
- Command-line instructions
- Configuration snippets
- Code blocks with syntax highlighting
- File path references

### Visual Feedback
- Success/error callouts
- Progress indicators
- Confirmation messages
- Warning notifications

## User Experience Considerations

### Progressive Disclosure
- Information revealed as needed
- Complex steps broken into manageable parts
- Clear next actions at each stage

### Accessibility
- Semantic HTML structure
- Clear button labels
- Keyboard navigation support
- Screen reader friendly content

## Common Issues Addressed

Review the component implementation for specific common issues and their solutions. Typical issues might include:
- Installation failures
- Configuration errors
- Permission problems
- Network connectivity issues

## Maintenance Notes

### Updates Required
- Monitor for version changes in linked resources
- Update URLs if services change
- Revise instructions for new tool versions
- Keep troubleshooting current with latest issues

### Testing
- Verify all links remain active
- Test copy-to-clipboard functionality
- Ensure instructions work on all supported platforms
- Validate external resource availability

## Integration Points

This step integrates with:
- Previous setup/installation steps
- Subsequent configuration steps
- External tools and services
- eBay internal systems

---

**Note:** This documentation was auto-generated. For detailed implementation specifics, review the component source code at \`src/pages/Steps/DynamicSteps/${fileName}.tsx\`.
`;
}

// Main execution
function main() {
  console.log('📝 Generating Step Documentation...\n');
  
  // Ensure docs directory exists
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
  
  // Read all .tsx files
  const files = fs.readdirSync(STEPS_DIR)
    .filter(file => file.endsWith('.tsx'))
    .filter(file => !SKIP_FILES.includes(file));
  
  console.log(`Found ${files.length} step components\n`);
  
  let generated = 0;
  let skipped = 0;
  
  files.forEach(file => {
    const componentName = path.basename(file, '.tsx');
    const docFileName = `${componentName}.md`;
    const docPath = path.join(DOCS_DIR, docFileName);
    
    // Skip if documentation already exists (don't overwrite manually created docs)
    if (fs.existsSync(docPath)) {
      console.log(`⏭️  Skipping ${docFileName} (already exists)`);
      skipped++;
      return;
    }
    
    const componentPath = path.join(STEPS_DIR, file);
    const markdown = generateMarkdown(componentName, componentPath);
    
    fs.writeFileSync(docPath, markdown);
    console.log(`✅ Generated ${docFileName}`);
    generated++;
  });
  
  console.log(`\n✨ Done!`);
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${files.length}`);
}

main();
