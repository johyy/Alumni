import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {

  get user(): User {
    return this.userService.user;
  }

  get loading(): boolean {
    return this.userService.loading;
  }

  get error(): string {
    return this.userService.error;
  }

  constructor(
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.findProfile();
  }

}
