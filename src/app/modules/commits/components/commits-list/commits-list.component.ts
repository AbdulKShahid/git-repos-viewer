import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commits-list',
  standalone: true,
  imports: [],
  templateUrl: './commits-list.component.html',
  styleUrl: './commits-list.component.scss'
})
export class CommitsListComponent {
  repoId: string | undefined;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe({
      next: (params) => {
        console.log('params', params);
      }
    })
  }

}
