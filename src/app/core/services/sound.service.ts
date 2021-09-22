import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEntity } from '../entities/category.entity';
import { SoundEntity } from '../entities/sound.entity';
import { filter, map } from 'rxjs/operators';
import { ApiResponse } from '../response/api.response';
import { BASE_URL } from '.';

@Injectable()
export class SoundService {
  constructor(private http: HttpClient) {}

  fetchSoundById(id: string): Observable<SoundEntity> {
    return this.http
      .get<ApiResponse<SoundEntity>>(BASE_URL + '/sound/' + id)
      .pipe(map((response) => response.data));
  }

  searchSoundByName(term: string): Observable<SoundEntity[]> {
    return this.http
      .get<ApiResponse<SoundEntity[]>>(BASE_URL + '/sound/search?str=' + term)
      .pipe(map((response) => response.data));
  }

  getSoundConfiguration(id: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Authorization', localStorage.getItem('bsound_token'));

    return this.http
      .get<ApiResponse<any>>(BASE_URL + '/configuration/' + id, { headers })
      .pipe(map((response) => response.data));
  }
}
