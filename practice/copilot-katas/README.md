# GitHub Copilot Katas

Practice exercises to master GitHub Copilot's code generation and refactoring capabilities.

## Objective

Develop good judgment in accepting/dismissing Copilot suggestions and learn effective prompting patterns through comment-to-code exercises.

## Context

GitHub Copilot excels at:
- Generating boilerplate code from comments
- Autocompleting repetitive patterns
- Writing unit tests
- Refactoring code

These katas help you practice using Copilot effectively and critically evaluating its suggestions.

## Katas

### Kata 1: Email Validator (TypeScript)

**Objective:** Generate an email validation function using only comments.

**Starter:** `typescript/email-validator/task.md`

**Steps:**
1. Open `typescript/email-validator/starter.ts`
2. Write comment: `// Function to validate email addresses using regex`
3. Wait for Copilot suggestion
4. Review: Does it handle edge cases? (e.g., unicode, multiple @, etc.)
5. Accept or refine the comment for better results
6. Generate unit tests with comment: `// Test cases for email validation including edge cases`

**Verify:**
- [ ] Generated function validates basic emails (user@domain.com)
- [ ] Handles edge cases (multiple @, missing domain, etc.)
- [ ] Tests cover happy path and error cases
- [ ] Tests pass when run

**Accept/Dismiss Rationale:**
Document why you accepted or dismissed suggestions:
- Did it match your requirements?
- Were edge cases covered?
- Is the code readable and maintainable?

### Kata 2: Refactor Messy Function (Python)

**Objective:** Use Copilot to refactor a complex function into smaller, testable pieces.

**Starter:** `python/refactor-messy/messy_function.py`

**Context:** The function does too much:
- Validates input
- Processes data
- Formats output
- Handles errors

**Steps:**
1. Open `python/refactor-messy/messy_function.py`
2. Write comment: `// Refactor into separate functions: validate_input, process_data, format_output`
3. Review Copilot's suggestions
4. Manually compare with your own refactoring approach
5. Document differences in `comparison.md`

**Verify:**
- [ ] Extracted 3-4 smaller functions
- [ ] Each function has single responsibility
- [ ] Original tests still pass
- [ ] Code is more readable
- [ ] Documented Copilot vs manual refactoring differences

### Kata 3: Generate Unit Tests (Java)

**Objective:** Generate comprehensive unit tests for an existing class.

**Starter:** `java/unit-tests/Calculator.java`

**Steps:**
1. Open `java/unit-tests/Calculator.java` (existing implementation)
2. Create `CalculatorTest.java`
3. Write comment: `// Comprehensive unit tests for Calculator class including edge cases`
4. Review generated tests
5. Add any missing edge cases manually

**Verify:**
- [ ] Tests for all public methods
- [ ] Edge cases covered (divide by zero, overflow, etc.)
- [ ] Setup and teardown if needed
- [ ] All tests pass
- [ ] Added manual edge cases Copilot missed

### Kata 4: API Client Generation (TypeScript)

**Objective:** Generate an API client from an OpenAPI spec comment.

**Starter:** `typescript/api-client/openapi-spec.yaml`

**Steps:**
1. Create `api-client.ts`
2. Write comment with API endpoints:
```typescript
// API Client for User Service
// Endpoints:
// - GET /users - List all users
// - GET /users/:id - Get user by ID
// - POST /users - Create new user
// - PUT /users/:id - Update user
// - DELETE /users/:id - Delete user
```
3. Let Copilot generate the client
4. Review: Are types defined? Is error handling included?
5. Refine and iterate

**Verify:**
- [ ] All endpoints implemented
- [ ] TypeScript types defined
- [ ] Error handling included
- [ ] Follows consistent patterns
- [ ] Works with actual API (or mock)

## Contributing New Katas

1. Create a branch: `git checkout -b kata-[name]`
2. Choose a language folder or create new one
3. Add your kata with:
   - `task.md` - Clear objective and steps
   - `starter.*` - Starting code with intentional gaps
   - `tests/` - Test specifications
   - `solution.md` - Your approach and Copilot usage notes
4. Include "Copilot used here" notes showing what was generated vs manual
5. Add comparison between Copilot output and manual approach
6. Open PR with lessons learned

## Tips for Effective Copilot Usage

### Good Comment Patterns:
- ✅ `// Function to validate email addresses using RFC 5322 regex`
- ✅ `// Parse JSON with error handling and type validation`
- ✅ `// Unit tests for edge cases: null, empty string, special characters`

### Poor Comment Patterns:
- ❌ `// do stuff` (too vague)
- ❌ `// fix this` (no context)
- ❌ `// code here` (no specification)

### When to Accept Suggestions:
- ✅ Matches your requirements exactly
- ✅ Handles edge cases appropriately
- ✅ Code is readable and maintainable
- ✅ Follows project conventions

### When to Dismiss Suggestions:
- ❌ Missing critical error handling
- ❌ Doesn't match your architecture
- ❌ Uses deprecated APIs
- ❌ Over-complicated for the task

## Resources

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [Effective Prompting Guide](../docs/copilot-prompting.md)
- [Best Practices](../docs/copilot-best-practices.md)
