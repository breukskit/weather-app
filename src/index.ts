import './sass/main.scss';
import countriesCode from './assets/data_json.json';
import { WeatherObj, Weather } from './models';
import * as constants from './constants';
import { printDom } from './domChanger';

const API = {
  base: 'https://api.openweathermap.org/data/2.5/weather?q={query}&appid=',
  api_key: '91cf8e0e839ff019d82ea94d19e77166',
};

export let tempUnit = 'celsius';

let cache: Partial<Weather> = {};

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
  const windCond = weatherObj.wind.speed;
  const humidity = weatherObj.main.humidity;

  const weather = new Weather(
    temp,
    country,
    city,
    weatherCond,
    iconUrl,
    humidity,
    windCond
  );
  cache = weather;
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

const setTempUnit = (e: MouseEvent) => {
  const target = e.target as HTMLButtonElement;
  if (target.id === 'celsius-picker') {
    constants.fahrenheitPicker.style.border = 'none';
    constants.celsiusPicker.style.border = '3px solid #fff';
    tempUnit = 'celsius';
    if (cache._city) {
      printDom(cache as Weather);
    }
  }
  if (target.id === 'fahrenheit-picker') {
    constants.celsiusPicker.style.border = 'none';
    constants.fahrenheitPicker.style.border = '3px solid #fff';
    tempUnit = 'fahrenheit';
    if (cache._city) {
      printDom(cache as Weather);
    }
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

constants.celsiusPicker.addEventListener('click', setTempUnit);
constants.fahrenheitPicker.addEventListener('click', setTempUnit);
