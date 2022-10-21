import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _events: Event[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get events(): Event[] {
    return this._events;
  }

  //for calendar
  get calendarEvents(): any {
      let calendarevents: any= []
      for(let event of this.events)
      {
      calendarevents = [
              ...calendarevents,
              {
      start:new Date(event.date_time_begin.toString()),
      title:event.title
        }
    ]
    
    }
    return calendarevents;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(environment.apiEvents);
  }

  findAllUsersEvents(): void {
    this._loading = true;
    this.http.get<Event[]>(environment.apiEvents)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe({
      next: (events: Event[]) => {
        this._events = events
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }


}
