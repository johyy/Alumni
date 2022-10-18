import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.css']
})
export class PostPage implements OnInit {
  post: any;

  constructor(
    private readonly postService: PostService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postService.findPosts();
    this.activatedRoute.params.subscribe(params => {
      const id = parseInt(params["id"]);
      this.post = this.postService.findPostById(id);
    });
  }

}
