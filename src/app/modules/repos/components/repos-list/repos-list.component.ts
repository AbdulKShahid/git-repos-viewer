import { Component, OnInit } from '@angular/core';
import { ReposService } from '../../services/repos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.scss'
})
export class ReposListComponent implements OnInit {

  repos: any[] = [];

  constructor(private reposService: ReposService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {

   this.getRepos(1, 'a');
   
    
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

  protected goToRepo(id: number): void {
    console.log('goto', id);
    this.router.navigate([`${id}`], { relativeTo: this.route })

  }

}
