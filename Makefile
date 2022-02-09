wasm:
	echo "Build newspews.wasm"
	cd ./wasm
  GOOS=js GOARCH=wasm go build -o ../client/public/newspews.wasm
	cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ../client/public/