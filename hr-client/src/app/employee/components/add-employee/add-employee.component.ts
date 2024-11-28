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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { NotificationService } from '../../../shared/services/notification.service';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service';

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
    FileUploadComponent,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddEmployeeComponent implements OnInit {
  id: number | undefined;
  isNew: boolean = false;
  employee: Employee | undefined;
  public imageUrl: string | undefined;

  public translate: TranslateService = inject(TranslateService);
  public notification: NotificationService = inject(NotificationService);

  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _fb: FormBuilder = inject(FormBuilder);
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _authService: AuthService = inject(AuthService);

  public addEmployeeForm!: FormGroup;

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['employeeId'];
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
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      staffId: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      typeOfContract: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      image: new FormControl(null),
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
      this.imageUrl = data?.image
        ? `${environment.apiUrl}${data?.image}?token=${this._authService.token}`
        : undefined;
      console.log(this.imageUrl);
    });
  }
  saveData() {
    if (this.addEmployeeForm.valid) {
      if (this.isNew) {
        this._employeeService
          .addEmployee(this.addEmployeeForm.getRawValue())
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
      } else {
        this._employeeService
          .updateEmployee(this.addEmployeeForm.getRawValue())
          .subscribe({
            next: (data) => {
              this.notification.successMethod(
                'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK_UPDATE',
              );
              console.log(data);
              this.employee = data;
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
  }

  onDeleteImage(employeeId: number | undefined) {
    this._employeeService.deleteImageForEmployee(employeeId).subscribe(
      (data) => {
        this.notification.successMethod('DATA.REMOVE_OK');
        this.imageUrl = undefined;
      },
      (error) => {
        console.log(error);
      },
    );
  }

  public onUploadImage(url: string, employeeId: number | undefined) {
    console.log(url);
    this.imageUrl = url
      ? `${environment.apiUrl}${url}?token=${this._authService.token}`
      : undefined;
    if (this.isNew) {
      this.addEmployeeForm.get('image')?.patchValue(url);
    } else {
      this._employeeService
        .saveImageForEmployee(url, employeeId)
        .subscribe((data) => {
          console.log(data);
          this.addEmployeeForm.patchValue(data);
        });
    }
  }
}
