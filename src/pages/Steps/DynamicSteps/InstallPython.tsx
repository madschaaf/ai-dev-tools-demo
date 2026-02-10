import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallPython() {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  useEffect(() => {
    const os = getUserOS()
    if (os) {
      setUserOS(os)
    }
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const chocoInstallCommand = 'choco install python -y'
  const wingetInstallCommand = 'winget install Python.Python.3.12'
  const brewInstallCommand = 'brew install python@3.12'

  const handleDownload = () => {
    setDownloadStarted(true)
    setIsDownloading(true)

    // Provide appropriate download link based on saved OS
    let downloadUrl = 'https://www.python.org/downloads/'

    if (userOS === 'mac') {
      downloadUrl = 'https://www.python.org/ftp/python/3.12.8/python-3.12.8-macos11.pkg'
    } else if (userOS === 'windows') {
      downloadUrl = 'https://www.python.org/ftp/python/3.12.8/python-3.12.8-amd64.exe'
    }

    // Trigger download
    window.open(downloadUrl, '_blank')

    // Simulate download progress
    setTimeout(() => {
      setIsDownloading(false)
    }, 3000)
  }

  return (
    <>
      <h2>Install Python</h2>

      <p>Python is a versatile programming language widely used for data analysis, machine learning, automation, web development, and scripting. It comes with pip (Python Package Installer) for managing packages and libraries.</p>

      {/* OS Selector - Always visible and prominent */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4a90d9 0%, #667eea 100%)', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)', 
        marginTop: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-2)', fontSize: '1.2rem', textAlign: 'center' }}>
          First, select your operating system:
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', margin: '0 0 var(--space-3)', fontSize: '0.9rem' }}>
          This will customize the installation instructions for your computer
        </p>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Mac Button */}
          <button
            type="button"
            onClick={() => setUserOS('mac')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: userOS === 'mac' ? '3px solid white' : '3px solid transparent',
              background: userOS === 'mac' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '180px',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '1.8rem' }}></span>
            <span>Mac</span>
            {userOS === 'mac' && <span style={{ marginLeft: '4px' }}>✓</span>}
          </button>

          {/* Windows Button */}
          <button
            type="button"
            onClick={() => setUserOS('windows')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: userOS === 'windows' ? '3px solid white' : '3px solid transparent',
              background: userOS === 'windows' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '180px',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '1.8rem' }}></span>
            <span>Windows</span>
            {userOS === 'windows' && <span style={{ marginLeft: '4px' }}>✓</span>}
          </button>
        </div>

        {userOS && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: 'var(--radius-sm)', 
            padding: 'var(--space-2)', 
            marginTop: 'var(--space-3)',
            textAlign: 'center'
          }}>
            <span style={{ color: 'white', fontSize: '0.95rem' }}>
              ✓ Showing instructions for <strong>{userOS === 'mac' ? 'Mac' : 'Windows'}</strong>
            </span>
          </div>
        )}
      </div>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginBottom: 'var(--space-4)' }}>
          <strong>Please select your operating system above</strong> to see the installation instructions customized for your computer.
        </div>
      )}

      <h3>Why Python?</h3>
      <ul>
        <li><strong>Easy to Learn</strong> - Clean, readable syntax ideal for beginners and experts</li>
        <li><strong>Extensive Libraries</strong> - Rich ecosystem of packages for data science, ML, web dev, and more</li>
        <li><strong>pip Package Manager</strong> - Simple package installation and dependency management</li>
        <li><strong>Automation</strong> - Perfect for scripts, tools, and workflow automation</li>
        <li><strong>Cross-Platform</strong> - Runs on Windows, Mac, Linux, and more</li>
        <li><strong>Industry Standard</strong> - Used extensively in AI/ML, data analysis, and backend development</li>
      </ul>

      <div className="callout" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', marginTop: 'var(--space-4)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: 'none' }}>
        <h3 style={{ color: 'white', marginTop: 0, fontSize: '1.3rem', marginBottom: 'var(--space-3)' }}>
          🐍 Understanding Python: The Swiss Army Knife
        </h3>
        <p style={{ fontSize: '0.95rem', marginBottom: 'var(--space-4)', opacity: 0.95 }}>
          Python is like a versatile multi-tool that handles many different tasks:
        </p>

        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {/* Python Language */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🐍</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  Python = The Language
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9 }}>
                  A programming language designed for simplicity and readability. Write code that looks almost like plain English!
                </p>
              </div>
            </div>
          </div>

          {/* pip */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>📦</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  pip = Package Manager
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9, marginBottom: 'var(--space-2)' }}>
                  pip (Pip Installs Packages) makes it easy to add functionality to Python. Need data analysis? Machine learning? Web scraping? Just install a package!
                </p>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    📦 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>pip install pandas</code> = Install data analysis tools
                  </div>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    📦 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>pip install requests</code> = Install HTTP library
                  </div>
                  <div>
                    📦 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>pip list</code> = See all installed packages
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Environments */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🏠</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  Virtual Environments = Isolated Workspaces
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9, marginBottom: 'var(--space-2)' }}>
                  Each project can have its own set of packages without interfering with others. Like having separate toolboxes for different projects!
                </p>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  <code>python -m venv myproject</code><br />
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Creates an isolated environment for your project</span>
                </div>
              </div>
            </div>
          </div>

          {/* Common Use Cases */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>⚡</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  What Can You Do With Python?
                </h4>
                <div style={{ marginLeft: 'var(--space-2)', display: 'grid', gap: 'var(--space-2)', fontSize: '0.9rem' }}>
                  <div>📊 <strong>Data Analysis:</strong> Analyze spreadsheets, visualize trends, create reports</div>
                  <div>🤖 <strong>Machine Learning:</strong> Build AI models, train algorithms, make predictions</div>
                  <div>🌐 <strong>Web Development:</strong> Build websites and APIs (Django, Flask)</div>
                  <div>🔄 <strong>Automation:</strong> Automate repetitive tasks, schedule jobs, process files</div>
                  <div>🔬 <strong>Scientific Computing:</strong> Simulations, calculations, research</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>What You'll Get</h3>
      <ul>
        <li><strong>Python</strong> - The Python programming language interpreter</li>
        <li><strong>pip</strong> - Package manager for installing Python libraries</li>
        <li><strong>IDLE</strong> - Simple Python IDE for beginners (included with Python)</li>
        <li><strong>Standard Library</strong> - Built-in modules for common tasks</li>
      </ul>

      {/* OPTION 1: Terminal Installation */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
        border: '3px solid var(--color-blue-500)', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)', 
        marginTop: 'var(--space-4)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <div style={{ 
            background: 'var(--color-blue-500)', 
            color: 'white', 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            1
          </div>
          <div>
            <h3 style={{ margin: 0 }}>
              <span style={{ fontWeight: 'bold' }}>Option 1:</span>{' '}
              <span style={{ color: '#006F93' }}>Install via Terminal (Recommended)</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--color-neutral-600)' }}>
              Best for developers - quick and automated installation
            </p>
          </div>
        </div>

        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginBottom: 'var(--space-3)' }}>
          <strong>What is a Terminal?</strong>
          <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
            A terminal is a text-based way to interact with your computer. Instead of clicking buttons, you type commands. Don't worry - we'll guide you through each step!
          </p>
        </div>

        {userOS === 'mac' && (
          <>
            <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginBottom: 'var(--space-3)' }}>
              <strong>Note:</strong> macOS comes with Python pre-installed, but it's an older version. We recommend installing Python 3.12+ using Homebrew for the latest features and security updates.
            </div>

            {/* Step 1 */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-blue-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-blue-100)', 
                  color: 'var(--color-blue-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step 1
                </span>
                <strong style={{ color: '#006F93' }}>Open Terminal</strong>
              </div>
              <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
                Press <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>⌘ Command</kbd> + <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>Space</kbd> to open Spotlight, then type <strong>"Terminal"</strong> and press Enter.
              </p>
              <div style={{ background: '#f8f9fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                💡 <strong>Tip:</strong> A black or white window with a blinking cursor will appear - that's your Terminal!
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-blue-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-blue-100)', 
                  color: 'var(--color-blue-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step 2
                </span>
                <strong style={{ color: '#006F93' }}>Copy the Install Command</strong>
              </div>
              <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
                Click the "Copy" button below to copy the installation command:
              </p>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <code style={{ flex: 1, fontSize: '1rem' }}>{brewInstallCommand}</code>
                  <button
                    type="button"
                    onClick={() => handleCopy(brewInstallCommand, 'brew')}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.9rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-blue-500)',
                      background: copiedCommand === 'brew' ? 'var(--color-green-500)' : 'var(--color-blue-500)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {copiedCommand === 'brew' ? '✓ Copied!' : 'Copy Command'}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-blue-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-blue-100)', 
                  color: 'var(--color-blue-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step 3
                </span>
                <strong style={{ color: '#006F93' }}>Paste and Run the Command</strong>
              </div>
              <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                <li>Click inside the Terminal window to make sure it's active</li>
                <li>Press <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>⌘ Command</kbd> + <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>V</kbd> to paste the command</li>
                <li>Press <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>Enter</kbd> to run it</li>
                <li>Wait for the installation to complete (you'll see text scrolling - this is normal!)</li>
              </ol>
              <div style={{ background: '#d4edda', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginTop: 'var(--space-2)', color: '#155724' }}>
                ✅ <strong>Success looks like:</strong> When finished, you'll see your normal prompt again (usually ending with <code>$</code> or <code>%</code>)
              </div>
            </div>

            <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460' }}>
              <strong>Don't have Homebrew installed?</strong>
              <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
                If you see an error like "brew: command not found", you need to install Homebrew first. Copy and paste this command in Terminal:
              </p>
              <div style={{ background: 'rgba(0,0,0,0.05)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--space-2)', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                <code>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code>
              </div>
            </div>
          </>
        )}

        {userOS === 'windows' && (
          <>
            {/* Step 1 */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-blue-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-blue-100)', 
                  color: 'var(--color-blue-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step 1
                </span>
                <strong style={{ color: '#006F93' }}>Open PowerShell as Administrator</strong>
              </div>
              <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                <li>Press the <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>⊞ Windows</kbd> key on your keyboard</li>
                <li>Type <strong>"PowerShell"</strong></li>
                <li>Right-click on "Windows PowerShell" in the results</li>
                <li>Click <strong>"Run as Administrator"</strong></li>
                <li>Click "Yes" if prompted</li>
              </ol>
              <div style={{ background: '#f8f9fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginTop: 'var(--space-2)' }}>
                💡 <strong>Tip:</strong> A blue window will appear - that's PowerShell! The title bar should say "Administrator".
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-blue-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-blue-100)', 
                  color: 'var(--color-blue-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step 2
                </span>
                <strong style={{ color: '#006F93' }}>Copy the Install Command</strong>
              </div>
              <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
                Click the "Copy" button below to copy the installation command:
              </p>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <code style={{ flex: 1, fontSize: '1rem' }}>{wingetInstallCommand}</code>
                  <button
                    type="button"
                    onClick={() => handleCopy(wingetInstallCommand, 'winget')}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.9rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-blue-500)',
                      background: copiedCommand === 'winget' ? 'var(--color-green-500)' : 'var(--color-blue-500)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {copiedCommand === 'winget' ? '✓ Copied!' : 'Copy Command'}
                  </button>
                </div>
                <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-600)' }}>
                  This uses Windows Package Manager (winget) which comes pre-installed on Windows 10/11.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-blue-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-blue-100)', 
                  color: 'var(--color-blue-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step 3
                </span>
                <strong style={{ color: '#006F93' }}>Paste and Run the Command</strong>
              </div>
              <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                <li>Click inside the PowerShell window to make sure it's active</li>
                <li>Right-click to paste the command (or press <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>Ctrl</kbd> + <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>V</kbd>)</li>
                <li>Press <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>Enter</kbd> to run it</li>
                <li>Wait for the installation to complete (you'll see text scrolling - this is normal!)</li>
              </ol>
              <div style={{ background: '#d4edda', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginTop: 'var(--space-2)', color: '#155724' }}>
                ✅ <strong>Success looks like:</strong> When finished, you'll see your normal prompt again (usually <code>PS C:\&gt;</code>)
              </div>
            </div>

            {/* Step 4 - Refresh Environment Variables */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-blue-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-blue-100)', 
                  color: 'var(--color-blue-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step 4
                </span>
                <strong style={{ color: '#006F93' }}>Refresh Environment Variables</strong>
              </div>
              <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
                After installation, you need to refresh your terminal so it recognizes Python. You have two options:
              </p>
              
              <div style={{ background: '#e3f2fd', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-2)' }}>
                <p style={{ margin: '0 0 var(--space-1)', fontSize: '0.9rem', fontWeight: 600, color: '#0d47a1' }}>
                  Option A: Close and reopen PowerShell (Easiest)
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#0d47a1' }}>
                  Simply close the PowerShell window and open a new one. The new window will have the updated PATH.
                </p>
              </div>

              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ margin: '0 0 var(--space-1)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Option B: Refresh PATH in current window
                </p>
                <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.85rem', color: 'var(--color-neutral-600)' }}>
                  Run this command to update the PATH without closing the window:
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <code style={{ flex: 1, fontSize: '0.9rem', wordBreak: 'break-all' }}>$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")</code>
                  <button
                    type="button"
                    onClick={() => handleCopy('$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")', 'refresh-path')}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.9rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: copiedCommand === 'refresh-path' ? 'var(--color-green-500)' : 'var(--color-blue-500)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    {copiedCommand === 'refresh-path' ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div style={{ background: '#fff3cd', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginTop: 'var(--space-2)', color: '#856404' }}>
                💡 <strong>Why is this needed?</strong> When you install Python via winget or Chocolatey, it adds Python to your system PATH. But your current terminal session doesn't automatically see these changes - you need to refresh it.
              </div>
            </div>
          </>
        )}

        {!userOS && (
          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
            <strong>👆 Select your operating system above</strong> to see the terminal installation steps for Mac or Windows.
          </div>
        )}
      </div>

      {/* OR Divider */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'var(--space-3)', 
        margin: 'var(--space-4) 0',
        padding: '0 var(--space-4)'
      }}>
        <div style={{ flex: 1, height: '2px', background: 'var(--color-neutral-300)' }} />
        <span style={{ 
          background: 'var(--color-neutral-200)', 
          padding: '8px 20px', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 'bold',
          color: 'var(--color-neutral-600)',
          fontSize: '1rem'
        }}>
          OR
        </span>
        <div style={{ flex: 1, height: '2px', background: 'var(--color-neutral-300)' }} />
      </div>

      {/* OPTION 2: Download Installer */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
        border: '3px solid var(--color-green-500)', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <div style={{ 
            background: 'var(--color-green-500)', 
            color: 'white', 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            2
          </div>
          <div>
            <h3 style={{ margin: 0 }}>
              <span style={{ fontWeight: 'bold' }}>Option 2:</span>{' '}
              <span style={{ color: '#006F93' }}>Download Installer (Easier)</span>
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--color-neutral-600)' }}>
              Best for beginners - visual installer with step-by-step wizard
            </p>
          </div>
        </div>

        {/* Step 1 */}
        <div style={{ 
          background: 'white', 
          border: '2px solid var(--color-green-200)', 
          borderRadius: 'var(--radius-md)', 
          padding: 'var(--space-3)', 
          marginBottom: 'var(--space-3)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <span style={{ 
              background: 'var(--color-green-100)', 
              color: 'var(--color-green-700)', 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-sm)', 
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              Step 1
            </span>
            <strong style={{ color: '#006F93' }}>Download the Installer</strong>
          </div>
          <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Click the button below to download Python for your computer:
          </p>
          <button
            type="button"
            className="button"
            onClick={handleDownload}
            style={{ 
              fontSize: '1rem', 
              padding: '12px 24px',
              background: 'var(--color-green-500)',
              border: 'none',
              color: 'white',
              fontWeight: 600
            }}
          >
            Download Python 3.12 Installer
          </button>
        </div>

        {downloadStarted && (
          <>
            <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginBottom: 'var(--space-3)' }}>
              {isDownloading ? (
                <>
                  <strong>Download Started!</strong>
                  <p style={{ margin: '8px 0 0' }}>Your Python download is starting... Check your browser's download bar.</p>
                </>
              ) : (
                <>
                  <strong>Download Complete!</strong>
                  <p style={{ margin: '8px 0 0' }}>Check your Downloads folder for the Python installer file.</p>
                </>
              )}
            </div>

            {/* Step 2 */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-green-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-green-100)', 
                  color: 'var(--color-green-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step 2
                </span>
                <strong style={{ color: '#006F93' }}>Open the Installer</strong>
              </div>
              <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                <li>Open your <strong>Downloads</strong> folder</li>
                <li>Find the file named <code style={{ background: '#f6f8fa', padding: '2px 6px', borderRadius: '3px' }}>{userOS === 'mac' ? 'python-3.12.8-macos11.pkg' : 'python-3.12.8-amd64.exe'}</code></li>
                <li>Double-click the file to open it</li>
              </ol>
            </div>

            {/* Step 3 - Windows specific */}
            {userOS === 'windows' && (
              <div style={{ 
                background: 'white', 
                border: '3px solid #ffc107', 
                borderRadius: 'var(--radius-md)', 
                padding: 'var(--space-3)', 
                marginBottom: 'var(--space-3)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ 
                    background: '#fff3cd', 
                    color: '#856404', 
                    padding: '4px 12px', 
                    borderRadius: 'var(--radius-sm)', 
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    Step 3 - IMPORTANT!
                  </span>
                  <strong style={{ color: '#856404' }}>Check "Add Python to PATH"</strong>
                </div>
                <div style={{ background: '#fff3cd', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', color: '#856404' }}>
                  <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.95rem' }}>
                    ⚠️ <strong>This is the most important step!</strong> On the <strong>first screen</strong> of the installer, BEFORE clicking Install:
                  </p>
                  <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', border: '2px solid #ffc107' }}>
                    <p style={{ margin: 0, fontSize: '1rem', marginBottom: 'var(--space-2)' }}>
                      ✅ <strong>Check the box at the bottom</strong> that says <strong>"Add python.exe to PATH"</strong>
                    </p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                      This automatically sets up environment variables so you can run Python from any terminal window.
                    </p>
                  </div>
                  <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.9rem' }}>
                    <strong>Why is this important?</strong> Without this checkbox, Windows won't know where to find Python when you type commands in the terminal. You would have to manually configure environment variables, which is more complicated.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4 */}
            <div style={{ 
              background: 'white', 
              border: '2px solid var(--color-green-200)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-3)', 
              marginBottom: 'var(--space-3)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ 
                  background: 'var(--color-green-100)', 
                  color: 'var(--color-green-700)', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  Step {userOS === 'windows' ? '4' : '3'}
                </span>
                <strong style={{ color: '#006F93' }}>Follow the Installation Wizard</strong>
              </div>
              {userOS === 'windows' ? (
                <>
                  <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
                    Use all the default options - just click through:
                  </p>
                  <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                    <li>After checking "Add python.exe to PATH", click <strong>"Install Now"</strong> (uses recommended settings)</li>
                    <li>Click <strong>"Yes"</strong> if Windows asks for permission</li>
                    <li>Wait for the installation to complete (this may take a few minutes)</li>
                    <li>Click <strong>"Close"</strong> when you see "Setup was successful"</li>
                  </ol>
                  <div style={{ background: '#e3f2fd', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginTop: 'var(--space-2)', color: '#0d47a1' }}>
                    💡 <strong>Tip:</strong> "Install Now" uses all the recommended default settings. You don't need to customize anything!
                  </div>
                </>
              ) : (
                <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                  <li>Click <strong>"Continue"</strong> through the introduction screens</li>
                  <li>Accept the license agreement</li>
                  <li>Click <strong>"Install"</strong> (uses default location)</li>
                  <li>Enter your Mac password if prompted</li>
                  <li>Click <strong>"Close"</strong> when finished</li>
                </ol>
              )}
              <div style={{ background: '#d4edda', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginTop: 'var(--space-2)', color: '#155724' }}>
                ✅ <strong>You'll see a "Setup was successful" message when done!</strong>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Verify Installation Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', 
        border: '2px solid var(--color-green-400)', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)', 
        marginTop: 'var(--space-4)' 
      }}>
        <h3 style={{ marginTop: 0, color: 'var(--color-green-800)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '1.5rem' }}>✅</span> How to Check if Python Installed Successfully
        </h3>
        
        <p style={{ fontSize: '0.95rem', color: 'var(--color-neutral-700)' }}>
          After installation, let's verify everything is working. Follow these steps:
        </p>

        {/* Step 1: Open Terminal */}
        <div style={{ 
          background: 'white', 
          border: '2px solid var(--color-green-200)', 
          borderRadius: 'var(--radius-md)', 
          padding: 'var(--space-3)', 
          marginBottom: 'var(--space-3)',
          marginTop: 'var(--space-3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <span style={{ 
              background: 'var(--color-green-100)', 
              color: 'var(--color-green-700)', 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-sm)', 
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              Step 1
            </span>
            <strong style={{ color: '#006F93' }}>Open a NEW {userOS === 'windows' ? 'PowerShell' : 'Terminal'} Window</strong>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            {userOS === 'mac' ? (
              <>Press <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>⌘ Command</kbd> + <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>Space</kbd>, type "Terminal", and press Enter.</>
            ) : userOS === 'windows' ? (
              <>Press <kbd style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', border: '1px solid #dee2e6', fontFamily: 'inherit' }}>⊞ Windows</kbd> key, type "PowerShell", and press Enter.</>
            ) : (
              <>Open Terminal (Mac) or PowerShell (Windows).</>
            )}
          </p>
          <div style={{ background: '#fff3cd', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginTop: 'var(--space-2)', color: '#856404' }}>
            ⚠️ <strong>Important:</strong> You must open a NEW terminal window after installation for the changes to take effect!
          </div>
        </div>

        {/* Step 2: Check Python */}
        <div style={{ 
          background: 'white', 
          border: '2px solid var(--color-green-200)', 
          borderRadius: 'var(--radius-md)', 
          padding: 'var(--space-3)', 
          marginBottom: 'var(--space-3)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <span style={{ 
              background: 'var(--color-green-100)', 
              color: 'var(--color-green-700)', 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-sm)', 
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              Step 2
            </span>
            <strong style={{ color: '#006F93' }}>Check Python Version</strong>
          </div>
          <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Copy and paste this command, then press Enter:
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1, fontSize: '1rem' }}>python --version</code>
              <button
                type="button"
                onClick={() => handleCopy('python --version', 'python-version')}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: copiedCommand === 'python-version' ? 'var(--color-green-500)' : 'var(--color-blue-500)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'python-version' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-2)', display: 'grid', gap: 'var(--space-2)' }}>
            <div style={{ background: '#d4edda', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: '#155724' }}>
              ✅ <strong>Success:</strong> You should see something like <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>Python 3.12.8</code>
            </div>
            <div style={{ background: '#f8d7da', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: '#721c24' }}>
              ❌ <strong>Error:</strong> If you see "command not found" or "'python' is not recognized", see troubleshooting below
            </div>
          </div>
        </div>

        {/* Step 3: Check pip */}
        <div style={{ 
          background: 'white', 
          border: '2px solid var(--color-green-200)', 
          borderRadius: 'var(--radius-md)', 
          padding: 'var(--space-3)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <span style={{ 
              background: 'var(--color-green-100)', 
              color: 'var(--color-green-700)', 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-sm)', 
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              Step 3
            </span>
            <strong style={{ color: '#006F93' }}>Check pip Version</strong>
          </div>
          <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Copy and paste this command, then press Enter:
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1, fontSize: '1rem' }}>pip --version</code>
              <button
                type="button"
                onClick={() => handleCopy('pip --version', 'pip-version')}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: copiedCommand === 'pip-version' ? 'var(--color-green-500)' : 'var(--color-blue-500)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'pip-version' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-2)' }}>
            <div style={{ background: '#d4edda', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: '#155724' }}>
              ✅ <strong>Success:</strong> You should see something like <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>pip 24.3.1 from ...</code>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div style={{ 
        background: '#fff3cd', 
        border: '2px solid #ffc107', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)', 
        marginTop: 'var(--space-4)' 
      }}>
        <h3 style={{ marginTop: 0, color: '#856404', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '1.5rem' }}>🔧</span> Troubleshooting - Something Not Working?
        </h3>

        <div style={{ marginBottom: 'var(--space-3)' }}>
          <h4 style={{ color: '#856404', marginBottom: 'var(--space-2)' }}>Common Issues & Quick Fixes:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#856404' }}>
            <li style={{ marginBottom: 'var(--space-1)' }}>
              <strong>"python" command not found?</strong> Try <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>python3 --version</code> instead
            </li>
            <li style={{ marginBottom: 'var(--space-1)' }}>
              <strong>On Mac:</strong> You may need to use <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>python3</code> and <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>pip3</code> commands
            </li>
            <li style={{ marginBottom: 'var(--space-1)' }}>
              <strong>Still not working?</strong> Close ALL terminal windows and open a fresh one
            </li>
            <li>
              <strong>Windows:</strong> If you forgot to check "Add Python to PATH", reinstall Python and make sure to check that box!
            </li>
          </ul>
        </div>

        {/* AI Help Section */}
        <div style={{ 
          background: 'white', 
          border: '2px solid #ffc107', 
          borderRadius: 'var(--radius-md)', 
          padding: 'var(--space-3)' 
        }}>
          <h4 style={{ marginTop: 0, marginBottom: 'var(--space-2)', color: '#856404', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div className="ai-helper-icons" style={{ display: 'flex', gap: '4px' }}>
              <span className="ai-helper-icon ai-helper-icon-glean" aria-hidden="true">g</span>
              <span className="ai-helper-icon ai-helper-icon-chatgpt" aria-hidden="true">c</span>
            </div>
            Get Help from AI - Use Glean or ChatGPT!
          </h4>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
            If you're stuck or see an error message you don't understand, your AI assistants can help! Here's how:
          </p>

          <div style={{ background: '#f8f9fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
            <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', fontWeight: 600 }}>
              📋 Copy the error message from your terminal, then ask:
            </p>
            <div style={{ background: '#e3f2fd', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: '#0d47a1', fontStyle: 'italic' }}>
              "I'm trying to install Python on {userOS === 'mac' ? 'Mac' : userOS === 'windows' ? 'Windows' : 'my computer'} and got this error: [paste error here]. How do I fix this?"
            </div>
          </div>

          <div style={{ background: '#f8f9fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', fontWeight: 600 }}>
              💡 Example prompts you can use:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              <li style={{ marginBottom: 'var(--space-1)' }}>
                "I ran 'python --version' and got 'command not found'. How do I fix this on {userOS === 'mac' ? 'Mac' : userOS === 'windows' ? 'Windows' : 'my computer'}?"
              </li>
              <li style={{ marginBottom: 'var(--space-1)' }}>
                "How do I check if Python is installed correctly on my computer?"
              </li>
              <li style={{ marginBottom: 'var(--space-1)' }}>
                "I installed Python but the terminal doesn't recognize it. What should I do?"
              </li>
              <li>
                "What does this error mean: [paste your error message]"
              </li>
            </ul>
          </div>

          <div style={{ background: '#d4edda', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginTop: 'var(--space-3)', color: '#155724' }}>
            💡 <strong>Pro tip:</strong> The more details you give (your operating system, the exact error message, what you tried), the better help you'll get!
          </div>
        </div>
      </div>

      {/* Optional: Virtual Environments - Collapsible for beginners */}
      <div style={{ 
        background: '#f8f9fa', 
        border: '1px solid var(--color-neutral-300)', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)', 
        marginTop: 'var(--space-4)' 
      }}>
        <h3 style={{ marginTop: 0, marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '1.3rem' }}>📚</span>
          Optional: Virtual Environments (For Later)
        </h3>
        
        <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginBottom: 'var(--space-3)' }}>
          <strong>You can skip this section for now!</strong>
          <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
            Virtual environments are useful when you start working on real projects, but you don't need them just to learn Python. Come back to this later when you're ready.
          </p>
        </div>

        <h4 style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-2)', color: 'var(--color-neutral-700)' }}>
          What is a Virtual Environment? (Simple Explanation)
        </h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
          Think of a virtual environment like a <strong>separate folder for each project</strong> that keeps all its tools and libraries organized and isolated.
        </p>
        
        <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
          <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem' }}>
            <strong>Real-world analogy:</strong> Imagine you have two art projects:
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            <li style={{ marginBottom: 'var(--space-1)' }}>Project A needs red, blue, and green paint</li>
            <li style={{ marginBottom: 'var(--space-1)' }}>Project B needs red, yellow, and purple paint</li>
          </ul>
          <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Instead of mixing all your paints together (which could get messy!), you keep separate paint boxes for each project. That's exactly what a virtual environment does for your Python projects - it keeps each project's tools separate so they don't interfere with each other.
          </p>
        </div>

        <h4 style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-2)', color: 'var(--color-neutral-700)' }}>
          Why Would You Use This?
        </h4>
        <ul style={{ margin: '0 0 var(--space-3)', paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
          <li style={{ marginBottom: 'var(--space-1)' }}><strong>Different projects need different tools:</strong> One project might need version 1.0 of a library, another might need version 2.0</li>
          <li style={{ marginBottom: 'var(--space-1)' }}><strong>Keeps things clean:</strong> When you delete a project, all its tools go with it</li>
          <li><strong>Avoids conflicts:</strong> Installing something for one project won't break another project</li>
        </ul>

        <div style={{ background: '#fff3cd', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: '#856404', marginBottom: 'var(--space-3)' }}>
          💡 <strong>When to use this:</strong> When you start building real Python projects (like a web app or data analysis script), you'll want to create a virtual environment for each one. For now, just learning Python basics? You can skip this!
        </div>

        <details style={{ marginTop: 'var(--space-3)' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#006F93', fontSize: '0.95rem' }}>
            Show me the commands anyway (click to expand)
          </summary>
          <div style={{ marginTop: 'var(--space-3)', paddingLeft: 'var(--space-2)' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-2)' }}>
              <strong>Step 1:</strong> Create a virtual environment (run this in your project folder):
            </p>
            <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                <code style={{ flex: 1 }}>python -m venv myproject</code>
                <button
                  type="button"
                  onClick={() => handleCopy('python -m venv myproject', 'venv-create')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-blue-500)',
                    background: copiedCommand === 'venv-create' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'venv-create' ? 'white' : 'var(--color-blue-500)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {copiedCommand === 'venv-create' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-600)' }}>
                This creates a folder called "myproject" with its own copy of Python. You can name it anything you want!
              </p>
            </div>
            
            <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-2)' }}>
              <strong>Step 2:</strong> Activate the virtual environment (tells your terminal to use this project's Python):
            </p>
            {userOS === 'windows' ? (
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <code style={{ flex: 1 }}>myproject\Scripts\activate</code>
                  <button
                    type="button"
                    onClick={() => handleCopy('myproject\\Scripts\\activate', 'venv-activate')}
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-blue-500)',
                      background: copiedCommand === 'venv-activate' ? 'var(--color-green-500)' : 'white',
                      color: copiedCommand === 'venv-activate' ? 'white' : 'var(--color-blue-500)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {copiedCommand === 'venv-activate' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-600)' }}>
                  You'll know it worked when you see <code>(myproject)</code> appear at the start of your command line!
                </p>
              </div>
            ) : (
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <code style={{ flex: 1 }}>source myproject/bin/activate</code>
                  <button
                    type="button"
                    onClick={() => handleCopy('source myproject/bin/activate', 'venv-activate')}
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-blue-500)',
                      background: copiedCommand === 'venv-activate' ? 'var(--color-green-500)' : 'white',
                      color: copiedCommand === 'venv-activate' ? 'white' : 'var(--color-blue-500)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {copiedCommand === 'venv-activate' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-600)' }}>
                  You'll know it worked when you see <code>(myproject)</code> appear at the start of your command line!
                </p>
              </div>
            )}
            
            <p style={{ fontSize: '0.85rem', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
              <strong>To deactivate</strong> (go back to normal): Just type <code>deactivate</code> and press Enter.
            </p>
          </div>
        </details>
      </div>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button ghost"
          href="https://docs.python.org/3/tutorial/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Python Tutorial
        </a>
        <a
          className="button ghost"
          href="https://pip.pypa.io/en/stable/getting-started/"
          target="_blank"
          rel="noopener noreferrer"
        >
          pip Guide
        </a>
      </div>
    </>
  )
}
