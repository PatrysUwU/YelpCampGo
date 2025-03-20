# YelpCamp Web Application

## Project Description
YelpCamp is a web application that allows users to browse, add, edit, and delete campgrounds and reviews. The application consists of a frontend built with React + TypeScript + Material-UI and a backend written in Go using Gin-Gonic and GORM.

## Technologies
### Frontend
![My Skills](https://skillicons.dev/icons?i=react,ts,mui)

### Backend
![My Skills](https://skillicons.dev/icons?i=go,postgres,)

## Installation and Setup
### Requirements
- Node.js
- Go
- PostgreSQL

### Backend Installation and Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/PatrysUwU/YelpCampGo
   cd campgrounds-app/backend
    ```
2. Cd into backend directory:
    ```sh
    cd YelpCampGo/backend
    ```
3. Create .env file with your data:
    ```sh
    PORT=yourBackendPort
    DB_URL='''host=pgsqlHost user=yourUser password=dbPassword 
    dbname=dbname port=pgsqlPort sslmode=disable'''
    ```
3. Run backend:
    ```sh
    go run main.go
    ```
4. Cd into frontend directory:
    ```sh
    cd ../forntend
    ```
5. Install dependencies:
    ```sh 
    npm install
    ```
6. Run frontend:
    ```sh
    npm run dev
    ```

## Api endpoints
- GET /campgrounds - returns all available campgrounds
- GET /campgrounds/:id - returns info about campground with specified id
- POST /campgrounds - creates a new campground
- PUT /campgrounds/:id - edits info about campground with specified id
- DELETE /campgrounds/:id - deletes campground with specified id
- POST /campgrounds/:id/reviews - creates a review for a campground
- GET /campgrounds/:id/reviews - returns all reviews for a campground
