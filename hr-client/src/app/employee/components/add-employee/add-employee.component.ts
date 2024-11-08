import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf, NgOptimizedImage } from '@angular/common';
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
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddEmployeeComponent implements OnInit {
  public translate: TranslateService = inject(TranslateService);
  public addEmployeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public positionOptions: string[] = ['Junior', 'Mid', 'Senior'];
  public departmentOptions: string[] = ['HR', 'IT', 'DESIGNER'];
  // TODO problem ze zmianą jezyka jak juz jest formularz załadowany
  public typeOfContractOptions: string[] = [
    'B2B',
    this.translate.instant(
      'ADD_EMPLOYEE.PERSONAL_DETAILS.TYPE_OF_CONTRACT.FULL_TIME_CONTRACT',
    ),
    this.translate.instant(
      'ADD_EMPLOYEE.PERSONAL_DETAILS.TYPE_OF_CONTRACT.CONTRACT_FOR_SPECIFIC_WORK',
    ),
    this.translate.instant(
      'ADD_EMPLOYEE.PERSONAL_DETAILS.TYPE_OF_CONTRACT.FEE_FOR_TASK_AGREEMENT',
    ),
  ];

  public buildForm() {
    this.addEmployeeForm = this.fb.group({
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

  saveData() {
    this.employeeService
      .addEmployee(this.addEmployeeForm.getRawValue())
      .subscribe({
        next: (data) => {
          this._snackBar.open(
            this.translate.instant('ADD_EMPLOYEE.INFO.OK'),
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
            this.translate.instant('ADD_EMPLOYEE.INFO.INVALID'),
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
