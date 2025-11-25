import { Injectable } from '@angular/core';
import { BaseHttpService } from 'app/core/abstracts/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class HomeApiService extends BaseHttpService {
  constructor() {
    super();
    this.setBaseUrl('home');
  }
}
