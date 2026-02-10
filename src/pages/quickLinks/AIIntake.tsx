export default function AIIntake() {
  return (
    <>
      <h2>AI Intake at eBay</h2>
      <p>Use the AI Intake portal to submit requests for AI/ML projects, get guidance on AI tooling, and connect with AI engineering teams.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Submit project proposals and use case requests</li>
        <li>Get help with AI tool selection and implementation</li>
        <li>Track your AI project requests and approvals</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://ebayinc.service-now.com/aiintake" target="_blank" rel="noreferrer">
          Open AI Intake
        </a>
      </div>
    </>
  )
}
