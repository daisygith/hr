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
  }

  public roles: string[] = ['ADMIN', 'MODERATOR', 'USER'];

  public buildForm() {
    this.addUserForm = this._fb.group({
      id: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
    });
  }
}
