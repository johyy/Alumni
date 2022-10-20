import { startOfDay } from 'date-fns';
import { Component, OnInit, Input } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Event } from 'src/app/models/event.model';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';

defineFullCalendarElement();


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  constructor(private eventService: EventService, private userService : UserService) { }

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

  get events(): any {
    return this.eventService.calendarEvents;
  }

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
        alert('Event: ' + info.event.title + "event view as popup?");
      }
    };
}



  ngOnInit(): void {
    
    this.eventService.findAllUsersEvents()
    setTimeout(() => this.renderCalendar(), 1000)
  }


}
