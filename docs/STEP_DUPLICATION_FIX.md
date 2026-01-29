# Step Duplication Fix

## Problem Description

When adding preconfigured steps (like "Setup GitHub Personal Account") to use cases, the system was creating **duplicate steps** instead of referencing the existing steps from the Steps Library.

### Symptoms
- Preconfigured steps appeared as "custom steps" when viewing use cases
- Steps lacked the full content from the original preconfigured step
- Multiple copies of the same step existed in the database
- Use cases didn't benefit from updates to preconfigured steps

## Root Cause

In `src/server/routes/useCases.ts`, the step lookup logic was flawed:

1. **Used wrong lookup method**: `getStepById()` only works with UUIDs, not string identifiers
2. **Failed to find existing steps**: Preconfigured steps use string identifiers (e.g., "setup-github-personal-account")
3. **Created duplicates**: When lookup failed, it created a new step with the same title but different UUID
4. **Marked as custom**: These duplicates were treated as custom steps

## The Fix

### Changes Made to `src/server/routes/useCases.ts`

**Before:**
```typescript
// Used getStepById() which only handles UUIDs
existingStep = await stepsService.getStepById(stepId);
// If not found, created a duplicate step
```

**After:**
```typescript
// Uses getStepsByIdentifiers() which handles both UUIDs and string identifiers
const steps = await stepsService.getStepsByIdentifiers([stepId]);
if (steps.length > 0) {
  existingStep = steps[0];
}
// If preconfigured step not found, logs warning and skips (no duplicate)
```

### Key Improvements

1. **Proper Lookup**: Uses `getStepsByIdentifiers()` which supports:
   - UUIDs (e.g., `"550e8400-e29b-41d4-a716-446655440000"`)
   - String identifiers (e.g., `"setup-github-personal-account"`)

2. **No Duplication**: 
   - Preconfigured steps are properly found and referenced
   - Only creates new steps for actual custom steps (IDs starting with "custom-")
   - Logs warnings if preconfigured steps are missing

3. **Better Logging**:
   - `✓ Using existing preconfigured step: [id] - [title]`
   - `✓ Created new custom step: [id] - [title]`
   - `⚠️ Preconfigured step "[id]" not found in database`

## Testing the Fix

### 1. Test with Preconfigured Steps

1. Navigate to the use case submission form
2. Add a preconfigured step (e.g., "Setup GitHub Personal Account")
3. Submit the use case
4. Check server console logs - should see: `✓ Using existing preconfigured step`
5. View the use case in "Get Started" mode
6. Verify the step shows full content from the Steps Library

### 2. Test with Custom Steps

1. Add a custom step to a use case
2. Submit the use case
3. Check server console logs - should see: `✓ Created new custom step`
4. Verify custom step appears correctly

### 3. Test Mixed Steps

1. Add both preconfigured and custom steps to a use case
2. Submit and verify both work correctly
3. Each should have appropriate log message

## Handling Existing Duplicates

If you have existing use cases with duplicated preconfigured steps:

### Option 1: Automated Migration Script (⭐ Recommended)

An automated migration script has been created at `scripts/fixDuplicateSteps.js` to fix all duplicate steps automatically:

```bash
# First, test what will be fixed (dry run - makes NO changes)
node scripts/fixDuplicateSteps.js --dry-run

# Then apply the fixes
node scripts/fixDuplicateSteps.js
```

**What the script does:**
1. ✅ Identifies all duplicate steps (same title as preconfigured steps but different UUIDs)
2. ✅ Maps each duplicate to its original preconfigured step
3. ✅ Updates all use cases to reference the original steps
4. ✅ Deletes the duplicate steps
5. ✅ Verifies the fix was successful

**Example output:**
```
╔════════════════════════════════════════════════════════╗
║  Fix Duplicate Steps Migration Script                 ║
╚════════════════════════════════════════════════════════╝

🔍 Step 1: Finding duplicate steps...

Found 3 duplicate step(s):

1. "Setup GitHub Personal Account"
   Duplicate ID: abc-123 (created by John Doe)
   Original ID:  def-456 (created by AI Team)

2. "Install VS Code"
   Duplicate ID: ghi-789 (created by Jane Smith)
   Original ID:  jkl-012 (created by AI Team)

🔍 Step 2: Finding affected use cases...

Found 2 affected use case(s):

1. "Developer Onboarding" (approved)
   Uses 2 duplicate step(s)

2. "Quick Start Guide" (approved)
   Uses 1 duplicate step(s)

🔧 Step 3: Updating use cases to reference original steps...

✅ Updated "Developer Onboarding"
✅ Updated "Quick Start Guide"

🗑️  Step 4: Deleting duplicate steps...

✅ Deleted 3 duplicate step(s)

✨ Step 5: Verifying the fix...

✅ Verification successful! No duplicate steps remain.

╔════════════════════════════════════════════════════════╗
║  Migration Summary                                     ║
╚════════════════════════════════════════════════════════╝

📊 Migration Results:
   - Fixed 3 duplicate step(s)
   - Updated 2 use case(s)
   - Deleted 3 duplicate step(s)

✅ Migration completed successfully!
```

**Safety features:**
- ⚠️  **Dry run mode** to preview changes before applying them
- 🔒 **Transactional updates** to ensure data integrity
- ✅ **Automatic verification** after migration
- 📊 **Detailed logging** of all changes

### Option 2: Manual Database Cleanup

```sql
-- 1. Find duplicate steps (same title as preconfigured steps but different UUIDs)
SELECT s1.id, s1.title, s1.created_by, s1.created_at
FROM steps s1
WHERE s1.title IN (
  SELECT title 
  FROM steps 
  WHERE created_by = 'AI Team'
)
AND s1.created_by != 'AI Team'
ORDER BY s1.title, s1.created_at;

-- 2. For each duplicate, update use cases to reference the original
UPDATE use_cases
SET step_ids = array_replace(
  step_ids, 
  '[duplicate-step-uuid]', 
  '[original-step-uuid]'
)
WHERE '[duplicate-step-uuid]' = ANY(step_ids);

-- 3. Delete the duplicate steps
DELETE FROM steps WHERE id = '[duplicate-step-uuid]';
```

### Option 2: Re-submit Use Cases

1. View affected use cases in Review Library
2. Edit and re-save them (this will use the fixed logic)
3. The system will now properly reference preconfigured steps

### Option 3: Migration Script

Create a migration script to automatically:
1. Identify duplicates
2. Update use case references
3. Remove duplicate steps

Example: `scripts/fixDuplicateSteps.js`

## Prevention

The fix ensures this won't happen again by:

1. **Always checking for existing steps first** using the correct lookup method
2. **Only creating new steps for custom steps** (those with IDs starting with "custom-")
3. **Logging warnings** if preconfigured steps are referenced but not found
4. **Refusing to create duplicates** - skips missing preconfigured steps instead

## Additional Notes

### Step Identification
- **Preconfigured steps**: Use string identifiers (e.g., "setup-github-personal-account")
- **Custom steps**: Use IDs starting with "custom-" (e.g., "custom-1234567890-0")
- **Database storage**: All steps stored with UUID primary keys

### Step Lookup Process
1. Check if step is custom (ID starts with "custom-")
2. If not custom, use `getStepsByIdentifiers()` to find preconfigured step
3. If found, use existing step's UUID
4. If not found and is custom, create new step
5. If not found and is preconfigured, log warning and skip

## Future Enhancements

Consider implementing:
1. **Step validation on submission**: Verify all preconfigured steps exist before allowing submission
2. **Automatic duplicate detection**: Alert users if they're using duplicated steps
3. **Bulk cleanup tool**: UI for identifying and fixing existing duplicates
4. **Step synchronization**: Auto-update use cases when preconfigured steps are modified
