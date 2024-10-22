import {Component, ViewEncapsulation} from "@angular/core";
import {MatFormField, MatInput} from '@angular/material/input';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  imports: [
    MatFormField,
    MatInput
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent {

}
