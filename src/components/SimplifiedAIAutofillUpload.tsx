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
  maxDocuments?: number; // Dynamic max based on image uploads
  onFilesChange?: (files: File[]) => void; // Notify parent of file changes
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

export default function AIAutofillUpload({ onAutofillReady, maxDocuments, onFilesChange }: AIAutofillUploadProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkName, setLinkName] = useState('');
  const [addedLinks, setAddedLinks] = useState<Array<{ name: string; url: string }>>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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

  const isHubTVUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === 'hubtv.corp.ebay.com';
    } catch {
      return false;
    }
  };

  const generateLinkName = (url: string): string => {
    try {
      const urlObj = new URL(url);
      
      // For HubTV media - extract last 6 characters from hash
      if (urlObj.hostname === 'hubtv.corp.ebay.com') {
        // Extract from hash like #/media/nk0xWe
        const hash = urlObj.hash;
        const match = hash.match(/\/media\/([a-zA-Z0-9]{6})$/);
        if (match) {
          return match[1]; // Return just the 6-character ID
        }
        // Fallback if pattern doesn't match
        return hash.slice(-6) || 'HubTV';
      }
      
      // For GitHub repos
      if (urlObj.hostname.includes('github')) {
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        if (pathParts.length >= 2) {
          const repoName = pathParts[1];
          return `GitHub: ${repoName}`;
        }
        return 'GitHub Repository';
      }
      
      // For Confluence
      if (urlObj.hostname.includes('confluence') || urlObj.hostname.includes('atlassian')) {
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        // Try to extract page title from URL if present
        const pageMatch = urlObj.pathname.match(/\/pages\/\d+\/([^/?]+)/);
        if (pageMatch) {
          const pageName = decodeURIComponent(pageMatch[1]).replace(/[+-]/g, ' ');
          return `Wiki: ${pageName}`;
        }
        return 'Confluence Page';
      }
      
      // Default fallback
      return urlObj.hostname.replace('www.', '');
    } catch {
      return 'Link';
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleLinkChange = (value: string) => {
    setLinkUrl(value);
    setValidationMessage(null);
    
    if (value.trim()) {
      if (!isValidUrl(value)) {
        setValidationMessage({
          type: 'error',
          text: '✗ Invalid URL'
        });
      } else {
        const validMCP = validateLink(value);
        if (validMCP) {
          setValidationMessage({
            type: 'success',
            text: `✓ Valid ${validMCP.name} link - AI can autofill from this source`
          });
        }
        // Don't show info message for other valid URLs
      }
    }
  };

  const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/');
  };

  const validateFileSize = (file: File): boolean => {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    return file.size <= maxSizeInBytes;
  };

  const handleFileUpload = (file: File) => {
    // Check if it's an image (images should be uploaded via the image upload section)
    if (isImageFile(file)) {
      setValidationMessage({
        type: 'error',
        text: '✗ Please use the image upload section above for images'
      });
      return;
    }

    // Validate file size
    if (!validateFileSize(file)) {
      setValidationMessage({
        type: 'error',
        text: `✗ File size exceeds 10MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB)`
      });
      return;
    }

    const newFiles = [...uploadedFiles, file];
    setUploadedFiles(newFiles);
    setValidationMessage({
      type: 'success',
      text: `✓ File "${file.name}" added`
    });
    
    // Notify parent of file changes
    onFilesChange?.(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    
    // Notify parent of file changes
    onFilesChange?.(newFiles);
  };

  const handleAddLink = () => {
    if (linkUrl.trim() && isValidUrl(linkUrl)) {
      const autoLinkName = generateLinkName(linkUrl);
      setAddedLinks([...addedLinks, { name: autoLinkName, url: linkUrl.trim() }]);
      setLinkUrl('');
      setValidationMessage(null);
    }
  };

  const handleRemoveLink = (index: number) => {
    setAddedLinks(addedLinks.filter((_, i) => i !== index));
  };

  const handleUpdateLinkName = (index: number, newName: string) => {
    const updatedLinks = [...addedLinks];
    updatedLinks[index] = { ...updatedLinks[index], name: newName };
    setAddedLinks(updatedLinks);
  };


  return (
    <div 
    // style={{
    //   backgroundColor: '#f0f7ff',
    //   border: '2px solid #0064d2',
    //   borderRadius: '8px',
    //   padding: '20px',
    //   marginBottom: '24px'
    // }}
    >
      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#333' }}>
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: 'white',
                  border: '2px solid #28a745',
                  borderRadius: '6px'
                }}
              >
                <div style={{ fontSize: '24px' }}>📄</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0', fontWeight: '500', fontSize: '14px' }}>{file.name}</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '24px',
                    padding: '4px 8px',
                    lineHeight: '1',
                    flexShrink: 0
                  }}
                  title="Remove file"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload File Button */}
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => {
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
          }}
          disabled={maxDocuments !== undefined && uploadedFiles.length >= maxDocuments}
          style={{
            width: '100%',
            padding: '12px 24px',
            border: '2px solid #0064d2',
            color: maxDocuments !== undefined && uploadedFiles.length >= maxDocuments ? '#999' : '#0064d2',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: maxDocuments !== undefined && uploadedFiles.length >= maxDocuments ? '#f0f0f0' : 'white',
            cursor: maxDocuments !== undefined && uploadedFiles.length >= maxDocuments ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: maxDocuments !== undefined && uploadedFiles.length >= maxDocuments ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (!(maxDocuments !== undefined && uploadedFiles.length >= maxDocuments)) {
              e.currentTarget.style.borderColor = '#0064d2';
              e.currentTarget.style.backgroundColor = '#f0f7ff';
            }
          }}
          onMouseLeave={(e) => {
            if (!(maxDocuments !== undefined && uploadedFiles.length >= maxDocuments)) {
              e.currentTarget.style.backgroundColor = 'white';
            }
          }}
        >
          <span>📎</span>
          {maxDocuments !== undefined && uploadedFiles.length >= maxDocuments 
            ? `Document limit reached (${uploadedFiles.length}/${maxDocuments})`
            : 'Upload a File'}
        </button>
        {maxDocuments !== undefined && (
          <p style={{ 
            fontSize: '13px', 
            color: '#666', 
            margin: '8px 0 0 0',
            textAlign: 'center'
          }}>
            Max {maxDocuments} document{maxDocuments !== 1 ? 's' : ''} • File size limit: 10MB
          </p>
        )}
      </div>

      {/* Divider */}
      <div style={{
        margin: '20px 0',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: '#e0e0e0'
        }} />
        <span style={{
          position: 'relative',
          backgroundColor: 'white',
          padding: '0 12px',
          fontSize: '13px',
          color: '#666',
          fontWeight: '500'
        }}>
          ✨ 
        </span>
      </div>

      {/* Link Input */}
      <div style={{ marginBottom: '20px' }}>
          {/* URL Input with Add Button - Always visible */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ 
              position: 'relative',
              marginBottom: '8px'
            }}>
              <label
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '12px',
                  backgroundColor: 'white',
                  padding: '0 4px',
                  fontSize: '11px',
                  color: '#666',
                  fontWeight: '500',
                  zIndex: 1
                }}
              >
                Add Related Link
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Paste any URL (GitHub, Confluence, HubTV etc.)..."
                  value={linkUrl}
                  onChange={(e) => handleLinkChange(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    transition: 'all 0.2s',
                    border: validationMessage?.type === 'success' ? '2px solid #28a745' : 
                           validationMessage?.type === 'error' ? '2px solid #dc3545' : 
                           validationMessage?.type === 'info' ? '2px solid #0064d2' : '2px solid #ccc',
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  disabled={!linkUrl.trim() || !isValidUrl(linkUrl)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: linkUrl.trim() && isValidUrl(linkUrl) ? '#0064d2' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: linkUrl.trim() && isValidUrl(linkUrl) ? 'pointer' : 'not-allowed',
                    fontWeight: '500',
                    fontSize: '14px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Validation Message */}
            {validationMessage && (
              <div style={{
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                color: validationMessage.type === 'error' ? '#721c24' : 
                       validationMessage.type === 'success' ? '#155724' : '#004085'
              }}>
                {validationMessage.text}
              </div>
            )}
          </div>
          {/* <button
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
          </button> */}

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

      {/* Added Links Display */}
      {addedLinks.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#333' }}>
            Added Links ({addedLinks.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {addedLinks.map((link, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <label
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '8px',
                      backgroundColor: 'white',
                      padding: '0 4px',
                      fontSize: '11px',
                      color: '#666',
                      fontWeight: '500'
                    }}
                  >
                    {isHubTVUrl(link.url) ? 'ID' : 'Link Name'}
                  </label>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => handleUpdateLinkName(index, e.target.value)}
                    style={{
                      width: '200px',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    placeholder={isHubTVUrl(link.url) ? 'Media ID' : 'Link name'}
                  />
                </div>
                <div style={{ 
                  flex: 1, 
                  fontSize: '13px', 
                  color: '#666', 
                  wordBreak: 'break-all',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ flex: 1 }}>{link.url}</span>
                  {validateLink(link.url) && (
                    <span 
                      style={{ 
                        fontSize: '16px',
                        cursor: 'help',
                        flexShrink: 0
                      }}
                      title="This link can be used for AI autofill generation"
                    >
                      ✨
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '24px',
                    padding: '4px 8px',
                    lineHeight: '1',
                    flexShrink: 0
                  }}
                  title="Remove link"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
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
