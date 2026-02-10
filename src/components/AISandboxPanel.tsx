import React, { useState } from 'react';
import aiSandboxService from '../services/aiSandboxService';

interface AISandboxPanelProps {
  onTextGenerated?: (text: string) => void;
  onImageGenerated?: (imageUrl: string) => void;
}

export const AISandboxPanel: React.FC<AISandboxPanelProps> = ({
  onTextGenerated,
  onImageGenerated
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  // Text capabilities state
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [selectedTextCapability, setSelectedTextCapability] = useState<
    'translate' | 'detect' | 'rewrite' | 'summarize'
  >('translate');

  // Image capabilities state
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImageCapability, setSelectedImageCapability] = useState<
    'generate' | 'detect' | 'background'
  >('generate');

  const handleTextOperation = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;
      
      switch (selectedTextCapability) {
        case 'translate':
          response = await aiSandboxService.machineTranslation({
            input: inputText,
            sourceLanguage,
            targetLanguage
          });
          if (onTextGenerated && response.output) {
            onTextGenerated(response.output);
          }
          break;

        case 'detect':
          response = await aiSandboxService.languageDetection(inputText);
          break;

        case 'rewrite':
          response = await aiSandboxService.itemTitleRewrite(inputText);
          if (onTextGenerated && response.rewritten_title) {
            onTextGenerated(response.rewritten_title);
          }
          break;

        case 'summarize':
          response = await aiSandboxService.descriptionSummarization(inputText);
          if (onTextGenerated && response.summary) {
            onTextGenerated(response.summary);
          }
          break;
      }

      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleImageOperation = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;
      
      switch (selectedImageCapability) {
        case 'generate':
          const keywords = imagePrompt.split(',').map(k => k.trim());
          response = await aiSandboxService.text2Image({
            promptKeywords: keywords
          });
          if (onImageGenerated && response.images && response.images[0]) {
            onImageGenerated(response.images[0]);
          }
          break;

        case 'detect':
          response = await aiSandboxService.objectDetection(imageUrl);
          break;

        case 'background':
          response = await aiSandboxService.backgroundSwap(imageUrl);
          if (onImageGenerated && response.images && response.images[0]) {
            onImageGenerated(response.images[0]);
          }
          break;
      }

      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '12px'
      }}>
        <span style={{ fontSize: '24px', marginRight: '12px' }}>🤖</span>
        <h3 style={{ margin: 0 }}>eBay AI Sandbox</h3>
        <span style={{
          marginLeft: 'auto',
          padding: '4px 12px',
          backgroundColor: '#e3f2fd',
          color: '#0064d2',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {import.meta.env.VITE_AI_SANDBOX_ENV || 'staging'}
        </span>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('text')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'text' ? '#0064d2' : 'white',
            color: activeTab === 'text' ? 'white' : '#666',
            border: '2px solid #0064d2',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📝 Text Capabilities
        </button>
        <button
          onClick={() => setActiveTab('image')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'image' ? '#0064d2' : 'white',
            color: activeTab === 'image' ? 'white' : '#666',
            border: '2px solid #0064d2',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          🖼️ Image Capabilities
        </button>
      </div>

      {/* Text Capabilities Tab */}
      {activeTab === 'text' && (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Select Capability
            </label>
            <select
              value={selectedTextCapability}
              onChange={(e) => setSelectedTextCapability(e.target.value as any)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="translate">Machine Translation</option>
              <option value="detect">Language Detection</option>
              <option value="rewrite">Title Rewrite</option>
              <option value="summarize">Description Summarization</option>
            </select>
          </div>

          {selectedTextCapability === 'translate' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px' }}>
                  Source Language
                </label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px' }}>
                  Target Language
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  <option value="es">Spanish</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Input Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                selectedTextCapability === 'translate' ? 'Enter text to translate...' :
                selectedTextCapability === 'detect' ? 'Enter text to detect language...' :
                selectedTextCapability === 'rewrite' ? 'Enter item title to improve...' :
                'Enter description to summarize...'
              }
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '14px'
              }}
            />
          </div>

          <button
            onClick={handleTextOperation}
            disabled={loading || !inputText.trim()}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            {loading ? 'Processing...' : 'Run AI Capability'}
          </button>
        </div>
      )}

      {/* Image Capabilities Tab */}
      {activeTab === 'image' && (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Select Capability
            </label>
            <select
              value={selectedImageCapability}
              onChange={(e) => setSelectedImageCapability(e.target.value as any)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="generate">Text to Image (SDXL)</option>
              <option value="detect">Object Detection</option>
              <option value="background">Background Swap</option>
            </select>
          </div>

          {selectedImageCapability === 'generate' ? (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Image Prompt (comma-separated keywords)
              </label>
              <input
                type="text"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="e.g., beach, ocean, waves, sunset"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
                Note: Text-to-Image available in preprod/production only
              </p>
            </div>
          ) : (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://i.ebayimg.com/images/..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              {selectedImageCapability === 'background' && (
                <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
                  Note: Background Swap available in preprod only
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleImageOperation}
            disabled={loading || (selectedImageCapability === 'generate' ? !imagePrompt.trim() : !imageUrl.trim())}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            {loading ? 'Processing...' : 'Run AI Capability'}
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c00'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px'
        }}>
          <h4 style={{ marginTop: 0 }}>Result:</h4>
          <pre style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '13px',
            maxHeight: '300px'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {/* Info Notice */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px',
        fontSize: '13px'
      }}>
        <strong>⚠️ Note:</strong> To use AI Sandbox capabilities in PRODUCTION, you need to file an AI Intake ticket.
        Visit the <a href="https://github.com/aisandbox" target="_blank" rel="noopener noreferrer" style={{ color: '#0064d2' }}>AI Sandbox documentation</a> for more details.
      </div>
    </div>
  );
};

export default AISandboxPanel;
