import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'app/environments/environments';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseHttpService {
  protected baseUrl!: string;
  protected http = inject(HttpClient);

  protected setBaseUrl(method: keyof typeof environment.services): void {
    const service = environment.services[method];
    if (service?.apiUrl) {
      this.baseUrl = service.apiUrl;
    }
  }

  get<TRes>(
    endpoint: string,
    params?: HttpParams | Record<string, string | number | boolean | (string | number | boolean)[]>
  ): Observable<TRes> {
    return this.http.get<TRes>(`${this.baseUrl}/${endpoint}`, { params });
  }

  post<TReq, TRes>(endpoint: string, body: TReq): Observable<TRes> {
    return this.http.post<TRes>(`${this.baseUrl}/${endpoint}`, body);
  }

  put<TReq, Tres>(endpoint: string, body: TReq): Observable<Tres> {
    return this.http.put<Tres>(`${this.baseUrl}/${endpoint}`, body);
  }

  delete<TRes>(endpoint: string): Observable<TRes> {
    return this.http.delete<TRes>(`${this.baseUrl}/${endpoint}`);
  }
}
