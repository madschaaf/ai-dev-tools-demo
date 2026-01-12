import { useState } from 'react'

export default function UseCases() {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>('create-website')

  const useCases = [
    {
      id: 'create-website',
      name: 'Create a Website',
      description: 'Build a simple website from scratch',
      category: 'Web Development',
      aiTools: ['Cline', 'Copilot'],
      icon: '🌐',
      difficulty: 'Beginner'
    },
    {
      id: 'write-documentation',
      name: 'Write Project Documentation',
      description: 'Generate README files and project docs',
      category: 'Documentation',
      aiTools: ['Claude Code', 'ChatGPT'],
      icon: '📝',
      difficulty: 'Beginner'
    },
    {
      id: 'debug-code',
      name: 'Fix a Bug in Your Code',
      description: 'Find and fix errors with AI help',
      category: 'Debugging',
      aiTools: ['Cline', 'Copilot Chat'],
      icon: '🐛',
      difficulty: 'Beginner'
    },
    {
      id: 'create-component',
      name: 'Build a UI Component',
      description: 'Create buttons, forms, and other interface elements',
      category: 'Web Development',
      aiTools: ['Copilot', 'Cline'],
      icon: '🎨',
      difficulty: 'Beginner'
    },
    {
      id: 'analyze-data',
      name: 'Analyze Data Files',
      description: 'Process CSV files and create reports',
      category: 'Data Analysis',
      aiTools: ['Claude Code', 'ChatGPT'],
      icon: '📊',
      difficulty: 'Intermediate'
    },
    {
      id: 'search-codebase',
      name: 'Find Code Examples',
      description: 'Search for how something works in the codebase',
      category: 'Learning',
      aiTools: ['Glean', 'Copilot'],
      icon: '🔍',
      difficulty: 'Beginner'
    },
    {
      id: 'write-tests',
      name: 'Create Automated Tests',
      description: 'Generate tests for your code',
      category: 'Testing',
      aiTools: ['Copilot', 'Cline'],
      icon: '🧪',
      difficulty: 'Intermediate'
    },
    {
      id: 'improve-code',
      name: 'Make Code Better',
      description: 'Refactor and optimize existing code',
      category: 'Code Quality',
      aiTools: ['Copilot Chat', 'Cline'],
      icon: '⚡',
      difficulty: 'Intermediate'
    },
    {
      id: 'create-api',
      name: 'Build an API Endpoint',
      description: 'Create a backend service that handles requests',
      category: 'Backend',
      aiTools: ['Cline', 'Claude Code'],
      icon: '🔌',
      difficulty: 'Intermediate'
    },
    {
      id: 'generate-images',
      name: 'Create Graphics and Icons',
      description: 'Generate images, logos, and visual assets',
      category: 'Design',
      aiTools: ['Adobe Firefly', 'Gemini'],
      icon: '🖼️',
      difficulty: 'Beginner'
    }
  ]

  const useCaseContent: Record<string, { title: string; content: React.ReactElement }> = {
    'create-website': {
      title: 'Create a Website',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Create</h3>
            <p style={{ margin: 0 }}>A complete website with multiple pages, navigation, and styling</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>🌐</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: A personal portfolio, company site, or landing page
            </p>
          </div>

          <h3>What This Is</h3>
          <p>A website is a collection of pages that people can visit in their web browser. You'll learn how to create pages with text, images, links, and styling to make it look professional.</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Cline
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              GitHub Copilot
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code</strong> (Step 8)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>You need a code editor to write website code</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Cline</strong> (Step 13)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>AI assistant that can create website files for you</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code Extensions</strong> (Step 12)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Get Copilot to help write HTML, CSS, and JavaScript</p>
              </li>
              <li>
                <strong>Practice & Learn</strong> (Step 21)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Try the exercises to build your first website</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Ask Cline:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem' }}>
              "Create a simple website with a home page, about page, and contact page. Use HTML and CSS to make it look professional."
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Don't worry if you don't know HTML or CSS! The AI tools will write the code for you. You just need to describe what you want the website to look like.
            </p>
          </div>
        </>
      )
    },
    'write-documentation': {
      title: 'Write Project Documentation',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Create</h3>
            <p style={{ margin: 0 }}>Professional documentation that explains how to use your project</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>📝</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: README files, user guides, API documentation
            </p>
          </div>

          <h3>What This Is</h3>
          <p>Documentation explains how your project works so other people can use it. Think of it like an instruction manual for your code. Good documentation helps teammates understand your work and makes it easier for new people to get started.</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Claude Code
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              ChatGPT
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Cline
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Claude Code CLI</strong> (Step 5)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Terminal tool for generating documentation</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Chrome & AI Extensions</strong> (Step 3)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Get ChatGPT for writing and improving text</p>
              </li>
              <li>
                <strong>Install Cline</strong> (Step 12)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Automatically create README files in your projects</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Ask ChatGPT or Claude:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '12px' }}>
              "Write a README file for my project. It's a [describe your project]. Include installation instructions, how to use it, and examples."
            </code>
            <p style={{ margin: '12px 0 8px', fontWeight: 600, color: '#2e7d32' }}>Or ask Cline:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem' }}>
              "Create a README.md file that documents this project. Include what it does, how to install it, and usage examples."
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              The AI can write documentation in plain English that anyone can understand. Just describe your project in simple terms, and the AI will create professional documentation.
            </p>
          </div>
        </>
      )
    },
    'debug-code': {
      title: 'Fix a Bug in Your Code',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Do</h3>
            <p style={{ margin: 0 }}>Find and fix errors in your code with AI assistance</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>🐛</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: Fixing syntax errors, logic bugs, or crashes
            </p>
          </div>

          <h3>What This Is</h3>
          <p>A bug is when code doesn't work the way it should. Maybe your website shows an error, a button doesn't click, or the program crashes. AI tools can help you understand what's wrong and suggest fixes - even if you don't fully understand the error message!</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Copilot Chat
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Cline
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              ChatGPT
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code Extensions</strong> (Step 11)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Get Copilot Chat to ask questions about errors</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Chrome & AI Extensions</strong> (Step 3)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Use ChatGPT to explain error messages</p>
              </li>
              <li>
                <strong>Install Cline</strong> (Step 12)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Let Cline fix bugs automatically</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Copy the error message and ask Copilot Chat or ChatGPT:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '12px', whiteSpace: 'pre-wrap' }}>
              "I'm getting this error: [paste error message]. What does it mean and how do I fix it?"
            </code>
            <p style={{ margin: '12px 0 8px', fontWeight: 600, color: '#2e7d32' }}>Or ask Cline to fix it:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem' }}>
              "Fix the error on line 42 in App.tsx"
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Don't be afraid of error messages! Copy the entire error and paste it into an AI tool. The AI will explain what's wrong in simple language and tell you exactly how to fix it.
            </p>
          </div>
        </>
      )
    },
    'create-component': {
      title: 'Build a UI Component',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Create</h3>
            <p style={{ margin: 0 }}>Reusable interface elements like buttons, forms, cards, and menus</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>🎨</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: Login forms, navigation menus, product cards
            </p>
          </div>

          <h3>What This Is</h3>
          <p>A UI component is a building block for websites - like a button, form, or card. Components can be reused throughout your site to keep everything looking consistent. Think of them like LEGO pieces that you can combine to build complete pages.</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              GitHub Copilot
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Cline
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code</strong> (Step 8)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Code editor for creating components</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code Extensions</strong> (Step 11)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Copilot will autocomplete component code as you type</p>
              </li>
              <li>
                <strong>Install Cline</strong> (Step 12)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Create complete components from descriptions</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Ask Cline:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem' }}>
              "Create a React component called LoginForm with email and password fields, and a submit button. Style it to look modern and professional."
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              You can describe what you want in plain English! "I want a blue button that says 'Submit' and gets bigger when you hover over it" - the AI will turn that into code.
            </p>
          </div>
        </>
      )
    },
    'analyze-data': {
      title: 'Analyze Data Files',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Do</h3>
            <p style={{ margin: 0 }}>Process spreadsheets, create charts, and generate insights from data</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>📊</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: Sales reports, user analytics, survey results
            </p>
          </div>

          <h3>What This Is</h3>
          <p>Data analysis means looking at information (like numbers in a spreadsheet) and finding patterns or insights. AI can help you clean up messy data, create visualizations (charts and graphs), and even explain what the numbers mean.</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Claude Code
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              ChatGPT
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Claude Code CLI</strong> (Step 5)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Generate Python/JavaScript scripts for data analysis</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Node.js</strong> (Step 4)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Needed to run data processing scripts</p>
              </li>
              <li>
                <strong>Install Chrome & AI Extensions</strong> (Step 3)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>ChatGPT can analyze data and create charts</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Upload a CSV file to ChatGPT and ask:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '12px', whiteSpace: 'pre-wrap' }}>
              "Analyze this data and create a summary report with key findings. Include a chart showing the trends."
            </code>
            <p style={{ margin: '12px 0 8px', fontWeight: 600, color: '#2e7d32' }}>Or ask Claude Code:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem' }}>
              "Write a Python script that reads sales.csv and creates a bar chart of sales by month"
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              You don't need to know how to code! Just describe what you want to know about your data, and the AI will create the analysis for you.
            </p>
          </div>
        </>
      )
    },
    'search-codebase': {
      title: 'Find Code Examples',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Do</h3>
            <p style={{ margin: 0 }}>Search through code to understand how things work</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>🔍</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: Finding how login works, where data is stored
            </p>
          </div>

          <h3>What This Is</h3>
          <p>When working on a project, you often need to find where something is implemented or see examples of how to do something. AI tools can search through thousands of files instantly and explain what you find in simple terms.</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Glean
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Copilot Chat
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Chrome & AI Extensions</strong> (Step 3)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Get Glean to search eBay's codebase and documentation</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code Extensions</strong> (Step 11)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Use Copilot Chat to understand code in your current project</p>
              </li>
              <li>
                <strong>Configure MCPs</strong> (Step 16)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Connect AI tools to search company repositories</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Ask Glean:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '12px' }}>
              "How do we handle user authentication in our React apps?"
            </code>
            <p style={{ margin: '12px 0 8px', fontWeight: 600, color: '#2e7d32' }}>Or ask Copilot Chat in VS Code:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem' }}>
              "Explain how the login function works in this file"
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Instead of reading through hundreds of files, just ask the AI! It will find relevant code and explain how it works in language you can understand.
            </p>
          </div>
        </>
      )
    },
    'write-tests': {
      title: 'Create Automated Tests',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Create</h3>
            <p style={{ margin: 0 }}>Automated tests that check if your code works correctly</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>🧪</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: Unit tests, integration tests, end-to-end tests
            </p>
          </div>

          <h3>What This Is</h3>
          <p>Tests are code that automatically checks if your other code works right. Instead of manually clicking every button to see if it works, tests do it for you. This helps catch bugs before users find them!</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              GitHub Copilot
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Cline
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code Extensions</strong> (Step 11)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Copilot can generate tests as you write code</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Cline</strong> (Step 12)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Create complete test suites from descriptions</p>
              </li>
              <li>
                <strong>Install Node.js</strong> (Step 4)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Needed to run test frameworks</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Ask Cline:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem' }}>
              "Create unit tests for the UserCard component. Test that it displays the user's name and email correctly."
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Think of tests as robot assistants that check your work. Just describe what should happen ("when I click the button, it should save the data") and the AI will create tests that verify it!
            </p>
          </div>
        </>
      )
    },
    'improve-code': {
      title: 'Make Code Better',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Do</h3>
            <p style={{ margin: 0 }}>Improve existing code to make it faster, cleaner, and easier to understand</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>⚡</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: Refactoring, optimization, code cleanup
            </p>
          </div>

          <h3>What This Is</h3>
          <p>Refactoring means improving code without changing what it does. Maybe the code works but it's messy, slow, or hard to understand. AI can help reorganize it to be cleaner, faster, and follow best practices.</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Copilot Chat
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Cline
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code</strong> (Step 8)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>You need VS Code to work with code</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Node.js</strong> (Step 5)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Required for Cline to run</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install VS Code Extensions</strong> (Step 12)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Copilot Chat can suggest improvements</p>
              </li>
              <li>
                <strong>Install Cline</strong> (Step 13)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Automatically refactor code</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Select code in VS Code, right-click, and ask Copilot Chat:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '12px' }}>
              "How can I improve this code? Make it more efficient and easier to read."
            </code>
            <p style={{ margin: '12px 0 8px', fontWeight: 600, color: '#2e7d32' }}>Or ask Cline:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem' }}>
              "Refactor this function to follow best practices and improve performance"
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Even if your code works, AI can show you better ways to write it. This helps you learn programming best practices without having to memorize them!
            </p>
          </div>
        </>
      )
    },
    'create-api': {
      title: 'Build an API Endpoint',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Create</h3>
            <p style={{ margin: 0 }}>A backend service that handles data requests from your frontend</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>🔌</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: User login, save data, fetch products
            </p>
          </div>

          <h3>What This Is</h3>
          <p>An API (Application Programming Interface) is like a waiter at a restaurant - it takes requests from your website (the customer) and brings back data from your database (the kitchen). For example, when you log in to a website, an API checks your password.</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Cline
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Claude Code
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Node.js</strong> (Step 5)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Required to run backend JavaScript code</p>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Install Claude Code CLI</strong> (Step 6)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Generate API code in the terminal</p>
              </li>
              <li>
                <strong>Install Cline</strong> (Step 13)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Create complete API services</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Ask Cline:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
              "Create an Express.js API endpoint that handles user registration. It should accept email and password, validate the input, and save to a database."
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              APIs sound complicated, but they're just code that handles requests. Describe what data you want to send and receive, and the AI will create the backend code for you!
            </p>
          </div>
        </>
      )
    },
    'generate-images': {
      title: 'Create Graphics and Icons',
      content: (
        <>
          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>What You'll Create</h3>
            <p style={{ margin: 0 }}>Custom images, icons, logos, and visual assets for your projects</p>
          </div>

          <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: 'var(--space-2)' }}>🖼️</div>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Example: App icons, hero images, illustrations
            </p>
          </div>

          <h3>What This Is</h3>
          <p>AI image generation tools can create custom graphics based on text descriptions. Instead of hiring a designer or searching for stock images, you can generate exactly what you need by describing it in words.</p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Which AI Tools to Use</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Adobe Firefly
            </span>
            <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Google Gemini
            </span>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Steps from the Getting Started Guide</h3>
          <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong>Request Access</strong> (Step 3)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Request Adobe Creative Cloud access for Firefly</p>
              </li>
              <li>
                <strong>Install Chrome & AI Extensions</strong> (Step 4)
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Access Google Gemini for image generation</p>
              </li>
            </ol>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>How to Get Started</h3>
          <div style={{ background: '#e8f5e9', padding: 'var(--space-3)', borderRadius: '8px', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#2e7d32' }}>Open Adobe Firefly or Gemini and describe what you want:</p>
            <code style={{ display: 'block', background: '#fff', padding: 'var(--space-2)', borderRadius: '4px', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
              "Create a minimalist app icon for a task management app. Use blue and white colors. Modern, clean design. Square format."
            </code>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <strong>💡 Beginner Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              The more specific you are in your description, the better the result! Include details about colors, style (modern, vintage, cartoonish), and what the image should show.
            </p>
          </div>
        </>
      )
    }
  }

  const categories = Array.from(new Set(useCases.map(uc => uc.category)))

  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Use Cases</h1>
          <p className="subtitle">Discover what you can build with AI tools - no coding experience required!</p>
        </header>

        <section className="quick-links-section hero">
          <div className="hero-overlay quick-links-layout">
            <div className="quick-links-column">
              <h2>What Can You Build?</h2>
              <p className="muted">Click any card to see what's possible, which AI tools to use, and step-by-step guidance.</p>

              <div className="quick-links-list">
                {categories.map((category) => (
                  <section key={category} className="quick-links-group">
                    <h3 className="quick-links-group-title">{category}</h3>
                    <ul className="quick-links-items">
                      {useCases.filter(uc => uc.category === category).map((useCase) => (
                        <li key={useCase.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedUseCase(useCase.id)}
                            className={`quick-link-row ${selectedUseCase === useCase.id ? 'active' : ''}`}
                          >
                            <span style={{ fontSize: '2rem', marginRight: 'var(--space-2)' }}>{useCase.icon}</span>
                            <span className="quick-link-row-main">
                              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', width: '100%' }}>
                                <span className="quick-link-name">{useCase.name}</span>
                                <span style={{ 
                                  display: 'flex', 
                                  gap: '4px', 
                                  flexShrink: 0,
                                  fontSize: '0.7rem',
                                  opacity: 0.8
                                }}>
                                  {useCase.aiTools.map((tool, idx) => (
                                    <span 
                                      key={idx}
                                      style={{
                                        background: selectedUseCase === useCase.id ? 'rgba(255,255,255,0.2)' : '#e3f2fd',
                                        color: selectedUseCase === useCase.id ? 'white' : '#1976d2',
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
                              </span>
                              <span className="quick-link-desc">
                                {useCase.description}
                                <span style={{ 
                                  marginLeft: '8px',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  background: useCase.difficulty === 'Beginner' ? '#d4edda' : '#fff3cd',
                                  color: useCase.difficulty === 'Beginner' ? '#155724' : '#856404',
                                  fontWeight: 500
                                }}>
                                  {useCase.difficulty}
                                </span>
                              </span>
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
              {selectedUseCase ? (
                <article className="page link-detail">
                  {useCaseContent[selectedUseCase]?.content}
                </article>
              ) : (
                <div className="link-detail placeholder">
                  <h2>Select a Use Case</h2>
                  <p className="muted small">Pick any card on the left to see what you can create with AI tools.</p>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
    </>
  )
}
