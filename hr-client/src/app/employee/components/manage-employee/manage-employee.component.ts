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
  ],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageEmployeeComponent implements OnInit {
  dataSource: ManageEmployee[] = [];

  constructor(private employeeService: EmployeeService) {}

  getManageEmployee(): void {
    this.dataSource = this.employeeService.getManageEmployee();
  }

  ngOnInit(): void {
    this.getManageEmployee();
  }

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
}
