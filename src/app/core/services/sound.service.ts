import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEntity } from '../entities/category.entity';
import { SoundEntity } from '../entities/sound.entity';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class SoundService {
  constructor(private http: HttpClient) {}

  fetchSoundById(id: string): Observable<CategoryEntity[]> {
    return this.http.get<CategoryEntity[]>('../../../assets/mocks/sounds.json');
  }

  searchSoundByName(term: string): Observable<any> {
    return this.http.post('', { name: term });
  }
}
