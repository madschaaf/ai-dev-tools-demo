export default function AIToolsSheet() {
  return (
    <>
      <h3>AI Tools Master Spreadsheet</h3>
      <p>
        The AI Tools Master Spreadsheet is a comprehensive, community-maintained directory 
        of AI tools, platforms, and resources available at eBay. This living document serves 
        as the single source of truth for discovering what AI capabilities are available.
      </p>

      <h4>What's Inside</h4>
      <ul>
        <li><strong>Tool Directory</strong>: Comprehensive list of AI platforms, coding assistants, and development tools</li>
        <li><strong>Resource Links</strong>: Direct links to documentation, setup guides, and support channels</li>
        <li><strong>Contact Information</strong>: Slack channels and team contacts for each tool</li>
        <li><strong>Usage Notes</strong>: Tips, best practices, and important considerations</li>
        <li><strong>Tool Categories</strong>: Organized by type (Platforms, Coding Assistants, Enterprise Search, etc.)</li>
      </ul>

      <h4>How to Use</h4>
      <ol>
        <li>Browse the spreadsheet to discover available AI tools</li>
        <li>Check the "Resource Link" column for setup instructions</li>
        <li>Review the "Contacts" column to find support channels</li>
        <li>Read the "Comments" for insider tips and important notes</li>
        <li>Contribute by adding new tools you discover!</li>
      </ol>

      <h4>Contributing</h4>
      <p>
        This is a community resource - if you discover a new AI tool or resource, please add it 
        to the spreadsheet! Help keep the information current by updating contacts, links, and 
        usage notes as you learn more.
      </p>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <a 
          className="button" 
          href="https://docs.google.com/spreadsheets/d/1HuvlTUHrDs2XU_kIVUJ5IkbM7UfE4dRJD48l_L2WLhs/edit?gid=0#gid=0" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          📊 Open AI Tools Spreadsheet
        </a>
      </div>

      <div style={{ 
        marginTop: 'var(--space-4)', 
        padding: 'var(--space-3)', 
        backgroundColor: '#f0f9ff', 
        borderLeft: '4px solid var(--color-blue-500)',
        borderRadius: 'var(--radius-md)'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          💡 <strong>Tip:</strong> Bookmark this spreadsheet for quick reference when exploring 
          new AI tools or helping teammates get started with AI development at eBay.
        </p>
      </div>
    </>
  )
}
