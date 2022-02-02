import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../models/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  /**
   * Gets app config
   * @returns app config
   */
  getAppConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>(`api/config`);
  }
}
