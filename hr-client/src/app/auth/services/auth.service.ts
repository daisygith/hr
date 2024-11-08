import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  isLoggedIn: boolean = false;

  login(userDetails: {
    username: string;
    password: string;
  }): Observable<LoginResponse | null> {
    return this.http.post<any>(`${this._apiUrl}/signin`, userDetails).pipe(
      map((response) => {
        localStorage.setItem('JWT_Token', response.token);
        this.isLoggedIn = true;
        return response;
      }),
      catchError((error) => {
        console.log(error);
        this.isLoggedIn = false;
        return of(null);
      }),
    );
  }

  registration(userDetails: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this._apiUrl}/signup`, userDetails);
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
