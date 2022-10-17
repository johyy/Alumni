import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';
import { GroupListService } from './group-list.service';
import { UserService } from './user.service';

const { apiGroups } = environment

@Injectable({
  providedIn: 'root'
})
export class JoinGroupService {

  constructor(private http: HttpClient,
              private readonly userService: UserService,
              private readonly groupService: GroupListService
            ) { }
    
  public addToGroup(groupId: number): Observable<Group> {
    if (!this.groupService.groupById(groupId)) {
      throw new Error("addToGroup: There is no group with this id")
    }

    const user: number = this.userService.user.id;
    const group: Group = this.groupService.groupById(groupId);

    if (!user) {
      throw new Error("addToGroup: No user")
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json'
    })

    console.log(headers)
    return this.http.patch<Group>(`${apiGroups}/${group.id}/${user}/join`, {
      users: [...group.users]
    }, {
      headers
    })
  }
}