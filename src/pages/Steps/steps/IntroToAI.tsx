import { useState } from 'react'

export default function IntroToAI({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const handleCopy = (text: string, promptKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPrompt(promptKey)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const examplePrompt = `I'm setting up my development environment for the first time. Can you help me understand:

1. What is a proxy server and why do I need to configure it for work?
2. What are SSH keys and why are they important for GitHub?
3. What is the difference between VS Code extensions and AI coding assistants?

Please explain in simple terms with examples.`

  return (
    <>
      <h2>Using AI Tools During Setup</h2>
      <p>Throughout this setup guide, you'll use AI tools to help troubleshoot, learn concepts, and speed up configuration. Let's start by learning how to use web-based AI assistants.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Why Use AI During Setup?</strong>
        <ul style={{ marginBottom: 0, paddingLeft: 'var(--space-4)' }}>
          <li>Get instant help with error messages</li>
          <li>Understand complex concepts in simple terms</li>
          <li>Generate configuration files and commands</li>
          <li>Learn best practices as you go</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Web-Based AI Tools (No Installation Required)</h3>
      <p>You can use these AI tools right now in your browser:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <strong style={{ fontSize: '1.1rem' }}>ChatGPT</strong>
            <a
              className="button ghost"
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              Open ChatGPT
            </a>
          </div>
          <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
            Great for: General troubleshooting, explaining concepts, generating code snippets
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Free tier available • Sign up with personal email
          </p>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <strong style={{ fontSize: '1.1rem' }}>Claude.ai</strong>
            <a
              className="button ghost"
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              Open Claude
            </a>
          </div>
          <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
            Great for: Detailed technical explanations, analyzing error logs, step-by-step guidance
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Free tier available • Sign up with personal email
          </p>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <strong style={{ fontSize: '1.1rem' }}>NotebookLM</strong>
            <a
              className="button ghost"
              href="https://notebooklm.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              Open NotebookLM
            </a>
          </div>
          <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
            Great for: Creating study guides from documentation, summarizing long wiki pages, generating FAQs
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Free • Requires Google account
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Try It: Ask AI for Help</h3>
      <p>Copy this example prompt and paste it into ChatGPT or Claude to see how AI can help you learn:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <pre style={{ flex: 1, margin: 0, fontSize: '0.85rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {examplePrompt}
          </pre>
          <button
            type="button"
            onClick={() => handleCopy(examplePrompt, 'example')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedPrompt === 'example' ? 'var(--color-green-500)' : 'white',
              color: copiedPrompt === 'example' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {copiedPrompt === 'example' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Best Practices for Using AI</h3>
      <ul>
        <li><strong>Be specific:</strong> Include your OS, error messages, and what you're trying to accomplish</li>
        <li><strong>Share context:</strong> Tell the AI you're new to development and setting up for the first time</li>
        <li><strong>Ask follow-ups:</strong> If you don't understand something, ask the AI to explain it differently</li>
        <li><strong>Verify critical information:</strong> Double-check important commands before running them</li>
        <li><strong>Use code blocks:</strong> When sharing error messages, paste them in full</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Using NotebookLM for Documentation</h3>
      <p>Throughout the setup, you'll encounter eBay wiki pages and documentation. Here's how to use NotebookLM to learn faster:</p>

      <ol>
        <li>Open <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer">NotebookLM</a></li>
        <li>Create a new notebook for "eBay Development Setup"</li>
        <li>When you find a wiki page or documentation, copy the URL</li>
        <li>Add it as a source in NotebookLM</li>
        <li>Ask NotebookLM questions like:
          <ul>
            <li>"Summarize the key steps for setting up the proxy"</li>
            <li>"Create a checklist of required access items"</li>
            <li>"What are common troubleshooting steps?"</li>
          </ul>
        </li>
      </ol>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Throughout This Guide:</strong> You'll see "Ask AI for Help" prompts with copy buttons. These are pre-written prompts you can paste into ChatGPT or Claude to get assistance with that specific step.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>AI Tools You'll Use Later</h3>
      <p>After completing the setup, you'll have access to even more powerful AI tools:</p>
      <ul>
        <li><strong>GitHub Copilot</strong> (Step 11) - AI code completion in your editor</li>
        <li><strong>Cline</strong> (Step 10) - Autonomous AI coding agent</li>
        <li><strong>Claude Code</strong> (Step 11) - Advanced AI assistant in VS Code</li>
        <li><strong>MCP Servers</strong> (Step 12) - AI that can access eBay tools directly</li>
      </ul>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>Ready to Start!</strong>
        <p style={{ margin: '8px 0 0' }}>
          Now that you know how to use AI tools, proceed to Step 1 to begin your setup. Remember: AI is here to help you learn and troubleshoot along the way!
        </p>
      </div>

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {!isCompleted ? (
            <button
              type="button"
              onClick={onComplete}
              style={{
                fontSize: '1rem',
                padding: '12px 24px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              Mark as Complete
            </button>
          ) : (
            <div style={{ color: '#28a745', fontWeight: 600, fontSize: '1.1rem' }}>
              ✓ Step Completed
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          style={{
            fontSize: '1rem',
            padding: '12px 24px',
            background: '#0969da',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
        >
          Next Step →
        </button>
      </div>
    </>
  )
}
