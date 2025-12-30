import { useState, useEffect } from 'react'
import UserInfo from './steps/UserInfo'
import VerifySecurity from './steps/VerifySecurity'
import InstallChromeGlean from './steps/InstallChromeGlean'
import InstallGit from './steps/InstallGit'
import InstallNode from './steps/InstallNode'
import InstallChatGPTCLI from './steps/InstallChatGPTCLI'
import InstallVSCode from './steps/InstallVSCode'
import AIToolsCheckpoint from './steps/AIToolsCheckpoint'
import SetupProxy from './steps/SetupProxy'
import RequestAccess from './steps/RequestAccess'
import SetupGitHub from './steps/SetupGitHub'
import SetupGitHubEnterprise from './steps/SetupGitHubEnterprise'
import InstallObsidian from './steps/InstallObsidian'
import InstallCline from './steps/InstallCline'
import InstallExtensions from './steps/InstallExtensions'
import VSCodeExtensionsCheckpoint from './steps/VSCodeExtensionsCheckpoint'
import ConfigureMCPs from './steps/ConfigureMCPs'
import ConfigureVSCode from './steps/ConfigureVSCode'
import JoinSlackChannels from './steps/JoinSlackChannels'
import FinalAICheckpoint from './steps/FinalAICheckpoint'
import PracticeExercises from './steps/PracticeExercises'

const steps = [
  {
    id: 0,
    name: 'Your Information',
    description: 'Enter your name and email for personalized setup',
    category: 'Getting Started',
    status: 'pending' as const
  },
  {
    id: 1,
    name: 'Verify Security Setup',
    description: 'Confirm SSO, PingID, and YubiKey are functional',
    category: 'Pre-Setup',
    status: 'pending' as const
  },
  {
    id: 2,
    name: 'Request Access',
    description: 'Request access to GitHub Enterprise, Jira, Slack, and other tools',
    category: 'Pre-Setup',
    status: 'pending' as const
  },
  {
    id: 3,
    name: 'Install Chrome & AI Extensions',
    description: 'Set up Chrome browser with ChatGPT and Glean extensions',
    category: 'Installs',
    status: 'pending' as const
  },
  {
    id: 4,
    name: 'Install Node.js',
    description: 'Install Node.js via terminal or download',
    category: 'Installs',
    status: 'pending' as const
  },
  {
    id: 5,
    name: 'Install Claude Code CLI',
    description: 'Install Claude Code CLI for terminal AI assistance with eBay SSO',
    category: 'Installs',
    status: 'pending' as const
  },
  {
    id: 6,
    name: 'Install Git',
    description: 'Install Git Bash (Windows) or verify Git (Mac)',
    category: 'Installs',
    status: 'pending' as const
  },
  {
    id: 7,
    name: 'Install VS Code',
    description: 'Install VS Code via terminal or download',
    category: 'Installs',
    status: 'pending' as const
  },
  {
    id: 'checkpoint-ai-tools',
    name: '✓ Checkpoint: AI Tools',
    description: 'Review all AI tools available to help you',
    category: 'Installs',
    status: 'pending' as const,
    isCheckpoint: true
  },
  {
    id: 8,
    name: 'Setup Proxy',
    description: 'Configure eBay proxy settings for network access',
    category: 'Access & Permissions',
    status: 'pending' as const
  },
  {
    id: 9,
    name: 'Setup GitHub',
    description: 'Create GitHub account and configure SSH keys',
    category: 'Access & Permissions',
    status: 'pending' as const
  },
  {
    id: 10,
    name: 'Setup GitHub Enterprise',
    description: 'Configure GitHub Enterprise with tokens and link accounts',
    category: 'Access & Permissions',
    status: 'pending' as const
  },
  {
    id: 11,
    name: 'Install VS Code Extensions',
    description: 'Install essential VS Code extensions for development',
    category: 'AI Tools',
    status: 'pending' as const
  },
  {
    id: 12,
    name: 'Install Cline',
    description: 'Download and install eBay Cline extension for VS Code',
    category: 'AI Tools',
    status: 'pending' as const
  },
  {
    id: 13,
    name: 'Install Obsidian App',
    description: 'Add Obsidian workflow app to GitHub Enterprise',
    category: 'AI Tools',
    status: 'pending' as const
  },
  {
    id: 'checkpoint-vscode-extensions',
    name: '✓ Checkpoint: VS Code Extensions',
    description: 'Review all AI extensions in your IDE',
    category: 'AI Tools',
    status: 'pending' as const,
    isCheckpoint: true
  },
  {
    id: 14,
    name: 'Configure MCPs',
    description: 'Set up MCP servers with tokens and credentials',
    category: 'Configuration',
    status: 'pending' as const
  },
  {
    id: 15,
    name: 'Configure VS Code Settings',
    description: 'Update settings.json with eBay-specific configurations',
    category: 'Configuration',
    status: 'pending' as const
  },
  {
    id: 16,
    name: 'Join Slack Channels',
    description: 'Join key Slack channels for support and collaboration',
    category: 'Final Steps',
    status: 'pending' as const
  },
  {
    id: 'checkpoint-final-ai',
    name: '✓ Checkpoint: Your Complete AI Toolkit',
    description: 'Review all your AI tools and how to use them',
    category: 'Final Steps',
    status: 'pending' as const,
    isCheckpoint: true
  },
  {
    id: 17,
    name: 'Practice & Learn',
    description: 'Master your AI tools with hands-on exercises',
    category: 'Final Steps',
    status: 'pending' as const
  }
]

// Component mapper for steps
const stepComponents: Record<number | string, React.ComponentType<any>> = {
  0: UserInfo,
  1: VerifySecurity,
  2: RequestAccess,
  3: InstallChromeGlean,
  4: InstallNode,
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
  'checkpoint-vscode-extensions': VSCodeExtensionsCheckpoint,
  14: ConfigureMCPs,
  15: ConfigureVSCode,
  16: JoinSlackChannels,
  'checkpoint-final-ai': FinalAICheckpoint,
  17: PracticeExercises
}

// Group steps by category
const stepsByCategory = steps.reduce<Record<string, typeof steps>>((acc, step) => {
  if (!acc[step.category]) acc[step.category] = []
  acc[step.category].push(step)
  return acc
}, {})

export default function StepsGuide() {
  const [selectedStep, setSelectedStep] = useState<number | string | null>(steps[0]?.id ?? null)
  const [completedSteps, setCompletedSteps] = useState<Set<number | string>>(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem('completedSteps')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const activeStep = steps.find((s) => s.id === selectedStep) ?? null

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
                                  {isCompleted ? '✓' : step.id}
                                </span>
                              )}
                              <span className="quick-link-row-main">
                                <span className="quick-link-name" style={step.isCheckpoint ? { color: selectedStep === step.id ? 'white' : '#667eea', fontWeight: 600, transition: 'color 0.3s ease' } : {}}>{step.name}</span>
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
