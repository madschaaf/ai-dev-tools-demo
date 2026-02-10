import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallChromeGlean({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [completedSteps, setCompletedSteps] = useState({
    chrome: false,
    pinned: false,
    gmail: false,
    chatgpt: false,
    glean: false,
    access: false
  })

  useEffect(() => {
    const os = getUserOS()
    if (os) {
      setUserOS(os)
    }
  }, [])

  const handleStepComplete = (step: keyof typeof completedSteps) => {
    setCompletedSteps(prev => ({ ...prev, [step]: !prev[step] }))
  }

  const allStepsComplete = Object.values(completedSteps).every(step => step === true)

  return (
    <>
      <h2>Step 4: Install Chrome & AI Extensions</h2>
      <p>Set up Google Chrome and install AI extensions (ChatGPT and Glean) to get help throughout your setup process. These are eBay-approved AI assistants that can answer questions and help troubleshoot issues.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Why Chrome & AI Extensions?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          ChatGPT and Glean are eBay's approved AI tools that can help you with setup questions. Keep Chrome open on this page so these extensions can provide context-aware assistance throughout your setup.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3.1: Install Chrome (if needed)</h3>
      <p>Check if you already have Google Chrome installed on your computer. If not, download and install it:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Download Chrome:</strong> Visit{' '}
          <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">
            google.com/chrome
          </a>
        </li>
        <li><strong>Run the installer:</strong> Follow the installation prompts for your operating system</li>
        <li><strong>Launch Chrome:</strong> Open Chrome after installation completes</li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={completedSteps.chrome}
            onChange={() => handleStepComplete('chrome')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: completedSteps.chrome ? 600 : 400 }}>
            Chrome is installed and running
          </span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3.2: Pin Chrome to Taskbar</h3>
      <p>Make Chrome easily accessible by pinning it to your taskbar:</p>

      {userOS === 'mac' ? (
        <ol style={{ marginTop: 'var(--space-2)' }}>
          <li><strong>Open Chrome</strong> (if not already open)</li>
          <li><strong>Right-click the Chrome icon</strong> in your Dock</li>
          <li><strong>Select "Options"</strong> → <strong>"Keep in Dock"</strong></li>
        </ol>
      ) : userOS === 'windows' ? (
        <ol style={{ marginTop: 'var(--space-2)' }}>
          <li><strong>Open Chrome</strong> (if not already open)</li>
          <li><strong>Right-click the Chrome icon</strong> on your taskbar</li>
          <li><strong>Select "Pin to taskbar"</strong></li>
        </ol>
      ) : (
        <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
          Right-click the Chrome icon and select the option to pin it to your taskbar or dock.
        </p>
      )}

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={completedSteps.pinned}
            onChange={() => handleStepComplete('pinned')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: completedSteps.pinned ? 600 : 400 }}>
            Chrome is pinned to {userOS === 'mac' ? 'Dock' : 'taskbar'}
          </span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3.3: Sign in to Gmail with eBay Credentials</h3>
      <p>Sign in to your eBay Google account to access company services:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Go to Gmail:</strong> Visit{' '}
          <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
            mail.google.com
          </a>
        </li>
        <li><strong>Click "Sign in"</strong></li>
        <li><strong>Enter your eBay email:</strong> Use your @ebay.com email address</li>
        <li><strong>Authenticate:</strong> You'll be redirected to eBay SSO - use your corporate credentials</li>
        <li><strong>Complete sign-in:</strong> Follow any additional security prompts (PingID, YubiKey)</li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={completedSteps.gmail}
            onChange={() => handleStepComplete('gmail')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: completedSteps.gmail ? 600 : 400 }}>
            Signed in to Gmail with eBay credentials
          </span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3.4: Install ChatGPT Extension</h3>
      <p>Add the ChatGPT extension to Chrome for AI assistance:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Open Chrome Web Store:</strong> Visit{' '}
          <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="noopener noreferrer">
            Chrome Web Store
          </a>
        </li>
        <li><strong>Search for "ChatGPT"</strong> in the search bar</li>
        <li><strong>Find the official ChatGPT extension</strong> (published by OpenAI)</li>
        <li><strong>Click "Add to Chrome"</strong></li>
        <li><strong>Confirm:</strong> Click "Add extension" when prompted</li>
        <li><strong>Wait for installation:</strong> The ChatGPT icon should appear in your Chrome toolbar</li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={completedSteps.chatgpt}
            onChange={() => handleStepComplete('chatgpt')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: completedSteps.chatgpt ? 600 : 400 }}>
            ChatGPT extension is installed
          </span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3.5: Install Glean Extension</h3>
      <p>Add the Glean extension to Chrome for AI-powered assistance:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Open Chrome Web Store:</strong> Visit{' '}
          <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="noopener noreferrer">
            Chrome Web Store
          </a>
        </li>
        <li><strong>Search for "Glean"</strong> in the search bar</li>
        <li><strong>Find the official Glean extension</strong> (published by Glean Technologies, Inc.)</li>
        <li><strong>Click "Add to Chrome"</strong></li>
        <li><strong>Confirm:</strong> Click "Add extension" when prompted</li>
        <li><strong>Wait for installation:</strong> The Glean icon should appear in your Chrome toolbar</li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={completedSteps.glean}
            onChange={() => handleStepComplete('glean')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: completedSteps.glean ? 600 : 400 }}>
            Glean extension is installed
          </span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3.6: Activate AI Extensions</h3>
      <p>Set up and activate your AI extensions for help during setup:</p>

      <ol style={{ marginTop: 'var(--space-3)' }}>
        <li>
          <strong>ChatGPT:</strong> Click the ChatGPT icon in your Chrome toolbar and sign in with eBay SSO
        </li>
        <li>
          <strong>Glean - Web:</strong> Visit{' '}
          <a href="https://app.glean.com/chat/" target="_blank" rel="noopener noreferrer">
            app.glean.com/chat
          </a>{' '}
          and sign in with your eBay credentials
        </li>
        <li>
          <strong>Glean - Extension:</strong> Click the Glean icon in your Chrome toolbar
        </li>
        <li><strong>Grant permissions:</strong> Allow extensions to access the current page when asked</li>
        <li><strong>Test them:</strong> Ask either AI a question like "What is Node.js?" to verify they're working</li>
      </ol>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Using Your AI Assistants:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Now you have <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#856404', fontWeight: 600 }}>ChatGPT</a> and <a href="https://app.glean.com/chat/" target="_blank" rel="noopener noreferrer" style={{ color: '#856404', fontWeight: 600 }}>Glean</a> available through your browser and extensions to help! You can ask them questions about the setup steps as you work through them. For example: "How do I check if Node.js is installed?" or "What is nvm used for?"
        </p>
      </div>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={completedSteps.access}
            onChange={() => handleStepComplete('access')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: completedSteps.access ? 600 : 400 }}>
            AI extensions are active and I can ask them questions
          </span>
        </label>
      </div>

      {allStepsComplete && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>Great! Chrome and AI extensions are ready.</strong>
          <p style={{ margin: '8px 0 0' }}>
            You now have ChatGPT and Glean available as you continue with the setup. Proceed to Step 5 to install Node.js. If you get stuck, ask your AI assistants for help!
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>Once Chrome and your AI extensions are set up, proceed to Step 5 to install Node.js. ChatGPT and Glean will be available to help if you encounter any issues during the installation process.</p>

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
          href="https://chrome.google.com/webstore/category/extensions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome Web Store
        </a>
        <a
          className="button ghost"
          href="https://app.glean.com/chat/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Glean Chat
        </a>
         <a
          className="button ghost"
          href="https://chatgpt.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open ChatGPT
        </a>
      </div>

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {!isCompleted ? (
            <button
              type="button"
              onClick={onComplete}
              disabled={!allStepsComplete}
              style={{
                fontSize: '1rem',
                padding: '12px 24px',
                background: allStepsComplete ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: allStepsComplete ? 'pointer' : 'not-allowed',
                fontWeight: 600,
                transition: 'all 0.2s',
                opacity: allStepsComplete ? 1 : 0.6
              }}
            >
              Mark as Complete
            </button>
          ) : (
            <div style={{ color: '#28a745', fontWeight: 600, fontSize: '1.1rem' }}>
              ✓ Step Completed
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          style={{
            fontSize: '1rem',
            padding: '12px 24px',
            background: '#0969da',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
        >
          Next Step →
        </button>
      </div>
    </>
  )
}
