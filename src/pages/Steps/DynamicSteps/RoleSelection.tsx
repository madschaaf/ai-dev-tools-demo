import { useState } from 'react'

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: 'frontend',
      name: 'Frontend Engineer',
      description: 'Build user interfaces with React, Marko, and eBay Skin',
      icon: '💅',
      tools: ['Marko', 'eBay Skin', 'React', 'Figma MCP']
    },
    {
      id: 'backend',
      name: 'Backend Engineer',
      description: 'Build APIs and server-side applications',
      icon: '⚙️',
      tools: ['Node.js', 'Java', 'Python', 'Databases']
    },
    {
      id: 'ios',
      name: 'iOS Developer',
      description: 'Build native iOS applications with Swift/SwiftUI',
      icon: '📱',
      tools: ['Xcode', 'Swift', 'SwiftUI', 'iOS SDK']
    },
    {
      id: 'android',
      name: 'Android Developer',
      description: 'Build native Android applications with Kotlin',
      icon: '🤖',
      tools: ['Android Studio', 'Kotlin', 'Jetpack Compose']
    },
    {
      id: 'fullstack',
      name: 'Full Stack Engineer',
      description: 'Work across frontend and backend technologies',
      icon: '🚀',
      tools: ['React', 'Node.js', 'Databases', 'APIs']
    },
    {
      id: 'datascience',
      name: 'Data Scientist',
      description: 'Analyze data and build machine learning models',
      icon: '📊',
      tools: ['Python', 'Jupyter', 'Pandas', 'ML Frameworks']
    },
    {
      id: 'test',
      name: 'Test Engineer',
      description: 'Ensure quality through testing and automation',
      icon: '🧪',
      tools: ['Test Frameworks', 'Automation', 'CI/CD']
    },
    {
      id: 'growth',
      name: 'Growth Engineer',
      description: 'Drive user acquisition, retention, and product-led growth',
      icon: '📈',
      tools: ['Analytics', 'A/B Testing', 'Data Pipelines', 'Marketing APIs']
    },
    {
      id: 'platform',
      name: 'Platform Engineer',
      description: 'Build and maintain infrastructure and developer tools',
      icon: '🏗️',
      tools: ['Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Monitoring']
    },
    {
      id: 'product',
      name: 'Product Engineer',
      description: 'Bridge product and engineering to deliver user value',
      icon: '🎯',
      tools: ['Product Analytics', 'User Research Tools', 'Full Stack']
    }
  ]

  return (
    <>
      <h2>Step 0: Select Your Engineer Role</h2>
      <p>Choose your primary engineering role to get a personalized setup experience. We'll tailor the setup steps to include tools and configurations specific to your role.</p>

      {selectedRole && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#28a745', color: '#155724', marginTop: 'var(--space-3)' }}>
          <strong>✓ Role Selected:</strong> {roles.find(r => r.id === selectedRole)?.name}
          <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>You can change this selection anytime by clicking a different role below.</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedRole(role.id)}
            className="button"
            style={{
              textAlign: 'left',
              padding: 'var(--space-3)',
              background: selectedRole === role.id ? '#e3f2fd' : '#fff',
              border: selectedRole === role.id ? '2px solid #1976d2' : '2px solid #e1e4e8',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
            onMouseEnter={(e) => {
              if (selectedRole !== role.id) {
                e.currentTarget.style.borderColor = '#1976d2'
                e.currentTarget.style.background = '#f5f5f5'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedRole !== role.id) {
                e.currentTarget.style.borderColor = '#e1e4e8'
                e.currentTarget.style.background = '#fff'
              }
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{role.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px', color: '#000' }}>
              {role.name}
              {selectedRole === role.id && <span style={{ marginLeft: '8px', color: '#1976d2' }}>✓</span>}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '12px' }}>{role.description}</div>
            <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 'auto' }}>
              <strong>Tools:</strong> {role.tools.join(', ')}
            </div>
          </button>
        ))}
      </div>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Note:</strong> All engineers will complete core setup steps (Node.js, Git, VS Code, etc.). Your role selection adds specific tools and configurations relevant to your work.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Why Select a Role?</h3>
      <ul>
        <li><strong>Personalized Setup:</strong> Get tools and configurations specific to your engineering discipline</li>
        <li><strong>Relevant Tools:</strong> Only install what you need for your daily work</li>
        <li><strong>Faster Onboarding:</strong> Skip irrelevant setup steps and get coding faster</li>
        <li><strong>Best Practices:</strong> Learn role-specific best practices and workflows</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What Happens Next?</h3>
      <p>Based on your role selection, the setup guide will:</p>
      <ol>
        <li>Include role-specific development tools</li>
        <li>Configure your IDE with relevant extensions</li>
        <li>Set up frameworks and libraries you'll use</li>
        <li>Provide role-specific AI coding assistants and MCPs</li>
      </ol>

      <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
        <strong>Can I Change My Role Later?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Yes! You can always come back to this step and select a different role. Your setup steps will automatically update to match your new selection.
        </p>
      </div>
    </>
  )
}
