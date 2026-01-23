import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallChrome() {
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)

  useEffect(() => {
    const os = getUserOS()
    if (os) {
      setUserOS(os)
    }
  }, [])

  return (
    <>
      <h2>Install Google Chrome</h2>
      <p>Google Chrome is a fast, secure web browser that's required for accessing eBay's AI tools and extensions. We'll install Chrome and set it up with your eBay credentials.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Why Chrome?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Chrome is required for eBay's approved AI extensions (ChatGPT and Glean). These tools provide context-aware assistance throughout your development work and can help you during setup.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Get</h3>
      <ul>
        <li><strong>Chrome Browser</strong> - Fast, secure web browser with developer tools</li>
        <li><strong>Extension Support</strong> - Platform for AI tools like ChatGPT and Glean</li>
        <li><strong>Google Account Integration</strong> - Sign in with your eBay credentials</li>
        <li><strong>Sync Across Devices</strong> - Keep bookmarks and settings synchronized</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Check for Existing Installation</h3>
      <p>First, check if you already have Chrome installed on your computer. Look for the Chrome icon in your applications or try opening it.</p>

      <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
        <strong>Already have Chrome?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          If Chrome is already installed, skip to Step 3 to pin it and sign in.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Download and Install Chrome</h3>
      <p>If you don't have Chrome installed, download and install it now:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Visit Chrome Download Page:</strong>{' '}
          <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">
            google.com/chrome
          </a>
        </li>
        <li><strong>Click "Download Chrome"</strong> - The site automatically detects your operating system</li>
        <li><strong>Run the Installer:</strong>
          {userOS === 'mac' ? (
            <ul>
              <li>Open the downloaded .dmg file</li>
              <li>Drag Chrome to your Applications folder</li>
              <li>Eject the disk image</li>
            </ul>
          ) : userOS === 'windows' ? (
            <ul>
              <li>Run the downloaded .exe file</li>
              <li>Follow the installation wizard</li>
              <li>Chrome will install and launch automatically</li>
            </ul>
          ) : (
            <ul>
              <li>Follow the installation prompts for your operating system</li>
              <li>Installation typically takes 1-2 minutes</li>
            </ul>
          )}
        </li>
        <li><strong>Launch Chrome:</strong> Open Chrome after installation completes</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Pin Chrome for Easy Access</h3>
      <p>Make Chrome easily accessible by pinning it to your taskbar or dock:</p>

      {userOS === 'mac' ? (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Mac Users:</strong>
          </div>
          <ol style={{ marginTop: 'var(--space-2)' }}>
            <li><strong>Open Chrome</strong> (if not already open)</li>
            <li><strong>Right-click the Chrome icon</strong> in your Dock</li>
            <li><strong>Select "Options"</strong> → <strong>"Keep in Dock"</strong></li>
          </ol>
        </>
      ) : userOS === 'windows' ? (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Windows Users:</strong>
          </div>
          <ol style={{ marginTop: 'var(--space-2)' }}>
            <li><strong>Open Chrome</strong> (if not already open)</li>
            <li><strong>Right-click the Chrome icon</strong> on your taskbar</li>
            <li><strong>Select "Pin to taskbar"</strong></li>
          </ol>
        </>
      ) : (
        <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
          Right-click the Chrome icon and select the option to pin it to your taskbar or dock.
        </p>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Sign in with eBay Credentials</h3>
      <p>Sign in to your eBay Google account to access company services and extensions:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Navigate to Gmail:</strong>{' '}
          <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
            mail.google.com
          </a>
        </li>
        <li><strong>Click "Sign in"</strong></li>
        <li><strong>Enter your eBay email:</strong> Use your @ebay.com email address</li>
        <li><strong>Authenticate:</strong> You'll be redirected to eBay SSO - use your corporate credentials</li>
        <li><strong>Complete sign-in:</strong> Follow any additional security prompts (PingID, YubiKey)</li>
      </ol>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Important:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Use your eBay corporate credentials (@ebay.com), not a personal Google account. This ensures you have access to company-approved extensions and services.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verification</h3>
      <p>Confirm Chrome is properly set up:</p>
      <ul>
        <li>✓ Chrome is installed and launches successfully</li>
        <li>✓ Chrome icon is pinned to your {userOS === 'mac' ? 'Dock' : 'taskbar'}</li>
        <li>✓ You're signed in with your eBay email (@ebay.com)</li>
        <li>✓ Chrome is your default browser (optional but recommended)</li>
      </ul>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>Chrome is Ready!</strong>
        <p style={{ margin: '8px 0 0' }}>
          Now you're ready to install AI extensions. Proceed to the next step to install ChatGPT and Glean extensions.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>Chrome won't install:</strong> Ensure you have local admin access (see earlier steps)</li>
          <li><strong>Sign-in fails:</strong> Verify you're using your @ebay.com email, not a personal account</li>
          <li><strong>SSO redirect issues:</strong> Check that you're on the eBay network or connected via VPN</li>
          <li><strong>Can't pin to taskbar:</strong> Right-click the Chrome window icon while it's open</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>With Chrome installed and configured, you're ready to add AI extensions that will help you throughout your development work. The next step will guide you through installing ChatGPT and Glean extensions.</p>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a
          className="button ghost"
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Chrome
        </a>
        <a
          className="button ghost"
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Gmail
        </a>
        <a
          className="button ghost"
          href="https://support.google.com/chrome/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome Help
        </a>
      </div>
    </>
  )
}
