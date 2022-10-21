import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.css']
})
export class TimelinePage implements OnInit {

  constructor(private eventService: EventService, private userService: UserService) { }

  ngOnInit(): void {
    // Get user then get events.
    this.userService.userFindTest().subscribe(
      resp =>{ this.eventService.eventFindTest().subscribe(
        res => console.log("Timeline eventFindTest: ",res)
      )
      console.log("Timeline userFindTest: ",resp);
      }
    )    
  }

}
