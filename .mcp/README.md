# MCP Settings Configuration Guide

## Overview
This directory contains the MCP (Model Context Protocol) server configuration template for the eBay AI Dev Tools setup.

## Key Configuration Files

### `cline_mcp_settings.template.json`
This is the template file that users should copy and customize for their own setup. It contains the correct configuration structure based on working implementations.

### `claude_desktop_config.example.json`
Configuration template for Claude Desktop App MCP servers.

### `intellij_mcp_settings.template.json`
Configuration template for IntelliJ IDEA with GitHub Copilot MCP integration.

### `vscode_settings.template.json`
VS Code global settings template with eBay-specific configurations including:
- Proxy settings for corporate network
- GitHub Enterprise integration
- GitHub Copilot optimizations
- Claude Code authentication configuration

### `setup.sh`
Automated setup script that copies configuration templates to the correct locations for:
- Claude Desktop App
- VS Code with Cline Extension
- VS Code Global Settings
- IntelliJ IDEA with GitHub Copilot

## Important Corrections Made

The template has been updated to reflect the **correct working configuration**. Key changes include:

### 1. **git-server** 
- ✅ **Corrected path**: `build/src/index.js` (was incorrectly `build/index.js`)
- ✅ **Correct environment variables**:
  - `GITHUB_TOKEN` (not `GITHUB_PERSONAL_ACCESS_TOKEN`)
  - `GITHUB_API_URL` (not `GITHUB_ENTERPRISE_URL`)
  - `NODE_TLS_REJECT_UNAUTHORIZED: "0"` (required for corporate SSL)
- ✅ **Added autoApprove array** for common GitHub operations

### 2. **jira-server**
- ✅ **Correct environment variables**:
  - `JIRA_HOME` (not `JIRA_HOST`)
  - `JIRA_PAT` (not `JIRA_PAT_TOKEN`)
  - `NODE_TLS_REJECT_UNAUTHORIZED: "0"` (added for corporate SSL)
- ✅ **Added autoApprove array** for JIRA operations

### 3. **wiki-server** (Confluence)
- ✅ **Correct environment variables**:
  - `CONFLUENCE_BASE_URL` (not `CONFLUENCE_HOST`)
  - `CONFLUENCE_TOKEN` (correct as-is)
- ✅ Removed `CONFLUENCE_USERNAME` (not needed with token auth)

### 4. **apidiscovery-server**
- ✅ **Changed to SSE transport** (not node command)
- ✅ Configuration structure:
  ```json
  {
    "url": "https://apicatlogservice6cont.stratus.qa.ebay.com/sse",
    "transportType": "sse",
    "timeout": 60,
    "disabled": false,
    "autoApprove": []
  }
  ```

### 5. **pulse-api**
- ✅ **Changed to streamableHttp transport** (not node command)
- ✅ **Added alwaysAllow array** for common Pulse API operations
- ✅ Configuration structure:
  ```json
  {
    "url": "https://pulseremotemcp1.vip.qa.ebay.com/mcp",
    "type": "streamableHttp",
    "timeout": 60,
    "disabled": false,
    "alwaysAllow": [...]
  }
  ```

### 6. **Removed/Disabled Servers**
The following servers were removed from the template as they're not part of the core working configuration:
- jenkins-server
- elasticsearch-server
- sherlock-server
- prometheus-server
- lucidchart-server
- glean-server

## How to Use This Template

1. **Copy the template**:
   ```bash
   cp .mcp/cline_mcp_settings.template.json ~/Library/Application\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json
   ```

2. **Replace placeholder values**:
   - `YOUR_USERNAME` → Your actual macOS username
   - `REPLACE_WITH_YOUR_GITHUB_TOKEN` → Your GitHub personal access token
   - `REPLACE_WITH_YOUR_CONFLUENCE_TOKEN` → Your Confluence API token
   - `REPLACE_WITH_YOUR_JIRA_PAT` → Your JIRA personal access token

3. **Verify paths exist**:
   Ensure the MCP server builds exist at:
   ```
   /Users/YOUR_USERNAME/ebay-mcp/mcp-tools-servers/
   ├── git-server/build/src/index.js
   ├── jira-server/build/index.js
   └── wiki-server/build/index.js
   ```

## Common Issues & Solutions

### Issue: "Cannot find module"
- **Solution**: Check that the path in `args` points to the correct build file location
- For git-server, note the extra `/src/` in the path: `build/src/index.js`

### Issue: "Connection refused" or SSL errors
- **Solution**: Ensure `NODE_TLS_REJECT_UNAUTHORIZED: "0"` is set for corporate servers
- Verify proxy settings with `NO_PROXY` and `no_proxy` environment variables

### Issue: "Authentication failed"
- **Solution**: Regenerate API tokens and ensure they have the correct permissions
- For JIRA: Use the full PAT token, not just username/password
- For GitHub: Token needs `repo`, `read:org`, and `workflow` scopes
- For Confluence: Token needs read/write permissions

## Environment Variables Reference

### Required for Corporate eBay Servers
```json
"NODE_TLS_REJECT_UNAUTHORIZED": "0",
"NO_PROXY": "localhost,127.0.0.1,.vip.ebay.com,.corp.ebay.com,.ebayc3.com",
"no_proxy": "localhost,127.0.0.1,.vip.ebay.com,.corp.ebay.com,.ebayc3.com"
```

## Testing Your Configuration

After setting up your configuration:

1. Restart VS Code
2. Open the Cline extension
3. Check the MCP servers panel - all enabled servers should show as "Connected"
4. Try a simple command like "list my recent JIRA tickets" to test JIRA integration
5. Try "search for files in repository X" to test GitHub integration

## Support

If you encounter issues:
1. Check the Cline extension logs in VS Code
2. Verify all paths and tokens are correct
3. Ensure the MCP server builds are up to date
4. Refer to the main repository README for additional troubleshooting

## Version History

- **2026-01-02**: Updated template with correct working configuration
  - Fixed git-server path and environment variables
  - Corrected JIRA and Confluence environment variable names
  - Updated API Discovery and Pulse API to use SSE/HTTP transports
  - Added autoApprove/alwaysAllow arrays for better UX
