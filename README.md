# AI Dev Tools - eBay Engineering Onboarding Guide

A comprehensive React + TypeScript + Vite application designed to help new software engineers at eBay set up their development environment with AI-powered tools and learn how to leverage AI assistants throughout their workflow. This interactive guide walks engineers through installing VS Code extensions, configuring AI tools, and practicing with hands-on exercises.

## What This App Does

This onboarding application helps new engineers:

- **Set up VS Code with AI tools** - Step-by-step guide to install and configure essential AI extensions like Cline, GitHub Copilot, and MCP servers
- **Learn about AI assistants** - Discover the AI tools available at eBay including ChatGPT Enterprise, Claude Code CLI, Google Gemini Pro, and Adobe AI
- **Practice with AI tools** - Interactive sandbox environment with real-world exercises and examples
- **Access quick links** - Centralized hub for frequently used development tools and resources
- **Master VS Code extensions** - Comprehensive guide to recommended extensions for productivity and development

## Key Features

### Getting Started Guide
A step-by-step checklist that guides new engineers through:
- Installing Node.js, Git, VS Code, and AI tools
- Setting up GitHub Enterprise and SSH keys
- Configuring MCP servers for Jira, Glean, and Confluence integration
- Joining essential Slack channels
- Completing AI tool checkpoints to review your setup

### AI Sandbox
An interactive practice environment where engineers can:
- **Practice with Cline** - Learn plan & execute workflows with file-scoped changes
- **Try Glean Search** - Search eBay's knowledge base and cite sources
- **Use GitHub Copilot** - Practice comment-to-code generation
- **Experiment with Claude Code CLI** - Generate terminal scripts with tests
- **Test Google Gemini** - Practice video generation and multimodal tasks
- **Explore Adobe AI** - Create diagrams, documentation, and design assets
- **Test MCP Servers** - Validate your MCP server configurations
- **Learn Prompt Safety** - Understand responsible AI practices and red team exercises

### Explore Links
Quick access to essential development tools organized by category:
- **AI Tools** - ChatGPT, Claude, Gemini, Glean, and more
- **Development Tools** - GitHub, Jira, VS Code, terminal tools
- **Documentation** - Internal wikis, API docs, and knowledge bases
- **Communication** - Slack channels and team resources
- **Learning Resources** - Training materials and best practices

### VS Code Extensions
A curated list of recommended extensions with:
- **AI Extensions** - Cline, Copilot, AI Use Case Form, Obsidian
- **Productivity Extensions** - Formatters, linters, Git tools
- **Language Support** - TypeScript, Python, Java, and more
- **Theme & UI** - Customization and visual enhancements
- Direct installation links and descriptions for each extension

## MCP Server Configuration

This repository includes templates and guides for configuring Model Context Protocol (MCP) servers to connect your AI agents with eBay internal tools.

### Quick Setup

**🚀 Automated Setup (Recommended):**
```bash
cd .mcp
./setup.sh
```
The setup script will:
- Detect your platform (macOS/Linux)
- Guide you through configuration options
- Copy the appropriate template files
- Backup existing configurations
- Provide next steps and helpful links

**📋 Manual Setup:**

**For Claude Desktop App:**
```bash
mkdir -p ~/Library/Application\ Support/Claude
cp .mcp/claude_desktop_config.example.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**For VS Code with Cline:**
```bash
cp .mcp/cline_mcp_settings.template.json ~/Library/Application\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json
```

**For IntelliJ IDEA with GitHub Copilot:**
```bash
mkdir -p ~/.config/github-copilot/intellij
cp .mcp/intellij_mcp_settings.template.json ~/.config/github-copilot/intellij/mcp.json
```

After copying, edit the configuration files to replace:
- `YOUR_USERNAME` or `jdoe` → Your Mac username (e.g., `madschaaf`)
- `REPLACE_WITH_YOUR_GITHUB_TOKEN` → Your GitHub personal access token
- `REPLACE_WITH_YOUR_WIKI_TOKEN` → Your Confluence API token
- `YOUR_EMAIL@ebay.com` or `jdoe@ebay.com` → Your eBay email address
- `REPLACE_WITH_YOUR_JIRA_PAT` → Your JIRA personal access token

**📖 Documentation:**
- **Setup Guide:** [.mcp/SETUP_GUIDE.md](.mcp/SETUP_GUIDE.md) - Detailed setup instructions and troubleshooting
- **Configuration Examples:** [.mcp/CONFIGURATION_EXAMPLES.md](.mcp/CONFIGURATION_EXAMPLES.md) - Visual examples, common mistakes, and security best practices
- **Example Files:**
  - [.mcp/config.json.example](.mcp/config.json.example) - Environment variables only
  - [.mcp/claude_desktop_config.example.json](.mcp/claude_desktop_config.example.json) - Complete Claude Desktop configuration

### Available MCP Servers

- **git-server** - GitHub Enterprise integration (branches, PRs, commits, issues)
- **wiki-server** - Confluence Wiki integration (read/write pages, attachments)
- **jira-server** - JIRA ticket management (create, edit, search tickets)
- **apidiscovery-server** - eBay API discovery and documentation
- **pulse-api** - Engineering metrics and analytics

## Prerequisites

- Node.js 18+ (recommended) and npm

## Quick start

Install dependencies and start the client:

```bash
npm install
npm run dev
```

Start the optional backend in another terminal:

```bash
npm run server
```

Or run both in one go:

```bash
npm run start
```

## Build & preview

```bash
npm run build
npm run preview
```

## Notes on design system

- This project uses simple CSS variables and system fonts for broad compatibility.
- If you have internal access to eBay Evo assets (e.g., Market Sans), you can add them via `@font-face` and update the font-family in `src/styles/theme.css`.

## Project structure

- `src/App.tsx`: Home page and route definitions
- `src/pages/*.tsx`: Tool overview pages
- `src/components/SiteCard.tsx`: Card component used on the home grid
- `src/styles/theme.css`: Lightweight theme using CSS variables
- `src/server/index.ts`: Optional Express server with `/api/resources`
