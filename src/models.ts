export interface WeatherObj {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export class Weather {
  constructor(
    public _temp: number,
    public _country: string,
    public _city: string,
    public _weather: string,
    public _weatherIconUrl: string,
    public _tempUnit = 'celsius'
  ) {}
  getCelius() {
    return (this._temp - 273.15).toFixed(1);
  }
  getFahrenheit() {
    return ((this._temp * 9) / 5 - 459.67).toFixed(1);
  }
}
