import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);
  readonly authError = signal('');
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  onAuthError(message: string) {
    return (error?: Error) =>
      this.authError.set(`${message} ${error?.message ?? ''}`);
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    return this.#authService
      .login(this.loginForm.value)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap({ error: this.onAuthError('Failed to login.') })
      )
      .subscribe();
  }
}
