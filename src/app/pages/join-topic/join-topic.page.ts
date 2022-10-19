import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-join-topic',
  templateUrl: './join-topic.page.html',
  styleUrls: ['./join-topic.page.css']
})
export class JoinTopicPage implements OnInit {

  @Input() topic!: Topic;

  constructor(private topicService: TopicService, public router: Router) { }

  ngOnInit(): void {
    let parts = this.router.url.split("/")
    this.topic = this.topicService.findTopicById(parseInt(parts[2]))
  }

  onTopicPageClick(topicId: number) {
    this.topicService.navigateToTopicPage(topicId);
  }
}
