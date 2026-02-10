const extensionGroups = [
  {
    title: 'AI / Code assistants',
    summary: 'Pair programming and AI copilots.',
    items: [
      { id: 'github.copilot', name: 'GitHub Copilot', desc: 'Your AI pair programmer — inline suggestions and completions.' },
      { id: 'github.copilot-chat', name: 'GitHub Copilot Chat', desc: 'Chat interface for GitHub Copilot — ask questions, get code.' },
      { id: 'anthropic.claude-code', name: 'Claude Code', desc: 'Claude Code assistant for complex reasoning and refactoring.' },
      { id: 'andrepimenta.claude-code-chat', name: 'Claude Code Chat', desc: 'Alternative chat UI for Claude Code workflows.' },
      { id: 'ebay.ebay-cline', name: 'eBay Cline', desc: 'eBay-customized Cline agent for internal workflows.' }
    ]
  },
  {
    title: 'Azure tools',
    summary: 'Azure Copilot, MCP server, resource explorer.',
    items: [
      { id: 'ms-azuretools.vscode-azure-github-copilot', name: 'Azure GitHub Copilot', desc: 'Azure-aware Copilot for cloud resource management.' },
      { id: 'ms-azuretools.vscode-azure-mcp-server', name: 'Azure MCP Server', desc: 'MCP server integration for Azure services.' },
      { id: 'ms-azuretools.vscode-azureresourcegroups', name: 'Azure Resource Groups', desc: 'Browse and manage Azure resource groups from VS Code.' },
      { id: 'ms-vscode.azure-repos', name: 'Azure Repos', desc: 'Connect to Azure Repos for Git operations.' }
    ]
  },
  {
    title: 'MCP tooling',
    summary: 'MCP servers + setup wizard entry point.',
    items: [
      { id: 'semanticworkbenchteam.mcp-server-vscode', name: 'MCP Server', desc: 'Run and configure MCP servers for AI tool integration.' }
    ]
  },
  {
    title: 'Database tools',
    summary: 'SQL productivity and MSSQL project tooling.',
    items: [
      { id: 'ms-mssql.data-workspace-vscode', name: 'Data Workspace', desc: 'Manage database projects and connections in workspaces.' },
      { id: 'ms-mssql.mssql', name: 'SQL Server (mssql)', desc: 'Connect, query, and manage SQL Server and Azure SQL databases.' },
      { id: 'ms-mssql.sql-bindings-vscode', name: 'SQL Bindings', desc: 'SQL bindings for Azure Functions and other integrations.' },
      { id: 'ms-mssql.sql-database-projects-vscode', name: 'SQL Database Projects', desc: 'Build and deploy SQL database projects (.sqlproj).' },
      { id: 'adpyke.vscode-sql-formatter', name: 'SQL Formatter', desc: 'Format SQL queries with configurable style rules.' },
      { id: 'inferrinizzard.prettier-sql-vscode', name: 'Prettier SQL', desc: 'Prettier-based SQL formatting for consistent style.' }
    ]
  },
  {
    title: 'Python development',
    summary: 'Python, Pylance, env management, debugging.',
    items: [
      { id: 'ms-python.python', name: 'Python', desc: 'Rich Python support: IntelliSense, linting, debugging, Jupyter.' },
      { id: 'ms-python.vscode-pylance', name: 'Pylance', desc: 'Fast, feature-rich Python language server for type checking.' },
      { id: 'ms-python.debugpy', name: 'Python Debugger', desc: 'Python debugger for breakpoints, variable inspection, and more.' },
      { id: 'ms-python.vscode-python-envs', name: 'Python Environment Manager', desc: 'Manage virtual environments and Python interpreters easily.' }
    ]
  },
  {
    title: 'GitHub integration',
    summary: 'PRs, Actions, Codespaces, remote repos.',
    items: [
      { id: 'github.vscode-pull-request-github', name: 'GitHub Pull Requests', desc: 'Review and manage pull requests without leaving VS Code.' },
      { id: 'github.vscode-github-actions', name: 'GitHub Actions', desc: 'View and manage GitHub Actions workflows and runs.' },
      { id: 'github.remotehub', name: 'GitHub Remote Hub', desc: 'Browse and edit repos remotely without cloning.' },
      { id: 'ms-vscode.remote-repositories', name: 'Remote Repositories', desc: 'Open and work on remote repositories seamlessly.' },
      { id: 'github.codespaces', name: 'GitHub Codespaces', desc: 'Connect to and manage GitHub Codespaces from VS Code.' }
    ]
  },
  {
    title: 'Developer tools',
    summary: 'Formatting, devtools, chrome extensions, brackets.',
    items: [
      { id: 'esbenp.prettier-vscode', name: 'Prettier', desc: 'Opinionated code formatter supporting JS, TS, CSS, and more.' },
      { id: 'ms-edgedevtools.vscode-edge-devtools', name: 'Edge DevTools', desc: 'Embed Edge/Chrome DevTools for debugging web apps.' },
      { id: 'tal7aouy.rainbow-bracket', name: 'Rainbow Brackets', desc: 'Colorize matching brackets for easier code navigation.' },
      { id: 'aaravb.chrome-extension-developer-tools', name: 'Chrome Extension Developer Tools', desc: 'Build and test Chrome extensions from VS Code.' },
      { id: 'linhmtran168.mac-ca-vscode', name: 'macOS CA Certificates', desc: 'macOS certificate authority integration for secure dev.' },
      { id: 'ebay.ai-use-cases', name: 'AI Use Cases', desc: 'Internal extension for managing and documenting AI use cases.' }
    ]
  }
]

export default function VSCodeExtensions() {
  return (
    <div className="container">
      <header className="header">
        <h1>VS Code Extensions You Should Have</h1>
        <p className="subtitle">Open the Extensions pane and click "Install All" when prompted on clone.</p>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Essential Extensions</h2>
            <p className="muted">These extensions enhance your development experience at eBay.</p>
          </div>
          <span className="badge">Auto-prompted on first open</span>
        </div>
        <div className="panel-grid">
          {extensionGroups.map((group) => (
            <div key={group.title} className="panel-card">
              <div className="panel-card-header">
                <h3>{group.title}</h3>
                <p className="muted small">{group.summary}</p>
              </div>
              <ul className="tag-list">
                {group.items.map((ext) => (
                  <li key={ext.id} className="tag" data-tooltip={ext.desc}>
                    <span className="tag-name">{ext.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="callout">
          <strong>MCP Setup Wizard:</strong> Available via the command palette as "MCP: Open MCP Setup Wizard." Internal extension (not yet on Marketplace); use it to scaffold MCP servers and configs in this repo.
        </div>
      </section>
    </div>
  )


//   <section className="panel">
//         <div className="panel-header">
//           <div>
//             <h2>VS Code extensions you should have</h2>
//             <p className="muted">Open the Extensions pane and click “Install All” when prompted on clone.</p>
//           </div>
//           <span className="badge">Auto-prompted on first open</span>
//         </div>
//         <div className="panel-grid">
//           {extensionGroups.map((group) => (
//             <div key={group.title} className="panel-card">
//               <div className="panel-card-header">
//                 <h3>{group.title}</h3>
//                 <p className="muted small">{group.summary}</p>
//               </div>
//               <ul className="tag-list">
//                 {group.items.map((ext) => (
//                   <li key={ext.id} className="tag" data-tooltip={ext.desc}>
//                     <span className="tag-name">{ext.name}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="callout">
//           <strong>MCP Setup Wizard:</strong> Available via the command palette as “MCP: Open MCP Setup Wizard.” Internal extension (not yet on Marketplace); use it to scaffold MCP servers and configs in this repo.
//         </div>
//       </section> */}
}
