# Commit Summary

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
