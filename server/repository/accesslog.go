package repository

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type AccessLog struct {
	ID        uint
	Latitude  string
	Longitude string
	CreatedAt time.Time
}

type AccessLogRepo interface {
	Create(model *AccessLog) error
}

type accessLogRepoDB struct {
	db *gorm.DB
}

func NewAccessLogRepoDB(db *gorm.DB) *accessLogRepoDB {
	return &accessLogRepoDB{
		db: db,
	}
}

func (r accessLogRepoDB) Create(model *AccessLog) error {
	result := r.db.Create(model)
	// result.Error -> returns error
	if result.Error != nil {
		return result.Error
	}

	// result.RowsAffected -> returns inserted records count
	if result.RowsAffected <= 0 {
		return errors.New("cannot insert")
	}
	return nil
}
