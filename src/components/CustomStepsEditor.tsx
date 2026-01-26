import React, { useState, useRef, type KeyboardEvent } from 'react';

interface CustomStep {
  id: string;
  text: string;
  title?: string;
  detailedContent?: string;
}

interface CustomStepsEditorProps {
  onStepsChange: (steps: CustomStep[]) => void;
}

export function CustomStepsEditor({ onStepsChange }: CustomStepsEditorProps) {
  const [steps, setSteps] = useState<CustomStep[]>([{ id: '1', text: '', detailedContent: undefined }]);
  const [listType, setListType] = useState<'bullet' | 'numbered'>('bullet');
  const inputRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const updateSteps = (newSteps: CustomStep[]) => {
    setSteps(newSteps);
    onStepsChange(newSteps);
  };

  const updateStep = (index: number, field: 'text' | 'title' | 'detailedContent', value: string) => {
    const newSteps = [...steps];
    if (field === 'text') {
      newSteps[index].text = value;
    } else if (field === 'title') {
      newSteps[index].title = value;
    } else {
      newSteps[index].detailedContent = value;
    }
    updateSteps(newSteps);
  };

  const toggleTitle = (index: number) => {
    const newSteps = [...steps];
    if (newSteps[index].title !== undefined) {
      newSteps[index].title = undefined;
    } else {
      newSteps[index].title = '';
    }
    updateSteps(newSteps);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, index: number, field: 'text' | 'detailedContent') => {
    if (field === 'detailedContent') return; // Don't handle Enter in detailed content
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const currentValue = e.currentTarget.value;
      const cursorPosition = e.currentTarget.selectionStart;
      
      // If cursor is at the end and current item has text, add new item
      if (cursorPosition === currentValue.length && currentValue.trim()) {
        const newSteps = [...steps];
        newSteps.splice(index + 1, 0, { id: `${Date.now()}`, text: '', detailedContent: undefined });
        updateSteps(newSteps);
        
        // Focus new item
        setTimeout(() => {
          const refKey = `text-${index + 1}`;
          inputRefs.current[refKey]?.focus();
        }, 10);
      }
      // If cursor in middle, split content
      else if (cursorPosition < currentValue.length) {
        const beforeCursor = currentValue.substring(0, cursorPosition);
        const afterCursor = currentValue.substring(cursorPosition);
        
        const newSteps = [...steps];
        newSteps[index].text = beforeCursor;
        newSteps.splice(index + 1, 0, { id: `${Date.now()}`, text: afterCursor, detailedContent: undefined });
        updateSteps(newSteps);
        
        // Focus new item
        setTimeout(() => {
          const refKey = `text-${index + 1}`;
          inputRefs.current[refKey]?.focus();
        }, 10);
      }
      // If current item is empty and not first item, remove it
      else if (!currentValue.trim() && index > 0) {
        removeStep(index);
        // Focus previous item
        setTimeout(() => {
          const refKey = `text-${index - 1}`;
          inputRefs.current[refKey]?.focus();
        }, 10);
      }
    }
    // Handle Backspace at beginning
    else if (e.key === 'Backspace' && e.currentTarget.selectionStart === 0 && index > 0) {
      e.preventDefault();
      const currentValue = e.currentTarget.value;
      const newSteps = [...steps];
      const previousStep = newSteps[index - 1];
      
      // Merge with previous
      previousStep.text = previousStep.text + currentValue;
      newSteps.splice(index, 1);
      updateSteps(newSteps);
      
      // Focus previous item at merge point
      setTimeout(() => {
        const refKey = `text-${index - 1}`;
        const input = inputRefs.current[refKey];
        if (input) {
          input.focus();
          const cursorPos = previousStep.text.length - currentValue.length;
          input.setSelectionRange(cursorPos, cursorPos);
        }
      }, 10);
    }
  };

  const addStep = () => {
    const newSteps = [...steps, { id: `${Date.now()}`, text: '', detailedContent: undefined }];
    updateSteps(newSteps);
  };

  const removeStep = (index: number) => {
    if (steps.length === 1) {
      // Don't remove the last step, just clear it
      updateSteps([{ id: steps[0].id, text: '', detailedContent: undefined }]);
    } else {
      const newSteps = steps.filter((_, i) => i !== index);
      updateSteps(newSteps);
    }
  };

  const toggleDetailedContent = (index: number) => {
    const newSteps = [...steps];
    if (newSteps[index].detailedContent !== undefined) {
      newSteps[index].detailedContent = undefined;
    } else {
      newSteps[index].detailedContent = '';
    }
    updateSteps(newSteps);
  };

  const hasContent = steps.some(s => s.text.trim());

  return (
    <div style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '6px', border: '1px solid #ddd' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Editor - Left Side */}
        <div style={{ flex: 1 }}>
          {/* List Type Selector */}
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>List Style:</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setListType('bullet')}
              style={{
                padding: '8px 16px',
                backgroundColor: listType === 'bullet' ? '#0064d2' : 'white',
                color: listType === 'bullet' ? 'white' : '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: listType === 'bullet' ? '600' : 'normal'
              }}
            >
              • Bullet
            </button>
            <button
              type="button"
              onClick={() => setListType('numbered')}
              style={{
                padding: '8px 16px',
                backgroundColor: listType === 'numbered' ? '#0064d2' : 'white',
                color: listType === 'numbered' ? 'white' : '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: listType === 'numbered' ? '600' : 'normal'
              }}
            >
              1. Numbered
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div style={{
          marginBottom: '12px',
          fontSize: '13px',
          color: '#666',
          fontStyle: 'italic',
          backgroundColor: '#e3f2fd',
          padding: '10px',
          borderRadius: '4px',
          borderLeft: '3px solid #0064d2'
        }}>
          💡 Press <strong>Enter</strong> to create new steps, <strong>Shift+Enter</strong> for line breaks within a step
        </div>

        {/* Steps List */}
        <div style={{ marginBottom: '12px' }}>
          {steps.map((step, index) => {
            const hasTitle = step.title !== undefined;
            const hasDetailedContent = step.detailedContent !== undefined;
            const textRefKey = `text-${index}`;
            const titleRefKey = `title-${index}`;
            const detailRefKey = `detail-${index}`;
            
            return (
              <div key={step.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  {/* List marker */}
                  <span style={{
                    minWidth: '28px',
                    paddingTop: '10px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#555'
                  }}>
                    {listType === 'numbered' ? `${index + 1}.` : '•'}
                  </span>

                  {/* Main step content */}
                  <div style={{ flex: 1 }}>
                    {/* Title checkbox */}
                    <div style={{ marginBottom: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#555' }}>
                        <input
                          type="checkbox"
                          checked={hasTitle}
                          onChange={() => toggleTitle(index)}
                          style={{ cursor: 'pointer' }}
                        />
                        <span>Title</span>
                      </label>
                    </div>

                    {/* Title field (if enabled) */}
                    {hasTitle && (
                      <div style={{ marginBottom: '10px' }}>
                        <input
                          type="text"
                          ref={(el) => {
                            inputRefs.current[titleRefKey] = el as any;
                          }}
                          value={step.title}
                          onChange={(e) => updateStep(index, 'title', e.target.value)}
                          placeholder="Enter step title..."
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontFamily: 'inherit',
                            fontWeight: '600'
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Main step text */}
                    <textarea
                      ref={(el) => {
                        inputRefs.current[textRefKey] = el;
                      }}
                      value={step.text}
                      onChange={(e) => updateStep(index, 'text', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index, 'text')}
                      placeholder={hasTitle ? "Enter step content..." : "Enter step description..."}
                      rows={1}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        minHeight: '42px'
                      }}
                    />

                    {/* Additional details checkbox */}
                    <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#555' }}>
                        <input
                          type="checkbox"
                          checked={hasDetailedContent}
                          onChange={() => toggleDetailedContent(index)}
                          style={{ cursor: 'pointer' }}
                        />
                        <span>Additional Details</span>
                      </label>
                    </div>

                    {/* Detailed content area */}
                    {hasDetailedContent && (
                      <div style={{ marginTop: '8px' }}>
                        <textarea
                          ref={(el) => {
                            inputRefs.current[detailRefKey] = el;
                          }}
                          value={step.detailedContent}
                          onChange={(e) => updateStep(index, 'detailedContent', e.target.value)}
                          placeholder="Add detailed explanation, examples, or additional information..."
                          rows={3}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                            backgroundColor: '#fff'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  <div style={{ paddingTop: '4px' }}>
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      title="Remove step"
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

          {/* Add Step Button */}
          <button
            type="button"
            onClick={addStep}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0064d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            + Add Step
          </button>
        </div>

        {/* Preview - Right Side */}
        <div style={{ flex: 1, position: 'sticky', top: '20px', maxHeight: '800px', overflowY: 'auto' }}>
          {hasContent ? (
            <div>
              <div style={{
                backgroundColor: '#0064d2',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '6px 6px 0 0',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>👁️</span>
                <span>Live Preview - Step Detail View</span>
              </div>
              <div style={{
                backgroundColor: 'white',
                border: '2px solid #0064d2',
                borderTop: 'none',
                borderRadius: '0 0 6px 6px',
                maxHeight: '750px',
                overflowY: 'auto'
              }}>
                {steps.filter(s => s.text.trim() || (s.title && s.title.trim())).map((step, index) => (
                  <article key={step.id} className="page link-detail" style={{
                    padding: '24px',
                    borderBottom: index < steps.filter(s => s.text.trim() || (s.title && s.title.trim())).length - 1 ? '1px solid #e0e0e0' : 'none'
                  }}>
                    {/* Display title if it exists, otherwise show text as title AND content */}
                    {step.title && step.title.trim() ? (
                      <>
                        {/* Custom title - Bold, large heading */}
                        <h2 style={{ 
                          fontSize: '24px', 
                          fontWeight: '700', 
                          marginBottom: '16px',
                          color: '#333'
                        }}>
                          {step.title}
                        </h2>
                        {/* Regular-sized content text */}
                        {step.text && step.text.trim() && (
                          <p style={{ 
                            fontSize: '16px', 
                            lineHeight: '1.6',
                            marginBottom: '12px',
                            whiteSpace: 'pre-wrap'
                          }}>
                            {step.text}
                          </p>
                        )}
                      </>
                    ) : (
                      /* No custom title - show text as BOTH title and content (mimics steps section behavior) */
                      <>
                        <h2 style={{ 
                          fontSize: '24px', 
                          fontWeight: '700', 
                          marginBottom: '16px',
                          color: '#333'
                        }}>
                          {step.text}
                        </h2>
                        <p style={{ 
                          fontSize: '16px', 
                          lineHeight: '1.6',
                          marginBottom: '12px',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {step.text}
                        </p>
                      </>
                    )}

                    {/* Detailed Content - shown as regular paragraph if present */}
                    {step.detailedContent && step.detailedContent.trim() && (
                      <p style={{ 
                        fontSize: '16px', 
                        lineHeight: '1.6',
                        marginBottom: '12px',
                        whiteSpace: 'pre-wrap',
                        color: '#555'
                      }}>
                        {step.detailedContent}
                      </p>
                    )}

                    {/* Simulated Action Button (for preview purposes) */}
                    <div style={{
                      marginTop: '20px',
                      paddingTop: '20px',
                      borderTop: '1px solid #eee'
                    }}>
                      <button
                        disabled
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#0064d2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'not-allowed',
                          opacity: 0.6
                        }}
                      >
                        Edit Step
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '40px 20px',
              borderRadius: '6px',
              border: '2px dashed #ccc',
              textAlign: 'center',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>👁️</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#999', fontSize: '16px' }}>Preview</h3>
              <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>
                Start typing to see your steps appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomStepsEditor;
