import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User = Object();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getAvatar() {
    return this.user.avatar;
  }

  navigateToEditUser() {
    this.router.navigateByUrl(`/profile/edit`);
  }
}
