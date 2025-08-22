package services

type InputDTO struct {
	Age          Age     `json:"age"  validate:"required"`
	Temp         float32 `json:"temperature"`
	Sys          uint    `json:"systolic"`
	Dia          uint    `json:"diastolic"`
	Rr           uint    `json:"respiratory_rate"`
	Hr           uint    `json:"heart_rate"`
	O2           uint    `json:"oxygen"`
	Spo2         uint    `json:"spo2"`
	AvpuCode     string  `json:"avpu_code"`
	CrtCode      string  `json:"cardiovascular_code"`
	BehaviorCode string  `json:"behavior_code"`
	NebulizeCode string  `json:"nebulize_code"`
	VomitingCode string  `json:"vomiting_code"`
}

// Age represents a patient's age broken down into years, months and days.
// The validators enforce non‑negative values and restrict months to 0–11
// and days to 0–31 when year and month are zero.
type Age struct {
	Year  uint `json:"year" validate:"gte=0"`
	Month uint `json:"month" validate:"gte=0,lte=11"`
	Day   uint `json:"day" validate:"gte=0,lte=31,required_if=Year 0 Month 0"`
}

// newsInput contains only the fields relevant to calculating a NEWS2
// score. Validation tags ensure numeric ranges and required values for
// the AvpuCode.
type newsInput struct {
	Rr       uint    `validate:"number,gte=0,lt=200"`
	Hr       uint    `validate:"number,gte=0,lt=600"`
	Temp     float32 `validate:"number,gte=0,lt=50"`
	Sys      uint    `validate:"number,gte=0,lt=400"`
	Dia      uint    `validate:"number,gte=0,lt=250"`
	O2       uint    `validate:"number,gte=0,lte=150"`
	Spo2     uint    `validate:"number,gte=0,lte=100"`
	AvpuCode string  `validate:"number,oneof='0' '1' '2' '3',required"`
}

// pewsInput contains only the fields relevant to calculating a PEWS
// score. Behaviour and cardiovascular codes are validated to ensure
// allowed values.
type pewsInput struct {
	Rr           uint   `validate:"number,gte=0,lt=200"`
	Hr           uint   `validate:"number,gte=0,lt=600"`
	O2           uint   `validate:"number,gte=0,lte=150"`
	BehaviorCode string `validate:"number,oneof='0' '1' '2' '3',required"`
	CrtCode      string `validate:"number,oneof='0' '1' '2' '3',required"`
	NebulizeCode string `validate:"number,oneof='0' '1',required"`
	VomitingCode string `validate:"number,oneof='0' '1',required"`
}

// Escalation describes the range, level and action for a given score.
// It is used for both NEWS2 and PEWS mapping so that the interpretation
// logic can share a common data structure across systems.
type Escalation struct {
	// Range is a human‑readable representation of the score window. For
	// example "0", "1-4", ">=7" or the special sentinel "single 3" used
	// to flag a single parameter scoring three points in NEWS2. The
	// Interpret functions match numeric totals against this field to
	// determine which escalation to apply.
	Range string `json:"range"`
	// Level indicates the severity tier. For NEWS2 adults this will be
	// things like "Very Low", "Low", "Single Red", "Medium" and
	// "High/Emergency". For PEWS this will be "LOW", "MEDIUM",
	// "HIGH" or "EMERGENCY".
	Level string `json:"level"`
	// Action contains the recommended clinical response. This field is
	// purely descriptive and should be surfaced to the user so they
	// understand the next steps once a score has been calculated.
	Action string `json:"action"`
}

// ScoreResponse represents the result of calculating an Early Warning
// Score. In addition to the type ("news" or "pews") and the numeric
// score, it now also includes the interpreted level and action. These
// fields allow callers to surface an appropriate clinical response to
// patients or clinicians without reimplementing the mapping logic.
type ScoreResponse struct {
	Type   string `json:"type"`
	Score  uint   `json:"score"`
	Level  string `json:"level"`
	Action string `json:"action"`
}

// Mappings for NEWS2 and PEWS. Each slice is ordered so that ranges are
// evaluated from lowest to highest. The interpret functions will check
// these in order until one matches.
var newsEscalations = []Escalation{
	{Range: "0", Level: "ต่ำมาก", Action: "ติดตามอย่างน้อย q12h"},
	{Range: "1-4", Level: "ต่ำ", Action: "พยาบาลประเมิน; พิจารณา q4–6h"},
	{Range: "single 3", Level: "เตือนแดงเดี่ยว", Action: "รีวิวแพทย์เร่งด่วน; q1h"},
	{Range: "5-6", Level: "ปานกลาง", Action: "รีวิวเร่งด่วน/พิจารณา critical care; q1h"},
	{Range: ">=7", Level: "สูง/ฉุกเฉิน", Action: "ทีม critical care ประเมินทันที/ย้าย HDU/ICU"},
}

var pewsEscalations = []Escalation{
	{Range: "1-4", Level: "ต่ำ", Action: "แจ้งหัวหน้าพยาบาล; reassess ≤60 นาที"},
	{Range: "5-8", Level: "ปานกลาง", Action: "แพทย์ ST3+ ภายใน 30 นาที; monitor ต่อเนื่อง"},
	{Range: "9-12", Level: "สูง", Action: "Rapid review ภายใน 15 นาที; monitor ต่อเนื่อง"},
	{Range: ">=13", Level: "ฉุกเฉิน", Action: "เรียกฉุกเฉินทันที; consultant ร่วมวางแผน"},
}
