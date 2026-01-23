import React, { useState } from 'react';
import type { DetailedContentItem } from './StepContentRenderer';

interface StepContentEditorProps {
  content: DetailedContentItem[];
  onChange: (newContent: DetailedContentItem[]) => void;
  onCancel: () => void;
  onSave: () => void;
  hideButtons?: boolean;
}

export function StepContentEditor({ content, onChange, onCancel, onSave, hideButtons = false }: StepContentEditorProps) {
  const [items, setItems] = useState<DetailedContentItem[]>(content);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Update parent when items change
  const updateItems = (newItems: DetailedContentItem[]) => {
    setItems(newItems);
    onChange(newItems);
  };

  // Add new content item
  const addContentItem = (type: DetailedContentItem['type']) => {
    const newItem: DetailedContentItem = {
      id: `item-${Date.now()}`,
      type,
      text: type === 'list' ? undefined : '',
      items: type === 'list' ? [''] : undefined,
      level: type === 'heading' ? 2 : undefined,
      variant: type === 'callout' ? 'info' : undefined,
      url: type === 'link' ? '' : undefined,
    };
    updateItems([...items, newItem]);
    setShowAddMenu(false);
  };

  // Update specific item
  const updateItem = (index: number, updates: Partial<DetailedContentItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    updateItems(newItems);
  };

  // Remove item
  const removeItem = (index: number) => {
    updateItems(items.filter((_, i) => i !== index));
  };

  // Move item up
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    updateItems(newItems);
  };

  // Move item down
  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    updateItems(newItems);
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    onChange(items);
  };

  // Update list item
  const updateListItem = (itemIndex: number, listItemIndex: number, value: string) => {
    const newItems = [...items];
    const listItems = [...(newItems[itemIndex].items || [])];
    listItems[listItemIndex] = value;
    newItems[itemIndex] = { ...newItems[itemIndex], items: listItems };
    updateItems(newItems);
  };

  // Add list item
  const addListItem = (itemIndex: number) => {
    const newItems = [...items];
    const listItems = [...(newItems[itemIndex].items || []), ''];
    newItems[itemIndex] = { ...newItems[itemIndex], items: listItems };
    updateItems(newItems);
  };

  // Remove list item
  const removeListItem = (itemIndex: number, listItemIndex: number) => {
    const newItems = [...items];
    const listItems = (newItems[itemIndex].items || []).filter((_, i) => i !== listItemIndex);
    newItems[itemIndex] = { ...newItems[itemIndex], items: listItems };
    updateItems(newItems);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      {!hideButtons && (
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Edit Step Content</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onCancel}
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                color: '#666',
                border: '2px solid #999',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Content Items */}
      <div style={{ marginBottom: '20px' }}>
        {items.map((item, index) => (
          <div
            key={item.id || index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            style={{
              backgroundColor: 'white',
              padding: '16px',
              marginBottom: '12px',
              borderRadius: '6px',
              border: '2px solid #ddd',
              cursor: 'move'
            }}
          >
            {/* Header with controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#999', fontWeight: 'bold', cursor: 'move' }}>⋮⋮</span>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: '#e3f2fd',
                  color: '#0064d2',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {item.type.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: index === 0 ? '#f0f0f0' : 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === items.length - 1}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: index === items.length - 1 ? '#f0f0f0' : 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: index === items.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ↓
                </button>
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content based on type */}
            {item.type === 'heading' && (
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600' }}>
                    Level:
                  </label>
                  <select
                    value={item.level || 2}
                    onChange={(e) => updateItem(index, { level: parseInt(e.target.value) as 1 | 2 | 3 | 4 })}
                    style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px', width: '100px' }}
                  >
                    <option value={1}>H1</option>
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                    <option value={4}>H4</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={item.text || ''}
                  onChange={(e) => updateItem(index, { text: e.target.value })}
                  placeholder="Heading text..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            )}

            {item.type === 'text' && (
              <div>
                {item.label !== undefined && (
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600' }}>
                      Label (optional):
                    </label>
                    <input
                      type="text"
                      value={item.label || ''}
                      onChange={(e) => updateItem(index, { label: e.target.value })}
                      placeholder="e.g., Mac:, Windows:, Note:"
                      style={{
                        width: '100%',
                        padding: '6px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                )}
                <textarea
                  value={item.text || ''}
                  onChange={(e) => updateItem(index, { text: e.target.value })}
                  placeholder="Text content..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit'
                  }}
                />
                <label style={{ display: 'flex', alignItems: 'center', marginTop: '8px', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={item.label !== undefined}
                    onChange={(e) => updateItem(index, { label: e.target.checked ? '' : undefined })}
                    style={{ marginRight: '6px' }}
                  />
                  Add label
                </label>
              </div>
            )}

            {item.type === 'code' && (
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600' }}>
                    Language (optional):
                  </label>
                  <input
                    type="text"
                    value={item.language || ''}
                    onChange={(e) => updateItem(index, { language: e.target.value })}
                    placeholder="e.g., bash, javascript, python"
                    style={{
                      width: '200px',
                      padding: '6px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  />
                </div>
                <textarea
                  value={item.text || ''}
                  onChange={(e) => updateItem(index, { text: e.target.value })}
                  placeholder="Code content..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontFamily: 'monospace'
                  }}
                />
                <label style={{ display: 'flex', alignItems: 'center', marginTop: '8px', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={item.copy_to_clipboard || false}
                    onChange={(e) => updateItem(index, { copy_to_clipboard: e.target.checked })}
                    style={{ marginRight: '6px' }}
                  />
                  Show copy button
                </label>
              </div>
            )}

            {item.type === 'list' && (
              <div>
                {(item.items || []).map((listItem, listIndex) => (
                  <div key={listIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={listItem}
                      onChange={(e) => updateListItem(index, listIndex, e.target.value)}
                      placeholder="List item..."
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <button
                      onClick={() => removeListItem(index, listIndex)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addListItem(index)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#0064d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  + Add Item
                </button>
              </div>
            )}

            {item.type === 'callout' && (
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600' }}>
                    Variant:
                  </label>
                  <select
                    value={item.variant || 'info'}
                    onChange={(e) => updateItem(index, { variant: e.target.value as 'info' | 'warning' | 'success' | 'error' })}
                    style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px', width: '150px' }}
                  >
                    <option value="info">Info (Blue)</option>
                    <option value="warning">Warning (Orange)</option>
                    <option value="success">Success (Green)</option>
                    <option value="error">Error (Red)</option>
                  </select>
                </div>
                <textarea
                  value={item.text || ''}
                  onChange={(e) => updateItem(index, { text: e.target.value })}
                  placeholder="Callout text..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            )}

            {item.type === 'link' && (
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600' }}>
                    Link Text:
                  </label>
                  <input
                    type="text"
                    value={item.text || ''}
                    onChange={(e) => updateItem(index, { text: e.target.value })}
                    placeholder="Click here to learn more"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600' }}>
                    URL:
                  </label>
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => updateItem(index, { url: e.target.value })}
                    placeholder="https://example.com"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            )}

            {item.type === 'section' && (
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600' }}>
                    Section Label:
                  </label>
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => updateItem(index, { label: e.target.value })}
                    placeholder="Important Note"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '600' }}>
                    Content:
                  </label>
                  <textarea
                    value={item.text || ''}
                    onChange={(e) => updateItem(index, { text: e.target.value })}
                    placeholder="Section content..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Content Button */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#0064d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          + Add Content Block
        </button>

        {showAddMenu && (
          <>
            <div
              onClick={() => setShowAddMenu(false)}
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
                { type: 'list' as const, label: '• List', desc: 'Bullet points' },
                { type: 'code' as const, label: '</> Code', desc: 'Code block' },
                { type: 'callout' as const, label: 'ℹ️ Callout', desc: 'Info box' },
                { type: 'link' as const, label: '🔗 Link', desc: 'External link' },
                { type: 'section' as const, label: '📦 Section', desc: 'Highlighted block' },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => addContentItem(item.type)}
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
  );
}

export default StepContentEditor;
