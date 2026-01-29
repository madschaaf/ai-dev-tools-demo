# eBay AI Sandbox Integration - Complete Guide

## Overview

The AI Sandbox integration provides access to eBay's Core AI team managed capabilities directly within the Use Case submission form. This allows users to leverage powerful AI features for text processing, image generation, and content enhancement.

## Features Implemented

### ✅ Service Layer (`src/services/aiSandboxService.ts`)
Complete TypeScript service providing access to all AI Sandbox capabilities:

#### Text Capabilities
- **Machine Translation**: Translate text between languages (en, es, fr, de, zh)
- **Language Detection**: Automatically detect the language of input text
- **Item Title Rewrite**: Improve and optimize item titles for clarity
- **Aspect Prediction**: Predict product aspects based on title and category
- **Aspect Extraction**: Extract product aspects from titles
- **Description Summarization**: Condense long descriptions into concise summaries
- **Description Prefill**: Generate descriptions from titles and attributes

#### Image Capabilities
- **Text-to-Image (SDXL)**: Generate images from text prompts (preprod/production only)
- **Object Detection**: Detect and identify objects in images
- **Background Swap**: Replace image backgrounds (preprod only)

### ✅ UI Component (`src/components/AISandboxPanel.tsx`)
Reusable React component with:
- Tabbed interface for Text and Image capabilities
- Real-time environment indicator (staging/preprod/production)
- Loading states and error handling
- Result display with JSON formatting
- Callback support for generated content integration

### ✅ Integration (`src/pages/UseCasePrototype copy.tsx`)
Seamlessly integrated into the use case submission form:
- Toggle button to show/hide AI Sandbox panel
- Automatic population of form fields with AI-generated content
- Side-by-side with existing autofill functionality

## Setup Instructions

### 1. Environment Configuration

Add the following to your `.env` file:

```bash
# eBay AI Sandbox Configuration
# Environment: staging, preprod, or production
VITE_AI_SANDBOX_ENV=staging

# eBay Authentication Token (required for AI Sandbox)
# Get from: https://developer.ebay.com/my/keys
VITE_EBAY_AUTH_TOKEN=your_ebay_auth_token_here
```

### 2. Obtain eBay Authentication Token

1. Visit [eBay Developer Program](https://developer.ebay.com/my/keys)
2. Create or log in to your eBay developer account
3. Generate an OAuth token
4. Copy the token to your `.env` file

### 3. File an AI Intake Ticket (Production Only)

⚠️ **Important**: To use AI Sandbox capabilities in PRODUCTION, you must file an AI Intake ticket.

Visit the [AI Sandbox documentation](https://github.com/aisandbox) for more details.

## Usage Guide

### Basic Usage in UseCasePrototype copy.tsx

The AI Sandbox is already integrated. Users can:

1. **Click the "Show eBay AI Sandbox" button** in the AI Enhancement Tools section
2. **Select a capability** from the Text or Image tabs
3. **Input content** and click "Run AI Capability"
4. **Generated content automatically populates** the relevant form fields

### Programmatic Usage

You can also use the AI Sandbox service directly in your code:

```typescript
import aiSandboxService from '../services/aiSandboxService';

// Example: Machine Translation
const result = await aiSandboxService.machineTranslation({
  input: 'Hello, world!',
  sourceLanguage: 'en',
  targetLanguage: 'es'
});
console.log(result.output); // "¡Hola, mundo!"

// Example: Text-to-Image
const imageResult = await aiSandboxService.text2Image({
  promptKeywords: ['beach', 'sunset', 'ocean', 'waves']
});
console.log(imageResult.images[0]); // Base64 or URL of generated image

// Example: Language Detection
const langResult = await aiSandboxService.languageDetection(
  'Bonjour le monde'
);
console.log(langResult.language); // "fr"
```

### Using the AISandboxPanel Component

```typescript
import { AISandboxPanel } from '../components/AISandboxPanel';

function MyComponent() {
  const handleTextGenerated = (text: string) => {
    console.log('AI generated text:', text);
    // Do something with the text
  };

  const handleImageGenerated = (imageUrl: string) => {
    console.log('AI generated image:', imageUrl);
    // Do something with the image
  };

  return (
    <AISandboxPanel
      onTextGenerated={handleTextGenerated}
      onImageGenerated={handleImageGenerated}
    />
  );
}
```

## API Endpoints Reference

All endpoints follow the pattern:
```
{jarvis-endpoint}/jarvis/ai/{type}/{capability}/{version}
```

Where `{jarvis-endpoint}` depends on the environment:
- **Staging**: `https://jarvis-staging.ebay.com`
- **Preprod**: `https://jarvis-preprod.ebay.com`
- **Production**: `https://jarvis.ebay.com`

### Text Capabilities Endpoints

| Capability | Endpoint | Availability |
|-----------|----------|--------------|
| Machine Translation | `/jarvis/ai/text/machine-translation/v1` | Staging, Preprod, Production |
| Language Detection | `/jarvis/ai/text/language-detection/v1` | Staging, Preprod, Production |
| Item Title Rewrite | `/jarvis/ai/text/item-title-rewrite/v1` | Staging, Preprod, Production |
| Aspect Prediction | `/jarvis/ai/text/aspect-prediction/v1` | Staging, Preprod, Production |
| Aspect Extraction | `/jarvis/ai/text/aspect-extraction/v1` | Staging, Preprod, Production |
| Description Summarization | `/jarvis/ai/text/description-summarization/v1` | Staging, Preprod, Production |
| Description Prefill | `/jarvis/ai/text/description-prefill/v1` | Staging, Preprod, Production |

### Image Capabilities Endpoints

| Capability | Endpoint | Availability |
|-----------|----------|--------------|
| Text-to-Image (SDXL) | `/jarvis/ai/image/text2image/v1` | Preprod, Production |
| Object Detection | `/jarvis/ai/image/object-detection/v1-1` | Preprod, Production |
| Background Swap | `/jarvis/ai/image/background-swap/v1` | Preprod |

## Example Request/Response

### Machine Translation

**Request:**
```json
{
  "input": {
    "input": "hello",
    "context": {
      "mimeType": "text/plain",
      "sourceLanguage": "en",
      "targetLanguage": "es",
      "domain": "query"
    }
  }
}
```

**Response:**
```json
{
  "output": "hola",
  "confidence": 0.98
}
```

### Text-to-Image

**Request:**
```json
{
  "prompt_keywords": ["beach", "ocean", "waves", "sunset"],
  "n_prompt_keywords": [""],
  "scheduler": ["UniPCMultistep"],
  "steps": [20],
  "num_generated_images": [1],
  "cfg_scale": [5],
  "image_width": [1024],
  "image_height": [1024],
  "refiner_start": [0.8],
  "seed": ["12345"]
}
```

**Response:**
```json
{
  "images": ["base64_encoded_image_data"],
  "generation_time": 5.2
}
```

## Error Handling

The service includes comprehensive error handling:

```typescript
try {
  const result = await aiSandboxService.machineTranslation({
    input: 'test',
    sourceLanguage: 'en',
    targetLanguage: 'es'
  });
} catch (error) {
  if (error instanceof Error) {
    console.error('Translation failed:', error.message);
    // Handle specific error scenarios
  }
}
```

Common error scenarios:
- **401 Unauthorized**: Invalid or missing authentication token
- **429 Rate Limited**: Too many requests, implement retry logic
- **500 Server Error**: AI Sandbox service issue, retry with exponential backoff
- **Network Error**: Connection issues, check network connectivity

## Best Practices

### 1. Environment Management
- Use **staging** for development and testing
- Use **preprod** for pre-production validation
- Only use **production** after filing an AI Intake ticket

### 2. Token Security
- Never commit `.env` file with actual tokens
- Use environment-specific tokens
- Rotate tokens regularly
- Store tokens securely in production environments

### 3. Performance Optimization
- Cache translation results for frequently used phrases
- Implement request debouncing for user input
- Use lazy loading for the AI Sandbox panel
- Compress large image payloads

### 4. User Experience
- Show loading indicators during API calls
- Provide clear error messages
- Allow users to retry failed operations
- Validate input before sending to API

## Troubleshooting

### Issue: "Authentication failed"
**Solution**: Verify your `VITE_EBAY_AUTH_TOKEN` is correctly set in `.env`

### Issue: "Capability not available"
**Solution**: Check the availability table - some features are only available in specific environments

### Issue: "Rate limit exceeded"
**Solution**: Implement exponential backoff retry logic or reduce request frequency

### Issue: Images not generating
**Solution**: Text-to-Image is only available in preprod/production - switch your environment

### Issue: "CORS error"
**Solution**: Ensure you're making requests from an authorized domain or use a proxy

## Development Workflow

1. **Start in Staging**:
   ```bash
   # Set in .env
   VITE_AI_SANDBOX_ENV=staging
   ```

2. **Test Capabilities**:
   - Test all text capabilities
   - Verify error handling
   - Test UI integration

3. **Move to Preprod**:
   ```bash
   # Set in .env
   VITE_AI_SANDBOX_ENV=preprod
   ```

4. **Test Image Capabilities**:
   - Test text-to-image generation
   - Test object detection
   - Test background swap

5. **Production Deployment**:
   - File AI Intake ticket
   - Await approval
   - Update environment to production
   - Deploy with production token

## Additional Resources

- [AI Sandbox GitHub Documentation](https://github.com/aisandbox)
- [eBay Developer Program](https://developer.ebay.com)
- [AI Intake Ticket Process](https://github.com/aisandbox#production-access)
- [MCP Server Integration Guide](./MCP_SERVER_INTEGRATION.md)

## Support

For issues or questions:
1. Check the [AI Sandbox documentation](https://github.com/aisandbox)
2. Review the troubleshooting section above
3. Contact the Core AI team for production access
4. File issues in the appropriate repository

## Version History

- **v1.0.0** (2026-01-29): Initial implementation
  - Complete service layer with all AI Sandbox capabilities
  - Reusable UI component with tab interface
  - Integration with Use Case submission form
  - Comprehensive error handling
  - Environment-based configuration
