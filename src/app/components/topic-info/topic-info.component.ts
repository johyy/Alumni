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

  @Input() topic!: Topic;

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
    this.postService.findAuthors();
    let parts = this.router.url.split("/")
    this.topic = this.topicService.findTopicById(parseInt(parts[2]))
  }

}
