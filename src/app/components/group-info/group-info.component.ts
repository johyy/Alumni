import { Component, Input, OnInit } from '@angular/core';
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

  @Input() group!: Group;

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
    this.postService.findAuthors();
    let parts = this.router.url.split("/")
    this.group = this.groupListService.groupById(parseInt(parts[2]))!
  }

}
