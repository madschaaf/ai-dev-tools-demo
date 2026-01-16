import express from 'express'
import cors from 'cors'
import { initializeAppContext, getAppContextInfo } from './config/appContext.ts'
import autofillRoutes from './routes/autofill.ts'

// Initialize eBay App Context (if configured)
initializeAppContext()

const app = express()
app.use(cors())
app.use(express.json())

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

// Autofill routes
app.use('/api/autofill', autofillRoutes)

const port = process.env.PORT ? Number(process.env.PORT) : 3000
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
