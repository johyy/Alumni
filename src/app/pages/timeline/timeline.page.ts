import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Post } from 'src/app/models/post.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { PostService } from 'src/app/services/post.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.css']
})
export class TimelinePage implements OnInit {

  constructor(private eventService: EventService, private userService: UserService) { }

  ngOnInit(): void {
  }
}