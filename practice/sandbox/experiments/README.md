# AI Sandbox Experiments

Practice comparing AI model outputs and evaluating prompt effectiveness.

## Objective

Compare outputs across different AI models using evaluation rubrics to understand model strengths and weaknesses.

## Context

Different AI models excel at different tasks. By comparing outputs side-by-side with a consistent rubric, you'll learn which models work best for specific use cases (code generation, documentation, test creation, etc.).

## Exercises

### Exercise 1: Transform Specs into Test Cases

**Objective:** Generate test cases from a feature specification using two different models.

**Feature Spec Example:**
```
Feature: User Login Validation
- Users must enter a valid email address
- Password must be at least 8 characters
- Account locks after 5 failed attempts
- Users receive email notification on successful login
```

**Steps:**
1. Choose two AI models (e.g., ChatGPT and Claude)
2. Use identical prompts: "Generate comprehensive test cases for this feature specification: [paste spec]"
3. Compare outputs using the rubric below
4. Document your findings in `results/[your-name]-login-validation.md`

**Evaluation Rubric:**
- **Coverage** (1-5): Does it cover all requirements?
- **Edge Cases** (1-5): Does it include boundary conditions, error states?
- **Clarity** (1-5): Are test cases clear and unambiguous?
- **Completeness** (1-5): Does it include setup, execution, and expected results?

**Verify:**
- [ ] Generated test cases from Model A
- [ ] Generated test cases from Model B
- [ ] Completed rubric evaluation for both
- [ ] Documented which model performed better and why

### Exercise 2: Bug Report Classification

**Objective:** Compare model accuracy in classifying bug severity.

**Sample Bug Reports:** See `data/bug-reports.json`

**Steps:**
1. Prompt both models: "Classify this bug report by severity (Critical/High/Medium/Low): [bug description]"
2. Compare classifications against the answer key
3. Calculate accuracy for each model
4. Document findings in `results/[your-name]-bug-classification.md`

**Verify:**
- [ ] Classified all 10 bug reports with both models
- [ ] Calculated accuracy scores
- [ ] Identified patterns in misclassifications

## Contributing New Experiments

1. Create a branch: `git checkout -b experiment-[name]`
2. Add your experiment spec to this README
3. Include sample data in `data/` folder
4. Add baseline outputs in `baselines/`
5. Create a PR with your findings

## Resources

- [AI Sandbox Models Documentation](../../docs/ai-sandbox-models.md)
- [Evaluation Rubrics](./rubrics/)
- [Baseline Outputs](./baselines/)
