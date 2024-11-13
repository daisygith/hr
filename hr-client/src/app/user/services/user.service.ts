import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ChangePassword } from '../models/changePassword';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/users`;

  updateUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(`${this._apiUrl}/edit`, user);
  }

  changePassword(changePassword: ChangePassword): Observable<ChangePassword> {
    console.log(changePassword);
    return this.http.post<ChangePassword>(
      `${this._apiUrl}/changePassword`,
      changePassword,
    );
  }
}
