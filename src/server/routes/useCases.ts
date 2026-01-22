import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Storage path for use cases (can be replaced with database later)
const STORAGE_PATH = path.join(__dirname, '../../data/use-cases.json')

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(STORAGE_PATH)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load use cases from storage
async function loadUseCases() {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(STORAGE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

// Save use cases to storage
async function saveUseCases(useCases: any[]) {
  await ensureDataDirectory()
  await fs.writeFile(STORAGE_PATH, JSON.stringify(useCases, null, 2), 'utf-8')
}

// POST /api/use-cases - Submit a new use case
router.post('/', async (req, res) => {
  try {
    const useCaseData = req.body

    // Generate UUID (simple version - in production use a library like uuid)
    const id = `use-case-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const newUseCase = {
      id,
      ...useCaseData,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString()
    }

    // Load existing use cases
    const useCases = await loadUseCases()
    
    // Add new use case
    useCases.push(newUseCase)
    
    // Save to storage
    await saveUseCases(useCases)

    res.status(201).json({
      success: true,
      message: 'Use case submitted successfully',
      data: newUseCase
    })
  } catch (error) {
    console.error('Error submitting use case:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit use case',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET /api/use-cases - Get all use cases
router.get('/', async (_req, res) => {
  try {
    const useCases = await loadUseCases()
    res.json({
      success: true,
      data: useCases
    })
  } catch (error) {
    console.error('Error fetching use cases:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch use cases',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET /api/use-cases/:id - Get a specific use case
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const useCases = await loadUseCases()
    const useCase = useCases.find((uc: any) => uc.id === id)

    if (!useCase) {
      return res.status(404).json({
        success: false,
        message: 'Use case not found'
      })
    }

    res.json({
      success: true,
      data: useCase
    })
  } catch (error) {
    console.error('Error fetching use case:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch use case',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// PUT /api/use-cases/:id - Update a use case (for drafts)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const useCases = await loadUseCases()
    const index = useCases.findIndex((uc: any) => uc.id === id)

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Use case not found'
      })
    }

    // Update the use case
    useCases[index] = {
      ...useCases[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    await saveUseCases(useCases)

    res.json({
      success: true,
      message: 'Use case updated successfully',
      data: useCases[index]
    })
  } catch (error) {
    console.error('Error updating use case:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update use case',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
