import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventsResolver implements Resolve<boolean> {
  constructor(private eventService: EventService) {}

  resolve(): Observable<any> {
    return this.eventService.getEvents();
  }
}
