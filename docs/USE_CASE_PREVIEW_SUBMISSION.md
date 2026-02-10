# Use Case Preview & Submission Feature

## Overview

This feature allows users to preview their use case submission in a clean, PDF-like format before final submission. The preview shows all entered information in an easy-to-read layout, and users can then choose to submit for approval or return to editing.

## User Flow

1. User fills out the use case prototype form
2. User clicks "Submit Use Case" button
3. **Preview Mode** displays a formatted preview of all entered information
4. User reviews the preview and can:
   - Click "Back to Editing" to return to the form and make changes
   - Click "Submit for Approval" to finalize and save the submission

## Implementation Details

### Frontend (src/pages/UseCasePrototype.tsx)

#### State Management
- `showPreview`: Boolean state to toggle between form mode and preview mode
- All existing form state is used to populate the preview

#### Preview Layout
The preview mode displays:
- **Header**: Title and subtitle with eBay blue branding
- **General Information**: Name, lead, team members, overview, thumbnail
- **Project Configuration**: Business unit, coding language, IDE, tools, related links
- **Setup Steps**: Auto-generated or custom steps (if Global Technology)
- **Additional Information**: Technical details, data requirements, implementation steps, categories, estimated time, media, search tags

#### Preview Styling
- Clean, professional PDF-like appearance
- Serif font (Georgia) for readability
- Section headers with blue accent color (#0064d2)
- Proper spacing and visual hierarchy
- Tagged items shown as pills/badges
- Bordered sections with subtle shadows

#### Action Buttons
Two prominent buttons at the bottom:
- **Back to Editing**: Returns to form mode without data loss
- **Submit for Approval**: Calls the API to save the use case

### Backend (src/server/routes/useCases.ts)

#### API Endpoints

**POST /api/use-cases**
- Accepts use case data from frontend
- Generates unique ID for submission
- Sets status to "submitted"
- Adds timestamps (createdAt, updatedAt, submittedAt)
- Saves to JSON file storage
- Returns success response with submission details

**GET /api/use-cases**
- Retrieves all use cases from storage
- Returns array of use case objects

**GET /api/use-cases/:id**
- Retrieves specific use case by ID
- Returns 404 if not found

**PUT /api/use-cases/:id**
- Updates existing use case (for draft functionality)
- Updates the updatedAt timestamp

#### Data Storage

Currently using file-based storage (`src/server/data/use-cases.json`):
- Simple JSON file storage for development
- Easy to migrate to database later
- Data directory is gitignored to prevent committing user submissions
- Directory structure automatically created on first use

#### Data Structure

```json
{
  "id": "use-case-1234567890-abc123",
  "name": "My Use Case",
  "isAnonymous": false,
  "leadName": "John Doe",
  "teamMembers": ["Jane Smith", "Bob Johnson"],
  "thumbnail": "data:image/png;base64,...",
  "briefOverview": "Overview text...",
  "businessUnit": "Global Technology",
  "isForDevelopers": true,
  "codingLanguage": "JavaScript",
  "ide": "VS Code",
  "isIdeAlsoAiTool": false,
  "toolsAndTechnologies": ["GitHub Copilot", "ChatGPT"],
  "relatedLinks": [
    { "name": "Link Name", "url": "https://..." }
  ],
  "generatedSteps": [
    {
      "stepId": "verify-sso-ping",
      "title": "Verify SSO Access",
      "description": "...",
      "orderIndex": 0,
      "category": "access",
      "isCustom": false,
      "comment": null
    }
  ],
  "technicalDetails": "Technical implementation details...",
  "dataRequirements": "Data requirements...",
  "implementationSteps": "Implementation steps...",
  "categories": ["AI Tools", "Development"],
  "estimatedTime": "2-3 weeks",
  "mediaLinks": [],
  "searchTags": ["ai", "development"],
  "status": "submitted",
  "createdAt": "2026-01-22T20:00:00.000Z",
  "updatedAt": "2026-01-22T20:00:00.000Z",
  "submittedAt": "2026-01-22T20:00:00.000Z"
}
```

### Server Integration (src/server/index.ts)

Added use case routes:
```typescript
import useCaseRoutes from './routes/useCases.ts'
app.use('/api/use-cases', useCaseRoutes)
```

## Features

### ✅ Implemented
- PDF-like preview layout
- Complete data display in organized sections
- Two-step submission process (preview → confirm)
- Backend API for saving submissions
- File-based storage system
- Success/error handling with user feedback
- Automatic ID generation for submissions
- Status tracking ("draft", "submitted", "approved", "published")
- Timestamp tracking

### 🔄 Future Enhancements
- Save as draft functionality
- Database migration (PostgreSQL recommended per schema)
- PDF export of preview
- Email notifications on submission
- Admin approval workflow
- Edit submitted use cases (before approval)
- Delete/archive use cases
- User authentication integration
- File upload for thumbnails (currently base64)
- Rich text editing for long-form fields
- Form validation before preview
- Submission history tracking

## Database Migration Path

The current file-based storage can be easily migrated to a database:

1. Implement database schema from `docs/USE_CASE_DATABASE_SCHEMA.md`
2. Replace file I/O operations in `src/server/routes/useCases.ts` with database queries
3. Keep the same API endpoints and response structure
4. Add database connection configuration
5. Implement proper user authentication
6. Add relational data (team members, categories, tools as separate tables)

## Testing

### Manual Testing Steps

1. **Form Submission**:
   - Fill out use case form with various field combinations
   - Click "Submit Use Case"
   - Verify preview shows all entered data correctly

2. **Preview Display**:
   - Check that all sections render properly
   - Verify formatting is clean and professional
   - Test with long text fields
   - Test with many items (tags, links, team members)

3. **Back to Editing**:
   - Click "Back to Editing"
   - Verify all form data is preserved
   - Make changes and preview again

4. **Final Submission**:
   - Click "Submit for Approval"
   - Verify success message appears with submission ID
   - Check `src/server/data/use-cases.json` file created
   - Verify data structure matches expected format

5. **API Testing**:
   - Test POST /api/use-cases with various data
   - Test GET /api/use-cases to retrieve submissions
   - Test GET /api/use-cases/:id for specific submission
   - Verify error handling for invalid requests

## Deployment Considerations

### Development
- Server runs on `http://localhost:3000`
- Frontend makes API calls to localhost
- Data stored in `src/server/data/` directory

### Production
- Update API endpoint URL in frontend (use environment variable)
- Set up proper CORS configuration
- Implement authentication/authorization
- Migrate to production database
- Set up file storage for thumbnails (S3, etc.)
- Add rate limiting
- Implement proper error logging
- Set up monitoring and analytics

## Security Notes

- Input validation needed for all fields
- Sanitize user input before storage
- Implement authentication before allowing submissions
- Add CSRF protection
- Rate limit API endpoints
- Validate file uploads (thumbnails)
- Encrypt sensitive data if needed
- Add audit logging for submissions

## Performance Optimization

- Lazy load preview mode components
- Compress large text fields
- Optimize image handling (thumbnail resizing)
- Add pagination to GET all use cases
- Implement caching for frequently accessed data
- Use database indexing for searches (when migrated)

## Troubleshooting

### Preview doesn't show all data
- Check browser console for errors
- Verify all state values are populated
- Check for conditional rendering logic

### Submission fails
- Verify server is running on port 3000
- Check network tab for API request/response
- Review server logs for errors
- Ensure data directory has write permissions

### Data not persisting
- Check `src/server/data/` directory exists
- Verify no file permission issues
- Check server logs for file I/O errors

## Related Documentation

- [Use Case Database Schema](./USE_CASE_DATABASE_SCHEMA.md)
- [AI Autofill Feature](./AI_AUTOFILL_FEATURE.md)
- [Dynamic Steps Implementation](./DYNAMIC_STEPS_IMPLEMENTATION.md)
