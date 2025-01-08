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
} from '@angular/material/table';
import { Task } from '../../models/task';
import { HasRoleDirective } from '../../../auth/directive/has-role.directive';
import { ImageTokenPipe } from '../../../shared/pipes/image-token.pipe';
import { DatePipe, LowerCasePipe, NgForOf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

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
    NgForOf,
    DatePipe,
    MatIcon,
    MatMiniFabButton,
  ],
  templateUrl: './dashboard-task.component.html',
  styleUrl: './dashboard-task.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardTaskComponent implements OnInit {
  private _projectService: ProjectService = inject(ProjectService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  tasksMap: Map<string, Task[]> = new Map<string, Task[]>();

  id: number | undefined;

  ngOnInit(): void {
    this.id = +this._activeRoute.snapshot.params['projectId'];
    this._activeRoute.params.subscribe((params) => {
      if (this.id !== +params['projectId']) {
        this.id = +params['projectId'];
        this.getTasks(this.id);
      }
    });
    this.getTasks(this.id);
  }

  getTasks(projectId: number | undefined): void {
    this._projectService.getTasks(projectId).subscribe({
      next: (value) => {
        this.tasksMap.clear();

        ['NEW', 'WORK_IN_PROGRESS', 'DONE'].forEach((status) => {
          this.tasksMap.set(
            status,
            value.filter((t) => t.status === status),
          );
        });
      },
    });
  }
}
