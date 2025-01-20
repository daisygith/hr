import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { ProjectService } from '../../services/project.service';
import { NotificationService } from '../../../shared/services/notification.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ProjectsList } from '../../models/projectsList';
import { Task } from '../../models/task';
import { ProjectManagementService } from '../../services/project-management.service';
import { ImageTokenPipe } from '../../../shared/pipes/image-token.pipe';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatButton,
    TranslateModule,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    NgForOf,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    ImageTokenPipe,
    MatMiniFabButton,
    NgOptimizedImage,
    HasRoleDirective,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent implements OnInit {
  private _fb: FormBuilder = inject(FormBuilder);
  private _projectService: ProjectService = inject(ProjectService);
  private _router = inject(Router);
  private _projectManagementService: ProjectManagementService = inject(
    ProjectManagementService,
  );
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public notification: NotificationService = inject(NotificationService);

  public addTaskGroup!: FormGroup;

  isNew: boolean = false;
  id: number | undefined;
  taskId: number | undefined;

  task: Task | undefined;
  project: ProjectsList | undefined;

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['projectId'];
    this.taskId = this._activeRoute.snapshot.params['taskId'];
    this.isNew = !this.taskId;
    this.buildForm();

    if (this.id && this.taskId) {
      this.getTaskById(this.id, this.taskId);
    }
    console.log(this.id);
  }

  // public employeeArr = this.data.employees;

  public statusOption: string[] = ['NEW', 'WORK_IN_PROGRESS', 'DONE'];

  public priorityOption: string[] = ['NORMAL', 'HIGH', 'LOW'];

  public typeTaskOption: string[] = ['NORMAL', 'FAULT'];

  public buildForm() {
    this.addTaskGroup = this._fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, []),
      description: new FormControl(null, [Validators.required]),
      employeeId: new FormControl(null),
      projectId: new FormControl(this.project?.id),
      estimatedWorkTime: new FormControl(null, [Validators.required]),
      estimatedTaskTimeEnd: new FormControl(null, [Validators.required]),
      startDate: new Date(),
      priorityStatus: new FormControl(null, [Validators.required]),
      typeTask: new FormControl(null, [Validators.required]),
      comment: new FormControl(null),
    });
    if (!this.isNew) {
      this.addTaskGroup.get('status')?.addValidators([Validators.required]);
    }
  }

  getTaskById(projectId: number, taskId: number | undefined) {
    this._projectService.getTaskById(projectId, taskId).subscribe((el) => {
      this.task = el;
      this.addTaskGroup.patchValue(el);
    });
  }

  saveData() {
    if (this.addTaskGroup.invalid) {
      return;
    }
    if (this.isNew) {
      this._projectService.addTask(this.addTaskGroup.getRawValue()).subscribe({
        next: (data) => {
          // this.dialogRef.close();
          this.addTaskGroup.patchValue(data);
          this.notification.successMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK',
          );
          this._projectManagementService.refreshTasks();
          this._router.navigateByUrl(`/projects/${this.project?.id}`);
        },
        error: (err) => {
          this.notification.errorMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
          );
        },
      });
    } else {
      this._projectService
        .updateTaskById(this.addTaskGroup.getRawValue())
        .subscribe({
          next: (data) => {
            // this.dialogRef.close();
            this.task = data;
            this.addTaskGroup.patchValue(data);
            this.notification.successMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK_UPDATE',
            );
            this._projectManagementService.refreshTasks();
            this._router.navigateByUrl(`/projects/${this.project?.id}`);
          },
          error: (err) => {
            this.notification.errorMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
            );
          },
        });
    }
  }
}
