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

// TODO: dodać models/employees.ts i w nim dodać ten model
export interface ManageEmployee {
  employeeName: string;
  phoneNumber: string;
  department: string;
  jobTitle: string;
  contactType: string;
  attendance: string;
}

/**
 * TODO: dodać services/employees.service.ts a w nim metodę getEmployees, która zwróci tą listę
 */
const ELEMENT_DATA: ManageEmployee[] = [
  {
    employeeName: 'Test1 Test1',
    phoneNumber: '(+62) 928 7273 7262',
    department: 'Design',
    jobTitle: 'Creative Direction',
    contactType: 'Onsite - Full time',
    attendance: '120h 32m',
  },
  {
    employeeName: 'Test1 Test1',
    phoneNumber: '(+62) 928 7273 7262',
    department: 'Design',
    jobTitle: 'Creative Direction',
    contactType: 'Onsite - Full time',
    attendance: '120h 32m',
  },
];

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
export class ManageEmployeeComponent {
  displayedColumns: string[] = [
    'employeeName',
    'phoneNumber',
    'department',
    'jobTitle',
    'contactType',
    'attendance',
    'details',
    'more',
  ];
  dataSource = ELEMENT_DATA;
}
