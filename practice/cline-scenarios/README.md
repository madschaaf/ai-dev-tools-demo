# Cline Practice Scenarios

Hands-on exercises for mastering Cline's plan-and-execute workflow.

## Objective

Learn to use Cline effectively for feature development by breaking down tasks into plans and executing them with file-scoped changes.

## Context

Cline excels at planning multi-step tasks and executing them systematically. These scenarios help you practice:
- Creating detailed implementation plans
- Making file-scoped changes
- Using Cline's memory bank for context
- Reviewing and approving changes before execution

## Scenarios

### Scenario 1: Add Dark Mode Toggle

**Objective:** Implement a dark mode feature with Cline's assistance.

**Workspace:** `dark-mode-starter/`

**Acceptance Criteria:**
- Toggle button in settings page
- Dark theme CSS variables
- Theme state persisted in localStorage
- All components respect theme preference
- No console errors

**Steps:**
1. Open `dark-mode-starter/` in VS Code
2. Open Cline extension
3. Prompt: "Help me plan how to add a dark mode toggle to this app"
4. Review Cline's plan
5. Execute step-by-step, reviewing each file change
6. Test the toggle works correctly

**Verify:**
- [ ] Plan includes all necessary files
- [ ] CSS variables defined for both themes
- [ ] Toggle switches between light and dark
- [ ] Theme preference persists on reload
- [ ] All components styled correctly in both modes

### Scenario 2: Add Input Validation

**Objective:** Add form validation using Cline's memory bank feature.

**Workspace:** `form-validation-starter/`

**Acceptance Criteria stored in memory bank:**
```
Email validation rules:
- Must contain @ symbol
- Must have domain
- Reject disposable email domains (example.com, test.com)

Password validation rules:
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character
```

**Steps:**
1. Open `form-validation-starter/` in VS Code
2. Store acceptance criteria in Cline's memory bank
3. Prompt: "Add form validation according to the criteria in memory"
4. Review the implementation plan
5. Execute and test validation

**Verify:**
- [ ] Cline referenced memory bank criteria
- [ ] Email validation matches all rules
- [ ] Password validation matches all rules
- [ ] Error messages are user-friendly
- [ ] Tests pass

### Scenario 3: Refactor API Service

**Objective:** Refactor messy API code with proper error handling.

**Workspace:** `api-refactor-starter/`

**Context:** The existing `api-service.js` has:
- No error handling
- Duplicated fetch logic
- Hardcoded URLs
- No retry logic

**Steps:**
1. Open `api-refactor-starter/` in VS Code
2. Prompt: "Refactor api-service.js to add error handling, remove duplication, and add retry logic"
3. Review Cline's refactoring plan
4. Execute changes step-by-step
5. Run tests to verify functionality

**Verify:**
- [ ] Centralized fetch wrapper function
- [ ] Proper error handling with try/catch
- [ ] Retry logic for failed requests
- [ ] Environment-based URL configuration
- [ ] All existing tests still pass
- [ ] New error handling tests added

## Contributing New Scenarios

1. Create a branch: `git checkout -b scenario-[name]`
2. Create a new folder: `[scenario-name]-starter/`
3. Include:
   - `README.md` with objective and acceptance criteria
   - Starter code with intentional gaps
   - `tests/` folder with test specifications
   - `solution/` folder (optional) with reference implementation
4. Add your scenario to this README
5. Open a PR with lessons learned

## Tips for Using Cline

- **Be specific:** Give clear objectives and acceptance criteria
- **Use memory bank:** Store important context that applies across multiple prompts
- **Review plans:** Always review Cline's plan before executing
- **Iterative refinement:** Break large tasks into smaller prompts
- **File scope:** Use @ mentions to scope Cline to specific files

## Resources

- [Cline Documentation](../docs/cline-guide.md)
- [Memory Bank Best Practices](../docs/cline-memory-bank.md)
- [Common Prompting Patterns](../docs/cline-prompts.md)
