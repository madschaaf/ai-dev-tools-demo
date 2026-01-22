import { useState, useMemo } from 'react'
import ReviewUseCaseLibrary from './ReviewUseCaseLibrary'

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
      versionId: 'STEP001-BASE',
      useCaseId: null,
      useCaseName: 'Base Version',
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

// Types
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
  useCaseIds: string[] // Empty array or all IDs = approved for all, specific IDs = approved for those use cases only
}

interface Step {
  id: string
  title: string
  description: string
  content: string
  previousContent?: string  // For diff view
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

interface UseCase {
  id: string
  title: string
  description: string
  steps: string[]
}

// Diff calculation
function calculateDiff(oldContent: string, newContent: string) {
  const oldLines = oldContent.split('\n')
  const newLines = newContent.split('\n')
  const diff: Array<{ type: 'added' | 'removed' | 'unchanged', line: string, lineNumber: number }> = []
  
  // Simple diff - in production, use a proper diff library
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

// Mock Data
const mockUseCases: UseCase[] = [
  {
    id: 'UC001',
    title: 'Frontend Developer Onboarding',
    description: 'Complete setup for new frontend developers',
    steps: ['STEP001', 'STEP002', 'STEP003']
  },
  {
    id: 'UC002',
    title: 'Backend Developer Setup',
    description: 'Backend development environment configuration',
    steps: ['STEP002', 'STEP004']
  }
]

const mockSteps: Step[] = [
  {
    id: 'STEP001',
    title: 'Install VS Code',
    description: 'Download and install Visual Studio Code',
    previousContent: `// Installation steps
1. Visit https://code.visualstudio.com
2. Download for your OS
3. Run installer`,
    content: `// Installation steps
1. Visit https://code.visualstudio.com
2. Download for your OS
3. Run installer
4. Verify installation: code --version
5. Configure user settings`,
    author: 'John Doe',
    authorId: 'user001',
    createdDate: new Date('2026-01-15'),
    lastModified: new Date('2026-01-20'),
    status: 'review',
    tags: ['installation', 'ide', 'required'],
    language: 'markdown',
    ide: ['VS Code'],
    category: ['front-end', 'back-end'],
    useCaseIds: ['UC001'],
    approvals: [],
    comments: [],
    history: [
      {
        date: new Date('2026-01-15'),
        modifiedBy: 'John Doe',
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
        useCaseIds: [] // Approved for all use cases
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
  },
  {
    id: 'STEP004',
    title: 'Setup Docker (Outdated)',
    description: 'Docker installation guide',
    content: '# Old Docker setup instructions...',
    author: 'Alice Williams',
    authorId: 'user004',
    createdDate: new Date('2026-01-05'),
    lastModified: new Date('2026-01-08'),
    status: 'rejected',
    tags: ['docker', 'outdated'],
    language: 'markdown',
    ide: ['Terminal'],
    category: ['back-end', 'database'],
    useCaseIds: ['UC002'],
    approvals: [],
    comments: [],
    history: [
      {
        date: new Date('2026-01-05'),
        modifiedBy: 'Alice Williams',
        action: 'Created',
        columnChange: 'review'
      },
      {
        date: new Date('2026-01-08'),
        modifiedBy: 'Jane Smith',
        action: 'Rejected',
        columnChange: 'rejected'
      }
    ],
    rejectionReason: 'Instructions are outdated for Docker v24+. Please update to latest version.'
  }
]

export default function ReviewStepsLibrary() {
  const [libraryMode, setLibraryMode] = useState<'steps' | 'usecases'>('steps')
  const [steps, setSteps] = useState<Step[]>(mockSteps)
  const [useCases] = useState<UseCase[]>(mockUseCases)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStep, setSelectedStep] = useState<Step | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showUseCaseDetail, setShowUseCaseDetail] = useState(false)
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null)
  const [newComment, setNewComment] = useState('')
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showCommentSection, setShowCommentSection] = useState(false)

  // Current user (mock) - Changed to user003 so you can approve STEP001
  const currentUser = { id: 'user003', name: 'Bob Johnson' }

  // Get unique values for filters
  const allTags = useMemo(() => 
    Array.from(new Set(steps.flatMap(s => s.tags))).sort(),
    [steps]
  )
  
  const allLanguages = useMemo(() => 
    Array.from(new Set(steps.map(s => s.language))).sort(),
    [steps]
  )
  
  const allCategories = useMemo(() => 
    Array.from(new Set(steps.flatMap(s => s.category))).sort(),
    [steps]
  )

  // Filter steps
  const filteredSteps = useMemo(() => {
    return steps.filter(step => {
      const matchesSearch = searchTerm === '' || 
        step.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        step.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        step.useCaseIds.some(id => id.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => step.tags.includes(tag))
      
      const matchesLanguage = selectedLanguages.length === 0 || 
        selectedLanguages.includes(step.language)
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(cat => step.category.includes(cat))

      return matchesSearch && matchesTags && matchesLanguage && matchesCategory
    })
  }, [steps, searchTerm, selectedTags, selectedLanguages, selectedCategories])

  // Group steps by status and sort by lastModified (most recent first)
  const stepsByStatus = useMemo(() => {
    const sortByLastModified = (steps: Step[]) => 
      [...steps].sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
    
    return {
      review: sortByLastModified(filteredSteps.filter(s => s.status === 'review')),
      clarification: sortByLastModified(filteredSteps.filter(s => s.status === 'clarification')),
      approved: sortByLastModified(filteredSteps.filter(s => s.status === 'approved')),
      rejected: sortByLastModified(filteredSteps.filter(s => s.status === 'rejected'))
    }
  }, [filteredSteps])

  // Handlers
  const handleApprove = (step: Step, useCaseIds: string[] = []) => {
    if (step.approvals.some(a => a.userId === currentUser.id)) {
      alert('You have already approved this step')
      return
    }

    if (step.authorId === currentUser.id) {
      alert('You cannot approve your own step')
      return
    }

    const newApproval: StepApproval = {
      userId: currentUser.id,
      userName: currentUser.name,
      timestamp: new Date(),
      useCaseIds: useCaseIds // Empty = approved for all, specific IDs = approved for those use cases
    }

    const updatedStep = {
      ...step,
      approvals: [...step.approvals, newApproval],
      status: 'approved' as const, // Move to approved immediately with 1 approval
      history: [...step.history, {
        date: new Date(),
        modifiedBy: currentUser.name,
        action: 'Approved by AI Team Member'
      }, {
        date: new Date(),
        modifiedBy: currentUser.name,
        action: 'Step Approved',
        columnChange: 'approved'
      }]
    }

    updateStep(updatedStep)
  }

  const handleNeedsClarification = () => {
    // Just show the comment section, don't move to clarification yet
    setShowCommentSection(true)
  }

  const handleReject = (step: Step) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a justification for rejection')
      return
    }

    const updatedStep = {
      ...step,
      status: 'rejected' as const,
      rejectionReason: rejectionReason,
      history: [...step.history, {
        date: new Date(),
        modifiedBy: currentUser.name,
        action: 'Rejected',
        columnChange: 'rejected'
      }]
    }
    updateStep(updatedStep)
    setRejectionReason('')
    console.log(`Email sent to ${step.author} about rejection: ${rejectionReason}`)
  }

  const handleAddComment = (step: Step) => {
    if (!newComment.trim()) return

    const now = new Date()
    const comment: StepComment = {
      id: `c${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      content: newComment,
      timestamp: now,
      lineNumber: selectedLine || undefined
    }

    const updatedStep = {
      ...step,
      comments: [...step.comments, comment],
      lastModified: now, // Update lastModified to move to top of column
      status: 'clarification' as const, // Move to clarification when comment added
      history: [...step.history, {
        date: now,
        modifiedBy: currentUser.name,
        action: selectedLine ? `Added comment on line ${selectedLine}` : 'Added comment'
      }, {
        date: now,
        modifiedBy: currentUser.name,
        action: 'Needs Clarification',
        columnChange: 'clarification'
      }]
    }

    updateStep(updatedStep)
    setNewComment('')
    setSelectedLine(null)
    setShowCommentSection(false)
    console.log(`Email sent to ${step.author} about new comment`)
  }

  const updateStep = (updatedStep: Step) => {
    setSteps(prev => prev.map(s => s.id === updatedStep.id ? updatedStep : s))
    setSelectedStep(updatedStep)
  }

  const openStepModal = (step: Step) => {
    setSelectedStep(step)
    setShowModal(true)
    setShowUseCaseDetail(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedStep(null)
    setSelectedUseCase(null)
    setShowUseCaseDetail(false)
    setRejectionReason('')
    setNewComment('')
    setSelectedLine(null)
    setShowCommentSection(false)
  }

  const viewUseCaseDetail = (useCaseId: string) => {
    const useCase = useCases.find(uc => uc.id === useCaseId)
    if (useCase) {
      setSelectedUseCase(useCase)
      setShowUseCaseDetail(true)
    }
  }

  // If use cases mode is selected, render ReviewUseCaseLibrary instead
  if (libraryMode === 'usecases') {
    return <ReviewUseCaseLibrary onSwitchToSteps={() => setLibraryMode('steps' as const)} />
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
            onClick={() => setLibraryMode('steps' as const)}
            style={{
              padding: '0.75rem 2rem',
              background: libraryMode === 'steps' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: libraryMode === 'steps' ? 'var(--color-primary)' : '#6b7280',
              boxShadow: libraryMode === 'steps' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            📝 Review Steps
          </button>
          <button
            onClick={() => setLibraryMode('usecases' as const)}
            style={{
              padding: '0.75rem 2rem',
              background: libraryMode === 'usecases' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: libraryMode === 'usecases' ? 'var(--color-primary)' : '#6b7280',
              boxShadow: libraryMode === 'usecases' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            📋 Review Use Cases
          </button>
        </div>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Review Submissions - Steps</h1>
        <p style={{ color: 'var(--color-neutral-700)' }}>
          AI team review interface for approving development steps
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
            placeholder="Search by title, step ID, or use case ID..."
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

          {/* Languages */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
              Language
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {allLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguages(prev => 
                    prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
                  )}
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    border: '1px solid',
                    borderColor: selectedLanguages.includes(lang) ? 'var(--color-primary)' : '#d1d5db',
                    background: selectedLanguages.includes(lang) ? 'var(--color-primary)' : '#fff',
                    color: selectedLanguages.includes(lang) ? '#fff' : '#374151',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  {lang}
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
        {(selectedTags.length > 0 || selectedLanguages.length > 0 || selectedCategories.length > 0 || searchTerm) && (
          <button
            onClick={() => {
              setSelectedTags([])
              setSelectedLanguages([])
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
          title="Steps for Review"
          count={stepsByStatus.review.length}
          color="#3b82f6"
          steps={stepsByStatus.review}
          onStepClick={openStepModal}
        />

        <KanbanColumn
          title="Needs Clarification"
          count={stepsByStatus.clarification.length}
          color="#f59e0b"
          steps={stepsByStatus.clarification}
          onStepClick={openStepModal}
        />

        <KanbanColumn
          title="Approved"
          count={stepsByStatus.approved.length}
          color="#10b981"
          steps={stepsByStatus.approved}
          onStepClick={openStepModal}
        />

        <KanbanColumn
          title="Rejected"
          count={stepsByStatus.rejected.length}
          color="#ef4444"
          steps={stepsByStatus.rejected}
          onStepClick={openStepModal}
        />
      </div>

      {/* Step Detail Modal */}
      {showModal && selectedStep && (
        <StepModal
          step={selectedStep}
          currentUser={currentUser}
          useCases={useCases}
          steps={steps}
          showHistoryModal={showHistoryModal}
          setShowHistoryModal={setShowHistoryModal}
          showCommentSection={showCommentSection}
          setShowCommentSection={setShowCommentSection}
          closeModal={closeModal}
          handleApprove={handleApprove}
          handleNeedsClarification={handleNeedsClarification}
          handleReject={handleReject}
          handleAddComment={handleAddComment}
          newComment={newComment}
          setNewComment={setNewComment}
          selectedLine={selectedLine}
          setSelectedLine={setSelectedLine}
          rejectionReason={rejectionReason}
          setRejectionReason={setRejectionReason}
          showUseCaseDetail={showUseCaseDetail}
          setShowUseCaseDetail={setShowUseCaseDetail}
          selectedUseCase={selectedUseCase}
          viewUseCaseDetail={viewUseCaseDetail}
        />
      )}
    </div>
  )
}

// Step Modal Component
function StepModal({ 
  step, 
  currentUser, 
  useCases, 
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
  selectedLine,
  setSelectedLine,
  setRejectionReason,
  showUseCaseDetail,
  setShowUseCaseDetail,
  selectedUseCase,
  viewUseCaseDetail
}: any) {
  // Local state for approval dropdown
  const [showApprovalDropdown, setShowApprovalDropdown] = useState(false)
  
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
  const displayStatus = currentVersion?.status || step.status

  // Calculate diff for review status
  const diff = useMemo(() => {
    if (step.status === 'review' && step.previousContent) {
      return calculateDiff(step.previousContent, step.content)
    }
    return null
  }, [step])

  const contentLines = step.content.split('\n')

  // Get use case names for approval dropdown
  const getUseCaseName = (ucId: string) => {
    const uc = useCases.find((u: any) => u.id === ucId)
    return uc ? uc.title : ucId
  }

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
        maxWidth: '1200px',
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
            {step.history.map((h: any, idx: number) => (
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
          gridTemplateColumns: stepVersions.length > 0 ? '2fr 1fr' : '1fr 400px',
          flex: 1,
          overflow: 'hidden'
        }}>
          {/* Left Pane */}
          <div style={{
            padding: '1.5rem',
            overflow: 'auto',
            borderRight: '1px solid #e1e4e8'
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
                {step.approvals.map((approval: any, idx: number) => {
                  // Determine approval scope
                  const isAllUseCases = approval.useCaseIds.length === 0
                  const approvalScope = isAllUseCases 
                    ? 'All Use Cases'
                    : approval.useCaseIds.map((id: string) => getUseCaseName(id)).join(', ')
                  
                  return (
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
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: '#059669',
                        marginTop: '0.25rem',
                        marginLeft: '1.25rem'
                      }}>
                        {isAllUseCases ? (
                          <>🌐 {approvalScope}</>
                        ) : (
                          <>📋 Specific: {approvalScope}</>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Comments - Show for clarification status OR when Need Clarification button clicked */}
            {(step.status === 'clarification' || showCommentSection) && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3>Comments ({step.comments.length})</h3>
                
                {/* Existing Comments */}
                {step.comments.map((comment: StepComment) => (
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

                {/* Add Comment */}
                <div style={{ marginTop: '1rem' }}>
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
                      {contentLines.map((_: string, idx: number) => (
                        <option key={idx} value={idx + 1}>
                          Line {idx + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  
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
                    onClick={() => handleAddComment(step)}
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
                    Add Comment {selectedLine && `to Line ${selectedLine}`}
                  </button>
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
                <div style={{ flex: 1, position: 'relative' }}>
                  <button
                    onClick={() => setShowApprovalDropdown(!showApprovalDropdown)}
                    disabled={step.authorId === currentUser.id || 
                             step.approvals.some((a: any) => a.userId === currentUser.id)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#10b981',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: step.authorId === currentUser.id || step.approvals.some((a: any) => a.userId === currentUser.id) ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      opacity: step.authorId === currentUser.id || step.approvals.some((a: any) => a.userId === currentUser.id) ? 0.5 : 1
                    }}
                  >
                    ✓ Approve ({step.approvals.length}/1) ▼
                  </button>
                  
                  {/* Approval Dropdown */}
                  {showApprovalDropdown && !(step.authorId === currentUser.id || step.approvals.some((a: any) => a.userId === currentUser.id)) && (
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
                          handleApprove(step, [])
                          setShowApprovalDropdown(false)
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
                            handleApprove(step, [ucId])
                            setShowApprovalDropdown(false)
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

                <button
                  onClick={() => handleNeedsClarification(step)}
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
                      handleReject(step)
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

          {/* Right Pane - Version Selector or Use Cases */}
          <div style={{
            padding: '1.5rem',
            overflow: 'auto',
            background: '#f9fafb'
          }}>
            {stepVersions.length > 0 ? (
              /* Version Selector Sidebar */
              <>
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
              </>
            ) : (
              /* Original Use Cases List */
              !showUseCaseDetail ? (
                <>
                  <h3 style={{ marginTop: 0 }}>Associated Use Cases</h3>
                  {step.useCaseIds.length === 0 ? (
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      No use cases associated
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {step.useCaseIds.map((ucId: string) => {
                        const useCase = useCases.find((uc: any) => uc.id === ucId)
                        if (!useCase) return null
                        return (
                          <div
                            key={ucId}
                            onClick={() => viewUseCaseDetail(ucId)}
                            style={{
                              padding: '1rem',
                              background: '#fff',
                              border: '1px solid #e1e4e8',
                              borderRadius: 'var(--radius-md)',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--color-primary)'
                              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#e1e4e8'
                              e.currentTarget.style.boxShadow = 'none'
                            }}
                          >
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                              {useCase.id}
                            </div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                              {useCase.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {useCase.steps.length} steps
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </>
              ) : selectedUseCase && (
                <>
                  <button
                    onClick={() => setShowUseCaseDetail(false)}
                    style={{
                      marginBottom: '1rem',
                      padding: '0.5rem 1rem',
                      background: '#fff',
                      border: '1px solid #d1d5db',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    ← Back to Use Cases
                  </button>

                  <h3 style={{ marginTop: 0 }}>{selectedUseCase.title}</h3>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>
                    {selectedUseCase.id}
                  </div>

                  <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    {selectedUseCase.description}
                  </p>

                  <h4>Steps ({selectedUseCase.steps.length})</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedUseCase.steps.map((stepId: string, idx: number) => {
                      const s = steps.find((st: any) => st.id === stepId)
                      if (!s) return null
                      return (
                        <div
                          key={stepId}
                          style={{
                            padding: '0.75rem',
                            background: s.id === step.id ? '#e0f2fe' : '#fff',
                            border: '1px solid',
                            borderColor: s.id === step.id ? '#0284c7' : '#e1e4e8',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.875rem'
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>
                            {idx + 1}. {s.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                            {s.id} • {s.status}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )
            )}
          </div>
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
  steps, 
  onStepClick 
}: { 
  title: string
  count: number
  color: string
  steps: Step[]
  onStepClick: (step: Step) => void
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
        {steps.map(step => (
          <div
            key={step.id}
            onClick={() => onStepClick(step)}
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
              {step.id}
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
              {step.title}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              {step.author} • {step.lastModified.toLocaleDateString()}
            </div>
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              {step.tags.slice(0, 3).map(tag => (
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
              {step.tags.length > 3 && (
                <span style={{ fontSize: '0.625rem', color: '#6b7280' }}>
                  +{step.tags.length - 3}
                </span>
              )}
            </div>
            {step.approvals.length > 0 && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: '#10b981'
              }}>
                ✓ Approved by AI Team
              </div>
            )}
            {step.comments.length > 0 && (
              <div style={{
                marginTop: '0.25rem',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                💬 {step.comments.length} comments
              </div>
            )}
          </div>
        ))}
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
