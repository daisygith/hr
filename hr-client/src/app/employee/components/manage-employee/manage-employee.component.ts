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
import { ManageEmployee } from '../../models/manageEmmployee';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    MatMiniFabButton,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageEmployeeComponent implements OnInit {
  private _employeeService: EmployeeService = inject(EmployeeService);
  clickedRows = new Set<ManageEmployee>();
  dataSource: ManageEmployee[] = [];
  displayedColumns = [
    'name',
    'phone',
    'department',
    'position',
    'typeOfContract',
    // 'attendance',
    'details',
    'delete',
  ];

  ngOnInit(): void {
    this.getManageEmployee();
  }

  getManageEmployee(): void {
    this._employeeService
      .getManageEmployee()
      .subscribe({ next: (value) => (this.dataSource = value) });
  }

  deleteManageEmployeeById(employeeId: ManageEmployee): void {
    this.dataSource = this.dataSource.filter((item) => item !== employeeId);
    console.log(this.dataSource);
    this._employeeService.deleteManageEmployeeById(employeeId.id).subscribe();
  }
}
