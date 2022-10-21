import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Post } from 'src/app/models/post.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  get posts(): Post[] {
    return this.postService.posts;
  }

  constructor(
    private readonly postService: PostService,
    readonly groupListService: GroupListService,
    readonly topicService: TopicService,
    readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  loading(): boolean {
    let stillLoading = false;
    if(this.postService.loading) stillLoading = true;
    if(this.groupListService.loading) stillLoading = true;
    if(this.topicService.loading) stillLoading = true;
    if(this.userService.loading) stillLoading = true;
    return stillLoading;
  }
}
