import { useState, useEffect } from 'react'

export default function InstallExtensions() {
  const [userOS, setUserOS] = useState<'mac' | 'windows'>('mac')
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const platform = navigator.platform.toLowerCase()
    if (platform.includes('win')) {
      setUserOS('windows')
    }

    const savedData = localStorage.getItem('ebay-dev-setup-user-info')
    if (savedData) {
      const userData = JSON.parse(savedData)
      if (userData.email) {
        setUsername(userData.email.split('@')[0])
      }
    }
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <>
      <h2>Install VS Code Extensions</h2>
      <p>Clone the AI Dev Tools repository to automatically get all recommended VS Code extensions.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>1. Clone the Repository</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            cd ~/Documents{'\n'}git clone https://github.com/madschaaf/ai-dev-tools.git{'\n'}cd ai-dev-tools
          </code>
          <button type="button" onClick={() => handleCopy('cd ~/Documents\ngit clone https://github.com/madschaaf/ai-dev-tools.git\ncd ai-dev-tools', 'clone')} style={{ padding: '6px 12px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-blue-500)', background: copiedCommand === 'clone' ? 'var(--color-green-500)' : 'white', color: copiedCommand === 'clone' ? 'white' : 'var(--color-blue-500)', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {copiedCommand === 'clone' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>2. Create Your Branch</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>
            {username ? `git checkout -b practice-${username}` : 'git checkout -b practice-USERNAME'}
          </code>
          <button type="button" onClick={() => handleCopy(username ? `git checkout -b practice-${username}` : 'git checkout -b practice-USERNAME', 'branch')} style={{ padding: '6px 12px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-blue-500)', background: copiedCommand === 'branch' ? 'var(--color-green-500)' : 'white', color: copiedCommand === 'branch' ? 'white' : 'var(--color-blue-500)', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {copiedCommand === 'branch' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>3. Open in VS Code</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>code .</code>
          <button type="button" onClick={() => handleCopy('code .', 'open')} style={{ padding: '6px 12px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-blue-500)', background: copiedCommand === 'open' ? 'var(--color-green-500)' : 'white', color: copiedCommand === 'open' ? 'white' : 'var(--color-blue-500)', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {copiedCommand === 'open' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>4. Install Extensions</h3>
      <ol>
        <li>VS Code will show a popup to install recommended extensions</li>
        <li>Click "Install All" or "Show Recommendations"</li>
        <li>Wait for extensions to install</li>
        <li>Reload VS Code when prompted</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>5. Install Dependencies</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code>npm install</code>
          <button type="button" onClick={() => handleCopy('npm install', 'npm')} style={{ padding: '6px 12px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-blue-500)', background: copiedCommand === 'npm' ? 'var(--color-green-500)' : 'white', color: copiedCommand === 'npm' ? 'white' : 'var(--color-blue-500)', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {copiedCommand === 'npm' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>Included Extensions:</strong>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li>GitHub Copilot & Copilot Chat</li>
          <li>Python, Pylance, Debugger</li>
          <li>Azure tools & Database tools</li>
          <li>Prettier, Rainbow Brackets</li>
        </ul>
      </div>
    </>
  )
}
