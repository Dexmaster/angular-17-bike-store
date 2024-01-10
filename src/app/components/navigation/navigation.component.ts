import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    PortalModule,
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  #authService = inject(AuthService);
  loggedIn = computed(() => !!this.#authService.isLoggedIn());
  name = computed(() => this.#authService.user()?.name);
  email = computed(() => this.#authService.user()?.email);
  gravatar = computed(() => this.getGravatar(this.email()));

  async getGravatar(email?: string, size = 25) {
    if (!email?.length) return '';
    const msgUint8 = new TextEncoder().encode(email);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return `https://gravatar.com/avatar/${hashHex}?s=${size}`;
  }

  logout() {
    this.#authService.logout();
  }
}
