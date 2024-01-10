import { Routes } from '@angular/router';
import { authGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
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
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
    data: {
      title: 'Register',
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/not-found/not-found.component'),
    data: {
      title: 'Not found',
    },
  },
];
