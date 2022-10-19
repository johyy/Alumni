import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-exit-topic',
  templateUrl: './exit-topic.page.html',
  styleUrls: ['./exit-topic.page.css']
})
export class ExitTopicPage implements OnInit {

  @Input() topic!: Topic;

  constructor(private topicService: TopicService, private router: Router) { }

  ngOnInit(): void {
    let parts = this.router.url.split("/")
    this.topic = this.topicService.findTopicById(parseInt(parts[2]))
  }
}
