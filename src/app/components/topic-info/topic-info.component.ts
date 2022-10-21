import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Topic } from 'src/app/models/topic.model';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.component.html',
  styleUrls: ['./topic-info.component.css']
})
export class TopicInfoComponent implements OnInit {
  topicId: number = 0;

  get topic(): Topic {
    return this.topicService.findTopicById(this.topicId);
  }

  get loading(): boolean {
    return this.topicService.loading;
  }

  get posts(): Post[] {
    return this.postService.posts;
  }

  constructor(
    private topicService: TopicService,
    private router: Router,
    private readonly postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.findPosts();
    this.topicService.findAllTopics();
    let parts = this.router.url.split("/");
    this.topicId = parseInt(parts[2]);
  }

}
