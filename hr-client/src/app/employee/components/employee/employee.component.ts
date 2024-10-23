import {Component} from "@angular/core";
import {ToolbarLeftComponent} from "../../../shared/components/toolbar-left/toolbar-left.component";
import {ToolbarTopComponent} from "../../../shared/components/toolbar-top/toolbar-top.component";
import {RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ToolbarLeftComponent,
    ToolbarTopComponent,
    RouterOutlet,
    MatButton,
    MatIcon
  ],
  templateUrl: "./employee.component.html",
  styleUrl: "./employee.component.scss"
})

export class EmployeeComponent {

}
