import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, User, UserAuth } from '@shared/auth/auth.models';
import { LocalStorageService } from '@shared/local-storage/local-storage.service';
import { environment } from '@src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #router = inject(Router);
  readonly #localStorage = inject(LocalStorageService);
  readonly #http = inject(HttpClient);
  readonly user = signal<User | null>(this.#localStorage.getItem('user', null));
  readonly #accessToken = signal<string>(
    this.#localStorage.getItem('accessToken', '')
  );
  readonly #loggedIn = computed(() => !!this.#accessToken());
  readonly #api = environment.API_ENDPOINT;

  constructor() {
    effect(() => {
      this.#localStorage.setItem('accessToken', this.#accessToken());
      this.#localStorage.setItem('user', this.user());
    });
  }

  getAuthorizationToken() {
    return this.#accessToken();
  }

  isLoggedIn() {
    return this.#loggedIn();
  }

  onAuthSuccess({ user, accessToken }: AuthResponse) {
    if (!accessToken) return;
    this.#accessToken.set(accessToken);
    this.user.set(user);
    this.#router.navigate(['bikes']);
  }

  register({ email, password, name }: User) {
    return this.#http
      .post<AuthResponse>(`${this.#api}/register`, { email, password, name })
      .pipe(tap(this.onAuthSuccess.bind(this)));
  }

  login({ email, password }: UserAuth) {
    return this.#http
      .post<AuthResponse>(`${this.#api}/login`, { email, password })
      .pipe(tap(this.onAuthSuccess.bind(this)));
  }

  logout() {
    this.user.set(null);
    this.#accessToken.set('');
    this.#router.navigate(['login']);
  }
}
