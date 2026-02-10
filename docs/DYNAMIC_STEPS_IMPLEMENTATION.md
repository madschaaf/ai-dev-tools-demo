# Dynamic Steps & Enhanced AI Autofill Implementation

## Overview
This document describes the implementation of dynamic setup steps generation and enhanced AI autofill features for the Global Technology business unit in the Use Case submission form.

## Features Implemented

### 1. Business Unit-Based Dynamic Inputs

#### Trigger
- Selecting "Global Technology" in the Business Unit dropdown reveals a new checkbox

#### Dynamic Checkbox
```
☑ This use case uses IDE and/or programming language
```

When checked, reveals two optional inputs:
- **Coding Language** dropdown (JavaScript, Python, Java, C#, TypeScript)
- **IDE** dropdown (VS Code, Cursor, Rider, Visual Studio, IntelliJ IDEA)

### 2. Setup Steps Section (Global Technology Only)

The Steps section appears in "Project Configuration" when Global Technology is selected.

#### Features:
1. **Generate Steps** button - Auto-populates steps based on:
   - Selected IDE
   - Selected programming language
   - Selected tools and technologies
   - Related links

2. **Drag and Drop Reordering**
   - Steps can be reordered by dragging
   - Visual feedback during drag operations

3. **Step Management**
   - Remove auto-generated steps
   - Search and add additional pre-configured steps
   - Create custom steps manually
   - Edit custom steps (title and description)
   - Add comments to any step

4. **Custom Step Creation**
   - Accepts bullet format: `- Step description`
   - Accepts numbered format: `1. Step description`
   - Auto-generates titles from first 5-7 words
   - Forgiving parser (works with or without bullets)

### 3. Enhanced AI Autofill Features

#### GitHub Repository Analysis
When a GitHub repo link is provided and analyzed:

##### Automatic Detection:
- **Coding Language**: Detected from repository language statistics and file extensions
- **IDE**: Inferred from project structure and configuration files
  - VS Code: Detects `.vscode/` folder, `.code-workspace` files
  - Cursor: Detects `.cursorrules` or cursor-specific configurations
  - IntelliJ/Rider: Detects `.idea/` folder
  
- **Dependencies & Tools**: Extracted from:
  - `package.json` (npm dependencies)
  - `requirements.txt` (Python packages)
  - `pom.xml` / `build.gradle` (Java/Kotlin)
  - `Gemfile` (Ruby)
  - `.csproj` (C#/.NET)
  - VS Code extensions from `extensions.json`

- **Additional Steps**: Generated based on README, setup instructions, or documentation files

##### Auto-Population Behavior:
- Sets Business Unit to "Global Technology" if code/dependencies detected
- **Auto-checks the "IDE and/or programming language" checkbox** when language or IDE detected (applies to all autofill options: overwrite, keep-both, and empty-only)
- Populates IDE and Coding Language dropdowns with detected values
- Adds detected dependencies/tools to "Tools and Technologies"
- Fills "Create custom steps" textarea with additional setup steps (in "-" bullet format)
- **Auto-triggers "Generate Steps"** after autofill if Global Technology is selected

#### Enhanced "Keep Both" Behavior

When user selects "Keep Both" for any dropdown field:
- **Dropdowns** (Business Unit, IDE, Language): User's selection is kept, AI suggestion is ignored
- **Text fields**: AI suggestions appended as notes: 
  ```
  ---Note from AI Analysis---
  [AI suggestions here]
  ```
- **Arrays** (Tools, Categories, Tags): Merges unique values (user values take precedence)

**Note**: This implements the requirement that selecting "keep both" for dropdowns preserves user input over AI suggestions.

### 4. MCP Server Integration

#### Supported Sources:
1. **GitHub Enterprise**
   - Pattern: `https://github.corp.ebay.com/` or `https://github.com/`
   - Extracts: README, dependency files, configuration files
   - Uses: `mcp__git-server__github_*` tools

2. **Confluence Wiki**
   - Pattern: `https://confluence.*.ebay.com/` or `*.atlassian.net/wiki/`
   - Extracts: Page content, attachments, metadata
   - Uses: `mcp__wiki-server__get_page_*` tools

## Technical Implementation

### Frontend Components

#### Modified Files:
1. **src/pages/UseCasePrototype.tsx**
   - Added Business Unit detection for Global Technology
   - Implemented dynamic checkbox for IDE/Language
   - Added Steps Generation system
   - Integrated enhanced autofill handling
   - Added drag-and-drop step reordering
   - Implemented step editing and commenting

2. **src/components/AIAutofillUpload.tsx**
   - Extended `AutofillData` interface with:
     - `toolsAndTechnologies?: string[]`
     - `additionalSteps?: string`
     - `shouldAutoGenerateSteps?: boolean`

### Backend Enhancements

#### Modified Files:
1. **src/server/routes/autofill.ts**
   - Enhanced GitHub analysis with:
     - Language detection from repository statistics
     - IDE detection from project structure
     - Dependency extraction from multiple package formats
     - Additional steps generation from documentation
   - MCP tool integration for repo analysis
   - Intelligent business unit detection

### Data Flow

```
1. User pastes GitHub URL
   ↓
2. AI analyzes repository via MCP tools
   ↓
3. Extracts:
   - Languages (from repo stats)
   - IDE (from folder structure)
   - Dependencies (from package files)
   - Setup steps (from README/docs)
   ↓
4. User chooses autofill option
   ↓
5. Frontend applies data based on selection:
   - Overwrite: Replace all fields
   - Keep Both: User input priority for dropdowns
   - Empty Only: Fill only empty fields
   ↓
6. If GitHub repo + Global Tech:
   Auto-triggers "Generate Steps"
   ↓
7. Steps populated with setup instructions
```

## Usage Examples

### Example 1: GitHub Repository Autofill
```
1. User selects "Global Technology" business unit
2. User pastes: https://github.com/username/react-app
3. AI detects:
   - Language: JavaScript
   - IDE: VS Code (from .vscode folder)
   - Tools: React, Node.js, npm
   - Additional steps:
     - Install Node.js and npm
     - Run npm install
     - Configure environment variables
4. User clicks "Keep Both"
5. Form auto-fills with detected values
6. "Generate Steps" auto-triggers
7. Setup steps appear with Node.js, VS Code installation
```

### Example 2: Custom Steps Creation
```
User types in custom steps textarea:
- Install Docker Desktop
- Configure Kubernetes cluster
- Set up database connections
- Run initial migrations

Each line becomes a separate step with:
- Title: Auto-generated from first 5-7 words
- Description: Full line content
- Reorderable via drag-and-drop
- Editable
- Commentable
```

### Example 3: "Keep Both" with Existing Data
```
User has already entered:
- Business Unit: Growth
- Tools: GitHub Copilot

AI detects from repo:
- Business Unit: Global Technology
- Tools: Docker, React, VS Code

Result with "Keep Both":
- Business Unit: Growth (user input kept)
- Tools: GitHub Copilot, Docker, React, VS Code (merged)
```

## Benefits

1. **Time Savings**: Auto-detection reduces manual form filling
2. **Accuracy**: Direct analysis of repo structure ensures correct detection
3. **Flexibility**: Multiple autofill options accommodate different workflows
4. **User Control**: "Keep Both" preserves user decisions while incorporating AI suggestions
5. **Comprehensive Steps**: Auto-generation creates complete setup guides
6. **Customization**: Full editing capabilities for generated steps

## Future Enhancements

Potential areas for expansion:
1. Support for additional package managers (poetry, gradle wrapper, etc.)
2. Detection of CI/CD configuration (GitHub Actions, Jenkins)
3. Infrastructure as Code detection (Terraform, CloudFormation)
4. Container orchestration detection (Docker Compose, Kubernetes manifests)
5. Testing framework detection
6. Code quality tool detection (ESLint, Prettier, Black, etc.)

## Testing Checklist

- [ ] Business Unit selection shows/hides checkbox correctly
- [ ] Checkbox shows/hides IDE/Language inputs
- [ ] Generate Steps creates appropriate steps based on selections
- [ ] Drag-and-drop reordering works smoothly
- [ ] Custom step creation parses bullet/numbered lists
- [ ] Step editing saves changes correctly
- [ ] Comments can be added to steps
- [ ] GitHub autofill detects languages correctly
- [ ] GitHub autofill detects IDE from structure
- [ ] Dependencies extracted from package files
- [ ] "Keep Both" preserves user dropdown selections
- [ ] "Keep Both" merges arrays correctly
- [ ] Auto-trigger of Generate Steps after GitHub autofill
- [ ] Additional steps populate custom steps textarea
