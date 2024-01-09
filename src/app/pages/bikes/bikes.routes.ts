import { Route } from "@angular/router";

const BikeRoutes: Route[] = [
    { path: '', loadComponent: () => import('./bikes.component')},
    { path: 'new', loadComponent: () => import('./bikes-detail/bikes-detail.component')},
    { path: 'edit/:id', loadComponent: () => import('./bikes-detail/bikes-detail.component')}
];
export default BikeRoutes;