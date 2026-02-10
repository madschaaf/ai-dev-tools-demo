export default function ConfigureGit() {
  return (
    <>
      <h2>Step 3: Configure Git</h2>
      <p>Set up Git with your identity so your commits are properly attributed.</p>

      <h3>Configuration Commands</h3>
      <p>Open your terminal and run these commands:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <code style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
          git config --global user.name "Your Name"
        </code>
        <code style={{ display: 'block' }}>
          git config --global user.email "your.email@ebay.com"
        </code>
      </div>

      <h3>Verify Configuration</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <code>git config --list</code>
      </div>
    </>
  )
}
