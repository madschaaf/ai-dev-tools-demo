# PostgreSQL Setup Guide for macOS

## Installation

### Using Homebrew (Recommended)
```bash
brew install postgresql@15
```

### Start PostgreSQL Service
```bash
# Start PostgreSQL now and restart at login
brew services start postgresql@15

# Or start manually (stops when terminal closes)
/opt/homebrew/opt/postgresql@15/bin/postgres -D /opt/homebrew/var/postgresql@15
```

### Add PostgreSQL to PATH
```bash
# Add to your ~/.zshrc or ~/.bash_profile
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Verify Installation
```bash
psql --version
# Should output: psql (PostgreSQL) 15.x
```

## Database Setup

### 1. Create Database
```bash
createdb ai_dev_tools
```

### 2. Verify Database
```bash
psql -l
# Should list ai_dev_tools in the databases
```

### 3. Run Schema
```bash
psql -d ai_dev_tools -f src/server/db/schema.sql
```

### 4. Verify Tables
```bash
psql -d ai_dev_tools

# Inside psql:
\dt               -- List all tables
\d users          -- Describe users table
\d use_cases      -- Describe use_cases table
\d steps          -- Describe steps table
\q                -- Quit psql
```

## Environment Configuration

### Update .env File
Create or update `.env` in the project root:

```env
# Database Configuration
DATABASE_URL=postgresql://localhost:5432/ai_dev_tools

# Or with credentials if needed:
# DATABASE_URL=postgresql://username:password@localhost:5432/ai_dev_tools

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Common Issues & Solutions

### Issue: "command not found: psql"
**Solution**: PostgreSQL binaries not in PATH
```bash
# Add to PATH
export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"

# Or use full path
/opt/homebrew/opt/postgresql@15/bin/psql --version
```

### Issue: "psql: error: connection to server on socket..."
**Solution**: PostgreSQL service not running
```bash
brew services start postgresql@15
```

### Issue: "database does not exist"
**Solution**: Create the database first
```bash
createdb ai_dev_tools
```

### Issue: "permission denied"
**Solution**: Ensure PostgreSQL is properly initialized
```bash
# Check PostgreSQL data directory
ls -la /opt/homebrew/var/postgresql@15/

# If empty, initialize
initdb /opt/homebrew/var/postgresql@15
```

## Testing the Connection

### Test from Command Line
```bash
# Connect to database
psql -d ai_dev_tools

# Run a test query
SELECT current_database();

# List tables
\dt

# Exit
\q
```

### Test from Application
```bash
# Start the server
npm start

# The server should connect to PostgreSQL
# Check logs for: "Connected to PostgreSQL database"
```

## Useful PostgreSQL Commands

### Database Management
```bash
# List all databases
psql -l

# Create database
createdb database_name

# Drop database (careful!)
dropdb database_name

# Backup database
pg_dump ai_dev_tools > backup.sql

# Restore database
psql ai_dev_tools < backup.sql
```

### Inside psql
```sql
-- List databases
\l

-- Connect to database
\c ai_dev_tools

-- List tables
\dt

-- Describe table
\d table_name

-- List users
\du

-- Show current database
SELECT current_database();

-- Exit
\q
```

## Uninstall (if needed)

```bash
# Stop service
brew services stop postgresql@15

# Uninstall
brew uninstall postgresql@15

# Remove data (optional)
rm -rf /opt/homebrew/var/postgresql@15
```

## Alternative: Using Docker

If you prefer Docker over local installation:

```bash
# Pull PostgreSQL image
docker pull postgres:15

# Run PostgreSQL container
docker run --name ai-dev-postgres \
  -e POSTGRES_DB=ai_dev_tools \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# Update .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_dev_tools

# Run schema
docker exec -i ai-dev-postgres psql -U postgres -d ai_dev_tools < src/server/db/schema.sql
```

## Next Steps

After PostgreSQL is set up:

1. ✅ PostgreSQL installed and running
2. ✅ Database created (`ai_dev_tools`)
3. ✅ Schema loaded
4. ✅ Environment variables configured
5. 🚀 Start the application: `npm start`
6. 🧪 Test the integration

See `docs/USE_CASE_DATABASE_INTEGRATION.md` for testing the use case submission flow.
