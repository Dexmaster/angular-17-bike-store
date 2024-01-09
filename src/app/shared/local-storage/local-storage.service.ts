import { Injectable } from '@angular/core';
import env from '@src/environments/environments'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: unknown) {
    localStorage.setItem(`${env.APP_PREFIX}_${key}`, JSON.stringify(value));
  }

  getItem<T>(key: string, fallback?: T) {
    const item = localStorage.getItem(`${env.APP_PREFIX}_${key}`);
    if (!item) return fallback as T;
    return JSON.parse(item) as T;
  }

  removeItem(key: string) {
    localStorage.removeItem(`${env.APP_PREFIX}_${key}`);
  }
}
