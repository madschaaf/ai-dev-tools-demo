-- Pre-Configured Steps Database Schema
-- PostgreSQL Database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  is_ai_team_member BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Use Cases Table - Comprehensive Fields
CREATE TABLE IF NOT EXISTS use_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  
  -- Relations
  step_ids TEXT[] DEFAULT '{}', -- Array of step IDs (string identifiers or UUIDs)
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Metadata
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'clarification', 'approved', 'rejected', 'published', 'archived')),
  
  -- Time & Difficulty
  estimated_duration INTEGER, -- in minutes
  estimated_time VARCHAR(100), -- Human-readable time estimate
  difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  prerequisites TEXT[] DEFAULT '{}',
  
  -- Comprehensive Fields for Preview/Display
  thumbnail_url TEXT,
  lead_name VARCHAR(255),
  team_members TEXT[] DEFAULT '{}',
  brief_overview TEXT,
  business_unit VARCHAR(255),
  
  -- Technical Details
  is_for_developers BOOLEAN DEFAULT FALSE,
  coding_language VARCHAR(100),
  ide VARCHAR(100),
  tools TEXT[] DEFAULT '{}',
  
  -- Documentation & Links
  related_links JSONB DEFAULT '[]', -- Array of {name, url, type}
  media_links JSONB DEFAULT '[]', -- Array of {name, url, type}
  technical_details TEXT,
  data_requirements TEXT,
  implementation_steps TEXT,
  
  -- Classification
  categories TEXT[] DEFAULT '{}', -- Multiple categories
  search_tags TEXT[] DEFAULT '{}', -- Additional searchable tags
  
  -- Privacy
  is_anonymous BOOLEAN DEFAULT FALSE
);

-- Main Steps Table
CREATE TABLE IF NOT EXISTS steps (
  -- Identification
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Content (USER EDITABLE)
  title VARCHAR(255) NOT NULL,
  brief_description TEXT NOT NULL,
  detailed_content JSONB NOT NULL DEFAULT '[]', -- Array of DetailedContentItem
  tags TEXT[] DEFAULT '{}',
  
  -- Categorization
  category VARCHAR(50) NOT NULL CHECK (category IN ('security', 'access', 'admin', 'install', 'setup', 'config', 'practice')),
  language VARCHAR(50),
  ide TEXT[] DEFAULT '{}',
  target_roles TEXT[] DEFAULT '{}',
  
  -- Approval Workflow (Steps Library)
  created_by VARCHAR(255) NOT NULL, -- "AI Team" or individual name
  approved_by VARCHAR(255),
  approval_date TIMESTAMP,
  last_modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by VARCHAR(255) NOT NULL,
  count_modified INTEGER DEFAULT 0,
  
  -- Review Status
  status VARCHAR(50) NOT NULL DEFAULT 'review' CHECK (status IN ('review', 'clarification', 'approved', 'rejected')),
  rejection_reason TEXT,
  
  -- Optional Enhanced Features
  prerequisites TEXT[] DEFAULT '{}', -- Array of step IDs
  related_steps TEXT[] DEFAULT '{}', -- Array of step IDs
  estimated_time INTEGER, -- Minutes
  difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  use_case_ids TEXT[] DEFAULT '{}',
  
  -- Metadata
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Step Comments Table
CREATE TABLE IF NOT EXISTS step_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  step_id UUID NOT NULL REFERENCES steps(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  line_number INTEGER,
  
  CONSTRAINT fk_step FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE CASCADE
);

-- Step History Table (Audit Trail)
CREATE TABLE IF NOT EXISTS step_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  step_id UUID NOT NULL REFERENCES steps(id) ON DELETE CASCADE,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_by VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  title_change TEXT,
  column_change VARCHAR(100),
  
  CONSTRAINT fk_step_history FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE CASCADE
);

-- Step Approvals Table
CREATE TABLE IF NOT EXISTS step_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  step_id UUID NOT NULL REFERENCES steps(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  use_case_ids TEXT[] DEFAULT '{}',
  
  CONSTRAINT fk_step_approval FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE CASCADE
);

-- Indexes for Performance
-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Use Cases indexes
CREATE INDEX IF NOT EXISTS idx_use_cases_status ON use_cases(status);
CREATE INDEX IF NOT EXISTS idx_use_cases_category ON use_cases(category);
CREATE INDEX IF NOT EXISTS idx_use_cases_tags ON use_cases USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_use_cases_user_id ON use_cases(user_id);
CREATE INDEX IF NOT EXISTS idx_use_cases_created_at ON use_cases(created_at DESC);

-- Steps indexes
CREATE INDEX IF NOT EXISTS idx_steps_category ON steps(category);
CREATE INDEX IF NOT EXISTS idx_steps_status ON steps(status);
CREATE INDEX IF NOT EXISTS idx_steps_tags ON steps USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_steps_created_at ON steps(created_at);
CREATE INDEX IF NOT EXISTS idx_steps_last_modified ON steps(last_modified DESC);
CREATE INDEX IF NOT EXISTS idx_steps_ide ON steps USING GIN(ide);
CREATE INDEX IF NOT EXISTS idx_step_comments_step_id ON step_comments(step_id);
CREATE INDEX IF NOT EXISTS idx_step_history_step_id ON step_history(step_id);
CREATE INDEX IF NOT EXISTS idx_step_approvals_step_id ON step_approvals(step_id);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at (drop first to avoid conflicts)
DROP TRIGGER IF EXISTS update_steps_updated_at ON steps;
CREATE TRIGGER update_steps_updated_at
  BEFORE UPDATE ON steps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
