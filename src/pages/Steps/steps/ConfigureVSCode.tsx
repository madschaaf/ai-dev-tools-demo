export default function ConfigureVSCode() {
  return (
    <>
      <h2>Step 13: Configure VS Code Settings</h2>
      <p>Update your VS Code settings.json file with eBay-specific configurations for optimal development experience.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Open Settings.json</h3>
      <ol>
        <li>Open VS Code</li>
        <li>Press <kbd>Cmd+Shift+P</kbd> (Mac) or <kbd>Ctrl+Shift+P</kbd> (Windows)</li>
        <li>Type "Preferences: Open User Settings (JSON)"</li>
        <li>Press Enter to open settings.json</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Required Settings</h3>
      <p>Add or update these settings in your settings.json file:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontSize: '0.8rem' }}>{`{
  "http.proxyStrictSSL": false,
  "files.autoSave": "afterDelay",

  // GitHub Enterprise Configuration
  "github-enterprise.hosts": [
    "github.corp.ebay.com"
  ],
  "github-authentication.useElectronFetch": false,

  // GitHub Copilot Settings
  "github.copilot.chat.anthropic.thinking.enabled": true,
  "github.copilot.chat.alternateGptPrompt.enabled": true,
  "github.copilot.chat.languageContext.typescript.enabled": true,
  "github.copilot.chat.languageContext.typescript.includeDocumentation": true,
  "github.copilot.nextEditSuggestions.enabled": true,

  // Claude Code Configuration
  "claude-code.environmentVariables": [
    {
      "name": "ANTHROPIC_API_KEY",
      "value": "$(npx @ebay/claude-code-token@latest get_token)"
    },
    {
      "name": "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS",
      "value": "1"
    },
    {
      "name": "ANTHROPIC_MODEL",
      "value": "hubgpt-chat-completions-claude-sonnet-4-5"
    },
    {
      "name": "ANTHROPIC_BASE_URL",
      "value": "https://platformgateway2.vip.ebay.com/hubgptgatewaysvc/v1/anthropic"
    },
    {
      "name": "CLAUDE_CODE_API_KEY_HELPER_TTL_MS",
      "value": "360000000"
    },
    {
      "name": "DISABLE_TELEMETRY",
      "value": "1"
    },
    {
      "name": "ANTHROPIC_LOG",
      "value": "debug"
    }
  ],
  "claudeCode.preferredLocation": "panel"
}`}</pre>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What These Settings Do</h3>
      <ul>
        <li><strong>http.proxyStrictSSL:</strong> Allows connections through eBay's proxy</li>
        <li><strong>github-enterprise.hosts:</strong> Adds GitHub Enterprise support</li>
        <li><strong>GitHub Copilot settings:</strong> Enables advanced Copilot features including Claude Sonnet integration</li>
        <li><strong>Claude Code variables:</strong> Configures authentication and API endpoints for eBay's Claude deployment</li>
      </ul>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Note:</strong> The ANTHROPIC_API_KEY uses a dynamic token helper that automatically refreshes your authentication. You don't need to manually update tokens.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Configuration</h3>
      <ol>
        <li>Save the settings.json file</li>
        <li>Restart VS Code</li>
        <li>Check that Claude Code and Cline can authenticate properly</li>
        <li>Try using GitHub Copilot to verify it's connected</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Optional: Additional Settings</h3>
      <p>You may also want to add:</p>
      <ul>
        <li><strong>Workbench theme:</strong> Choose your preferred color theme</li>
        <li><strong>Editor settings:</strong> Font size, line numbers, minimap preferences</li>
        <li><strong>Extension-specific settings:</strong> Configure Prettier, ESLint, etc.</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <a
          className="button ghost"
          href="https://code.visualstudio.com/docs/getstarted/settings"
          target="_blank"
          rel="noopener noreferrer"
        >
          VS Code Settings Documentation
        </a>
      </div>
    </>
  )
}
