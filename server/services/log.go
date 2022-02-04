package services

import (
	"github.com/somprasongd/newspews/dto"
	"github.com/somprasongd/newspews/errs"
	"github.com/somprasongd/newspews/repository"
	"github.com/somprasongd/newspews/validator"
)

type LogService interface {
	Log(geo dto.Geo) *errs.AppError
}

type logService struct {
	logRepo repository.AccessLogRepo
}

func NewLogService(logRepo repository.AccessLogRepo) LogService {
	return &logService{
		logRepo: logRepo,
	}
}

func (s logService) Log(geo dto.Geo) *errs.AppError {
	// validate
	err := validator.ValidateStruct(geo)
	if err != nil {
		appErr := errs.NewBadRequestError(err.Error())

		return appErr
	}
	// save access log
	accLog := &repository.AccessLog{
		Latitude:  geo.Latitude,
		Longitude: geo.Longitude,
	}
	err = s.logRepo.Create(accLog)
	if err != nil {
		appErr := errs.NewUnexpectedError(err.Error())

		return appErr
	}
	return nil
}
