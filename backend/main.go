package main

import (
	"backend/controllers"
	"backend/initializers"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
	initializers.SyncDatabase()

}

func main() {

	r := gin.Default()
	r.POST("/campground/create", controllers.CreateCampground)
	r.Run()
}
