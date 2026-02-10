import express from 'express';
import { useCasesService } from '../db/useCasesService.ts';
import { stepsService } from '../db/stepsService.ts';
import type { UseCase } from '../db/models/index.ts';

const router = express.Router();

// POST /api/use-cases - Submit a new use case
router.post('/', async (req, res) => {
  try {
    const useCaseData = req.body;

    // First, create/get steps if provided
    let stepIds: string[] = [];
    if (useCaseData.generatedSteps && useCaseData.generatedSteps.length > 0) {
      console.log(`Processing ${useCaseData.generatedSteps.length} steps for use case...`);
      
      for (const step of useCaseData.generatedSteps) {
        try {
          const stepId = step.stepId || step.id;
          const isCustomStep = stepId && stepId.startsWith('custom-');
          let existingStep = null;
          
          // Try to look up preconfigured steps using the identifier (supports both UUIDs and string identifiers)
          if (stepId && !isCustomStep) {
            try {
              // Use getStepsByIdentifiers which handles both UUIDs and string identifiers (like "setup-github-personal-account")
              const steps = await stepsService.getStepsByIdentifiers([stepId]);
              if (steps.length > 0) {
                existingStep = steps[0];
              }
            } catch (lookupError) {
              console.log(`Step ${stepId} not found in database`);
            }
          }
          
          if (existingStep) {
            // Found existing preconfigured step - use it!
            console.log(`✓ Using existing preconfigured step: ${existingStep.id} - ${existingStep.title}`);
            stepIds.push(existingStep.id);
          } else if (isCustomStep) {
            // This is a custom step - create it in the database
            // For custom steps, ensure category is valid (database only allows specific values)
            // Valid categories: 'security', 'access', 'admin', 'install', 'setup', 'config', 'practice'
            let validCategory = step.category || 'setup';
            const allowedCategories = ['security', 'access', 'admin', 'install', 'setup', 'config', 'practice'];
            if (!allowedCategories.includes(validCategory)) {
              validCategory = 'setup'; // Default to 'setup' for custom steps
            }
            
            const newStep = await stepsService.createStep({
              title: step.title,
              brief_description: step.description,
              detailed_content: step.detailed_content || [],
              tags: [],
              category: validCategory as any,
              created_by: useCaseData.leadName || 'Anonymous',
              modified_by: useCaseData.leadName || 'Anonymous',
              status: 'approved', // Auto-approve custom steps from use case submission
              estimated_time: 10,
              difficulty_level: 'beginner'
            });
            
            console.log(`✓ Created new custom step: ${newStep.id} - ${newStep.title} (auto-approved)`);
            stepIds.push(newStep.id);
          } else {
            // Preconfigured step not found in database - this shouldn't happen
            console.warn(`⚠️ Preconfigured step "${stepId}" not found in database. Skipping this step.`);
            console.warn(`   Please ensure the step exists in the Steps Library before using it in a use case.`);
            // DO NOT create a duplicate - skip this step
          }
        } catch (stepError) {
          console.error(`Error processing step ${step.title}:`, stepError);
          // Continue with other steps even if one fails
        }
      }
    }

    // Map frontend data to database model with ALL fields
    const mappedData: Partial<UseCase> = {
      title: useCaseData.name || useCaseData.title,
      description: useCaseData.briefOverview || useCaseData.description || 'No description provided',
      category: useCaseData.businessUnit || useCaseData.category || 'General',
      tags: useCaseData.tags || [...(useCaseData.categories || []), ...(useCaseData.searchTags || [])],
      created_by: useCaseData.leadName || useCaseData.created_by || 'Anonymous',
      status: 'review', // Submit for review
      
      // New comprehensive fields
      thumbnail_url: useCaseData.thumbnail,
      lead_name: useCaseData.leadName,
      team_members: useCaseData.teamMembers,
      brief_overview: useCaseData.briefOverview,
      business_unit: useCaseData.businessUnit,
      is_for_developers: useCaseData.isForDevelopers || false,
      coding_language: useCaseData.codingLanguage,
      ide: useCaseData.ide,
      tools: useCaseData.toolsAndTechnologies,
      related_links: useCaseData.relatedLinks,
      technical_details: useCaseData.technicalDetails,
      data_requirements: useCaseData.dataRequirements,
      implementation_steps: useCaseData.implementationSteps,
      categories: useCaseData.categories,
      estimated_time: useCaseData.estimatedTime,
      media_links: useCaseData.mediaLinks,
      search_tags: useCaseData.searchTags,
      is_anonymous: useCaseData.isAnonymous || false,
      
      // Use the created step IDs
      step_ids: stepIds.length > 0 ? stepIds : undefined,
      estimated_duration: (() => {
        if (!useCaseData.estimatedTime) return undefined;
        const parsed = parseInt(useCaseData.estimatedTime);
        return isNaN(parsed) ? undefined : parsed;
      })(),
      prerequisites: useCaseData.prerequisites,
    };

    // Create use case in database
    const newUseCase = await useCasesService.createUseCase(mappedData);
    
    console.log(`Use case created with ${stepIds.length} steps`);

    res.status(201).json({
      success: true,
      message: 'Use case submitted successfully',
      data: {
        id: newUseCase.id,
        status: newUseCase.status,
        title: newUseCase.title,
        created_at: newUseCase.created_at,
        steps_created: stepIds.length
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
