import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgOptimizedImage } from '@angular/common';

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

  constructor(private _snackBar: MatSnackBar) {}

  public user = this.authService.user;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
    this._snackBar.open('Logout successfully', 'X');
  }
}
