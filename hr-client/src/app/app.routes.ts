import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/components/dashboard.routes').then(m => m.dashboardRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/components/login.routes').then(m=>m.routes),
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: '/login'
  }
];
