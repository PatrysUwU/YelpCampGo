package models

import "gorm.io/gorm"

type CampgroundModel struct {
	gorm.Model
	Title       string `gorm:"unique"`
	Price       float32
	Description string
	Location    string
}
