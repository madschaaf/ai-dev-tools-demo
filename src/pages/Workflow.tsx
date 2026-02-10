import { useState } from 'react'

interface AITool {
  id: string
  name: string
  description: string
  icon: string
}

interface Step {
  id: string
  title: string
  description: string
  completed: boolean
}

interface Workflow {
  id: string
  name: string
  description: string
  icon: string
  category: string
  aiTools: AITool[]
  getSteps: (toolId: string) => Step[]
}

export default function Workflow() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [steps, setSteps] = useState<Step[]>([])

  const workflows: Workflow[] = [
    {
      id: 'build-website',
      name: 'Build a Website',
      description: 'Create a professional website from scratch',
      icon: '🌐',
      category: 'Development',
      aiTools: [
        {
          id: 'cline',
          name: 'Cline',
          description: 'AI agent that can write code and create files automatically',
          icon: '🤖'
        },
        {
          id: 'copilot',
          name: 'GitHub Copilot',
          description: 'Code completion and suggestions as you type',
          icon: '✨'
        },
        {
          id: 'v0',
          name: 'v0.dev',
          description: 'Generate React components from text descriptions',
          icon: '⚡'
        }
      ],
      getSteps: (toolId: string) => {
        if (toolId === 'cline') {
          return [
            { id: '1', title: 'Install Cline extension in VS Code', description: 'Get the Cline AI agent from VS Code extensions', completed: false },
            { id: '2', title: 'Open Cline and describe your website', description: 'Tell Cline what kind of website you want to build', completed: false },
            { id: '3', title: 'Let Cline create the project structure', description: 'Cline will set up HTML, CSS, and JavaScript files', completed: false },
            { id: '4', title: 'Review and customize the generated code', description: 'Make any changes to match your vision', completed: false },
            { id: '5', title: 'Test your website locally', description: 'Open the HTML file in your browser to see it', completed: false }
          ]
        } else if (toolId === 'copilot') {
          return [
            { id: '1', title: 'Install GitHub Copilot extension', description: 'Add Copilot to VS Code', completed: false },
            { id: '2', title: 'Create new HTML, CSS, and JS files', description: 'Set up your project structure manually', completed: false },
            { id: '3', title: 'Start typing code and use Copilot suggestions', description: 'Copilot will suggest code as you type', completed: false },
            { id: '4', title: 'Use Copilot Chat for complex sections', description: 'Ask Copilot Chat to generate specific components', completed: false },
            { id: '5', title: 'Test and refine your website', description: 'Preview in browser and make improvements', completed: false }
          ]
        } else if (toolId === 'v0') {
          return [
            { id: '1', title: 'Go to v0.dev website', description: 'Open v0.dev in your browser', completed: false },
            { id: '2', title: 'Describe your website components', description: 'Tell v0 what sections you need (header, hero, footer, etc.)', completed: false },
            { id: '3', title: 'Copy the generated React code', description: 'v0 will create React components for you', completed: false },
            { id: '4', title: 'Set up a React project', description: 'Use create-react-app or Vite to start a new project', completed: false },
            { id: '5', title: 'Paste and customize the components', description: 'Add the v0 components to your project', completed: false }
          ]
        }
        return []
      }
    },
    {
      id: 'create-presentation',
      name: 'Create a PowerPoint Presentation',
      description: 'Generate professional presentations with AI assistance',
      icon: '📊',
      category: 'Content Creation',
      aiTools: [
        {
          id: 'notebooklm',
          name: 'NotebookLM',
          description: 'Google\'s AI that can analyze documents and create presentations',
          icon: '📔'
        },
        {
          id: 'chatgpt',
          name: 'ChatGPT',
          description: 'Generate presentation outlines and content',
          icon: '💬'
        }
      ],
      getSteps: (toolId: string) => {
        if (toolId === 'notebooklm') {
          return [
            { id: '1', title: 'Go to NotebookLM', description: 'Visit notebooklm.google.com', completed: false },
            { id: '2', title: 'Upload your source materials', description: 'Add documents, PDFs, or notes about your topic', completed: false },
            { id: '3', title: 'Ask NotebookLM to create an outline', description: 'Request a presentation structure based on your materials', completed: false },
            { id: '4', title: 'Generate slide content', description: 'Have NotebookLM write content for each slide', completed: false },
            { id: '5', title: 'Export to PowerPoint', description: 'Copy the content into PowerPoint and add visuals', completed: false }
          ]
        } else if (toolId === 'chatgpt') {
          return [
            { id: '1', title: 'Open ChatGPT', description: 'Go to chat.openai.com', completed: false },
            { id: '2', title: 'Describe your presentation topic', description: 'Tell ChatGPT what you need to present about', completed: false },
            { id: '3', title: 'Request a presentation outline', description: 'Ask for a structured outline with main points', completed: false },
            { id: '4', title: 'Generate content for each slide', description: 'Have ChatGPT write detailed content for each section', completed: false },
            { id: '5', title: 'Create slides in PowerPoint', description: 'Use the AI-generated content to build your presentation', completed: false }
          ]
        }
        return []
      }
    },
    {
      id: 'ios-app',
      name: 'Create an App for iPhones',
      description: 'Build iOS applications with AI assistance',
      icon: '📱',
      category: 'Mobile Development',
      aiTools: [
        {
          id: 'cursor',
          name: 'Cursor',
          description: 'AI-powered code editor for Swift development',
          icon: '⚡'
        },
        {
          id: 'copilot',
          name: 'GitHub Copilot',
          description: 'Swift code suggestions and completions',
          icon: '✨'
        },
        {
          id: 'cline',
          name: 'Cline',
          description: 'AI agent for iOS project setup and development',
          icon: '🤖'
        }
      ],
      getSteps: (toolId: string) => {
        if (toolId === 'cursor') {
          return [
            { id: '1', title: 'Install Cursor editor', description: 'Download Cursor from cursor.sh', completed: false },
            { id: '2', title: 'Install Xcode', description: 'Get Xcode from the Mac App Store', completed: false },
            { id: '3', title: 'Create a new SwiftUI project', description: 'Start a new iOS app project in Xcode', completed: false },
            { id: '4', title: 'Open project in Cursor', description: 'Use Cursor to write Swift code with AI assistance', completed: false },
            { id: '5', title: 'Test in iOS Simulator', description: 'Run your app in Xcode\'s simulator', completed: false }
          ]
        } else if (toolId === 'copilot') {
          return [
            { id: '1', title: 'Install Xcode', description: 'Download from Mac App Store', completed: false },
            { id: '2', title: 'Set up GitHub Copilot for Xcode', description: 'Install Copilot extension for Xcode', completed: false },
            { id: '3', title: 'Create SwiftUI project', description: 'Start a new iOS app project', completed: false },
            { id: '4', title: 'Use Copilot for Swift code', description: 'Let Copilot suggest Swift code as you build features', completed: false },
            { id: '5', title: 'Build and test your app', description: 'Run on simulator or physical device', completed: false }
          ]
        } else if (toolId === 'cline') {
          return [
            { id: '1', title: 'Install Xcode and required tools', description: 'Set up your iOS development environment', completed: false },
            { id: '2', title: 'Install Cline in VS Code', description: 'Get the Cline extension', completed: false },
            { id: '3', title: 'Describe your iOS app to Cline', description: 'Tell Cline what kind of app you want to create', completed: false },
            { id: '4', title: 'Let Cline generate SwiftUI code', description: 'Cline will create views and app structure', completed: false },
            { id: '5', title: 'Open in Xcode and run', description: 'Test your app in Xcode simulator', completed: false }
          ]
        }
        return []
      }
    },
    {
      id: 'interview-process',
      name: 'Plan a Better Way to Structure Interviewing Candidates',
      description: 'Design an effective interview process using AI',
      icon: '👥',
      category: 'HR & Recruiting',
      aiTools: [
        {
          id: 'chatgpt',
          name: 'ChatGPT',
          description: 'Get expert prompting strategies for interview planning',
          icon: '💬'
        },
        {
          id: 'claude',
          name: 'Claude',
          description: 'Long-form analysis and interview framework design',
          icon: '🎯'
        }
      ],
      getSteps: (toolId: string) => {
        if (toolId === 'chatgpt') {
          return [
            { id: '1', title: 'Define your interview goals', description: 'Use ChatGPT to clarify what you want to assess', completed: false },
            { id: '2', title: 'Create competency framework', description: 'Ask: "Help me create a competency framework for [role]"', completed: false },
            { id: '3', title: 'Generate interview questions', description: 'Prompt: "Create behavioral questions for each competency"', completed: false },
            { id: '4', title: 'Design scoring rubric', description: 'Ask: "Create an evaluation rubric for these questions"', completed: false },
            { id: '5', title: 'Build interview guide', description: 'Compile everything into a structured interview guide', completed: false }
          ]
        } else if (toolId === 'claude') {
          return [
            { id: '1', title: 'Upload current interview materials to Claude', description: 'Share existing questions and process with Claude', completed: false },
            { id: '2', title: 'Request comprehensive analysis', description: 'Ask Claude to analyze gaps and suggest improvements', completed: false },
            { id: '3', title: 'Design interview stages', description: 'Have Claude create a multi-stage interview process', completed: false },
            { id: '4', title: 'Create question bank', description: 'Generate role-specific questions for each stage', completed: false },
            { id: '5', title: 'Develop evaluation system', description: 'Build a complete candidate assessment framework', completed: false }
          ]
        }
        return []
      }
    },
    {
      id: 'candidate-tracking',
      name: 'Keep Track of My Candidates',
      description: 'Build an AI agent to manage candidate information',
      icon: '📋',
      category: 'Automation',
      aiTools: [
        {
          id: 'cline-agent',
          name: 'Cline (Agent Builder)',
          description: 'Create a custom AI agent for candidate tracking',
          icon: '🤖'
        },
        {
          id: 'airtable-automation',
          name: 'Airtable + AI',
          description: 'Build a database with AI-powered automation',
          icon: '📊'
        }
      ],
      getSteps: (toolId: string) => {
        if (toolId === 'cline-agent') {
          return [
            { id: '1', title: 'Install Cline and dependencies', description: 'Set up Cline and any required tools', completed: false },
            { id: '2', title: 'Describe your tracking needs to Cline', description: 'Tell Cline what candidate info you need to track', completed: false },
            { id: '3', title: 'Let Cline build a database schema', description: 'Cline will design the data structure', completed: false },
            { id: '4', title: 'Create agent with custom prompts', description: 'Build an AI agent that can update candidate records', completed: false },
            { id: '5', title: 'Test and refine the agent', description: 'Try adding/updating candidates and improve the agent', completed: false }
          ]
        } else if (toolId === 'airtable-automation') {
          return [
            { id: '1', title: 'Create an Airtable base', description: 'Set up a new database for candidates', completed: false },
            { id: '2', title: 'Design your tracking fields', description: 'Add columns for name, status, interview dates, notes, etc.', completed: false },
            { id: '3', title: 'Use ChatGPT to generate candidate entries', description: 'Have AI help fill in candidate information from resumes', completed: false },
            { id: '4', title: 'Set up Airtable automations', description: 'Create automated workflows for status updates', completed: false },
            { id: '5', title: 'Build reporting views', description: 'Create filtered views for different hiring stages', completed: false }
          ]
        }
        return []
      }
    }
  ]

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
    if (selectedWorkflow) {
      const workflow = workflows.find(w => w.id === selectedWorkflow)
      if (workflow) {
        const generatedSteps = workflow.getSteps(toolId)
        setSteps(generatedSteps)
      }
    }
  }

  const toggleStep = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ))
  }

  const currentWorkflow = workflows.find(w => w.id === selectedWorkflow)
  const categories = Array.from(new Set(workflows.map(w => w.category)))

  return (
    <div className="container">
      <header className="header">
        <h1>AI Workflows</h1>
        <p className="subtitle">Choose a goal, select your AI tool, and follow the steps</p>
      </header>

      <section className="quick-links-section hero">
        <div className="hero-overlay quick-links-layout">
          {/* Left Column - Workflow Selection */}
          <div className="quick-links-column">
            <h2>What Do You Want to Do?</h2>
            <p className="muted">Select a workflow to see AI tool options and step-by-step guidance</p>

            <div className="quick-links-list">
              {categories.map((category) => (
                <section key={category} className="quick-links-group">
                  <h3 className="quick-links-group-title">{category}</h3>
                  <ul className="quick-links-items">
                    {workflows.filter(w => w.category === category).map((workflow) => (
                      <li key={workflow.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedWorkflow(workflow.id)
                            setSelectedTool(null)
                            setSteps([])
                          }}
                          className={`quick-link-row ${selectedWorkflow === workflow.id ? 'active' : ''}`}
                        >
                          <span style={{ fontSize: '2rem', marginRight: 'var(--space-2)' }}>{workflow.icon}</span>
                          <span className="quick-link-row-main">
                            <span className="quick-link-name">{workflow.name}</span>
                            <span className="quick-link-desc">{workflow.description}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* Right Column - Tool Selection and Steps */}
          <aside className="link-detail-panel">
            {!currentWorkflow ? (
              <div className="link-detail placeholder">
                <h2>Select a Workflow</h2>
                <p className="muted small">Choose what you want to accomplish from the list on the left</p>
              </div>
            ) : (
              <article className="page link-detail">
                <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-2)' }}>{currentWorkflow.icon}</div>
                  <h2 style={{ margin: '0 0 8px', color: '#1976d2' }}>{currentWorkflow.name}</h2>
                  <p style={{ margin: 0 }}>{currentWorkflow.description}</p>
                </div>

                <h3>Choose Your AI Tool</h3>
                <div style={{ display: 'grid', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  {currentWorkflow.aiTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolSelect(tool.id)}
                      style={{
                        padding: 'var(--space-3)',
                        border: selectedTool === tool.id ? '2px solid #1976d2' : '1px solid #e1e4e8',
                        borderRadius: '8px',
                        background: selectedTool === tool.id ? '#e3f2fd' : 'white',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                      }}
                    >
                      <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{tool.name}</div>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>{tool.description}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedTool && steps.length > 0 && (
                  <>
                    <h3>Follow These Steps</h3>
                    <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', overflow: 'hidden' }}>
                      {steps.map((step, index) => (
                        <div
                          key={step.id}
                          style={{
                            padding: 'var(--space-3)',
                            borderBottom: index < steps.length - 1 ? '1px solid #e1e4e8' : 'none',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--space-2)',
                            cursor: 'pointer',
                            background: step.completed ? '#f0f7ff' : 'transparent',
                            transition: 'background 0.2s'
                          }}
                          onClick={() => toggleStep(step.id)}
                        >
                          <input
                            type="checkbox"
                            checked={step.completed}
                            onChange={() => {}}
                            style={{ marginTop: '4px', cursor: 'pointer' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              fontWeight: 600, 
                              marginBottom: '4px',
                              textDecoration: step.completed ? 'line-through' : 'none',
                              color: step.completed ? '#666' : '#000'
                            }}>
                              Step {index + 1}: {step.title}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#e8f5e9', borderRadius: '8px' }}>
                      <strong>💡 Tip:</strong>
                      <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
                        Click on each step to mark it as complete. Take your time and don't skip steps!
                      </p>
                    </div>
                  </>
                )}
              </article>
            )}
          </aside>
        </div>
      </section>
    </div>
  )
}
