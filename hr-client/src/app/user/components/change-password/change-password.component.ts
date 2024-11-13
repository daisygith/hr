import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatError,
  MatFormField,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { passwordMismatchDirective } from '../../../shared/password-mismatch.directive';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    MatError,
    TranslateModule,
    ReactiveFormsModule,
    MatSuffix,
    MatButton,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  public translate: TranslateService = inject(TranslateService);

  public changePasswordForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm() {
    this.changePasswordForm = this._fb.group(
      {
        currentPassword: new FormControl(''),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,40}$/,
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: passwordMismatchDirective,
      },
    );
  }

  saveData() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const changePasswordDetails = this.changePasswordForm.getRawValue();
    delete changePasswordDetails.confirmPassword;

    this._userService.changePassword(changePasswordDetails).subscribe({
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
    return this.changePasswordForm.controls['password'];
  }
  get confirmPassword() {
    return this.changePasswordForm.controls['confirmPassword'];
  }

  hideCurrentPassword = signal(true);
  clickEventHideCurrentPassword(event: MouseEvent) {
    this.hideCurrentPassword.set(!this.hideCurrentPassword());
    event.stopPropagation();
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
