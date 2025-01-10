import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { ProjectService } from '../../services/project.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Router } from '@angular/router';
import { ProjectsList } from '../../models/projectsList';
import { Task } from '../../models/task';
import { ProjectManagementService } from '../../services/project-management.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    TranslateModule,
    MatDialogClose,
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

  public notification: NotificationService = inject(NotificationService);

  public addTaskGroup!: FormGroup;

  isNew: boolean = false;

  task!: Task;
  project!: ProjectsList;

  readonly dialogRef = inject(MatDialogRef<AddTaskComponent>);
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.data.projectId && this.data.taskId) {
      this.getTaskById(this.data.projectId, this.data.taskId);
    }
    this.isNew = !this.data.taskId;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number; taskId: number },
  ) {}

  public statusOption: string[] = ['NEW', 'WORK_IN_PROGRESS', 'DONE'];

  public priorityOption: string[] = ['NORMAL', 'HIGH', 'LOW'];

  public typeTaskOption: string[] = ['NORMAL', 'FAULT'];

  public buildForm() {
    this.addTaskGroup = this._fb.group({
      id: new FormControl(null),
      name: new FormControl(null),
      status: new FormControl(null),
      description: new FormControl(null),
      employeeId: new FormControl(null),
      projectId: new FormControl(this.data.projectId),
      estimatedWorkTime: new FormControl(null),
      estimatedTaskTimeEnd: new FormControl(null),
      startDate: new Date(),
      priorityStatus: new FormControl(null),
      typeTask: new FormControl(null),
    });
  }

  getTaskById(projectId: number, taskId: number) {
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
          this.addTaskGroup.patchValue(data);
          this.notification.successMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK',
          );
          this._projectManagementService.refreshTasks();
          this._router.navigateByUrl(`/projects/${this.project.id}`);
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
            this.task = data;
            this.addTaskGroup.patchValue(data);
            this.notification.successMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK_UPDATE',
            );
            this._projectManagementService.refreshTasks();
            this._router.navigateByUrl(`/projects/${this.project.id}`);
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
