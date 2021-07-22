import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Post } from '../models/Post'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://localhost:3000/post"

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) { }

  fetchAll(): Observable<Post[]> {
    return this.http
      .get<any>(this.url, { responseType: "json" })
  }

  createPost(post: any, userId: any) {
    return this.http
      .post(`${this.url}`, { title: post.title, body: post.body, user: userId }, this.httpOptions)
      .pipe(first())
  }

  deletePost(postId: Pick<Post, "id">): Observable<{}> {
    return this.http
      .delete<Post>(`${this.url}/${postId}`, this.httpOptions)
      .pipe()
  }
}
