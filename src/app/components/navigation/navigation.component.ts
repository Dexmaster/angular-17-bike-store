import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  authService$ = inject(AuthService);
  
  logout() {
    this.authService$.logout();
  }

  isLoggedIn() {
    return this.authService$.isLoggedIn();
  }
}
