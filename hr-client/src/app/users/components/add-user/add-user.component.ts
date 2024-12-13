import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { ImageTokenPipe } from '../../../shared/pipes/image-token.pipe';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../../auth/models/User';
import { NotificationService } from '../../../shared/services/notification.service';
import { UsersService } from '../../services/users.service';
import { Role } from '../../model/role';
import { UserList } from '../../model/user-list';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FileUploadComponent,
    ImageTokenPipe,
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
  ],
  templateUrl: './add-user.component.html',
  styleUrl: 'add-user.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddUserComponent implements OnInit {
  id: number | undefined;
  isNew: boolean = false;
  user: User | undefined;

  public notification: NotificationService = inject(NotificationService);

  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _fb: FormBuilder = inject(FormBuilder);
  private _usersService = inject(UsersService);

  public addUserForm!: FormGroup;

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['userId'];
    this.isNew = !this.id;
    this.buildForm();
    this.getUserById(this.id);
  }

  public roles: Role[] = [
    { id: 1, name: 'ROLE_USER' },
    { id: 2, name: 'ROLE_MODERATOR' },
    { id: 3, name: 'ROLE_ADMIN' },
  ];

  public buildForm() {
    this.addUserForm = this._fb.group({
      id: new FormControl(null),
      email: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      roles: new FormControl(null, [Validators.required]),
    });
  }

  getUserById(userId: number | undefined): void {
    if (!userId) {
      return;
    }
    this._usersService.getUserById(userId).subscribe((data) => {
      // this.user = data; TODO
      this._patchForm(data);
      console.log(data);
    });
  }

  saveData() {
    if (this.addUserForm.valid) {
      const formData = this.addUserForm.getRawValue();
      const payloadUser: UserList = {
        ...formData,
        roles: formData.roles.map((role: number) =>
          this.roles.find((item) => item.id === role),
        ),
      };
      if (this.isNew) {
        this._usersService.createUser(payloadUser).subscribe({
          next: (value) => {
            this._patchForm(value);
            // todo: dodac info ze utworzono lub nie utworzono użytkownika
            this.notification.successMethod('ok');
          },
          error: (err) => {
            this.notification.errorMethod('err');
          },
        });
      } else {
        this._usersService.updateUser(payloadUser).subscribe({
          next: (value) => {
            this._patchForm(value);
            // this.user = value; TODO
            // todo: dodac info ze utworzono lub nie utworzono użytkownika
            this.notification.successMethod('ok');
          },
          error: (err) => {
            this.notification.errorMethod('not ok');
          },
        });
      }
    }
  }

  private _patchForm(data: UserList) {
    this.addUserForm.patchValue({
      ...data,
      roles: data.roles?.map((role) => role.id),
    });
  }
}
