#!/usr/bin/env node

/**
 * Database Schema Validation Script
 * Validates that the use_cases table has all required comprehensive fields
 */

import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const { Pool } = pg;

// Required fields in use_cases table
const REQUIRED_FIELDS = [
  // Basic fields
  'id', 'title', 'description', 'category', 'tags',
  // Relations
  'step_ids', 'user_id',
  // Metadata
  'created_by', 'created_at', 'updated_at', 'status',
  // Time & Difficulty
  'estimated_duration', 'estimated_time', 'difficulty_level', 'prerequisites',
  // Comprehensive fields
  'thumbnail_url', 'lead_name', 'team_members', 'brief_overview', 'business_unit',
  // Technical details
  'is_for_developers', 'coding_language', 'ide', 'tools',
  // Documentation & Links (JSONB)
  'related_links', 'media_links', 'technical_details', 'data_requirements', 'implementation_steps',
  // Classification
  'categories', 'search_tags',
  // Privacy
  'is_anonymous'
];

async function validateSchema() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔍 Validating use_cases table schema...\n');

    // Query to get all columns in use_cases table
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'use_cases'
      ORDER BY ordinal_position;
    `);

    const existingFields = result.rows.map(row => row.column_name);
    
    console.log('✅ Existing fields in use_cases table:');
    result.rows.forEach(row => {
      const nullable = row.is_nullable === 'YES' ? '(nullable)' : '(required)';
      console.log(`   - ${row.column_name}: ${row.data_type} ${nullable}`);
    });

    console.log('\n📋 Checking for required comprehensive fields...\n');

    // Check for missing fields
    const missingFields = REQUIRED_FIELDS.filter(field => !existingFields.includes(field));
    
    if (missingFields.length === 0) {
      console.log('✅ SUCCESS: All required fields are present!\n');
      
      // Show JSONB fields specifically
      const jsonbFields = result.rows.filter(row => row.data_type === 'jsonb');
      if (jsonbFields.length > 0) {
        console.log('📦 JSONB fields (for complex data):');
        jsonbFields.forEach(row => {
          console.log(`   - ${row.column_name}`);
        });
      }
      
      process.exit(0);
    } else {
      console.log('❌ ERROR: Missing required fields:');
      missingFields.forEach(field => {
        console.log(`   - ${field}`);
      });
      console.log('\n💡 Run the schema migration to add missing fields:');
      console.log('   psql $DATABASE_URL -f src/server/db/schema.sql\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error validating schema:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run validation
validateSchema();
