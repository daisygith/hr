import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnInit {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;

  private _http: HttpClient = inject(HttpClient);

  ngOnInit(): void {}

  //on file select
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = 'initial';
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);

      // https://httpbin.org/post
      const upload$ = this._http.post(
        `${environment.apiUrl}/uploads/images`,
        formData,
      );

      this.status = 'uploading';

      upload$.subscribe({
        next: () => {
          this.status = 'success';
        },
        error: (err) => {
          this.status = 'fail';
          return throwError(() => err);
        },
      });
    }
  }
}
