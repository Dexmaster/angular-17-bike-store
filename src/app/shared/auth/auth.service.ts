import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #router = inject(Router);
  readonly #localStorage = inject(LocalStorageService);
  readonly #loggedIn = signal(this.#localStorage.getItem('loggedIn', false));
  constructor() {
    effect(() => {
      if (this.isLoggedIn()) {
        this.#localStorage.setItem('loggedIn', true);
        this.#router.navigate(['dashboard']);
      } else {
        this.#localStorage.setItem('loggedIn', false);
        this.#router.navigate(['login']);
      }
    });
  }

  isLoggedIn() {
    return this.#loggedIn();
  }

  login() {
    this.#loggedIn.set(true);
  }

  logout() {
    this.#loggedIn.set(false);
  }
}
