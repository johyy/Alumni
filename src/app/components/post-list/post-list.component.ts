import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  get posts(): Post[] {
    return this.postService.posts;
  }

  get loading(): boolean {
    return this.postService.loading;
  }

  get error(): string {
    return this.postService.error;
  }

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.findPosts()
  }

}
