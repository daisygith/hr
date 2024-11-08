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
  // private _apiUrl = environment.apiUrl;

  addEmployee(addEmployee: Employee): Observable<Employee> {
    console.log(addEmployee);
    return this.http.post<Employee>(`${this._apiUrl}`, addEmployee);
  }

  public getManageEmployee(): Observable<ManageEmployee[]> {
    return of([
      {
        employeeName: 'Test1 Test1',
        phoneNumber: '(+62) 928 7273 7262',
        department: 'Design',
        jobTitle: 'Creative Direction',
        contactType: 'Onsite - Full time',
        attendance: '120h 32m',
      },
    ]);
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
