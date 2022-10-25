import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group.model';

const { apiGroups } = environment;

@Injectable({
  providedIn: 'root'
})
export class GroupListService {

  private _groups!: Group[];
  private _error: string = "";
  private _loading: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log((`${operation} failed: ${error.message}`));
      return of(result as T);
    };
  }

  get groups(): Group[] {
    return this._groups;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient, private router: Router) { }

  public findAllGroups(): void {
    this._loading = true;
    this.http.get<Group[]>(apiGroups)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe({
      next: (groups: Group[]) => {
        this._groups = groups;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  navigateToGroupPage(groupId: number) {
    this.router.navigate(['/group', groupId])
  }

  groupById(id: number): Group {
    const group = this.groups.find((group: Group) => group.id === id);
    return group!;
  }

  checkIfUserInGroup(userId: number, group: Group) {
    for (let user of group.users) {
      if (user == userId) {
        return true
      } 
    }
    return false
  }

  navigateToPage(boolean: boolean, groupId: number) {
    if (boolean === true) {
      this.router.navigate(['/join_group', groupId])
    } else {
      this.router.navigate(['/leave_group', groupId])
    }
  }

  navigateToError() {
    this.router.navigate(['/error'])
  }

  createGroup(title: String, description: String, userId: number, privateBoolean: boolean): Observable<string>{
    const body = {
      title:title,
      description:description,
      users:[userId],
      _private:privateBoolean
    }
    return this.http.post<any>(`${environment.baseUrl}/group`,body,this.httpOptions).pipe(      
      catchError(this.handleError<string>('createGroup'))
    )
  }
}