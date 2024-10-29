import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputComponent,
    InputComponent,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    TranslateModule,
    NgForOf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public translate: TranslateService = inject(TranslateService);
}
