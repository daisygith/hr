import {Component} from "@angular/core";
import {ToolbarLeftComponent} from "../../../shared/components/toolbar-left/toolbar-left.component";
import {ToolbarTopComponent} from "../../../shared/components/toolbar-top/toolbar-top.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ToolbarLeftComponent,
    ToolbarTopComponent,
    RouterOutlet
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss"
})

export class DashboardComponent {

}
