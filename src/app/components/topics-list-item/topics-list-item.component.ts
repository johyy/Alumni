import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';
import { User } from 'src/app/models/user.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { JoinTopicService } from 'src/app/services/join-topic.service';
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

  constructor(private topicService: TopicService, private userService: UserService, private joinTopicService: JoinTopicService, private groupService: GroupListService) { }

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
  
  onExitClick(topicId: number): void {
    this.topicService.navigateToPage(false, topicId)
    this.joinTopicService.removeFromTopic(topicId)
      .subscribe({
        next: (topic: Topic) => {
          this.isIn = this.topicService.checkIfUserInTopic((this.user.id), topic);
          this.topicService.findAllTopics();
        },
        error: (error: HttpErrorResponse) => {
          this.groupService.navigateToError()
          console.log("ERROR", error.message)
        }
      })
  }

  onJoinClick(topicId: number): void {
    this.topicService.navigateToPage(true, topicId)
    this.joinTopicService.addToTopic(topicId)
      .subscribe({
        next: (topic: Topic) => {
          this.isIn = this.topicService.checkIfUserInTopic((this.user.id), topic);
          this.topicService.findAllTopics();
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
    }

}
