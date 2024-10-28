import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {ShellComponent} from "../../../shell/components/shell/shell.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    ShellComponent
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss"
})

export class DashboardComponent {

}
