import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

// List item can be a simple string or an object with detailed content
export interface ListItemData {
  text: string;
  detailedContent?: string;
}

// Type definitions for structured step content
export interface DetailedContentItem {
  id?: string;
  type: 'text' | 'heading' | 'code' | 'list' | 'callout' | 'link' | 'section';
  label?: string;
  text?: string; // Optional to support list items
  copy_to_clipboard?: boolean;
  language?: string;
  variant?: 'info' | 'warning' | 'success' | 'error';
  items?: (string | ListItemData)[]; // For list type - supports both formats
  listStyle?: 'bullet' | 'numbered'; // For list styling
  url?: string; // For link type
  level?: 1 | 2 | 3 | 4; // For heading type
}

interface StepContentRendererProps {
  content: DetailedContentItem[];
  className?: string;
}

// Helper component for code blocks with copy functionality
function CodeBlock({ code, language, copyable }: { code: string; language?: string; copyable?: boolean }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <pre style={{
        backgroundColor: '#f5f5f5',
        padding: '12px',
        borderRadius: '4px',
        overflow: 'auto',
        border: '1px solid #ddd',
        fontSize: '13px',
        lineHeight: '1.5'
      }}>
        <code>{code}</code>
      </pre>
      {copyable && (
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '4px 12px',
            backgroundColor: copied ? '#28a745' : '#0064d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      )}
    </div>
  );
}

// Helper component for callout boxes
function Callout({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' | 'success' | 'error' }) {
  const colors = {
    info: { bg: '#e3f2fd', border: '#0064d2', icon: 'ℹ️' },
    warning: { bg: '#fff4e6', border: '#ff9800', icon: '⚠️' },
    success: { bg: '#e8f5e9', border: '#28a745', icon: '✓' },
    error: { bg: '#ffebee', border: '#dc3545', icon: '✕' }
  };

  const style = colors[variant];

  return (
    <div style={{
      backgroundColor: style.bg,
      borderLeft: `4px solid ${style.border}`,
      padding: '12px 16px',
      borderRadius: '4px',
      marginBottom: '16px'
    }}>
      <span style={{ marginRight: '8px', fontSize: '16px' }}>{style.icon}</span>
      <span style={{ fontSize: '14px', lineHeight: '1.6' }}>{children}</span>
    </div>
  );
}

// Main renderer component
export function StepContentRenderer({ content, className = '' }: StepContentRendererProps) {
  if (!content || content.length === 0) {
    return <p style={{ color: '#999', fontStyle: 'italic' }}>No detailed content available.</p>;
  }

  return (
    <div className={`step-content-renderer ${className}`} style={{ lineHeight: '1.7' }}>
      {content.map((item, index) => {
        const key = item.id || `item-${index}`;

        switch (item.type) {
          case 'heading':
            const level = item.level || 2;
            const headingStyle = {
              color: '#0064d2',
              marginTop: level === 2 ? '24px' : '16px',
              marginBottom: '12px',
              fontWeight: '600'
            };
            
            return React.createElement(
              `h${level}`,
              { key, style: headingStyle },
              item.text
            );

          case 'text':
            return (
              <div key={key} style={{ marginBottom: '12px', color: '#333' }}>
                {item.label && <strong>{item.label} </strong>}
                <MarkdownRenderer content={item.text || ''} />
              </div>
            );

          case 'code':
            return (
              <CodeBlock
                key={key}
                code={item.text || ''}
                language={item.language}
                copyable={item.copy_to_clipboard}
              />
            );

          case 'list':
            const ListTag = item.listStyle === 'numbered' ? 'ol' : 'ul';
            return (
              <ListTag key={key} style={{ marginBottom: '16px', paddingLeft: '24px' }}>
                {item.items?.map((listItem, i) => {
                  // Support both string and object formats
                  const itemData = typeof listItem === 'string' 
                    ? { text: listItem } 
                    : listItem;
                  
                  return (
                    <li key={i} style={{ marginBottom: '8px', color: '#333' }}>
                      <MarkdownRenderer content={itemData.text} />
                      {itemData.detailedContent && (
                        <div style={{
                          marginTop: '8px',
                          paddingLeft: '16px',
                          fontSize: '13px',
                          color: '#555',
                          borderLeft: '3px solid #ddd',
                          paddingTop: '4px',
                          paddingBottom: '4px'
                        }}>
                          <MarkdownRenderer content={itemData.detailedContent} />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ListTag>
            );

          case 'callout':
            return (
              <Callout key={key} variant={item.variant}>
                <MarkdownRenderer content={item.text || ''} />
              </Callout>
            );

          case 'link':
            return (
              <p key={key} style={{ marginBottom: '12px' }}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0064d2',
                    textDecoration: 'underline',
                    fontWeight: '500'
                  }}
                >
                  {item.text}
                </a>
              </p>
            );

          case 'section':
            return (
              <div
                key={key}
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  border: '1px solid #e0e0e0'
                }}
              >
                <strong style={{ display: 'block', marginBottom: '8px', color: '#0064d2' }}>
                  {item.label}
                </strong>
                <div style={{ color: '#333' }}>
                  <MarkdownRenderer content={item.text || ''} />
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default StepContentRenderer;
