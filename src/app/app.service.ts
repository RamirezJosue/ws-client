import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const { api_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private http: HttpClient
  ) { }

  message(body: any) {
    return this.http.post(`${api_url}/send`, body);
  }

}
