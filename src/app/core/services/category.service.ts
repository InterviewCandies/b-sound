import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '.';
import { CategoryEntity } from '../entities/category.entity';
import { ApiResponse } from '../response/api.response';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  fetchAll(): Observable<CategoryEntity[]> {
    return this.http
      .get<ApiResponse<CategoryEntity[]>>(BASE_URL + '/category')
      .pipe(map((response) => response.data));
  }
}
