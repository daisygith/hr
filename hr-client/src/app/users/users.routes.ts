import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/users-management/users-management.component').then(
        (m) => m.UsersManagementComponent,
      ),
  },
];
