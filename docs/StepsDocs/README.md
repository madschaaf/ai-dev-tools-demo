# Dynamic Steps Documentation

This directory contains detailed documentation for each dynamic step component used in the AI Dev Tools onboarding workflow.

## Purpose

These markdown files provide developers and project managers with:
- **Overview** of each step's purpose and functionality
- **Component Details** including state management and interactions
- **Content Description** of what users see and do
- **Technical Implementation** notes
- **Dependencies** and prerequisites
- **Related Files** and resources

## Documentation Index

### Security & Access Steps
- [VerifySecurity.md](./VerifySecurity.md) - Verify SSO, PingID, and YubiKey authentication
- [RequestAccess.md](./RequestAccess.md) - Request access to GitHub Enterprise and AI tools
- [LocalAdminAccess.md](./LocalAdminAccess.md) - Request local administrator rights

### User Configuration Steps
- [UserInfo.md](./UserInfo.md) - Collect basic user information
- [RoleSelection.md](./RoleSelection.md) - Select user role (developer, PM, designer, etc.)

### Installation Steps
- [InstallNode.md](./InstallNode.md) - Install Node.js runtime
- [InstallVSCode.md](./InstallVSCode.md) - Install Visual Studio Code
- [InstallGit.md](./InstallGit.md) - Install Git version control
- [InstallPython.md](./InstallPython.md) - Install Python programming language
- [InstallClaude.md](./InstallClaude.md) - Install Claude desktop application
- [InstallCline.md](./InstallCline.md) - Install eBay Cline VS Code extension
- [InstallExtensions.md](./InstallExtensions.md) - Install VS Code extensions
- [InstallObsidian.md](./InstallObsidian.md) - Install Obsidian note-taking app
- [InstallChromeGlean.md](./InstallChromeGlean.md) - Install Glean Chrome extension
- [InstallChatGPTCLI.md](./InstallChatGPTCLI.md) - Install ChatGPT CLI tool
- [InstallPoolside.md](./InstallPoolside.md) - Install Poolside coding assistant
- [InstallMarkoSkin.md](./InstallMarkoSkin.md) - Install Marko Skin browser extension

### Setup & Configuration Steps
- [SetupEnvironment.md](./SetupEnvironment.md) - Configure development environment
- [SetupGitHub.md](./SetupGitHub.md) - Setup GitHub personal account
- [SetupGitHubEnterprise.md](./SetupGitHubEnterprise.md) - Setup GitHub Enterprise access
- [SetupGithubCopilot.md](./SetupGithubCopilot.md) - Setup GitHub Copilot
- [SetupObsidianNotes.md](./SetupObsidianNotes.md) - Configure Obsidian with eBay vault
- [SetupProxy.md](./SetupProxy.md) - Configure proxy settings
- [ConfigureGit.md](./ConfigureGit.md) - Configure Git settings
- [ConfigureVSCode.md](./ConfigureVSCode.md) - Configure VS Code settings
- [ConfigureMCPs.md](./ConfigureMCPs.md) - Configure Model Context Protocol servers

### Workflow Steps
- [CloneRepository.md](./CloneRepository.md) - Clone the AI Dev Tools repository
- [JoinSlackChannels.md](./JoinSlackChannels.md) - Join AI-related Slack channels
- [IntroToAI.md](./IntroToAI.md) - Introduction to AI tools at eBay

### Checkpoint Steps
- [AIToolsCheckpoint.md](./AIToolsCheckpoint.md) - Verify AI tools installation
- [VSCodeExtensionsCheckpoint.md](./VSCodeExtensionsCheckpoint.md) - Verify VS Code extensions
- [FinalAICheckpoint.md](./FinalAICheckpoint.md) - Final verification and next steps

### Practice & Learning
- [PracticeExercises.md](./PracticeExercises.md) - Practice exercises for AI tools

## File Naming Convention

Each markdown file corresponds to a `.tsx` component file in `src/pages/Steps/DynamicSteps/`:
- Component: `InstallCline.tsx`
- Documentation: `InstallCline.md`

## How to Use This Documentation

### For Developers
- Review component structure before modifications
- Understand state management and user interactions
- Identify dependencies and related components
- See code examples and implementation patterns

### For Project Managers
- Understand what each step provides to users
- Review user flow and experience
- Identify step prerequisites and dependencies
- Plan feature enhancements and improvements

## Contributing

When creating new dynamic steps:
1. Create the `.tsx` component in `src/pages/Steps/DynamicSteps/`
2. Create corresponding `.md` documentation in `docs/StepsDocs/`
3. Add entry to stepsData.ts
4. Update this README index

## Related Documentation

- [DYNAMIC_STEPS_IMPLEMENTATION.md](../DYNAMIC_STEPS_IMPLEMENTATION.md) - Overall architecture
- [STEPS_DATABASE_SCHEMA.md](../STEPS_DATABASE_SCHEMA.md) - Database schema
- [stepsData.ts](../../src/pages/Steps/DynamicSteps/stepsData.ts) - Step metadata
