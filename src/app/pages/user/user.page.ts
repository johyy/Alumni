import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.css']
})
export class UserPage implements OnInit {

  user: User | undefined;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    let parts = this.router.url.split("/");
    let userId = parseInt(parts[2]);
    this.userService.findUserById(userId).subscribe(data => this.user = data);
  }

}
