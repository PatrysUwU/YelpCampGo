package models

import "gorm.io/gorm"

type ReviewModel struct {
	gorm.Model
	Review       string  `json:"content"`
	Rating       float64 `gorm:"type:decimal(5,1)" json:"rating"`
	CampgroundID uint
}
