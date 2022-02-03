package dto

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
	Geo          *Geo    `json:"geo"`
}

type Age struct {
	Year  uint `json:"year"`
	Month uint `json:"month"`
	Day   uint `json:"day"`
}

type Geo struct {
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}

type ScoreResponse struct {
	Type  string `json:"type"`
	Score uint   `json:"score"`
}
