import { useState, useEffect } from 'react'
import { getUsername, getUserInfo, getUserOS } from './UserInfo'

export default function ConfigureMCPs() {
  const [configured, setConfigured] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  useEffect(() => {
    const savedUsername = getUsername()
    const userInfo = getUserInfo()
    const os = getUserOS()
    if (savedUsername) setUsername(savedUsername)
    if (userInfo?.email) setUserEmail(userInfo.email)
    if (os) setUserOS(os)
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const mcpServers = [
    {
      name: 'git-server',
      token: 'GITHUB_PERSONAL_ACCESS_TOKEN',
      description: 'GitHub integration for repository management',
      where: 'From Step 8: GitHub Enterprise PAT',
      required: true
    },
    {
      name: 'jira-server',
      token: 'JIRA_PAT_TOKEN',
      description: 'Jira integration for issue tracking',
      where: 'Jira Settings → Personal Access Tokens',
      url: 'https://jirap.corp.ebay.com/secure/ViewProfile.jspa',
      required: true
    },
    {
      name: 'glean-server',
      token: 'GLEAN_API_TOKEN',
      description: 'Glean enterprise search integration',
      where: 'Glean Settings → API Tokens',
      url: 'https://wiki.corp.ebay.com/pages/viewpage.action?spaceKey=EbayFinancialServices&title=Glean+Agent+MCP+Server',
      required: true
    },
    {
      name: 'wiki-server',
      token: 'CONFLUENCE_TOKEN',
      description: 'Confluence wiki integration',
      where: 'Confluence Settings → Personal Access Tokens',
      required: false
    },
    {
      name: 'apidiscovery-server',
      token: 'IAF_TOKEN',
      description: 'API Discovery for eBay services',
      where: 'IAF Portal → Generate Token',
      required: false
    },
    {
      name: 'pulse-api',
      token: 'PULSE_API_KEY',
      description: 'Pulse API for metrics and monitoring',
      where: 'Pulse Dashboard → API Keys',
      required: false
    }
  ]

  return (
    <>
      <h2>Step 12: Configure MCPs</h2>
      <p>Set up Model Context Protocol (MCP) servers to give Cline and Claude Code access to eBay tools and services.</p>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-3)' }}>
        <strong>🚀 Quick Setup Option:</strong> This repository includes an automated setup script!
        <div style={{ marginTop: '12px', background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', color: '#24292f' }}>
          <code style={{ fontSize: '0.9rem' }}>npm run setup-mcp</code>
        </div>
        <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>
          The script will guide you through configuration, copy templates, backup existing configs, and provide next steps.
          <br /><strong>Continue reading below for manual setup or to understand what the script does.</strong>
        </div>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>🎯 The Big Picture:</strong> Instead of you being a middleman between AI and your tools, MCP servers let AI assistants directly access and interact with your actual eBay development environment - JIRA tickets, GitHub repos, Confluence docs, monitoring tools, and more!
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What are MCP Servers?</h3>
      <p>MCP (Model Context Protocol) servers allow AI assistants to interact with external services. They act as secure bridges between AI tools like Cline/Claude Code and your development tools.</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <strong style={{ fontSize: '1rem', marginBottom: '8px', display: 'block' }}>Available MCP Servers at eBay (18+ options):</strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <div><strong>JIRA</strong> - Tickets, projects, workflows</div>
          <div><strong>GitHub</strong> - Repos, PRs, branches, code</div>
          <div><strong>Confluence</strong> - Internal documentation</div>
          <div><strong>PULSE</strong> - Engineering metrics, team performance</div>
          <div><strong>API Discovery</strong> - Internal API catalog</div>
          <div><strong>SherlockIO</strong> - Production monitoring, alerts, logs</div>
          <div><strong>GraphQL Assistant</strong> - Schema validation, query building</div>
          <div><strong>Lucidchart</strong> - Architecture diagrams</div>
          <div><strong>Jenkins</strong> - Build status, deployment info</div>
          <div><strong>Prometheus</strong> - Metrics and monitoring</div>
          <div><strong>Elasticsearch</strong> - Log search and analytics</div>
          <div><strong>+ More...</strong> - And many other eBay tools</div>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What This Means For You</h3>
      <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: 0, marginBottom: '12px', fontSize: '0.95rem' }}><strong>Without MCP:</strong> AI is a smart chatbot that needs you to copy/paste everything</p>
        <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>With MCP:</strong> AI becomes an actual development partner who can see and interact with your real eBay environment</p>

        <div style={{ marginTop: 'var(--space-3)' }}>
          <strong>Examples of what AI can do with MCP:</strong>
          <ul style={{ marginTop: '8px', fontSize: '0.9rem' }}>
            <li>"What JIRA tickets are assigned to me?" → Fetches them directly</li>
            <li>"Create a branch following our naming convention" → Uses GitHub MCP</li>
            <li>"What's the schema for the Ads API?" → Queries GraphQL Assistant</li>
            <li>"Are there any active P1 alerts?" → Checks SherlockIO</li>
            <li>"Update the Confluence doc with this info" → Writes to Confluence</li>
          </ul>
        </div>
      </div>

      <div style={{ background: '#fff3cd', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)', border: '2px solid #ffd700' }}>
        <strong style={{ fontSize: '1.05rem' }}>📚 Learn More About eBay MCP Servers:</strong>
        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>For detailed documentation, setup guides, and all available servers, visit:</p>
        <a
          href="https://pages.github.corp.ebay.com/DevGenAI/ebay-mcp/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: '#0969da',
            color: 'white',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            marginTop: '8px'
          }}
        >
          View eBay MCP Documentation →
        </a>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Open MCP Setup Wizard Extension</h3>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-2)' }}>
        <strong>💡 Using the MCP Setup Wizard:</strong> This is a VS Code extension (included in <code>.vscode/extensions/</code>) that makes configuring MCP servers easy. It guides you through each server, helps you generate tokens, and validates your setup.
      </div>

      <ol style={{ marginTop: 'var(--space-3)' }}>
        <li>
          <strong>First, install the MCP Setup Wizard extension if you haven't already:</strong>
          <div style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--color-neutral-700)' }}>
            Install from <code>.vscode/extensions/mcp-setup-wizard-0.0.1.vsix</code> using the same process as other VSIX files
          </div>
        </li>
        <li>Open VS Code</li>
        <li>
          Press{' '}
          {userOS === 'windows' ? (
            <>
              <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Ctrl</kbd>
              +
              <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Shift</kbd>
              +
              <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>P</kbd>
            </>
          ) : userOS === 'mac' ? (
            <>
              <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>⌘ Cmd</kbd>
              +
              <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Shift</kbd>
              +
              <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>P</kbd>
            </>
          ) : (
            <>
              <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Ctrl+Shift+P</kbd> (Windows) or{' '}
              <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Cmd+Shift+P</kbd> (Mac)
            </>
          )}
          {!userOS && (
            <div style={{ fontSize: '0.85rem', color: 'var(--color-yellow-500)', marginTop: '4px' }}>
              💡 Tip: Go back to Step 0 to save your OS for personalized shortcuts
            </div>
          )}
        </li>
        <li>Type: <code>MCP: Open MCP Setup Wizard</code></li>
        <li>Press Enter</li>
        <li>Follow the wizard to configure the MCP servers you want to use (you don't need all 18+, start with the essentials like JIRA and GitHub)</li>
      </ol>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>✨ What the Wizard Does:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>Guides you through token generation for each server</li>
          <li>Automatically configures file paths for your system</li>
          <li>Tests connections to verify everything works</li>
          <li>Lets you enable/disable specific servers</li>
          <li>Saves configuration to the correct Cline settings location</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Repository Structure with Example Configurations</h3>
      <p>The repository includes example MCP configurations in the <code>.mcp/</code> directory:</p>
      
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
          <div><strong>.mcp/</strong></div>
          <div style={{ paddingLeft: '20px' }}>├── <strong>setup.sh</strong> - Automated setup script</div>
          <div style={{ paddingLeft: '20px' }}>├── <strong>config.json.example</strong> - Environment variables only</div>
          <div style={{ paddingLeft: '20px' }}>├── <strong>claude_desktop_config.example.json</strong> - Claude Desktop App config</div>
          <div style={{ paddingLeft: '20px' }}>├── <strong>cline_mcp_settings.template.json</strong> - VS Code/Cline MCP config</div>
          <div style={{ paddingLeft: '20px' }}>├── <strong>vscode_settings.template.json</strong> - VS Code global settings</div>
          <div style={{ paddingLeft: '20px' }}>├── <strong>intellij_mcp_settings.template.json</strong> - IntelliJ/Copilot config</div>
          <div style={{ paddingLeft: '20px' }}>├── <strong>SETUP_GUIDE.md</strong> - Detailed setup instructions</div>
          <div style={{ paddingLeft: '20px' }}>├── <strong>CONFIGURATION_EXAMPLES.md</strong> - Visual examples & best practices</div>
          <div style={{ paddingLeft: '20px' }}>└── <strong>README.md</strong> - MCP server documentation</div>
        </div>
      </div>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>📖 Configuration Documentation:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li><strong>SETUP_GUIDE.md</strong> - Step-by-step setup for all AI tools</li>
          <li><strong>CONFIGURATION_EXAMPLES.md</strong> - See all file formats side-by-side</li>
          <li><strong>Example files</strong> - Ready-to-use templates with placeholders</li>
        </ul>
        <div style={{ marginTop: '8px' }}>
          View these files in VS Code or your file browser for detailed information.
        </div>
      </div>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Important:</strong> Cline stores your actual MCP settings in VS Code's application data folder, not in your home directory.
        <div style={{ fontSize: '0.85rem', marginTop: '8px' }}>
          {userOS === 'mac' ? (
            <><strong>Mac:</strong> <code style={{ fontSize: '0.75rem' }}>~/Library/Application Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json</code></>
          ) : userOS === 'windows' ? (
            <><strong>Windows:</strong> <code style={{ fontSize: '0.75rem' }}>%APPDATA%\Code\User\globalStorage\ebay.ebay-cline\settings\cline_mcp_settings.json</code></>
          ) : (
            <>
              <strong>Mac:</strong> <code style={{ fontSize: '0.75rem' }}>~/Library/Application Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json</code>
              <br />
              <strong>Windows:</strong> <code style={{ fontSize: '0.75rem' }}>%APPDATA%\Code\User\globalStorage\ebay.ebay-cline\settings\cline_mcp_settings.json</code>
            </>
          )}
        </div>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Note:</strong> These commands should be run in VS Code's integrated terminal.{' '}
        {userOS === 'windows' ? (
          <>
            Press{' '}
            <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0d47a1' }}>Ctrl</kbd>
            {' + '}
            <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0d47a1' }}>~</kbd>
            {' '}to open the terminal.
          </>
        ) : userOS === 'mac' ? (
          <>
            Press{' '}
            <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0d47a1' }}>⌃ Control</kbd>
            {' + '}
            <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0d47a1' }}>~</kbd>
            {' '}to open the terminal.
          </>
        ) : (
          <>
            Press{' '}
            <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0d47a1' }}>Ctrl+~</kbd> (Windows) or{' '}
            <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0d47a1' }}>Control+~</kbd> (Mac) to open the terminal.
          </>
        )}
      </div>

      <ol>
        <li>
          <strong>Navigate to the repository directory:</strong>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <code style={{ flex: 1 }}>cd ~/Documents/ai-dev-tools</code>
            <button
              type="button"
              onClick={() => handleCopy('cd ~/Documents/ai-dev-tools', 'cd-repo')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'cd-repo' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'cd-repo' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {copiedCommand === 'cd-repo' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginTop: '8px' }}>
            Make sure you're in the ai-dev-tools repository where you cloned it in Step 11
          </div>
        </li>
        <li>
          <strong>Copy the template file to Cline's settings location:</strong>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <code style={{ flex: 1, fontSize: '0.8rem' }}>
              {userOS === 'mac'
                ? `cp .mcp/cline_mcp_settings.template.json ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
                : userOS === 'windows'
                ? `copy .mcp\\cline_mcp_settings.template.json "%APPDATA%\\Code\\User\\globalStorage\\ebay.ebay-cline\\settings\\cline_mcp_settings.json"`
                : `cp .mcp/cline_mcp_settings.template.json ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
              }
            </code>
            <button
              type="button"
              onClick={() => handleCopy(
                userOS === 'mac'
                  ? `cp .mcp/cline_mcp_settings.template.json ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
                  : userOS === 'windows'
                  ? `copy .mcp\\cline_mcp_settings.template.json "%APPDATA%\\Code\\User\\globalStorage\\ebay.ebay-cline\\settings\\cline_mcp_settings.json"`
                  : `cp .mcp/cline_mcp_settings.template.json ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`,
                'cp-template'
              )}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'cp-template' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'cp-template' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {copiedCommand === 'cp-template' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginTop: '8px' }}>
            This copies the template to your Cline settings directory
          </div>
        </li>
        <li>
          <strong>Edit the configuration file:</strong>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginTop: '8px' }}>
            Open the Cline settings file in VS Code:
            <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1, fontSize: '0.8rem' }}>
                {userOS === 'mac'
                  ? `code ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
                  : userOS === 'windows'
                  ? `code "%APPDATA%\\Code\\User\\globalStorage\\ebay.ebay-cline\\settings\\cline_mcp_settings.json"`
                  : `code ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
                }
              </code>
              <button
                type="button"
                onClick={() => handleCopy(
                  userOS === 'mac'
                    ? `code ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
                    : userOS === 'windows'
                    ? `code "%APPDATA%\\Code\\User\\globalStorage\\ebay.ebay-cline\\settings\\cline_mcp_settings.json"`
                    : `code ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`,
                  'open-settings'
                )}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'open-settings' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'open-settings' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {copiedCommand === 'open-settings' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <ul style={{ marginTop: '8px', marginBottom: 0 }}>
              <li>
                {username ? (
                  <>
                    Replace all instances of <code>YOUR_USERNAME</code> with <code>{username}</code>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginTop: '4px' }}>
                      (Your username from Step 0)
                    </div>
                  </>
                ) : (
                  <>
                    Replace all instances of <code>YOUR_USERNAME</code> with your actual username
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-yellow-500)', marginTop: '4px' }}>
                      💡 Tip: Go back to Step 0 to save your information for auto-fill
                    </div>
                  </>
                )}
              </li>
              <li>Replace all placeholder tokens with your actual tokens (see list below)</li>
              <li>Save the file and restart VS Code for changes to take effect</li>
            </ul>
          </div>
        </li>
      </ol>

      {username && userOS && (
        <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ flex: 1 }}>
              <strong>Example path:</strong>
              <br />
              <code>
                {userOS === 'mac'
                  ? `/Users/${username}/ebay-mcp/mcp-tools-servers/git-server/build/index.js`
                  : `C:\\Users\\${username}\\ebay-mcp\\mcp-tools-servers\\git-server\\build\\index.js`
                }
              </code>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(
                userOS === 'mac'
                  ? `/Users/${username}/ebay-mcp/mcp-tools-servers/git-server/build/index.js`
                  : `C:\\Users\\${username}\\ebay-mcp\\mcp-tools-servers\\git-server\\build\\index.js`,
                'example-path'
              )}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #0d47a1',
                background: copiedCommand === 'example-path' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'example-path' ? 'white' : '#0d47a1',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {copiedCommand === 'example-path' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Required Tokens and Where to Get Them</h3>
      <p>You'll need to obtain tokens for each MCP server you want to use:</p>

      <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {mcpServers.map((server) => (
          <div
            key={server.name}
            style={{
              border: '1px solid #e1e4e8',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3)',
              background: server.required ? '#fffbf0' : 'white',
              borderLeft: server.required ? '4px solid var(--color-yellow-500)' : '1px solid #e1e4e8'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>
                  {server.name}
                  {server.required && (
                    <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: 'var(--color-yellow-500)', fontWeight: 600 }}>
                      REQUIRED
                    </span>
                  )}
                </div>
                <p style={{ margin: '4px 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
                  {server.description}
                </p>
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong>Token:</strong> <code style={{ background: '#f6f8fa', padding: '2px 6px', borderRadius: '4px' }}>{server.token}</code>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-blue-500)' }}>
                    <strong>Where to get it:</strong> {server.where}
                  </div>
                  {server.url && (
                    <div style={{ marginTop: '4px' }}>
                      <a
                        href={server.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.85rem', color: 'var(--color-blue-500)', textDecoration: 'underline' }}
                      >
                        View Setup Documentation →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>MCP Setup Wizard Will Help You With:</h3>
      <ul>
        <li><strong>Token Generation:</strong> Links to generate tokens for each service</li>
        <li><strong>Path Configuration:</strong> Automatically set correct file paths for your system</li>
        <li><strong>Testing Connections:</strong> Verify each MCP server is working correctly</li>
        <li><strong>Enable/Disable Servers:</strong> Choose which servers you want to use</li>
      </ul>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Git Configuration Note:</strong> While setting up MCPs, you should also configure Git with your identity.
        <div style={{ fontSize: '0.85rem', marginTop: '8px' }}>
          Run these commands in VS Code's terminal (any directory works since they're global settings):
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          {username && userEmail ? (
            <>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                <code style={{ flex: 1 }}>
                  git config --global user.name "{username}"
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(`git config --global user.name "${username}"`, 'git-name')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #856404',
                    background: copiedCommand === 'git-name' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'git-name' ? 'white' : '#856404',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {copiedCommand === 'git-name' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                <code style={{ flex: 1 }}>
                  git config --global user.email "{userEmail}"
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(`git config --global user.email "${userEmail}"`, 'git-email')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #856404',
                    background: copiedCommand === 'git-email' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'git-email' ? 'white' : '#856404',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {copiedCommand === 'git-email' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                <code style={{ flex: 1 }}>
                  git config --global user.name "Your Name"
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy('git config --global user.name "Your Name"', 'git-name')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #856404',
                    background: copiedCommand === 'git-name' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'git-name' ? 'white' : '#856404',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {copiedCommand === 'git-name' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                <code style={{ flex: 1 }}>
                  git config --global user.email "your.email@ebay.com"
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy('git config --global user.email "your.email@ebay.com"', 'git-email')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #856404',
                    background: copiedCommand === 'git-email' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'git-email' ? 'white' : '#856404',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {copiedCommand === 'git-email' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Configuration</h3>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>How to Check if MCPs are Connected:</strong>
        <ol style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Open the actual Cline settings file:</strong>
            <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-2)' }}>
              <code style={{ flex: 1, fontSize: '0.75rem' }}>
                {userOS === 'mac'
                  ? `code ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
                  : userOS === 'windows'
                  ? `code "%APPDATA%\\Code\\User\\globalStorage\\ebay.ebay-cline\\settings\\cline_mcp_settings.json"`
                  : `code ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
                }
              </code>
              <button
                type="button"
                onClick={() => handleCopy(
                  userOS === 'mac'
                    ? `code ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`
                    : userOS === 'windows'
                    ? `code "%APPDATA%\\Code\\User\\globalStorage\\ebay.ebay-cline\\settings\\cline_mcp_settings.json"`
                    : `code ~/Library/Application\\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json`,
                  'verify-open'
                )}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #856404',
                  background: copiedCommand === 'verify-open' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'verify-open' ? 'white' : '#856404',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {copiedCommand === 'verify-open' ? '✓' : 'Copy'}
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
              Verify your actual tokens are in this file (not the template in the repo)
            </div>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Check the file contains your tokens:</strong>
            <ul style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              <li>Look for <code>"GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."</code> (should be your actual token, not REPLACE_WITH...)</li>
              <li>Look for <code>"JIRA_PAT_TOKEN": "..."</code> (should be your actual Jira token)</li>
              <li>Verify paths have your actual username, not <code>YOUR_USERNAME</code></li>
            </ul>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Restart VS Code</strong> to ensure Cline loads the new configuration
          </li>
          <li>
            <strong>Test the connection:</strong>
            <ul style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              <li>Open Cline (click Cline icon in VS Code sidebar)</li>
              <li>Look for MCP indicators at the bottom of the Cline panel</li>
              <li>Try: "Show me my recent Jira tickets" or "List my GitHub repositories"</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="callout" style={{ background: '#ffe6e6', borderColor: '#ff9999', color: '#cc0000', marginTop: 'var(--space-3)' }}>
        <strong>⚠️ Common Issue:</strong> If MCP Setup Wizard saved tokens but Cline can't connect:
        <div style={{ fontSize: '0.85rem', marginTop: '8px' }}>
          The wizard might have saved to a different location. Verify the file at the path above contains your actual tokens.
          If the file is empty or has placeholder values like <code>REPLACE_WITH_YOUR_GITHUB_PAT</code>, you need to manually
          copy the template and replace those values with your actual tokens.
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={configured}
            onChange={(e) => setConfigured(e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: configured ? 600 : 400 }}>
            I've configured MCP servers and tested the connections
          </span>
        </label>
      </div>

      {configured && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>MCPs configured!</strong>
          <p style={{ margin: '8px 0 0' }}>
            Your AI assistants can now access eBay tools. Continue to Step 13 to configure VS Code settings.
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <ul>
        <li><strong>MCP Setup Wizard not found:</strong> Make sure you've installed the MCP extension from Step 11</li>
        <li><strong>Connection errors:</strong> Verify you're on the corporate network or VPN</li>
        <li><strong>Token invalid:</strong> Check that the token hasn't expired and has the correct permissions</li>
        <li><strong>Path errors:</strong> Ensure all file paths use your actual username, not YOUR_USERNAME</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button ghost"
          href="https://pages.github.corp.ebay.com/DevGenAI/ebay-mcp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MCP Server Documentation
        </a>
      </div>
    </>
  )
}
