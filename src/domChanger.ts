import * as constants from './constants';

import { Weather } from './models';

export const printDom = (weather: Weather) => {
  constants.tempDom.innerHTML =
    weather._tempUnit == 'celsius'
      ? String(weather.getCelius() + '&deg;C')
      : String(weather.getFahrenheit() + '&#8457;');
  constants.locationDom.innerText = `${weather._city}, ${weather._country}`;
  constants.weatherDom.innerText = weather._weather;
  constants.weatherIconDom.src = weather._weatherIconUrl;
};
