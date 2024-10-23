import { Routes } from '@angular/router';

export const employeeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./employee/employee.component').then(m => m.EmployeeComponent),
  }
];
