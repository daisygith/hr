import { Component, inject, ViewEncapsulation } from '@angular/core';
import { InputError } from '../../../shared/components/input-error/input-error.component';
import { MatButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputError,
    MatButton,
    NgForOf,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  public translate: TranslateService = inject(TranslateService);
}
