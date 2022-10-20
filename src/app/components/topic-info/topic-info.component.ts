import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.component.html',
  styleUrls: ['./topic-info.component.css']
})
export class TopicInfoComponent implements OnInit {

  @Input() topic!: Topic;

  constructor(private topicService: TopicService, private router: Router) { }

  ngOnInit(): void {
    let parts = this.router.url.split("/")
    this.topic = this.topicService.findTopicById(parseInt(parts[2]))
  }

}
