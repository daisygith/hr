import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    MatIcon,
    NgOptimizedImage,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private authService = inject(AuthService);
  public router: Router = inject(Router);
  public notification: NotificationService = inject(NotificationService);

  public user = this.authService.user;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
    this.notification.logOut('LOGIN.LOGOUT');
  }
}
