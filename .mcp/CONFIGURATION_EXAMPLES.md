# MCP Configuration Examples

This directory contains example configuration files showing how MCP servers should be configured for different AI tools.

## 📁 File Structure

```
.mcp/
├── config.json.example                    # Environment variables config
├── claude_desktop_config.example.json     # Claude Desktop App config
├── cline_mcp_settings.template.json       # VS Code Cline extension template
├── intellij_mcp_settings.template.json    # IntelliJ IDEA template
├── SETUP_GUIDE.md                         # Complete setup instructions
└── CONFIGURATION_EXAMPLES.md              # This file
```

## 🎯 Quick Reference: Which File Do I Need?

| Tool | Configuration File | Location | Use This Example |
|------|-------------------|----------|------------------|
| **Claude Desktop** | `claude_desktop_config.json` | `~/Library/Application Support/Claude/` (macOS) | `claude_desktop_config.example.json` |
| **VS Code + Cline** | `cline_mcp_settings.json` | `~/Library/Application Support/Code/User/globalStorage/ebay.ebay-cline/settings/` | `cline_mcp_settings.template.json` |
| **IntelliJ + Copilot** | `mcp.json` | `~/.config/github-copilot/intellij/` | `intellij_mcp_settings.template.json` |
| **Generic MCP Config** | `config.json` | `~/.mcp/` | `config.json.example` |

## 📝 Configuration File Formats Explained

### 1. `config.json.example` - Environment Variables Only

**Use Case**: Storing environment variables separately from server definitions

**Structure**:
```json
{
  "configuration": {
    "server-name": {
      "env": {
        "VARIABLE_NAME": "value",
        "ANOTHER_VAR": "value"
      }
    }
  }
}
```

**Key Points**:
- Contains ONLY environment variables
- No command paths or server execution details
- Useful for sharing configs without exposing tokens
- Must be combined with server definitions elsewhere

**Example**:
```json
{
  "configuration": {
    "wiki-server": {
      "env": {
        "CONFLUENCE_TOKEN": "your-token-here",
        "CONFLUENCE_BASE_URL": "https://wiki.corp.ebay.com",
        "NODE_TLS_REJECT_UNAUTHORIZED": "0"
      }
    }
  }
}
```

### 2. `claude_desktop_config.example.json` - Full Configuration

**Use Case**: Claude Desktop App complete configuration

**Structure**:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": { /* environment variables */ },
      "disabled": false,
      "autoApprove": ["operation1", "operation2"]
    }
  }
}
```

**Key Points**:
- Complete server configuration
- Includes command, args, env, and auto-approve settings
- Used by Claude Desktop App
- Most comprehensive format

**What Each Field Means**:

| Field | Required | Purpose | Example |
|-------|----------|---------|---------|
| `command` | ✅ Yes | Program to run | `"node"`, `"python"` |
| `args` | ✅ Yes | Command arguments | `["/path/to/server.js"]` |
| `env` | ⚠️ Optional | Environment variables | `{"API_KEY": "xyz"}` |
| `disabled` | ⚠️ Optional | Disable server | `false` (default) |
| `autoApprove` | ⚠️ Optional | Auto-approve operations | `["read_file"]` |

### 3. Template Files - Ready to Customize

**Cline Template** (`cline_mcp_settings.template.json`):
- Same format as Claude Desktop config
- Pre-configured with eBay-specific servers
- Includes placeholders like `YOUR_USERNAME`

**IntelliJ Template** (`intellij_mcp_settings.template.json`):
- Uses `servers` instead of `mcpServers`
- Otherwise similar to Claude config
- GitHub Copilot specific

## 🔧 How to Use These Examples

### For New Users (Just Cloned This Repo)

1. **Choose your tool** from the table above
2. **Copy the appropriate template**:
   ```bash
   # For Claude Desktop:
   cp .mcp/claude_desktop_config.example.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
   
   # For VS Code + Cline:
   cp .mcp/cline_mcp_settings.template.json ~/Library/Application\ Support/Code/User/globalStorage/ebay.ebay-cline/settings/cline_mcp_settings.json
   
   # For IntelliJ:
   mkdir -p ~/.config/github-copilot/intellij
   cp .mcp/intellij_mcp_settings.template.json ~/.config/github-copilot/intellij/mcp.json
   ```

3. **Edit the file** and replace:
   - `YOUR_USERNAME` → Your Mac username (e.g., `jdoe`)
   - `jdoe@ebay.com` → Your eBay email
   - Token placeholders → Your actual API tokens

4. **Restart your IDE/tool**

### For Existing Users (Updating Configuration)

Just reference these examples to see the proper structure and add missing fields.

## 🔑 Getting API Tokens

You'll need these tokens to configure the MCP servers:

### GitHub Token (GITHUB_TOKEN)
1. Go to: https://github.corp.ebay.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `read:org`, `read:user`
4. Copy token (starts with `ghp_`)

### Confluence Token (CONFLUENCE_TOKEN)
1. Go to: https://wiki.corp.ebay.com/
2. Click your profile → "Personal Access Tokens"
3. Create new token with read/write access
4. Copy token (starts with `ATBBBasicAuth`)

### JIRA PAT (JIRA_PAT)
1. Go to: https://jirap.corp.ebay.com/secure/ViewProfile.jspa
2. Click "Personal Access Tokens"
3. Create new token
4. Copy the Base64 encoded token

## 🚨 Common Configuration Mistakes

### ❌ Wrong: Missing Required Environment Variables
```json
{
  "wiki-server": {
    "command": "node",
    "args": ["/path/to/wiki-server/build/index.js"],
    "env": {
      "CONFLUENCE_TOKEN": "token-here"
      // ❌ Missing CONFLUENCE_BASE_URL!
    }
  }
}
```

### ✅ Correct: All Required Variables Present
```json
{
  "wiki-server": {
    "command": "node",
    "args": ["/path/to/wiki-server/build/index.js"],
    "env": {
      "CONFLUENCE_TOKEN": "token-here",
      "CONFLUENCE_BASE_URL": "https://wiki.corp.ebay.com",  // ✅
      "CONFLUENCE_USERNAME": "you@ebay.com",  // ✅
      "CONFLUENCE_HOST": "https://wiki.corp.ebay.com"  // ✅
    }
  }
}
```

### ❌ Wrong: Incorrect Path Separators (Windows)
```json
{
  "args": ["C:\Users\jdoe\ebay-mcp\server.js"]  // ❌ Won't work!
}
```

### ✅ Correct: Forward Slashes or Escaped Backslashes
```json
{
  "args": ["C:/Users/jdoe/ebay-mcp/server.js"]  // ✅ Works!
  // OR
  "args": ["C:\\Users\\jdoe\\ebay-mcp\\server.js"]  // ✅ Also works!
}
```

### ❌ Wrong: Hardcoded Tokens in Example Files
```json
// ❌ NEVER commit actual tokens to git!
{
  "env": {
    "GITHUB_TOKEN": "ghp_ActualRealTokenHere123"  // ❌ Security risk!
  }
}
```

### ✅ Correct: Use Placeholders in Examples
```json
// ✅ Safe to commit
{
  "env": {
    "GITHUB_TOKEN": "REPLACE_WITH_YOUR_TOKEN"  // ✅ Placeholder only
  }
}
```

## 📊 Configuration Comparison

| Feature | config.json | claude_desktop_config.json | Cline Template | IntelliJ Template |
|---------|-------------|----------------------------|----------------|-------------------|
| Environment Variables | ✅ | ✅ | ✅ | ✅ |
| Server Command | ❌ | ✅ | ✅ | ✅ |
| Auto-Approve | ❌ | ✅ | ✅ | ✅ |
| Disable Servers | ❌ | ✅ | ✅ | ✅ |
| Root Key | `configuration` | `mcpServers` | `mcpServers` | `servers` |

## 🔒 Security Best Practices

1. **Never commit actual tokens** to git repositories
2. **Use different tokens** for different environments (dev/prod)
3. **Rotate tokens regularly** (every 90 days recommended)
4. **Keep .gitignore updated** to exclude config files:
   ```gitignore
   # MCP Configurations (may contain tokens)
   .mcp/config.json
   claude_desktop_config.json
   cline_mcp_settings.json
   ```

5. **Use environment variables** when possible instead of hardcoding

## 📚 Additional Resources

- **Main Setup Guide**: See `.mcp/SETUP_GUIDE.md` for step-by-step instructions
- **MCP Documentation**: See `.mcp/README.md` for server-specific details
- **MCP Protocol**: https://modelcontextprotocol.io
- **eBay AI Tools**: #ai-tools Slack channel

## ❓ Need Help?

1. Check the main [SETUP_GUIDE.md](.mcp/SETUP_GUIDE.md)
2. Review the [README.md](.mcp/README.md)
3. Ask in #ai-tools Slack channel
4. Create JIRA ticket in AI-TOOLS project

---

**Last Updated**: January 2026  
**Maintained By**: eBay AI Tools Team
