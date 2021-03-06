import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
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

  searchSoundByTag(tag: string): Observable<SoundEntity[]> {
    return this.http
      .get<ApiResponse<SoundEntity[]>>(BASE_URL + '/sound/search?tags=' + tag)
      .pipe(map((response) => response.data));
  }

  getAllConfiguration(): Observable<ConfigurationEntity[]> {
    const authToken = localStorage.getItem('bsound_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http
      .get<ApiResponse<any>>(BASE_URL + '/configuration', {
        headers: headers,
      })
      .pipe(
        map((response) => {
          if (response.success) return response.data;
          return null;
        })
      );
  }

  getSoundConfiguration(id: string): Observable<ConfigurationEntity> {
    const authToken = localStorage.getItem('bsound_token');
    if (!authToken) return of(null);
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

  getSharedConfigurationCode(
    id: string,
    config: ConfigurationEntity
  ): Observable<string> {
    const authToken = localStorage.getItem('bsound_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    return this.http
      .post<ApiResponse<any>>(BASE_URL + '/sound/share/' + id, config, {
        headers: headers,
      })
      .pipe(map((response) => response.data?.shareStr));
  }

  getConfigurationByCode(code: string): Observable<ConfigurationEntity> {
    return this.http
      .get<ApiResponse<ConfigurationEntity>>(BASE_URL + '/sound/share/' + code)
      .pipe(
        map((response) => {
          if (response.success) return response.data;
          return null;
        })
      );
  }
}
