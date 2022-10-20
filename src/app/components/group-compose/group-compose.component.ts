import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GroupListService } from 'src/app/services/group-list.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-group-compose',
  templateUrl: './group-compose.component.html',
  styleUrls: ['./group-compose.component.css']
})
export class GroupComposeComponent implements OnInit {

  public isPrivate: boolean = false;

  get user(): User {
    return this.userService.user;
  }

  constructor(public router: Router, private location: Location, private groupService: GroupListService, private userService: UserService) { }

  ngOnInit(): void {
  }

  createGroup(createGroupForm: NgForm): void {
    const {title, description} = createGroupForm.value;    
    if(createGroupForm.valid){
      this.groupService.createGroup(title, description, this.user.id, this.isPrivate).subscribe(
        resp => console.log("group-compose: createGroup response: "+resp));
      this.groupService.findAllGroups();
    }    
  }

  cancel(): void {
    this.location.back()
  }

  public onSavePrivacyChanged(value: boolean) {
    this.isPrivate = value;
  }

}
