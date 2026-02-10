export default function JoinSlackChannels() {
  return (
    <>
      <h2>Join Slack Channels</h2>
      <p>Connect with eBay's AI and development communities on Slack.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Why Join Slack Channels?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Get help, share knowledge, and stay updated on AI tools, best practices, and announcements.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Recommended Channels</h3>
      
      <h4 style={{ marginTop: 'var(--space-3)' }}>AI & Development:</h4>
      <ul>
        <li><strong>#ai-tools</strong> - General AI tools discussion</li>
        <li><strong>#github-copilot</strong> - GitHub Copilot support</li>
        <li><strong>#cline-chat</strong> - Cline AI assistant</li>
        <li><strong>#dev-tools</strong> - Developer tools and tips</li>
      </ul>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Support & Help:</h4>
      <ul>
        <li><strong>#it-support</strong> - IT and technical support</li>
        <li><strong>#new-hire-tech</strong> - New hire technical questions</li>
        <li><strong>#engineering</strong> - Engineering discussions</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>How to Join</h3>
      <ol>
        <li>Open Slack (desktop or web app)</li>
        <li>Click "+" next to Channels in the sidebar</li>
        <li>Search for the channel name</li>
        <li>Click "Join Channel"</li>
      </ol>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Pro Tip:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Don't hesitate to ask questions! The community is here to help.
        </p>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://ebay.slack.com" target="_blank" rel="noopener noreferrer">
          Open eBay Slack
        </a>
      </div>
    </>
  )
}
