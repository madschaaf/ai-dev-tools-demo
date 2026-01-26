// Steps Database Service Layer
// CRUD operations for pre-configured steps

import { query, getClient } from './connection.ts';
import type { PreConfiguredStep, StepRow, StepComment, StepHistory } from './models/index.ts';
import { rowToStep, stepToInsertData } from './models/index.ts';

export class StepsService {
  // Create a new step
  async createStep(stepData: Partial<PreConfiguredStep>): Promise<PreConfiguredStep> {
    const data = stepToInsertData(stepData);
    
    const result = await query(
      `INSERT INTO steps (
        title, brief_description, detailed_content, tags, category,
        language, ide, target_roles, created_by, modified_by, status,
        prerequisites, related_steps, estimated_time, difficulty_level, use_case_ids
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        data.title,
        data.brief_description,
        data.detailed_content,
        data.tags,
        data.category,
        data.language,
        data.ide,
        data.target_roles,
        data.created_by,
        data.modified_by,
        data.status,
        data.prerequisites,
        data.related_steps,
        data.estimated_time,
        data.difficulty_level,
        data.use_case_ids,
      ]
    );

    // Log history
    await this.addHistory(result.rows[0].id, data.created_by!, 'Created');

    return rowToStep(result.rows[0]);
  }

  // Get a step by ID
  async getStepById(id: string): Promise<PreConfiguredStep | null> {
    const result = await query('SELECT * FROM steps WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return null;
    }

    return rowToStep(result.rows[0]);
  }

  // Get a step by title (case-insensitive, handles kebab-case to title conversion)
  async getStepByTitle(title: string): Promise<PreConfiguredStep | null> {
    // Convert kebab-case to title case for better matching
    const titleVariations = [
      title,
      // Convert kebab-case to Title Case (e.g., 'verify-sso-ping' -> 'Verify SSO Ping')
      title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      // Convert to lowercase for case-insensitive matching
      title.toLowerCase()
    ];

    // Try exact match first
    for (const variant of titleVariations) {
      const result = await query('SELECT * FROM steps WHERE title ILIKE $1', [variant]);
      if (result.rows.length > 0) {
        return rowToStep(result.rows[0]);
      }
    }

    // Try partial match
    const result = await query(
      'SELECT * FROM steps WHERE title ILIKE $1 ORDER BY created_at DESC LIMIT 1',
      [`%${title}%`]
    );
    
    if (result.rows.length === 0) {
      return null;
    }

    return rowToStep(result.rows[0]);
  }

  // Get multiple steps by IDs or titles
  async getStepsByIdentifiers(identifiers: string[]): Promise<PreConfiguredStep[]> {
    if (identifiers.length === 0) {
      return [];
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const steps: PreConfiguredStep[] = [];
    
    for (const identifier of identifiers) {
      let step: PreConfiguredStep | null = null;
      
      if (uuidRegex.test(identifier)) {
        // It's a UUID, fetch directly
        step = await this.getStepById(identifier);
      } else {
        // It's a string identifier, try to find by title
        step = await this.getStepByTitle(identifier);
      }
      
      if (step) {
        steps.push(step);
      }
    }
    
    return steps;
  }

  // Get all steps with optional filters
  async getSteps(filters?: {
    status?: string;
    category?: string;
    tags?: string[];
    search?: string;
  }): Promise<PreConfiguredStep[]> {
    let queryText = 'SELECT * FROM steps WHERE 1=1';
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

    if (filters?.search) {
      queryText += ` AND (title ILIKE $${paramCount} OR brief_description ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
      paramCount++;
    }

    queryText += ' ORDER BY last_modified DESC';

    const result = await query(queryText, params);
    return result.rows.map(rowToStep);
  }

  // Update a step
  async updateStep(id: string, stepData: Partial<PreConfiguredStep>, modifiedBy: string): Promise<PreConfiguredStep> {
    const client = await getClient();
    
    try {
      await client.query('BEGIN');

      // Get current step for history
      const currentResult = await client.query('SELECT * FROM steps WHERE id = $1', [id]);
      if (currentResult.rows.length === 0) {
        throw new Error('Step not found');
      }
      const currentStep = rowToStep(currentResult.rows[0]);

      // Build update query dynamically
      const updates: string[] = [];
      const params: any[] = [];
      let paramCount = 1;

      if (stepData.title !== undefined) {
        updates.push(`title = $${paramCount}`);
        params.push(stepData.title);
        paramCount++;
      }

      if (stepData.brief_description !== undefined) {
        updates.push(`brief_description = $${paramCount}`);
        params.push(stepData.brief_description);
        paramCount++;
      }

      if (stepData.detailed_content !== undefined) {
        updates.push(`detailed_content = $${paramCount}`);
        params.push(JSON.stringify(stepData.detailed_content));
        paramCount++;
      }

      if (stepData.tags !== undefined) {
        updates.push(`tags = $${paramCount}`);
        params.push(stepData.tags);
        paramCount++;
      }

      if (stepData.status !== undefined) {
        updates.push(`status = $${paramCount}`);
        params.push(stepData.status);
        paramCount++;
      }

      if (stepData.category !== undefined) {
        updates.push(`category = $${paramCount}`);
        params.push(stepData.category);
        paramCount++;
      }

      // Always update modified_by and last_modified
      updates.push(`modified_by = $${paramCount}`);
      params.push(modifiedBy);
      paramCount++;

      updates.push(`last_modified = CURRENT_TIMESTAMP`);

      // Increment count_modified if not AI Team
      if (!modifiedBy.toLowerCase().includes('ai team')) {
        updates.push(`count_modified = count_modified + 1`);
      }

      params.push(id); // For WHERE clause
      const whereParam = paramCount;

      const updateQuery = `
        UPDATE steps 
        SET ${updates.join(', ')}
        WHERE id = $${whereParam}
        RETURNING *
      `;

      const result = await client.query(updateQuery, params);

      // Log history
      const action = stepData.status !== currentStep.status 
        ? `Status changed: ${currentStep.status} → ${stepData.status}`
        : 'Updated';
      
      await client.query(
        `INSERT INTO step_history (step_id, modified_by, action, title_change, column_change)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          id,
          modifiedBy,
          action,
          stepData.title !== currentStep.title ? `${currentStep.title} → ${stepData.title}` : null,
          stepData.status !== currentStep.status ? `${currentStep.status} → ${stepData.status}` : null,
        ]
      );

      await client.query('COMMIT');

      return rowToStep(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Delete a step
  async deleteStep(id: string): Promise<boolean> {
    const result = await query('DELETE FROM steps WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  // Approve a step
  async approveStep(id: string, approvedBy: string, useCaseIds: string[] = []): Promise<PreConfiguredStep> {
    const client = await getClient();
    
    try {
      await client.query('BEGIN');

      // Update step status
      const result = await client.query(
        `UPDATE steps 
         SET status = 'approved', approved_by = $1, approval_date = CURRENT_TIMESTAMP, last_modified = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [approvedBy, id]
      );

      if (result.rows.length === 0) {
        throw new Error('Step not found');
      }

      // Add approval record
      await client.query(
        `INSERT INTO step_approvals (step_id, user_id, user_name, use_case_ids)
         VALUES ($1, $2, $3, $4)`,
        [id, approvedBy, approvedBy, useCaseIds]
      );

      // Log history
      await client.query(
        `INSERT INTO step_history (step_id, modified_by, action, column_change)
         VALUES ($1, $2, $3, $4)`,
        [id, approvedBy, `Approved by ${approvedBy}`, 'review → approved']
      );

      await client.query('COMMIT');

      return rowToStep(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Reject a step
  async rejectStep(id: string, rejectedBy: string, reason: string): Promise<PreConfiguredStep> {
    const result = await query(
      `UPDATE steps 
       SET status = 'rejected', rejection_reason = $1, last_modified = CURRENT_TIMESTAMP, modified_by = $2
       WHERE id = $3
       RETURNING *`,
      [reason, rejectedBy, id]
    );

    if (result.rows.length === 0) {
      throw new Error('Step not found');
    }

    // Log history
    await this.addHistory(id, rejectedBy, `Rejected: ${reason}`, 'review → rejected');

    return rowToStep(result.rows[0]);
  }

  // Add comment to a step
  async addComment(stepId: string, userId: string, userName: string, content: string, lineNumber?: number): Promise<StepComment> {
    const result = await query(
      `INSERT INTO step_comments (step_id, user_id, user_name, content, line_number)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [stepId, userId, userName, content, lineNumber]
    );

    // Update step's last_modified to move it to top of column
    await query(
      'UPDATE steps SET last_modified = CURRENT_TIMESTAMP WHERE id = $1',
      [stepId]
    );

    return result.rows[0];
  }

  // Get comments for a step
  async getComments(stepId: string): Promise<StepComment[]> {
    const result = await query(
      'SELECT * FROM step_comments WHERE step_id = $1 ORDER BY timestamp DESC',
      [stepId]
    );
    return result.rows;
  }

  // Get history for a step
  async getHistory(stepId: string): Promise<StepHistory[]> {
    const result = await query(
      'SELECT * FROM step_history WHERE step_id = $1 ORDER BY date DESC',
      [stepId]
    );
    return result.rows;
  }

  // Helper to add history entry
  private async addHistory(stepId: string, modifiedBy: string, action: string, columnChange?: string): Promise<void> {
    await query(
      `INSERT INTO step_history (step_id, modified_by, action, column_change)
       VALUES ($1, $2, $3, $4)`,
      [stepId, modifiedBy, action, columnChange]
    );
  }
}

// Export singleton instance
export const stepsService = new StepsService();
