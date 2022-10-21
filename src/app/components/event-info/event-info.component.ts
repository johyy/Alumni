import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  public posts?: Post[];

  @Input() singleEvent : Event | undefined;
  @Input() eventHost: User | undefined;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    // Get all posts targeted to event
    if(this.singleEvent) {this.postService.findPostsByEvent(this.singleEvent?.id).subscribe(
      resp => this.posts = resp      
    )}
  }

 /*  getCommentorInfo(id: number): User {
    this.userService.
  }
 */
}
