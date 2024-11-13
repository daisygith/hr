import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ShellComponent } from '../../../shell/components/shell/shell.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from '../change-password/change-password.component';

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
    ChangePasswordComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditUserComponent implements OnInit {
  public translate: TranslateService = inject(TranslateService);

  public editUserForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public genderOption: string[] = ['MALE', 'FEMALE', 'OTHER'];

  public destinationOption: string[] = ['OPTION_1', 'OPTION_2'];

  public buildForm() {
    this.editUserForm = this._fb.group({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      staffId: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  saveData() {
    if (this.editUserForm.invalid) {
      return;
    }

    this._userService.updateUser(this.editUserForm.getRawValue()).subscribe({
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
}
