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
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Profile } from '../../models/Profile';
import { NotificationService } from '../../../shared/services/notification.service';

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
  profile: Profile | undefined;

  public translate: TranslateService = inject(TranslateService);
  public notification: NotificationService = inject(NotificationService);

  private _fb: FormBuilder = inject(FormBuilder);
  private _userService: UserService = inject(UserService);

  public editUserForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.getProfile();
  }

  public genderOption: string[] = ['MALE', 'FEMALE', 'OTHER'];

  public destinationOption: string[] = ['OPTION_1', 'OPTION_2'];

  public buildForm() {
    this.editUserForm = this._fb.group({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required]),
      staffId: new FormControl('', []),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  getProfile(): void {
    this._userService.getUserProfile().subscribe((data) => {
      this.profile = data;
      this.editUserForm.patchValue(data);
    });
  }

  saveData() {
    if (this.editUserForm.invalid) {
      return;
    }

    this._userService.updateUser(this.editUserForm.getRawValue()).subscribe({
      next: (data) => {
        this.notification.successMethod('USER.INFO.OK');
        console.log(data);
      },
      error: (err) => {
        this.notification.errorMethod('USER.INFO.INVALID');
        console.log(err);
      },
    });
  }
}
