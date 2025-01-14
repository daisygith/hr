import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { EmployeeService } from '../../../employee/services/employee.service';
import { ManageEmployee } from '../../../employee/models/manageEmmployee';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
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
  MatTableModule,
} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../../services/project.service';
import { ProjectManagementService } from '../../services/project-management.service';
import { ProjectDetails } from '../../models/projectDetails';

@Component({
  selector: 'app-add-employees',
  standalone: true,
  imports: [
    MatDialogTitle,
    TranslateModule,
    MatButton,
    MatDialogClose,
    MatTable,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatDialogActions,
    MatIcon,
    MatPaginator,
  ],
  templateUrl: './add-employees.component.html',
  styleUrl: './add-employees.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeesComponent implements OnInit, AfterViewInit {
  private _employeeService: EmployeeService = inject(EmployeeService);
  private _projectService: ProjectService = inject(ProjectService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _projectManagementService: ProjectManagementService = inject(
    ProjectManagementService,
  );
  dataSource = new MatTableDataSource<ManageEmployee>([]);
  displayedColumns = ['select', 'name'];
  selection = new SelectionModel<ManageEmployee>(true, []);

  projectDetails: ProjectDetails | undefined;

  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getManageEmployee();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: number; employees: ManageEmployee[] },
  ) {}

  readonly dialogRef = inject(MatDialogRef<AddEmployeesComponent>);
  onNoClick(): void {
    this.dialogRef.close();
  }

  getManageEmployee(): void {
    this._employeeService.getManageEmployee().subscribe((employees) => {
      console.log(employees);
      console.log(this.data.employees);
      const ar = this.data.employees;
      // this.dataSource.data = employees.filter(
      //   (item) => item.id !== this.data.employees[item.id],
      // );
      // employees.forEach((item) => {
      //   this.data.employees.filter((em) => em !== item).map((e) => employees);
      // });
      const arrayFiltered = employees.filter((item) => {
        return ar.every((f) => {
          return f.id !== item.id;
        });
      });

      this.dataSource.data = arrayFiltered;
      this._cdr.detectChanges();
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ManageEmployee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  saveData() {
    const employeeIds = this.selection.selected.map((employee) => employee.id);
    this._projectService
      .addEmployeesToProject(this.data.projectId, employeeIds)
      .subscribe({
        next: (data) => {
          this.dialogRef.close(data);
          this._projectManagementService.refreshTasks();
        },
      });
  }
}
