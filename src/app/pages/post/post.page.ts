import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.css']
})
export class PostPage implements OnInit {
  post: any;

  get posts(): Post[] {
    return this.postService.posts;
  }

  constructor(
    private readonly postService: PostService,
    readonly groupListService: GroupListService,
    readonly topicService: TopicService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postService.findPosts();
    this.postService.findAuthors();
    this.activatedRoute.params.subscribe(params => {
      const id = parseInt(params["id"]);
      this.post = this.postService.findPostById(id);
    });
    this.groupListService.findAllGroups();
    this.topicService.findAllTopics();
  }

}
