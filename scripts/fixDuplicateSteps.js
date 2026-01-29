#!/usr/bin/env node

/**
 * Migration Script: Fix Duplicate Steps in Use Cases
 * 
 * This script identifies and fixes duplicate preconfigured steps that were
 * created instead of referencing existing steps in the Steps Library.
 * 
 * What it does:
 * 1. Finds all duplicate steps (same title as preconfigured steps but different UUIDs)
 * 2. Maps duplicates to their original preconfigured steps
 * 3. Updates use cases to reference original steps
 * 4. Deletes duplicate steps
 * 
 * Usage: node scripts/fixDuplicateSteps.js [--dry-run]
 */

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ai_dev_tools',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

const isDryRun = process.argv.includes('--dry-run');

async function findDuplicateSteps() {
  console.log('\n🔍 Step 1: Finding duplicate steps...\n');
  
  const query = `
    SELECT 
      s1.id as duplicate_id,
      s1.title,
      s1.created_by as duplicate_creator,
      s1.created_at as duplicate_created,
      s2.id as original_id,
      s2.created_by as original_creator,
      s2.created_at as original_created,
      s2.status as original_status
    FROM steps s1
    INNER JOIN steps s2 ON s1.title = s2.title
    WHERE s1.id != s2.id
      AND s2.created_by = 'AI Team'
      AND s1.created_by != 'AI Team'
      AND s2.status = 'approved'
    ORDER BY s1.title, s1.created_at;
  `;
  
  const result = await pool.query(query);
  
  if (result.rows.length === 0) {
    console.log('✅ No duplicate steps found!');
    return [];
  }
  
  console.log(`Found ${result.rows.length} duplicate step(s):\n`);
  result.rows.forEach((row, index) => {
    console.log(`${index + 1}. "${row.title}"`);
    console.log(`   Duplicate ID: ${row.duplicate_id} (created by ${row.duplicate_creator})`);
    console.log(`   Original ID:  ${row.original_id} (created by ${row.original_creator})`);
    console.log('');
  });
  
  return result.rows;
}

async function getAffectedUseCases(duplicateStepIds) {
  console.log('\n🔍 Step 2: Finding affected use cases...\n');
  
  const query = `
    SELECT 
      id,
      title,
      status,
      step_ids
    FROM use_cases
    WHERE step_ids && $1
    ORDER BY title;
  `;
  
  const result = await pool.query(query, [duplicateStepIds]);
  
  if (result.rows.length === 0) {
    console.log('ℹ️  No use cases affected by duplicate steps.');
    return [];
  }
  
  console.log(`Found ${result.rows.length} affected use case(s):\n`);
  result.rows.forEach((row, index) => {
    const affectedSteps = row.step_ids.filter(id => duplicateStepIds.includes(id));
    console.log(`${index + 1}. "${row.title}" (${row.status})`);
    console.log(`   Uses ${affectedSteps.length} duplicate step(s)`);
  });
  
  return result.rows;
}

async function updateUseCases(duplicateMap, useCases) {
  console.log('\n🔧 Step 3: Updating use cases to reference original steps...\n');
  
  let updatedCount = 0;
  
  for (const useCase of useCases) {
    const updatedStepIds = useCase.step_ids.map(stepId => {
      // If this step ID is a duplicate, replace with original
      const mapping = duplicateMap.find(m => m.duplicate_id === stepId);
      return mapping ? mapping.original_id : stepId;
    });
    
    // Check if anything changed
    const hasChanges = JSON.stringify(updatedStepIds) !== JSON.stringify(useCase.step_ids);
    
    if (hasChanges) {
      if (isDryRun) {
        console.log(`[DRY RUN] Would update "${useCase.title}"`);
        console.log(`  Old steps: ${useCase.step_ids.join(', ')}`);
        console.log(`  New steps: ${updatedStepIds.join(', ')}`);
      } else {
        await pool.query(
          'UPDATE use_cases SET step_ids = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
          [updatedStepIds, useCase.id]
        );
        console.log(`✅ Updated "${useCase.title}"`);
        updatedCount++;
      }
    }
  }
  
  return updatedCount;
}

async function deleteDuplicateSteps(duplicateIds) {
  console.log('\n🗑️  Step 4: Deleting duplicate steps...\n');
  
  if (isDryRun) {
    console.log(`[DRY RUN] Would delete ${duplicateIds.length} duplicate step(s)`);
    return 0;
  }
  
  const query = 'DELETE FROM steps WHERE id = ANY($1)';
  const result = await pool.query(query, [duplicateIds]);
  
  console.log(`✅ Deleted ${result.rowCount} duplicate step(s)`);
  
  return result.rowCount;
}

async function verifyFix() {
  console.log('\n✨ Step 5: Verifying the fix...\n');
  
  // Check for remaining duplicates
  const duplicates = await findDuplicateSteps();
  
  if (duplicates.length === 0) {
    console.log('✅ Verification successful! No duplicate steps remain.');
    return true;
  } else {
    console.log(`⚠️  Warning: ${duplicates.length} duplicate(s) still exist.`);
    return false;
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  Fix Duplicate Steps Migration Script                 ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  
  if (isDryRun) {
    console.log('\n⚠️  Running in DRY RUN mode - no changes will be made\n');
  }
  
  try {
    // Step 1: Find duplicates
    const duplicates = await findDuplicateSteps();
    
    if (duplicates.length === 0) {
      console.log('\n✅ Nothing to fix! Your database is clean.');
      return; // pool.end() will be called in finally block
    }
    
    // Create mapping of duplicate -> original
    const duplicateMap = duplicates.map(d => ({
      duplicate_id: d.duplicate_id,
      original_id: d.original_id,
      title: d.title
    }));
    
    const duplicateIds = duplicates.map(d => d.duplicate_id);
    
    // Step 2: Find affected use cases
    const useCases = await getAffectedUseCases(duplicateIds);
    
    if (useCases.length === 0) {
      console.log('\nℹ️  Duplicate steps exist but are not used in any use cases.');
      console.log('   They can be safely deleted.');
    }
    
    // Step 3: Update use cases
    const updatedCount = await updateUseCases(duplicateMap, useCases);
    
    // Step 4: Delete duplicates
    const deletedCount = await deleteDuplicateSteps(duplicateIds);
    
    // Step 5: Verify (only if not dry run)
    if (!isDryRun) {
      await verifyFix();
    }
    
    // Summary
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║  Migration Summary                                     ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
    if (isDryRun) {
      console.log('📊 DRY RUN Results:');
      console.log(`   - Found ${duplicates.length} duplicate step(s)`);
      console.log(`   - Would update ${useCases.length} use case(s)`);
      console.log(`   - Would delete ${duplicates.length} duplicate step(s)`);
      console.log('\n💡 Run without --dry-run to apply these changes');
    } else {
      console.log('📊 Migration Results:');
      console.log(`   - Fixed ${duplicates.length} duplicate step(s)`);
      console.log(`   - Updated ${updatedCount} use case(s)`);
      console.log(`   - Deleted ${deletedCount} duplicate step(s)`);
      console.log('\n✅ Migration completed successfully!');
    }
    
  } catch (error) {
    console.error('\n❌ Error during migration:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the migration
main();
