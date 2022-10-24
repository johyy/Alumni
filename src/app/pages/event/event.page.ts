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
    // Get event id from url
    this.route.params.subscribe(params => {
      this.eventId = params['id'];     
    });
    // Get the event with event id
    this.eventService.eventFindTest().subscribe(
      res => {this.singleEvent = res.find(e => e.id == this.eventId);      
        // Get the event hosts info
        if(this.singleEvent != undefined){
          this.userService.findUserById(this.singleEvent.host).subscribe(
          resp => {this.eventHost = resp;;
          }
        )}
      }
    )
  }

}
