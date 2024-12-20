import { Component, ViewEncapsulation } from '@angular/core';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { ManageEmployeeComponent } from '../../../employee/components/manage-employee/manage-employee.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DepartmentsListComponent } from '../departments-list/departments-list.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    HasRoleDirective,
    ManageEmployeeComponent,
    MatButton,
    MatIcon,
    MatTab,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    MatTabGroup,
    MatTabLabel,
    DepartmentsListComponent,
  ],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentsComponent {}
