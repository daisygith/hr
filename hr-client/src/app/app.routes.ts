import {Routes} from '@angular/router';

export const routes: Routes = [
  {
  path: 'login',
  loadChildren: () => import('./login/components/login.routes').then(m=>m.routes),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/components/dashboard.routes').then(m => m.dashboardRoutes),
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/components/employee.routes').then(m => m.employeeRoutes),
  },

  {
    path: '',
    pathMatch: "full",
    redirectTo: '/login'
  }
];
