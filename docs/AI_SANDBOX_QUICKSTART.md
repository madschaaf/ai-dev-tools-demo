# AI Sandbox Integration - Quick Start Guide

## What Was Implemented

✅ **Complete AI Sandbox integration** for the Use Case submission form with:
- Full TypeScript service layer for all AI capabilities
- Reusable UI component with tabbed interface
- Seamless form integration
- Comprehensive documentation

## Files Created/Modified

### New Files
1. **`src/services/aiSandboxService.ts`** - Complete AI Sandbox service layer
2. **`src/components/AISandboxPanel.tsx`** - Reusable UI component
3. **`docs/AI_SANDBOX_INTEGRATION.md`** - Full documentation

### Modified Files
1. **`src/pages/UseCasePrototype copy.tsx`** - Integrated AI Sandbox panel
2. **`.env.example`** - Added AI Sandbox configuration

## Quick Setup (3 Steps)

### 1. Configure Environment
Copy `.env.example` to `.env` and add your eBay authentication token:

```bash
cp .env.example .env
```

Edit `.env`:
```bash
VITE_AI_SANDBOX_ENV=staging
VITE_EBAY_AUTH_TOKEN=your_token_here
```

### 2. Get Your Token
Visit [eBay Developer Program](https://developer.ebay.com/my/keys) to obtain your OAuth token.

### 3. Start Using
The AI Sandbox is already integrated! Just:
1. Open UseCasePrototype copy.tsx
2. Click "Show eBay AI Sandbox"
3. Select a capability and run it
4. Generated content automatically populates form fields

## Available AI Capabilities

### Text Processing (All Environments)
- 🌐 Machine Translation (en ↔ es, fr, de, zh)
- 🔍 Language Detection
- ✨ Title Rewrite & Optimization
- 📝 Description Summarization
- 🏷️ Aspect Prediction & Extraction

### Image Generation (Preprod/Production)
- 🖼️ Text-to-Image (SDXL)
- 👁️ Object Detection
- 🎨 Background Swap

## Example Usage

### In the UI
```typescript
// Already integrated in UseCasePrototype copy.tsx
// Just click the button and use the interface!
```

### Programmatically
```typescript
import aiSandboxService from '../services/aiSandboxService';

// Translate text
const result = await aiSandboxService.machineTranslation({
  input: 'Hello',
  sourceLanguage: 'en',
  targetLanguage: 'es'
});
// result.output: "Hola"

// Generate image
const image = await aiSandboxService.text2Image({
  promptKeywords: ['sunset', 'beach', 'ocean']
});
// image.images[0]: base64 image data
```

## Important Notes

⚠️ **Production Access**: File an AI Intake ticket before using in production  
📚 **Full Documentation**: See `docs/AI_SANDBOX_INTEGRATION.md`  
🔒 **Security**: Never commit `.env` with real tokens  
🌍 **Environments**: Start with staging, move to preprod for images, then production

## Next Steps

1. **Test in Staging**: Try all text capabilities
2. **Test in Preprod**: Try image generation features
3. **Review Docs**: Read full documentation for advanced usage
4. **File Ticket**: When ready for production access

## Need Help?

- 📖 Read: `docs/AI_SANDBOX_INTEGRATION.md`
- 🐛 Issues: Check troubleshooting section in main docs
- 🚀 Production: [File AI Intake ticket](https://github.com/aisandbox)

---

**That's it!** You're ready to use eBay's AI Sandbox capabilities in your use case form. 🎉
