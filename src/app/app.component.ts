import { Component, OnInit } from '@angular/core';
import { GraphqlServerService } from './graphql-server.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Observable<any>;
  newPost: Post = { id: 4, title: 'New Post', postid: 4, author: 'New' };

  constructor(private dataService: GraphqlServerService) {}

  ngOnInit() {
    this.posts = this.dataService
      .getPostGraphql()
      .pipe(map(({ data }) => data.allPosts));
  }

  addPostGraphql() {
    this.dataService.addPostGraphql(this.newPost).subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    );
  }

  updatePostGraphql() {
    this.dataService
      .updatePostGraphql({ id: 4, title: 'Updated Post' })
      .subscribe(
        (res) => console.log(res),
        (err) => console.error(err)
      );
  }

  deletePostGraphql() {
    this.dataService.deletePostGraphql(1).subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    );
  }
}
