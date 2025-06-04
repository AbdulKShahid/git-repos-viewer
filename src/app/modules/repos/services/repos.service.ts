import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  constructor(private apiService: ApiService) { }

  getReposByPage(pageNumber: number, itemsPerPage: number, searchQuery: string): Observable<any> {
    let url = `/search/repositories?page=${pageNumber}&per_page=${itemsPerPage}&q=${searchQuery}`;
    return this.apiService.get(url);
  }
}
