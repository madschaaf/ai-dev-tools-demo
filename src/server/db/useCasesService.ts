// Use Cases Database Service Layer
// CRUD operations for use cases

import { query, getClient } from './connection.ts';
import type { UseCase, UseCaseRow } from './models/index.ts';
import { rowToUseCase, useCaseToInsertData } from './models/index.ts';

export class UseCasesService {
  // Create a new use case
  async createUseCase(useCaseData: Partial<UseCase>): Promise<UseCase> {
    const data = useCaseToInsertData(useCaseData);
    
    const result = await query(
      `INSERT INTO use_cases (
        title, description, category, tags, step_ids, user_id,
        created_by, status, estimated_duration, difficulty_level, prerequisites,
        thumbnail_url, lead_name, team_members, brief_overview, business_unit,
        is_for_developers, coding_language, ide, tools, related_links,
        technical_details, data_requirements, implementation_steps, categories,
        estimated_time, media_links, search_tags, is_anonymous
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)
      RETURNING *`,
      [
        data.title,
        data.description,
        data.category,
        data.tags,
        data.step_ids,
        data.user_id,
        data.created_by,
        data.status,
        data.estimated_duration,
        data.difficulty_level,
        data.prerequisites,
        data.thumbnail_url,
        data.lead_name,
        data.team_members,
        data.brief_overview,
        data.business_unit,
        data.is_for_developers,
        data.coding_language,
        data.ide,
        data.tools,
        data.related_links,
        data.technical_details,
        data.data_requirements,
        data.implementation_steps,
        data.categories,
        data.estimated_time,
        data.media_links,
        data.search_tags,
        data.is_anonymous,
      ]
    );

    return rowToUseCase(result.rows[0]);
  }

  // Get a use case by ID
  async getUseCaseById(id: string): Promise<UseCase | null> {
    const result = await query('SELECT * FROM use_cases WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return null;
    }

    return rowToUseCase(result.rows[0]);
  }

  // Get all use cases with optional filters
  async getUseCases(filters?: {
    status?: string;
    category?: string;
    tags?: string[];
    user_id?: string;
  }): Promise<UseCase[]> {
    let queryText = 'SELECT * FROM use_cases WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (filters?.status) {
      queryText += ` AND status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    if (filters?.category) {
      queryText += ` AND category = $${paramCount}`;
      params.push(filters.category);
      paramCount++;
    }

    if (filters?.tags && filters.tags.length > 0) {
      queryText += ` AND tags && $${paramCount}`;
      params.push(filters.tags);
      paramCount++;
    }

    if (filters?.user_id) {
      queryText += ` AND user_id = $${paramCount}`;
      params.push(filters.user_id);
      paramCount++;
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await query(queryText, params);
    return result.rows.map(rowToUseCase);
  }

  // Update a use case
  async updateUseCase(id: string, useCaseData: Partial<UseCase>): Promise<UseCase> {
    const client = await getClient();
    
    try {
      await client.query('BEGIN');

      // Build update query dynamically
      const updates: string[] = [];
      const params: any[] = [];
      let paramCount = 1;

      if (useCaseData.title !== undefined) {
        updates.push(`title = $${paramCount}`);
        params.push(useCaseData.title);
        paramCount++;
      }

      if (useCaseData.description !== undefined) {
        updates.push(`description = $${paramCount}`);
        params.push(useCaseData.description);
        paramCount++;
      }

      if (useCaseData.category !== undefined) {
        updates.push(`category = $${paramCount}`);
        params.push(useCaseData.category);
        paramCount++;
      }

      if (useCaseData.tags !== undefined) {
        updates.push(`tags = $${paramCount}`);
        params.push(useCaseData.tags);
        paramCount++;
      }

      if (useCaseData.step_ids !== undefined) {
        updates.push(`step_ids = $${paramCount}`);
        params.push(useCaseData.step_ids);
        paramCount++;
      }

      if (useCaseData.user_id !== undefined) {
        updates.push(`user_id = $${paramCount}`);
        params.push(useCaseData.user_id);
        paramCount++;
      }

      if (useCaseData.status !== undefined) {
        updates.push(`status = $${paramCount}`);
        params.push(useCaseData.status);
        paramCount++;
      }

      if (useCaseData.estimated_duration !== undefined) {
        updates.push(`estimated_duration = $${paramCount}`);
        params.push(useCaseData.estimated_duration);
        paramCount++;
      }

      if (useCaseData.difficulty_level !== undefined) {
        updates.push(`difficulty_level = $${paramCount}`);
        params.push(useCaseData.difficulty_level);
        paramCount++;
      }

      if (useCaseData.prerequisites !== undefined) {
        updates.push(`prerequisites = $${paramCount}`);
        params.push(useCaseData.prerequisites);
        paramCount++;
      }

      if (useCaseData.estimated_time !== undefined) {
        updates.push(`estimated_time = $${paramCount}`);
        params.push(useCaseData.estimated_time);
        paramCount++;
      }

      // Always update updated_at
      updates.push(`updated_at = CURRENT_TIMESTAMP`);

      params.push(id); // For WHERE clause
      const whereParam = paramCount;

      const updateQuery = `
        UPDATE use_cases 
        SET ${updates.join(', ')}
        WHERE id = $${whereParam}
        RETURNING *
      `;

      const result = await client.query(updateQuery, params);

      if (result.rows.length === 0) {
        throw new Error('Use case not found');
      }

      await client.query('COMMIT');

      return rowToUseCase(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Delete a use case
  async deleteUseCase(id: string): Promise<boolean> {
    const result = await query('DELETE FROM use_cases WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  // Get use cases with associated step details
  async getUseCaseWithSteps(id: string): Promise<{ useCase: UseCase; steps: any[] } | null> {
    const useCase = await this.getUseCaseById(id);
    
    if (!useCase) {
      return null;
    }

    // If no step_ids or empty array, return use case with empty steps
    if (!useCase.step_ids || useCase.step_ids.length === 0) {
      return { useCase, steps: [] };
    }

    try {
      // Import stepsService to use the new getStepsByIdentifiers method
      const { stepsService } = await import('./stepsService.ts');
      
      // Fetch steps using identifiers (handles both UUIDs and string identifiers)
      const steps = await stepsService.getStepsByIdentifiers(useCase.step_ids);
      
      if (steps.length === 0) {
        console.warn(`Use case ${id} has step_ids but no matching steps were found:`, useCase.step_ids);
      }

      return {
        useCase,
        steps: steps.map((step, index) => ({
          id: step.id,
          title: step.title,
          description: step.brief_description,
          detailed_content: step.detailed_content,
          order_index: index,
          category: step.category,
          is_custom: false,
        }))
      };
    } catch (error) {
      console.error('Error fetching steps for use case:', error);
      // Return use case without steps if there's an error
      return { useCase, steps: [] };
    }
  }
}

// Export singleton instance
export const useCasesService = new UseCasesService();
