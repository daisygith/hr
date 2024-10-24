import {Component, ViewEncapsulation} from "@angular/core";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

export interface ManageEmployee {
  employeeName: string;
  phoneNumber: string;
  department: string;
  jobTitle: string;
  contactType: string;
  attendance: string;
}


const ELEMENT_DATA: ManageEmployee[] = [
  {employeeName: 'Test1 Test1', phoneNumber: '(+62) 928 7273 7262', department: 'Design', jobTitle: 'Creative Direction', contactType: 'Onsite - Full time', attendance: '120h 32m'},
  {employeeName: 'Test1 Test1', phoneNumber: '(+62) 928 7273 7262', department: 'Design', jobTitle: 'Creative Direction', contactType: 'Onsite - Full time', attendance: '120h 32m'},
];

@Component({
  selector: 'app-manageEmployee',
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
    MatIcon
  ],
  templateUrl: "./manageEmployee.component.html",
  styleUrl: "./manageEmployee.component.scss",
  encapsulation: ViewEncapsulation.None
})

export class ManageEmployeeComponent {

  displayedColumns: string[] = ['employeeName', 'phoneNumber', 'department', 'jobTitle', 'contactType', 'attendance', 'details', 'more'];
  dataSource = ELEMENT_DATA;

}
