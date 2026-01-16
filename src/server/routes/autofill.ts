import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to extract repository info from GitHub URL
function parseGitHubUrl(url: string): { owner: string; repo: string; isEnterprise: boolean } | null {
  const match = url.match(/github\.(?:corp\.ebay\.)?com\/([\w-]+)\/([\w-]+)/i);
  if (match) {
    return { 
      owner: match[1], 
      repo: match[2],
      isEnterprise: url.includes('github.corp.ebay.com')
    };
  }
  return null;
}

// Check if repository is accessible (public or authenticated access)
async function checkRepositoryAccess(owner: string, repo: string, isEnterprise: boolean): Promise<{
  accessible: boolean;
  isPrivate: boolean;
  statusCode: number;
  message: string;
}> {
  try {
    const baseUrl = isEnterprise 
      ? (process.env.GITHUB_API_URL || 'https://github.corp.ebay.com/api/v3')
      : 'https://api.github.com';
    
    const url = `${baseUrl}/repos/${owner}/${repo}`;
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AI-Dev-Tools-Autofill'
    };
    
    // Add authentication token if available
    const hasToken = !!process.env.GITHUB_TOKEN;
    if (hasToken) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    
    console.log('🔐 [ACCESS CHECK] Checking repository access:', { owner, repo, hasToken });
    
    const response = await fetch(url, { headers });
    
    // Handle different status codes
    if (response.ok) {
      const data = await response.json();
      console.log('✅ [ACCESS CHECK] Repository accessible, private:', data.private);
      return {
        accessible: true,
        isPrivate: data.private || false,
        statusCode: 200,
        message: 'Repository is accessible'
      };
    }
    
    // 404 - Repository not found or private without access
    if (response.status === 404) {
      console.log('🔒 [ACCESS CHECK] Repository not found or private (404)');
      return {
        accessible: false,
        isPrivate: true,
        statusCode: 404,
        message: hasToken 
          ? 'Repository not found or you do not have access to it'
          : 'This repository is private. Connect GitHub to analyze it.'
      };
    }
    
    // 401 - Unauthorized (bad token or missing authentication)
    if (response.status === 401) {
      console.log('🔒 [ACCESS CHECK] Unauthorized (401) - Invalid or missing token');
      return {
        accessible: false,
        isPrivate: true,
        statusCode: 401,
        message: 'GitHub authentication failed. Please check your GITHUB_TOKEN.'
      };
    }
    
    // 403 - Forbidden (rate limit or insufficient permissions)
    if (response.status === 403) {
      console.log('🔒 [ACCESS CHECK] Forbidden (403) - Rate limit or permissions');
      return {
        accessible: false,
        isPrivate: true,
        statusCode: 403,
        message: hasToken
          ? 'Access forbidden. Check token permissions or rate limits.'
          : 'This repository is private. Connect GitHub to analyze it.'
      };
    }
    
    // Other errors
    console.log('❌ [ACCESS CHECK] Unexpected error:', response.status, response.statusText);
    return {
      accessible: false,
      isPrivate: true,
      statusCode: response.status,
      message: `Unable to access repository: ${response.statusText}`
    };
    
  } catch (error) {
    console.error('❌ [ACCESS CHECK] Network or DNS error:', error);
    return {
      accessible: false,
      isPrivate: true,
      statusCode: 0,
      message: 'Unable to reach GitHub server. Check network connection or VPN.'
    };
  }
}

// Fetch file content from GitHub
async function fetchGitHubFile(owner: string, repo: string, path: string, isEnterprise: boolean): Promise<string | null> {
  try {
    const baseUrl = isEnterprise 
      ? (process.env.GITHUB_API_URL || 'https://github.corp.ebay.com/api/v3')
      : 'https://api.github.com';
    
    const url = `${baseUrl}/repos/${owner}/${repo}/contents/${path}`;
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AI-Dev-Tools-Autofill'
    };
    
    // Add authentication token if available
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    } else {
      console.warn('⚠️ [AUTOFILL] No GITHUB_TOKEN found in environment variables. GitHub API requests may fail.');
    }
    
    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.error(`❌ [AUTOFILL] Failed to fetch ${path}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // GitHub API returns base64 encoded content
    if (data.content) {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return null;
  }
}

// Extract meaningful content from README
function extractFromReadme(content: string): { title?: string; overview?: string; features?: string[] } {
  const lines = content.split('\n');
  let title = '';
  let overview = '';
  let inOverview = false;
  let features: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Extract title (first H1)
    if (!title && line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').trim();
      continue;
    }
    
    // Look for overview/description section
    if (line.match(/^##\s+(overview|description|about)/i)) {
      inOverview = true;
      continue;
    }
    
    // Stop overview on next heading
    if (inOverview && line.startsWith('##')) {
      inOverview = false;
    }
    
    // Collect overview text
    if (inOverview && line && !line.startsWith('#') && !line.startsWith('```')) {
      overview += line + ' ';
    }
    
    // Extract features/capabilities
    if (line.match(/^[-*]\s+/)) {
      const feature = line.replace(/^[-*]\s+/, '').trim();
      if (feature.length > 10 && features.length < 5) {
        features.push(feature);
      }
    }
  }
  
  return { title, overview: overview.trim(), features };
}

// Extract info from package.json
function extractFromPackageJson(content: string): { 
  description?: string; 
  keywords?: string[]; 
  dependencies?: string[];
  scripts?: Record<string, string>;
  devDependencies?: string[];
} {
  try {
    const pkg = JSON.parse(content);
    return {
      description: pkg.description,
      keywords: pkg.keywords || [],
      dependencies: Object.keys(pkg.dependencies || {}),
      scripts: pkg.scripts || {},
      devDependencies: Object.keys(pkg.devDependencies || {})
    };
  } catch {
    return {};
  }
}

// Extract implementation steps from README or other docs
function extractImplementationSteps(content: string): string {
  const lines = content.split('\n');
  let steps: string[] = [];
  let stepText: string[] = [];
  let inStepsSection = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for setup/installation/getting started sections
    if (line.match(/^##\s+(setup|installation|getting started|quick start|how to use|usage)/i)) {
      inStepsSection = true;
      continue;
    }
    
    // Stop on next section
    if (inStepsSection && line.startsWith('##')) {
      break;
    }
    
    // Collect content from steps section
    if (inStepsSection) {
      // Numbered or bulleted steps
      if (line.match(/^\d+\./) || line.match(/^[-*]\s+/)) {
        const step = line.replace(/^(\d+\.|-|\*)\s+/, '').trim();
        if (step.length > 5 && steps.length < 10) {
          steps.push(step);
        }
      }
      // Also collect regular text from this section
      else if (line && !line.startsWith('#') && !line.startsWith('```')) {
        stepText.push(line);
      }
    }
  }
  
  // If we found numbered steps, return those
  if (steps.length > 0) {
    return steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
  }
  
  // Otherwise, return the text from the section
  if (stepText.length > 0) {
    return stepText.join('\n').trim();
  }
  
  return '';
}

// Extract data requirements or usage info
function extractDataRequirements(content: string): string {
  const lines = content.split('\n');
  let requirements: string[] = [];
  let inDataSection = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for data/requirements/prerequisites sections
    if (line.match(/^##\s+(data|requirements|prerequisites|configuration|environment|dependencies)/i)) {
      inDataSection = true;
      continue;
    }
    
    // Stop on next section
    if (inDataSection && line.startsWith('##')) {
      break;
    }
    
    // Collect requirements
    if (inDataSection && line && !line.startsWith('#') && !line.startsWith('```')) {
      requirements.push(line);
      if (requirements.join(' ').length > 400) break;
    }
  }
  
  return requirements.join('\n').trim();
}

// Extract technical implementation details from README
function extractTechnicalDetails(content: string): string {
  const lines = content.split('\n');
  let details: string[] = [];
  let inTechnicalSection = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for technical/implementation/architecture sections
    if (line.match(/^##\s+(technical|implementation|architecture|how it works|features|capabilities)/i)) {
      inTechnicalSection = true;
      continue;
    }
    
    // Stop on next section
    if (inTechnicalSection && line.startsWith('##')) {
      break;
    }
    
    // Collect technical content
    if (inTechnicalSection && line && !line.startsWith('```')) {
      details.push(line);
      if (details.join('\n').length > 600) break;
    }
  }
  
  return details.join('\n').trim();
}

// Extract team members or contributors
function extractTeamMembers(content: string): string[] {
  const lines = content.split('\n');
  let members: string[] = [];
  let inContributors = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for contributors/authors/team sections
    if (line.match(/^##\s+(contributors?|authors?|team|maintainers?)/i)) {
      inContributors = true;
      continue;
    }
    
    // Stop on next section  
    if (inContributors && line.startsWith('##')) {
      break;
    }
    
    // Extract names from list items or markdown links
    if (inContributors) {
      const nameMatch = line.match(/[-*]\s+(?:\[)?([A-Z][a-z]+\s+[A-Z][a-z]+)(?:\])?/);
      if (nameMatch && members.length < 10) {
        members.push(nameMatch[1]);
      }
    }
  }
  
  return members;
}

// Fetch repository file tree to discover structure
async function fetchRepositoryTree(owner: string, repo: string, isEnterprise: boolean): Promise<any[]> {
  try {
    const baseUrl = isEnterprise 
      ? (process.env.GITHUB_API_URL || 'https://github.corp.ebay.com/api/v3')
      : 'https://api.github.com';
    
    const url = `${baseUrl}/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AI-Dev-Tools-Autofill'
    };
    
    // Add authentication token if available
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.log(`⚠️ [AUTOFILL] 'main' branch not found, trying 'master'...`);
      // Try 'master' if 'main' doesn't work
      const masterUrl = `${baseUrl}/repos/${owner}/${repo}/git/trees/master?recursive=1`;
      const masterResponse = await fetch(masterUrl, { headers });
      
      if (!masterResponse.ok) {
        console.error(`❌ [AUTOFILL] Failed to fetch repository tree: ${masterResponse.status} ${masterResponse.statusText}`);
        return [];
      }
      
      const data = await masterResponse.json();
      return data.tree || [];
    }

    const data = await response.json();
    return data.tree || [];
  } catch (error) {
    console.error('❌ [AUTOFILL] Error fetching repository tree:', error);
    return [];
  }
}

// Enhanced: Analyze repository structure to infer project type, IDE, coding language, and tools
function analyzeRepositoryStructure(tree: any[]): {
  projectType: string;
  hasTests: boolean;
  hasCI: boolean;
  framework: string;
  language: string;
  ide: string;
  detectedTools: string[];
  additionalSteps: string[];
} {
  const files = tree.map(item => item.path.toLowerCase());
  const fullPaths = tree.map(item => item.path);
  
  console.log('🔍 [ANALYZE] Analyzing', files.length, 'files');
  console.log('📂 [ANALYZE] Sample files:', files.slice(0, 10));
  
  let projectType = 'Unknown';
  let framework = '';
  let language = '';
  let ide = '';
  const detectedTools: string[] = [];
  const additionalSteps: string[] = [];
  let hasTests = files.some(f => f.includes('test') || f.includes('spec'));
  let hasCI = files.some(f => f.includes('.github/workflows') || f.includes('.gitlab-ci') || f.includes('jenkinsfile'));
  
  // Detect IDE from workspace files
  console.log('🔎 [ANALYZE] Checking for IDE indicators...');
  if (files.includes('.vscode') ) {
    ide = 'VS Code';
    console.log('✅ [ANALYZE] Detected IDE: VS Code (found .vscode)');
  } else if (files.includes('.cursor/settings.json') || files.some(f => f.includes('cursor'))) {
    ide = 'Cursor';
    console.log('✅ [ANALYZE] Detected IDE: Cursor');
  } else if (files.includes('.idea/workspace.xml') || files.some(f => f.includes('.idea/'))) {
    ide = 'IntelliJ IDEA';
    console.log('✅ [ANALYZE] Detected IDE: IntelliJ IDEA');
  } else if (files.includes('.project') || files.includes('.classpath')) {
    ide = 'Eclipse';
    console.log('✅ [ANALYZE] Detected IDE: Eclipse');
  } else if (files.some(f => f.includes('rider'))) {
    ide = 'Rider';
    console.log('✅ [ANALYZE] Detected IDE: Rider');
  } else {
    console.log('⚠️ [ANALYZE] No IDE detected from workspace files');
  }
  
  // Detect language with priority (TypeScript > JavaScript for better detection)
  console.log('🔎 [ANALYZE] Checking for language indicators...');
  const tsFiles = files.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
  const jsFiles = files.filter(f => f.endsWith('.js') || f.endsWith('.jsx'));
  const pyFiles = files.filter(f => f.endsWith('.py'));
  
  console.log('📊 [ANALYZE] File counts:', {
    typescript: tsFiles.length,
    javascript: jsFiles.length,
    python: pyFiles.length
  });
  
  if (files.some(f => f.endsWith('.ts') || f.endsWith('.tsx'))) {
    language = 'TypeScript';
    console.log(`✅ [ANALYZE] Detected language: TypeScript (${tsFiles.length} files)`);
  } else if (files.some(f => f.endsWith('.js') || f.endsWith('.jsx'))) {
    language = 'JavaScript';
    console.log(`✅ [ANALYZE] Detected language: JavaScript (${jsFiles.length} files)`);
  } else if (files.some(f => f.endsWith('.py'))) {
    language = 'Python';
    console.log(`✅ [ANALYZE] Detected language: Python (${pyFiles.length} files)`);
  } else if (files.some(f => f.endsWith('.java'))) {
    language = 'Java';
    console.log('✅ [ANALYZE] Detected language: Java');
  } else if (files.some(f => f.endsWith('.cs'))) {
    language = 'C#';
    console.log('✅ [ANALYZE] Detected language: C#');
  } else if (files.some(f => f.endsWith('.go'))) {
    language = 'Go';
    console.log('✅ [ANALYZE] Detected language: Go');
  } else if (files.some(f => f.endsWith('.rs'))) {
    language = 'Rust';
    console.log('✅ [ANALYZE] Detected language: Rust');
  } else if (files.some(f => f.endsWith('.rb'))) {
    language = 'Ruby';
    console.log('✅ [ANALYZE] Detected language: Ruby');
  } else if (files.some(f => f.endsWith('.php'))) {
    language = 'PHP';
    console.log('✅ [ANALYZE] Detected language: PHP');
  } else {
    console.log('⚠️ [ANALYZE] No language detected from file extensions');
  }
  
  // Detect framework/project type
  if (files.includes('package.json')) {
    if (files.some(f => f.includes('react'))) {
      projectType = 'React Application';
      framework = 'React';
    } else if (files.some(f => f.includes('next.config'))) {
      projectType = 'Next.js Application';
      framework = 'Next.js';
    } else if (files.some(f => f.includes('vue'))) {
      projectType = 'Vue Application';
      framework = 'Vue';
    } else if (files.includes('src/extension.ts') || files.includes('src/extension.js')) {
      projectType = 'VSCode Extension';
      framework = 'VSCode';
     } else if (files.includes('extension.ts') || files.includes('extension.js')) {
      projectType = 'VSCode Extension';
      framework = 'VSCode';
    } else {
      projectType = 'Node.js Application';
      framework = 'Node.js';
    }
  } else if (files.includes('requirements.txt') || files.includes('setup.py')) {
    projectType = 'Python Application';
    framework = 'Python';
  } else if (files.includes('cargo.toml')) {
    projectType = 'Rust Application';
    framework = 'Rust';
  } else if (files.includes('go.mod')) {
    projectType = 'Go Application';
    framework = 'Go';
  } else if (files.includes('pom.xml') || files.includes('build.gradle')) {
    projectType = 'Java Application';
    framework = 'Java';
  }
  
  // Detect AI tools and extensions from configuration files
  if (files.includes('.cursor/settings.json')) {
    detectedTools.push('Cursor');
  }
  if (files.includes('.copilot.yml') || files.includes('.github/copilot')) {
    detectedTools.push('GitHub Copilot');
  }
  if (files.includes('.cline/workflows') || files.some(f => f.includes('.cline'))) {
    detectedTools.push('Cline');
  }
  if (files.some(f => f.includes('claude') && f.endsWith('.json'))) {
    detectedTools.push('Claude');
  }
  
  // Generate additional setup steps based on detected patterns
  if (files.includes('docker-compose.yml')) {
    additionalSteps.push('Install Docker and Docker Compose');
    additionalSteps.push('Run `docker-compose up` to start services');
  }
  if (files.includes('.env.example') || files.includes('.env.template')) {
    additionalSteps.push('Copy .env.example to .env and configure environment variables');
  }
  if (files.includes('database/migrations') || files.some(f => f.includes('migrations'))) {
    additionalSteps.push('Run database migrations');
  }
  if (files.includes('.pre-commit-config.yaml')) {
    additionalSteps.push('Install pre-commit hooks: `pre-commit install`');
  }
  if (hasCI) {
    additionalSteps.push('Review CI/CD pipeline configuration');
  }
  
  return { projectType, hasTests, hasCI, framework, language, ide, detectedTools, additionalSteps };
}

// Find alternative documentation files when README is missing
async function findAlternativeDocumentation(owner: string, repo: string, isEnterprise: boolean, tree: any[]): Promise<string | null> {
  // Priority order for documentation files
  const docFiles = [
    'docs/README.md',
    'ARCHITECTURE.md',
    'DESIGN.md',
    'OVERVIEW.md',
    'docs/overview.md',
    'docs/architecture.md',
    'USAGE.md',
    'GUIDE.md',
    'index.md'
  ];
  
  // Find .md and .txt files in the tree
  const mdFiles = tree
    .filter(item => item.path.match(/\.(md|txt)$/i) && !item.path.includes('node_modules'))
    .map(item => item.path);
  
  // Try priority docs first
  for (const docPath of docFiles) {
    if (mdFiles.includes(docPath)) {
      const content = await fetchGitHubFile(owner, repo, docPath, isEnterprise);
      if (content) return content;
    }
  }
  
  // Try any other .md file in docs/
  for (const mdFile of mdFiles) {
    if (mdFile.startsWith('docs/')) {
      const content = await fetchGitHubFile(owner, repo, mdFile, isEnterprise);
      if (content && content.length > 200) return content;
    }
  }
  
  // Try any top-level .md file
  for (const mdFile of mdFiles) {
    if (!mdFile.includes('/')) {
      const content = await fetchGitHubFile(owner, repo, mdFile, isEnterprise);
      if (content && content.length > 200) return content;
    }
  }
  
  return null;
}

// Fetch multiple files from repository with intelligent fallbacks
async function fetchRepositoryFiles(owner: string, repo: string, isEnterprise: boolean): Promise<{
  readme: string | null;
  packageJson: string | null;
  contributing: string | null;
  changelog: string | null;
  tree: any[];
  alternativeDoc: string | null;
  requirementsTxt: string | null;
  cargoToml: string | null;
}> {
  // Fetch tree first to understand repository structure
  const tree = await fetchRepositoryTree(owner, repo, isEnterprise);
  
  const [readme, packageJson, contributing, changelog, requirementsTxt, cargoToml] = await Promise.all([
    fetchGitHubFile(owner, repo, 'README.md', isEnterprise),
    fetchGitHubFile(owner, repo, 'package.json', isEnterprise),
    fetchGitHubFile(owner, repo, 'CONTRIBUTING.md', isEnterprise),
    fetchGitHubFile(owner, repo, 'CHANGELOG.md', isEnterprise),
    fetchGitHubFile(owner, repo, 'requirements.txt', isEnterprise),
    fetchGitHubFile(owner, repo, 'Cargo.toml', isEnterprise)
  ]);
  
  // If README is missing, try to find alternative documentation
  let alternativeDoc: string | null = null;
  if (!readme && tree.length > 0) {
    alternativeDoc = await findAlternativeDocumentation(owner, repo, isEnterprise, tree);
  }
  
  return { readme, packageJson, contributing, changelog, tree, alternativeDoc, requirementsTxt, cargoToml };
}

// Helper function to extract page ID from Confluence URL
function parseConfluenceUrl(url: string): string | null {
  const match = url.match(/pages\/(\d+)/i);
  return match ? match[1] : null;
}

// POST /api/autofill/analyze-link
router.post('/analyze-link', async (req, res) => {
  try {
    const { url } = req.body;
    
    console.log('🔗 [AUTOFILL] Analyzing URL:', url);
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    let autofillData: any = {};

    // GitHub Repository Analysis
    if (url.includes('github')) {
      const repoInfo = parseGitHubUrl(url);
      if (!repoInfo) {
        console.log('❌ [AUTOFILL] Invalid GitHub URL');
        return res.status(400).json({ error: 'Invalid GitHub URL' });
      }

      console.log('📦 [AUTOFILL] Repository info:', repoInfo);

      // MVP: Check repository accessibility first
      const accessCheck = await checkRepositoryAccess(repoInfo.owner, repoInfo.repo, repoInfo.isEnterprise);
      
      if (!accessCheck.accessible) {
        console.log('🔒 [AUTOFILL] Repository not accessible:', accessCheck.message);
        return res.status(accessCheck.statusCode || 403).json({ 
          error: accessCheck.message,
          isPrivate: accessCheck.isPrivate,
          suggestion: accessCheck.statusCode === 401 
            ? 'Please add a valid GITHUB_TOKEN to your .env file'
            : accessCheck.statusCode === 0
            ? 'Ensure you are connected to the eBay network/VPN to access enterprise repositories'
            : 'This repository requires authentication. Configure GitHub access to analyze private repositories.'
        });
      }
      
      console.log('✅ [AUTOFILL] Repository accessible, proceeding with analysis...');

      // Fetch multiple repository files for comprehensive analysis
      const files = await fetchRepositoryFiles(repoInfo.owner, repoInfo.repo, repoInfo.isEnterprise);
      const { readme, packageJson, contributing, changelog, tree, alternativeDoc, requirementsTxt, cargoToml } = files;
      
      console.log('📄 [AUTOFILL] Files fetched:', {
        hasReadme: !!readme,
        hasPackageJson: !!packageJson,
        treeSize: tree.length,
        hasAlternativeDoc: !!alternativeDoc
      });
      
      // Use README or fallback to alternative documentation
      const documentationSource = readme || alternativeDoc || '';
      
      // NEW: Enhanced repository structure analysis with IDE, language, and tools detection
      const structureAnalysis = tree.length > 0 ? analyzeRepositoryStructure(tree) : {
        projectType: 'Unknown',
        hasTests: false,
        hasCI: false,
        framework: '',
        language: '',
        ide: '',
        detectedTools: [],
        additionalSteps: []
      };
      
      // Extract data from README or alternative doc
      const readmeExtract = documentationSource ? extractFromReadme(documentationSource) : {};
      const readmeData = {
        title: readmeExtract.title || '',
        overview: readmeExtract.overview || '',
        features: readmeExtract.features || []
      };
      
      // If no title from docs, use repo structure analysis
      if (!readmeData.title && structureAnalysis.projectType !== 'Unknown') {
        readmeData.title = `${repoInfo.repo} - ${structureAnalysis.projectType}`;
      }
      
      // Extract data from package.json
      const packageExtract = packageJson ? extractFromPackageJson(packageJson) : {};
      const packageData = {
        description: packageExtract.description || '',
        keywords: packageExtract.keywords || [],
        dependencies: packageExtract.dependencies || [],
        scripts: packageExtract.scripts || {},
        devDependencies: packageExtract.devDependencies || []
      };
      
      // Combine all dependencies for later use - these become "Tools and Technologies"
      const allDeps = [...packageData.dependencies, ...packageData.devDependencies].filter(d => d);
      
      // Extract implementation steps from README or generate from structure
      let implementationSteps = readme ? extractImplementationSteps(readme) : '';
      if (!implementationSteps && structureAnalysis.projectType !== 'Unknown') {
        // Generate basic implementation steps from project structure
        const steps = [];
        steps.push('Clone the repository');
        if (packageJson) {
          steps.push('Install dependencies: `npm install` or `yarn install`');
        } else if (requirementsTxt) {
          steps.push('Install dependencies: `pip install -r requirements.txt`');
        } else if (cargoToml) {
          steps.push('Build project: `cargo build`');
        }
        if (packageData.scripts['build']) {
          steps.push('Build the project: `npm run build`');
        }
        if (packageData.scripts['dev'] || packageData.scripts['start']) {
          const devScript = packageData.scripts['dev'] ? 'dev' : 'start';
          steps.push(`Run development server: \`npm run ${devScript}\``);
        }
        if (structureAnalysis.hasTests) {
          steps.push('Run tests: `npm test` or equivalent test command');
        }
        implementationSteps = steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
      }
      
      // Extract data requirements from README or generate from dependencies
      let dataRequirements = readme ? extractDataRequirements(readme) : '';
      if (!dataRequirements) {
        // Generate requirements from detected dependencies
        const requirements = [];
        if (structureAnalysis.language === 'TypeScript' || structureAnalysis.language === 'JavaScript') {
          requirements.push('Node.js version 14 or higher');
        } else if (structureAnalysis.language === 'Python') {
          requirements.push('Python 3.7 or higher');
        } else if (structureAnalysis.language === 'Rust') {
          requirements.push('Rust toolchain (latest stable)');
        } else if (structureAnalysis.language === 'Go') {
          requirements.push('Go 1.16 or higher');
        } else if (structureAnalysis.language === 'Java') {
          requirements.push('Java JDK 11 or higher');
        } else if (structureAnalysis.language === 'C#') {
          requirements.push('.NET SDK 6.0 or higher');
        }
        
        // Add AI-specific requirements if AI dependencies detected
        const hasAIDeps = allDeps.some(d => 
          d.includes('openai') || d.includes('anthropic') || d.includes('tensorflow') || 
          d.includes('pytorch') || d.includes('langchain')
        );
        if (hasAIDeps) {
          requirements.push('API keys for AI services (OpenAI, Anthropic, etc.)');
        }
        
        if (requirements.length > 0) {
          dataRequirements = requirements.join('\n');
        }
      }
      
      // Extract technical details from README
      const readmeTechnicalDetails = readme ? extractTechnicalDetails(readme) : '';
      
      // Extract team members from README or CONTRIBUTING
      const teamMembers = readme ? extractTeamMembers(readme) : 
                          (contributing ? extractTeamMembers(contributing) : []);
      
      // Build use case name
      const useCaseName = readmeData.title || 
                         repoInfo.repo.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Build brief overview (2-3 sentences) with intelligent fallbacks
      let briefOverview = '';
      if (readmeData.overview) {
        // Take first 2-3 sentences from overview
        const sentences = readmeData.overview.match(/[^.!?]+[.!?]+/g) || [readmeData.overview];
        briefOverview = sentences.slice(0, 3).join(' ').trim();
      } else if (packageData.description) {
        briefOverview = packageData.description;
      } else if (structureAnalysis.projectType !== 'Unknown') {
        // Generate overview from structure analysis
        briefOverview = `A ${structureAnalysis.language || 'software'} ${structureAnalysis.projectType.toLowerCase()}`;
        if (structureAnalysis.framework) {
          briefOverview += ` built with ${structureAnalysis.framework}`;
        }
        if (packageData.dependencies.length > 0) {
          const mainDeps = packageData.dependencies.slice(0, 3).join(', ');
          briefOverview += `. Key dependencies include ${mainDeps}.`;
        }
        if (structureAnalysis.hasTests) {
          briefOverview += ' Includes automated testing.';
        }
      } else {
        briefOverview = `A ${repoInfo.repo} project by ${repoInfo.owner}`;
      }
      
      // Build technical details - prioritize README content with intelligent fallbacks
      let technicalDetails = '';
      
      // First, add extracted technical content from README
      if (readmeTechnicalDetails) {
        technicalDetails += readmeTechnicalDetails + '\n\n';
      }
      
      // Then add key features if available
      if (readmeData.features.length > 0) {
        technicalDetails += '**Key Features:**\n' + readmeData.features.map(f => `- ${f}`).join('\n') + '\n\n';
      }
      
      // Add project type and structure info if no README content
      if (!readmeTechnicalDetails && structureAnalysis.projectType !== 'Unknown') {
        technicalDetails += `**Project Type:** ${structureAnalysis.projectType}\n`;
        if (structureAnalysis.language) {
          technicalDetails += `**Primary Language:** ${structureAnalysis.language}\n`;
        }
        if (structureAnalysis.framework) {
          technicalDetails += `**Framework:** ${structureAnalysis.framework}\n`;
        }
        if (structureAnalysis.hasTests) {
          technicalDetails += `**Testing:** Automated tests included\n`;
        }
        if (structureAnalysis.hasCI) {
          technicalDetails += `**CI/CD:** Continuous integration configured\n`;
        }
        technicalDetails += '\n';
      }
      
      // Add technology stack
      if (allDeps.length > 0) {
        const mainTech = allDeps.slice(0, 15);
        technicalDetails += '**Technology Stack:**\n' + mainTech.join(', ') + '\n\n';
      }
      
      // Add build scripts info
      const importantScripts = ['build', 'dev', 'start', 'test'];
      const hasScripts = importantScripts.filter(s => packageData.scripts[s]);
      if (hasScripts.length > 0) {
        technicalDetails += '**Available Scripts:** ' + hasScripts.join(', ');
      }
      
      // Extract AI-related keywords for aiTools field
      const aiKeywords = ['ai', 'ml', 'machine-learning', 'gpt', 'claude', 'copilot', 'cline', 
                          'openai', 'anthropic', 'llm', 'chatbot', 'assistant', 'langchain', 
                          'tensorflow', 'pytorch', 'huggingface'];
      const foundAITools: string[] = [];
      
      const allText = (readme || '') + ' ' + (packageData.keywords?.join(' ') || '') + ' ' + packageData.dependencies.join(' ');
      for (const keyword of aiKeywords) {
        if (allText.toLowerCase().includes(keyword) && !foundAITools.includes(keyword)) {
          foundAITools.push(keyword);
        }
      }
      
      // NEW: Merge detected tools from structure analysis
      const combinedAITools = [...new Set([...foundAITools, ...structureAnalysis.detectedTools])];
      
      // Build related links
      const relatedLinks = [
        { name: 'GitHub Repository', url: url }
      ];
      
      // Add changelog if available
      if (changelog) {
        relatedLinks.push({ 
          name: 'Changelog', 
          url: `${url.replace(/\/$/, '')}/blob/main/CHANGELOG.md` 
        });
      }
      
      // Estimate time based on complexity indicators
      let estimatedTime = '';
      const hasTests = packageData.scripts['test'] || allDeps.some(d => d.includes('jest') || d.includes('mocha'));
      const hasCI = readme?.toLowerCase().includes('ci') || readme?.toLowerCase().includes('github actions');
      const complexityScore = allDeps.length + (hasTests ? 10 : 0) + (hasCI ? 5 : 0);
      
      if (complexityScore > 30) {
        estimatedTime = '4-6 weeks';
      } else if (complexityScore > 15) {
        estimatedTime = '2-3 weeks';
      } else {
        estimatedTime = '1-2 weeks';
      }
      
      // Build comprehensive autofill data
      autofillData = {
        useCaseName,
        briefOverview: briefOverview.substring(0, 500),
        technicalDetails: technicalDetails || 'See repository README for technical implementation details',
        dataRequirements: dataRequirements || 'No specific data requirements documented',
        implementationSteps: implementationSteps || 'See README for setup and installation instructions',
        estimatedTime,
        aiTools: combinedAITools,
        // NEW: Include coding language from structure analysis
        codingLanguage: structureAnalysis.language || '',
        // NEW: Include IDE from structure analysis
        ide: structureAnalysis.ide || '',
        // NEW: Set business unit to Global Technology when repo detected
        businessUnit: 'Global Technology',
        // NEW: Include tools and technologies (dependencies + detected tools)
        toolsAndTechnologies: [...new Set([...allDeps.slice(0, 20), ...structureAnalysis.detectedTools])],
        // NEW: Include additional steps formatted with "-" bullets
        additionalSteps: structureAnalysis.additionalSteps.map(step => `- ${step}`).join('\n'),
        categories: packageData.keywords.length > 0 ? packageData.keywords : ['Development', 'AI'],
        searchTags: [
          repoInfo.repo, 
          repoInfo.owner, 
          ...combinedAITools,
          ...packageData.keywords.slice(0, 5)
        ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
        relatedLinks,
        teamMembers: teamMembers.length > 0 ? teamMembers : [],
        // NEW: Flag to trigger auto-generation of steps
        shouldAutoGenerateSteps: true
      };
      
      console.log('✅ [AUTOFILL] Final autofill data:', {
        codingLanguage: autofillData.codingLanguage,
        ide: autofillData.ide,
        businessUnit: autofillData.businessUnit,
        toolsCount: autofillData.toolsAndTechnologies?.length,
        additionalStepsCount: autofillData.additionalSteps?.split('\n').length
      });
    }
    // Confluence Wiki Analysis
    else if (url.includes('confluence') || url.includes('atlassian')) {
      const pageId = parseConfluenceUrl(url);
      if (!pageId) {
        return res.status(400).json({ error: 'Invalid Confluence URL' });
      }

      // Use MCP wiki-server to analyze page
      autofillData = {
        useCaseName: 'Extracted from Wiki Page',
        briefOverview: 'Documentation extracted from Confluence',
        technicalDetails: 'Technical specifications from wiki',
        categories: ['Documentation']
      };
    }
    else {
      return res.status(400).json({ error: 'Unsupported URL type' });
    }

    res.json(autofillData);
  } catch (error) {
    console.error('Link analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze link' });
  }
});

// POST /api/autofill/analyze-file
router.post('/analyze-file', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    // Convert buffer to text
    const content = file.buffer.toString('utf-8');
    
    // Simple parsing logic (can be enhanced with actual AI analysis)
    const autofillData: any = {
      useCaseName: file.originalname.replace(/\.(md|txt|pdf|docx)$/i, ''),
      categories: [],
      searchTags: []
    };

    // Extract sections from markdown/text
    if (content.includes('#') || content.includes('##')) {
      // It's likely markdown
      const lines = content.split('\n');
      let currentSection = '';
      
      for (const line of lines) {
        if (line.startsWith('# ') && !autofillData.useCaseName) {
          autofillData.useCaseName = line.replace(/^#\s+/, '').trim();
        } else if (line.toLowerCase().includes('overview') || line.toLowerCase().includes('description')) {
          currentSection = 'overview';
        } else if (line.toLowerCase().includes('technical') || line.toLowerCase().includes('implementation')) {
          currentSection = 'technical';
        } else if (currentSection === 'overview' && line.trim() && !line.startsWith('#')) {
          autofillData.briefOverview = (autofillData.briefOverview || '') + line + '\n';
        } else if (currentSection === 'technical' && line.trim() && !line.startsWith('#')) {
          autofillData.technicalDetails = (autofillData.technicalDetails || '') + line + '\n';
        }
      }
    }

    res.json(autofillData);
  } catch (error) {
    console.error('File analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze file' });
  }
});

export default router;
