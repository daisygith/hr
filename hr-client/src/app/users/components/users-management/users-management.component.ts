import { Component, ViewEncapsulation } from '@angular/core';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { ManageEmployeeComponent } from '../../../employee/components/manage-employee/manage-employee.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    UsersListComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UsersManagementComponent {}
