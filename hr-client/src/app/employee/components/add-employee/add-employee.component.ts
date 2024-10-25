import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {ToolbarLeftComponent} from "../../../shared/components/toolbar-left/toolbar-left.component";
import {ToolbarTopComponent} from "../../../shared/components/toolbar-top/toolbar-top.component";
import {NgOptimizedImage} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarLeftComponent,
    ToolbarTopComponent,
    NgOptimizedImage,
    MatButton,
    MatIcon,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatIconButton
  ],
  templateUrl: "./add-employee.component.html",
  styleUrl: "./add-employee.component.scss",
  encapsulation: ViewEncapsulation.None
})

export class AddEmployeeComponent {

}
