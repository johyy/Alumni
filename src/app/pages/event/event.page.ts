import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.css']
})
export class EventPage implements OnInit {  
  public singleEvent: Event | undefined;
  public eventHost: User | undefined;
  private eventId: number = 0;

  constructor(private route: ActivatedRoute, private eventService: EventService, private userService: UserService) { }

  ngOnInit(): void {
    // get event it param from url
    this.route.params.subscribe(params => {
      this.eventId = params['id'];     
    });
    // get event by id
    this.singleEvent = this.eventService.getSpecificEvent(this.eventId);
    // get events host  
    if(this.singleEvent != undefined){
      this.userService.findUserById(this.singleEvent.host).subscribe(
        resp => {this.eventHost = resp}
      )  
    }
  }

}
