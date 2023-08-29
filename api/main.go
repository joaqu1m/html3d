package main

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type User struct {
	ID    uint   `gorm:"primaryKey"`
	Nome  string `gorm:"size:255"`
	Email string `gorm:"size:255"`
}

func main() {
	dsn := "root:database_password@tcp(127.0.0.1:3306)/teste?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		panic("falha ao conectar ao banco de dados")
	}
	db.AutoMigrate(&User{})

	db.Create(&User{Nome: "João", Email: "joao@email.com"})

	var user User
	db.First(&user, 1)
	fmt.Println("Usuario 1:", user)

	// tendo o user, podemos atualizá-lo usando seu endereço de memória
	db.Model(&user).Update("Nome", "João Atualizado")

	// db.Delete(&user)

	var user2 User
	db.Where("Nome = ?", "João Atualizado").First(&user2)
	fmt.Println("Usuario 2:", user2)
}
