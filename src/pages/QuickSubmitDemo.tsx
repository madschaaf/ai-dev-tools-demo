import React, { useState } from 'react';
import '../styles/theme.css';
import { StepContentRenderer } from '../components/StepContentRenderer';
import { StepContentEditor } from '../components/StepContentEditor';
import type { DetailedContentItem } from '../components/StepContentRenderer';

interface Step {
  id: string;
  title: string;
  description: string;
  category?: string;
  detailed_content?: DetailedContentItem[];
}

// Pre-defined Zoom + NotebookLM workflow steps
const ZOOM_NOTEBOOK_STEPS: Step[] = [
  {
    id: 'step-1-capture-zoom',
    title: 'Step 1: Capture content in Zoom',
    description: 'Capture meeting content using Zoom AI Companion',
    category: 'zoom',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Join or start a Zoom meeting and use AI Companion to capture structured content.'
      },
      {
        id: 'requirements',
        type: 'callout',
        variant: 'info',
        text: '**What you need:**\n\n- A Zoom account with AI Companion enabled\n- A Google account (for NotebookLM)\n- A Zoom meeting (live or recorded)'
      },
      {
        id: 'instructions',
        type: 'text',
        text: '**Steps to capture content:**'
      },
      {
        id: 'steps-list',
        type: 'list',
        listStyle: 'numbered',
        items: [
          'Join or start a Zoom meeting',
          'In the meeting toolbar, click **AI Companion**',
          'Choose **Meeting Summary** or **Ask AI Companion**',
          'Enter a prompt, for example:\n\n"Summarize this meeting and turn it into a structured outline for a presentation."',
          'When the response appears, click **Copy** (or highlight and copy the text)',
          'Paste the text into a temporary document (Google Doc, Notes, etc.)'
        ]
      }
    ]
  },
  {
    id: 'step-2-open-notebooklm',
    title: 'Step 2: Open NotebookLM',
    description: 'Navigate to NotebookLM and create a new notebook',
    category: 'notebooklm',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Set up your NotebookLM workspace to process the Zoom content.'
      },
      {
        id: 'steps-list',
        type: 'list',
        listStyle: 'numbered',
        items: [
          'Go to https://notebooklm.google.com',
          'Sign in with your Google account (if prompted)',
          'Click **New Notebook**'
        ]
      },
      {
        id: 'tip',
        type: 'callout',
        variant: 'info',
        text: '**Pro Tip:** NotebookLM works best with structured content. The Zoom AI Companion output is already well-formatted for this purpose.'
      }
    ]
  },
  {
    id: 'step-3-add-zoom-content',
    title: 'Step 3: Add your Zoom content',
    description: 'Import the Zoom AI Companion output into NotebookLM',
    category: 'notebooklm',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Add the content you captured from Zoom as a source in your notebook.'
      },
      {
        id: 'steps-list',
        type: 'list',
        listStyle: 'numbered',
        items: [
          'In the new notebook, click **Add source**',
          'Choose **Paste text**',
          'Paste the Zoom AI Companion output',
          'Click **Insert**'
        ]
      },
      {
        id: 'note',
        type: 'callout',
        variant: 'info',
        text: '**Note:** NotebookLM will automatically analyze and index your content, making it ready for AI-powered transformations.'
      }
    ]
  },
  {
    id: 'step-4-generate-slides',
    title: 'Step 4: Generate the slide deck',
    description: 'Use NotebookLM to transform content into a slide deck',
    category: 'notebooklm',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Transform your Zoom meeting notes into a professional slide deck.'
      },
      {
        id: 'steps-list',
        type: 'list',
        listStyle: 'numbered',
        items: [
          'In the NotebookLM chat panel, type:\n\n"Turn this into a slide deck."',
          'Press **Enter**',
          'When the slide outline appears, review it',
          'Click **Export to Slides**'
        ]
      },
      {
        id: 'success',
        type: 'callout',
        variant: 'success',
        text: '**Success!** Your Zoom meeting content has been transformed into a structured slide deck that you can further customize in Google Slides.'
      }
    ]
  }
];

export default function QuickSubmitDemo() {
  const [steps, setSteps] = useState<Step[]>(ZOOM_NOTEBOOK_STEPS);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [draggedStepIndex, setDraggedStepIndex] = useState<number | null>(null);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editStepTitle, setEditStepTitle] = useState('');
  const [editStepDescription, setEditStepDescription] = useState('');
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<DetailedContentItem[]>([]);
  const [customStepContent, setCustomStepContent] = useState<{[key: string]: DetailedContentItem[]}>({});

  const selectedStep = steps.find(s => s.id === selectedStepId);

  const handleDragStart = (index: number) => {
    setDraggedStepIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedStepIndex === null || draggedStepIndex === index) return;

    const newSteps = [...steps];
    const draggedStep = newSteps[draggedStepIndex];
    newSteps.splice(draggedStepIndex, 1);
    newSteps.splice(index, 0, draggedStep);
    
    setSteps(newSteps);
    setDraggedStepIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedStepIndex(null);
  };

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(s => s.id !== stepId));
    if (selectedStepId === stepId) {
      setSelectedStepId(null);
    }
  };

  const startEditStep = (step: Step) => {
    setEditingStepId(step.id);
    setEditStepTitle(step.title);
    setEditStepDescription(step.description);
  };

  const saveStepEdit = () => {
    if (editingStepId) {
      setSteps(steps.map(step => 
        step.id === editingStepId 
          ? { ...step, title: editStepTitle, description: editStepDescription }
          : step
      ));
      setEditingStepId(null);
      setEditStepTitle('');
      setEditStepDescription('');
    }
  };

  const startEditingContent = (stepId: string) => {
    const step = steps.find(s => s.id === stepId);
    const customContent = customStepContent[stepId];
    
    if (customContent) {
      setEditingContent([...customContent]);
    } else if (step?.detailed_content) {
      setEditingContent([...step.detailed_content]);
    } else {
      setEditingContent([{
        id: 'intro',
        type: 'text',
        text: step?.description || ''
      }]);
    }
    setIsEditingContent(true);
  };

  const handleContentChange = (newContent: DetailedContentItem[]) => {
    setEditingContent(newContent);
  };

  const saveContentEdit = () => {
    if (selectedStepId) {
      setCustomStepContent({
        ...customStepContent,
        [selectedStepId]: editingContent
      });
    }
    setIsEditingContent(false);
    setEditingContent([]);
  };

  const cancelContentEdit = () => {
    setIsEditingContent(false);
    setEditingContent([]);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', paddingTop: '80px' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Quick Submit Demo</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Zoom + NotebookLM Workflow - Interactive Steps Demo
        </p>
        <div style={{ 
          marginTop: '20px', 
          padding: '16px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '8px',
          border: '2px solid #0064d2'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#0064d2', fontWeight: '600' }}>
            ✨ This demo shows how steps work with drag-drop, edit, and delete functionality
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Workflow Steps ({steps.length})</h2>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Steps List - Left Side */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '16px', color: '#666' }}>
              Steps List (drag to reorder)
            </h3>
            <div>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedStepId(step.id)}
                  style={{
                    padding: '16px',
                    marginBottom: '8px',
                    backgroundColor: selectedStepId === step.id ? '#e3f2fd' : '#f8f9fa',
                    border: selectedStepId === step.id ? '2px solid #0064d2' : '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'move',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStepId !== step.id) {
                      e.currentTarget.style.backgroundColor = '#f0f0f0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStepId !== step.id) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <span style={{ 
                      color: '#999', 
                      fontWeight: 'bold',
                      fontSize: '18px'
                    }}>
                      ⋮⋮
                    </span>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {step.description.substring(0, 50)}...
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this step?')) {
                        removeStep(step.id);
                      }
                    }}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: 'transparent',
                      color: '#dc3545',
                      border: '1px solid #dc3545',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc3545';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#dc3545';
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step Details - Right Side */}
          <div style={{ 
            flex: 2, 
            minWidth: '400px',
            maxHeight: '800px', 
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '24px',
            backgroundColor: '#fafafa'
          }}>
            {selectedStep ? (
              <article className="page link-detail">
                {editingStepId === selectedStep.id ? (
                  /* Edit Mode */
                  <div>
                    <h3 style={{ marginBottom: '20px' }}>Edit Step</h3>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                        Title
                      </label>
                      <input
                        type="text"
                        value={editStepTitle}
                        onChange={(e) => setEditStepTitle(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                        Description
                      </label>
                      <textarea
                        value={editStepDescription}
                        onChange={(e) => setEditStepDescription(e.target.value)}
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontFamily: 'inherit',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={saveStepEdit}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setEditingStepId(null);
                          setEditStepTitle('');
                          setEditStepDescription('');
                        }}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <>
                    {(() => {
                      const customContent = customStepContent[selectedStep.id];
                      
                      if (customContent) {
                        return (
                          <>
                            <h2>{selectedStep.title}</h2>
                            <StepContentRenderer content={customContent} />
                          </>
                        );
                      } else if (selectedStep.detailed_content) {
                        return (
                          <>
                            <h2>{selectedStep.title}</h2>
                            <StepContentRenderer content={selectedStep.detailed_content} />
                          </>
                        );
                      } else {
                        return (
                          <>
                            <h2>{selectedStep.title}</h2>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{selectedStep.description}</p>
                          </>
                        );
                      }
                    })()}
                    
                    <div style={{ 
                      marginTop: '30px', 
                      paddingTop: '20px', 
                      borderTop: '2px solid #e0e0e0',
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap'
                    }}>
                      {isEditingContent ? (
                        <StepContentEditor
                          content={editingContent}
                          onChange={handleContentChange}
                          onCancel={cancelContentEdit}
                          onSave={saveContentEdit}
                        />
                      ) : (
                        <>
                          {(selectedStep.detailed_content || customStepContent[selectedStep.id]) && (
                            <button
                              onClick={() => startEditingContent(selectedStep.id)}
                              style={{
                                padding: '10px 20px',
                                backgroundColor: '#ff9800',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '14px'
                              }}
                            >
                              ✏️ Edit Content
                            </button>
                          )}
                          
                          <button
                            onClick={() => startEditStep(selectedStep)}
                            style={{
                              padding: '10px 20px',
                              backgroundColor: '#0064d2',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '14px'
                            }}
                          >
                            Edit Step
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </article>
            ) : (
              <div className="link-detail placeholder" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h2 style={{ color: '#999', marginBottom: '10px' }}>Select a step</h2>
                <p className="muted small" style={{ color: '#aaa' }}>
                  Pick a step on the left to see details and take action.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
