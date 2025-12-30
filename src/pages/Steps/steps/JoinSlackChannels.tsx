export default function JoinSlackChannels() {
  const channels = [
    {
      name: '#ai-ebay',
      purpose: 'Main AI discussion and announcements',
      url: 'https://ebay.enterprise.slack.com/archives/C0985LNF5EX',
      category: 'Official AI Channels'
    },
    {
      name: '#ai-intake',
      purpose: 'AI project intake and requests',
      url: 'https://ebay.enterprise.slack.com/archives/C075QRMCATX',
      category: 'Official AI Channels'
    },
    {
      name: '#ai-news-and-insights',
      purpose: 'Latest AI news and insights',
      url: 'https://ebay.enterprise.slack.com/archives/C05BQURSMBR',
      category: 'Official AI Channels'
    },
    {
      name: '#legal-ai-questions',
      purpose: 'Legal and compliance questions about AI',
      url: 'https://ebay.enterprise.slack.com/archives/C05ALRE5602',
      category: 'Official AI Channels'
    },
    {
      name: '#model-context-protocol',
      purpose: 'MCP server setup and discussion',
      url: 'https://ebay.enterprise.slack.com/archives/C08KQ4PEDQA',
      category: 'Official AI Channels'
    },
    {
      name: '#obsidian-ai-community',
      purpose: 'Obsidian workflow app community',
      url: 'https://ebay.enterprise.slack.com/archives/C095H45SF6D',
      category: 'Official AI Channels'
    },
    {
      name: '#community-ebay-cline',
      purpose: 'eBay Cline extension support and tips',
      url: 'https://ebay.enterprise.slack.com/archives/C0815Q7LAPR',
      category: 'Community Channels'
    },
    {
      name: '#community-github',
      purpose: 'GitHub tips and collaboration',
      url: 'https://ebay.enterprise.slack.com/archives/C5RJ0G5KJ',
      category: 'Community Channels'
    },
    {
      name: '#community-chatgpt',
      purpose: 'ChatGPT usage and best practices',
      url: 'https://ebay.enterprise.slack.com/archives/C07JY6AHHMJ',
      category: 'Community Channels'
    },
    {
      name: '#community-copilot',
      purpose: 'GitHub Copilot tips and troubleshooting',
      url: 'https://ebay.enterprise.slack.com/archives/C057KTYH75F',
      category: 'Community Channels'
    },
    {
      name: '#community-glean',
      purpose: 'Glean search tips and support',
      url: 'https://ebay.enterprise.slack.com/archives/C06B1PKR1RN',
      category: 'Community Channels'
    },
    {
      name: '#community-google-workspace',
      purpose: 'Google Workspace and Gemini support',
      url: 'https://ebay.enterprise.slack.com/archives/CSW4M9A06',
      category: 'Community Channels'
    },
    {
      name: '#community-hubgpt',
      purpose: 'HubGPT community and discussions',
      url: 'https://ebay.enterprise.slack.com/archives/C05RY7Z9EF7',
      category: 'Community Channels'
    },
    {
      name: '#community-claude-code',
      purpose: 'Claude Code CLI support and tips',
      url: 'https://ebay.enterprise.slack.com/archives/C091GR9GNTV',
      category: 'Community Channels'
    }
  ]

  return (
    <>
      <h2>Step 15: Join Slack Channels</h2>
      <p>Join key Slack channels to connect with other developers, get support, and stay updated on tools and best practices.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Prerequisites:</strong> Make sure your "Slack End User" access request from Step 6 has been approved.
      </div>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="button"
          onClick={() => {
            channels.forEach((channel, index) => {
              setTimeout(() => {
                window.open(channel.url, '_blank')
              }, index * 100)
            })
          }}
          style={{
            background: 'var(--color-green-500)',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          Join All Channels ({channels.length})
        </button>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Opens all {channels.length} channels in new tabs
        </div>
      </div>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Note:</strong> Your browser may block multiple tabs from opening. If this happens, allow pop-ups from this site or join channels individually below.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Recommended Channels</h3>

      {['Official AI Channels', 'Community Channels'].map((category) => (
        <div key={category} style={{ marginTop: 'var(--space-4)' }}>
          <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--color-neutral-700)', fontSize: '1.1rem' }}>
            {category}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {channels.filter(ch => ch.category === category).map((channel) => (
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
        </div>
      ))}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Use AI to Help You Navigate Slack</h3>
      <p>eBay has AI tools built into Slack to help you find information and stay updated:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)', marginBottom: '8px' }}>HubGPT - Search Across eBay</h4>
          <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
            HubGPT can search across all eBay channels, docs, and resources to find information quickly.
          </p>
          <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-blue-500)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', color: 'var(--color-neutral-700)' }}>
              Example prompt to HubGPT:
            </div>
            <code style={{ fontSize: '0.9rem', color: 'var(--color-neutral-900)' }}>
              "Summarize the recent news from #ai-news-and-insights"
            </code>
          </div>
          <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-blue-500)', marginTop: 'var(--space-2)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', color: 'var(--color-neutral-700)' }}>
              Another example:
            </div>
            <code style={{ fontSize: '0.9rem', color: 'var(--color-neutral-900)' }}>
              "What are people saying about Claude Code in #community-claude-code?"
            </code>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            <strong>How to use:</strong> Message @HubGPT in Slack or visit #community-hubgpt
          </p>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)', marginBottom: '8px' }}>Slackbox - Slack Questions</h4>
          <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
            Use Slackbox for questions about how to use Slack features and settings.
          </p>
          <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-blue-500)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', color: 'var(--color-neutral-700)' }}>
              Example prompt to Slackbox:
            </div>
            <code style={{ fontSize: '0.9rem', color: 'var(--color-neutral-900)' }}>
              "How do I set up custom notifications for specific channels?"
            </code>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            <strong>How to use:</strong> Message @Slackbox in Slack for help with Slack features
          </p>
        </div>
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
