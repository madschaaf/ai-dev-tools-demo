export default function EBayCSS() {
  return (
    <>
      <h2>eBay CSS Design System</h2>
      <p>The eBay Playbook provides design guidelines, UI components, and patterns for building consistent, accessible experiences across eBay products.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Browse components and usage guidelines</li>
        <li>Follow accessibility and UX best practices</li>
        <li>Use design tokens for consistent styling</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://playbook.ebay.com/get-started" target="_blank" rel="noreferrer">
          Open eBay CSS Designs
        </a>
      </div>
    </>
  )
}
