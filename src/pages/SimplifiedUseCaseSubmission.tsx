import React, { useState } from 'react';
import '../styles/theme.css';
import { DYNAMIC_STEPS, type DynamicStep } from './Steps/DynamicSteps/stepsData';
import { StepContentRenderer } from '../components/StepContentRenderer';
import { StepContentEditor } from '../components/StepContentEditor';
import { CustomStepsEditor } from '../components/CustomStepsEditor';
import type { DetailedContentItem } from '../components/StepContentRenderer';
import AIAutofillUpload, { type AutofillData } from '../components/SimplifiedAIAutofillUpload';

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
  { name: 'NotebookLM', url: 'https://notebooklm.google.com/' },
  {name: 'Zoom AI Companion', url: 'https://zoom.us/ai-companion' }
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
  const [uploadedImages, setUploadedImages] = useState<Array<{ id: string; url: string; name: string; file?: File }>>([]);
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  
  // Calculate max documents based on images (total limit of 5)
  const MAX_TOTAL_FILES = 5;
  const maxDocuments = MAX_TOTAL_FILES - uploadedImages.length;
  //use case memnbers
  const [isAnonymous, setIsAnonymous] = useState(false);
    const [useCaseLeadName, setUseCaseLeadName] = useState('');
    const [teamMemberInput, setTeamMemberInput] = useState(false);
    const [teamMembers, setTeamMembers] = useState<string[]>([]);

  // Categories and estimated time
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
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
    // If no programming language selected, no IDE needed
    if (selectedLanguages.length === 0) return '';
    
    // If Cursor is selected as AI tool, use Cursor
    if (toolsAndTechnologies.some(tool => tool.name.toLowerCase() === 'cursor')) {
      return 'Cursor';
    }
    
    // Default to VS Code for any coding language
    return 'VS Code';
  };
  
  // AI Autofill state
  const [autofillData, setAutofillData] = useState<AutofillData | null>(null);
  const [autofillSource, setAutofillSource] = useState<{ type: 'link' | 'file'; value: string } | null>(null);
  const [showAutofillModal, setShowAutofillModal] = useState(false);
  
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
  const [showStepsPreview, setShowStepsPreview] = useState(false);
  const [showStepPreview, setShowStepPreview] = useState(true); // Toggle between edit and preview mode for individual steps
  
  // Search for predefined steps
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create new step modal state
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
  const [createStepEditingContent, setCreateStepEditingContent] = useState<DetailedContentItem[]>([]);

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
        const imageId = `img-${Date.now()}`;
        const newImage = {
          id: imageId,
          url: result,
          name: file.name,
          file: file
        };
        
        setUploadedImages([...uploadedImages, newImage]);
        
        // If this is the first image, automatically select it as thumbnail
        if (uploadedImages.length === 0) {
          setSelectedThumbnailId(imageId);
        }
        
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
    // Reset the input so the same file can be selected again if needed
    e.target.value = '';
  };

  const removeImage = (imageId: string) => {
    const imageToRemove = uploadedImages.find(img => img.id === imageId);
    
    // Remove from uploaded images
    setUploadedImages(uploadedImages.filter(img => img.id !== imageId));
    
    // If this was the selected thumbnail, clear the selection
    if (selectedThumbnailId === imageId) {
      // Auto-select the first remaining image if any
      const remainingImages = uploadedImages.filter(img => img.id !== imageId);
      setSelectedThumbnailId(remainingImages.length > 0 ? remainingImages[0].id : null);
    }
    
    // Remove from media items
    if (imageToRemove) {
      setMediaItems(mediaItems.filter(item => 
        !(item.type === 'image' && item.url === imageToRemove.url)
      ));
    }
  };

  const selectThumbnail = (imageId: string) => {
    // Toggle behavior - if already selected, uncheck it
    if (selectedThumbnailId === imageId) {
      setSelectedThumbnailId(null);
    } else {
      setSelectedThumbnailId(imageId);
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

  // Autofill modal is currently not used, but keeping the handler for future implementation
  // const handleAutofillConfirm = (option: any) => {
  //   if (option === 'cancel' || !autofillData) {
  //     setShowAutofillModal(false);
  //     setAutofillData(null);
  //     setAutofillSource(null);
  //     return;
  //   }
  // };

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
    if (selectedThumbnailId) {
      const selectedImage = uploadedImages.find(img => img.id === selectedThumbnailId);
      return selectedImage?.url || null;
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

  // Add predefined step from search
  const addPredefinedStep = (step: DynamicStep) => {
    const newStep: GeneratedStep = {
      id: step.id,
      title: step.title,
      detailed_content: step.detailed_content || [{
        id: 'content-1',
        type: 'text',
        text: step.description
      }],
      aiTools: toolsAndTechnologies.map(t => t.name)
    };
    
    if (!generatedSteps.find(s => s.id === step.id)) {
      setGeneratedSteps([...generatedSteps, newStep]);
    }
    setSearchTerm('');
  };

  // Filter predefined steps
  const filteredPredefinedSteps = DYNAMIC_STEPS.filter(step =>
    !generatedSteps.find(s => s.id === step.id) &&
    (step.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     step.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Create new step modal handlers
  const handleCreateNewStep = () => {
    setShowCreateModal(true);
    setNewStepData({
      title: '',
      description: '',
      category: 'install'
    });
    setCreateStepEditingContent([
      {
        id: 'intro',
        type: 'text',
        text: 'Add your step content here...'
      }
    ]);
    setShowCopyFromMenu(false);
  };

  const handleCopyFromStep = (stepId: string) => {
    const stepToCopy = DYNAMIC_STEPS.find(s => s.id === stepId);
    if (!stepToCopy) return;

    // Copy the step's title and description to the form (just basic description, not full content)
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
      setCreateStepEditingContent(copiedContent);
    } else {
      // Handle legacy content
      setCreateStepEditingContent([{
        id: `copied-${Date.now()}-legacy`,
        type: 'text',
        text: stepToCopy.description
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
    setCreateStepEditingContent([]);
  };

  const handleSaveNewStep = () => {
    if (!newStepData.title.trim() || !newStepData.description.trim()) {
      alert('Please provide both a title and description for the new step.');
      return;
    }

    const newStep: GeneratedStep = {
      id: `custom-${Date.now()}`,
      title: newStepData.title,
      detailed_content: createStepEditingContent,
      aiTools: toolsAndTechnologies.map(t => t.name)
    };

    setGeneratedSteps([...generatedSteps, newStep]);
    handleCloseCreateModal();
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
      setUploadedImages([]);
      setSelectedThumbnailId(null);
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

          {/* Additional Information Section in Preview */}
          {(getAutoSelectedIde() || selectedLanguages.length > 0 || nonAiTechnologies.length > 0 || technicalDetails || dataRequirements || additionalNotes) && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ color: '#0064d2', borderBottom: '2px solid #e0e0e0', paddingBottom: '12px' }}>
                Additional Information
              </h2>
              <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
                {getAutoSelectedIde() && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px' }}>IDE Used:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{
                        padding: '6px 12px',
                        backgroundColor: '#e3f2fd',
                        border: '1px solid #0064d2',
                        borderRadius: '16px',
                        fontSize: '14px'
                      }}>
                        {getAutoSelectedIde()}
                      </span>
                    </div>
                  </div>
                )}

                {selectedLanguages.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Programming Language(s):</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedLanguages.map(lang => (
                        <span key={lang} style={{
                          padding: '6px 12px',
                          backgroundColor: '#fff3cd',
                          border: '1px solid #ffc107',
                          borderRadius: '16px',
                          fontSize: '14px'
                        }}>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {nonAiTechnologies.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Non-AI Technologies:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {nonAiTechnologies.map(tech => (
                        <span key={tech} style={{
                          padding: '6px 12px',
                          backgroundColor: '#f0f0f0',
                          border: '1px solid #ccc',
                          borderRadius: '16px',
                          fontSize: '14px'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {technicalDetails && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Technical Details:</strong>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '6px',
                      whiteSpace: 'pre-wrap',
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}>
                      {technicalDetails}
                    </div>
                  </div>
                )}
                
                {dataRequirements && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Data Requirements:</strong>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '6px',
                      whiteSpace: 'pre-wrap',
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}>
                      {dataRequirements}
                    </div>
                  </div>
                )}
                
                {additionalNotes && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '8px' }}>Additional Notes:</strong>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '6px',
                      whiteSpace: 'pre-wrap',
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}>
                      {additionalNotes}
                    </div>
                  </div>
                )}
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
          Using AI at eBay? Awesome! Tell us about it.
        </p>


 {/* Anonymous Checkbox */}      
        {/* Use Case Lead Name */}
        <div style={{ marginBottom: '20px' }}>
          {/* Label and checkbox on the same line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
            <label style={{ fontWeight: '600' }}>
              Who is submitting this use case? *
            </label>
            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f8f9fa', padding: '6px 12px', borderRadius: '4px' }}>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <span>Remain anonymous</span>
            </label>
          </div>
          
          {/* Show note when anonymous is checked */}
          {isAnonymous && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '4px',
              color: '#856404',
              fontSize: '14px'
            }}>
              <strong>Note:</strong> AI Academy team will be able to see that you are the use case submitter.
            </div>
          )}
          
          {/* Show search input when anonymous is NOT checked */}
          {!isAnonymous && (
            <>
              <input
                type="text"
                value={useCaseLeadName}
                onChange={(e) => setUseCaseLeadName(e.target.value)}
                placeholder="Search for name..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              />
              {/* Show indicator when name is empty */}
              {/* {!useCaseLeadName.trim() && (
                <div style={{
                  marginTop: '8px',
                  padding: '10px',
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #0064d2',
                  borderRadius: '4px',
                  color: '#0064d2',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '18px' }}>ℹ️</span>
                  <span>Leaving this blank will submit anonymously (AI Academy will still see your identity)</span>
                </div>
              )} */}
            </>
          )}
        </div>
        
        {/* Only show "Add Team Member(s)" button if not anonymous */}
        {!isAnonymous && (
          <div>
            {!teamMemberInput && (
            <button 
            onClick={() => setTeamMemberInput(true)}
               style={{
                    padding: '10px 20px',
                    backgroundColor: '#0064d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  >Add Team Member(s)
                  </button>
            )}
          </div>
        )}

        {/* Use Case Team Members */}
        {teamMemberInput && (
           <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ fontWeight: '600' }}>
              Use Case Team Member(s) <span style={{ fontWeight: 'normal', color: '#666' }}>(if applicable)</span>
            </label>
            {teamMembers.length === 0 && (
              <button
                onClick={() => setTeamMemberInput(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc3545',
                  cursor: 'pointer',
                  fontSize: '24px',
                  padding: '0',
                  lineHeight: '1'
                }}
                title="Cancel adding team members"
              >
                ×
              </button>
            )}
          </div>
          <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {teamMembers.map((member, index) => (
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
                  onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== index))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0064d2',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '0',
                    lineHeight: '1'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search for team members..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                e.preventDefault();
                setTeamMembers([...teamMembers, e.currentTarget.value.trim()]);
                e.currentTarget.value = '';
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
        </div>
        )}


        {/* Step 1: AI Tool */}
        <div style={{ 
          margin: '30px 0',
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
            }}>1</span>
            What AI tool did you use? *
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
            {/* Uploaded Images Grid */}
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
                    {/* Remove Button (X) */}
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
                    
                    {/* Image Thumbnail */}
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
                    
                    {/* Checkbox for Thumbnail Selection */}
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
            
            {/* Add Another Image Button */}
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
              onMouseEnter={(e) => {
                if (uploadedImages.length < MAX_TOTAL_FILES) {
                  e.currentTarget.style.backgroundColor = '#e3f2fd';
                  e.currentTarget.style.borderColor = '#0052a3';
                }
              }}
              onMouseLeave={(e) => {
                if (uploadedImages.length < MAX_TOTAL_FILES) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#0064d2';
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
              color: ' #d1ccd9',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Files & Links
            </span>
          </div>

          {/* Add Links */}
          <div style={{ 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            {/* <h4 style={{ marginTop: 0 }}>Add More</h4> */}
             {/* AI Autofill Upload Component */}
                  <AIAutofillUpload 
                    onAutofillReady={handleAutofillReady}
                    maxDocuments={maxDocuments}
                    onFilesChange={(files) => setUploadedDocuments(files)}
                  />
          
            {/* <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
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
            </div> */}
          </div>

          {/* Media Items List - Only show non-image items since images are displayed above */}
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
              {/* Non-AI Technologies */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  More Tools & Technologies <span style={{ fontWeight: 'normal', color: '#999', fontSize: '13px' }}>(optional)</span>
                </label>
                <p style={{ color: '#666', marginBottom: '12px', fontSize: '13px' }}>
                  Add technologies like Slack, Zoom, Jira, etc.
                </p>
                
                {/* Selected Non-AI Technologies */}
                {nonAiTechnologies.length > 0 && (
                  <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {nonAiTechnologies.map(tech => (
                      <div
                        key={tech}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '6px 12px',
                          backgroundColor: 'white',
                          border: '1px solid #0064d2',
                          borderRadius: '20px',
                          fontSize: '14px'
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>{tech}</span>
                        <button
                          onClick={() => removeNonAiTech(tech)}
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

                {/* Technology Input/Dropdown */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search or add a technology..."
                    value={nonAiTechSearchTerm}
                    onChange={(e) => {
                      setNonAiTechSearchTerm(e.target.value);
                      setShowNonAiTechDropdown(true);
                    }}
                    onFocus={() => setShowNonAiTechDropdown(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && nonAiTechSearchTerm.trim()) {
                        e.preventDefault();
                        addNonAiTech(nonAiTechSearchTerm);
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
                  
                  {showNonAiTechDropdown && (nonAiTechSearchTerm || filteredNonAiTech.length > 0) && (
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
                      {filteredNonAiTech.map(tech => (
                        <div
                          key={tech}
                          onClick={() => addNonAiTech(tech)}
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
                      
                      {nonAiTechSearchTerm && !NON_AI_TECHNOLOGIES.some(t => t.toLowerCase() === nonAiTechSearchTerm.toLowerCase()) && (
                        <div
                          onClick={() => addNonAiTech(nonAiTechSearchTerm)}
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
                          + Add "{nonAiTechSearchTerm}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Close dropdown when clicking outside */}
                {showNonAiTechDropdown && (
                  <div
                    onClick={() => setShowNonAiTechDropdown(false)}
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
              {/* Note: IDE is automatically determined - VS Code for coding languages, Cursor if Cursor is the AI tool */}
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
                
                {/* Selected Languages */}
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

                {/* Language Input/Dropdown */}
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
                
                {/* Close dropdown when clicking outside */}
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
          <p style={{ color: 'white', margin: '0 0 12px 0', fontSize: '16px', opacity: 0.9 }}>
            Let AI analyze your inputs and generate clear, step-by-step instructions
          </p>
          <p style={{ color: 'white', margin: '0 0 20px 0', fontSize: '13px', opacity: 0.85, fontStyle: 'italic' }}>
            After generating, you'll need to review and complete the steps so others can follow along
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
            {isGenerating ? '🔄 Generating Steps...' : '✨ Generate Steps with AI'}
          </button>
          {(toolsAndTechnologies.length === 0 || !whatCreated) && (
            <p style={{ color: 'white', margin: '12px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
              Fill in required fields above to enable AI generation
            </p>
          )}
        </div>

        {/* Generated Steps Preview with Full Editing - Only show after AI generation */}
        {generatedSteps.length > 0 && (
          <>
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#d1ecf1',
                border: '1px solid #0c5460',
                borderRadius: '6px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#0c5460'
              }}>
                <strong>⚠️ Important:</strong> Please review and edit the generated steps below. Make sure they are clear and complete so other users can successfully follow along!
              </div>
              <h3 style={{ color: '#0064d2', marginBottom: '16px' }}>
                Generated Steps ({generatedSteps.length}) - Review & Edit Required
              </h3>
              
              {/* Search for Predefined Steps */}
              <div style={{
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <h4 style={{ marginTop: 0, marginBottom: '12px', color: '#0064d2' }}>
                  🔍 Add More Steps from Library
                </h4>
                <input
                  type="text"
                  placeholder="Search for predefined steps to add (e.g., Install Chrome, Setup GitHub)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ccc',
                    borderRadius: '6px',
                    fontSize: '15px',
                    marginBottom: '12px'
                  }}
                />
                {searchTerm && filteredPredefinedSteps.length > 0 && (
                  <div style={{
                    maxHeight: '250px',
                    overflowY: 'auto',
                    border: '2px solid #0064d2',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    {filteredPredefinedSteps.map(step => (
                      <div
                        key={step.id}
                        onClick={() => addPredefinedStep(step)}
                        style={{
                          padding: '14px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #eee',
                          backgroundColor: 'white',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <div style={{ fontWeight: '600', marginBottom: '4px', color: '#0064d2' }}>
                          {step.title}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
                          {step.description.substring(0, 120)}...
                        </div>
                        {step.category && (
                          <span style={{
                            display: 'inline-block',
                            marginTop: '6px',
                            padding: '3px 8px',
                            backgroundColor: '#e3f2fd',
                            borderRadius: '10px',
                            fontSize: '11px',
                            color: '#0064d2',
                            textTransform: 'uppercase'
                          }}>
                            {step.category}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {searchTerm && filteredPredefinedSteps.length === 0 && (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#666',
                    backgroundColor: 'white',
                    border: '2px dashed #ddd',
                    borderRadius: '6px'
                  }}>
                    No matching steps found. Try a different search term or create a custom step below.
                  </div>
                )}
              </div>

              {/* Create New Step Button */}
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                  onClick={handleCreateNewStep}
                  style={{
                    padding: '14px 28px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    boxShadow: '0 2px 6px rgba(40, 167, 69, 0.3)',
                    transition: 'all 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#218838';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(40, 167, 69, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#28a745';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(40, 167, 69, 0.3)';
                  }}
                >
                  <span style={{ fontSize: '20px' }}>✨</span>
                  Create New Custom Step
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                {/* Steps List - Left Side */}
                <div style={{ flex: 1, minWidth: '300px' }}>
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
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          transition: 'all 0.2s',
                          boxShadow: selectedStepId === step.id ? '0 2px 8px rgba(0, 100, 210, 0.15)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedStepId !== step.id) {
                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedStepId !== step.id) {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
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
                              {index + 1}. {step.title}
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
                                {step.aiTools.length > 2 && (
                                  <span style={{
                                    padding: '3px 8px',
                                    backgroundColor: '#f0f0f0',
                                    color: '#666',
                                    borderRadius: '10px',
                                    fontSize: '11px',
                                    fontWeight: '500'
                                  }}>
                                    +{step.aiTools.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
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
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            marginLeft: '8px'
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

                {/* Step Details - Right Side - Expands when editing */}
                <div style={{ 
                  flex: isEditingContent ? 3 : 2,  // Expand when editing
                  minWidth: '400px',
                  maxHeight: '800px', 
                  overflowY: 'auto',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '32px',  // Increased from 24px
                  backgroundColor: '#ffffff',
                  transition: 'flex 0.3s ease'
                }}>
                  {(() => {
                    const selectedStep = generatedSteps.find(s => s.id === selectedStepId);
                    const stepIndex = generatedSteps.findIndex(s => s.id === selectedStepId);
                    
                    if (!selectedStep) {
                      return (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
                          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👈</div>
                          <h3 style={{ color: '#999', marginBottom: '10px', fontWeight: '600' }}>Select a step to edit</h3>
                          <p style={{ color: '#aaa', fontSize: '14px' }}>
                            Click on any step from the list to view and edit its content
                          </p>
                        </div>
                      );
                    }

                    if (editingStepId === selectedStep.id) {
                      // Edit Mode
                      return (
                        <div>
                          <h3 style={{ marginBottom: '20px', color: '#0064d2' }}>✏️ Edit Step</h3>
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
                          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
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
                              ✓ Save Changes
                            </button>
                            <button
                              onClick={() => {
                                setEditingStepId(null);
                                setEditStepTitle('');
                                setEditStepContent([]);
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
                      );
                    }

                    // View Mode with full editing capabilities
                    const displayContent = customStepContent[selectedStep.id] || selectedStep.detailed_content;
                    
                    return (
                      <>
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ 
                            fontSize: '24px', 
                            fontWeight: '600', 
                            color: '#0064d2',
                            marginBottom: '16px',
                            lineHeight: '1.4'
                          }}>
                            {stepIndex + 1}. {selectedStep.title}
                          </div>
                          {selectedStep.aiTools.length > 0 && (
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                              {selectedStep.aiTools.map(tool => (
                                <span key={tool} style={{
                                  padding: '6px 14px',
                                  backgroundColor: '#e3f2fd',
                                  color: '#0064d2',
                                  borderRadius: '12px',
                                  fontSize: '13px',
                                  fontWeight: '500'
                                }}>
                                  🤖 {tool}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Show editing interface OR preview */}
                        <div style={{ marginTop: '20px' }}>
                          {isEditingContent ? (
                            <StepContentEditor
                              content={editingContent}
                              onChange={handleContentChange}
                              onCancel={cancelContentEdit}
                              onSave={saveContentEdit}
                            />
                          ) : (
                            <>
                              {/* Show preview of step content */}
                              <div style={{ 
                                padding: '32px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                marginBottom: '24px'
                              }}>
                                <StepContentRenderer content={displayContent} />
                              </div>
                              
                              {/* Edit buttons */}
                              <div style={{ 
                                display: 'flex',
                                gap: '12px',
                                flexWrap: 'wrap'
                              }}>
                                <button
                                  onClick={() => startEditingContent(selectedStep.id)}
                                  style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#ff9800',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '15px',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 4px rgba(255, 152, 0, 0.2)'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f57c00';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 152, 0, 0.3)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ff9800';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(255, 152, 0, 0.2)';
                                  }}
                                >
                                  ✏️ Edit Content
                                </button>
                                
                                <button
                                  onClick={() => startEditStep(selectedStep)}
                                  style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#0064d2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '15px',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 4px rgba(0, 100, 210, 0.2)'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#0052a3';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 100, 210, 0.3)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#0064d2';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 100, 210, 0.2)';
                                  }}
                                >
                                  📝 Edit Title
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Category Tags - Only visible after AI generation */}
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
          </>
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

      {/* Create New Step Modal */}
      {showCreateModal && (
        <>
          {/* Modal Backdrop */}
          <div
            onClick={handleCloseCreateModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Modal Content */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: '24px',
                borderBottom: '2px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 1
              }}>
                <h2 style={{ margin: 0, color: '#0064d2', fontSize: '24px' }}>
                  ✨ Create Custom Step
                </h2>
                <button
                  onClick={handleCloseCreateModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '32px',
                    cursor: 'pointer',
                    color: '#666',
                    padding: '0',
                    lineHeight: '1'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Modal Body - Split View */}
              <div style={{ 
                display: 'flex', 
                gap: '24px',
                padding: '24px',
                minHeight: '600px'
              }}>
                {/* Left Side: Form and Editor */}
                <div style={{ 
                  flex: 1,
                  overflowY: 'auto',
                  paddingRight: '12px'
                }}>
                  {/* Copy From Existing Step */}
                  <div style={{
                    marginBottom: '24px',
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                  }}>
                    <h3 style={{ marginTop: 0, marginBottom: '12px', fontSize: '16px', color: '#0064d2' }}>
                      💡 Start from an existing step (optional)
                    </h3>
                    <button
                      onClick={() => setShowCopyFromMenu(!showCopyFromMenu)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#0064d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      {showCopyFromMenu ? 'Hide Library' : 'Browse Step Library'}
                    </button>

                    {showCopyFromMenu && (
                      <div style={{ marginTop: '16px' }}>
                        <input
                          type="text"
                          placeholder="Search steps..."
                          value={copyStepSearchQuery}
                          onChange={(e) => setCopyStepSearchQuery(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            marginBottom: '12px',
                            fontSize: '14px'
                          }}
                        />
                        <div style={{
                          maxHeight: '300px',
                          overflowY: 'auto',
                          border: '1px solid #ddd',
                          borderRadius: '6px'
                        }}>
                          {DYNAMIC_STEPS
                            .filter(step =>
                              step.title.toLowerCase().includes(copyStepSearchQuery.toLowerCase()) ||
                              step.description.toLowerCase().includes(copyStepSearchQuery.toLowerCase())
                            )
                            .map(step => (
                              <div
                                key={step.id}
                                style={{
                                  padding: '12px',
                                  borderBottom: '1px solid #eee',
                                  cursor: 'pointer',
                                  backgroundColor: previewStepId === step.id ? '#e3f2fd' : 'white',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  if (previewStepId !== step.id) {
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (previewStepId !== step.id) {
                                    e.currentTarget.style.backgroundColor = 'white';
                                  }
                                }}
                              >
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600', color: '#0064d2', marginBottom: '4px' }}>
                                      {step.title}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#666' }}>
                                      {step.description.substring(0, 100)}...
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleCopyFromStep(step.id)}
                                    style={{
                                      padding: '8px 16px',
                                      backgroundColor: '#28a745',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      fontSize: '13px',
                                      fontWeight: '600',
                                      marginLeft: '12px'
                                    }}
                                  >
                                    Use This
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step Details Form */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#333'
                    }}>
                      Step Title *
                    </label>
                    <input
                      type="text"
                      value={newStepData.title}
                      onChange={(e) => setNewStepData({ ...newStepData, title: e.target.value })}
                      placeholder="e.g., Install Python, Setup Environment..."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '15px'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#333'
                    }}>
                      Short Description *
                    </label>
                    <textarea
                      value={newStepData.description}
                      onChange={(e) => setNewStepData({ ...newStepData, description: e.target.value })}
                      placeholder="Brief description of what this step does..."
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '15px',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#333'
                    }}>
                      Category
                    </label>
                    <select
                      value={newStepData.category}
                      onChange={(e) => setNewStepData({ ...newStepData, category: e.target.value as DynamicStep['category'] })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '15px'
                      }}
                    >
                      <option value="install">Install</option>
                      <option value="configure">Configure</option>
                      <option value="setup">Setup</option>
                      <option value="learn">Learn</option>
                      <option value="practice">Practice</option>
                      <option value="access">Access</option>
                    </select>
                  </div>

                  {/* Step Content Editor */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: '#333',
                      fontSize: '16px'
                    }}>
                      Step Content *
                    </label>

                    <div style={{
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#f8f9fa'
                    }}>
                      <StepContentEditor
                        key={`editor-${editorKey}`}
                        content={createStepEditingContent}
                        onChange={setCreateStepEditingContent}
                        onCancel={() => {}}
                        onSave={() => {}}
                        hideButtons={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Live Preview - Sticky */}
                <div style={{ 
                  flex: 1,
                  paddingLeft: '12px',
                  borderLeft: '2px solid #e0e0e0'
                }}>
                  <div style={{
                    position: 'sticky',
                    top: '0',
                    maxHeight: '80vh',
                    overflowY: 'auto'
                  }}>
                    <h3 style={{ 
                      margin: '0 0 1rem 0', 
                      fontSize: '1.1rem', 
                      color: '#666', 
                      borderBottom: '2px solid #e0e0e0', 
                      paddingBottom: '0.5rem',
                      position: 'sticky',
                      top: '0',
                      backgroundColor: 'white',
                      zIndex: 1
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
                    {createStepEditingContent.length > 0 && (
                      <StepContentRenderer content={createStepEditingContent} />
                    )}

                    {!newStepData.description && createStepEditingContent.length === 0 && (
                      <div style={{ color: '#999', fontStyle: 'italic', textAlign: 'center', padding: '2rem' }}>
                        Fill in the form to see your step preview here
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '24px',
                borderTop: '2px solid #e0e0e0',
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'white'
              }}>
                <button
                  onClick={handleCloseCreateModal}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewStep}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    boxShadow: '0 2px 6px rgba(40, 167, 69, 0.3)'
                  }}
                >
                  ✓ Add Step to Use Case
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
