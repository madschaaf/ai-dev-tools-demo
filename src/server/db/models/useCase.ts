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
  };
}
