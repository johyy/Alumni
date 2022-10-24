
import { Component, OnInit} from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ActivatedRoute, Router } from '@angular/router';

defineFullCalendarElement();


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events:any = []
  userevents:any = []

  constructor(private eventService: EventService, private userService : UserService, private route: ActivatedRoute, private router:Router) { }

  calendarOptions: CalendarOptions = {
   plugins: [dayGridPlugin],
   headerToolbar: {
     left: 'prev,next today',
     center: 'title',
     right: 'dayGridMonth,dayGridWeek,dayGridDay',
   },
   initialView: 'dayGridMonth',
   events: this.events,
   weekends: true,
   editable: true,
   selectable: true,
   selectMirror: true,
   dayMaxEvents: true
 };


  get loading(): boolean {
    return this.eventService.loading;
  }

  get error(): string {
    return this.eventService.error;
  }


renderCalendar() {
   this.calendarOptions = {
      plugins: [dayGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
      initialView: 'dayGridMonth',
      events: this.events,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: function(info) {
        alert('Event: ' + info.event.title);
      }
    };
}



  ngOnInit(): void {
    this.userevents = this.route.snapshot.data['events']
    let calendarevents: any= []
    for(let event of this.userevents)
    {
      console.log(event.title)
      console.log(event.date_time_begin)

      //check if event has start date
      if(event.date_time_begin == undefined){
        calendarevents = [
          ...calendarevents,
          {
        title:event.title
         }
        ]
      }else{
        calendarevents = [
          ...calendarevents,
          {
        start:new Date(event.date_time_begin.toString()),
        title:event.title
          }
      ]
      }
      }

      this.events = calendarevents
      this.eventService.findAllUsersEvents()
      this.renderCalendar()
    }


}
