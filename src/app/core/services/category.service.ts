import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  fetchAll(): Observable<any> {
    return this.http.get('../../../assets/mocks/sounds.json');
  }
}
