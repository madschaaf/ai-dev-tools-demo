import { useState } from 'react'

export default function VerifySecurity() {
  const [verifiedItems, setVerifiedItems] = useState({
    sso: false,
    pingid: false,
    yubikey: false
  })

  const handleVerify = (item: 'sso' | 'pingid' | 'yubikey') => {
    setVerifiedItems(prev => ({ ...prev, [item]: !prev[item] }))
  }

  const allVerified = verifiedItems.sso && verifiedItems.pingid && verifiedItems.yubikey

  return (
    <>
      <h2>Step 1: Verify Security Setup</h2>
      <p>Before you can download and access eBay tools, you need to confirm your security credentials are working properly.</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Important:</strong> These security tools are required for accessing internal eBay systems and downloading software.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>✓ Verify SSO (Single Sign-On)</h3>
      <p>SSO allows you to sign into eBay systems with your corporate credentials.</p>

      <ol>
        <li>
          <strong>Test Token Access Portal:</strong> Sign in to{' '}
          <a href="https://tokenaccess.corp.ebay.com/" target="_blank" rel="noopener noreferrer">
            Token Access Portal (TAP)
          </a>{' '}
          with your corp credentials
        </li>
        <li>If you can open "My Account" and view your tokens, SSO is working</li>
        <li>
          <strong>Additional check:</strong> Sign in to Hub Services (IT support portal) using your corp SSO
        </li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={verifiedItems.sso}
            onChange={() => handleVerify('sso')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: verifiedItems.sso ? 600 : 400 }}>
            I've verified SSO is working
          </span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>✓ Verify PingID</h3>
      <p>PingID provides multi-factor authentication (MFA) for added security.</p>

      <ol>
        <li>In TAP, open PingID and check "My Account" to see your registered devices</li>
        <li>Confirm which device is set as "Primary"</li>
        <li>Trigger a PingID challenge by signing into any app that requires MFA (email, VPN, or TAP)</li>
        <li>Approve the push notification in the PingID app</li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={verifiedItems.pingid}
            onChange={() => handleVerify('pingid')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: verifiedItems.pingid ? 600 : 400 }}>
            I've verified PingID is working
          </span>
        </label>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>✓ Verify YubiKey</h3>
      <p>YubiKey provides hardware-based authentication for secure access.</p>

      <ol>
        <li>
          Connect to the corporate network or VPN
        </li>
        <li>
          Go to{' '}
          <a href="https://auth.vip.ebay.com/" target="_blank" rel="noopener noreferrer">
            auth.vip.ebay.com
          </a>
        </li>
        <li>Use the "Validate" or test function</li>
        <li>Enter your YubiKey PIN and press the key</li>
        <li>Successful validation confirms your key is registered</li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={verifiedItems.yubikey}
            onChange={() => handleVerify('yubikey')}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: verifiedItems.yubikey ? 600 : 400 }}>
            I've verified YubiKey is working
          </span>
        </label>
      </div>

      {allVerified && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
          <strong>Great! All security tools verified.</strong>
          <p style={{ margin: '8px 0 0' }}>
            You're ready to proceed to Step 2: Setup Proxy
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Common Issues</h3>
      <ul>
        <li><strong>New hires:</strong> You may need to register your YubiKey first and set it as Primary before completing PingID pairing</li>
        <li><strong>Device management:</strong> Manage all PingID devices and Primary settings directly in TAP</li>
        <li><strong>YubiKey not validating:</strong> Ensure you're on the corporate network/VPN and that your PIN meets requirements</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button ghost"
          href="https://tokenaccess.corp.ebay.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Token Access Portal
        </a>
        <a
          className="button ghost"
          href="https://auth.vip.ebay.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Test YubiKey
        </a>
      </div>
    </>
  )
}
