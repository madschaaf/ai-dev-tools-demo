# Render Full-Stack Deployment Guide

## ✅ YES - Render Has Even Better Rollback Options!

Render provides built-in rollback functionality and maintains your deployment history automatically.

---

## Why Render is Better for Your Full-Stack App

✅ **Hosts both frontend AND backend** in one place  
✅ **PostgreSQL database** included (free tier available)  
✅ **Automatic deployments** from GitHub  
✅ **Built-in rollback** - revert to any previous deployment with one click  
✅ **Environment variables** management  
✅ **Free SSL certificates** (HTTPS)  
✅ **No separate hosting** needed for backend  

---

## Setup Process

### 1. Prepare Your Repository

Your app is already configured correctly! You have:
- ✅ `src/server/index.ts` - Express backend
- ✅ `package.json` with build scripts
- ✅ PostgreSQL database setup
- ✅ React frontend

### 2. Create Render Account

1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### 3. Create a Web Service

#### Option A: From Dashboard (Recommended)
1. Click **"New +"** → **"Web Service"**
2. Connect your `ai-dev-tools-demo` repository
3. Configure settings:

```yaml
Name: ai-dev-tools
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: (leave blank)
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm run server
```

#### Option B: Use render.yaml (Infrastructure as Code)

Create `render.yaml` in your project root:

```yaml
services:
  - type: web
    name: ai-dev-tools
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm run server
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: ai-dev-tools-db
          property: connectionString
      - key: PORT
        value: 10000

databases:
  - name: ai-dev-tools-db
    databaseName: ai_dev_tools
    user: ai_dev_tools_user
    plan: free
```

Then:
1. Go to **"New +"** → **"Blueprint"**
2. Select your repository
3. Render will auto-detect `render.yaml`

### 4. Add PostgreSQL Database

1. Click **"New +"** → **"PostgreSQL"**
2. Settings:
   - Name: `ai-dev-tools-db`
   - Database: `ai_dev_tools`
   - User: `ai_dev_tools_user`
   - Region: Same as your web service
   - Plan: **Free** (sufficient for development)

3. Click **"Create Database"**

### 5. Connect Database to Web Service

1. Go to your web service → **"Environment"** tab
2. Add environment variable:
   - Key: `DATABASE_URL`
   - Value: Select your database from dropdown

### 6. Add Other Environment Variables

Required variables from your `.env`:

```bash
NODE_ENV=production
PORT=10000
DATABASE_URL=(auto-filled from database)

# Add any API keys you need:
OPENAI_API_KEY=your-key-here
# etc...
```

### 7. Deploy!

1. Click **"Create Web Service"** or commit `render.yaml`
2. Render will automatically:
   - Install dependencies
   - Build your app
   - Start the server
   - Assign you a URL: `https://ai-dev-tools.onrender.com`

---

## 🔄 Rollback Options on Render

### Method 1: One-Click Rollback (Easiest)

1. Go to your web service dashboard
2. Click **"Deploys"** tab
3. Find a previous successful deployment
4. Click **"Rollback to this version"**
5. Done! Takes 1-2 minutes

**This is the main advantage of Render - instant rollback without git commands!**

### Method 2: Redeploy from Specific Commit

1. Go to **"Manual Deploy"**
2. Select a specific commit hash
3. Click **"Deploy"**

### Method 3: Git-Based Rollback

```bash
# Revert your main branch
git revert HEAD

# Push to trigger auto-deployment
git push origin main
```

---

## 🛡️ Zero-Downtime Deployment Strategy

### Blue-Green Deployment Pattern

Render supports creating multiple services:

1. **Production**: `ai-dev-tools` (main service)
2. **Staging**: `ai-dev-tools-staging` (test environment)

Workflow:
```
1. Deploy to staging first
2. Test thoroughly
3. If good, deploy to production
4. If bad, staging is isolated - no impact
```

### Setup Staging Environment

1. Create new web service: `ai-dev-tools-staging`
2. Connect to same repo but different branch: `staging`
3. Use separate database or database branch
4. Test deployments here first

---

## 📊 Monitoring Deployment Health

### Render Dashboard

Monitor in real-time:
- **Logs**: Live server logs
- **Metrics**: CPU, memory, bandwidth
- **Deploy Status**: Build/deploy progress
- **Health Checks**: Automatic endpoint monitoring

### Setup Health Check Endpoint

Add to your backend:

```typescript
// src/server/index.ts
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

Configure in Render:
1. Go to **"Settings"** → **"Health Check Path"**
2. Set to `/health`
3. Render will monitor this endpoint

---

## 🚀 Automatic Deployments

### Enable Auto-Deploy

✅ **Already enabled by default!**

When you push to `main`:
1. Render detects the push
2. Automatically builds
3. Runs tests (if configured)
4. Deploys if successful
5. Keeps old version running until new one is healthy

### Disable Auto-Deploy (Manual Control)

1. Go to **"Settings"**
2. Toggle off **"Auto-Deploy"**
3. Now you manually trigger with **"Manual Deploy"** button

---

## ⚠️ Common Issues & Solutions

### Issue: Build Fails

**Check Build Logs**:
1. Go to **"Events"** tab
2. Click on failed build
3. Review error messages

**Common fixes**:
```bash
# Missing dependencies
Build Command: npm ci && npm run build

# TypeScript errors
Build Command: npm install && npm run build --if-present

# Memory issues (upgrade plan or optimize build)
```

### Issue: App Crashes on Start

**Check Runtime Logs**:
1. Go to **"Logs"** tab
2. Look for error stack traces

**Common fixes**:
```bash
# Wrong start command
Start Command: node dist/server/index.js

# Missing environment variables
# Add them in Environment tab

# Database connection issues
# Verify DATABASE_URL is set correctly
```

### Issue: Database Connection Fails

**Solutions**:
1. Check `DATABASE_URL` is set correctly
2. Verify database is in same region
3. Check database is running (not suspended)
4. Review connection pool settings

### Issue: Static Files Not Serving

**Solution**: Update your Express server to serve built frontend:

```typescript
// src/server/index.ts
import path from 'path';
import express from 'express';

const app = express();

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, '../../dist')));

// API routes
app.use('/api', apiRoutes);

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
```

---

## 💰 Pricing Tiers

### Free Tier (Great for Development)
- ✅ 750 hours/month (enough for 1 always-on service)
- ✅ 512 MB RAM
- ✅ Spins down after 15 min inactivity
- ✅ Free PostgreSQL database (90 days retention)
- ✅ Free SSL
- ✅ Custom domain support

**Limitations**:
- ⚠️ Spin-down causes ~30s cold start
- ⚠️ Database expires after 90 days (upgrade to keep)

### Starter Plan ($7/month per service)
- ✅ Always on (no spin-down)
- ✅ Faster performance
- ✅ Persistent database
- ✅ More resources

### Professional Plan ($25/month)
- ✅ Even more resources
- ✅ Priority support
- ✅ Advanced features

---

## 📝 Complete Deployment Checklist

### Initial Setup
- [ ] Create Render account and connect GitHub
- [ ] Create PostgreSQL database
- [ ] Create web service
- [ ] Configure environment variables
- [ ] Set up health check endpoint
- [ ] Deploy and verify

### Before Each Deployment
- [ ] Test locally: `npm run build && npm run server`
- [ ] Review changes in git history
- [ ] Deploy to staging environment first (if available)
- [ ] Test staging thoroughly
- [ ] Monitor Render build logs
- [ ] Check health check endpoint
- [ ] Review production logs after deployment

### If Deployment Breaks
- [ ] Check Render logs for errors
- [ ] Use one-click rollback to previous version
- [ ] Fix issues locally
- [ ] Test fix thoroughly
- [ ] Redeploy

---

## 🔧 Recommended Package.json Scripts

Update your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "server": "node dist/server/index.js",
    "start": "npm run server",
    "preview": "vite preview",
    
    "render:setup": "npm ci && npm run build",
    "render:start": "npm run server",
    
    "local:fullstack": "concurrently \"vite\" \"ts-node src/server/index.ts\""
  }
}
```

For Render, use:
- **Build Command**: `npm run render:setup`
- **Start Command**: `npm run render:start`

---

## 🎯 Migration from GitHub Pages to Render

If you've already deployed to GitHub Pages:

### Update Frontend Base Path

In `vite.config.ts`:

```typescript
export default defineConfig({
  // For Render: Use root path
  base: '/',  // Changed from '/ai-dev-tools-demo/'
  
  plugins: [react()],
  
  // Remove proxy - backend is same server on Render
  // server: { proxy: { ... } }  // DELETE THIS
})
```

### Update API Calls

In production, frontend and backend are same domain:

```typescript
// Before (for localhost development)
const API_URL = 'http://localhost:3000/api';

// After (for Render - same domain)
const API_URL = '/api';  // Relative path works!
```

Or use environment detection:

```typescript
const API_URL = import.meta.env.PROD 
  ? '/api'  // Production (Render)
  : 'http://localhost:3000/api';  // Development
```

---

## 🆘 Emergency Procedures

### Complete Service Down

1. **Immediate**: Click **"Suspend Auto-Deploy"**
2. **Rollback**: Use one-click rollback to last known good version
3. **Investigate**: Check logs for root cause
4. **Fix**: Make changes locally, test thoroughly
5. **Deploy**: When ready, enable auto-deploy and push fix

### Database Corruption

1. **Backup**: Render auto-backs up (check **"Backups"** tab)
2. **Restore**: Click restore on recent backup
3. **Verify**: Test database connection and data integrity

### Need to Start Fresh

1. **Delete Service**: Settings → Danger Zone → Delete Service
2. **Keep Database**: Don't delete unless necessary
3. **Recreate Service**: Follow setup steps again
4. **Reconnect Database**: Use existing database

---

## 🎓 Best Practices

### 1. Use Environment Variables for Secrets
Never commit API keys - use Render's Environment tab

### 2. Enable Health Checks
Render will restart your service if unhealthy

### 3. Monitor Logs Regularly
Catch issues before users report them

### 4. Test Locally Before Deploying
Run `npm run build && npm run server` to simulate production

### 5. Use Staging Environment
Test major changes in staging before production

### 6. Keep Dependencies Updated
Run `npm update` regularly, test, then deploy

### 7. Document Environment Variables
Keep a list of required vars in `.env.example`

---

## Summary

**Render is perfect for your full-stack app because:**

1. ✅ **Hosts everything** - frontend, backend, database
2. ✅ **One-click rollback** - easier than GitHub Pages
3. ✅ **Automatic deployments** - push to deploy
4. ✅ **Free tier available** - start with $0/month
5. ✅ **Built-in monitoring** - logs, metrics, health checks
6. ✅ **No splitting** - no need for separate frontend/backend hosting

**Rollback is even easier than GitHub Pages:**
- GitHub Pages: Need to use git commands
- Render: Click "Rollback to this version" button

You get a complete platform with better rollback options and full-stack support!
