import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ShellComponent } from '../../../shell/components/shell/shell.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { passwordMismatchDirective } from '../../../shared/password-mismatch.directive';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditUserComponent implements OnInit {
  public translate: TranslateService = inject(TranslateService);

  // disabled: boolean = true;
  public editUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public genderOption: string[] = [
    this.translate.instant('USER.PERSONAL_DETAILS.GENDER.MALE'),
    this.translate.instant('USER.PERSONAL_DETAILS.GENDER.FEMALE'),
    this.translate.instant('USER.PERSONAL_DETAILS.GENDER.OTHER'),
  ];

  public destinationOption: string[] = [
    this.translate.instant('USER.PERSONAL_DETAILS.DESTINATION.OPTION_1'),
    this.translate.instant('USER.PERSONAL_DETAILS.DESTINATION.OPTION_2'),
  ];

  public buildForm() {
    this.editUserForm = this.fb.group(
      {
        id: [null],
        name: [null],
        staffId: [null],
        email: [null],
        gender: [null],
        destination: [null],
        phone: [null],
        address: [null],
        password: [null],
        confirmPassword: [null],
      },
      {
        validators: passwordMismatchDirective,
      },
    );
  }

  saveData() {
    const userDetails = this.editUserForm.getRawValue();
    delete userDetails.confirmPassword;

    this.userService.updateUser(userDetails).subscribe({
      next: (data) => {
        this._snackBar.open(this.translate.instant('USER.INFO.OK'), 'OK', {
          duration: 3000,
          panelClass: ['green-snackbar'],
        });
        console.log(data);
      },
      error: (err) => {
        this._snackBar.open(this.translate.instant('USER.INFO.INVALID'), 'X', {
          duration: 3000,
          panelClass: ['red-snackbar'],
        });
        console.log(err);
      },
    });
  }

  get password() {
    return this.editUserForm.controls['password'];
  }
  get confirmPassword() {
    return this.editUserForm.controls['confirmPassword'];
  }

  hidePassword = signal(true);
  clickEventHidePassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  hideConfirmPassword = signal(true);
  clickEventHideConfirmPassword(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }
}
