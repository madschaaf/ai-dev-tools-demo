export interface AITool {
  name: string
  url: string
  type: string
  contacts: string
  comments: string
  category: string
  accent: string
  tags?: string[]  // Optional searchable tags
}

export interface InfoResource {
  name: string
  url: string
  description: string
  contacts: string
  category: string
  accent: string
}

export interface MCPResource {
  name: string
  url: string
  description: string
  category: string
  accent: string
}

export interface ContextEngineeringResource {
  name: string
  url: string
  description: string
  category: string
  accent: string
}

export interface OutsideLink {
  name: string
  url: string
  description: string
  category: string
  accent: string
}

export const aiToolsFromCSV: AITool[] = [
  {
    name: 'ML Platform (Krylov)',
    url: 'https://pages.github.corp.ebay.com/taichi/doc-center/docs/introduction/ml-platform-101/',
    type: 'Platform',
    contacts: 'Slack: #krylov-support',
    comments: '',
    category: 'AI & Development',
    accent: '#667eea',
    tags: ['ml', 'machine learning', 'platform', 'training', 'model deployment', 'data-support', 'backend']
  },
  {
    name: 'AI Sandbox',
    url: 'https://pages.github.corp.ebay.com/aisandbox/docs/',
    type: 'Platform',
    contacts: 'Slack: #genai-dev',
    comments: '',
    category: 'AI & Development',
    accent: '#f59e0b',
    tags: ['sandbox', 'testing', 'development', 'ai platform', 'experimentation', 'data-support', 'full-stack']
  },
  {
    name: 'Glean Agents',
    url: 'https://wiki.corp.ebay.com/pages/viewpage.action?spaceKey=innovation&title=Glean+Agent+Onboarding+Instruction',
    type: 'Platform',
    contacts: '',
    comments: '',
    category: 'AI & Development',
    accent: 'var(--color-blue-500)',
    tags: ['chatbot', 'helper', 'search', 'enterprise search', 'ai assistant', 'knowledge base', 'agent']
  },
  {
    name: 'Athena LLM Fine-tuning',
    url: 'https://wiki.corp.ebay.com/display/COREAI/Athena+Large+Language+Model+fine-tuning+framework',
    type: 'Platform',
    contacts: '',
    comments: 'A fully managed framework, integrated into eBay\'s ML platforms, that enables teams to fine tune and deploy fine-tuned Large Language Models with ease and speed.',
    category: 'AI & Development',
    accent: '#8b5cf6',
    tags: ['llm', 'fine-tuning', 'model training', 'data-support', 'backend']
  },
  {
    name: 'Spring AI',
    url: 'https://spring.io/projects/spring-ai',
    type: 'Platform',
    contacts: '',
    comments: '',
    category: 'AI & Development',
    accent: '#10b981',
    tags: ['backend', 'java', 'spring', 'framework', 'api integration']
  },
  {
    name: 'Obsidian Platform',
    url: 'https://pages.github.corp.ebay.com/obsidian/docs/',
    type: 'Platform',
    contacts: 'Slack: #obsidian-ai-community',
    comments: '',
    category: 'AI & Development',
    accent: '#8b5cf6',
    tags: ['knowledge management', 'documentation', 'notes', 'full-stack']
  },
  {
    name: 'GitHub Copilot',
    url: 'https://pages.github.corp.ebay.com/DevGenAI/copilot-doc/',
    type: 'Coding Assistant',
    contacts: 'Slack: #community-copilot',
    comments: '',
    category: 'AI & Development',
    accent: '#000000',
    tags: ['chatbot', 'helper', 'coding', 'code completion', 'ai assistant', 'autocomplete', 'intellisense', 'frontend', 'backend', 'full-stack', 'testing']
  },
  {
    name: 'eBayCoder',
    url: 'https://pages.github.corp.ebay.com/DevGenAI/ebaycoder-site/',
    type: 'Coding Assistant',
    contacts: 'Slack: #community-ebaycoder',
    comments: '',
    category: 'AI & Development',
    accent: '#3665F3',
    tags: ['chatbot', 'helper', 'coding', 'ai assistant', 'code completion', 'internal tool', 'frontend', 'backend', 'full-stack']
  },
  {
    name: 'eBay Cline',
    url: 'https://pages.github.corp.ebay.com/DevGenAI/cline-ebay/',
    type: 'Coding Assistant',
    contacts: 'Slack: #community-ebay-cline',
    comments: '',
    category: 'AI & Development',
    accent: '#7c3aed',
    tags: ['chatbot', 'helper', 'coding', 'ai agent', 'automation', 'autonomous', 'task automation', 'frontend', 'backend', 'full-stack', 'testing']
  },
  {
    name: 'Google Gemini',
    url: 'https://hub.corp.ebay.com/site/itss/page/googlegemini/',
    type: 'Coding Assistant',
    contacts: 'Slack: #community-google-workspace',
    comments: '',
    category: 'AI & Development',
    accent: '#4285F4',
    tags: ['chatbot', 'helper', 'ai assistant', 'coding', 'google', 'multimodal', 'llm', 'frontend', 'backend', 'full-stack']
  },
  {
    name: 'Textio',
    url: 'https://hub.corp.ebay.com/site/people/page/hiring-textio',
    type: 'Application',
    contacts: '',
    comments: '',
    category: 'Work Management',
    accent: 'var(--color-green-500)',
    tags: ['writing assistant', 'hiring', 'job descriptions', 'ai writing']
  },
  {
    name: 'API Discovery Assistant',
    url: 'https://cloud.ebay.com/app-specs',
    type: 'Coding Assistant',
    contacts: 'Slack: #api-discovery\nSupport: #apicatalog-support',
    comments: '',
    category: 'AI & Development',
    accent: '#667eea',
    tags: ['chatbot', 'helper', 'api', 'discovery', 'search', 'documentation', 'integration', 'backend', 'testing', 'full-stack']
  },
  {
    name: 'Claude Code',
    url: 'https://wiki.corp.ebay.com/display/ESIHOME/Claude+Code+Installation+and+Setup+Guide',
    type: 'Coding Assistant',
    contacts: 'Slack: #community-claude-code\nClaude code stats: http://go/claudecodestats',
    comments: '',
    category: 'AI & Development',
    accent: '#D4A574',
    tags: ['chatbot', 'helper', 'coding', 'ai assistant', 'code generation', 'refactoring', 'debugging', 'frontend', 'backend', 'full-stack', 'testing']
  },
  {
    name: 'HubGPT Platform',
    url: 'https://hubgpt.corp.ebay.com/?mode=internal',
    type: 'Assistant Platform',
    contacts: 'Slack: #community-hubgpt',
    comments: '',
    category: 'AI & Development',
    accent: '#10b981',
    tags: ['chatbot', 'helper', 'ai assistant', 'conversational', 'gpt', 'chatgpt', 'llm']
  },
  {
    name: 'ChatGPT Enterprise',
    url: 'https://chatgpt.com/',
    type: 'Assistant Platform',
    contacts: 'Slack: #chatgpt-enterprise-support',
    comments: '',
    category: 'AI & Development',
    accent: '#00A67E',
    tags: ['chatbot', 'helper', 'ai assistant', 'conversational', 'gpt', 'llm', 'openai']
  },
  {
    name: 'Poolside AI',
    url: 'https://wiki.corp.ebay.com/display/PDV/Poolside.AI',
    type: 'Coding Assistant',
    contacts: 'Slack: #customer-ebay-poolside-external',
    comments: '',
    category: 'AI & Development',
    accent: '#00C9A7',
    tags: ['chatbot', 'helper', 'coding', 'ai assistant', 'code generation', 'pair programming', 'frontend', 'backend', 'full-stack']
  },
  {
    name: 'Content Generation Flows',
    url: 'https://wiki.corp.ebay.com/display/PROMOTEDLISTINGS/AI+Tools+Reference',
    type: 'Application',
    contacts: 'Slack: #content-ai\nEmail: marketing-ai-tools@ebay.com',
    comments: 'Marketing content campaign flows using agentic/ReAct patterns. Early onboarding via wiki; contact team for GA/feature access.',
    category: 'Design',
    accent: 'var(--color-green-500)'
  },
  {
    name: 'LLM Security & Monitoring',
    url: 'https://wiki.corp.ebay.com/display/COREAI/Athena+Large+Language+Model+fine-tuning+framework',
    type: 'Security & Monitoring',
    contacts: 'Slack: #coreai-security\nEmail: llm-security-team@ebay.com',
    comments: 'Prompt injection security and LLM monitoring. Athena fine-tuning framework docs include onboarding. Protects eBay\'s AI deployments.',
    category: 'Observability',
    accent: 'var(--color-red-500)'
  },
  {
    name: 'Glean MCP Agent Server',
    url: 'https://developers.glean.com/guides/mcp/',
    type: 'Application',
    contacts: 'Slack: #community-glean\nEmail: glean-support@ebay.com',
    comments: 'The Glean MCP Agent Server enables natural language API automation through Model Context Protocol (MCP). It provides seamless integration with Claude and Cline, allowing AI assistants to interact directly with Glean\'s enterprise search capabilities. This tool is currently in development with production release scheduled for Q4 2025.',
    category: 'AI & Development',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'LLM Hybrid Models',
    url: 'https://pages.github.corp.ebay.com/aisandbox/docs/Application%20developer%20SDK/#models-supported',
    type: 'Platform',
    contacts: 'Slack: #genai-dev\nEmail: ai-model-ops@ebay.com',
    comments: 'Rule+LLM POC and automated inference SDK pilots for hybrid models. AI Sandbox doc page contains onboarding/process.',
    category: 'AI & Development',
    accent: '#8b5cf6',
    tags: ['llm', 'hybrid models', 'inference', 'data-support', 'backend']
  },
  {
    name: 'Model Portfolio (LLMs, VLMs)',
    url: 'https://ebayinc.service-now.com/aiintake',
    type: 'Platform',
    contacts: 'Slack: #genai-dev\nEmail: ai-intake@ebay.com',
    comments: 'New internal models: Lilium3, eLlama3, Athena VLM. Intake portal tracks updates and onboarding for latest portfolio.',
    category: 'AI & Development',
    accent: '#f59e0b',
    tags: ['llm', 'vlm', 'models', 'vision', 'data-support', 'backend']
  },
  {
    name: 'Regulator/Compliance AI',
    url: 'https://wiki.corp.ebay.com/display/COREAI/',
    type: 'Application',
    contacts: 'Slack: #regcompliance-ai\nEmail: regulatory-ai-support@ebay.com',
    comments: 'Policy explanation and regulatory Q&A agent. Pilot status; core onboarding wiki lists point of contact and tool documentation.',
    category: 'Support',
    accent: 'var(--color-blue-500)'
  }
]

// Info Pages & Apps from CSV (standalone learning resources only - tool-specific docs are in related tools)
export const infoResourcesFromCSV: InfoResource[] = [
  {
    name: 'Generative AI Guidelines',
    url: 'https://hub.corp.ebay.com/site/cpt/page/generativeaiguidelines',
    description: 'Official guidelines for using Generative AI at eBay',
    contacts: '',
    category: 'Learning',
    accent: '#667eea'
  },
  {
    name: 'AI Red Team (HubTV)',
    url: 'https://hubtv.corp.ebay.com/#/groups/QAkaN3',
    description: 'Videos and resources on AI Red Team activities and security testing',
    contacts: '',
    category: 'Learning',
    accent: 'var(--color-red-500)'
  },
  {
    name: 'AI Conference 2024',
    url: 'https://hubtv.corp.ebay.com/#/groups/O3WvK4',
    description: 'Recordings and presentations from eBay\'s 2024 AI Conference',
    contacts: '',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'Core AI Portal',
    url: 'https://wiki.corp.ebay.com/display/COREAI/',
    description: 'Central wiki portal for Core AI team resources, documentation, and initiatives',
    contacts: '',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'AI at eBay Hub',
    url: 'https://hub.corp.ebay.com/site/cpt/page/ai',
    description: 'Central hub for all AI initiatives, news, and resources at eBay',
    contacts: '',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'AI Bias & Fairness Standard',
    url: 'https://ebayinc.sharepoint.com/sites/3372/LegalPolicyLibrary/Forms/AllItems.aspx?id=%2Fsites%2F3372%2FLegalPolicyLibrary%2FAI%20Bias%20and%20Fairness%20Standard%2Epdf&parent=%2Fsites%2F3372%2FLegalPolicyLibrary',
    description: 'eBay\'s official AI Bias and Fairness Standard - required reading for AI development',
    contacts: 'Email: DL-eBay-ORAI@ebay.com',
    category: 'Learning',
    accent: 'var(--color-red-500)'
  },
  {
    name: 'eBay AI Week 2025',
    url: 'https://hub.corp.ebay.com/site/cpt/page/aiconference2025',
    description: 'Annual AI Week conference - schedule, recordings, and resources',
    contacts: 'Slack: #ebay-2025-AI-week',
    category: 'Learning',
    accent: '#f59e0b'
  },
  {
    name: 'AI Agent Design Guidelines',
    url: 'https://github.corp.ebay.com/Selling/ai-agent-guidelines',
    description: 'Official design guidelines and best practices for building AI agents at eBay',
    contacts: '',
    category: 'Learning',
    accent: '#667eea'
  },
  {
    name: 'AI News and Insights (Slack)',
    url: 'https://ebay.enterprise.slack.com/archives/C05BQURSMBR',
    description: 'Anyone can post news and info about AI',
    contacts: 'Slack: #ai-news-and-insights',
    category: 'Communication',
    accent: '#4A154B'
  },
  {
    name: 'AI Advocate (Slack)',
    url: 'https://ebay.enterprise.slack.com/archives/C08EYJG3JNB',
    description: 'Usually highly technical articles on AI',
    contacts: 'Slack: #ai-advocate',
    category: 'Communication',
    accent: '#4A154B'
  },
  {
    name: 'AI-eBay (Slack)',
    url: 'https://ebay.enterprise.slack.com/archives/C0985LNF5EX',
    description: '11,000 members - main eBay AI channel',
    contacts: 'Slack: #ai-ebay',
    category: 'Communication',
    accent: '#4A154B'
  },
  {
    name: 'Context Engineering (Slack)',
    url: 'https://ebay.enterprise.slack.com/archives/C094W0APL6M',
    description: 'Learn to optimize AI tokens, curate context, and achieve faster, more reliable AI outcomes',
    contacts: 'Slack: #context-engineering',
    category: 'Communication',
    accent: '#4A154B'
  },
  {
    name: 'Context Engineering Guide',
    url: 'https://go/context-engineering-guide',
    description: 'Comprehensive guide covering all types of context engineering techniques and workflows',
    contacts: '',
    category: 'Learning',
    accent: '#667eea'
  },
  {
    name: 'Agents.md Standard',
    url: 'https://agents.md/',
    description: 'Emerging industry standard for repositories to communicate with AI agents',
    contacts: '',
    category: 'Learning',
    accent: 'var(--color-green-500)'
  },
  {
    name: 'Vibe Coding Thursdays',
    url: 'https://ebay.zoom.us/j/93889119561?pwd=6qXjj6Pa9yz4HNAEH1Rjso7Of4JtMw.1&from=addon',
    description: 'Weekly coding sessions (Portland) - Build, share, and get inspired! Thursdays 12:30-1:30 PM',
    contacts: 'Slack: #vibe-coding',
    category: 'Communication',
    accent: '#10b981'
  },
  {
    name: 'HubTV AI Resources',
    url: 'https://hubtv.corp.ebay.com/#/groups/k0xZB4',
    description: 'Video library of KT sessions covering MCP, Cline, and various AI topics',
    contacts: '',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'O\'Reilly AI/ML Learning',
    url: 'https://learning.oreilly.com/search/skills/ai-ml/?rows=100&language=en',
    description: 'Extensive AI/ML courses, books, and tutorials via eBay\'s O\'Reilly subscription',
    contacts: '',
    category: 'Learning',
    accent: 'var(--color-yellow-500)'
  }
]

// MCP Resources from CSV
export const mcpResourcesFromCSV: MCPResource[] = [
  {
    name: 'Intro to MCP',
    url: 'https://pages.github.corp.ebay.com/DevGenAI/ebay-mcp/docs/intro/',
    description: 'Introduction to Model Context Protocol at eBay',
    category: 'Learning',
    accent: '#667eea'
  },
  {
    name: 'MCP Servers Tracker',
    url: 'https://ebay.enterprise.slack.com/lists/T025756QT/F08MTB8R7UL',
    description: 'Lists internally created MCPs at eBay',
    category: 'AI & Development',
    accent: '#667eea'
  },
  {
    name: 'eBay MCP Servers',
    url: 'https://github.corp.ebay.com/DevGenAI/ebay-mcp',
    description: 'Official eBay MCP servers repository',
    category: 'AI & Development',
    accent: '#667eea'
  },
  {
    name: 'Figma Dev Mode MCP Server',
    url: 'https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server',
    description: 'Guide to the Figma Dev Mode MCP Server',
    category: 'Design',
    accent: 'var(--color-green-500)'
  },
  {
    name: 'MCP Catalog (Remote)',
    url: 'https://pages.github.corp.ebay.com/raptor-io-apps/mcpconnect/mcp-catalog.html',
    description: 'Catalog of available remote MCP servers',
    category: 'AI & Development',
    accent: '#667eea'
  }
]

// Context Engineering Resources from CSV
export const contextEngineeringResourcesFromCSV: ContextEngineeringResource[] = [
  {
    name: 'Context Engineering Talk Slides',
    url: 'https://pages.github.corp.ebay.com/awooldridge/context_engineering_2025/index.html',
    description: 'Slides for context engineering talk',
    category: 'Learning',
    accent: '#667eea'
  },
  {
    name: 'Context Engineering Guide',
    url: 'https://pages.github.corp.ebay.com/awooldridge/context_engineering_2025/guide/index.html',
    description: 'Comprehensive guide for learning how to optimize your token usage with an agentic AI',
    category: 'Learning',
    accent: '#667eea'
  }
]

// Outside Links from CSV - External AI/MCP Resources
export const outsideLinksFromCSV: OutsideLink[] = [
  {
    name: 'From OpenAPI spec to MCP',
    url: 'https://xata.io/blog/built-xata-mcp-server',
    description: 'How we built Xata\'s MCP server - Technical guide on building MCP servers from OpenAPI specifications',
    category: 'Learning',
    accent: '#667eea'
  },
  {
    name: 'Future of AI Interaction',
    url: 'https://www.epicai.pro/the-future-of-ai-interaction-beyond-just-text-w22ps',
    description: 'Beyond just text - Exploring multimodal AI interaction patterns',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'Critical Look at MCP',
    url: 'https://raz.sh/blog/2025-05-02_a_critical_look_at_mcp',
    description: 'A critical analysis of the Model Context Protocol - Raz Blog',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'Unbundle OpenAPI MCP',
    url: 'https://github.com/auto-browse/unbundle_openapi_mcp',
    description: 'GitHub - MCP server to unbundle large OpenAPI specifications',
    category: 'AI & Development',
    accent: '#667eea'
  },
  {
    name: 'Jake Gaylor AI Resources',
    url: 'https://ai.jakegaylor.com/',
    description: 'AI development resources and insights from Jake Gaylor',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'Agent2Agent and MCP Tutorial',
    url: 'https://matteovillosio.com/post/agent2agent-mcp-tutorial/',
    description: 'End-to-end tutorial for a complete agentic pipeline using Agent2Agent and MCP',
    category: 'Learning',
    accent: '#667eea'
  },
  {
    name: 'Docker MCP Catalog and Toolkit',
    url: 'https://www.docker.com/blog/introducing-docker-mcp-catalog-and-toolkit/',
    description: 'Docker\'s official MCP catalog and toolkit for containerized MCP servers',
    category: 'AI & Development',
    accent: '#2496ED'
  },
  {
    name: 'The Strategy Behind MCP',
    url: 'https://medium.com/@fintanr/the-strategy-behind-mcp-5d1cea61ee7b',
    description: 'Strategic analysis of Model Context Protocol by Fintan Ryan',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'MCPs, Gatekeepers, and Future of AI',
    url: 'https://iamcharliegraham.substack.com/p/mcps-gatekeepers-and-the-future-of',
    description: 'Analysis of MCP\'s role in shaping the future of AI - Charlie Graham',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'Deploy MCP on AWS Lambda',
    url: 'https://www.featureform.com/post/deploy-mcp-on-aws-lambda-with-mcpengine',
    description: 'Guide to deploying MCP servers on AWS Lambda with MCPEngine',
    category: 'AI & Development',
    accent: '#FF9900'
  },
  {
    name: 'Damn Vulnerable MCP Server',
    url: 'https://github.com/harishsg993010/damn-vulnerable-MCP-server',
    description: 'Security testing resource - Intentionally vulnerable MCP server for learning',
    category: 'Learning',
    accent: 'var(--color-red-500)'
  },
  {
    name: 'Norman Finance MCP Server',
    url: 'https://github.com/norman-finance/norman-mcp-server',
    description: 'Financial data MCP server implementation example',
    category: 'AI & Development',
    accent: '#10b981'
  },
  {
    name: 'Go, GraphQL, and MCP',
    url: 'https://hypermode.com/blog/go-graphql-mcp',
    description: 'A new era for developer tools - Hypermode\'s approach to MCP with Go and GraphQL',
    category: 'AI & Development',
    accent: '#00ADD8'
  },
  {
    name: 'Protocols for the Agentic Era',
    url: 'https://www.anup.io/p/protocols-for-the-agentic-era',
    description: 'Analysis of emerging protocols for AI agents by Anup Jadhav',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'Pydantic AI MCP Run Python',
    url: 'https://github.com/pydantic/pydantic-ai/tree/main/mcp-run-python',
    description: 'Pydantic AI\'s Python execution MCP server implementation',
    category: 'AI & Development',
    accent: '#E92063'
  },
  {
    name: 'MCP Gateway',
    url: 'https://github.com/mcp-ecosystem/mcp-gateway',
    description: 'Lightweight gateway service that transforms existing APIs into MCP servers with zero code changes',
    category: 'AI & Development',
    accent: '#667eea'
  },
  {
    name: 'Serverless Framework MCP',
    url: 'https://www.serverless.com/framework/docs/guides/mcp',
    description: 'Serverless Framework guide for building and deploying MCP servers',
    category: 'AI & Development',
    accent: '#FD5750'
  },
  {
    name: 'WunderGraph MCP Gateway',
    url: 'https://wundergraph.com/mcp-gateway',
    description: 'Connect GraphQL to AI models via MCP - WunderGraph Cosmo MCP Gateway',
    category: 'AI & Development',
    accent: '#667eea'
  },
  {
    name: 'EvolveMCP',
    url: 'https://github.com/kordless/EvolveMCP',
    description: 'Your appetite for code + Claude\'s capabilities = Limitless creation. No experience required!',
    category: 'AI & Development',
    accent: '#7c3aed'
  },
  {
    name: 'MCP Security Research',
    url: 'https://www.wiz.io/blog/mcp-security-research-briefing',
    description: 'MCP and LLM security research briefing - Wiz Blog',
    category: 'Learning',
    accent: 'var(--color-red-500)'
  },
  {
    name: 'MCP vs ACP Protocols',
    url: 'https://www.petrostechchronicles.com/blog/ACP_vs_MCP',
    description: 'AI protocols for context and agent orchestration - Comparing MCP and ACP',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'MCP Claude Spotify',
    url: 'https://github.com/imprvhub/mcp-claude-spotify',
    description: 'Spotify MCP server integration for Claude',
    category: 'AI & Development',
    accent: '#1DB954'
  },
  {
    name: 'MCP Lite Discussion',
    url: 'https://github.com/orgs/modelcontextprotocol/discussions/314',
    description: 'A simplified approach to Model Context Protocol integration',
    category: 'Learning',
    accent: '#667eea'
  },
  {
    name: 'MCP Clearly Explained (Video)',
    url: 'https://youtu.be/7j_NE6Pjv-E?feature=shared',
    description: 'Model Context Protocol clearly explained - Why it matters (YouTube)',
    category: 'Learning',
    accent: 'var(--color-red-500)'
  },
  {
    name: 'GitHub MCP Server',
    url: 'https://www.linkedin.com/posts/reuvencohen_github-githubgithub-mcp-server-githubs-activity-7314067889714540545-rCVi',
    description: 'GitHub\'s official MCP server announcement and discussion',
    category: 'AI & Development',
    accent: '#000000'
  },
  {
    name: 'MCP Guide - The Register',
    url: 'https://www.theregister.com/2025/04/21/mcp_guide/',
    description: 'Everything you need to get up and running with MCP – Anthropic\'s USB-C for AI',
    category: 'Learning',
    accent: 'var(--color-blue-500)'
  },
  {
    name: 'Advanced Context Engineering for Coding Agents',
    url: 'https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md',
    description: 'Comprehensive guide on advanced context engineering techniques for AI coding agents',
    category: 'Learning',
    accent: '#667eea'
  }
]
