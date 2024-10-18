import {Component} from "@angular/core";
import {InputError} from "../../../shared/components/input-error/input-error.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputError
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})

export class LoginComponent {

}
