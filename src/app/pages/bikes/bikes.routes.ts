import { Route } from '@angular/router';

const BikeRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./bikes.component'),
    data: {
      title: 'Bikes-list',
    },
  },
  {
    path: 'new',
    loadComponent: () => import('./bikes-detail/bikes-detail.component'),
    data: {
      title: 'Bikes-new',
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./bikes-detail/bikes-detail.component'),
    data: {
      title: 'Bikes-edit',
    },
  },
];

export default BikeRoutes;
