import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group.model';

const { apiGroups } = environment;

@Injectable({
  providedIn: 'root'
})
export class GroupListService {

  private _groups: Group[] = [];
  private _error: string = "";
  private _loading: boolean = false;

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

  groupById(id: number): Group | undefined {
    return this.groups.find((group: Group) => group.id === id);
  }

  checkIfUserInGroup(userId: number, group: Group) {
    for (let user of group.users) {
      if (user == userId) {
        return true
      } 
    }
    return false
  }
}
    
  

