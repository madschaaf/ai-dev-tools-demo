import { useState, useEffect, useMemo } from 'react'

// Types matching the backend model (extended with all fields)
interface UseCase {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  step_ids?: string[]
  user_id?: string
  created_by: string
  created_at: Date
  updated_at: Date
  status: 'draft' | 'review' | 'clarification' | 'approved' | 'rejected' | 'published' | 'archived'
  estimated_duration?: number
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
  prerequisites?: string[]
  
  // Extended comprehensive fields
  thumbnail_url?: string
  lead_name?: string
  team_members?: string[]
  brief_overview?: string
  business_unit?: string
  is_for_developers?: boolean
  coding_language?: string
  ide?: string
  tools?: string[]
  related_links?: Array<{ name: string; url: string; type?: string }>
  technical_details?: string
  data_requirements?: string
  implementation_steps?: string
  categories?: string[]
  estimated_time?: string
  media_links?: Array<{ name: string; url: string; type?: string }>
  search_tags?: string[]
  is_anonymous?: boolean
}

export default function ReviewUseCaseLibrary({ onSwitchToSteps }: { onSwitchToSteps?: () => void }) {
  const [useCases, setUseCases] = useState<UseCase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Fetch use cases from API
  useEffect(() => {
    fetchUseCases()
  }, [])

  const fetchUseCases = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/use-cases')
      const result = await response.json()
      
      if (result.success && result.data) {
        // Convert date strings to Date objects
        const useCasesWithDates = result.data.map((uc: any) => ({
          ...uc,
          created_at: new Date(uc.created_at),
          updated_at: new Date(uc.updated_at)
        }))
        setUseCases(useCasesWithDates)
      } else {
        setError('Failed to load use cases')
      }
    } catch (err) {
      console.error('Error fetching use cases:', err)
      setError('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  // Get unique values for filters
  const allTags = useMemo(() => 
    Array.from(new Set(useCases.flatMap(uc => uc.tags))).sort(),
    [useCases]
  )
  
  const allCategories = useMemo(() => 
    Array.from(new Set(useCases.map(uc => uc.category))).sort(),
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
        selectedCategories.includes(useCase.category)

      return matchesSearch && matchesTags && matchesCategory
    })
  }, [useCases, searchTerm, selectedTags, selectedCategories])

  // Group use cases by status
  const useCasesByStatus = useMemo(() => {
    const sortByUpdated = (cases: UseCase[]) => 
      [...cases].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    
    return {
      review: sortByUpdated(filteredUseCases.filter(uc => uc.status === 'review')),
      clarification: sortByUpdated(filteredUseCases.filter(uc => uc.status === 'clarification')),
      approved: sortByUpdated(filteredUseCases.filter(uc => uc.status === 'approved')),
      rejected: sortByUpdated(filteredUseCases.filter(uc => uc.status === 'rejected'))
    }
  }, [filteredUseCases])

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading use cases...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button 
          onClick={fetchUseCases}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    )
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

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {allTags.length > 0 && (
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
          )}

          {allCategories.length > 0 && (
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
          )}
        </div>

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
          onUseCaseClick={(uc) => {
            setSelectedUseCase(uc)
            setShowModal(true)
          }}
        />

        <KanbanColumn
          title="Needs Clarification"
          count={useCasesByStatus.clarification.length}
          color="#f59e0b"
          useCases={useCasesByStatus.clarification}
          onUseCaseClick={(uc) => {
            setSelectedUseCase(uc)
            setShowModal(true)
          }}
        />

        <KanbanColumn
          title="Approved"
          count={useCasesByStatus.approved.length}
          color="#10b981"
          useCases={useCasesByStatus.approved}
          onUseCaseClick={(uc) => {
            setSelectedUseCase(uc)
            setShowModal(true)
          }}
        />

        <KanbanColumn
          title="Rejected"
          count={useCasesByStatus.rejected.length}
          color="#ef4444"
          useCases={useCasesByStatus.rejected}
          onUseCaseClick={(uc) => {
            setSelectedUseCase(uc)
            setShowModal(true)
          }}
        />
      </div>

      {/* Use Case Detail Modal */}
      {showModal && selectedUseCase && (
        <UseCaseModal
          useCase={selectedUseCase}
          onClose={() => {
            setShowModal(false)
            setSelectedUseCase(null)
          }}
          onUpdate={(updatedUseCase) => {
            setUseCases(prev => prev.map(uc => 
              uc.id === updatedUseCase.id ? updatedUseCase : uc
            ))
            setSelectedUseCase(updatedUseCase)
          }}
        />
      )}
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
              {useCase.created_by} • {new Date(useCase.updated_at).toLocaleDateString()}
            </div>
            {useCase.step_ids && useCase.step_ids.length > 0 && (
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                {useCase.step_ids.length} steps
              </div>
            )}
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
          </div>
        ))}
      </div>
    </div>
  )
}

// Use Case Modal Component
function UseCaseModal({ 
  useCase, 
  onClose,
  onUpdate
}: { 
  useCase: UseCase
  onClose: () => void
  onUpdate: (useCase: UseCase) => void
}) {
  const [useCaseWithSteps, setUseCaseWithSteps] = useState<any>(null)
  const [loadingSteps, setLoadingSteps] = useState(true)

  // Fetch full use case with step details when modal opens
  useEffect(() => {
    const fetchUseCaseWithSteps = async () => {
      try {
        setLoadingSteps(true)
        const response = await fetch(`http://localhost:3000/api/use-cases/${useCase.id}?includeSteps=true`)
        const result = await response.json()
        
        if (result.success && result.data) {
          setUseCaseWithSteps(result.data)
        }
      } catch (error) {
        console.error('Error fetching use case with steps:', error)
      } finally {
        setLoadingSteps(false)
      }
    }
    
    fetchUseCaseWithSteps()
  }, [useCase.id])

  const handleStatusChange = async (newStatus: UseCase['status']) => {
    try {
      const response = await fetch(`http://localhost:3000/api/use-cases/${useCase.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      const result = await response.json()
      if (result.success) {
        onUpdate({ ...useCase, status: newStatus, updated_at: new Date() })
      }
    } catch (error) {
      console.error('Error updating use case:', error)
      alert('Failed to update use case status')
    }
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
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
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
          <button
            onClick={onClose}
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

        {/* Body */}
        <div style={{
          padding: '1.5rem',
          overflow: 'auto',
          flex: 1
        }}>
          {/* Basic Information Section */}
          <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <div><strong>ID:</strong> {useCase.id}</div>
            <div><strong>Created:</strong> {new Date(useCase.created_at).toLocaleDateString()}</div>
            <div><strong>Last Modified:</strong> {new Date(useCase.updated_at).toLocaleDateString()}</div>
            <div><strong>Category:</strong> {useCase.category}</div>
            {useCase.estimated_duration && (
              <div><strong>Estimated Duration:</strong> {useCase.estimated_duration} minutes</div>
            )}
            {useCase.estimated_time && (
              <div><strong>Estimated Time:</strong> {useCase.estimated_time}</div>
            )}
            {useCase.difficulty_level && (
              <div><strong>Difficulty:</strong> {useCase.difficulty_level}</div>
            )}
          </div>

          {/* Submission Information */}
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9fafb', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Submission Information</h3>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {!useCase.is_anonymous && useCase.created_by && (
                <div><strong>Submitted By:</strong> {useCase.created_by}</div>
              )}
              {useCase.is_anonymous && (
                <div><strong>Submitted By:</strong> Anonymous</div>
              )}
              {useCase.lead_name && (
                <div><strong>Lead Name:</strong> {useCase.lead_name}</div>
              )}
              {useCase.team_members && useCase.team_members.length > 0 && (
                <div><strong>Team Members:</strong> {useCase.team_members.join(', ')}</div>
              )}
              {useCase.business_unit && (
                <div><strong>Business Unit:</strong> {useCase.business_unit}</div>
              )}
            </div>
          </div>

          {/* 1. General Information - Following form order */}
          
          {/* Thumbnail */}
          {useCase.thumbnail_url && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Thumbnail</h3>
              <img 
                src={useCase.thumbnail_url} 
                alt="Use case thumbnail"
                style={{ 
                  maxWidth: '300px', 
                  maxHeight: '200px', 
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #e1e4e8'
                }}
              />
            </div>
          )}

          {/* Brief Overview / Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>{useCase.brief_overview ? 'Brief Overview' : 'Description'}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>
              {useCase.brief_overview || useCase.description}
            </p>
          </div>

          {/* 2. Project Configuration - Following form order */}

          {/* Development Information */}
          {(useCase.is_for_developers || useCase.coding_language || useCase.ide || useCase.tools) && (
            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Development Information</h3>
              <div style={{ fontSize: '0.875rem' }}>
                {useCase.is_for_developers !== undefined && (
                  <div><strong>For Developers:</strong> {useCase.is_for_developers ? 'Yes' : 'No'}</div>
                )}
                {useCase.coding_language && (
                  <div><strong>Coding Language:</strong> {useCase.coding_language}</div>
                )}
                {useCase.ide && (
                  <div><strong>IDE:</strong> {useCase.ide}</div>
                )}
                {useCase.tools && useCase.tools.length > 0 && (
                  <div><strong>Tools:</strong> {useCase.tools.join(', ')}</div>
                )}
              </div>
            </div>
          )}

          {/* Related Links */}
          {useCase.related_links && useCase.related_links.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Related Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {useCase.related_links.map((link, idx) => (
                  <div key={idx} style={{ fontSize: '0.875rem' }}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                    >
                      {link.name || link.url}
                    </a>
                    {link.type && <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>({link.type})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Setup Steps */}
          
          {/* Included Steps */}
          {useCase.step_ids && useCase.step_ids.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Setup Steps ({useCase.step_ids.length})</h3>
              {loadingSteps ? (
                <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>
                  Loading step details...
                </div>
              ) : useCaseWithSteps?.steps && useCaseWithSteps.steps.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {useCaseWithSteps.steps.map((step: any, idx: number) => (
                    <div
                      key={step.id}
                      style={{
                        padding: '1rem',
                        background: '#f9fafb',
                        border: '1px solid #e1e4e8',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem'
                      }}
                    >
                      <div style={{ 
                        fontWeight: 600, 
                        marginBottom: '0.5rem',
                        color: '#374151'
                      }}>
                        {idx + 1}. {step.title}
                      </div>
                      {step.description && (
                        <div style={{ 
                          color: '#6b7280',
                          marginBottom: '0.5rem',
                          fontSize: '0.8rem'
                        }}>
                          {step.description}
                        </div>
                      )}
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: '#9ca3af'
                      }}>
                        Step ID: {step.id}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {useCase.step_ids.map((stepId, idx) => (
                    <div
                      key={stepId}
                      style={{
                        padding: '0.75rem',
                        background: '#f9fafb',
                        border: '1px solid #e1e4e8',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem'
                      }}
                    >
                      {idx + 1}. Step ID: {stepId}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Additional Information - Following form order */}

          {/* Technical Details */}
          {useCase.technical_details && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Technical Details</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{useCase.technical_details}</p>
            </div>
          )}

          {/* Data Requirements */}
          {useCase.data_requirements && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Data Requirements</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{useCase.data_requirements}</p>
            </div>
          )}

          {/* Implementation Steps */}
          {useCase.implementation_steps && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Implementation Steps</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{useCase.implementation_steps}</p>
            </div>
          )}

          {/* Categories (multiple) */}
          {useCase.categories && useCase.categories.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Categories</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {useCase.categories.map(cat => (
                  <span
                    key={cat}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Media Links */}
          {useCase.media_links && useCase.media_links.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Media</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {useCase.media_links.map((link, idx) => (
                  <div key={idx} style={{ fontSize: '0.875rem' }}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                    >
                      {link.name || link.url}
                    </a>
                    {link.type && <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>({link.type})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Tags */}
          {useCase.search_tags && useCase.search_tags.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Search Tags</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {useCase.search_tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: '#fef3c7',
                      color: '#92400e',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites - keeping at end as it's not in form */}
          {useCase.prerequisites && useCase.prerequisites.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Prerequisites</h3>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                {useCase.prerequisites.map((prereq, idx) => (
                  <li key={idx}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags - keeping at end as it's not in form */}
          {useCase.tags.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Tags</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {useCase.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: '#e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {useCase.status === 'review' && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e1e4e8'
            }}>
              <button
                onClick={() => handleStatusChange('approved')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                ✓ Approve
              </button>

              <button
                onClick={() => handleStatusChange('clarification')}
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
                  if (confirm('Are you sure you want to reject this use case?')) {
                    handleStatusChange('rejected')
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

function getStatusColor(status: string) {
  switch (status) {
    case 'review': return '#3b82f6'
    case 'clarification': return '#f59e0b'
    case 'approved': return '#10b981'
    case 'rejected': return '#ef4444'
    default: return '#6b7280'
  }
}
