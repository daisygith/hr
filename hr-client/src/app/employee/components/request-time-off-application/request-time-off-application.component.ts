import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { DatePipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  DateRange,
  DefaultMatCalendarRangeStrategy,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatCard } from '@angular/material/card';
import { EmployeeService } from '../../services/employee.service';
import { ManageEmployee } from '../../models/manageEmmployee';
import { NotificationService } from '../../../shared/services/notification.service';
import { RequestTimeOff } from '../../models/requestTimeOff';

@Component({
  selector: 'app-request-time-off-application',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCard,
    DatePipe,
  ],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: DateRange,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
  templateUrl: './request-time-off-application.component.html',
  styleUrl: './request-time-off-application.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RequestTimeOffApplicationComponent implements OnInit {
  id: number | undefined;
  isNew: boolean = false;
  requestById: RequestTimeOff | undefined;

  dataSource: ManageEmployee[] = [];

  public selectedDateRange: DateRange<Date | undefined> = inject(
    DateRange<Date>,
  );

  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _fb: FormBuilder = inject(FormBuilder);
  private _employeeService: EmployeeService = inject(EmployeeService);
  public notification: NotificationService = inject(NotificationService);

  ngOnInit() {
    this.id = this._activeRoute.snapshot.params['employeeId'];
    this.isNew = !this.id;
    this.buildForm();
    this.getEmployeeName();
    this.getRequestForEmployeeById(this.id);
  }

  public leaveType: string[] = [
    'ANNUAL_LEAVE',
    'CASUAL_LEAVE',
    'PAID_TIME_OFF',
    'SICK_LEAVE',
    'UNPAID_LEAVE',
  ];

  _onSelectedChange(date: Date): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date,
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
    this.dateFormGroup
      .get('startDate')
      ?.patchValue(this.selectedDateRange.start);
    this.dateFormGroup.get('endDate')?.patchValue(this.selectedDateRange.end);
  }

  public dateFormGroup!: FormGroup;

  public buildForm() {
    this.dateFormGroup = this._fb.group({
      employeeId: new FormControl(null),
      leaveType: [null],
      reason: [null],
      startDate: [null],
      endDate: [null],
    });
  }

  getEmployeeName(): void {
    this._employeeService.getManageEmployee().subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log(data);
      },
    });
  }

  getRequestForEmployeeById(employeeId: number | undefined): void {
    if (!employeeId) {
      return;
    }

    this._employeeService
      .getRequestForEmployeeById(employeeId)
      .subscribe((data) => {
        this.requestById = data;
        console.log(this.requestById);
        this.selectedDateRange = new DateRange<Date | undefined>(
          data.startDate,
          data.endDate,
        );
        this.dateFormGroup.patchValue(data);
      });
  }

  saveData() {
    this._employeeService
      .addRequestForEmployee(this.dateFormGroup.getRawValue())
      .subscribe({
        next: (data) => {
          this.notification.successMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK',
          );
          console.log(data);
        },
        error: (err) => {
          this.notification.errorMethod(
            'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
          );
          console.log(err);
        },
      });
  }
}
