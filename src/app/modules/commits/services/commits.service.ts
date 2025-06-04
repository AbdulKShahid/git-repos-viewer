import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitsService {

  constructor(private apiService: ApiService) { }

  getCommits(pageNumber: number, itemsPerPage: number, searchQuery: string, repoId: string, repoFullName: string): Observable<any> {
    let url = `/search/commits?page=${pageNumber}&per_page=${itemsPerPage}&q=repo:${repoFullName}`;
    if (searchQuery) {
      url = url + '+' + searchQuery;
    }
    return this.apiService.get(url);
  }

}
