import { Injectable } from '@angular/core';
import { RequestTimeOff } from '../models/requestTimeOff';
import { ManageEmployee } from '../models/manageEmmployee';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
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
