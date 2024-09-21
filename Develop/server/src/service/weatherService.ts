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
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData (query: string) {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`);
    const locationData = await response.json();
    return locationData;
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: tureLocationData method}
  private destructureLocationData(locationData: any) {
    const { lat, lon } = locationData[0];
    return { lat, lon };
  }
  
  //TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string { 
  private buildGeocodeQuery(coordinates:Coordinates) :string{
    // return `lat=${this.lat}&lon=${this.lon}`;
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
  }


  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }


  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(`${this.baseURL}/data/2.5/onecall?${this.buildGeocodeQuery(coordinates)}&exclude=minutely,hourly&appid=${this.apiKey}`);
    const weatherData = await response.json();
    return weatherData;
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any) {
    const { current } = response;
    const { temp, humidity, wind_speed } = current;
    return new Weather(this.cityName, new Date().toLocaleDateString(), temp, humidity, wind_speed);
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray : Weather[] = [currentWeather]
    for (let i = 1; i < 6; i++) {
      const { temp, humidity, wind_speed } = weatherData[i];
      forecastArray.push(new Weather(this.cityName, new Date().toLocaleDateString(), temp, humidity, wind_speed));
    }
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}

  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = await this.parseCurrentWeather(weatherData);
    const forecastArray = await this.buildForecastArray(currentWeather, weatherData.daily);
    return { currentWeather, forecastArray };
  }
}

export default new WeatherService();
