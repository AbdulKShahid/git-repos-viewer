import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  constructor(private apiService: ApiService) { }
/**
 * Fetches repositories from the GitHub Search API based on the search query and pagination parameters.
 *
 * @param pageNumber - The page number for pagination.
 * @param itemsPerPage - Number of repositories to fetch per page.
 * @param searchQuery - The search term to filter repositories.
 * @returns An Observable containing the list of repositories and metadata.
 */
getReposByPage(
  pageNumber: number,
  itemsPerPage: number,
  searchQuery: string
): Observable<any> {
  const url = `/search/repositories?q=${searchQuery ||  'stars:>0'}&page=${pageNumber}&per_page=${itemsPerPage}`;
  return this.apiService.get(url);
}

}
