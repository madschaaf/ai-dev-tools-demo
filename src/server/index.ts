import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/api/resources', (_req, res) => {
  res.json([
    { name: 'Jira', link: 'https://jira.ebay.com', slug: 'jira' },
    { name: 'Airtable', link: 'https://airtable.com', slug: 'airtable' },
    { name: 'Sherlock IO', link: 'https://sherlock.io', slug: 'sherlock' }
  ])
})

const port = process.env.PORT ? Number(process.env.PORT) : 3000
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
