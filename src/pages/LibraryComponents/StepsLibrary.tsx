import { useState, useEffect } from 'react';
import { DYNAMIC_STEPS } from '../Steps/DynamicSteps/stepsData';
import type { DynamicStep } from '../Steps/DynamicSteps/stepsData';
import { StepContentEditor } from '../../components/StepContentEditor';
import { StepContentRenderer } from '../../components/StepContentRenderer';
import type { DetailedContentItem } from '../../components/StepContentRenderer';
import './StepsLibrary.css';

interface StepsLibraryProps {
  userRole: 'user' | 'ai_team_member' | 'admin';
}

interface DbStep {
  id: number;
  step_id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  content: DetailedContentItem[];
  last_modified: string;
  modified_by?: string;
}

export default function StepsLibrary({ userRole }: StepsLibraryProps) {
  const [dbSteps, setDbSteps] = useState<DbStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Split-view state
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [showEditPreview, setShowEditPreview] = useState(false);
  const [editingContent, setEditingContent] = useState<DetailedContentItem[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStepData, setNewStepData] = useState({
    title: '',
    description: '',
    category: 'install' as DynamicStep['category']
  });
  const [showCopyFromMenu, setShowCopyFromMenu] = useState(false);
  const [copyStepSearchQuery, setCopyStepSearchQuery] = useState('');
  const [previewStepId, setPreviewStepId] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState(0); // Force re-render key

  useEffect(() => {
    fetchApprovedSteps();
  }, []);

  const fetchApprovedSteps = async () => {
    try {
      const response = await fetch('/api/steps/library');
      if (response.ok) {
        const data = await response.json();
        setDbSteps(data);
      }
    } catch (error) {
      console.error('Error fetching approved steps:', error);
    } finally {
      setLoading(false);
    }
  };

  // Combine dynamic steps with database steps
  const allSteps = [
    ...DYNAMIC_STEPS.map(step => ({
      id: step.id,
      title: step.title,
      description: step.description,
      category: step.category,
      source: 'dynamic' as const,
      last_modified: 'N/A',
      status: 'approved',
      detailed_content: step.detailed_content,
      detailedContent: step.detailedContent
    })),
    ...dbSteps.map((step, index) => ({
      id: step.step_id || `db-step-${index}`,
      title: step.title || 'Untitled Step',
      description: step.description || '',
      category: step.category,
      source: 'database' as const,
      last_modified: step.last_modified,
      status: step.status,
      detailed_content: step.content || []
    }))
  ];

  const filteredSteps = allSteps.filter(step => {
    const matchesSearch = searchQuery === '' ||
      (step.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (step.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || step.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const selectedStep = selectedStepId ? allSteps.find(s => s.id === selectedStepId) : null;

  const handleStepClick = (stepId: string) => {
    setSelectedStepId(stepId);
    setIsEditingContent(false);
  };

  const handleEditClick = () => {
    if (!selectedStep) return;
    
    // Initialize editing with current content
    if (selectedStep.detailed_content && selectedStep.detailed_content.length > 0) {
      setEditingContent([...selectedStep.detailed_content]);
    } else if ((selectedStep as any).detailedContent) {
      // Convert legacy content to structured format with a basic text item
      setEditingContent([{
        id: 'legacy-content',
        type: 'text',
        text: (selectedStep as any).detailedContent
      }]);
    } else {
      // Create default content from description
      setEditingContent([{
        id: 'intro',
        type: 'text',
        text: selectedStep.description || ''
      }]);
    }
    setIsEditingContent(true);
  };

  const handleContentChange = (newContent: DetailedContentItem[]) => {
    setEditingContent(newContent);
  };

  const handleSaveContent = async () => {
    if (!selectedStep) return;

    try {
      // Save to database
      const stepData = {
        step_id: selectedStep.id,
        title: selectedStep.title,
        brief_description: selectedStep.description,
        category: selectedStep.category,
        content: editingContent,
        status: 'pending_review',
        modified_by: 'current-user-id' // TODO: Get from auth context
      };

      const response = await fetch(`/api/steps/${selectedStep.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stepData)
      });

      if (response.ok) {
        alert('Step content saved and sent for review!');
        setIsEditingContent(false);
        fetchApprovedSteps();
        
        // Refresh the selected step
        const updatedSteps = await fetch('/api/steps/library');
        if (updatedSteps.ok) {
          const data = await updatedSteps.json();
          setDbSteps(data);
        }
      } else {
        throw new Error('Failed to save step');
      }
    } catch (error) {
      console.error('Error saving step content:', error);
      alert('Failed to save step content. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingContent(false);
    setShowEditPreview(false);
    setEditingContent([]);
  };

  const toggleEditPreview = () => {
    setShowEditPreview(!showEditPreview);
  };

  const canEdit = userRole === 'ai_team_member' || userRole === 'admin';

  const handleCreateNewStep = () => {
    setShowCreateModal(true);
    setNewStepData({
      title: '',
      description: '',
      category: 'install'
    });
    setEditingContent([
      {
        id: 'intro',
        type: 'text',
        text: 'Add your step content here...'
      }
    ]);
    setShowCopyFromMenu(false);
  };

  const handleCopyFromStep = (stepId: string) => {
    const stepToCopy = allSteps.find(s => s.id === stepId);
    if (!stepToCopy) return;

    // Copy the step's title and description to the form
    setNewStepData({
      title: stepToCopy.title,
      description: stepToCopy.description,
      category: stepToCopy.category as DynamicStep['category']
    });

    // Copy the actual content (not just structure) so user can edit it
    if (stepToCopy.detailed_content && stepToCopy.detailed_content.length > 0) {
      const copiedContent = stepToCopy.detailed_content.map((item, index) => ({
        ...item,
        id: `copied-${Date.now()}-${index}` // Generate new IDs
      }));
      setEditingContent(copiedContent);
    } else if ((stepToCopy as any).detailedContent) {
      // Handle legacy content
      setEditingContent([{
        id: `copied-${Date.now()}-legacy`,
        type: 'text',
        text: (stepToCopy as any).detailedContent
      }]);
    }
    
    // Force editor to re-render with new content
    setEditorKey(prev => prev + 1);
    
    setShowCopyFromMenu(false);
    setCopyStepSearchQuery(''); // Reset search
    setPreviewStepId(null); // Reset preview
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewStepData({
      title: '',
      description: '',
      category: 'install'
    });
    setEditingContent([]);
  };

  const handleSaveNewStep = async () => {
    if (!newStepData.title.trim() || !newStepData.description.trim()) {
      alert('Please provide both a title and description for the new step.');
      return;
    }

    try {
      const stepData = {
        step_id: `custom-${Date.now()}`,
        title: newStepData.title,
        brief_description: newStepData.description,
        category: newStepData.category,
        content: editingContent,
        status: 'pending_review',
        modified_by: 'current-user-id' // TODO: Get from auth context
      };

      const response = await fetch('/api/steps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stepData)
      });

      if (response.ok) {
        alert('New step created and sent for review!');
        handleCloseCreateModal();
        fetchApprovedSteps();
      } else {
        throw new Error('Failed to create step');
      }
    } catch (error) {
      console.error('Error creating step:', error);
      alert('Failed to create step. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading steps library...</div>;
  }

  return (
    <div className="steps-library">
      <div className="steps-library-header">
        <div className="header-left">
          <h2>Steps Library</h2>
          <p className="step-count">{filteredSteps.length} steps available</p>
        </div>
        {canEdit && (
          <button onClick={handleCreateNewStep} className="create-new-btn">
            + Create New Step
          </button>
        )}
      </div>

      <div className="steps-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search steps by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            <option value="security">Security</option>
            <option value="access">Access</option>
            <option value="admin">Admin</option>
            <option value="install">Install</option>
            <option value="setup">Setup</option>
            <option value="config">Config</option>
            <option value="practice">Practice</option>
          </select>
        </div>
      </div>

      {filteredSteps.length === 0 ? (
        <div className="no-results">
          <p>No steps found matching your criteria.</p>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="split-view-container">
          {/* Left side: Steps table (50%) - Hidden when editing with preview */}
          {!(isEditingContent && showEditPreview) && (
            <div className="steps-list-panel">
            <div className="steps-list">
              <table className="steps-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSteps.map((step) => (
                    <tr 
                      key={`${step.source}-${step.id}`}
                      onClick={() => handleStepClick(step.id)}
                      className={selectedStepId === step.id ? 'selected' : ''}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div className="step-title-cell">
                          <strong>{step.title}</strong>
                          <p className="step-description-preview">{step.description}</p>
                        </div>
                      </td>
                      <td>
                        <span className={`category-tag category-${step.category}`}>
                          {step.category}
                        </span>
                      </td>
                      <td>
                        <span className={`source-badge source-${step.source}`}>
                          {step.source === 'dynamic' ? 'Built-in' : 'Custom'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}

          {/* Right side: Step detail view (50%) OR full width when preview shown */}
          <div className={`step-detail-panel ${isEditingContent && showEditPreview ? 'full-width' : ''}`}>
            {selectedStep ? (
              <div className="step-detail-content">
                <div className="step-detail-header">
                  <div>
                    <h3>{selectedStep.title}</h3>
                    <div className="step-meta">
                      <span className={`category-tag category-${selectedStep.category}`}>
                        {selectedStep.category}
                      </span>
                      <span className={`source-badge source-${selectedStep.source}`}>
                        {selectedStep.source === 'dynamic' ? 'Built-in' : 'Custom'}
                      </span>
                      {selectedStep.source === 'database' && (
                        <span className="last-modified">
                          Modified: {new Date(selectedStep.last_modified).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  {canEdit && !isEditingContent && (
                    <button onClick={handleEditClick} className="edit-content-btn">
                      ✏️ Edit Content
                    </button>
                  )}
                </div>

                <div className="step-content-area">
                  {isEditingContent ? (
                    <div className={showEditPreview ? 'edit-split-view' : ''}>
                      {/* Editor Section */}
                      <div className={showEditPreview ? 'edit-editor-section' : ''}>
                        {/* Preview Toggle Button */}
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            onClick={toggleEditPreview}
                            style={{
                              padding: '0.5rem 1rem',
                              background: showEditPreview ? '#dc3545' : '#17a2b8',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              transition: 'all 0.2s'
                            }}
                          >
                            {showEditPreview ? (
                              <>👁️ Hide Preview</>
                            ) : (
                              <>👁️ View Preview</>
                            )}
                          </button>
                        </div>
                        
                        <StepContentEditor
                          content={editingContent}
                          onChange={handleContentChange}
                          onCancel={handleCancelEdit}
                          onSave={handleSaveContent}
                        />
                      </div>

                      {/* Preview Section - Only shown when showEditPreview is true */}
                      {showEditPreview && (
                        <div className="edit-preview-section">
                          <h3 style={{ 
                            margin: '0 0 1rem 0', 
                            fontSize: '1.1rem', 
                            color: '#666', 
                            borderBottom: '2px solid #e0e0e0', 
                            paddingBottom: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            📄 Live Preview
                          </h3>
                          <div style={{ 
                            background: 'white', 
                            padding: '1.5rem', 
                            borderRadius: '8px', 
                            border: '1px solid #ddd',
                            minHeight: '400px'
                          }}>
                            {/* Preview Header */}
                            <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e0e0e0' }}>
                              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#333' }}>
                                {selectedStep?.title || 'Step Title'}
                              </h2>
                              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span className={`category-tag category-${selectedStep?.category}`}>
                                  {selectedStep?.category}
                                </span>
                                <span className={`source-badge source-${selectedStep?.source}`}>
                                  {selectedStep?.source === 'dynamic' ? 'Built-in' : 'Custom'}
                                </span>
                              </div>
                            </div>

                            {/* Preview Description */}
                            {selectedStep?.description && (
                              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                {selectedStep.description}
                              </p>
                            )}

                            {/* Preview Content */}
                            {editingContent.length > 0 && (
                              <StepContentRenderer content={editingContent} />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    selectedStep.detailed_content && selectedStep.detailed_content.length > 0 ? (
                      <StepContentRenderer content={selectedStep.detailed_content} />
                    ) : (selectedStep as any).detailedContent ? (
                      <div className="legacy-content">
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                          {(selectedStep as any).detailedContent}
                        </div>
                        {canEdit && (
                          <button onClick={handleEditClick} className="edit-content-btn" style={{ marginTop: '1.5rem' }}>
                            ✏️ Convert to Rich Content
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="no-content">
                        <p>{selectedStep.description}</p>
                        {canEdit && (
                          <button onClick={handleEditClick} className="add-content-btn">
                            + Add Detailed Content
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select a step from the list to view its details</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="steps-info">
        <p>
          <strong>Built-in Steps:</strong> Pre-configured steps from the DynamicSteps folder.
          {canEdit && ' Click a step title to view, then click "Edit Content" to modify.'}
        </p>
        <p>
          <strong>Custom Steps:</strong> User-created steps that have been approved.
          {canEdit && ' All edits are sent for review before being published.'}
        </p>
      </div>

      {/* Create New Step Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={handleCloseCreateModal}>
          <div className="modal-content modal-content-wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Step</h2>
              <button onClick={handleCloseCreateModal} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-body modal-split-view">
              {/* Left side: Form and Editor */}
              <div className="modal-form-section">
                <div style={{ marginBottom: '1rem' }}>
                  <button
                    onClick={() => setShowCopyFromMenu(true)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    📋 Copy Layout from Step
                  </button>
                </div>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newStepData.title}
                  onChange={(e) => setNewStepData({ ...newStepData, title: e.target.value })}
                  placeholder="e.g., Install Docker Desktop"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  className="form-textarea"
                  value={newStepData.description}
                  onChange={(e) => setNewStepData({ ...newStepData, description: e.target.value })}
                  placeholder="Brief description of what this step accomplishes..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  className="form-select"
                  value={newStepData.category}
                  onChange={(e) => setNewStepData({ ...newStepData, category: e.target.value as DynamicStep['category'] })}
                >
                  <option value="security">Security</option>
                  <option value="access">Access</option>
                  <option value="admin">Admin</option>
                  <option value="install">Install</option>
                  <option value="setup">Setup</option>
                  <option value="config">Config</option>
                  <option value="practice">Practice</option>
                </select>
              </div>

                <div className="form-group">
                  <label>Detailed Content</label>
                  <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem', background: '#f9f9f9' }}>
                    <StepContentEditor
                      key={`editor-${editorKey}`}
                      content={editingContent}
                      onChange={setEditingContent}
                      onCancel={() => {}}
                      onSave={() => {}}
                      hideButtons={true}
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button onClick={handleCloseCreateModal} className="btn-secondary">
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveNewStep} 
                    className="btn-primary"
                    disabled={!newStepData.title.trim() || !newStepData.description.trim()}
                  >
                    Create Step
                  </button>
                </div>
              </div>

              {/* Right side: Live Preview */}
              <div className="modal-preview-section">
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#666', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem' }}>
                  📄 Live Preview
                </h3>
                <div style={{ 
                  background: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd',
                  minHeight: '400px'
                }}>
                  {/* Preview Header */}
                  <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e0e0e0' }}>
                    <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#333' }}>
                      {newStepData.title || 'Step Title'}
                    </h2>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className={`category-tag category-${newStepData.category}`}>
                        {newStepData.category}
                      </span>
                      <span className="source-badge source-database">
                        Custom
                      </span>
                    </div>
                  </div>

                  {/* Preview Description */}
                  {newStepData.description && (
                    <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      {newStepData.description}
                    </p>
                  )}

                  {/* Preview Content */}
                  {editingContent.length > 0 && (
                    <StepContentRenderer content={editingContent} />
                  )}

                  {!newStepData.description && editingContent.length === 0 && (
                    <div style={{ color: '#999', fontStyle: 'italic', textAlign: 'center', padding: '2rem' }}>
                      Fill in the form to see your step preview here
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copy From Step Modal */}
      {showCopyFromMenu && (
        <div className="modal-overlay" onClick={() => setShowCopyFromMenu(false)}>
          <div className="modal-content modal-content-wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📋 Copy Content from Step</h2>
              <button onClick={() => setShowCopyFromMenu(false)} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-body modal-split-view">
              {/* Left side: Search and Step List */}
              <div className="modal-form-section">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="🔍 Search steps by title..."
                    value={copyStepSearchQuery}
                    onChange={(e) => setCopyStepSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <div style={{ 
                  maxHeight: '500px', 
                  overflowY: 'auto', 
                  border: '1px solid #ddd', 
                  borderRadius: '6px',
                  background: '#f9f9f9'
                }}>
                  {allSteps
                    .filter(step => 
                      copyStepSearchQuery === '' ||
                      (step.title?.toLowerCase() || '').includes(copyStepSearchQuery.toLowerCase()) ||
                      (step.description?.toLowerCase() || '').includes(copyStepSearchQuery.toLowerCase())
                    )
                    .map(step => (
                      <button
                        key={step.id}
                        onClick={() => handleCopyFromStep(step.id)}
                        onMouseEnter={() => setPreviewStepId(step.id)}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: previewStepId === step.id ? '#f0f7ff' : 'white',
                          border: 'none',
                          borderBottom: '1px solid #e0e0e0',
                          borderLeft: previewStepId === step.id ? '4px solid #007bff' : 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.5rem', color: '#333' }}>
                          {step.title}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                          {step.description}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className={`category-tag category-${step.category}`} style={{ fontSize: '0.75rem' }}>
                            {step.category}
                          </span>
                          <span className={`source-badge source-${step.source}`} style={{ fontSize: '0.75rem' }}>
                            {step.source === 'dynamic' ? 'Built-in' : 'Custom'}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Right side: Preview */}
              <div className="modal-preview-section">
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#666', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem' }}>
                  👁️ Step Preview
                </h3>
                <div style={{ 
                  background: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  border: '1px solid #ddd',
                  minHeight: '500px',
                  maxHeight: '500px',
                  overflowY: 'auto'
                }}>
                  {previewStepId ? (() => {
                    const previewStep = allSteps.find(s => s.id === previewStepId);
                    if (!previewStep) return null;
                    
                    return (
                      <>
                        {/* Preview Header */}
                        <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #e0e0e0' }}>
                          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#333' }}>
                            {previewStep.title}
                          </h2>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span className={`category-tag category-${previewStep.category}`}>
                              {previewStep.category}
                            </span>
                            <span className={`source-badge source-${previewStep.source}`}>
                              {previewStep.source === 'dynamic' ? 'Built-in' : 'Custom'}
                            </span>
                          </div>
                          <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                            {previewStep.description}
                          </p>
                        </div>

                        {/* Preview Content */}
                        {previewStep.detailed_content && previewStep.detailed_content.length > 0 ? (
                          <StepContentRenderer content={previewStep.detailed_content} />
                        ) : (previewStep as any).detailedContent ? (
                          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#444' }}>
                            {(previewStep as any).detailedContent}
                          </div>
                        ) : (
                          <div style={{ color: '#999', fontStyle: 'italic', padding: '2rem', textAlign: 'center' }}>
                            No detailed content available for this step
                          </div>
                        )}
                        
                        {/* Copy Instructions */}
                        <div style={{ 
                          background: '#e3f2fd', 
                          padding: '1rem', 
                          borderRadius: '6px', 
                          border: '1px solid #90caf9',
                          marginTop: '1.5rem'
                        }}>
                          <div style={{ fontWeight: '600', color: '#1976d2', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            💡 Click to Copy
                          </div>
                          <p style={{ color: '#1565c0', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
                            Click this step on the left to copy all content to your new step. You can then modify it as needed.
                          </p>
                        </div>
                      </>
                    );
                  })() : (
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '450px',
                      color: '#999'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👈</div>
                      <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Hover over a step to preview
                      </p>
                      <p style={{ fontSize: '0.9rem', color: '#bbb', textAlign: 'center', maxWidth: '300px' }}>
                        Move your mouse over any step in the list to see its full content here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
