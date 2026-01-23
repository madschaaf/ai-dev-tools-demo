export default function ConfigureVSCode() {
  return (
    <>
      <h2>Configure VS Code Settings</h2>
      <p>Customize VS Code with recommended settings for eBay development.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Recommended Settings</h3>
      <p>The ai-dev-tools repository includes pre-configured settings in <code>.vscode/settings.json</code>:</p>

      <ul style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Editor:</strong> Tab size, auto-save, formatOnSave</li>
        <li><strong>Git:</strong> Auto-fetch, confirm sync</li>
        <li><strong>Terminal:</strong> Default shell configuration</li>
        <li><strong>Extensions:</strong> Copilot, Cline, Python settings</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Access Settings</h3>
      <p>To view or modify settings:</p>
      <ol>
        <li>Press <kbd>Cmd+,</kbd> (Mac) or <kbd>Ctrl+,</kbd> (Windows)</li>
        <li>Search for specific settings</li>
        <li>Or edit <code>.vscode/settings.json</code> directly</li>
      </ol>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>User vs Workspace Settings:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          The repository includes workspace settings that apply only to this project. Your user settings remain unchanged.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Useful Keyboard Shortcuts</h3>
      <ul>
        <li><kbd>Cmd/Ctrl + P</kbd> - Quick file open</li>
        <li><kbd>Cmd/Ctrl + Shift + P</kbd> - Command palette</li>
        <li><kbd>Cmd/Ctrl + `</kbd> - Toggle terminal</li>
        <li><kbd>Cmd/Ctrl + B</kbd> - Toggle sidebar</li>
      </ul>
    </>
  )
}
