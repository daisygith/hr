import { Component, ViewEncapsulation } from '@angular/core';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { ManageEmployeeComponent } from '../../../employee/components/manage-employee/manage-employee.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    HasRoleDirective,
    ManageEmployeeComponent,
    MatButton,
    MatIcon,
    MatTab,
    TranslateModule,
    MatTabGroup,
    MatTabLabel,
  ],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UsersManagementComponent {}
