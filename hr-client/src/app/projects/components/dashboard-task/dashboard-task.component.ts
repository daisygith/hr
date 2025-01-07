import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Task } from '../../models/task';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { ImageTokenPipe } from '../../../shared/pipes/image-token.pipe';
import { LowerCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-task',
  standalone: true,
  imports: [
    HasRoleDirective,
    ImageTokenPipe,
    LowerCasePipe,
    MatCell,
    MatCellDef,
    TranslateModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
  ],
  templateUrl: './dashboard-task.component.html',
  styleUrl: './dashboard-task.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardTaskComponent implements OnInit {
  private _projectService: ProjectService = inject(ProjectService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  id: number | undefined;

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['projectId'];
    this.getTasks(this.id);
  }

  dataSource = new MatTableDataSource<Task>([]);
  displayedColumnsNEW = ['new'];
  displayedColumnsPRIORITY = ['priority'];
  displayedColumnsWORKINPROGRESS = ['work_in_progress'];
  displayedColumnsDONE = ['done'];

  getTasks(projectId: number | undefined): void {
    this._projectService.getTasks(projectId).subscribe({
      next: (value) => (this.dataSource.data = value),
    });
  }
}
