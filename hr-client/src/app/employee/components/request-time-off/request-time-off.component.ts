import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeService } from '../../services/employee.service';
import { RequestTimeOff } from '../../models/requestTimeOff';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-request-time-off',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    TranslateModule,
    AsyncPipe,
    DatePipe,
    RouterLinkActive,
    RouterLink,
    MatMiniFabButton,
  ],
  templateUrl: './request-time-off.component.html',
  styleUrl: './request-time-off.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RequestTimeOffComponent implements OnInit {
  private _employeeService: EmployeeService = inject(EmployeeService);

  dataSource: RequestTimeOff[] = [];

  displayedColumns = [
    'employeeName',
    'leaveType',
    'startDate',
    'endDate',
    'days',
    // 'statusEmployee',
    'edit',
    'delete',
  ];

  ngOnInit(): void {
    this.getRequestForEmployee();
  }

  getRequestForEmployee(): void {
    this._employeeService.getRequestForEmployee().subscribe({
      next: (value) => (this.dataSource = value),
    });
  }

  deleteRequestForEmployeeById(id: RequestTimeOff): void {
    this.dataSource = this.dataSource.filter((item) => item !== id);
    console.log(this.dataSource);
    this._employeeService.deleteRequestForEmployeeById(id.id).subscribe();
  }
}
