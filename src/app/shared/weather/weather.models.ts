export interface City {
  longitude: number;
  latitude: number;
  name: string;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: Currentunits;
  current: Current;
  hourly_units: Hourlyunits;
  hourly: Hourly;
}

interface Hourly {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  windspeed_10m: number[];
  weather_code: number[];
}

interface Hourlyunits {
  time: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  windspeed_10m: string;
  weather_code: string;
}

interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  relativehumidity_2m: number;
  windspeed_10m: number;
  precipitation: number;
  surface_pressure: number;
  weather_code: number;
}

interface Currentunits {
  time: string;
  interval: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  windspeed_10m: string;
  precipitation: string;
  surface_pressure: string;
  weather_code: string;
}
export interface WeatherCodes {
  [key: string]: WeatherCode;
}

export interface WeatherCode {
  day: CodeDetails;
  night: CodeDetails;
}

export interface CodeDetails {
  description: string;
  image: string;
}
