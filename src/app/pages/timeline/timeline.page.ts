import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.css']
})
export class TimelinePage implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.findAllUsersEvents();
  }

}
