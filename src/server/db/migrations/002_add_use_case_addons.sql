-- Migration: Add Use Case Addons Feature
-- Date: 2026-01-28
-- Description: Add tables to support composite use cases with addons and customizable step ordering

-- Create use_case_addons table
CREATE TABLE IF NOT EXISTS use_case_addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  base_use_case_id UUID NOT NULL REFERENCES use_cases(id) ON DELETE CASCADE,
  addon_use_case_id UUID NOT NULL REFERENCES use_cases(id) ON DELETE CASCADE,
  path_name VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(base_use_case_id, addon_use_case_id, path_name),
  
  -- Prevent self-referencing and circular dependencies at DB level
  CHECK (base_use_case_id != addon_use_case_id)
);

-- Create use_case_addon_steps table
CREATE TABLE IF NOT EXISTS use_case_addon_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  addon_id UUID NOT NULL REFERENCES use_case_addons(id) ON DELETE CASCADE,
  step_id UUID REFERENCES steps(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  source_use_case_id UUID REFERENCES use_cases(id) ON DELETE CASCADE,
  
  -- Custom step fields (when step_id is NULL)
  custom_step_title VARCHAR(255),
  custom_step_description TEXT,
  custom_step_content JSONB,
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(addon_id, step_order),
  
  -- Ensure either step_id exists OR custom fields are populated
  CHECK (
    (step_id IS NOT NULL) OR 
    (custom_step_title IS NOT NULL AND custom_step_description IS NOT NULL)
  )
);

-- Create indexes for performance
CREATE INDEX idx_use_case_addons_base ON use_case_addons(base_use_case_id);
CREATE INDEX idx_use_case_addons_addon ON use_case_addons(addon_use_case_id);
CREATE INDEX idx_use_case_addons_display ON use_case_addons(base_use_case_id, display_order);
CREATE INDEX idx_use_case_addon_steps_addon ON use_case_addon_steps(addon_id);
CREATE INDEX idx_use_case_addon_steps_order ON use_case_addon_steps(addon_id, step_order);
CREATE INDEX idx_use_case_addon_steps_step ON use_case_addon_steps(step_id);

-- Add trigger for auto-updating updated_at on use_case_addons
DROP TRIGGER IF EXISTS update_use_case_addons_updated_at ON use_case_addons;
CREATE TRIGGER update_use_case_addons_updated_at
  BEFORE UPDATE ON use_case_addons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE use_case_addons IS 'Stores relationships between base use cases and addon use cases for creating composite learning paths';
COMMENT ON TABLE use_case_addon_steps IS 'Stores the customized step sequence for each use case addon path';
COMMENT ON COLUMN use_case_addons.path_name IS 'Display name for this learning path option';
COMMENT ON COLUMN use_case_addons.display_order IS 'Order to display multiple addon options for the same base use case';
COMMENT ON COLUMN use_case_addon_steps.step_order IS 'Sequential position of step in the combined path (1, 2, 3, ...)';
COMMENT ON COLUMN use_case_addon_steps.source_use_case_id IS 'Indicates which use case this step originally came from';
COMMENT ON COLUMN use_case_addon_steps.custom_step_title IS 'Title for custom steps created during path creation';
