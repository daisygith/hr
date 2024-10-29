import { Component, ViewEncapsulation } from '@angular/core';
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

// TODO: services/employees.service.ts a w nim metodę getTimeOffRequests(), która zwróci tą listę
const ELEMENT_DATA2: {
  employeeName: string;
  leaveType: string;
  days: number;
  statusEmployee: string;
  leaveFrom: string;
}[] = [
  {
    employeeName: 'Test1 Test1',
    leaveType: 'annual leave',
    leaveFrom: '2024-03-03',
    days: 1,
    statusEmployee: 'pending',
  },
];

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
export class RequestTimeOffComponent {
  // TODO: usunąć "2"
  displayedColumns2: string[] = [
    'employeeName',
    'leaveType',
    'leaveFrom',
    'days',
    'statusEmployee',
    'edit',
  ];
  dataSource2 = ELEMENT_DATA2;
}
