// Dynamic Steps Data - Extracted from existing step components
// This file provides step definitions that can be used in the Use Case Prototype

export interface DynamicStep {
  id: string;
  title: string;
  description: string;
  category: 'security' | 'access' | 'admin' | 'install' | 'setup' | 'config' | 'practice';
  detailedContent?: string;
  links?: Array<{
    label: string;
    url: string;
  }>;
  requirements?: string[];
  commonIssues?: string[];
}

export const DYNAMIC_STEPS: DynamicStep[] = [
  {
    id: 'verify-sso-ping',
    title: 'Verify SSO and Ping',
    description: 'Confirm your security credentials are working properly. Test SSO login, PingID multi-factor authentication, and YubiKey hardware authentication.',
    category: 'security',
    detailedContent: `Before you can download and access eBay tools, you need to confirm your security credentials are working properly.

**Verify SSO (Single Sign-On)**
1. Test Token Access Portal: Sign in to Token Access Portal (TAP) with your corp credentials
2. If you can open "My Account" and view your tokens, SSO is working
3. Additional check: Sign in to Hub Services (IT support portal) using your corp SSO

**Verify PingID**
1. In TAP, open PingID and check "My Account" to see your registered devices
2. Confirm which device is set as "Primary"
3. Trigger a PingID challenge by signing into any app that requires MFA
4. Approve the push notification in the PingID app

**Verify YubiKey**
1. Connect to the corporate network or VPN
2. Go to auth.vip.ebay.com
3. Use the "Validate" or test function
4. Enter your YubiKey PIN and press the key
5. Successful validation confirms your key is registered`,
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
    detailedContent: `Request access to the tools and systems you need for your role.

**GitHub Enterprise Access**
- Submit request through the security portal
- Include justification for repository access needed
- Wait for approval (usually 1-2 business days)

**AI Tools Access**
- Request through AI Tools access portal
- Provide business justification
- Specify which tools you need (GitHub Copilot, etc.)

**Other Secure Systems**
- Follow your team's access request procedures
- Document why you need access
- Get manager approval if required`,
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
    detailedContent: `Local administrator rights allow you to install software and configure your development environment.

**Why You Need This**
- Install development tools (IDEs, runtimes, etc.)
- Configure system settings
- Install dependencies and packages
- Manage development servers

**How to Request**
1. Go to Employee Service Center
2. Submit "Local Admin Access" request
3. Provide business justification
4. Include your manager's approval
5. Wait for IT to grant access (1-3 business days)

**After Approval**
- Restart your computer
- Verify admin rights by attempting to install software
- Contact IT if you have issues`,
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
    id: 'install-nodejs',
    title: 'Install Node.js',
    description: 'Download and install the latest LTS version of Node.js from nodejs.org. Verify installation with: node --version',
    category: 'install',
    detailedContent: `Node.js is a JavaScript runtime needed for many development projects.

**Installation Steps**
1. Go to nodejs.org
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Follow the installation wizard
5. Restart your terminal/command prompt

**Verification**
\`\`\`bash
node --version
npm --version
\`\`\`

**Configuration**
- Set up npm global packages location
- Configure npm registry if needed
- Set environment variables`,
    links: [
      { label: 'Node.js Official Site', url: 'https://nodejs.org/' }
    ]
  },
  {
    id: 'install-vscode',
    title: 'Install VS Code',
    description: 'Download and install Visual Studio Code from code.visualstudio.com. Configure user settings and workspace preferences.',
    category: 'install',
    detailedContent: `Visual Studio Code is a popular code editor with extensive extension support.

**Installation**
1. Download from code.visualstudio.com
2. Run the installer
3. Select options:
   - Add to PATH
   - Create desktop icon
   - Register as default editor
4. Complete installation

**Initial Configuration**
- Set up your theme and font
- Install essential extensions
- Configure settings.json
- Set up keyboard shortcuts

**Recommended Extensions**
- ESLint
- Prettier
- GitLens
- GitHub Copilot`,
    links: [
      { label: 'VS Code Official Site', url: 'https://code.visualstudio.com/' }
    ]
  },
  {
    id: 'install-cursor',
    title: 'Install Cursor',
    description: 'Download and install Cursor IDE from cursor.sh. Import VS Code settings if migrating.',
    category: 'install',
    detailedContent: `Cursor is an AI-first code editor built on VS Code.

**Installation**
1. Go to cursor.sh
2. Download for your OS
3. Run the installer
4. Follow setup wizard

**Migrate from VS Code**
- Import settings and extensions
- Transfer keyboard shortcuts
- Import snippets and themes

**AI Features Setup**
- Configure AI model preferences
- Set up API keys if needed
- Learn keyboard shortcuts for AI features`,
    links: [
      { label: 'Cursor Official Site', url: 'https://cursor.sh/' }
    ]
  },
  {
    id: 'setup-github-personal',
    title: 'Setup GitHub Personal Account',
    description: 'Create or verify your GitHub personal account. Configure 2FA and SSH keys for secure authentication.',
    category: 'setup',
    detailedContent: `A GitHub personal account is needed for open source contributions and personal projects.

**Create Account**
1. Go to github.com
2. Sign up with your personal email
3. Verify your email address
4. Complete profile setup

**Security Setup**
- Enable Two-Factor Authentication (2FA)
- Generate SSH keys
- Add SSH key to GitHub
- Test SSH connection

**SSH Key Generation**
\`\`\`bash
ssh-keygen -t ed25519 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
\`\`\`

**Add to GitHub**
1. Copy public key: \`cat ~/.ssh/id_ed25519.pub\`
2. Go to GitHub Settings → SSH Keys
3. Add new SSH key
4. Test: \`ssh -T git@github.com\``,
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
    detailedContent: `GitHub Copilot provides AI-powered code suggestions in your editor.

**Installation in VS Code**
1. Open VS Code Extensions
2. Search for "GitHub Copilot"
3. Click Install
4. Sign in with GitHub account
5. Authorize Copilot

**Activation**
- Verify license in GitHub settings
- Check Copilot status in IDE
- Test with a code file
- Configure preferences

**Usage Tips**
- Use comments to guide suggestions
- Accept/reject suggestions with Tab/Esc
- Use Copilot Chat for questions
- Learn keyboard shortcuts`,
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
    detailedContent: `Java JDK is required for Java development and many build tools.

**Installation**
1. Download JDK from Oracle or OpenJDK
2. Run the installer
3. Complete installation wizard

**Set JAVA_HOME**
- Windows: System Properties → Environment Variables
- Mac/Linux: Add to ~/.bash_profile or ~/.zshrc

**Verification**
\`\`\`bash
java -version
javac -version
echo $JAVA_HOME
\`\`\``,
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
    detailedContent: `.NET SDK is required for C# and .NET development.

**Installation**
1. Go to microsoft.com/dotnet
2. Download .NET SDK (not just Runtime)
3. Run the installer
4. Complete setup

**Verification**
\`\`\`bash
dotnet --version
dotnet --list-sdks
\`\`\`

**Create First Project**
\`\`\`bash
dotnet new console -o MyApp
cd MyApp
dotnet run
\`\`\``,
    links: [
      { label: '.NET Downloads', url: 'https://dotnet.microsoft.com/download' }
    ]
  },
  {
    id: 'install-python',
    title: 'Install Python',
    description: 'Download and install Python 3.12+ from python.org. Includes pip package manager and IDLE. Verify with: python --version',
    category: 'install',
    detailedContent: `Python is a versatile programming language widely used for data analysis, machine learning, automation, web development, and scripting.

**Why Python?**
- Easy to Learn - Clean, readable syntax
- Extensive Libraries - Rich ecosystem for data science, ML, web dev
- pip Package Manager - Simple package installation
- Automation - Perfect for scripts and workflow automation
- Cross-Platform - Runs on Windows, Mac, Linux
- Industry Standard - Used in AI/ML, data analysis, backend development

**Installation Options**

**Mac (via Homebrew):**
\`\`\`bash
brew install python@3.12
\`\`\`

**Windows (via winget):**
\`\`\`bash
winget install Python.Python.3.12
\`\`\`

**Windows (via Chocolatey):**
\`\`\`bash
choco install python -y
\`\`\`

**Verification**
\`\`\`bash
python --version
pip --version
\`\`\`

**Create Virtual Environment**
\`\`\`bash
python -m venv myproject
source myproject/bin/activate  # Mac/Linux
myproject\\Scripts\\activate    # Windows
\`\`\`

**Common Use Cases**
- 📊 Data Analysis: Analyze spreadsheets, visualize trends
- 🤖 Machine Learning: Build AI models, train algorithms
- 🌐 Web Development: Build websites and APIs (Django, Flask)
- 🔄 Automation: Automate repetitive tasks, process files
- 🔬 Scientific Computing: Simulations, calculations, research`,
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
