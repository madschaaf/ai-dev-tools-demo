import { useState } from 'react'

interface InstallClaudeProps {
  onComplete: () => void
  isCompleted: boolean
  onNext: () => void
}

export default function InstallClaude({ onComplete, isCompleted, onNext }: InstallClaudeProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const handleCopy = (text: string, itemKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(itemKey)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <>
      <h2>Step 14: Install Claude Extension</h2>
      <p>Install the Claude Code VS Code extension via VSIX from Anthropic. Claude integrates with Obsidian and provides AI assistance directly in VS Code.</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>⚠️ Prerequisites:</strong> Complete Netskope certificate setup before installing Claude Code.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Part 1: Certificate Setup (Netskope)</h3>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: '0 0 12px' }}>Mac Users:</h4>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>Open <strong>Self-Service</strong> app</li>
          <li>Search for <code>cert</code></li>
          <li>Install the following certificates:
            <ul style={{ marginTop: '8px' }}>
              <li><strong>Netskope Root CA Certificate</strong></li>
              <li><strong>Netskope Certificate Apply Fix</strong></li>
            </ul>
          </li>
          <li>Wait for installation to complete</li>
        </ol>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: '0 0 12px' }}>Windows Users:</h4>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>Open <strong>Software Center</strong></li>
          <li>Search for <code>cert</code></li>
          <li>Install: <strong>Netskope Certificates Apply Fix</strong></li>
          <li>Wait for installation to complete</li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Part 2: Install Claude Code CLI</h3>

      <p>Run the following command in your terminal to install Claude Code:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', position: 'relative', marginTop: 'var(--space-2)' }}>
        <code style={{ fontSize: '0.85rem', display: 'block', wordBreak: 'break-all' }}>
          /bin/bash -c "$(curl -fsSL https://installsvc.vip.ebay.com/repos/claude-code/raw/main/claude-code-setup.sh)"
        </code>
        <button
          type="button"
          className="button ghost"
          onClick={() => handleCopy('/bin/bash -c "$(curl -fsSL https://installsvc.vip.ebay.com/repos/claude-code/raw/main/claude-code-setup.sh)"', 'setup')}
          style={{
            position: 'absolute',
            right: '8px',
            top: '8px',
            fontSize: '0.75rem',
            padding: '4px 8px',
            background: copiedItem === 'setup' ? 'var(--color-green-500)' : '',
            color: copiedItem === 'setup' ? 'white' : ''
          }}
        >
          {copiedItem === 'setup' ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Part 3: Validate Installation</h3>

      <p>Run the doctor script to verify Claude Code is installed correctly:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', position: 'relative', marginTop: 'var(--space-2)' }}>
        <code style={{ fontSize: '0.85rem', display: 'block', wordBreak: 'break-all' }}>
          /bin/bash -c "$(curl -fsSL https://installsvc.vip.ebay.com/repos/claude-code/raw/main/claude-code-doctor.sh)"
        </code>
        <button
          type="button"
          className="button ghost"
          onClick={() => handleCopy('/bin/bash -c "$(curl -fsSL https://installsvc.vip.ebay.com/repos/claude-code/raw/main/claude-code-doctor.sh)"', 'doctor')}
          style={{
            position: 'absolute',
            right: '8px',
            top: '8px',
            fontSize: '0.75rem',
            padding: '4px 8px',
            background: copiedItem === 'doctor' ? 'var(--color-green-500)' : '',
            color: copiedItem === 'doctor' ? 'white' : ''
          }}
        >
          {copiedItem === 'doctor' ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Part 4: Using Claude Code</h3>

      <div style={{ background: '#e3f2fd', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: '0 0 12px', color: '#1565c0' }}>Opening Claude Code</h4>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>Open a new terminal</li>
          <li>Type <code>claude</code> and press Enter</li>
          <li>Choose option <strong>1. Yes, proceed</strong></li>
        </ol>
      </div>

      <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <h4 style={{ margin: '0 0 12px', color: '#2e7d32' }}>Example Prompt</h4>
        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
          Test Claude Code with a simple prompt:
        </p>
        <div style={{ background: 'white', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px' }}>
          <code style={{ fontSize: '0.85rem' }}>Write a Python script that prints "Hello, Claude!"</code>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: '#2e7d32' }}>
          <strong>✅ Success:</strong> If the prompt runs successfully, the installation is complete!
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Part 5: Install Claude VS Code Extension (VSIX)</h3>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-2)' }}>
        <strong>Note:</strong> The Claude Code VS Code extension (VSIX) comes from Anthropic's official repository, not from eBay's internal GitHub. eBay provides setup scripts, but the extension itself is distributed by Anthropic.
      </div>

      <p style={{ marginTop: 'var(--space-2)' }}>You have two options to get the Claude Code VS Code extension:</p>

      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <strong style={{ fontSize: '0.95rem' }}>Option 1: Use File from Repository</strong>

        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', margin: '8px 0', padding: 'var(--space-2)' }}>
          <strong>⚠️ Platform-Specific:</strong> Claude Code VSIX files are platform-specific.
          <ul style={{ margin: '4px 0 0', paddingLeft: '20px', fontSize: '0.85rem' }}>
            <li><strong>macOS users:</strong> Use <code>Anthropic.claude-code-*@darwin-x64.vsix</code> (included in repo)</li>
            <li><strong>Windows users:</strong> You need <code>Anthropic.claude-code-*@win32-x64.vsix</code> (see Option 2 below)</li>
          </ul>
        </div>

        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>For macOS users:</strong> If the VSIX file is available at <code>.vscode/extensions/Anthropic.claude-code-*@darwin-x64.vsix</code>:
        </p>
        <ol style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '0.85rem' }}>
          <li>Open VS Code</li>
          <li>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Cmd+Shift+P</kbd></li>
          <li>Type: <code>Extensions: Install from VSIX...</code></li>
          <li>Navigate to the <code>darwin-x64</code> VSIX file</li>
          <li>Click Install</li>
        </ol>
      </div>

      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff', marginTop: 'var(--space-2)' }}>
        <strong style={{ fontSize: '0.95rem' }}>Option 2: Install via Setup Script (Recommended for Windows)</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          The setup script automatically downloads the correct platform-specific VSIX. <strong>Windows users should use this method.</strong>
        </p>
        <ol style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '0.85rem' }}>
          <li>Run the setup script from Part 2 above</li>
          <li>The VSIX is bundled with the <code>@anthropic-ai/claude-code</code> npm package</li>
          <li>Find it at: <code>vendor/claude-code.vsix</code> (platform-specific version)</li>
          <li>If needed, manually install with command:
            <div style={{ background: '#1e1e1e', color: '#d4d4d4', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px', position: 'relative' }}>
              <code style={{ fontSize: '0.85rem' }}>code --install-extension /path/to/vendor/claude-code.vsix</code>
              <button
                type="button"
                className="button ghost"
                onClick={() => handleCopy('code --install-extension /path/to/vendor/claude-code.vsix', 'vsix-install')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '8px',
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  background: copiedItem === 'vsix-install' ? 'var(--color-green-500)' : '',
                  color: copiedItem === 'vsix-install' ? 'white' : ''
                }}
              >
                {copiedItem === 'vsix-install' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Part 6: Configure VS Code Settings</h3>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-2)' }}>
        <strong>⚠️ Important:</strong> You must configure your VS Code settings.json to use Claude in the terminal with eBay's HubGPT models.
      </div>

      <p style={{ marginTop: 'var(--space-2)' }}>Add the following configuration to your VS Code settings.json file:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', position: 'relative', marginTop: 'var(--space-2)' }}>
        <pre style={{ margin: 0, fontSize: '0.75rem', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
{`"apiKeyHelper": "npx @ebay/claude-code-token@latest get_token",
"claude-code.environmentVariables": [
  { "name": "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS", "value": "1" },
  { "name": "ANTHROPIC_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
  { "name": "CLAUDE_CODE_SUBAGENT_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
  { "name": "ANTHROPIC_SMALL_FAST_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
  { "name": "ANTHROPIC_BASE_URL", "value": "https://platformgateway2.vip.ebay.com/hubgptgatewaysvc/v1/anthropic" },
  { "name": "CLAUDE_CODE_API_KEY_HELPER_TTL_MS", "value": "360000000" },
  { "name": "DISABLE_TELEMETRY", "value": "1" },
  { "name": "ANTHROPIC_LOG", "value": "debug" }
]`}
        </pre>
        <button
          type="button"
          className="button ghost"
          onClick={() => handleCopy(`"apiKeyHelper": "npx @ebay/claude-code-token@latest get_token",
"claude-code.environmentVariables": [
  { "name": "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS", "value": "1" },
  { "name": "ANTHROPIC_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
  { "name": "CLAUDE_CODE_SUBAGENT_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
  { "name": "ANTHROPIC_SMALL_FAST_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
  { "name": "ANTHROPIC_BASE_URL", "value": "https://platformgateway2.vip.ebay.com/hubgptgatewaysvc/v1/anthropic" },
  { "name": "CLAUDE_CODE_API_KEY_HELPER_TTL_MS", "value": "360000000" },
  { "name": "DISABLE_TELEMETRY", "value": "1" },
  { "name": "ANTHROPIC_LOG", "value": "debug" }
]`, 'settings')}
          style={{
            position: 'absolute',
            right: '8px',
            top: '8px',
            fontSize: '0.75rem',
            padding: '4px 8px',
            background: copiedItem === 'settings' ? 'var(--color-green-500)' : '',
            color: copiedItem === 'settings' ? 'white' : ''
          }}
        >
          {copiedItem === 'settings' ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div style={{ background: '#e3f2fd', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <h4 style={{ margin: '0 0 12px', color: '#1565c0' }}>Configuration Breakdown</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem' }}>
          <li><strong>apiKeyHelper:</strong> Token retrieval command for eBay SSO</li>
          <li><strong>ANTHROPIC_MODEL:</strong> Main AI model (Claude Sonnet 4.5 via HubGPT)</li>
          <li><strong>CLAUDE_CODE_SUBAGENT_MODEL:</strong> Model for sub-agents</li>
          <li><strong>ANTHROPIC_SMALL_FAST_MODEL:</strong> Fast model for quick responses</li>
          <li><strong>ANTHROPIC_BASE_URL:</strong> eBay's HubGPT Gateway endpoint</li>
          <li><strong>DISABLE_TELEMETRY:</strong> Disables usage tracking</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Integration with Obsidian</h3>

      <p>Claude Code integrates seamlessly with the Obsidian app you installed in Step 13. This allows you to:</p>

      <ul style={{ fontSize: '0.9rem' }}>
        <li>Use Claude AI assistance within your Obsidian workflows</li>
        <li>Access Claude Code directly from Obsidian notes</li>
        <li>Leverage both tools together for enhanced productivity</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Additional Resources</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
        <a
          href="https://wiki.corp.ebay.com/spaces/ESIHOME/pages/1804703210/Claude+Code+Installation+and+Setup+Guide"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: 'var(--space-2)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--color-blue-700)', fontSize: '0.9rem', border: '1px solid #e1e4e8' }}
        >
          📖 eBay Claude Code Guide
        </a>
        <a
          href="https://github.corp.ebay.com/obsidian/claude-code-integration"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: 'var(--space-2)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--color-blue-700)', fontSize: '0.9rem', border: '1px solid #e1e4e8' }}
        >
          🔗 Obsidian Claude Integration
        </a>
        <a
          href="https://code.claude.com/docs/en/overview"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: 'var(--space-2)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--color-blue-700)', fontSize: '0.9rem', border: '1px solid #e1e4e8' }}
        >
          📚 Claude Code Docs
        </a>
        <a
          href="https://github.com/anthropics/claude-code"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: 'var(--space-2)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--color-blue-700)', fontSize: '0.9rem', border: '1px solid #e1e4e8' }}
        >
          💻 Anthropic Claude Code GitHub
        </a>
        <a
          href="https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: 'var(--space-2)', background: '#e8f5e9', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--color-blue-700)', fontSize: '0.9rem', border: '1px solid #a5d6a7' }}
        >
          🎯 Getting Better at Using AI Agents
        </a>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting Claude Code</h3>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Common Issues:</strong> If you're having trouble with Claude Code, try these solutions before reinstalling.
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Issue 1: Local Admin Access Required</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          <strong>Problem:</strong> Installation fails due to permissions.
        </p>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          <strong>Solution:</strong> You need local admin access to install Claude Code. Request admin access through eBay IT Service Portal if you don't have it.
        </p>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Issue 2: Installing from VSIX File</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>
          If the automatic installation doesn't work, you can manually install the VSIX file:
        </p>

        <div style={{ marginTop: '12px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 600 }}>Method 1: Via VS Code UI</p>
          <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem' }}>
            <li>Open VS Code</li>
            <li>Go to Extensions view (Ctrl+Shift+X or Cmd+Shift+X)</li>
            <li>Click the "..." menu in the Extensions view</li>
            <li>Select "Install from VSIX..."</li>
            <li>Navigate to your downloaded VSIX file (e.g., <code>Anthropic.claude-code-2.0.42@darwin-x64.vsix</code>)</li>
            <li>Click "Install"</li>
          </ol>
        </div>

        <div style={{ marginTop: '16px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 600 }}>Method 2: Via Terminal</p>
          <div style={{ background: 'white', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px', position: 'relative' }}>
            <code style={{ fontSize: '0.85rem' }}>code --install-extension /path/to/Anthropic.claude-code-2.0.42@darwin-x64.vsix</code>
            <button
              type="button"
              className="button ghost"
              onClick={() => handleCopy('code --install-extension /path/to/Anthropic.claude-code-2.0.42@darwin-x64.vsix', 'vsix-manual')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '8px',
                fontSize: '0.75rem',
                padding: '4px 8px',
                background: copiedItem === 'vsix-manual' ? 'var(--color-green-500)' : '',
                color: copiedItem === 'vsix-manual' ? 'white' : ''
              }}
            >
              {copiedItem === 'vsix-manual' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Replace <code>/path/to/</code> with the actual path to your VSIX file
          </p>
        </div>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Issue 3: Proxy Authentication Errors</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          <strong>Problem:</strong> Claude Code fails to connect due to proxy settings.
        </p>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>
          <strong>Solution:</strong> Configure your proxy settings for port 8080
        </p>
        <div style={{ background: '#fff3cd', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.85rem', fontWeight: 600 }}>Proxy Credentials:</p>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem' }}>
            <li><strong>Username:</strong> Your eBay username (not email)</li>
            <li><strong>Password:</strong> PIN + YubiKey code (concatenated together)</li>
            <li>Example: If PIN is <code>1234</code> and YubiKey shows <code>567890</code>, enter: <code>1234567890</code></li>
          </ul>
        </div>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Issue 4: Statsig Cache Errors (Connection Issues)</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          <strong>Problem:</strong> Claude Code fails to start or shows connection errors.
        </p>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>
          <strong>Solution:</strong> Clear the statsig cache before starting Claude Code
        </p>
        <div style={{ background: 'white', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px', position: 'relative' }}>
          <code style={{ fontSize: '0.85rem', display: 'block' }}>rm -r ~/.claude/statsig</code>
          <button
            type="button"
            className="button ghost"
            onClick={() => handleCopy('rm -r ~/.claude/statsig', 'statsig')}
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
              fontSize: '0.75rem',
              padding: '4px 8px',
              background: copiedItem === 'statsig' ? 'var(--color-green-500)' : '',
              color: copiedItem === 'statsig' ? 'white' : ''
            }}
          >
            {copiedItem === 'statsig' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Note:</strong> Run this command each time before starting <code>claude</code> if you continue to experience issues. This is a known workaround that helps resolve connection problems.
        </p>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Issue 5: eBay AI Tools Support Assistant</h4>
      <div style={{ background: '#e3f2fd', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          For additional help with Claude Code at eBay, you can access the <strong>eBay AI Tools Support Assistant</strong>.
        </p>
        <p style={{ margin: '0 0 12px', fontSize: '0.85rem' }}>
          This assistant can help with:
        </p>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem' }}>
          <li>Installation troubleshooting</li>
          <li>Configuration guidance</li>
          <li>Settings.json updates</li>
          <li>Common error resolution</li>
        </ul>
        <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: '#1565c0' }}>
          <strong>How to access:</strong> Contact #community-claude-code on Slack or check the internal eBay AI Tools documentation.
        </p>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Complete Uninstall & Reinstall</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          If all else fails, completely uninstall and reinstall Claude Code:
        </p>
        <div style={{ background: 'white', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px', position: 'relative' }}>
          <code style={{ fontSize: '0.85rem', display: 'block', wordBreak: 'break-all' }}>
            /bin/bash -c "$(curl -fsSL https://installsvc.vip.ebay.com/repos/claude-code/raw/main/claude-code-uninstall.sh)"
          </code>
          <button
            type="button"
            className="button ghost"
            onClick={() => handleCopy('/bin/bash -c "$(curl -fsSL https://installsvc.vip.ebay.com/repos/claude-code/raw/main/claude-code-uninstall.sh)"', 'uninstall')}
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
              fontSize: '0.75rem',
              padding: '4px 8px',
              background: copiedItem === 'uninstall' ? 'var(--color-green-500)' : '',
              color: copiedItem === 'uninstall' ? 'white' : ''
            }}
          >
            {copiedItem === 'uninstall' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          After uninstalling, restart your terminal and run the installation command from Part 2 again.
        </p>
      </div>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          className={`button ${isCompleted ? 'secondary' : 'primary'}`}
          onClick={onComplete}
          disabled={isCompleted}
        >
          {isCompleted ? '✓ Completed' : 'Mark as Complete'}
        </button>
        <button
          type="button"
          className="button ghost"
          onClick={onNext}
        >
          Next Step →
        </button>
      </div>
    </>
  )
}
