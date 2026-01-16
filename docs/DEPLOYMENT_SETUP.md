# Deployment Setup Guide

## Overview

This guide covers setting up the AI Dev Tools application for both local development and production deployment to eBay Cloud.

## Local Development Setup

### Quick Start

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd ai-dev-tools
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm start
   # or separately:
   npm run dev    # Frontend only
   npm run server # Backend only
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Local Development Notes

- ✅ **No eBay Cloud App Name needed** for local development
- ✅ The app runs with basic functionality
- ✅ eBay platform modules have limited functionality
- ✅ Perfect for frontend development and testing

## Production Deployment to eBay Cloud

### Prerequisites

Before deploying to eBay Cloud, you need:

1. **eBay Cloud Account Access**
   - Access to https://cloud.ebay.com
   - Permissions to create applications

2. **Required Dependencies**
   ```bash
   npm install @ebay/app-context-ebay --save
   ```

### Step 1: Register Your Application

1. **Visit eBay Cloud Portal**
   - Go to https://cloud.ebay.com
   - Log in with your eBay credentials

2. **Create New Application**
   - Click "Create Application" or similar
   - Fill in application details:
     - **Name**: `ai-dev-tools` (or your preferred name)
     - **Description**: AI Development Tools and Resources Platform
     - **Business Unit**: Your business unit
     - **Owner**: Your email/team

3. **Copy Your App Name**
   - After registration, you'll receive an **App Name** (e.g., `ai-dev-tools`)
   - Save this - you'll need it for configuration

### Step 2: Configure Environment Variables

1. **Create `.env` file** (local production testing)
   ```bash
   cp .env.example .env
   ```

2. **Set Environment Variables**
   ```bash
   # .env
   NODE_ENV=production
   PORT=3000
   EBAY_CLOUD_APP_NAME=ai-dev-tools  # Your actual app name from Step 1
   ```

3. **For Cloud Deployment** (set in eBay Cloud dashboard)
   ```
   EBAY_CLOUD_APP_NAME=<your-app-name>
   NODE_ENV=production
   PORT=8080
   ```

### Step 3: Test App Context Locally

1. **Install App Context** (if not already installed)
   ```bash
   npm install @ebay/app-context-ebay --save
   ```

2. **Set Environment Variable**
   ```bash
   export EBAY_CLOUD_APP_NAME=ai-dev-tools
   # or on Windows:
   set EBAY_CLOUD_APP_NAME=ai-dev-tools
   ```

3. **Run Server**
   ```bash
   npm run server
   ```

4. **Check Health Endpoint**
   ```bash
   curl http://localhost:3000/api/health
   ```
   
   **Expected Response:**
   ```json
   {
     "status": "healthy",
     "appContext": {
       "isConfigured": true,
       "appName": "ai-dev-tools",
       "environment": "production",
       "hasAppContextModule": true
     },
     "timestamp": "2026-01-15T16:00:00.000Z"
   }
   ```

### Step 4: Build for Production

```bash
# Build frontend
npm run build

# The build output will be in /dist
```

### Step 5: Deploy to eBay Cloud

Follow your team's specific eBay Cloud deployment process. Typically:

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "Production deployment setup"
   git push origin main
   ```

2. **Configure Cloud Pipeline**
   - Set environment variables in cloud dashboard
   - Configure build commands: `npm run build`
   - Set start command: `npm run server` (or your team's standard)

3. **Deploy**
   - Follow your CI/CD pipeline process
   - Or use eBay Cloud's deployment interface

## Verification Checklist

### Local Development ✅
- [ ] App runs without EBAY_CLOUD_APP_NAME
- [ ] Frontend accessible at localhost:5173
- [ ] Backend API accessible at localhost:3000
- [ ] No app context warnings are acceptable

### Production Deployment ✅
- [ ] eBay Cloud app registered
- [ ] EBAY_CLOUD_APP_NAME environment variable set
- [ ] @ebay/app-context-ebay installed
- [ ] Health endpoint shows `isConfigured: true`
- [ ] Build completes successfully
- [ ] App deployed to eBay Cloud

## Troubleshooting

### Issue: "app-context-ebay not found"

**Cause**: Optional dependency not installed  
**Solution**: This is normal for local development. To fix:
```bash
npm install @ebay/app-context-ebay
```

### Issue: "EBAY_CLOUD_APP_NAME is not set"

**Cause**: Environment variable missing  
**Solution**:
1. Local dev: This is OK, app works with reduced functionality
2. Production: Set the environment variable:
   ```bash
   export EBAY_CLOUD_APP_NAME=your-app-name
   ```

### Issue: App Context shows as not configured

**Check the health endpoint**:
```bash
curl http://localhost:3000/api/health
```

Review the `appContext` object:
- `hasAppContextModule`: Should be `true` if installed
- `appName`: Should show your app name
- `isConfigured`: Should be `true` for production

## Architecture Notes

### App Context Configuration

The app uses a flexible configuration system in `src/server/config/appContext.ts`:

1. **Development Mode**: Runs without app context
2. **Production Mode**: Requires app context and app name
3. **Graceful Degradation**: Falls back safely if configuration is missing

### Security Considerations

- Never commit `.env` file with real credentials
- Use environment variables for all sensitive configuration
- App name is not sensitive but should match your eBay Cloud registration

## Next Steps

After deployment:

1. **Database Setup**: Follow `docs/USE_CASE_DATABASE_SCHEMA.md`
2. **Authentication**: Implement user authentication
3. **Monitoring**: Set up logging and monitoring
4. **CDN**: Configure for static assets if needed

## Support

For eBay Cloud support:
- **Portal**: https://cloud.ebay.com
- **Documentation**: Check your team's internal docs
- **Slack**: #cloud-support (or your team's channel)

For application issues:
- Check the health endpoint: `/api/health`
- Review server logs
- Contact your team lead
