import { Routes } from '@angular/router';

export const employeeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./employee/employee.component').then(m => m.EmployeeComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./add-employee/add-employee.component').then(m => m.AddEmployeeComponent),
  }
];
