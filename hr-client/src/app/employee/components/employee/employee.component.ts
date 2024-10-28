import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MatTableModule } from '@angular/material/table';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee.component';
import { ShellComponent } from '../../../shell/components/shell/shell.component';
import { RequestTimeOffComponent } from '../request-time-off/request-time-off.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButton,
    MatIcon,
    MatTabGroup,
    MatTab,
    InputComponent,
    MatTableModule,
    ManageEmployeeComponent,
    RequestTimeOffComponent,
    RouterLink,
    RouterLinkActive,
    ShellComponent,
    RequestTimeOffComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent {}
