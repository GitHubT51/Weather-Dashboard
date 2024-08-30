import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
};
// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public city: string,
    public date: string,
    public temp: number,
    public humidity: number,
    public wind: number,
  ) {
    this.city = city;
    this.date = date;
    this.temp = temp;
    this.humidity = humidity;
    this.wind = wind;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY ||  '';
    this.cityName = ''
  }

  // TODO: Create fetchLocationData method
  async fetchLocationData (query: string) {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`);
    const locationData = await response.json();
    return locationData;
  }
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: tureLocationData method}
 //TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string { TODO: Create buildGeocodeQuery method
  //  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
