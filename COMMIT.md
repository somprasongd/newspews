# Commit Summary

## chore(ci): update githubpage workflow to use latest actions and best practices (1b08f06)

* Update runner to `ubuntu-latest`
* Update GitHub Actions to latest major versions (`actions/checkout@v4`, `actions/setup-go@v5`, `actions/setup-node@v4`)
* Replace `peaceiris/actions-gh-pages` with official GitHub Pages actions (`actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`)
* Add permissions and concurrency blocks
* Simplify Node.js caching using `actions/setup-node`'s built-in `cache: 'npm'` option
* Set Go version to `1.25` and Node version to `20.x`
* Add `-ldflags="-s -w"` to the `go build` command for WASM optimization
* Add environment configuration for deployment

### Detailed Changes

#### chore(ci): update githubpage workflow

* Updated runner from `ubuntu-20.04` to `ubuntu-latest`
* Updated `actions/checkout` from `v2` to `v4`
* Updated `actions/setup-go` from `v2` to `v5`
* Updated `actions/setup-node` from `v2` to `v4`
* Replaced `peaceiris/actions-gh-pages@v2.5.0` with `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`
* Added `permissions` block for explicit token permissions
* Added `concurrency` block to prevent concurrent deployments
* Added `environment` block for deployment tracking
* Changed Node.js version from `16.x` to `20.x`
* Utilized `actions/setup-node`'s built-in `cache: 'npm'` option
* Added `-ldflags="-s -w"` to the `go build` command in the "Build WASM" step
* Updated Go version from `1.17.6` to `1.25`

### Commit Statistics

* Commit ID: 1b08f06
* 1 file changed
* 38 insertions
* 25 deletions

## chore: update project with Qwen context and improvements (94aa29c)

* Add QWEN.md file for project context
* Update Makefile with better documentation and optimizations
* Update Go version in go.mod
* Update main.go with minor improvements

### Detailed Changes

#### feat: add QWEN.md documentation

* Created comprehensive context file for Qwen Code
* Added project overview, architecture, and technologies
* Documented key logic for NEWS/PEWS calculations
* Included building and running instructions
* Added development conventions
* Added Git commit conventions section

#### chore: improve Makefile

* Added Thai comments for better understanding
* Restructured to properly define targets and dependencies
* Added `-ldflags="-s -w"` to reduce WASM file size
* Fixed path to `wasm_exec.js` to use `$(shell go env GOROOT)/lib/wasm/wasm_exec.js`
* Added a `clean` target for removing generated files
* Added notes about the WASM file size difference compared to Go 1.17

#### chore: update Go modules

* Updated Go version from 1.17 to 1.25 in `go.mod`
* Updated dependencies to newer versions:
  * `github.com/go-playground/validator/v10`: v10.10.0 → v10.27.0
  * `github.com/go-playground/locales`: v0.14.0 → v0.14.1
  * `github.com/go-playground/universal-translator`: v0.18.0 → v0.18.1
* Updated indirect dependencies
* Removed unused dependencies

#### feat: update WASM exec

* Updated `client/public/wasm_exec.js` with the latest version from Go 1.25
* Improved compatibility and performance
* Updated global object references from `global` to `globalThis`

#### chore: add build constraints

* Added build constraints to `wasm/main.go`:

  ```go
  //go:build js && wasm
  // +build js,wasm
  ```

### Commit Statistics

* Commit ID: 94aa29c
* 7 files changed
* 196 insertions
* 182 deletions
