import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallGleanExtension() {
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)

  useEffect(() => {
    const os = getUserOS()
    if (os) {
      setUserOS(os)
    }
  }, [])

  return (
    <>
      <h2>Install AI Extensions (ChatGPT & Glean)</h2>
      <p>Install eBay-approved AI extensions to get help throughout your setup process and daily development work. These extensions provide context-aware assistance, answer questions, and help troubleshoot issues.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Why AI Extensions?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          ChatGPT and Glean are eBay's approved AI tools that can help you with setup questions. Keep Chrome open on this page so these extensions can provide context-aware assistance throughout your setup.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Get</h3>
      <ul>
        <li><strong>ChatGPT Extension</strong> - General AI assistant for coding, troubleshooting, and questions</li>
        <li><strong>Glean Extension</strong> - eBay-specific AI that searches internal documentation and resources</li>
        <li><strong>Context-Aware Help</strong> - Extensions can read the current page to provide better answers</li>
        <li><strong>Quick Access</strong> - Click extension icons in your Chrome toolbar anytime</li>
      </ul>

      <div className="callout" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        <div className="ai-helper-icons">
          <span className="ai-helper-icon ai-helper-icon-glean" aria-hidden="true">g</span>
          <span className="ai-helper-icon ai-helper-icon-chatgpt" aria-hidden="true">c</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          <strong>Tip:</strong> After installing these extensions, you'll see their icons near your URL bar. Click them anytime you need help!
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Install ChatGPT Extension</h3>
      <p>Add the ChatGPT extension to Chrome for AI assistance:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Open Chrome Web Store:</strong>{' '}
          <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="noopener noreferrer">
            Chrome Web Store
          </a>
        </li>
        <li><strong>Search for "ChatGPT"</strong> in the search bar</li>
        <li><strong>Find the official ChatGPT extension</strong> (published by OpenAI)
          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-2)', fontSize: '0.9rem' }}>
            <strong>Verify Publisher:</strong> Make sure it's the official extension published by "OpenAI" to ensure security.
          </div>
        </li>
        <li><strong>Click "Add to Chrome"</strong></li>
        <li><strong>Confirm:</strong> Click "Add extension" when prompted</li>
        <li><strong>Wait for installation:</strong> The ChatGPT icon should appear in your Chrome toolbar</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Install Glean Extension</h3>
      <p>Add the Glean extension to Chrome for eBay-specific AI assistance:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Open Chrome Web Store:</strong>{' '}
          <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="noopener noreferrer">
            Chrome Web Store
          </a>
        </li>
        <li><strong>Search for "Glean"</strong> in the search bar</li>
        <li><strong>Find the official Glean extension</strong> (published by Glean Technologies, Inc.)
          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-2)', fontSize: '0.9rem' }}>
            <strong>Verify Publisher:</strong> Ensure it's published by "Glean Technologies, Inc." for the official version.
          </div>
        </li>
        <li><strong>Click "Add to Chrome"</strong></li>
        <li><strong>Confirm:</strong> Click "Add extension" when prompted</li>
        <li><strong>Wait for installation:</strong> The Glean icon should appear in your Chrome toolbar</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Sign in to ChatGPT</h3>
      <p>Activate your ChatGPT extension:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Click the ChatGPT icon</strong> in your Chrome toolbar (near the URL bar)</li>
        <li><strong>Sign in with eBay SSO:</strong> Use your eBay corporate credentials</li>
        <li><strong>Grant permissions:</strong> Allow the extension to access the current page when asked
          <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-2)', fontSize: '0.9rem' }}>
            <strong>Why permissions?</strong> This allows ChatGPT to read the current webpage and provide context-aware help based on what you're viewing.
          </div>
        </li>
        <li><strong>Test it:</strong> Ask ChatGPT a question like "What is Node.js?" to verify it's working</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Sign in to Glean</h3>
      <p>Activate your Glean extension for eBay-specific assistance:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Visit Glean Web:</strong>{' '}
          <a href="https://app.glean.com/chat/" target="_blank" rel="noopener noreferrer">
            app.glean.com/chat
          </a>
        </li>
        <li><strong>Sign in with eBay credentials:</strong> Use your @ebay.com email and corporate SSO</li>
        <li><strong>Click the Glean extension icon</strong> in your Chrome toolbar</li>
        <li><strong>Grant permissions:</strong> Allow the extension to access the current page
          <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-2)', fontSize: '0.9rem' }}>
            <strong>eBay Knowledge:</strong> Glean has access to internal eBay documentation, wikis, and resources. It's especially useful for company-specific questions.
          </div>
        </li>
        <li><strong>Test it:</strong> Ask Glean an eBay-specific question to verify it's working</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 5: Pin Extensions for Easy Access</h3>
      <p>Make your AI extensions easily accessible by pinning them to the toolbar:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Click the puzzle piece icon</strong> in your Chrome toolbar (Extensions menu)</li>
        <li><strong>Find ChatGPT</strong> in the list and click the pin icon next to it</li>
        <li><strong>Find Glean</strong> in the list and click the pin icon next to it</li>
        <li><strong>Verify:</strong> Both extension icons should now be visible in your toolbar, near the URL bar</li>
      </ol>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>AI Assistants Ready!</strong>
        <p style={{ margin: '8px 0 0' }}>
          You now have ChatGPT and Glean available as you continue with the setup. These extensions can help if you get stuck on any step. Just click their icons and ask questions!
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>How to Use Your AI Assistants</h3>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', marginTop: 'var(--space-3)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: 'none' }}>
        <h4 style={{ color: 'white', marginTop: 0, fontSize: '1.2rem', marginBottom: 'var(--space-3)' }}>
          💡 Tips for Getting Help
        </h4>

        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🤖</span>
              <div>
                <h5 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  ChatGPT - General Programming Help
                </h5>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9 }}>
                  Ask about programming concepts, debugging errors, or "how do I..." questions.
                </p>
                <div style={{ marginTop: 'var(--space-2)', fontSize: '0.85rem', opacity: 0.85 }}>
                  <strong>Example questions:</strong>
                  <ul style={{ marginTop: 'var(--space-1)', paddingLeft: '20px' }}>
                    <li>"How do I check if Node.js is installed?"</li>
                    <li>"What does this error mean: 'command not found'?"</li>
                    <li>"Explain what a virtual environment is"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🔍</span>
              <div>
                <h5 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  Glean - eBay-Specific Help
                </h5>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9 }}>
                  Ask about eBay processes, internal tools, documentation, or company-specific workflows.
                </p>
                <div style={{ marginTop: 'var(--space-2)', fontSize: '0.85rem', opacity: 0.85 }}>
                  <strong>Example questions:</strong>
                  <ul style={{ marginTop: 'var(--space-1)', paddingLeft: '20px' }}>
                    <li>"How do I request GitHub access at eBay?"</li>
                    <li>"What is the eBay proxy configuration?"</li>
                    <li>"Find documentation for our authentication system"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>✨</span>
              <div>
                <h5 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  Best Practices
                </h5>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', opacity: 0.9 }}>
                  <li>Be specific in your questions</li>
                  <li>Include error messages when troubleshooting</li>
                  <li>Try ChatGPT for general tech questions</li>
                  <li>Try Glean for eBay-specific questions</li>
                  <li>Both extensions can see the current page for context</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>Extension not appearing:</strong> Restart Chrome after installation</li>
          <li><strong>Can't sign in:</strong> Ensure you're using your @ebay.com email</li>
          <li><strong>Extension not working:</strong> Check that you granted page access permissions</li>
          <li><strong>Glean access denied:</strong> Verify you're on eBay network or VPN</li>
          <li><strong>Icon not in toolbar:</strong> Click the puzzle piece icon and pin the extensions</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>With your AI assistants ready, you can continue with the setup process knowing you have help available whenever you need it. The extensions will be there to answer questions about Node.js, Git, VS Code, or any other tools you'll be installing.</p>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
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
    </>
  )
}
