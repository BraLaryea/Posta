import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { first } from "rxjs/operators"

import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from "../../models/Post"

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();

  isOpen = false;
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    body: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit(): void {
  }

  post(formdata: any): void {
    this.postService.createPost(formdata, (this.authService.userId))
      .subscribe(() => { this.create.emit(); })
    this.create.emit(null)
    this.postForm.reset()
    this.isOpen = false
  }

  get title(): any { return this.postForm.get('title'); }
  get body(): any { return this.postForm.get('body') }
}
