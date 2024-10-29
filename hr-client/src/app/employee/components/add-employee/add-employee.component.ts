import {Component, signal, ViewEncapsulation} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {ShellComponent} from "../../../shell/components/shell/shell.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    MatButton,
    MatIcon,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatIconButton,
    ShellComponent,
    TranslateModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddEmployeeComponent {
  hidePassword = signal(true);
  clickEventHidePassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  hideConfirmPassword = signal(true);
  clickEventHideConfirmPassword(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }
}
