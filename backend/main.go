package main

import (
	"backend/controllers"
	"backend/initializers"
	"backend/middleware"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
	initializers.SyncDatabase()
	//helpers.SeedDB()

}

func main() {

	r := gin.Default()
	r.Use(middleware.CORSMiddleware)
	r.GET("/campgrounds", controllers.AllCampgrounds)
	r.GET("/campgrounds/:id", controllers.CampgroundByID)
	r.POST("/campgrounds", controllers.CreateCampground)
	r.PUT("/campgrounds/:id", controllers.UpdateCampground)
	r.DELETE("/campgrounds/:id", controllers.DeleteCampground)
	r.POST("/campgrounds/:id/reviews", controllers.CreateReview)
	err := r.Run()
	if err != nil {
		return
	}
}
