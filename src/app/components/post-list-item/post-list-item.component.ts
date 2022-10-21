import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;

  constructor(
    readonly groupListService: GroupListService,
    readonly topicService: TopicService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToPost(postId: number) {
    this.router.navigateByUrl(`/post/${postId}`);
  }

}
