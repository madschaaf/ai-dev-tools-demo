// Use Case Addon Models
// TypeScript interfaces and data transformation functions

export interface UseCaseAddon {
  id: string;
  base_use_case_id: string;
  addon_use_case_id: string;
  path_name: string;
  description: string | null;
  display_order: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface UseCaseAddonStep {
  id: string;
  addon_id: string;
  step_id: string | null;
  step_order: number;
  source_use_case_id: string | null;
  
  // Custom step fields
  custom_step_title: string | null;
  custom_step_description: string | null;
  custom_step_content: any | null;
  
  created_at: Date;
}

export interface UseCaseAddonRow {
  id: string;
  base_use_case_id: string;
  addon_use_case_id: string;
  path_name: string;
  description: string | null;
  display_order: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface UseCaseAddonStepRow {
  id: string;
  addon_id: string;
  step_id: string | null;
  step_order: number;
  source_use_case_id: string | null;
  custom_step_title: string | null;
  custom_step_description: string | null;
  custom_step_content: any | null;
  created_at: Date;
}

// Transform database row to UseCaseAddon model
export function rowToUseCaseAddon(row: UseCaseAddonRow): UseCaseAddon {
  return {
    id: row.id,
    base_use_case_id: row.base_use_case_id,
    addon_use_case_id: row.addon_use_case_id,
    path_name: row.path_name,
    description: row.description,
    display_order: row.display_order,
    created_by: row.created_by,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// Transform database row to UseCaseAddonStep model
export function rowToUseCaseAddonStep(row: UseCaseAddonStepRow): UseCaseAddonStep {
  return {
    id: row.id,
    addon_id: row.addon_id,
    step_id: row.step_id,
    step_order: row.step_order,
    source_use_case_id: row.source_use_case_id,
    custom_step_title: row.custom_step_title,
    custom_step_description: row.custom_step_description,
    custom_step_content: row.custom_step_content,
    created_at: row.created_at,
  };
}

// Prepare addon data for insertion
export function useCaseAddonToInsertData(addon: Partial<UseCaseAddon>) {
  return {
    base_use_case_id: addon.base_use_case_id,
    addon_use_case_id: addon.addon_use_case_id,
    path_name: addon.path_name || '',
    description: addon.description || null,
    display_order: addon.display_order || 0,
    created_by: addon.created_by || 'Unknown',
  };
}

// Prepare addon step data for insertion
export function useCaseAddonStepToInsertData(step: Partial<UseCaseAddonStep>) {
  return {
    addon_id: step.addon_id,
    step_id: step.step_id || null,
    step_order: step.step_order || 0,
    source_use_case_id: step.source_use_case_id || null,
    custom_step_title: step.custom_step_title || null,
    custom_step_description: step.custom_step_description || null,
    custom_step_content: step.custom_step_content || null,
  };
}
