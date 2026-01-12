interface RoleSelectionProps {
  onComplete: () => void
  isCompleted: boolean
  onNext: () => void
  onRoleSelect: (role: string) => void
  selectedRole: string | null
}

export default function RoleSelection({ onComplete, isCompleted, onNext, onRoleSelect, selectedRole }: RoleSelectionProps) {
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
    }
  ]

  const handleRoleSelection = (roleId: string) => {
    onRoleSelect(roleId)
    if (!isCompleted) {
      onComplete()
    }
  }

  return (
    <>
      <h2>Select Your Engineer Role</h2>
      <p>Choose your primary engineering role to get a personalized setup experience. We'll tailor the setup steps to include tools and configurations specific to your role.</p>

      {isCompleted && selectedRole && (
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
            onClick={() => handleRoleSelection(role.id)}
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

      {isCompleted && (
        <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={onNext}
            className="button primary"
            style={{ padding: '12px 24px', fontSize: '1rem' }}
          >
            Continue to Next Step →
          </button>
        </div>
      )}
    </>
  )
}
