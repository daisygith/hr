import { Routes } from '@angular/router';

export const employeeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/employee/employee.component').then(
        (m) => m.EmployeeComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/add-employee/add-employee.component').then(
        (m) => m.AddEmployeeComponent,
      ),
  },
  {
    path: ':employeeId',
    loadComponent: () =>
      import('./components/add-employee/add-employee.component').then(
        (m) => m.AddEmployeeComponent,
      ),
  },
];
