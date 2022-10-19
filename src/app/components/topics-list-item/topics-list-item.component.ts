import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';
import { User } from 'src/app/models/user.model';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topics-list-item',
  templateUrl: './topics-list-item.component.html',
  styleUrls: ['./topics-list-item.component.css']
})
export class TopicsListItemComponent implements OnInit {

  public isIn: boolean = false;
  @Input() topic!: Topic;

  get user(): User {
    return this.userService.user;
  }

  constructor(private topicService: TopicService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findProfile();
    this.checkIfIsIn();
  }

  onTopicClicked(topicId: number) {
    if (this.isIn === true) {
      this.topicService.navigateToTopicPage(topicId);
    }
  }

  checkIfIsIn(): void {
    if (this.user.id === undefined) {
      return
    }
    this.isIn = this.topicService.checkIfUserInTopic((this.user.id), this.topic);
  }

}
