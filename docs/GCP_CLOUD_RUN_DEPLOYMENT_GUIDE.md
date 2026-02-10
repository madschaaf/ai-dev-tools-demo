# GCP Cloud Run + Cloud SQL Deployment Guide
## eBay Internal Deployment Path

## ✅ YES - Cloud Run Has the BEST Rollback Options!

Cloud Run keeps ALL previous revisions and lets you instantly route traffic to any version. This is enterprise-grade deployment with superior rollback capabilities.

---

## Why Cloud Run is Perfect for eBay

✅ **eBay's standard deployment path** - widely used internally  
✅ **Superior rollback** - instant traffic routing to any revision  
✅ **Zero-downtime deployments** - gradual rollout with traffic splitting  
✅ **Auto-scaling** - scales to zero when not in use (cost-effective)  
✅ **Internal subdomain** - `app.ebaypsa.com` via Cloud Armor  
✅ **Cloud SQL integration** - managed PostgreSQL/MySQL  
✅ **eBay security controls** - Cloud Armor, VPC, IAM  
✅ **Container-based** - consistent across environments  

---

## Architecture Overview

```
User Request
    ↓
Cloud Armor (Security)
    ↓
GCP Load Balancer
    ↓
Cloud Run Service (app.ebaypsa.com)
    ↓
Cloud SQL (PostgreSQL)
```

---

## Prerequisites

### 1. eBay GCP Access
Ensure you have:
- [ ] GCP project access for eBay
- [ ] Cloud Run permissions
- [ ] Cloud SQL permissions
- [ ] IAM roles configured
- [ ] gcloud CLI installed and authenticated

### 2. Install Required Tools

```bash
# Google Cloud SDK (gcloud)
brew install --cask google-cloud-sdk

# Authenticate with eBay GCP
gcloud auth login
gcloud config set project YOUR-EBAY-PROJECT-ID

# Docker (for building containers)
brew install docker
```

---

## Setup Process

### Step 1: Prepare Your Application

#### Create Dockerfile

Create `Dockerfile` in your project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src
COPY public ./public
COPY index.html ./

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port (Cloud Run will set PORT env var)
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "dist/server/index.js"]
```

#### Create .dockerignore

Create `.dockerignore`:

```
node_modules
.git
.env
.env.local
dist
*.log
.DS_Store
.vscode
coverage
.cache
```

#### Update Server for Cloud Run

Update `src/server/index.ts` to use PORT from environment:

```typescript
import path from 'path';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080; // Cloud Run sets PORT

// Serve static files
app.use(express.static(path.join(__dirname, '../../dist')));

// API routes
app.use('/api', apiRoutes);

// Health check endpoint (required for Cloud Run)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.REVISION || 'unknown'
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 2: Create Cloud SQL Instance

```bash
# Create Cloud SQL PostgreSQL instance
gcloud sql instances create ai-dev-tools-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-west1 \
  --root-password=YOUR_SECURE_PASSWORD

# Create database
gcloud sql databases create ai_dev_tools \
  --instance=ai-dev-tools-db

# Create database user
gcloud sql users create app_user \
  --instance=ai-dev-tools-db \
  --password=YOUR_SECURE_PASSWORD
```

For production, use appropriate tier (not f1-micro).

### Step 3: Build and Push Container

```bash
# Set variables
export PROJECT_ID=your-ebay-project-id
export SERVICE_NAME=ai-dev-tools
export REGION=us-west1

# Configure Docker for GCP
gcloud auth configure-docker

# Build container
docker build -t gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest .

# Push to Google Container Registry
docker push gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest
```

### Step 4: Deploy to Cloud Run

```bash
# Deploy with Cloud SQL connection
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --add-cloudsql-instances=YOUR_PROJECT:${REGION}:ai-dev-tools-db \
  --set-env-vars="NODE_ENV=production" \
  --set-env-vars="DATABASE_URL=postgresql://app_user:password@/ai_dev_tools?host=/cloudsql/YOUR_PROJECT:${REGION}:ai-dev-tools-db" \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10
```

### Step 5: Configure Custom Domain (app.ebaypsa.com)

```bash
# Map custom domain
gcloud run domain-mappings create \
  --service ${SERVICE_NAME} \
  --domain app.ebaypsa.com \
  --region ${REGION}

# Update DNS records as instructed by the command output
```

Work with eBay's network team to:
1. Set up Cloud Armor security policies
2. Configure GCP load balancer
3. Route `app.ebaypsa.com` through the load balancer
4. Apply internal-only access restrictions

---

## 🔄 Rollback Options (Cloud Run's Superpower!)

### Method 1: Instant Traffic Rollback (Fastest)

Cloud Run keeps ALL previous revisions. Rollback is instant:

```bash
# List all revisions
gcloud run revisions list --service ${SERVICE_NAME} --region ${REGION}

# Route 100% traffic to a specific revision
gcloud run services update-traffic ${SERVICE_NAME} \
  --to-revisions=ai-dev-tools-00042-xyz=100 \
  --region ${REGION}
```

**Timeline**: Instant (< 5 seconds)

### Method 2: Via Cloud Console (No CLI)

1. Go to Cloud Run → Select your service
2. Click **"Revisions"** tab
3. Find the working revision
4. Click **"⋮"** → **"Manage Traffic"**
5. Set 100% to that revision
6. Click **"Save"**

**Timeline**: ~10 seconds

### Method 3: Gradual Rollback (Safest)

Split traffic to test:

```bash
# Route 90% to old (safe) version, 10% to new (test)
gcloud run services update-traffic ${SERVICE_NAME} \
  --to-revisions=ai-dev-tools-00042-xyz=90,ai-dev-tools-00043-abc=10 \
  --region ${REGION}

# Monitor logs, if good, gradually increase new version
# If bad, revert to 100% old version
```

### Method 4: Tag-Based Rollback

Tag revisions for easy reference:

```bash
# Tag current production
gcloud run services update-traffic ${SERVICE_NAME} \
  --update-tags=production=ai-dev-tools-00042-xyz \
  --region ${REGION}

# Later, rollback to production tag
gcloud run services update-traffic ${SERVICE_NAME} \
  --to-tags=production=100 \
  --region ${REGION}
```

---

## 🚀 Deployment Automation

### Create Deployment Script

Save as `deploy.sh`:

```bash
#!/bin/bash
set -e

# Configuration
export PROJECT_ID="your-ebay-project-id"
export SERVICE_NAME="ai-dev-tools"
export REGION="us-west1"
export IMAGE_TAG=$(git rev-parse --short HEAD)

echo "🚀 Deploying ai-dev-tools to Cloud Run..."
echo "📦 Image tag: ${IMAGE_TAG}"

# Build and push
echo "🏗️  Building Docker image..."
docker build -t gcr.io/${PROJECT_ID}/${SERVICE_NAME}:${IMAGE_TAG} .
docker tag gcr.io/${PROJECT_ID}/${SERVICE_NAME}:${IMAGE_TAG} \
  gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest

echo "📤 Pushing to Container Registry..."
docker push gcr.io/${PROJECT_ID}/${SERVICE_NAME}:${IMAGE_TAG}
docker push gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest

# Deploy to Cloud Run
echo "☁️  Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME}:${IMAGE_TAG} \
  --platform managed \
  --region ${REGION} \
  --tag=${IMAGE_TAG}

echo "✅ Deployment complete!"
echo "🔗 URL: https://app.ebaypsa.com"
echo "📊 Revision: $(gcloud run revisions list --service ${SERVICE_NAME} --region ${REGION} --limit=1 --format='value(name)')"
```

Make executable:
```bash
chmod +x deploy.sh
```

### Create Rollback Script

Save as `rollback.sh`:

```bash
#!/bin/bash
set -e

export SERVICE_NAME="ai-dev-tools"
export REGION="us-west1"

echo "🔄 Available revisions:"
gcloud run revisions list --service ${SERVICE_NAME} --region ${REGION} \
  --format="table(name,status,trafficPercent)"

echo ""
read -p "Enter revision name to rollback to: " REVISION_NAME

echo "⏪ Rolling back to ${REVISION_NAME}..."
gcloud run services update-traffic ${SERVICE_NAME} \
  --to-revisions=${REVISION_NAME}=100 \
  --region ${REGION}

echo "✅ Rollback complete!"
echo "🔗 URL: https://app.ebaypsa.com"
```

Make executable:
```bash
chmod +x rollback.sh
```

---

## 📊 Monitoring & Observability

### View Logs

```bash
# Stream live logs
gcloud run services logs tail ${SERVICE_NAME} --region ${REGION}

# View logs in Cloud Console
# Go to Cloud Run → Service → Logs tab
```

### Set Up Alerts

Create alerting policy in Cloud Console:
1. Go to **Monitoring** → **Alerting**
2. Create policy for:
   - High error rate (>5% 5xx responses)
   - High latency (>1s p95)
   - Low request rate (potential downtime)

### Cloud Run Metrics

View in Cloud Console:
- Request count
- Request latency
- Container instance count
- CPU utilization
- Memory utilization

---

## 🔒 Security Configuration

### Cloud Armor Setup

Work with eBay security team to configure:

```bash
# Create security policy
gcloud compute security-policies create ai-dev-tools-policy \
  --description "Security policy for ai-dev-tools"

# Add rule for internal IP ranges only
gcloud compute security-policies rules create 1000 \
  --security-policy ai-dev-tools-policy \
  --expression "origin.region_code == 'US'" \
  --action "allow"

# Default deny
gcloud compute security-policies rules create 2147483647 \
  --security-policy ai-dev-tools-policy \
  --action "deny-403"
```

### Environment Variables Security

Store secrets in Secret Manager:

```bash
# Create secret
echo -n "your-api-key" | gcloud secrets create openai-api-key --data-file=-

# Grant Cloud Run access
gcloud secrets add-iam-policy-binding openai-api-key \
  --member="serviceAccount:YOUR-SERVICE-ACCOUNT" \
  --role="roles/secretmanager.secretAccessor"

# Deploy with secret
gcloud run deploy ${SERVICE_NAME} \
  --update-secrets=OPENAI_API_KEY=openai-api-key:latest
```

---

## 💰 Cost Optimization

### Cloud Run Pricing

Free tier includes:
- 2 million requests/month
- 360,000 GB-seconds memory
- 180,000 vCPU-seconds

Beyond that:
- $0.00002400 per request
- $0.00000250 per GB-second
- $0.00001000 per vCPU-second

### Cost-Saving Tips

1. **Set min-instances to 0**: Scale to zero when not used
2. **Right-size resources**: Don't over-allocate memory/CPU
3. **Use Cloud SQL shared-core**: For development/staging
4. **Enable request timeout**: Prevent runaway requests

```bash
# Deploy with cost optimization
gcloud run deploy ${SERVICE_NAME} \
  --min-instances=0 \
  --max-instances=10 \
  --memory=512Mi \
  --cpu=1 \
  --timeout=60s
```

---

## 🎯 CI/CD Integration

### Cloud Build Setup

Create `cloudbuild.yaml`:

```yaml
steps:
  # Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args: 
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/ai-dev-tools:$SHORT_SHA'
      - '-t'
      - 'gcr.io/$PROJECT_ID/ai-dev-tools:latest'
      - '.'
  
  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/ai-dev-tools:$SHORT_SHA'
  
  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'ai-dev-tools'
      - '--image=gcr.io/$PROJECT_ID/ai-dev-tools:$SHORT_SHA'
      - '--region=us-west1'
      - '--platform=managed'

images:
  - 'gcr.io/$PROJECT_ID/ai-dev-tools:$SHORT_SHA'
  - 'gcr.io/$PROJECT_ID/ai-dev-tools:latest'
```

### Set Up Build Trigger

```bash
# Create trigger for main branch
gcloud builds triggers create github \
  --repo-name=ai-dev-tools-demo \
  --repo-owner=madschaaf \
  --branch-pattern=^main$ \
  --build-config=cloudbuild.yaml
```

Now every push to `main` automatically deploys!

---

## 🧪 Testing Strategy

### Local Testing

```bash
# Build locally
docker build -t ai-dev-tools:local .

# Run locally
docker run -p 8080:8080 \
  -e NODE_ENV=production \
  -e DATABASE_URL=your-local-db-url \
  ai-dev-tools:local

# Test
curl http://localhost:8080/health
```

### Staging Environment

Deploy to separate staging service:

```bash
gcloud run deploy ai-dev-tools-staging \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME}:${IMAGE_TAG} \
  --region ${REGION}
```

Test thoroughly before promoting to production.

---

## ⚠️ Common Issues & Solutions

### Issue: Container fails to start

**Check logs**:
```bash
gcloud run services logs tail ${SERVICE_NAME} --region ${REGION}
```

**Common causes**:
- Missing PORT environment variable
- Database connection failure
- Missing environment variables

**Solution**: Verify all env vars are set correctly

### Issue: Cloud SQL connection fails

**Check**:
```bash
# Verify Cloud SQL instance is running
gcloud sql instances describe ai-dev-tools-db

# Test connection
gcloud sql connect ai-dev-tools-db --user=app_user
```

**Solution**: Ensure Cloud SQL instance name in connection string matches exactly

### Issue: Custom domain not working

**Steps**:
1. Verify DNS records are correct
2. Check domain mapping status
3. Ensure Cloud Armor and load balancer are configured
4. Contact eBay network team for internal routing

---

## 📝 Complete Deployment Checklist

### Initial Setup
- [ ] GCP access configured
- [ ] gcloud CLI installed and authenticated
- [ ] Docker installed
- [ ] Cloud SQL instance created
- [ ] Database and user created
- [ ] Dockerfile created
- [ ] .dockerignore created
- [ ] Health endpoint added to server

### Each Deployment
- [ ] Test locally with Docker
- [ ] Build and push container
- [ ] Deploy to staging (if available)
- [ ] Test staging thoroughly
- [ ] Deploy to production
- [ ] Verify health endpoint
- [ ] Monitor logs for errors
- [ ] Test critical user flows
- [ ] Document deployment revision

### If Deployment Breaks
- [ ] Check Cloud Run logs
- [ ] Identify problematic revision
- [ ] Use instant rollback to previous revision
- [ ] Fix issues locally
- [ ] Test fix with Docker
- [ ] Redeploy when ready

---

## Summary

**Cloud Run + Cloud SQL is eBay's enterprise deployment standard with the best rollback capabilities:**

1. ✅ **Instant rollback** - route to any previous revision in <5 seconds
2. ✅ **All revisions kept** - complete deployment history
3. ✅ **Traffic splitting** - test new versions safely with gradual rollout
4. ✅ **Zero downtime** - new version only receives traffic when healthy
5. ✅ **Enterprise security** - Cloud Armor, VPC, IAM integration
6. ✅ **Internal domain** - app.ebaypsa.com with load balancer
7. ✅ **Auto-scaling** - cost-effective, scales to zero
8. ✅ **Complete observability** - logs, metrics, traces

**Rollback Comparison:**
- **GitHub Pages**: Manual git commands, 1-2 min propagation
- **Render**: One-click dashboard rollback, 1-2 min deployment
- **Cloud Run**: Instant traffic routing, <5 sec rollback ⭐

This is the best option for eBay internal deployment with superior rollback capabilities!
