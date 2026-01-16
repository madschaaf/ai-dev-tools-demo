# GitHub Autofill Setup Guide

## Problem
The AI Autofill feature was unable to read repository files because the backend server lacked authentication for GitHub's API.

## Solution
The backend now supports GitHub authentication using Personal Access Tokens (PAT).

## Setup Steps

### 1. Generate a GitHub Personal Access Token

#### For eBay Enterprise GitHub:
1. Navigate to: https://github.corp.ebay.com/settings/tokens
2. Click "Generate new token" (classic)
3. Give it a descriptive name (e.g., "AI Dev Tools Autofill")
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - OR `public_repo` (if only accessing public repos)
5. Click "Generate token"
6. **Copy the token immediately** (you won't be able to see it again)

#### For Public GitHub:
1. Navigate to: https://github.com/settings/tokens
2. Follow same steps as above

### 2. Configure Environment Variables

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your token:**
   ```bash
   # GitHub Integration
   GITHUB_TOKEN=your_github_token_here
   GITHUB_API_URL=https://github.corp.ebay.com/api/v3
   ```

   Replace `your_github_token_here` with the token you generated.

3. **Save the file**

### 3. Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Verification

### Test the Autofill Feature:
1. Navigate to the Use Cases page
2. Click "Create New Use Case"
3. Click "AI Autofill" button
4. Enter a GitHub repository URL (e.g., `https://github.corp.ebay.com/madschaaf/ai-use-case-extension`)
5. Click "Analyze Link"

### Expected Behavior:
- ✅ README content should be extracted
- ✅ package.json dependencies should be detected
- ✅ IDE and coding language should be auto-detected
- ✅ Repository structure should be analyzed

### Console Output:
You should see detailed logs like:
```
📦 [AUTOFILL] Repository info: { owner: 'madschaaf', repo: 'ai-use-case-extension', isEnterprise: true }
📄 [AUTOFILL] Files fetched: { hasReadme: true, hasPackageJson: true, treeSize: 150 }
🔍 [ANALYZE] Analyzing 150 files
✅ [ANALYZE] Detected IDE: VS Code
✅ [ANALYZE] Detected language: TypeScript
```

## Troubleshooting

### Issue: "No GITHUB_TOKEN found in environment variables"
**Solution:** Make sure you created the `.env` file and added the token.

### Issue: "Failed to fetch repository tree: 401 Unauthorized"
**Solution:** 
- Verify your token is correct
- Check that the token has the required scopes (`repo` or `public_repo`)
- For enterprise GitHub, verify the `GITHUB_API_URL` is correct

### Issue: "Failed to fetch repository tree: 404 Not Found"
**Solution:**
- Verify the repository exists and you have access to it
- Check the repository URL is formatted correctly

## Security Notes

⚠️ **Important:**
- Never commit your `.env` file to git (it's already in `.gitignore`)
- Never share your Personal Access Token
- Treat the token like a password
- Revoke and regenerate tokens periodically for security

## Technical Details

The autofill feature now:
1. Reads the `GITHUB_TOKEN` from environment variables
2. Adds `Authorization: Bearer <token>` header to all GitHub API requests
3. Uses the configured `GITHUB_API_URL` for enterprise GitHub
4. Provides detailed error logging for debugging

## Next Steps

Once configured, the AI Autofill feature will be able to:
- Read README.md files from repositories
- Parse package.json and extract dependencies
- Analyze repository structure (file tree)
- Auto-detect IDE, programming language, and frameworks
- Generate implementation steps based on repository content
- Populate use case forms automatically

Enjoy the enhanced autofill experience! 🚀
