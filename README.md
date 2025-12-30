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

