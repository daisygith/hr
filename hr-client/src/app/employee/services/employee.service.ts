import { inject, Injectable } from '@angular/core';
import { RequestTimeOff } from '../models/requestTimeOff';
import { ManageEmployee } from '../models/manageEmmployee';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/employees`;

  //add-employee
  addEmployee(addEmployee: Employee): Observable<Employee> {
    console.log(addEmployee);
    return this.http.post<Employee>(`${this._apiUrl}`, addEmployee);
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this._apiUrl}/${employeeId}`);
  }

  //manage-employee
  getManageEmployee(): Observable<ManageEmployee[]> {
    return this.http.get<ManageEmployee[]>(`${this._apiUrl}`);
  }

  deleteManageEmployeeById(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this._apiUrl}/${employeeId}`);
  }

  public getRequestTimeOff(): Observable<RequestTimeOff[]> {
    return of([
      {
        employeeName: 'Test1 Test1',
        leaveType: 'ANNUAL_LEAVE',
        leaveFrom: '2024-03-03',
        days: 1,
        statusEmployee: 'pending',
      },
    ]);
  }
}
