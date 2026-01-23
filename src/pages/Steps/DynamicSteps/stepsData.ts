// Dynamic Steps Data - Extracted from existing step components
// This file provides step definitions that can be used in the Use Case Prototype

// Import the DetailedContentItem type from StepContentRenderer
import type { DetailedContentItem } from '../../../components/StepContentRenderer';

export interface DynamicStep {
  id: string;
  title: string;
  description: string;
  category: 'security' | 'access' | 'admin' | 'install' | 'setup' | 'config' | 'practice';
  
  // Legacy field - will be deprecated
  detailedContent?: string;
  
  // New structured content field
  detailed_content?: DetailedContentItem[];
  
  links?: Array<{
    label: string;
    url: string;
  }>;
  requirements?: string[];
  commonIssues?: string[];
  tags?: string[];
  
  // Tracking fields (for database)
  created_by?: string;
  approved_by?: string;
  approval_date?: string;
  last_modified?: string;
  modified_by?: string;
  count_modified?: number;
}

// Re-export the DetailedContentItem type for convenience
export type { DetailedContentItem };

export const DYNAMIC_STEPS: DynamicStep[] = [
  {
    id: 'verify-sso-ping',
    title: 'Verify SSO and Ping',
    description: 'Confirm your security credentials are working properly. Test SSO login, PingID multi-factor authentication, and YubiKey hardware authentication.',
    category: 'security',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Before you can download and access eBay tools, you need to confirm your security credentials are working properly.'
      },
      {
        id: 'sso-heading',
        type: 'heading',
        text: 'Verify SSO (Single Sign-On)',
        level: 2
      },
      {
        id: 'sso-steps',
        type: 'list',
        items: [
          'Test Token Access Portal: Sign in to Token Access Portal (TAP) with your corp credentials',
          'If you can open "My Account" and view your tokens, SSO is working',
          'Additional check: Sign in to Hub Services (IT support portal) using your corp SSO'
        ]
      },
      {
        id: 'pingid-heading',
        type: 'heading',
        text: 'Verify PingID',
        level: 2
      },
      {
        id: 'pingid-steps',
        type: 'list',
        items: [
          'In TAP, open PingID and check "My Account" to see your registered devices',
          'Confirm which device is set as "Primary"',
          'Trigger a PingID challenge by signing into any app that requires MFA',
          'Approve the push notification in the PingID app'
        ]
      },
      {
        id: 'yubikey-heading',
        type: 'heading',
        text: 'Verify YubiKey',
        level: 2
      },
      {
        id: 'yubikey-steps',
        type: 'list',
        items: [
          'Connect to the corporate network or VPN',
          'Go to auth.vip.ebay.com',
          'Use the "Validate" or test function',
          'Enter your YubiKey PIN and press the key',
          'Successful validation confirms your key is registered'
        ]
      },
      {
        id: 'issues-callout',
        type: 'callout',
        variant: 'warning',
        text: 'Common Issues:\n• New hires may need to register YubiKey first\n• Manage PingID devices in TAP\n• YubiKey validation requires corporate network/VPN'
      }
    ],
    links: [
      { label: 'Token Access Portal', url: 'https://tokenaccess.corp.ebay.com/' },
      { label: 'Test YubiKey', url: 'https://auth.vip.ebay.com/' },
      { label: 'IT Support', url: 'https://ebayinc.service-now.com/esc' }
    ],
    commonIssues: [
      'New hires: You may need to register your YubiKey first',
      'Device management: Manage all PingID devices in TAP',
      'YubiKey not validating: Ensure you\'re on corporate network/VPN'
    ]
  },
  {
    id: 'request-secure-access',
    title: 'Request Secure Access',
    description: 'Submit access requests for GitHub Enterprise, AI tools, and other secure systems through the appropriate portals.',
    category: 'access',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Request access to the tools and systems you need for your role.'
      },
      {
        id: 'github-heading',
        type: 'heading',
        text: 'GitHub Enterprise Access',
        level: 2
      },
      {
        id: 'github-steps',
        type: 'list',
        items: [
          'Submit request through the security portal',
          'Include justification for repository access needed',
          'Wait for approval (usually 1-2 business days)'
        ]
      },
      {
        id: 'ai-tools-heading',
        type: 'heading',
        text: 'AI Tools Access',
        level: 2
      },
      {
        id: 'ai-tools-steps',
        type: 'list',
        items: [
          'Request through AI Tools access portal',
          'Provide business justification',
          'Specify which tools you need (GitHub Copilot, etc.)'
        ]
      },
      {
        id: 'other-heading',
        type: 'heading',
        text: 'Other Secure Systems',
        level: 2
      },
      {
        id: 'other-steps',
        type: 'list',
        items: [
          'Follow your team\'s access request procedures',
          'Document why you need access',
          'Get manager approval if required'
        ]
      }
    ],
    links: [
      { label: 'GitHub Enterprise Access', url: 'https://github.corp.ebay.com/' },
      { label: 'AI Tools Portal', url: 'https://ebayinc.service-now.com/aiintake' }
    ]
  },
  {
    id: 'request-local-admin',
    title: 'Request Local Admin Access',
    description: 'Submit ticket for local administrator rights on your machine. Required for installing development tools and dependencies.',
    category: 'admin',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Local administrator rights allow you to install software and configure your development environment.'
      },
      {
        id: 'why-heading',
        type: 'heading',
        text: 'Why You Need This',
        level: 2
      },
      {
        id: 'why-list',
        type: 'list',
        items: [
          'Install development tools (IDEs, runtimes, etc.)',
          'Configure system settings',
          'Install dependencies and packages',
          'Manage development servers'
        ]
      },
      {
        id: 'request-heading',
        type: 'heading',
        text: 'How to Request',
        level: 2
      },
      {
        id: 'request-steps',
        type: 'list',
        items: [
          'Go to Employee Service Center',
          'Submit "Local Admin Access" request',
          'Provide business justification',
          'Include your manager\'s approval',
          'Wait for IT to grant access (1-3 business days)'
        ]
      },
      {
        id: 'after-heading',
        type: 'heading',
        text: 'After Approval',
        level: 2
      },
      {
        id: 'after-steps',
        type: 'list',
        items: [
          'Restart your computer',
          'Verify admin rights by attempting to install software',
          'Contact IT if you have issues'
        ]
      }
    ],
    links: [
      { label: 'Employee Service Center', url: 'https://ebayinc.service-now.com/esc' }
    ],
    requirements: [
      'Manager approval',
      'Business justification',
      'Corporate device'
    ]
  },
  {
    id: 'install-chrome',
    title: 'Install Google Chrome',
    description: 'Install Google Chrome browser and sign in with eBay credentials. Chrome is required for accessing AI extensions and company tools.',
    category: 'install',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Google Chrome is a fast, secure web browser that\'s required for accessing eBay\'s AI tools and extensions.'
      },
      {
        id: 'why-chrome-heading',
        type: 'heading',
        text: 'Why Chrome?',
        level: 2
      },
      {
        id: 'why-chrome-list',
        type: 'list',
        items: [
          'Required for eBay\'s approved AI extensions (ChatGPT and Glean)',
          'Developer tools for debugging',
          'Extension support for productivity tools',
          'Sign in with eBay credentials for company access'
        ]
      },
      {
        id: 'installation-heading',
        type: 'heading',
        text: 'Installation',
        level: 2
      },
      {
        id: 'admin-callout',
        type: 'callout',
        variant: 'info',
        text: 'You need local administrator access to install Chrome. If you don\'t have it, request it first using the "Request Local Admin Access" step.'
      },
      {
        id: 'download-link',
        type: 'link',
        text: 'Download Chrome from google.com/chrome',
        url: 'https://www.google.com/chrome/'
      },
      {
        id: 'install-steps',
        type: 'list',
        items: [
          'Download Chrome for your operating system',
          'Run the installer',
          'Follow the setup wizard',
          'Complete the installation'
        ]
      },
      {
        id: 'pin-heading',
        type: 'heading',
        text: 'Pin to Taskbar/Dock',
        level: 2
      },
      {
        id: 'pin-mac',
        type: 'text',
        label: 'Mac:',
        text: 'Right-click Chrome icon in Dock → Options → Keep in Dock'
      },
      {
        id: 'pin-windows',
        type: 'text',
        label: 'Windows:',
        text: 'Right-click Chrome icon on taskbar → Pin to taskbar'
      },
      {
        id: 'signin-heading',
        type: 'heading',
        text: 'Sign in with eBay Credentials',
        level: 2
      },
      {
        id: 'signin-steps',
        type: 'list',
        items: [
          'Navigate to mail.google.com',
          'Click "Sign in"',
          'Enter your @ebay.com email',
          'Authenticate with eBay SSO',
          'Complete MFA (PingID, YubiKey)'
        ]
      },
      {
        id: 'verification-heading',
        type: 'heading',
        text: 'Verification',
        level: 2
      },
      {
        id: 'verification-list',
        type: 'list',
        items: [
          '✓ Chrome is installed and launches',
          '✓ Chrome is pinned to taskbar/dock',
          '✓ Signed in with @ebay.com email',
          '✓ Can access Gmail and Google services'
        ]
      }
    ],
    links: [
      { label: 'Download Chrome', url: 'https://www.google.com/chrome/' },
      { label: 'Gmail', url: 'https://mail.google.com' },
      { label: 'Chrome Help', url: 'https://support.google.com/chrome/' }
    ],
    requirements: [
      'eBay email account (@ebay.com)',
      'Internet connection',
      'Administrator access for installation'
    ],
    commonIssues: [
      'Chrome won\'t install: Ensure you have local admin access',
      'Sign-in fails: Verify you\'re using @ebay.com email, not personal account',
      'SSO redirect issues: Check you\'re on eBay network or connected via VPN',
      'Can\'t pin to taskbar: Right-click the Chrome window icon while it\'s open'
    ],
    tags: ['chrome', 'browser', 'google', 'install', 'ai-tools']
  },
  {
    id: 'install-glean-extension',
    title: 'Install AI Extensions (ChatGPT & Glean)',
    description: 'Install eBay-approved AI extensions (ChatGPT and Glean) in Chrome. These provide context-aware assistance for development and troubleshooting.',
    category: 'install',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Install AI extensions to get help throughout your setup and daily development work.'
      },
      {
        id: 'what-heading',
        type: 'heading',
        text: 'What You\'ll Get',
        level: 2
      },
      {
        id: 'what-list',
        type: 'list',
        items: [
          'ChatGPT Extension - General AI assistant for coding and troubleshooting',
          'Glean Extension - eBay-specific AI with access to internal docs',
          'Context-Aware Help - Extensions read current page for better answers',
          'Quick Access - Click extension icons in toolbar anytime'
        ]
      },
      {
        id: 'chatgpt-heading',
        type: 'heading',
        text: 'Install ChatGPT Extension',
        level: 2
      },
      {
        id: 'chatgpt-steps',
        type: 'list',
        items: [
          'Open Chrome Web Store',
          'Search for "ChatGPT"',
          'Verify publisher is "OpenAI"',
          'Click "Add to Chrome"',
          'Click "Add extension"',
          'Wait for icon to appear in toolbar'
        ]
      },
      {
        id: 'glean-heading',
        type: 'heading',
        text: 'Install Glean Extension',
        level: 2
      },
      {
        id: 'glean-steps',
        type: 'list',
        items: [
          'Open Chrome Web Store',
          'Search for "Glean"',
          'Verify publisher is "Glean Technologies, Inc."',
          'Click "Add to Chrome"',
          'Click "Add extension"',
          'Wait for icon to appear in toolbar'
        ]
      },
      {
        id: 'signin-chatgpt-heading',
        type: 'heading',
        text: 'Sign in to ChatGPT',
        level: 2
      },
      {
        id: 'signin-chatgpt-steps',
        type: 'list',
        items: [
          'Click ChatGPT icon in toolbar',
          'Sign in with eBay SSO',
          'Grant page access permissions',
          'Test with a question'
        ]
      },
      {
        id: 'signin-glean-heading',
        type: 'heading',
        text: 'Sign in to Glean',
        level: 2
      },
      {
        id: 'signin-glean-steps',
        type: 'list',
        items: [
          'Visit app.glean.com/chat',
          'Sign in with @ebay.com email',
          'Click Glean extension icon',
          'Grant page access permissions',
          'Test with eBay-specific question'
        ]
      },
      {
        id: 'pin-heading',
        type: 'heading',
        text: 'Pin Extensions',
        level: 2
      },
      {
        id: 'pin-steps',
        type: 'list',
        items: [
          'Click puzzle piece icon (Extensions menu)',
          'Pin ChatGPT extension',
          'Pin Glean extension',
          'Verify both icons visible in toolbar'
        ]
      },
      {
        id: 'usage-heading',
        type: 'heading',
        text: 'How to Use',
        level: 2
      },
      {
        id: 'usage-callout',
        type: 'callout',
        variant: 'info',
        text: 'ChatGPT: General programming, debugging, "how do I..." questions\nGlean: eBay processes, internal docs, company-specific workflows\nBoth: Can read current page for context-aware help'
      },
      {
        id: 'examples-heading',
        type: 'heading',
        text: 'Example Questions',
        level: 2
      },
      {
        id: 'chatgpt-examples',
        type: 'text',
        label: 'ChatGPT:',
        text: '• "How do I check if Node.js is installed?"\n• "What does this error mean: \'command not found\'?"\n• "Explain what a virtual environment is"'
      },
      {
        id: 'glean-examples',
        type: 'text',
        label: 'Glean:',
        text: '• "How do I request GitHub access at eBay?"\n• "What is the eBay proxy configuration?"\n• "Find documentation for our authentication system"'
      }
    ],
    links: [
      { label: 'Chrome Web Store', url: 'https://chrome.google.com/webstore/category/extensions' },
      { label: 'Glean Chat', url: 'https://app.glean.com/chat/' },
      { label: 'ChatGPT', url: 'https://chatgpt.com/' }
    ],
    requirements: [
      'Chrome browser installed',
      'eBay email account',
      'Access to eBay network or VPN'
    ],
    commonIssues: [
      'Extension not appearing: Restart Chrome after installation',
      'Can\'t sign in: Ensure using @ebay.com email',
      'Extension not working: Check page access permissions granted',
      'Glean access denied: Verify on eBay network or VPN',
      'Icon not in toolbar: Click puzzle piece icon and pin extensions'
    ]
  },
  {
    id: 'install-nodejs',
    title: 'Install Node.js',
    description: 'Download and install the latest LTS version of Node.js from nodejs.org. Verify installation with: node --version',
    category: 'install',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Node.js is a JavaScript runtime needed for many development projects.'
      },
      {
        id: 'install-heading',
        type: 'heading',
        text: 'Installation Steps',
        level: 2
      },
      {
        id: 'install-steps',
        type: 'list',
        items: [
          'Go to nodejs.org',
          'Download the LTS (Long Term Support) version',
          'Run the installer',
          'Follow the installation wizard',
          'Restart your terminal/command prompt'
        ]
      },
      {
        id: 'verify-heading',
        type: 'heading',
        text: 'Verification',
        level: 2
      },
      {
        id: 'verify-code',
        type: 'code',
        language: 'bash',
        text: 'node --version\nnpm --version'
      },
      {
        id: 'config-heading',
        type: 'heading',
        text: 'Configuration',
        level: 2
      },
      {
        id: 'config-list',
        type: 'list',
        items: [
          'Set up npm global packages location',
          'Configure npm registry if needed',
          'Set environment variables'
        ]
      }
    ],
    links: [
      { label: 'Node.js Official Site', url: 'https://nodejs.org/' }
    ]
  },
  {
    id: 'install-vscode',
    title: 'Install VS Code',
    description: 'Download and install Visual Studio Code from code.visualstudio.com. Configure user settings and workspace preferences.',
    category: 'install',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Visual Studio Code is a popular code editor with extensive extension support.'
      },
      {
        id: 'install-heading',
        type: 'heading',
        text: 'Installation',
        level: 2
      },
      {
        id: 'install-steps',
        type: 'list',
        items: [
          'Download from code.visualstudio.com',
          'Run the installer',
          'Select options: Add to PATH, Create desktop icon, Register as default editor',
          'Complete installation'
        ]
      },
      {
        id: 'config-heading',
        type: 'heading',
        text: 'Initial Configuration',
        level: 2
      },
      {
        id: 'config-list',
        type: 'list',
        items: [
          'Set up your theme and font',
          'Install essential extensions',
          'Configure settings.json',
          'Set up keyboard shortcuts'
        ]
      },
      {
        id: 'extensions-heading',
        type: 'heading',
        text: 'Recommended Extensions',
        level: 2
      },
      {
        id: 'extensions-list',
        type: 'list',
        items: [
          'ESLint',
          'Prettier',
          'GitLens',
          'GitHub Copilot'
        ]
      }
    ],
    links: [
      { label: 'VS Code Official Site', url: 'https://code.visualstudio.com/' }
    ]
  },
  {
    id: 'install-cursor',
    title: 'Install Cursor',
    description: 'Download and install Cursor IDE from cursor.sh. Import VS Code settings if migrating.',
    category: 'install',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Cursor is an AI-first code editor built on VS Code.'
      },
      {
        id: 'install-heading',
        type: 'heading',
        text: 'Installation',
        level: 2
      },
      {
        id: 'install-steps',
        type: 'list',
        items: [
          'Go to cursor.sh',
          'Download for your OS',
          'Run the installer',
          'Follow setup wizard'
        ]
      },
      {
        id: 'migrate-heading',
        type: 'heading',
        text: 'Migrate from VS Code',
        level: 2
      },
      {
        id: 'migrate-list',
        type: 'list',
        items: [
          'Import settings and extensions',
          'Transfer keyboard shortcuts',
          'Import snippets and themes'
        ]
      },
      {
        id: 'ai-heading',
        type: 'heading',
        text: 'AI Features Setup',
        level: 2
      },
      {
        id: 'ai-list',
        type: 'list',
        items: [
          'Configure AI model preferences',
          'Set up API keys if needed',
          'Learn keyboard shortcuts for AI features'
        ]
      }
    ],
    links: [
      { label: 'Cursor Official Site', url: 'https://cursor.sh/' }
    ]
  },
  {
    id: 'setup-github-personal',
    title: 'Setup GitHub Personal Account',
    description: 'Create or verify your GitHub personal account. Configure 2FA and SSH keys for secure authentication.',
    category: 'setup',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'A GitHub personal account is needed for open source contributions and personal projects.'
      },
      {
        id: 'create-heading',
        type: 'heading',
        text: 'Create Account',
        level: 2
      },
      {
        id: 'create-steps',
        type: 'list',
        items: [
          'Go to github.com',
          'Sign up with your personal email',
          'Verify your email address',
          'Complete profile setup'
        ]
      },
      {
        id: 'security-heading',
        type: 'heading',
        text: 'Security Setup',
        level: 2
      },
      {
        id: 'security-list',
        type: 'list',
        items: [
          'Enable Two-Factor Authentication (2FA)',
          'Generate SSH keys',
          'Add SSH key to GitHub',
          'Test SSH connection'
        ]
      },
      {
        id: 'ssh-heading',
        type: 'heading',
        text: 'SSH Key Generation',
        level: 2
      },
      {
        id: 'ssh-code',
        type: 'code',
        language: 'bash',
        text: 'ssh-keygen -t ed25519 -C "your_email@example.com"\neval "$(ssh-agent -s)"\nssh-add ~/.ssh/id_ed25519'
      },
      {
        id: 'add-heading',
        type: 'heading',
        text: 'Add to GitHub',
        level: 2
      },
      {
        id: 'add-steps',
        type: 'list',
        items: [
          'Copy public key: cat ~/.ssh/id_ed25519.pub',
          'Go to GitHub Settings → SSH Keys',
          'Add new SSH key',
          'Test: ssh -T git@github.com'
        ]
      }
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/' },
      { label: 'SSH Key Guide', url: 'https://docs.github.com/en/authentication/connecting-to-github-with-ssh' }
    ]
  },
  {
    id: 'setup-github-copilot',
    title: 'Setup GitHub Copilot',
    description: 'Install GitHub Copilot extension in your IDE. Sign in with your GitHub account and verify Copilot is active.',
    category: 'setup',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'GitHub Copilot provides AI-powered code suggestions in your editor.'
      },
      {
        id: 'install-heading',
        type: 'heading',
        text: 'Installation in VS Code',
        level: 2
      },
      {
        id: 'install-steps',
        type: 'list',
        items: [
          'Open VS Code Extensions',
          'Search for "GitHub Copilot"',
          'Click Install',
          'Sign in with GitHub account',
          'Authorize Copilot'
        ]
      },
      {
        id: 'activate-heading',
        type: 'heading',
        text: 'Activation',
        level: 2
      },
      {
        id: 'activate-list',
        type: 'list',
        items: [
          'Verify license in GitHub settings',
          'Check Copilot status in IDE',
          'Test with a code file',
          'Configure preferences'
        ]
      },
      {
        id: 'usage-heading',
        type: 'heading',
        text: 'Usage Tips',
        level: 2
      },
      {
        id: 'usage-list',
        type: 'list',
        items: [
          'Use comments to guide suggestions',
          'Accept/reject suggestions with Tab/Esc',
          'Use Copilot Chat for questions',
          'Learn keyboard shortcuts'
        ]
      }
    ],
    links: [
      { label: 'GitHub Copilot', url: 'https://github.com/features/copilot' }
    ],
    requirements: [
      'GitHub Copilot license',
      'GitHub account with 2FA',
      'Compatible IDE (VS Code, Cursor, etc.)'
    ]
  },
  {
    id: 'install-java',
    title: 'Install Java JDK',
    description: 'Download and install Java Development Kit. Set JAVA_HOME environment variable.',
    category: 'install',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Java JDK is required for Java development and many build tools.'
      },
      {
        id: 'install-heading',
        type: 'heading',
        text: 'Installation',
        level: 2
      },
      {
        id: 'install-steps',
        type: 'list',
        items: [
          'Download JDK from Oracle or OpenJDK',
          'Run the installer',
          'Complete installation wizard'
        ]
      },
      {
        id: 'java-home-heading',
        type: 'heading',
        text: 'Set JAVA_HOME',
        level: 2
      },
      {
        id: 'java-home-windows',
        type: 'text',
        label: 'Windows:',
        text: 'System Properties → Environment Variables'
      },
      {
        id: 'java-home-unix',
        type: 'text',
        label: 'Mac/Linux:',
        text: 'Add to ~/.bash_profile or ~/.zshrc'
      },
      {
        id: 'verify-heading',
        type: 'heading',
        text: 'Verification',
        level: 2
      },
      {
        id: 'verify-code',
        type: 'code',
        language: 'bash',
        text: 'java -version\njavac -version\necho $JAVA_HOME'
      }
    ],
    links: [
      { label: 'Oracle JDK', url: 'https://www.oracle.com/java/technologies/downloads/' },
      { label: 'OpenJDK', url: 'https://adoptium.net/' }
    ]
  },
  {
    id: 'install-dotnet',
    title: 'Install .NET SDK',
    description: 'Download and install .NET SDK from microsoft.com/dotnet. Verify with: dotnet --version',
    category: 'install',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: '.NET SDK is required for C# and .NET development.'
      },
      {
        id: 'install-heading',
        type: 'heading',
        text: 'Installation',
        level: 2
      },
      {
        id: 'install-steps',
        type: 'list',
        items: [
          'Go to microsoft.com/dotnet',
          'Download .NET SDK (not just Runtime)',
          'Run the installer',
          'Complete setup'
        ]
      },
      {
        id: 'verify-heading',
        type: 'heading',
        text: 'Verification',
        level: 2
      },
      {
        id: 'verify-code',
        type: 'code',
        language: 'bash',
        text: 'dotnet --version\ndotnet --list-sdks'
      },
      {
        id: 'first-project-heading',
        type: 'heading',
        text: 'Create First Project',
        level: 2
      },
      {
        id: 'first-project-code',
        type: 'code',
        language: 'bash',
        text: 'dotnet new console -o MyApp\ncd MyApp\ndotnet run'
      }
    ],
    links: [
      { label: '.NET Downloads', url: 'https://dotnet.microsoft.com/download' }
    ]
  },
  {
    id: 'install-python',
    title: 'Install Python',
    description: 'Download and install Python 3.12+ from python.org. Includes pip package manager and IDLE. Verify with: python --version',
    category: 'install',
    detailed_content: [
      {
        id: 'intro',
        type: 'text',
        text: 'Python is a versatile programming language widely used for data analysis, machine learning, automation, web development, and scripting.'
      },
      {
        id: 'why-heading',
        type: 'heading',
        text: 'Why Python?',
        level: 2
      },
      {
        id: 'why-list',
        type: 'list',
        items: [
          'Easy to Learn - Clean, readable syntax',
          'Extensive Libraries - Rich ecosystem for data science, ML, web dev',
          'pip Package Manager - Simple package installation',
          'Automation - Perfect for scripts and workflow automation',
          'Cross-Platform - Runs on Windows, Mac, Linux',
          'Industry Standard - Used in AI/ML, data analysis, backend development'
        ]
      },
      {
        id: 'install-heading',
        type: 'heading',
        text: 'Installation Options',
        level: 2
      },
      {
        id: 'install-mac',
        type: 'code',
        language: 'bash',
        label: 'Mac (via Homebrew):',
        text: 'brew install python@3.12'
      },
      {
        id: 'install-windows-winget',
        type: 'code',
        language: 'bash',
        label: 'Windows (via winget):',
        text: 'winget install Python.Python.3.12'
      },
      {
        id: 'install-windows-choco',
        type: 'code',
        language: 'bash',
        label: 'Windows (via Chocolatey):',
        text: 'choco install python -y'
      },
      {
        id: 'verify-heading',
        type: 'heading',
        text: 'Verification',
        level: 2
      },
      {
        id: 'verify-code',
        type: 'code',
        language: 'bash',
        text: 'python --version\npip --version'
      },
      {
        id: 'venv-heading',
        type: 'heading',
        text: 'Create Virtual Environment',
        level: 2
      },
      {
        id: 'venv-code',
        type: 'code',
        language: 'bash',
        text: 'python -m venv myproject\nsource myproject/bin/activate  # Mac/Linux\nmyproject\\Scripts\\activate    # Windows'
      },
      {
        id: 'uses-heading',
        type: 'heading',
        text: 'Common Use Cases',
        level: 2
      },
      {
        id: 'uses-list',
        type: 'list',
        items: [
          '📊 Data Analysis: Analyze spreadsheets, visualize trends',
          '🤖 Machine Learning: Build AI models, train algorithms',
          '🌐 Web Development: Build websites and APIs (Django, Flask)',
          '🔄 Automation: Automate repetitive tasks, process files',
          '🔬 Scientific Computing: Simulations, calculations, research'
        ]
      }
    ],
    links: [
      { label: 'Python Official Site', url: 'https://www.python.org/' },
      { label: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
      { label: 'pip Guide', url: 'https://pip.pypa.io/en/stable/getting-started/' }
    ],
    requirements: [
      'Internet connection for download',
      'Administrator access for installation'
    ],
    commonIssues: [
      'Windows: Ensure "Add Python to PATH" is checked during installation',
      'Mac: May need to use python3 and pip3 commands instead of python and pip',
      'Command not found: Restart terminal or IDE after installation',
      'Permission errors: Use virtual environments to avoid system-wide installations'
    ]
  }
];

// Helper function to get steps by category
export function getStepsByCategory(category: DynamicStep['category']): DynamicStep[] {
  return DYNAMIC_STEPS.filter(step => step.category === category);
}

// Helper function to get step by id
export function getStepById(id: string): DynamicStep | undefined {
  return DYNAMIC_STEPS.find(step => step.id === id);
}

// Helper function to search steps
export function searchSteps(query: string): DynamicStep[] {
  const lowercaseQuery = query.toLowerCase();
  return DYNAMIC_STEPS.filter(step =>
    step.title.toLowerCase().includes(lowercaseQuery) ||
    step.description.toLowerCase().includes(lowercaseQuery) ||
    (step.detailedContent && step.detailedContent.toLowerCase().includes(lowercaseQuery))
  );
}
