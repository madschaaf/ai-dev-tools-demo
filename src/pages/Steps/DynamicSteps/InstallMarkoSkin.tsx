export default function InstallMarkoSkin() {
  return (
    <>
      <h2>Install Marko and eBay Skin</h2>
      <p>Install Marko framework and eBay Skin component library for eBay frontend development.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>For Frontend Engineers:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Marko is eBay's UI framework. eBay Skin provides pre-built components following eBay's design system.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Installation</h3>
      <p>Install Marko and eBay Skin in your project:</p>

      <pre style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'auto' }}>
        <code>npm install marko @ebay/skin</code>
      </pre>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Documentation</h3>
      <ul>
        <li><a href="https://markojs.com/" target="_blank" rel="noopener noreferrer">Marko Documentation</a></li>
        <li><a href="https://ebay.github.io/skin/" target="_blank" rel="noopener noreferrer">eBay Skin Documentation</a></li>
      </ul>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Next Steps:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          After installation, check the documentation for component examples and best practices.
        </p>
      </div>
    </>
  )
}
