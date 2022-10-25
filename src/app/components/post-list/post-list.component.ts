import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() topicId: number = 0;
  @Input() groupId: number = 0;

  get posts(): Post[] {
    return this.postService.posts;
  }

  constructor(
    private readonly postService: PostService,
    readonly groupListService: GroupListService,
    readonly topicService: TopicService,
    readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.postService.findPosts();
    this.groupListService.findAllGroups();
    this.topicService.findAllTopics();
    this.userService.findProfile();
  }

  loading(): boolean {
    let stillLoading = false;
    if(this.postService.loading) stillLoading = true;
    if(this.groupListService.loading) stillLoading = true;
    if(this.topicService.loading) stillLoading = true;
    if(this.userService.loading) stillLoading = true;
    return stillLoading;
  }

  searchText: string = "";

  public onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    this.groupListService.findAllGroups();
    this.topicService.findAllTopics();
  }
}
