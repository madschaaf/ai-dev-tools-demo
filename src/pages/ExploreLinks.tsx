import { useState, useRef } from 'react'
import AIEssentials from './quickLinks/AIEssentials'
import GitHubPersonal from './quickLinks/GitHubPersonal'
import GitHubEnterprise from './quickLinks/GitHubEnterprise'
import Cline from './quickLinks/Cline'
import Obsidian from './quickLinks/Obsidian'
import MCPServers from './quickLinks/MCPServers'
import Glean from './quickLinks/Glean'
import ServiceNow from './quickLinks/ServiceNow'
import SlackChannels from './quickLinks/SlackChannels'
import Jira from './quickLinks/Jira'
import EBayCSS from './quickLinks/EBayCSS'
import MondayDotCom from './quickLinks/MondayDotCom'
import Airtable from './quickLinks/Airtable'
import SherlockIO from './quickLinks/SherlockIO'
import AIIntake from './quickLinks/AIIntake'
const quickLinks = [
  { 
    name: 'AI Essentials', 
    url: 'https://sites.google.com/ebay.com/ai-essentials-training/ai-essentials-overview', 
    accent: 'var(--color-yellow-500)', 
    description: 'AI training and resources', 
    category: 'Learning'
  },
  { 
    name: 'GitHub Personal', 
    url: 'https://github.com', 
    accent: 'var(--color-neutral-900)', 
    description: 'Public GitHub repositories', 
    category: 'AI & Development'
  },
  { 
    name: 'GitHub Enterprise', 
    url: 'https://github.corp.ebay.com/', 
    accent: 'var(--color-neutral-900)', 
    description: 'Internal eBay repositories', 
    category: 'AI & Development'
  },
  { 
    name: 'Cline (eBay)', 
    url: 'https://github.corp.ebay.com/DevGenAI/cline/releases', 
    accent: '#7c3aed', 
    description: 'Install eBay\'s customized Cline agent', 
    category: 'AI & Development'
  },
  { 
    name: 'Obsidian', 
    url: 'https://pages.github.corp.ebay.com/obsidian/docs/', 
    accent: '#8b5cf6', 
    description: 'Knowledge management and notes', 
    category: 'Knowledge Management'
  },
  { 
    name: 'MCP Servers', 
    url: 'https://pages.github.corp.ebay.com/DevGenAI/ebay-mcp/', 
    accent: 'var(--color-yellow-500)', 
    description: 'eBay MCP server documentation', 
    category: 'AI & Development'
  },
  { 
    name: 'Glean', 
    url: 'https://app.glean.com/', 
    accent: 'var(--color-blue-500)', 
    description: 'Enterprise search across all tools', 
    category: 'Search'
  },
  { 
    name: 'ServiceNow', 
    url: 'https://ebayinc.service-now.com/esc', 
    accent: 'var(--color-blue-500)', 
    description: 'IT service management portal', 
    category: 'Support'
  },
  { 
    name: 'Slack Channels', 
    url: 'https://ebay.enterprise.slack.com/', 
    accent: '#4A154B', 
    description: 'Join key Slack channels', 
    category: 'Communication'
  },
  { 
    name: 'Jira', 
    url: 'https://jira.ebay.com', 
    accent: 'var(--color-blue-500)', 
    description: 'Issue tracking and agile planning', 
    category: 'Work Management'
  },
  { 
    name: 'eBay CSS Designs', 
    url: 'https://playbook.ebay.com/get-started', 
    accent: 'var(--color-green-500)', 
    description: 'Design system and components', 
    category: 'Design'
  },
  { 
    name: 'Monday.com', 
    url: 'https://ebay.monday.com/', 
    accent: 'var(--color-red-500)', 
    description: 'Project and task management', 
    category: 'Work Management'
  },
  { 
    name: 'Airtable', 
    url: 'https://airtable.com', 
    accent: 'var(--color-green-500)', 
    description: 'Flexible databases and project coordination', 
    category: 'Work Management'
  },
  { 
    name: 'Sherlock IO', 
    url: 'https://sherlock.io', 
    accent: 'var(--color-red-500)', 
    description: 'Observability and incident analysis', 
    category: 'Observability'
  },
  { 
    name: 'AI Intake', 
    url: 'https://ebayinc.service-now.com/aiintake', 
    accent: 'var(--color-yellow-500)', 
    description: 'Submit AI project requests', 
    category: 'Support'
  }
]

const slackChannels = [
  {
    name: '#ai-dev-tools',
    purpose: 'AI tooling chat and tips.',
    joinUrl: 'https://ebay.enterprise.slack.com/archives/C07JY6AHHMJ'
  },
  { name: '#mcp-servers', purpose: 'MCP server setup Q&A.', joinUrl: 'slack://open' },
  { name: '#copilot-help', purpose: 'Copilot usage, prompts, and fixes.', joinUrl: 'slack://open' },
  { name: '#observability', purpose: 'Sherlock IO and incident workflows.', joinUrl: 'slack://open' },
  { name: '#data-eng', purpose: 'SQL, pipelines, and integrations.', joinUrl: 'slack://open' }
]

// Component mapper for quick links
const quickLinkComponents: Record<string, React.ComponentType<any>> = {
  'AI Essentials': AIEssentials,
  'GitHub Personal': GitHubPersonal,
  'GitHub Enterprise': GitHubEnterprise, 
  'Cline (eBay)': Cline,
  'Obsidian': Obsidian,
  'MCP Servers': MCPServers,
  'Glean': Glean,
  'ServiceNow': ServiceNow,
  'Slack Channels': () => <SlackChannels channels={slackChannels} />,
  'Jira': Jira,
  'eBay CSS Designs': EBayCSS,
  'Monday.com': MondayDotCom,
  'Airtable': Airtable,
  'Sherlock IO': SherlockIO,
  'AI Intake': AIIntake
}

// Group quick links by category so the left side reads more like a menu
const quickLinksByCategory = quickLinks.reduce<Record<string, typeof quickLinks>>((acc, link) => {
  if (!acc[link.category]) acc[link.category] = []
  acc[link.category].push(link)
  return acc
}, {})

export default function ExploreLinks() {
  // Show the first tool by default so the details panel is never empty
  const [selectedLink, setSelectedLink] = useState<string | null>(quickLinks[0]?.name ?? null)

  // Used to scroll the user back to the top of the quick links section on selection
  const sectionRef = useRef<HTMLElement | null>(null)

  const activeLink = quickLinks.find((l) => l.name === selectedLink) ?? null

  return (
    <>
      <div className="container">
      <section ref={sectionRef} className="quick-links-section hero">
        <div className="hero-overlay quick-links-layout">
          <div className="quick-links-column">
            <h2>Quick Links</h2>
            <p className="muted">Browse by tool. Click a row to see details on the right.</p>
              <div className="quick-links-list">
                {Object.entries(quickLinksByCategory).map(([category, links]) => (
                  <section key={category} className="quick-links-group">
                    <h3 className="quick-links-group-title">{category}</h3>
                    <ul className="quick-links-items">
                      {links.map((link) => (
                        <li key={link.name}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedLink(link.name)
                              sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }}
                            className={`quick-link-row ${selectedLink === link.name ? 'active' : ''}`}
                            data-accent={link.accent}
                          >
                            <span className="quick-link-row-main">
                              <span className="quick-link-name">{link.name}</span>
                              <span className="quick-link-desc">{link.description}</span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>

            <aside className="link-detail-panel">
              {activeLink ? (
                <article className="page link-detail">
                  {(() => {
                    const Component = quickLinkComponents[activeLink.name]
                    if (Component) {
                      return <Component />
                    }

                    // Fallback (shouldn't happen if component mapper is complete)
                    return (
                      <>
                        <h2>{activeLink.name}</h2>
                        <a className="button" href={activeLink.url} target="_blank" rel="noreferrer">
                          Open {activeLink.name}
                        </a>
                      </>
                    )
                  })()}
                </article>
              ) : (
                <div className="link-detail placeholder">
                  <h2>Select a tool</h2>
                  <p className="muted small">Pick any card on the left to see what it does and how to open it.</p>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
    </>
  )
}
