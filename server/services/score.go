package services

import (
	"github.com/somprasongd/newspews/dto"
	"github.com/somprasongd/newspews/errs"
	"github.com/somprasongd/newspews/validator"
)

type newsInput struct {
	Rr       uint    `validate:"gte=0"`
	Hr       uint    `validate:"gte=0"`
	O2       uint    `validate:"gte=0"`
	Temp     float32 `validate:"gte=0"`
	Sys      uint    `validate:"gte=0"`
	Dia      uint    `validate:"-"`
	Spo2     uint    `validate:"gte=0"`
	AvpuCode string  `validate:"number,oneof='0' '1' '2' '3'"`
}

type pewsInput struct {
	BehaviorCode string `validate:"number,oneof='0' '1' '2' '3'"`
	CrtCode      string `validate:"number,oneof='0' '1' '2' '3'"`
	NebulizeCode string `validate:"number,oneof='0' '1'"`
	VomitingCode string `validate:"number,oneof='0' '1'"`
	Rr           uint   `validate:"gte=0"`
	O2           uint   `validate:"gte=0"`
}

type ScoreService interface {
	CalculateScore(dto dto.InputDTO) (*dto.ScoreResponse, *errs.AppError)
}

type scoreService struct {
}

func NewScoreService() ScoreService {
	return &scoreService{}
}

func (s scoreService) CalculateScore(input dto.InputDTO) (*dto.ScoreResponse, *errs.AppError) {
	// validate
	err := validator.ValidateStruct(input)
	if err != nil {
		appErr := errs.NewBadRequestError(err.Error())

		return nil, appErr
	}

	// first get age group
	ageGroup := calculateAgeGroup(input.Age)

	// ageGroup เท่ากับ 10 จะเป็น NEWS ถ้าไม่ใช่จะเป็น PEWS
	scoreRes := &dto.ScoreResponse{}
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
		score, err := calculateNewsScore(ageGroup, news)
		if err != nil {
			appErr := errs.NewBadRequestError(err.Error())
			return nil, appErr
		}

		scoreRes.Type = "news"
		scoreRes.Score = score
	default: // pews
		pews := pewsInput{
			BehaviorCode: input.BehaviorCode,
			NebulizeCode: input.NebulizeCode,
			VomitingCode: input.VomitingCode,
			CrtCode:      input.CrtCode,
			Rr:           input.Rr,
			O2:           input.O2,
		}
		score, err := calculatePewsScore(ageGroup, pews)
		if err != nil {
			appErr := errs.NewBadRequestError(err.Error())
			return nil, appErr
		}

		scoreRes.Type = "pews"
		scoreRes.Score = score
	}

	return scoreRes, nil
}

func calculateAgeGroup(age dto.Age) uint {
	if age.Year == 0 {
		if age.Month == 0 {
			if age.Day <= 3 {
				return 1
			} else {
				return 2
			}
		} else if age.Month == 1 {
			return 3
		} else {
			return 4
		}
	} else if age.Year <= 2 {
		return 5
	} else if age.Year <= 5 {
		return 6
	} else if age.Year <= 7 {
		return 7
	} else if age.Year <= 9 {
		return 8
	} else if age.Year <= 15 {
		return 9
	} else {
		return 10
	}
}

func calculateNewsScore(ageGroup uint, input newsInput) (uint, error) {
	// validate required field
	err := validator.ValidateStruct(input)
	if err != nil {
		return 0, err
	}

	rrScore := calculateRRScore(ageGroup, input.Rr)
	hrScore := calculateHRScore(ageGroup, input.Hr)
	o2supScore := calculateO2supScore(ageGroup, input.O2)
	btScore := calculateBTScore(ageGroup, input.Temp)
	bpScore := calculateBPScore(ageGroup, input.Sys)
	o2satScore := calculateO2satScore(ageGroup, input.Spo2)
	avpuScore := calculateAvpuScore(input.AvpuCode)

	score := rrScore + hrScore + o2supScore + btScore + bpScore + o2satScore + avpuScore

	return score, nil
}

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

	rrScore := calculateRRScore(ageGroup, input.Rr)
	o2supScore := calculateO2supScore(ageGroup, input.O2)
	respiScore := calculateRespiScore(rrScore, o2supScore)

	score := behaviorScore + nebulizeScore + vomitingScore + cardioScore + respiScore

	return score, nil
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
		} else if rr <= rrMax {
			return 2
		} else {
			return 3
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
		if hr < hrMidl {
			return 3
		} else if hr < hrMidu {
			return 0
		} else if hr <= hrMax {
			return 2
		} else {
			return 3
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