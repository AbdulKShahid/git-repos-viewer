import { ChangeDetectionStrategy, Component, effect, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ReposService } from '../../services/repos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { dummyReposData } from '../../../../dummy/dummy-repo-data';

//Material
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [DatePipe, MatInputModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule],
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposListComponent implements OnInit {

  repos: WritableSignal<any[]> = signal([]);
  searchQuery: Signal<string> = signal('');
  pageNumber = 1;

  constructor(private reposService: ReposService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    effect(() => {
      this.pageNumber = 1;
      this.getRepos(this.pageNumber, this.searchQuery());
    })
  }

  ngOnInit(): void {
    //this.repos = dummyReposData.items;
    this.getRepos(this.pageNumber, this.searchQuery());
  }

  /**
   * Fetches repositories from the GitHub API service using pagination and a search query.
   * 
   * @param pageNumber - The page number to fetch
   * @param searchQuery - The search string used to filter repositories
   */
  private getRepos(pageNumber: number, searchQuery: string): void {
    this.reposService.getReposByPage(pageNumber, 20, searchQuery).subscribe({
      next: (data) => {
        console.log('items', data);
        this.repos.update((repos) => [...repos, ...data.items]);
      }
    })

  }

 /**
   * Navigates to the commits page for the selected repository.
   * 
   * @param id - The repository ID
   * @param repoFullName - The full name of the repository (e.g "owner/repo")
   */
  protected goToRepo(id: number, repoFullName: string): void {
    this.router.navigate([`${id}/commits`], { queryParams: { repoFullName: repoFullName }, relativeTo: this.route })
  }

onTableScroll(event: Event): void {
  const target = event.target as HTMLElement;

  const atBottom =
    target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

  if (atBottom) {
        this.pageNumber++;
        this.getRepos(this.pageNumber, this.searchQuery());
  }
}

}
