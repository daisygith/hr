import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/users-management/users-management.component').then(
        (m) => m.UsersManagementComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/add-user/add-user.component').then(
        (m) => m.AddUserComponent,
      ),
  },
  {
    path: ':userId',
    loadComponent: () =>
      import('./components/add-user/add-user.component').then(
        (m) => m.AddUserComponent,
      ),
  },
];
