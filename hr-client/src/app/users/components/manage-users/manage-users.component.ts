import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { UserList } from '../../model/user-list';
import { ImageTokenPipe } from '../../../shared/pipes/image-token.pipe';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    ImageTokenPipe,
    MatFormField,
    MatIcon,
    TranslateModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    RouterLink,
    MatInput,
    NgOptimizedImage,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ManageUsersComponent implements OnInit {
  private _usersServices: UsersService = inject(UsersService);
  readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<UserList>([]);
  displayedColumns = ['username', 'email', 'roles'];

  ngOnInit(): void {
    this.getManageUsers();
  }

  getManageUsers(): void {
    this._usersServices.findAllUsers().subscribe({
      next: (value) => (this.dataSource.data = value),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
