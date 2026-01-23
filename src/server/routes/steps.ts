// API Routes for Steps Management
import { Router } from 'express';
import type { Request, Response } from 'express';
import { stepsService } from '../db/stepsService.ts';

const router = Router();

// GET /api/steps/library - Get approved steps for Library view
router.get('/library', async (req: Request, res: Response) => {
  try {
    const steps = await stepsService.getSteps({ status: 'approved' });
    res.json(steps);
  } catch (error) {
    console.error('Error fetching library steps:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch library steps', error: String(error) });
  }
});

// GET /api/steps - Get all steps with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, category, tags, search } = req.query;
    
    const filters = {
      status: status as string | undefined,
      category: category as string | undefined,
      tags: tags ? (Array.isArray(tags) ? tags as string[] : [tags as string]) : undefined,
      search: search as string | undefined,
    };

    const steps = await stepsService.getSteps(filters);
    res.json({ success: true, data: steps });
  } catch (error) {
    console.error('Error fetching steps:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch steps', error: String(error) });
  }
});

// GET /api/steps/:id - Get a single step by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const step = await stepsService.getStepById(id);

    if (!step) {
      return res.status(404).json({ success: false, message: 'Step not found' });
    }

    res.json({ success: true, data: step });
  } catch (error) {
    console.error('Error fetching step:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch step', error: String(error) });
  }
});

// POST /api/steps - Create a new step
router.post('/', async (req: Request, res: Response) => {
  try {
    const stepData = req.body;

    // Validate required fields
    if (!stepData.title || !stepData.brief_description || !stepData.category || !stepData.created_by) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: title, brief_description, category, created_by' 
      });
    }

    const newStep = await stepsService.createStep(stepData);
    res.status(201).json({ success: true, data: newStep });
  } catch (error) {
    console.error('Error creating step:', error);
    res.status(500).json({ success: false, message: 'Failed to create step', error: String(error) });
  }
});

// PUT /api/steps/:id - Update a step
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stepData = req.body;
    const modifiedBy = stepData.modified_by || 'System';

    const updatedStep = await stepsService.updateStep(id, stepData, modifiedBy);
    res.json({ success: true, data: updatedStep });
  } catch (error) {
    console.error('Error updating step:', error);
    const message = error instanceof Error ? error.message : 'Failed to update step';
    const statusCode = message === 'Step not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, message, error: String(error) });
  }
});

// DELETE /api/steps/:id - Delete a step
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await stepsService.deleteStep(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Step not found' });
    }

    res.json({ success: true, message: 'Step deleted successfully' });
  } catch (error) {
    console.error('Error deleting step:', error);
    res.status(500).json({ success: false, message: 'Failed to delete step', error: String(error) });
  }
});

// POST /api/steps/:id/approve - Approve a step
router.post('/:id/approve', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { approved_by, use_case_ids = [] } = req.body;

    if (!approved_by) {
      return res.status(400).json({ success: false, message: 'approved_by is required' });
    }

    const approvedStep = await stepsService.approveStep(id, approved_by, use_case_ids);
    res.json({ success: true, data: approvedStep });
  } catch (error) {
    console.error('Error approving step:', error);
    const message = error instanceof Error ? error.message : 'Failed to approve step';
    const statusCode = message === 'Step not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, message, error: String(error) });
  }
});

// POST /api/steps/:id/reject - Reject a step
router.post('/:id/reject', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rejected_by, reason } = req.body;

    if (!rejected_by || !reason) {
      return res.status(400).json({ 
        success: false, 
        message: 'rejected_by and reason are required' 
      });
    }

    const rejectedStep = await stepsService.rejectStep(id, rejected_by, reason);
    res.json({ success: true, data: rejectedStep });
  } catch (error) {
    console.error('Error rejecting step:', error);
    const message = error instanceof Error ? error.message : 'Failed to reject step';
    const statusCode = message === 'Step not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, message, error: String(error) });
  }
});

// GET /api/steps/:id/comments - Get comments for a step
router.get('/:id/comments', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await stepsService.getComments(id);
    res.json({ success: true, data: comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch comments', error: String(error) });
  }
});

// POST /api/steps/:id/comments - Add a comment to a step
router.post('/:id/comments', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id, user_name, content, line_number } = req.body;

    if (!user_id || !user_name || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'user_id, user_name, and content are required' 
      });
    }

    const comment = await stepsService.addComment(id, user_id, user_name, content, line_number);
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: 'Failed to add comment', error: String(error) });
  }
});

// GET /api/steps/:id/history - Get history for a step
router.get('/:id/history', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const history = await stepsService.getHistory(id);
    res.json({ success: true, data: history });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch history', error: String(error) });
  }
});

export default router;
