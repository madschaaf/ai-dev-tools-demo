import React, { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Code block component with copy button
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '4px' }}>
      <code
        style={{
          backgroundColor: '#f5f5f5',
          padding: '2px 6px',
          paddingRight: '32px',
          borderRadius: '3px',
          fontFamily: 'monospace',
          fontSize: '0.9em',
          border: '1px solid #e0e0e0',
          display: 'inline-block',
        }}
      >
        {code}
      </code>
      <button
        onClick={handleCopy}
        title="Copy to clipboard"
        style={{
          position: 'absolute',
          right: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '2px 6px',
          backgroundColor: copied ? '#28a745' : '#0064d2',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '10px',
          fontWeight: '600',
          transition: 'background-color 0.2s'
        }}
      >
        {copied ? '✓' : '📋'}
      </button>
    </div>
  );
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const parseContent = (text: string): React.ReactNode[] => {
    // Split content into lines to handle block-level elements (lists)
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let key = 0;
    let inBulletList = false;
    let inNumberedList = false;
    let listItems: React.ReactNode[] = [];
    let numberedListStart = 1; // Track the starting number for numbered lists

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for bullet list item
      const bulletMatch = line.match(/^-\s+(.+)$/);
      if (bulletMatch) {
        if (!inBulletList && inNumberedList) {
          // Close numbered list and open bullet list
          elements.push(<ol key={key++} start={numberedListStart} style={{ marginLeft: '20px' }}>{listItems}</ol>);
          listItems = [];
          inNumberedList = false;
        }
        inBulletList = true;
        listItems.push(<li key={key++}>{parseInlineMarkdown(bulletMatch[1])}</li>);
        continue;
      }
      
      // Check for numbered list item - capture the actual number
      const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
      if (numberedMatch) {
        const lineNumber = parseInt(numberedMatch[1], 10);
        
        if (!inNumberedList) {
          // Starting a new numbered list
          if (inBulletList) {
            // Close bullet list first
            elements.push(<ul key={key++} style={{ marginLeft: '20px' }}>{listItems}</ul>);
            listItems = [];
            inBulletList = false;
          }
          // Set the starting number for this list
          numberedListStart = lineNumber;
          inNumberedList = true;
        }
        
        listItems.push(<li key={key++}>{parseInlineMarkdown(numberedMatch[2])}</li>);
        continue;
      }
      
      // Not a list item - close any open lists
      if (inBulletList) {
        elements.push(<ul key={key++} style={{ marginLeft: '20px' }}>{listItems}</ul>);
        listItems = [];
        inBulletList = false;
      }
      if (inNumberedList) {
        elements.push(<ol key={key++} start={numberedListStart} style={{ marginLeft: '20px' }}>{listItems}</ol>);
        // Calculate what the next number would be if we continue the list
        numberedListStart = numberedListStart + listItems.length;
        listItems = [];
        inNumberedList = false;
      }
      
      // Regular line - parse inline markdown
      if (line.trim()) {
        elements.push(<div key={key++}>{parseInlineMarkdown(line)}</div>);
      } else {
        elements.push(<br key={key++} />);
      }
    }
    
    // Close any remaining open lists
    if (inBulletList) {
      elements.push(<ul key={key++} style={{ marginLeft: '20px' }}>{listItems}</ul>);
    }
    if (inNumberedList) {
      elements.push(<ol key={key++} start={numberedListStart} style={{ marginLeft: '20px' }}>{listItems}</ol>);
    }

    return elements;
  };

  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let remainingText = text;
    let key = 0;

    // Auto-detect and convert plain URLs to links
    const linkPlaceholders: { [key: string]: string } = {};
    let placeholderIndex = 0;
    
    // Protect existing markdown links
    remainingText = remainingText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match) => {
      const placeholder = `__LINK_PLACEHOLDER_${placeholderIndex}__`;
      linkPlaceholders[placeholder] = match;
      placeholderIndex++;
      return placeholder;
    });
    
    // Auto-link plain URLs
    remainingText = remainingText.replace(
      /(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.(com|org|net|edu|gov|io|ai|dev|app)[^\s]*)/gi,
      (match) => {
        const url = match.startsWith('http') ? match : `https://${match}`;
        return `[${match}](${url})`;
      }
    );
    
    // Restore protected markdown links
    Object.keys(linkPlaceholders).forEach(placeholder => {
      remainingText = remainingText.replace(placeholder, linkPlaceholders[placeholder]);
    });

    // Parse markdown patterns
    while (remainingText.length > 0) {
      // Find the earliest occurrence of any pattern
      const patterns = [
        { regex: /\[(.+?)\]\((.+?)\)/, type: 'link', length: 0, index: -1 },
        { regex: /\*\*(.+?)\*\*/, type: 'bold', length: 0, index: -1 },
        { regex: /==(.+?)==/, type: 'highlight', length: 0, index: -1 },
        { regex: /`(.+?)`/, type: 'code', length: 0, index: -1 },
        { regex: /\*(.+?)\*/, type: 'italic', length: 0, index: -1 },
        { regex: /🤖(.+?)🤖/, type: 'ai-icon', length: 0, index: -1 },
      ];

      // Find which pattern appears first
      let earliestPattern: typeof patterns[0] | null = null;
      let earliestMatch: RegExpMatchArray | null = null;

      for (const pattern of patterns) {
        const match = remainingText.match(pattern.regex);
        if (match && match.index !== undefined) {
          if (earliestPattern === null || match.index < (earliestMatch?.index ?? Infinity)) {
            earliestPattern = pattern;
            earliestMatch = match;
          }
        }
      }

      // If no pattern found, add remaining text and break
      if (!earliestPattern || !earliestMatch || earliestMatch.index === undefined) {
        if (remainingText) {
          elements.push(<React.Fragment key={key++}>{remainingText}</React.Fragment>);
        }
        break;
      }

      // Add text before the pattern
      if (earliestMatch.index > 0) {
        const beforeText = remainingText.substring(0, earliestMatch.index);
        elements.push(<React.Fragment key={key++}>{beforeText}</React.Fragment>);
      }

      // Add the formatted element based on type
      switch (earliestPattern.type) {
        case 'bold':
          elements.push(<strong key={key++}>{earliestMatch[1]}</strong>);
          break;
          
        case 'italic':
          elements.push(<em key={key++}>{earliestMatch[1]}</em>);
          break;
          
        case 'code':
          elements.push(<CodeBlock key={key++} code={earliestMatch[1]} />);
          break;
          
        case 'highlight':
          elements.push(
            <mark
              key={key++}
              style={{
                backgroundColor: '#fff3cd',
                padding: '2px 4px',
                borderRadius: '2px'
              }}
            >
              {earliestMatch[1]}
            </mark>
          );
          break;
          
        case 'link':
          elements.push(
            <a
              key={key++}
              href={earliestMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0064d2',
                textDecoration: 'underline'
              }}
            >
              {earliestMatch[1]}
            </a>
          );
          break;
          
        case 'ai-icon':
          elements.push(
            <span
              key={key++}
              style={{
                backgroundColor: '#e3f2fd',
                color: '#0064d2',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.9em'
              }}
            >
              <span>🤖</span>
              <span>{earliestMatch[1]}</span>
            </span>
          );
          break;
      }

      // Move past the matched pattern
      remainingText = remainingText.substring(earliestMatch.index + earliestMatch[0].length);
    }

    return elements;
  };

  return (
    <div className={className} style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
      {parseContent(content)}
    </div>
  );
}

export default MarkdownRenderer;
