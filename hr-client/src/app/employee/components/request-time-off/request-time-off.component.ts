import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeService } from '../../services/employee.service';
import { RequestTimeOff } from '../../models/requestTimeOff';

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
  ],
  templateUrl: './request-time-off.component.html',
  styleUrl: './request-time-off.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RequestTimeOffComponent implements OnInit {
  dataSource: RequestTimeOff[] = [];

  constructor(private employeeService: EmployeeService) {}

  getRequestTImeOff(): void {
    this.dataSource = this.employeeService.getRequestTimeOff();
  }

  ngOnInit(): void {
    this.getRequestTImeOff();
  }

  displayedColumns = [
    'employeeName',
    'leaveType',
    'leaveFrom',
    'days',
    'statusEmployee',
    'edit',
  ];
}
