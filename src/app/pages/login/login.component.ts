import { Component, inject } from '@angular/core';
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  authService$ = inject(AuthService);
  login() {
    this.authService$.login();
  }
}
