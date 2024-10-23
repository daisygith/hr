import {Component, ViewEncapsulation} from "@angular/core";
import {ToolbarLeftComponent} from "../../../shared/components/toolbar-left/toolbar-left.component";
import {ToolbarTopComponent} from "../../../shared/components/toolbar-top/toolbar-top.component";
import {RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {InputComponent} from "../../../shared/components/input/input.component";
import {MatTableModule} from "@angular/material/table";

export interface ManageEmployee {
  employeeName: string;
  phoneNumber: string;
  department: string;
  jobTitle: string;
  contactType: string;
  attendance: string;
}

// export interface RequestTimeOff {
//   employeeName: string;
//   leaveType: string;
//   leaveFrom: Date;
//   days: number;
//   statusEmployee: string;
// }

const ELEMENT_DATA: ManageEmployee[] = [
  {employeeName: 'Test1 Test1', phoneNumber: '(+62) 928 7273 7262', department: 'Design', jobTitle: 'Creative Direction', contactType: 'Onsite - Full time', attendance: '120h 32m'},
  {employeeName: 'Test1 Test1', phoneNumber: '(+62) 928 7273 7262', department: 'Design', jobTitle: 'Creative Direction', contactType: 'Onsite - Full time', attendance: '120h 32m'},
];

const ELEMENT_DATA2: {
  employeeName: string;
  leaveType: string;
  days: number;
  statusEmployee: string;
  leaveFrom: string
}[] = [
  {employeeName: 'Test1 Test1', leaveType: 'annual leave', leaveFrom: '2024-03-03', days: 1, statusEmployee: 'pending'},
];


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ToolbarLeftComponent,
    ToolbarTopComponent,
    RouterOutlet,
    MatButton,
    MatIcon,
    MatTabGroup,
    MatTab,
    InputComponent,
    MatTableModule
  ],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.scss",
  encapsulation: ViewEncapsulation.None
})

export class EmployeeComponent {

 displayedColumns: string[] = ['employeeName', 'phoneNumber', 'department', 'jobTitle', 'contactType', 'attendance', 'details', 'more'];
 displayedColumns2: string[] = ['employeeName', 'leaveType', 'leaveFrom', 'days', 'statusEmployee', 'edit'];
  dataSource = ELEMENT_DATA;
  dataSource2 = ELEMENT_DATA2;

}
