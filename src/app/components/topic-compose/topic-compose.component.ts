import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-compose',
  templateUrl: './topic-compose.component.html',
  styleUrls: ['./topic-compose.component.css']
})
export class TopicComposeComponent implements OnInit {

  constructor(public router: Router, private location: Location, private topicService: TopicService) { } 

  ngOnInit(): void {
  }

  createTopic(createTopicForm: NgForm): void {
    const {title, description} = createTopicForm.value;    
    if(createTopicForm.valid){
      this.topicService.createTopic(title, description).subscribe(
        resp => console.log("topic-compose: createTopic response: "+resp));
    }    
  }

  cancel(): void {
    this.location.back()
  }
}
