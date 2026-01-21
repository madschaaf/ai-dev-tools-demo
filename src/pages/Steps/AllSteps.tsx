import { useState, useEffect } from 'react'
import UserInfo from './steps/UserInfo'
import VerifySecurity from './steps/VerifySecurity'
import InstallChromeGlean from './steps/InstallChromeGlean'
import InstallGit from './steps/InstallGit'
import InstallNode from './steps/InstallNode'
import InstallPython from '../Steps/DynamicSteps/InstallPython'
import InstallChatGPTCLI from './steps/InstallChatGPTCLI'
import InstallVSCode from './steps/InstallVSCode'
import AIToolsCheckpoint from './steps/AIToolsCheckpoint'
import SetupProxy from './steps/SetupProxy'
import RequestAccess from './steps/RequestAccess'
import SetupGitHub from './steps/SetupGitHub'
import SetupGitHubEnterprise from './steps/SetupGitHubEnterprise'
import InstallObsidian from './steps/InstallObsidian'
import SetupObsidianNotes from './steps/SetupObsidianNotes'
import InstallCline from './steps/InstallCline'
import InstallClaude from './steps/InstallClaude'
import InstallExtensions from './steps/InstallExtensions'
import VSCodeExtensionsCheckpoint from './steps/VSCodeExtensionsCheckpoint'
import ConfigureMCPs from './steps/ConfigureMCPs'
import ConfigureVSCode from './steps/ConfigureVSCode'
import JoinSlackChannels from './steps/JoinSlackChannels'
import FinalAICheckpoint from './steps/FinalAICheckpoint'
import PracticeExercises from './steps/PracticeExercises'
import InstallMarkoSkin from './steps/InstallMarkoSkin'
import LocalAdminAccess from './steps/LocalAdminAccess.tsx'
import SetupGitHubCopilot from './steps/SetupGithubCopilot.tsx'

// import InstallPoolside from './steps/InstallPoolside' // Poolside partnership discontinued

// Base steps that all engineers complete
const baseSteps = [
  {
    id: 0,
    name: 'Your Information & Role',
    description: 'Enter your information and select your engineering role',
    category: 'Getting Started',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 1,
    name: 'Verify Security Setup',
    description: 'Confirm SSO, PingID, and YubiKey are functional',
    category: 'Pre-Setup',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 2,
    name: 'Request Access',
    description: 'Request access to GitHub Enterprise, Jira, Slack, and other tools',
    category: 'Pre-Setup',
    status: 'pending' as const,
    aiTools: ['Glean Chat']
  },
  {
    id: 3,
    name: 'Install Chrome & AI Extensions',
    description: 'Set up Chrome browser with ChatGPT and Glean extensions',
    category: 'Installs',
    status: 'pending' as const,
    aiTools: ['ChatGPT', 'Glean']
  },
  {
    id: 4,
    name: 'Install Node.js',
    description: 'Install Node.js via terminal or download',
    category: 'Installs',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 'install-python',
    name: 'Install Python',
    description: 'Install Python 3.12+ with pip package manager',
    category: 'Installs',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 5,
    name: 'Install Claude Code CLI',
    description: 'Install Claude Code CLI for terminal AI assistance with eBay SSO',
    category: 'Installs',
    status: 'pending' as const,
    aiTools: ['Claude Code']
  },
  {
    id: 6,
    name: 'Install Git',
    description: 'Install Git Bash (Windows) or verify Git (Mac)',
    category: 'Installs',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 7,
    name: 'Install VS Code',
    description: 'Install VS Code via terminal or download',
    category: 'Installs',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 'checkpoint-ai-tools',
    name: '✓ Checkpoint: AI Tools',
    description: 'Review all AI tools available to help you',
    category: 'Installs',
    status: 'pending' as const,
    isCheckpoint: true,
    aiTools: []
  },
  {
    id: 8,
    name: 'Setup Proxy',
    description: 'Configure eBay proxy settings for network access',
    category: 'Access & Permissions',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 9,
    name: 'Setup GitHub',
    description: 'Create GitHub account and configure SSH keys',
    category: 'Access & Permissions',
    status: 'pending' as const,
    aiTools: ['GitHub Copilot']
  },
  {
    id: 10,
    name: 'Setup GitHub Enterprise',
    description: 'Configure GitHub Enterprise with tokens and link accounts',
    category: 'Access & Permissions',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 11,
    name: 'Install VS Code Extensions',
    description: 'Install essential VS Code extensions for development',
    category: 'AI Tools',
    status: 'pending' as const,
    aiTools: ['Copilot', 'Copilot Chat', 'Claude']
  },
  {
    id: 12,
    name: 'Install Cline',
    description: 'Download and install eBay Cline extension for VS Code',
    category: 'AI Tools',
    status: 'pending' as const,
    aiTools: ['Cline']
  },
  {
    id: 13,
    name: 'Install Obsidian Workflow App',
    description: 'Add Obsidian workflow GitHub bot to repositories',
    category: 'AI Tools',
    status: 'pending' as const,
    aiTools: ['Obsidian']
  },
  {
    id: 14,
    name: 'Setup Obsidian Notes',
    description: 'Install Obsidian.md app and connect to GitHub Enterprise for knowledge management',
    category: 'AI Tools',
    status: 'pending' as const,
    aiTools: ['Obsidian', 'MCP']
  },
  {
    id: 15,
    name: 'Install Claude Extension',
    description: 'Install Claude Code extension via VSIX from Anthropic',
    category: 'AI Tools',
    status: 'pending' as const,
    aiTools: ['Claude']
  },
  // Poolside partnership discontinued - commenting out for now
  // {
  //   id: 'install-poolside',
  //   name: 'Install Poolside Assistant',
  //   description: 'Install eBay\'s AI coding assistant with fine-tuned models',
  //   category: 'AI Tools',
  //   status: 'pending' as const,
  //   aiTools: ['Poolside']
  // },
  {
    id: 'checkpoint-vscode-extensions',
    name: '✓ Checkpoint: VS Code Extensions',
    description: 'Review all AI extensions in your IDE',
    category: 'AI Tools',
    status: 'pending' as const,
    isCheckpoint: true,
    aiTools: []
  },
  {
    id: 16,
    name: 'Configure MCPs',
    description: 'Set up MCP servers with tokens and credentials',
    category: 'Configuration',
    status: 'pending' as const,
    aiTools: ['Git MCP', 'Jira MCP', 'Wiki MCP']
  },
  {
    id: 17,
    name: 'Configure VS Code Settings',
    description: 'Update settings.json with eBay-specific configurations',
    category: 'Configuration',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 18,
    name: 'Join Slack Channels',
    description: 'Join key Slack channels for support and collaboration',
    category: 'Final Steps',
    status: 'pending' as const,
    aiTools: ['HubGPT', 'SlackBot']
  },
  {
    id: 'checkpoint-final-ai',
    name: '✓ Checkpoint: Your Complete AI Toolkit',
    description: 'Review all your AI tools and how to use them',
    category: 'Final Steps',
    status: 'pending' as const,
    isCheckpoint: true,
    aiTools: []
  },
  {
    id: 19,
    name: 'Practice & Learn',
    description: 'Master your AI tools with hands-on exercises',
    category: 'Final Steps',
    status: 'pending' as const,
    aiTools: ['All AI Tools']
  },
  {
    id: 20,
    name: 'Local Admin Access',
    description: 'Request local admin access for your development machine',
    category: 'Access & Permissions',
    status: 'pending' as const,
    aiTools: []
  },
  {
    id: 21,
    name: 'Setup GitHub Copilot',
    description: 'Enable GitHub Copilot access through eBay\'s enterprise setup',
    category: 'Access & Permissions',
    status: 'pending' as const,
    aiTools: ['GitHub Copilot']
  }
]

// Role-specific steps
const roleSpecificSteps: Record<string, any[]> = {
  frontend: [
    {
      id: 'install-marko-skin',
      name: 'Install Marko & eBay Skin',
      description: 'Set up Marko.js and eBay Skin for frontend development',
      category: 'Frontend Setup',
      status: 'pending' as const,
      aiTools: ['Cline', 'Claude Code']
    }
  ],
  backend: [],
  ios: [],
  android: [],
  fullstack: [
    {
      id: 'install-marko-skin',
      name: 'Install Marko & eBay Skin',
      description: 'Set up Marko.js and eBay Skin for frontend development',
      category: 'Frontend Setup',
      status: 'pending' as const,
      aiTools: ['Cline', 'Claude Code']
    }
  ],
  datascience: [],
  test: []
}

// Component mapper for steps
const stepComponents: Record<number | string, React.ComponentType<any>> = {
  0: UserInfo,
  1: VerifySecurity,
  2: RequestAccess,
  3: InstallChromeGlean,
  4: InstallNode,
  'install-python': InstallPython,
  5: InstallChatGPTCLI,
  6: InstallGit,
  7: InstallVSCode,
  'checkpoint-ai-tools': AIToolsCheckpoint,
  8: SetupProxy,
  9: SetupGitHub,
  10: SetupGitHubEnterprise,
  11: InstallExtensions,
  12: InstallCline,
  13: InstallObsidian,
  14: SetupObsidianNotes,
  15: InstallClaude,
  // 'install-poolside': InstallPoolside, // Poolside partnership discontinued
  'checkpoint-vscode-extensions': VSCodeExtensionsCheckpoint,
  16: ConfigureMCPs,
  17: ConfigureVSCode,
  18: JoinSlackChannels,
  'checkpoint-final-ai': FinalAICheckpoint,
  19: PracticeExercises,
  'install-marko-skin': InstallMarkoSkin,
  20: LocalAdminAccess,
  21: SetupGitHubCopilot
}

// Function to generate steps based on selected role
function getStepsForRole(role: string | null): typeof baseSteps {
  if (!role || !roleSpecificSteps[role]) {
    return baseSteps
  }

  // Insert role-specific steps after "Configuration" category (after step 16)
  const configEndIndex = baseSteps.findIndex(s => s.id === 16) + 1
  const beforeConfig = baseSteps.slice(0, configEndIndex)
  const afterConfig = baseSteps.slice(configEndIndex)

  return [...beforeConfig, ...roleSpecificSteps[role], ...afterConfig]
}

export default function AllSteps() {
  const [selectedRole, setSelectedRole] = useState<string | null>(() => {
    // Load selected role from localStorage
    const saved = localStorage.getItem('selectedEngineerRole')
    return saved || null
  })

  // Generate steps based on selected role
  const steps = getStepsForRole(selectedRole)

  const [selectedStep, setSelectedStep] = useState<number | string | null>(steps[0]?.id ?? null)
  const [completedSteps, setCompletedSteps] = useState<Set<number | string>>(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem('completedSteps')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const activeStep = steps.find((s) => s.id === selectedStep) ?? null

  // Save role to localStorage when it changes
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    localStorage.setItem('selectedEngineerRole', role)
  }

  // Group steps by category
  const stepsByCategory = steps.reduce<Record<string, typeof steps>>((acc, step) => {
    if (!acc[step.category]) acc[step.category] = []
    acc[step.category].push(step)
    return acc
  }, {})

  // Get display number for a step (excludes checkpoints from numbering)
  const getStepDisplayNumber = (stepId: number | string): number | string => {
    const stepIndex = steps.findIndex(s => s.id === stepId)
    if (stepIndex === -1) return stepId

    // Count non-checkpoint steps before this one
    let displayNumber = 1
    for (let i = 0; i < stepIndex; i++) {
      if (!steps[i].isCheckpoint) {
        displayNumber++
      }
    }
    return displayNumber
  }

  // Scroll to top whenever selectedStep changes
  useEffect(() => {
    const detailPanel = document.querySelector('.link-detail-panel')
    if (detailPanel) {
      detailPanel.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedStep])

  const handleCompleteStep = (stepId: number | string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev)
      newSet.add(stepId)
      // Save to localStorage
      localStorage.setItem('completedSteps', JSON.stringify([...newSet]))
      return newSet
    })
  }

  const handleNextStep = () => {
    const currentIndex = steps.findIndex(s => s.id === selectedStep)
    if (currentIndex < steps.length - 1) {
      setSelectedStep(steps[currentIndex + 1].id)
    }
  }

  return (
    <>
      <div className="container">
        <section className="quick-links-section hero">
          <div className="hero-overlay quick-links-layout">
            <div className="quick-links-column">
              <h2>Getting Started Guide</h2>
              <p className="muted">Follow these steps to set up your development environment. Click a step to see details and take action.</p>

              <div className="quick-links-list">
                {Object.entries(stepsByCategory).map(([category, categorySteps]) => (
                  <section key={category} className="quick-links-group">
                    <h3 className="quick-links-group-title">{category}</h3>
                    <ul className="quick-links-items">
                      {categorySteps.map((step) => {
                        const isCompleted = completedSteps.has(step.id)
                        return (
                          <li key={step.id}>
                            <button
                              type="button"
                              onClick={() => setSelectedStep(step.id)}
                              className={`quick-link-row ${selectedStep === step.id ? 'active' : ''}`}
                              style={step.isCheckpoint ? {
                                background: selectedStep === step.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f6f8fa',
                                color: selectedStep === step.id ? 'white' : '#667eea',
                                borderLeft: selectedStep === step.id ? '4px solid #ffd700' : '4px solid #667eea',
                                transition: 'all 0.3s ease'
                              } : isCompleted ? {
                                background: '#d4edda',
                                borderLeft: '4px solid #28a745'
                              } : {}}
                              onMouseEnter={(e) => {
                                if (step.isCheckpoint && selectedStep !== step.id) {
                                  e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                  e.currentTarget.style.color = 'white'
                                  const nameElement = e.currentTarget.querySelector('.quick-link-name') as HTMLElement
                                  const descElement = e.currentTarget.querySelector('.quick-link-desc') as HTMLElement
                                  if (nameElement) nameElement.style.color = 'white'
                                  if (descElement) descElement.style.color = 'rgba(255,255,255,0.9)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (step.isCheckpoint && selectedStep !== step.id) {
                                  e.currentTarget.style.background = '#f6f8fa'
                                  e.currentTarget.style.color = '#667eea'
                                  const nameElement = e.currentTarget.querySelector('.quick-link-name') as HTMLElement
                                  const descElement = e.currentTarget.querySelector('.quick-link-desc') as HTMLElement
                                  if (nameElement) nameElement.style.color = '#667eea'
                                  if (descElement) descElement.style.color = ''
                                }
                              }}
                            >
                              {!step.isCheckpoint && (
                                <span className="step-number" style={isCompleted ? { background: '#28a745', color: 'white' } : {}}>
                                  {isCompleted ? '✓' : getStepDisplayNumber(step.id)}
                                </span>
                              )}
                              <span className="quick-link-row-main">
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', width: '100%' }}>
                                  <span className="quick-link-name" style={step.isCheckpoint ? { color: selectedStep === step.id ? 'white' : '#667eea', fontWeight: 600, transition: 'color 0.3s ease' } : {}}>{step.name}</span>
                                  {step.aiTools && step.aiTools.length > 0 && (
                                    <span style={{ 
                                      display: 'flex', 
                                      gap: '4px', 
                                      flexShrink: 0,
                                      fontSize: '0.7rem',
                                      opacity: 0.8
                                    }}>
                                      {step.aiTools.map((tool, idx) => (
                                        <span 
                                          key={idx}
                                          style={{
                                            background: selectedStep === step.id ? 'rgba(255,255,255,0.2)' : '#e3f2fd',
                                            color: selectedStep === step.id ? 'white' : '#1976d2',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            whiteSpace: 'nowrap',
                                            fontWeight: 500
                                          }}
                                        >
                                          {tool}
                                        </span>
                                      ))}
                                    </span>
                                  )}
                                </span>
                                <span className="quick-link-desc" style={step.isCheckpoint ? { color: selectedStep === step.id ? 'rgba(255,255,255,0.9)' : '#666', transition: 'color 0.3s ease' } : {}}>{step.description}</span>
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            </div>

            <aside className="link-detail-panel">
              {activeStep ? (
                <article className="page link-detail">
                  {(() => {
                    const Component = stepComponents[activeStep.id]
                    const isCompleted = completedSteps.has(activeStep.id)
                    if (Component) {
                      // Pass role selection props to UserInfo component (step 0)
                      if (activeStep.id === 0) {
                        return <Component onComplete={() => handleCompleteStep(activeStep.id)} isCompleted={isCompleted} onNext={handleNextStep} onRoleSelect={handleRoleSelect} selectedRole={selectedRole} />
                      }
                      if (activeStep.id === 19) {
                        return <Component onComplete={() => handleCompleteStep(activeStep.id)} isCompleted={isCompleted} />
                      }
                      return <Component onComplete={() => handleCompleteStep(activeStep.id)} isCompleted={isCompleted} onNext={handleNextStep} />
                    }

                    return (
                      <>
                        <h2>Step {activeStep.id}: {activeStep.name}</h2>
                        <p>{activeStep.description}</p>
                      </>
                    )
                  })()}
                </article>
              ) : (
                <div className="link-detail placeholder">
                  <h2>Select a step</h2>
                  <p className="muted small">Pick any step on the left to see instructions and take action.</p>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
    </>
  )
}
