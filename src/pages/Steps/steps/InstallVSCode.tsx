import { useState } from 'react'

export default function InstallVSCode() {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setDownloadStarted(true)
    setIsDownloading(true)

    // Detect OS and provide appropriate download link
    const userAgent = navigator.userAgent
    let downloadUrl = 'https://code.visualstudio.com/Download'

    if (userAgent.includes('Mac')) {
      downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal'
    } else if (userAgent.includes('Win')) {
      downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user'
    } else if (userAgent.includes('Linux')) {
      downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=linux-x64'
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
      <h2>Step 1: Install VS Code</h2>

      {!downloadStarted ? (
        <>
          <p>Visual Studio Code is a lightweight but powerful source code editor that runs on your desktop.</p>

          <h3>Why VS Code?</h3>
          <ul>
            <li><strong>Free and Open Source</strong> - Built by Microsoft and the community</li>
            <li><strong>IntelliSense</strong> - Smart code completion and syntax highlighting</li>
            <li><strong>Extensions</strong> - Thousands of extensions for any language or framework</li>
            <li><strong>Integrated Terminal</strong> - Run commands without leaving your editor</li>
            <li><strong>Git Integration</strong> - Built-in source control management</li>
          </ul>

          <div style={{ marginTop: 'var(--space-4)' }}>
            <button
              className="button"
              onClick={handleDownload}
              style={{ fontSize: '1.1rem', padding: '14px 24px' }}
            >
              Download VS Code
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
            {isDownloading ? (
              <>
                <strong>Download Started!</strong>
                <p style={{ margin: '8px 0 0' }}>Your VS Code download is starting...</p>
              </>
            ) : (
              <>
                <strong>Download in Progress</strong>
                <p style={{ margin: '8px 0 0' }}>Check your downloads folder for the installer.</p>
              </>
            )}
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>What's happening now?</h3>
          <p>We've initiated the download of the latest stable version of Visual Studio Code for your operating system.</p>

          <h3>Installation Steps:</h3>
          <ol>
            <li><strong>Locate the installer</strong> - Check your Downloads folder for the VS Code installer file</li>
            <li><strong>Run the installer</strong> - Double-click the downloaded file to begin installation</li>
            <li><strong>Follow the prompts</strong> - Accept the license agreement and choose your install location</li>
            <li><strong>Select additional tasks</strong> (recommended):
              <ul>
                <li>Add "Open with Code" action to Windows Explorer context menu (Windows only)</li>
                <li>Add to PATH (allows you to open VS Code from terminal)</li>
                <li>Register Code as an editor for supported file types</li>
              </ul>
            </li>
            <li><strong>Complete installation</strong> - Click Install and wait for the process to complete</li>
            <li><strong>Launch VS Code</strong> - Once installed, open VS Code to verify everything works</li>
          </ol>

          <h3>After Installation</h3>
          <p>Once VS Code is installed and running, you can proceed to Step 2 to install essential extensions that will enhance your development experience.</p>

          <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
            <button
              className="button secondary"
              onClick={handleDownload}
            >
              Download Again
            </button>
            <a
              className="button ghost"
              href="https://code.visualstudio.com/docs/setup/setup-overview"
              target="_blank"
              rel="noreferrer"
            >
              Installation Help
            </a>
          </div>
        </>
      )}
    </>
  )
}
