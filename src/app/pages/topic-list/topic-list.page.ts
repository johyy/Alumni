import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.page.html',
  styleUrls: ['./topic-list.page.css']
})
export class TopicListPage implements OnInit {

  get topics(): Topic[] {
    return this.topicService.topics;
  }

  get loading(): boolean {
    return this.topicService.loading;
  }

  get error(): string {
    return this.topicService.error;
  }

  constructor(private readonly topicService: TopicService) { }

  ngOnInit(): void {
    this.topicService.findAllTopics();
  }
}
