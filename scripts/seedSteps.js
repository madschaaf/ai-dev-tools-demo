/**
 * Seed Script - Populate Steps Table with Pre-configured Steps
 * 
 * This script reads steps from stepsData.ts and inserts them into the database.
 * Run with: node scripts/seedSteps.js
 */

import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Import step data - Note: In production, you'd want to properly transpile TypeScript
// For now, we'll manually define the steps that are in use cases
const STEPS_TO_SEED = [
  {
    id: 'verify-sso-ping',
    title: 'Verify SSO and Ping',
    brief_description: 'Confirm your security credentials are working properly. Test SSO login, PingID multi-factor authentication, and YubiKey hardware authentication.',
    category: 'security',
    detailed_content: [
      { id: 'intro', type: 'text', text: 'Before you can download and access eBay tools, you need to confirm your security credentials are working properly.' },
      { id: 'sso-heading', type: 'heading', text: 'Verify SSO (Single Sign-On)', level: 2 },
      { id: 'sso-steps', type: 'list', items: ['Test Token Access Portal: Sign in to Token Access Portal (TAP) with your corp credentials', 'If you can open "My Account" and view your tokens, SSO is working', 'Additional check: Sign in to Hub Services (IT support portal) using your corp SSO'] },
      { id: 'pingid-heading', type: 'heading', text: 'Verify PingID', level: 2 },
      { id: 'pingid-steps', type: 'list', items: ['In TAP, open PingID and check "My Account" to see your registered devices', 'Confirm which device is set as "Primary"', 'Trigger a PingID challenge by signing into any app that requires MFA', 'Approve the push notification in the PingID app'] },
      { id: 'yubikey-heading', type: 'heading', text: 'Verify YubiKey', level: 2 },
      { id: 'yubikey-steps', type: 'list', items: ['Connect to the corporate network or VPN', 'Go to auth.vip.ebay.com', 'Use the "Validate" or test function', 'Enter your YubiKey PIN and press the key', 'Successful validation confirms your key is registered'] },
      { id: 'issues-callout', type: 'callout', variant: 'warning', text: 'Common Issues:\n• New hires may need to register YubiKey first\n• Manage PingID devices in TAP\n• YubiKey validation requires corporate network/VPN' }
    ]
  },
  {
    id: 'request-local-admin',
    title: 'Request Local Admin Access',
    brief_description: 'Submit ticket for local administrator rights on your machine. Required for installing development tools and dependencies.',
    category: 'admin',
    detailed_content: [
      { id: 'intro', type: 'text', text: 'Local administrator rights allow you to install software and configure your development environment.' },
      { id: 'why-heading', type: 'heading', text: 'Why You Need This', level: 2 },
      { id: 'why-list', type: 'list', items: ['Install development tools (IDEs, runtimes, etc.)', 'Configure system settings', 'Install dependencies and packages', 'Manage development servers'] },
      { id: 'request-heading', type: 'heading', text: 'How to Request', level: 2 },
      { id: 'request-steps', type: 'list', items: ['Go to Employee Service Center', 'Submit "Local Admin Access" request', 'Provide business justification', 'Include your manager\'s approval', 'Wait for IT to grant access (1-3 business days)'] },
      { id: 'after-heading', type: 'heading', text: 'After Approval', level: 2 },
      { id: 'after-steps', type: 'list', items: ['Restart your computer', 'Verify admin rights by attempting to install software', 'Contact IT if you have issues'] }
    ]
  },
  {
    id: 'install-vscode',
    title: 'Install VS Code',
    brief_description: 'Download and install Visual Studio Code from code.visualstudio.com. Configure user settings and workspace preferences.',
    category: 'install',
    detailed_content: [
      { id: 'intro', type: 'text', text: 'Visual Studio Code is a popular code editor with extensive extension support.' },
      { id: 'install-heading', type: 'heading', text: 'Installation', level: 2 },
      { id: 'install-steps', type: 'list', items: ['Download from code.visualstudio.com', 'Run the installer', 'Select options: Add to PATH, Create desktop icon, Register as default editor', 'Complete installation'] },
      { id: 'config-heading', type: 'heading', text: 'Initial Configuration', level: 2 },
      { id: 'config-list', type: 'list', items: ['Set up your theme and font', 'Install essential extensions', 'Configure settings.json', 'Set up keyboard shortcuts'] },
      { id: 'extensions-heading', type: 'heading', text: 'Recommended Extensions', level: 2 },
      { id: 'extensions-list', type: 'list', items: ['ESLint', 'Prettier', 'GitLens', 'GitHub Copilot'] }
    ]
  },
  {
    id: 'setup-github-personal',
    title: 'Setup GitHub Personal Account',
    brief_description: 'Create or verify your GitHub personal account. Configure 2FA and SSH keys for secure authentication.',
    category: 'setup',
    detailed_content: [
      { id: 'intro', type: 'text', text: 'A GitHub personal account is needed for open source contributions and personal projects.' },
      { id: 'create-heading', type: 'heading', text: 'Create Account', level: 2 },
      { id: 'create-steps', type: 'list', items: ['Go to github.com', 'Sign up with your personal email', 'Verify your email address', 'Complete profile setup'] },
      { id: 'security-heading', type: 'heading', text: 'Security Setup', level: 2 },
      { id: 'security-list', type: 'list', items: ['Enable Two-Factor Authentication (2FA)', 'Generate SSH keys', 'Add SSH key to GitHub', 'Test SSH connection'] },
      { id: 'ssh-heading', type: 'heading', text: 'SSH Key Generation', level: 2 },
      { id: 'ssh-code', type: 'code', language: 'bash', text: 'ssh-keygen -t ed25519 -C "your_email@example.com"\neval "$(ssh-agent -s)"\nssh-add ~/.ssh/id_ed25519' },
      { id: 'add-heading', type: 'heading', text: 'Add to GitHub', level: 2 },
      { id: 'add-steps', type: 'list', items: ['Copy public key: cat ~/.ssh/id_ed25519.pub', 'Go to GitHub Settings → SSH Keys', 'Add new SSH key', 'Test: ssh -T git@github.com'] }
    ]
  },
  {
    id: 'setup-github-copilot',
    title: 'Setup GitHub Copilot',
    brief_description: 'Install GitHub Copilot extension in your IDE. Sign in with your GitHub account and verify Copilot is active.',
    category: 'setup',
    detailed_content: [
      { id: 'intro', type: 'text', text: 'GitHub Copilot provides AI-powered code suggestions in your editor.' },
      { id: 'install-heading', type: 'heading', text: 'Installation in VS Code', level: 2 },
      { id: 'install-steps', type: 'list', items: ['Open VS Code Extensions', 'Search for "GitHub Copilot"', 'Click Install', 'Sign in with GitHub account', 'Authorize Copilot'] },
      { id: 'activate-heading', type: 'heading', text: 'Activation', level: 2 },
      { id: 'activate-list', type: 'list', items: ['Verify license in GitHub settings', 'Check Copilot status in IDE', 'Test with a code file', 'Configure preferences'] },
      { id: 'usage-heading', type: 'heading', text: 'Usage Tips', level: 2 },
      { id: 'usage-list', type: 'list', items: ['Use comments to guide suggestions', 'Accept/reject suggestions with Tab/Esc', 'Use Copilot Chat for questions', 'Learn keyboard shortcuts'] }
    ]
  }
];

async function seedSteps() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ai_dev_tools',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD
  });

  try {
    console.log('🌱 Starting step seeding...\n');

    for (const step of STEPS_TO_SEED) {
      console.log(`📝 Seeding step: ${step.title} (${step.id})`);

      // Check if step already exists by title (since we'll use auto-generated UUIDs)
      const existingStep = await pool.query(
        'SELECT id FROM steps WHERE title = $1',
        [step.title]
      );

      if (existingStep.rows.length > 0) {
        console.log(`   ⚠️  Step already exists, skipping...`);
        console.log(`   📍 Existing UUID: ${existingStep.rows[0].id}\n`);
        continue;
      }

      // Insert the step (let PostgreSQL generate UUID)
      // Also store the human-readable ID in tags for reference
      const result = await pool.query(
        `INSERT INTO steps (
          title, brief_description, category, detailed_content, tags,
          status, created_by, last_modified, modified_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8)
        RETURNING id`,
        [
          step.title,
          step.brief_description,
          step.category,
          JSON.stringify(step.detailed_content),
          [step.id], // Store the slug as a tag for lookup
          'approved',  // Auto-approve pre-configured steps
          'system',    // Created by system
          'system'     // Modified by system
        ]
      );

      const generatedId = result.rows[0].id;
      console.log(`   ✅ Step seeded successfully!`);
      console.log(`   📍 Generated UUID: ${generatedId}`);
      console.log(`   🏷️  Slug (in tags): ${step.id}\n`);
    }

    console.log('✨ All steps seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   Total steps processed: ${STEPS_TO_SEED.length}`);

    // Verify the steps are in the database
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM steps WHERE status = $1',
      ['approved']
    );
    console.log(`   Approved steps in database: ${result.rows[0].count}`);

  } catch (error) {
    console.error('❌ Error seeding steps:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seed script
seedSteps()
  .then(() => {
    console.log('\n🎉 Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  });
