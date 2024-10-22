import {Component} from "@angular/core";
import {InputComponent} from "../input/input.component";


@Component({
  selector: 'app-toolbar-top',
  standalone: true,
  imports: [
    InputComponent

  ],
  templateUrl: './toolbar-top.component.html',
  styleUrl: './toolbar-top.component.scss'
})

export class ToolbarTopComponent {

}
