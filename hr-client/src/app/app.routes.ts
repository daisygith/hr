import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes').then((m) => m.routes),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.routes').then(
        (m) => m.routesRegistration,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shell/components/shell/shell.component').then(
        (c) => c.ShellComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./employee/employee.routes').then((m) => m.employeeRoutes),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.routes').then((m) => m.userRoutes),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
];
