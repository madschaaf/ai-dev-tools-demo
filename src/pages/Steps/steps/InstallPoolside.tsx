// ⚠️ DISCONTINUED: Poolside partnership has been discontinued as of January 2026
// This component is kept for historical reference only
// Do not use or activate this step in the setup guide

interface InstallPoolsideProps {
  onComplete: () => void
  isCompleted: boolean
  onNext: () => void
}

export default function InstallPoolside({ onComplete, isCompleted, onNext }: InstallPoolsideProps) {
  return (
    <>
      <h2>Install Poolside Assistant</h2>
      <p><strong>AI Tool:</strong> Poolside - eBay's AI coding assistant</p>
      <p>Poolside is an AI-powered coding assistant specifically trained for eBay's codebase. It provides intelligent code completions and suggestions using eBay's fine-tuned models.</p>

      {isCompleted && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#28a745', color: '#155724', marginTop: 'var(--space-3)' }}>
          <strong>✓ Step Completed!</strong> You've installed Poolside Assistant.
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>What is Poolside?</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #3665F3' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Point-RC-2</div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Base completions model for general coding assistance
          </p>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #3665F3' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Point-FT-v2</div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            eBay fine-tuned model optimized for eBay's codebase
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Download Poolside VSIX</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>Download the latest version from one of these locations:</p>

        <div style={{ marginBottom: '12px' }}>
          <strong style={{ fontSize: '0.9rem' }}>Option 1: From Repository (Recommended)</strong>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            If the VSIX file is in this repository at <code>.vscode/extensions/</code>, you already have it!
          </p>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <strong style={{ fontSize: '0.9rem' }}>Option 2: From eBay S3 Bucket</strong>
          <code style={{ display: 'block', background: '#1e1e1e', color: '#d4d4d4', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.85rem', marginTop: '8px' }}>
            s3://ebay-poolside-incoming/ide-extensions/poolside-vscode-assistant-1.6.18.vsix
          </code>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Access via AWS CLI or eBay's internal tools
          </p>
        </div>

        <div>
          <strong style={{ fontSize: '0.9rem' }}>Option 3: From Slack Channel</strong>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Check the Poolside announcement channel for the latest VSIX file
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Install the VSIX File</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>In VS Code:</p>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Cmd+Shift+P</kbd> (Mac) or <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Ctrl+Shift+P</kbd> (Windows)</li>
          <li>Type: <code>Extensions: Install from VSIX...</code></li>
          <li>Press Enter</li>
          <li>Navigate to the downloaded <code>poolside-vscode-assistant-1.6.18.vsix</code> file</li>
          <li>Select it and click <strong>Install</strong></li>
          <li>Restart VS Code when prompted</li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Configure Poolside Settings</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff3cd', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>⚠️ Important Configuration:</p>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>Open VS Code Settings (<kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Cmd+,</kbd> or <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Ctrl+,</kbd>)</li>
          <li>Search for: <code>Poolside</code></li>
          <li>Find the setting: <strong>Poolside: Server URI</strong></li>
          <li>Set it to: <code style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '2px 8px', borderRadius: '4px' }}>https://poolside.ebay.com</code></li>
          <li>Save the settings</li>
        </ol>
        <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: '#856404' }}>
          This enables eBay SSO authentication for Poolside
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Authenticate with eBay SSO</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>After restarting VS Code, Poolside will prompt you to sign in</li>
          <li>Click <strong>Sign In</strong> when prompted</li>
          <li>Your browser will open to authenticate with eBay SSO</li>
          <li>Complete the SSO login process</li>
          <li>Return to VS Code - Poolside should now be active</li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 5: Select Your Model</h3>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>Choose which Poolside model to use:</p>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem' }}>
          <li><strong>Point-RC-2:</strong> Base model - good for general coding tasks</li>
          <li><strong>Point-FT-v2:</strong> eBay fine-tuned model - optimized for eBay's tech stack and patterns</li>
        </ul>
        <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Access the model picker in the Poolside extension panel in VS Code
        </p>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>💡 Using Poolside:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>Start typing - Poolside provides inline code suggestions automatically</li>
          <li>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0d47a1' }}>Tab</kbd> to accept a suggestion</li>
          <li>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0d47a1' }}>Esc</kbd> to dismiss a suggestion</li>
          <li>Try the eBay fine-tuned model (Point-FT-v2) for better results on eBay codebases</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <ul style={{ fontSize: '0.9rem' }}>
        <li><strong>Can't find the VSIX file?</strong> Check <code>.vscode/extensions/</code> in this repo or download from S3</li>
        <li><strong>Installation fails?</strong> Make sure you have the latest version of VS Code</li>
        <li><strong>SSO not working?</strong> Verify the URI is set to <code>https://poolside.ebay.com</code> in settings</li>
        <li><strong>Models not appearing?</strong> Ensure you're connected to eBay's network or VPN</li>
        <li><strong>No suggestions appearing?</strong> Check that Poolside is enabled in the status bar (bottom right)</li>
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
