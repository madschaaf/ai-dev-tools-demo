import { Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import VSCodeExtensions from './pages/VSCodeExtensions'
import ExploreLinks from './pages/ExploreLinks'
import StepsGuide from './pages/Steps/StepsGuide.tsx'
import AISandbox from './pages/AISandbox'
import UseCases from './pages/UseCases'
import UseCasePrototype from './pages/UseCasePrototype'
import Workflow from './pages/Workflow'
import AllSteps from './pages/Steps/AllSteps.tsx'


// const quickLinks = [
//   { 
//     name: 'AI Essentials', 
//     url: 'https://sites.google.com/ebay.com/ai-essentials-training/ai-essentials-overview', 
//     accent: 'var(--color-yellow-500)', 
//     description: 'AI training and resources', 
//     category: 'Learning'
//   },
//   { 
//     name: 'GitHub Personal', 
//     url: 'https://github.com', 
//     accent: 'var(--color-neutral-900)', 
//     description: 'Public GitHub repositories', 
//     category: 'AI & Development'
//   },
//   { 
//     name: 'GitHub Enterprise', 
//     url: 'https://github.corp.ebay.com/', 
//     accent: 'var(--color-neutral-900)', 
//     description: 'Internal eBay repositories', 
//     category: 'AI & Development'
//   },
//   { 
//     name: 'Cline (eBay)', 
//     url: 'https://github.corp.ebay.com/DevGenAI/cline/releases', 
//     accent: '#7c3aed', 
//     description: 'Install eBay\'s customized Cline agent', 
//     category: 'AI & Development'
//   },
//   { 
//     name: 'Obsidian', 
//     url: 'https://pages.github.corp.ebay.com/obsidian/docs/', 
//     accent: '#8b5cf6', 
//     description: 'Knowledge management and notes', 
//     category: 'Knowledge Management'
//   },
//   { 
//     name: 'MCP Servers', 
//     url: 'https://pages.github.corp.ebay.com/DevGenAI/ebay-mcp/', 
//     accent: 'var(--color-yellow-500)', 
//     description: 'eBay MCP server documentation', 
//     category: 'AI & Development'
//   },
//   { 
//     name: 'Glean', 
//     url: 'https://app.glean.com/', 
//     accent: 'var(--color-blue-500)', 
//     description: 'Enterprise search across all tools', 
//     category: 'Search'
//   },
//   { 
//     name: 'ServiceNow', 
//     url: 'https://ebayinc.service-now.com/esc', 
//     accent: 'var(--color-blue-500)', 
//     description: 'IT service management portal', 
//     category: 'Support'
//   },
//   { 
//     name: 'Slack Channels', 
//     url: 'https://ebay.enterprise.slack.com/', 
//     accent: '#4A154B', 
//     description: 'Join key Slack channels', 
//     category: 'Communication'
//   },
//   { 
//     name: 'Jira', 
//     url: 'https://jira.ebay.com', 
//     accent: 'var(--color-blue-500)', 
//     description: 'Issue tracking and agile planning', 
//     category: 'Work Management'
//   },
//   { 
//     name: 'eBay CSS Designs', 
//     url: 'https://playbook.ebay.com/get-started', 
//     accent: 'var(--color-green-500)', 
//     description: 'Design system and components', 
//     category: 'Design'
//   },
//   { 
//     name: 'Monday.com', 
//     url: 'https://ebay.monday.com/', 
//     accent: 'var(--color-red-500)', 
//     description: 'Project and task management', 
//     category: 'Work Management'
//   },
//   { 
//     name: 'Airtable', 
//     url: 'https://airtable.com', 
//     accent: 'var(--color-green-500)', 
//     description: 'Flexible databases and project coordination', 
//     category: 'Work Management'
//   },
//   { 
//     name: 'Sherlock IO', 
//     url: 'https://sherlock.io', 
//     accent: 'var(--color-red-500)', 
//     description: 'Observability and incident analysis', 
//     category: 'Observability'
//   },
//   { 
//     name: 'AI Intake', 
//     url: 'https://ebayinc.service-now.com/aiintake', 
//     accent: 'var(--color-yellow-500)', 
//     description: 'Submit AI project requests', 
//     category: 'Support'
//   }
// ]

// const slackChannels = [
//   {
//     name: '#ai-dev-tools',
//     purpose: 'AI tooling chat and tips.',
//     joinUrl: 'https://ebay.enterprise.slack.com/archives/C07JY6AHHMJ'
//   },
//   { name: '#mcp-servers', purpose: 'MCP server setup Q&A.', joinUrl: 'slack://open' },
//   { name: '#copilot-help', purpose: 'Copilot usage, prompts, and fixes.', joinUrl: 'slack://open' },
//   { name: '#observability', purpose: 'Sherlock IO and incident workflows.', joinUrl: 'slack://open' },
//   { name: '#data-eng', purpose: 'SQL, pipelines, and integrations.', joinUrl: 'slack://open' }
// ]

// // Component mapper for quick links
// const quickLinkComponents: Record<string, React.ComponentType<any>> = {
//   'AI Essentials': AIEssentials,
//   'GitHub Personal': GitHubPersonal,
//   'GitHub Enterprise': GitHubEnterprise,
//   'Cline (eBay)': Cline,
//   'Obsidian': Obsidian,
//   'MCP Servers': MCPServers,
//   'Glean': Glean,
//   'ServiceNow': ServiceNow,
//   'Slack Channels': () => <SlackChannels channels={slackChannels} />,
//   'Jira': JiraQuickLink,
//   'eBay CSS Designs': EBayCSS,
//   'Monday.com': MondayDotCom,
//   'Airtable': AirtableQuickLink,
//   'Sherlock IO': SherlockIO,
//   'AI Intake': AIIntake
// }

// const extensionGroups = [
//   {
//     title: 'AI / Code assistants',
//     summary: 'Pair programming and AI copilots.',
//     items: [
//       { id: 'github.copilot', name: 'GitHub Copilot', desc: 'Your AI pair programmer — inline suggestions and completions.' },
//       { id: 'github.copilot-chat', name: 'GitHub Copilot Chat', desc: 'Chat interface for GitHub Copilot — ask questions, get code.' },
//       { id: 'anthropic.claude-code', name: 'Claude Code', desc: 'Claude Code assistant for complex reasoning and refactoring.' },
//       { id: 'andrepimenta.claude-code-chat', name: 'Claude Code Chat', desc: 'Alternative chat UI for Claude Code workflows.' },
//       { id: 'ebay.ebay-cline', name: 'eBay Cline', desc: 'eBay-customized Cline agent for internal workflows.' }
//     ]
//   },
//   {
//     title: 'Azure tools',
//     summary: 'Azure Copilot, MCP server, resource explorer.',
//     items: [
//       { id: 'ms-azuretools.vscode-azure-github-copilot', name: 'Azure GitHub Copilot', desc: 'Azure-aware Copilot for cloud resource management.' },
//       { id: 'ms-azuretools.vscode-azure-mcp-server', name: 'Azure MCP Server', desc: 'MCP server integration for Azure services.' },
//       { id: 'ms-azuretools.vscode-azureresourcegroups', name: 'Azure Resource Groups', desc: 'Browse and manage Azure resource groups from VS Code.' },
//       { id: 'ms-vscode.azure-repos', name: 'Azure Repos', desc: 'Connect to Azure Repos for Git operations.' }
//     ]
//   },
//   {
//     title: 'MCP tooling',
//     summary: 'MCP servers + setup wizard entry point.',
//     items: [
//       { id: 'semanticworkbenchteam.mcp-server-vscode', name: 'MCP Server', desc: 'Run and configure MCP servers for AI tool integration.' }
//     ]
//   },
//   {
//     title: 'Database tools',
//     summary: 'SQL productivity and MSSQL project tooling.',
//     items: [
//       { id: 'ms-mssql.data-workspace-vscode', name: 'Data Workspace', desc: 'Manage database projects and connections in workspaces.' },
//       { id: 'ms-mssql.mssql', name: 'SQL Server (mssql)', desc: 'Connect, query, and manage SQL Server and Azure SQL databases.' },
//       { id: 'ms-mssql.sql-bindings-vscode', name: 'SQL Bindings', desc: 'SQL bindings for Azure Functions and other integrations.' },
//       { id: 'ms-mssql.sql-database-projects-vscode', name: 'SQL Database Projects', desc: 'Build and deploy SQL database projects (.sqlproj).' },
//       { id: 'adpyke.vscode-sql-formatter', name: 'SQL Formatter', desc: 'Format SQL queries with configurable style rules.' },
//       { id: 'inferrinizzard.prettier-sql-vscode', name: 'Prettier SQL', desc: 'Prettier-based SQL formatting for consistent style.' }
//     ]
//   },
//   {
//     title: 'Python development',
//     summary: 'Python, Pylance, env management, debugging.',
//     items: [
//       { id: 'ms-python.python', name: 'Python', desc: 'Rich Python support: IntelliSense, linting, debugging, Jupyter.' },
//       { id: 'ms-python.vscode-pylance', name: 'Pylance', desc: 'Fast, feature-rich Python language server for type checking.' },
//       { id: 'ms-python.debugpy', name: 'Python Debugger', desc: 'Python debugger for breakpoints, variable inspection, and more.' },
//       { id: 'ms-python.vscode-python-envs', name: 'Python Environment Manager', desc: 'Manage virtual environments and Python interpreters easily.' }
//     ]
//   },
//   {
//     title: 'GitHub integration',
//     summary: 'PRs, Actions, Codespaces, remote repos.',
//     items: [
//       { id: 'github.vscode-pull-request-github', name: 'GitHub Pull Requests', desc: 'Review and manage pull requests without leaving VS Code.' },
//       { id: 'github.vscode-github-actions', name: 'GitHub Actions', desc: 'View and manage GitHub Actions workflows and runs.' },
//       { id: 'github.remotehub', name: 'GitHub Remote Hub', desc: 'Browse and edit repos remotely without cloning.' },
//       { id: 'ms-vscode.remote-repositories', name: 'Remote Repositories', desc: 'Open and work on remote repositories seamlessly.' },
//       { id: 'github.codespaces', name: 'GitHub Codespaces', desc: 'Connect to and manage GitHub Codespaces from VS Code.' }
//     ]
//   },
//   {
//     title: 'Developer tools',
//     summary: 'Formatting, devtools, chrome extensions, brackets.',
//     items: [
//       { id: 'esbenp.prettier-vscode', name: 'Prettier', desc: 'Opinionated code formatter supporting JS, TS, CSS, and more.' },
//       { id: 'ms-edgedevtools.vscode-edge-devtools', name: 'Edge DevTools', desc: 'Embed Edge/Chrome DevTools for debugging web apps.' },
//       { id: 'tal7aouy.rainbow-bracket', name: 'Rainbow Brackets', desc: 'Colorize matching brackets for easier code navigation.' },
//       { id: 'aaravb.chrome-extension-developer-tools', name: 'Chrome Extension Developer Tools', desc: 'Build and test Chrome extensions from VS Code.' },
//       { id: 'linhmtran168.mac-ca-vscode', name: 'macOS CA Certificates', desc: 'macOS certificate authority integration for secure dev.' },
//       { id: 'ebay.ai-use-cases', name: 'AI Use Cases', desc: 'Internal extension for managing and documenting AI use cases.' }
//     ]
//   }
// ]

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container">
       <section className="quick-links-section hero">
        <video autoPlay muted loop className="hero-video">
          <source src="/src/assets/Firefly mp4 video that fades into this image at the end. _It should start with many ideas in the for.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video autoPlay muted loop className="robot-video">
          <source src="/src/assets/ai-robot.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
           <header className="header hero-header">
             <div className="hero-copy">
               <h1>Starting Guide for Software Engineers</h1>
               <p className="subtitle">Get AI support throughout your engineering journey!</p>
             </div>
           </header>
           <Link to="/steps-guide" className="hero-btn-get-started">Get Started</Link>
        </div>
        </section> 

        <Routes>
          <Route path="/steps-guide" element={<StepsGuide />} />
          <Route path="/vscode-extensions" element={<VSCodeExtensions />} />
          <Route path="/ai-sandbox" element={<AISandbox />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/use-case-prototype" element={<UseCasePrototype />} />
          <Route path="/explore" element={<ExploreLinks />} />
          <Route path="/" element={<ExploreLinks />} />
          <Route path="/all-steps" element={<AllSteps />} />
        </Routes>
      </div>
    </>
  )
}
