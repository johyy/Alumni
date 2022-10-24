import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  public posts?: Post[];
  public users?: User[];

  @Input() singleEvent : Event | undefined;
  @Input() eventHost: User | undefined;

  constructor(private location: Location, private postService: PostService, private userService: UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['singleEvent']) this.refresh = !this.refresh;
  }

  ngOnInit(): void {
    // Get all posts targeted to event
    if(this.singleEvent) {this.postService.findPostsByEvent(this.singleEvent?.id).subscribe(
      resp => {
        this.posts = resp;
        const userIds = resp.map(p => p.author);
        // Get users who have posted for this event
        this.userService.findUsersByIdList({userIds: userIds}).subscribe(
          resp => {this.users = resp;this.mapIdsToUsers()}          
          )
      }    
    )}
  }

  cancel(): void {
    this.location.back()
  }

  // Maps post author ids to users
  mapIdsToUsers(): void {
    let a = this.posts?.map(p => p.author)
    let c = a?.toString().split(",")!
    this.posts?.map((p,indx) =>{p.author = this.users!.find(u => u.id.toString() == c[indx])!})
  } 
}
