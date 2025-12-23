export default function JoinSlackChannels() {
  const channels = [
    {
      name: '#ai-dev-tools',
      purpose: 'AI tooling chat and tips',
      url: 'https://ebay.enterprise.slack.com/archives/C07JY6AHHMJ'
    },
    {
      name: '#community-claude-code',
      purpose: 'Claude Code updates and troubleshooting',
      url: 'https://ebay.enterprise.slack.com/'
    },
    {
      name: '#mcp-servers',
      purpose: 'MCP server setup Q&A',
      url: 'https://ebay.enterprise.slack.com/'
    },
    {
      name: '#copilot-help',
      purpose: 'GitHub Copilot usage, prompts, and fixes',
      url: 'https://ebay.enterprise.slack.com/'
    },
    {
      name: '#observability',
      purpose: 'Sherlock IO and incident workflows',
      url: 'https://ebay.enterprise.slack.com/'
    },
    {
      name: '#data-eng',
      purpose: 'SQL, pipelines, and integrations',
      url: 'https://ebay.enterprise.slack.com/'
    }
  ]

  return (
    <>
      <h2>Step 15: Join Slack Channels</h2>
      <p>Join key Slack channels to connect with other developers, get support, and stay updated on tools and best practices.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Prerequisites:</strong> Make sure your "Slack End User" access request from Step 6 has been approved.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Recommended Channels</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        {channels.map((channel) => (
          <div
            key={channel.name}
            style={{
              border: '1px solid #e1e4e8',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3)',
              background: 'var(--color-neutral-100)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>
                  {channel.name}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
                  {channel.purpose}
                </div>
              </div>
              <a
                className="button ghost"
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ whiteSpace: 'nowrap' }}
              >
                Join Channel
              </a>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Why Join These Channels?</h3>
      <ul>
        <li><strong>Get Help:</strong> Ask questions and get answers from experienced developers</li>
        <li><strong>Stay Updated:</strong> Learn about new tools, features, and best practices</li>
        <li><strong>Share Knowledge:</strong> Contribute your own tips and solutions</li>
        <li><strong>Network:</strong> Connect with other engineers across eBay</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Slack Tips</h3>
      <ul>
        <li><strong>Use threads:</strong> Keep conversations organized by replying in threads</li>
        <li><strong>Search first:</strong> Many common questions have already been answered</li>
        <li><strong>Be specific:</strong> When asking for help, include error messages and context</li>
        <li><strong>Share solutions:</strong> If you solve a problem, share it to help others</li>
      </ul>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>Congratulations!</strong>
        <p style={{ margin: '8px 0 0' }}>
          You've completed all the setup steps! Your development environment is now fully configured for working at eBay.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>Now that you're all set up, you can:</p>
      <ul>
        <li>Start working on your first project</li>
        <li>Explore the AI tools and extensions you've installed</li>
        <li>Connect with your team and ask for onboarding guidance</li>
        <li>Check out internal documentation and training resources</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <a
          className="button"
          href="https://ebay.enterprise.slack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Slack Workspace
        </a>
      </div>
    </>
  )
}
