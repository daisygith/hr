import {Component, ViewEncapsulation} from "@angular/core";
import {ToolbarLeftComponent} from "../../../shared/components/toolbar-left/toolbar-left.component";
import {ToolbarTopComponent} from "../../../shared/components/toolbar-top/toolbar-top.component";
import {RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {InputComponent} from "../../../shared/components/input/input.component";
import {MatTableModule} from "@angular/material/table";
import {ManageEmployeeComponent} from "../manageEmployee/manageEmployee.component";
import {RequestTimeOffComponent} from "../requestTimeOff/requestTimeOff.component";

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
    MatTableModule,
    ManageEmployeeComponent,
    RequestTimeOffComponent
  ],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.scss",
  encapsulation: ViewEncapsulation.None
})

export class EmployeeComponent {


}
