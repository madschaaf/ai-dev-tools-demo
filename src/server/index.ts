import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initializeAppContext, getAppContextInfo } from './config/appContext.ts'
import { initializeDatabase, closeDatabase } from './db/connection.ts'
import autofillRoutes from './routes/autofill.ts'
import useCaseRoutes from './routes/useCases.ts'
import useCaseAddonsRoutes from './routes/useCaseAddons.ts'
import stepsRoutes from './routes/steps.ts'
import aiStepGenerationRoutes from './routes/aiStepGeneration.ts'

// Initialize eBay App Context (if configured)
initializeAppContext()

// Initialize Database
initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err)
  console.log('Server will continue but database features may not work')
})

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' })) // Increased limit for large use case submissions
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Health check endpoint
app.get('/api/health', (_req, res) => {
  const appContext = getAppContextInfo()
  res.json({
    status: 'healthy',
    appContext,
    timestamp: new Date().toISOString()
  })
})

app.get('/api/resources', (_req, res) => {
  res.json([
    { name: 'Jira', link: 'https://jira.ebay.com', slug: 'jira' },
    { name: 'Airtable', link: 'https://airtable.com', slug: 'airtable' },
    { name: 'Sherlock IO', link: 'https://sherlock.io', slug: 'sherlock' }
  ])
})

// API routes
app.use('/api/autofill', autofillRoutes)
app.use('/api/use-cases', useCaseRoutes)
app.use('/api/use-cases', useCaseAddonsRoutes)
app.use('/api/steps', stepsRoutes)
app.use('/api/ai', aiStepGenerationRoutes)

const port = process.env.PORT ? Number(process.env.PORT) : 3000
const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(async () => {
    console.log('HTTP server closed')
    await closeDatabase()
    process.exit(0)
  })
})

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server')
  server.close(async () => {
    console.log('HTTP server closed')
    await closeDatabase()
    process.exit(0)
  })
})
