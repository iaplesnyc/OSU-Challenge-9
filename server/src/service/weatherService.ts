import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

interface Coordinates {
  lat: number;
  lon: number;
}

class WeatherService {
  // Get coordinates based on city name
  private async getCoordinates(city: string): Promise<Coordinates> {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${OPENWEATHER_API_KEY}`;
    const response = await axios.get(geoUrl);
    const data = response.data[0];
    return { lat: data.lat, lon: data.lon };
  }

  // Get forecast data from coordinates
  private async getForecast({ lat, lon }: Coordinates) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${OPENWEATHER_API_KEY}`;
    const response = await axios.get(forecastUrl);
    return response.data;
  }

  // Main method called by the route
  async getForecastForCity(city: string) {
    const coordinates = await this.getCoordinates(city);
    const data = await this.getForecast(coordinates);

    // Filter to one forecast per day (e.g., 12:00:00)
    const dailyForecasts = data.list.filter((entry: any) =>
      entry.dt_txt.includes('12:00:00')
    );

    // Map forecast to the format the frontend expects
    return dailyForecasts.map((entry: any) => ({
      date: entry.dt_txt.split(' ')[0],
      icon: entry.weather[0].icon,
      iconDescription: entry.weather[0].description, // ✅ match frontend
      tempF: entry.main.temp,                        // ✅ match frontend
      windSpeed: entry.wind.speed,                   // ✅ match frontend
      humidity: entry.main.humidity,
    }));
  }
}

export default new WeatherService();
