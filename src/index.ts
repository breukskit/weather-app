import './sass/main.scss';
import countriesCode from './assets/data_json.json';
import { WeatherObj, Weather } from './models';
import * as constants from './constants';
import { printDom } from './domChanger';

// const API_KEY = '91cf8e0e839ff019d82ea94d19e77166';

// const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`;

const API = {
  base: 'https://api.openweathermap.org/data/2.5/weather?q={query}&appid=',
  api_key: '91cf8e0e839ff019d82ea94d19e77166',
};

const getCountry = (code: string): string => {
  let name = '';
  countriesCode.forEach((country) => {
    if (country.Code === code) {
      name = country.Name;
    }
  });
  return name;
};

const setData = (weatherObj: WeatherObj) => {
  const temp = weatherObj.main.temp;
  const code = weatherObj.sys.country;
  const country = getCountry(code);
  const city = weatherObj.name;
  const weatherCond = weatherObj.weather[0].description;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`;

  const weather = new Weather(temp, country, city, weatherCond, iconUrl);
  printDom(weather);
};

const fetchData = async (searchTerm: string) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API.api_key}`
    );
    const data = await res.json();

    setData(data);
  } catch (e) {
    console.log(e);
  }
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const value = constants.input.value;
  if (value !== '') {
    fetchData(value);
    constants.input.value = '';
  }
};

constants.form.addEventListener('submit', handleSubmit);
