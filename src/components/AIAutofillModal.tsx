import React from 'react';

export interface AutofillOption {
  value: 'overwrite' | 'keep-both' | 'empty-only' | 'cancel';
  label: string;
  description: string;
  icon: string;
}

interface AIAutofillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (option: AutofillOption['value']) => void;
  hasExistingData: boolean;
  autofillPreview?: {
    fieldsToFill: number;
    existingFields: number;
    emptyFields: number;
  };
}

export default function AIAutofillModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  hasExistingData,
  autofillPreview 
}: AIAutofillModalProps) {
  if (!isOpen) return null;

  const options: AutofillOption[] = [
    {
      value: 'overwrite',
      label: 'Overwrite All',
      description: 'Replace all existing content with AI-generated content',
      icon: '🔄'
    },
    {
      value: 'keep-both',
      label: 'Keep Both',
      description: 'Add AI suggestions below your existing content in each field',
      icon: '📝'
    },
    {
      value: 'empty-only',
      label: 'Fill Empty Only',
      description: 'Only populate fields that are currently empty',
      icon: '✨'
    },
    {
      value: 'cancel',
      label: 'Cancel',
      description: 'Cancel AI autofill and keep current form as-is',
      icon: '❌'
    }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
          <h2 style={{ margin: '0 0 8px 0', color: '#0064d2' }}>
            AI Autofill Ready
          </h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Choose how you'd like to handle the AI-generated content
          </p>
        </div>

        {/* Preview Stats */}
        {autofillPreview && hasExistingData && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #e0e0e0'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#333' }}>
              Content Preview:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0064d2' }}>
                  {autofillPreview.fieldsToFill}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Fields to Fill</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff9800' }}>
                  {autofillPreview.existingFields}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>With Content</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                  {autofillPreview.emptyFields}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Empty Fields</div>
              </div>
            </div>
          </div>
        )}

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {options.map((option) => {
            const isRecommended = hasExistingData && option.value === 'keep-both';
            const isCancel = option.value === 'cancel';
            
            return (
              <button
                key={option.value}
                onClick={() => onConfirm(option.value)}
                style={{
                  padding: '16px',
                  border: isRecommended ? '2px solid #0064d2' : 
                          isCancel ? '2px solid #dc3545' : '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: isCancel ? '#fff' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isCancel) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                    e.currentTarget.style.borderColor = '#0064d2';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.borderColor = isRecommended ? '#0064d2' : 
                                                       isCancel ? '#dc3545' : '#ddd';
                }}
              >
                {isRecommended && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '12px',
                    backgroundColor: '#0064d2',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    RECOMMENDED
                  </div>
                )}
                <div style={{ fontSize: '32px' }}>{option.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: '600', 
                    marginBottom: '4px',
                    color: isCancel ? '#dc3545' : '#333'
                  }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
                    {option.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Banner */}
        {hasExistingData && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fff4e6',
            border: '1px solid #ff9800',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#663c00'
          }}>
            <strong>💡 Tip:</strong> We recommend "Keep Both" to preserve your work while reviewing AI suggestions.
            You can always edit the fields afterwards.
          </div>
        )}
      </div>
    </div>
  );
}
