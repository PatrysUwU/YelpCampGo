package controllers

import (
	"backend/initializers"
	"backend/models"
	"github.com/gin-gonic/gin"
	"math"
	"net/http"
	"strconv"
)

type campgroundBody struct {
	Title       string  `binding:"required"`
	Price       float64 `binding:"required,gte=0.0"`
	Description string  `binding:"required"`
	Location    string  `binding:"required"`
}

func CreateCampground(c *gin.Context) {
	var body campgroundBody

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Failed to read campgroundBody",
			"message": err,
		})
		return
	}

	campground := models.CampgroundModel{Title: body.Title, Price: body.Price, Description: body.Description, Location: body.Location}

	result := initializers.DB.Create(&campground)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create campground",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id": campground.ID,
	})

}

func UpdateCampground(c *gin.Context) {
	var body campgroundBody
	id := c.Param("id")
	if _, err := strconv.ParseFloat(id, 64); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID",
		})
		return
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read campgroundBody",
		})
		return
	}
	campground := models.CampgroundModel{Title: body.Title, Price: body.Price, Description: body.Description, Location: body.Location}

	var cg models.CampgroundModel
	initializers.DB.First(&cg, id)

	result := initializers.DB.Model(cg).Updates(&campground)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to update campground",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})

}

func AllCampgrounds(c *gin.Context) {
	var campgrounds []models.CampgroundModel
	page := c.DefaultQuery("page", strconv.Itoa(0))
	result := initializers.DB.Find(&campgrounds)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error fetching campgrounds from database",
		})
		return
	}
	intPage, err := strconv.Atoi(page)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "page does not exist",
		})
		return
	}
	start := intPage * 20
	c.JSON(http.StatusOK, gin.H{
		"campgrounds": campgrounds[start : start+20],
		"maxPages":    math.Ceil(float64(len(campgrounds) / 20)),
	})
}
func CampgroundByID(c *gin.Context) {

	var campground models.CampgroundModel
	_ = initializers.DB.First(&campground, c.Param("id"))

	if campground.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Campground with that Id does not exist",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"campground": campground,
	})
}

func DeleteCampground(c *gin.Context) {

	id := c.Param("id")

	if _, err := strconv.ParseFloat(id, 64); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID",
		})
		return
	}

	initializers.DB.Delete(&models.CampgroundModel{}, id)
	c.JSON(http.StatusOK, gin.H{})

}
