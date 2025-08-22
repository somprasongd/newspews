# ไฟล์ Makefile สำหรับบิลด์โปรเจกต์ newspews
# ใช้สำหรับคอมไพล์โค้ด Go เป็น WebAssembly และคัดลอกไฟล์ที่จำเป็นไปยังไดเรกทอรี client

.PHONY: wasm clean

# สร้างไฟล์ WebAssembly สำหรับโปรเจกต์ newspews
wasm: client/public/newspews.wasm client/public/wasm_exec.js

# คอมไพล์ Go เป็น WebAssembly พร้อม optimize ขนาดไฟล์
# ใช้ -ldflags="-s -w" เพื่อลดขนาดไฟล์โดยการลบ symbol table และ debugging information
# หมายเหตุ: ขนาดไฟล์ในปัจจุบัน (~9.2MB) ใหญ่กว่าที่เคยได้ด้วย Go 1.17 (~4.49MB)
# สาเหตุที่เป็นไปได้:
# 1. การเปลี่ยนแปลงใน Go runtime หรือ dependencies ระหว่าง Go 1.17 ถึง 1.25
# 2. Dependencies ใหม่หรือที่เพิ่มขนาดขึ้น
# วิธีลดขนาดเพิ่มเติม:
# 1. พิจารณาใช้ tinygo (ต้องติดตั้งแยกต่างหาก)
# 2. ตรวจสอบ dependencies ว่ามีอันไหนที่ไม่จำเป็น
client/public/newspews.wasm:
	echo "Build newspews.wasm"
	cd ./wasm && GOOS=js GOARCH=wasm go build -ldflags="-s -w" -o ../client/public/newspews.wasm

# คัดลอกไฟล์ wasm_exec.js ที่จำเป็นสำหรับรัน WebAssembly
client/public/wasm_exec.js:
	cp $(shell go env GOROOT)/lib/wasm/wasm_exec.js client/public/

# ลบไฟล์ที่สร้างโดยการบิลด์
clean:
	rm -f client/public/newspews.wasm client/public/wasm_exec.js