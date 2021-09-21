import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from '.';
import { ApiResponse } from '../response/api.response';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http
      .post<ApiResponse<{ token: string }>>(BASE_URL + '/signin', {
        username,
        password,
      })
      .pipe(map((response) => response.data.token));
  }

  register(username: string, password: string): Observable<string> {
    return this.http
      .post<{ status: string; token: string }>(BASE_URL + '/signup', {
        username,
        password,
      })
      .pipe(map((response) => response.token));
  }
}
