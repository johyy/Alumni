import { startOfDay } from 'date-fns';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Event } from 'src/app/models/event.model';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ActivatedRoute } from '@angular/router';

defineFullCalendarElement();


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events:any = []
  userevents:any = []

  constructor(private eventService: EventService, private userService : UserService, private route: ActivatedRoute) { }

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
      calendarevents = [
              ...calendarevents,
              {
      start:new Date(event.date_time_begin.toString()),
      title:event.title
        }
      ]
    }
    this.events = calendarevents
    this.eventService.findAllUsersEvents()
    this.renderCalendar()
  }


}
