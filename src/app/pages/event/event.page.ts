import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.css']
})
export class EventPage implements OnInit {  
  //private event: Event;
  private eventId: number = 0;
  public targetTitle: String | undefined = undefined;

  constructor(public router: Router,private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];     
    });
    this.eventService.getSpecificEvent(this.eventId)
  }

}
