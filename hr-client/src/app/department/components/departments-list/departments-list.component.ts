import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
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
import { DepartmentsList } from '../../models/departmentsList';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { DepartmentService } from '../../service/department.service';

@Component({
  selector: 'app-departments-list',
  standalone: true,
  imports: [
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatFormField,
    MatIcon,
    TranslateModule,
    MatTable,
    NgOptimizedImage,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatInput,
  ],
  templateUrl: './departments-list.component.html',
  styleUrl: './departments-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentsListComponent implements OnInit {
  private _departmentService: DepartmentService = inject(DepartmentService);

  dataSource = new MatTableDataSource<DepartmentsList>([]);
  displayedColumns = ['name'];

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this._departmentService.getDepartments().subscribe({
      next: (value) => (this.dataSource.data = value),
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
