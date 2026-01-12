# VS Code Extensions (VSIX Files)

This directory contains VS Code extension files (.vsix) and plugins that are not available on the public VS Code Marketplace and require manual installation.

## Available Files

This directory includes the following extension files for eBay engineers:

### 1. eBay Cline (`ebay-cline-3.36.2.vsix`)
- **Description:** eBay's customized AI coding assistant with MCP server integration
- **Source:** [GitHub Enterprise](https://github.corp.ebay.com/DevGenAI/cline/releases)
- **Installation:** Follow Step 12 in the Getting Started Guide
- **Size:** ~9.4 MB

### 2. Claude Code
**⚠️ Platform-Specific Files Required**

This directory currently contains the macOS version. Windows users need to download the Windows-specific version.

**For macOS:** `Anthropic.claude-code-2.0.42@darwin-x64.vsix` (included)
- **Description:** Anthropic's Claude AI assistant for VS Code (macOS Intel/Apple Silicon)
- **Size:** ~50 MB

**For Windows:** `Anthropic.claude-code-2.0.42@win32-x64.vsix` (not included - Windows users must download)
- **Download:** Run the setup script from Step 14, or extract from `@anthropic-ai/claude-code` npm package
- **Location after setup:** Look in the npm package's `vendor/` directory

**Common Info:**
- **Source:** Bundled with [@anthropic-ai/claude-code](https://www.npmjs.com/package/@anthropic-ai/claude-code) npm package
- **Installation:** Follow Step 14 in the Getting Started Guide
- **Configuration:** Requires eBay HubGPT settings in VS Code settings.json

### 3. ~~Poolside Assistant~~ (DISCONTINUED)
- **Status:** ⚠️ **Partnership discontinued - not currently in use**
- **Files:** `poolside-vscode-assistant-1.6.18.vsix` and `poolside-intellij-assistant-1.0.8.zip`
- **Note:** Kept in repository for historical reference only. Do not install.

### 4. MCP Setup Wizard (`mcp-setup-wizard-0.0.1.vsix`)
- **Description:** Helper extension for configuring Model Context Protocol (MCP) servers
- **Source:** Internal eBay development
- **Installation:** Install via VS Code: Extensions → Install from VSIX
- **Size:** ~20 KB
- **Note:** Useful for Step 15 (Configure MCPs)

## Installation Instructions

All VS Code extensions (.vsix files) can be installed via:

1. Open VS Code
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type: `Extensions: Install from VSIX...`
4. Navigate to this directory and select the .vsix file
5. Click Install
6. Restart VS Code when prompted

Detailed installation instructions for each extension are available in the **Getting Started Guide** in the application.

## Updating Extensions

To update to newer versions:

1. Download the latest VSIX from the sources listed above
2. Replace the old file in this directory
3. Reinstall via VS Code (same process as installation)

**Latest Sources:**
- **Cline:** [GitHub Enterprise Releases](https://github.corp.ebay.com/DevGenAI/cline/releases)
- **Claude Code:** Bundled with `@anthropic-ai/claude-code` npm package
- **MCP Wizard:** Internal eBay distribution

## Git Ignore

These files are ignored by git (see `.gitignore`) to keep the repository size manageable. The directory structure and this README are tracked to guide users.
