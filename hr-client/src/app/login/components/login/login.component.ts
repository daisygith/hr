import {Component} from "@angular/core";
import {InputError} from "../../../shared/components/input-error/input-error.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputError,
    MatButton
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})

export class LoginComponent {

}
