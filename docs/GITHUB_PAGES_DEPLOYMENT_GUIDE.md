# GitHub Pages Deployment & Rollback Guide

## ✅ YES - You Can Safely Revert GitHub Pages Deployments!

GitHub Pages deployments are stored in a separate `gh-pages` branch, making it easy to roll back if something breaks.

---

## Current Setup

Your project is configured to deploy to GitHub Pages:

- **Frontend URL**: `https://madschaaf.github.io/ai-dev-tools-demo/`
- **Deploy Command**: `npm run deploy:pages`
- **Target Branch**: `gh-pages` (on `githubDemo` remote)
- **Base Path**: `/ai-dev-tools-demo/` (configured in `vite.config.ts`)

**Important**: GitHub Pages only serves static files. Your backend (`src/server/`) will need separate hosting.

---

## Safe Deployment Workflow

### 1. Test Locally First
```bash
# Build the production version
npm run build

# Preview the production build locally
npm run preview
```

Visit `http://localhost:4173/ai-dev-tools-demo/` to test the built version.

### 2. Deploy to GitHub Pages
```bash
# This builds and deploys in one command
npm run deploy:pages
```

### 3. Verify Deployment
Visit: `https://madschaaf.github.io/ai-dev-tools-demo/`

---

## 🔄 Rollback Methods

### Method 1: Quick Rollback (Recommended)

If you just deployed and it broke, revert to the previous commit on `gh-pages`:

```bash
# Fetch the latest from gh-pages branch
git fetch githubDemo gh-pages

# Check out the gh-pages branch
git checkout gh-pages

# See recent deployments
git log --oneline -10

# Revert to the previous commit (one before the broken one)
git reset --hard HEAD~1

# Force push to restore the old version
git push githubDemo gh-pages --force

# Return to your main branch
git checkout main  # or master
```

**Timeline**: Takes effect in 1-2 minutes.

### Method 2: Redeploy a Known-Good Version

```bash
# Find the commit hash of a working version in your main branch
git log --oneline

# Check out that commit
git checkout <commit-hash>

# Deploy from that commit
npm run deploy:pages

# Return to your current branch
git checkout main  # or master
```

### Method 3: Deploy from a Specific Branch/Tag

```bash
# If you have a stable branch
git checkout stable-branch
npm run deploy:pages
git checkout main
```

---

## 🛡️ Safety Best Practices

### 1. Create a Deployment Tag Before Deploying

```bash
# Tag the current state before deploying
git tag -a deploy-$(date +%Y%m%d-%H%M) -m "Pre-deployment snapshot"
git push --tags

# Now deploy
npm run deploy:pages
```

If it breaks, you can easily return to this tagged version:
```bash
git checkout deploy-20260203-0945  # Use your tag name
npm run deploy:pages
git checkout main
```

### 2. Keep a Backup Branch

```bash
# Before deploying, create a backup
git branch backup-main

# If main gets messed up, restore it
git reset --hard backup-main
```

### 3. Use Environment-Specific Builds

Create separate build configurations:

```bash
# For GitHub Pages (static only)
npm run build:static

# For full-stack environments
npm run build:fullstack
```

---

## 📊 Check gh-pages Branch Status

```bash
# See what's on GitHub Pages
git fetch githubDemo gh-pages
git log githubDemo/gh-pages --oneline -5

# Compare with your main branch
git diff main githubDemo/gh-pages
```

---

## ⚠️ Common Issues & Solutions

### Issue: Site is blank/broken after deployment

**Causes**:
- Base path misconfiguration
- API calls failing (backend not accessible)
- Missing environment variables

**Solutions**:
1. Check browser console for errors
2. Verify `base: '/ai-dev-tools-demo/'` in `vite.config.ts`
3. Ensure API calls are configured for production backend URL

### Issue: Backend features don't work

**Expected**: GitHub Pages can't run Node.js/Express backend

**Solutions**:
1. Deploy backend to a separate service (Heroku, Railway, Render, etc.)
2. Update API endpoints in frontend to point to production backend
3. Configure CORS on backend to allow GitHub Pages domain

### Issue: Deployment takes long to update

**Normal**: GitHub Pages can take 1-2 minutes to reflect changes

**Check status**: Visit repository → Settings → Pages

---

## 🎯 Testing Deployment Without Breaking Production

### Option 1: Use a Different Branch for Testing

```bash
# Deploy to a different branch name
npx gh-pages -d dist -b gh-pages-test --remote githubDemo

# Access at: https://madschaaf.github.io/ai-dev-tools-demo/ 
# (but you'd need to configure GitHub Pages to use gh-pages-test branch)
```

### Option 2: Deploy to a Different Repository

```bash
# Create a test repository
# Then deploy there first
npx gh-pages -d dist --remote test-repo
```

---

## 🚀 Backend Deployment Options

Since GitHub Pages can't run your backend, consider these options:

### Free Options:
1. **Render** (recommended for Node.js)
   - Free tier available
   - Easy PostgreSQL integration
   - Auto-deploy from GitHub

2. **Railway**
   - Generous free tier
   - Simple setup

3. **Fly.io**
   - Free tier for small apps

### Paid Options:
1. **Heroku** ($5-7/month)
2. **DigitalOcean App Platform** ($5/month)
3. **AWS/GCP** (pay as you go)

---

## 📝 Complete Deployment Checklist

- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Create deployment tag: `git tag deploy-YYYYMMDD-HHMM`
- [ ] Note current working commit hash
- [ ] Deploy: `npm run deploy:pages`
- [ ] Wait 1-2 minutes for propagation
- [ ] Test live site thoroughly
- [ ] If broken, use rollback method above
- [ ] Document any issues for future reference

---

## 🆘 Emergency Rollback Script

Save this as `rollback.sh`:

```bash
#!/bin/bash
# Quick rollback script

echo "Rolling back GitHub Pages deployment..."
git fetch githubDemo gh-pages
git checkout gh-pages
git reset --hard HEAD~1
git push githubDemo gh-pages --force
git checkout main
echo "Rollback complete! Check https://madschaaf.github.io/ai-dev-tools-demo/"
```

Make executable: `chmod +x rollback.sh`

Run: `./rollback.sh`

---

## Summary

**Yes, you can absolutely revert!** 

1. GitHub Pages uses a separate `gh-pages` branch
2. You can rollback by reverting commits on that branch
3. Or redeploy from a known-good version
4. Changes take 1-2 minutes to propagate
5. Your main branch is never affected by GitHub Pages deployments

**Pro Tip**: Always tag before deploying so you have easy reference points to roll back to!
