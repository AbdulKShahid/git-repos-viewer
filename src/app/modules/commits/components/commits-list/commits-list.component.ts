import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommitsService } from '../../services/commits.service';

@Component({
  selector: 'app-commits-list',
  standalone: true,
  imports: [],
  templateUrl: './commits-list.component.html',
  styleUrl: './commits-list.component.scss'
})
export class CommitsListComponent {
  repoId: string | undefined;
  repoFullName: string | undefined;
  commits: any[] | undefined;
  itemsPerPage = 20;
  constructor(private route: ActivatedRoute, private commitsService: CommitsService) {
  }

  ngOnInit() {

    let repoId: string | null = this.route.snapshot.paramMap.get('id');
    if (repoId && repoId !== null) {
      this.repoId = repoId;
    }

    let repoFullName: string | null = this.route.snapshot.queryParamMap.get('repoFullName');
    if (repoFullName && repoFullName !== null) {
      this.repoFullName = repoFullName;

    }

    if (this.repoId && this.repoFullName) {
      this.getCommits(this.repoId, this.repoFullName, 1, 'a');

    }
  }

  getCommits(repoId: string, repoFullName: string, pageNumber: number, searchQuery: string) {
    repoId = '996298852'; // todo remove
    this.commitsService.getCommits(pageNumber, this.itemsPerPage, searchQuery, repoId, repoFullName).subscribe({
      next: (data) => {
        console.log('commits', data);
        this.commits = data.items;
      }
    })
  }

}
