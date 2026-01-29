import React, { useState } from 'react';
import '../styles/theme.css';
import { DYNAMIC_STEPS, type DynamicStep } from './Steps/DynamicSteps/stepsData';
import { StepContentRenderer } from '../components/StepContentRenderer';
import { StepContentEditor } from '../components/StepContentEditor';
import { CustomStepsEditor } from '../components/CustomStepsEditor';
import type { DetailedContentItem } from '../components/StepContentRenderer';

interface MediaItem {
  type: 'image' | 'file' | 'link' | 'github' | 'wiki';
  name: string;
  url: string;
  file?: File;
}

interface GeneratedStep {
  id: string;
  title: string;
  detailed_content: DetailedContentItem[];
  aiTools: string[];
}

interface ToolWithLink {
  name: string;
  url: string;
}

const AI_TOOLS = [
  { name: 'ChatGPT', url: 'https://chatgpt.com/' },
  { name: 'GitHub Copilot', url: 'https://github.com/ebay-copilot' },
  { name: 'Claude.ai', url: 'https://claude.ai/' },
  { name: 'Cline', url: 'https://github.corp.ebay.com/DevGenAI/cline/releases' },
  { name: 'Cursor', url: 'https://www.cursor.so/' },
  { name: 'V0', url: 'https://v0.ai/' },
  { name: 'Windsurf', url: 'https://windsurf.ai/' },
  { name: 'Google Gemini', url: 'https://gemini.google/' },
  { name: 'Poolside', url: 'https://poolside.ai/' },
  { name: 'NotebookLM', url: 'https://notebooklm.google.com/' }
];

export default function SimplifiedUseCaseSubmission() {
  // Simple form fields
  // AI Tool autocomplete state - now stores objects with name and url
  const [toolsAndTechnologies, setToolsAndTechnologies] = useState<ToolWithLink[]>([]);
  const [toolSearchTerm, setToolSearchTerm] = useState('');
  const [showToolDropdown, setShowToolDropdown] = useState(false);
  const [whatCreated, setWhatCreated] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [useUploadedAsThumbnail, setUseUploadedAsThumbnail] = useState(true);
  const [customThumbnail, setCustomThumbnail] = useState<string | null>(null);
  
  // Categories and estimated time
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  

  
  // Generated steps
  const [generatedSteps, setGeneratedSteps] = useState<GeneratedStep[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Step editing state (from UseCasePrototype)
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [draggedStepIndex, setDraggedStepIndex] = useState<number | null>(null);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editStepTitle, setEditStepTitle] = useState('');
  const [editStepContent, setEditStepContent] = useState<DetailedContentItem[]>([]);
  const [stepComments, setStepComments] = useState<{[key: string]: string}>({});
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<DetailedContentItem[]>([]);
  const [customStepContent, setCustomStepContent] = useState<{[key: string]: DetailedContentItem[]}>({});
  const [fullCustomStepData, setFullCustomStepData] = useState<{[key: string]: any}>({});

  // AI Tool autocomplete handlers
  const filteredTools = AI_TOOLS.filter(tool => 
    !toolsAndTechnologies.some(t => t.name === tool.name) && 
    tool.name.toLowerCase().includes(toolSearchTerm.toLowerCase())
  );

  const addTool = (toolName: string, toolUrl?: string) => {
    const trimmedTool = toolName.trim();
    if (trimmedTool && !toolsAndTechnologies.some(t => t.name === trimmedTool)) {
      // Check if this is a predefined tool
      const predefinedTool = AI_TOOLS.find(t => t.name === trimmedTool);
      const url = toolUrl || predefinedTool?.url || '';
      
      setToolsAndTechnologies([...toolsAndTechnologies, { name: trimmedTool, url }]);
      setToolSearchTerm('');
      setShowToolDropdown(false);
    }
  };

  const removeTool = (toolName: string) => {
    setToolsAndTechnologies(toolsAndTechnologies.filter(t => t.name !== toolName));
  };

  const updateToolUrl = (toolName: string, newUrl: string) => {
    setToolsAndTechnologies(toolsAndTechnologies.map(t => 
      t.name === toolName ? { ...t, url: newUrl } : t
    ));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        // Add to media items
        setMediaItems([...mediaItems, {
          type: 'image',
          name: file.name,
          url: result,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaItems([...mediaItems, {
        type: 'file',
        name: file.name,
        url: URL.createObjectURL(file),
        file: file
      }]);
    }
  };

  const addMediaLink = () => {
    if (newMediaName && newMediaUrl) {
      const type = newMediaUrl.includes('github.com') ? 'github' 
                 : newMediaUrl.includes('wiki') || newMediaUrl.includes('confluence') ? 'wiki'
                 : 'link';
      
      setMediaItems([...mediaItems, {
        type: type as any,
        name: newMediaName,
        url: newMediaUrl
      }]);
      setNewMediaName('');
      setNewMediaUrl('');
    }
  };

  const removeMediaItem = (index: number) => {
    setMediaItems(mediaItems.filter((_, i) => i !== index));
  };

  const addCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategories([...categories, trimmedCategory]);
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const handleAIAutofill = async () => {
    setIsGenerating(true);
    
    try {
      // 1. Check for pre-configured steps first (Hybrid approach)
      const preConfiguredSteps = DYNAMIC_STEPS.filter(step => 
        step.title.toLowerCase().includes(toolsAndTechnologies.map(tool => tool.name.toLowerCase()).join(' '))
      );
      
      if (preConfiguredSteps.length > 0) {
        // Use pre-configured steps and adapt them
        const adaptedSteps: GeneratedStep[] = preConfiguredSteps.map((step, index) => ({
          id: `step-${Date.now()}-${index}`,
          title: step.title,
          detailed_content: step.detailed_content || [{
            id: 'content-1',
            type: 'text',
            text: step.description
          }],
          aiTools: toolsAndTechnologies.map(t => t.name)
        }));
        setGeneratedSteps(adaptedSteps);
      } else {
        // 2. No pre-configured steps found - Call AI API for custom generation
        const response = await fetch('/api/ai/generate-steps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            toolsAndTechnologies: toolsAndTechnologies.map(t => ({ name: t.name, url: t.url })),
            whatCreated,
            mediaItems: mediaItems.map(item => ({
              type: item.type,
              name: item.name,
              url: item.url
            }))
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate steps from AI');
        }
        
        const { steps } = await response.json();
        setGeneratedSteps(steps);
      }
    } catch (error) {
      console.error('Error generating steps:', error);
      alert('Failed to generate steps. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCustomSteps = (): GeneratedStep[] => {
    const steps: GeneratedStep[] = [];
    
    // Step 1: Setup and Access
    const toolNames = toolsAndTechnologies.map(t => t.name).join(', ');
    const toolLinks = toolsAndTechnologies.map(t => 
      t.url ? `[${t.name}](${t.url})` : t.name
    );
    
    steps.push({
      id: `step-${Date.now()}-1`,
      title: `Set Up ${toolNames}`,
      detailed_content: [
        {
          id: 'intro',
          type: 'text',
          text: `Get started with ${toolNames} to create ${whatCreated}.`
        },
        {
          id: 'access',
          type: 'heading',
          level: 3,
          text: 'Step 1: Access the Tool',
          
        },
        {
          id: 'access-steps',
          type: 'list',
          listStyle: 'numbered',
          items: [
            toolsAndTechnologies.length > 0 && toolsAndTechnologies[0].url
              ? `Navigate to ${toolLinks.join(' and ')}`
              : `Search for "${toolNames}" in your browser`,
            'Sign in with your eBay credentials if required',
            'Verify you have the necessary permissions'
          ]
        }
      ],
      aiTools: toolsAndTechnologies.map(t => t.name)
    });
    
    // Step 2: Creation Process (based on what was created)
    const creationSteps: string[] = [];
    
    // Analyze the creation description to generate steps
    if (whatCreated.toLowerCase().includes('code') || whatCreated.toLowerCase().includes('script')) {
      creationSteps.push(
        'Open a new project or file in your development environment',
        `Use ${toolNames} to generate the initial code structure`,
        'Review the generated code for accuracy',
        'Make necessary adjustments and refinements'
      );
    } else if (whatCreated.toLowerCase().includes('document') || whatCreated.toLowerCase().includes('report')) {
      creationSteps.push(
        `Start a new conversation or document in ${toolNames}`,
        'Provide clear prompts about what you need to create',
        'Review and iterate on the generated content',
        'Export or save your final document'
      );
    } else {
      creationSteps.push(
        `Open ${toolNames} and start a new project`,
        'Describe what you want to create',
        'Follow the AI\'s suggestions and guidance',
        'Iterate until you achieve your desired result'
      );
    }
    
    steps.push({
      id: `step-${Date.now()}-2`,
      title: `Create: ${whatCreated}`,
      detailed_content: [
        {
          id: 'creation-intro',
          type: 'text',
          text: `Follow these steps to create ${whatCreated} using ${toolNames}.`
        },
        {
          id: 'creation-steps',
          type: 'list',
          listStyle: 'numbered',
          items: creationSteps
        },
        {
          id: 'tip',
          type: 'callout',
          variant: 'info',
          text: `**Best Practices**: When using ${toolNames}, be specific with your prompts and iterate based on the results. Don't hesitate to ask for revisions or clarifications.`
        }
      ],
      aiTools: toolsAndTechnologies.map(t => t.name)
    });
    
    // Step 3: Verification and Testing
    if (mediaItems.length > 0) {
      const mediaReferences: DetailedContentItem[] = [
        {
          id: 'verification-intro',
          type: 'text',
          text: 'Verify your creation matches the expected output:'
        },
        {
          id: 'media-section',
          type: 'heading',
          level: 3,
          text: 'Reference Materials'
        }
      ];
      
      // Add media items as references
      mediaItems.forEach((item, index) => {
        if (item.type === 'image') {
          mediaReferences.push({
            id: `media-img-${index}`,
            type: 'text',
            text: `![${item.name}](${item.url})`
          });
        } else if (item.type === 'link' || item.type === 'github' || item.type === 'wiki') {
          mediaReferences.push({
            id: `media-link-${index}`,
            type: 'text',
            text: `- [${item.name}](${item.url})`
          });
        }
      });
      
      steps.push({
        id: `step-${Date.now()}-3`,
        title: 'Verify and Test Your Creation',
        detailed_content: mediaReferences,
        aiTools: toolsAndTechnologies.map(t => t.name)
      });
    }
    
    return steps;
  };

  const getThumbnail = (): string | null => {
    if (!useUploadedAsThumbnail && customThumbnail) {
      return customThumbnail;
    }
    if (uploadedImage) {
      return uploadedImage;
    }
    return null;
  };

  // Step editing handlers (from UseCasePrototype)
  const handleDragStart = (index: number) => {
    setDraggedStepIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedStepIndex === null || draggedStepIndex === index) return;

    const newSteps = [...generatedSteps];
    const draggedStep = newSteps[draggedStepIndex];
    newSteps.splice(draggedStepIndex, 1);
    newSteps.splice(index, 0, draggedStep);
    
    setGeneratedSteps(newSteps);
    setDraggedStepIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedStepIndex(null);
  };

  const removeStep = (stepId: string) => {
    setGeneratedSteps(generatedSteps.filter(s => s.id !== stepId));
    if (selectedStepId === stepId) {
      setSelectedStepId(null);
    }
  };

  const startEditStep = (step: GeneratedStep) => {
    setEditingStepId(step.id);
    setEditStepTitle(step.title);
    setEditStepContent([...step.detailed_content]);
  };

  const saveStepEdit = () => {
    if (editingStepId) {
      setGeneratedSteps(generatedSteps.map(step => 
        step.id === editingStepId 
          ? { ...step, title: editStepTitle, detailed_content: editStepContent }
          : step
      ));
      setEditingStepId(null);
      setEditStepTitle('');
      setEditStepContent([]);
    }
  };

  const startEditingContent = (stepId: string) => {
    const step = generatedSteps.find(s => s.id === stepId);
    const customContent = customStepContent[stepId];
    
    if (customContent) {
      setEditingContent([...customContent]);
    } else if (step?.detailed_content) {
      setEditingContent([...step.detailed_content]);
    } else {
      setEditingContent([{
        id: 'intro',
        type: 'text',
        text: step?.title || ''
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
      // Also update the generated step
      setGeneratedSteps(generatedSteps.map(step =>
        step.id === selectedStepId
          ? { ...step, detailed_content: editingContent }
          : step
      ));
    }
    setIsEditingContent(false);
    setEditingContent([]);
  };

  const cancelContentEdit = () => {
    setIsEditingContent(false);
    setEditingContent([]);
  };



  const handleSubmit = async () => {
    if (toolsAndTechnologies.length === 0 || !whatCreated) {
      alert('Please fill in the required fields: AI Tool and What You Created');
      return;
    }
    
    setShowPreview(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    try {
      const submissionData = {
        toolsAndTechnologies: toolsAndTechnologies.map(t => ({ name: t.name, url: t.url })),
        whatCreated,
        categories,
        estimatedTime,
        mediaItems: mediaItems.map(item => ({
          type: item.type,
          name: item.name,
          url: item.url
        })),
        thumbnail: getThumbnail(),
        steps: generatedSteps,
        submittedAt: new Date().toISOString()
      };
      
      // In production, this would submit to the API
      console.log('Submitting:', submissionData);
      
      alert('Use case submitted successfully! 🎉');
      setShowPreview(false);
      
      // Reset form
      setToolsAndTechnologies([]);
      setWhatCreated('');
      setCategories([]);
      setEstimatedTime('');
      setMediaItems([]);
      setUploadedImage(null);
      setCustomThumbnail(null);
      setGeneratedSteps([]);
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  if (showPreview) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', paddingTop: '80px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{
            borderBottom: '4px solid #0064d2',
            paddingBottom: '25px',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <h1 style={{ margin: '0 0 12px 0', color: '#0064d2', fontSize: '36px' }}>
              AI Use Case Preview
            </h1>
            <p style={{ color: '#666', fontSize: '18px', margin: 0 }}>
              Review your submission before finalizing
            </p>
          </div>

          {getThumbnail() && (
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <img 
                src={getThumbnail()!} 
                alt="Use case thumbnail" 
                style={{ 
                  maxWidth: '400px', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }} 
              />
            </div>
          )}

          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ color: '#0064d2', borderBottom: '2px solid #e0e0e0', paddingBottom: '12px' }}>
              Overview
            </h2>
            <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
              <div>
                <strong>AI Tools Used:</strong>
                <div style={{ margin: '8px 0' }}>
                  {toolsAndTechnologies.map((tool, index) => (
                    <div key={tool.name} style={{ marginBottom: '4px' }}>
                      <strong>{tool.name}</strong>
                      {tool.url && (
                        <> - <a href={tool.url} target="_blank" rel="noopener noreferrer">{tool.url}</a></>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <strong>What Was Created:</strong>
                <p style={{ margin: '8px 0', whiteSpace: 'pre-wrap' }}>{whatCreated}</p>
              </div>
              {categories.length > 0 && (
                <div>
                  <strong>Categories:</strong>
                  <div style={{ margin: '8px 0', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {categories.map(category => (
                      <span key={category} style={{
                        padding: '4px 12px',
                        backgroundColor: '#e3f2fd',
                        border: '1px solid #0064d2',
                        borderRadius: '12px',
                        fontSize: '13px',
                        color: '#0064d2'
                      }}>
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {estimatedTime && (
                <div>
                  <strong>Estimated Time:</strong>
                  <p style={{ margin: '8px 0' }}>{estimatedTime}</p>
                </div>
              )}
            </div>
          </section>

          {mediaItems.length > 0 && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ color: '#0064d2', borderBottom: '2px solid #e0e0e0', paddingBottom: '12px' }}>
                Related Resources
              </h2>
              <div style={{ marginTop: '20px' }}>
                {mediaItems.map((item, index) => (
                  <div key={index} style={{ 
                    marginBottom: '16px', 
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ 
                      padding: '4px 8px',
                      backgroundColor: '#0064d2',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {item.type}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500' }}>{item.name}</div>
                      {item.type !== 'file' && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#0064d2' }}>
                          {item.url}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {generatedSteps.length > 0 && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ color: '#0064d2', borderBottom: '2px solid #e0e0e0', paddingBottom: '12px' }}>
                Implementation Steps ({generatedSteps.length})
              </h2>
              <div style={{ marginTop: '20px' }}>
                {generatedSteps.map((step, index) => (
                  <article key={step.id} className="page" style={{ 
                    marginBottom: '30px',
                    paddingBottom: '20px',
                    borderBottom: index < generatedSteps.length - 1 ? '1px solid #e0e0e0' : 'none'
                  }}>
                    <h3 style={{ fontSize: '20px', color: '#0064d2', marginBottom: '16px' }}>
                      {index + 1}. {step.title}
                    </h3>
                    {step.aiTools.length > 0 && (
                      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {step.aiTools.map(tool => (
                          <span key={tool} style={{
                            padding: '4px 12px',
                            backgroundColor: '#e3f2fd',
                            color: '#0064d2',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            🤖 {tool}
                          </span>
                        ))}
                      </div>
                    )}
                    <StepContentRenderer content={step.detailed_content} />
                  </article>
                ))}
              </div>
            </section>
          )}

          <div style={{
            borderTop: '3px solid #e0e0e0',
            paddingTop: '35px',
            marginTop: '20px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setShowPreview(false)}
              style={{
                padding: '16px 45px',
                backgroundColor: 'white',
                color: '#666',
                border: '2px solid #999',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '17px'
              }}
            >
              ← Back to Editing
            </button>
            <button
              onClick={handleFinalSubmit}
              style={{
                padding: '16px 45px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '17px',
                boxShadow: '0 4px 8px rgba(40, 167, 69, 0.3)'
              }}
            >
              ✓ Submit Use Case
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', paddingTop: '80px' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginTop: 0, color: '#0064d2' }}>Share Your AI Creation! 🚀</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
          Using AI at eBay? Awesome! Tell us about it in 3 simple steps.
        </p>

        {/* Step 1: AI Tool */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '20px', 
            fontWeight: '600', 
            marginBottom: '12px',
            color: '#333'
          }}>
            1. What AI tool did you use? *
          </label>
          
          {/* Autocomplete Input with Dropdown */}
          {/* Selected AI Tools and Technologies with editable links */}
          <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {toolsAndTechnologies.map(tool => (
              <div
                key={tool.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px'
                }}
              >
                <div
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#e3f2fd',
                    border: '1px solid #0064d2',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#0064d2',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tool.name}
                </div>
                <input
                  type="url"
                  value={tool.url}
                  onChange={(e) => updateToolUrl(tool.name, e.target.value)}
                  placeholder="https://..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={() => removeTool(tool.name)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '20px',
                    padding: '4px 8px',
                    lineHeight: '1'
                  }}
                  title="Remove tool"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Tool Input/Dropdown */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search or add a new tool..."
              value={toolSearchTerm}
              onChange={(e) => {
                setToolSearchTerm(e.target.value);
                setShowToolDropdown(true);
              }}
              onFocus={() => setShowToolDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && toolSearchTerm.trim()) {
                  e.preventDefault();
                  addTool(toolSearchTerm);
                }
              }}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            
            {showToolDropdown && (toolSearchTerm || filteredTools.length > 0) && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                {filteredTools.map(tool => (
                  <div
                    key={tool.name}
                    onClick={() => addTool(tool.name, tool.url)}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <div style={{ fontWeight: '500' }}>{tool.name}</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{tool.url}</div>
                  </div>
                ))}
                
                {toolSearchTerm && !AI_TOOLS.some(t => t.name.toLowerCase() === toolSearchTerm.toLowerCase()) && (
                  <div
                    onClick={() => addTool(toolSearchTerm)}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      backgroundColor: '#f8f9fa',
                      fontWeight: '500',
                      color: '#0064d2'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  >
                    + Add "{toolSearchTerm}" (custom tool)
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Close dropdown when clicking outside */}
          {showToolDropdown && (
            <div
              onClick={() => setShowToolDropdown(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999
              }}
            />
          )}
        </div>


        {/* Step 2: What Created */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '20px', 
            fontWeight: '600', 
            marginBottom: '12px',
            color: '#333'
          }}>
            2. What did you create? *
          </label>
          <textarea
            value={whatCreated}
            onChange={(e) => setWhatCreated(e.target.value)}
            placeholder="Describe what you built or created with AI... (e.g., 'Built an automated report generator using Claude', 'Created custom VS Code snippets with Copilot')"
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Step 3: Show Me */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '20px', 
            fontWeight: '600', 
            marginBottom: '12px',
            color: '#333'
          }}>
            3. Can you show me?
          </label>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Upload images, files, or add links to GitHub repos, Wiki pages, or other resources.
          </p>

          {/* Upload Image */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              border: '2px dashed #0064d2',
              borderRadius: '8px',
              padding: '30px',
              textAlign: 'center',
              backgroundColor: '#f8f9fa',
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('image-upload')?.click()}
            >
              {uploadedImage ? (
                <div>
                  <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '300px', marginBottom: '16px', borderRadius: '6px' }} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(null);
                      setMediaItems(mediaItems.filter(item => item.type !== 'image' || item.url !== uploadedImage));
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📸</div>
                  <p style={{ margin: 0, fontSize: '16px', color: '#0064d2', fontWeight: '500' }}>
                    Click to upload an image
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#666' }}>
                    Screenshots, diagrams, or photos of your creation
                  </p>
                </>
              )}
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            
            {uploadedImage && (
              <div style={{ 
                marginTop: '12px', 
                padding: '12px',
                backgroundColor: '#f0f8ff',
                borderRadius: '6px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={useUploadedAsThumbnail}
                    onChange={(e) => setUseUploadedAsThumbnail(e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  <span>Use uploaded image as thumbnail for this use case</span>
                </label>
                
                {!useUploadedAsThumbnail && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                      Upload a different thumbnail:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => setCustomThumbnail(e.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        width: '100%'
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Visual Separator */}
          <div style={{ 
            borderTop: '2px solid #e0e0e0', 
            margin: '30px 0',
            position: 'relative'
          }}>
            <span style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '0 16px',
              color: ' #d1ccd9',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Additional Resources
            </span>
          </div>

          {/* Upload File */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => document.getElementById('file-upload')?.click()}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#0064d2',
                border: '2px solid #0064d2',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                width: '100%'
              }}
            >
              📎 Upload a File
            </button>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Add Links */}
          <div style={{ 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <h4 style={{ marginTop: 0 }}>Add Links</h4>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 12px 0' }}>
              GitHub repos, Wiki pages, Confluence docs, etc.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <input
                type="text"
                placeholder="Link name (e.g., 'GitHub Repo')"
                value={newMediaName}
                onChange={(e) => setNewMediaName(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
              <input
                type="url"
                placeholder="https://..."
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                style={{
                  flex: 2,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
              <button
                onClick={addMediaLink}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#0064d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Add
              </button>
            </div>
          </div>

          {/* Media Items List */}
          {mediaItems.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>Uploaded Resources ({mediaItems.length})</h4>
              {mediaItems.map((item, index) => (
                <div key={index} style={{
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ 
                      padding: '2px 8px',
                      backgroundColor: '#0064d2',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '11px',
                      marginRight: '8px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>
                      {item.type}
                    </span>
                    <strong>{item.name}</strong>
                  </div>
                  <button
                    onClick={() => removeMediaItem(index)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

         {/* Estimated Time */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '8px',
            color: '#333'
          }}>
            Estimated Time to Complete
          </label>
          <input
            type="text"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            placeholder="e.g., 30 minutes, 2 hours, 1 week..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>


        {/* Category Tags */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '8px',
            color: '#333'
          }}>
            Categories
          </label>
          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
            Add tags to categorize this use case
          </p>
          
          {/* Selected Categories */}
          {categories.length > 0 && (
            <div style={{ marginBottom: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.map(category => (
                <div
                  key={category}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    backgroundColor: '#e3f2fd',
                    border: '1px solid #0064d2',
                    borderRadius: '16px',
                    fontSize: '14px'
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{category}</span>
                  <button
                    onClick={() => removeCategory(category)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0064d2',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '0',
                      lineHeight: '1'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          
          {/* Add Category Input */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="e.g., Prompt Engineering, Data Analysis, Testing..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCategory();
                }
              }}
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <button
              onClick={addCategory}
              disabled={!newCategory.trim()}
              style={{
                padding: '10px 20px',
                backgroundColor: newCategory.trim() ? '#0064d2' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: newCategory.trim() ? 'pointer' : 'not-allowed',
                fontWeight: '500'
              }}
            >
              Add
            </button>
          </div>
        </div>

       
        {/* AI Autofill Button */}
        <div style={{
          padding: '30px',
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, fontSize: '22px' }}>
            ✨ AI Magic Time!
          </h3>
          <p style={{ color: 'white', margin: '0 0 20px 0', fontSize: '16px', opacity: 0.9 }}>
            Let AI analyze your inputs and generate clear, step-by-step instructions
          </p>
          <button
            onClick={handleAIAutofill}
            disabled={toolsAndTechnologies.length === 0 || !whatCreated || isGenerating}
            style={{
              padding: '16px 32px',
              backgroundColor: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '6px',
              cursor: toolsAndTechnologies.length === 0 || !whatCreated || isGenerating ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              fontWeight: '700',
              opacity: toolsAndTechnologies.length === 0 || !whatCreated || isGenerating ? 0.6 : 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              if (toolsAndTechnologies.length > 0 && whatCreated && !isGenerating) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isGenerating ? '🔄 Generating Steps...' : '🤖 Generate Steps with AI'}
          </button>
          {(toolsAndTechnologies.length === 0 || !whatCreated) && (
            <p style={{ color: 'white', margin: '12px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
              Fill in required fields above to enable AI generation
            </p>
          )}
        </div>

        {/* Generated Steps Preview */}
        {generatedSteps.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#0064d2', marginBottom: '16px' }}>
              Generated Steps ({generatedSteps.length})
            </h3>
            <div style={{
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f8f9fa'
            }}>
              {generatedSteps.map((step, index) => (
                <div key={step.id} style={{
                  marginBottom: index < generatedSteps.length - 1 ? '20px' : 0,
                  paddingBottom: index < generatedSteps.length - 1 ? '20px' : 0,
                  borderBottom: index < generatedSteps.length - 1 ? '1px solid #ddd' : 'none'
                }}>
                  <h4 style={{ color: '#0064d2', marginTop: 0 }}>
                    {index + 1}. {step.title}
                  </h4>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {step.detailed_content.length} content items • Uses {step.aiTools.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={handleSubmit}
            disabled={toolsAndTechnologies.length === 0 || !whatCreated}
            style={{
              padding: '16px 48px',
              backgroundColor: toolsAndTechnologies.length === 0 || !whatCreated ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: toolsAndTechnologies.length === 0 || !whatCreated ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              fontWeight: '700',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            Preview & Submit
          </button>
        </div>
      </div>
    </div>
  );
}
