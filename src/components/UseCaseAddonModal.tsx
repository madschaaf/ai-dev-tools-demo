import { useState, useEffect } from 'react';
import { AddonStepOrdering } from './AddonStepOrdering';
import type { DetailedContentItem } from './StepContentRenderer';

interface UseCase {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
}

interface UseCaseStep {
  id: string;
  title: string;
  description: string;
  detailed_content?: DetailedContentItem[];
  order_index: number;
  category: string;
  is_custom: boolean;
}

interface AddonStep {
  step_id: string | null;
  step_order: number;
  source_use_case_id: string;
  source_use_case_title?: string;
  custom_step_title?: string;
  custom_step_description?: string;
  custom_step_content?: any;
  title?: string;
  description?: string;
  category?: string;
  is_custom?: boolean;
}

interface UseCaseAddonModalProps {
  isOpen: boolean;
  baseUseCase: UseCase;
  onClose: () => void;
  onSave: (addonData: {
    addon_use_case_id: string;
    path_name: string;
    description: string;
    steps: AddonStep[];
  }) => Promise<void>;
}

export function UseCaseAddonModal({ isOpen, baseUseCase, onClose, onSave }: UseCaseAddonModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUseCases, setAvailableUseCases] = useState<UseCase[]>([]);
  const [selectedAddon, setSelectedAddon] = useState<UseCase | null>(null);
  const [pathName, setPathName] = useState('');
  const [description, setDescription] = useState('');
  const [baseSteps, setBaseSteps] = useState<UseCaseStep[]>([]);
  const [addonSteps, setAddonSteps] = useState<UseCaseStep[]>([]);
  const [orderedSteps, setOrderedSteps] = useState<AddonStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchAvailableUseCases();
      fetchBaseSteps();
    }
  }, [isOpen, baseUseCase.id]);

  useEffect(() => {
    if (selectedAddon) {
      fetchAddonSteps(selectedAddon.id);
      // Auto-fill path name
      setPathName(`${baseUseCase.title} + ${selectedAddon.title}`);
    }
  }, [selectedAddon]);

  const fetchAvailableUseCases = async () => {
    try {
      console.log('Fetching available addons for:', baseUseCase.id);
      const response = await fetch(`/api/use-cases/${baseUseCase.id}/available-addons`);
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Full API response:', data);
        
        // The API returns { use_cases: [...] }
        const useCases = data.use_cases || data.availableUseCases || [];
        console.log('Setting available use cases:', useCases);
        setAvailableUseCases(useCases);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch available use cases:', response.status, errorText);
        setError(`Failed to load available use cases: ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching available use cases:', err);
      setError('Failed to load available use cases');
    }
  };

  const fetchBaseSteps = async () => {
    try {
      const response = await fetch(`/api/use-cases/${baseUseCase.id}?includeSteps=true`);
      if (response.ok) {
        const result = await response.json();
        const data = result.success ? result.data : result;
        setBaseSteps(data.steps || []);
      }
    } catch (err) {
      console.error('Error fetching base steps:', err);
    }
  };

  const fetchAddonSteps = async (addonId: string) => {
    try {
      const response = await fetch(`/api/use-cases/${addonId}?includeSteps=true`);
      if (response.ok) {
        const result = await response.json();
        const data = result.success ? result.data : result;
        setAddonSteps(data.steps || []);
      }
    } catch (err) {
      console.error('Error fetching addon steps:', err);
    }
  };

  const handleSelectAddon = (useCase: UseCase) => {
    setSelectedAddon(useCase);
    setError(null);
  };

  const handleSave = async () => {
    if (!selectedAddon) {
      setError('Please select an addon use case');
      return;
    }

    if (!pathName.trim()) {
      setError('Please provide a path name');
      return;
    }

    if (orderedSteps.length === 0) {
      setError('Please add at least one step to the path');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onSave({
        addon_use_case_id: selectedAddon.id,
        path_name: pathName,
        description: description,
        steps: orderedSteps.map((step, index) => ({
          ...step,
          step_order: index + 1
        }))
      });
      handleClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save addon path');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedAddon(null);
    setPathName('');
    setDescription('');
    setOrderedSteps([]);
    setAddonSteps([]);
    setError(null);
    onClose();
  };

  const filteredUseCases = availableUseCases.filter(uc =>
    uc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Debug logging
  console.log('Search Query:', searchQuery);
  console.log('Available Use Cases:', availableUseCases.length);
  console.log('Filtered Use Cases:', filteredUseCases.length);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '2px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#333' }}>
              ➕ Add Learning Path(admin only)
            </h2>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              Base Use Case: <strong>{baseUseCase.title}</strong>
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#666',
              padding: '0 8px'
            }}
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px'
        }}>
          {!selectedAddon ? (
            // Step 1: Select Addon Use Case
            <div>
              <h3 style={{ marginTop: 0, color: '#333' }}>Step 1: Select Addon Use Case</h3>
              
              <input
                type="text"
                placeholder="🔍 Search use cases by title or description..."
                value={searchQuery}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('Input changed to:', newValue);
                  setSearchQuery(newValue);
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0064d2';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#ddd';
                }}
              />

              {searchQuery && (
                <div style={{
                  marginBottom: '16px',
                  padding: '8px 12px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  color: '#0064d2',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    Showing {filteredUseCases.length} of {availableUseCases.length} use cases
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0064d2',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '14px'
                    }}
                  >
                    Clear search
                  </button>
                </div>
              )}

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {filteredUseCases.map(uc => (
                  <div
                    key={uc.id}
                    onClick={() => handleSelectAddon(uc)}
                    style={{
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0064d2';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 100, 210, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#ddd';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {uc.thumbnail_url && (
                      <img
                        src={uc.thumbnail_url}
                        alt={uc.title}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          marginBottom: '12px'
                        }}
                      />
                    )}
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#333' }}>
                      {uc.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
                      {uc.description}
                    </p>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '8px',
                      padding: '4px 12px',
                      backgroundColor: '#e3f2fd',
                      color: '#0064d2',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {uc.category}
                    </span>
                  </div>
                ))}
              </div>

              {filteredUseCases.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                  No available use cases found. Try adjusting your search.
                </p>
              )}
            </div>
          ) : (
            // Step 2: Configure Path and Order Steps
            <div>
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => {
                    setSelectedAddon(null);
                    setOrderedSteps([]);
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f0f0f0',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ← Back
                </button>
                <h3 style={{ margin: 0, color: '#333' }}>
                  Step 2: Configure Learning Path
                </h3>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                  <strong>Selected Combination:</strong>
                </p>
                <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                  {baseUseCase.title} <span style={{ color: '#0064d2', fontWeight: 'bold' }}>+</span> {selectedAddon.title}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Path Name *
                </label>
                <input
                  type="text"
                  value={pathName}
                  onChange={(e) => setPathName(e.target.value)}
                  placeholder="e.g., Generate Video for Website"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '6px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this learning path..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '6px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <AddonStepOrdering
                baseUseCase={baseUseCase}
                baseSteps={baseSteps}
                addonUseCase={selectedAddon}
                addonSteps={addonSteps}
                orderedSteps={orderedSteps}
                onStepsChange={setOrderedSteps}
              />
            </div>
          )}

          {error && (
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '6px',
              color: '#c33'
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px',
          borderTop: '2px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handleClose}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>

          {selectedAddon && (
            <button
              onClick={handleSave}
              disabled={isLoading}
              style={{
                padding: '12px 32px',
                backgroundColor: isLoading ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {isLoading ? 'Saving...' : '💾 Save Learning Path'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
