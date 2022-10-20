import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/models/event.model';
import { NewEvent } from 'src/app/models/new-event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  private eventTargetId: number | null = null;
  private target: String | null = null;
  public errorMsg: String | null = null;

  constructor(public router: Router, private location: Location,private route: ActivatedRoute,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventTargetId = params['id'];      
      this.target = params['target'];
      /* if(params['postId']) this.postInEdit = this.postService.findPostById(params['postId']);      
      if(params['ogId']) this.ogPostId = params['ogId'];  */ 
    });
  }

  createEvent(createEventForm: NgForm): void {
    if(createEventForm.valid){
      const {event,description,datebegins,dateends,guestcapacity} = createEventForm.value;
      const newEvent: NewEvent = {
        title: event,
        description: description,
        date_time_begin: datebegins === ""? null : datebegins,
        date_time_end: dateends === ""? null : dateends,
        guest_capacity: guestcapacity === ""? null : guestcapacity,
      }
      // If event is targeted to specific audience
      if(this.target && this.eventTargetId){
        this.eventService.createEvent(newEvent,this.target,this.eventTargetId).subscribe(
          resp => {if(resp.status == 201) this.router.navigate(['event',resp.body])}       
        )
      }else { // event w/o target
        console.log("w/o target")
        this.eventService.createEvent(newEvent).subscribe(
        resp => {if(resp.status == 201) this.router.navigate(['event',resp.body])}
      );}      
    }
  }

  // Navigate a step back
  cancel(): void {
    this.location.back()
  }

}
