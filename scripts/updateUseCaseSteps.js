/**
 * Update Use Case Step References
 * 
 * Updates the use case step_ids to use the actual UUIDs from the steps table
 * instead of string slugs.
 */

import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Mapping of step slugs to their expected titles
const STEP_SLUG_TO_TITLE = {
  'verify-sso-ping': 'Verify SSO and Ping',
  'request-local-admin': 'Request Local Admin Access',
  'install-vscode': 'Install VS Code',
  'setup-github-personal': 'Setup GitHub Personal Account',
  'setup-github-copilot': 'Setup GitHub Copilot'
};

async function updateUseCaseSteps() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ai_dev_tools',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD
  });

  try {
    console.log('🔄 Updating use case step references...\n');

    // Get all use cases
    const useCasesResult = await pool.query('SELECT * FROM use_cases');
    console.log(`Found ${useCasesResult.rows.length} use case(s)\n`);

    for (const useCase of useCasesResult.rows) {
      console.log(`📋 Processing use case: ${useCase.title} (${useCase.id})`);
      
      if (!useCase.step_ids || useCase.step_ids.length === 0) {
        console.log('   ⚠️  No step_ids to update, skipping...\n');
        continue;
      }

      console.log(`   Current step_ids: ${JSON.stringify(useCase.step_ids)}`);

      // Convert step slugs/titles to UUIDs
      const updatedStepIds = [];
      
      for (const stepId of useCase.step_ids) {
        // Try to find the step by matching the slug in tags or by title
        let stepResult;
        
        // First, try to find by tag (slug)
        stepResult = await pool.query(
          'SELECT id, title FROM steps WHERE $1 = ANY(tags)',
          [stepId]
        );

        // If not found by tag, try to find by title (in case step_ids contains titles)
        if (stepResult.rows.length === 0) {
          const titleToMatch = STEP_SLUG_TO_TITLE[stepId] || stepId;
          stepResult = await pool.query(
            'SELECT id, title FROM steps WHERE title = $1',
            [titleToMatch]
          );
        }

        if (stepResult.rows.length > 0) {
          const step = stepResult.rows[0];
          updatedStepIds.push(step.id);
          console.log(`   ✓ Found step: "${step.title}" → ${step.id}`);
        } else {
          console.log(`   ⚠️  Step not found for: ${stepId}`);
        }
      }

      if (updatedStepIds.length > 0) {
        // Update the use case with UUID step references
        await pool.query(
          'UPDATE use_cases SET step_ids = $1, updated_at = NOW() WHERE id = $2',
          [updatedStepIds, useCase.id]
        );
        console.log(`   ✅ Updated use case with ${updatedStepIds.length} step UUID(s)\n`);
      } else {
        console.log(`   ❌ No steps matched, use case not updated\n`);
      }
    }

    console.log('✨ Use case update complete!');

    // Verify the updates
    const verifyResult = await pool.query('SELECT id, title, step_ids FROM use_cases');
    console.log('\n📊 Verification:');
    for (const uc of verifyResult.rows) {
      console.log(`\n${uc.title}:`);
      console.log(`  step_ids: ${JSON.stringify(uc.step_ids)}`);
      
      // Check if these are valid UUIDs
      if (uc.step_ids && uc.step_ids.length > 0) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const allUUIDs = uc.step_ids.every(id => uuidRegex.test(id));
        console.log(`  Valid UUIDs: ${allUUIDs ? '✓' : '✗'}`);
      }
    }

  } catch (error) {
    console.error('❌ Error updating use case steps:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the update script
updateUseCaseSteps()
  .then(() => {
    console.log('\n🎉 Update complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Update failed:', error);
    process.exit(1);
  });
