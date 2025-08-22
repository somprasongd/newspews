package services

import (
	"strconv"
	"strings"

	"github.com/somprasongd/newspews/validator"
)

type ScoreService interface {
	CalculateScore(dto InputDTO) (*ScoreResponse, error)
}

type scoreService struct {
}

func NewScoreService() ScoreService {
	return &scoreService{}
}

func (s scoreService) CalculateScore(input InputDTO) (*ScoreResponse, error) {
	// validate
	err := validator.ValidateStruct(input)
	if err != nil {
		return nil, err
	}

	// first get age group
	ageGroup := calculateAgeGroup(input.Age.Year, input.Age.Month, input.Age.Day)

	// ageGroup เท่ากับ 10 จะเป็น NEWS ถ้าไม่ใช่จะเป็น PEWS
	res := &ScoreResponse{}
	switch ageGroup {
	case 10: // news
		news := newsInput{
			Rr:       input.Rr,
			Hr:       input.Hr,
			O2:       input.O2,
			Temp:     input.Temp,
			Sys:      input.Sys,
			Dia:      input.Dia,
			Spo2:     input.Spo2,
			AvpuCode: input.AvpuCode,
		}
		// calculate NEWS score and whether any parameter scored 3 (single red)
		score, hasRed, err := calculateNewsScore(ageGroup, news)
		if err != nil {
			return nil, err
		}
		res.Type = "news"
		res.Score = score
		if esc, ok := interpretNewsEscalation(score, hasRed); ok {
			res.Level = esc.Level
			res.Action = esc.Action
		}
	default: // pews
		pews := pewsInput{
			BehaviorCode: input.BehaviorCode,
			NebulizeCode: input.NebulizeCode,
			VomitingCode: input.VomitingCode,
			CrtCode:      input.CrtCode,
			Rr:           input.Rr,
			Hr:           input.Hr,
			O2:           input.O2,
		}
		score, err := calculatePewsScore(ageGroup, pews)
		if err != nil {
			return nil, err
		}

		res.Type = "pews"
		res.Score = score
		if esc, ok := interpretPewsEscalation(score); ok {
			res.Level = esc.Level
			res.Action = esc.Action
		}
	}

	return res, nil
}

// calculateAgeGroup determines the age group used by the scoring system.
// It returns 10 for adults (NEWS), otherwise a number 1–9 for various
// paediatric age brackets. The logic follows the original NEWS/PEWS
// specification.
func calculateAgeGroup(year, month, day uint) uint {
	switch {
	case year == 0:
		switch {
		case month == 0:
			if day <= 3 { // แรกเกิด - 96 ชม.
				return 1
			}
			return 2 // 4 วัน - 1 เดือน
		case month == 1:
			return 3
		default:
			return 4
		}
	case year <= 2:
		return 5
	case year <= 5:
		return 6
	case year <= 7:
		return 7
	case year <= 9:
		return 8
	case year <= 15:
		return 9
	default:
		return 10
	}
}

// calculateNewsScore sums the component scores for adults and reports
// whether any single component reached the maximum score of 3. The
// boolean return value is used to trigger the "single 3" escalation
// rule in interpretNewsEscalation. Note: the original implementation
// simply returned the total score; this extended version preserves
// backwards compatibility by still returning the total score first.
func calculateNewsScore(ageGroup uint, input newsInput) (uint, bool, error) {
	// validate required field
	err := validator.ValidateStruct(input)
	if err != nil {
		return 0, false, err
	}

	rrScore := calculateRRScore(ageGroup, input.Rr)
	hrScore := calculateHRScore(ageGroup, input.Hr)
	o2supScore := calculateO2supScore(ageGroup, input.O2)
	btScore := calculateBTScore(ageGroup, input.Temp)
	bpScore := calculateBPScore(ageGroup, input.Sys)
	o2satScore := calculateO2satScore(ageGroup, input.Spo2)
	avpuScore := calculateAvpuScore(input.AvpuCode)

	total := rrScore + hrScore + o2supScore + btScore + bpScore + o2satScore + avpuScore

	// Determine if any component scored 3. Note that o2supScore for NEWS2
	// only returns 0 or 2, so this check covers BT, BP, RR, HR, O2SAT and AVPU.
	hasSingleRed := rrScore == 3 || hrScore == 3 || btScore == 3 || bpScore == 3 || o2satScore == 3 || avpuScore == 3

	return total, hasSingleRed, nil
}

// calculatePewsScore sums the component scores for paediatric patients. It
// replicates the original implementation exactly but remains unchanged
// because single red logic does not apply to PEWS. Should additional
// escalation triggers be introduced for PEWS in future, this function
// could be expanded to return further metadata.
func calculatePewsScore(ageGroup uint, input pewsInput) (uint, error) {
	// validate required field
	err := validator.ValidateStruct(input)
	if err != nil {
		return 0, err
	}

	behaviorScore := calculateBehaviorScore(input.BehaviorCode)
	cardioScore := calculateCardiovascularScore(input.CrtCode)
	nebulizeScore := calculateNebulizeScore(input.NebulizeCode)
	vomitingScore := calculateVomitingScore(input.VomitingCode)
	hrScore := calculateHRScore(ageGroup, input.Hr)
	rrScore := calculateRRScore(ageGroup, input.Rr)
	o2supScore := calculateO2supScore(ageGroup, input.O2)
	respiScore := calculateRespiScore(rrScore, o2supScore)

	total := behaviorScore + nebulizeScore + vomitingScore + cardioScore + respiScore + hrScore

	return total, nil
}

var (
	rrMaxs       = [10]uint{80, 80, 75, 65, 65, 48, 45, 45, 30, 24}
	rrMidus      = [10]uint{70, 70, 65, 55, 55, 38, 35, 35, 20, 20}
	rrMidls      = [10]uint{34, 34, 29, 24, 24, 14, 12, 12, 10, 11}
	rrMin   uint = 8
)

func calculateRRScore(ageGroup uint, rr uint) uint {
	idx := ageGroup - 1
	rrMax := rrMaxs[idx]
	rrMidu := rrMidus[idx]
	rrMidl := rrMidls[idx]

	if ageGroup == 10 {
		if rr <= rrMin {
			return 3
		} else if rr <= rrMidl {
			return 1
		} else if rr <= rrMidu {
			return 0
		} else if rr <= rrMax {
			return 2
		} else {
			return 3
		}
	} else {
		if rr < rrMidl {
			return 3
		} else if rr < rrMidu {
			return 0
		} else if rr < rrMax {
			return 1
		} else {
			return 2
		}
	}
}

var (
	hrMaxs       = [10]uint{190, 180, 150, 150, 140, 140, 125, 125, 115, 130}
	hrMidus      = [10]uint{180, 170, 140, 140, 130, 130, 115, 115, 105, 110}
	hrMidls      = [10]uint{100, 100, 80, 80, 70, 65, 60, 60, 55, 50}
	hrMid   uint = 90
	hrMin   uint = 40
)

func calculateHRScore(ageGroup uint, hr uint) uint {
	idx := ageGroup - 1
	hrMax := hrMaxs[idx]
	hrMidu := hrMidus[idx]
	hrMidl := hrMidls[idx]

	if ageGroup == 10 {
		if hr <= hrMin {
			return 3
		} else if hr <= hrMidl {
			return 1
		} else if hr <= hrMid {
			return 0
		} else if hr <= hrMidu {
			return 1
		} else if hr <= hrMax {
			return 2
		} else {
			return 3
		}
	} else {
		if hr < hrMidl { // < HRMIN
			return 3
		} else if hr > hrMidu+30 { // > HRMAX+30
			return 3
		} else if hr > hrMidu+20 { //> HRMAX+20
			return 2
		} else {
			return 0
		}
	}
}

func calculateO2supScore(ageGroup uint, oxygen uint) uint {
	if ageGroup == 10 {
		if oxygen == 0 {
			return 0
		}
		return 2
	} else {
		if oxygen <= 2 {
			return 0
		} else if oxygen <= 5 {
			return 1
		} else if oxygen <= 7 {
			return 2
		} else {
			return 3
		}
	}
}

func calculateBTScore(ageGroup uint, temp float32) uint {
	if ageGroup != 10 {
		return 0
	}
	if temp <= 35 {
		return 3
	} else if temp <= 36 {
		return 1
	} else if temp <= 38 {
		return 0
	} else if temp <= 39 {
		return 1
	} else {
		return 2
	}
}

// var bpMins = [10]uint{60, 70, 70, 70, 72, 76, 82, 86, 90, 90}

func calculateBPScore(ageGroup uint, sys uint) uint {
	if ageGroup != 10 {
		return 0
	}
	if sys < 90 {
		return 3
	} else if sys <= 100 {
		return 2
	} else if sys <= 110 {
		return 1
	} else if sys <= 219 {
		return 0
	} else {
		return 3
	}
	// // when ageGroup < 10
	// if sys <= bpMins[ageGroup-1] {
	// 	return "ABNORMAL"
	// } else {
	// 	return "NORMAL"
	// }
}

func calculateO2satScore(ageGroup uint, spo2 uint) uint {
	if ageGroup != 10 {
		return 0
	}
	if spo2 <= 91 {
		return 3
	} else if spo2 <= 93 {
		return 2
	} else if spo2 <= 95 {
		return 1
	} else {
		return 0
	}
}

func calculateAvpuScore(avpuCode string) uint {
	switch avpuCode {
	case "0":
		return 0
	default:
		return 3
	}
}

func calculateBehaviorScore(behaviorCode string) uint {
	switch behaviorCode {
	case "0":
		return 0
	case "1":
		return 1
	case "2":
		return 2
	default:
		return 3
	}
}

func calculateCardiovascularScore(cardioCode string) uint {
	switch cardioCode {
	case "0":
		return 0
	case "1":
		return 1
	case "2":
		return 2
	default:
		return 3
	}
}

func calculateNebulizeScore(nebulizeCode string) uint {
	switch nebulizeCode {
	case "0":
		return 0
	default:
		return 1
	}
}

func calculateVomitingScore(vomitingCode string) uint {
	switch vomitingCode {
	case "0":
		return 0
	default:
		return 1
	}
}

func calculateRespiScore(rrScore uint, o2supScore uint) uint {
	if rrScore > o2supScore {
		return rrScore
	} else {
		return o2supScore
	}
}

// interpretNewsEscalation selects the appropriate escalation for a given
// NEWS2 score. It accepts the total score and a boolean flag indicating
// whether any single parameter scored three points (single red). The
// function returns the matching escalation and a boolean indicating
// whether a match was found.
func interpretNewsEscalation(total uint, hasSingleRed bool) (Escalation, bool) {
	for _, e := range newsEscalations {
		// Handle the special "single 3" case first
		if e.Range == "single 3" {
			if hasSingleRed {
				return e, true
			}
			continue
		}
		if matchesRange(total, e.Range) {
			return e, true
		}
	}
	return Escalation{}, false
}

// interpretPewsEscalation selects the escalation for a PEWS score. It
// simply matches against the configured ranges and returns the first
// matching escalation.
func interpretPewsEscalation(total uint) (Escalation, bool) {
	for _, e := range pewsEscalations {
		if matchesRange(total, e.Range) {
			return e, true
		}
	}
	return Escalation{}, false
}

// matchesRange checks if a score falls within a textual range. Supported
// formats include:
//   - "n"        – exact match
//   - "a-b"      – inclusive range
//   - ">=n"      – greater than or equal to
//   - "<=n"      – less than or equal to
//   - ">n" or "<n" – strict comparisons
//
// Unicode variants of >= and <= are normalized to their ASCII
// equivalents before parsing.
func matchesRange(score uint, rng string) bool {
	r := strings.TrimSpace(rng)
	// normalise unicode
	r = strings.ReplaceAll(r, "≥", ">=")
	r = strings.ReplaceAll(r, "≤", "<=")
	if strings.Contains(r, "-") {
		parts := strings.SplitN(r, "-", 2)
		if len(parts) != 2 {
			return false
		}
		aStr, bStr := strings.TrimSpace(parts[0]), strings.TrimSpace(parts[1])
		a, err1 := strconv.Atoi(aStr)
		b, err2 := strconv.Atoi(bStr)
		if err1 != nil || err2 != nil {
			return false
		}
		return int(score) >= a && int(score) <= b
	}
	for _, op := range []string{">=", "<=", ">", "<"} {
		if strings.HasPrefix(r, op) {
			valStr := strings.TrimSpace(r[len(op):])
			n, err := strconv.Atoi(valStr)
			if err != nil {
				return false
			}
			switch op {
			case ">=":
				return int(score) >= n
			case "<=":
				return int(score) <= n
			case ">":
				return int(score) > n
			case "<":
				return int(score) < n
			}
		}
	}
	// exact match case
	if val, err := strconv.Atoi(r); err == nil {
		return int(score) == val
	}
	return false
}
