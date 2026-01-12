# MCP Server Setup Guide

This guide will help you configure MCP (Model Context Protocol) servers to work with your AI development tools.

## 📋 Quick Start

**New to MCP?** Check out [CONFIGURATION_EXAMPLES.md](CONFIGURATION_EXAMPLES.md) for:
- Visual comparison of all configuration file formats
- Common mistakes and how to avoid them
- Side-by-side examples
- Security best practices

**Ready to configure?** Continue with the detailed setup instructions below.

## Prerequisites

1. **Install Node.js** (v18 or higher)
2. **Clone eBay MCP Tools** repository:
   ```bash
   git clone https://github.corp.ebay.com/your-repo/ebay-mcp.git ~/ebay-mcp
   cd ~/ebay-mcp/mcp-tools-servers
   npm install
   npm run build
   ```

3. **Obtain API Tokens**:
   - **GitHub Token**: Generate at https://github.corp.ebay.com/settings/tokens
   - **JIRA PAT**: Generate at https://jirap.corp.ebay.com/secure/ViewProfile.jspa
   - **Confluence Token**: Generate at https://wiki.corp.ebay.com/

## Configuration by IDE/Tool

### 🔵 VS Code with Cline Extension

**Configuration File Location**:
```
~/Library/Application Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json
```

**Setup Steps**:

1. **Copy the template**:
   ```bash
   cp .mcp/cline_mcp_settings.template.json ~/Library/Application\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json
   ```

2. **Edit the configuration** and replace placeholders:
   - `YOUR_USERNAME` → Your Mac username (e.g., `madschaaf`)
   - `REPLACE_WITH_YOUR_GITHUB_TOKEN` → Your GitHub personal access token
   - `REPLACE_WITH_YOUR_WIKI_TOKEN` → Your Confluence API token
   - `YOUR_EMAIL@ebay.com` → Your eBay email address
   - `REPLACE_WITH_YOUR_JIRA_PAT` → Your JIRA personal access token

3. **Reload VS Code**: 
   - Press `Cmd+Shift+P`
   - Type "Developer: Reload Window"
   - Press Enter

4. **Verify Connection**:
   - Open Cline extension
   - Check the MCP servers section - all servers should show as "Connected"

### 🟠 IntelliJ IDEA with GitHub Copilot

**Configuration File Location**:
```
~/.config/github-copilot/intellij/mcp.json
```

**Setup Steps**:

1. **Create the directory** (if it doesn't exist):
   ```bash
   mkdir -p ~/.config/github-copilot/intellij
   ```

2. **Copy the template**:
   ```bash
   cp .mcp/intellij_mcp_settings.template.json ~/.config/github-copilot/intellij/mcp.json
   ```

3. **Edit the configuration** and replace the same placeholders as above

4. **Restart IntelliJ IDEA** completely

5. **Verify Connection**:
   - Open GitHub Copilot settings
   - Navigate to MCP servers section
   - Verify all servers are connected

### 🟢 Claude Desktop App

**Configuration File Location** (macOS):
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Setup Steps**:

1. **Create configuration file**:
   ```bash
   mkdir -p ~/Library/Application\ Support/Claude
   ```

2. **Copy the example configuration**:
   ```bash
   cp .mcp/claude_desktop_config.example.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **Edit and replace placeholders**:
   - `YOUR_USERNAME` → Your Mac username (e.g., `jdoe`)
   - `jdoe@ebay.com` → Your eBay email
   - Token placeholders → Your actual API tokens

4. **Restart Claude Desktop App**

**📝 Note**: See [claude_desktop_config.example.json](claude_desktop_config.example.json) for a complete example with all MCP servers configured.

## Available MCP Servers

### 📦 git-server
**Purpose**: GitHub Enterprise integration for eBay repositories

**Capabilities**:
- Branch operations (create, list, get)
- Commit operations (list, search, view)
- Content operations (read files, push changes)
- Pull request management
- Repository operations
- Issue tracking

**Auto-Approved Operations**:
- `github_branches`, `github_commits`, `github_content`
- `github_search`, `github_pull_requests`
- `github_repositories`, `github_issues`

### 📚 wiki-server
**Purpose**: Confluence Wiki integration

**Capabilities**:
- Read wiki pages (by ID, title, or search)
- Create and update wiki pages
- Manage page hierarchy (child pages)
- Download and upload attachments
- Full-text search across wiki

**Auto-Approved Operations**:
- `get_page_by_id`, `get_page_by_title`, `get_page_with_storage_format`
- `get_child_pages`, `create_wiki_page`, `update_wiki_page`
- `search_wiki`, `list_wiki_attachments`
- `download_wiki_attachment`, `upload_wiki_attachment`

**Required Environment Variables**:
- ⚠️ **CRITICAL**: `CONFLUENCE_BASE_URL` must be set (common error if missing)
- `CONFLUENCE_TOKEN`: Your API token
- `CONFLUENCE_USERNAME`: Your eBay email
- `CONFLUENCE_HOST`: Same as BASE_URL (for compatibility)

### 🎫 jira-server
**Purpose**: JIRA ticket management

**Capabilities**:
- Search and retrieve tickets
- Create and edit tickets
- Manage comments and work logs
- Track ticket transitions
- Custom field management

**Auto-Approved Operations**:
- `search_issues`, `get_ticket`, `create_ticket`
- `edit_ticket`, `get_comments`, `add_comment`

### 🔍 apidiscovery-server
**Purpose**: eBay API discovery and documentation

**Connection Type**: SSE (Server-Sent Events)
**No authentication required** (internal eBay network only)

### 📊 pulse-api
**Purpose**: Engineering metrics and analytics (PULSE system)

**Connection Type**: Streamable HTTP
**No authentication required** (internal eBay network only)

**Common Operations**:
- `getDeliveryPerfByTeamName`, `getDeliveryPerfByDomainName`
- `getDeliveryPerfByVPName`, `getAppReleaseMetricsConsolidated`
- `getAccessibilityAllVPs`, `getBugReductionTargetAllVPs`

## Troubleshooting

### Wiki-server won't connect

**Error**: `Missing required environment variable: CONFLUENCE_BASE_URL`

**Solution**: Make sure your configuration includes:
```json
"env": {
  "CONFLUENCE_BASE_URL": "https://wiki.corp.ebay.com",
  "CONFLUENCE_TOKEN": "your-token",
  "CONFLUENCE_USERNAME": "your-email@ebay.com",
  "CONFLUENCE_HOST": "https://wiki.corp.ebay.com"
}
```

### GitHub rate limiting

**Error**: API rate limit exceeded

**Solution**: 
- Use a personal access token (not password)
- Check token permissions include `repo` scope
- Wait for rate limit to reset (typically 1 hour)

### JIRA authentication fails

**Error**: 401 Unauthorized

**Solution**:
- Regenerate your JIRA PAT
- Verify PAT has appropriate permissions
- Check `JIRA_HOME` URL is correct

### Proxy Issues

**Error**: Connection timeout or SSL errors

**Solution**: Ensure proxy bypass settings are configured:
```json
"env": {
  "NO_PROXY": "localhost,127.0.0.1,.vip.ebay.com,.corp.ebay.com,.ebayc3.com",
  "no_proxy": "localhost,127.0.0.1,.vip.ebay.com,.corp.ebay.com,.ebayc3.com",
  "NODE_TLS_REJECT_UNAUTHORIZED": "0"
}
```

## Security Best Practices

1. **Never commit API tokens** to git repositories
2. **Use separate tokens** for different purposes
3. **Rotate tokens regularly** (every 90 days recommended)
4. **Use minimal permissions** - only grant what's needed
5. **Keep tokens in secure locations** - use system keychains when possible

## Advanced Configuration

### Auto-Approve Settings

The `autoApprove` array lists operations that won't require manual confirmation:

```json
"autoApprove": [
  "operation_name_1",
  "operation_name_2"
]
```

**⚠️ Use carefully**: Only auto-approve read operations or operations you trust completely.

### Timeout Configuration

Adjust timeout for slow operations:

```json
"timeout": 60  // seconds
```

### Disabling Servers

Temporarily disable a server without removing configuration:

```json
"disabled": true
```

## Testing Your Setup

### Test wiki-server:
Ask your AI agent: "Get wiki page with ID 12345"

### Test git-server:
Ask your AI agent: "List branches in repository X"

### Test jira-server:
Ask your AI agent: "Search for JIRA tickets in project ABC"

### Test pulse-api:
Ask your AI agent: "Get delivery performance for team XYZ"

## Getting Help

- **Internal eBay Support**: #ai-tools Slack channel
- **MCP Documentation**: See `.mcp/README.md`
- **Report Issues**: Create JIRA ticket in AI-TOOLS project

## Updates and Maintenance

When eBay MCP servers are updated:

1. Pull latest changes:
   ```bash
   cd ~/ebay-mcp/mcp-tools-servers
   git pull
   ```

2. Rebuild:
   ```bash
   npm install
   npm run build
   ```

3. Restart your IDE/AI tool to pick up changes

## Additional Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.io)
- [eBay AI Tools Wiki](https://wiki.corp.ebay.com/display/AITOOLS)
- [Internal MCP Server Documentation](https://github.corp.ebay.com/AI/mcp-tools-servers)
