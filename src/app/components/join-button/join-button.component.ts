import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-join-button',
  templateUrl: './join-button.component.html',
  styleUrls: ['./join-button.component.css']
})
export class JoinButtonComponent implements OnInit {

  @Input() group!: Group;

  get user(): User {
    return this.userService.user;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onJoinClick(): void {
    console.log("click")
  }
}