import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { GroupListService } from 'src/app/services/group-list.service';
import { JoinGroupService } from 'src/app/services/join-group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-groups-list-item',
  templateUrl: './groups-list-item.component.html',
  styleUrls: ['./groups-list-item.component.css']
})
export class GroupsListItemComponent implements OnInit {

  public isIn: boolean = false;
  @Input() group!: Group;

  get user(): User {
    return this.userService.user;
  }

  constructor(private groupListService: GroupListService, private userService: UserService, private joinGroupService: JoinGroupService) { }

  ngOnInit(): void {
    this.userService.findProfile();
    this.checkIfIsIn();
  }

  onGroupClicked(groupId: number) {
    if (this.isIn === true) {
      this.groupListService.navigateToGroupPage(groupId);
    }
  }

  onJoinClick(groupId: number): void {
    this.joinGroupService.addToGroup(groupId)
      .subscribe({
        next: (group: Group) => {
          this.isIn = this.groupListService.checkIfUserInGroup(this.user.id, group);
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
  }

  onLeaveClick(groupId: number): void {
    this.joinGroupService.removeFromGroup(groupId)
      .subscribe({
        next: (group: Group) => {
          this.isIn = this.groupListService.checkIfUserInGroup(this.user.id, group);
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
  }

  checkIfIsIn(): void {
    if (this.user.id === undefined) {
      return
    }
    this.isIn = this.groupListService.checkIfUserInGroup((this.user.id), this.group);
  }
}
