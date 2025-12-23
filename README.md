# eBay Engineering Onboarding Helper

A lightweight React + TypeScript + Vite app that welcomes new engineers and provides quick links and context for common tools: Jira, Airtable, and Sherlock IO. Styling is inspired by eBay Evo foundations, using approachable colors and system fonts.

## Features

- Home page: "Get Started as a Software Engineer at eBay"
- Clickable cards for Jira, Airtable, Sherlock IO
- Dedicated overview pages describing how each tool pertains to the job
- Optional backend stub (TypeScript + Express) exposing `/api/resources`

## Prerequisites

- Node.js 18+ (recommended) and npm

## Quick start

Install dependencies and start the client:

```bash
npm install
npm run dev
```

Start the optional backend in another terminal:

```bash
npm run server
```

Or run both in one go:

```bash
npm run start
```

## Build & preview

```bash
npm run build
npm run preview
```

## Notes on design system

- This project uses simple CSS variables and system fonts for broad compatibility.
- If you have internal access to eBay Evo assets (e.g., Market Sans), you can add them via `@font-face` and update the font-family in `src/styles/theme.css`.

## Project structure

- `src/App.tsx`: Home page and route definitions
- `src/pages/*.tsx`: Tool overview pages
- `src/components/SiteCard.tsx`: Card component used on the home grid
- `src/styles/theme.css`: Lightweight theme using CSS variables
- `src/server/index.ts`: Optional Express server with `/api/resources`

