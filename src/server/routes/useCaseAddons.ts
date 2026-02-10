// Use Case Addons API Routes
// REST endpoints for managing use case addons

import express from 'express';
import { useCaseAddonsService } from '../db/useCaseAddonsService.ts';

const router = express.Router();

// Get all addons for a specific use case
router.get('/:useCaseId/addons', async (req, res) => {
  try {
    const { useCaseId } = req.params;
    const addons = await useCaseAddonsService.getAddonsForUseCase(useCaseId);
    res.json({ addons });
  } catch (error) {
    console.error('Error fetching use case addons:', error);
    res.status(500).json({ 
      error: 'Failed to fetch use case addons',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get available use cases that can be added as addons
router.get('/:useCaseId/available-addons', async (req, res) => {
  try {
    const { useCaseId } = req.params;
    const availableAddons = await useCaseAddonsService.getAvailableAddons(useCaseId);
    res.json({ use_cases: availableAddons });
  } catch (error) {
    console.error('Error fetching available addons:', error);
    res.status(500).json({ 
      error: 'Failed to fetch available addons',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get a specific addon by ID
router.get('/:useCaseId/addons/:addonId', async (req, res) => {
  try {
    const { addonId } = req.params;
    const addon = await useCaseAddonsService.getAddonById(addonId);
    res.json(addon);
  } catch (error) {
    console.error('Error fetching addon:', error);
    res.status(404).json({ 
      error: 'Addon not found',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get steps for a specific addon with full details
router.get('/:useCaseId/addons/:addonId/steps', async (req, res) => {
  try {
    const { addonId } = req.params;
    const stepsData = await useCaseAddonsService.getAddonStepsWithDetails(addonId);
    res.json(stepsData);
  } catch (error) {
    console.error('Error fetching addon steps:', error);
    res.status(404).json({ 
      error: 'Failed to fetch addon steps',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create a new addon path
router.post('/:useCaseId/addons', async (req, res) => {
  try {
    const { useCaseId } = req.params;
    const {
      addon_use_case_id,
      path_name,
      description,
      display_order,
      created_by,
      steps
    } = req.body;

    // Validation
    if (!addon_use_case_id) {
      return res.status(400).json({ error: 'addon_use_case_id is required' });
    }
    if (!path_name) {
      return res.status(400).json({ error: 'path_name is required' });
    }
    if (!created_by) {
      return res.status(400).json({ error: 'created_by is required' });
    }
    if (!steps || !Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({ error: 'steps array is required and must not be empty' });
    }

    // Validate steps
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (step.step_order === undefined) {
        return res.status(400).json({ 
          error: `Step at index ${i} is missing step_order` 
        });
      }
      // Either step_id or custom step fields must be provided
      if (!step.step_id && (!step.custom_step_title || !step.custom_step_description)) {
        return res.status(400).json({ 
          error: `Step at index ${i} must have either step_id or both custom_step_title and custom_step_description` 
        });
      }
    }

    const addon = await useCaseAddonsService.createAddon(useCaseId, {
      addon_use_case_id,
      path_name,
      description,
      display_order,
      created_by,
      steps,
    });

    res.status(201).json(addon);
  } catch (error) {
    console.error('Error creating addon:', error);
    res.status(500).json({ 
      error: 'Failed to create addon',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update an existing addon path
router.put('/:useCaseId/addons/:addonId', async (req, res) => {
  try {
    const { addonId } = req.params;
    const updateData = req.body;

    // Validate steps if provided
    if (updateData.steps) {
      if (!Array.isArray(updateData.steps)) {
        return res.status(400).json({ error: 'steps must be an array' });
      }
      for (let i = 0; i < updateData.steps.length; i++) {
        const step = updateData.steps[i];
        if (step.step_order === undefined) {
          return res.status(400).json({ 
            error: `Step at index ${i} is missing step_order` 
          });
        }
        if (!step.step_id && (!step.custom_step_title || !step.custom_step_description)) {
          return res.status(400).json({ 
            error: `Step at index ${i} must have either step_id or both custom_step_title and custom_step_description` 
          });
        }
      }
    }

    const addon = await useCaseAddonsService.updateAddon(addonId, updateData);
    res.json(addon);
  } catch (error) {
    console.error('Error updating addon:', error);
    res.status(500).json({ 
      error: 'Failed to update addon',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete an addon path
router.delete('/:useCaseId/addons/:addonId', async (req, res) => {
  try {
    const { addonId } = req.params;
    const success = await useCaseAddonsService.deleteAddon(addonId);
    
    if (success) {
      res.json({ message: 'Addon deleted successfully' });
    } else {
      res.status(404).json({ error: 'Addon not found' });
    }
  } catch (error) {
    console.error('Error deleting addon:', error);
    res.status(500).json({ 
      error: 'Failed to delete addon',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
