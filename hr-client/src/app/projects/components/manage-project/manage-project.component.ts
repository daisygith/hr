import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { ManageEmployeeComponent } from '../../../employee/components/manage-employee/manage-employee.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { Role } from '../../../auth/models/role';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { DashboardTaskComponent } from '../dashboard-task/dashboard-task.component';
import { ManageProjectIdComponent } from '../manage-project-id/manage-project-id.component';
import { ProjectDetails } from '../../models/projectDetails';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-manage-project',
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
    DashboardTaskComponent,
    ManageProjectIdComponent,
  ],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageProjectComponent implements OnInit {
  id: number | undefined;
  projectDetails: ProjectDetails | undefined;
  readonly dialog = inject(MatDialog);

  private _projectService: ProjectService = inject(ProjectService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public canAddEmployeeRoles = [Role.MODERATOR, Role.ADMIN];

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['projectId'];
    this.getProjectById(this.id);
  }

  getProjectById(projectId: number | undefined): void {
    if (!projectId) {
      return;
    }
    this._projectService.getProjectById(projectId).subscribe((data) => {
      this.projectDetails = data;
      // this.addProjectGroup.patchValue(data);
    });
  }

  // openDialogTask() {
  //   const dialogRef = this.dialog.open(AddTaskComponent, {
  //     data: { projectId: this.id, employees: this.projectDetails?.employees },
  //     // height: '650px',
  //     width: '900px',
  //   });
  //
  //   dialogRef.afterClosed().subscribe((result) => {});
  // }
  openNewTask(projectId: number | undefined) {
    if (!this._authService.hasRole(this.canAddEmployeeRoles)) {
      return;
    }
    this._router.navigateByUrl(`/projects/${projectId}/tasks/new`);
  }
}
