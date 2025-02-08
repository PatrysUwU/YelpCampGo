package controllers

import (
	"backend/initializers"
	"backend/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateCampground(c *gin.Context) {
	var body struct {
		Title       string
		Price       float64
		Description string
		Location    string
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
	}

	fmt.Println(body)

	campground := models.CampgroundModel{Title: body.Title, Price: body.Price, Description: body.Description, Location: body.Location}

	result := initializers.DB.Create(&campground)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create campground",
		})
	}

	c.JSON(http.StatusOK, gin.H{})

}

func AllCampgrounds(c *gin.Context) {
	var campgrounds []models.CampgroundModel
	result := initializers.DB.Find(&campgrounds)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error fetching campgrounds from database",
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"campgrounds": campgrounds,
	})
}

func CampgroundByID(c *gin.Context) {
	var campground models.CampgroundModel
	result := initializers.DB.First(&campground, c.Param("id"))

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error fetching campgrounds from database",
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"campground": campground,
	})
}
