# Copilot Instructions for AI Agents

## Project Overview
This codebase is a Playwright automation sandbox focused on end-to-end browser testing. It contains multiple test scenarios for web applications, with a primary emphasis on booking and shopping cart workflows. The main test files are located in the `tests/` directory.

## Architecture & Major Components
- **Test Directory**: All Playwright tests are in `tests/`. Each `.spec.js` file targets a specific scenario (e.g., hotel search, shopping cart visual checks).
- **Configuration**: The main Playwright configuration is in `playwright.config.js`. It sets up test runners, device emulation, timeouts, parallelism, and reporting.
- **Artifacts**: Test results and reports are stored in `test-results/` and `playwright-report/`.

## Developer Workflows
- **Run All Tests**: Use `npx playwright test` from the project root.
- **Run Specific Test**: Use `npx playwright test tests/<filename>.spec.js`.
- **View HTML Report**: After running tests, open `playwright-report/index.html`.
- **Debugging**: Tests run in headed mode by default (`headless: false` in config) for easier debugging.
- **Device Coverage**: Tests run on both desktop and mobile Chrome by default. Other browsers/devices are commented in config and can be enabled as needed.

## Project-Specific Patterns & Conventions
- **Selectors**: Prefer robust selectors (e.g., `getByRole`, `getByPlaceholder`, `data-test` attributes) for reliability across UI changes.
- **Test Structure**: Each test file should be self-contained, with clear setup, action, and assertion phases. Use Playwright's `expect` for assertions.
- **Retries & Parallelism**: CI runs tests with retries and single worker; local runs are fully parallel with no retries.
- **Artifacts**: Screenshots, videos, and traces are collected for failed tests and stored in `test-results/`.

## Integration Points & External Dependencies
- **Playwright**: Main dependency for browser automation. Device profiles are imported from Playwright's `devices`.
- **No custom web server**: The config includes commented-out web server setup; enable if local server is needed.

## Examples
- To add a new test, create a `.spec.js` file in `tests/` and follow the structure of existing files.
- To run a test in mobile emulation, ensure the relevant device is enabled in `playwright.config.js`.

## Key Files & Directories
- `playwright.config.js`: Main configuration for test execution and environment.
- `tests/`: Contains all test scenarios.
- `test-results/`, `playwright-report/`: Store test artifacts and reports.

## Special Notes
- The project is designed for rapid iteration and debugging. Headed mode and parallelism are enabled for developer convenience.
- No `.github/copilot-instructions.md` or README.md was found; this file serves as the primary onboarding guide for AI agents.

---

If any section is unclear or missing important details, please provide feedback to improve these instructions.
