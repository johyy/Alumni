import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  get posts(): Post[] | undefined {
    return this.postService.posts;
  }

  get loading(): boolean {
    return this.postService.loading;
  }

  get error(): string {
    return this.postService.error;
  }

  constructor(
    private readonly postService: PostService,
    readonly groupListService: GroupListService,
    readonly topicService: TopicService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.postService.findPosts();
    this.groupListService.findAllGroups();
    this.topicService.findAllTopics();
  }

  navigateToPost(postId: number) {
    this.router.navigateByUrl(`/post/${postId}`);
  }

}
