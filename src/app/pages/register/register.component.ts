import { NgIf } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);
  readonly authError = signal('');
  registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    { validators: this.passwordsMatching }
  );

  passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (password !== passwordConfirm) {
      return { passwordsNotMatching: true };
    }

    return null;
  }

  onAuthError(message: string) {
    return (error?: Error) =>
      this.authError.set(`${message} ${error?.message ?? ''}`);
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    return this.#authService
      .register(this.registerForm.value)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap({ error: this.onAuthError('Failed to register.') })
      )
      .subscribe();
  }
}
