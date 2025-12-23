export default function GitHubPersonal() {
  return (
    <>
      <h2>GitHub.com (Personal)</h2>
      <p>Public GitHub for open-source contributions, personal projects, and community engagement.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Contribute to open-source projects</li>
        <li>Maintain personal portfolios and side projects</li>
        <li>Follow repos and developers for learning</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://github.com" target="_blank" rel="noreferrer">
          Open GitHub Personal
        </a>
      </div>
    </>
  )
}
