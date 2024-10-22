import {Component} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-toolbar-left',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './toolbar-left.component.html',
  styleUrl: './toolbar-left.component.scss'
})

export class ToolbarLeftComponent {

}
