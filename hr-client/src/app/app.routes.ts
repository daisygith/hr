import { Routes } from '@angular/router';
import { AuthGuardService } from './auth/services/authGuard.service';
import { RoleGuardService } from './auth/services/roleGuard.service';
import { Role } from './auth/models/role';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/components/login/login.routes').then((m) => m.routes),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./auth/components/registration/registration.routes').then(
        (m) => m.routesRegistration,
      ),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./auth/components/unauthorized/unauthorized.component').then(
        (c) => c.UnauthorizedComponent,
      ),
  },
  {
    path: '',
    canActivate: [AuthGuardService],
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
        canActivate: [RoleGuardService],
        data: { roles: [Role.USER, Role.MODERATOR, Role.ADMIN] },
        loadChildren: () =>
          import('./employee/employee.routes').then((m) => m.employeeRoutes),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.routes').then((m) => m.userRoutes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.routes').then((m) => m.usersRoutes),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
];
