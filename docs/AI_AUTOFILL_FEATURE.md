# AI Autofill Feature Documentation

## Overview

The AI Autofill feature allows users to automatically populate use case forms by providing either:
- **GitHub Repository URLs** (Enterprise or public)
- **Confluence Wiki Page URLs**
- **Documentation Files** (README, .md, .txt, .pdf, .docx)

The system uses MCP (Model Context Protocol) servers to intelligently extract information and pre-fill form fields.

## Features

### 🤖 Smart Content Extraction
- Analyzes GitHub repositories for project details, dependencies, and README content
- Extracts documentation from Confluence wiki pages
- Parses uploaded files for relevant information
- Intelligently categorizes and tags content

### 🎯 Flexible Fill Options
When AI extracts content, users can choose how to apply it:
- **Overwrite All**: Replace all existing content with AI suggestions
- **Keep Both**: Add AI suggestions below existing content in each field
- **Fill Empty Only**: Only populate fields that are currently empty
- **Cancel**: Discard AI suggestions and keep current form state

### 🔒 Security & Validation
- URL validation before processing
- Only supports authorized MCP sources
- File type verification
- Error handling and graceful degradation

## Supported Sources

### 1. GitHub Enterprise / GitHub.com
**Pattern**: `https://github.corp.ebay.com/owner/repository` or `https://github.com/owner/repository`

**What AI Extracts**:
- Repository name and description
- README content
- Package.json dependencies (for npm projects)
- Requirements.txt (for Python projects)
- Project categories and tags

**Example**:
```
https://github.corp.ebay.com/madschaaf/ai-use-case-extension
```

### 2. Confluence Wiki
**Pattern**: `https://confluence.*.ebay.com/.../pages/[pageId]`

**What AI Extracts**:
- Page title and content
- Technical specifications
- Implementation details
- Related links and attachments

**Example**:
```
https://confluence.corp.ebay.com/display/SPACE/Page+Title
```

### 3. File Uploads
**Supported Formats**: `.md`, `.txt`, `.pdf`, `.docx`, `README`

**What AI Extracts**:
- Document title
- Section headings and content
- Technical details and specifications
- Lists and structured information

## User Interface Flow

### Step 1: Open AI Autofill Component
The AI Autofill Assistant appears at the top of the use case form with a blue highlighted box.

### Step 2: Provide Source
**Option A: Paste a Link**
1. Click in the link input field
2. Paste your GitHub or Confluence URL
3. System validates the URL in real-time
4. Green checkmark appears for valid sources

**Option B: Upload a File**
1. Click the file upload area
2. Select a README, documentation, or project file
3. File details appear (name, size)
4. Ready for AI analysis

### Step 3: Trigger AI Analysis
1. Click "Autofill Form with AI" button
2. System shows "Analyzing with AI..." spinner
3. Processing typically takes 2-5 seconds

### Step 4: Choose Fill Strategy
A modal appears with preview statistics:
- **Fields to Fill**: Total fields AI can populate
- **With Content**: Fields you've already filled
- **Empty Fields**: Blank fields available

Select your preferred option:
- ✨ **Fill Empty Only** (safest, recommended if you've started the form)
- 📝 **Keep Both** (recommended to review AI suggestions)
- 🔄 **Overwrite All** (start fresh with AI content)
- ❌ **Cancel** (discard AI suggestions)

### Step 5: Review & Submit
- Form fields are populated based on your choice
- Review all AI-generated content
- Edit any fields as needed
- Submit when satisfied

## Technical Implementation

### Frontend Components

#### AIAutofillUpload.tsx
- Main upload and link validation component
- Real-time URL validation
- File handling
- API communication

#### AIAutofillModal.tsx
- User choice modal for fill strategies
- Statistics display
- Option selection UI

### Backend API

#### POST /api/autofill/analyze-link
Analyzes a provided URL (GitHub or Confluence)

**Request**:
```json
{
  "url": "https://github.corp.ebay.com/owner/repo"
}
```

**Response**:
```json
{
  "useCaseName": "Extracted Project Name",
  "briefOverview": "Project description...",
  "technicalDetails": "Technical specifications...",
  "categories": ["Development", "AI"],
  "aiTools": ["GitHub Copilot", "ChatGPT"],
  "searchTags": ["tag1", "tag2"]
}
```

#### POST /api/autofill/analyze-file
Analyzes an uploaded documentation file

**Request**: `multipart/form-data` with file

**Response**: Same structure as analyze-link

### MCP Integration

The backend uses configured MCP servers:

**git-server** (GitHub Enterprise):
```typescript
// Fetch repository content
mcp__git-server__github_content
```

**wiki-server** (Confluence):
```typescript
// Fetch wiki page content
mcp__wiki-server__get_page_by_id
```

## Configuration

### MCP Server Setup
Ensure MCP servers are configured in `.mcp/config.json`:

```json
{
  "mcpServers": {
    "git-server": {
      "command": "node",
      "args": ["/path/to/git-server/build/index.js"]
    },
    "wiki-server": {
      "command": "node",
      "args": ["/path/to/wiki-server/build/index.js"]
    }
  }
}
```

### Environment Variables
Required for MCP authentication:
```bash
# GitHub Enterprise Token
GITHUB_ENTERPRISE_TOKEN=your_token_here

# Confluence Credentials
CONFLUENCE_API_TOKEN=your_token_here
```

## Best Practices

### For Users

1. **Start with Links**: URLs provide the most comprehensive data
2. **Review AI Content**: Always review auto-filled content before submitting
3. **Use "Keep Both"**: Recommended when you've already started filling the form
4. **Edit After Autofill**: AI suggestions are a starting point, refine as needed

### For Developers

1. **Error Handling**: Always handle MCP server failures gracefully
2. **Validation**: Validate extracted content before applying to form
3. **Token Management**: Use compression for large content
4. **User Feedback**: Provide clear progress indicators during analysis

## Troubleshooting

### URL Not Recognized
- Ensure URL matches supported patterns
- Check for typos in the URL
- Verify you have access to the resource

### Analysis Fails
- Check MCP server connectivity
- Verify authentication tokens are valid
- Review network connectivity
- Check backend logs for detailed errors

### Slow Processing
- Large repositories may take longer
- Complex wiki pages require more time
- Consider using file upload for faster processing

### Fields Not Populated
- Review modal choice - "Empty Only" won't overwrite existing content
- Check that source contains relevant information
- Manually fill any missing fields

## Future Enhancements

- [ ] Support for JIRA tickets as autofill sources
- [ ] Multi-language content detection
- [ ] Dependency graph visualization
- [ ] AI-powered category suggestions
- [ ] Version history tracking for autofilled forms
- [ ] Batch processing for multiple sources

## Examples

### Example 1: GitHub Repository
```
URL: https://github.corp.ebay.com/ai-tools/chatbot-project
Result:
  - Use Case Name: "Chatbot Project"
  - Overview: Extracted from README
  - AI Tools: ["OpenAI API", "LangChain"]
  - Categories: ["Customer Service", "AI"]
```

### Example 2: Confluence Page
```
URL: https://confluence.corp.ebay.com/display/AI/ML+Pipeline
Result:
  - Use Case Name: "ML Pipeline"
  - Technical Details: Extracted from wiki content
  - Implementation Steps: Listed from page sections
```

### Example 3: README File
```
File: PROJECT_README.md
Result:
  - Use Case Name: "Project Name" (from # heading)
  - Overview: Content under "Overview" section
  - Technical Details: Content under "Technical" section
```

## Support

For issues or questions:
- Report bugs via GitHub Issues
- Contact AI Academy team
- Check MCP server documentation
- Review API logs for detailed error messages

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Maintained By**: AI Tools Team
