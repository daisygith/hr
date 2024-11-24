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
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationComponent } from '../../../shared/components/dialog-animation/dialog-animation.component';
import { NotificationService } from '../../../shared/services/notification.service';

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
    NgIf,
  ],
  templateUrl: './request-time-off.component.html',
  styleUrl: './request-time-off.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RequestTimeOffComponent implements OnInit {
  public notification: NotificationService = inject(NotificationService);
  private _employeeService: EmployeeService = inject(EmployeeService);
  readonly dialog = inject(MatDialog);

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

  openDialog(id: RequestTimeOff, e: Event) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DialogAnimationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteRequestForEmployeeById(id);
      }
    });
  }

  deleteRequestForEmployeeById(id: RequestTimeOff): void {
    this._employeeService.deleteRequestForEmployeeById(id.id).subscribe(
      () => {
        this.dataSource = this.dataSource.filter((data) => data !== id);
        this.notification.successMethod('DATA.REMOVE_OK');
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
