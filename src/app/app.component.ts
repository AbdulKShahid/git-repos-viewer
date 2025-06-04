import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cgm';
}

//TODO: Create routes for repos module
//TODO: Add the commit module routes inside the repos module
//TODO: README
//TODO: Comments
//TODO: testing

//TODO: Add commits list module

//TODO: create api service
//TODO: use api for repos get
//TODO: use api for commit get