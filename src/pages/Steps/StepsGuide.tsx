import { useState } from 'react'
import VerifySecurity from './steps/VerifySecurity'
import SetupProxy from './steps/SetupProxy'
import InstallVSCode from './steps/InstallVSCode'
import InstallNode from './steps/InstallNode'
import InstallGit from './steps/InstallGit'
import RequestAccess from './steps/RequestAccess'
import SetupGitHub from './steps/SetupGitHub'
import SetupGitHubEnterprise from './steps/SetupGitHubEnterprise'
import InstallObsidian from './steps/InstallObsidian'
import InstallCline from './steps/InstallCline'
import InstallExtensions from './steps/InstallExtensions'
import ConfigureMCPs from './steps/ConfigureMCPs'
import ConfigureVSCode from './steps/ConfigureVSCode'
import JoinSlackChannels from './steps/JoinSlackChannels'

const steps = [
  {
    id: 1,
    name: 'Verify Security Setup',
    description: 'Confirm SSO, PingID, and YubiKey are functional',
    category: 'Pre-Setup',
    status: 'pending' as const
  },
  {
    id: 2,
    name: 'Setup Proxy',
    description: 'Configure eBay proxy settings for network access',
    category: 'Pre-Setup',
    status: 'pending' as const
  },
  {
    id: 3,
    name: 'Install VS Code',
    description: 'Download and install the latest version of Visual Studio Code',
    category: 'Core Tools',
    status: 'pending' as const
  },
  {
    id: 4,
    name: 'Install Node.js',
    description: 'Download and install Node.js and npm for JavaScript development',
    category: 'Core Tools',
    status: 'pending' as const
  },
  {
    id: 5,
    name: 'Install Git',
    description: 'Install Git version control (Git Bash for Windows, Terminal for Mac)',
    category: 'Core Tools',
    status: 'pending' as const
  },
  {
    id: 6,
    name: 'Request Access',
    description: 'Request access to GitHub Enterprise, Jira, Slack, and other tools',
    category: 'Access & Permissions',
    status: 'pending' as const
  },
  {
    id: 7,
    name: 'Setup GitHub',
    description: 'Create GitHub account and configure SSH keys',
    category: 'Access & Permissions',
    status: 'pending' as const
  },
  {
    id: 8,
    name: 'Setup GitHub Enterprise',
    description: 'Configure GitHub Enterprise with tokens and link accounts',
    category: 'Access & Permissions',
    status: 'pending' as const
  },
  {
    id: 9,
    name: 'Install Obsidian App',
    description: 'Add Obsidian workflow app to GitHub Enterprise',
    category: 'AI Tools',
    status: 'pending' as const
  },
  {
    id: 10,
    name: 'Install Cline',
    description: 'Download and install eBay Cline extension for VS Code',
    category: 'AI Tools',
    status: 'pending' as const
  },
  {
    id: 11,
    name: 'Install VS Code Extensions',
    description: 'Install essential VS Code extensions for development',
    category: 'Configuration',
    status: 'pending' as const
  },
  {
    id: 12,
    name: 'Configure MCPs',
    description: 'Set up MCP servers with tokens and credentials',
    category: 'Configuration',
    status: 'pending' as const
  },
  {
    id: 13,
    name: 'Configure VS Code Settings',
    description: 'Update settings.json with eBay-specific configurations',
    category: 'Configuration',
    status: 'pending' as const
  },
  {
    id: 14,
    name: 'Join Slack Channels',
    description: 'Join key Slack channels for support and collaboration',
    category: 'Final Steps',
    status: 'pending' as const
  }
]

// Component mapper for steps
const stepComponents: Record<number, React.ComponentType<any>> = {
  1: VerifySecurity,
  2: SetupProxy,
  3: InstallVSCode,
  4: InstallNode,
  5: InstallGit,
  6: RequestAccess,
  7: SetupGitHub,
  8: SetupGitHubEnterprise,
  9: InstallObsidian,
  10: InstallCline,
  11: InstallExtensions,
  12: ConfigureMCPs,
  13: ConfigureVSCode,
  14: JoinSlackChannels
}

// Group steps by category
const stepsByCategory = steps.reduce<Record<string, typeof steps>>((acc, step) => {
  if (!acc[step.category]) acc[step.category] = []
  acc[step.category].push(step)
  return acc
}, {})

export default function StepsGuide() {
  const [selectedStep, setSelectedStep] = useState<number | null>(steps[0]?.id ?? null)

  const activeStep = steps.find((s) => s.id === selectedStep) ?? null

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
                      {categorySteps.map((step) => (
                        <li key={step.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedStep(step.id)}
                            className={`quick-link-row ${selectedStep === step.id ? 'active' : ''}`}
                          >
                            <span className="step-number">{step.id}</span>
                            <span className="quick-link-row-main">
                              <span className="quick-link-name">{step.name}</span>
                              <span className="quick-link-desc">{step.description}</span>
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
              {activeStep ? (
                <article className="page link-detail">
                  {(() => {
                    const Component = stepComponents[activeStep.id]
                    if (Component) {
                      return <Component />
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
