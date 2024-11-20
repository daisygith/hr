import { inject, Injectable } from '@angular/core';
import { RequestTimeOff } from '../models/requestTimeOff';
import { ManageEmployee } from '../models/manageEmmployee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { environment } from '../../../environments/environment';
import { RegisterRequestTimeOff } from '../models/registerRequestTimeOff';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/employees`;

  //add-employee
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this._apiUrl}`, employee);
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this._apiUrl}/${employeeId}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this._apiUrl}/${employee.id}`, employee);
  }

  //manage-employee
  getManageEmployee(): Observable<ManageEmployee[]> {
    return this.http.get<ManageEmployee[]>(`${this._apiUrl}`);
  }

  deleteManageEmployeeById(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this._apiUrl}/${employeeId}`);
  }

  addRequestForEmployee(
    employee: RegisterRequestTimeOff,
  ): Observable<RequestTimeOff> {
    return this.http.post<RequestTimeOff>(
      `${this._apiUrl}/request-time-off`,
      employee,
    );
  }

  // public getRequestTimeOff(): Observable<RequestTimeOff[]> {
  //   return of([
  //     {
  //       employeeName: 'Test1 Test1',
  //       leaveType: 'ANNUAL_LEAVE',
  //       leaveFrom: '2024-03-03',
  //       days: 1,
  //       statusEmployee: 'pending',
  //     },
  //   ]);
  // }
}
