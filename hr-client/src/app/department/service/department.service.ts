import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DepartmentsList } from '../models/departmentsList';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/departments`;

  getDepartments(): Observable<DepartmentsList[]> {
    return this._http.get<DepartmentsList[]>(`${this._apiUrl}`);
  }
}
