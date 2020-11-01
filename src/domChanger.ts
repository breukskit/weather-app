import * as constants from './constants';

import { Weather } from './models';

import { tempUnit } from './index';

export const printDom = (weather?: Weather) => {
  if (weather) {
    constants.tempDom.innerHTML =
      tempUnit === 'celsius'
        ? String(weather.getCelius() + '&deg;C')
        : String(weather.getFahrenheit() + '&#8457;');
    constants.locationDom.innerText = `${weather._city}, ${weather._country}`;
    constants.weatherDom.innerText =
      weather._weather.charAt(0).toUpperCase() +
      weather._weather.slice(1) +
      '.';
    constants.weatherIconDom.src = weather._weatherIconUrl;
    constants.windConDom.innerText = `${String(weather._windCond)} m/s`;
    constants.humidityDom.innerText = `${String(weather._humidity)}%`;
  }
};
