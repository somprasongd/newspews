package database

import (
	"fmt"
	"os"

	"github.com/somprasongd/newspews/config"
	log "github.com/somprasongd/newspews/logger"
	"github.com/somprasongd/newspews/repository"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	dsn := fmt.Sprintf("%v://%v:%v@%v:%v/%v",
		config.Config.Db.Driver,
		config.Config.Db.Username,
		config.Config.Db.Password,
		config.Config.Db.Host,
		config.Config.Db.Port,
		config.Config.Db.Database)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Error("Cannot open DB connection:" + err.Error())
		os.Exit(1)
	}

	DB.AutoMigrate(&repository.AccessLog{})

	log.Info("DB Connected")
}
