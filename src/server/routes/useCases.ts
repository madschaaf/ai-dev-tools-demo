import express from 'express';
import { useCasesService } from '../db/useCasesService.ts';
import type { UseCase } from '../db/models/index.ts';

const router = express.Router();

// POST /api/use-cases - Submit a new use case
router.post('/', async (req, res) => {
  try {
    const useCaseData = req.body;

    // Map frontend data to database model
    const mappedData: Partial<UseCase> = {
      title: useCaseData.name || useCaseData.title,
      description: useCaseData.briefOverview || useCaseData.description,
      category: useCaseData.businessUnit || useCaseData.category || 'General',
      tags: [...(useCaseData.categories || []), ...(useCaseData.searchTags || [])],
      created_by: useCaseData.leadName || useCaseData.created_by || 'Anonymous',
      status: 'review', // Set to 'review' so it appears in the review queue
      
      // Optional fields
      step_ids: useCaseData.generatedSteps?.map((step: any) => step.stepId || step.id),
      estimated_duration: useCaseData.estimatedTime ? parseInt(useCaseData.estimatedTime) : undefined,
      prerequisites: useCaseData.prerequisites,
    };

    // Create use case in database
    const newUseCase = await useCasesService.createUseCase(mappedData);

    res.status(201).json({
      success: true,
      message: 'Use case submitted successfully',
      data: {
        id: newUseCase.id,
        status: newUseCase.status,
        title: newUseCase.title,
        created_at: newUseCase.created_at
      }
    });
  } catch (error) {
    console.error('Error submitting use case:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit use case',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/use-cases/approved - Get only approved use cases (for Library)
router.get('/approved', async (req, res) => {
  try {
    const useCases = await useCasesService.getUseCases({ status: 'approved' });
    
    res.json(useCases);
  } catch (error) {
    console.error('Error fetching approved use cases:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch approved use cases',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/use-cases - Get all use cases
router.get('/', async (req, res) => {
  try {
    const { status, category, user_id } = req.query;
    
    const filters: any = {};
    if (status) filters.status = status as string;
    if (category) filters.category = category as string;
    if (user_id) filters.user_id = user_id as string;

    const useCases = await useCasesService.getUseCases(filters);
    
    res.json({
      success: true,
      data: useCases
    });
  } catch (error) {
    console.error('Error fetching use cases:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch use cases',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/use-cases/:id - Get a specific use case
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { includeSteps } = req.query;

    if (includeSteps === 'true') {
      const result = await useCasesService.getUseCaseWithSteps(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Use case not found'
        });
      }

      res.json({
        success: true,
        data: result
      });
    } else {
      const useCase = await useCasesService.getUseCaseById(id);

      if (!useCase) {
        return res.status(404).json({
          success: false,
          message: 'Use case not found'
        });
      }

      res.json({
        success: true,
        data: useCase
      });
    }
  } catch (error) {
    console.error('Error fetching use case:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch use case',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT /api/use-cases/:id - Update a use case (for drafts)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Map frontend data to database model if needed
    const mappedData: Partial<UseCase> = {};
    
    if (updateData.title) mappedData.title = updateData.title;
    if (updateData.description) mappedData.description = updateData.description;
    if (updateData.category) mappedData.category = updateData.category;
    if (updateData.tags) mappedData.tags = updateData.tags;
    if (updateData.step_ids) mappedData.step_ids = updateData.step_ids;
    if (updateData.status) mappedData.status = updateData.status;
    if (updateData.estimated_duration) mappedData.estimated_duration = updateData.estimated_duration;
    if (updateData.difficulty_level) mappedData.difficulty_level = updateData.difficulty_level;
    if (updateData.prerequisites) mappedData.prerequisites = updateData.prerequisites;

    const updatedUseCase = await useCasesService.updateUseCase(id, mappedData);

    res.json({
      success: true,
      message: 'Use case updated successfully',
      data: updatedUseCase
    });
  } catch (error) {
    console.error('Error updating use case:', error);
    
    if (error instanceof Error && error.message === 'Use case not found') {
      return res.status(404).json({
        success: false,
        message: 'Use case not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update use case',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE /api/use-cases/:id - Delete a use case
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await useCasesService.deleteUseCase(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Use case not found'
      });
    }

    res.json({
      success: true,
      message: 'Use case deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting use case:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete use case',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
