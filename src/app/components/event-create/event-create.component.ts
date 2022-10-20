import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { NgForm } from '@angular/forms';
import { NewEvent } from 'src/app/models/new-event.model';
import { EventService } from 'src/app/services/event.service';
import { TopicService } from 'src/app/services/topic.service';
import { GroupListService } from 'src/app/services/group-list.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  private eventTargetId: number | null = null;
  private target: String | null = null;
  public errorMsg: String | null = null;
  public targetTitle: String = "";

  constructor(public router: Router, private location: Location,private route: ActivatedRoute,
    private eventService: EventService, private topicService: TopicService, private glService: GroupListService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventTargetId = params['id'];      
      this.target = params['target'];
    });
    // Get target title for header h1    
    if(this.target == "group") this.targetTitle = this.glService.groups?.find(g=> g.id == this.eventTargetId)?.title ?? this.targetTitle;
    if(this.target == "topic") this.targetTitle = this.topicService.topics?.find(t=> t.id == this.eventTargetId)?.title ?? this.targetTitle;
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
