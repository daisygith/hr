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
import { ManageEmployee } from '../../models/manageEmmployee';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-manage-employee',
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
  ],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageEmployeeComponent implements OnInit {
  dataSource: ManageEmployee[] = [];
  displayedColumns = [
    'employeeName',
    'phoneNumber',
    'department',
    'jobTitle',
    'contactType',
    'attendance',
    'details',
    'more',
  ];

  constructor(private _employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getManageEmployee();
  }

  getManageEmployee(): void {
    this._employeeService
      .getManageEmployee()
      .subscribe({ next: (value) => (this.dataSource = value) });
  }
}
