import { Routes } from '@angular/router';
import { authGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'bikes',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/bikes/bikes.routes'),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/not-found/not-found.component'),
  },
];
