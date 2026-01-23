// Step Model
// Represents pre-configured steps for AI development workflows

export interface DetailedContentItem {
  id: string;
  type: 'text' | 'code' | 'image' | 'link' | 'checklist' | 'warning' | 'tip';
  label?: string;
  text?: string;
  code?: string;
  language?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  items?: string[];
  copyToClipboard?: boolean;
}

export interface PreConfiguredStep {
  // Identification
  id: string;
  
  // Content (USER EDITABLE)
  title: string;
  brief_description: string;
  detailed_content: DetailedContentItem[];
  tags: string[];
  
  // Categorization
  category: 'security' | 'access' | 'admin' | 'install' | 'setup' | 'config' | 'practice';
  language?: string;
  ide?: string[];
  target_roles?: string[];
  
  // Approval Workflow
  created_by: string;
  approved_by?: string;
  approval_date?: Date;
  last_modified: Date;
  modified_by: string;
  count_modified: number;
  
  // Review Status
  status: 'review' | 'clarification' | 'approved' | 'rejected';
  rejection_reason?: string;
  
  // Optional Enhanced Features
  prerequisites?: string[];
  related_steps?: string[];
  estimated_time?: number;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  use_case_ids?: string[];
  
  // Metadata
  created_at: Date;
  updated_at: Date;
}

export interface StepComment {
  id: string;
  step_id: string;
  user_id: string;
  user_name: string;
  content: string;
  timestamp: Date;
  line_number?: number;
}

export interface StepHistory {
  id: string;
  step_id: string;
  date: Date;
  modified_by: string;
  action: string;
  title_change?: string;
  column_change?: string;
}

export interface StepApproval {
  id: string;
  step_id: string;
  user_id: string;
  user_name: string;
  timestamp: Date;
  use_case_ids: string[];
}

// Database Row types (snake_case from database)
export interface StepRow {
  id: string;
  title: string;
  brief_description: string;
  detailed_content: any; // JSONB
  tags: string[];
  category: string;
  language: string | null;
  ide: string[] | null;
  target_roles: string[] | null;
  created_by: string;
  approved_by: string | null;
  approval_date: Date | null;
  last_modified: Date;
  modified_by: string;
  count_modified: number;
  status: string;
  rejection_reason: string | null;
  prerequisites: string[] | null;
  related_steps: string[] | null;
  estimated_time: number | null;
  difficulty_level: string | null;
  use_case_ids: string[] | null;
  created_at: Date;
  updated_at: Date;
}

// Helper function to convert database row to model
export function rowToStep(row: StepRow): PreConfiguredStep {
  return {
    id: row.id,
    title: row.title,
    brief_description: row.brief_description,
    detailed_content: row.detailed_content,
    tags: row.tags || [],
    category: row.category as PreConfiguredStep['category'],
    language: row.language || undefined,
    ide: row.ide || undefined,
    target_roles: row.target_roles || undefined,
    created_by: row.created_by,
    approved_by: row.approved_by || undefined,
    approval_date: row.approval_date || undefined,
    last_modified: row.last_modified,
    modified_by: row.modified_by,
    count_modified: row.count_modified,
    status: row.status as PreConfiguredStep['status'],
    rejection_reason: row.rejection_reason || undefined,
    prerequisites: row.prerequisites || undefined,
    related_steps: row.related_steps || undefined,
    estimated_time: row.estimated_time || undefined,
    difficulty_level: row.difficulty_level as PreConfiguredStep['difficulty_level'] || undefined,
    use_case_ids: row.use_case_ids || undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// Helper function to convert model to database insert data
export function stepToInsertData(step: Partial<PreConfiguredStep>) {
  return {
    title: step.title,
    brief_description: step.brief_description,
    detailed_content: JSON.stringify(step.detailed_content || []),
    tags: step.tags || [],
    category: step.category,
    language: step.language,
    ide: step.ide,
    target_roles: step.target_roles,
    created_by: step.created_by,
    modified_by: step.modified_by || step.created_by,
    status: step.status || 'review',
    prerequisites: step.prerequisites,
    related_steps: step.related_steps,
    estimated_time: step.estimated_time,
    difficulty_level: step.difficulty_level,
    use_case_ids: step.use_case_ids,
  };
}
