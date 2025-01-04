import { Routes } from '@angular/router';

export const projectRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/add-project/add-project.component').then(
        (m) => m.AddProjectComponent,
      ),
  },
  {
    path: ':projectId',
    loadComponent: () =>
      import('./components/manage-project/manage-project.component').then(
        (m) => m.ManageProjectComponent,
      ),
  },
];
