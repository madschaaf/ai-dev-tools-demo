interface InstallMarkoSkinProps {
  onComplete: () => void
  isCompleted: boolean
  onNext: () => void
}

export default function InstallMarkoSkin({ onComplete, isCompleted, onNext }: InstallMarkoSkinProps) {
  return (
    <>
      <h2>Install Marko & eBay Skin</h2>
      <p><strong>Role:</strong> Frontend Engineer</p>
      <p>Set up Marko.js and eBay Skin (Evo) for building eBay frontend applications. These are the core tools for eBay's frontend development.</p>

      {isCompleted && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#28a745', color: '#155724', marginTop: 'var(--space-3)' }}>
          <strong>✓ Step Completed!</strong> You've completed the Marko & eBay Skin installation setup.
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Install</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #3665F3' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Marko.js</div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            eBay's fast UI framework for server-side rendering
          </p>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #3665F3' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>eBayUI Core</div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            eBay's component library (@ebay/ebayui-core)
          </p>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #3665F3' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>eBay Skin (Evo)</div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            eBay's design system styles (@ebay/skin)
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Create a New Marko Project</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 600 }}>Run these commands in your terminal:</p>
        <code style={{ display: 'block', background: '#1e1e1e', color: '#d4d4d4', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          {`npm init marko -- --template default my-ebay-app
cd my-ebay-app
npm install`}
        </code>
        <button
          type="button"
          className="button ghost"
          onClick={() => navigator.clipboard.writeText("npm init marko -- --template default my-ebay-app\ncd my-ebay-app\nnpm install")}
          style={{ marginTop: 'var(--space-2)', fontSize: '0.85rem', padding: '6px 12px' }}
        >
          Copy Commands
        </button>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Install eBayUI Core</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <code style={{ display: 'block', background: '#1e1e1e', color: '#d4d4d4', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace' }}>
          npm install @ebay/ebayui-core
        </code>
        <button
          type="button"
          className="button ghost"
          onClick={() => navigator.clipboard.writeText("npm install @ebay/ebayui-core")}
          style={{ marginTop: 'var(--space-2)', fontSize: '0.85rem', padding: '6px 12px' }}
        >
          Copy Command
        </button>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Install eBay Skin CSS</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <code style={{ display: 'block', background: '#1e1e1e', color: '#d4d4d4', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace' }}>
          npm install @ebay/skin
        </code>
        <button
          type="button"
          className="button ghost"
          onClick={() => navigator.clipboard.writeText("npm install @ebay/skin")}
          style={{ marginTop: 'var(--space-2)', fontSize: '0.85rem', padding: '6px 12px' }}
        >
          Copy Command
        </button>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Verify Installation</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 600 }}>Start the development server:</p>
        <code style={{ display: 'block', background: '#1e1e1e', color: '#d4d4d4', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace' }}>
          npm run dev
        </code>
        <button
          type="button"
          className="button ghost"
          onClick={() => navigator.clipboard.writeText("npm run dev")}
          style={{ marginTop: 'var(--space-2)', fontSize: '0.85rem', padding: '6px 12px' }}
        >
          Copy Command
        </button>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Your app should be running at <code>http://localhost:3000</code>
        </p>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>💡 AI Help:</strong> If you encounter setup errors, ask Cline or Claude Code: "I'm getting this error when installing @ebay/ebayui-core: [paste error]. How do I fix it?"
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Design System & Components</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ padding: 'var(--space-3)', background: '#fff', borderRadius: 'var(--radius-md)', border: '2px solid #e1e4e8' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '1rem', color: '#3665F3' }}>eBay Skin</h4>
          <p style={{ fontSize: '0.85rem', margin: '0 0 12px', color: '#666' }}>
            CSS framework providing eBay's design language including colors, typography, spacing, and component styles.
          </p>
          <ul style={{ margin: 0, fontSize: '0.85rem', paddingLeft: '20px' }}>
            <li><a href="https://evo-web.vercel.app/skin/" target="_blank" rel="noopener noreferrer">Skin Documentation</a></li>
            <li><a href="https://github.com/eBay/evo-web/tree/main/packages/skin" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
            <li>CSS variables for colors, spacing, typography</li>
          </ul>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#fff', borderRadius: 'var(--radius-md)', border: '2px solid #e1e4e8' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '1rem', color: '#3665F3' }}>eBayUI Core</h4>
          <p style={{ fontSize: '0.85rem', margin: '0 0 12px', color: '#666' }}>
            Component library built on Marko.js providing reusable UI components following eBay's design system.
          </p>
          <ul style={{ margin: 0, fontSize: '0.85rem', paddingLeft: '20px' }}>
            <li><a href="https://opensource.ebay.com/ebayui-core/" target="_blank" rel="noopener noreferrer">Component Browser (Storybook)</a></li>
            <li><a href="https://github.com/eBay/evo-web/tree/main/packages/ebayui-core" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
            <li>Buttons, forms, modals, dialogs, menus, and more</li>
          </ul>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Additional Resources</h3>
      <ul style={{ fontSize: '0.9rem' }}>
        <li><a href="https://markojs.com/" target="_blank" rel="noopener noreferrer">Marko.js Official Documentation</a></li>
        <li><a href="https://markojs.com/docs/introduction/installation" target="_blank" rel="noopener noreferrer">Marko Installation Guide</a></li>
        <li>Search Glean for "Marko setup" or "eBay frontend onboarding"</li>
        <li>Join Slack channels for support:
          <ul style={{ marginTop: '4px', fontSize: '0.85rem' }}>
            <li><strong>#ebayui-web</strong> - eBayUI Core component support</li>
            <li><strong>#marko</strong> - Marko.js help and discussion</li>
            <li><strong>#frontend</strong> - General frontend development</li>
          </ul>
        </li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid #e1e4e8', textAlign: 'center' }}>
        {!isCompleted ? (
          <button
            type="button"
            onClick={() => {
              onComplete()
              onNext()
            }}
            className="button primary"
            style={{ padding: '12px 32px', fontSize: '1rem' }}
          >
            Mark as Complete & Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="button primary"
            style={{ padding: '12px 32px', fontSize: '1rem' }}
          >
            Continue to Next Step →
          </button>
        )}
      </div>
    </>
  )
}
