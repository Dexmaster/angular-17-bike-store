import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared/local-storage/local-storage.service';

interface User {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router$ = inject(Router);
  localStorage$ = inject(LocalStorageService);
  private _loggedIn = signal(this.localStorage$.getItem('loggedIn', false));
  private signalEffects = effect(() => {
     if (this._loggedIn()) {
      this.localStorage$.setItem('loggedIn', true);
      this.router$.navigate(['dashboard'])
     } else {
      this.localStorage$.setItem('loggedIn', false);
      this.router$.navigate(['login'])
     }
  });

  isLoggedIn() {
    return this._loggedIn();
  }

  login() {
    this._loggedIn.set(true);
  }

  logout() {
    this._loggedIn.set(false);
  }
}
