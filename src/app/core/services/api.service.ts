import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://api.github.com'
  constructor(private http: HttpClient) {

   }

   get(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url);
   }

}
