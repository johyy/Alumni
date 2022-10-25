import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { Post } from 'src/app/models/post.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css']
})
export class GroupInfoComponent implements OnInit {
  groupId: number = 0;

  get group(): Group {
    return this.groupListService.groupById(this.groupId);
  }

  get loading(): boolean {
    return this.groupListService.loading;
  }

  get posts(): Post[] {
    return this.postService.posts;
  }

  constructor(
    private groupListService: GroupListService,
    public router: Router,
    readonly postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.findPosts();
    this.groupListService.findAllGroups();
    let parts = this.router.url.split("/")
    this.groupId = parseInt(parts[2])
  }
}
