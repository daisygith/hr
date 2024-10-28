import {Component} from "@angular/core";
import {InputComponent} from "../../../shared/components/input/input.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputComponent,
    InputComponent

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

}
