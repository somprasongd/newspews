# newspews Project Context for Qwen Code

## Project Overview

This project implements a calculator for the **NEWS (National Early Warning Score)** and **PEWS (Paediatric Early Warning Score)** systems. These are clinical tools used to assess the severity of illness in adult and pediatric patients, respectively, based on physiological parameters like respiratory rate, heart rate, blood pressure, etc.

The core logic for calculating these scores is implemented in **Go** and compiled to **WebAssembly (WASM)**. This WASM module is then integrated into a **Next.js** (React) web application, allowing the score calculation to run directly in the browser. The application provides a user interface for inputting patient vital signs and other relevant data, and displays the calculated NEWS or PEWS score.

## Architecture and Technologies

- **Core Logic (Score Calculation):** Go (compiled to WASM)
  - File: `wasm/services/score.go`
- **WASM Integration:** Go (wasm module setup)
  - File: `wasm/main.go`
- **Frontend Application:** Next.js (React/TypeScript)
  - Directory: `client/`
- **Build Process:** Makefile orchestrates the Go WASM build and places artifacts into the Next.js `public` directory.
  - File: `Makefile`

## Key Logic (NEWS/PEWS Calculation)

Based on the `README.md` and `wasm/services/score.go`:

1.  **Age Group Determination:** The input patient's age (year, month, day) is used to determine an `ageGroup` (1-10).
2.  **Score Selection:** If `ageGroup` is 10 (adults, >=15 years), the **NEWS** formula is used. Otherwise, the **PEWS** formula is used.
3.  **Parameter Scoring:** Each physiological parameter (e.g., RR, HR, Temp) is scored individually based on predefined ranges. These ranges can vary depending on the `ageGroup`.
4.  **Total Score Calculation:**
    -   **NEWS:** `Total = RR + HR + O2_sup + Temp + SysBP + SpO2 + AVPU`
    -   **PEWS:** `Total = Behavior + Nebulize + Vomiting + Cardiovascular(CRT) + Respiratory + HR`
    -   Note: For PEWS, `Respiratory = max(RR_score, O2_sup_score)`.

## Building and Running

1.  **Build WASM Module:**
    -   Run the command specified in the `Makefile` target `wasm`. This command:
        -   Sets environment variables `GOOS=js` and `GOARCH=wasm`.
        -   Uses `go build` to compile the Go code in the `wasm` directory into a `newspews.wasm` file.
        -   Places the resulting `newspews.wasm` file into `client/public/`.
        -   Copies the necessary `wasm_exec.js` helper file (from the Go installation) into `client/public/`.
    -   Command: `cd ./wasm && GOOS=js GOARCH=wasm go build -o ../client/public/newspews.wasm && cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ../client/public/`
    -   Shortcut: `make wasm`
2.  **Run the Development Server (Frontend):**
    -   Navigate to the `client` directory.
    -   Install dependencies (if not already done): `npm install` or `yarn install`.
    -   Start the Next.js development server: `npm run dev` or `yarn dev`.
    -   The application will typically be available at `http://localhost:3000`.

## Development Conventions

- **Go (WASM Backend):**
  - Code structure follows standard Go conventions.
  - Logic is encapsulated in the `services` package.
  - Input validation is performed using the `validator/v10` package.
- **Next.js (Frontend):**
  - Written in TypeScript.
  - Uses Ant Design (`antd`) for UI components.
  - Follows standard Next.js project structure (`pages`, `components`, `services`, `public`).
  - Communication with the WASM module occurs via the global `window.calScore` function injected by `wasm_exec.js` and `main.go`.

## Git Commit Conventions

When committing changes to this repository, please follow these conventions:

1. **Commit Message Format:**
   - Use conventional commit format: `<type>(<scope>): <subject>`
   - Types:
     - `feat`: A new feature
     - `fix`: A bug fix
     - `chore`: Routine tasks, maintenance, or tooling changes
     - `docs`: Documentation changes
     - `style`: Code style changes (formatting, missing semicolons, etc.)
     - `refactor`: Code refactoring without adding features or fixing bugs
     - `perf`: Performance improvements
     - `test`: Adding or modifying tests
   - Scope (optional): Specify the part of the codebase affected (e.g., `wasm`, `client`, `build`)
   - Subject: A concise description of the changes in present tense

2. **Examples:**
   - `feat(wasm): add new scoring algorithm for PEWS`
   - `fix(client): correct input validation for age fields`
   - `chore(build): update Makefile for smaller WASM output`
   - `docs: update README with usage instructions`
   - `refactor(wasm): restructure score calculation logic`

3. **Commit Message Body (Optional):**
   - For complex changes, add a detailed description after a blank line
   - Explain the "why" behind the changes, not just the "what"
   - Keep lines under 72 characters

4. **Atomic Commits:**
   - Each commit should represent a single logical change
   - Avoid mixing unrelated changes in the same commit
   - Keep commits small and focused

5. **Branch Naming:**
   - Use descriptive names: `feature/new-scoring-algorithm`, `fix/age-calculation-bug`, `docs/update-readme`

## Post-Commit and Release Procedures

### Summarizing Committed Changes

After making commits to the repository, follow these steps to create a summary of changes:

1. **Create a COMMIT.md file:**
   - Generate a summary of the changes in the commit(s) using `git log` and `git show`
   - Format the summary following the style in `COMMIT.md` (if it exists) or create a new one
   - Include the commit ID, type of changes, and detailed descriptions of modifications
   - Add statistics such as number of files changed, insertions, and deletions

2. **Update the summary file:**
   - Add the new summary to the `COMMIT.md` file
   - Commit the `COMMIT.md` file with a message like `docs: update commit summary`

### Updating the Change Log for Releases

When creating a new release tag, follow these steps to maintain a change log:

1. **Review commits since the last release:**
   - Use `git log <last-release-tag>..HEAD` to see all commits since the last release
   - Identify significant features, fixes, and changes

2. **Update CHANGELOG.md (or create one if it doesn't exist):**
   - Add a new section for the release with the version number and release date
   - Categorize changes under appropriate headings (Features, Bug Fixes, Breaking Changes, etc.)
   - Provide brief descriptions of each change with references to relevant commit IDs

3. **Tag the release:**
   - Create a new tag with `git tag -a v<version> -m "Release version <version>"`
   - Push the tag to the remote repository with `git push origin v<version>`

4. **Create a GitHub Release (if using GitHub):**
   - Go to the GitHub releases page for the repository
   - Create a new release using the tag you just created
   - Use the content from CHANGELOG.md as the release notes
