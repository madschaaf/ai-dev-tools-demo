# AI Agent Commands Reference

This document describes the build, run, and test commands for various AI coding agents used in this project.

## Purpose

AI coding agents (like Claude Code CLI, Cline, GitHub Copilot) need to understand how to work with your codebase. This file provides:
- Build commands
- Test commands
- Development server commands
- Common workflows

Agents can reference this file to execute tasks correctly.

## Project Type

This is a **React + TypeScript + Vite** web application.

## Commands

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Server runs at: http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check
```

### Type Checking

```bash
# Run TypeScript type checker
npm run type-check

# Watch mode for type checking
npm run type-check -- --watch
```

## Common Workflows

### Adding a New Feature

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes to the code

3. Run tests and linting:
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

4. Build to verify:
   ```bash
   npm run build
   ```

5. Commit and push:
   ```bash
   git add .
   git commit -m "feat: description of feature"
   git push origin feature/your-feature-name
   ```

### Fixing a Bug

1. Create a bugfix branch:
   ```bash
   git checkout -b fix/bug-description
   ```

2. Write a failing test that reproduces the bug

3. Fix the bug

4. Verify test passes:
   ```bash
   npm test
   ```

5. Run full test suite and linting:
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

6. Commit and push

### Adding a New Component

1. Create component file in `src/components/` or appropriate directory

2. Write component with TypeScript types

3. Create a test file (same name with `.test.tsx`)

4. Test the component:
   ```bash
   npm test -- ComponentName
   ```

5. Export from index if needed

6. Run type check:
   ```bash
   npm run type-check
   ```

## Project Structure

```
ai-dev-tools/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── styles/           # CSS and styling
│   ├── utils/            # Utility functions
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── tests/                # Test files
├── .claude/              # Claude Code task files (see below)
├── cline-scenarios/      # Cline practice exercises
├── copilot-katas/        # Copilot practice exercises
├── mcp/                  # MCP server configurations
└── sandbox/              # AI Sandbox experiments
```

## AI Agent-Specific Guides

### Claude Code CLI

Claude Code CLI can reference this file automatically when you:
- Ask it to build the project
- Request test execution
- Need help with development workflow

**Example prompts:**
- "Run the development server"
- "Run all tests and show me any failures"
- "Build the project for production"

**Task files:**
See `.claude/` folder for pre-defined tasks.

### Cline (VS Code Extension)

Cline can access workspace context including this file.

**Example prompts:**
- "Start the dev server and fix any errors"
- "Add tests for the new feature"
- "Check if the build passes"

**Scenarios:**
See `cline-scenarios/` for practice exercises.

### GitHub Copilot

Copilot can suggest commands when you write comments:

```typescript
// Run tests for this component
// npm test -- ComponentName.test

// Start development server
// npm run dev
```

## Environment Variables

Create a `.env` file for environment-specific configuration:

```bash
# Example .env file
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_ANALYTICS=false
```

**⚠️ Never commit `.env` to git!** Use `.env.example` for templates.

## Troubleshooting

### Port Already in Use

If port 5173 is in use:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

### Node Modules Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Failures

```bash
# Clear build cache
rm -rf dist .vite

# Rebuild
npm run build
```

### Type Errors

```bash
# Run type checker for detailed errors
npm run type-check

# Sometimes helps to restart TS server in VS Code
# Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

## CI/CD

This project uses GitHub Actions for CI/CD (when pushed to GitHub Enterprise).

**Pipeline stages:**
1. Install dependencies
2. Run linter
3. Run type checker
4. Run tests
5. Build for production

**Local simulation:**
```bash
# Run all CI checks locally
npm install
npm run lint
npm run type-check
npm test
npm run build
```

## Dependencies

### Key Dependencies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### Development Dependencies
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework
- **Testing Library** - React component testing

## Contributing

See project README.md for contribution guidelines.

When using AI agents to make changes:
1. Always run tests after changes
2. Check types with `npm run type-check`
3. Lint code with `npm run lint`
4. Test in dev server before building
5. Document any new scripts in this file

## Questions?

- For AI Sandbox questions: See `sandbox/experiments/README.md`
- For Cline help: See `cline-scenarios/README.md`
- For Copilot tips: See `copilot-katas/README.md`
- For MCP servers: See `mcp/README.md`
