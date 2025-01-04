import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProjectsList } from '../models/projectsList';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/projects`;

  getProjects(): Observable<ProjectsList[]> {
    return this._http.get<ProjectsList[]>(`${this._apiUrl}`);
  }

  getProjectById(projectId: number): Observable<ProjectsList> {
    return this._http.get<ProjectsList>(`${this._apiUrl}/${projectId}`);
  }

  addProject(project: ProjectsList): Observable<ProjectsList> {
    return this._http.post<ProjectsList>(`${this._apiUrl}`, project);
  }

  // updateProject(project: ProjectsList): Observable<ProjectsList> {
  //   return this._http.put<ProjectsList>(
  //     `${this._apiUrl}/${project.id}`,
  //     project,
  //   );
  // }

  deleteProject(projectId: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${projectId}`);
  }

  //manage-project

  //task
}
