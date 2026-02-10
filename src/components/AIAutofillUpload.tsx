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

  // if (!isOpen) {
  //   return (
  //     <div style={{ marginBottom: '24px' }}>
  //       <button
  //         type="button"
  //         onClick={onToggle}
  //         style={{
  //           width: '100%',
  //           padding: '16px 20px',
  //           backgroundColor: '#f0f7ff',
  //           border: '2px solid #0064d2',
  //           borderRadius: '8px',
  //           cursor: 'pointer',
  //           display: 'flex',
  //           alignItems: 'center',
  //           justifyContent: 'space-between',
  //           fontSize: '16px',
  //           fontWeight: '600',
  //           color: '#0064d2',
  //           transition: 'all 0.2s'
  //         }}
  //         onMouseEnter={(e) => {
  //           e.currentTarget.style.backgroundColor = '#e6f3ff';
  //         }}
  //         onMouseLeave={(e) => {
  //           e.currentTarget.style.backgroundColor = '#f0f7ff';
  //         }}
  //       >
  //         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
  //           <span style={{ fontSize: '24px' }}>🤖</span>
  //           <span>AI Autofill Assistant - Click to autofill from a link or file</span>
  //         </div>
  //         <span style={{ fontSize: '20px' }}>▼</span>
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div style={{
      backgroundColor: '#f0f7ff',
      border: '2px solid #0064d2',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', marginRight: '12px' }}>🤖</span>
          <h3 style={{ margin: 0, color: '#0064d2' }}>AI Autofill Assistant</h3>
        </div>
        {/* <button
          type="button"
          onClick={onToggle}
          style={{
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: '1px solid #0064d2',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#0064d2',
            fontWeight: '500'
          }}
        >
          Close ▲
        </button> */}
      </div>

      <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
        Save time by letting AI extract information from your repository or documentation file to pre-fill this form.
      </p>

      {/* Big Choice Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <button
          type="button"
          onClick={() => {
            const input = document.getElementById('ai-autofill-link-input') as HTMLInputElement;
            if (input) input.focus();
          }}
          disabled={!!uploadedFile}
          style={{
            padding: '20px',
            border: linkUrl ? '3px solid #0064d2' : '2px solid #ddd',
            borderRadius: '8px',
            backgroundColor: uploadedFile ? '#f5f5f5' : linkUrl ? '#f0f7ff' : 'white',
            cursor: uploadedFile ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            if (!uploadedFile) {
              e.currentTarget.style.borderColor = '#0064d2';
              e.currentTarget.style.backgroundColor = '#f0f7ff';
            }
          }}
          onMouseLeave={(e) => {
            if (!uploadedFile && !linkUrl) {
              e.currentTarget.style.borderColor = '#ddd';
              e.currentTarget.style.backgroundColor = 'white';
            }
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🔗</div>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '4px',
            color: uploadedFile ? '#999' : '#333'
          }}>
            Paste a Link
          </div>
          <div style={{ fontSize: '13px', color: uploadedFile ? '#999' : '#666' }}>
            GitHub or Confluence URL
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!linkUrl) {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.md,.txt,.pdf,.docx,README';
              input.onchange = (e: any) => {
                const file = e.target.files[0];
                if (file) {
                  handleFileUpload(file);
                }
              };
              input.click();
            }
          }}
          disabled={!!linkUrl}
          style={{
            padding: '20px',
            border: uploadedFile ? '3px solid #0064d2' : '2px solid #ddd',
            borderRadius: '8px',
            backgroundColor: linkUrl ? '#f5f5f5' : uploadedFile ? '#f0f7ff' : 'white',
            cursor: linkUrl ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            if (!linkUrl) {
              e.currentTarget.style.borderColor = '#0064d2';
              e.currentTarget.style.backgroundColor = '#f0f7ff';
            }
          }}
          onMouseLeave={(e) => {
            if (!linkUrl && !uploadedFile) {
              e.currentTarget.style.borderColor = '#ddd';
              e.currentTarget.style.backgroundColor = 'white';
            }
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>📁</div>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '4px',
            color: linkUrl ? '#999' : '#333'
          }}>
            Browse Files
          </div>
          <div style={{ fontSize: '13px', color: linkUrl ? '#999' : '#666' }}>
            Upload documentation
          </div>
        </button>
      </div>

      {/* Link Input - Only show when not using file upload */}
      {!uploadedFile && (
        <div style={{ marginBottom: '20px' }}>
          <input
            id="ai-autofill-link-input"
            type="text"
            placeholder="Paste GitHub repository URL or Confluence wiki link..."
            value={linkUrl}
            onChange={(e) => handleLinkChange(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: validationMessage?.type === 'success' ? '2px solid #28a745' : 
                      validationMessage?.type === 'error' ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button
            type="button"
            onClick={() => setShowSupportedLinks(!showSupportedLinks)}
            style={{
              marginTop: '8px',
              padding: '4px 8px',
              backgroundColor: 'transparent',
              color: '#0064d2',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              textDecoration: 'underline'
            }}
          >
            {showSupportedLinks ? '▼' : '▶'} What links are supported?
          </button>

          {/* Supported Links Dropdown */}
          {showSupportedLinks && (
            <div style={{
              marginTop: '12px',
              padding: '16px',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '4px'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                Supported Sources for AI Autofill:
              </h4>
              {SUPPORTED_MCPS.map((mcp, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: '16px', 
                    paddingBottom: '16px', 
                    borderBottom: index < SUPPORTED_MCPS.length - 1 ? '1px solid #f0f0f0' : 'none' 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ marginRight: '8px', fontSize: '18px' }}>{mcp.icon}</span>
                    <strong>{mcp.name}</strong>
                  </div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#666' }}>
                    {mcp.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#888' }}>
                    <strong>Examples:</strong>
                    {mcp.examples.map((example, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          marginTop: '4px', 
                          fontFamily: 'monospace', 
                          backgroundColor: '#f8f9fa', 
                          padding: '4px 8px', 
                          borderRadius: '3px' 
                        }}
                      >
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* File Upload Display - Only show when file is uploaded */}
      {uploadedFile && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            border: '2px solid #28a745',
            borderRadius: '4px',
            padding: '16px',
            backgroundColor: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
            <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>{uploadedFile.name}</p>
            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#666' }}>
              {(uploadedFile.size / 1024).toFixed(1)} KB
            </p>
            <button
              type="button"
              onClick={handleRemoveFile}
              style={{
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Remove File
            </button>
          </div>
        </div>
      )}

      {/* Validation Message */}
      {validationMessage && (
        <div style={{
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '16px',
          backgroundColor: validationMessage.type === 'success' ? '#d4edda' :
                          validationMessage.type === 'error' ? '#f8d7da' : '#cce5ff',
          border: `1px solid ${validationMessage.type === 'success' ? '#c3e6cb' :
                               validationMessage.type === 'error' ? '#f5c6cb' : '#b8daff'}`,
          color: validationMessage.type === 'success' ? '#155724' :
                 validationMessage.type === 'error' ? '#721c24' : '#004085',
          fontSize: '14px'
        }}>
          {validationMessage.text}
        </div>
      )}

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
