import { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './UseCasesLibrary.css';

interface UseCase {
  id: string;  // UUID from database
  title: string;
  description: string;
  category: string;
  level: string;
  business_unit?: string;
  tools?: string[];
  thumbnail_url?: string;
  view_count: number;
  like_count: number;
  last_updated: string;
  status: string;
}

interface DetailedContentItem {
  id: string;
  type: 'text' | 'code' | 'image' | 'link' | 'checklist' | 'warning' | 'tip';
  label?: string;
  text?: string;
  code?: string;
  language?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  items?: string[];
  copyToClipboard?: boolean;
}

interface UseCaseStep {
  id: string;
  title: string;
  description: string;
  detailed_content?: DetailedContentItem[];
  order_index: number;
  category: string;
  is_custom: boolean;
  //comment?: string;
}

interface RelatedLink {
  name: string;
  url: string;
  type: string;
}

interface FullUseCase extends UseCase {
  name: string;
  is_anonymous: boolean;
  lead_name?: string;
  team_members?: string[];
  brief_overview: string;
  technical_details?: string;
  data_requirements?: string;
  implementation_steps?: string;
  coding_language?: string;
  ide?: string;
  is_for_developers: boolean;
  estimated_time?: string;
  categories?: string[];
  search_tags?: string[];
  steps?: UseCaseStep[];
  related_links?: RelatedLink[];
  media_links?: RelatedLink[];
}

export default function UseCasesLibrary() {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    businessUnit: 'all',
    tools: 'all'
  });
  const [sortBy, setSortBy] = useState<'recent' | 'views' | 'likes'>('recent');
  const [selectedUseCase, setSelectedUseCase] = useState<FullUseCase | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'info' | 'guide'>('info');
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchApprovedUseCases();
  }, []);

  const fetchApprovedUseCases = async () => {
    try {
      const response = await fetch('/api/use-cases/approved');
      if (response.ok) {
        const data = await response.json();
        setUseCases(data);
      }
    } catch (error) {
      console.error('Error fetching approved use cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUseCaseDetails = async (id: string) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(`/api/use-cases/${id}?includeSteps=true`);
      if (response.ok) {
        const result = await response.json();
        // The API returns { success: true, data: { useCase, steps } }
        const responseData = result.success ? result.data : result;
        
        // Merge useCase and steps into a single object for display
        const fullUseCase = {
          ...responseData.useCase,
          steps: responseData.steps || []
        };
        
        setSelectedUseCase(fullUseCase as any);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching use case details:', error);
      alert('Failed to load use case details. Please try again.');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleUseCaseClick = (useCase: UseCase) => {
    fetchUseCaseDetails(useCase.id);
  };

  const handleCloseDetail = () => {
    setSelectedUseCase(null);
  };

  const toggleFavorite = (useCaseId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent card click when clicking heart
    }
    
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(useCaseId)) {
        newFavorites.delete(useCaseId);
      } else {
        newFavorites.add(useCaseId);
      }
      return newFavorites;
    });
  };

  const renderDetailedContent = (items: DetailedContentItem[]) => {
    if (!items || items.length === 0) return null;

    return items.map((item, idx) => {
      switch (item.type) {
        case 'text':
          return (
            <div key={idx} style={{ marginBottom: '12px', fontSize: '15px', lineHeight: '1.7' }}>
              {item.label && <strong>{item.label}: </strong>}
              {item.text}
            </div>
          );
        case 'code':
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              {item.label && <div style={{ marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>{item.label}</div>}
              <pre style={{
                backgroundColor: '#f6f8fa',
                padding: '12px',
                borderRadius: '6px',
                overflow: 'auto',
                border: '1px solid #e1e4e8',
                fontSize: '13px'
              }}>
                <code>{item.code}</code>
              </pre>
            </div>
          );
        case 'checklist':
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              {item.label && <div style={{ marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>{item.label}</div>}
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {item.items?.map((checkItem, i) => (
                  <li key={i} style={{ marginBottom: '4px', fontSize: '15px' }}>{checkItem}</li>
                ))}
              </ul>
            </div>
          );
        case 'link':
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              {item.label && <strong>{item.label}: </strong>}
              <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0064d2', textDecoration: 'underline' }}>
                {item.linkText || item.linkUrl}
              </a>
            </div>
          );
        case 'image':
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              {item.label && <div style={{ marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>{item.label}</div>}
              <img src={item.imageUrl} alt={item.label || 'Step image'} style={{ maxWidth: '100%', borderRadius: '4px', border: '1px solid #e1e4e8' }} />
            </div>
          );
        case 'warning':
          return (
            <div key={idx} style={{
              marginBottom: '12px',
              padding: '12px',
              backgroundColor: '#fff4e6',
              borderLeft: '4px solid #ff9800',
              borderRadius: '4px'
            }}>
              <strong style={{ color: '#e65100' }}>⚠️ Warning: </strong>
              <span style={{ fontSize: '15px' }}>{item.text}</span>
            </div>
          );
        case 'tip':
          return (
            <div key={idx} style={{
              marginBottom: '12px',
              padding: '12px',
              backgroundColor: '#e8f5e9',
              borderLeft: '4px solid #4caf50',
              borderRadius: '4px'
            }}>
              <strong style={{ color: '#2e7d32' }}>💡 Tip: </strong>
              <span style={{ fontSize: '15px' }}>{item.text}</span>
            </div>
          );
        default:
          return null;
      }
    });
  };

  const filteredUseCases = useCases
    .filter(useCase => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.category === 'all' || 
        useCase.category === filters.category;
      
      // Level filter
      const matchesLevel = filters.level === 'all' || 
        useCase.level === filters.level;
      
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.view_count - a.view_count;
        case 'likes':
          return b.like_count - a.like_count;
        case 'recent':
        default:
          return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
      }
    });

  if (loading) {
    return <div className="loading">Loading approved use cases...</div>;
  }

  // Show guide view if in guide mode
  if (selectedUseCase && viewMode === 'guide' && selectedUseCase.steps && selectedUseCase.steps.length > 0) {
    const activeStep = selectedUseCase.steps[selectedStepIndex];
    
    // Group steps by category
    const stepsByCategory = selectedUseCase.steps.reduce<Record<string, UseCaseStep[]>>((acc, step) => {
      if (!acc[step.category]) acc[step.category] = [];
      acc[step.category].push(step);
      return acc;
    }, {});

    return (
      <div className="container">
        <section className="quick-links-section hero">
          <div className="hero-overlay quick-links-layout">
            {/* Left Sidebar - Steps List */}
            <div className="quick-links-column">
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{selectedUseCase.title || selectedUseCase.name}</h2>
                <button
                  onClick={() => setViewMode('info')}
                  style={{
                    padding: '8px 16px',
                    background: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ← Back to Details
                </button>
              </div>
              <p className="muted">Follow these steps to complete the use case. Click a step to see details.</p>

              <div className="quick-links-list">
                {Object.entries(stepsByCategory).map(([category, categorySteps]) => (
                  <section key={category} className="quick-links-group">
                    <h3 className="quick-links-group-title">{category}</h3>
                    <ul className="quick-links-items">
                      {categorySteps.sort((a, b) => a.order_index - b.order_index).map((step, idx) => {
                        const stepIndex = selectedUseCase.steps!.indexOf(step);
                        const isCompleted = completedSteps.has(stepIndex);
                        const isActive = stepIndex === selectedStepIndex;
                        
                        return (
                          <li key={step.id}>
                            <button
                              type="button"
                              onClick={() => setSelectedStepIndex(stepIndex)}
                              className={`quick-link-row ${isActive ? 'active' : ''}`}
                              style={isCompleted ? {
                                background: '#d4edda',
                                borderLeft: '4px solid #28a745'
                              } : {}}
                            >
                              <span 
                                className="step-number" 
                                style={isCompleted ? { background: '#28a745', color: 'white' } : {}}
                              >
                                {isCompleted ? '✓' : stepIndex + 1}
                              </span>
                              <span className="quick-link-row-main">
                                <span className="quick-link-name">{step.title}</span>
                                <span className="quick-link-desc">{step.description}</span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            </div>

            {/* Right Panel - Step Details */}
            <aside className="link-detail-panel">
              {activeStep ? (
                <article className="page link-detail">
                  {/* Step Header with Metadata */}
                  <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #e0e0e0' }}>
                    <h2 style={{ margin: '0 0 12px 0', fontSize: '1.75rem', color: '#333' }}>
                      Step {selectedStepIndex + 1}: {activeStep.title}
                    </h2>
                    
                    {/* Step Metadata */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {/* Category Badge */}
                      <span style={{
                        padding: '4px 12px',
                        background: activeStep.category === 'install' ? '#e3f2fd' :
                                   activeStep.category === 'setup' ? '#f3e5f5' :
                                   activeStep.category === 'config' ? '#fff3e0' :
                                   activeStep.category === 'security' ? '#ffebee' :
                                   activeStep.category === 'access' ? '#e8f5e9' :
                                   '#f5f5f5',
                        color: activeStep.category === 'install' ? '#1976d2' :
                               activeStep.category === 'setup' ? '#7b1fa2' :
                               activeStep.category === 'config' ? '#f57c00' :
                               activeStep.category === 'security' ? '#d32f2f' :
                               activeStep.category === 'access' ? '#388e3c' :
                               '#616161',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {activeStep.category}
                      </span>

                      {/* Custom/Built-in Badge */}
                      <span style={{
                        padding: '4px 12px',
                        background: activeStep.is_custom ? '#fff9c4' : '#e1f5fe',
                        color: activeStep.is_custom ? '#f57f17' : '#01579b',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        {activeStep.is_custom ? 'Custom Step' : 'Built-in Step'}
                      </span>

                      {/* Order Index */}
                      <span style={{
                        padding: '4px 12px',
                        background: '#f5f5f5',
                        color: '#666',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}>
                        Order: {activeStep.order_index + 1}
                      </span>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '16px', color: '#666', margin: '0', lineHeight: '1.6', fontStyle: 'italic' }}>
                      {activeStep.description}
                    </p>
                  </div>

                  {/* Detailed Content */}
                  {activeStep.detailed_content && activeStep.detailed_content.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        color: '#333', 
                        marginBottom: '16px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid #e0e0e0'
                      }}>
                        📋 Step Details
                      </h3>
                      {renderDetailedContent(activeStep.detailed_content)}
                    </div>
                  )}

                  {/* Comment */}
                  {activeStep.comment && (
                    <div style={{
                      marginBottom: '24px',
                      padding: '12px 16px',
                      backgroundColor: '#fffbeb',
                      borderLeft: '4px solid #fbbf24',
                      fontSize: '15px',
                      color: '#78350f',
                      borderRadius: '4px'
                    }}>
                      <strong>💬 Comment:</strong> {activeStep.comment}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{
                    marginTop: '32px',
                    paddingTop: '24px',
                    borderTop: '2px solid #e0e0e0',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <button
                      onClick={() => {
                        setCompletedSteps(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(selectedStepIndex)) {
                            newSet.delete(selectedStepIndex);
                          } else {
                            newSet.add(selectedStepIndex);
                          }
                          return newSet;
                        });
                      }}
                      style={{
                        padding: '12px 24px',
                        background: completedSteps.has(selectedStepIndex) ? '#6c757d' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: '600'
                      }}
                    >
                      {completedSteps.has(selectedStepIndex) ? '✓ Completed' : 'Mark as Complete'}
                    </button>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      {selectedStepIndex > 0 && (
                        <button
                          onClick={() => setSelectedStepIndex(selectedStepIndex - 1)}
                          style={{
                            padding: '12px 24px',
                            background: '#fff',
                            color: '#0064d2',
                            border: '2px solid #0064d2',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '15px',
                            fontWeight: '600'
                          }}
                        >
                          ← Previous
                        </button>
                      )}

                      {selectedStepIndex < selectedUseCase.steps!.length - 1 && (
                        <button
                          onClick={() => setSelectedStepIndex(selectedStepIndex + 1)}
                          style={{
                            padding: '12px 24px',
                            background: '#0064d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '15px',
                            fontWeight: '600'
                          }}
                        >
                          Next →
                        </button>
                      )}

                      {selectedStepIndex === selectedUseCase.steps!.length - 1 && (
                        <button
                          onClick={() => setViewMode('info')}
                          style={{
                            padding: '12px 24px',
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '15px',
                            fontWeight: '600'
                          }}
                        >
                          Finish →
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      Progress: {completedSteps.size} of {selectedUseCase.steps!.length} steps completed
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#e0e0e0',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${(completedSteps.size / selectedUseCase.steps!.length) * 100}%`,
                        height: '100%',
                        background: '#28a745',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                </article>
              ) : (
                <div className="link-detail placeholder">
                  <h2>Select a step</h2>
                  <p className="muted small">Pick any step on the left to see instructions.</p>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
    );
  }

  // Show detail view if a use case is selected
  if (selectedUseCase) {
    return (
      <div className="use-case-detail-view">
        {loadingDetails ? (
          <div className="loading">Loading use case details...</div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxWidth: '900px',
            margin: '0 auto',
            fontFamily: 'Georgia, serif',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={handleCloseDetail}
              style={{
                position: 'fixed',
                top: '80px',
                right: '20px',
                padding: '12px 24px',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                zIndex: 1000,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#555';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#666';
              }}
            >
              ← Back to Library
            </button>

            {/* Header with Get Started Button */}
            <div style={{
              borderBottom: '4px solid #0064d2',
              paddingBottom: '25px',
              marginBottom: '40px',
              textAlign: 'center',
              position: 'relative'
            }}>
              {/* Favorite Heart Icon */}
              <button
                onClick={() => toggleFavorite(selectedUseCase.id)}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '32px',
                  color: favorites.has(selectedUseCase.id) ? '#e74c3c' : '#ccc',
                  transition: 'all 0.2s ease',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={favorites.has(selectedUseCase.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {favorites.has(selectedUseCase.id) ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>

              <h1 style={{ margin: '0 0 12px 0', color: '#0064d2', fontSize: '36px', fontWeight: 'bold' }}>
                {selectedUseCase.title || selectedUseCase.name}
              </h1>
              <p style={{ color: '#666', fontSize: '18px', margin: '0 0 20px 0', fontStyle: 'italic' }}>
                Use Case Details
              </p>
              
              {/* Get Started Button - Only show if there are steps */}
              {selectedUseCase.steps && selectedUseCase.steps.length > 0 && (
                <button
                  onClick={() => setViewMode('guide')}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
                    transition: 'all 0.3s ease',
                    marginTop: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#218838';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(40, 167, 69, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#28a745';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
                  }}
                >
                  🚀 Get Started →
                </button>
              )}
            </div>

            {/* General Information */}
            <section style={{ marginBottom: '35px', pageBreakInside: 'avoid' }}>
              <h2 style={{ 
                color: '#0064d2', 
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '12px',
                marginBottom: '20px',
                fontSize: '26px',
                fontWeight: '600'
              }}>
                General Information
              </h2>
              
              <div style={{ display: 'grid', gap: '18px' }}>
                {selectedUseCase.thumbnail_url && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Thumbnail:</strong>
                    <img src={selectedUseCase.thumbnail_url} alt="Use case thumbnail" style={{ 
                      maxWidth: '350px', 
                      borderRadius: '6px',
                      border: '2px solid #ddd',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} />
                  </div>
                )}
                
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>Use Case Name:</strong>
                  <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                    {selectedUseCase.name || selectedUseCase.title || 'Not provided'}
                  </p>
                </div>
                
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>Use Case Lead:</strong>
                  <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                    {selectedUseCase.is_anonymous ? '(Anonymous Submission)' : (selectedUseCase.lead_name || (selectedUseCase as any).created_by || 'Not provided')}
                  </p>
                </div>
                
                {selectedUseCase.team_members && selectedUseCase.team_members.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>Team Members:</strong>
                    <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                      {selectedUseCase.team_members.join(', ')}
                    </p>
                  </div>
                )}
                
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Overview:</strong>
                  <div style={{ 
                    margin: 0, 
                    fontSize: '16px', 
                    lineHeight: '1.9',
                    whiteSpace: 'pre-wrap',
                    backgroundColor: '#f8f9fa',
                    padding: '18px',
                    borderRadius: '6px',
                    borderLeft: '4px solid #0064d2',
                    color: '#333'
                  }}>
                    {selectedUseCase.brief_overview || selectedUseCase.description || 'Not provided'}
                  </div>
                </div>
              </div>
            </section>

            {/* Project Configuration */}
            <section style={{ marginBottom: '35px', pageBreakInside: 'avoid' }}>
              <h2 style={{ 
                color: '#0064d2', 
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '12px',
                marginBottom: '20px',
                fontSize: '26px',
                fontWeight: '600'
              }}>
                Project Configuration
              </h2>
              
              <div style={{ display: 'grid', gap: '18px' }}>
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>Business Unit:</strong>
                  <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                    {selectedUseCase.business_unit || 'Not provided'}
                  </p>
                </div>
                
                {selectedUseCase.is_for_developers && (
                  <>
                    {selectedUseCase.coding_language && (
                      <div>
                        <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>Coding Language:</strong>
                        <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                          {selectedUseCase.coding_language}
                        </p>
                      </div>
                    )}
                    
                    {selectedUseCase.ide && (
                      <div>
                        <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>IDE:</strong>
                        <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                          {selectedUseCase.ide}
                        </p>
                      </div>
                    )}
                  </>
                )}
                
                {selectedUseCase.tools && selectedUseCase.tools.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Tools and Technologies:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedUseCase.tools.map(tool => (
                        <span key={tool} style={{
                          padding: '8px 16px',
                          backgroundColor: '#e3f2fd',
                          border: '1px solid #0064d2',
                          borderRadius: '20px',
                          fontSize: '14px',
                          color: '#0064d2',
                          fontWeight: '500'
                        }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedUseCase.related_links && selectedUseCase.related_links.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Related Links:</strong>
                    <ul style={{ margin: '0', paddingLeft: '25px', lineHeight: '1.8' }}>
                      {selectedUseCase.related_links.map((link, idx) => (
                        <li key={idx} style={{ marginBottom: '10px', fontSize: '15px' }}>
                          <strong>{link.name}:</strong>{' '}
                          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0064d2', textDecoration: 'underline' }}>
                            {link.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

         
            {/* Additional Information */}
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ 
                color: '#0064d2', 
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '12px',
                marginBottom: '20px',
                fontSize: '26px',
                fontWeight: '600'
              }}>
                Additional Information
              </h2>
              
              <div style={{ display: 'grid', gap: '18px' }}>
                {selectedUseCase.technical_details && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>
                      Technical Details:
                    </strong>
                    <div style={{ 
                      margin: 0, 
                      fontSize: '15px', 
                      lineHeight: '1.9',
                      whiteSpace: 'pre-wrap',
                      backgroundColor: '#f8f9fa',
                      padding: '18px',
                      borderRadius: '6px',
                      borderLeft: '4px solid #28a745',
                      color: '#333'
                    }}>
                      {selectedUseCase.technical_details}
                    </div>
                  </div>
                )}
                
                {selectedUseCase.data_requirements && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>
                      Data Requirements:
                    </strong>
                    <div style={{ 
                      margin: 0, 
                      fontSize: '15px', 
                      lineHeight: '1.9',
                      whiteSpace: 'pre-wrap',
                      backgroundColor: '#f8f9fa',
                      padding: '18px',
                      borderRadius: '6px',
                      color: '#333'
                    }}>
                      {selectedUseCase.data_requirements}
                    </div>
                  </div>
                )}
                
                {selectedUseCase.implementation_steps && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>
                      Implementation Steps:
                    </strong>
                    <div style={{ 
                      margin: 0, 
                      fontSize: '15px', 
                      lineHeight: '1.9',
                      whiteSpace: 'pre-wrap',
                      backgroundColor: '#f8f9fa',
                      padding: '18px',
                      borderRadius: '6px',
                      color: '#333'
                    }}>
                      {selectedUseCase.implementation_steps}
                    </div>
                  </div>
                )}
                
                {selectedUseCase.categories && selectedUseCase.categories.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Categories:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedUseCase.categories.map(cat => (
                        <span key={cat} style={{
                          padding: '8px 16px',
                          backgroundColor: '#f0f0f0',
                          border: '1px solid #ccc',
                          borderRadius: '20px',
                          fontSize: '14px',
                          color: '#555'
                        }}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedUseCase.estimated_time && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>
                      Estimated Time to Complete:
                    </strong>
                    <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                      {selectedUseCase.estimated_time}
                    </p>
                  </div>
                )}
                
                {selectedUseCase.media_links && selectedUseCase.media_links.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Media:</strong>
                    <ul style={{ margin: '0', paddingLeft: '25px', lineHeight: '1.8' }}>
                      {selectedUseCase.media_links.map((link, idx) => (
                        <li key={idx} style={{ marginBottom: '10px', fontSize: '15px' }}>
                          <strong>{link.name}:</strong>{' '}
                          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0064d2', textDecoration: 'underline' }}>
                            {link.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedUseCase.search_tags && selectedUseCase.search_tags.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Search Tags:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedUseCase.search_tags.map(tag => (
                        <span key={tag} style={{
                          padding: '8px 16px',
                          backgroundColor: '#f0f0f0',
                          border: '1px solid #ccc',
                          borderRadius: '20px',
                          fontSize: '14px',
                          color: '#555'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Footer with Back Button */}
            <div style={{
              borderTop: '3px solid #e0e0e0',
              paddingTop: '35px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button
                onClick={handleCloseDetail}
                style={{
                  padding: '16px 45px',
                  backgroundColor: 'white',
                  color: '#666',
                  border: '2px solid #999',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '17px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#666';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#999';
                }}
              >
                ← Back to Library
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="use-cases-library">
      <div className="library-sidebar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search use cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <h3>Sort By</h3>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="filter-select"
          >
            <option value="recent">Most Recent</option>
            <option value="views">Most Viewed</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Filter by Category</h3>
          <select 
            value={filters.category} 
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="productivity">Productivity</option>
            <option value="knowledge">Knowledge</option>
            <option value="developer">Developer</option>
            <option value="security">Security</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Filter by Level</h3>
          <select 
            value={filters.level} 
            onChange={(e) => setFilters({...filters, level: e.target.value})}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button 
          onClick={() => {
            setFilters({ category: 'all', level: 'all', businessUnit: 'all', tools: 'all' });
            setSearchQuery('');
          }}
          className="clear-filters-btn"
        >
          Clear All Filters
        </button>
      </div>

      <div className="library-main">
        {filteredUseCases.length === 0 ? (
          <div className="no-results">
            <p>No approved use cases found matching your criteria.</p>
            <p>Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <>
            <div className="results-header">
              <h2>Showing {filteredUseCases.length} Use Cases</h2>
            </div>

            <div className="use-cases-grid">
              {filteredUseCases.map((useCase) => (
                <div 
                  key={useCase.id} 
                  className="use-case-card"
                  onClick={() => handleUseCaseClick(useCase)}
                  style={{ cursor: 'pointer' }}
                >
                  {useCase.thumbnail_url && (
                    <div className="card-thumbnail">
                      <img src={useCase.thumbnail_url} alt={useCase.title} />
                    </div>
                  )}
                  
                  {/* Favorite Heart Icon on Card */}
                  <button
                    onClick={(e) => toggleFavorite(useCase.id, e)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      fontSize: '22px',
                      color: favorites.has(useCase.id) ? '#e74c3c' : '#999',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.15)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                    }}
                    title={favorites.has(useCase.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {favorites.has(useCase.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                  </button>
                  
                  <div className="card-content">
                    <span className="category-badge">{useCase.category.toUpperCase()}</span>
                    <h3>{useCase.title}</h3>
                    <p className="card-description">{useCase.description}</p>
                    
                    <div className="card-meta">
                      <span className="meta-item">
                        👁️ {useCase.view_count} views
                      </span>
                      <span className="meta-item">
                        👍 {useCase.like_count}
                      </span>
                    </div>
                    
                    <div className="card-footer">
                      <span className="level-tag">{useCase.level}</span>
                      <span className="updated-date">
                        Updated: {new Date(useCase.last_updated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}



// preoconfiged steps if wanted in the use case view: 
//  //Setup Steps
//           {selectedUseCase.steps && selectedUseCase.steps.length > 0 && (
//             <section style={{ marginBottom: '35px', pageBreakInside: 'avoid' }}>
//               <h2 style={{ 
//                 color: '#0064d2', 
//                 borderBottom: '2px solid #e0e0e0',
//                 paddingBottom: '12px',
//                 marginBottom: '20px',
//                 fontSize: '26px',
//                 fontWeight: '600'
//               }}>
//                 Setup Steps ({selectedUseCase.steps.length})
//               </h2>
                
//                 <ol style={{ margin: 0, paddingLeft: '30px', lineHeight: '1.8' }}>
//                   {selectedUseCase.steps.sort((a, b) => a.order_index - b.order_index).map((step) => (
//                     <li key={step.id} style={{ 
//                       marginBottom: '25px',
//                       fontSize: '16px',
//                       color: '#333'
//                     }}>
//                       <strong style={{ fontSize: '18px', color: '#222', display: 'block', marginBottom: '10px' }}>
//                         {step.title}
//                       </strong>
                      
//                       {/* Brief Description */}
//                       <div style={{ 
//                         margin: '0 0 12px 0', 
//                         color: '#555',
//                         fontSize: '15px',
//                         lineHeight: '1.7',
//                         fontStyle: 'italic'
//                       }}>
//                         {step.description}
//                       </div>
                      
//                       {/* Detailed Content */}
//                       {step.detailed_content && step.detailed_content.length > 0 && (
//                         <div style={{
//                           marginTop: '12px',
//                           padding: '15px',
//                           backgroundColor: '#f8f9fa',
//                           borderRadius: '6px',
//                           border: '1px solid #e0e0e0'
//                         }}>
//                           {renderDetailedContent(step.detailed_content)}
//                         </div>
//                       )}
                    
//                     </li>
//                   ))}
//                 </ol>
//               </section>
//             )}
