import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class GraphqlServerService {
  private query: any;

  private allPosts = gql`
    {
      allPosts {
        id
        postid
        title
        author
      }
    }
  `;

  constructor(private apollo: Apollo) {}

  getPostGraphql(): Observable<any> {
    return this.apollo.watchQuery({
      query: this.allPosts
    }).valueChanges;
  }

  addPostGraphql(post: Post): Observable<any> {
    this.query = gql`
      mutation($id: ID!, $postid: Int!, $title: String!, $author: String!) {
        createPost(id: $id, postid: $postid, title: $title, author: $author) {
          id
          postid
          title
          author
        }
      }
    `;

    type Response = {
      createPost: Post;
    };

    return this.apollo.mutate<Response, Post>({
      mutation: this.query,
      variables: post,
      update: (store, { data: { createPost } }) => {
        const data: any = store.readQuery({ query: this.allPosts });
        data.allPosts = [...data.allPosts, createPost];
        store.writeQuery({ query: this.allPosts, data });
      }
    });
  }

  updatePostGraphql(updateObj: any): Observable<any> {
    this.query = gql`
      mutation($id: ID!, $title: String!) {
        updatePost(id: $id, title: $title) {
          id
          postid
          title
          author
        }
      }
    `;

    return this.apollo.mutate({
      mutation: this.query,
      variables: updateObj
    });
  }

  deletePostGraphql(deleteId: number): Observable<any> {
    this.query = gql`
      mutation($id: ID!) {
        removePost(id: $id)
      }
    `;

    return this.apollo.mutate({
      mutation: this.query,
      variables: { id: deleteId },
      update: store => {
        const data: any = store.readQuery({ query: this.allPosts });
        data.allPosts.splice(deleteId - 1, 1);
        store.writeQuery({ query: this.allPosts, data });
      }
    });
  }
}
