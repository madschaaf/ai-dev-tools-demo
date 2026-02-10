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

## 🚀 Getting Started - Complete Setup Guide

Follow these steps to get the AI Dev Tools application running on your machine.

### Prerequisites

Before you begin, make sure you have these installed:

1. **Node.js 18 or higher**
   - Check if installed: `node --version`
   - Download: [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)
   - Verify npm is installed: `npm --version`

2. **Git**
   - Check if installed: `git --version`
   - Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)

3. **A code editor** (VS Code recommended)
   - Download: [https://code.visualstudio.com/](https://code.visualstudio.com/)

### Step 1: Clone the Repository

Open your terminal and run:

```bash
# Navigate to where you want to store the project
cd ~/Documents  # or your preferred location

# Clone the repository
git clone git@github.corp.ebay.com:madschaaf/ai-dev-tools.git

# Navigate into the project folder
cd ai-dev-tools
```

**✅ Success Check:** You should see a message saying "Cloning into 'ai-dev-tools'..." followed by download progress.

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

**⏱️ Expected time:** 1-2 minutes

**✅ Success Check:** You should see:
- "added XXX packages" message
- No error messages (warnings are okay)
- A `node_modules` folder created in your project

**Common Issues:**
- ❌ "npm: command not found" → Install Node.js (see Prerequisites)
- ❌ Permission errors → Try `sudo npm install` (Mac/Linux) or run terminal as Administrator (Windows)

### Step 3: Start the Development Server

Run the application:

```bash
npm run dev
```

**✅ Success Check:** You should see:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Step 4: View the Application

Open your web browser and go to:

```
http://localhost:5173
```

**🎉 You should see:** The AI Dev Tools homepage with:
- Navigation bar with links (Home, Explore Links, AI Sandbox, etc.)
- Grid of tool cards
- Welcome message and features

### Step 5: (Optional) Start the Backend Server

The frontend works standalone, but some features require the backend. In a **new terminal window**:

```bash
# Navigate to the project folder (if not already there)
cd ai-dev-tools

# Start the backend server
npm run server
```

**✅ Success Check:** You should see:
```
Server running on http://localhost:3000
```

**Tip:** Keep both terminals running - one for frontend (port 5173), one for backend (port 3000)

### Alternative: Run Both Servers Together

Instead of Steps 3-5, you can run both servers with one command:

```bash
npm run start
```

This starts:
- ✅ Frontend on `http://localhost:5173`
- ✅ Backend on `http://localhost:3000`

## 🎯 Quick Reference Commands

```bash
# Install dependencies
npm install

# Start frontend only
npm run dev

# Start backend only
npm run server

# Start both frontend and backend
npm run start

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Troubleshooting

### Port Already in Use

If you see "Port 5173 is already in use":

```bash
# Find and kill the process using the port (Mac/Linux)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

### Dependencies Not Installing

```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Page Not Loading

1. Check terminal for errors
2. Make sure the dev server is running
3. Try refreshing the browser (Cmd+R or Ctrl+R)
4. Try clearing browser cache or using incognito mode

### Changes Not Appearing

- The dev server has hot reload - changes should appear automatically
- If not, try saving the file again or restart the dev server (Ctrl+C, then `npm run dev`)

## 💡 Development Tips

- **Auto-save in VS Code:** File → Auto Save (recommended for development)
- **View Console Logs:** Right-click page → Inspect → Console tab
- **Hot Reload:** Changes to code automatically update the browser
- **Stop Server:** Press `Ctrl+C` in the terminal

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
