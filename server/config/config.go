package config

import (
	"fmt"
	"log"
	"strings"

	"github.com/somprasongd/newspews/validator"

	"github.com/spf13/viper"
)

type configuration struct {
	App appConfig
	Db  dbConfig
}

type appConfig struct {
	Port uint
}

type dbConfig struct {
	Driver   string `validate:"required"`
	Host     string `validate:"required"`
	Port     uint   `validate:"required"`
	Username string `validate:"required"`
	Password string `validate:"required"`
	Database string `validate:"required"`
}

var Config *configuration

func LoadConfig() {
	viper.SetConfigName("config")                          // กำหนดชื่อไฟล์ config (without extension)
	viper.SetConfigType("yaml")                            // ระบุประเภทของไฟล์ config
	viper.AddConfigPath(".")                               // ระบุตำแหน่งของไฟล์ config อยู่ที่ working directory
	viper.AutomaticEnv()                                   // ให้อ่านค่าจาก env มา replace ในไฟล์ config
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_")) // แปลง _ underscore ใน env เป็น . dot notation ใน viper

	err := viper.ReadInConfig() // อ่านไฟล์ config
	if err != nil {             // ถ้าอ่านไฟล์ config ไม่ได้ให้ข้ามไปเพราะให้เอาค่าจาก env มาแทนได้
		fmt.Println("please consider environment variables", err.Error())
	}

	// กำหนด Default Value
	viper.SetDefault("app.port", 8080)

	// Decode config ด้วย Unmarshling
	Config = &configuration{}
	err = viper.Unmarshal(Config)
	if err != nil {
		log.Fatalf("unable to decode config into struct, %v", err)
	}

	err = validator.ValidateStruct(Config)
	if err != nil {
		log.Fatalf("load config error, %v", err)
	}
}
