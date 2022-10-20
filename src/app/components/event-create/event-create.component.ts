import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/models/event.model';
import { NewEvent } from 'src/app/models/new-event.model';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  private eventTargetId: number = 0;
  private target: String = "";
  public errorMsg: String | null = null;

  constructor(public router: Router, private location: Location,private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

  createEvent(createEventForm: NgForm): void {
    const {event,description,datebegins,dateends,guestcapacity} = createEventForm.value;
    const newEvent: NewEvent = {
      title: event,
      description: description,
      date_time_begin: datebegins === ""? null : datebegins,
      date_time_end: dateends === ""? null : dateends,
      guest_capacity: guestcapacity === ""? null : guestcapacity,
    }
    console.log(newEvent);
  }

  // Navigate a step back
  cancel(): void {
    this.location.back()
  }

}
