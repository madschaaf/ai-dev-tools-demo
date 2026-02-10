import React, { useState } from 'react';
import '../styles/theme.css';
import { StepContentRenderer } from '../components/StepContentRenderer';
import { StepContentEditor } from '../components/StepContentEditor';
import type { DetailedContentItem } from '../components/StepContentRenderer';
import AIAutofillUpload, { type AutofillData } from '../components/SimplifiedAIAutofillUpload';
import { DYNAMIC_STEPS } from './Steps/DynamicSteps/stepsData';

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
  estimatedTime?: string;
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
  { name: 'NotebookLM', url: 'https://notebooklm.google.com/' },
  { name: 'Zoom AI Companion', url: 'https://zoom.us/ai-companion' }
];

const NON_AI_TECHNOLOGIES = [
  'Slack',
  'Zoom',
  'Jira',
  'Confluence',
  'Microsoft Teams',
  'Google Workspace',
  'Asana',
  'Trello',
  'Monday.com',
  'Notion',
  'Figma',
  'Adobe Creative Suite',
  'Salesforce',
  'ServiceNow',
  'Docker',
  'Kubernetes',
  'Jenkins',
  'Git',
  'PostgreSQL',
  'MongoDB'
];

const IDE_OPTIONS = [
  'VS Code',
  'IntelliJ IDEA',
  'PyCharm',
  'WebStorm',
  'Eclipse',
  'Visual Studio',
  'Xcode',
  'Android Studio',
  'Sublime Text',
  'Atom',
  'Vim',
  'Emacs',
  'Cursor',
  'Windsurf'
];

const PROGRAMMING_LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'C++',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'Scala',
  'R',
  'SQL',
  'HTML/CSS',
  'Shell/Bash'
];

const CATEGORY_OPTIONS = [
  'Workforce',
  'Knowledge',
  'Productivity',
  'IT Services',
  'AI Tools',
  'Collaboration'
];

// Pre-defined Zoom + NotebookLM workflow steps
const ZOOM_NOTEBOOK_STEPS: GeneratedStep[] = [
  {
    id: 'step-1-capture-zoom',
    title: 'Capture content in Zoom',
    estimatedTime: '5 minutes',
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
    ],
    aiTools: ['Zoom AI Companion']
  },
  {
    id: 'step-2-open-notebooklm',
    title: 'Open NotebookLM',
    estimatedTime: '5 minutes',
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
    ],
    aiTools: ['NotebookLM']
  },
  {
    id: 'step-3-add-zoom-content',
    title: 'Add your Zoom content',
    estimatedTime: '5 minutes',
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
    ],
    aiTools: ['NotebookLM']
  },
  {
    id: 'step-4-generate-slides',
    title: 'Generate the slide deck',
    estimatedTime: '5 minutes',
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
    ],
    aiTools: ['NotebookLM']
  }
];

export default function StaticSubmission() {
  // Simple form fields
  const [toolsAndTechnologies, setToolsAndTechnologies] = useState<ToolWithLink[]>([]);
  const [toolSearchTerm, setToolSearchTerm] = useState('');
  const [showToolDropdown, setShowToolDropdown] = useState(false);
  const [nonAiToolsSection1, setNonAiToolsSection1] = useState<string[]>([]);
  const [nonAiToolSearchSection1, setNonAiToolSearchSection1] = useState('');
  const [showNonAiToolDropdownSection1, setShowNonAiToolDropdownSection1] = useState(false);
  const [whatCreated, setWhatCreated] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [uploadedImages, setUploadedImages] = useState<Array<{ id: string; url: string; name: string; file?: File }>>([]);
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  
  // Calculate max documents based on images (total limit of 5)
  const MAX_TOTAL_FILES = 5;
  const maxDocuments = MAX_TOTAL_FILES - uploadedImages.length;
  
  // Use case members
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [useCaseLeadName, setUseCaseLeadName] = useState('Maddy Schaaf');
  const [responsibleMembers, setResponsibleMembers] = useState<string[]>(['Maddy Schaaf']);
  const [memberSearchTerm, setMemberSearchTerm] = useState('');

  // Categories - dropdown based
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Estimated time (will be removed from standalone field, moved to steps)
  const [estimatedTime, setEstimatedTime] = useState('');
  
  // Additional Information
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [nonAiTechnologies, setNonAiTechnologies] = useState<string[]>([]);
  const [nonAiTechSearchTerm, setNonAiTechSearchTerm] = useState('');
  const [showNonAiTechDropdown, setShowNonAiTechDropdown] = useState(false);
  const [technicalDetails, setTechnicalDetails] = useState('');
  const [dataRequirements, setDataRequirements] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState('');
  
  // Auto-determine IDE based on language and AI tool selection
  const getAutoSelectedIde = (): string => {
    if (selectedLanguages.length === 0) return '';
    if (toolsAndTechnologies.some(tool => tool.name.toLowerCase() === 'cursor')) {
      return 'Cursor';
    }
    return 'VS Code';
  };
  
  // AI Autofill state
  const [autofillData, setAutofillData] = useState<AutofillData | null>(null);
  const [autofillSource, setAutofillSource] = useState<{ type: 'link' | 'file'; value: string } | null>(null);
  const [showAutofillModal, setShowAutofillModal] = useState(false);
  
  // Generated steps
  const [generatedSteps, setGeneratedSteps] = useState<GeneratedStep[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Step editing state
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [draggedStepIndex, setDraggedStepIndex] = useState<number | null>(null);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<DetailedContentItem[]>([]);
  const [customStepContent, setCustomStepContent] = useState<{[key: string]: DetailedContentItem[]}>({});
  const [previewStepId, setPreviewStepId] = useState<string | null>(null);
  const [stepSearchTerm, setStepSearchTerm] = useState('');
  const [showStepDropdown, setShowStepDropdown] = useState(false);

  // Create custom step state
  const [showCreateStepModal, setShowCreateStepModal] = useState(false);
  const [newCustomStepData, setNewCustomStepData] = useState({
    title: '',
    description: '',
    category: 'install' as 'security' | 'access' | 'admin' | 'install' | 'setup' | 'config' | 'practice'
  });
  const [newStepEditingContent, setNewStepEditingContent] = useState<DetailedContentItem[]>([{
    id: 'intro',
    type: 'text' as const,
    text: 'Add your step content here...'
  }]);

  // Preview state
  const [showPreview, setShowPreview] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [useCaseName, setUseCaseName] = useState('');

  // AI Tool autocomplete handlers
  const filteredTools = AI_TOOLS.filter(tool => 
    !toolsAndTechnologies.some(t => t.name === tool.name) && 
    tool.name.toLowerCase().includes(toolSearchTerm.toLowerCase())
  );

  const addTool = (toolName: string, toolUrl?: string) => {
    const trimmedTool = toolName.trim();
    if (trimmedTool && !toolsAndTechnologies.some(t => t.name === trimmedTool)) {
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

  // Non-AI Tools Section 1 handlers
  const filteredNonAiToolsSection1 = NON_AI_TECHNOLOGIES.filter(tech => 
    !nonAiToolsSection1.includes(tech) && 
    tech.toLowerCase().includes(nonAiToolSearchSection1.toLowerCase())
  );

  const addNonAiToolSection1 = (techName: string) => {
    const trimmedTech = techName.trim();
    if (trimmedTech && !nonAiToolsSection1.includes(trimmedTech)) {
      setNonAiToolsSection1([...nonAiToolsSection1, trimmedTech]);
      setNonAiToolSearchSection1('');
      setShowNonAiToolDropdownSection1(false);
    }
  };

  const removeNonAiToolSection1 = (techName: string) => {
    setNonAiToolsSection1(nonAiToolsSection1.filter(t => t !== techName));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const imageId = `img-${Date.now()}`;
        const newImage = {
          id: imageId,
          url: result,
          name: file.name,
          file: file
        };
        
        setUploadedImages([...uploadedImages, newImage]);
        
        if (uploadedImages.length === 0) {
          setSelectedThumbnailId(imageId);
        }
        
        setMediaItems([...mediaItems, {
          type: 'image',
          name: file.name,
          url: result,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const removeImage = (imageId: string) => {
    const imageToRemove = uploadedImages.find(img => img.id === imageId);
    setUploadedImages(uploadedImages.filter(img => img.id !== imageId));
    
    if (selectedThumbnailId === imageId) {
      const remainingImages = uploadedImages.filter(img => img.id !== imageId);
      setSelectedThumbnailId(remainingImages.length > 0 ? remainingImages[0].id : null);
    }
    
    if (imageToRemove) {
      setMediaItems(mediaItems.filter(item => 
        !(item.type === 'image' && item.url === imageToRemove.url)
      ));
    }
  };

  const selectThumbnail = (imageId: string) => {
    if (selectedThumbnailId === imageId) {
      setSelectedThumbnailId(null);
    } else {
      setSelectedThumbnailId(imageId);
    }
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

  // Non-AI Technology handlers
  const filteredNonAiTech = NON_AI_TECHNOLOGIES.filter(tech => 
    !nonAiTechnologies.includes(tech) && 
    tech.toLowerCase().includes(nonAiTechSearchTerm.toLowerCase())
  );

  const addNonAiTech = (techName: string) => {
    const trimmedTech = techName.trim();
    if (trimmedTech && !nonAiTechnologies.includes(trimmedTech)) {
      setNonAiTechnologies([...nonAiTechnologies, trimmedTech]);
      setNonAiTechSearchTerm('');
      setShowNonAiTechDropdown(false);
    }
  };

  const removeNonAiTech = (techName: string) => {
    setNonAiTechnologies(nonAiTechnologies.filter(t => t !== techName));
  };

  // Programming Language handlers
  const filteredLanguages = PROGRAMMING_LANGUAGES.filter(lang => 
    !selectedLanguages.includes(lang) && 
    lang.toLowerCase().includes(languageSearchTerm.toLowerCase())
  );

  const addLanguage = (langName: string) => {
    const trimmedLang = langName.trim();
    if (trimmedLang && !selectedLanguages.includes(trimmedLang)) {
      setSelectedLanguages([...selectedLanguages, trimmedLang]);
      setLanguageSearchTerm('');
      setShowLanguageDropdown(false);
    }
  };

  const removeLanguage = (langName: string) => {
    setSelectedLanguages(selectedLanguages.filter(l => l !== langName));
  };

  const handleAutofillReady = (data: AutofillData, source: { type: 'link' | 'file'; value: string }) => {
    setAutofillData(data);
    setAutofillSource(source);
    setShowAutofillModal(true);
  };

  const handleGenerateSteps = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedSteps(ZOOM_NOTEBOOK_STEPS);
      // Auto-fill use case name with default value
      setUseCaseName('Slide Deck with NotebookLM and Zoom');
      setIsGenerating(false);
    }, 500);
  };

  // Predefined steps search and add
  const filteredPredefinedSteps = DYNAMIC_STEPS
    .filter(step => !generatedSteps.find(s => s.id === step.id))
    .filter(step =>
      step.title.toLowerCase().includes(stepSearchTerm.toLowerCase()) ||
      step.description.toLowerCase().includes(stepSearchTerm.toLowerCase()) ||
      (step.category && step.category.toLowerCase().includes(stepSearchTerm.toLowerCase()))
    );

  const addPredefinedStep = (step: typeof DYNAMIC_STEPS[0]) => {
    const newStep: GeneratedStep = {
      id: step.id,
      title: step.title,
      detailed_content: step.detailed_content || [{
        id: 'intro',
        type: 'text',
        text: step.description
      }],
      aiTools: []
    };
    setGeneratedSteps([...generatedSteps, newStep]);
    setStepSearchTerm('');
    setShowStepDropdown(false);
  };

  // Step editing handlers
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

  // Add state for editing title
  const [editingTitle, setEditingTitle] = useState('');
  
  // Refs for auto-scrolling
  const editorScrollRef = React.useRef<HTMLDivElement>(null);
  const previewScrollRef = React.useRef<HTMLDivElement>(null);
  
  // State for sticky add menu
  const [showStickyAddMenu, setShowStickyAddMenu] = useState(false);

  const startEditingContent = (stepId: string) => {
    const step = generatedSteps.find(s => s.id === stepId);
    const customContent = customStepContent[stepId];
    
    // Set the title for editing
    setEditingTitle(step?.title || '');
    
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

  // Auto-scroll both panels when content is added
  React.useEffect(() => {
    if (isEditingContent && editingContent.length > 0) {
      // Small delay to allow DOM to update
      setTimeout(() => {
        if (editorScrollRef.current && previewScrollRef.current) {
          editorScrollRef.current.scrollTo({
            top: editorScrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
          previewScrollRef.current.scrollTo({
            top: previewScrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [editingContent.length, isEditingContent]);

  const saveContentEdit = () => {
    if (selectedStepId) {
      setCustomStepContent({
        ...customStepContent,
        [selectedStepId]: editingContent
      });
      setGeneratedSteps(generatedSteps.map(step =>
        step.id === selectedStepId
          ? { ...step, title: editingTitle, detailed_content: editingContent }
          : step
      ));
    }
    setIsEditingContent(false);
    setEditingContent([]);
    setEditingTitle('');
  };

  const cancelContentEdit = () => {
    setIsEditingContent(false);
    setEditingContent([]);
    setEditingTitle('');
  };

  const duplicateStep = (stepId: string) => {
    const stepToDuplicate = generatedSteps.find(s => s.id === stepId);
    if (stepToDuplicate) {
      const newStep = {
        ...stepToDuplicate,
        id: `${stepToDuplicate.id}-copy-${Date.now()}`,
        title: `${stepToDuplicate.title} (Copy)`
      };
      setGeneratedSteps([...generatedSteps, newStep]);
    }
  };

  const closePreview = () => {
    setPreviewStepId(null);
  };

  // Generate auto title based on AI tools and what was created
  const generateAutoTitle = () => {
    const toolNames = toolsAndTechnologies.map(t => t.name).join(' and ');
    const firstSentence = whatCreated.split('.')[0] || whatCreated;
    
    if (toolNames && firstSentence) {
      return `${firstSentence} with ${toolNames}`;
    } else if (toolNames) {
      return `Use Case with ${toolNames}`;
    } else if (firstSentence) {
      return firstSentence;
    }
    return 'New Use Case';
  };

  const handleSubmit = () => {
    const autoTitle = generateAutoTitle();
    setPreviewTitle(autoTitle);
    setShowPreview(true);
  };

  const closeSubmitPreview = () => {
    setShowPreview(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', paddingTop: '80px' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginTop: 0, color: '#0064d2' }}>Static Submission Demo 🚀</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
          A complete demo with all fields from the simplified submission
        </p>


        {/* Who is Responsible */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <label style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#333'
            }}>
              Who is responsible for this Use Case?
            </label>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#666',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                style={{
                  cursor: 'pointer',
                  width: '16px',
                  height: '16px'
                }}
              />
              Remain anonymous
            </label>
          </div>

          {!isAnonymous && (
            <>
              {/* Display responsible members */}
              <div style={{ marginBottom: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {responsibleMembers.map((member, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 12px',
                      backgroundColor: '#e3f2fd',
                      border: '1px solid #0064d2',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>{member}</span>
                    <button
                      onClick={() => setResponsibleMembers(responsibleMembers.filter((_, i) => i !== index))}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0064d2',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '0',
                        lineHeight: '1'
                      }}
                      title="Remove member"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Search and Add */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Search for name..."
                  value={memberSearchTerm}
                  onChange={(e) => setMemberSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && memberSearchTerm.trim()) {
                      e.preventDefault();
                      if (!responsibleMembers.includes(memberSearchTerm.trim())) {
                        setResponsibleMembers([...responsibleMembers, memberSearchTerm.trim()]);
                        setMemberSearchTerm('');
                      }
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={() => {
                    if (memberSearchTerm.trim() && !responsibleMembers.includes(memberSearchTerm.trim())) {
                      setResponsibleMembers([...responsibleMembers, memberSearchTerm.trim()]);
                      setMemberSearchTerm('');
                    }
                  }}
                  disabled={!memberSearchTerm.trim()}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: memberSearchTerm.trim() ? '#0064d2' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: memberSearchTerm.trim() ? 'pointer' : 'not-allowed',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Add
                </button>
              </div>
            </>
          )}
        </div>

        {/* Step 1: AI Tool and Non-AI Tools */}
        <div style={{ 
          margin: '30px 0',
          padding: '24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px solid #0064d2'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '24px', 
            fontWeight: '700', 
            marginBottom: '24px',
            color: '#0064d2'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#0064d2',
              color: 'white',
              borderRadius: '50%',
              fontSize: '20px',
              fontWeight: '700'
            }}>1</span>
            Tools & Technologies
          </div>

          {/* AI Tools Subsection */}
          <label style={{ 
            display: 'block',
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '12px',
            color: '#333'
          }}>
            What AI tool did you use? *
          </label>
          
          {/* Selected AI Tools */}
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

          {/* Divider */}
          <div style={{ 
          //  borderTop: '2px solid #e0e0e0', 
            margin: '30px 0',
            position: 'relative'
          }}>
            <span style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#f8f9fa',
              padding: '0 16px',
              color: '#999',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              
            </span>
          </div>

          {/* Non-AI Tools & Technologies Subsection */}
          <label style={{ 
            display: 'block',
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '8px',
            color: '#333'
          }}>
            What non-AI tools or technologies did you use? <span style={{ fontWeight: 'normal', color: '#999', fontSize: '14px' }}>(optional)</span>
          </label>
          <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
            Add technologies like Slack, Zoom, Jira, etc.
          </p>
          
          {/* Selected Non-AI Tools */}
          {nonAiToolsSection1.length > 0 && (
            <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {nonAiToolsSection1.map(tech => (
                <div
                  key={tech}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #0064d2',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{tech}</span>
                  <button
                    onClick={() => removeNonAiToolSection1(tech)}
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

          {/* Non-AI Tool Input/Dropdown */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search or add a technology..."
              value={nonAiToolSearchSection1}
              onChange={(e) => {
                setNonAiToolSearchSection1(e.target.value);
                setShowNonAiToolDropdownSection1(true);
              }}
              onFocus={() => setShowNonAiToolDropdownSection1(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && nonAiToolSearchSection1.trim()) {
                  e.preventDefault();
                  addNonAiToolSection1(nonAiToolSearchSection1);
                }
              }}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            />
            
            {showNonAiToolDropdownSection1 && (nonAiToolSearchSection1 || filteredNonAiToolsSection1.length > 0) && (
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
                {filteredNonAiToolsSection1.map(tech => (
                  <div
                    key={tech}
                    onClick={() => addNonAiToolSection1(tech)}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    {tech}
                  </div>
                ))}
                
                {nonAiToolSearchSection1 && !NON_AI_TECHNOLOGIES.some(t => t.toLowerCase() === nonAiToolSearchSection1.toLowerCase()) && (
                  <div
                    onClick={() => addNonAiToolSection1(nonAiToolSearchSection1)}
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
                    + Add "{nonAiToolSearchSection1}"
                  </div>
                )}
              </div>
            )}
          </div>
          
          {showNonAiToolDropdownSection1 && (
            <div
              onClick={() => setShowNonAiToolDropdownSection1(false)}
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
        <div style={{ 
          marginBottom: '30px',
          padding: '24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px solid #0064d2'
        }}>
          <label style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '24px', 
            fontWeight: '700', 
            marginBottom: '16px',
            color: '#0064d2'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#0064d2',
              color: 'white',
              borderRadius: '50%',
              fontSize: '20px',
              fontWeight: '700'
            }}>2</span>
            What did you create? *
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
        <div style={{ 
          marginBottom: '30px',
          padding: '24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px solid #28a745'
        }}>
          <label style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '24px', 
            fontWeight: '700', 
            marginBottom: '12px',
            color: '#28a745'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '50%',
              fontSize: '20px',
              fontWeight: '700'
            }}>3</span>
            Can you show me? 
          </label>
          <div style={{
            padding: '16px',
            backgroundColor: '#d4edda',
            border: '1px solid #28a745',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <p style={{ color: '#155724', margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
              <strong>💡 Helpful but optional:</strong> Add an <strong>image</strong> AND/OR <strong>links</strong> (GitHub, Wiki, etc.) AND/OR <strong>upload files</strong> to help others understand your use case
            </p>
          </div>

          {/* Upload Multiple Images */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {uploadedImages.length > 0 && (
                <p style={{ 
                  fontSize: '13px', 
                  color: uploadedImages.length >= MAX_TOTAL_FILES ? '#dc3545' : '#666',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {uploadedImages.length} / {MAX_TOTAL_FILES} files used
                  {uploadedImages.length < MAX_TOTAL_FILES && ` (${maxDocuments} document${maxDocuments !== 1 ? 's' : ''} available)`}
                </p>
              )}
            </div>
            {uploadedImages.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}>
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    style={{
                      position: 'relative',
                      border: selectedThumbnailId === image.id ? '3px solid #0064d2' : '2px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '8px',
                      backgroundColor: '#fff',
                      boxShadow: selectedThumbnailId === image.id 
                        ? '0 4px 12px rgba(0, 100, 210, 0.2)' 
                        : '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <button
                      onClick={() => removeImage(image.id)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        zIndex: 1
                      }}
                      title="Remove image"
                    >
                      ×
                    </button>
                    
                    <img
                      src={image.url}
                      alt={image.name}
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: '8px'
                      }}
                    />
                    
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '8px',
                        backgroundColor: selectedThumbnailId === image.id ? '#e3f2fd' : '#f8f9fa',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: selectedThumbnailId === image.id ? '600' : '400',
                        color: selectedThumbnailId === image.id ? '#0064d2' : '#333'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedThumbnailId === image.id}
                        onChange={() => selectThumbnail(image.id)}
                        style={{
                          cursor: 'pointer',
                          width: '18px',
                          height: '18px'
                        }}
                      />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {selectedThumbnailId === image.id ? 'Use case thumbnail' : 'Set as thumbnail'}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            <div
              style={{
                border: uploadedImages.length >= MAX_TOTAL_FILES ? '2px dashed #999' : '2px dashed #0064d2',
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: uploadedImages.length >= MAX_TOTAL_FILES ? '#f0f0f0' : '#f8f9fa',
                cursor: uploadedImages.length >= MAX_TOTAL_FILES ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: uploadedImages.length >= MAX_TOTAL_FILES ? 0.6 : 1
              }}
              onClick={() => {
                if (uploadedImages.length < MAX_TOTAL_FILES) {
                  document.getElementById('image-upload')?.click();
                }
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>📸</div>
              <p style={{ margin: 0, fontSize: '16px', color: uploadedImages.length >= MAX_TOTAL_FILES ? '#999' : '#0064d2', fontWeight: '600' }}>
                {uploadedImages.length >= MAX_TOTAL_FILES 
                  ? `Maximum ${MAX_TOTAL_FILES} files reached` 
                  : uploadedImages.length === 0 
                    ? 'Upload an image' 
                    : 'Add another image'}
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#666' }}>
                {uploadedImages.length >= MAX_TOTAL_FILES 
                  ? 'Remove an image or document to upload more' 
                  : 'Screenshots, diagrams, or photos of your creation'}
              </p>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              disabled={uploadedImages.length >= MAX_TOTAL_FILES}
            />
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
              color: '#d1ccd9',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Files & Links
            </span>
          </div>

          <div style={{ 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <AIAutofillUpload 
              onAutofillReady={handleAutofillReady}
              maxDocuments={maxDocuments}
              onFilesChange={(files) => setUploadedDocuments(files)}
            />
          </div>

          {mediaItems.filter(item => item.type !== 'image').length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>Uploaded Resources ({mediaItems.filter(item => item.type !== 'image').length})</h4>
              {mediaItems.filter(item => item.type !== 'image').map((item, index) => (
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Generate Steps Button */}
        <div style={{
          padding: '30px',
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'white', marginTop: 0, fontSize: '22px' }}>
            ✨ Generate Demo Steps
          </h3>
          <p style={{ color: 'white', margin: '0 0 20px 0', fontSize: '16px', opacity: 0.9 }}>
            Click to see the Zoom + NotebookLM workflow steps
          </p>
          <button
            onClick={handleGenerateSteps}
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
          >
            {isGenerating ? '🔄 Generating Steps...' : '✨ Generate Steps'}
          </button>
          {(toolsAndTechnologies.length === 0 || !whatCreated) && (
            <p style={{ color: 'white', margin: '12px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
              Fill in required fields above to enable step generation
            </p>
          )}
        </div>

        {/* Collapsible Additional Information Section */}
        <div style={{ marginBottom: '30px' }}>
          <button
            onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#0064d2'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <span>Need to add more information?</span>
              <div style={{ fontSize: '12px', color: '#666', fontWeight: 'normal', marginTop: '4px' }}>
                All fields below are optional - add if relevant to your use case
              </div>
            </div>
            <span style={{ 
              transform: showAdditionalInfo ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s'
            }}>▼</span>
          </button>

          {showAdditionalInfo && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}>
              <div style={{
                padding: '12px',
                backgroundColor: '#fff3cd',
                border: '1px solid #ffc107',
                borderRadius: '4px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#856404'
              }}>
                <strong>💡 Note:</strong> All fields in this section are <strong>optional</strong>. Only add information that's relevant to your specific use case.
              </div>

              {/* Technical Details */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Technical Details <span style={{ fontWeight: 'normal', color: '#999', fontSize: '13px' }}>(optional)</span>
                </label>
                <p style={{ color: '#666', marginBottom: '12px', fontSize: '13px' }}>
                  Please explain the technical details of the use case used and how it was implemented.
                </p>
                <textarea
                  value={technicalDetails}
                  onChange={(e) => setTechnicalDetails(e.target.value)}
                  placeholder="Implement a hybrid approach using matrix factorization, neural collaborative filtering..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    backgroundColor: 'white'
                  }}
                />
              </div>

              {/* Data Requirements */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Data Requirements <span style={{ fontWeight: 'normal', color: '#999', fontSize: '13px' }}>(optional)</span>
                </label>
                <p style={{ color: '#666', marginBottom: '12px', fontSize: '13px' }}>
                  If there are data requirements for this use case, enter them here.
                </p>
                <textarea
                  value={dataRequirements}
                  onChange={(e) => setDataRequirements(e.target.value)}
                  placeholder="User-item interactions, purchase history, browsing sessions..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    backgroundColor: 'white'
                  }}
                />
              </div>

              {/* Programming Language Selection */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Programming Language <span style={{ fontWeight: 'normal', color: '#666', fontSize: '13px' }}>(if applicable)</span>
                </label>
                <p style={{ color: '#666', marginBottom: '12px', fontSize: '13px' }}>
                  Only add if your use case involves writing or working with code
                </p>
                
                {selectedLanguages.length > 0 && (
                  <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedLanguages.map(lang => (
                      <div
                        key={lang}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '6px 12px',
                          backgroundColor: 'white',
                          border: '1px solid #ffc107',
                          borderRadius: '20px',
                          fontSize: '14px'
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>{lang}</span>
                        <button
                          onClick={() => removeLanguage(lang)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ffc107',
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

                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Click to select programming language..."
                    value={languageSearchTerm}
                    onChange={(e) => {
                      setLanguageSearchTerm(e.target.value);
                      setShowLanguageDropdown(true);
                    }}
                    onFocus={() => setShowLanguageDropdown(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && languageSearchTerm.trim()) {
                        e.preventDefault();
                        addLanguage(languageSearchTerm);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  />
                  
                  {showLanguageDropdown && (languageSearchTerm || filteredLanguages.length > 0) && (
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
                      {filteredLanguages.map(lang => (
                        <div
                          key={lang}
                          onClick={() => addLanguage(lang)}
                          style={{
                            padding: '10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          {lang}
                        </div>
                      ))}
                      
                      {languageSearchTerm && !PROGRAMMING_LANGUAGES.some(l => l.toLowerCase() === languageSearchTerm.toLowerCase()) && (
                        <div
                          onClick={() => addLanguage(languageSearchTerm)}
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
                          + Add "{languageSearchTerm}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {showLanguageDropdown && (
                  <div
                    onClick={() => setShowLanguageDropdown(false)}
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

              {/* Additional Notes */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Additional Notes <span style={{ fontWeight: 'normal', color: '#999', fontSize: '13px' }}>(optional)</span>
                </label>
                <p style={{ color: '#666', marginBottom: '12px', fontSize: '13px' }}>
                  Any additional information needed for this use case, enter them here.
                </p>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Enter any additional context, notes, or information about this use case..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    backgroundColor: 'white'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Search for Pre-configured Steps */}
        {generatedSteps.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ marginBottom: '12px', color: '#333' }}>Add More Steps</h4>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
              Search our library of pre-configured steps
            </p>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search predefined steps..."
                value={stepSearchTerm}
                onChange={(e) => {
                  setStepSearchTerm(e.target.value);
                  setShowStepDropdown(true);
                }}
                onFocus={() => setShowStepDropdown(true)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              />
              {showStepDropdown && stepSearchTerm && filteredPredefinedSteps.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    marginTop: '-10px'
                  }}
                >
                  {filteredPredefinedSteps.map(step => (
                    <div
                      key={step.id}
                      onClick={() => addPredefinedStep(step)}
                      style={{
                        padding: '12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>{step.title}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {step.description.substring(0, 100)}...
                      </div>
                      {step.category && (
                        <span style={{
                          display: 'inline-block',
                          marginTop: '4px',
                          padding: '2px 8px',
                          backgroundColor: '#e3f2fd',
                          color: '#0064d2',
                          borderRadius: '10px',
                          fontSize: '11px'
                        }}>
                          {step.category}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {showStepDropdown && (
              <div
                onClick={() => setShowStepDropdown(false)}
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
        )}

        {/* Generated Steps Preview */}
        {generatedSteps.length > 0 && (
          <>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0064d2', marginBottom: '16px' }}>
                Generated Steps ({generatedSteps.length})
              </h3>
              
              <div>
                {/* Steps List - Full Width */}
                <div style={{ width: '100%' }}>
                  <div style={{ 
                    backgroundColor: '#f8f9fa',
                    padding: '12px',
                    borderRadius: '8px 8px 0 0',
                    border: '2px solid #e0e0e0',
                    borderBottom: 'none'
                  }}>
                    <h4 style={{ 
                      margin: 0, 
                      fontSize: '14px', 
                      color: '#666',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      ⋮⋮ Drag to Reorder
                    </h4>
                  </div>
                  <div style={{
                    border: '2px solid #e0e0e0',
                    borderRadius: '0 0 8px 8px',
                    backgroundColor: '#ffffff',
                    padding: '12px'
                  }}>
                    {generatedSteps.map((step, index) => (
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
                          backgroundColor: selectedStepId === step.id ? '#e3f2fd' : '#ffffff',
                          border: selectedStepId === step.id ? '2px solid #0064d2' : '1px solid #ddd',
                          borderRadius: '8px',
                          cursor: 'move',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                          <span style={{ 
                            color: '#999', 
                            fontWeight: 'bold',
                            fontSize: '20px',
                            lineHeight: '1',
                            marginTop: '2px'
                          }}>
                            ⋮⋮
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              fontWeight: '600', 
                              marginBottom: '8px',
                              color: selectedStepId === step.id ? '#0064d2' : '#333',
                              fontSize: '15px'
                            }}>
                              Step {index + 1}. {step.title}
                            </div>
                            {step.aiTools.length > 0 && (
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                                {step.aiTools.slice(0, 2).map(tool => (
                                  <span key={tool} style={{
                                    padding: '3px 8px',
                                    backgroundColor: selectedStepId === step.id ? '#0064d2' : '#e3f2fd',
                                    color: selectedStepId === step.id ? 'white' : '#0064d2',
                                    borderRadius: '10px',
                                    fontSize: '11px',
                                    fontWeight: '500'
                                  }}>
                                    🤖 {tool}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Icons */}
                        <div style={{ 
                          display: 'flex', 
                          gap: '4px', 
                          justifyContent: 'flex-end',
                          paddingLeft: '32px'
                        }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewStepId(step.id);
                            }}
                            title="Preview"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '20px',
                              padding: '4px',
                              lineHeight: '1',
                              opacity: 0.6,
                              transition: 'opacity 0.2s, transform 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '1';
                              e.currentTarget.style.transform = 'scale(1.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '0.6';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            👁️
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStepId(step.id);
                              startEditingContent(step.id);
                            }}
                            title="Edit"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '20px',
                              padding: '4px',
                              lineHeight: '1',
                              opacity: 0.6,
                              transition: 'opacity 0.2s, transform 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '1';
                              e.currentTarget.style.transform = 'scale(1.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '0.6';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateStep(step.id);
                            }}
                            title="Duplicate"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '20px',
                              padding: '4px',
                              lineHeight: '1',
                              opacity: 0.6,
                              transition: 'opacity 0.2s, transform 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '1';
                              e.currentTarget.style.transform = 'scale(1.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '0.6';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            📋
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to delete this step?')) {
                                removeStep(step.id);
                              }
                            }}
                            title="Remove"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '20px',
                              padding: '4px',
                              lineHeight: '1',
                              opacity: 0.6,
                              transition: 'opacity 0.2s, transform 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '1';
                              e.currentTarget.style.transform = 'scale(1.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '0.6';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Mode with Live Preview */}
            {isEditingContent && selectedStepId && (
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
                  width: '95%',
                  maxWidth: '1600px',
                  height: '90vh',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden'
                }}>
                  {/* Header */}
                  <div style={{
                    padding: '20px 24px',
                    borderBottom: '2px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <h3 style={{ margin: 0, color: '#0064d2', fontSize: '20px' }}>
                      ✏️ Edit Step Content
                    </h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={saveContentEdit}
                        style={{
                          padding: '10px 24px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        ✓ Save Changes
                      </button>
                      <button
                        onClick={cancelContentEdit}
                        style={{
                          padding: '10px 24px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        ✕ Cancel
                      </button>
                    </div>
                  </div>

                  {/* Split View: Editor + Preview */}
                  <div style={{
                    display: 'flex',
                    flex: 1,
                    overflow: 'hidden'
                  }}>
                    {/* Left: Editor */}
                    <div 
                      ref={editorScrollRef}
                      style={{
                        flex: 1,
                        overflowY: 'auto',
                        borderRight: '2px solid #e0e0e0',
                        backgroundColor: '#ffffff',
                        position: 'relative'
                      }}
                    >
                      {/* Sticky Add Content Block Button */}
                      <div style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#ffffff',
                        padding: '16px 24px',
                        borderBottom: '2px solid #e0e0e0',
                        zIndex: 10
                      }}>
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => setShowStickyAddMenu(!showStickyAddMenu)}
                            style={{
                              padding: '12px 24px',
                              backgroundColor: '#0064d2',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '14px',
                              width: '100%'
                            }}
                          >
                            + Add Content Block
                          </button>

                          {showStickyAddMenu && (
                            <>
                              <div
                                onClick={() => setShowStickyAddMenu(false)}
                                style={{
                                  position: 'fixed',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  zIndex: 999
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: 0,
                                  right: 0,
                                  marginTop: '8px',
                                  backgroundColor: 'white',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                  zIndex: 1000,
                                  minWidth: '200px'
                                }}
                              >
                                {[
                                  { type: 'heading' as const, label: '📝 Heading', desc: 'Section title' },
                                  { type: 'text' as const, label: '📄 Text', desc: 'Paragraph' },
                                  { type: 'list' as const, label: '• List', desc: 'Bullet or numbered' },
                                  { type: 'code' as const, label: '</> Code', desc: 'Code block' },
                                  { type: 'callout' as const, label: 'ℹ️ Callout', desc: 'Info box' },
                                  { type: 'link' as const, label: '🔗 Link', desc: 'External link' },
                                  { type: 'section' as const, label: '📦 Section', desc: 'Highlighted block' },
                                ].map((item) => (
                                  <button
                                    key={item.type}
                                    onClick={() => {
                                      const newItem = {
                                        id: `item-${Date.now()}`,
                                        type: item.type,
                                        text: item.type === 'list' ? undefined : '',
                                        items: item.type === 'list' ? [''] : undefined,
                                        listStyle: item.type === 'list' ? 'bullet' as const : undefined,
                                        level: item.type === 'heading' ? 2 as const : undefined,
                                        variant: item.type === 'callout' ? 'info' as const : undefined,
                                        url: item.type === 'link' ? '' : undefined,
                                      };
                                      setEditingContent([...editingContent, newItem]);
                                      setShowStickyAddMenu(false);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '12px 16px',
                                      backgroundColor: 'white',
                                      border: 'none',
                                      borderBottom: '1px solid #f0f0f0',
                                      cursor: 'pointer',
                                      textAlign: 'left',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '4px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.label}</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>{item.desc}</div>
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div style={{ padding: '24px' }}>
                        {/* Title Input */}
                        <div style={{ marginBottom: '24px' }}>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          marginBottom: '8px',
                          color: '#333'
                        }}>
                          Step Title
                        </label>
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          placeholder="Enter step title..."
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: '600'
                          }}
                        />
                      </div>
                      
                          <StepContentEditor
                            content={editingContent}
                            onChange={handleContentChange}
                            onCancel={cancelContentEdit}
                            onSave={saveContentEdit}
                            hideButtons={true}
                            hideAddButton={true}
                          />
                        </div>
                      </div>

                    {/* Right: Live Preview */}
                    <div 
                      ref={previewScrollRef}
                      style={{
                        flex: 1,
                        padding: '24px',
                        overflowY: 'auto',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      <h4 style={{ marginTop: 0, marginBottom: '16px', color: '#333' }}>
                        Live Preview
                      </h4>
                      <div style={{
                        padding: '24px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        minHeight: '200px'
                      }}>
                        <StepContentRenderer content={editingContent} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Modal */}
            {previewStepId && (() => {
              const previewStep = generatedSteps.find(s => s.id === previewStepId);
              const stepIndex = generatedSteps.findIndex(s => s.id === previewStepId);
              const displayContent = previewStep ? (customStepContent[previewStep.id] || previewStep.detailed_content) : [];

              return (
                <div 
                  style={{
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
                  }}
                  onClick={closePreview}
                >
                  <div 
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      maxWidth: '900px',
                      width: '100%',
                      maxHeight: '90vh',
                      overflow: 'auto',
                      position: 'relative',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      onClick={closePreview}
                      style={{
                        position: 'sticky',
                        top: 0,
                        right: 0,
                        float: 'right',
                        margin: '16px',
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)'
                      }}
                    >
                      ✕ Close Preview
                    </button>

                    <div style={{ padding: '40px', paddingTop: '20px', clear: 'both' }}>
                      {previewStep && (
                        <>
                          <div style={{ marginBottom: '24px' }}>
                            <div style={{ 
                              fontSize: '28px', 
                              fontWeight: '600', 
                              color: '#0064d2',
                              marginBottom: '16px',
                              lineHeight: '1.4'
                            }}>
                              Step {stepIndex + 1}. {previewStep.title}
                            </div>
                            
                            {/* Estimated Time */}
                            {previewStep.estimatedTime && (
                              <div style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                backgroundColor: '#fff3cd',
                                border: '1px solid #ffc107',
                                borderRadius: '8px',
                                marginBottom: '12px'
                              }}>
                                <span style={{ fontSize: '16px' }}>⏱️</span>
                                <span style={{ 
                                  fontSize: '14px', 
                                  fontWeight: '600',
                                  color: '#856404'
                                }}>
                                  Estimated Time: {previewStep.estimatedTime}
                                </span>
                              </div>
                            )}
                            
                            {previewStep.aiTools.length > 0 && (
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                                {previewStep.aiTools.map(tool => (
                                  <span key={tool} style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#e3f2fd',
                                    color: '#0064d2',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                  }}>
                                    🤖 {tool}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div style={{ 
                            padding: '32px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                          }}>
                            <StepContentRenderer content={displayContent} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Total Estimated Time */}
            <div style={{
              marginBottom: '30px',
              padding: '20px',
              backgroundColor: '#f0f7ff',
              border: '2px solid #0064d2',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 100, 210, 0.15)'
              }}>
                <span style={{ fontSize: '24px' }}>⏱️</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#666',
                    fontWeight: '500',
                    marginBottom: '4px'
                  }}>
                    Total Estimated Time
                  </div>
                  <div style={{ 
                    fontSize: '22px', 
                    fontWeight: '700',
                    color: '#0064d2'
                  }}>
                    {(() => {
                      // Calculate total time in minutes
                      const totalMinutes = generatedSteps.reduce((sum, step) => {
                        if (step.estimatedTime) {
                          // Parse time string (e.g., "5 minutes", "1 hour", "2 hours 30 minutes")
                          const timeStr = step.estimatedTime.toLowerCase();
                          let minutes = 0;
                          
                          // Extract hours
                          const hourMatch = timeStr.match(/(\d+)\s*h(?:our|r)?s?/);
                          if (hourMatch) {
                            minutes += parseInt(hourMatch[1]) * 60;
                          }
                          
                          // Extract minutes
                          const minMatch = timeStr.match(/(\d+)\s*m(?:inute|in)?s?/);
                          if (minMatch) {
                            minutes += parseInt(minMatch[1]);
                          }
                          
                          return sum + minutes;
                        }
                        return sum;
                      }, 0);
                      
                      // Format the total time
                      if (totalMinutes === 0) return 'Not specified';
                      if (totalMinutes < 60) return `${totalMinutes} minutes`;
                      
                      const hours = Math.floor(totalMinutes / 60);
                      const mins = totalMinutes % 60;
                      
                      if (mins === 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
                      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${mins} minutes`;
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Use Case Name - Shows after generating steps */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#333'
              }}>
                Use Case Name *
              </label>
              <input
                type="text"
                value={useCaseName}
                onChange={(e) => setUseCaseName(e.target.value)}
                placeholder="Enter a name for your use case..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              />
              <p style={{ color: '#666', fontSize: '13px', marginTop: '8px', marginBottom: 0 }}>
                Auto-generated from your tools and description. You can edit it above.
              </p>
            </div>

            {/* Category Tags - Multi-Select Dropdown with Checkboxes */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#333'
              }}>
                Categories <span style={{ fontWeight: 'normal', color: '#999', fontSize: '13px' }}>(optional)</span>
              </label>
              <p style={{ color: '#666', marginBottom: '12px', fontSize: '14px' }}>
                Select one or more categories to tag this use case
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
              
              {/* Searchable Dropdown with Checkboxes */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={newCategory}
                  onChange={(e) => {
                    setNewCategory(e.target.value);
                    setShowCategoryDropdown(true);
                  }}
                  onFocus={() => setShowCategoryDropdown(true)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                
                {showCategoryDropdown && (
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
                      maxHeight: '250px',
                      overflowY: 'auto',
                      zIndex: 1000,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Predefined Categories with Checkboxes */}
                    {CATEGORY_OPTIONS
                      .filter(option => 
                        option.toLowerCase().includes(newCategory.toLowerCase())
                      )
                      .map(option => {
                        const isSelected = categories.includes(option);
                        return (
                          <div
                            key={option}
                            onClick={() => {
                              if (isSelected) {
                                removeCategory(option);
                              } else {
                                setCategories([...categories, option]);
                              }
                            }}
                            style={{
                              padding: '10px 12px',
                              cursor: 'pointer',
                              borderBottom: '1px solid #eee',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              backgroundColor: isSelected ? '#f0f7ff' : 'white'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = isSelected ? '#f0f7ff' : 'white';
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // Handled by parent div onClick
                              style={{
                                cursor: 'pointer',
                                width: '18px',
                                height: '18px',
                                margin: 0
                              }}
                            />
                            <span style={{ 
                              flex: 1,
                              fontWeight: isSelected ? '600' : '400',
                              color: isSelected ? '#0064d2' : '#333'
                            }}>
                              {option}
                            </span>
                            {isSelected && (
                              <span style={{ color: '#0064d2', fontSize: '16px' }}>✓</span>
                            )}
                          </div>
                        );
                      })}
                    
                    {/* No Results Message */}
                    {newCategory && 
                     CATEGORY_OPTIONS.filter(option => 
                       option.toLowerCase().includes(newCategory.toLowerCase())
                     ).length === 0 && (
                      <div style={{
                        padding: '12px',
                        color: '#666',
                        fontSize: '14px',
                        textAlign: 'center'
                      }}>
                        No matching categories found
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Backdrop to close dropdown */}
              {showCategoryDropdown && (
                <div
                  onClick={() => setShowCategoryDropdown(false)}
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

            {/* Submit Button */}
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <button
                onClick={handleSubmit}
                disabled={toolsAndTechnologies.length === 0 || !whatCreated.trim()}
                style={{
                  padding: '16px 48px',
                  backgroundColor: toolsAndTechnologies.length === 0 || !whatCreated.trim() ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: toolsAndTechnologies.length === 0 || !whatCreated.trim() ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  fontWeight: '700',
                  boxShadow: toolsAndTechnologies.length === 0 || !whatCreated.trim() ? 'none' : '0 4px 12px rgba(40, 167, 69, 0.3)',
                  transition: 'transform 0.2s',
                  opacity: toolsAndTechnologies.length === 0 || !whatCreated.trim() ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (toolsAndTechnologies.length > 0 && whatCreated.trim()) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                📋 Preview Use Case
              </button>
              {(toolsAndTechnologies.length === 0 || !whatCreated.trim()) && (
                <p style={{ color: '#999', fontSize: '14px', marginTop: '12px' }}>
                  Please complete Step 1 (Tools & Technologies) and Step 2 (What did you create?) to preview
                </p>
              )}
            </div>
          </>
        )}

        {/* Submit Preview Modal - Matches Library View */}
        {showPreview && (
          <div
            style={{
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
              padding: '20px',
              overflow: 'auto'
            }}
            onClick={closeSubmitPreview}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Action Buttons - Top Right */}
              <div style={{
                position: 'sticky',
                top: '20px',
                right: '20px',
                float: 'right',
                display: 'flex',
                gap: '10px',
                zIndex: 1000,
                margin: '20px'
              }}>
                <button
                  onClick={closeSubmitPreview}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#555';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#666';
                  }}
                >
                  ← Back to Editing
                </button>
              </div>

              {/* Content - Matches Library Detail View Exactly */}
              <div style={{
                padding: '50px',
                fontFamily: 'Georgia, serif',
                clear: 'both'
              }}>
                {/* Header with Get Started Button */}
                <div style={{
                  borderBottom: '4px solid #0064d2',
                  paddingBottom: '25px',
                  marginBottom: '40px',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <h1 style={{ margin: '0 0 12px 0', color: '#0064d2', fontSize: '42px', fontWeight: 'bold' }}>
                    {previewTitle}
                  </h1>
                  <p style={{ color: '#666', fontSize: '22px', margin: '0 0 20px 0', fontStyle: 'italic' }}>
                    Use Case Details
                  </p>
                  
                  {/* Get Started Button - Only show if there are steps */}
                  {generatedSteps.length > 0 && (
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px' }}>
                      <button
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
                          transition: 'all 0.3s ease'
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
                    </div>
                  )}

                  {/* Category Tags */}
                  {categories.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
                      {categories.map(cat => (
                        <span key={cat} style={{
                          padding: '4px 12px',
                          backgroundColor: '#f0f0f0',
                          border: '1px solid #ccc',
                          borderRadius: '16px',
                          fontSize: '12px',
                          color: '#555',
                          fontWeight: '500'
                        }}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail Image - Centered, Full Width */}
                {selectedThumbnailId && uploadedImages.find(img => img.id === selectedThumbnailId) && (
                  <div style={{ marginBottom: '35px', textAlign: 'center' }}>
                    <img 
                      src={uploadedImages.find(img => img.id === selectedThumbnailId)?.url} 
                      alt="Use case thumbnail" 
                      style={{ 
                        maxWidth: '100%',
                        width: '600px',
                        borderRadius: '6px',
                        border: '2px solid #ddd',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }} 
                    />
                  </div>
                )}

                {/* Use Case Author */}
                {!isAnonymous && responsibleMembers.length > 0 && (
                  <div style={{ marginBottom: '25px' }}>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '20px' }}>Use Case Author:</strong>
                    <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.7', color: '#333' }}>
                      {responsibleMembers.length === 1 
                        ? responsibleMembers[0]
                        : responsibleMembers.length === 2
                        ? `${responsibleMembers[0]} and ${responsibleMembers[1]}`
                        : `${responsibleMembers.slice(0, -1).join(', ')}, and ${responsibleMembers[responsibleMembers.length - 1]}`
                      }
                    </p>
                  </div>
                )}

                {/* Overview */}
                <div style={{ marginBottom: '35px' }}>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '22px' }}>Overview:</strong>
                  <div style={{ 
                    margin: 0, 
                    fontSize: '18px', 
                    lineHeight: '1.9',
                    whiteSpace: 'pre-wrap',
                    backgroundColor: '#f8f9fa',
                    padding: '18px',
                    borderRadius: '6px',
                    borderLeft: '4px solid #0064d2',
                    color: '#333'
                  }}>
                    {whatCreated || 'Not provided'}
                  </div>
                </div>

                {/* What You Need - Combined AI and Non-AI Tools */}
                {(toolsAndTechnologies.length > 0 || nonAiToolsSection1.length > 0) && (
                  <div style={{ marginBottom: '35px', textAlign: 'center' }}>
                    <strong style={{ display: 'block', color: '#6f42c1', marginBottom: '16px', fontSize: '22px' }}>What you need:</strong>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '12px', 
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {/* AI Tools with links */}
                      {toolsAndTechnologies.map((tool, idx) => {
                        return tool.url ? (
                          <a 
                            key={`ai-${idx}`}
                            href={tool.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ 
                              padding: '8px 16px',
                              backgroundColor: '#e3f2fd',
                              color: '#0064d2',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontWeight: '500',
                              fontSize: '16px',
                              border: '2px solid #0064d2',
                              transition: 'all 0.2s ease',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0064d2';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#e3f2fd';
                              e.currentTarget.style.color = '#0064d2';
                            }}
                          >
                            {tool.name}
                          </a>
                        ) : (
                          <span 
                            key={`ai-${idx}`}
                            style={{ 
                              padding: '8px 16px',
                              backgroundColor: '#e3f2fd',
                              color: '#0064d2',
                              borderRadius: '6px',
                              fontWeight: '500',
                              fontSize: '16px',
                              border: '2px solid #0064d2'
                            }}
                          >
                            {tool.name}
                          </span>
                        );
                      })}
                      {/* Non-AI Tools */}
                      {nonAiToolsSection1.map((tech, idx) => (
                        <span 
                          key={`nonai-${idx}`}
                          style={{ 
                            padding: '8px 16px',
                            backgroundColor: '#f5f5f5',
                            color: '#333',
                            borderRadius: '6px',
                            fontWeight: '500',
                            fontSize: '16px',
                            border: '2px solid #e0e0e0'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimated Time - Top Left */}
                {estimatedTime && (
                  <div style={{ marginBottom: '35px', textAlign: 'left' }}>
                    <strong style={{ display: 'block', color: '#6f42c1', marginBottom: '12px', fontSize: '22px' }}>
                      Estimated Time to Complete:
                    </strong>
                    <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.7', color: '#333' }}>
                      {estimatedTime}
                    </p>
                  </div>
                )}

                {/* Footer with Back Button */}
                <div style={{
                  borderTop: '3px solid #e0e0e0',
                  paddingTop: '35px',
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={closeSubmitPreview}
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
                    ← Back to Editing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
