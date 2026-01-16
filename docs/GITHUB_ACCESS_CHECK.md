# GitHub Repository Access Check - MVP Feature

## Overview

The AI Autofill feature now includes an **MVP access check** that validates repository accessibility before attempting to analyze it. This provides clear, actionable feedback when repositories are private or unreachable.

## How It Works

### 1. Access Check Process

When you paste a GitHub URL and click "Analyze Link", the system:

1. **Parses the URL** to extract owner and repo name
2. **Checks repository accessibility** using GitHub API
3. **Returns clear feedback** based on the result:
   - ✅ **Public & Accessible** → Proceeds with autofill
   - 🔒 **Private/Inaccessible** → Returns helpful error message

### 2. Access Check Scenarios

| Status Code | Scenario | User Feedback |
|------------|----------|---------------|
| `200 OK` | Repository is accessible | ✅ Proceeds with analysis |
| `401 Unauthorized` | Invalid or missing GitHub token | "GitHub authentication failed. Please check your GITHUB_TOKEN." |
| `403 Forbidden` | Token lacks permissions or rate limit | "Access forbidden. Check token permissions or rate limits." |
| `404 Not Found` | Private repo or doesn't exist | "This repository is private. Connect GitHub to analyze it." |
| `0 Network Error` | Cannot reach GitHub server (DNS/VPN) | "Unable to reach GitHub server. Check network connection or VPN." |

### 3. Response Format

#### Success Response (200 OK)
```json
{
  "useCaseName": "My Project",
  "codingLanguage": "TypeScript",
  "ide": "VS Code",
  ...
}
```

#### Error Response (Private Repo)
```json
{
  "error": "This repository is private. Connect GitHub to analyze it.",
  "isPrivate": true,
  "suggestion": "This repository requires authentication. Configure GitHub access to analyze private repositories."
}
```

#### Error Response (Network Issue)
```json
{
  "error": "Unable to reach GitHub server. Check network connection or VPN.",
  "isPrivate": true,
  "suggestion": "Ensure you are connected to the eBay network/VPN to access enterprise repositories"
}
```

## GitHub Enterprise Considerations

### For eBay Enterprise (github.corp.ebay.com)

**"Public"** repos in GitHub Enterprise are:
- ✅ Public **within the enterprise**
- ❌ NOT public on the internet

**Access Requirements:**
1. **Network Access**: Must be on eBay network or VPN
2. **Server Location**: Backend/MCP server must reach `github.corp.ebay.com`
3. **Authentication**: GitHub token with appropriate permissions

### Quick Check: Can My Backend Reach GitHub Enterprise?

```bash
# Test network access
curl -I https://github.corp.ebay.com

# Expected: 200 OK or redirect
# If fails: Check VPN connection
```

## Configuration

### 1. Set Up GitHub Token

Create a `.env` file in the **root directory** (not `src/.env`):

```bash
# For eBay Enterprise
GITHUB_TOKEN=github_pat_YOUR_TOKEN_HERE
GITHUB_API_URL=https://github.corp.ebay.com/api/v3

# For Public GitHub
GITHUB_TOKEN=github_pat_YOUR_TOKEN_HERE
# GITHUB_API_URL not needed for public GitHub
```

### 2. Token Permissions Required

For **fine-grained tokens**, grant:
- ✅ `repo` (Full repository access) OR
- ✅ `public_repo` (Public repositories only)
- ✅ `read:org` (For enterprise repositories)

### 3. Restart Server

After adding your token:
```bash
npm start
```

## Testing the Feature

### Test Case 1: Public Repository (No Token)
```
URL: https://github.com/facebook/react
Expected: ✅ Analysis proceeds (public repo)
```

### Test Case 2: Private Repository (No Token)
```
URL: https://github.corp.ebay.com/your-username/private-repo
Expected: 🔒 "This repository is private. Connect GitHub to analyze it."
```

### Test Case 3: Private Repository (With Token)
```
URL: https://github.corp.ebay.com/your-username/private-repo
With: GITHUB_TOKEN configured
Expected: ✅ Analysis proceeds (authenticated access)
```

### Test Case 4: Network Issue (No VPN)
```
URL: https://github.corp.ebay.com/some-org/some-repo
Without: VPN connection
Expected: ❌ "Unable to reach GitHub server. Check network connection or VPN."
```

## Error Handling

The system provides **progressive error messages** based on the issue:

1. **Missing Token** → Suggests adding GITHUB_TOKEN
2. **Invalid Token** → Suggests checking token validity
3. **Network Issue** → Suggests checking VPN/network
4. **Private Repo** → Suggests configuring GitHub access

## Benefits

✅ **Clear Feedback**: Users know exactly why analysis failed  
✅ **No Wasted Time**: Fails fast instead of timing out  
✅ **Actionable Guidance**: Specific suggestions for each error type  
✅ **Infrastructure Awareness**: Detects network/VPN issues  
✅ **MVP Simplicity**: Checks access before attempting analysis  

## Next Steps (Future Enhancements)

- [ ] OAuth integration for seamless GitHub authentication
- [ ] Automatic token validation on server startup
- [ ] Retry logic with exponential backoff
- [ ] Cache access check results for better performance
- [ ] Support for GitHub Apps authentication

## Troubleshooting

### Issue: "401 Unauthorized" with token configured

**Check:**
1. Token is in `.env` in **root directory** (not `src/.env`)
2. Token format: `GITHUB_TOKEN=github_pat_...` (no quotes)
3. Server was restarted after adding token
4. Token has not expired

### Issue: "Unable to reach GitHub server"

**Check:**
1. Connected to eBay VPN
2. Can access `https://github.corp.ebay.com` in browser
3. Server is running on eBay network
4. Firewall/proxy settings allow GitHub access

### Issue: "Access forbidden" with valid token

**Check:**
1. Token has required permissions (`repo` or `public_repo`)
2. Not hitting GitHub API rate limits
3. Token belongs to user with repo access
4. Repository actually exists

## Support

For issues or questions:
- Check server logs for detailed error messages
- Verify `.env` configuration
- Test network connectivity
- Review token permissions in GitHub settings
