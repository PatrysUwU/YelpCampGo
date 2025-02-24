package initializers

import "backend/models"

func SyncDatabase() {
	DB.AutoMigrate(models.CampgroundModel{})
	DB.AutoMigrate(models.ReviewModel{})
}
