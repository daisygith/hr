import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {TranslateModule} from "@ngx-translate/core";

/**
 * @title Input with error messages
 */
@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatError,
    MatFormField,
    TranslateModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InputError {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);
}
