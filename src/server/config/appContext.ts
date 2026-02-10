/**
 * eBay App Context Configuration
 * 
 * This module configures the eBay cloud application context required for
 * certain eBay platform modules like @ebay/chomsky-client.
 * 
 * For local development, the app context is optional and uses a fallback.
 * For production deployment, set the EBAY_CLOUD_APP_NAME environment variable.
 */

// AppContext is optional - only needed for production eBay deployments
let AppContext: any = null;

/**
 * Initialize eBay App Context
 * 
 * Environment Variables:
 * - EBAY_CLOUD_APP_NAME: Your eBay cloud application name (required for production)
 * - NODE_ENV: Environment mode (development/production)
 * 
 * Usage:
 * 1. Local Development: No configuration needed - runs without app context
 * 2. Production: Set EBAY_CLOUD_APP_NAME environment variable
 */
export function initializeAppContext(): void {
  const cloudAppName = process.env.EBAY_CLOUD_APP_NAME;
  const environment = process.env.NODE_ENV || 'development';

  if (AppContext && cloudAppName) {
    // Production: Use provided cloud app name
    AppContext.appName = cloudAppName;
    console.log(`✅ eBay App Context initialized: ${cloudAppName}`);
  } else if (AppContext && !cloudAppName) {
    // App context available but no app name set
    console.warn(`
⚠️  eBay App Context Warning:
   @ebay/app-context-ebay is installed but EBAY_CLOUD_APP_NAME is not set.
   
   To configure for production:
   1. Register your app in eBay Cloud: https://cloud.ebay.com
   2. Set environment variable: EBAY_CLOUD_APP_NAME=<your-app-name>
   
   Current mode: ${environment}
    `);
  } else {
    // Local development without app context
    console.log(`
ℹ️  Running in local development mode
   eBay platform modules requiring app context may have limited functionality.
   
   To enable eBay cloud features:
   1. Install: npm install @ebay/app-context-ebay
   2. Register app at: https://cloud.ebay.com
   3. Set: EBAY_CLOUD_APP_NAME=<your-app-name>
    `);
  }
}

/**
 * Check if app context is properly configured
 */
export function isAppContextConfigured(): boolean {
  return !!(AppContext && process.env.EBAY_CLOUD_APP_NAME);
}

/**
 * Get current app context configuration
 */
export function getAppContextInfo() {
  return {
    isConfigured: isAppContextConfigured(),
    appName: process.env.EBAY_CLOUD_APP_NAME || null,
    environment: process.env.NODE_ENV || 'development',
    hasAppContextModule: !!AppContext
  };
}
