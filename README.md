# newspews

## สูตรการคำนวณคะแนน

## กำหนดกลุ่มอายุ (ageGroup)

- คำนวณจาก `Year/Month/Day` แล้วแมปเป็นกลุ่ม 1–10
    - 1: แรกเกิดถึง 96 ชม., 2: 4 วัน–1 เดือน, 3: อายุ 1 เดือน, 4: 2–11 เดือน, 5: ≤2 ปี, 6: ≤5 ปี, 7: ≤7 ปี, 8: ≤9 ปี, 9: <15 ปี, 10: ≥15 ปี (ผู้ใหญ่).
- ถ้า `ageGroup == 10` ใช้สูตร **NEWS**; ถ้าไม่ใช่ใช้ **PEWS**. [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

## โครงสูตรรวม

- **NEWS (ผู้ใหญ่)**:
    
    `Total = RR + HR + O2_sup + Temp + SysBP + SpO2 + AVPU` (คำนวณเป็นคะแนนย่อยแล้วบวกกัน). [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)
    
- **PEWS (กุมาร)**:
    
    `Total = Behavior + Nebulize + Vomiting + Cardiovascular(CRT) + Respiratory + HR`
    
    โดย `Respiratory = max(RR, O2_sup)` (เอาค่าสูงสุดระหว่างคะแนน RR และคะแนนเสริมออกซิเจน). [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)
    

## เกณฑ์ให้คะแนนแต่ละตัว (สรุปตามเงื่อนไขในโค้ด)

### 1) อัตราการหายใจ (RR)

ใช้คอนสแตนต์ตามกลุ่มอายุ: `rrMidl`, `rrMidu`, `rrMax` (ดึงจากอาร์เรย์ตาม `ageGroup-1`)

- **NEWS (ผู้ใหญ่ / กลุ่ม 10, ค่าที่ใช้: rrMin=8, rrMidl=11, rrMidu=20, rrMax=24)**
    - `≤8 → 3`, `≤11 → 1`, `≤20 → 0`, `≤24 → 2`, `>24 → 3`.
- **PEWS (เด็ก)**
    - `< rrMidl → 3`, `< rrMidu → 0`, `< rrMax → 1`, `≥ rrMax → 2`. [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

### 2) ชีพจร (HR)

ใช้คอนสแตนต์ `hrMidl`, `hrMidu`, `hrMax` (ตามกลุ่ม) และมี `hrMin=40`, `hrMid=90`

- **NEWS (ผู้ใหญ่ / กลุ่ม 10: hrMidl=50, hrMidu=110, hrMax=130)**
    - `≤40 → 3`, `≤50 → 1`, `≤90 → 0`, `≤110 → 1`, `≤130 → 2`, `>130 → 3`.
- **PEWS (เด็ก)**
    - `< hrMidl → 3`, `> hrMidu+30 → 3`, `> hrMidu+20 → 2`, อื่น ๆ → `0`. [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

### 3) ออกซิเจนเสริม (O2_sup; หน่วยตามอินพุต)

- **NEWS (ผู้ใหญ่)**: `0 L/min → 0`, ถ้ามีเสริมใด ๆ → `2`.
- **PEWS (เด็ก)**: `≤2 → 0`, `3–5 → 1`, `6–7 → 2`, `≥8 → 3`. [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

### 4) อุณหภูมิร่างกาย (Temp; เฉพาะ NEWS)

`≤35 → 3`, `≤36 → 1`, `≤38 → 0`, `≤39 → 1`, `>39 → 2`. [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

### 5) ความดันตัวบน (SysBP; เฉพาะ NEWS)

`<90 → 3`, `≤100 → 2`, `≤110 → 1`, `≤219 → 0`, `>219 → 3`. *(โน้ต: โค้ดของเด็กถูกคอมเมนต์ไว้ ไม่ได้ใช้คำนวณ)* [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

### 6) ค่าออกซิเจนปลายนิ้ว SpO₂ (เฉพาะ NEWS)

`≤91 → 3`, `≤93 → 2`, `≤95 → 1`, `>95 → 0`. [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

### 7) ระดับความรู้สึกตัว AVPU (เฉพาะ NEWS ใช้เป็นตัวชี้วัด)

`"0" → 0` (Alert), โค้ดอื่น ๆ → `3`. [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

### 8) พฤติกรรม/หัวใจ/พ่นยาพ่น/อาเจียน (เฉพาะ PEWS)

- **Behavior**: `"0"→0`, `"1"→1`, `"2"→2`, อื่น ๆ → `3`
- **Cardiovascular (CRT)**: `"0"→0`, `"1"→1`, `"2"→2`, อื่น ๆ → `3`
- **Nebulize**: `"0"→0`, อื่น ๆ → `1`
- **Vomiting**: `"0"→0`, อื่น ๆ → `1`. [GitHub](https://github.com/somprasongd/newspews/raw/dev/wasm/services/score.go)

---

สรุป: ระบบจะเลือกสูตรจากกลุ่มอายุ (NEWS สำหรับผู้ใหญ่, PEWS สำหรับเด็ก), คิดคะแนนย่อยตามเกณฑ์ด้านบน แล้วบวกเป็นผลรวม ส่งกลับเป็น `{ type: "news"|"pews", score: <จำนวนคะแนน> }`.
