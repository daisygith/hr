import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {ToolbarLeftComponent} from "../../../shared/components/toolbar-left/toolbar-left.component";
import {ToolbarTopComponent} from "../../../shared/components/toolbar-top/toolbar-top.component";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarLeftComponent,
    ToolbarTopComponent
  ],
  templateUrl: "./add-employee.component.html",
  styleUrl: "./add-employee.component.scss"
})

export class AddEmployeeComponent {

}
