import { startOfDay } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  userEvents: Event[] = [];

  constructor(private eventService: EventService, private userService : UserService) { }

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  get user(): User {
    return this.userService.user;
  }


  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'First event',
    },
    {
      start: startOfDay(new Date()),
      title: 'Second event',
    }
  ]



  ngOnInit(): void {

    this.eventService.getEvents().subscribe((events) => this.userEvents = events );
  // this.userEvents.forEach(e => this.events.push({start: new Date(e.date_time_begin), title: e.title}))
  }


}
