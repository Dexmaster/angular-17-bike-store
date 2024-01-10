import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { City, WeatherResponse } from '@shared/weather/weather.models';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly #http = inject(HttpClient);
  getCityInfo(city: City) {
    const { longitude, latitude } = city;
    const params = new HttpParams({
      fromObject: {
        longitude,
        latitude,
        current: [
          'temperature_2m',
          'relativehumidity_2m',
          'windspeed_10m',
          'precipitation',
          'surface_pressure',
          'weather_code',
        ],
        hourly: [
          'temperature_2m',
          'relativehumidity_2m',
          'windspeed_10m',
          'weather_code',
        ],
      },
    });
    return this.#http.get<WeatherResponse>(
      'https://api.open-meteo.com/v1/forecast',
      { params }
    );
  }
}
