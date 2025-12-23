export default function CloneRepository() {
  return (
    <>
      <h2>Step 4: Clone Repository</h2>
      <p>Clone your first project repository to start working on code.</p>

      <h3>Using VS Code</h3>
      <ol>
        <li>Open VS Code</li>
        <li>Press <kbd>Cmd+Shift+P</kbd> (Mac) or <kbd>Ctrl+Shift+P</kbd> (Windows/Linux)</li>
        <li>Type "Git: Clone" and select it</li>
        <li>Paste your repository URL</li>
        <li>Choose a local folder to clone into</li>
      </ol>

      <h3>Using Terminal</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <code>git clone https://github.com/username/repository.git</code>
      </div>
    </>
  )
}
