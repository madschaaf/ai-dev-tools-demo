import { useState, useEffect } from 'react'

interface UserData {
  firstName: string
  lastName: string
  email: string
  os: 'mac' | 'windows' | ''
  role: string
}

interface UserInfoProps {
  onComplete: () => void
  isCompleted: boolean
  onNext: () => void
  onRoleSelect?: (role: string) => void
  selectedRole?: string | null
}

export default function UserInfo({ onComplete, isCompleted, onNext, onRoleSelect, selectedRole }: UserInfoProps) {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    os: '',
    role: ''
  })
  const [saved, setSaved] = useState(false)

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

  const activeRoleId = selectedRole ?? userData.role

  useEffect(() => {
    // Load saved data on mount
    const savedData = localStorage.getItem('ebay-dev-setup-user-info')
    if (savedData) {
      setUserData(JSON.parse(savedData))
      setSaved(true)
    }
  }, [])

  const handleRoleSelection = (roleId: string) => {
    setUserData({ ...userData, role: roleId })
    if (onRoleSelect) {
      onRoleSelect(roleId)
    }
  }

  const handleSave = () => {
    if (userData.firstName && userData.lastName && userData.email && userData.os && userData.role) {
      localStorage.setItem('ebay-dev-setup-user-info', JSON.stringify(userData))
      setSaved(true)
    }
  }

  const handleClear = () => {
    localStorage.removeItem('ebay-dev-setup-user-info')
    setUserData({ firstName: '', lastName: '', email: '', os: '', role: '' })
    setSaved(false)
  }

  const isValid = userData.firstName.trim() && userData.lastName.trim() && userData.email.trim() && userData.os && userData.role

  return (
    <>
      <h2>Your Information</h2>
      <p>Enter your information below. This will be saved and used throughout the setup process to personalize your experience.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Privacy:</strong> Your information is only stored locally in your browser and is never sent to any server.
      </div>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '500px' }}>
        <div>
          <label htmlFor="firstName" style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={userData.firstName}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            placeholder="John"
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '1rem',
              border: '1px solid #d0d7de',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div>
          <label htmlFor="lastName" style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={userData.lastName}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            placeholder="Doe"
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '1rem',
              border: '1px solid #d0d7de',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>
            eBay Email
          </label>
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            placeholder="jdoe@ebay.com"
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '1rem',
              border: '1px solid #d0d7de',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div>
          <label htmlFor="os" style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>
            Operating System
          </label>
          <select
            id="os"
            value={userData.os}
            onChange={(e) => setUserData({ ...userData, os: e.target.value as 'mac' | 'windows' | '' })}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '1rem',
              border: '1px solid #d0d7de',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'inherit',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select your operating system</option>
            <option value="mac">macOS</option>
            <option value="windows">Windows</option>
          </select>
          <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            This will customize terminal commands and instructions throughout the guide
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '12px' }}>
            Engineering Role
          </label>
          <p style={{ margin: '0 0 12px', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Select your role to get tailored setup steps and tools
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)' }}>
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelection(role.id)}
                style={{
                  textAlign: 'left',
                  padding: 'var(--space-2)',
                  background: activeRoleId === role.id ? '#e3f2fd' : '#fff',
                  border: activeRoleId === role.id ? '2px solid #1976d2' : '1px solid #e1e4e8',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  if (activeRoleId !== role.id) {
                    e.currentTarget.style.borderColor = '#1976d2'
                    e.currentTarget.style.background = '#f5f5f5'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeRoleId !== role.id) {
                    e.currentTarget.style.borderColor = '#e1e4e8'
                    e.currentTarget.style.background = '#fff'
                  }
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{role.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>
                  {role.name}
                  {activeRoleId === role.id && <span style={{ marginLeft: '6px', color: '#1976d2' }}>✓</span>}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>{role.description}</div>
              </button>
            ))}
          </div>
          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-2)', padding: 'var(--space-2)', fontSize: '0.85rem' }}>
            <strong>Note:</strong> All engineers complete core steps (Node.js, Git, VS Code, etc.). Your role adds specific tools.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
          <button
            type="button"
            className="button"
            onClick={handleSave}
            disabled={!isValid}
            style={{
              opacity: isValid ? 1 : 0.5,
              cursor: isValid ? 'pointer' : 'not-allowed'
            }}
          >
            Save Information
          </button>
          {saved && (
            <button
              type="button"
              className="button secondary"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {saved && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>Information Saved!</strong>
          <p style={{ margin: '8px 0 0' }}>
            Your name and email will be used throughout the setup steps. You can proceed to Step 1.
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Where This Information Is Used</h3>
      <ul>
        <li><strong>Step 6 - Request Access:</strong> Auto-fills your name in the Secure Access portal instructions</li>
        <li><strong>Step 7 - Setup GitHub:</strong> Uses your email for Git configuration examples</li>
        <li><strong>Step 12 - Configure MCPs:</strong> Pre-fills your email in configuration templates</li>
        <li><strong>Throughout:</strong> Personalizes instructions and examples with your actual name</li>
      </ul>

      {saved && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <h4>Your Saved Information:</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: 0, marginBottom: '8px' }}><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
            <p style={{ margin: 0, marginBottom: '8px' }}><strong>Email:</strong> {userData.email}</p>
            <p style={{ margin: 0, marginBottom: '8px' }}><strong>Username:</strong> {userData.email.split('@')[0]}</p>
            <p style={{ margin: 0, marginBottom: '8px' }}><strong>Operating System:</strong> {userData.os === 'mac' ? 'macOS' : 'Windows'}</p>
            <p style={{ margin: 0 }}><strong>Role:</strong> {roles.find(r => r.id === userData.role)?.name || userData.role}</p>
          </div>
        </div>
      )}

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {!isCompleted ? (
            <button
              type="button"
              onClick={onComplete}
              disabled={!saved}
              style={{
                fontSize: '1rem',
                padding: '12px 24px',
                background: saved ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: saved ? 'pointer' : 'not-allowed',
                fontWeight: 600,
                transition: 'all 0.2s',
                opacity: saved ? 1 : 0.6
              }}
            >
              Mark as Complete
            </button>
          ) : (
            <div style={{ color: '#28a745', fontWeight: 600, fontSize: '1.1rem' }}>
              ✓ Step Completed
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          style={{
            fontSize: '1rem',
            padding: '12px 24px',
            background: '#0969da',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
        >
          Next Step →
        </button>
      </div>
    </>
  )
}

// Export utility functions to get user data from localStorage
export const getUserInfo = (): UserData | null => {
  const savedData = localStorage.getItem('ebay-dev-setup-user-info')
  return savedData ? JSON.parse(savedData) : null
}

export const getUsername = (): string | null => {
  const userInfo = getUserInfo()
  if (userInfo && userInfo.email) {
    // Extract username from email (everything before @)
    return userInfo.email.split('@')[0]
  }
  return null
}

export const getUserFullName = (): string | null => {
  const userInfo = getUserInfo()
  if (userInfo && userInfo.firstName && userInfo.lastName) {
    return `${userInfo.firstName} ${userInfo.lastName}`
  }
  return null
}

export const getUserOS = (): 'mac' | 'windows' | null => {
  const userInfo = getUserInfo()
  if (userInfo && userInfo.os) {
    return userInfo.os as 'mac' | 'windows'
  }
  return null
}
