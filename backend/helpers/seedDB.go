package helpers

import (
	"backend/initializers"
	"backend/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"strconv"
)

type City struct {
	City                 string  `json:"city"`
	GrowthFrom2000To2013 string  `json:"growth_from_2000_to_2013"`
	Latitude             float64 `json:"latitude"`
	Longitude            float64 `json:"longitude"`
	Population           string  `json:"population"`
	Rank                 string  `json:"rank"`
	State                string  `json:"state"`
}

func loadJSONStrings(filename string) ([]string, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	bytes, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var data []string
	err = json.Unmarshal(bytes, &data)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func loadCities(filename string) ([]City, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	bytes, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var cities []City
	err = json.Unmarshal(bytes, &cities)
	if err != nil {
		return nil, err
	}

	return cities, nil
}

func SeedDB() {
	descriptors, err := loadJSONStrings("C:\\Users\\Patrys\\dev\\web\\YelpCampGo\\backend\\helpers\\Seeds\\descriptors.json")
	if err != nil {
		fmt.Println("Błąd wczytywania descriptors.json:", err)
		return
	}

	places, err := loadJSONStrings("C:\\Users\\Patrys\\dev\\web\\YelpCampGo\\backend\\helpers\\Seeds\\places.json")
	if err != nil {
		fmt.Println("Błąd wczytywania places.json:", err)
		return
	}

	cities, err := loadCities("C:\\Users\\Patrys\\dev\\web\\YelpCampGo\\backend\\helpers\\Seeds\\cities.json")
	if err != nil {
		fmt.Println("Błąd wczytywania cities.json:", err)
		return
	}

	initializers.DB.Unscoped().Delete(&models.CampgroundModel{}, "title LIKE ?", "%")
	for _ = range 50 {
		var campground models.CampgroundModel
		desc := descriptors[rand.Int()%len(descriptors)]
		place := places[rand.Int()%len(places)]
		city := cities[rand.Int()%len(cities)]
		campground.Price = rand.Float64()*500 + 2000
		campground.Description = "xxxxxxxxx"
		campground.Title = desc + " " + place
		campground.Location = city.City
		campground.Image = "https://picsum.photos/400?random=" + strconv.Itoa(rand.Int())
		initializers.DB.Create(&campground)
	}

}
