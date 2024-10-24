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
  selector: 'app-requestTimeOff',
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
  templateUrl: "./requestTimeOff.component.html",
  styleUrl: "./requestTimeOff.component.scss",
  encapsulation: ViewEncapsulation.None
})

export class RequestTimeOffComponent {

  displayedColumns2: string[] = ['employeeName', 'leaveType', 'leaveFrom', 'days', 'statusEmployee', 'edit'];
  dataSource2 = ELEMENT_DATA2;

}
