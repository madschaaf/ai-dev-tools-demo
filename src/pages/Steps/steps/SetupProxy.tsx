import { useState, useEffect } from 'react'

export default function SetupProxy() {
  const [userOS, setUserOS] = useState<'Windows' | 'Mac' | 'Unknown'>('Unknown')
  const [setupComplete, setSetupComplete] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Win')) {
      setUserOS('Windows')
    } else if (userAgent.includes('Mac')) {
      setUserOS('Mac')
    }
  }, [])

  return (
    <>
      <h2>Step 2: Setup Proxy</h2>
      <p>Configure eBay's proxy settings to access internal tools and download software. This is required before installing development tools.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Detected OS: {userOS}</strong>
        <p style={{ margin: '8px 0 0' }}>Follow the {userOS} instructions below</p>
      </div>

      {userOS === 'Mac' && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>macOS: Automatic Configuration (Recommended)</h3>
          <ol>
            <li>Open the <strong>Self Service</strong> app on your Mac</li>
            <li>Search for "Site Proxy Configuration"</li>
            <li>Run the tool to auto-configure the proxy</li>
            <li><strong>Restart your Mac</strong> for changes to apply</li>
          </ol>

          <h3 style={{ marginTop: 'var(--space-4)' }}>macOS: Manual Configuration</h3>

          <h4>Ventura or later:</h4>
          <ol>
            <li>System Settings → Network → Wi‑Fi → Details → Proxies</li>
            <li>Turn on "Automatic Proxy Configuration"</li>
            <li>Paste this URL: <code>https://c2sproxy.vip.ebay.com/wpad.dat</code></li>
            <li>Click Done/Save and restart your Mac</li>
          </ol>

          <h4>Monterey:</h4>
          <ol>
            <li>System Preferences → Network → select Wi‑Fi/Ethernet → Advanced → Proxies</li>
            <li>Check "Automatic Proxy Configuration"</li>
            <li>Paste this URL: <code>https://c2sproxy.vip.ebay.com/wpad.dat</code></li>
            <li>Click OK, then Apply, and restart your Mac</li>
          </ol>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Terminal Proxy Setup (for CLI tools)</h3>
          <p>Add this helper function to your <code>~/.zshrc</code> file:</p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)', overflowX: 'auto' }}>
            <pre style={{ margin: 0, fontSize: '0.85rem' }}>{`# C2S Proxy Helper
c2sproxy() {
  if [ "$1" = "on" ]; then
    read -p "Username: " username
    read -sp "PIN+Yubi: " pinyubi
    echo
    export HTTP_PROXY="http://$username:$pinyubi@c2sproxy.vip.ebay.com:8080/"
    export HTTPS_PROXY="http://$username:$pinyubi@c2sproxy.vip.ebay.com:8080/"
    export NO_PROXY="localhost,127.0.0.1,.corp.ebay.com"
    echo "Proxy enabled"
  elif [ "$1" = "off" ]; then
    unset HTTP_PROXY HTTPS_PROXY NO_PROXY
    echo "Proxy disabled"
  fi
}`}</pre>
          </div>

          <p style={{ marginTop: 'var(--space-2)' }}>Then reload your shell:</p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <code>source ~/.zshrc</code>
          </div>

          <p style={{ marginTop: 'var(--space-2)' }}>Usage:</p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <code style={{ display: 'block' }}>c2sproxy on   # Turn proxy on</code>
            <code style={{ display: 'block', marginTop: '8px' }}>c2sproxy off  # Turn proxy off</code>
          </div>
        </>
      )}

      {userOS === 'Windows' && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>Windows: Automatic Configuration (Recommended)</h3>
          <ol>
            <li>Open <strong>Software Center</strong></li>
            <li>Search for and run "Site Proxy Configuration"</li>
            <li><strong>Restart Windows</strong> for changes to apply</li>
          </ol>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Windows: Manual Configuration</h3>
          <ol>
            <li>Settings → Network & Internet → Proxy</li>
            <li>Turn ON "Use setup script"</li>
            <li>Script address: <code>https://c2sproxy.vip.ebay.com/wpad.dat</code></li>
            <li>Click Save and restart Windows</li>
          </ol>

          <h3 style={{ marginTop: 'var(--space-4)' }}>PowerShell Proxy Setup (for CLI tools)</h3>
          <p>Create or edit your PowerShell profile at:</p>
          <p><code>C:\Users\&lt;you&gt;\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1</code></p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)', overflowX: 'auto' }}>
            <pre style={{ margin: 0, fontSize: '0.85rem' }}>{`Write-Host "Username: $env:USERNAME"
$pinYubi = Read-Host -AsSecureString "Enter PIN + Yubi code"
$pinYubiPlain = (New-Object System.Net.NetworkCredential("", $pinYubi)).Password

$env:HTTP_PROXY  = "http://$($env:USERNAME):$pinYubiPlain@c2sproxy.vip.ebay.com:8080/"
$env:HTTPS_PROXY = "http://$($env:USERNAME):$pinYubiPlain@c2sproxy.vip.ebay.com:8080/"
$env:NO_PROXY    = "localhost,127.0.0.1,.corp.ebay.com"

Write-Host "C2S proxy enabled for this PowerShell session."`}</pre>
          </div>
        </>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Proxy Setup</h3>
      <ol>
        <li>Try accessing an internal VIP site (Hub or Wiki)</li>
        <li>If prompted, use your corp username + PIN+Yubi</li>
        <li>Confirm pages load successfully</li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={setupComplete}
            onChange={(e) => setSetupComplete(e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: setupComplete ? 600 : 400 }}>
            I've configured the proxy and verified access
          </span>
        </label>
      </div>

      {setupComplete && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>Proxy configured!</strong>
          <p style={{ margin: '8px 0 0' }}>
            You can now proceed to Step 3 to install VS Code
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <ul>
        <li><strong>Save/Apply disabled:</strong> Use the "Site Proxy Configuration" tool in Self Service/Software Center first</li>
        <li><strong>Still blocked:</strong> Request Local Admin Rights via Self Service and retry</li>
        <li><strong>WPAD URL doesn't work:</strong> Try the alternate URL: <code>https://c2syubi.vip.ebay.com/wpadyubi.pac</code></li>
        <li><strong>Always restart</strong> after applying proxy changes so browsers and apps pick up the new settings</li>
      </ul>
    </>
  )
}
