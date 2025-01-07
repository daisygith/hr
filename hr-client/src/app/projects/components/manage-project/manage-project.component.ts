import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { ManageEmployeeComponent } from '../../../employee/components/manage-employee/manage-employee.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { Role } from '../../../auth/models/role';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectsList } from '../../models/projectsList';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

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
  ],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageProjectComponent implements OnInit {
  id: number | undefined;
  project: ProjectsList | undefined;

  readonly dialog = inject(MatDialog);

  private _projectService: ProjectService = inject(ProjectService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

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
      this.project = data;
      // this.addProjectGroup.patchValue(data);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: { projectId: this.id },
      height: '650px',
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
