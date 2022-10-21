import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {

  @Input() singleEvent : Event | undefined;
  @Input() eventHost: User | undefined;

  constructor() { }

  ngOnInit(): void {   
  }

}
