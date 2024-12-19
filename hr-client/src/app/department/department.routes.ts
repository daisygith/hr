import { Routes } from '@angular/router';

export const departmentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/departments/departments.component').then(
        (m) => m.DepartmentsComponent,
      ),
  },
];
