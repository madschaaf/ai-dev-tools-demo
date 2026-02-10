import React, { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectionRange {
  start: number;
  end: number;
  text: string;
}

type FormatType = 'bold' | 'italic' | 'code' | 'link' | 'highlight' | 'ai-icon' | 'bullet-list' | 'numbered-list';

export function RichTextEditor({ value, onChange, placeholder = '', rows = 3 }: RichTextEditorProps) {
  const [showToolbar, setShowToolbar] = useState(true);
  const [selection, setSelection] = useState<SelectionRange | null>(null);
  const [activeFormats, setActiveFormats] = useState<Set<FormatType>>(new Set());
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [pendingLinkSelection, setPendingLinkSelection] = useState<{ start: number; end: number; text: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showLinkModal && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [showLinkModal]);

  const handleTextSelect = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start !== end) {
      const selectedText = value.substring(start, end);
      setSelection({ start, end, text: selectedText });
    } else {
      setSelection(null);
    }
  };

  const applyLinkFormatting = () => {
    if (!pendingLinkSelection || !linkUrl) return;

    const { start, end, text } = pendingLinkSelection;
    const formattedText = `[${text}](${linkUrl})`;
    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    onChange(newValue);

    // Close modal and reset
    setShowLinkModal(false);
    setLinkUrl('');
    setPendingLinkSelection(null);

    // Set cursor after the formatted text
    setTimeout(() => {
      if (textareaRef.current) {
        const newPosition = start + formattedText.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 10);
  };

  const applyFormatting = (formatType: FormatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    // Special handling for links
    if (formatType === 'link') {
      if (start !== end) {
        // Text is selected, show modal
        setPendingLinkSelection({ start, end, text: selectedText });
        setShowLinkModal(true);
        return;
      } else {
        // No text selected, show modal anyway
        setPendingLinkSelection({ start, end, text: '' });
        setShowLinkModal(true);
        return;
      }
    }

    // Special handling for lists
    if (formatType === 'bullet-list' || formatType === 'numbered-list') {
      // Find the start of the current line
      const beforeCursor = value.substring(0, start);
      const lineStart = beforeCursor.lastIndexOf('\n') + 1;
      const currentLine = value.substring(lineStart, value.indexOf('\n', start) >= 0 ? value.indexOf('\n', start) : value.length);
      
      // Insert list marker at the beginning of current line or selected lines
      if (start !== end) {
        // Multi-line selection - add list marker to each line
        const lines = selectedText.split('\n');
        const prefix = formatType === 'bullet-list' ? '- ' : '';
        const formattedLines = lines.map((line, index) => {
          const marker = formatType === 'bullet-list' ? '- ' : `${index + 1}. `;
          // Don't add marker if line already has one
          if (line.trim().match(/^(-|\d+\.)\s/)) {
            return line;
          }
          return marker + line;
        });
        const formattedText = formattedLines.join('\n');
        const newValue = value.substring(0, start) + formattedText + value.substring(end);
        onChange(newValue);
      } else {
        // Single line - add marker to current line
        let marker = '';
        
        if (formatType === 'bullet-list') {
          marker = '- ';
        } else {
          // For numbered lists, find the last number in previous lines
          const linesBeforeCursor = value.substring(0, lineStart).split('\n');
          let lastNumber = 0;
          
          // Look backwards for the most recent numbered list item
          for (let i = linesBeforeCursor.length - 1; i >= 0; i--) {
            const match = linesBeforeCursor[i].match(/^(\d+)\.\s/);
            if (match) {
              lastNumber = parseInt(match[1]);
              break;
            }
          }
          
          marker = `${lastNumber + 1}. `;
        }
        
        // Check if line already has a marker
        if (!currentLine.trim().match(/^(-|\d+\.)\s/)) {
          const newValue = value.substring(0, lineStart) + marker + value.substring(lineStart);
          onChange(newValue);
          setTimeout(() => {
            const newPosition = lineStart + marker.length;
            textarea.focus();
            textarea.setSelectionRange(newPosition, newPosition);
          }, 10);
        }
      }
      return;
    }

    // If text is selected, wrap it with formatting
    if (start !== end) {
      let formattedText = '';

      switch (formatType) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'code':
          formattedText = `\`${selectedText}\``;
          break;
        case 'highlight':
          formattedText = `==${selectedText}==`;
          break;
        case 'ai-icon':
          formattedText = `🤖${selectedText}🤖`;
          break;
      }

      const newValue = value.substring(0, start) + formattedText + value.substring(end);
      onChange(newValue);
      setSelection(null);

      // Set cursor after the formatted text
      setTimeout(() => {
        const newPosition = start + formattedText.length;
        textarea.focus();
        textarea.setSelectionRange(newPosition, newPosition);
      }, 10);
    } else {
      // No text selected - toggle format mode (Word-style)
      if (activeFormats.has(formatType)) {
        // Deactivate format
        setActiveFormats(prev => {
          const newSet = new Set(prev);
          newSet.delete(formatType);
          return newSet;
        });
      } else {
        // Activate format - insert formatting markers at cursor
        let markers = '';
        let cursorOffset = 0;

        switch (formatType) {
          case 'bold':
            markers = '****';
            cursorOffset = 2;
            break;
          case 'italic':
            markers = '**';
            cursorOffset = 1;
            break;
          case 'code':
            markers = '``';
            cursorOffset = 1;
            break;
          case 'highlight':
            markers = '====';
            cursorOffset = 2;
            break;
          case 'ai-icon':
            markers = '🤖🤖';
            cursorOffset = 1;
            break;
        }

        const newValue = value.substring(0, start) + markers + value.substring(end);
        onChange(newValue);

        // Position cursor between the markers
        setTimeout(() => {
          const newPosition = start + cursorOffset;
          textarea.focus();
          textarea.setSelectionRange(newPosition, newPosition);
        }, 10);

        // Activate the format
        setActiveFormats(prev => new Set(prev).add(formatType));
      }
    }
  };

  const isFormatActive = (formatType: FormatType): boolean => {
    return activeFormats.has(formatType);
  };

  return (
    <div style={{ position: 'relative' }}>
      {showToolbar && (
        <div
          ref={toolbarRef}
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            padding: '6px',
            display: 'flex',
            gap: '4px',
            marginBottom: '8px',
            border: '1px solid #ddd'
          }}
        >
          <button
            type="button"
            onClick={() => applyFormatting('bold')}
            title="Bold (Markdown: **text**)"
            style={{
              padding: '6px 12px',
              backgroundColor: isFormatActive('bold') ? '#0064d2' : 'white',
              color: isFormatActive('bold') ? 'white' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            B
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('italic')}
            title="Italic (Markdown: *text*)"
            style={{
              padding: '6px 12px',
              backgroundColor: isFormatActive('italic') ? '#0064d2' : 'white',
              color: isFormatActive('italic') ? 'white' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontStyle: 'italic',
              transition: 'all 0.2s'
            }}
          >
            I
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('code')}
            title="Code (Markdown: `code`)"
            style={{
              padding: '6px 12px',
              backgroundColor: isFormatActive('code') ? '#0064d2' : 'white',
              color: isFormatActive('code') ? 'white' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'monospace',
              transition: 'all 0.2s'
            }}
          >
            {'</>'}
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('link')}
            title="Link - Select text or type URL directly (auto-detects .com, https://)"
            style={{
              padding: '6px 12px',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            🔗
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('highlight')}
            title="Highlight (Markdown: ==text==)"
            style={{
              padding: '6px 12px',
              backgroundColor: isFormatActive('highlight') ? '#fff59d' : 'white',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            🖍️
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('ai-icon')}
            title="AI Badge - Marks text as AI-related or AI-generated content (Markdown: 🤖text🤖)"
            style={{
              padding: '6px 12px',
              backgroundColor: isFormatActive('ai-icon') ? '#e3f2fd' : 'white',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            🤖
          </button>
          <div style={{ width: '1px', height: '28px', backgroundColor: '#ccc', margin: '0 4px' }} />
          <button
            type="button"
            onClick={() => applyFormatting('bullet-list')}
            title="Bullet List (Markdown: - item)"
            style={{
              padding: '6px 12px',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            •
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('numbered-list')}
            title="Numbered List (Markdown: 1. item)"
            style={{
              padding: '6px 12px',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            1.
          </button>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => {
            setShowLinkModal(false);
            setLinkUrl('');
            setPendingLinkSelection(null);
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              minWidth: '400px',
              maxWidth: '500px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
              Insert Link
            </h3>
            <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#666' }}>
              {pendingLinkSelection?.text 
                ? `Adding link to: "${pendingLinkSelection.text}"`
                : 'Enter link URL and optional text'}
            </p>
            <input
              ref={linkInputRef}
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com or paste any URL"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyLinkFormatting();
                } else if (e.key === 'Escape') {
                  setShowLinkModal(false);
                  setLinkUrl('');
                  setPendingLinkSelection(null);
                }
              }}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl('');
                  setPendingLinkSelection(null);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLinkFormatting}
                disabled={!linkUrl}
                style={{
                  padding: '8px 16px',
                  backgroundColor: linkUrl ? '#0064d2' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: linkUrl ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onMouseUp={handleTextSelect}
        onKeyUp={handleTextSelect}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
          fontFamily: 'inherit',
          resize: 'vertical',
          minHeight: '42px'
        }}
      />
    </div>
  );
}

export default RichTextEditor;
