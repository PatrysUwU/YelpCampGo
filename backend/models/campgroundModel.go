package models

import "gorm.io/gorm"

type CampgroundModel struct {
	gorm.Model
	Title       string  `gorm:"unique"`
	Price       float64 `gorm:"type:decimal(10,2)"`
	Description string
	Location    string
	Image       string
}
