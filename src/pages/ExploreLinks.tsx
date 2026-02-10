import { useState, useRef } from 'react'
import AIEssentials from './quickLinks/AIEssentials'
import GitHubPersonal from './quickLinks/GitHubPersonal'
import GitHubEnterprise from './quickLinks/GitHubEnterprise'
import Cline from './quickLinks/Cline'
import Cursor from './quickLinks/Cursor'
import Obsidian from './quickLinks/Obsidian'
import MCPServers from './quickLinks/MCPServers'
import Glean from './quickLinks/Glean'
import Codex from './quickLinks/Codex'
import ServiceNow from './quickLinks/ServiceNow'
import SlackChannels from './quickLinks/SlackChannels'
import Jira from './quickLinks/Jira'
import EBayCSS from './quickLinks/EBayCSS'
import MondayDotCom from './quickLinks/MondayDotCom'
import Airtable from './quickLinks/Airtable'
import SherlockIO from './quickLinks/SherlockIO'
import AIIntake from './quickLinks/AIIntake'
import AgentX from './quickLinks/AgentX'
import GlobalAIContext from './quickLinks/GlobalAIContext'
import AIToolsSheet from './quickLinks/AIToolsSheet'
import V0 from './quickLinks/V0'
import HubGPT from './quickLinks/HubGPT'
import GenericTool from './quickLinks/GenericTool'
import { aiToolsFromCSV } from '../data/aiToolsData'

// Manually curated tools with custom components
const manualQuickLinks = [
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
    name: 'Cursor',
    url: 'https://www.cursor.com/',
    accent: '#000000',
    description: 'AI-powered code editor (requires Secure Access)',
    category: 'AI & Development'
  },
  {
    name: 'Agent X',
    url: 'https://github.corp.ebay.com/CoreAI/agent-x/blob/main/README.md',
    accent: '#10b981',
    description: 'eBay\'s AI agent framework for automation',
    category: 'AI & Development'
  },
  {
    name: 'Global AI Context',
    url: 'https://github.corp.ebay.com/DevGenAI/global-ai-context',
    accent: '#f59e0b',
    description: 'Repository of AI workflows, automation templates, and context management',
    category: 'AI & Development'
  },
  {
    name: 'AI Tools Sheet',
    url: 'https://docs.google.com/spreadsheets/d/1HuvlTUHrDs2XU_kIVUJ5IkbM7UfE4dRJD48l_L2WLhs/edit?gid=0#gid=0',
    accent: '#10b981',
    description: 'Master spreadsheet of all AI tools available at eBay',
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
    name: 'Codex',
    url: 'https://codex.corp.ebay.com/',
    accent: 'var(--color-purple-500)',
    description: 'Code search and navigation tool',
    category: 'AI & Development'
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
  },
  {
    name: 'Vercel V0',
    url: 'https://v0.dev',
    accent: '#000000',
    description: 'AI-powered UI component generation with React and Tailwind',
    category: 'AI & Development'
  },
  {
    name: 'HubGPT',
    url: 'https://wiki.corp.ebay.com/pages/viewpage.action?spaceKey=innovation&title=HubGPT+Platform+Assistant+Onboarding+Process',
    accent: '#10a37f',
    description: 'eBay\'s secure ChatGPT Enterprise - AI assistance with eBay context',
    category: 'AI & Development'
  }
]

// Convert CSV tools to quickLinks format (ONLY from Tools.csv)
const csvQuickLinks = aiToolsFromCSV.map(tool => ({
  name: tool.name,
  url: tool.url,
  accent: tool.accent,
  description: tool.comments || `${tool.type} for eBay AI development`,
  category: tool.category
}))

// Combine manual and CSV tools only (no standalone info resources)
const quickLinks = [
  ...manualQuickLinks,
  ...csvQuickLinks.filter(csvTool =>
    !manualQuickLinks.some(manual => manual.name.toLowerCase() === csvTool.name.toLowerCase())
  )
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
  'Cursor': Cursor,
  'Agent X': AgentX,
  'Global AI Context': GlobalAIContext,
  'AI Tools Sheet': AIToolsSheet,
  'Obsidian': Obsidian,
  'MCP Servers': MCPServers,
  'Glean': Glean,
  'Codex': Codex,
  'ServiceNow': ServiceNow,
  'Slack Channels': () => <SlackChannels channels={slackChannels} />,
  'Jira': Jira,
  'eBay CSS Designs': EBayCSS,
  'Monday.com': MondayDotCom,
  'Airtable': Airtable,
  'Sherlock IO': SherlockIO,
  'AI Intake': AIIntake,
  'Vercel V0': V0,
  'HubGPT': HubGPT
}

export default function ExploreLinks() {
  // Show the first tool by default so the details panel is never empty
  const [selectedLink, setSelectedLink] = useState<string | null>(quickLinks[0]?.name ?? null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Types')
  const [sortBy, setSortBy] = useState<'name' | 'type'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchFields, setSearchFields] = useState({
    name: true,
    description: true,
    category: true,
    type: true,
    contacts: true,
    url: false
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    accent: 'var(--color-blue-500)',
    description: '',
    category: 'AI & Development'
  })

  // Used to scroll the user back to the top of the quick links section on selection
  const sectionRef = useRef<HTMLElement | null>(null)

  const activeLink = quickLinks.find((l) => l.name === selectedLink) ?? null

  // Enhanced keyword search function
  const searchInTool = (link: typeof quickLinks[0], keywords: string[]): boolean => {
    const csvTool = aiToolsFromCSV.find(t => t.name === link.name)
    
    // Build searchable content based on selected fields
    const searchableContent: string[] = []
    
    if (searchFields.name) searchableContent.push(link.name.toLowerCase())
    if (searchFields.description) searchableContent.push(link.description.toLowerCase())
    if (searchFields.category) searchableContent.push(link.category.toLowerCase())
    if (searchFields.type && csvTool?.type) searchableContent.push(csvTool.type.toLowerCase())
    if (searchFields.contacts && csvTool?.contacts) searchableContent.push(csvTool.contacts.toLowerCase())
    if (searchFields.url) searchableContent.push(link.url.toLowerCase())
    
    // Always include tags in search (if they exist)
    if (csvTool?.tags) {
      searchableContent.push(csvTool.tags.join(' ').toLowerCase())
    }
    
    const combinedContent = searchableContent.join(' ')
    
    // Check if ALL keywords are found (AND logic)
    return keywords.every(keyword => combinedContent.includes(keyword))
  }

  // Filter links based on search query and category filter
  let filteredLinks = quickLinks.filter(link => {
    // Split search query into keywords and filter empty strings
    const keywords = searchQuery.toLowerCase().trim().split(/\s+/).filter(k => k.length > 0)
    
    const matchesSearch = keywords.length === 0 || searchInTool(link, keywords)
    const matchesCategory = categoryFilter === 'All Types' || link.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Sort filtered links
  filteredLinks = [...filteredLinks].sort((a, b) => {
    let compareA = sortBy === 'name' ? a.name : a.category
    let compareB = sortBy === 'name' ? b.name : b.category

    if (sortOrder === 'asc') {
      return compareA.localeCompare(compareB)
    } else {
      return compareB.localeCompare(compareA)
    }
  })

  const handleSort = (column: 'name' | 'type') => {
    if (sortBy === column) {
      // Toggle sort order if same column
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new column and default to ascending
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  return (
    <>
      <div className="container">
      <section ref={sectionRef} className="quick-links-section hero">
        <div className="hero-overlay quick-links-layout-new">
          {/* Main content area - Left side */}
          <div className="tool-detail-main" style={{ width: sidebarCollapsed ? '100%' : '70%' }}>
            {activeLink ? (
              <article className="tool-detail-content">
                {/* Tool header with title and type */}
                <div className="tool-header">
                  <h1 className="tool-title">{activeLink.name}</h1>
                  <div className="tool-meta">
                    {(() => {
                      const csvTool = aiToolsFromCSV.find(t => t.name === activeLink.name)
                      const toolType = csvTool?.type || activeLink.category
                      const toolUrl = activeLink.url
                      const toolContacts = csvTool?.contacts || ''

                      return (
                        <>
                          {toolType && (
                            <span className="tool-type">Type: {toolType}</span>
                          )}
                          {toolUrl && (
                            <span className="tool-contact">
                              Link: <a href={toolUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-500)', textDecoration: 'underline' }}>{toolUrl}</a>
                            </span>
                          )}
                          {toolContacts && (() => {
                            // Extract first Slack channel if exists
                            const slackMatch = toolContacts.match(/Slack:\s*(#[^\s\n]+)/)
                            if (slackMatch) {
                              const channel = slackMatch[1]
                              return (
                                <span className="tool-contact">
                                  Contact: Slack: <a href={`https://ebay.enterprise.slack.com/archives/${channel.substring(1)}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4A154B', textDecoration: 'underline', fontWeight: 600 }}>{channel}</a>
                                </span>
                              )
                            }
                            // Extract first email if exists
                            const emailMatch = toolContacts.match(/Email:\s*([^\s\n]+)/)
                            if (emailMatch) {
                              const email = emailMatch[1]
                              return (
                                <span className="tool-contact">
                                  Contact: <a href={`mailto:${email}`} style={{ color: 'var(--color-blue-500)', textDecoration: 'underline' }}>{email}</a>
                                </span>
                              )
                            }
                            return null
                          })()}
                        </>
                      )
                    })()}
                  </div>
                </div>

                {/* Quick info section */}
                <div className="tool-quick-info">
                  <p>{activeLink.description}</p>
                </div>

                {/* Detailed content from component */}
                <div className="tool-detailed-content">
                  {(() => {
                    const Component = quickLinkComponents[activeLink.name]
                    if (Component) {
                      return <Component />
                    }

                    // Check if it's a CSV tool and use GenericTool
                    const csvTool = aiToolsFromCSV.find(t => t.name === activeLink.name)
                    if (csvTool) {
                      return <GenericTool tool={csvTool} />
                    }

                    // Fallback for tools with no component
                    return (
                      <>
                        <h3>How to get it?</h3>
                        <a className="button" href={activeLink.url} target="_blank" rel="noreferrer">
                          Open {activeLink.name}
                        </a>
                      </>
                    )
                  })()}
                </div>
              </article>
            ) : (
              <div className="tool-detail-placeholder">
                <h2>Select a tool</h2>
                <p className="muted small">Pick any tool on the right to see what it does and how to get it.</p>
              </div>
            )}
          </div>

          {/* Sidebar - Right side */}
          <aside className={`tools-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ marginTop: '120px' }}>
            <div className="sidebar-header">
              <button
                type="button"
                className="sidebar-toggle"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={sidebarCollapsed ? 'Click to explore tools' : 'Close tools panel'}
              >
                {sidebarCollapsed ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '1.5rem' }}>☰</span>
                    <span style={{ fontSize: '0.7rem', writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '2px' }}>
                      TOOLS
                    </span>
                  </div>
                ) : (
                  '✕'
                )}
              </button>
              {!sidebarCollapsed && (
                <>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="tool-search"
                      placeholder="Search by keywords (e.g., copilot code assistant)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ paddingRight: '80px' }}
                    />
                    {searchQuery && (
                      <div style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--color-neutral-500)',
                          fontWeight: '500'
                        }}>
                          {filteredLinks.length} {filteredLinks.length === 1 ? 'result' : 'results'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px',
                            cursor: 'pointer',
                            color: 'var(--color-neutral-500)',
                            fontSize: '1rem',
                            lineHeight: 1
                          }}
                          title="Clear search"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="sidebar-actions">
                    <button type="button" className="button-add-tool" onClick={() => setIsModalOpen(true)}>+ Add Tool</button>
                    <select
                      className="filter-select"
                      aria-label="Filter tools by type"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option>All Types</option>
                      <option>AI & Development</option>
                      <option>Learning</option>
                      <option>Knowledge Management</option>
                      <option>Work Management</option>
                      <option>Communication</option>
                      <option>Search</option>
                      <option>Support</option>
                      <option>Design</option>
                      <option>Observability</option>
                    </select>
                  </div>
                  
                  {/* Search Fields Filter */}
                  <details style={{ 
                    marginTop: '12px', 
                    padding: '8px 12px', 
                    backgroundColor: 'var(--color-neutral-50)', 
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                  }}>
                    <summary style={{ 
                      cursor: 'pointer', 
                      fontWeight: '500',
                      userSelect: 'none',
                      marginBottom: '8px'
                    }}>
                      🔍 Search Fields
                    </summary>
                    <div style={{ 
                      display: 'grid', 
                      gap: '6px',
                      paddingLeft: '4px'
                    }}>
                      {Object.entries(searchFields).map(([field, enabled]) => (
                        <label key={field} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => setSearchFields({ 
                              ...searchFields, 
                              [field]: e.target.checked 
                            })}
                            style={{ cursor: 'pointer' }}
                          />
                          <span style={{ 
                            textTransform: 'capitalize',
                            fontSize: '0.8125rem'
                          }}>
                            {field}
                          </span>
                        </label>
                      ))}
                    </div>
                  </details>
                </>
              )}
            </div>

            {!sidebarCollapsed && (
              <>
                {/* Search Tips - shown when searching */}
                {searchQuery && filteredLinks.length > 0 && (
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-blue-50)',
                    borderLeft: '3px solid var(--color-blue-500)',
                    fontSize: '0.8125rem',
                    marginBottom: '12px',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    <strong>💡 Tip:</strong> Use multiple keywords for precise results 
                    (e.g., "copilot code" finds tools matching both terms)
                  </div>
                )}
                
                {/* No Results Message */}
                {filteredLinks.length === 0 && (
                  <div style={{
                    padding: '24px 16px',
                    textAlign: 'center',
                    color: 'var(--color-neutral-500)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>No tools found</div>
                    <div style={{ fontSize: '0.875rem' }}>
                      Try different keywords or adjust your search fields
                    </div>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('')
                          setCategoryFilter('All Types')
                        }}
                        style={{
                          marginTop: '12px',
                          padding: '6px 12px',
                          backgroundColor: 'var(--color-blue-500)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )}
                
                {/* Tools Table */}
                {filteredLinks.length > 0 && (
                  <div className="tools-list-container">
                    <table className="tools-table">
                      <thead>
                        <tr>
                          <th
                            onClick={() => handleSort('name')}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            title="Click to sort by Tool Name"
                          >
                            Tool Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                          </th>
                          <th
                            onClick={() => handleSort('type')}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            title="Click to sort by Type"
                          >
                            Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLinks.map((link) => (
                          <tr
                            key={link.name}
                            className={selectedLink === link.name ? 'selected' : ''}
                            onClick={() => {
                              setSelectedLink(link.name)
                              sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }}
                          >
                            <td className="tool-name-cell">{link.name}</td>
                            <td className="tool-type-cell">{link.category}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="sidebar-footer">
                  <a 
                    href="https://docs.google.com/spreadsheets/d/1HuvlTUHrDs2XU_kIVUJ5IkbM7UfE4dRJD48l_L2WLhs/edit?gid=0#gid=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ai-tools-link"
                  >
                    📊 AI tools link
                  </a>
                </div>
              </>
            )}
          </aside>
          </div>
        </section>
      </div>

      {/* Add Tool Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-4)'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Add New Tool</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  color: 'var(--color-neutral-700)'
                }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                // For now, just show alert - can add localStorage later
                alert(`Tool "${formData.name}" would be added here. This feature can be extended to save to localStorage or a backend.`)
                setIsModalOpen(false)
                setFormData({
                  name: '',
                  url: '',
                  accent: 'var(--color-blue-500)',
                  description: '',
                  category: 'AI & Development'
                })
              }}
              style={{ display: 'grid', gap: 'var(--space-3)' }}
            >
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500' }}>
                  Tool Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #d0d7de',
                    fontSize: '14px'
                  }}
                  placeholder="e.g., Claude Code"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500' }}>
                  URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #d0d7de',
                    fontSize: '14px'
                  }}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500' }}>
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #d0d7de',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option>AI & Development</option>
                  <option>Learning</option>
                  <option>Knowledge Management</option>
                  <option>Work Management</option>
                  <option>Communication</option>
                  <option>Search</option>
                  <option>Support</option>
                  <option>Design</option>
                  <option>Observability</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500' }}>
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #d0d7de',
                    fontSize: '14px',
                    minHeight: '80px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                  placeholder="Brief description of the tool..."
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500' }}>
                  Accent Color
                </label>
                <select
                  value={formData.accent}
                  onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #d0d7de',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="var(--color-blue-500)">Blue</option>
                  <option value="var(--color-yellow-500)">Yellow</option>
                  <option value="var(--color-green-500)">Green</option>
                  <option value="var(--color-red-500)">Red</option>
                  <option value="var(--color-purple-500)">Purple</option>
                  <option value="var(--color-neutral-900)">Dark Gray</option>
                  <option value="#7c3aed">Violet</option>
                  <option value="#8b5cf6">Light Purple</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="button ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="button">
                  Save Tool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
