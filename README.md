# Weather Dashboard

## Description

This Weather Dashboard is a full-stack web application that allows users to search for and view current and 5-day weather forecasts for any city. It uses the OpenWeather API to retrieve weather data and stores user search history on the back end.

## Features

- Search any city for weather info  
- View current temperature, wind speed, humidity, and weather icon  
- See a 5-day forecast with weather details  
- Save and revisit search history  
- Delete individual cities from history (Bonus)

## Technologies Used

- Node.js  
- Express  
- TypeScript  
- OpenWeather API  
- Bootstrap  
- Font Awesome  
- File system (`fs`) to store search history  
- Render (for deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iaplesnyc/OSU-Challenge-9
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside the `/server` directory and add your OpenWeather API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

## Usage

To start the app in development mode:

```bash
npm run start:dev
```

Once both the server and client are running, open your browser and go to:  
`http://localhost:3000`

## API Reference

Weather data is fetched from the [OpenWeather 5-day forecast API](https://openweathermap.org/forecast5).

## Routes

### Frontend
- `GET *` – Serves the main `index.html` page

### Backend
- `GET /api/weather/history` – Returns saved search history
- `POST /api/weather` – Fetches weather data and saves the city
- `DELETE /api/weather/history/:id` – Deletes a city by ID (Bonus feature)

## Deployment

Live site: [https://osu-challenge-9-weather-dashboard.onrender.com]  
GitHub repo: [https://github.com/iaplesnyc/OSU-Challenge-9]

## Screenshot

![Weather Dashboard Screenshot](./Assets/09-servers-and-apis-homework-demo.png)

## Author

Iliana Pena
