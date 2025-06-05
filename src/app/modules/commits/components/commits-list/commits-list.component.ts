import { ChangeDetectionStrategy, Component, effect, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommitsService } from '../../services/commits.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-commits-list',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule],
  templateUrl: './commits-list.component.html',
  styleUrl: './commits-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component to display a list of commits for a selected GitHub repository.
 */
export class CommitsListComponent {

  /** The full name of the selected repository (e.g., "owner/repo") */
  repoFullName: string | undefined;

  /** Signal holding the list of commits */
  commits: WritableSignal<any[]> = signal([]);

  /** Number of commits to fetch per page */
  itemsPerPage: number = 20;

  /** Reactive search query for filtering commits */
  searchQuery: Signal<string> = signal('a');

  constructor(
    private route: ActivatedRoute,
    private commitsService: CommitsService
  ) {
    // fetch commits whenever the search query changes
    effect(() => {
      if (this.repoFullName) {
        this.getCommits(this.repoFullName, 1, this.searchQuery());
      }
    });
  }

  /**
   * Extracts repository full name from query parameters and triggers the initial commit fetch.
   */
  ngOnInit() {
    let repoFullName: string | null = this.route.snapshot.queryParamMap.get('repoFullName');
    if (repoFullName && repoFullName !== null) {
      this.repoFullName = repoFullName;
    }

    if (this.repoFullName) {
      this.getCommits(this.repoFullName, 1, this.searchQuery());
    }
  }

  /**
   * Fetches commits from the GitHub API.
   *
   * @param repoFullName - The full name of the GitHub repository
   * @param pageNumber - The page number for pagination
   * @param searchQuery - The search term to filter commits
   */
  getCommits(repoFullName: string, pageNumber: number, searchQuery: string) {
    this.commitsService.getCommits(pageNumber, this.itemsPerPage, searchQuery, repoFullName).subscribe({
      next: (data) => {
        console.log('commits', data);
        this.commits.update(() => data.items);
      }
    });
  }
}

