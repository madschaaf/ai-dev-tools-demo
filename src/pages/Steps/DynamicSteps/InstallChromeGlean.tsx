import { useState, useEffect } from 'react'

export default function InstallChromeGlean() {
  const [userOS, setUserOS] = useState<'mac' | 'windows'>('mac')
  const [completedSteps, setCompletedSteps] = useState({
    chrome: false,
    pinned: false,
    gmail: false,
    chatgpt: false,
    glean: false,
    access: false
  })

  useEffect(() => {
    const platform = navigator.platform.toLowerCase()
    if (platform.includes('win')) {
      setUserOS('windows')
    }
  }, [])

  const handleStepComplete = (step: keyof typeof completedSteps) => {
    setCompletedSteps(prev => ({ ...prev, [step]: !prev[step] }))
  }

  const allStepsComplete = Object.values(completedSteps).every(step => step === true)

  return (
    <>
      <h2>Install Chrome & AI Extensions</h2>
      <p>Set up Google Chrome and install AI extensions (ChatGPT and Glean) to get help throughout your setup process.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Why Chrome & AI Extensions?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          ChatGPT and Glean are eBay's approved AI tools that can help you with setup questions.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>1. Install Chrome (if needed)</h3>
      <p>Check if you already have Google Chrome installed. If not, download and install it:</p>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Download:</strong> Visit <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">google.com/chrome</a></li>
        <li><strong>Install:</strong> Run the installer for your operating system</li>
        <li><strong>Launch:</strong> Open Chrome after installation</li>
      </ol>
      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input type="checkbox" checked={completedSteps.chrome} onChange={() => handleStepComplete('chrome')} style={{ width: '18px', height: '18px' }} />
          <span style={{ fontWeight: completedSteps.chrome ? 600 : 400 }}>Chrome is installed</span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>2. Pin Chrome to Taskbar</h3>
      {userOS === 'mac' ? (
        <ol style={{ marginTop: 'var(--space-2)' }}>
          <li>Open Chrome</li>
          <li>Right-click the Chrome icon in your Dock</li>
          <li>Select "Options" → "Keep in Dock"</li>
        </ol>
      ) : (
        <ol style={{ marginTop: 'var(--space-2)' }}>
          <li>Open Chrome</li>
          <li>Right-click the Chrome icon on your taskbar</li>
          <li>Select "Pin to taskbar"</li>
        </ol>
      )}
      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input type="checkbox" checked={completedSteps.pinned} onChange={() => handleStepComplete('pinned')} style={{ width: '18px', height: '18px' }} />
          <span style={{ fontWeight: completedSteps.pinned ? 600 : 400 }}>Chrome is pinned</span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>3. Sign in to Gmail</h3>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>Visit <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">mail.google.com</a></li>
        <li>Sign in with your @ebay.com email</li>
        <li>Complete eBay SSO authentication</li>
      </ol>
      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input type="checkbox" checked={completedSteps.gmail} onChange={() => handleStepComplete('gmail')} style={{ width: '18px', height: '18px' }} />
          <span style={{ fontWeight: completedSteps.gmail ? 600 : 400 }}>Signed in to Gmail</span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>4. Install ChatGPT Extension</h3>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>Visit <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="noopener noreferrer">Chrome Web Store</a></li>
        <li>Search for "ChatGPT"</li>
        <li>Click "Add to Chrome" on the official ChatGPT extension</li>
        <li>Confirm installation</li>
      </ol>
      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input type="checkbox" checked={completedSteps.chatgpt} onChange={() => handleStepComplete('chatgpt')} style={{ width: '18px', height: '18px' }} />
          <span style={{ fontWeight: completedSteps.chatgpt ? 600 : 400 }}>ChatGPT extension installed</span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>5. Install Glean Extension</h3>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>Visit <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="noopener noreferrer">Chrome Web Store</a></li>
        <li>Search for "Glean"</li>
        <li>Click "Add to Chrome" on the official Glean extension</li>
        <li>Confirm installation</li>
      </ol>
      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input type="checkbox" checked={completedSteps.glean} onChange={() => handleStepComplete('glean')} style={{ width: '18px', height: '18px' }} />
          <span style={{ fontWeight: completedSteps.glean ? 600 : 400 }}>Glean extension installed</span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>6. Activate AI Extensions</h3>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>Click the ChatGPT icon and sign in with eBay SSO</li>
        <li>Visit <a href="https://app.glean.com/chat/" target="_blank" rel="noopener noreferrer">app.glean.com/chat</a> and sign in</li>
        <li>Click the Glean icon in Chrome toolbar</li>
        <li>Test by asking a question</li>
      </ol>
      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input type="checkbox" checked={completedSteps.access} onChange={() => handleStepComplete('access')} style={{ width: '18px', height: '18px' }} />
          <span style={{ fontWeight: completedSteps.access ? 600 : 400 }}>AI extensions are active</span>
        </label>
      </div>

      {allStepsComplete && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>✓ Chrome and AI extensions are ready!</strong>
          <p style={{ margin: '8px 0 0' }}>You now have ChatGPT and Glean available to help during setup.</p>
        </div>
      )}

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a className="button ghost" href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Download Chrome</a>
        <a className="button ghost" href="https://app.glean.com/chat/" target="_blank" rel="noopener noreferrer">Open Glean</a>
        <a className="button ghost" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open ChatGPT</a>
      </div>
    </>
  )
}
