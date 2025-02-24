package controllers

import (
	"backend/initializers"
	"backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type reviewBody struct {
	Content string  `binding:"required"`
	Rating  float64 `binding:"required"`
}

func CreateReview(c *gin.Context) {
	var body reviewBody

	id := c.Param("id")

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Failed to read review body",
			"message": err,
		})
		return
	}

	var campground models.CampgroundModel

	result := initializers.DB.First(&campground, id)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Campground doesn't exist",
		})
		return

	}

	review := models.ReviewModel{Content: body.Content, Rating: body.Rating}

	if err := initializers.DB.Model(&campground).Association("Reviews").Append(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create a review",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id": review.ID,
	})

}
