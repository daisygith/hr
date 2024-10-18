import { Routes } from '@angular/router';

export const routes: Routes = [
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
