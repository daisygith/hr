import {Component} from '@angular/core';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';

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
  ],
})
export class InputError {
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
