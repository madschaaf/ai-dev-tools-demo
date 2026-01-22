import { useState, useMemo } from 'react'

// Import complete Step types and mock data from ReviewStepsLibrary
// In a real app, this would be from a shared data source
interface StepComment {
  id: string
  userId: string
  userName: string
  content: string
  timestamp: Date
  lineNumber?: number
}

interface StepHistory {
  date: Date
  modifiedBy: string
  titleChange?: string
  columnChange?: string
  action: string
}

interface StepApproval {
  userId: string
  userName: string
  timestamp: Date
  useCaseIds: string[]
}

interface Step {
  id: string
  title: string
  description: string
  content: string
  previousContent?: string
  author: string
  authorId: string
  createdDate: Date
  lastModified: Date
  status: 'review' | 'clarification' | 'approved' | 'rejected'
  tags: string[]
  language: string
  ide: string[]
  category: string[]
  useCaseIds: string[]
  approvals: StepApproval[]
  comments: StepComment[]
  history: StepHistory[]
  rejectionReason?: string
}

// Extended interface for step versions
interface StepVersion {
  versionId: string
  useCaseId: string | null
  useCaseName: string
  author: string
  authorId: string
  content: string
  previousContent?: string
  lastModified: Date
  status: 'review' | 'clarification' | 'approved' | 'rejected'
  isBaseVersion: boolean
  hasEdits: boolean
}

// Mock step versions - simulating different edits for different use cases
const mockStepVersions: { [stepId: string]: StepVersion[] } = {
  'STEP001': [
    {
      versionId: 'STEP001-UC001',
      useCaseId: 'UC001',
      useCaseName: 'Frontend Developer Onboarding',
      author: 'Jack Doe',
      authorId: 'user001',
      content: `// Installation steps - Jack's Version for Frontend
1. Visit https://code.visualstudio.com
2. Download for your OS (Mac/Windows/Linux)
3. Run installer
4. Verify installation: code --version
5. Configure user settings for frontend development
6. Install recommended extensions for React`,
      previousContent: `// Installation steps
1. Visit https://code.visualstudio.com
2. Download for your OS
3. Run installer`,
      lastModified: new Date('2026-01-20'),
      status: 'review',
      isBaseVersion: false,
      hasEdits: true
    },
    {
      versionId: 'STEP001-UC002',
      useCaseId: 'UC002',
      useCaseName: 'Backend Developer Setup',
      author: 'Molly Smith',
      authorId: 'user004',
      content: `// Installation steps - Molly's Version for Backend
1. Visit https://code.visualstudio.com
2. Download for your OS (Mac/Windows/Linux)
3. Run installer
4. Verify installation: code --version
5. Configure user settings for backend development
6. Install Python extensions
7. Setup debugging configurations for Python/Node`,
      previousContent: `// Installation steps
1. Visit https://code.visualstudio.com
2. Download for your OS
3. Run installer`,
      lastModified: new Date('2026-01-18'),
      status: 'review',
      isBaseVersion: false,
      hasEdits: true
    },
    {
      versionId: 'STEP001-UC003',
      useCaseId: 'UC003',
      useCaseName: 'AI Tools Integration',
      author: null as any,
      authorId: null as any,
      content: `// Installation steps
1. Visit https://code.visualstudio.com
2. Download for your OS
3. Run installer`,
      lastModified: new Date('2026-01-15'),
      status: 'approved',
      isBaseVersion: true,
      hasEdits: false
    }
  ]
}

// Mock steps data with multiple versions
const mockSteps: Step[] = [
  {
    id: 'STEP001',
    title: 'Install VS Code',
    description: 'Download and install Visual Studio Code',
    previousContent: `// Installation steps
1. Visit https://code.visualstudio.com
2. Download for your OS
3. Run installer`,
    content: `// Installation steps - Jack's Version for Frontend
1. Visit https://code.visualstudio.com
2. Download for your OS (Mac/Windows/Linux)
3. Run installer
4. Verify installation: code --version
5. Configure user settings for frontend development
6. Install recommended extensions for React`,
    author: 'Jack Doe',
    authorId: 'user001',
    createdDate: new Date('2026-01-15'),
    lastModified: new Date('2026-01-20'),
    status: 'review',
    tags: ['installation', 'ide', 'required'],
    language: 'markdown',
    ide: ['VS Code'],
    category: ['front-end', 'back-end'],
    useCaseIds: ['UC001', 'UC002', 'UC003'],
    approvals: [],
    comments: [],
    history: [
      {
        date: new Date('2026-01-15'),
        modifiedBy: 'Jack Doe',
        action: 'Created',
        columnChange: 'review'
      }
    ]
  },
  {
    id: 'STEP002',
    title: 'Configure Git',
    description: 'Set up Git configuration for development',
    content: `# Git Configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@ebay.com"
git config --global core.autocrlf input`,
    author: 'Jane Smith',
    authorId: 'user002',
    createdDate: new Date('2026-01-10'),
    lastModified: new Date('2026-01-18'),
    status: 'approved',
    tags: ['git', 'configuration', 'required'],
    language: 'bash',
    ide: ['VS Code', 'Terminal'],
    category: ['front-end', 'back-end', 'database'],
    useCaseIds: ['UC001', 'UC002'],
    approvals: [
      {
        userId: 'user003',
        userName: 'Bob Johnson (AI Team)',
        timestamp: new Date('2026-01-17'),
        useCaseIds: []
      }
    ],
    comments: [],
    history: [
      {
        date: new Date('2026-01-10'),
        modifiedBy: 'Jane Smith',
        action: 'Created',
        columnChange: 'review'
      },
      {
        date: new Date('2026-01-17'),
        modifiedBy: 'Bob Johnson (AI Team)',
        action: 'Approved by AI Team Member'
      },
      {
        date: new Date('2026-01-17'),
        modifiedBy: 'Bob Johnson (AI Team)',
        action: 'Step Approved',
        columnChange: 'approved'
      }
    ]
  },
  {
    id: 'STEP003',
    title: 'Install Python',
    description: 'Install Python 3.12+ for development',
    content: `# Python Installation
## Mac
brew install python@3.12

## Windows
winget install Python.Python.3.12

## Verify
python --version`,
    author: 'Bob Johnson',
    authorId: 'user003',
    createdDate: new Date('2026-01-12'),
    lastModified: new Date('2026-01-19'),
    status: 'clarification',
    tags: ['installation', 'python', 'optional'],
    language: 'markdown',
    ide: ['Terminal'],
    category: ['back-end'],
    useCaseIds: ['UC001'],
    approvals: [],
    comments: [
      {
        id: 'c2',
        userId: 'user001',
        userName: 'John Doe',
        content: 'Should we add virtual environment setup?',
        timestamp: new Date('2026-01-19'),
        lineNumber: 3
      },
      {
        id: 'c3',
        userId: 'user003',
        userName: 'Bob Johnson',
        content: 'Good point! I will add that section.',
        timestamp: new Date('2026-01-19')
      }
    ],
    history: [
      {
        date: new Date('2026-01-12'),
        modifiedBy: 'Bob Johnson',
        action: 'Created',
        columnChange: 'review'
      },
      {
        date: new Date('2026-01-19'),
        modifiedBy: 'John Doe',
        action: 'Needs Clarification',
        columnChange: 'clarification'
      }
    ]
  }
]

// Types
interface UseCaseComment {
  id: string
  userId: string
  userName: string
  content: string
  timestamp: Date
}

interface UseCaseHistory {
  date: Date
  modifiedBy: string
  action: string
  columnChange?: string
}

interface UseCaseApproval {
  userId: string
  userName: string
  timestamp: Date
}

interface UseCase {
  id: string
  title: string
  description: string
  content: string
  steps: string[]
  stepLastModified: { [stepId: string]: Date } // Track when steps were added to this use case
  author: string
  authorId: string
  createdDate: Date
  lastModified: Date
  status: 'review' | 'clarification' | 'approved' | 'rejected'
  tags: string[]
  category: string[]
  approval: UseCaseApproval | null
  comments: UseCaseComment[]
  history: UseCaseHistory[]
  rejectionReason?: string
}

// Mock Data
const mockUseCases: UseCase[] = [
  {
    id: 'UC001',
    title: 'Frontend Developer Onboarding',
    description: 'Complete setup for new frontend developers including IDE, tools, and essential configurations',
    content: `# Frontend Developer Onboarding

## Overview
This use case guides new frontend developers through the complete setup process.

## Prerequisites
- Access to eBay GitHub Enterprise
- Local admin access on machine
- Active eBay email account

## Steps Included
1. Install VS Code
2. Configure Git
3. Install Node.js
4. Setup GitHub Copilot
5. Configure ESLint and Prettier

## Expected Outcome
Developer has a fully configured frontend development environment ready for contribution.`,
    steps: ['STEP001', 'STEP002', 'STEP003', 'STEP004', 'STEP005'],
    stepLastModified: {
      'STEP001': new Date('2026-01-15'), // Step was modified AFTER being added to use case
      'STEP002': new Date('2026-01-18'),
      'STEP003': new Date('2026-01-15')
    },
    author: 'Sarah Johnson',
    authorId: 'user001',
    createdDate: new Date('2026-01-15'),
    lastModified: new Date('2026-01-20'),
    status: 'review',
    tags: ['onboarding', 'frontend', 'required'],
    category: ['front-end'],
    approval: null,
    comments: [],
    history: [
      {
        date: new Date('2026-01-15'),
        modifiedBy: 'Sarah Johnson',
        action: 'Created',
        columnChange: 'review'
      }
    ]
  },
  {
    id: 'UC002',
    title: 'Backend Developer Setup',
    description: 'Backend development environment configuration with Python, Docker, and database tools',
    content: `# Backend Developer Setup

## Overview
Complete backend development environment setup for Python and Node.js projects.

## Prerequisites
- Access to internal package repositories
- Docker Desktop license
- Database access credentials

## Steps Included
1. Install Python 3.12+
2. Configure Git
3. Setup Docker
4. Install Database Tools
5. Configure API Testing Tools

## Expected Outcome
Developer can run and test backend services locally with all necessary tools configured.`,
    steps: ['STEP002', 'STEP003', 'STEP006', 'STEP007'],
    stepLastModified: {
      'STEP002': new Date('2026-01-18'),
      'STEP003': new Date('2026-01-15')
    },
    author: 'Mike Chen',
    authorId: 'user002',
    createdDate: new Date('2026-01-10'),
    lastModified: new Date('2026-01-18'),
    status: 'approved',
    tags: ['onboarding', 'backend', 'required'],
    category: ['back-end'],
    approval: {
      userId: 'user003',
      userName: 'Bob Johnson (AI Team)',
      timestamp: new Date('2026-01-17')
    },
    comments: [],
    history: [
      {
        date: new Date('2026-01-10'),
        modifiedBy: 'Mike Chen',
        action: 'Created',
        columnChange: 'review'
      },
      {
        date: new Date('2026-01-17'),
        modifiedBy: 'Bob Johnson (AI Team)',
        action: 'Approved by AI Team',
        columnChange: 'approved'
      }
    ]
  },
  {
    id: 'UC003',
    title: 'AI Tools Integration',
    description: 'Setup AI coding assistants and MCP tools for enhanced development',
    content: `# AI Tools Integration

## Overview
Configure Claude, GitHub Copilot, and MCP servers for AI-assisted development.

## Prerequisites
- Active AI tools license
- VS Code installed
- GitHub Enterprise access

## Steps Included
1. Install Claude Desktop
2. Setup GitHub Copilot
3. Configure MCP Servers
4. Install Cline Extension

## Expected Outcome
Developer has access to all AI coding assistants with proper MCP integration.`,
    steps: ['STEP008', 'STEP009', 'STEP010'],
    stepLastModified: {},
    author: 'Emily Rodriguez',
    authorId: 'user004',
    createdDate: new Date('2026-01-12'),
    lastModified: new Date('2026-01-19'),
    status: 'clarification',
    tags: ['ai-tools', 'optional', 'advanced'],
    category: ['ai', 'tools'],
    approval: null,
    comments: [
      {
        id: 'uc1',
        userId: 'user003',
        userName: 'Bob Johnson (AI Team)',
        content: 'Please add more details about MCP server configuration. What servers should be included by default?',
        timestamp: new Date('2026-01-19')
      }
    ],
    history: [
      {
        date: new Date('2026-01-12'),
        modifiedBy: 'Emily Rodriguez',
        action: 'Created',
        columnChange: 'review'
      },
      {
        date: new Date('2026-01-19'),
        modifiedBy: 'Bob Johnson (AI Team)',
        action: 'Needs Clarification',
        columnChange: 'clarification'
      }
    ]
  },
  {
    id: 'UC004',
    title: 'Legacy System Migration (Outdated)',
    description: 'Old migration guide that is no longer relevant',
    content: `# Legacy System Migration

This guide is outdated...`,
    steps: ['STEP011', 'STEP012'],
    stepLastModified: {},
    author: 'John Smith',
    authorId: 'user005',
    createdDate: new Date('2026-01-05'),
    lastModified: new Date('2026-01-08'),
    status: 'rejected',
    tags: ['migration', 'outdated'],
    category: ['legacy'],
    approval: null,
    comments: [],
    history: [
      {
        date: new Date('2026-01-05'),
        modifiedBy: 'John Smith',
        action: 'Created',
        columnChange: 'review'
      },
      {
        date: new Date('2026-01-08'),
        modifiedBy: 'Bob Johnson (AI Team)',
        action: 'Rejected',
        columnChange: 'rejected'
      }
    ],
    rejectionReason: 'This migration path is no longer supported. Please create a new use case with the current migration approach.'
  }
]

export default function UseCaseLibrary({ onSwitchToSteps }: { onSwitchToSteps?: () => void }) {
  const [useCases, setUseCases] = useState<UseCase[]>(mockUseCases)
  const [steps, setSteps] = useState<Step[]>(mockSteps)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null)
  const [selectedStepForModal, setSelectedStepForModal] = useState<Step | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showStepModal, setShowStepModal] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showCommentSection, setShowCommentSection] = useState(false)

  // Current user (mock) - AI team member who can approve
  const currentUser = { id: 'user003', name: 'Bob Johnson (AI Team)' }

  // Get unique values for filters
  const allTags = useMemo(() => 
    Array.from(new Set(useCases.flatMap(uc => uc.tags))).sort(),
    [useCases]
  )
  
  const allCategories = useMemo(() => 
    Array.from(new Set(useCases.flatMap(uc => uc.category))).sort(),
    [useCases]
  )

  // Filter use cases
  const filteredUseCases = useMemo(() => {
    return useCases.filter(useCase => {
      const matchesSearch = searchTerm === '' || 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => useCase.tags.includes(tag))
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(cat => useCase.category.includes(cat))

      return matchesSearch && matchesTags && matchesCategory
    })
  }, [useCases, searchTerm, selectedTags, selectedCategories])

  // Group use cases by status and sort by lastModified
  const useCasesByStatus = useMemo(() => {
    const sortByLastModified = (useCases: UseCase[]) => 
      [...useCases].sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
    
    return {
      review: sortByLastModified(filteredUseCases.filter(uc => uc.status === 'review')),
      clarification: sortByLastModified(filteredUseCases.filter(uc => uc.status === 'clarification')),
      approved: sortByLastModified(filteredUseCases.filter(uc => uc.status === 'approved')),
      rejected: sortByLastModified(filteredUseCases.filter(uc => uc.status === 'rejected'))
    }
  }, [filteredUseCases])

  // Handlers
  const handleApprove = (useCase: UseCase) => {
    if (useCase.approval) {
      alert('This use case has already been approved')
      return
    }

    if (useCase.authorId === currentUser.id) {
      alert('You cannot approve your own use case')
      return
    }

    const newApproval: UseCaseApproval = {
      userId: currentUser.id,
      userName: currentUser.name,
      timestamp: new Date()
    }

    const updatedUseCase = {
      ...useCase,
      approval: newApproval,
      status: 'approved' as const,
      history: [...useCase.history, {
        date: new Date(),
        modifiedBy: currentUser.name,
        action: 'Approved by AI Team',
        columnChange: 'approved'
      }]
    }

    updateUseCase(updatedUseCase)
  }

  const handleNeedsClarification = () => {
    setShowCommentSection(true)
  }

  const handleReject = (useCase: UseCase) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a justification for rejection')
      return
    }

    const updatedUseCase = {
      ...useCase,
      status: 'rejected' as const,
      rejectionReason: rejectionReason,
      history: [...useCase.history, {
        date: new Date(),
        modifiedBy: currentUser.name,
        action: 'Rejected',
        columnChange: 'rejected'
      }]
    }
    updateUseCase(updatedUseCase)
    setRejectionReason('')
    console.log(`Email sent to ${useCase.author} about rejection: ${rejectionReason}`)
  }

  const handleAddComment = (useCase: UseCase) => {
    if (!newComment.trim()) return

    const now = new Date()
    const comment: UseCaseComment = {
      id: `uc${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      content: newComment,
      timestamp: now
    }

    const updatedUseCase = {
      ...useCase,
      comments: [...useCase.comments, comment],
      lastModified: now,
      status: 'clarification' as const,
      history: [...useCase.history, {
        date: now,
        modifiedBy: currentUser.name,
        action: 'Added comment'
      }, {
        date: now,
        modifiedBy: currentUser.name,
        action: 'Needs Clarification',
        columnChange: 'clarification'
      }]
    }

    updateUseCase(updatedUseCase)
    setNewComment('')
    setShowCommentSection(false)
    console.log(`Email sent to ${useCase.author} about new comment`)
  }

  const updateUseCase = (updatedUseCase: UseCase) => {
    setUseCases(prev => prev.map(uc => uc.id === updatedUseCase.id ? updatedUseCase : uc))
    setSelectedUseCase(updatedUseCase)
  }

  const openUseCaseModal = (useCase: UseCase) => {
    setSelectedUseCase(useCase)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUseCase(null)
    setRejectionReason('')
    setNewComment('')
    setShowCommentSection(false)
  }

  const openStepModal = (stepId: string) => {
    const step = steps.find(s => s.id === stepId)
    if (step) {
      setSelectedStepForModal(step)
      setShowStepModal(true)
    }
  }

  const closeStepModal = () => {
    setShowStepModal(false)
    setSelectedStepForModal(null)
  }

  const handleStepComment = (step: Step, comment: string) => {
    if (!comment.trim()) return

    const now = new Date()
    const newStepComment = {
      id: `sc${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      content: comment,
      timestamp: now
    }

    // Update step status to clarification
    const updatedStep = {
      ...step,
      status: 'clarification' as const,
      lastModified: now
    }

    setSteps(prev => prev.map(s => s.id === step.id ? updatedStep : s))
    setSelectedStepForModal(updatedStep)

    // Also move the use case to clarification if it's currently in review
    if (selectedUseCase && selectedUseCase.steps.includes(step.id)) {
      const updatedUseCase = {
        ...selectedUseCase,
        status: 'clarification' as const,
        lastModified: now,
        history: [...selectedUseCase.history, {
          date: now,
          modifiedBy: currentUser.name,
          action: `Added comment to step ${step.id}`,
          columnChange: 'clarification'
        }]
      }
      updateUseCase(updatedUseCase)
    }

    console.log(`Step ${step.id} moved to clarification, use case also moved to clarification`)
  }

  // Check if a step has been modified after being added to a use case
  const isStepModified = (useCase: UseCase, stepId: string): boolean => {
    const step = steps.find(s => s.id === stepId)
    if (!step || !useCase.stepLastModified[stepId]) return false
    
    return step.lastModified > useCase.stepLastModified[stepId]
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Toggle Between Libraries */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'inline-flex',
          background: '#f3f4f6',
          borderRadius: 'var(--radius-lg)',
          padding: '0.25rem',
          gap: '0.25rem'
        }}>
          <button
            onClick={onSwitchToSteps}
            style={{
              padding: '0.75rem 2rem',
              background: 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: onSwitchToSteps ? 'pointer' : 'default',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#6b7280',
              transition: 'all 0.2s'
            }}
          >
            📝 Review Steps
          </button>
          <button
            disabled
            style={{
              padding: '0.75rem 2rem',
              background: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'default',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
          >
            📋 Review Use Cases
          </button>
        </div>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Review Submissions - Use Cases</h1>
        <p style={{ color: 'var(--color-neutral-700)' }}>
          AI team review interface for approving complete use case submissions
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{ 
        background: '#fff', 
        padding: '1.5rem', 
        borderRadius: 'var(--radius-md)', 
        border: '1px solid #e1e4e8',
        marginBottom: '2rem'
      }}>
        {/* Search */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search by title, use case ID, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Tags */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
              Tags
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTags(prev => 
                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                  )}
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    border: '1px solid',
                    borderColor: selectedTags.includes(tag) ? 'var(--color-primary)' : '#d1d5db',
                    background: selectedTags.includes(tag) ? 'var(--color-primary)' : '#fff',
                    color: selectedTags.includes(tag) ? '#fff' : '#374151',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
              Category
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategories(prev => 
                    prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                  )}
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    border: '1px solid',
                    borderColor: selectedCategories.includes(cat) ? 'var(--color-primary)' : '#d1d5db',
                    background: selectedCategories.includes(cat) ? 'var(--color-primary)' : '#fff',
                    color: selectedCategories.includes(cat) ? '#fff' : '#374151',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedTags.length > 0 || selectedCategories.length > 0 || searchTerm) && (
          <button
            onClick={() => {
              setSelectedTags([])
              setSelectedCategories([])
              setSearchTerm('')
            }}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#fff',
              border: '1px solid #d1d5db',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Kanban Board */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <KanbanColumn
          title="For Review"
          count={useCasesByStatus.review.length}
          color="#3b82f6"
          useCases={useCasesByStatus.review}
          onUseCaseClick={openUseCaseModal}
        />

        <KanbanColumn
          title="Needs Clarification"
          count={useCasesByStatus.clarification.length}
          color="#f59e0b"
          useCases={useCasesByStatus.clarification}
          onUseCaseClick={openUseCaseModal}
        />

        <KanbanColumn
          title="Approved"
          count={useCasesByStatus.approved.length}
          color="#10b981"
          useCases={useCasesByStatus.approved}
          onUseCaseClick={openUseCaseModal}
        />

        <KanbanColumn
          title="Rejected"
          count={useCasesByStatus.rejected.length}
          color="#ef4444"
          useCases={useCasesByStatus.rejected}
          onUseCaseClick={openUseCaseModal}
        />
      </div>

      {/* Use Case Detail Modal */}
      {showModal && selectedUseCase && (
        <UseCaseModal
          useCase={selectedUseCase}
          currentUser={currentUser}
          steps={steps}
          showHistoryModal={showHistoryModal}
          setShowHistoryModal={setShowHistoryModal}
          showCommentSection={showCommentSection}
          closeModal={closeModal}
          handleApprove={handleApprove}
          handleNeedsClarification={handleNeedsClarification}
          handleReject={handleReject}
          handleAddComment={handleAddComment}
          newComment={newComment}
          setNewComment={setNewComment}
          rejectionReason={rejectionReason}
          setRejectionReason={setRejectionReason}
          isStepModified={isStepModified}
          openStepModal={openStepModal}
        />
      )}

      {/* Step Detail Modal (overlays on top of Use Case Modal) */}
      {showStepModal && selectedStepForModal && (
        <StepModalOverlay
          step={selectedStepForModal}
          currentUser={currentUser}
          closeStepModal={closeStepModal}
          handleStepComment={handleStepComment}
        />
      )}
    </div>
  )
}

// Use Case Modal Component
function UseCaseModal({ 
  useCase, 
  currentUser,
  steps,
  showHistoryModal, 
  setShowHistoryModal,
  showCommentSection,
  closeModal,
  handleApprove,
  handleNeedsClarification,
  handleReject,
  handleAddComment,
  newComment,
  setNewComment,
  setRejectionReason,
  isStepModified,
  openStepModal
}: any) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e1e4e8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ margin: 0 }}>{useCase.title}</h2>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              background: getStatusColor(useCase.status),
              color: '#fff'
            }}>
              {useCase.status.toUpperCase()}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setShowHistoryModal(!showHistoryModal)}
              style={{
                padding: '0.5rem 1rem',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              📜 History
            </button>
            <button
              onClick={closeModal}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* History Modal */}
        {showHistoryModal && (
          <div style={{
            position: 'absolute',
            top: '4rem',
            right: '2rem',
            background: '#fff',
            border: '1px solid #e1e4e8',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            maxWidth: '400px',
            maxHeight: '400px',
            overflow: 'auto',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 1001
          }}>
            <h3 style={{ marginTop: 0 }}>History</h3>
            {useCase.history.map((h: any, idx: number) => (
              <div key={idx} style={{
                padding: '0.75rem',
                borderBottom: idx < useCase.history.length - 1 ? '1px solid #e1e4e8' : 'none'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{h.action}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {h.modifiedBy} • {h.date.toLocaleDateString()}
                </div>
                {h.columnChange && (
                  <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '0.25rem' }}>
                    → {h.columnChange}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div style={{
          padding: '1.5rem',
          overflow: 'auto',
          flex: 1
        }}>
          {/* Metadata */}
          <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <div><strong>ID:</strong> {useCase.id}</div>
            <div><strong>Author:</strong> {useCase.author}</div>
            <div><strong>Created:</strong> {useCase.createdDate.toLocaleDateString()}</div>
            <div><strong>Last Modified:</strong> {useCase.lastModified.toLocaleDateString()}</div>
            <div><strong>Steps Included:</strong> {useCase.steps.length}</div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Description</h3>
            <p>{useCase.description}</p>
          </div>

          {/* Content Preview */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Use Case Content</h3>
            <pre style={{
              background: '#f6f8fa',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              overflow: 'auto',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxHeight: '400px'
            }}>
              {useCase.content}
            </pre>
          </div>

          {/* Steps List */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Included Steps ({useCase.steps.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {useCase.steps.map((stepId: string, idx: number) => {
                const step = steps.find((s: Step) => s.id === stepId)
                const stepModified = isStepModified(useCase, stepId)
                const needsApproval = step && (step.status === 'review' || step.status === 'clarification')
                
                return (
                  <div
                    key={stepId}
                    style={{
                      padding: '0.75rem',
                      background: stepModified ? '#fef2f2' : '#f9fafb',
                      border: `1px solid ${stepModified ? '#fecaca' : '#e1e4e8'}`,
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                          {idx + 1}. {step ? step.title : `Step ${stepId}`}
                        </div>
                        {stepModified && (
                          <div style={{ 
                            fontSize: '0.75rem', 
                            color: '#dc2626',
                            fontWeight: 600,
                            marginBottom: '0.25rem'
                          }}>
                            ⚠️ This step has been modified and needs approval
                          </div>
                        )}
                        {step && (
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            Status: <span style={{ 
                              color: step.status === 'approved' ? '#10b981' : 
                                     step.status === 'review' ? '#3b82f6' :
                                     step.status === 'clarification' ? '#f59e0b' : '#ef4444'
                            }}>
                              {step.status}
                            </span>
                          </div>
                        )}
                      </div>
                      {step && (stepModified || needsApproval) && (
                        <button
                          onClick={() => openStepModal(stepId)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: stepModified ? '#dc2626' : '#3b82f6',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          📝 Review Step
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Rejection Reason */}
          {useCase.status === 'rejected' && useCase.rejectionReason && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ marginTop: 0, color: '#991b1b' }}>Rejection Reason</h4>
              <p style={{ margin: 0 }}>{useCase.rejectionReason}</p>
            </div>
          )}

          {/* Approval */}
          {useCase.approval && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Approval</h3>
              <div style={{
                background: '#f0fdf4',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}>
                ✓ <strong>{useCase.approval.userName}</strong> approved on {useCase.approval.timestamp.toLocaleDateString()}
              </div>
            </div>
          )}

          {/* Comments */}
          {(useCase.status === 'clarification' || showCommentSection) && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Comments ({useCase.comments.length})</h3>
              
              {/* Existing Comments */}
              {useCase.comments.map((comment: UseCaseComment) => (
                <div key={comment.id} style={{
                  background: '#f9fafb',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {comment.userName}
                    <span style={{ fontWeight: 400, color: '#6b7280', marginLeft: '0.5rem' }}>
                      {comment.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem' }}>{comment.content}</div>
                </div>
              ))}

              {/* Add Comment */}
              <div style={{ marginTop: '1rem' }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    resize: 'vertical'
                  }}
                />
                <button
                  onClick={() => handleAddComment(useCase)}
                  disabled={!newComment.trim()}
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: newComment.trim() ? 'var(--color-primary)' : '#d1d5db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '0.875rem'
                  }}
                >
                  Add Comment
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {useCase.status !== 'approved' && useCase.status !== 'rejected' && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e1e4e8'
            }}>
              <button
                onClick={() => handleApprove(useCase)}
                disabled={useCase.authorId === currentUser.id || useCase.approval !== null}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: useCase.authorId === currentUser.id || useCase.approval !== null ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  opacity: useCase.authorId === currentUser.id || useCase.approval !== null ? 0.5 : 1
                }}
              >
                ✓ Approve
              </button>

              <button
                onClick={() => handleNeedsClarification(useCase)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#f59e0b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                ⚠ Need Clarification
              </button>

              <button
                onClick={() => {
                  const reason = prompt('Please provide a justification for rejection:')
                  if (reason) {
                    setRejectionReason(reason)
                    handleReject(useCase)
                  }
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                ✕ Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Kanban Column Component
function KanbanColumn({ 
  title, 
  count, 
  color, 
  useCases, 
  onUseCaseClick 
}: { 
  title: string
  count: number
  color: string
  useCases: UseCase[]
  onUseCaseClick: (useCase: UseCase) => void
}) {
  return (
    <div style={{
      background: '#f9fafb',
      borderRadius: 'var(--radius-md)',
      padding: '1rem',
      minHeight: '400px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: `2px solid ${color}`
      }}>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>{title}</h3>
        <span style={{
          background: color,
          color: '#fff',
          padding: '0.25rem 0.5rem',
          borderRadius: '1rem',
          fontSize: '0.75rem',
          fontWeight: 600
        }}>
          {count}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {useCases.map(useCase => (
          <div
            key={useCase.id}
            onClick={() => onUseCaseClick(useCase)}
            style={{
              background: '#fff',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #e1e4e8',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
              {useCase.id}
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
              {useCase.title}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              {useCase.author} • {useCase.lastModified.toLocaleDateString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              {useCase.steps.length} steps
            </div>
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              {useCase.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '0.125rem 0.5rem',
                    background: '#e5e7eb',
                    borderRadius: '0.25rem',
                    fontSize: '0.625rem',
                    color: '#374151'
                  }}
                >
                  {tag}
                </span>
              ))}
              {useCase.tags.length > 3 && (
                <span style={{ fontSize: '0.625rem', color: '#6b7280' }}>
                  +{useCase.tags.length - 3}
                </span>
              )}
            </div>
            {useCase.approval && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: '#10b981'
              }}>
                ✓ Approved by AI Team
              </div>
            )}
            {useCase.comments.length > 0 && (
              <div style={{
                marginTop: '0.25rem',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                💬 {useCase.comments.length} comments
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Approve Button with Dropdown Component (same as ReviewStepsLibrary)
function ApproveButtonWithDropdown({
  step,
  currentUser,
  onApprove
}: {
  step: Step
  currentUser: { id: string; name: string }
  onApprove: (useCaseIds: string[]) => void
}) {
  const [showDropdown, setShowDropdown] = useState(false)
  
  const getUseCaseName = (ucId: string) => {
    // In production, this would look up from actual use cases
    return ucId
  }
  
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={step.authorId === currentUser.id || 
                 step.approvals.some(a => a.userId === currentUser.id)}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: '#10b981',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: step.authorId === currentUser.id || step.approvals.some(a => a.userId === currentUser.id) ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          fontWeight: 600,
          opacity: step.authorId === currentUser.id || step.approvals.some(a => a.userId === currentUser.id) ? 0.5 : 1
        }}
      >
        ✓ Approve ({step.approvals.length}/1) ▼
      </button>
      
      {/* Approval Dropdown */}
      {showDropdown && !(step.authorId === currentUser.id || step.approvals.some(a => a.userId === currentUser.id)) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.25rem',
          background: '#fff',
          border: '1px solid #e1e4e8',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Approve for All Use Cases */}
          <button
            onClick={() => {
              onApprove([])
              setShowDropdown(false)
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#fff',
              border: 'none',
              borderBottom: step.useCaseIds.length > 0 ? '1px solid #e1e4e8' : 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
              ✓ Approve for All Use Cases
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              This step will be approved for all current and future use cases
            </div>
          </button>

          {/* Approve for Specific Use Cases */}
          {step.useCaseIds.map((ucId: string) => (
            <button
              key={ucId}
              onClick={() => {
                onApprove([ucId])
                setShowDropdown(false)
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#fff',
                border: 'none',
                borderBottom: step.useCaseIds.indexOf(ucId) < step.useCaseIds.length - 1 ? '1px solid #e1e4e8' : 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
            >
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                ✓ Approve for "{getUseCaseName(ucId)}" only
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Approve only for this specific use case
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Diff calculation (same as in ReviewStepsLibrary)
function calculateDiff(oldContent: string, newContent: string) {
  const oldLines = oldContent.split('\n')
  const newLines = newContent.split('\n')
  const diff: Array<{ type: 'added' | 'removed' | 'unchanged', line: string, lineNumber: number }> = []
  
  const maxLength = Math.max(oldLines.length, newLines.length)
  
  for (let i = 0; i < maxLength; i++) {
    if (i >= oldLines.length) {
      diff.push({ type: 'added', line: newLines[i], lineNumber: i + 1 })
    } else if (i >= newLines.length) {
      diff.push({ type: 'removed', line: oldLines[i], lineNumber: i + 1 })
    } else if (oldLines[i] !== newLines[i]) {
      diff.push({ type: 'removed', line: oldLines[i], lineNumber: i + 1 })
      diff.push({ type: 'added', line: newLines[i], lineNumber: i + 1 })
    } else {
      diff.push({ type: 'unchanged', line: oldLines[i], lineNumber: i + 1 })
    }
  }
  
  return diff
}

// Full Step Modal Component with Version Selector
function StepModalOverlay({ 
  step, 
  currentUser,
  closeStepModal,
  handleStepComment 
}: { 
  step: Step
  currentUser: { id: string; name: string }
  closeStepModal: () => void
  handleStepComment: (step: Step, comment: string) => void
}) {
  const [newComment, setNewComment] = useState('')
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [showCommentSection, setShowCommentSection] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  
  // Version selector state
  const stepVersions = mockStepVersions[step.id] || []
  const [selectedVersionId, setSelectedVersionId] = useState(stepVersions[0]?.versionId || null)
  
  // Override mode state
  const [overrideMode, setOverrideMode] = useState(false)
  const [overrideContent, setOverrideContent] = useState('')
  const [overrideReason, setOverrideReason] = useState('')
  
  // Get current version data
  const currentVersion = stepVersions.find(v => v.versionId === selectedVersionId) || stepVersions[0]
  
  // Use current version's content if available
  const displayContent = currentVersion?.content || step.content
  const displayPreviousContent = currentVersion?.previousContent || step.previousContent
  const displayAuthor = currentVersion?.author || step.author
  const displayStatus = currentVersion?.status || step.status

  // Calculate diff for review status using current version
  const diff = useMemo(() => {
    if (displayStatus === 'review' && displayPreviousContent) {
      return calculateDiff(displayPreviousContent, displayContent)
    }
    return null
  }, [displayStatus, displayPreviousContent, displayContent])

  const contentLines = displayContent.split('\n')

  const onAddComment = () => {
    if (!newComment.trim()) return
    
    // Create comment with line number if selected
    const commentText = selectedLine 
      ? `[Line ${selectedLine}] ${newComment}`
      : newComment
    
    handleStepComment(step, commentText)
    setNewComment('')
    setSelectedLine(null)
    setShowCommentSection(false)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '2rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e1e4e8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ margin: 0 }}>{step.title}</h2>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              background: getStatusColor(step.status),
              color: '#fff'
            }}>
              {step.status.toUpperCase()}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setShowHistoryModal(!showHistoryModal)}
              style={{
                padding: '0.5rem 1rem',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              📜 History
            </button>
            <button
              onClick={closeStepModal}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* History Modal */}
        {showHistoryModal && (
          <div style={{
            position: 'absolute',
            top: '4rem',
            right: '2rem',
            background: '#fff',
            border: '1px solid #e1e4e8',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            maxWidth: '400px',
            maxHeight: '400px',
            overflow: 'auto',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 2001
          }}>
            <h3 style={{ marginTop: 0 }}>History</h3>
            {step.history.map((h, idx) => (
              <div key={idx} style={{
                padding: '0.75rem',
                borderBottom: idx < step.history.length - 1 ? '1px solid #e1e4e8' : 'none'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{h.action}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {h.modifiedBy} • {h.date.toLocaleDateString()}
                </div>
                {h.columnChange && (
                  <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '0.25rem' }}>
                    → {h.columnChange}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: stepVersions.length > 0 ? '2fr 1fr' : '1fr',
          flex: 1,
          overflow: 'hidden'
        }}>
          {/* Main Content */}
          <div style={{
            padding: '1.5rem',
            overflow: 'auto'
          }}>
            {/* Metadata */}
            <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <div><strong>ID:</strong> {step.id}</div>
              <div><strong>Author:</strong> {step.author}</div>
              <div><strong>Created:</strong> {step.createdDate.toLocaleDateString()}</div>
              <div><strong>Last Modified:</strong> {step.lastModified.toLocaleDateString()}</div>
              <div><strong>Language:</strong> {step.language}</div>
              <div><strong>IDE:</strong> {step.ide.join(', ')}</div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Description</h3>
              <p>{step.description}</p>
            </div>

            {/* Content - Show DIFF for review, regular for others */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Step Content {step.status === 'review' && diff && '(Changes)'}</h3>
              
              {step.status === 'review' && diff ? (
                <div style={{
                  background: '#f6f8fa',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace'
                }}>
                  {diff.map((line, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        background: 
                          line.type === 'added' ? '#e6ffed' :
                          line.type === 'removed' ? '#ffebe9' :
                          '#fff',
                        borderLeft: `3px solid ${
                          line.type === 'added' ? '#28a745' :
                          line.type === 'removed' ? '#d73a49' :
                          'transparent'
                        }`,
                        padding: '0.25rem 0.5rem'
                      }}
                    >
                      <span style={{ 
                        minWidth: '3rem', 
                        color: '#6b7280', 
                        userSelect: 'none',
                        marginRight: '1rem'
                      }}>
                        {line.lineNumber}
                      </span>
                      <span style={{ 
                        color: line.type === 'removed' ? '#d73a49' : 
                               line.type === 'added' ? '#28a745' : '#24292e'
                      }}>
                        {line.type === 'added' && '+ '}
                        {line.type === 'removed' && '- '}
                        {line.line}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <pre style={{
                  background: '#f6f8fa',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {step.content}
                </pre>
              )}
            </div>

            {/* Rejection Reason */}
            {step.status === 'rejected' && step.rejectionReason && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{ marginTop: 0, color: '#991b1b' }}>Rejection Reason</h4>
                <p style={{ margin: 0 }}>{step.rejectionReason}</p>
              </div>
            )}

            {/* Approvals */}
            {step.approvals.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3>Approvals ({step.approvals.length}/1)</h3>
                {step.approvals.map((approval, idx) => (
                  <div key={idx} style={{
                    background: '#f0fdf4',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    <div>
                      ✓ <strong>{approval.userName}</strong> approved on {approval.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comments */}
            {step.comments.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3>Existing Comments ({step.comments.length})</h3>
                {step.comments.map((comment) => (
                  <div key={comment.id} style={{
                    background: '#f9fafb',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '0.75rem',
                    borderLeft: comment.lineNumber ? '3px solid #3b82f6' : 'none'
                  }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {comment.userName}
                      <span style={{ fontWeight: 400, color: '#6b7280', marginLeft: '0.5rem' }}>
                        {comment.timestamp.toLocaleDateString()}
                      </span>
                      {comment.lineNumber && (
                        <span style={{ 
                          marginLeft: '0.5rem',
                          background: '#3b82f6',
                          color: '#fff',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem'
                        }}>
                          Line {comment.lineNumber}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.875rem' }}>{comment.content}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment Section */}
            {(step.status === 'clarification' || showCommentSection) && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3>Add Comment</h3>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>
                    Select Line (Optional)
                  </label>
                  <select
                    value={selectedLine || ''}
                    onChange={(e) => setSelectedLine(e.target.value ? parseInt(e.target.value) : null)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">General comment (no line)</option>
                    {contentLines.map((_, idx) => (
                      <option key={idx} value={idx + 1}>
                        Line {idx + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment about this step..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    resize: 'vertical'
                  }}
                />
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  marginTop: '0.5rem' 
                }}>
                  <button
                    onClick={onAddComment}
                    disabled={!newComment.trim()}
                    style={{
                      padding: '0.5rem 1rem',
                      background: newComment.trim() ? 'var(--color-primary)' : '#d1d5db',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    Add Comment {selectedLine && `to Line ${selectedLine}`}
                  </button>
                  {showCommentSection && (
                    <button
                      onClick={() => {
                        setShowCommentSection(false)
                        setNewComment('')
                        setSelectedLine(null)
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#fff',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {step.status !== 'approved' && step.status !== 'rejected' && (
              <div style={{
                display: 'flex',
                gap: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e1e4e8'
              }}>
                {/* Approve Button with Dropdown */}
                <ApproveButtonWithDropdown
                  step={step}
                  currentUser={currentUser}
                  onApprove={(useCaseIds) => {
                    // Handle approval - in real app would update step approvals
                    console.log(`Step ${step.id} approved for use cases:`, useCaseIds)
                    alert(`Step approved! In production, this would update the step's approval status.`)
                  }}
                />

                <button
                  onClick={() => setShowCommentSection(true)}
                  disabled={showCommentSection}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#f59e0b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: showCommentSection ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    opacity: showCommentSection ? 0.5 : 1
                  }}
                >
                  ⚠ Need Clarification
                </button>

                <button
                  onClick={() => {
                    const reason = prompt('Please provide a justification for rejection:')
                    if (reason) {
                      // Handle rejection - in real app would update step status
                      console.log(`Step ${step.id} rejected:`, reason)
                      alert(`Step rejected! In production, this would update the step's status to rejected.`)
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}
                >
                  ✕ Reject
                </button>
              </div>
            )}
          </div>

          {/* Version Selector Sidebar */}
          {stepVersions.length > 0 && (
            <div style={{
              borderLeft: '1px solid #e1e4e8',
              padding: '1.5rem',
              background: '#f9fafb',
              overflow: 'auto'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>📌 Associated Use Cases</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {stepVersions.map((version) => (
                  <div
                    key={version.versionId}
                    onClick={() => setSelectedVersionId(version.versionId)}
                    style={{
                      padding: '0.75rem',
                      background: selectedVersionId === version.versionId ? '#e0f2fe' : '#fff',
                      border: `2px solid ${selectedVersionId === version.versionId ? '#3b82f6' : '#e1e4e8'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                      <div style={{ fontSize: '1.25rem' }}>
                        {selectedVersionId === version.versionId ? '✅' : version.hasEdits ? '⚠️' : '○'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontWeight: 600, 
                          fontSize: '0.875rem',
                          marginBottom: '0.25rem',
                          color: selectedVersionId === version.versionId ? '#1e40af' : '#374151'
                        }}>
                          {version.useCaseName}
                        </div>
                        
                        {version.hasEdits ? (
                          <>
                            <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>
                              Modified by {version.author}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {version.lastModified.toLocaleDateString()}
                            </div>
                          </>
                        ) : (
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            No edits (base version)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Override All User Edits Button */}
              {stepVersions.filter(v => v.hasEdits).length > 1 && !overrideMode && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: '#fff3cd',
                  border: '2px solid #f59e0b',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#92400e' }}>
                    ⚠️ Multiple Customizations Detected
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#78350f', marginBottom: '1rem' }}>
                    {stepVersions.filter(v => v.hasEdits).length} use cases have custom versions. AI Team can create canonical version.
                  </div>
                  <button
                    onClick={() => {
                      setOverrideMode(true)
                      setOverrideContent(step.previousContent || step.content)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#f59e0b',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    🔓 Override All User Edits
                  </button>
                </div>
              )}

              {/* Legend */}
              <div style={{
                marginTop: '1.5rem',
                padding: '0.75rem',
                background: '#fff',
                border: '1px solid #e1e4e8',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Legend:</div>
                <div>✅ Currently viewing</div>
                <div>⚠️ Modified version</div>
                <div>○ Base version (no edits)</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper function
function getStatusColor(status: string) {
  switch (status) {
    case 'review': return '#3b82f6'
    case 'clarification': return '#f59e0b'
    case 'approved': return '#10b981'
    case 'rejected': return '#ef4444'
    default: return '#6b7280'
  }
}
