import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserList } from '../model/user-list';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/users`;

  findAllUsers(): Observable<UserList[]> {
    return this._http.get<UserList[]>(`${this._apiUrl}`);
  }
}
