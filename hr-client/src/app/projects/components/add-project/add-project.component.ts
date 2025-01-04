import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { ProjectsList } from '../../models/projectsList';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    RouterLinkActive,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddProjectComponent implements OnInit {
  id: number | undefined;
  isNew: boolean = false;
  project: ProjectsList | undefined;

  private _fb: FormBuilder = inject(FormBuilder);
  private _projectService: ProjectService = inject(ProjectService);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public notification: NotificationService = inject(NotificationService);
  public addProjectGroup!: FormGroup;

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params['projectId'];
    this.isNew = !this.id;
    this.buildForm();
    this.getProjectById(this.id);
  }

  public buildForm() {
    this.addProjectGroup = this._fb.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
    });
  }

  getProjectById(projectId: number | undefined): void {
    if (!projectId) {
      return;
    }
    this._projectService.getProjectById(projectId).subscribe((data) => {
      this.project = data;
      this.addProjectGroup.patchValue(data);
    });
  }

  saveData() {
    if (this.addProjectGroup.invalid) {
      return;
    }
    if (this.isNew) {
      this._projectService
        .addProject(this.addProjectGroup.getRawValue())
        .subscribe({
          next: (data) => {
            this.addProjectGroup.patchValue(data);
            this.notification.successMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK',
            );
            // this._router.navigateByUrl(`/departments/${data.id}`);
          },
          error: (err) => {
            this.notification.errorMethod(
              'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
            );
          },
        });
    }
    // else {
    //   this._projectService
    //     .updateProject(this.addProjectGroup.getRawValue())
    //     .subscribe({
    //       next: (data) => {
    //         this.project = data;
    //         this.addProjectGroup.patchValue(data);
    //         this.notification.successMethod(
    //           'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.OK_UPDATE',
    //         );
    //       },
    //       error: (err) => {
    //         this.notification.errorMethod(
    //           'ADD_EMPLOYEE.CHANGE_PROFILE.INFO.INVALID',
    //         );
    //       },
    //     });
    // }
  }
}
