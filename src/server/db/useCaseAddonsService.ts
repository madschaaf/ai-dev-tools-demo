// Use Case Addons Service Layer
// CRUD operations for use case addons and addon steps

import { query, getClient } from './connection.ts';
import type { UseCaseAddon, UseCaseAddonStep } from './models/useCaseAddon.ts';
import {
  rowToUseCaseAddon,
  rowToUseCaseAddonStep,
  useCaseAddonToInsertData,
  useCaseAddonStepToInsertData,
} from './models/useCaseAddon.ts';
import { useCasesService } from './useCasesService.ts';
import { stepsService } from './stepsService.ts';

export interface AddonWithDetails extends UseCaseAddon {
  addon_use_case: any;
  steps: Array<UseCaseAddonStep & {
    step_details?: any;
    source_use_case_title?: string | null;
  }>;
}

export interface CreateAddonRequest {
  addon_use_case_id: string;
  path_name: string;
  description?: string;
  display_order?: number;
  created_by: string;
  steps: Array<{
    step_id?: string | null;
    step_order: number;
    source_use_case_id?: string;
    custom_step_title?: string;
    custom_step_description?: string;
    custom_step_content?: any;
  }>;
}

export class UseCaseAddonsService {
  // Create a new addon path with steps
  async createAddon(
    baseUseCaseId: string,
    addonData: CreateAddonRequest
  ): Promise<AddonWithDetails> {
    const client = await getClient();

    try {
      await client.query('BEGIN');

      // Validate base and addon use cases exist
      const baseUseCase = await useCasesService.getUseCaseById(baseUseCaseId);
      if (!baseUseCase) {
        throw new Error('Base use case not found');
      }

      const addonUseCase = await useCasesService.getUseCaseById(addonData.addon_use_case_id);
      if (!addonUseCase) {
        throw new Error('Addon use case not found');
      }

      // Prevent self-referencing
      if (baseUseCaseId === addonData.addon_use_case_id) {
        throw new Error('Cannot add a use case as an addon to itself');
      }

      // Check for circular dependencies
      const hasCircular = await this.checkCircularDependency(
        baseUseCaseId,
        addonData.addon_use_case_id
      );
      if (hasCircular) {
        throw new Error('Circular dependency detected');
      }

      // Create the addon
      const addonInsertData = {
        base_use_case_id: baseUseCaseId,
        addon_use_case_id: addonData.addon_use_case_id,
        path_name: addonData.path_name,
        description: addonData.description || null,
        display_order: addonData.display_order || 0,
        created_by: addonData.created_by,
      };

      const addonResult = await client.query(
        `INSERT INTO use_case_addons (
          base_use_case_id, addon_use_case_id, path_name, description, 
          display_order, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
          addonInsertData.base_use_case_id,
          addonInsertData.addon_use_case_id,
          addonInsertData.path_name,
          addonInsertData.description,
          addonInsertData.display_order,
          addonInsertData.created_by,
        ]
      );

      const addon = rowToUseCaseAddon(addonResult.rows[0]);

      // Create addon steps
      if (addonData.steps && addonData.steps.length > 0) {
        for (const step of addonData.steps) {
          await client.query(
            `INSERT INTO use_case_addon_steps (
              addon_id, step_id, step_order, source_use_case_id,
              custom_step_title, custom_step_description, custom_step_content
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              addon.id,
              step.step_id || null,
              step.step_order,
              step.source_use_case_id || null,
              step.custom_step_title || null,
              step.custom_step_description || null,
              step.custom_step_content ? JSON.stringify(step.custom_step_content) : null,
            ]
          );
        }
      }

      await client.query('COMMIT');

      // Fetch and return complete addon with details
      return await this.getAddonById(addon.id);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Get all addons for a base use case
  async getAddonsForUseCase(baseUseCaseId: string): Promise<AddonWithDetails[]> {
    const result = await query(
      `SELECT * FROM use_case_addons 
       WHERE base_use_case_id = $1 
       ORDER BY display_order ASC, created_at ASC`,
      [baseUseCaseId]
    );

    const addons: AddonWithDetails[] = [];

    for (const row of result.rows) {
      const addon = await this.getAddonById(row.id);
      addons.push(addon);
    }

    return addons;
  }

  // Get a single addon by ID with all details
  async getAddonById(addonId: string): Promise<AddonWithDetails> {
    const addonResult = await query(
      'SELECT * FROM use_case_addons WHERE id = $1',
      [addonId]
    );

    if (addonResult.rows.length === 0) {
      throw new Error('Addon not found');
    }

    const addon = rowToUseCaseAddon(addonResult.rows[0]);

    // Fetch addon use case details
    const addonUseCase = await useCasesService.getUseCaseById(addon.addon_use_case_id);

    // Fetch addon steps
    const stepsResult = await query(
      `SELECT * FROM use_case_addon_steps 
       WHERE addon_id = $1 
       ORDER BY step_order ASC`,
      [addonId]
    );

    const steps = await Promise.all(
      stepsResult.rows.map(async (stepRow) => {
        const addonStep = rowToUseCaseAddonStep(stepRow);

        // If it's a regular step (not custom), fetch step details
        let step_details = null;
        if (addonStep.step_id) {
          step_details = await stepsService.getStepById(addonStep.step_id);
        }

        // Fetch source use case title
        let source_use_case_title = null;
        if (addonStep.source_use_case_id) {
          const sourceUseCase = await useCasesService.getUseCaseById(
            addonStep.source_use_case_id
          );
          source_use_case_title = sourceUseCase?.title || null;
        }

        return {
          ...addonStep,
          step_details,
          source_use_case_title,
        };
      })
    );

    return {
      ...addon,
      addon_use_case: addonUseCase,
      steps,
    };
  }

  // Update an addon path
  async updateAddon(
    addonId: string,
    updateData: Partial<CreateAddonRequest>
  ): Promise<AddonWithDetails> {
    const client = await getClient();

    try {
      await client.query('BEGIN');

      // Update addon metadata if provided
      const updates: string[] = [];
      const params: any[] = [];
      let paramCount = 1;

      if (updateData.path_name !== undefined) {
        updates.push(`path_name = $${paramCount}`);
        params.push(updateData.path_name);
        paramCount++;
      }

      if (updateData.description !== undefined) {
        updates.push(`description = $${paramCount}`);
        params.push(updateData.description);
        paramCount++;
      }

      if (updateData.display_order !== undefined) {
        updates.push(`display_order = $${paramCount}`);
        params.push(updateData.display_order);
        paramCount++;
      }

      if (updates.length > 0) {
        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        params.push(addonId);

        await client.query(
          `UPDATE use_case_addons 
           SET ${updates.join(', ')}
           WHERE id = $${paramCount}`,
          params
        );
      }

      // Update steps if provided
      if (updateData.steps) {
        // Delete existing steps
        await client.query(
          'DELETE FROM use_case_addon_steps WHERE addon_id = $1',
          [addonId]
        );

        // Insert new steps
        for (const step of updateData.steps) {
          await client.query(
            `INSERT INTO use_case_addon_steps (
              addon_id, step_id, step_order, source_use_case_id,
              custom_step_title, custom_step_description, custom_step_content
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              addonId,
              step.step_id || null,
              step.step_order,
              step.source_use_case_id || null,
              step.custom_step_title || null,
              step.custom_step_description || null,
              step.custom_step_content ? JSON.stringify(step.custom_step_content) : null,
            ]
          );
        }
      }

      await client.query('COMMIT');

      return await this.getAddonById(addonId);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Delete an addon path
  async deleteAddon(addonId: string): Promise<boolean> {
    // Cascade delete will handle addon_steps automatically
    const result = await query(
      'DELETE FROM use_case_addons WHERE id = $1',
      [addonId]
    );

    return (result.rowCount ?? 0) > 0;
  }

  // Get steps for an addon path with full details
  async getAddonStepsWithDetails(addonId: string) {
    const addon = await this.getAddonById(addonId);
    const baseUseCase = await useCasesService.getUseCaseById(addon.base_use_case_id);

    return {
      base_use_case: baseUseCase,
      addon_use_case: addon.addon_use_case,
      steps: addon.steps.map((step, index) => ({
        id: step.id,
        title: step.custom_step_title || step.step_details?.title || 'Unknown Step',
        description: step.custom_step_description || step.step_details?.brief_description || '',
        detailed_content: step.custom_step_content || step.step_details?.detailed_content || [],
        step_order: step.step_order,
        source_use_case_id: step.source_use_case_id,
        source_use_case_title: step.source_use_case_title,
        is_custom: !step.step_id,
      })),
    };
  }

  // Check for circular dependencies
  private async checkCircularDependency(
    baseUseCaseId: string,
    addonUseCaseId: string
  ): Promise<boolean> {
    // Check if addonUseCaseId has baseUseCaseId as an addon
    const result = await query(
      `SELECT 1 FROM use_case_addons 
       WHERE base_use_case_id = $1 AND addon_use_case_id = $2`,
      [addonUseCaseId, baseUseCaseId]
    );

    return result.rows.length > 0;
  }

  // Get all use cases that could be addons (excluding current use case and existing addons)
  async getAvailableAddons(baseUseCaseId: string): Promise<any[]> {
    const result = await query(
      `SELECT * FROM use_cases 
       WHERE id != $1 
       AND status = 'approved'
       AND id NOT IN (
         SELECT addon_use_case_id 
         FROM use_case_addons 
         WHERE base_use_case_id = $1
       )
       ORDER BY title ASC`,
      [baseUseCaseId]
    );

    return result.rows;
  }
}

// Export singleton instance
export const useCaseAddonsService = new UseCaseAddonsService();
