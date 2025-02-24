package models

import "gorm.io/gorm"

type CampgroundModel struct {
	gorm.Model
	Title       string        `gorm:"unique" json:"title"`
	Price       float64       `gorm:"type:decimal(10,2)" json:"price"`
	Description string        `json:"description"`
	Location    string        `json:"location"`
	Image       string        `json:"image"`
	Reviews     []ReviewModel `gorm:"foreignKey:CampgroundID"`
}
