import { Routes } from '@angular/router';
import { authGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
    data: {
      title: 'Home',
    },
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    data: {
      title: 'Login',
    },
  },
  {
    path: 'bikes',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/bikes/bikes.routes'),
    data: {
      title: 'Bikes',
    },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/not-found/not-found.component'),
    data: {
      title: 'Not found',
    },
  },
];
