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
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationComponent } from '../../../shared/components/dialog-animation/dialog-animation.component';
import { NotificationService } from '../../../shared/services/notification.service';

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
  public notification: NotificationService = inject(NotificationService);
  private _employeeService: EmployeeService = inject(EmployeeService);
  readonly dialog = inject(MatDialog);

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

  openDialog(employeeId: ManageEmployee, e: Event) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DialogAnimationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteManageEmployeeById(employeeId);
      }
    });
  }

  deleteManageEmployeeById(employeeId: ManageEmployee): void {
    this._employeeService.deleteManageEmployeeById(employeeId.id).subscribe(
      () => {
        this.dataSource = this.dataSource.filter((item) => item !== employeeId);
        this.notification.successMethod('DATA.REMOVE_OK');
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
