import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ShellComponent } from '../../../shell/components/shell/shell.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    MatButton,
    MatIcon,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatIconButton,
    ShellComponent,
    TranslateModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddEmployeeComponent implements OnInit {
  id: number | undefined;
  employee: Employee | undefined;
  isNew: boolean = false;

  public translate: TranslateService = inject(TranslateService);
  public addEmployeeForm!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['employeeId'];
    this.isNew = !this.id;
    this.buildForm();
    this.getEmployeeById(this.id);
  }

  public positionOptions: string[] = ['Junior', 'Mid', 'Senior'];
  public departmentOptions: string[] = ['HR', 'IT', 'DESIGNER'];
  public typeOfContractOptions: string[] = [
    'B2B',
    'FULL_TIME_CONTRACT',
    'CONTRACT_FOR_SPECIFIC_WORK',
    'FEE_FOR_TASK_AGREEMENT',
  ];

  public buildForm() {
    this.addEmployeeForm = this._fb.group({
      id: [null],
      name: [null],
      staffId: [null],
      phone: [null],
      position: [null],
      department: [null],
      typeOfContract: [null],
      address: [null],
    });
  }

  getEmployeeById(employeeId: number | undefined): void {
    if (!employeeId) {
      return;
    }
    this._employeeService.getEmployeeById(employeeId).subscribe((data) => {
      this.employee = data;
      console.log(this.employee);
      this.addEmployeeForm.patchValue(data);
    });
  }

  saveData() {
    if (this.isNew) {
      this._employeeService
        .addEmployee(this.addEmployeeForm.getRawValue())
        .subscribe({
          next: (data) => {
            this._snackBar.open(
              this.translate.instant('ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK'),
              'OK',
              {
                duration: 3000,
                panelClass: ['green-snackbar'],
              },
            );
            console.log(data);
          },
          error: (err) => {
            this._snackBar.open(
              this.translate.instant(
                'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
              ),
              'X',
              {
                duration: 3000,
                panelClass: ['red-snackbar'],
              },
            );
            console.log(err);
          },
        });
    } else {
      this._employeeService
        .updateEmployee(this.addEmployeeForm.getRawValue())
        .subscribe({
          next: (data) => {
            this._snackBar.open(
              this.translate.instant('ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK'),
              'OK',
              {
                duration: 3000,
                panelClass: ['green-snackbar'],
              },
            );
            console.log(data);
            this.employee = data;
          },
          error: (err) => {
            this._snackBar.open(
              this.translate.instant(
                'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
              ),
              'X',
              {
                duration: 3000,
                panelClass: ['red-snackbar'],
              },
            );
            console.log(err);
          },
        });
    }
  }
}
