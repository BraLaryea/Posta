import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

import { Post } from '../../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts$: Observable<Post[]>;
  userId: any;
  renderer: any;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.posts$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): any {
    return this.postService.fetchAll()
  }

  createPost(): void {
    this.posts$ = this.fetchAll()
  }

  delete(postId: any): void {
    this.postService.deletePost(postId).subscribe(()=>{this.posts$=this.fetchAll()})
  }
}
