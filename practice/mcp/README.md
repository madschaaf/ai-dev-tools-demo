# MCP Server Practice

Learn to configure, test, and use Model Context Protocol (MCP) servers with AI assistants.

## Objective

Understand how to set up MCP servers, configure them in AI tools, and use them to extend AI capabilities with external data sources and APIs.

## Context

MCP servers allow AI assistants to access external tools and data sources (databases, APIs, file systems, etc.) in a standardized way. These exercises teach you to:
- Configure MCP servers
- Connect them to AI assistants
- Validate server functionality
- Troubleshoot common issues

## Example Configurations

### Example 1: Local REST API Server

**File:** `local-rest/mcp.json`

```json
{
  "version": "1",
  "servers": {
    "local-rest": {
      "command": "node",
      "args": ["server.js"],
      "env": {
        "PORT": "3000"
      }
    }
  }
}
```

**What it does:** Starts a Node.js REST API server that the AI can call.

**Test it:**
```bash
# Start the server
node server.js

# List available tools
mcp-client list-tools

# Call a tool
mcp-client call get_users
```

### Example 2: GitHub MCP Server

**File:** `github/mcp.json`

```json
{
  "version": "1",
  "servers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**What it does:** Allows AI to interact with GitHub (search repos, create issues, read files, etc.).

**Prerequisites:**
- GitHub personal access token in environment
- Token permissions: `repo`, `read:org`

**Test it:**
```bash
# Export your token
export GITHUB_TOKEN="your-token-here"

# List available GitHub tools
mcp-client list-tools --server github

# Search repositories
mcp-client call search_repos --query "ebay"
```

### Example 3: Confluence MCP Server

**File:** `confluence/mcp.json`

```json
{
  "version": "1",
  "servers": {
    "confluence": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-confluence"],
      "env": {
        "CONFLUENCE_URL": "https://confluence.corp.ebay.com",
        "CONFLUENCE_USER": "${USER_EMAIL}",
        "CONFLUENCE_TOKEN": "${CONFLUENCE_TOKEN}"
      }
    }
  }
}
```

**What it does:** Allows AI to search and read Confluence pages.

**Prerequisites:**
- Confluence API token
- Access to eBay's Confluence instance

**Test it:**
```bash
# Set credentials
export CONFLUENCE_TOKEN="your-token-here"
export USER_EMAIL="your-email@ebay.com"

# Search Confluence
mcp-client call search_pages --query "MCP documentation"
```

## Exercises

### Exercise 1: MCP Server Smoke Test

**Objective:** Validate a new MCP server configuration.

**Steps:**
1. Choose an MCP config from `examples/`
2. Review required environment variables
3. Set up credentials in `.env` file
4. Start the MCP server
5. List available tools using MCP client
6. Execute a sample tool call
7. Verify expected response

**Verify:**
- [ ] Server starts without errors
- [ ] Tools list successfully
- [ ] Sample tool executes and returns data
- [ ] Response matches expected format

### Exercise 2: Custom MCP Server

**Objective:** Create a custom MCP server for a simple API.

**Context:** You have a JSON API at `http://localhost:4000/api`

**Steps:**
1. Create `custom/mcp.json` with server config
2. Write a simple Express server in `custom/server.js`
3. Implement these tools:
   - `get_data` - Fetch all records
   - `get_by_id` - Fetch record by ID
   - `create_record` - Create new record
4. Test each tool with MCP client
5. Connect to Cline/Claude and test with AI

**Verify:**
- [ ] All tools work via MCP client
- [ ] AI assistant can call your tools
- [ ] Error handling works (invalid IDs, etc.)
- [ ] Documentation is clear

### Exercise 3: MCP Gateway Configuration

**Objective:** Configure multiple MCP servers through the MCP Gateway.

**Context:** The MCP Gateway allows you to expose multiple MCP servers through a single endpoint, useful for enterprise deployments.

**Steps:**
1. Review `gateway-config.md` for setup instructions
2. Create `gateway/config.json` with multiple servers:
   - GitHub server
   - Confluence server
   - Custom REST API
3. Start the MCP Gateway
4. Point your AI assistant to the gateway endpoint
5. Test tools from each server

**Verify:**
- [ ] Gateway starts successfully
- [ ] All servers are accessible through gateway
- [ ] AI can use tools from any server
- [ ] Gateway logs show tool calls

## Common Issues & Solutions

### Issue: Authentication Failures

**Symptoms:** 401/403 errors when calling tools

**Solutions:**
- Verify tokens are set in environment
- Check token has correct permissions
- Ensure token hasn't expired
- Test authentication directly with curl

### Issue: Server Won't Start

**Symptoms:** MCP server fails to start

**Solutions:**
- Check Node.js is installed (`node --version`)
- Verify all dependencies installed (`npm install`)
- Check for port conflicts
- Review server logs for specific errors

### Issue: Tools Not Appearing

**Symptoms:** `mcp-client list-tools` returns empty

**Solutions:**
- Verify server started successfully
- Check mcp.json syntax is valid JSON
- Ensure command path is correct
- Review server implementation exports tools correctly

## Testing Checklist

Use this checklist when testing any MCP server:

- [ ] Server starts without errors
- [ ] Environment variables are set correctly
- [ ] `list-tools` returns expected tools
- [ ] Each tool has clear documentation
- [ ] Sample tool calls return expected data
- [ ] Error cases handled gracefully
- [ ] Server logs are readable
- [ ] Connection from AI assistant works

## Contributing New Servers

1. Create a branch: `git checkout -b mcp-[server-name]`
2. Create folder: `[server-name]/`
3. Include:
   - `mcp.json` - Server configuration
   - `README.md` - Setup and usage instructions
   - `example-calls.sh` - Sample tool invocations
   - `server.js` (if custom implementation)
   - `.env.example` - Required environment variables
4. Test thoroughly with checklist above
5. Document in `gateway-config.md` if gateway-compatible
6. Open PR with setup instructions

## Resources

- [MCP Specification](https://modelcontextprotocol.io/specification)
- [MCP Server List](https://github.com/modelcontextprotocol/servers)
- [Gateway Configuration Guide](./gateway-config.md)
- [Debugging MCP Servers](../docs/mcp-debugging.md)
