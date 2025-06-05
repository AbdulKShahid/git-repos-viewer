import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitsService {

  constructor(private apiService: ApiService) { }

/**
 * Fetches commits from GitHub Search API for a specific repository with optional search filtering.
 *
 * @param pageNumber - The current page number for pagination.
 * @param itemsPerPage - The number of commits to fetch per page.
 * @param searchQuery - Optional keyword to filter commit messages.
 * @param repoFullName - The full name of the repository (e.g., "owner/repo").
 * @returns An Observable of the API response containing the commit data.
 */
getCommits(
  pageNumber: number,
  itemsPerPage: number,
  searchQuery: string,
  repoFullName: string
): Observable<any> {
  let query = `repo:${repoFullName}`;
  if (searchQuery && searchQuery.trim() !== '') {
    query += `+${searchQuery}`;
  }

  const url = `/search/commits?page=${pageNumber}&per_page=${itemsPerPage}&q=${query}`;
  return this.apiService.get(url);
}

}
