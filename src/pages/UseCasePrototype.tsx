import React, { useState } from 'react';
import '../styles/theme.css';
import { DYNAMIC_STEPS, type DynamicStep } from './Steps/DynamicSteps/stepsData';
import AIAutofillUpload, { type AutofillData } from '../components/AIAutofillUpload';
import AIAutofillModal, { type AutofillOption } from '../components/AIAutofillModal';
import { StepContentRenderer } from '../components/StepContentRenderer';
import { StepContentEditor } from '../components/StepContentEditor';
import type { DetailedContentItem } from '../components/StepContentRenderer';

// Import step components from DynamicSteps
import RequestAccess from './Steps/DynamicSteps/RequestAccess';
import LocalAdminAccess from './Steps/DynamicSteps/LocalAdminAccess';
import VerifySecurity from './Steps/DynamicSteps/VerifySecurity';
import InstallNode from './Steps/DynamicSteps/InstallNode';
import InstallVSCode from './Steps/DynamicSteps/InstallVSCode';
import InstallChrome from './Steps/DynamicSteps/InstallChrome';
import InstallGleanExtension from './Steps/DynamicSteps/InstallGleanExtension';
import SetupGithubCopilot from './Steps/DynamicSteps/SetupGithubCopilot';

interface Step {
  id: string;
  title: string;
  description: string;
  category?: string;
}

interface RelatedLink {
  name: string;
  url: string;
}

// Convert DynamicSteps to the Step format used by the prototype
const PREDEFINED_STEPS: Step[] = DYNAMIC_STEPS.map(dynamicStep => ({
  id: dynamicStep.id,
  title: dynamicStep.title,
  description: dynamicStep.description,
  category: dynamicStep.category
}));

export default function UseCasePrototype() {
  // General Information
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [useCaseName, setUseCaseName] = useState('');
  const [useCaseLeadName, setUseCaseLeadName] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [briefOverview, setBriefOverview] = useState('');
  
  // Details
  const [isForDevelopers, setIsForDevelopers] = useState(false);
  const [technicalDetails, setTechnicalDetails] = useState('');
  const [dataRequirements, setDataRequirements] = useState('');
  const [implementationSteps, setImplementationSteps] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [codingLanguage, setCodingLanguage] = useState('');
  const [ide, setIde] = useState('');
  const [toolsAndTechnologies, setToolsAndTechnologies] = useState<string[]>([]);
  const [toolSearchTerm, setToolSearchTerm] = useState('');
  const [showToolDropdown, setShowToolDropdown] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  
  // Media
  const [mediaLinks, setMediaLinks] = useState<RelatedLink[]>([]);
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  
  // Related Links
  const [relatedLinks, setRelatedLinks] = useState<RelatedLink[]>([]);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  
  // Search Tags
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [newSearchTag, setNewSearchTag] = useState('');
  const [generatedSteps, setGeneratedSteps] = useState<Step[]>([]);
  const [customStepsText, setCustomStepsText] = useState('');
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedStepIndex, setDraggedStepIndex] = useState<number | null>(null);
  const [isIdeAlsoAiTool, setIsIdeAlsoAiTool] = useState(false);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editStepTitle, setEditStepTitle] = useState('');
  const [editStepDescription, setEditStepDescription] = useState('');
  const [stepComments, setStepComments] = useState<{[key: string]: string}>({});
  
  // Content editing state
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<DetailedContentItem[]>([]);
  const [customStepContent, setCustomStepContent] = useState<{[key: string]: DetailedContentItem[]}>({});
  
  // AI Autofill state
  const [autofillData, setAutofillData] = useState<AutofillData | null>(null);
  const [autofillSource, setAutofillSource] = useState<{ type: 'link' | 'file'; value: string } | null>(null);
  const [showAutofillModal, setShowAutofillModal] = useState(false);
  const [isAutofillOpen, setIsAutofillOpen] = useState(false);
  
  // Preview mode state
  const [showPreview, setShowPreview] = useState(false);

  const handleAutofillReady = (data: AutofillData, source: { type: 'link' | 'file'; value: string }) => {
    setAutofillData(data);
    setAutofillSource(source);
    setShowAutofillModal(true);
  };

  const handleAutofillConfirm = (option: AutofillOption['value']) => {
    if (option === 'cancel' || !autofillData) {
      setShowAutofillModal(false);
      setAutofillData(null);
      setAutofillSource(null);
      return;
    }

    // Apply autofill data based on selected option
    if (option === 'overwrite') {
      // Step 1: Set business unit first (required for conditional UI)
      if (autofillData.businessUnit) setBusinessUnit(autofillData.businessUnit);
      
      // Step 2: Auto-check "uses IDE/programming language" checkbox if detected
      if (autofillData.codingLanguage || autofillData.ide) {
        setIsForDevelopers(true);
        
        // Delay setting language/IDE to allow checkbox to render first
        setTimeout(() => {
          if (autofillData.codingLanguage) setCodingLanguage(autofillData.codingLanguage);
          if (autofillData.ide) setIde(autofillData.ide);
        }, 50);
      }
      
      // Step 3: Set all general information
      if (autofillData.useCaseName) setUseCaseName(autofillData.useCaseName);
      if (autofillData.useCaseLeadName) setUseCaseLeadName(autofillData.useCaseLeadName);
      if (autofillData.teamMembers) setTeamMembers(autofillData.teamMembers);
      if (autofillData.briefOverview) setBriefOverview(autofillData.briefOverview);
      
      // Step 4: Set tools and technologies
      if (autofillData.toolsAndTechnologies) setToolsAndTechnologies(autofillData.toolsAndTechnologies);
      
      // Step 5: Set related links
      if (autofillData.relatedLinks) setRelatedLinks(autofillData.relatedLinks);

      // Step 6: Set additional information fields
      if (autofillData.technicalDetails) setTechnicalDetails(autofillData.technicalDetails);
      if (autofillData.dataRequirements) setDataRequirements(autofillData.dataRequirements);
      if (autofillData.implementationSteps) setImplementationSteps(autofillData.implementationSteps);
      if (autofillData.categories) setCategories(autofillData.categories);
      if (autofillData.estimatedTime) setEstimatedTime(autofillData.estimatedTime);
      if (autofillData.searchTags) setSearchTags(autofillData.searchTags);
      
      // Step 7: Handle additional steps
      if (autofillData.additionalSteps) {
        setCustomStepsText(autofillData.additionalSteps);
      }
    }

    // Auto-trigger Generate Steps if GitHub repo with Global Technology
    if (autofillData.shouldAutoGenerateSteps && autofillData.businessUnit === 'Global Technology') {
      setTimeout(() => {
        generateSteps();
      }, 100);
    }

    setShowAutofillModal(false);
    setAutofillData(null);
    setAutofillSource(null);
  };

  const generateSteps = () => {
    const steps: Step[] = [];
    const secureAccessItems: string[] = [];
    
    // Always add verify SSO step
    const ssoStep = PREDEFINED_STEPS.find(s => s.id === 'verify-sso-ping');
    if (ssoStep) steps.push(ssoStep);

    // Check if local admin is needed
    const needsLocalAdmin = businessUnit === 'Engineering' || 
                           codingLanguage || 
                           ide || 
                           toolsAndTechnologies.length > 0;
    
    // Secure Access Logic
    if (toolsAndTechnologies.includes('GitHub Copilot')) {
      secureAccessItems.push('GitHub Enterprise');
    }
    
    if (secureAccessItems.length > 0) {
      secureAccessItems.forEach(item => {
        const accessStep = PREDEFINED_STEPS.find(s => 
          s.title.toLowerCase().includes(item.toLowerCase()) && s.category === 'access'
        );
        if (accessStep && !steps.find(s => s.id === accessStep.id)) {
          steps.push(accessStep);
        }
      });
    }

    // Add local admin if needed
    if (needsLocalAdmin) {
      const adminStep = PREDEFINED_STEPS.find(s => s.id === 'request-local-admin');
      if (adminStep) steps.push(adminStep);
    }

    // Install runtime based on coding language
    if (codingLanguage === 'JavaScript') {
      const nodeStep = PREDEFINED_STEPS.find(s => s.id === 'install-nodejs');
      if (nodeStep && !steps.find(s => s.id === nodeStep.id)) {
        steps.push(nodeStep);
      }
    } else if (codingLanguage === 'Python') {
      const pythonStep = PREDEFINED_STEPS.find(s => s.id === 'install-python');
      if (pythonStep && !steps.find(s => s.id === pythonStep.id)) {
        steps.push(pythonStep);
      }
    } else if (codingLanguage === 'Java') {
      const javaStep = PREDEFINED_STEPS.find(s => s.id === 'install-java');
      if (javaStep && !steps.find(s => s.id === javaStep.id)) {
        steps.push(javaStep);
      }
    } else if (codingLanguage === 'C#') {
      const dotnetStep = PREDEFINED_STEPS.find(s => s.id === 'install-dotnet');
      if (dotnetStep && !steps.find(s => s.id === dotnetStep.id)) {
        steps.push(dotnetStep);
      }
    }

    // Install IDE (if not already added as AI tool)
    if (ide && !isIdeAlsoAiTool) {
      if (ide === 'VS Code') {
        const vscodeStep = PREDEFINED_STEPS.find(s => s.id === 'install-vscode');
        if (vscodeStep) steps.push(vscodeStep);
      } else if (ide === 'Cursor') {
        const cursorStep = PREDEFINED_STEPS.find(s => s.id === 'install-cursor');
        if (cursorStep) steps.push(cursorStep);
      }
    }

    // Setup GitHub personal account
    if (toolsAndTechnologies.includes('GitHub Copilot')) {
      const githubSetup = PREDEFINED_STEPS.find(s => s.id === 'setup-github-personal');
      const copilotSetup = PREDEFINED_STEPS.find(s => s.id === 'setup-github-copilot');
      if (githubSetup) steps.push(githubSetup);
      if (copilotSetup) steps.push(copilotSetup);
    }

    setGeneratedSteps(steps);
  };

  const addMediaLink = () => {
    if (newMediaName && newMediaUrl) {
      setMediaLinks([...mediaLinks, { name: newMediaName, url: newMediaUrl }]);
      setNewMediaName('');
      setNewMediaUrl('');
    }
  };

  const removeMediaLink = (index: number) => {
    setMediaLinks(mediaLinks.filter((_, i) => i !== index));
  };

  const addRelatedLink = () => {
    if (newLinkName && newLinkUrl) {
      setRelatedLinks([...relatedLinks, { name: newLinkName, url: newLinkUrl }]);
      setNewLinkName('');
      setNewLinkUrl('');
    }
  };

  const removeRelatedLink = (index: number) => {
    setRelatedLinks(relatedLinks.filter((_, i) => i !== index));
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

  const addSearchTag = () => {
    const trimmedTag = newSearchTag.trim();
    if (trimmedTag && !searchTags.includes(trimmedTag)) {
      setSearchTags([...searchTags, trimmedTag]);
      setNewSearchTag('');
    }
  };

  const removeSearchTag = (tag: string) => {
    setSearchTags(searchTags.filter(t => t !== tag));
  };

  const parseStepsFromText = (text: string): Step[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const steps: Step[] = [];
    
    lines.forEach((line, index) => {
      let trimmedLine = line.trim();
      
      // Remove leading bullet points (-, *, •) or numbers (1., 2., etc.) with optional space
      trimmedLine = trimmedLine.replace(/^[-*•]\s*/, '');
      trimmedLine = trimmedLine.replace(/^\d+\.\s*/, '');
      
      const content = trimmedLine.trim();
      
      if (content) {
        const words = content.split(' ');
        const title = words.slice(0, Math.min(7, words.length)).join(' ');
        
        steps.push({
          id: `custom-${Date.now()}-${index}`,
          title: title.length > 50 ? title.substring(0, 50) + '...' : title,
          description: content,
          category: 'custom'
        });
      }
    });
    
    return steps;
  };

  const addCustomSteps = () => {
    if (customStepsText.trim()) {
      const newSteps = parseStepsFromText(customStepsText);
      if (newSteps.length > 0) {
        setGeneratedSteps([...generatedSteps, ...newSteps]);
        setCustomStepsText('');
      } else {
        alert('No valid steps found. Please ensure each line starts with a bullet point (-, *, •) or number (1., 2., etc.)');
      }
    }
  };

  const saveStepEdit = () => {
    if (editingStepId) {
      setGeneratedSteps(generatedSteps.map(step => 
        step.id === editingStepId 
          ? { ...step, title: editStepTitle, description: editStepDescription }
          : step
      ));
      setEditingStepId(null);
      setEditStepTitle('');
      setEditStepDescription('');
    }
  };

  const startEditStep = (step: Step) => {
    setEditingStepId(step.id);
    setEditStepTitle(step.title);
    setEditStepDescription(step.description);
  };

  const addStepComment = (stepId: string, comment: string) => {
    setStepComments({ ...stepComments, [stepId]: comment });
  };

  // Content editing handlers
  const startEditingContent = (stepId: string) => {
    const fullStepData = DYNAMIC_STEPS.find(s => s.id === stepId);
    const customContent = customStepContent[stepId];
    
    if (customContent) {
      setEditingContent([...customContent]);
    } else if (fullStepData?.detailed_content) {
      setEditingContent([...fullStepData.detailed_content]);
    } else {
      // Create default content from description
      const step = generatedSteps.find(s => s.id === stepId);
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

  const addPredefinedStep = (step: Step) => {
    if (!generatedSteps.find(s => s.id === step.id)) {
      setGeneratedSteps([...generatedSteps, step]);
    }
    setSearchTerm('');
  };

  const removeStep = (stepId: string) => {
    setGeneratedSteps(generatedSteps.filter(s => s.id !== stepId));
    if (selectedStepId === stepId) {
      setSelectedStepId(null);
    }
  };

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

  const AVAILABLE_TOOLS = ['GitHub Copilot', 'Cursor', 'Claude', 'ChatGPT', 'Cline', 'V0', 'Windsurf', 'Aider'];
  
  const filteredTools = AVAILABLE_TOOLS.filter(tool => 
    !toolsAndTechnologies.includes(tool) && 
    tool.toLowerCase().includes(toolSearchTerm.toLowerCase())
  );

  const addTool = (toolName: string) => {
    const trimmedTool = toolName.trim();
    if (trimmedTool && !toolsAndTechnologies.includes(trimmedTool)) {
      setToolsAndTechnologies([...toolsAndTechnologies, trimmedTool]);
      setToolSearchTerm('');
      setShowToolDropdown(false);
    }
  };

  const removeTool = (toolName: string) => {
    setToolsAndTechnologies(toolsAndTechnologies.filter(t => t !== toolName));
    if (toolName === 'Cursor') {
      setIsIdeAlsoAiTool(false);
    }
  };

  const filteredPredefinedSteps = PREDEFINED_STEPS.filter(step =>
    !generatedSteps.find(s => s.id === step.id) &&
    (step.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     step.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedStep = generatedSteps.find(s => s.id === selectedStepId);

  const handleSubmitUseCase = () => {
    setShowPreview(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    try {
      // Prepare the use case data for submission
      const useCaseData = {
        name: useCaseName,
        isAnonymous,
        leadName: useCaseLeadName,
        teamMembers,
        thumbnail,
        briefOverview,
        businessUnit,
        isForDevelopers,
        codingLanguage,
        ide,
        isIdeAlsoAiTool,
        toolsAndTechnologies,
        relatedLinks,
        generatedSteps: generatedSteps.map((step, index) => ({
          stepId: step.id,
          title: step.title,
          description: step.description,
          orderIndex: index,
          category: step.category,
          isCustom: step.category === 'custom',
          comment: stepComments[step.id] || null
        })),
        technicalDetails,
        dataRequirements,
        implementationSteps,
        categories,
        estimatedTime,
        mediaLinks,
        searchTags
      };

      // Make API call to submit use case
      const response = await fetch('http://localhost:3000/api/use-cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(useCaseData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(`Use case submitted successfully!\n\nYour submission ID is: ${result.data.id}\n\nStatus: ${result.data.status}`);
        setShowPreview(false);
        
        // Optionally, you could redirect to a success page or reset the form
        // For now, we'll just close the preview
      } else {
        throw new Error(result.message || 'Failed to submit use case');
      }
    } catch (error) {
      console.error('Error submitting use case:', error);
      alert(`Error submitting use case: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again or contact support.`);
    }
  };

  const handleCancelPreview = () => {
    setShowPreview(false);
  };

  // Map step IDs to their components
  const getStepComponent = (stepId: string) => {
    switch (stepId) {
      case 'verify-sso-ping':
        return <VerifySecurity onComplete={() => {}} isCompleted={false} onNext={() => {}} />;
      case 'request-secure-access':
        // @ts-ignore
        return <RequestAccess />;
      case 'request-local-admin':
        // @ts-ignore
        return <LocalAdminAccess />;
      case 'install-chrome':
        // @ts-ignore
        return <InstallChrome />;
      case 'install-glean-extension':
        // @ts-ignore
        return <InstallGleanExtension />;
      case 'install-nodejs':
        // @ts-ignore
        return <InstallNode />;
      case 'install-vscode':
        // @ts-ignore
        return <InstallVSCode />;
      case 'setup-github-copilot':
        // @ts-ignore
        return <SetupGithubCopilot />;
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', paddingTop: '80px' }}>
      {showPreview ? (
        /* PREVIEW MODE - PDF-like view */
        <div style={{
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '900px',
          margin: '0 auto',
          fontFamily: 'Georgia, serif'
        }}>
          {/* Header */}
          <div style={{
            borderBottom: '4px solid #0064d2',
            paddingBottom: '25px',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <h1 style={{ margin: '0 0 12px 0', color: '#0064d2', fontSize: '36px', fontWeight: 'bold' }}>
              Use Case Submission
            </h1>
            <p style={{ color: '#666', fontSize: '18px', margin: 0, fontStyle: 'italic' }}>
              Please review your submission carefully before final approval
            </p>
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
              {thumbnail && (
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Thumbnail:</strong>
                  <img src={thumbnail} alt="Use case thumbnail" style={{ 
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
                  {useCaseName || 'Not provided'}
                </p>
              </div>
              
              <div>
                <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>Use Case Lead:</strong>
                <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                  {isAnonymous ? '(Anonymous Submission)' : useCaseLeadName || 'Not provided'}
                </p>
              </div>
              
              {teamMembers.length > 0 && (
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>Team Members:</strong>
                  <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                    {teamMembers.join(', ')}
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
                  {briefOverview || 'Not provided'}
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
                  {businessUnit || 'Not provided'}
                </p>
              </div>
              
              {isForDevelopers && (
                <>
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>Coding Language:</strong>
                    <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                      {codingLanguage || 'Not provided'}
                    </p>
                  </div>
                  
                  <div>
                    <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>IDE:</strong>
                    <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                      {ide || 'Not provided'}
                    </p>
                  </div>
                </>
              )}
              
              {toolsAndTechnologies.length > 0 && (
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Tools and Technologies:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {toolsAndTechnologies.map(tool => (
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
              
              {relatedLinks.length > 0 && (
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Related Links:</strong>
                  <ul style={{ margin: '0', paddingLeft: '25px', lineHeight: '1.8' }}>
                    {relatedLinks.map((link, idx) => (
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

          {/* Setup Steps */}
          {businessUnit === 'Global Technology' && generatedSteps.length > 0 && (
            <section style={{ marginBottom: '35px', pageBreakInside: 'avoid' }}>
              <h2 style={{ 
                color: '#0064d2', 
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '12px',
                marginBottom: '20px',
                fontSize: '26px',
                fontWeight: '600'
              }}>
                Setup Steps ({generatedSteps.length})
              </h2>
              
              <ol style={{ margin: 0, paddingLeft: '30px', lineHeight: '1.8' }}>
                {generatedSteps.map((step) => (
                  <li key={step.id} style={{ 
                    marginBottom: '20px',
                    fontSize: '16px',
                    color: '#333'
                  }}>
                    <strong style={{ fontSize: '17px', color: '#222' }}>{step.title}</strong>
                    <p style={{ 
                      margin: '6px 0 0 0', 
                      color: '#555',
                      fontSize: '15px',
                      lineHeight: '1.7'
                    }}>
                      {step.description}
                    </p>
                    {stepComments[step.id] && (
                      <div style={{
                        marginTop: '10px',
                        padding: '10px 14px',
                        backgroundColor: '#fffbeb',
                        borderLeft: '4px solid #fbbf24',
                        fontSize: '14px',
                        color: '#78350f',
                        borderRadius: '4px'
                      }}>
                        <strong>💬 Comment:</strong> {stepComments[step.id]}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

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
              {technicalDetails && (
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
                    {technicalDetails}
                  </div>
                </div>
              )}
              
              {dataRequirements && (
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
                    {dataRequirements}
                  </div>
                </div>
              )}
              
              {implementationSteps && (
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
                    {implementationSteps}
                  </div>
                </div>
              )}
              
              {categories.length > 0 && (
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Categories:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {categories.map(cat => (
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
              
              {estimatedTime && (
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '8px', fontSize: '15px' }}>
                    Estimated Time to Complete:
                  </strong>
                  <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                    {estimatedTime}
                  </p>
                </div>
              )}
              
              {mediaLinks.length > 0 && (
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Media:</strong>
                  <ul style={{ margin: '0', paddingLeft: '25px', lineHeight: '1.8' }}>
                    {mediaLinks.map((link, idx) => (
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
              
              {searchTags.length > 0 && (
                <div>
                  <strong style={{ display: 'block', color: '#222', marginBottom: '10px', fontSize: '15px' }}>Search Tags:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {searchTags.map(tag => (
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

          {/* Action Buttons */}
          <div style={{
            borderTop: '3px solid #e0e0e0',
            paddingTop: '35px',
            marginTop: '20px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center'
          }}>
            <button
              onClick={handleCancelPreview}
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
                boxShadow: '0 4px 8px rgba(40, 167, 69, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#218838';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(40, 167, 69, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#28a745';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(40, 167, 69, 0.3)';
              }}
            >
              ✓ Submit for Approval
            </button>
          </div>
        </div>
      ) : (
        /* FORM MODE */
        <>
      {/* Sticky Save Draft Button */}
      <div style={{
        position: 'fixed',
        top: '60px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '10px'
      }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: 'white',
          color: '#0064d2',
          border: '2px solid #0064d2',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          Save as Draft
        </button>
        <button 
          onClick={handleSubmitUseCase}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0064d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Submit Use Case
        </button>
      </div>

      <h1>Submit a Use Case</h1>

      {/* AI Autofill Upload Component */}
      <AIAutofillUpload 
        onAutofillReady={handleAutofillReady}
      />

      {/* AI Autofill Modal */}
      <AIAutofillModal
        isOpen={showAutofillModal}
        onClose={() => setShowAutofillModal(false)}
        onConfirm={handleAutofillConfirm}
        hasExistingData={
          !!useCaseName || !!briefOverview || !!technicalDetails ||
          categories.length > 0 || toolsAndTechnologies.length > 0
        }
      />

      {/* General Information Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>1. General Information</h2>

        {/* Use Case Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Use Case Name *
          </label>
          <input
            type="text"
            value={useCaseName}
            onChange={(e) => setUseCaseName(e.target.value)}
            placeholder="e.g., Recommendation Engine"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

   {/* Anonymous Checkbox */}
        <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <span>I would like to remain anonymous for my use case submission.</span>
          </label>
          <p style={{ margin: '8px 0 0 24px', fontSize: '13px', color: '#666' }}>
            Note: AI Academy team will be able to see that you are the use case submitter.
          </p>
        </div>
      
        {/* Use Case Lead Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Use Case Lead Name *
          </label>
          <input
            type="text"
            disabled={isAnonymous}
            value={useCaseLeadName}
            onChange={(e) => setUseCaseLeadName(e.target.value)}
            placeholder="Search for name..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Use Case Team Members */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Use Case Team Member(s) <span style={{ fontWeight: 'normal', color: '#666' }}>(if applicable)</span>
          </label>
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

        {/* Upload Thumbnail */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Upload Thumbnail
          </label>
          <div style={{ 
            border: '2px dashed #ccc', 
            borderRadius: '4px', 
            padding: '40px', 
            textAlign: 'center',
            backgroundColor: '#f8f9fa'
          }}>
            {thumbnail ? (
              <div>
                <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: '200px', marginBottom: '10px' }} />
                <button
                  onClick={() => setThumbnail(null)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                  📷 Upload Thumbnail
                </p>
                <button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e: any) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => setThumbnail(e.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#0064d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Browse for files
                </button>
              </>
            )}
          </div>
        </div>

        {/* Brief Overview */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Please provide a brief overview of the use case, including objectives and outcomes. *
          </label>
          <textarea
            value={briefOverview}
            onChange={(e) => setBriefOverview(e.target.value)}
            placeholder="Develop a sophisticated recommendation engine..."
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Details Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>2. Project Configuration</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Configure the basic settings for your use case. These selections will help generate setup steps if applicable.
        </p>

        {/* Business Unit - First */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Business Unit *
          </label>
          <select
            value={businessUnit}
            onChange={(e) => setBusinessUnit(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="">Select Business Unit</option>
            <option value="Finance">Finance</option>
            <option value="Global Marketplace Experience">Global Marketplace Experience</option>
            <option value="Global Technology">Global Technology</option>
            <option value="Growth">Growth</option>
            <option value="Legal & Government Relations">Legal & Government Relations</option>
            <option value="People">People</option>
          </select>
        </div>

        {/* IDE/Programming Language Checkbox - Only show for Global Technology */}
        {businessUnit === 'Global Technology' && (
          <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isForDevelopers}
                onChange={(e) => setIsForDevelopers(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              <span style={{ fontWeight: '600' }}>This use case uses IDE and/or programming language</span>
            </label>
          </div>
        )}

        {/* Dynamic inputs for IDE/Programming Language - Based on Checkbox */}
        {isForDevelopers && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Coding Language *
              </label>
              <select
                value={codingLanguage}
                onChange={(e) => setCodingLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
                <option value="TypeScript">TypeScript</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                IDE *
              </label>
              <select
                value={ide}
                onChange={(e) => {
                  setIde(e.target.value);
                  // Check if IDE is also an AI tool
                  if (e.target.value === 'Cursor') {
                    setIsIdeAlsoAiTool(toolsAndTechnologies.includes('Cursor'));
                  } else {
                    setIsIdeAlsoAiTool(false);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="">Select IDE</option>
                <option value="VS Code">VS Code</option>
                <option value="Cursor">Cursor</option>
                <option value="Rider">Rider</option>
                <option value="Visual Studio">Visual Studio</option>
                <option value="IntelliJ IDEA">IntelliJ IDEA</option>
              </select>
            </div>

            {ide === 'Cursor' && (
              <div style={{ 
                marginBottom: '20px', 
                padding: '12px', 
                backgroundColor: '#fff4e6',
                borderLeft: '4px solid #ff9800',
                borderRadius: '4px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isIdeAlsoAiTool}
                    onChange={(e) => setIsIdeAlsoAiTool(e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ fontWeight: '600' }}>
                    Is Cursor being used as your primary AI tool? 
                    <span style={{ fontWeight: 'normal', marginLeft: '8px', fontSize: '13px' }}>
                      (Check this to avoid duplicate setup steps)
                    </span>
                  </span>
                </label>
              </div>
            )}
          </>
        )}

        {/* Tools and Technologies */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Tools and Technologies
          </label>
          
          {/* Selected Tools */}
          <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {toolsAndTechnologies.map(tool => (
              <div
                key={tool}
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
                <span style={{ marginRight: '8px' }}>{tool}</span>
                <button
                  onClick={() => removeTool(tool)}
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
                    key={tool}
                    onClick={() => addTool(tool)}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    {tool}
                  </div>
                ))}
                
                {toolSearchTerm && !AVAILABLE_TOOLS.some(t => t.toLowerCase() === toolSearchTerm.toLowerCase()) && (
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
                    + Add "{toolSearchTerm}"
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

        {/* Related Links */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Related Links
          </label>
          {relatedLinks.map((link, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '10px', 
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <span style={{ flex: 1 }}>{link.name}</span>
              <span style={{ flex: 2, color: '#0064d2' }}>{link.url}</span>
              <button
                onClick={() => removeRelatedLink(index)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Link Name"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <input
              type="text"
              placeholder="URL"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              style={{
                flex: 2,
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <button
              onClick={addRelatedLink}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0064d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Link
            </button>
          </div>
        </div>
      </div>

      {/* Setup Steps Section - Only for Global Technology */}
      {businessUnit === 'Global Technology' && (
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>3. Setup Steps</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
            Generate and customize the setup steps required for your use case.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={generateSteps}
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Generate Steps
            </button>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
              Click to automatically generate setup steps based on your selections above
            </p>
          </div>

          {generatedSteps.length > 0 && (
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              {/* Steps List - Left Side */}
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '12px' }}>Steps ({generatedSteps.length})</h3>
                <div>
                  {generatedSteps.map((step, index) => (
                    <div
                      key={step.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedStepId(step.id)}
                      style={{
                        padding: '12px',
                        marginBottom: '8px',
                        backgroundColor: selectedStepId === step.id ? '#e3f2fd' : '#f8f9fa',
                        border: selectedStepId === step.id ? '2px solid #0064d2' : '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'move',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#999', fontWeight: 'bold' }}>⋮⋮</span>
                        <span style={{ fontWeight: '500' }}>{step.title}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeStep(step.id);
                        }}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'transparent',
                          color: '#dc3545',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '18px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add More Steps */}
                <div style={{ marginTop: '20px' }}>
                  <h4>Add More Steps</h4>
                  <input
                    type="text"
                    placeholder="Search predefined steps..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      marginBottom: '10px'
                    }}
                  />
                  {searchTerm && filteredPredefinedSteps.length > 0 && (
                    <div style={{
                      maxHeight: '200px',
                      overflowY: 'auto',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      marginBottom: '10px'
                    }}>
                      {filteredPredefinedSteps.map(step => (
                        <div
                          key={step.id}
                          onClick={() => addPredefinedStep(step)}
                          style={{
                            padding: '10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee',
                            backgroundColor: 'white'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          <div style={{ fontWeight: '500' }}>{step.title}</div>
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            {step.description.substring(0, 100)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <h4 style={{ marginTop: '20px' }}>Or Create Custom Steps from Text</h4>
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                    Type or paste steps using bullet points (-, *, •) or numbered lists (1., 2., etc.). Each bullet will become a separate step.
                  </p>
                  <textarea
                    placeholder="- Install Node.js&#10;- Configure VS Code settings&#10;- Set up GitHub authentication&#10;- Clone the repository"
                    value={customStepsText}
                    onChange={(e) => setCustomStepsText(e.target.value)}
                    onFocus={(e) => {
                      // Auto-add "- " if textarea is empty when first focused
                      if (customStepsText.trim() === '') {
                        setCustomStepsText('- ');
                        setTimeout(() => {
                          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = 2;
                        }, 0);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const textarea = e.currentTarget;
                        const cursorPosition = textarea.selectionStart;
                        const textBeforeCursor = customStepsText.substring(0, cursorPosition);
                        const textAfterCursor = customStepsText.substring(cursorPosition);
                        
                        // Insert newline with dash and space
                        const newText = textBeforeCursor + '\n- ' + textAfterCursor;
                        setCustomStepsText(newText);
                        
                        // Set cursor position after the dash and space
                        setTimeout(() => {
                          textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
                        }, 0);
                      }
                    }}
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      marginBottom: '10px',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      lineHeight: '1.6'
                    }}
                  />
                  <button
                    onClick={addCustomSteps}
                    disabled={!customStepsText.trim()}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: customStepsText.trim() ? '#0064d2' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: customStepsText.trim() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Add Steps
                  </button>
                </div>
              </div>

              {/* Step Details - Right Side */}
              <div style={{ flex: 1, maxHeight: '800px', overflowY: 'auto' }}>
                {selectedStep ? (
                  <article className="page link-detail">
                    {editingStepId === selectedStep.id ? (
                      /* Edit Mode */
                      <div>
                        <h3>Edit Step</h3>
                        <div style={{ marginBottom: '15px' }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Title</label>
                          <input
                            type="text"
                            value={editStepTitle}
                            onChange={(e) => setEditStepTitle(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #ccc',
                              borderRadius: '4px'
                            }}
                          />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Description</label>
                          <textarea
                            value={editStepDescription}
                            onChange={(e) => setEditStepDescription(e.target.value)}
                            rows={6}
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              fontFamily: 'inherit'
                            }}
                          />
                        </div>
                        <div>
                          <button
                            onClick={saveStepEdit}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#28a745',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              marginRight: '10px'
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
                              padding: '8px 16px',
                              backgroundColor: '#6c757d',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
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
                          const fullStepData = DYNAMIC_STEPS.find(s => s.id === selectedStep.id);
                          const customContent = customStepContent[selectedStep.id];
                          
                          // Prioritize custom content, then detailed_content, then fallback to hardcoded component
                          if (customContent) {
                            return (
                              <>
                                <h2>{selectedStep.title}</h2>
                                <StepContentRenderer content={customContent} />
                              </>
                            );
                          } else if (fullStepData?.detailed_content) {
                            return (
                              <>
                                <h2>{selectedStep.title}</h2>
                                <StepContentRenderer content={fullStepData.detailed_content} />
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
                        
                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                          {isEditingContent ? (
                            <StepContentEditor
                              content={editingContent}
                              onChange={handleContentChange}
                              onCancel={cancelContentEdit}
                              onSave={saveContentEdit}
                            />
                          ) : (
                            <>
                              {(() => {
                                const fullStepData = DYNAMIC_STEPS.find(s => s.id === selectedStep.id);
                                const hasStructuredContent = fullStepData?.detailed_content || customStepContent[selectedStep.id];
                                
                                return hasStructuredContent ? (
                                  <button
                                    onClick={() => startEditingContent(selectedStep.id)}
                                    style={{
                                      padding: '8px 16px',
                                      backgroundColor: '#ff9800',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      marginRight: '10px',
                                      fontWeight: '600'
                                    }}
                                  >
                                    ✏️ Edit Content
                                  </button>
                                ) : null;
                              })()}
                              
                              <button
                                onClick={() => startEditStep(selectedStep)}
                                style={{
                                  padding: '8px 16px',
                                  backgroundColor: '#0064d2',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  marginRight: '10px'
                                }}
                              >
                                Edit Step
                              </button>
                              
                              <button
                                onClick={() => {
                                  const comment = prompt('Add a comment for this step:');
                                  if (comment) addStepComment(selectedStep.id, comment);
                                }}
                                style={{
                                  padding: '8px 16px',
                                  backgroundColor: 'white',
                                  color: '#0064d2',
                                  border: '2px solid #0064d2',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                Add Comment
                              </button>
                            </>
                          )}
                        </div>

                        {stepComments[selectedStep.id] && (
                          <div style={{
                            marginTop: '15px',
                            padding: '12px',
                            backgroundColor: '#fffbeb',
                            border: '1px solid #fbbf24',
                            borderRadius: '4px'
                          }}>
                            <strong style={{ display: 'block', marginBottom: '5px', color: '#92400e' }}>Comment:</strong>
                            <p style={{ margin: 0, color: '#78350f' }}>{stepComments[selectedStep.id]}</p>
                          </div>
                        )}
                      </>
                    )}
                  </article>
                ) : (
                  <div className="link-detail placeholder">
                    <h2>Select a step</h2>
                    <p className="muted small">Pick a step on the left to see details and take action.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional Information Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>{businessUnit === 'Global Technology' ? '4' : '3'}. Additional Information</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Provide additional details about your use case implementation and requirements.
        </p>

        {/* Technical Details */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Please explain the technical details of the use case used and how it was implemented. *
          </label>
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
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Data Requirements */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            If there are data requirements for this use case, enter them here.
          </label>
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
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Implementation Steps */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            If there are implementation steps for this use case, enter them here.
          </label>
          <textarea
            value={implementationSteps}
            onChange={(e) => setImplementationSteps(e.target.value)}
            placeholder="1. Document ingestion: PDFs, images, and scanned documents are uploaded to the system..."
            rows={6}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Category
          </label>
          <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(category => (
              <div
                key={category}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}
              >
                <span style={{ marginRight: '8px' }}>{category}</span>
                <button
                  onClick={() => removeCategory(category)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter the categories for this use case"
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
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#666' }}>
            Click Return or Enter to add an item
          </p>
        </div>

        {/* Estimated Time to Complete */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Estimated Time to Complete
          </label>
          <input
            type="text"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            placeholder="Enter an estimated time to complete (5-10 weeks)"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Media */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Media
          </label>
          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#666' }}>
            Note: Please use <a href="#" style={{ color: '#0064d2' }}>HUBTV to upload</a> your video files. Then link them here.
          </p>
          {mediaLinks.map((link, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '10px', 
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <span style={{ flex: 1 }}>{link.name}</span>
              <span style={{ flex: 2, color: '#0064d2' }}>{link.url}</span>
              <button
                onClick={() => removeMediaLink(index)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={newMediaName}
              onChange={(e) => setNewMediaName(e.target.value)}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <input
              type="text"
              placeholder="URL"
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              style={{
                flex: 2,
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <button
              onClick={addMediaLink}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0064d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Search Tags */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Search Tags <span style={{ fontWeight: 'normal', color: '#666' }}>(if applicable)</span>
          </label>
          <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {searchTags.map(tag => (
              <div
                key={tag}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}
              >
                <span style={{ marginRight: '8px' }}>{tag}</span>
                <button
                  onClick={() => removeSearchTag(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter the search tags for this use case"
              value={newSearchTag}
              onChange={(e) => setNewSearchTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSearchTag();
                }
              }}
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#666' }}>
            Click Return or Enter to add an item
          </p>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
