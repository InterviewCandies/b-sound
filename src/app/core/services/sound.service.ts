import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEntity } from '../entities/category.entity';
import { SoundEntity } from '../entities/sound.entity';
import { filter, map, tap } from 'rxjs/operators';
import { ApiResponse } from '../response/api.response';
import { BASE_URL } from '.';
import { ConfigurationEntity } from '../entities/configuration.entity';

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

  getSoundConfiguration(id: string): Observable<ConfigurationEntity> {
    const authToken = localStorage.getItem('bsound_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http
      .get<ApiResponse<any>>(BASE_URL + '/configuration/' + id, {
        headers: headers,
      })
      .pipe(
        map((response) => {
          if (response.success) return response.data;
          return null;
        })
      );
  }

  saveSoundConfiguration(
    id: string,
    config: ConfigurationEntity
  ): Observable<any> {
    const authToken = localStorage.getItem('bsound_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.post<ApiResponse<any>>(
      BASE_URL + '/configuration/' + id,
      config,
      {
        headers: headers,
      }
    );
  }
}
