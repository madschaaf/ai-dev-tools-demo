// Use Case Model
// Represents use cases that can include multiple steps and have an associated user

export interface UseCase {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  
  // Optional relations
  step_ids?: string[]; // Optional array of step IDs
  user_id?: string; // Optional user ID
  
  // Metadata
  created_by: string;
  created_at: Date;
  updated_at: Date;
  status: 'draft' | 'review' | 'clarification' | 'approved' | 'rejected' | 'published' | 'archived';
  
  // Additional fields
  estimated_duration?: number; // in minutes
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  
  // Extended submission fields
  thumbnail_url?: string;
  lead_name?: string;
  team_members?: string[];
  brief_overview?: string;
  business_unit?: string;
  is_for_developers?: boolean;
  coding_language?: string;
  ide?: string;
  tools?: string[];
  related_links?: Array<{name: string; url: string}>;
  technical_details?: string;
  data_requirements?: string;
  implementation_steps?: string;
  categories?: string[];
  estimated_time?: string;
  media_links?: Array<{name: string; url: string}>;
  search_tags?: string[];
  is_anonymous?: boolean;
}

// Database Row type (snake_case from database)
export interface UseCaseRow {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  step_ids: string[] | null;
  user_id: string | null;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  status: string;
  estimated_duration: number | null;
  difficulty_level: string | null;
  prerequisites: string[] | null;
  
  // Extended fields
  thumbnail_url: string | null;
  lead_name: string | null;
  team_members: string[] | null;
  brief_overview: string | null;
  business_unit: string | null;
  is_for_developers: boolean | null;
  coding_language: string | null;
  ide: string | null;
  tools: string[] | null;
  related_links: any | null; // JSONB
  technical_details: string | null;
  data_requirements: string | null;
  implementation_steps: string | null;
  categories: string[] | null;
  estimated_time: string | null;
  media_links: any | null; // JSONB
  search_tags: string[] | null;
  is_anonymous: boolean | null;
}

// Helper function to convert database row to model
export function rowToUseCase(row: UseCaseRow): UseCase {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    tags: row.tags || [],
    step_ids: row.step_ids || undefined,
    user_id: row.user_id || undefined,
    created_by: row.created_by,
    created_at: row.created_at,
    updated_at: row.updated_at,
    status: row.status as UseCase['status'],
    estimated_duration: row.estimated_duration || undefined,
    difficulty_level: row.difficulty_level as UseCase['difficulty_level'] || undefined,
    prerequisites: row.prerequisites || undefined,
    
    // Extended fields
    thumbnail_url: row.thumbnail_url || undefined,
    lead_name: row.lead_name || undefined,
    team_members: row.team_members || undefined,
    brief_overview: row.brief_overview || undefined,
    business_unit: row.business_unit || undefined,
    is_for_developers: row.is_for_developers || undefined,
    coding_language: row.coding_language || undefined,
    ide: row.ide || undefined,
    tools: row.tools || undefined,
    related_links: row.related_links || undefined,
    technical_details: row.technical_details || undefined,
    data_requirements: row.data_requirements || undefined,
    implementation_steps: row.implementation_steps || undefined,
    categories: row.categories || undefined,
    estimated_time: row.estimated_time || undefined,
    media_links: row.media_links || undefined,
    search_tags: row.search_tags || undefined,
    is_anonymous: row.is_anonymous || undefined,
  };
}

// Helper function to convert model to database insert data
export function useCaseToInsertData(useCase: Partial<UseCase>) {
  return {
    title: useCase.title,
    description: useCase.description,
    category: useCase.category,
    tags: useCase.tags || [],
    step_ids: useCase.step_ids,
    user_id: useCase.user_id,
    created_by: useCase.created_by,
    status: useCase.status || 'draft',
    estimated_duration: useCase.estimated_duration,
    difficulty_level: useCase.difficulty_level,
    prerequisites: useCase.prerequisites,
    
    // Extended fields
    thumbnail_url: useCase.thumbnail_url,
    lead_name: useCase.lead_name,
    team_members: useCase.team_members,
    brief_overview: useCase.brief_overview,
    business_unit: useCase.business_unit,
    is_for_developers: useCase.is_for_developers,
    coding_language: useCase.coding_language,
    ide: useCase.ide,
    tools: useCase.tools,
    // Serialize JSONB fields to JSON strings
    related_links: useCase.related_links ? JSON.stringify(useCase.related_links) : null,
    technical_details: useCase.technical_details,
    data_requirements: useCase.data_requirements,
    implementation_steps: useCase.implementation_steps,
    categories: useCase.categories,
    estimated_time: useCase.estimated_time,
    // Serialize JSONB fields to JSON strings
    media_links: useCase.media_links ? JSON.stringify(useCase.media_links) : null,
    search_tags: useCase.search_tags,
    is_anonymous: useCase.is_anonymous,
  };
}
