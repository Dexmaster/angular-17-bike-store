import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: unknown) {
    localStorage.setItem(`${environment.APP_PREFIX}_${key}`, JSON.stringify(value));
  }

  getItem<T>(key: string, fallback?: T) {
    const item = localStorage.getItem(`${environment.APP_PREFIX}_${key}`);
    if (!item) return fallback as T;
    return JSON.parse(item) as T;
  }

  removeItem(key: string) {
    localStorage.removeItem(`${environment.APP_PREFIX}_${key}`);
  }
}
