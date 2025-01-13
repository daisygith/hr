import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsList } from '../../models/projectsList';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { NotificationService } from '../../../shared/services/notification.service';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';
import { Role } from '../../../auth/models/role';

@Component({
  selector: 'app-manage-project-id',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    TranslateModule,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HasRoleDirective,
  ],
  templateUrl: './manage-project-id.component.html',
  styleUrl: './manage-project-id.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageProjectIdComponent implements OnInit {
  id: number | undefined;
  project: ProjectsList | undefined;

  readonly dialog = inject(MatDialog);

  private _fb: FormBuilder = inject(FormBuilder);
  private _projectService: ProjectService = inject(ProjectService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public notification: NotificationService = inject(NotificationService);
  public addProjectGroup!: FormGroup;

  public canAddEmployeeRoles = [Role.MODERATOR, Role.ADMIN];

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['projectId'];
    this.buildForm();
    this.getProjectById(this.id);
  }

  getProjectById(projectId: number | undefined): void {
    if (!projectId) {
      return;
    }
    this._projectService.getProjectById(projectId).subscribe((data) => {
      this.project = data;
      this.addProjectGroup.patchValue(data);
    });
  }

  public buildForm() {
    this.addProjectGroup = this._fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
    });
  }

  saveData() {
    this._projectService
      .updateProject(this.addProjectGroup.getRawValue())
      .subscribe({
        next: (data) => {
          this.project = data;
          this.addProjectGroup.patchValue(data);
          this.notification.successMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK_UPDATE',
          );
        },
        error: (err) => {
          this.notification.errorMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
          );
        },
      });
  }

  openDialogEmployees() {
    const dialogRef = this.dialog.open(AddEmployeesComponent, {
      data: { projectId: this.id, employees: [] },
      height: '650px',
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
