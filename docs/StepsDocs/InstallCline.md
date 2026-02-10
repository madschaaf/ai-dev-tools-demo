# InstallCline - Install Cline VS Code Extension

## Overview

**Component:** `src/pages/Steps/DynamicSteps/InstallCline.tsx`  
**Step Number:** 13  
**Category:** Installation  
**Purpose:** Guide users through downloading and installing eBay's customized Cline extension for VS Code

## What This Step Does

Provides users with multiple options to download the Cline VSIX file and detailed instructions for:
1. Installing the Cline extension in VS Code
2. Configuring global VS Code settings for Claude Code integration
3. Setting up Cline with GitHub Enterprise authentication
4. Connecting to MCP (Model Context Protocol) servers

## Component Structure

### State Management
```typescript
const [downloadStarted, setDownloadStarted] = useState(false)
const [copied, setCopied] = useState(false)
```

- `downloadStarted`: Tracks whether user has initiated download (toggles UI content)
- `copied`: Provides copy-to-clipboard feedback for configuration snippet

### User Interaction Flow

1. **Initial State**: Shows three download options
   - Option 1: Use file from repository (if available in `.vscode/extensions/`)
   - Option 2: Download from GitHub Enterprise releases
   - Option 3: Request from team lead

2. **After Download**: Shows detailed installation and configuration instructions
   - VSIX installation steps
   - Global VS Code settings configuration
   - Claude Code environment variables setup
   - Cline authentication and testing

## Key Features

### Download Management
```typescript
const handleDownload = () => {
  setDownloadStarted(true)
  window.open('https://github.corp.ebay.com/DevGenAI/cline/releases/download/v3.36.2/ebay-cline-3.36.2.vsix', '_blank')
}
```

### Configuration Copy-to-Clipboard
- Provides complete Claude Code configuration for global settings.json
- One-click copy functionality with visual feedback
- Settings work across all repositories (global scope)

### Configuration Details Provided

**Global Settings Path:**
- Mac: `~/Library/Application Support/Code/User/settings.json`
- Windows: `%APPDATA%\Code\User\settings.json`

**Environment Variables:**
```json
{
  "apiKeyHelper": "npx @ebay/claude-code-token@latest get_token",
  "claude-code.environmentVariables": [
    { "name": "ANTHROPIC_API_KEY", "value": "$(npx @ebay/claude-code-token@latest get_token)" },
    { "name": "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS", "value": "1" },
    { "name": "ANTHROPIC_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
    { "name": "ANTHROPIC_BASE_URL", "value": "https://platformgateway2.vip.ebay.com/hubgptgatewaysvc/v1/anthropic" },
    { "name": "CLAUDE_CODE_API_KEY_HELPER_TTL_MS", "value": "360000000" },
    { "name": "DISABLE_TELEMETRY", "value": "1" },
    { "name": "ANTHROPIC_LOG", "value": "debug" }
  ]
}
```

## Content Sections

1. **What is Cline?** - Features and benefits
2. **Get Cline VSIX File** - Three download options
3. **Installation Steps** - VS Code VSIX installation process
4. **Configure Global VS Code Settings** - Critical configuration for all repositories
5. **Configure Cline** - Initial setup and authentication
6. **Test Cline** - Verification with example prompt
7. **Using Cline with MCP** - MCP server integration preview

## Dependencies

### Prerequisites
- VS Code installed (Step 4)
- GitHub Enterprise access (Step 11)
- GitHub Enterprise Personal Access Token (Step 11)
- Node.js installed (for npm commands)

### Related Steps
- **Step 11**: Setup GitHub Enterprise (provides PAT needed for authentication)
- **Step 15**: Configure MCPs (MCP server configuration)
- **Step 4**: Install VS Code (required for Cline extension)

## External Links

- GitHub Enterprise Cline Releases: `https://github.corp.ebay.com/DevGenAI/cline/releases`
- Download URL: `https://github.corp.ebay.com/DevGenAI/cline/releases/download/v3.36.2/ebay-cline-3.36.2.vsix`

## Visual Feedback

### Callouts Used
1. **Success Callout** (green): "Download Started!" confirmation
2. **Warning Callout** (yellow): Importance of global settings configuration
3. **Info Callout** (blue): Why global settings matter
4. **Warning Callout** (yellow): Reminder about GitHub Enterprise token

## Technical Implementation Notes

### Keyboard Shortcuts Displayed
- Mac: `⌘ Cmd + Shift + P`
- Windows: `Ctrl + Shift + P`

### Code Blocks
- JSON configuration with syntax highlighting
- Inline code examples for verification commands
- File paths formatted as code

### Button Actions
1. Primary download button → Opens GitHub Enterprise release
2. Copy button → Copies config to clipboard with 2-second feedback
3. "Download Again" → Re-triggers download
4. "View All Releases" → Opens releases page

## User Experience Considerations

### Progressive Disclosure
- Shows simple options first
- Reveals detailed instructions after download action
- Explains each configuration setting with clear descriptions

### Help Text
- Explains why global settings are important (works across all repos)
- Documents what each environment variable does
- Provides troubleshooting context with debug logging

### Accessibility
- Clear button labels
- Structured headings for navigation
- Code formatted for screen readers
- Keyboard-style elements clearly marked

## Common User Issues Addressed

1. **Where to find the file** - Three different sources provided
2. **How to install VSIX** - Step-by-step VS Code instructions
3. **Global vs workspace settings** - Clear explanation and emphasis
4. **Configuration complexity** - One-click copy with explanations
5. **Authentication** - Clear link to GitHub Enterprise token step
6. **Testing** - Simple example prompt to verify functionality

## Maintenance Notes

### Version Management
- Current version: v3.36.2
- Update download URL when new versions released
- Keep version number in button text and file references

### Configuration Updates
- Monitor Claude Code token helper changes
- Update HubGPT gateway URL if changed
- Adjust model name if new versions available

## Integration Points

### Data Flow
1. User downloads VSIX → Manual VS Code installation
2. User copies config → Pastes into global settings.json
3. User authenticates → Uses GitHub Enterprise PAT
4. Cline connects → eBay HubGPT gateway via token helper

### System Integration
- **GitHub Enterprise**: Authentication and repository access
- **HubGPT Gateway**: API proxy for Claude Sonnet 4.5
- **MCP Servers**: Protocol for tool/resource extensions
- **Token Helper**: SSO authentication for API access
