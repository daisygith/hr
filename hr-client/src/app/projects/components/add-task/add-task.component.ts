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
import { NgForOf } from '@angular/common';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { ProjectService } from '../../services/project.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Router } from '@angular/router';

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

  public notification: NotificationService = inject(NotificationService);

  public addTaskGroup!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<AddTaskComponent>);
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projectId: number }) {}

  public statusOption: string[] = [
    'NEW',
    'PRIORITY',
    'WORK_IN_PROGRESS',
    'DONE',
  ];

  public priorityOption: string[] = ['NORMAL', 'HIGH', 'LOW'];

  public typeTaskOption: string[] = ['NORMAL', 'FAULT'];

  public buildForm() {
    this.addTaskGroup = this._fb.group({
      id: new FormControl(''),
      name: new FormControl(null),
      status: new FormControl(null),
      description: new FormControl(null),
      employeeId: new FormControl(null),
      projectId: new FormControl(this.data.projectId),
      estimatedWorkTime: new Date(),
      estimatedTaskTimeEnd: new Date(),
      startDate: new Date(),
      priorityStatus: new FormControl(null),
      typeTask: new FormControl(null),
    });
  }

  saveData() {
    if (this.addTaskGroup.invalid) {
      return;
    }
    this._projectService.addTask(this.addTaskGroup.getRawValue()).subscribe({
      next: (data) => {
        this.addTaskGroup.patchValue(data);
        this.notification.successMethod('ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK');
        this._router.navigateByUrl(`/projects/${data.id}`);
      },
      error: (err) => {
        this.notification.errorMethod(
          'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
        );
      },
    });
  }
}
