import type { AITool } from '../../data/aiToolsData'
import { infoResourcesFromCSV, mcpResourcesFromCSV, contextEngineeringResourcesFromCSV, outsideLinksFromCSV } from '../../data/aiToolsData'

interface GenericToolProps {
  tool: AITool
}

export default function GenericTool({ tool }: GenericToolProps) {
  // Find related info resources and MCP resources for this tool
  const relatedInfoResources = infoResourcesFromCSV.filter(info =>
    info.description.toLowerCase().includes(tool.name.toLowerCase()) ||
    info.name.toLowerCase().includes(tool.name.toLowerCase())
  )

  const relatedMCPResources = mcpResourcesFromCSV.filter(mcp =>
    mcp.description.toLowerCase().includes(tool.name.toLowerCase()) ||
    mcp.name.toLowerCase().includes(tool.name.toLowerCase())
  )

  const relatedContextResources = contextEngineeringResourcesFromCSV.filter(context =>
    context.description.toLowerCase().includes(tool.name.toLowerCase()) ||
    context.name.toLowerCase().includes(tool.name.toLowerCase())
  )

  const relatedOutsideLinks = outsideLinksFromCSV.filter(link =>
    link.description.toLowerCase().includes(tool.name.toLowerCase()) ||
    link.name.toLowerCase().includes(tool.name.toLowerCase()) ||
    // Special matching for MCP-related tools
    (tool.name.toLowerCase().includes('mcp') && link.description.toLowerCase().includes('mcp')) ||
    (tool.name.toLowerCase().includes('cline') && link.description.toLowerCase().includes('claude')) ||
    (tool.name.toLowerCase().includes('claude') && link.description.toLowerCase().includes('claude'))
  )

  // Parse contacts to separate Slack channels and emails
  const contacts = tool.contacts.split('\n').filter(c => c.trim())
  const slackChannels = contacts.filter(c => c.toLowerCase().includes('slack:'))
  const emails = contacts.filter(c => c.toLowerCase().includes('email:'))
  const otherContacts = contacts.filter(c => !c.toLowerCase().includes('slack:') && !c.toLowerCase().includes('email:'))

  return (
    <>
      {/* The title and metadata (Type, Link, Contact) are already shown by ExploreLinks.tsx */}
      {/* We only need to show the detailed sections */}

      {/* What It Is - Only show if we don't have detailed comments, use generic description */}
      {!tool.comments && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>What It Is</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginTop: 'var(--space-2)' }}>
            {tool.type === 'Platform' && 'Platform tool for AI and ML development at eBay.'}
            {tool.type === 'Coding Assistant' && 'AI-powered coding assistant to enhance developer productivity.'}
            {tool.type === 'Assistant Platform' && 'Platform for building and deploying AI assistants.'}
            {tool.type === 'Application' && 'AI-powered application for eBay workflows.'}
            {tool.type === 'Enterprise Search' && 'Enterprise search platform with AI capabilities.'}
            {tool.type === 'Code Repository' && 'Repository for AI code, workflows, and templates.'}
            {tool.type === 'Security & Monitoring' && 'Security and monitoring tools for AI deployments.'}
          </p>
        </>
      )}

      {/* How to Access / Installation - Move before Support section for better flow */}
      <h3 style={{ marginTop: 'var(--space-4)' }}>How to Access</h3>
      <p style={{ marginBottom: 'var(--space-2)', fontSize: '0.95rem' }}>
        Click the button below to access {tool.name}:
      </p>
      <div style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <a
          className="button"
          href={tool.url || '#'}
          target="_blank"
          rel="noreferrer"
          style={!tool.url ? { opacity: 0.5, pointerEvents: 'none' } : {}}
        >
          {tool.url ? `Open ${tool.name}` : 'URL Not Available'}
        </a>
      </div>

      {(slackChannels.length > 0 || emails.length > 0 || otherContacts.length > 0) && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>Get Support & Connect</h3>

          {slackChannels.length > 0 && (
            <div style={{ marginTop: 'var(--space-3)' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-2)', color: '#4A154B' }}>Slack Channels</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {slackChannels.map((channel, idx) => {
                  const channelName = channel.replace(/^Slack:\s*/i, '').trim()
                  return (
                    <div key={idx} style={{
                      background: '#F4EDE4',
                      padding: 'var(--space-2)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '4px solid #4A154B'
                    }}>
                      <code style={{ fontSize: '0.9rem', fontWeight: 600 }}>{channelName}</code>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {emails.length > 0 && (
            <div style={{ marginTop: 'var(--space-3)' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-2)', color: 'var(--color-blue-500)' }}>Email Contacts</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {emails.map((email, idx) => {
                  const emailAddress = email.replace(/^Email:\s*/i, '').trim()
                  return (
                    <div key={idx} style={{
                      background: '#e8f4ff',
                      padding: 'var(--space-2)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '4px solid var(--color-blue-500)'
                    }}>
                      <a href={`mailto:${emailAddress}`} style={{ fontSize: '0.9rem', color: 'var(--color-blue-500)', textDecoration: 'none' }}>
                        {emailAddress}
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {otherContacts.length > 0 && (
            <div style={{ marginTop: 'var(--space-3)' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-2)' }}>Other Contacts</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {otherContacts.map((contact, idx) => (
                  <div key={idx} style={{
                    background: '#f6f8fa',
                    padding: 'var(--space-2)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem'
                  }}>
                    {contact}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Related Resources Section */}
      {(relatedInfoResources.length > 0 || relatedMCPResources.length > 0 || relatedContextResources.length > 0 || relatedOutsideLinks.length > 0) && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>Additional Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
            {relatedInfoResources.map((info, idx) => (
              <div key={`info-${idx}`} style={{
                border: '1px solid #e1e4e8',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                background: '#f6f8fa'
              }}>
                <div style={{ fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '0.95rem' }}>
                  {info.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
                  {info.description}
                </div>
                <a
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button ghost"
                  style={{ fontSize: '0.85rem', padding: '6px 12px' }}
                >
                  View Resource
                </a>
              </div>
            ))}
            {relatedMCPResources.map((mcp, idx) => (
              <div key={`mcp-${idx}`} style={{
                border: '1px solid #e1e4e8',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                background: '#f0f0ff'
              }}>
                <div style={{ fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '0.95rem' }}>
                  {mcp.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
                  {mcp.description}
                </div>
                <a
                  href={mcp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button ghost"
                  style={{ fontSize: '0.85rem', padding: '6px 12px' }}
                >
                  View MCP Resource
                </a>
              </div>
            ))}
            {relatedContextResources.map((context, idx) => (
              <div key={`context-${idx}`} style={{
                border: '1px solid #e1e4e8',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                background: '#fff8e6'
              }}>
                <div style={{ fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '0.95rem' }}>
                  {context.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
                  {context.description}
                </div>
                <a
                  href={context.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button ghost"
                  style={{ fontSize: '0.85rem', padding: '6px 12px' }}
                >
                  View Context Engineering Guide
                </a>
              </div>
            ))}
            {relatedOutsideLinks.map((link, idx) => (
              <div key={`outside-${idx}`} style={{
                border: '1px solid #e1e4e8',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                background: '#e6f7ff'
              }}>
                <div style={{ fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '0.95rem' }}>
                  {link.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
                  {link.description}
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button ghost"
                  style={{ fontSize: '0.85rem', padding: '6px 12px' }}
                >
                  View External Resource
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
