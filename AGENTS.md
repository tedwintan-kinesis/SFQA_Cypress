# AI Agent Instructions for SFQA_Cypress

## Project Overview
E2E test suite using Cypress v14 with Cypress Cloud integration and GitHub Actions CI/CD (2x parallel runners).

## Quick Setup
```bash
npm install      # Install deps
npm test         # Run Cypress headless tests
npm run cy:open  # Open interactive test runner
```

## Key Commands & Conventions

### Testing
- **Test specs**: `cypress/e2e/*.cy.js` (Cypress v10+ structure)
- **Run headless**: `npm test` → runs all specs
- **Run interactive**: `npm run cy:open` → Cypress UI launcher
- **CI/CD**: `.github/workflows/cypress.yml` → runs in 2 parallel containers

### Configuration
- `cypress.config.js`: Main config (projectId: `auyzcr`)
- Starts app server on `http://localhost:3000` (CI expects this)
- Cloud recording enabled when `CYPRESS_RECORD_KEY` secret set in GitHub

## Conventions

### Test Structure
- Use Page Object Model (POM) or helper functions in `cypress/support/` for reusable selectors/actions
- Specs in `cypress/e2e/` should have `.cy.js` extension
- Use `beforeEach()` for test setup, avoid shared state
- Keep tests focused on single user journey per spec

### Selectors
- Prefer `data-testid` attributes for robust element selection
- Avoid fragile CSS class selectors
- Use `cy.contains()` only for stable text content

### Parallel Testing
- Use `tags` in spec filenames or spec metadata for grouping (if needed)
- Avoid tests that create conflicting DB state
- Use Cypress Cloud recording for debugging parallel failures

## CI/CD Setup Notes
- Requires `CYPRESS_RECORD_KEY` secret in GitHub → Settings → Secrets → Actions
- `GITHUB_TOKEN` auto-injected by Actions
- `npm start` must serve app on port 3000
- 2 parallel containers via matrix strategy

## Project Structure
```
cypress/
  e2e/           # Test specs
  support/       # Helpers, commands, config
  downloads/     # Cypress download artifacts (ephemeral)
.github/workflows/
  cypress.yml    # CI/CD pipeline
cypress.config.js
package.json
```

## Common Tasks

### Add a new test spec
1. Create `cypress/e2e/feature.cy.js`
2. Import helpers from `cypress/support/commands.js`
3. Run `npm run cy:open` to verify
4. Push - CI runs in parallel

### Debug a failing CI test
1. Check Cypress Cloud dashboard (linked via projectId)
2. Look for video/screenshot artifacts
3. Reproduce locally: `npm run cy:open`

### Modify test concurrency
Edit `.github/workflows/cypress.yml` matrix.containers value (currently 2)

## Links
- [Cypress docs](https://docs.cypress.io)
- [Cypress Cloud setup](https://docs.cypress.io/cloud/get-started/setup)
- [GitHub Actions parallelization](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations)
