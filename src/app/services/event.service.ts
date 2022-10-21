import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event.model';

import { CalendarEvent } from 'angular-calendar';
import { NewEvent } from '../models/new-event.model';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _events: Event[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  private _refreshEvents: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',})
  };
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log((`${operation} failed: ${error.message}`));
      return of(result as T);
    };
  }

  get events(): Event[] {
    return this._events;
  }

  //for calendar
  get calendarEvents(): CalendarEvent[] {
      let calendarevents: CalendarEvent[] = []
      for(let event of this.events)
      {
      calendarevents = [
              ...calendarevents,
              {
      start:new Date(event.updated_time.toString()),
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
    if(!this._refreshEvents){
      if(this._events) return;
      if(StorageUtil.storageRead(StorageKeys.Events)) {
        this._events = StorageUtil.storageRead(StorageKeys.Events)!;
        return;
      }
    }
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
        StorageUtil.storageSave(StorageKeys.Events, events);
        this._refreshEvents = false;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  getSpecificEvent(eventId:number): void{
    console.log(this._events);
    
  }

  /**
   * (POST) Create new event. returns id of created event in response.body.
   * @param event 
   * @param targetAudience 
   * @param targetId 
   * @returns 
   */
  createEvent(event: NewEvent, targetAudience?: String, targetId?: number): Observable<any>{
    this._refreshEvents = true;
    return this.http.post<any>(`${environment.baseUrl}/event`,event,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response', }).pipe( 
        tap(resp => {
          if(targetAudience && targetId){
            this.targetInvitation(targetAudience,resp.body,targetId).subscribe();
          }
        }),
        catchError(this.handleError<string>('createEvent'))
    )
  };

  /**
   * (POST) Call one of backends create new invitation endpoints (depending on params)
   * @param targetAudience group/user/topic
   * @param eventId 
   * @param targetId 
   * @returns 
   */
  targetInvitation(targetAudience: String, eventId: number, targetId: number): Observable<any>{
    return this.http.post<any>(
      `${environment.baseUrl}/event/${eventId}/invite/${targetAudience}/${targetId}`,this.httpOptions).pipe(
        catchError(this.handleError<string>('targetInvitation'))
      )
  }
}
