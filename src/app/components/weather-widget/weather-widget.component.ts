import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { WeatherService } from '@shared/weather/weather.service';
import { City, WeatherCode, WeatherResponse } from '@shared/weather/weather.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { GetWeatherFromCode } from '@shared/weather/weather.helper';
import { LocalStorageService } from '@shared/local-storage/local-storage.service';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
})
export class WeatherWidgetComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #weatherService = inject(WeatherService);
  readonly #localStorage = inject(LocalStorageService);
  selectedCity = signal<string>(this.#localStorage.getItem('selectedCity', ""));
  weatherCode: WeatherCode | null = null;
  weatherInfo: WeatherResponse | null = null;
  citiesList: City[] = [
    { latitude: 43.7001, longitude: -79.4163, name: 'Toronto'},
    { latitude: 40.7143, longitude: -74.006,  name: 'New York'},
    { latitude: 34.0522, longitude: -118.2437, name: 'Los Angeles'},
  ];
  constructor() {
    effect(() => {
      const city = this.citiesList.find(city => city.name == this.selectedCity());
      if (!city) return (this.weatherInfo = null);
      return this.#weatherService
        .getCityInfo(city)
        .pipe(
          takeUntilDestroyed(this.#destroyRef),
          tap((res: WeatherResponse) => {
            this.weatherInfo = res;
            this.weatherCode = GetWeatherFromCode(`${res.current.weather_code}`);
          })
        )
        .subscribe();
    });
  }
  onCityUpdate(name: string) {
    this.selectedCity.set(name);
    this.#localStorage.setItem('selectedCity', name);
  }
}
