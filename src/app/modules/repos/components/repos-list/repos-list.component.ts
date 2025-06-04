import { Component, effect, OnInit, signal, Signal } from '@angular/core';
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
  styleUrl: './repos-list.component.scss'
})
export class ReposListComponent implements OnInit {

  repos: any[] = [];
  searchQuery: Signal<string> = signal('');

  constructor(private reposService: ReposService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    effect(() => {
      console.log('search query changed', this.searchQuery());
      this.getRepos(1, this.searchQuery());
    })
  }

  ngOnInit(): void {

    this.repos = dummyReposData.items;
    this.getRepos(1, this.searchQuery());

  }

  private getRepos(pageNumber: number, searchQuery: string): void {
    console.log('items called')
    this.reposService.getReposByPage(pageNumber, 20, searchQuery).subscribe({
      next: (data) => {
        console.log('items', data);
        this.repos = data.items;

      }
    })

  }

  protected goToRepo(id: number, repoFullName: string): void {
    console.log('goto', id);
    this.router.navigate([`${id}/commits`], { queryParams: { repoFullName: repoFullName }, relativeTo: this.route })

  }

}
