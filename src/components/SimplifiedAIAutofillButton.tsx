import React from "react";
import { useState } from "react";

export interface SupportedMCP {
  name: string;
  icon: string;
  urlPattern: RegExp;
  description: string;
  examples: string[];
}

export interface AutofillData {
  useCaseName?: string;
  useCaseLeadName?: string;
  teamMembers?: string[];
  briefOverview?: string;
  businessUnit?: string;
  usesDevTools?: boolean;
  ide?: string;
  codingLanguage?: string; //primary coding language or use multiple languages
  toolsAndTechnologies?: string[];  // Dependencies and detected tools from repo
  relatedLinks?: Array<{ name: string; url: string }>;
  shouldAutoGenerateSteps?: boolean; // Flag to trigger auto-generation of steps
  additionalSteps?: string;          // Additional setup steps with "-" bullet format

  technicalDetails?: string;
  dataRequirements?: string;
  implementationSteps?: string;
  categories?: string[];
  estimatedTime?: string;
  mediaLinks?: string[];
  searchTags?: string[];
  //aiTools?: string[];


 
 
  // NEW: Enhanced GitHub analysis properties
 

  
}

interface AIAutofillUploadProps {
  onAutofillReady: (data: AutofillData, source: { type: 'link' | 'file'; value: string }) => void;
  //isOpen?: boolean;
  // onToggle?: () => void;
}

// Define supported MCP servers based on configuration
const SUPPORTED_MCPS: SupportedMCP[] = [
  {
    name: 'GitHub Enterprise',
    icon: '📦',
    urlPattern: /^https?:\/\/(github\.corp\.ebay\.com|github\.com)\/([\w-]+)\/([\w-]+)/i,
    description: 'AI can analyze GitHub repositories to extract project information, dependencies, and documentation',
    examples: [
      'https://github.corp.ebay.com/username/repository',
      'https://github.com/username/repository'
    ]
  },
  {
    name: 'Confluence Wiki',
    icon: '📚',
    urlPattern: /^https?:\/\/(confluence\..*\.ebay\.com|.*\.atlassian\.net)\/.*\/pages\/\d+/i,
    description: 'AI can read Confluence pages to extract documentation and technical specifications',
    examples: [
      'https://confluence.corp.ebay.com/display/SPACE/Page+Title',
      'https://yourcompany.atlassian.net/wiki/spaces/SPACE/pages/123456'
    ]
  }
];

export default function AIAutofillUpload({ onAutofillReady }: AIAutofillUploadProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSupportedLinks, setShowSupportedLinks] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{ 
    type: 'success' | 'error' | 'info'; 
    text: string 
  } | null>(null);

  const validateLink = (url: string): SupportedMCP | null => {
    for (const mcp of SUPPORTED_MCPS) {
      if (mcp.urlPattern.test(url)) {
        return mcp;
      }
    }
    return null;
  };

  const handleLinkChange = (value: string) => {
    setLinkUrl(value);
    setValidationMessage(null);
    
    if (value.trim()) {
      const validMCP = validateLink(value);
      if (validMCP) {
        setValidationMessage({
          type: 'success',
          text: `✓ Valid ${validMCP.name} link detected - AI can autofill from this source`
        });
      } else if (value.startsWith('http')) {
        setValidationMessage({
          type: 'error',
          text: '✗ This link type is not supported for AI autofill. See supported sources below.'
        });
      }
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setValidationMessage({
      type: 'success',
      text: `✓ File "${file.name}" ready for AI analysis`
    });
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setValidationMessage(null);
  };

  const handleAutofill = async () => {
    setIsAnalyzing(true);
    setValidationMessage({ 
      type: 'info', 
      text: '🤖 AI is analyzing and extracting information...' 
    });

    try {
      let autofillData: AutofillData = {};
      let source: { type: 'link' | 'file'; value: string };

      if (linkUrl) {
        const response = await fetch('/api/autofill/analyze-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: linkUrl })
        });
        
        if (!response.ok) {
          throw new Error('Failed to analyze link');
        }
        
        autofillData = await response.json();
        source = { type: 'link', value: linkUrl };
      } else if (uploadedFile) {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        
        const response = await fetch('/api/autofill/analyze-file', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Failed to analyze file');
        }
        
        autofillData = await response.json();
        source = { type: 'file', value: uploadedFile.name };
      } else {
        throw new Error('No source provided');
      }

      onAutofillReady(autofillData, source);
      setValidationMessage({
        type: 'success',
        text: '✓ AI analysis complete! Choose how to apply the suggestions.'
      });
    } catch (error) {
      console.error('Autofill error:', error);
      setValidationMessage({
        type: 'error',
        text: '✗ Failed to analyze content. Please try again or fill the form manually.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAutofill = (linkUrl && validateLink(linkUrl)) || uploadedFile;

  return (
    <div style={{
      backgroundColor: '#f0f7ff',
      border: '2px solid #0064d2',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '24px'
    }}>

      {/* Autofill Button */}
      <button
        type="button"
        onClick={handleAutofill}
        disabled={!canAutofill || isAnalyzing}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: canAutofill && !isAnalyzing ? '#0064d2' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: canAutofill && !isAnalyzing ? 'pointer' : 'not-allowed',
          fontSize: '16px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {isAnalyzing ? (
          <>
            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</span>
            Analyzing with AI...
          </>
        ) : (
          <>
            <span>🤖</span>
            Autofill Form with AI
          </>
        )}
      </button>

      {!canAutofill && !validationMessage && (
        <p style={{ 
          marginTop: '12px', 
          textAlign: 'center', 
          fontSize: '13px', 
          color: '#666' 
        }}>
          Choose an option above to enable AI autofill
        </p>
      )}

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
